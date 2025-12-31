"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const SplashScreen = dynamic(() => import("./splash-screen").then(mod => ({ default: mod.SplashScreen })), {
  ssr: false
})

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      {children}
    </>
  )
}