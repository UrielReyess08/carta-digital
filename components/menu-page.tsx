"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { MenuHeader } from "@/components/menu-header"
import { OrderSidebar } from "@/components/order-sidebar"
import { CategoryFilter } from "@/components/category-filter"
import { ProductCard } from "@/components/product-card"
import { FloatingCartButton } from "@/components/floating-cart-button"
import { PromoBanner } from "@/components/promo-banner"
import { getCategoriesInOrder, getProductsByCategory, menuData, MenuItem } from "@/lib/menu-data"
import { generateWhatsAppMessage, getWhatsAppLink } from "@/lib/whatsapp-utils"
import { useCart } from "@/hooks/useCart"
import { useAnalytics } from "@/hooks/useAnalytics"
import { MAX_TOTAL_ITEMS, SCROLL_THRESHOLDS } from "@/lib/constants"

// Helper puro para generar claves de producto
const getProductKey = (productId: string, milkType?: string, temperature?: string, sweetener?: string, sugarSpoons?: number): string => {
  let key = productId
  if (milkType) key += `-${milkType.toLowerCase()}`
  if (temperature) key += `-${temperature.toLowerCase()}`
  if (sweetener) key += `-${sweetener.toLowerCase()}`
  if (sugarSpoons) key += `-${sugarSpoons}spoons`
  return key
}

type TemperatureOption = "Frío" | "Tibio" | "Caliente"
type SweetenerOption = "Azúcar" | "Stevia"

