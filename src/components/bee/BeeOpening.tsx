/**
 * The homepage opening screen (bee brand evolution, step 07, 2026-10-08).
 *
 * Tim, 2026-10-08: like IPPE's opening, the bee flies in, VBO appears, then
 * the bee flies out and lands in the header beside VBO, and the homepage is
 * there. It plays for every visitor, including people arriving from Google
 * (Tim's explicit call: no referrer skip), once per visit.
 *
 * Build spec: Jules's notes, section 4. Reference build: the second script on
 * Mack/artifacts/2026-10-bee-website/the-bee-on-vboadv.html, ported here.
 *
 * How it stays fast and safe:
 * - <BeeOpeningGate/> is a tiny inline script that runs before anything on
 *   the page paints. It decides whether to play (homepage full load, no
 *   section link in the address, not already played this visit) and sets a
 *   class on <html>; the layer's CSS shows it only under that class. JS off,
 *   or a client-side navigation back to the homepage: nothing plays.
 * - The layer is fixed, so nothing shifts, and the page underneath renders
 *   and loads exactly as before: no element on it is hidden or delayed.
 * - The layer is inline SVG drawn from the page's sprite: no images, fonts,
 *   video or libraries, no extra requests, no waiting for hydration.
 * - Skippable by tap, click, wheel, scroll or key. Reduced motion: no
 *   flight, the logo shows still, then a short fade. A CSS failsafe clears
 *   it at 4.2 s even if the script never runs. Scrolling is never locked.
 * - The layer and its script live outside React's control
 *   (dangerouslySetInnerHTML), so the script can move it freely before and
 *   after hydration without React ever touching it.
 */

/* Decides, before first paint. sessionStorage holds the once-per-visit flag;
   if storage is unavailable it simply does not play. */
const GATE_JS = `(function(){try{var d=document.documentElement;if(location.hash||!window.requestAnimationFrame)return;var s=window.sessionStorage,k='vbo-opening-seen';if(s.getItem(k))return;s.setItem(k,'1');d.classList.add('bee-op');if(!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)){d.classList.add('bee-op-fly');d.classList.add('bee-op-wait');}}catch(e){}})();`

/* The layer: the black screen with the big wordmark (its gold bar sweeps in
   through a clip), and the flying bee as its own fixed element above it so it
   can land on the header after the black gives way. */
const LAYER_HTML =
  '<div class="vbo-op" id="vbo-op" aria-hidden="true">' +
  '<svg class="vbo-op-wm" id="vbo-op-wm" viewBox="0 0 565.189 105.029" focusable="false">' +
  '<defs><clipPath id="vbo-op-clip"><rect id="vbo-op-cliprect" x="0" y="0" width="0" height="105.029"></rect></clipPath></defs>' +
  '<g clip-path="url(#vbo-op-clip)"><use href="#vbo-wm-bar"></use></g>' +
  '<g class="vbo-op-wml" id="vbo-op-wml"><use href="#vbo-wm-letters"></use></g>' +
  '</svg></div>' +
  '<div class="vbo-op-bee" id="vbo-op-bee" aria-hidden="true"><div class="vbo-op-bob">' +
  '<svg class="vbo-w-l" viewBox="0 0 512 512" focusable="false"><use href="#vbo-bee-wl"></use></svg>' +
  '<svg class="vbo-w-r" viewBox="0 0 512 512" focusable="false"><use href="#vbo-bee-wr"></use></svg>' +
  '<svg viewBox="0 0 512 512" focusable="false"><use href="#vbo-bee-body"></use></svg>' +
  '</div></div>'

/* The animation. Timeline in seconds: the bee flies in and settles into the
   full logo at the centre (0.12 to 1.10); VBO appears, the bar sweeping in
   and the letters rising (0.85 to 1.35); hold; the bee lifts off, arcs and
   lands on the header's own bee, turning upright (1.80 to 2.70) while the big
   VBO fades (to 2.15) and the black gives way (2.05 to 2.70); one landing
   pulse; hand-over at 3.04. Geometry from the pack's lockup file: the bee's
   512-unit box sits at (-13.312, -8.571), 137.216 units square, in a lockup of
   725.708 x 120 whose V is 100 units tall. The same formula on the header
   lockup's own box gives the landing spot, so the hand-over is pixel exact. */
