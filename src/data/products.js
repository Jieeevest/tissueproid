// ESM version of products.ts for import script

export const products = [
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