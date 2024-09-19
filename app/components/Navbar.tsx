"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Shield, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
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
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-accent" />
          <span className="text-2xl font-bold text-white">DDoS Shield</span>
        </Link>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navbar links and login/signup button */}
        <div className={`md:flex md:space-x-8 items-center ${isOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0">
            {['Home', 'Dashboard', 'Contact'].map((item) => (
              <li key={item} className="md:ml-8">
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="block text-white hover:text-accent transition-colors duration-300 py-2 px-4"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          
          <Link href="/auth">
            <Button
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10 border-opacity-50 mt-4 md:mt-0"
              onClick={() => setIsOpen(false)}
            >
              Login / Sign Up
            </Button>
          </Link>
        </div>
      </nav>
    </motion.header>
  )
}
