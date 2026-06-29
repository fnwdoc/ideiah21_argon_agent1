import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VisualTheory from './components/VisualTheory';
import VisualQuiz from './components/VisualQuiz';
import VisualSandbox from './components/VisualSandbox';
import ImageDecoder from './components/ImageDecoder';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import { motion, AnimatePresence } from 'framer-motion';

// Cole sua chave do OpenRouter aqui ou use uma variável de ambiente
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';

function App() {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  // Contexto dinâmico injetado pelas abas (ex: resultado do quiz)
  const [aiContextHint, setAiContextHint] = useState<string | undefined>(undefined);

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return <Hero setActiveTab={setActiveTab} />;
      case 'teoria':
        return <VisualTheory />;
      case 'quiz':
        return <VisualQuiz onResultChange={(result) => setAiContextHint(`Resultado do quiz: ${result}`)} />;
      case 'sandbox':
        return <VisualSandbox onCompositionChange={(desc) => setAiContextHint(`Composição atual: ${desc}`)} />;
      case 'decoder':
        return <ImageDecoder />;
      default:
        return <Hero setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        setAiContextHint(undefined); // limpa contexto ao trocar de aba
      }} />

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

      {/* AI Chat — flutuante, sempre visível */}
      <AIChat
        activeTab={activeTab as any}
        apiKey={OPENROUTER_API_KEY}
        contextHint={aiContextHint}
      />
    </div>
  );
}

export default App;
