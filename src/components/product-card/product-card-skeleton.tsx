"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card.Root className="overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Skeleton className="h-full w-full" /> {/* Skeleton para a imagem */}
      </div>
      <Card.Content className="p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" /> {/* Skeleton para a categoria */}
          <Skeleton className="h-4 w-10" /> {/* Skeleton para a avaliação */}
        </div>
        <Skeleton className="h-6 w-3/4 mt-2" /> {/* Skeleton para o título */}
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-4 w-16" /> {/* Skeleton para o preço */}
        </div>
      </Card.Content>
      <Card.Footer className="p-4 pt-0 flex flex-col gap-2">
        <Skeleton className="h-10 w-full" /> {/* Skeleton para o botão */}
        <Skeleton className="h-10 w-full" /> {/* Skeleton para o botão */}
      </Card.Footer>
    </Card.Root>
  );
}
