"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 to-purple-900"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <nav className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="flex flex-col items-center md:items-start space-y-1">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-accent" />
            <span className="text-2xl font-bold text-white">DDoS Shield</span>
          </div>
          <span className="text-sm text-gray-300 ml-10">By DDoS Mitigators</span>
        </Link>
        <ul className="hidden md:flex space-x-8 mt-4 md:mt-0">
          {['Home', 'Dashboard', 'Contact'].map((item) => (
            <li key={item}>
              <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-white hover:text-accent transition-colors duration-300">
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/auth">
          <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 border-opacity-50">
            Login / Sign Up
          </Button>
        </Link>
      </nav>
    </motion.header>
  )
}
