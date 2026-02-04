"use client"

import React from "react"
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
    <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border py-4 -mx-4 px-4 mt-2">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 pb-1">
          <button
            onClick={() => onSelectCategory(null)}
            className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-all ${
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
              className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-md scale-105"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
})

CategoryFilter.displayName = "CategoryFilter"