const OPENING_JS = `(function(){'use strict';
var root=document.documentElement;
if(!root.classList.contains('bee-op'))return;
var op=document.getElementById('vbo-op'),bee=document.getElementById('vbo-op-bee'),wm=document.getElementById('vbo-op-wm'),wml=document.getElementById('vbo-op-wml'),clip=document.getElementById('vbo-op-cliprect'),target=document.querySelector('.vbo-lk[data-bee-target]');
function clearAll(){root.classList.remove('bee-op');root.classList.remove('bee-op-fly');root.classList.remove('bee-op-wait');}
if(!op||!bee||!wm||!wml||!clip||!target){clearAll();return;}
var LK_W=725.708,LK_H=120,BOX=137.216,BOX_X=-13.312,BOX_Y=-8.571,WM_X=160.519,WM_Y=7.857,WM_W=565.189,WM_H=105.029;
var T_IN0=0.12,T_IN1=1.10,T_WM0=0.85,T_WM1=1.35,T_OUT0=1.80,T_OUT1=2.70,T_WMX=2.15,T_BK0=2.05,T_END=3.04,STILL_HOLD=0.55,STILL_FADE=0.45;
var still=!root.classList.contains('bee-op-fly');
var G=null,raf=0,t0=0,lastT=0,playing=false,heading=60,prevP=null;
var INPUTS=['pointerdown','wheel','touchstart','keydown','scroll'],OPTS={capture:true,passive:true};
function clamp(v,a,b){return v<a?a:(v>b?b:v);}
function seg(t,a,b){return clamp((t-a)/(b-a),0,1);}
function outQuart(u){return 1-Math.pow(1-u,4);}
function outCubic(u){return 1-Math.pow(1-u,3);}
function inOutCubic(u){return u<0.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2;}
function bez(a,b,c,d,u){var v=1-u;return{x:v*v*v*a.x+3*v*v*u*b.x+3*v*u*u*c.x+u*u*u*d.x,y:v*v*v*a.y+3*v*v*u*b.y+3*v*u*u*c.y+u*u*u*d.y};}
function angDiff(a,b){return((b-a)%360+540)%360-180;}
function geometry(){
var vw=root.clientWidth||window.innerWidth,vh=window.innerHeight;
var w=Math.min(vw*0.8,620),k=w/LK_W,lx=(vw-w)/2,ly=(vh-LK_H*k)/2;
var r=target.getBoundingClientRect(),tk=r.height/LK_H;
var g={stage:{x:lx+(BOX_X+BOX/2)*k,y:ly+(BOX_Y+BOX/2)*k,box:BOX*k},end:{x:r.left+(BOX_X+BOX/2)*tk,y:r.top+(BOX_Y+BOX/2)*tk,box:BOX*tk},wm:{x:lx+WM_X*k,y:ly+WM_Y*k,w:WM_W*k,h:WM_H*k}};
g.max=g.stage.box*1.5;
g.start={x:-0.18*vw,y:1.08*vh};
g.in1={x:0.30*vw,y:0.98*vh};
g.in2={x:g.stage.x+0.22*vw,y:g.stage.y-0.16*vh};
g.out1={x:g.stage.x+0.06*vw,y:g.stage.y-0.30*vh};
g.out2={x:g.end.x+0.30*vw,y:g.end.y+0.12*vh};
bee.style.width=bee.style.height=g.max.toFixed(1)+'px';
wm.style.left=g.wm.x.toFixed(1)+'px';wm.style.top=g.wm.y.toFixed(1)+'px';
wm.style.width=g.wm.w.toFixed(1)+'px';wm.style.height=g.wm.h.toFixed(1)+'px';
return g;}
function place(p,box,rot){bee.style.transform='translate3d('+(p.x-G.max/2).toFixed(2)+'px,'+(p.y-G.max/2).toFixed(2)+'px,0) rotate('+rot.toFixed(2)+'deg) scale('+(box/G.max).toFixed(4)+')';}
function frame(now){
raf=0;
try{
if(!t0)t0=now;
var t=(now-t0)/1000,dt=lastT?Math.min(0.05,(now-lastT)/1000):1/60;
lastT=now;
if(still){
var f=inOutCubic(seg(t,STILL_HOLD,STILL_HOLD+STILL_FADE));
op.style.opacity=bee.style.opacity=(1-f).toFixed(3);
if(t>=STILL_HOLD+STILL_FADE){finish(false);return;}
raf=requestAnimationFrame(frame);return;}
var p,box,aim=null;
if(t<T_IN0){p=G.start;box=G.max;}
else if(t<T_IN1){var u=outQuart(seg(t,T_IN0,T_IN1));p=bez(G.start,G.in1,G.in2,G.stage,u);p={x:p.x,y:p.y+Math.sin(t*Math.PI*4.8)*G.stage.box*0.05*(1-u)};box=G.stage.box*(1.5-0.5*u);}
else if(t<T_OUT0){p=G.stage;box=G.stage.box;aim=0;}
else if(t<T_OUT1){var v=inOutCubic(seg(t,T_OUT0,T_OUT1));p=bez(G.stage,G.out1,G.out2,G.end,v);box=G.stage.box+(G.end.box-G.stage.box)*v;if(v>0.86)aim=0;}
else{p=G.end;box=G.end.box;aim=0;}
if(aim===null&&prevP){var dx=p.x-prevP.x,dy=p.y-prevP.y;if(dx*dx+dy*dy>0.05)aim=Math.atan2(dx,-dy)*180/Math.PI;}
if(aim!==null)heading+=angDiff(heading,aim)*(1-Math.exp(-dt/0.12));
prevP=p;
var pulse=1;
if(t>=T_OUT1){bee.classList.remove('is-flying');heading=0;pulse=1-0.1*Math.sin(Math.PI*seg(t,T_OUT1,T_END));}
place(p,box*pulse,heading);
var fade=seg(t,T_OUT0,T_WMX),lu=outCubic(seg(t,T_WM0+0.12,T_WM1));
clip.setAttribute('width',(WM_W*outCubic(seg(t,T_WM0,T_WM0+0.42))).toFixed(1));
wml.style.opacity=lu.toFixed(3);
wml.style.transform='translateY('+((1-lu)*10).toFixed(2)+'px)';
wm.style.opacity=(t<T_WM0?0:1-fade).toFixed(3);
wm.style.transform='scale('+(1-0.02*fade).toFixed(4)+')';
op.style.opacity=(1-inOutCubic(seg(t,T_BK0,T_OUT1))).toFixed(3);
if(t>=T_END){finish(false);return;}
raf=requestAnimationFrame(frame);
}catch(e){playing=true;finish(true);}}
function onInput(){finish(true);}
function attach(){if(playing)INPUTS.forEach(function(e){window.addEventListener(e,onInput,OPTS);});}
function detach(){INPUTS.forEach(function(e){window.removeEventListener(e,onInput,OPTS);});}
function finish(skipped){
if(!playing)return;
playing=false;
if(raf){cancelAnimationFrame(raf);raf=0;}
detach();
root.classList.remove('bee-op-wait');
bee.style.visibility='hidden';bee.classList.remove('is-flying');
if(skipped){op.style.pointerEvents='none';op.style.transition='opacity .2s ease';op.style.opacity='0';setTimeout(clearAll,230);}
else clearAll();}
try{
G=geometry();
op.style.opacity='1';
if(still){place(G.stage,G.stage.box,0);clip.setAttribute('width',String(WM_W));wml.style.opacity='1';wm.style.opacity='1';}
else{place(G.start,G.max,heading);bee.classList.add('is-flying');}
bee.style.visibility='visible';
playing=true;
setTimeout(attach,60);
window.addEventListener('resize',function(){if(playing)G=geometry();});
raf=requestAnimationFrame(frame);
}catch(e){clearAll();}
})();`

/** Runs first: decides whether the opening plays, before anything paints. */
export function BeeOpeningGate() {
  return <script dangerouslySetInnerHTML={{ __html: GATE_JS }} />
}

/** The black layer over the page (placed before the header so it is there from the first frame). */
export function BeeOpeningLayer() {
  return (
    <div
      className="vbo-op-root"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: LAYER_HTML }}
    />
  )
}

/** The animation (placed after the header, whose lockup it lands on). */
export function BeeOpeningScript() {
  return <script dangerouslySetInnerHTML={{ __html: OPENING_JS }} />
}
