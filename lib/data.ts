export type Swatch = { name: string; hex: string; tint?: string };

export type Product = {
  id: string;
  name: string;
  category: "Outerwear" | "Dresses" | "Tailoring" | "Leather goods";
  price: number;
  material: string;
  description: string;
  colors: Swatch[];
  image: { id: string; alt: string; position?: string };
  look?: string;
  tall?: boolean;
};

export const categories = ["All", "Outerwear", "Dresses", "Tailoring", "Leather goods"] as const;

export const products: Product[] = [
  {
    id: "nocturne-coat",
    name: "Nocturne Wool Coat",
    category: "Outerwear",
    price: 2450,
    material: "100% virgin wool, silk satin lining",
    description: "A sculpted, dropped-shoulder coat cut from double-faced Biella wool, finished by hand in our atelier.",
    colors: [
      { name: "Noir", hex: "#141014" },
      { name: "Bordeaux", hex: "#6e1630", tint: "#6e1630" },
      { name: "Camel", hex: "#b78457", tint: "#b78457" },
    ],
    image: { id: "1587115924362-622c3fa065bd", alt: "Model in the Nocturne wool coat, photographed in black and white", position: "50% 30%" },
    look: "look-01",
    tall: true,
  },
  {
    id: "velours-slip",
    name: "Velours Slip Dress",
    category: "Dresses",
    price: 1280,
    material: "Silk velvet, French lace trim",
    description: "A bias-cut slip in silk velvet that catches light like dark wine. Adjustable straps, hidden side zip.",
    colors: [
      { name: "Noir", hex: "#141014" },
      { name: "Bordeaux", hex: "#6e1630", tint: "#6e1630" },
      { name: "Plum", hex: "#4a1f4f", tint: "#4a1f4f" },
    ],
    image: { id: "1770294759013-a5784266a817", alt: "Model in a black velvet slip dress on a deep red velvet chair", position: "55% 40%" },
    look: "look-02",
  },
  {
    id: "atelier-pinstripe",
    name: "Atelier Pinstripe Suit",
    category: "Tailoring",
    price: 2190,
    material: "Super 120s wool, horn buttons",
    description: "A softly structured double-breasted jacket with a wide-leg trouser. Sold as a set; tailoring included.",
    colors: [
      { name: "Graphite", hex: "#2c2a2e" },
      { name: "Noir", hex: "#141014", tint: "#141014" },
    ],
    image: { id: "1771072428200-22ed7a3b801a", alt: "Model in a pinstripe suit against warm amber wood panels", position: "50% 30%" },
    look: "look-03",
    tall: true,
  },
  {
    id: "plisse-gown",
    name: "Bordeaux Plissé Gown",
    category: "Dresses",
    price: 2350,
    material: "Silk chiffon, hand-pleated",
    description: "A sweeping gown of hand-pleated silk chiffon with a plunging neckline and a high thigh split.",
    colors: [
      { name: "Bordeaux", hex: "#6e1630" },
      { name: "Noir", hex: "#141014", tint: "#2a2228" },
    ],
    image: { id: "1651676642296-f7339117ec15", alt: "Model in a flowing bordeaux pleated gown by the water", position: "50% 30%" },
  },
  {
    id: "camel-trench",
    name: "Belted Wrap Trench",
    category: "Outerwear",
    price: 2250,
    material: "Cashmere-wool gabardine",
    description: "Our long trench reimagined without buttons: wrap, belt and walk. Storm flap and deep slash pockets.",
    colors: [
      { name: "Camel", hex: "#b78457" },
      { name: "Noir", hex: "#141014", tint: "#1c1619" },
      { name: "Bordeaux", hex: "#6e1630", tint: "#6e1630" },
    ],
    image: { id: "1539533113208-f6df8cc8b543", alt: "Model in a belted camel wrap trench against a stone wall", position: "50% 40%" },
    look: "look-05",
  },
  {
    id: "satin-gown",
    name: "Champagne Bias Gown",
    category: "Dresses",
    price: 2890,
    material: "Heavy silk satin",
    description: "A floor-length bias gown with a draped cowl back, cut from a single length of satin.",
    colors: [
      { name: "Champagne", hex: "#e9d3bd" },
      { name: "Rose", hex: "#c2707a", tint: "#c2707a" },
    ],
    image: { id: "1664076458686-3449062080ac", alt: "Model in a champagne silk satin gown and long black gloves", position: "50% 30%" },
    tall: true,
  },
  {
    id: "fur-bomber",
    name: "Bordeaux Plush Bomber",
    category: "Outerwear",
    price: 1980,
    material: "Recycled faux fur, satin lining",
    description: "An oversized plush bomber in our signature bordeaux, worn over tailoring or slip dresses.",
    colors: [
      { name: "Bordeaux", hex: "#6e1630" },
      { name: "Noir", hex: "#141014", tint: "#1c1619" },
    ],
    image: { id: "1790384071619-de00d80547ac", alt: "Model in a plush bordeaux faux-fur jacket and wide trousers", position: "50% 35%" },
  },
  {
    id: "midnight-silk",
    name: "Midnight Silk Dress",
    category: "Dresses",
    price: 1450,
    material: "Silk charmeuse",
    description: "A sleeveless column with a high neck, falling just below the knee. Fully lined in silk.",
    colors: [
      { name: "Midnight", hex: "#1d2240" },
      { name: "Bordeaux", hex: "#6e1630", tint: "#6e1630" },
    ],
    image: { id: "1704775989614-8435994e4e97", alt: "Model in a midnight silk dress against a maroon backdrop", position: "50% 30%" },
    look: "look-04",
  },
  {
    id: "slouch-boot",
    name: "Sculpted Slouch Boot",
    category: "Leather goods",
    price: 1150,
    material: "Nappa calf leather, leather sole",
    description: "A soft, gathered knee boot on a sculpted 70mm heel. Made in the Riviera del Brenta.",
    colors: [
      { name: "Noir", hex: "#141014" },
      { name: "Bordeaux", hex: "#6e1630", tint: "#6e1630" },
    ],
    image: { id: "1763661300203-aa3e2702f510", alt: "Pair of black slouch leather boots" },
  },
  {
    id: "pli-bag",
    name: "Le Pli Bag",
    category: "Leather goods",
    price: 2100,
    material: "Box calf, palladium hardware",
    description: "Our signature folded-flap bag with a hidden magnetic closure and a removable shoulder chain.",
    colors: [
      { name: "Noir", hex: "#141014" },
      { name: "Bordeaux", hex: "#6e1630", tint: "#6e1630" },
      { name: "Ivory", hex: "#efe4d8", tint: "#efe4d8" },
    ],
    image: { id: "1614179689702-355944cd0918", alt: "Black structured leather handbag with silver hardware" },
  },
  {
    id: "atelier-blazer",
    name: "Atelier Blazer",
    category: "Tailoring",
    price: 1690,
    material: "Wool grain de poudre",
    description: "A sharp single-breasted blazer with a nipped waist and pick-stitched lapels.",
    colors: [
      { name: "Noir", hex: "#141014" },
      { name: "Ivory", hex: "#efe4d8", tint: "#d8c4b0" },
    ],
    image: { id: "1613915617430-8ab0fd7c6baf", alt: "Model in a tailored blazer and trousers, black and white", position: "50% 30%" },
    look: "look-06",
  },
  {
    id: "satin-cocktail",
    name: "Off-Shoulder Satin Dress",
    category: "Dresses",
    price: 1190,
    material: "Duchess satin",
    description: "A fitted cocktail dress with a sculpted off-shoulder neckline and a soft back slit.",
    colors: [
      { name: "Noir", hex: "#141014" },
      { name: "Plum", hex: "#4a1f4f", tint: "#4a1f4f" },
    ],
    image: { id: "1765870974280-ca1fc4642bd7", alt: "Model in a black off-shoulder satin dress in a candlelit room", position: "50% 30%" },
  },
];

