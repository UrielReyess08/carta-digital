export const WHATSAPP_NUMBER = "+51963846269"

export const generateWhatsAppMessage = (
  products: { name: string; price: number; quantity: number; milkType?: string; temperature?: string; sweetener?: string; sugarSpoons?: number }[],
  total: number,
  customerName?: string,
  customerPhone?: string
): string => {
  const customerInfoLines: string[] = []
  if (customerName) customerInfoLines.push(`Nombre: ${customerName}`)
  if (customerPhone) customerInfoLines.push(`Celular: ${customerPhone}`)
  const customerInfo = customerInfoLines.length
    ? `${customerInfoLines.join("\n")}\n\n`
    : ""

  const productsList = products
    .map((p) => {
      let info = ""
      if (p.temperature || p.milkType || p.sweetener || p.sugarSpoons) {
        info = " ("
        if (p.temperature) info += p.temperature
        if (p.temperature && p.milkType) info += ", "
        if (p.milkType) info += `Leche ${p.milkType}`
        if ((p.temperature || p.milkType) && p.sweetener) info += ", "
        if (p.sweetener) info += p.sweetener
        if ((p.temperature || p.milkType || p.sweetener) && p.sugarSpoons) info += ", "
        if (p.sugarSpoons) info += `${p.sugarSpoons} cucharadas`
        info += ")"
      }
      return `• ${p.name}${info} x${p.quantity} - S/.${(p.price * p.quantity).toFixed(2)}`
    })
    .join("\n")

  return `Hola! Me gustaría hacer un pedido:\n\n${customerInfo}${productsList}\n\nTotal: S/.${total.toFixed(2)}`
}

export const getWhatsAppLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message)
  const numberWithoutPlus = WHATSAPP_NUMBER.replace("+", "")
  return `https://wa.me/${numberWithoutPlus}?text=${encodedMessage}`
}
