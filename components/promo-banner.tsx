"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface PromoBannerProps {
  onPromoBannerClick?: () => void
}

const PROMO_IMAGES = [
  {
    src: "/Carrusel/FotoPromo1.webp",
    alt: "Frappuccino",
  },
  {
    src: "/Carrusel/FotoPromo2.webp",
    alt: "Piña Colada",
  },
  {
    src: "/Carrusel/FotoPromo3.webp",
    alt: "Cappuccino",
  },
]

export function PromoBanner({ onPromoBannerClick }: PromoBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % PROMO_IMAGES.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Detectar swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX)
    handleSwipe()
  }

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % PROMO_IMAGES.length)
    } else if (isRightSwipe) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + PROMO_IMAGES.length) % PROMO_IMAGES.length)
    }
  }

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
          onClick={onPromoBannerClick}
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
