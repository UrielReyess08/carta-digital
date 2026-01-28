"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { MenuHeader } from "@/components/menu-header"
import { OrderSidebar } from "@/components/order-sidebar"
import { CategorySection } from "@/components/category-section"
import { type menuData, getCategoriesInOrder, getProductsByCategory, MenuItem } from "@/lib/menu-data"
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
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set())

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
    firedStartOrder.current = false //Reseta el flag para no volver a disparar
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

  pushDataLayerEvent("send_order_whatsapp", {
    items_count: totalItems,
    order_value: Number(totalPrice.toFixed(2)),
    page_path: window.location.pathname
  })

  window.location.href = whatsappUrl
}

  const handleToggleLike = (productId: string) => {
    const newLiked = new Set(likedProducts)
    if (newLiked.has(productId)) {
      newLiked.delete(productId)
    } else {
      newLiked.add(productId)
    }
    setLikedProducts(newLiked)
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
      <MenuHeader totalItems={totalItems} />

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
                  <CategorySection
                    key={category}
                    category={category}
                    products={products}
                    isOpen={isOpen}
                    selectedProducts={selectedProducts}
                    likedProducts={likedProducts}
                    totalItems={totalItems}
                    maxTotalItems={MAX_TOTAL_ITEMS}
                    getProductKey={getProductKey}
                    onToggleCategory={toggleCategory}
                    onSelectProduct={handleSelectProduct}
                    onAddWithTemperature={handleAddWithTemperature}
                    onAddWithMilkType={handleAddWithMilkType}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                    onToggleLike={handleToggleLike}
                    onPushEvent={pushDataLayerEvent}
                  />
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-1">
            <OrderSidebar
              selectedProducts={selectedProducts}
              totalPrice={totalPrice}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
              onRemoveProduct={handleRemoveProduct}
              onSendToWhatsApp={handleSendToWhatsApp}
              onClearSelection={handleClearSelection}
              onPushEvent={pushDataLayerEvent}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
