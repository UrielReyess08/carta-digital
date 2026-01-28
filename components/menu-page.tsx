"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { MenuHeader } from "@/components/menu-header"
import { OrderSidebar } from "@/components/order-sidebar"
import { CategorySection } from "@/components/category-section"
import { getCategoriesInOrder, getProductsByCategory } from "@/lib/menu-data"
import { generateWhatsAppMessage, getWhatsAppLink } from "@/lib/whatsapp-utils"
import { useCart } from "@/hooks/useCart"
import { useAnalytics } from "@/hooks/useAnalytics"
import { MAX_TOTAL_ITEMS, SCROLL_THRESHOLDS } from "@/lib/constants"

// Helper puro para generar claves de producto
const getProductKey = (productId: string, milkType?: string, temperature?: string): string => {
  let key = productId
  if (milkType) key += `-${milkType.toLowerCase()}`
  if (temperature) key += `-${temperature.toLowerCase()}`
  return key
}

export function MenuPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const categories = getCategoriesInOrder()

  // Usar custom hooks
  const {
    selectedProducts,
    likedProducts,
    totalItems,
    totalPrice,
    firedStartOrder,
    selectProduct,
    addWithMilkType,
    addWithTemperature,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    clearSelection,
    toggleLike,
  } = useCart()

  const {
    pushDataLayerEvent,
    trackAddProduct,
    trackStartOrder,
    trackSendOrderWhatsApp,
    trackViewCategory,
    trackScroll,
  } = useAnalytics()

  // Wrappear handlers del carrito con tracking analytics
  const handleSelectProduct = useCallback((product: any) => {
    selectProduct(product, (prod: any) => {
      trackAddProduct(prod)
    }, (items: number, value: number) => {
      trackStartOrder(items, value)
    })
  }, [selectProduct, trackAddProduct, trackStartOrder])

  const handleAddWithMilkType = useCallback(
    (product: any, milkType: "Lactosa" | "Deslactosada") => {
      addWithMilkType(product, milkType, (prod: any) => {
        trackAddProduct(prod)
      }, (items: number, value: number) => {
        trackStartOrder(items, value)
      })
    },
    [addWithMilkType, trackAddProduct, trackStartOrder]
  )

  const handleAddWithTemperature = useCallback(
    (product: any, temperature: "Frío" | "Caliente") => {
      addWithTemperature(product, temperature, (prod: any) => {
        trackAddProduct(prod)
      }, (items: number, value: number) => {
        trackStartOrder(items, value)
      })
    },
    [addWithTemperature, trackAddProduct, trackStartOrder]
  )

  const handleIncreaseQuantity = useCallback(
    (key: string) => {
      increaseQuantity(key, (prod: any) => {
        trackAddProduct(prod)
      })
    },
    [increaseQuantity, trackAddProduct]
  )

  const handleSendToWhatsApp = useCallback(() => {
    if (selectedProducts.size === 0) return
    const items = Array.from(selectedProducts.values()).map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity ?? 1,
      milkType: item.milkType,
      temperature: item.temperature,
    }))

    const message = generateWhatsAppMessage(items, totalPrice)
    const whatsappUrl = getWhatsAppLink(message)

    trackSendOrderWhatsApp(totalItems, totalPrice)

    window.location.href = whatsappUrl
  }, [selectedProducts, totalPrice, totalItems, trackSendOrderWhatsApp])

  const firedScrollThresholds = useRef<Set<number>>(new Set())

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const scrollHeight = doc.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const percent = Math.round((scrollTop / scrollHeight) * 100)

      for (const threshold of SCROLL_THRESHOLDS) {
        if (
          percent >= threshold &&
          !firedScrollThresholds.current.has(threshold)
        ) {
          firedScrollThresholds.current.add(threshold)
          trackScroll(threshold, percent)
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener("scroll", onScroll)
  }, [trackScroll])

  const toggleCategory = useCallback(
    (category: string) => {
      setOpenCategory((prev) => {
        const willOpen = prev !== category
        const next = willOpen ? category : null

        if (willOpen) {
          const products = getProductsByCategory(category)
          const categoryIndex = Math.max(1, categories.indexOf(category) + 1)
          trackViewCategory(category, categoryIndex, products.length)
        }

        return next
      })
    },
    [categories, trackViewCategory]
  )


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
              {categories.map((category, index) => {
                const products = getProductsByCategory(category)
                const isOpen = openCategory === category
                // Las primeras 2 categorías (CAFÉ 7oz, CAFÉ 10oz) son primarias
                const isPrimaryCategory = index < 2

                return (
                  <CategorySection
                    key={category}
                    category={category}
                    products={products}
                    isOpen={isOpen}
                    isPrimaryCategory={isPrimaryCategory}
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
                    onDecreaseQuantity={decreaseQuantity}
                    onToggleLike={toggleLike}
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
              onDecreaseQuantity={decreaseQuantity}
              onRemoveProduct={removeProduct}
              onSendToWhatsApp={handleSendToWhatsApp}
              onClearSelection={clearSelection}
              onPushEvent={pushDataLayerEvent}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
