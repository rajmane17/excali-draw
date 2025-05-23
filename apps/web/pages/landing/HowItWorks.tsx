import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MousePointer, 
  Pencil,
  MessageSquare
} from 'lucide-react';

const steps = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Invite your team",
    description: "Create a drawing space and invite team members with a simple link. No signups required for collaborators.",
    color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
  },
  {
    icon: <Pencil className="h-6 w-6" />,
    title: "Start creating together",
    description: "Use our intuitive tools to sketch, diagram, and visualize concepts in real-time.",
    color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
  },
  {
    icon: <MousePointer className="h-6 w-6" />,
    title: "See everyone's input",
    description: "Watch as cursors move, elements get created, and ideas evolve with full visibility of who's doing what.",
    color: "bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300"
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Discuss and refine",
    description: "Add comments, provide feedback, and iterate on designs with built-in chat and annotation features.",
    color: "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How ExcaliDraw works
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A simple, powerful workflow for visual collaboration
          </motion.p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute hidden md:block left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
          
          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'} md:w-1/2`}
              >
                <div className={`flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <div className="bg-card border border-border rounded-xl shadow-sm p-6 relative max-w-lg">
                    {/* Circle connector for desktop */}
                    <div className={`absolute hidden md:flex items-center justify-center top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-4 border-border z-10
                      ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}>
                      <div className={`w-8 h-8 rounded-full ${step.color} flex items-center justify-center`}>
                        {step.icon}
                      </div>
                    </div>
                    
                    {/* Circle for mobile */}
                    <div className="md:hidden flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center`}>
                        {step.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;