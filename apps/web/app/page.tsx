"use client"
// import { useState } from "react";
// import { useRouter } from "next/navigation";


import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from 'pages/landing/Navbar';
import Hero from 'pages/landing/Hero';
import Features from 'pages/landing/Features';
import HowItWorks from 'pages/landing/HowItWorks';
import Testimonials from "pages/landing/Testimonials";
import Pricing from 'pages/landing/Pricing';
import CallToAction from 'pages/landing/CallToAction';
import Footer from 'pages/landing/Footer';

// export default function Home() {
//   //we should use react forms and all that here
//   const [roomSlug, setRoomSlug] = useState("");
//   const router = useRouter();

//   return (
//     <div>
//       <input 
//       type="text"
//       placeholder="room id"
//       value={roomSlug}
//       onChange={(e) => setRoomSlug(e.target.value)}
//       />
//       <button onClick={() => {
//         router.push(`/room/${roomSlug}`);
//       }}>
//         submit
//       </button>
//     </div>
//   );
// }

export default function Home() {
  return (
    <AnimatePresence>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <Features />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <CallToAction />
          </motion.main>
          <Footer />
        </div>
      </AnimatePresence>
  )
}