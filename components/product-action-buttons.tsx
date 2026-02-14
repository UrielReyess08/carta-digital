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
  temperature?: "Frío" | "Tibio" | "Caliente"
  sweetener?: "Azúcar" | "Stevia"
  sugarSpoons?: number
}

interface ProductActionButtonsProps {
  product: MenuItem
  selectedProducts: Map<string, SelectedProduct>
  getProductKey: (productId: string, milkType?: string, temperature?: string, sweetener?: string, sugarSpoons?: number) => string
  onIncreaseQuantity: (key: string) => void
  onDecreaseQuantity: (key: string) => void
}

export const ProductActionButtons = React.memo(({
  product,
  selectedProducts,
  getProductKey,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: ProductActionButtonsProps) => {
  const selected = Array.from(selectedProducts.values()).find(
    (item) => item.id === product.id
  )
  const isSelected = Boolean(selected)

  // Si YA está seleccionado → mostrar controles +/-
  if (isSelected) {
    return (
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDecreaseQuantity(getProductKey(product.id, selected!.milkType, selected!.temperature, selected!.sweetener, selected!.sugarSpoons))
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
              onIncreaseQuantity(getProductKey(product.id, selected!.milkType, selected!.temperature, selected!.sweetener, selected!.sugarSpoons))
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

  // Si NO está seleccionado → botón de agregar
  return (
    <div className="w-full">
      <div className="text-xs md:text-sm text-center text-muted-foreground font-medium py-2 border border-dashed border-gray-300 rounded-md" style={{ background: "#ED1B24", borderColor: "#ED1B24", color: "#FFFF" }}>
        Toca para agregar
      </div>
    </div>
  )
})

ProductActionButtons.displayName = "ProductActionButtons"
