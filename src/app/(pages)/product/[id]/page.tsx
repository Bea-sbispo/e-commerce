"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs } from "@/components/ui/tabs";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types/globals";
import {
  ArrowLeft,
  Heart,
  RotateCcw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useCart } from "../../cart/CartContext";
import { useFavorites } from "../../favorites/FavoritesContext";
import { ProductPageSkeleton } from "../product-page-skeleton";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = use(params);
  const productId = Number(id);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isFavorited = isFavorite(productId);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;

    async function fetchData() {
      setLoading(true);
      const productData = await fetchProducts(productId);
      setProduct(productData);
      setLoading(false);
    }

    fetchData();
  }, [productId]);

  if (!product) {
    return <ProductPageSkeleton />;
  }

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        {loading ? (
          <ProductPageSkeleton />
        ) : (
          <>
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-muted relative aspect-square overflow-hidden rounded-lg border">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <p className="text-xs uppercase">{product.category}</p>
                </div>
                <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-500 text-yellow-500"
                            : "fill-muted stroke-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">
                      {product.rating} ({product.reviews?.length || 0} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </h1>

              <p>{product.description}</p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-base">
                    Quantity
                  </Label>
                  <Select.Root defaultValue="1">
                    <Select.Trigger className="w-24">
                      <Select.Value placeholder="Select." />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="1">1</Select.Item>
                      <Select.Item value="2">2</Select.Item>
                      <Select.Item value="3">3</Select.Item>
                      <Select.Item value="4">4</Select.Item>
                      <Select.Item value="5">5</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Button size="lg" onClick={() => addToCart(product)}>
                    <ShoppingCart className="mr-2 size-5" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleFavoriteClick}
                  >
                    <Heart
                      className={`size-4 ${
                        isFavorited
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground"
                      }`}
                    />
                    Add to Wishlist
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-3">
                <div className="flex items-center justify-center gap-2">
                  <Truck className="text-muted-foreground h-5 w-5" />
                  <span className="text-sm">{product.shippingInformation}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <RotateCcw className="text-muted-foreground h-5 w-5" />
                  <span className="text-sm">{product.returnPolicy}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Shield className="text-muted-foreground h-5 w-5" />
                  <span className="text-sm">{product.warrantyInformation}</span>
                </div>
              </div>

              <Tabs.Root defaultValue="description">
                <Tabs.List className="w-full justify-start rounded-none border-b">
                  <Tabs.Trigger value="description">Description</Tabs.Trigger>
                  <Tabs.Trigger value="specifications">
                    Specifications
                  </Tabs.Trigger>
                  <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="description" className="pt-6">
                  <div className="prose max-w-none">
                    <p>{product.description}</p>
                  </div>
                </Tabs.Content>
                <Tabs.Content value="specifications" className="pt-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex border-b pb-2">
                      <span className="w-1/3 font-medium">Brand</span>
                      <span className="w-2/3">{product.brand}</span>
                    </div>
                    <div className="flex border-b pb-2">
                      <span className="w-1/3 font-medium">SKU</span>
                      <span className="w-2/3">{product.sku}</span>
                    </div>
                    <div className="flex border-b pb-2">
                      <span className="w-1/3 font-medium">Weight</span>
                      <span className="w-2/3">{product.weight} kg</span>
                    </div>
                    <div className="flex border-b pb-2">
                      <span className="w-1/3 font-medium">Dimensions</span>
                      <span className="w-2/3">
                        {product.dimensions.width} x {product.dimensions.height}{" "}
                        x {product.dimensions.depth} cm
                      </span>
                    </div>
                  </div>
                </Tabs.Content>
                <Tabs.Content value="reviews" className="pt-6">
                  <div className="space-y-6">
                    {product.reviews?.map((review, index) => {
                      const formattedDate = new Date(
                        review.date,
                      ).toLocaleDateString("pt-BR", {
                        month: "2-digit",
                        year: "numeric",
                      });
                      return (
                        <div key={index} className="border-b pb-6">
                          <div className="mb-2 flex items-center justify-between">
                            <div className="font-medium">
                              {review.reviewerName}
                            </div>
                            <div className="text-muted-foreground text-sm">
                              {formattedDate}
                            </div>
                          </div>
                          <div className="mb-2 flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-500 text-yellow-500"
                                    : "fill-muted stroke-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                      );
                    })}
                    {(!product.reviews || product.reviews.length === 0) && (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">
                          No reviews yet. Be the first to review this product!
                        </p>
                      </div>
                    )}
                  </div>
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
