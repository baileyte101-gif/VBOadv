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
  },
]
