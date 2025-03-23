/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart } from "@/app/(pages)/cart/CartContext";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types/globals";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ProductCardSkeleton } from "./product-card-skeleton";

interface ProductCardProps {
  selectedCategory: string | null;
}

export default function ProductCard({ selectedCategory }: ProductCardProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const initialProducts = await fetchProducts();
      setProducts(initialProducts);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <>
      {loading ? (
        <>
          {[...Array(6)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </>
      ) : (
        <>
          {filteredProducts.map((product: Product) => (
            <Card.Root key={product.id} className="relative max-w-[250px] pt-0">
              <Card.Content className="grid gap-2 p-0">
                <Link href={`/product/${product.id}`}>
                  <div className="bg-muted aspect-square">
                    <img
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full max-w-[250px]"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center gap-2 px-4 py-2">
                    <h4 className="text-md line-clamp-1 font-semibold">
                      {product.title}
                    </h4>
                    <div className="flex items-center gap-0.5">
                      <span className="mr-2 text-xs font-medium">
                        ${product.rating.toFixed(1)}
                      </span>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-500 text-yellow-500"
                              : "fill-muted stroke-muted-foreground"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-xs font-medium">
                        ({product.reviews?.length || 0})
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center justify-between px-4">
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                  <Button
                    onClick={() => addToCart(product)}
                    className="p-0 hover:cursor-pointer"
                  >
                    <ShoppingCart className="h-3 w-3" />
                  </Button>
                </div>
              </Card.Content>
            </Card.Root>
          ))}
        </>
      )}
    </>
  );
}
