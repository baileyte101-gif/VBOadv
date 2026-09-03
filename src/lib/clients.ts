// Shared client roster for the glass logo tiles.
//
// Section 01 (WhatWeRun.tsx) imports this list for the marble strip. It is a
// verbatim copy of the array that lived inline in WhoWeWorkWith.tsx before
// that section was removed from the homepage (2026-08-11, Tim's call: the
// logos moved up into section 01 and did that section's job, so it came out
// rather than being given a new one).
export type Client = {
  name: string
  href: string
  logo: string
  variant: 'image' | 'peixoto-lockup'
  /**
   * Opt a very wide logo out of the shared 70% width cap (ClientGlassTile
   * raises it to 88%). The cap was tuned against marks in the 1:1 to 2:1
   * band, where capping on width still leaves a tall enough logo to hold
   * its own. A lockup near 4:1 hits the width cap first and lands about
   * half the height of its neighbours, reading as the runt of the row
   * rather than a peer. This changes how much of the tile the logo is
   * allowed to use; it never alters the logo itself.
   */
  wide?: boolean
}

export const clients: Client[] = [
  {
    name: 'Sir Galloway Dry Cleaners',
    href: 'https://sirgalloway.com',
    logo: '/images/clients/sir-galloway-white.png',
    variant: 'image',
  },
  {
    name: 'Peixoto',
    href: 'https://peixotowear.com',
    logo: '/images/clients/peixoto-white.svg',
    variant: 'peixoto-lockup',
  },
  {
    name: 'IPPE Soccer Tours',
    href: 'https://ippesoccertours.com',
    logo: '/images/clients/ippe-white.png',
    variant: 'image',
  },
  {
    name: 'The Fudge Pie Co.',
    href: 'https://www.thefudgepie.com',
    logo: '/images/clients/fudge-pie-white.png',
    variant: 'image',
  },
  {
    name: 'Sidefoot',
    href: 'https://sidefoot.app',
    logo: '/images/clients/sidefoot-white.svg',
    variant: 'image',
    // Jules's horizontal lockup is the only sanctioned one and runs 3.8:1,
    // so it needs the wider cap. Checked at 70/80/88/96 against the other
    // four on the marble ground: 70 reads as the runt, 96 crowds the tile,
    // 88 sits level with Sir Galloway and Fudge Pie.
    wide: true,
  },
]
