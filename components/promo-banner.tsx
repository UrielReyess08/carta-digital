"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface PromoBannerProps {
  onPromoBannerClick?: (action: string) => void
}

const PROMO_IMAGES = [
  {
    src: "/Carrusel/FotoPromo1.webp",
    alt: "Frappuccino",
    action: "frappuccinos", // Acción específica de esta imagen
  },
  {
    src: "/Carrusel/FotoPromo2.webp",
    alt: "Piña Colada",
    action: "promociones", // Acción específica de esta imagen
  },
  {
    src: "/Carrusel/FotoPromo3.webp",
    alt: "Cappuccino",
    action: "cappuccino", // Acción específica de esta imagen
  },
]

export function PromoBanner({ onPromoBannerClick }: PromoBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isAutoplayActive, setIsAutoplayActive] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const wasSwipeRef = useRef(false)

  const handleBannerClick = () => {
    // Solo ejecutar la acción si NO fue un swipe
    if (!wasSwipeRef.current && onPromoBannerClick) {
      const currentImage = PROMO_IMAGES[currentIndex]
      onPromoBannerClick(currentImage.action)
    }
    // Resetear el flag
    wasSwipeRef.current = false
  }

  // Autoplay
  useEffect(() => {
    if (!isAutoplayActive) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % PROMO_IMAGES.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoplayActive])

  // Función para pausar el autoplay
  const pauseAutoplay = () => {
    setIsAutoplayActive(false)
  }

  // Función para reanudar el autoplay después de un tiempo
  const scheduleAutoplayResume = () => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current)
    }
    
    autoplayTimeoutRef.current = setTimeout(() => {
      setIsAutoplayActive(true)
    }, 8000) // Reanudar después de 8 segundos de inactividad
  }

  // Detectar inicio de toque
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(0)
    wasSwipeRef.current = false
    pauseAutoplay()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX
    setTouchEnd(endX)
    handleSwipe(touchStart, endX)
    scheduleAutoplayResume()
  }

  const handleSwipe = (startX: number, endX: number) => {
    if (!startX || !endX) return

    const distance = startX - endX
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    // Si hay movimiento significativo, es un swipe
    if (isLeftSwipe || isRightSwipe) {
      wasSwipeRef.current = true
      
      if (isLeftSwipe) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % PROMO_IMAGES.length)
      } else if (isRightSwipe) {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + PROMO_IMAGES.length) % PROMO_IMAGES.length)
      }
    } else {
      // Si no hay movimiento significativo, es un clic
      wasSwipeRef.current = false
    }
  }

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      const offset = currentIndex * (100 / PROMO_IMAGES.length)
      carouselRef.current.style.transform = `translateX(-${offset}%)`
    }
  }, [currentIndex])

  return (
    <div className="w-full bg-gradient-to-b from-yellow-50 to-background py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="relative w-full rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleBannerClick}
        >
          {/* Carrusel */}
          <div className="relative w-full aspect-video md:aspect-[3/1] overflow-hidden">
            <div
              ref={carouselRef}
              className="absolute left-0 top-0 h-full transition-transform duration-500 ease-out flex"
              style={{ width: `${PROMO_IMAGES.length * 100}%` }}
            >
              {PROMO_IMAGES.map((image, index) => (
                <div key={index} className="relative flex-shrink-0" style={{ width: `${100 / PROMO_IMAGES.length}%` }}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                  />
                </div>
              ))}
            </div>

            {/* Indicadores (Dots) */}
            {PROMO_IMAGES.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {PROMO_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIndex(index)
                      pauseAutoplay()
                      scheduleAutoplayResume()
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-white w-6" : "bg-white/60"
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
