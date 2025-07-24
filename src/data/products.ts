export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  rating: number;
  stock: number;
}

// export const products: Product[] = [
//   {
//     id: "prod_01",
//     name: "Premium H&E Staining Kit",
//     description:
//       "Complete kit for high-quality Hematoxylin & Eosin staining with enhanced contrast and clarity.",
//     price: 129.99,
//     image: "/images/products/he-staining-kit.svg",
//     category: "staining",
//     featured: true,
//     rating: 4.8,
//     stock: 25,
//   },
//   {
//     id: "prod_02",
//     name: "Automated Slide Stainer",
//     description:
//       "Compact, efficient automated staining system for consistent results with minimal hands-on time.",
//     price: 3499.99,
//     image: "/images/products/slide-stainer.svg",
//     category: "equipment",
//     featured: true,
//     rating: 4.9,
//     stock: 5,
//   },
//   {
//     id: "prod_03",
//     name: "Eco-Friendly Clearing Agent",
//     description:
//       "Non-toxic, biodegradable clearing agent for tissue processing with reduced environmental impact.",
//     price: 89.99,
//     image: "/images/products/he-staining-kit.svg",
//     category: "reagents",
//     featured: false,
//     rating: 4.6,
//     stock: 40,
//   },
//   {
//     id: "prod_04",
//     name: "Advanced Mounting Media",
//     description:
//       "Quick-drying, non-yellowing mounting media for long-term slide preservation.",
//     price: 59.99,
//     image: "/images/products/he-staining-kit.svg",
//     category: "reagents",
//     featured: false,
//     rating: 4.7,
//     stock: 30,
//   },
//   {
//     id: "prod_05",
//     name: "Special Stains Kit - Connective Tissue",
//     description:
//       "Comprehensive kit for connective tissue staining including Masson's Trichrome and Elastic stains.",
//     price: 149.99,
//     image: "/images/products/special-stains-kit.svg",
//     category: "staining",
//     featured: true,
//     rating: 4.5,
//     stock: 15,
//   },
//   {
//     id: "prod_06",
//     name: "Digital Slide Scanner",
//     description:
//       "High-resolution slide scanner for digital pathology with cloud storage integration.",
//     price: 7999.99,
//     image: "/images/products/slide-stainer.svg",
//     category: "equipment",
//     featured: true,
//     rating: 4.9,
//     stock: 3,
//   },
//   {
//     id: "prod_07",
//     name: "Tissue Processor",
//     description:
//       "Efficient tissue processor with programmable protocols for consistent results.",
//     price: 5499.99,
//     image: "/images/products/slide-stainer.svg",
//     category: "equipment",
//     featured: false,
//     rating: 4.8,
//     stock: 4,
//   },
//   {
//     id: "prod_08",
//     name: "Immunohistochemistry Kit",
//     description:
//       "Complete IHC kit with primary antibodies, detection system, and controls.",
//     price: 299.99,
//     image: "/images/products/special-stains-kit.svg",
//     category: "staining",
//     featured: false,
//     rating: 4.7,
//     stock: 10,
//   },
// ];

// export const categories = [
//   { id: "staining", name: "Staining Solutions" },
//   { id: "equipment", name: "Laboratory Equipment" },
//   { id: "reagents", name: "Reagents & Chemicals" }
// ];

export const products: Product[] = [
  {
    id: "PRODUCT/PBS/001",
    name: "10X PHOSPHATE-BUFFERED SALINE (PBS)",
    description:
      "Phosphate buffered saline or PBS is a buffer solution commonly used in biological research.",
    price: 34.0,
    image: "/images/products/pbs/10x-pbs.jpg",
    category: "pbs",
    featured: true,
    rating: 4.8,
    stock: 34,
  },
  {
    id: "PRODUCT/PBS/002",
    name: "ANTI FREEZE SOLUTION 500ML",
    description:
      "Anti freeze solution (AFS) are used for long-term storage of unstained free-floating tissue sections.",
    price: 45.98,
    image: "/images/products/pbs/afs-500ml.jpg",
    category: "pbs",
    featured: false,
    rating: 4.8,
    stock: 12,
  },
  {
    id: "PRODUCT/PBS/003",
    name: "ANTI FREEZE SOLUTION 1000ML",
    description:
      "Anti freeze solution are used for long-term storage of unstained free-floating tissue sections.",
    price: 0,
    image: "/images/products/pbs/afs-1000ml.jpg",
    category: "pbs",
    featured: true,
    rating: 4.8,
    stock: 12,
  },
  {
    id: "PRODUCT/PBS/004",
    name: "10X TRIS-BUFFERED SALINE (TBS)",
    description:
      "Tris-buffered saline or TBS is a buffer solution commonly used in biological research. Our TBS can be use for Western blot and immunohistochemistry application.",
    price: 33.0,
    image: "/images/products/pbs/10x-tbs.jpg",
    category: "pbs",
    featured: false,
    rating: 4.8,
    stock: 25,
  },
  {
    id: "PRODUCT/PBS/005",
    name: "HEAT INDUCED EPITOPE RETRIEVAL (HIER)",
    description:
      "HIER solution is designed to break the protein cross-links, therefore unmask the antigens and epitope in formalin/aldehyde fixed tissue sections, thus enhancing intensity of antibodies.",
    price: 26.4,
    image: "/images/products/pbs/hier.jpg",
    category: "pbs",
    featured: false,
    rating: 4.8,
    stock: 15,
  },
  {
    id: "PRODUCT/PBS/006",
    name: "NEUTRAL BUFFERED FORMALIN",
    description:
      "10% neutral buffered formalin is a general histological tissue fixative.",
    price: 17.95,
    image: "/images/products/pbs/10-nfb-32-oz.jpg",
    category: "pbs",
    featured: false,
    rating: 4.8,
    stock: 42,
  },
  {
    id: "PRODUCT/PBS/007",
    name: "PARAFORMALDEHYDE, 4% IN PBS",
    description:
      "Paraformaldehyde (4% in PBS) is a general histological tissue fixative. Best for immunohistochemistry and electron microscope application.",
    price: 35.5,
    image: "/images/products/pbs/paraformaldehyde-4-in-pbs.jpg",
    category: "pbs",
    featured: true,
    rating: 4.8,
    stock: 51,
  },
];

export const categories = [
  { id: "pbs", name: "Phosphate Buffer Saline (PBS)" },
  { id: "afs", name: "Anti-Freeze Solution (AFS)" },
  { id: "tbs", name: "Tris-Buffer Saline (TBS)" },
  {
    id: "fixative",
    name: "Fixative Solution (10% Formalin & 4% Paraformaldehyde)",
  },
  { id: "embalming", name: "Embalming Solution" },
  { id: "staining", name: "Staining Solutions" },
  { id: "antigen", name: "Antigen Retrieval" },
  { id: "neutralizer", name: "Formalin Neutralizer" },
];
