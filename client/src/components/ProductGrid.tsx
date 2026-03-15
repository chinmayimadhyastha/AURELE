import { motion } from "framer-motion";
import { ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getProductImage } from "@/lib/products";
import api from "../integrations/api/client";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;
  mood?: string;
};

const ProductGrid = () => {
  const { addItem } = useCart();
  const { toggle, isLiked } = useWishlist();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image_url,
    });

    toast.success(`${product.name} added to cart`);
  };

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
            Curated Selection
          </p>

          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Featured <span className="text-gradient-gold italic">Pieces</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-card mb-4">
                <img
                  src={getProductImage(product.image_url)}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300" />

                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => toggle(product._id)}
                    className={`w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center transition-colors ${
                      isLiked(product._id)
                        ? "text-red-500"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {isLiked(product._id) ? (
                      <Heart size={18} className="fill-red-500 text-red-500" />
                    ) : (
                      <Heart size={18} />
                    )}
                  </button>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 text-xs font-body tracking-wider uppercase bg-card/80 backdrop-blur text-foreground rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-lg font-semibold mb-1">
                {product.name}
              </h3>

              <p className="text-primary font-body font-medium">
                ${product.price.toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;