export function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const cartRef = useRef<HTMLDivElement>(null)
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false)
  const [pendingProduct, setPendingProduct] = useState<MenuItem | null>(null)
  const [pendingTemperature, setPendingTemperature] = useState<TemperatureOption | null>(null)
  const [pendingSweetener, setPendingSweetener] = useState<SweetenerOption | null>(null)
  const [pendingSugarSpoons, setPendingSugarSpoons] = useState<number | null>(null)
  const [pendingMilkType, setPendingMilkType] = useState<"Lactosa" | "Deslactosada" | null>(null)
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")

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
  const openOptionsModal = useCallback((product: MenuItem) => {
    setPendingProduct(product)
    setPendingTemperature(null)
    setPendingSweetener(null)
    setPendingSugarSpoons(null)
    setPendingMilkType(null)
    setIsOptionsModalOpen(true)
  }, [])

  const closeOptionsModal = useCallback(() => {
    setIsOptionsModalOpen(false)
    setPendingProduct(null)
    setPendingTemperature(null)
    setPendingSweetener(null)
    setPendingSugarSpoons(null)
    setPendingMilkType(null)
  }, [])

  const handleConfirmOptions = useCallback(() => {
    if (!pendingProduct) return

    const needsTemperature = Boolean(pendingProduct.temperatureOptions?.length)
    const needsSweetener = Boolean(pendingProduct.sweetenerOptions?.length)
    const isSmootie = pendingProduct.category.includes("SMOOTHIES")
    
    if ((needsTemperature && !pendingTemperature) || (needsSweetener && !pendingSweetener) || (isSmootie && !pendingMilkType)) {
      return
    }

    if (isSmootie && pendingMilkType) {
      addWithMilkType(
        pendingProduct,
        pendingMilkType,
        (prod: any) => {
          trackAddProduct(prod)
        },
        (items: number, value: number) => {
          trackStartOrder(items, value)
        },
        pendingSweetener ?? undefined,
        pendingSugarSpoons ?? undefined
      )
    } else if (pendingTemperature) {
      addWithTemperature(
        pendingProduct,
        pendingTemperature,
        (prod: any) => {
          trackAddProduct(prod)
        },
        (items: number, value: number) => {
          trackStartOrder(items, value)
        },
        pendingSweetener ?? undefined,
        pendingSugarSpoons ?? undefined
      )
    } else {
      selectProduct(
        pendingProduct,
        (prod: any) => {
          trackAddProduct(prod)
        },
        (items: number, value: number) => {
          trackStartOrder(items, value)
        },
        pendingSweetener ?? undefined,
        pendingSugarSpoons ?? undefined
      )
    }

    closeOptionsModal()
  }, [addWithTemperature, addWithMilkType, closeOptionsModal, pendingProduct, pendingSweetener, pendingTemperature, pendingSugarSpoons, pendingMilkType, selectProduct, trackAddProduct, trackStartOrder])

  const handleSelectProduct = useCallback((product: MenuItem) => {
    const isSmootie = product.category.includes("SMOOTHIES")
    if (product.sweetenerOptions?.length || product.temperatureOptions?.length || isSmootie) {
      openOptionsModal(product)
      return
    }

    selectProduct(product, (prod: any) => {
      trackAddProduct(prod)
    }, (items: number, value: number) => {
      trackStartOrder(items, value)
    })
  }, [openOptionsModal, selectProduct, trackAddProduct, trackStartOrder])

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
    setIsCustomerModalOpen(true)
  }, [selectedProducts])

  const handleConfirmCustomer = useCallback(() => {
    if (selectedProducts.size === 0) return
    const name = customerName.trim()
    const phone = customerPhone.trim()
    if (!name || !phone) return

    const items = Array.from(selectedProducts.values()).map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity ?? 1,
      milkType: item.milkType,
      temperature: item.temperature,
      sweetener: item.sweetener,
      sugarSpoons: item.sugarSpoons,
    }))

    const message = generateWhatsAppMessage(items, totalPrice, name, phone)
    const whatsappUrl = getWhatsAppLink(message)

    trackSendOrderWhatsApp(totalItems, totalPrice)

    setIsCustomerModalOpen(false)
    setCustomerName("")
    setCustomerPhone("")

    window.location.href = whatsappUrl
  }, [customerName, customerPhone, selectedProducts, totalItems, totalPrice, trackSendOrderWhatsApp])

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

  const handleSelectCategory = useCallback(
    (category: string | null) => {
      setSelectedCategory(category)

      if (category) {
        const products = getProductsByCategory(category)
        const categoryIndex = Math.max(1, categories.indexOf(category) + 1)
        trackViewCategory(category, categoryIndex, products.length)
      }
    },
    [categories, trackViewCategory]
  )

  const scrollToCart = useCallback(() => {
    cartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  // Filtrar productos según la categoría seleccionada
  const displayedProducts = selectedCategory
    ? menuData.filter((p) => p.category === selectedCategory)
    : menuData

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-background">
      <MenuHeader totalItems={totalItems} />
      
      {/* Banner Promo */}
      <PromoBanner onPromoBannerClick={() => handleSelectCategory("PROMOCIONES")} />

      {/* Filtros de Categoría */}
      <div className="max-w-6xl mx-auto px-4">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* Botón flotante del carrito (solo móvil) */}
      <FloatingCartButton totalItems={totalItems} onClick={scrollToCart} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                {selectedCategory || "Todos los Productos"}
              </h2>
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <span className="font-medium">Máximo 12 productos por pedido</span>
                {totalItems === 12 && (
                  <Badge variant="destructive" className="text-xs">
                    Límite alcanzado
                  </Badge>
                )}
              </p>
            </div>

            {/* Grid de Productos */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {displayedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selectedProducts={selectedProducts}
                  likedProducts={likedProducts}
                  totalItems={totalItems}
                  maxTotalItems={MAX_TOTAL_ITEMS}
                  isPriorityImage={index < 6}
                  getProductKey={getProductKey}
                  onSelectProduct={handleSelectProduct}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={decreaseQuantity}
                  onToggleLike={toggleLike}
                  onPushEvent={pushDataLayerEvent}
                />
              ))}
            </div>

            {displayedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay productos en esta categoría</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1" ref={cartRef}>
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

      {isOptionsModalOpen && pendingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl">
            <h4 className="text-lg font-bold text-foreground">Elige opciones</h4>
            <p className="text-sm text-muted-foreground mt-1">{pendingProduct.name}</p>
            {pendingProduct.description && (
              <p className="text-xs text-muted-foreground italic mb-4">{pendingProduct.description}</p>
            )}
            {pendingProduct.category.includes("SMOOTHIES") && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-foreground mb-2">Tipo de leche</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setPendingMilkType("Lactosa")}
                    className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                      pendingMilkType === "Lactosa"
                        ? "bg-primary text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Lactosa
                  </button>
                  <button
                    onClick={() => setPendingMilkType("Deslactosada")}
                    className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                      pendingMilkType === "Deslactosada"
                        ? "bg-primary text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Deslactosada
                  </button>
                </div>
              </div>
            )}
            {pendingProduct.temperatureOptions?.length && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-foreground mb-2">Temperatura</p>
                <div className="flex flex-wrap gap-2">
                  {pendingProduct.temperatureOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setPendingTemperature(option)}
                      className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                        pendingTemperature === option
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {pendingProduct.sweetenerOptions?.length && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-foreground mb-2">Endulzante</p>
                <div className="flex flex-wrap gap-2">
                  {pendingProduct.sweetenerOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setPendingSweetener(option)}
                      className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                        pendingSweetener === option
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {pendingProduct.sweetenerOptions?.length && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-foreground mb-2">Cucharadas de endulzante</p>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((spoons) => (
                    <button
                      key={spoons}
                      onClick={() => setPendingSugarSpoons(spoons)}
                      className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                        pendingSugarSpoons === spoons
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {spoons}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleConfirmOptions}
                disabled={Boolean(pendingProduct.temperatureOptions?.length && !pendingTemperature) || Boolean(pendingProduct.sweetenerOptions?.length && !pendingSweetener) || Boolean(pendingProduct.category.includes("SMOOTHIES") && !pendingMilkType) || Boolean(pendingSweetener && !pendingSugarSpoons)}
                className="w-full rounded-md bg-primary px-4 py-2 text-white font-semibold hover:bg-primary/90 disabled:opacity-50"
              >
                Agregar al pedido
              </button>
              <button
                onClick={closeOptionsModal}
                className="w-full rounded-md border border-border px-4 py-2 text-foreground hover:bg-gray-100"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {isCustomerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl">
            <h4 className="text-lg font-bold text-foreground">Datos para el pedido</h4>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Ingresa tu nombre y numero de celular
            </p>
            <div className="flex flex-col gap-3">
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nombre"
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              />
              <input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Numero de celular"
                className="w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={handleConfirmCustomer}
                disabled={!customerName.trim() || !customerPhone.trim()}
                className="w-full rounded-md bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                Enviar a WhatsApp
              </button>
              <button
                onClick={() => setIsCustomerModalOpen(false)}
                className="w-full rounded-md border border-border px-4 py-2 text-foreground hover:bg-gray-100"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
