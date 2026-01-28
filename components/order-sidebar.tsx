import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"

interface SelectedProduct {
  id: string
  name: string
  price: number
  quantity: number
  category?: string
  milkType?: "Lactosa" | "Deslactosada"
  temperature?: "Frío" | "Caliente"
}

interface OrderSidebarProps {
  selectedProducts: Map<string, SelectedProduct>
  totalPrice: number
  onIncreaseQuantity: (key: string) => void
  onDecreaseQuantity: (key: string) => void
  onRemoveProduct: (key: string) => void
  onSendToWhatsApp: () => void
  onClearSelection: () => void
  onPushEvent: (eventName: string, params: Record<string, any>) => void
}

export const OrderSidebar = React.memo(({
  selectedProducts,
  totalPrice,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveProduct,
  onSendToWhatsApp,
  onClearSelection,
  onPushEvent,
}: OrderSidebarProps) => {
  return (
    <div className="lg:col-span-1">
      <Card className="p-6 sticky top-24 border-2 border-primary bg-white shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Tu Pedido
        </h3>

        <ScrollArea className="h-64 mb-6 pr-4">
          <div className="space-y-3">
            {selectedProducts.size === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">Selecciona productos para comenzar</p>
              </div>
            ) : (
              Array.from(selectedProducts.entries()).map(([key, item]) => (
                <div key={key} className="flex justify-between items-center border-b border-border pb-3">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{item.name}</p>
                    {(item.temperature || item.milkType) && (
                      <p className="text-xs text-muted-foreground">
                        {item.temperature && <span>{item.temperature}</span>}
                        {item.temperature && item.milkType && <span> • </span>}
                        {item.milkType && <span>Leche: {item.milkType}</span>}
                      </p>
                    )}
                    <p className="text-sm font-bold text-primary">S/.{(item.price * item.quantity).toFixed(2)}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onDecreaseQuantity(key)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                        aria-label={`Disminuir cantidad ${item.name}`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="font-semibold">{item.quantity}</span>

                      <button
                        onClick={() => onIncreaseQuantity(key)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                        aria-label={`Aumentar cantidad ${item.name}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveProduct(key)}
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors p-1"
                    title="Eliminar del pedido"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {selectedProducts.size > 0 && (
          <>
            <div className="border-t-2 border-primary pt-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Total:</span>
                <span className="text-3xl font-bold text-primary">S/.{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={onSendToWhatsApp}
              className="w-full mb-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 text-base transition-all shadow-md"
            >
              Enviar a WhatsApp
            </Button>

            <Button
              onClick={onClearSelection}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              Limpiar Pedido
            </Button>
          </>
        )}
      </Card>
    </div>
  )
})

OrderSidebar.displayName = "OrderSidebar"
