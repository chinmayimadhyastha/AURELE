import product1 from "../assets/product-1.jpg";
import product2 from "../assets/product-2.jpg";
import product3 from "../assets/product-3.jpg";
import product4 from "../assets/product-4.jpg";
import product5 from "../assets/product-5.jpg";
import product6 from "../assets/product-6.jpg";
import product7 from "../assets/product-7.jpg";
import product8 from "../assets/product-8.jpg";
import product9 from "../assets/product-9.jpg";
import product10 from "../assets/product-10.jpg";
import product11 from "../assets/product-11.jpg";
import product12 from "../assets/product-12.jpg";

const imageMap: Record<string, string> = {
  "/product-1.jpg": product1,
  "/product-2.jpg": product2,
  "/product-3.jpg": product3,
  "/product-4.jpg": product4,
  "/product-5.jpg": product5,
  "/product-6.jpg": product6,
  "/product-7.jpg": product7,
  "/product-8.jpg": product8,
  "/product-9.jpg": product9,
  "/product-10.jpg": product10,
  "/product-11.jpg": product11,
  "/product-12.jpg": product12,
};

export const getProductImage = (imageUrl: string) => {
  return imageMap[imageUrl] || product1;
};

export const specLabels: Record<string, string> = {
  material: "Material",
  dimensions: "Dimensions",
  movement: "Movement",
  case: "Case",
  diameter: "Diameter",
  strap: "Strap",
  water_resistance: "Water Resistance",
  warranty: "Warranty",
};