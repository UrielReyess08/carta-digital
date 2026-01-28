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
      <div className="flex flex-col gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAddWithTemperature(product, "Frío")
          }}
          className="w-[120px] h-8 px-2 bg-blue-100 hover:bg-blue-200 rounded text-sm font-semibold transition-colors"
        >
          Frío
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAddWithTemperature(product, "Caliente")
          }}
          className="w-[120px] h-8 px-2 bg-red-100 hover:bg-red-200 rounded text-sm font-semibold transition-colors"
        >
          Caliente
        </button>
      </div>
    )
  }

  // Si es smoothie Y NO está seleccionado → mostrar botones de leche
  if (isSmootie && !isSelected) {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAddWithMilkType(product, "Lactosa")
          }}
          className="w-[120px] h-8 px-2 bg-blue-100 hover:bg-blue-200 rounded text-sm font-semibold transition-colors"
        >
          Lactosa
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAddWithMilkType(product, "Deslactosada")
          }}
          className="w-[120px] h-8 px-2 bg-green-100 hover:bg-green-200 rounded text-sm font-semibold transition-colors"
        >
          Deslactosada
        </button>
      </div>
    )
  }

  // Si YA está seleccionado → mostrar controles +/-
  if (isSelected) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDecreaseQuantity(getProductKey(product.id, selected!.milkType, selected!.temperature))
            }}
            className="p-1 rounded bg-gray-100 hover:bg-gray-200"
            aria-label={`Disminuir cantidad ${product.name}`}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-semibold">{selected!.quantity}</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onIncreaseQuantity(getProductKey(product.id, selected!.milkType, selected!.temperature))
            }}
            className="p-1 rounded bg-gray-100 hover:bg-gray-200"
            aria-label={`Aumentar cantidad ${product.name}`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="text-sm text-muted-foreground">
          S/.{(product.price * selected!.quantity).toFixed(2)}
        </div>
      </div>
    )
  }

  // Si NO es smoothie Y NO está seleccionado → mensaje "Toca para agregar"
  return <span className="text-sm text-muted-foreground">Toca para agregar</span>
})

ProductActionButtons.displayName = "ProductActionButtons"
