import React from "react"
import { Badge } from "@/components/ui/badge"
import { Coffee } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { MenuItem } from "@/lib/menu-data"

interface SelectedProduct {
  id: string
  name: string
  price: number
  quantity: number
  category?: string
  milkType?: "Lactosa" | "Deslactosada"
  temperature?: "Frío" | "Caliente"
}

interface CategorySectionProps {
  category: string
  products: MenuItem[]
  isOpen: boolean
  isPrimaryCategory?: boolean
  selectedProducts: Map<string, SelectedProduct>
  likedProducts: Set<string>
  totalItems: number
  maxTotalItems: number
  getProductKey: (productId: string, milkType?: string, temperature?: string) => string
  onToggleCategory: (category: string) => void
  onSelectProduct: (product: MenuItem) => void
  onAddWithTemperature: (product: MenuItem, temperature: "Frío" | "Caliente") => void
  onAddWithMilkType: (product: MenuItem, milkType: "Lactosa" | "Deslactosada") => void
  onIncreaseQuantity: (key: string) => void
  onDecreaseQuantity: (key: string) => void
  onToggleLike: (productId: string) => void
  onPushEvent: (eventName: string, params: Record<string, any>) => void
}

export const CategorySection = React.memo(({
  category,
  products,
  isOpen,
  isPrimaryCategory = false,
  selectedProducts,
  likedProducts,
  totalItems,
  maxTotalItems,
  getProductKey,
  onToggleCategory,
  onSelectProduct,
  onAddWithTemperature,
  onAddWithMilkType,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onToggleLike,
  onPushEvent,
}: CategorySectionProps) => {
  return (
    <div key={category} className="border rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => onToggleCategory(category)}
        className="w-full text-left px-6 py-3 bg-yellow-300/80 hover:bg-yellow-300 font-bold flex items-center justify-between"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <Coffee className="w-5 h-5 text-primary" />
          <span>{category}</span>
          <Badge variant="secondary" className="ml-2">
            {products.length}
          </Badge>
        </div>
        <span className="text-sm">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="px-6 py-4 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((product, index) => {
              const isSmootie = product.category.includes("SMOOTHIES")
              // Para smoothies, check si existe cualquier variante (Lactosa o Deslactosada)
              // Para otros productos, check el id simple
              const hasAnyVariant = isSmootie && (
                selectedProducts.has(getProductKey(product.id, "Lactosa")) ||
                selectedProducts.has(getProductKey(product.id, "Deslactosada"))
              )
              const selected = selectedProducts.get(product.id) || (hasAnyVariant ? {} as SelectedProduct : undefined)
              const isSelected = Boolean(selected && Object.keys(selected).length > 0)
              const canSelect = !isSelected && totalItems < maxTotalItems
              // Priority para primeras 2 imágenes de categorías primarias
              const isPriorityImage = !!(isPrimaryCategory && index < 2 && product.image)

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  selectedProducts={selectedProducts}
                  likedProducts={likedProducts}
                  totalItems={totalItems}
                  maxTotalItems={maxTotalItems}
                  getProductKey={getProductKey}
                  isPriorityImage={isPriorityImage}
                  onSelectProduct={onSelectProduct}
                  onAddWithTemperature={onAddWithTemperature}
                  onAddWithMilkType={onAddWithMilkType}
                  onIncreaseQuantity={onIncreaseQuantity}
                  onDecreaseQuantity={onDecreaseQuantity}
                  onToggleLike={onToggleLike}
                  onPushEvent={onPushEvent}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
})

CategorySection.displayName = "CategorySection"
