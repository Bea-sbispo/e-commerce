"use client";
import { useAuth } from "@/helpers/use-auth";
import { CartItem, Category } from "@/types/globals";
import {
  Heart,
  LogOut,
  ShoppingCart,
  SquareMenu,
  User,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { DropdownMenu } from "./ui/dropdown-menu";

interface NavProps {
  cartItems: CartItem[];
  categories: Category[];
}

export default function Nav({ cartItems, categories }: NavProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { user, logOut } = useAuth();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full border-b px-8 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          ShopNow
        </Link>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="text-foreground hover:text-foreground/80 transition-colors"
            >
              Home
            </Link>
            <Link
              href="#"
              className="hover:text-foreground/80 transition-colors"
            >
              Shop
            </Link>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Link
                  href="#"
                  className="hover:text-foreground/80 transition-colors"
                >
                  Categories
                </Link>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content
                className="grid w-dvw grid-cols-4 gap-6 p-8"
                sideOffset={5}
                align="start"
              >
                {categories.map((categorie) => (
                  <DropdownMenu.Item key={categorie.slug}>
                    {categorie.name}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            <Link
              href="/about"
              className="hover:text-foreground/80 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-foreground/80 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="size-5" />
              {totalItems > 0 && (
                <Badge className="absolute top-2 -right-2 flex size-5 items-center justify-center rounded-full p-0">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <Link href="/favorites">
            <Button variant="outline" size="icon">
              <Heart className="size-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="border-input bg-background hover:bg-accent hover:text-accent-foreground flex rounded-md border p-2 shadow-xs lg:hidden">
              <SquareMenu className="size-5" />
              <span className="sr-only">Categories</span>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              className="grid w-dvw grid-cols-2 gap-4 p-8"
              sideOffset={5}
              align="start"
            >
              {categories.map((categorie: Category) => (
                <DropdownMenu.Item key={categorie.slug}>
                  {categorie.name}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md border p-2 shadow-xs">
              <User className="size-5" />
              <span className="sr-only">Profile</span>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              className="flex w-fit flex-col p-3"
              align="end"
              side="bottom"
            >
              {user ? (
                <>
                  <DropdownMenu.Item>
                    <Link href="/profile" className="flex gap-2">
                      <User2Icon />
                      Profile
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <Button onClick={() => logOut()} className="flex gap-2">
                      <LogOut />
                      Logout
                    </Button>
                  </DropdownMenu.Item>
                </>
              ) : (
                <DropdownMenu.Item>
                  <Link href="/auth">Login</Link>
                </DropdownMenu.Item>
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
}
