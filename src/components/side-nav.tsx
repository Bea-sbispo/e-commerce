"use client";
import { useCategories } from "@/helpers/use-categories";
import { Category } from "@/types/globals";
import Link from "next/link";
import { Accordion } from "./ui/accordion";

interface SideNavProps {
  className: string;
  onCategorySelect?: (category: string) => void;
}

export default function SideNav({ className, onCategorySelect }: SideNavProps) {
  const { categories } = useCategories();
  return (
    <div className={className}>
      <div className="sticky top-20 space-y-6">
        <div className="w-full">
          <div className="space-y-2">
            <Accordion.Root type="single" collapsible>
              <Accordion.Item value="categories">
                <Accordion.Trigger>
                  <h2 className="mb-4 text-xl font-semibold">Categories</h2>
                </Accordion.Trigger>
                <Accordion.Content className="space-y-3">
                  {categories.map((category: Category) => (
                    <Link
                      key={category.slug}
                      onClick={() =>
                        onCategorySelect && onCategorySelect(category.slug)
                      }
                      href="#"
                      className="text-muted-foreground hover:text-foreground block"
                    >
                      {category.name}
                    </Link>
                  ))}
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