export const looks = [
  {
    id: "look-01",
    number: "01",
    title: "First light",
    image: { id: "1580478491436-fd6a937acc9e", alt: "Look 01: bordeaux blazer worn with leather gloves on a marble stair" },
    pieces: ["nocturne-coat", "atelier-blazer", "slouch-boot"],
  },
  {
    id: "look-02",
    number: "02",
    title: "Rouge",
    image: { id: "1651676642130-ebfb3bcf7bf9", alt: "Look 02: flowing bordeaux gown among winter trees" },
    pieces: ["plisse-gown", "pli-bag"],
  },
  {
    id: "look-03",
    number: "03",
    title: "Amber room",
    image: { id: "1771072428365-f0f97d0d25b7", alt: "Look 03: pinstripe suit, seated against amber wood" },
    pieces: ["atelier-pinstripe", "slouch-boot"],
  },
  {
    id: "look-04",
    number: "04",
    title: "Midnight",
    image: { id: "1775510110570-ba88af9ab956", alt: "Look 04: black evening dress on a balcony at dusk" },
    pieces: ["midnight-silk", "pli-bag"],
  },
  {
    id: "look-05",
    number: "05",
    title: "Long walk home",
    image: { id: "1668952135120-7d997b1b3778", alt: "Look 05: long tonal coat and trousers in the studio" },
    pieces: ["camel-trench", "atelier-blazer"],
  },
  {
    id: "look-06",
    number: "06",
    title: "Red velvet",
    image: { id: "1779675789749-90eaee4c9152", alt: "Look 06: oversized red tailoring against blue velvet curtains" },
    pieces: ["fur-bomber", "velours-slip"],
  },
  {
    id: "look-07",
    number: "07",
    title: "Satin after dark",
    image: { id: "1765870973643-c0f5ed637325", alt: "Look 07: black satin dress and heels in a dim bar" },
    pieces: ["satin-cocktail", "slouch-boot"],
  },
  {
    id: "look-08",
    number: "08",
    title: "Veil",
    image: { id: "1775829102400-e6833b56a454", alt: "Look 08: black dress and birdcage veil, black and white portrait" },
    pieces: ["satin-gown", "pli-bag"],
  },
];

