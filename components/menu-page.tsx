"use client"

import { use, useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { type menuData, getCategoriesInOrder, getProductsByCategory, MenuItem } from "@/lib/menu-data"
import { ShoppingCart, Check, Trash2, Coffee, Plus, Minus } from "lucide-react"
import { generateWhatsAppMessage, getWhatsAppLink } from "@/lib/whatsapp-utils"


interface SelectedProduct {
  id: string
  name: string
  price: number
  quantity: number
  category?: string
  milkType?: "Lactosa" | "Deslactosada"
  temperature?: "Frío" | "Caliente"
}

export function MenuPage() {
  const [selectedProducts, setSelectedProducts] = useState<Map<string, SelectedProduct>>(new Map())

  const categories = getCategoriesInOrder()

  // Generar clave única: id + milkType + temperature
  const getProductKey = (productId: string, milkType?: string, temperature?: string): string => {
    let key = productId
    if (milkType) key += `-${milkType.toLowerCase()}`
    if (temperature) key += `-${temperature.toLowerCase()}`
    return key
  }

  // Límite total de unidades por pedido
  const MAX_TOTAL_ITEMS = 12

  // totalItems ahora suma las cantidades (no productos distintos)
  const totalItems = Array.from(selectedProducts.values()).reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = Array.from(selectedProducts.values()).reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Seleccionar / agregar (si ya seleccionado incrementa cantidad hasta el máximo)
  const handleSelectProduct = (product: (typeof menuData)[0]) => {
    // Si es SIN CAFÉ o smoothie Y NO está seleccionado, no hacer nada (el usuario debe elegir opciones)
    const isSinCafe = product.category.includes("SIN CAFÉ")
    const isSmootie = product.category.includes("SMOOTHIES")
    const alreadySelected = selectedProducts.has(product.id)
    if ((isSinCafe || isSmootie) && !alreadySelected) {
      return
    }

    const newSelected = new Map(selectedProducts)
    const currentTotal = Array.from(newSelected.values()).reduce((s, it) => s + it.quantity, 0)

    const key = getProductKey(product.id)
    if (newSelected.has(key)) {
      const existing = newSelected.get(key)!
      if (currentTotal < MAX_TOTAL_ITEMS) {
        newSelected.set(key, { ...existing, quantity: existing.quantity + 1 })

        pushDataLayerEvent("add_product", {
        product_name: product.name,
        product_category: product.category,
        product_variant: "default", // POR DEFECTO NO CAMBIARA NADA
        price: product.price,
        quantity: 1,
        page_path: window.location.pathname
    })
  }
    } else {
      if (currentTotal < MAX_TOTAL_ITEMS) {
        newSelected.set(key, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          category: product.category,
        })

        pushDataLayerEvent("add_product", {
        product_name: product.name,
        product_category: product.category,
        product_variant: "default", // POR DEFECTO NO CAMBIARA NADA
        price: product.price,
        quantity: 1,
        page_path: window.location.pathname
      })

      if(!firedStartOrder.current && totalItems === 0) {
      firedStartOrder.current = true

      pushDataLayerEvent("start_order", {
        items_count: 1,
        order_value: product.price,
        page_path: window.location.pathname
      })
    }
    }
  }
    setSelectedProducts(newSelected)
  }

  const handleAddWithMilkType = (product: MenuItem, milkType: "Lactosa" | "Deslactosada") => {
    const newSelected = new Map(selectedProducts)
    const currentTotal = Array.from(newSelected.values()).reduce((s, it) => s + it.quantity, 0)

    if (currentTotal >= MAX_TOTAL_ITEMS) return

    const key = getProductKey(product.id, milkType)
    const existing = newSelected.get(key)

    if (existing) {
      // Si ya existe esa variante, incrementa la cantidad
      newSelected.set(key, { ...existing, quantity: existing.quantity + 1 })
    } else {
      // Si no existe, crea una nueva entrada
      newSelected.set(key, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        milkType: milkType,
        category: product.category
      })
    }

    pushDataLayerEvent("add_product", {
      product_name: product.name,
      product_category: product.category,
      product_variant: milkType, //TIPO DE LECHE
      price: product.price,
      quantity: 1,
      page_path: window.location.pathname
    })

    if(!firedStartOrder.current && totalItems === 0) {
      firedStartOrder.current = true

      pushDataLayerEvent("start_order", {
        items_count: 1,
        order_value: product.price,
        page_path: window.location.pathname
      })
    }

    setSelectedProducts(newSelected)
  }

  const handleAddWithTemperature = (product: MenuItem, temperature: "Frío" | "Caliente") => {
    const newSelected = new Map(selectedProducts)
    const currentTotal = Array.from(newSelected.values()).reduce((s, it) => s + it.quantity, 0)

    if (currentTotal >= MAX_TOTAL_ITEMS) return

    const key = getProductKey(product.id, undefined, temperature)
    const existing = newSelected.get(key)

    if (existing) {
      newSelected.set(key, { ...existing, quantity: existing.quantity + 1 })
    } else {
      newSelected.set(key, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        temperature: temperature,
        category: product.category,
      })
    }

    pushDataLayerEvent("add_product", {
      product_name: product.name,
      product_category: product.category,
      product_variant: temperature, //TEMPERATURA
      price: product.price,
      quantity: 1,
      page_path: window.location.pathname
    })

    if(!firedStartOrder.current && totalItems === 0) {
      firedStartOrder.current = true

      pushDataLayerEvent("start_order", {
        items_count: 1,
        order_value: product.price,
        page_path: window.location.pathname
      })
    }

    setSelectedProducts(newSelected)
  }

  const handleClearSelection = () => {
    setSelectedProducts(new Map())
  }

  const handleRemoveProduct = (key: string) => {
    const newSelected = new Map(selectedProducts)
    newSelected.delete(key)
    setSelectedProducts(newSelected)
  }

  const handleIncreaseQuantity = (key: string) => {
    const newSelected = new Map(selectedProducts)
    const currentTotal = Array.from(newSelected.values()).reduce((s, it) => s + it.quantity, 0)

    if (currentTotal >= MAX_TOTAL_ITEMS) return

    const existing = newSelected.get(key)
    if (!existing) return
    newSelected.set(key, { ...existing, quantity: existing.quantity + 1 })

    pushDataLayerEvent("add_product", {
      product_name: existing.name,
      product_category: existing.category || "unknown",
      product_variant: existing.milkType || existing.temperature || "default", 
      price: existing.price,
      quantity: 1,
      page_path: window.location.pathname
    })

    setSelectedProducts(newSelected)
  }

  const handleDecreaseQuantity = (key: string) => {
    const newSelected = new Map(selectedProducts)
    const existing = newSelected.get(key)
    if (!existing) return
    if (existing.quantity <= 1) {
      newSelected.delete(key)
    } else {
      newSelected.set(key, { ...existing, quantity: existing.quantity - 1 })
    }
    setSelectedProducts(newSelected)
  }

  const handleSendToWhatsApp = () => {
  if (selectedProducts.size === 0) return
  const items = Array.from(selectedProducts.values()).map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity ?? 1,
    milkType: item.milkType,
    temperature: item.temperature
  }))

  const message = generateWhatsAppMessage(items, totalPrice)
  const whatsappUrl = getWhatsAppLink(message)

  window.location.href = whatsappUrl
}

  // Estado para controlar la categoría abierta (solo una a la vez)
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const pushDataLayerEvent = (eventName: string, params: Record<string, any>) => {
    if (typeof window === "undefined") return
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event: eventName,
      ...params,
    })
  }

  const firedScrollThresholds = useRef<Set<number>>(new Set())
  const firedStartOrder = useRef(false)

