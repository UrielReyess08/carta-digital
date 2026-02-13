/**
 * Hook para manejar toda la lógica del carrito de compras
 * Abstrae el estado y handlers de selectedProducts y likedProducts
 */
import { useCallback, useState, useRef, useMemo } from "react"
import { MenuItem } from "@/lib/menu-data"
import { MAX_TOTAL_ITEMS } from "@/lib/constants"

export interface SelectedProduct {
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

// Helper puro - no depende de estado
const getProductKey = (
  productId: string,
  milkType?: string,
  temperature?: string,
  sweetener?: string,
  sugarSpoons?: number
): string => {
  let key = productId
  if (milkType) key += `-${milkType.toLowerCase()}`
  if (temperature) key += `-${temperature.toLowerCase()}`
  if (sweetener) key += `-${sweetener.toLowerCase()}`
  if (sugarSpoons) key += `-${sugarSpoons}spoons`
  return key
}

interface UseCartReturn {
  selectedProducts: Map<string, SelectedProduct>
  likedProducts: Set<string>
  totalItems: number
  totalPrice: number
  firedStartOrder: React.MutableRefObject<boolean>
  selectProduct: (
    product: MenuItem,
    onAddProduct?: (product: any) => void,
    onStartOrder?: (items: number, value: number) => void,
    sweetener?: "Azúcar" | "Stevia",
    sugarSpoons?: number
  ) => void
  addWithMilkType: (
    product: MenuItem,
    milkType: "Lactosa" | "Deslactosada",
    onAddProduct?: (product: any) => void,
    onStartOrder?: (items: number, value: number) => void,
    sweetener?: "Azúcar" | "Stevia",
    sugarSpoons?: number
  ) => void
  addWithTemperature: (
    product: MenuItem,
    temperature: "Frío" | "Tibio" | "Caliente",
    onAddProduct?: (product: any) => void,
    onStartOrder?: (items: number, value: number) => void,
    sweetener?: "Azúcar" | "Stevia",
    sugarSpoons?: number
  ) => void
  removeProduct: (key: string) => void
  increaseQuantity: (
    key: string,
    onAddProduct?: (product: any) => void
  ) => void
  decreaseQuantity: (key: string) => void
  clearSelection: () => void
  toggleLike: (productId: string) => void
}

export function useCart(): UseCartReturn {
  const [selectedProducts, setSelectedProducts] = useState<
    Map<string, SelectedProduct>
  >(new Map())
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set())

  const firedStartOrder = useRef(false)

  // Memoizar cálculos de totales
  const { totalItems, totalPrice } = useMemo(() => {
    const items = Array.from(selectedProducts.values()).reduce(
      (sum, item) => sum + item.quantity,
      0
    )
    const price = Array.from(selectedProducts.values()).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    return { totalItems: items, totalPrice: price }
  }, [selectedProducts])

  const selectProduct = useCallback(
    (
      product: MenuItem,
      onAddProduct?: (product: any) => void,
      onStartOrder?: (items: number, value: number) => void,
      sweetener?: "Azúcar" | "Stevia",
      sugarSpoons?: number
    ) => {
      const requiresTemperature = Boolean(product.temperatureOptions?.length)
      const isSmootie = product.category.includes("SMOOTHIES")
      if (requiresTemperature || isSmootie) {
        return
      }

      setSelectedProducts((prevSelected) => {
        const newSelected = new Map(prevSelected)
        const currentTotal = Array.from(newSelected.values()).reduce(
          (s, it) => s + it.quantity,
          0
        )

        const key = getProductKey(product.id, undefined, undefined, sweetener, sugarSpoons)
        if (newSelected.has(key)) {
          const existing = newSelected.get(key)!
          if (currentTotal < MAX_TOTAL_ITEMS) {
            newSelected.set(key, {
              ...existing,
              quantity: existing.quantity + 1,
            })
            if (onAddProduct) {
              onAddProduct({
                name: product.name,
                category: product.category,
                price: product.price,
                variant: "default",
              })
            }
          }
        } else {
          if (currentTotal < MAX_TOTAL_ITEMS) {
            newSelected.set(key, {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              category: product.category,
              sweetener: sweetener,
              sugarSpoons: sugarSpoons,
            })
            if (onAddProduct) {
              onAddProduct({
                name: product.name,
                category: product.category,
                price: product.price,
                variant: "default",
              })
            }

            if (!firedStartOrder.current && prevSelected.size === 0) {
              firedStartOrder.current = true
              if (onStartOrder) {
                onStartOrder(1, product.price)
              }
            }
          }
        }
        return newSelected
      })
    },
    [selectedProducts]
  )

