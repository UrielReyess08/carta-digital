export interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  description?: string
  image?: string
}

export const menuData: MenuItem[] = [

  // PROMOCIONES
  {id: "pina-colada", name: "Piña colada", price: 100.00, category: "PROMOCIONES", image: "/promos/FrozenArandano.webp"},

  // CAFÉ 7oz
  { id: "cafe-vikingo-baileys-7", name: "Vikingo Baileys Coffee", price: 6.00, category: "CAFÉ 7oz", image: "/Cafe7/VikingoBaileysCoffee.webp" },
  //{ id: "cafe-vikingo-bombom-7", name: "Vikingo Bom bóm", price: 5.00, category: "CAFÉ 7oz", description: "Espresso + Ron + crema" },

  // CAFÉ 10oz
  { id: "cafe-americano-10", name: "Americano", price: 3.00, category: "CAFÉ 10oz", image: "/Cafe/Americano.webp"},
  { id: "cafe-espresso-10", name: "Espresso", price: 3.00, category: "CAFÉ 10oz", image: "/Cafe/Espresso.webp" },
  { id: "cafe-cappuccino-10", name: "Cappuccino", price: 4.00, category: "CAFÉ 10oz", image: "/Cafe/Capuccino.webp"},
  { id: "cafe-mocaccino-10", name: "Mocaccino", price: 5.00, category: "CAFÉ 10oz", image: "/Cafe/Mocaccino.webp"},
  //{ id: "cafe-winter-summer-10", name: "Winter / Summer Coffee", price: 4.00, category: "CAFÉ 10oz", description: "Americano + crema" },
  //{ id: "cafe-vikingo-power-10", name: "Vikingo Power Coffee", price: 5.00, category: "CAFÉ 10oz", description: "Doble espresso + crema" },

  // CAFÉ 12oz
  //{ id: "cafe-latte-12", name: "Coffee latte", price: 7.00, category: "CAFÉ 12oz", description: "Espresso + leche + crema" },

  // SIN CAFÉ 12oz
  { id: "sincafe-choco-milk-12", name: "Choco milk", price: 7.00, category: "SIN CAFÉ 12oz", image: "/SinCafe/Chocomilk.webp" },
  { id: "sincafe-choco-baileys-12", name: "Choco Baileys", price: 10.00, category: "SIN CAFÉ 12oz", image: "/SinCafe/ChocoBaileys.webp" },
  { id: "sincafe-caramel-latte-12", name: "Caramel Latte", price: 7.00, category: "SIN CAFÉ 12oz", image: "/SinCafe/CaramelLatte.webp" },
  //{ id: "sincafe-baileys-latte-12", name: "Baileys Latte", price: 10.00, category: "SIN CAFÉ 12oz" },
  { id: "trago-lumumba-latte-12", name: "Trago Lumumba", price: 10.00, category: "SIN CAFÉ 12oz", image: "/SinCafe/TragoLumumba.webp"},

  // FRAPPUCCINOS 12oz
  { id: "frap-cafe-12", name: "Frappuccino Café", price: 9.00, category: "FRAPPUCCINOS 12oz", image: "/Frappucinos/FrappucinoCafe.webp" },
  { id: "frap-caramel-12", name: "Frappuccino Caramel", price: 9.00, category: "FRAPPUCCINOS 12oz", image: "/Frappucinos/FrappuccinoCaramel.webp" },
  { id: "frap-moca-12", name: "Frappuccino Moca", price: 9.00, category: "FRAPPUCCINOS 12oz", image: "/Frappucinos/FrappuccinoMoca.webp" },
  { id: "frap-matcha-12", name: "Frappuccino Matcha", price: 10.00, category: "FRAPPUCCINOS 12oz", image: "/Frappucinos/FrappucinoMatcha.webp" },

  // SMOOTHIES 12oz
  { id: "smooth-fresa-12", name: "Smoothie Fresa", price: 9.00, category: "SMOOTHIES 12oz", image: "/Smoothies/SmoothiesFresa.webp"},
  { id: "smooth-frambuesa-12", name: "Smoothie Frambuesa", price: 11.00, category: "SMOOTHIES 12oz", image: "/Smoothies/SmoothiesFrambuesa.webp" },
  { id: "smooth-lucuma-12", name: "Smoothie Lúcuma", price: 9.00, category: "SMOOTHIES 12oz", image: "/Smoothies/SmoothiesLucuma.webp"},
  { id: "smooth-mango-12", name: "Smoothie Mango", price: 9.00, category: "SMOOTHIES 12oz", image: "/Smoothies/SmoothiesMango.webp"},
  { id: "smooth-arandano-12", name: "Smoothie Arándano", price: 9.00, category: "SMOOTHIES 12oz", image: "/Smoothies/SmoothiesArandano.webp"},
  { id: "smooth-chocolate-12", name: "Smoothie Chocolate", price: 9.00, category: "SMOOTHIES 12oz", image: "/Smoothies/SmoothiesChocolate.webp"},

  // FROZEN 12oz
  { id: "frozen-fresa-12", name: "Frozen Fresa", price: 8.00, category: "FROZEN 12oz", image: "/Frozen/FrozenFresa.webp" },
  { id: "frozen-lucuma-12", name: "Frozen Lúcuma", price: 8.00, category: "FROZEN 12oz", image: "/Frozen/FrozenLucuma.webp" },
  { id: "frozen-mango-12", name: "Frozen Mango", price: 8.00, category: "FROZEN 12oz", image: "/Frozen/FrozenMango.webp" },
  { id: "frozen-arandano-12", name: "Frozen Arándano", price: 8.00, category: "FROZEN 12oz", image: "/Frozen/FrozenArandano.webp" },
  { id: "frozen-maracuya-12", name: "Frozen Maracuyá", price: 8.00, category: "FROZEN 12oz", image: "/Frozen/FrozenMaracuya.webp" },
  { id: "frozen-frambuesa-12", name: "Frozen Frambuesa", price: 10.00, category: "FROZEN 12oz", image: "/Frozen/FrozenFrambuesa.webp" },

  // SNACKS
  { id: "snack-sandwich-pollo", name: "Sándwich – Pollo al horno", price: 6.00, category: "SNACKS", image: "/Snacks/PolloAlHorno.webp" },
  { id: "snack-sandwich-tocino", name: "Sándwich – Tocino ahumado", price: 6.00, category: "SNACKS", image: "/Snacks/TocinoAhumado.webp" },
  { id: "snack-crepe-vainilla", name: "Crepe – Vainilla", price: 4.00, category: "SNACKS", image: "/Snacks/CrepesDeVainilla.webp" },
  { id: "snack-crepe-maracuya", name: "Crepe – Maracuyá", price: 4.00, category: "SNACKS", image: "/Snacks/CrepesDeMaracuya.webp" },
  { id: "snack-crepe-fresa", name: "Crepe - Fresa", price: 4.00, category: "SNACKS", image: "/Snacks/CrepesDeFresa.webp"},
  { id: "snack-kanelbullar", name: "Kanelbullar", price: 4.00, description: "Rollo de canela sueco", category: "SNACKS", image: "/Snacks/Kanelbullar.webp" },
  { id: "snack-chokladbollar", description: "Trufas de chocolate sueco", name: "Chokladbollar", price: 2.00, category: "SNACKS", image: "/Snacks/Chokladbollar.webp" },

  // ADICIONALES
  { id: "adic-shot-baileys", name: "Shot de Baileys", price: 3.00, category: "ADICIONALES", image: "/Adicionales/ShotDeBaileys.webp" },
  { id: "adic-shot-ron", name: "Shot de Ron", price: 2.00, category: "ADICIONALES", image: "/Adicionales/ShotDeRon.webp" },
  { id: "adic-crema", name: "Crema", price: 2.00, category: "ADICIONALES", image: "/Adicionales/Crema.webp" },
]

export const getCategoriesInOrder = (): string[] => {
  return [
    "PROMOCIONES",
    "CAFÉ 7oz",
    "CAFÉ 10oz",
    //"CAFÉ 12oz",
    "SIN CAFÉ 12oz",
    "FRAPPUCCINOS 12oz",
    "SMOOTHIES 12oz",
    "FROZEN 12oz",
    "SNACKS",
    "ADICIONALES",
  ]

  //return order
}

export const getProductsByCategory = (category: string): MenuItem[] => {
  return menuData.filter((item) => item.category === category)
}
