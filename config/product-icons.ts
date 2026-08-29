import type { ProductSlug } from "@/types";

export interface ProductIconSet {
  primary: string;
  windows?: string;
  android?: string;
}

export const productIcons: Partial<Record<ProductSlug, ProductIconSet>> = {
  tracelens: {
    primary: "/images/products/tracelens-windows.png",
    windows: "/images/products/tracelens-windows.png",
  },
  nigrani: {
    primary: "/images/products/nigrani-windows.png",
    windows: "/images/products/nigrani-windows.png",
  },
  kartavyanama: {
    primary: "/images/products/kartavyanama-android.png",
    android: "/images/products/kartavyanama-android.png",
  },
  ems: {
    primary: "/images/products/ems-android.png",
    windows: "/images/products/ems-android.png",
  },
};
