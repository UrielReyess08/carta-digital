"use client"

import React from "react"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FloatingCartButtonProps {
  totalItems: number
  onClick: () => void
}

export const FloatingCartButton = React.memo(({
  totalItems,
  onClick,
}: FloatingCartButtonProps) => {
  if (totalItems === 0) return null

  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce"
      aria-label="Ver carrito"
    >
      <ShoppingCart className="w-6 h-6" />
      <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground border-2 border-background min-w-[24px] h-6 flex items-center justify-center">
        {totalItems}
      </Badge>
    </button>
  )
})

FloatingCartButton.displayName = "FloatingCartButton"
