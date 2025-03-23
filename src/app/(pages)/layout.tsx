"use client";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import { useCategories } from "@/helpers/use-categories";
import React from "react";
import { useCart } from "./cart/CartContext";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { cartItems } = useCart();
  const { categories } = useCategories();
  return (
    <>
      <Nav cartItems={cartItems} categories={categories} />
      <main className="container mx-auto py-10">{children}</main>
      <Footer />
    </>
  );
}
