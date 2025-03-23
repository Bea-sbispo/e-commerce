"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ProductPageSkeleton() {
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
        <div className="space-y-4">
          <div className="bg-muted relative aspect-square overflow-hidden rounded-lg border">
            <Skeleton className="size-full" />{" "}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-8 w-3/4" />
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="size-5" /> // Skeleton para as estrelas
              ))}
              <Skeleton className="ml-2 h-4 w-16" />{" "}
            </div>
          </div>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-center gap-2">
                <Skeleton className="size-5" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
          <Tabs.Root defaultValue="description">
            <Tabs.List className="w-full justify-start rounded-none border-b">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </Tabs.List>
            <Tabs.Content value="description" className="pt-6">
              <div className="prose max-w-none">
                <Skeleton className="h-4 w-full" />{" "}
                <Skeleton className="h-4 w-3/4" />
              </div>
            </Tabs.Content>
            <Tabs.Content value="specifications" className="pt-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex border-b pb-2">
                    <Skeleton className="h-4 w-1/3" />{" "}
                    <Skeleton className="h-4 w-2/3" />{" "}
                  </div>
                ))}
              </div>
            </Tabs.Content>
            <Tabs.Content value="reviews" className="pt-6">
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border-b pb-6">
                    <div className="mb-2 flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />{" "}
                      <Skeleton className="h-4 w-16" />{" "}
                    </div>
                    <div className="mb-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-4 w-4" /> // Skeleton para as estrelas
                      ))}
                    </div>
                    <Skeleton className="h-4 w-full" />{" "}
                    <Skeleton className="h-4 w-3/4" />{" "}
                  </div>
                ))}
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}
