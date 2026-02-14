import React from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { MenuItem } from "@/lib/menu-data"
import { ProductActionButtons } from "@/components/product-action-buttons"

interface SelectedProduct {
  id: string
  name: string
  price: number
  quantity: number
  category?: string
  milkType?: "Lactosa" | "Deslactosada"
  temperature?: "Frío" | "Tibio" | "Caliente"
  sweetener?: "Azúcar" | "Stevia"
}

interface ProductCardProps {
  product: MenuItem
  selectedProducts: Map<string, SelectedProduct>
  likedProducts: Set<string>
  totalItems: number
  maxTotalItems: number
  isPriorityImage?: boolean
  getProductKey: (productId: string, milkType?: string, temperature?: string, sweetener?: string, sugarSpoons?: number) => string
  onSelectProduct: (product: MenuItem) => void
  onIncreaseQuantity: (key: string) => void
  onDecreaseQuantity: (key: string) => void
  onToggleLike: (productId: string) => void
  onPushEvent: (eventName: string, params: Record<string, any>) => void
}

export const ProductCard = React.memo(({
  product,
  selectedProducts,
  likedProducts,
  totalItems,
  maxTotalItems,
  isPriorityImage = false,
  getProductKey,
  onSelectProduct,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onToggleLike,
  onPushEvent,
}: ProductCardProps) => {
  const selected = Array.from(selectedProducts.values()).find(
    (item) => item.id === product.id
  )
  const isSelected = Boolean(selected)
  const isSnackOrAdditional = product.category === "SNACKS" || product.category === "ADICIONALES"
  const hasOptions = Boolean(product.sweetenerOptions?.length || product.temperatureOptions?.length || product.category.includes("SMOOTHIES") || isSnackOrAdditional)
  const canSelect = (!isSelected && totalItems < maxTotalItems) || (isSelected && hasOptions)

  return (
    <Card
      key={product.id}
      className={`!p-0 overflow-hidden transition-all border-2 flex flex-col relative ${
        isSelected
          ? hasOptions ? "border-primary bg-primary/5 shadow-lg scale-[1.02] hover:shadow-lg cursor-pointer" : "border-primary bg-primary/5 shadow-lg scale-[1.02]"
          : canSelect
            ? "border-border hover:border-primary hover:shadow-md hover:scale-[1.02] cursor-pointer"
            : "border-border opacity-50 cursor-not-allowed"
      }`}
    >
      {/* Imagen del Producto */}
      {product.image ? (
        <div 
          className="relative w-full aspect-square bg-gradient-to-br from-yellow-50 to-orange-50 overflow-hidden"
          onClick={() => canSelect && onSelectProduct(product)}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            priority={isPriorityImage}
            className="object-cover"
          />
          {/* Botón de Like */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleLike(product.id)
            }}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all z-10"
            aria-label={`Like ${product.name}`}
          >
            <Heart
              className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                likedProducts.has(product.id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400"
              }`}
            />
          </button>
        </div>
      ) : (
        <div 
          className="relative w-full aspect-square bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center"
          onClick={() => canSelect && onSelectProduct(product)}
        >
          <span className="text-4xl">☕</span>
          {/* Botón de Like */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleLike(product.id)
            }}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all z-10"
            aria-label={`Like ${product.name}`}
          >
            <Heart
              className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                likedProducts.has(product.id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400"
              }`}
            />
          </button>
        </div>
      )}

      {/* Información del Producto */}
      <div className="p-3 flex flex-col gap-2">
        <div>
          <h4 className="font-semibold text-sm md:text-base text-foreground line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h4>
          <p className="text-xl md:text-2xl font-bold text-primary mt-1">
            S/.{product.price.toFixed(2)}
          </p>
        </div>

        <div className="mt-auto">
          <ProductActionButtons
            product={product}
            selectedProducts={selectedProducts}
            getProductKey={getProductKey}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
          />
        </div>
      </div>
    </Card>
  )
})

ProductCard.displayName = "ProductCard"
