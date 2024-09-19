import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-8">
      <div className="container mx-auto px-8">
        <div className="flex flex-wrap justify-between items-center">
          {/* Company Name */}
          <div className="w-full md:w-1/2 mb-2 md:mb-0 flex flex-col items-start space-y-2">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold">DDoS Shield</span>
            </Link>
            <p className="text-sm text-gray-300 ml-10">By DDoS Mitigators</p>
          </div>
          
          {/* Quick Links */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="flex space-x-4">
              {['Home', 'Contact', 'Dashboard'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="hover:text-accent transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-4 pt-4 text-center">
          <p>&copy; 2024 DDoS Shield. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
