import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from './Button';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlanProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  buttonText: string;
  highlighted?: boolean;
  delay: number;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  highlighted = false,
  delay
}) => {
  return (
    <motion.div 
      className={`rounded-xl overflow-hidden ${
        highlighted 
          ? 'border-2 border-blue-500 shadow-xl relative' 
          : 'border border-gray-200 shadow-sm'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {highlighted && (
        <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6 bg-white">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          {period && <span className="text-gray-600 ml-2">{period}</span>}
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <Button 
          variant={highlighted ? "primary" : "outline"} 
          size="lg"
          fullWidth
        >
          {buttonText}
        </Button>
      </div>
      
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className={`mr-2 rounded-full p-1 ${
                feature.included ? 'text-green-500 bg-green-50' : 'text-gray-400 bg-gray-100'
              }`}>
                <Check className="h-4 w-4" />
              </span>
              <span className={feature.included ? 'text-gray-700' : 'text-gray-500'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Pricing: React.FC = () => {
  const plans = [
    {
      title: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individuals and small projects",
      buttonText: "Get Started",
      features: [
        { text: "Up to 3 collaborators", included: true },
        { text: "Basic drawing tools", included: true },
        { text: "3 boards total", included: true },
        { text: "Export as PNG", included: true },
        { text: "24-hour version history", included: true },
        { text: "Priority support", included: false },
        { text: "Custom branding", included: false },
        { text: "Advanced security", included: false }
      ]
    },
    {
      title: "Pro",
      price: "$12",
      period: "/user/month",
      description: "Everything you need for ongoing team collaboration",
      buttonText: "Start Free Trial",
      highlighted: true,
      features: [
        { text: "Unlimited collaborators", included: true },
        { text: "Advanced drawing tools", included: true },
        { text: "Unlimited boards", included: true },
        { text: "Export as PNG, SVG, PDF", included: true },
        { text: "30-day version history", included: true },
        { text: "Priority support", included: true },
        { text: "Custom branding", included: false },
        { text: "Advanced security", included: false }
      ]
    },
    {
      title: "Enterprise",
      price: "Custom",
      period: "",
      description: "Advanced features and support for large organizations",
      buttonText: "Contact Sales",
      features: [
        { text: "Unlimited collaborators", included: true },
        { text: "Advanced drawing tools", included: true },
        { text: "Unlimited boards", included: true },
        { text: "Export as PNG, SVG, PDF", included: true },
        { text: "Unlimited version history", included: true },
        { text: "Priority support", included: true },
        { text: "Custom branding", included: true },
        { text: "Advanced security", included: true }
      ]
    }
  ];
  
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the plan thats right for your team
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingPlan 
              key={index}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              buttonText={plan.buttonText}
              highlighted={plan.highlighted}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;