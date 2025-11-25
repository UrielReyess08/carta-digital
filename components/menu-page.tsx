"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { type menuData, getCategoriesInOrder, getProductsByCategory } from "@/lib/menu-data"
import { ShoppingCart, Check, Trash2 } from "lucide-react"
import { generateWhatsAppMessage, getWhatsAppLink } from "@/lib/whatsapp-utils"


interface SelectedProduct {
  id: string
  name: string
  price: number
  quantity: number
}

export function MenuPage() {
  const [selectedProducts, setSelectedProducts] = useState<Map<string, SelectedProduct>>(new Map())

  const categories = getCategoriesInOrder()

  const totalItems = selectedProducts.size
  const totalPrice = Array.from(selectedProducts.values()).reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSelectProduct = (product: (typeof menuData)[0]) => {
    const newSelected = new Map(selectedProducts)

    if (newSelected.has(product.id)) {
      newSelected.delete(product.id)
    } else {
      if (newSelected.size <5) {
        newSelected.set(product.id, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        })
      }
    }

    setSelectedProducts(newSelected)
  }

  const handleClearSelection = () => {
    setSelectedProducts(new Map())
  }

  const handleRemoveProduct = (productId: string) => {
    const newSelected = new Map(selectedProducts)
    newSelected.delete(productId)
    setSelectedProducts(newSelected)
  }

  const handleSendToWhatsApp = () => {
  if (selectedProducts.size === 0) return

  const items = Array.from(selectedProducts.values()).map((item) => ({
    name: item.name,
    price: item.price,
  }))

  const message = generateWhatsAppMessage(items, totalPrice)
  const whatsappUrl = getWhatsAppLink(message)

  window.location.href = whatsappUrl
}


  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-background">
      <div className="sticky top-0 z-50 bg-white border-b-2 border-primary shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/images/imagen-20de-20whatsapp-202025-11-24-20a-20las-2016.jpg"
                alt="El Vikingo Coffee Bike"
                className="h-14 w-14 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-primary">El Vikingo</h1>
                <p className="text-sm text-muted-foreground">Coffee Bike Menú Digital</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-primary" />
              <Badge className="text-base px-3 py-1 bg-primary text-white">{totalItems} / 5</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-foreground">Selecciona tus Productos</h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <span className="text-sm font-medium">Máximo 5 productos por pedido</span>
                {totalItems === 5 && (
                  <Badge variant="destructive" className="text-xs">
                    Límite alcanzado
                  </Badge>
                )}
              </p>
            </div>

            <div className="space-y-8">
              {categories.map((category) => {
                const products = getProductsByCategory(category)
                return (
                  <div key={category}>
                    <h3 className="text-lg font-bold text-foreground bg-yellow-300 px-4 py-2 mb-4 inline-block rounded-md shadow-sm">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {products.map((product) => {
                        const isSelected = selectedProducts.has(product.id)
                        const canSelect = !isSelected && selectedProducts.size < 5

                        return (
                          <Card
                            key={product.id}
                            className={`p-4 cursor-pointer transition-all border-2 ${
                              isSelected
                                ? "border-primary bg-primary/5 shadow-md"
                                : canSelect
                                  ? "border-border hover:border-primary hover:shadow-md hover:bg-card"
                                  : "border-border opacity-40 cursor-not-allowed"
                            }`}
                            onClick={() => canSelect && handleSelectProduct(product)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-foreground flex-1">{product.name}</h4>
                              {isSelected && (
                                <div className="flex-shrink-0 ml-2">
                                  <Check className="w-5 h-5 text-primary" />
                                </div>
                              )}
                            </div>
                            <p className="text-2xl font-bold text-primary">S/.{product.price.toFixed(2)}</p>
                            {product.description && (
                              <p className="text-xs text-muted-foreground mt-2 italic">{product.description}</p>
                            )}
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

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
                    Array.from(selectedProducts.values()).map((item) => (
                      <div key={item.id} className="flex justify-between items-center border-b border-border pb-3">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-foreground">{item.name}</p>
                          <p className="text-sm font-bold text-primary">S/.{item.price.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveProduct(item.id)}
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
                    onClick={handleSendToWhatsApp}
                    className="w-full mb-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 text-base transition-all shadow-md"
                  >
                    Enviar a WhatsApp
                  </Button>

                  <Button
                    onClick={handleClearSelection}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
                  >
                    Limpiar Pedido
                  </Button>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
