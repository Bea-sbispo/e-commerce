"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { CartItem } from "@/types/globals";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount20") {
      setDiscount(20);
      setIsPromoApplied(true);
    } else {
      setDiscount(0);
      setIsPromoApplied(false);
      alert("Invalid promo code");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;

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

      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 space-y-6">
          <div className="flex justify-center">
            <ShoppingCart className="h-24 w-24 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Looks like you havent added anything to your cart yet. Browse our
            products and find something youll love!
          </p>
          <Link href="/">
            <Button size="lg" className="mt-4">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground mb-2 px-4">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>

            {cartItems.map((item: CartItem) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 space-y-4 md:space-y-0 md:grid md:grid-cols-12 md:gap-4 md:items-center"
              >
                <div className="md:col-span-6 flex items-center gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-500 hover:text-red-700 inline-flex items-center mt-1 md:hidden"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                  <span className="text-sm font-medium md:hidden">Price:</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>

                <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                  <span className="text-sm font-medium md:hidden">
                    Quantity:
                  </span>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-muted"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-muted"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 flex items-center justify-between md:justify-end">
                  <span className="text-sm font-medium md:hidden">
                    Subtotal:
                  </span>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="hidden md:flex md:col-span-12 md:justify-end">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 hover:text-red-700 inline-flex items-center"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 space-y-6 sticky top-20">
              <h2 className="text-xl font-semibold">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Promo Code</div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={isPromoApplied}
                    />
                    <Button
                      variant="outline"
                      onClick={applyPromoCode}
                      disabled={isPromoApplied || !promoCode}
                    >
                      Apply
                    </Button>
                  </div>
                  {isPromoApplied && (
                    <p className="text-sm text-green-600">
                      Promo code applied successfully!
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Try &quot;DISCOUNT20&quot; for $20 off your order
                  </p>
                </div>

                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Secure checkout powered by Stripe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
