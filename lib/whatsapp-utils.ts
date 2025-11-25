export const WHATSAPP_NUMBER = "+51963846269"

export const generateWhatsAppMessage = (
  products: { name: string; price: number }[],
  total: number
): string => {
  const productsList = products
    .map((p) => `• ${p.name} - S/.${p.price.toFixed(2)}`)
    .join("\n")

  return `Hola! Me gustaría hacer un pedido:\n\n${productsList}\n\nTotal: S/.${total.toFixed(2)}`
}

export const getWhatsAppLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message)
  const number = WHATSAPP_NUMBER.replace(/[^\d]/g, "")
  return `https://api.whatsapp.com/send?phone=${number}&text=${encodedMessage}`
}
