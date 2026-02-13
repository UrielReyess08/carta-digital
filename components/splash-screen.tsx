"use client"

import {  useEffect, useState  } from "react"

interface SplashScreenProps {
    onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(onComplete, 500)
        }, 2000)

        return () => clearTimeout(timer)
    }, [onComplete])

    if (!isVisible) return null

    return (
        <div className={`fixed inset-0 bg-gradient-to-b from-yellow-50 to-background flex items-center justify-center z-[9999] transition-opacity duration-500 ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}>
      <div className="text-center animate-splash-bounce">
        <img
          src="logo-el-vikingo-.png"
          alt="El Vikingo Coffee Bike"
          className="h-294 w-294 object-contain mx-auto mb-6 animate-splash-scale"
        />
        
        <h1 className="text-4xl font-bold text-primary mb-2 animate-splash-fade">
          El Vikingo
        </h1>
        <p className="text-lg text-muted-foreground animate-splash-fade-delay">
          Coffee Bike
        </p>
      </div>
    </div>
    )
}