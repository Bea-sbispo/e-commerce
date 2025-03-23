/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/types/globals";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { useCart } from "../cart/CartContext";
import { useFavorites } from "./FavoritesContext";

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
      {favorites.length === 0 ? (
        <div className="text-center py-16 space-y-6">
          <div className="flex justify-center">
            <Heart className="h-24 w-24 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold">Your favorites are empty</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Looks like you haven't added anything to your favorites yet. Browse
            our products and find something you'll love!
          </p>
          <Link href="/">
            <Button size="lg" className="mt-4">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {favorites.map((favorite: Product) => (
            <Card.Root key={favorite.id} className="overflow-hidden pt-0">
              <Link href={`/product/${favorite.id}`}>
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={favorite.thumbnail || "/placeholder.svg"}
                    alt={favorite.title}
                    className="w-full"
                  />
                </div>
                <Card.Content className="grid gap-2 p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-muted-foreground uppercase">
                      {favorite.category}
                    </p>
                    <Button
                      variant="ghost"
                      onClick={() => removeFromFavorites(favorite.id)}
                    >
                      <Heart className="size-6 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                  <h4 className="font-semibold text-md">{favorite.title}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="font-bold">${favorite.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Card.Content>
              </Link>
              <Card.Footer className="px-4 pt-0">
                <Button onClick={() => addToCart(favorite)} className="w-full">
                  Add to Cart
                </Button>
              </Card.Footer>
            </Card.Root>
          ))}
        </div>
      )}
    </div>
  );
}