export const journal = [
  {
    category: "Atelier",
    title: "Seventy-two hours, one coat",
    excerpt:
      "From the first chalk line to the last hand-felled hem: inside the making of the Nocturne coat with head tailor Inès Morel.",
    read: "8 min read",
    image: { id: "1755214832310-074c4cc45372", alt: "Close-up of a grey wool belt tied in a soft knot" },
  },
  {
    category: "Materials",
    title: "Notes on velvet",
    excerpt: "Why silk velvet behaves like light — and why we only weave it in the colour of wine.",
    read: "5 min read",
    image: { id: "1705493254146-710211d851fa", alt: "Close-up of warm brown and tan woven fabric" },
  },
  {
    category: "Campaign",
    title: "Nocturne, in twelve frames",
    excerpt: "Photographer Léa Vasseur on shooting the collection between midnight and dawn across Paris.",
    read: "6 min read",
    image: { id: "1558769132-cb1aea458c5e", alt: "Garments in neutral tones hanging on a wooden rail" },
  },
];

export const campaign = [
  { id: "1662532577856-e8ee8b138a8b", alt: "Model in head-to-toe red against a saturated blue sky", caption: "Rouge, Paris" },
  { id: "1771072428200-22ed7a3b801a", alt: "Model in a pinstripe suit against amber wood", caption: "Amber room" },
  { id: "1775510139053-8e0e7c43cace", alt: "Model in a vintage-style dress and hat, black and white", caption: "Old Paris" },
  { id: "1779675788001-7e3930b888fc", alt: "Two models in red tailoring in a blue velvet room", caption: "Salon bleu" },
  { id: "1760337741510-1a4661e036fa", alt: "Four models posing against a deep red backdrop", caption: "Ensemble" },
  { id: "1617423851080-1181791aa20e", alt: "Silhouette of a figure against a pale wall", caption: "Shadow study" },
];

export function productById(id: string) {
  return products.find((p) => p.id === id);
}

export const euro = (n: number) => `€${n.toLocaleString("en-GB")}`;
