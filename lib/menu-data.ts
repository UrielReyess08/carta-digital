export interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  description?: string
  image?: string
  sweetenerOptions?: Array<"Azúcar" | "Stevia">
  temperatureOptions?: Array<"Frío" | "Tibio" | "Caliente">
}

export const menuData: MenuItem[] = [

  // PROMOCIONES
  {id: "pina-colada", name: "Piña colada", price: 100.00, category: "PROMOCIONES", description: "Bebida refrescante con sabor tropical de piña y coco", image: "/promos/FrozenArandano.webp", sweetenerOptions: ["Azúcar", "Stevia"]},

  // CAFÉ 7oz
  { id: "cafe-vikingo-baileys-7", name: "Vikingo Baileys Coffee", price: 6.00, category: "CAFÉ 7oz", description: "Espresso con crema y licor de Baileys", image: "/Cafe7/VikingoBaileysCoffee.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"] },
  //{ id: "cafe-vikingo-bombom-7", name: "Vikingo Bom bóm", price: 5.00, category: "CAFÉ 7oz", description: "Espresso + Ron + crema" },

  // CAFÉ 10oz
  { id: "cafe-americano-10", name: "Americano", price: 3.00, category: "CAFÉ 10oz", description: "Espresso con agua caliente", image: "/Cafe/Americano.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"]},
  { id: "cafe-espresso-10", name: "Espresso", price: 3.00, category: "CAFÉ 10oz", description: "Café concentrado con cuerpo intenso", image: "/Cafe/Espresso.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"] },
  { id: "cafe-cappuccino-10", name: "Cappuccino", price: 4.00, category: "CAFÉ 10oz", description: "Espresso con leche al vapor y espuma cremosa", image: "/Cafe/Capuccino.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"]},
  { id: "cafe-mocaccino-10", name: "Mocaccino", price: 5.00, category: "CAFÉ 10oz", description: "Espresso con leche y chocolate", image: "/Cafe/Mocaccino.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"]},
  //{ id: "cafe-winter-summer-10", name: "Winter / Summer Coffee", price: 4.00, category: "CAFÉ 10oz", description: "Americano + crema" },
  //{ id: "cafe-vikingo-power-10", name: "Vikingo Power Coffee", price: 5.00, category: "CAFÉ 10oz", description: "Doble espresso + crema" },

  // CAFÉ 12oz
  //{ id: "cafe-latte-12", name: "Coffee latte", price: 7.00, category: "CAFÉ 12oz", description: "Espresso + leche + crema" },

  // SIN CAFÉ 12oz
  { id: "sincafe-choco-milk-12", name: "Choco milk", price: 7.00, category: "SIN CAFÉ 12oz", description: "Leche con chocolate puro y delicioso", image: "/SinCafe/Chocomilk.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Frío", "Tibio", "Caliente"] },
  { id: "sincafe-choco-baileys-12", name: "Choco Baileys", price: 10.00, category: "SIN CAFÉ 12oz", description: "Chocolate con licor de Baileys", image: "/SinCafe/ChocoBaileys.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Frío", "Tibio", "Caliente"] },
  { id: "sincafe-caramel-latte-12", name: "Caramel Latte", price: 7.00, category: "SIN CAFÉ 12oz", description: "Leche con sabor a caramelo dulce", image: "/SinCafe/CaramelLatte.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Frío", "Tibio", "Caliente"] },
  { id: "sincafe-coffee-latte-12", name: "Coffee Latte", price: 7.00, category: "SIN CAFÉ 12oz", description: "Espresso con leche cremosa", image: "/SinCafe/", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Frío", "Tibio", "Caliente"] },
  { id: "sincafe-matcha-latte-12", name: "Matcha Latte", price: 10.00, category: "SIN CAFÉ 12oz", description: "Té matcha con leche", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Frío", "Tibio", "Caliente"] },
  { id: "sincafe-baileys-latte-12", name: "Baileys Latte", price: 10.00, category: "SIN CAFÉ 12oz", description: "Leche con licor de Baileys", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Frío", "Tibio", "Caliente"] },
  { id: "trago-lumumba-latte-12", name: "Trago Lumumba", price: 10.00, category: "SIN CAFÉ 12oz", description: "Bebida artesanal con chocolate y licores", image: "/SinCafe/TragoLumumba.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Frío", "Tibio", "Caliente"] },

  // FRAPPUCCINOS 12oz
  { id: "frap-cafe-12", name: "Frappuccino Café", price: 9.00, category: "FRAPPUCCINOS 12oz", description: "Café helado con crema batida", image: "/Frappucinos/FrappucinoCafe.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frap-caramel-12", name: "Frappuccino Caramel", price: 9.00, category: "FRAPPUCCINOS 12oz", description: "Caramelo helado con crema batida", image: "/Frappucinos/FrappuccinoCaramel.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frap-moca-12", name: "Frappuccino Moca", price: 9.00, category: "FRAPPUCCINOS 12oz", description: "Chocolate y café helado con crema batida", image: "/Frappucinos/FrappuccinoMoca.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frap-matcha-12", name: "Frappuccino Matcha", price: 10.00, category: "FRAPPUCCINOS 12oz", description: "Matcha helado con crema batida", image: "/Frappucinos/FrappucinoMatcha.webp", sweetenerOptions: ["Azúcar", "Stevia"] },

  // SMOOTHIES 12oz
  { id: "smooth-fresa-12", name: "Smoothie Fresa", price: 9.00, category: "SMOOTHIES 12oz", description: "Bebida natural de fresa con leche", image: "/Smoothies/SmoothiesFresa.webp", sweetenerOptions: ["Azúcar", "Stevia"]},
  { id: "smooth-frambuesa-12", name: "Smoothie Frambuesa", price: 11.00, category: "SMOOTHIES 12oz", description: "Bebida natural de frambuesa con leche", image: "/Smoothies/SmoothiesFrambuesa.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "smooth-lucuma-12", name: "Smoothie Lúcuma", price: 9.00, category: "SMOOTHIES 12oz", description: "Bebida natural de lúcuma con leche", image: "/Smoothies/SmoothiesLucuma.webp", sweetenerOptions: ["Azúcar", "Stevia"]},
  { id: "smooth-mango-12", name: "Smoothie Mango", price: 9.00, category: "SMOOTHIES 12oz", description: "Bebida natural de mango con leche", image: "/Smoothies/SmoothiesMango.webp", sweetenerOptions: ["Azúcar", "Stevia"]},
  { id: "smooth-arandano-12", name: "Smoothie Arándano", price: 9.00, category: "SMOOTHIES 12oz", description: "Bebida natural de arándano con leche", image: "/Smoothies/SmoothiesArandano.webp", sweetenerOptions: ["Azúcar", "Stevia"]},
  { id: "smooth-chocolate-12", name: "Smoothie Chocolate", price: 9.00, category: "SMOOTHIES 12oz", description: "Chocolate con frutas y leche natural", image: "/Smoothies/SmoothiesChocolate.webp", sweetenerOptions: ["Azúcar", "Stevia"]},

  // FROZEN 12oz
  { id: "frozen-fresa-12", name: "Frozen Fresa", price: 8.00, category: "FROZEN 12oz", description: "Fresa congelada con hielo", image: "/Frozen/FrozenFresa.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frozen-lucuma-12", name: "Frozen Lúcuma", price: 8.00, category: "FROZEN 12oz", description: "Lúcuma congelada con hielo", image: "/Frozen/FrozenLucuma.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frozen-mango-12", name: "Frozen Mango", price: 8.00, category: "FROZEN 12oz", description: "Mango congelado con hielo", image: "/Frozen/FrozenMango.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frozen-arandano-12", name: "Frozen Arándano", price: 8.00, category: "FROZEN 12oz", description: "Arándano congelado con hielo", image: "/Frozen/FrozenArandano.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frozen-maracuya-12", name: "Frozen Maracuyá", price: 8.00, category: "FROZEN 12oz", description: "Maracuyá congelada con hielo", image: "/Frozen/FrozenMaracuya.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frozen-frambuesa-12", name: "Frozen Frambuesa", price: 10.00, category: "FROZEN 12oz", description: "Frambuesa congelada con hielo", image: "/Frozen/FrozenFrambuesa.webp", sweetenerOptions: ["Azúcar", "Stevia"] },

  // SNACKS
  { id: "snack-sandwich-pollo", name: "Sándwich – Pollo al horno", price: 6.00, category: "SNACKS", description: "Pan fresco con pollo tierno asado", image: "/Snacks/PolloAlHorno.webp" },
  { id: "snack-sandwich-tocino", name: "Sándwich – Tocino ahumado", price: 6.00, category: "SNACKS", description: "Pan crujiente con tocino ahumado", image: "/Snacks/TocinoAhumado.webp" },
  { id: "snack-crepe-vainilla", name: "Crepe – Vainilla", price: 4.00, category: "SNACKS", description: "Crepe suave relleno de vainilla", image: "/Snacks/CrepesDeVainilla.webp" },
  { id: "snack-crepe-maracuya", name: "Crepe – Maracuyá", price: 4.00, category: "SNACKS", description: "Crepe con relleno de maracuyá tropical", image: "/Snacks/CrepesDeMaracuya.webp" },
  { id: "snack-crepe-fresa", name: "Crepe - Fresa", price: 4.00, category: "SNACKS", description: "Crepe delicado relleno de fresa fresca", image: "/Snacks/CrepesDeFresa.webp"},
  { id: "snack-kanelbullar", name: "Kanelbullar", price: 4.00, description: "Rollo de canela sueco tradicional", category: "SNACKS", image: "/Snacks/Kanelbullar.webp" },
  { id: "snack-chokladbollar", description: "Trufas de chocolate sueco", name: "Chokladbollar", price: 2.00, category: "SNACKS", image: "/Snacks/Chokladbollar.webp" },

  // ADICIONALES
  { id: "adic-shot-baileys", name: "Shot de Baileys", price: 3.00, category: "ADICIONALES", description: "Licor de Baileys cremoso", image: "/Adicionales/ShotDeBaileys.webp" },
  { id: "adic-shot-ron", name: "Shot de Ron", price: 2.00, category: "ADICIONALES", description: "Ron añejo en pequeña dosis", image: "/Adicionales/ShotDeRon.webp" },
  { id: "adic-crema", name: "Crema", price: 2.00, category: "ADICIONALES", description: "Crema batida fresca", image: "/Adicionales/Crema.webp" },
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
