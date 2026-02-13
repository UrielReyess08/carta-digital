import Image from "next/image"

interface PromoBannerProps {
  onPromoBannerClick?: () => void
}

export function PromoBanner({ onPromoBannerClick }: PromoBannerProps) {
  return (
    <div className="w-full bg-gradient-to-b from-yellow-50 to-background py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative w-full h-auto rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={onPromoBannerClick}>
          {/* Banner con imagen de fondo */}
          <div className="relative w-full aspect-video md:aspect-[3/1]">
            <Image
              src="/PORTADA.webp"
              alt="Piña Colada Promo"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
