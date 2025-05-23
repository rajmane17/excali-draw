import React from 'react';
import { 
  Users, 
  ClockIcon, 
  Layers, 
  Share2, 
  Lock, 
  Smartphone 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="flex flex-col items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="p-3 bg-blue-50 rounded-lg text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Real-time Collaboration",
      description: "Work with your team simultaneously. See cursors, changes, and annotations as they happen."
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: "Version History",
      description: "Never lose your work with automatic version tracking. Revert to previous designs instantly."
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Rich Drawing Tools",
      description: "From simple shapes to complex diagrams, our intuitive tools make creating visual ideas easy."
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "One-Click Sharing",
      description: "Share your designs with anyone through a simple link. Control viewing and editing permissions."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Your data is protected with end-to-end encryption and enterprise-grade security practices."
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Cross-Device Support",
      description: "Access your drawings from any device. Our responsive design works on desktop, tablet, and mobile."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Powerful features for visual collaboration
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to bring your teams ideas to life in a shared, 
            interactive space.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;