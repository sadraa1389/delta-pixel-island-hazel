export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type GenderTarget = "FEMININE" | "MASCULINE" | "UNISEX";

export type Concentration = "PARFUM" | "EDP" | "EDT" | "EDC" | "OIL";

export type FragranceFamily =
  | "FLORAL"
  | "WOODY"
  | "ORIENTAL"
  | "FRESH"
  | "CITRUS"
  | "GOURMAND"
  | "CHYPRE"
  | "FOUGERE";

export type Brand = {
  id: string;
  slug: string;
  name: string;
  nameFa: string;
  description: string | null;
  country: string | null;
  logoUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  nameFa: string;
  description: string | null;
  parentId: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductImage = {
  id: string;
  productId: string;
  url: string;
  alt: string | null;
  sortOrder: number;
};

export type Product = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  nameFa: string;
  description: string | null;
  brandId: string;
  categoryId: string;
  concentration: Concentration;
  genderTarget: GenderTarget;
  fragranceFamily: FragranceFamily | null;
  volumeMl: number;
  priceAmount: number;
  compareAmount: number | null;
  stockQty: number;
  status: ProductStatus;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  coverUrl: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
