import React from 'react';
import { Users, Sparkles, MousePointer } from 'lucide-react';
import Button from './Button';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-24 right-1/3 w-80 h-80 bg-teal-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Collaborate on ideas in{' '}
            <span className="text-blue-600">real-time</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            ExcaliDraw brings teams together to visualize concepts, 
            brainstorm, and create amazing 2D designs with unparalleled 
            collaborative power.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              variant="primary" 
              size="lg"
              icon={<Sparkles />}
            >
              Start Drawing Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              icon={<Users />}
            >
              See How Teams Use It
            </Button>
          </motion.div>
        </div>
        
        {/* Canvas preview */}
        <motion.div 
          className="relative mx-auto max-w-5xl rounded-xl shadow-2xl bg-white border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="aspect-video w-full bg-gray-50 p-4 relative">
            {/* Mockup drawing canvas */}
            <div className="absolute inset-0 pointer-events-none">
              <img
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Collaborative drawing example"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            
            {/* Cursor elements to show collaboration */}
            <motion.div 
              className="absolute"
              initial={{ x: '40%', y: '30%' }}
              animate={{ x: '60%', y: '35%' }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: 'reverse',
                ease: 'easeInOut' 
              }}
            >
              <div className="flex flex-col items-center">
                <MousePointer className="h-5 w-5 text-blue-600" />
                <div className="mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                  Anna K.
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute"
              initial={{ x: '70%', y: '60%' }}
              animate={{ x: '30%', y: '70%' }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
            >
              <div className="flex flex-col items-center">
                <MousePointer className="h-5 w-5 text-purple-600" />
                <div className="mt-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-md">
                  Miguel S.
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;