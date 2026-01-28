/**
 * Hook para manejar eventos de Google Analytics
 * Abstrae la lógica de envío de eventos al dataLayer
 */
export function useAnalytics() {
  const pushDataLayerEvent = (eventName: string, params: Record<string, any>) => {
    if (typeof window === "undefined") return
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event: eventName,
      ...params,
    })
  }

  const trackAddProduct = (product: {
    name: string
    category: string
    price: number
    variant?: string
    quantity?: number
  }) => {
    pushDataLayerEvent("add_product", {
      product_name: product.name,
      product_category: product.category,
      product_variant: product.variant || "default",
      price: product.price,
      quantity: product.quantity || 1,
      page_path: typeof window !== "undefined" ? window.location.pathname : "",
    })
  }

  const trackRemoveProduct = (product: {
    name: string
    category: string
    price: number
    quantity: number
  }) => {
    pushDataLayerEvent("remove_product", {
      product_name: product.name,
      product_category: product.category,
      price: product.price,
      quantity: product.quantity,
      page_path: typeof window !== "undefined" ? window.location.pathname : "",
    })
  }

  const trackStartOrder = (itemsCount: number, orderValue: number) => {
    pushDataLayerEvent("start_order", {
      items_count: itemsCount,
      order_value: orderValue,
      page_path: typeof window !== "undefined" ? window.location.pathname : "",
    })
  }

  const trackSendOrderWhatsApp = (itemsCount: number, orderValue: number) => {
    pushDataLayerEvent("send_order_whatsapp", {
      items_count: itemsCount,
      order_value: Number(orderValue.toFixed(2)),
      page_path: typeof window !== "undefined" ? window.location.pathname : "",
    })
  }

  const trackViewCategory = (
    category: string,
    categoryIndex: number,
    itemsCount: number
  ) => {
    pushDataLayerEvent("view_category", {
      category_name: category,
      category_index: categoryIndex,
      items_count: itemsCount,
    })
  }

  const trackScroll = (scrollPercent: number, scrollCurrent: number) => {
    pushDataLayerEvent("scroll_menu", {
      scroll_percent: scrollPercent,
      scroll_current: scrollCurrent,
      page_path: typeof window !== "undefined" ? window.location.pathname : "",
    })
  }

  return {
    pushDataLayerEvent,
    trackAddProduct,
    trackRemoveProduct,
    trackStartOrder,
    trackSendOrderWhatsApp,
    trackViewCategory,
    trackScroll,
  }
}
