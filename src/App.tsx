import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VisualTheory from './components/VisualTheory';
import VisualQuiz from './components/VisualQuiz';
import VisualSandbox from './components/VisualSandbox';
import ImageDecoder from './components/ImageDecoder';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState<string>('inicio');

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return <Hero setActiveTab={setActiveTab} />;
      case 'teoria':
        return <VisualTheory />;
      case 'quiz':
        return <VisualQuiz />;
      case 'sandbox':
        return <VisualSandbox />;
      case 'decoder':
        return <ImageDecoder />;
      default:
        return <Hero setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area with Smooth Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
