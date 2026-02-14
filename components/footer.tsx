"use client"

import { FaTiktok, FaInstagram } from "react-icons/fa"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-white py-8 px-4" style={{background: "#ED1B24"}}>
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        {/* Iconos de redes sociales */}
        <div className="flex gap-6">
       
          {/* Instagram */}
          <a
            href="https://www.instagram.com/vikingo_coffeebike?utm_source=qr&igsh=Z2cwOGloeTM2OXkx"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white rounded-full hover:opacity-80 transition-opacity"
            aria-label="Instagram"
          >
            <FaInstagram className="w-6 h-6" style={{color: "#ED1B24"}} />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@elvikingocoffeebike?_r=1&_t=ZS-93vFT3pugN8"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white rounded-full hover:opacity-80 transition-opacity"
            aria-label="TikTok"
          >
            <FaTiktok className="w-6 h-6" style={{color: "#ED1B24"}} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-white-400">
          <p>Copyright © {currentYear}. Designed by Clapton</p>
        </div>
      </div>
    </footer>
  )
}
