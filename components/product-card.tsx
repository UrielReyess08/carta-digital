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
  temperature?: "Frío" | "Caliente"
}

interface ProductCardProps {
  product: MenuItem
  selectedProducts: Map<string, SelectedProduct>
  likedProducts: Set<string>
  totalItems: number
  maxTotalItems: number
  getProductKey: (productId: string, milkType?: string, temperature?: string) => string
  onSelectProduct: (product: MenuItem) => void
  onAddWithTemperature: (product: MenuItem, temperature: "Frío" | "Caliente") => void
  onAddWithMilkType: (product: MenuItem, milkType: "Lactosa" | "Deslactosada") => void
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
  getProductKey,
  onSelectProduct,
  onAddWithTemperature,
  onAddWithMilkType,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onToggleLike,
  onPushEvent,
}: ProductCardProps) => {
  const isSmootie = product.category.includes("SMOOTHIES")
  const hasAnyVariant = isSmootie && (
    selectedProducts.has(getProductKey(product.id, "Lactosa")) ||
    selectedProducts.has(getProductKey(product.id, "Deslactosada"))
  )
  const selected = selectedProducts.get(product.id) || (hasAnyVariant ? {} as SelectedProduct : undefined)
  const isSelected = Boolean(selected && Object.keys(selected).length > 0)
  const canSelect = !isSelected && totalItems < maxTotalItems

  return (
    <Card
      key={product.id}
      className={`p-4 transition-all border-2 flex flex-row items-start gap-3 relative ${
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : canSelect
            ? "border-border hover:border-primary hover:shadow-md hover:bg-card cursor-pointer"
            : "border-border opacity-40 cursor-not-allowed"
      }`}
      onClick={() => canSelect && onSelectProduct(product)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation()
          onToggleLike(product.id)
        }}
        className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-md transition-all z-10"
        aria-label={`Like ${product.name}`}
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            likedProducts.has(product.id)
              ? "fill-red-500 text-red-500"
              : "text-gray-400"
          }`}
        />
      </button>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-semibold text-foreground">{product.name}</h4>
          <p className="text-2xl font-bold text-primary">S/.{product.price.toFixed(2)}</p>
          {product.description && (
            <p className="text-xs text-muted-foreground mt-2 italic">{product.description}</p>
          )}
        </div>

        <div className="mt-3">
          <ProductActionButtons
            product={product}
            selectedProducts={selectedProducts}
            getProductKey={getProductKey}
            onAddWithTemperature={onAddWithTemperature}
            onAddWithMilkType={onAddWithMilkType}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
          />
        </div>
      </div>

      {/* Imagen a la DERECHA */}
      {product.image && (
        <Image 
          src={product.image}
          alt={product.name}
          width={120}
          height={120}
          className="w-30 h-30 object-cover rounded-lg flex-shrink-0"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Crect fill='%23f0f0f0' width='120' height='120'/%3E%3C/svg%3E"
        />
      )}
    </Card>
  )
})

ProductCard.displayName = "ProductCard"
