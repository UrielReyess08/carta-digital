"use client"

import React from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export const CategoryFilter = React.memo(({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border py-3 -mx-4 px-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2">
          <button
            onClick={() => onSelectCategory(null)}
            className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
              selectedCategory === null
                ? "bg-primary text-primary-foreground shadow-md scale-105"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
})

CategoryFilter.displayName = "CategoryFilter"
