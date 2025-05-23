import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from './Button';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <motion.div 
            className="mb-8 lg:mb-0 lg:max-w-2xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to start collaborating visually?
            </h2>
            <p className="text-blue-100 text-xl">
              Join thousands of teams who use ExcaliDraw to visualize, create,
              and share ideas in real-time. No credit card required to get started.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              variant="secondary" 
              size="lg"
              icon={<ArrowRight />}
              iconPosition="right"
              className=" text-blue-600 hover:bg-gray-100"
            >
              Get Started For Free
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;