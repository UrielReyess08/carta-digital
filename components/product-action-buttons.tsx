import React from "react"
import { Plus, Minus } from "lucide-react"
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

interface ProductActionButtonsProps {
  product: MenuItem
  selectedProducts: Map<string, SelectedProduct>
  getProductKey: (productId: string, milkType?: string, temperature?: string) => string
  onAddWithTemperature: (product: MenuItem, temperature: "Frío" | "Caliente") => void
  onAddWithMilkType: (product: MenuItem, milkType: "Lactosa" | "Deslactosada") => void
  onIncreaseQuantity: (key: string) => void
  onDecreaseQuantity: (key: string) => void
}

export const ProductActionButtons = React.memo(({
  product,
  selectedProducts,
  getProductKey,
  onAddWithTemperature,
  onAddWithMilkType,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: ProductActionButtonsProps) => {
  const isSinCafe = product.category.includes("SIN CAFÉ")
  const isSmootie = product.category.includes("SMOOTHIES")

  // Para SIN CAFÉ, check si existe cualquier variante
  const hasSinCafeVariant = isSinCafe && (
    selectedProducts.has(getProductKey(product.id, undefined, "Frío")) ||
    selectedProducts.has(getProductKey(product.id, undefined, "Caliente"))
  )

  // Para smoothies, check si existe cualquier variante
  const hasSmoothieVariant = isSmootie && (
    selectedProducts.has(getProductKey(product.id, "Lactosa")) ||
    selectedProducts.has(getProductKey(product.id, "Deslactosada"))
  )

  const selected = selectedProducts.get(product.id) || (hasSinCafeVariant || hasSmoothieVariant ? {} as SelectedProduct : undefined)
  const isSelected = Boolean(selected && Object.keys(selected).length > 0)

  // Si es SIN CAFÉ Y NO está seleccionado → mostrar botones de temperatura
  if (isSinCafe && !isSelected) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAddWithTemperature(product, "Frío")
          }}
          className="w-full h-9 px-2 bg-blue-100 hover:bg-blue-200 rounded-md text-xs md:text-sm font-semibold transition-colors"
        >
          Frío
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAddWithTemperature(product, "Caliente")
          }}
          className="w-full h-9 px-2 bg-red-100 hover:bg-red-200 rounded-md text-xs md:text-sm font-semibold transition-colors"
        >
          Caliente
        </button>
      </div>
    )
  }

  // Si es smoothie Y NO está seleccionado → mostrar botones de leche
  if (isSmootie && !isSelected) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAddWithMilkType(product, "Lactosa")
          }}
          className="w-full h-9 px-2 bg-blue-100 hover:bg-blue-200 rounded-md text-xs md:text-sm font-semibold transition-colors"
        >
          Lactosa
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAddWithMilkType(product, "Deslactosada")
          }}
          className="w-full h-9 px-2 bg-green-100 hover:bg-green-200 rounded-md text-xs md:text-sm font-semibold transition-colors"
        >
          Deslactosada
        </button>
      </div>
    )
  }

  // Si YA está seleccionado → mostrar controles +/-
  if (isSelected) {
    return (
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDecreaseQuantity(getProductKey(product.id, selected!.milkType, selected!.temperature))
            }}
            className="p-1.5 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
            aria-label={`Disminuir cantidad ${product.name}`}
          >
            <Minus className="w-3 h-3 md:w-4 md:h-4" />
          </button>
          <span className="font-bold text-sm md:text-base min-w-[20px] text-center">{selected!.quantity}</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onIncreaseQuantity(getProductKey(product.id, selected!.milkType, selected!.temperature))
            }}
            className="p-1.5 rounded-md bg-primary hover:bg-primary/90 text-white transition-colors"
            aria-label={`Aumentar cantidad ${product.name}`}
          >
            <Plus className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>
        <div className="text-xs md:text-sm font-semibold text-primary">
          S/.{(product.price * selected!.quantity).toFixed(2)}
        </div>
      </div>
    )
  }

  // Si NO es smoothie Y NO está seleccionado → botón de agregar
  return (
    <div className="w-full">
      <div className="text-xs md:text-sm text-center text-muted-foreground font-medium py-2 border border-dashed border-gray-300 rounded-md">
        Toca para agregar
      </div>
    </div>
  )
})

ProductActionButtons.displayName = "ProductActionButtons"
