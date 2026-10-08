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

   The order of "categories" is the order of the filter buttons.
   The order of "pieces" is the order of the cards, so the strongest pieces go first.
   Photos: 3:4 portrait, about 1000 px wide, saved as WebP.
*/
window.SKJW = {
  whatsapp: '917002180879',

  categories: [
    { id: 'rings',     name: 'Rings' },
    { id: 'bridal',    name: 'Bridal sets' },
    { id: 'necklaces', name: 'Necklaces' },
    { id: 'bangles',   name: 'Bangles and shakha' },
    { id: 'earrings',  name: 'Earrings' },
    { id: 'sets',      name: 'Chokers and long sets' }
  ],

  pieces: [
    /* ---------- Rings ---------- */
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
      id: 'peacock-diamond-ring',
      name: 'Peacock diamond ring',
      category: 'rings',
      text: 'A gold peacock ring with a tail of set diamonds.',
      gold: true,
      media: [
        { img: 'assets/ring-peacock.webp', alt: 'A gold peacock ring with a fanned tail of small diamonds, on red velvet' }
      ]
    },
    {
      id: 'leaf-ring',
      name: 'Leaf filigree ring',
      category: 'rings',
      text: 'A long leaf-shaped ring in open filigree.',
      gold: true,
      media: [
        { img: 'assets/ring-leaf.webp', alt: 'A long leaf-shaped gold filigree ring on red velvet' },
        { img: 'assets/ring-leaf-2.webp', alt: 'The leaf ring from a slightly different angle' }
      ]
    },
    {
      id: 'everyday-rings',
      name: 'Everyday rings',
      category: 'rings',
      text: 'Slim gold rings with a single stone or a small flower, from the counter tray.',
      gold: true,
      media: [
        { img: 'assets/ring-tray.webp', alt: 'Rows of slim gold rings on a ring tray, with a hand choosing one' }
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

    /* ---------- Bridal sets ---------- */
    {
      id: 'red-white-bridal',
      name: 'Bridal set, red and white',
      category: 'bridal',
      text: 'Choker, layered haar, earrings and bangles, worn with a white saree with a red border.',
      gold: true,
      media: [
        { film: 'assets/model-loop.mp4', img: 'assets/model-loop-poster.webp', alt: 'A bride in a white and red saree wearing a gold choker, layered necklace and bangles, turning to smile' },
        { film: 'assets/bride-close-loop.mp4', img: 'assets/bride-close-loop-poster.webp', alt: 'Close view of the choker and long haar, rising to the bride\'s smile' },
        { img: 'assets/model-portrait.webp', alt: 'The bride smiling, wearing the gold choker and layered necklace' },
        { img: 'assets/model-smile.webp', alt: 'Close view of the choker and the long haar' },
        { img: 'assets/model-bangles.webp', alt: 'The bride touching her neck, showing her gold bangles' },
        { img: 'assets/model-glance.webp', alt: 'The bride looking down at the necklace' }
      ]
    },
    {
      id: 'ratanchur',
      name: 'Ratanchur',
      category: 'bridal',
      text: 'A hand ornament that joins the rings to the bracelet across the back of the hand.',
      gold: true,
      media: [
        { film: 'assets/ratanchur-loop.mp4', img: 'assets/ratanchur-loop-poster.webp', alt: 'A gold ratanchur laid across a hand' },
        { img: 'assets/ratanchur.webp', alt: 'A gold ratanchur across the hand, linked to a ring and a bracelet' },
        { img: 'assets/ratanchur-2.webp', alt: 'The ratanchur held up against black velvet' }
      ]
    },
    {
      id: 'bridal-set',
      name: 'Bridal set, cream',
      category: 'bridal',
      text: 'Choker, long haar, bangles, earrings and rings, chosen together as one set.',
      gold: true,
      media: [
        { film: 'assets/model-cream-smile.mp4', img: 'assets/model-cream-smile-poster.webp', alt: 'A woman in a cream silk saree wearing the gold choker, long necklace, rings and bangles, looking up to smile' },
        { img: 'assets/bridal-full.webp', alt: 'A woman wearing a gold choker, a long necklace, bangles and earrings with a cream saree' },
        { img: 'assets/bridal-close.webp', alt: 'Close view of the gold choker and matching earring' },
        { img: 'assets/bridal-glance.webp', alt: 'The bracelet and choker, seen as she looks down' },
        { img: 'assets/earring-profile.webp', alt: 'The gold drop earring in profile' }
      ]
    },
    {
      id: 'white-mala-set',
      name: 'Choker with white mala',
      category: 'bridal',
      text: 'A gold choker and pendant worn with a long white mala.',
      gold: true,
      media: [
        { img: 'assets/model-white.webp', alt: 'A woman in a red and white saree wearing a gold choker and a long white mala' }
      ]
    },

    /* ---------- Necklaces ---------- */
    {
      id: 'light-necklaces',
      name: 'Light necklaces',
      category: 'necklaces',
      text: 'Fine necklaces with a fall of small drops, for every day.',
      gold: true,
      media: [
        { film: 'assets/necklaces-loop.mp4', img: 'assets/necklaces-loop-poster.webp', alt: 'Two light gold necklaces on black velvet' },
        { img: 'assets/necklaces-velvet.webp', alt: 'A light gold necklace with a drop-work centre on black velvet' }
      ]
    },
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
      id: 'red-bead-collar',
      name: 'Red bead collar',
      category: 'necklaces',
      text: 'A beaded collar set with gold flower mounts and tied with a woven cord.',
      gold: false,
      media: [
        { img: 'assets/garnet-beads.webp', alt: 'A wide collar of deep red beads set with gold flower mounts' }
      ]
    },

    /* ---------- Bangles and shakha ---------- */
    {
      id: 'shakha-gold-work',
      name: 'Shakha with gold work',
      category: 'bangles',
      text: 'Carved white shakha with a band of gold work along each edge.',
      gold: false,
      media: [
        { film: 'assets/shakha-loop.mp4', img: 'assets/shakha-loop-poster.webp', alt: 'A pair of carved shakha with gold work turned slowly in the hand' },
        { img: 'assets/shakha-gold.webp', alt: 'Carved white shakha with gold work, held in the hand' },
        { img: 'assets/shakha-gold-2.webp', alt: 'The shakha pair seen from the side' }
      ]
    },
    {
      id: 'pola-gold',
      name: 'Pola bound in gold',
      category: 'bangles',
      text: 'Red pola with gold work, stacked with gold bangles.',
      gold: false,
      media: [
        { img: 'assets/pola-gold.webp', alt: 'Red pola bangles with gold work and gold bangles on a black stand' },
        { img: 'assets/bangles-mixed.webp', alt: 'Gold bangles above, red pola and white shakha below, on a black stand' }
      ]
    },
    {
      id: 'gold-bangles',
      name: 'Gold bangles',
      category: 'bangles',
      text: 'Slim gold bangles with fine engraved work.',
      gold: true,
      media: [
        { film: 'assets/bangles-loop.mp4', img: 'assets/bangles-loop-poster.webp', alt: 'A woman slipping on slim gold bangles' }
      ]
    },
    {
      id: 'shakha-white',
      name: 'White shakha',
      category: 'bangles',
      text: 'Plain and carved white shakha, mounted with gold.',
      gold: false,
      media: [
        { img: 'assets/shakha-white.webp', alt: 'White shakha bangles with gold mounts on a black stand' },
        { img: 'assets/shakha.webp', alt: 'White shakha bangles mounted in gold on a display stand' }
      ]
    },

    /* ---------- Earrings ---------- */
    {
      id: 'earring-tree',
      name: 'The earring tree',
      category: 'earrings',
      text: 'Chandbali and drop earrings hung on the tree at the counter. Ask to see the full tree.',
      gold: true,
      media: [
        { img: 'assets/earring-tree.webp', alt: 'Gold chandbali and drop earrings hung on a black display tree' }
      ]
    },
    {
      id: 'chandbali-fringe',
      name: 'Chandbali with fringe',
      category: 'earrings',
      text: 'A chandbali with a fringe of fine chains, shown beside a pear drop.',
      gold: true,
      media: [
        { img: 'assets/earrings-chandbali.webp', alt: 'Two pairs of gold earrings on a black stand: chandbali with a chain fringe, and pear drops' }
      ]
    },
    {
      id: 'lattice-drops',
      name: 'Lattice drop earrings',
      category: 'earrings',
      text: 'Two pairs of open-work drop earrings with small hanging beads.',
      gold: true,
      media: [
        { img: 'assets/earrings-stand.webp', alt: 'Two pairs of gold open-work drop earrings on a black stand' },
        { img: 'assets/earrings-stand-2.webp', alt: 'The same earrings from a slightly different angle' }
      ]
    },
    {
      id: 'earring-box',
      name: 'Earrings in the house box',
      category: 'earrings',
      text: 'A row of drop earrings in a Sri Krishna Jewellery Works presentation box.',
      gold: true,
      media: [
        { film: 'assets/earring-box-loop.mp4', img: 'assets/earring-box-loop-poster.webp', alt: 'A slow move across gold drop earrings in the house box' },
        { img: 'assets/earring-box.webp', alt: 'Gold drop earrings in a maroon velvet box with the shop name in the lid' },
        { img: 'assets/earring-box-2.webp', alt: 'The open earring box from the side' }
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

    /* ---------- Chokers and long sets ---------- */
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
    }
  ]
};
