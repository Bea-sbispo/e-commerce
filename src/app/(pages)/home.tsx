"use client";

import ProductCard from "@/components/product-card/product-card";
import SideNav from "@/components/side-nav";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <div className="flex flex-col gap-y-10">
      {/* Banner */}

      <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
        <div className="bg-muted/50 absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Summer Collection 2025
          </h1>
          <p className="mb-6 max-w-2xl text-lg md:text-xl">
            Discover our latest arrivals with up to 40% off on selected items
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            Shop Now
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
        {/* Categories Sidebar */}
        <SideNav
          className="md:col-span-1"
          onCategorySelect={handleCategorySelect}
        />
        {/* Products Grid */}
        <div className="md:col-span-3 lg:col-span-4">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Featured Products
              </h1>
              <p className="text-muted-foreground">
                Browse our latest collection of high-quality products.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
              <ProductCard selectedCategory={selectedCategory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