  const addWithMilkType = useCallback(
    (
      product: MenuItem,
      milkType: "Lactosa" | "Deslactosada",
      onAddProduct?: (product: any) => void,
      onStartOrder?: (items: number, value: number) => void,
      sweetener?: "Azúcar" | "Stevia",
      sugarSpoons?: number
    ) => {
      setSelectedProducts((prevSelected) => {
        const newSelected = new Map(prevSelected)
        const currentTotal = Array.from(newSelected.values()).reduce(
          (s, it) => s + it.quantity,
          0
        )

        if (currentTotal >= MAX_TOTAL_ITEMS) return prevSelected

        const key = getProductKey(product.id, milkType, undefined, sweetener, sugarSpoons)
        const existing = newSelected.get(key)

        if (existing) {
          newSelected.set(key, { ...existing, quantity: existing.quantity + 1 })
        } else {
          newSelected.set(key, {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            milkType: milkType,
            category: product.category,
            sweetener: sweetener,
            sugarSpoons: sugarSpoons,
          })
        }

        if (onAddProduct) {
          onAddProduct({
            name: product.name,
            category: product.category,
            price: product.price,
            variant: milkType,
          })
        }

        if (!firedStartOrder.current && prevSelected.size === 0) {
          firedStartOrder.current = true
          if (onStartOrder) {
            onStartOrder(1, product.price)
          }
        }

        return newSelected
      })
    },
    []
  )

  const addWithTemperature = useCallback(
    (
      product: MenuItem,
      temperature: "Frío" | "Tibio" | "Caliente",
      onAddProduct?: (product: any) => void,
      onStartOrder?: (items: number, value: number) => void,
      sweetener?: "Azúcar" | "Stevia",
      sugarSpoons?: number
    ) => {
      setSelectedProducts((prevSelected) => {
        const newSelected = new Map(prevSelected)
        const currentTotal = Array.from(newSelected.values()).reduce(
          (s, it) => s + it.quantity,
          0
        )

        if (currentTotal >= MAX_TOTAL_ITEMS) return prevSelected

        const key = getProductKey(product.id, undefined, temperature, sweetener, sugarSpoons)
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
            sweetener: sweetener,
            sugarSpoons: sugarSpoons,
          })
        }

        if (onAddProduct) {
          onAddProduct({
            name: product.name,
            category: product.category,
            price: product.price,
            variant: temperature,
          })
        }

        if (!firedStartOrder.current && prevSelected.size === 0) {
          firedStartOrder.current = true
          if (onStartOrder) {
            onStartOrder(1, product.price)
          }
        }

        return newSelected
      })
    },
    []
  )

  const removeProduct = useCallback((key: string) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = new Map(prevSelected)
      newSelected.delete(key)
      return newSelected
    })
  }, [])

  const increaseQuantity = useCallback(
    (key: string, onAddProduct?: (product: any) => void) => {
      setSelectedProducts((prevSelected) => {
        const newSelected = new Map(prevSelected)
        const currentTotal = Array.from(newSelected.values()).reduce(
          (s, it) => s + it.quantity,
          0
        )

        if (currentTotal >= MAX_TOTAL_ITEMS) return prevSelected

        const existing = newSelected.get(key)
        if (!existing) return prevSelected
        newSelected.set(key, { ...existing, quantity: existing.quantity + 1 })

        if (onAddProduct) {
          onAddProduct({
            name: existing.name,
            category: existing.category || "unknown",
            price: existing.price,
            variant:
              existing.milkType || existing.temperature || "default",
          })
        }

        return newSelected
      })
    },
    []
  )

  const decreaseQuantity = useCallback((key: string) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = new Map(prevSelected)
      const existing = newSelected.get(key)
      if (!existing) return prevSelected
      if (existing.quantity <= 1) {
        newSelected.delete(key)
      } else {
        newSelected.set(key, { ...existing, quantity: existing.quantity - 1 })
      }
      return newSelected
    })
  }, [])

  const clearSelection = useCallback(() => {
    firedStartOrder.current = false
    setSelectedProducts(new Map())
  }, [])

  const toggleLike = useCallback((productId: string) => {
    setLikedProducts((prevLiked) => {
      const newLiked = new Set(prevLiked)
      if (newLiked.has(productId)) {
        newLiked.delete(productId)
      } else {
        newLiked.add(productId)
      }
      return newLiked
    })
  }, [])

  return {
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
  }
}
