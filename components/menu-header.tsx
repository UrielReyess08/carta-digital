import React from "react"
import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MenuHeaderProps {
  totalItems: number
}

export const MenuHeader = React.memo(({ totalItems }: MenuHeaderProps) => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b-2 border-primary shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="logo-el-vikingo-.png"
              alt="El Vikingo Coffee Bike"
              className="h-14 w-14 object-contain transform scale-290"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">El Vikingo</h1>
              <p className="text-sm text-muted-foreground">Coffee Bike Menú Digital</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-primary" />
            <Badge className="text-base px-3 py-1 bg-primary text-white">
              {totalItems} / 12
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
})

MenuHeader.displayName = "MenuHeader"
