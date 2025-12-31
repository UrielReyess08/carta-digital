export interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  description?: string
}

export const menuData: MenuItem[] = [
  // CAFÉ
  { id: "cafe-americano", name: "Americano", price: 3.5, category: "CAFÉ 10oz", description: "Café clásico americano" },
  { id: "cafe-espresso", name: "Espresso", price: 3.5, category: "CAFÉ 10oz" },
  { id: "cafe-cortado", name: "Cortado", price: 4.0, category: "CAFÉ 10oz" },
  { id: "cafe-cappuccino", name: "Cappuccino", price: 5.0, category: "CAFÉ 10oz" },
  { id: "cafe-moccacino", name: "Moccacino", price: 6.0, category: "CAFÉ 10oz" },
  {
    id: "cafe-winter",
    name: "Winter / Summer Coffee",
    price: 5.5,
    category: "CAFÉ 10oz",
    description: "Café americano + crema",
  },
  {
    id: "cafe-vikingo",
    name: "Vikingo Power Coffee",
    price: 7.0,
    category: "CAFÉ 10oz",
    description: "Doble espresso + Crema",
  },
  {
    id: "cafe-latte",
    name: "Coffee Latte (12oz)",
    price: 8.0,
    category: "CAFÉ 10oz",
    description: "Espresso + Leche + Crema",
  },

  // FRAPPUCCINOS
  { id: "frap-cafe", name: "Café", price: 10.0, category: "FRAPPUCCINOS 12oz" },
  { id: "frap-caramel", name: "Caramel", price: 10.0, category: "FRAPPUCCINOS 12oz" },
  { id: "frap-moca", name: "Moca", price: 10.0, category: "FRAPPUCCINOS 12oz" },
  { id: "frap-matcha", name: "Matcha", price: 10.0, category: "FRAPPUCCINOS 12oz" },

  // SMOOTHIES
  { id: "smooth-fresa", name: "Fresa", price: 10.0, category: "SMOOTHIES 12oz" },
  { id: "smooth-lucuma", name: "Lúcuma", price: 10.0, category: "SMOOTHIES 12oz" },
  { id: "smooth-mango", name: "Mango", price: 10.0, category: "SMOOTHIES 12oz" },
  { id: "smooth-arandano", name: "Arándano", price: 10.0, category: "SMOOTHIES 12oz" },
  {
    id: "smooth-frambuesa",
    name: "Frambuesa",
    price: 11.0,
    category: "SMOOTHIES 12oz",
  },

  // CAFÉ + LICOR
  { id: "cafelicor-baileys", name: "Vikingo Baileys Coffee", price: 8.0, category: "CAFÉ + LICOR 7oz" },
  { id: "cafelicor-brandy", name: "Vikingo Brandy Coffee", price: 8.0, category: "CAFÉ + LICOR 7oz" },
  { id: "cafelicor-irish", name: "Vikingo Irish Coffee", price: 8.0, category: "CAFÉ + LICOR 7oz" },
  {
    id: "cafelicor-bombom",
    name: "Vikingo Bom Bom",
    price: 6.0,
    category: "CAFÉ + LICOR 7oz",
    description: "Espresso + Licor + Crema",
  },

  // SIN CAFÉ
  { id: "sincafe-choco", name: "Choco Milk", price: 8.0, category: "SIN CAFÉ 12oz" },
  { id: "sincafe-caramel", name: "Caramel Latte", price: 8.0, category: "SIN CAFÉ 12oz" },
  {
    id: "sincafe-matcha",
    name: "Matcha Latte",
    price: 8.0,
    category: "SIN CAFÉ 12oz",
    description: "Frío. Tibio/Caliente + Crema",
  },

  // SIN CAFÉ + LICOR
  { id: "sincafelicor-lumumba", name: "Lumumba", price: 10.0, category: "SIN CAFÉ + LICOR 12oz" },
  { id: "sincafelicor-baileys", name: "Choco Baileys", price: 10.0, category: "SIN CAFÉ + LICOR 12oz" },
  {
    id: "sincafelicor-latte",
    name: "Baileys Latte",
    price: 10.0,
    category: "SIN CAFÉ + LICOR 12oz",
    description: "Frío. Tibio/Caliente + Crema",
  },

  // INFUSIONES
  { id: "infus-canela", name: "Té con Canela", price: 3.0, category: "INFUSIONES 10oz" },
  { id: "infus-jazmin", name: "Té Jazmín", price: 3.0, category: "INFUSIONES 10oz" },

  // FROZEN
  { id: "frozen-fresa", name: "Fresa", price: 9.0, category: "FROZEN 12oz" },
  { id: "frozen-lucuma", name: "Lúcuma", price: 9.0, category: "FROZEN 12oz" },
  { id: "frozen-mango", name: "Mango", price: 9.0, category: "FROZEN 12oz" },
  { id: "frozen-arandano", name: "Arándano", price: 9.0, category: "FROZEN 12oz" },
  { id: "frozen-maracuya", name: "Maracuyá", price: 9.0, category: "FROZEN 12oz" },
  { id: "frozen-frambuesa", name: "Frambuesa", price: 10.0, category: "FROZEN 12oz" },

  // ADICIONALES
  { id: "adic-baileys", name: "Shot Baileys", price: 3.0, category: "ADICIONALES" },
  { id: "adic-whisky", name: "Shot Whisky", price: 3.0, category: "ADICIONALES" },
  { id: "adic-brandy", name: "Shot Brandy", price: 3.0, category: "ADICIONALES" },
  { id: "adic-ron", name: "Shot Ron", price: 2.0, category: "ADICIONALES" },
  { id: "adic-espresso", name: "Shot Espresso", price: 3.0, category: "ADICIONALES" },
  { id: "adic-crema", name: "Crema", price: 1.0, category: "ADICIONALES" },
  { id: "adic-leche", name: "Extra Leche", price: 1.0, category: "ADICIONALES" },

  // SÁNDWICHES
  { id: "sand-pollo", name: "Pollo al Horno", price: 7.0, category: "SÁNDWICHES" },
  { id: "sand-tocino", name: "Tocino Ahumado", price: 7.0, category: "SÁNDWICHES" },
  {
    id: "sand-servicio",
    name: "Servicio en Pan de Masa Madre con Crema Casera al Estilo de Suecia",
    price: 7.0,
    category: "SÁNDWICHES",
  },

  // CREPES
  {
    id: "crepe-vainilla",
    name: "Crepe Casero - Vainilla",
    price: 4.0,
    category: "CREPES",
    description: "Relleno con crema",
  },
  {
    id: "crepe-chocolate",
    name: "Crepe Casero - Chocolate",
    price: 4.0,
    category: "CREPES",
    description: "Relleno con crema",
  },
  { id: "crepe-cafe", name: "Crepe Casero - Café", price: 4.0, category: "CREPES", description: "Relleno con crema" },
  {
    id: "crepe-maracuya",
    name: "Crepe Casero - Maracuyá",
    price: 4.0,
    category: "CREPES",
    description: "Relleno con crema",
  },
  { id: "crepe-limon", name: "Crepe Casero - Limón", price: 4.0, category: "CREPES", description: "Relleno con crema" },

  // MUFFINS
  { id: "muffin-vainilla", name: "Vainilla", price: 4.0, category: "MUFFINS" },
  { id: "muffin-chocolate", name: "Chocolate", price: 4.0, category: "MUFFINS" },

  // KANELBUILLAR
  { id: "kanel-rollo", name: "Rollos de Canela", price: 4.0, category: "KANELBUILLAR", description: "Sueco" },

  // CHOKLADBOLLAR
  {
    id: "chokol-tradicional",
    name: "Traditional Chocolate",
    price: 2.5,
    category: "CHOKLADBOLLAR",
    description: "Sueco",
  },
]

export const getCategoriesInOrder = (): string[] => {
  const categories = new Map<string, number>()
  const order = [
    "CAFÉ 10oz",
    "FRAPPUCCINOS 12oz",
    "SMOOTHIES 12oz",
    "CAFÉ + LICOR 7oz",
    "SIN CAFÉ 12oz",
    "SIN CAFÉ + LICOR 12oz",
    "INFUSIONES 10oz",
    "FROZEN 12oz",
    "ADICIONALES",
    "SÁNDWICHES",
    "CREPES",
    "MUFFINS",
    "KANELBUILLAR",
    "CHOKLADBOLLAR",
  ]

  return order
}

export const getProductsByCategory = (category: string): MenuItem[] => {
  return menuData.filter((item) => item.category === category)
}
