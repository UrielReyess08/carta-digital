export interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  description?: string
  image?: string
  sweetenerOptions?: Array<"Azúcar" | "Stevia">
  temperatureOptions?: Array<"Frío" | "Tibio" | "Caliente">
  flavorOptions?: Array<string>
}

export const menuData: MenuItem[] = [

  // PROMOCIONES
  { id: "pina-colada", name: "Piña Colada", price: 12.00, category: "PROMOCIONES", description: "Mezcla tropical y cremosa de pulpa de piña natural con crema de coco, servida bien fría", image: "/Promociones/FresaColada.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "fresa-colada", name: "Fresa Colada", price: 12.00, category: "PROMOCIONES", description: "Variante dulce y frutal que combina fresas seleccionadas con la cremosidad del coco", image: "/Promociones/PinaColada.webp", sweetenerOptions: ["Azúcar", "Stevia"] },

  // CAFÉ + LICOR 7oz
  { id: "cafe-vikingo-baileys-7", name: "Vikingo Baileys Coffee", price: 8.00, category: "CAFÉ + LICOR 7oz", description: "Café espresso mezclado con licor de crema irlandesa Baileys", image: "/CafeLicor/VikingoBaileysCoffee.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"] },
  { id: "cafe-vikingo-brandy-7", name: "Vikingo Brandy Coffee", price: 8.00, category: "CAFÉ + LICOR 7oz", description: "Café espresso con un toque de Brandy", image: "/CafeLicor/VikingoBrandyCoffee.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"] },
  { id: "cafe-vikingo-irish-7", name: "Vikingo Irish Coffee", price: 8.00, category: "CAFÉ + LICOR 7oz", description: "Café con Whisky y una capa de crema", image: "/CafeLicor/VikingoIrishCoffee.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"] },
  { id: "cafe-vikingo-bombom-7", name: "Vikingo Bom Bom", price: 6.00, category: "CAFÉ + LICOR 7oz", description: "Espresso intenso con licor y crema", image: "/CafeLicor/VikingoBombom.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"] },

  // CAFÉ 10oz
  { id: "cafe-americano-10", name: "Americano", price: 3.50, category: "CAFÉ 10oz", description: "Café espresso diluido en agua caliente", image: "/Cafe10/Americano.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"] },
  { id: "cafe-espresso-10", name: "Espresso", price: 3.50, category: "CAFÉ 10oz", description: "Shot de café puro concentrado", image: "/Cafe10/Espress.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"] },
  { id: "cafe-cortado-10", name: "Cortado", price: 4.00, category: "CAFÉ 10oz", description: "Espresso con una pequeña cantidad de leche tibia para cortar la acidez", image: "/Cafe10/Cortado.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"] },
  { id: "cafe-cappuccino-10", name: "Cappuccino", price: 5.00, category: "CAFÉ 10oz", description: "Combinación de café espresso, leche caliente y una capa generosa de espuma de leche", image: "/Cafe10/Cappu.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"] },
  { id: "cafe-mocaccino-10", name: "Mocaccino", price: 6.00, category: "CAFÉ 10oz", description: "Mezcla de café espresso, chocolate y leche", image: "/Cafe10/Mocacci.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"] },
  { id: "cafe-winter-summer-10", name: "Winter / Summer Coffee", price: 5.50, category: "CAFÉ 10oz", description: "Café americano cubierto con una capa de crema batida", image: "/Cafe10/WinterSummerCoffee.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"] },

  // CAFÉ 12oz
  { id: "cafe-latte-12", name: "Coffee Latte", price: 8.00, category: "CAFÉ 12oz", description: "Combinación de café espresso, leche y un toque de crema", image: "/Cafe12/CoffeeLatte.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente", "Frío"] },

  // SIN CAFÉ 12oz
  { id: "sincafe-choco-milk-12", name: "Choco Milk", price: 8.00, category: "SIN CAFÉ 12oz", description: "Mezcla reconfortante de leche cremosa con cacao premium, servida con una corona de crema batida", image: "/SinCafe/ChocoMilk.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Frío", "Tibio", "Caliente"] },
  { id: "sincafe-caramel-latte-12", name: "Caramel Latte", price: 8.00, category: "SIN CAFÉ 12oz", description: "Leche suave infusionada con jarabe de caramelo dulce, ideal para quienes buscan un toque sedoso y avainillado", image: "/SinCafe/CaramelLatt.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Frío", "Tibio", "Caliente"] },
  { id: "sincafe-matcha-latte-12", name: "Matcha Latte", price: 8.00, category: "SIN CAFÉ 12oz", description: "Té verde oriental molido de alta calidad mezclado con leche, ofreciendo un sabor herbal único y equilibrado", image: "/SinCafe/MatchaLatte.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Frío", "Tibio", "Caliente"] },
  { id: "sincafe-lumumba-12", name: "Lumumba", price: 10.00, category: "SIN CAFÉ 12oz", description: "Combinación con carácter que mezcla chocolate premium con un toque de licor, ideal para entrar en calor", image: "/SinCafe/Lumumba.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Frío", "Tibio", "Caliente"] },
  { id: "sincafe-choco-baileys-12", name: "Choco Baileys", price: 10.00, category: "SIN CAFÉ 12oz", description: "Fusión perfecta entre el chocolate artesanal y la suavidad de la crema de whisky Baileys", image: "/SinCafe/ChocoBailey.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Frío", "Tibio", "Caliente"] },
  { id: "sincafe-baileys-latte-12", name: "Baileys Latte", price: 10.00, category: "SIN CAFÉ 12oz", description: "Leche vaporizada con el toque justo de Baileys, creando una bebida cremosa y con notas de roble y vainilla", image: "/SinCafe/BaileysLatte.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Frío", "Tibio", "Caliente"] },

  // FRAPPUCCINOS 12oz
  { id: "frap-cafe-12", name: "Frappuccino de Café", price: 10.00, category: "FRAPPUCCINOS 12oz", description: "Batido helado de café espresso con leche y hielo triturado, perfecto para refrescarse con cafeína", image: "/Frappucinos/FrappuccinoCafe.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frap-caramel-12", name: "Frappuccino de Caramelo", price: 10.00, category: "FRAPPUCCINOS 12oz", description: "Café granizado con un remolino de caramelo dulce y textura cremosa", image: "/Frappucinos/FrappuccinoCara.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frap-moca-12", name: "Frappuccino de Moca", price: 10.00, category: "FRAPPUCCINOS 12oz", description: "Combinación clásica de café y chocolate en una versión helada y refrescante", image: "/Frappucinos/FrappuccinoMo.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frap-matcha-12", name: "Frappuccino de Matcha", price: 10.00, category: "FRAPPUCCINOS 12oz", description: "Opción refrescante y energética que combina el té matcha con hielo granizado y leche", image: "/Frappucinos/Frappuccinomatcha.webp", sweetenerOptions: ["Azúcar", "Stevia"] },

  // SMOOTHIES 12oz
  { id: "smooth-fresa-12", name: "Smoothie de Fresa", price: 10.00, category: "SMOOTHIES 12oz", description: "Batido espeso de puras fresas naturales con leche y crema, logrando una textura de postre bebible", image: "/Smoothies/SmoothieFresa.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "smooth-lucuma-12", name: "Smoothie de Lúcuma", price: 10.00, category: "SMOOTHIES 12oz", description: "Especialidad local con la pulpa de la fruta de oro, cremosa y con un sabor intenso", image: "/Smoothies/SmoothieLucuma.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "smooth-mango-12", name: "Smoothie de Mango", price: 10.00, category: "SMOOTHIES 12oz", description: "Preparado con pulpa de mango fresco, leche y crema para una experiencia tropical y dulce", image: "/Smoothies/SmoothieMango.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "smooth-arandano-12", name: "Smoothie de Arándano", price: 10.00, category: "SMOOTHIES 12oz", description: "Batido cargado de antioxidantes con arándanos naturales y una base muy cremosa", image: "/Smoothies/SmoothieArandano.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "smooth-frambuesa-12", name: "Smoothie de Frambuesa", price: 11.00, category: "SMOOTHIES 12oz", description: "Equilibrio perfecto entre la acidez de la frambuesa y la dulzura de la crema de leche", image: "/Smoothies/SmoothieFrambuesa.webp", sweetenerOptions: ["Azúcar", "Stevia"] },

  // FROZEN 12oz
  { id: "frozen-fresa-12", name: "Frozen de Fresa", price: 9.00, category: "FROZEN 12oz", description: "Bebida súper refrescante hecha a base de pura pulpa de fruta y abundante hielo triturado", image: "/Frozen/FrozenFre.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frozen-lucuma-12", name: "Frozen de Lúcuma", price: 9.00, category: "FROZEN 12oz", description: "Bebida súper refrescante hecha a base de pura pulpa de fruta y abundante hielo triturado", image: "/Frozen/FrozenLucu.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frozen-mango-12", name: "Frozen de Mango", price: 9.00, category: "FROZEN 12oz", description: "Bebida súper refrescante hecha a base de pura pulpa de fruta y abundante hielo triturado", image: "/Frozen/FrozenMan.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frozen-arandano-12", name: "Frozen de Arándano", price: 9.00, category: "FROZEN 12oz", description: "Bebida súper refrescante hecha a base de pura pulpa de fruta y abundante hielo triturado", image: "/Frozen/FrozenAran.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frozen-maracuya-12", name: "Frozen de Maracuyá", price: 9.00, category: "FROZEN 12oz", description: "Explosión cítrica y refrescante, ideal para los días de sol", image: "/Frozen/FrozenMara.webp", sweetenerOptions: ["Azúcar", "Stevia"] },
  { id: "frozen-frambuesa-12", name: "Frozen de Frambuesa", price: 10.00, category: "FROZEN 12oz", description: "Granizado intenso con el sabor silvestre y refrescante de las frambuesas", image: "/Frozen/FrozenFram.webp", sweetenerOptions: ["Azúcar", "Stevia"] },

  // INFUSIONES 10oz
  { id: "infusion-te-canela", name: "Té con Canela", price: 3.00, category: "INFUSIONES 10oz", description: "Agua caliente infusionada con hojas de té y el aroma cálido y amaderado de la canela natural", image: "/Infusiones/TeCanela.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente"] },
  { id: "infusion-te-jazmin", name: "Té Jazmín", price: 3.00, category: "INFUSIONES 10oz", description: "Infusión floral delicada, conocida por sus propiedades relajantes y su aroma suave", image: "/Infusiones/TeJazmin.webp", sweetenerOptions: ["Azúcar", "Stevia"], temperatureOptions: ["Caliente"] },

  // SNACKS
  { id: "snack-sandwich-pollo", name: "Sándwich de Pollo al Horno", price: 7.00, category: "SNACKS", description: "Pechuga horneada, queso rallado, huevo sancochado y crema de curry en pan de masa madre", image: "/Snacks/SandwichPolloHorno.webp" },
  { id: "snack-sandwich-tocino", name: "Sándwich de Tocino Ahumado", price: 7.00, category: "SNACKS", description: "Trozos de tocino ahumado, queso rallado, huevo sancochado y crema BBQ en pan de masa madre", image: "/Snacks/SandwichTocinoahumado.webp" },
  { id: "snack-kanelbullar", name: "Kanelbullar", price: 4.00, category: "SNACKS", description: "Rollos de canela tradicionales de Suecia; masa dulce especiada con canela y azúcar", image: "/Snacks/Kanelbull.webp" },
  { id: "snack-muffin", name: "Muffins", price: 4.00, category: "SNACKS", description: "Panquecitos esponjosos con opciones de sabor Vainilla o Chocolate con chispas", image: "/Snacks/Muffins.webp", flavorOptions: ["Vainilla", "Chocolate"] },
  { id: "snack-chokladbollar", name: "Chokladbollar", price: 2.50, category: "SNACKS", description: "Trufas de chocolate tradicionales suecas; contienen avena, cacao, azúcar y están cubiertas con ralladura de coco", image: "/Snacks/Choklad.webp" },

  { id: "crepe-vainilla", name: "Crepe de Vainilla", price: 4.00, category: "SNACKS", description: "Masa delgada artesanal rellena con crema de vainilla", image: "/Snacks/CrepeVainilla.webp" },
  { id: "crepe-chocolate", name: "Crepe de Chocolate", price: 4.00, category: "SNACKS", description: "Masa delgada artesanal rellena con crema de chocolate", image: "/Snacks/CrepeChocolate.webp" },
  { id: "crepe-cafe", name: "Crepe de Café", price: 4.00, category: "SNACKS", description: "Masa delgada artesanal rellena con crema con esencia de café", image: "/Snacks/CrepeCafe.webp" },
  { id: "crepe-maracuya", name: "Crepe de Maracuyá", price: 4.00, category: "SNACKS", description: "Masa delgada artesanal rellena con crema de fruta ácida (maracuyá)", image: "/Snacks/CrepeMaracuya.webp" },
  { id: "crepe-limon", name: "Crepe de Limón", price: 4.00, category: "SNACKS", description: "Masa delgada artesanal rellena con crema cítrica de limón", image: "/Snacks/CrepeLimon.webp" },

  // ADICIONALES
  { id: "adic-shot-baileys", name: "Shot de Baileys", price: 3.00, category: "ADICIONALES", description: "Licor de crema irlandesa Baileys", image: "/Adicionales/ShotBailey.webp" },
  { id: "adic-shot-whisky", name: "Shot de Whisky", price: 3.00, category: "ADICIONALES", description: "Whisky de calidad en pequeña dosis", image: "/Adicionales/ShotWisky.webp" },
  { id: "adic-shot-brandy", name: "Shot de Brandy", price: 3.00, category: "ADICIONALES", description: "Brandy aromático en shot", image: "/Adicionales/ShotBrandy.webp" },
  { id: "adic-shot-espresso", name: "Shot de Espresso", price: 3.00, category: "ADICIONALES", description: "Shot adicional de café espresso concentrado", image: "/Adicionales/ShotEspresso.webp" },
  { id: "adic-shot-ron", name: "Shot de Ron", price: 2.00, category: "ADICIONALES", description: "Ron añejo en pequeña dosis", image: "/Adicionales/ShotRon.webp" },
  { id: "adic-crema", name: "Crema", price: 2.00, category: "ADICIONALES", description: "Crema batida fresca", image: "/Adicionales/Cremas.webp" },
  { id: "adic-extra-leche", name: "Extra Leche", price: 1.00, category: "ADICIONALES", description: "Porción adicional de leche", image: "/Adicionales/ExtraLeche.webp" },
]

export const getCategoriesInOrder = (): string[] => {
  return [
    "PROMOCIONES",
    "CAFÉ + LICOR 7oz",
    "CAFÉ 10oz",
    "CAFÉ 12oz",
    "SIN CAFÉ 12oz",
    "FRAPPUCCINOS 12oz",
    "SMOOTHIES 12oz",
    "FROZEN 12oz",
    "INFUSIONES 10oz",
    "SNACKS",
    "ADICIONALES",
  ]
}

export const getProductsByCategory = (category: string): MenuItem[] => {
  return menuData.filter((item) => item.category === category)
}