const SCROLL_THRESHOLDS = [25, 50, 75, 90]

useEffect(() => {
  const onScroll = () => {
    const doc = document.documentElement

    const scrollTop = window.scrollY || doc.scrollTop

    const scrollHeight = doc.scrollHeight - window.innerHeight
    if (scrollHeight <= 0) return

    const percent = Math.round((scrollTop / scrollHeight) * 100)

    for (const threshold of SCROLL_THRESHOLDS) {
      if (percent >= threshold && !firedScrollThresholds.current.has(threshold)) {
        firedScrollThresholds.current.add(threshold)

        pushDataLayerEvent("scroll_menu", {
          scroll_percent: threshold,       
          scroll_current: percent,      
          page_path: window.location.pathname,
        })
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  onScroll()

  return () => window.removeEventListener("scroll", onScroll)
}, [])

  const toggleCategory = (category: string) => {
    setOpenCategory((prev) => {
      const willOpen = prev !== category
      const next = willOpen ? category : null

      if (willOpen) {
        const products = getProductsByCategory(category)
        const categoryIndex = Math.max(1, categories.indexOf(category) + 1)

        pushDataLayerEvent("view_category", {
          category_name: category,
          category_index: categoryIndex,
          items_count: products.length,
        })
      }

      return next
    })
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-background">
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
              <Badge className="text-base px-3 py-1 bg-primary text-white">{totalItems} / 10</Badge>
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
                <span className="text-sm font-medium">Máximo 12 productos por pedido</span>
                {totalItems === 12 && (
                  <Badge variant="destructive" className="text-xs">
                    Límite alcanzado
                  </Badge>
                )}
              </p>
            </div>

            <div className="space-y-4">
              {categories.map((category) => {
                const products = getProductsByCategory(category)
                const isOpen = openCategory === category

                return (
                  <div key={category} className="border rounded-md overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className="w-full text-left px-6 py-3 bg-yellow-300/80 hover:bg-yellow-300 font-bold flex items-center justify-between"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3">
                        <Coffee className="w-5 h-5 text-primary" />
                        <span>{category}</span>
                        <Badge variant="secondary" className="ml-2">{products.length}</Badge>
                      </div>
                      <span className="text-sm">{isOpen ? "−" : "+"}</span>
                    </button>

                    {isOpen && (
                      <div className="px-6 py-4 bg-white">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {products.map((product) => {
                            const isSmootie = product.category.includes("SMOOTHIES")
                            // Para smoothies, check si existe cualquier variante (Lactosa o Deslactosada)
                            // Para otros productos, check el id simple
                            const hasAnyVariant = isSmootie && (
                              selectedProducts.has(getProductKey(product.id, "Lactosa")) ||
                              selectedProducts.has(getProductKey(product.id, "Deslactosada"))
                            )
                            const selected = selectedProducts.get(product.id) || (hasAnyVariant ? {} as SelectedProduct : undefined)
                            const isSelected = Boolean(selected && Object.keys(selected).length > 0)
                            const canSelect = !isSelected && totalItems < MAX_TOTAL_ITEMS

                            return (
                              <Card
                                key={product.id}
                                className={`p-4 transition-all border-2 flex flex-row items-start gap-3 ${
                                  isSelected
                                    ? "border-primary bg-primary/5 shadow-md"
                                    : canSelect
                                      ? "border-border hover:border-primary hover:shadow-md hover:bg-card cursor-pointer"
                                      : "border-border opacity-40 cursor-not-allowed"
                                }`}
                                onClick={() => canSelect && handleSelectProduct(product)}
                              >
                                <div className="flex-1 flex flex-col justify-between">
                                  <div>
                                    <h4 className="font-semibold text-foreground">{product.name}</h4>
                                    <p className="text-2xl font-bold text-primary">S/.{product.price.toFixed(2)}</p>
                                    {product.description && (
                                      <p className="text-xs text-muted-foreground mt-2 italic">{product.description}</p>
                                    )}
                                  </div>

                                  <div className="mt-3">
                                  {(() => {
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
                                              handleAddWithTemperature(product, "Frío")
                                            }}
                                            className="w-[120px] h-8 px-2 bg-blue-100 hover:bg-blue-200 rounded text-sm font-semibold transition-colors"
                                          >
                                              Frío
                                          </button>
                                          <button 
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              handleAddWithTemperature(product, "Caliente")
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
                                              handleAddWithMilkType(product, "Lactosa")
                                            }}
                                            className="w-[120px] h-8 px-2 bg-blue-100 hover:bg-blue-200 rounded text-sm font-semibold transition-colors"
                                          >
                                             Lactosa
                                          </button>
                                          <button 
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              handleAddWithMilkType(product, "Deslactosada")
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
                                              onClick={(e) => { e.stopPropagation(); handleDecreaseQuantity(getProductKey(product.id, selected!.milkType, selected!.temperature)) }}
                                              className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                                              aria-label={`Disminuir cantidad ${product.name}`}
                                            >
                                              <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="font-semibold">{selected!.quantity}</span>
                                            <button
                                              onClick={(e) => { e.stopPropagation(); handleIncreaseQuantity(getProductKey(product.id, selected!.milkType, selected!.temperature)) }}
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
                                  })()}
                                  </div>
                                </div>

                                {/* Imagen a la DERECHA */}
                                {product.image && (
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-30 h-30 object-cover rounded-lg flex-shrink-0"
                                  />
                                )}
                              </Card>
                            )
                          })}
                        </div>
                      </div>
                    )}
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
                              onClick={() => handleDecreaseQuantity(key)}
                              className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                              aria-label={`Disminuir cantidad ${item.name}`}
                            >
                              <Minus className="w-4 h-4" />
                            </button>

                            <span className="font-semibold">{item.quantity}</span>

                            <button
                              onClick={() => handleIncreaseQuantity(key)}
                              className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                              aria-label={`Aumentar cantidad ${item.name}`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveProduct(key)}
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
