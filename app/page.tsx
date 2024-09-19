"use client"

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Globe, BarChart, Cloud, Lock, Cpu, Bell, Shield as ShieldIcon, Plug, DollarSign } from 'lucide-react'
import Link from 'next/link'

const features = [
  { icon: Shield, title: 'AI-based Behavioral Analysis', description: 'Advanced AI algorithms detect and mitigate threats in real-time.' },
  { icon: Zap, title: 'Lightning-Fast Response', description: 'Instant protection against DDoS attacks, ensuring minimal downtime.' },
  { icon: Globe, title: 'Global Network', description: 'Worldwide server network for robust and reliable protection.' },
  { icon: BarChart, title: 'Real-time Monitoring', description: 'Comprehensive dashboard for monitoring and analyzing traffic patterns.' },
  { icon: Cloud, title: 'Cloud Integration', description: 'Seamless integration with major cloud service providers for enhanced protection.' },
  { icon: Lock, title: 'Web Application Firewall', description: 'Advanced WAF to protect against application layer attacks.' },
  { icon: Cpu, title: 'ML-Powered Anomaly Detection', description: 'Machine learning algorithms to identify and flag unusual traffic patterns.' },
  { icon: Bell, title: 'Instant Alerts', description: 'Real-time notifications for potential threats and mitigation actions.' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <section className="py-20 mt-16 md:mx-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center"
        >
          <h1 className="text-5xl font-bold mb-6 text-white mt-10">
            Next-Gen DDoS Protection for Modern Cloud Architectures
          </h1>
          <p className="text-xl mb-8 text-gray-300">Secure your digital assets with AI-powered, cloud-integrated defense mechanisms.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth">
              <Button size="lg" className="bg-green-500 text-white hover:bg-green-400">Get Started</Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" className="text-white bg-gray-700 border-white hover:bg-white/10">How It Works</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="py-20 mx-4 md:mx-6">
        <div className="container mx-auto px-2">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-lg text-white h-full border-none">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 mb-4 text-accent" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 mx-4 md:mx-6">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ title: 'Unparalleled Protection', description: 'Our AI-powered system provides the highest level of protection against modern DDoS threats.', icon: ShieldIcon },
              { title: 'Easy Integration', description: 'Seamlessly integrate our solution with your existing infrastructure in minutes.', icon: Plug },
              { title: 'Cost-Effective', description: 'Get enterprise-grade protection at a fraction of the cost of traditional solutions.', icon: DollarSign }]
              .map((reason, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center"
              >
                <reason.icon className="w-10 h-10 mb-4 text-accent mx-auto" />
                <h3 className="text-2xl font-bold mb-2 text-white">{reason.title}</h3>
                <p className="text-gray-300">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
