/* The catalogue. This is the only file you edit to add, change or remove a piece.

   To add a piece, copy one block inside "pieces" and change:
     id        short, lowercase, hyphens only. It becomes the link: collections.html#your-id
     name      what the customer sees
     category  one of the ids listed in "categories" below
     text      one or two plain sentences. No prices.
     gold      true if it is hallmarked gold (shows the hallmark line)
     media     photos or films, in the order they should appear. The first one is the card picture.
                 photo: { img: 'assets/file.webp', alt: 'what the photo shows' }
                 film:  { film: 'assets/file.mp4', img: 'assets/poster.webp', alt: 'what the film shows' }

   Photos: 3:4 portrait, about 1000 px wide, saved as WebP.
*/
window.SKJW = {
  whatsapp: '917002180879',

  categories: [
    { id: 'necklaces', name: 'Necklaces' },
    { id: 'sets',      name: 'Chokers and long sets' },
    { id: 'bangles',   name: 'Bangles and shakha' },
    { id: 'earrings',  name: 'Earrings' },
    { id: 'rings',     name: 'Rings' },
    { id: 'bridal',    name: 'Bridal sets' }
  ],

  pieces: [
    {
      id: 'drop-necklace',
      name: 'Drop-work necklace',
      category: 'necklaces',
      text: 'A short necklace with a flower centre and a fall of small drops.',
      gold: true,
      media: [
        { img: 'assets/necklace-red.webp', alt: 'A gold necklace with a drop-work centre on a red velvet bust' }
      ]
    },
    {
      id: 'choker-long-haar',
      name: 'Choker with long haar',
      category: 'sets',
      text: 'A lattice choker worn with a long leaf-link haar and a tasselled pendant.',
      gold: true,
      media: [
        { film: 'assets/necklace-loop.mp4', img: 'assets/necklace-poster.webp', alt: 'Light moving across a gold choker and long pendant necklace on a navy bust' },
        { img: 'assets/necklace-navy.webp', alt: 'A gold choker and a long pendant necklace on a navy velvet bust' }
      ]
    },
    {
      id: 'flower-choker-set',
      name: 'Flower choker and necklace',
      category: 'sets',
      text: 'A flower-centred choker with a matching necklace below it.',
      gold: true,
      media: [
        { img: 'assets/set-red.webp', alt: 'A gold flower choker and necklace on a red velvet bust' },
        { img: 'assets/choker-red.webp', alt: 'Close view of the flower choker and the necklace centre' }
      ]
    },
    {
      id: 'red-bead-collar',
      name: 'Red bead collar',
      category: 'necklaces',
      text: 'A beaded collar set with gold flower mounts and tied with a woven cord.',
      gold: false,
      media: [
        { img: 'assets/garnet-beads.webp', alt: 'A wide collar of deep red beads set with gold flower mounts' }
      ]
    },
    {
      id: 'shakha',
      name: 'Shakha bound in gold',
      category: 'bangles',
      text: 'White shakha bangles mounted with gold work.',
      gold: false,
      media: [
        { img: 'assets/shakha.webp', alt: 'White shakha bangles mounted in gold on a display stand' }
      ]
    },
    {
      id: 'drop-earrings',
      name: 'Drop earrings',
      category: 'earrings',
      text: 'Nine pairs from the counter tray, each with fine drop work.',
      gold: true,
      media: [
        { img: 'assets/earrings-tray.webp', alt: 'Nine pairs of gold earrings in a maroon velvet tray' }
      ]
    },
    {
      id: 'filigree-flower-ring',
      name: 'Filigree flower ring',
      category: 'rings',
      text: 'A wide flower ring in open filigree.',
      gold: true,
      media: [
        { film: 'assets/ring-loop.mp4', img: 'assets/ring-poster.webp', alt: 'A slow move around a gold filigree flower ring on marble' },
        { img: 'assets/ring-marble.webp', alt: 'A gold filigree flower ring on a marble counter' },
        { img: 'assets/ring-box.webp', alt: 'The flower ring on a blue velvet box at the showroom' }
      ]
    },
    {
      id: 'flower-rings',
      name: 'Flower-top rings',
      category: 'rings',
      text: 'Five flower-top rings from the counter.',
      gold: true,
      media: [
        { img: 'assets/rings-hand.webp', alt: 'Five gold flower-top rings on a black display hand' }
      ]
    },
    {
      id: 'bridal-set',
      name: 'Bridal set',
      category: 'bridal',
      text: 'Choker, long haar, bangles, earrings and rings, chosen together as one set.',
      gold: true,
      media: [
        { img: 'assets/bridal-full.webp', alt: 'A woman wearing a gold choker, a long necklace, bangles and earrings with a cream saree' },
        { img: 'assets/bridal-close.webp', alt: 'Close view of the gold choker and matching earring' },
        { img: 'assets/bridal-glance.webp', alt: 'The bracelet and choker, seen as she looks down' },
        { img: 'assets/earring-profile.webp', alt: 'The gold drop earring in profile' }
      ]
    }
  ]
};
