export const WHATSAPP_NUMBER = "+51963846269"

export const generateWhatsAppMessage = (
  products: { name: string; price: number; quantity: number; milkType?: string }[],
  total: number
): string => {
  const productsList = products
    .map((p) => {
      const milkInfo = p.milkType ? ` (Leche ${p.milkType})` : ""
      return `• ${p.name}${milkInfo} x${p.quantity} - S/.${(p.price * p.quantity).toFixed(2)}`
    })
    .join("\n")

  return `Hola! Me gustaría hacer un pedido:\n\n${productsList}\n\nTotal: S/.${total.toFixed(2)}`
}

export const getWhatsAppLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message)
  const numberWithoutPlus = WHATSAPP_NUMBER.replace("+", "")
  return `https://wa.me/${numberWithoutPlus}?text=${encodedMessage}`
}
