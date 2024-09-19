"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, BarChart, Cloud, Lock, Cpu, Bell } from 'lucide-react'

const steps = [
  { icon: Shield, title: 'Traffic Ingress', description: 'Incoming traffic is routed through our global network of scrubbing centers.' },
  { icon: Cpu, title: 'AI Analysis', description: 'Our ML algorithms analyze traffic patterns in real-time to detect anomalies.' },
  { icon: Lock, title: 'Threat Mitigation', description: 'Identified threats are instantly mitigated using advanced filtering techniques.' },
  { icon: Cloud, title: 'Cloud Integration', description: 'Seamless integration with major cloud providers ensures comprehensive protection.' },
  { icon: BarChart, title: 'Real-time Monitoring', description: 'Continuous monitoring and analysis of traffic patterns for proactive defense.' },
  { icon: Bell, title: 'Instant Alerts', description: 'Real-time notifications keep you informed of potential threats and actions taken.' },
]

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 py-20">
      <div className="container mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12 mt-10 text-center text-white"
        >
          How Our DDoS Protection Works
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg text-white border-none h-full">
                <CardHeader>
                  <step.icon className="w-12 h-12 mb-4 text-accent" />
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{step.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Our Protection Process</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our advanced DDoS protection system utilizes a multi-layered approach, combining AI-powered analysis, 
            cloud integration, and real-time monitoring to provide unparalleled security for your digital assets. 
            From the moment traffic enters our global network, it undergoes rigorous scrutiny and filtering, 
            ensuring that only legitimate requests reach your infrastructure.
          </p>
        </motion.div>
        
      </div>
    </div>
  )
}