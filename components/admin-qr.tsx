"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import QRCode from "qrcode"

export function AdminQR() {
  const [qrUrl, setQrUrl] = useState<string>("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = typeof window !== "undefined" ? window.location.origin : "https://elkavingocoffeebike.vercel.app"
        const qr = await QRCode.toDataURL(url, {
          width: 400,
          margin: 2,
          color: {
            dark: "#DC2626",
            light: "#FEF2F2",
          },
          errorCorrectionLevel: "H",
        })
        setQrUrl(qr)
      } catch (error) {
        console.error("[v0] Error generating QR:", error)
      }
    }

    generateQR()
  }, [])

  const downloadQR = () => {
    if (qrUrl) {
      const link = document.createElement("a")
      link.href = qrUrl
      link.download = "el-vikingo-menu-qr.png"
      link.click()
    }
  }

  const copyUrl = () => {
    const url = typeof window !== "undefined" ? window.location.origin : "https://elkavingocoffeebike.vercel.app"
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img
              src="/images/imagen-20de-20whatsapp-202025-11-24-20a-20las-2016.jpg"
              alt="El Vikingo Coffee Bike"
              className="h-16 w-16 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">El Vikingo Coffee Bike</h1>
          <p className="text-muted-foreground">Código QR - Menú Digital</p>
        </div>

        {/* QR Card */}
        <Card className="p-8 border-2 border-primary shadow-lg mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Código QR del Menú</h2>

            {qrUrl ? (
              <>
                <div className="bg-white p-6 rounded-lg inline-block mb-6 border-2 border-border">
                  <img src={qrUrl || "/placeholder.svg"} alt="QR Code" className="w-96 h-96" />
                </div>

                <div className="space-y-4">
                  <p className="text-foreground font-semibold mb-4">
                    Escanea este código con tu celular para acceder al menú digital
                  </p>

                  <div className="flex gap-3 justify-center flex-wrap">
                    <Button onClick={downloadQR} className="bg-primary hover:bg-primary/90 text-white font-bold">
                      Descargar QR
                    </Button>

                    <Button onClick={copyUrl} variant="outline" className="border-primary text-primary bg-transparent">
                      {copied ? "Copiado!" : "Copiar URL"}
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground animate-pulse">Generando código QR...</p>
            )}
          </div>
        </Card>

        {/* Instructions */}
        <Card className="p-6 border-border mb-8">
          <h3 className="text-xl font-bold mb-4 text-foreground">Instrucciones de Uso</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-bold text-primary">1.</span>
              <span>Descarga el código QR arriba</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">2.</span>
              <span>Imprime el QR y colócalo en tu mostrador o local</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">3.</span>
              <span>Los clientes escanean el código con su celular</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">4.</span>
              <span>Acceden al menú digital y seleccionan sus productos</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">5.</span>
              <span>Envían el pedido directamente a WhatsApp Business</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
