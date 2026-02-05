"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import QRCode from "qrcode"

export function QRDisplay() {
  const [qrUrl, setQrUrl] = useState<string>("")

  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = typeof window !== "undefined" ? window.location.origin : "https://ejemplo.com"
        const qr = await QRCode.toDataURL(url, {
          width: 300,
          margin: 2,
          color: {
            dark: "#DC2626",
            light: "#F7EAD7",
          },
        })
        setQrUrl(qr)
      } catch (error) {
        console.error("Error generating QR:", error)
      }
    }

    generateQR()
  }, [])

  const downloadQR = () => {
    if (qrUrl) {
      const link = document.createElement("a")
      link.href = qrUrl
      link.download = "menu-qr-code.png"
      link.click()
    }
  }

  return (
    <Card className="p-6 bg-white border-2 border-primary text-center">
      <h3 className="text-xl font-bold mb-4 text-primary">Código QR del Menú</h3>
      {qrUrl ? (
        <>
          <img src={qrUrl || "/placeholder.svg"} alt="QR Code" className="mx-auto mb-4" />
          <p className="text-sm text-muted-foreground mb-4">Escanea este código con tu celular para acceder al menú</p>
          <Button onClick={downloadQR} className="bg-primary hover:bg-primary/90 text-white">
            Descargar QR
          </Button>
        </>
      ) : (
        <p className="text-muted-foreground">Generando código QR...</p>
      )}
    </Card>
  )
}
