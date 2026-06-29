import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, HelpCircle, Compass, History } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  const temperaments = [
    {
      id: 'colerico',
      name: 'Colérico',
      concept: 'Verticalidade',
      color: 'text-red-500',
      bgGlow: 'bg-red-500/10',
      borderGlow: 'border-red-500/20 hover:border-red-500/50',
      tagline: '“Eu lidero”',
      desc: 'Poder, liderança, autoridade e decisão estruturada em linhas ascendentes.',
      shape: 'Linha Reta Vertical',
      iconColor: 'bg-red-500',
    },
    {
      id: 'sanguineo',
      name: 'Sanguíneo',
      concept: 'Inclinação',
      color: 'text-yellow-400',
      bgGlow: 'bg-yellow-400/10',
      borderGlow: 'border-yellow-400/20 hover:border-yellow-400/50',
      tagline: '“Eu movimento”',
      desc: 'Dinamismo, entusiasmo, sociabilidade e mudança em linhas diagonais.',
      shape: 'Linha Diagonal',
      iconColor: 'bg-yellow-400',
    },
    {
      id: 'melancolico',
      name: 'Melancólico',
      concept: 'Curvatura',
      color: 'text-blue-400',
      bgGlow: 'bg-blue-400/10',
      borderGlow: 'border-blue-400/20 hover:border-blue-400/50',
      tagline: '“Eu sinto”',
      desc: 'Profundidade, introspecção, refinamento e sensibilidade em formas orgânicas.',
      shape: 'Linha Curva Orgânica',
      iconColor: 'bg-blue-500',
    },
    {
      id: 'fleumatico',
      name: 'Fleumático',
      concept: 'Horizontalidade',
      color: 'text-emerald-400',
      bgGlow: 'bg-emerald-400/10',
      borderGlow: 'border-emerald-400/20 hover:border-emerald-400/50',
      tagline: '“Eu sustento”',
      desc: 'Equilíbrio, serenidade, segurança e permanência em linhas horizontais estáveis.',
      shape: 'Linha Horizontal',
      iconColor: 'bg-emerald-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 pb-20 pt-10">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0,transparent_60%)]" />
      <div className="bg-grid-pattern absolute inset-0 -z-20 opacity-40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro Hero Section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400 tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Arqueologia da Percepção Visual
            </div>
            
            <h1 className="font-serif text-4xl font-extrabold tracking-tight text-slate-100 sm:text-5xl md:text-6xl leading-[1.15]">
              Muito antes da escrita, nós <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-600">líamos o mundo</span> visualmente.
            </h1>

            <p className="text-lg text-slate-300 font-light leading-relaxed">
              Biologicamente e culturalmente, somos programados para atribuir significado às formas. 
              A <strong>Sintaxe Visual</strong> é a gramática ancestral que organiza como percebemos e interpretamos 
              imagens — conectando comportamento, estética e temperamento de forma profunda.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setActiveTab('quiz')}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-rose-500/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-rose-500/30 cursor-pointer"
              >
                Descobrir meu Arquétipo Visual
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => setActiveTab('sandbox')}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white transition-all duration-300 hover:border-slate-500 cursor-pointer"
              >
                Experimentar Laboratório
                <Compass className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          {/* Hero Visual Image */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-3 shadow-2xl backdrop-blur-sm overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-80" />
              <img 
                src="/images/cave-ancestral.png" 
                alt="Origens Ancestrais da Arte Visual" 
                className="rounded-xl object-cover w-full h-[320px] md:h-[380px] transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs tracking-widest uppercase mb-1">
                  <History className="h-4 w-4" />
                    A Origem na Caverna
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-100">
                  O início da leitura visual
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Nossa relação com o mundo começou na observação das formas, das cores e das paisagens para a sobrevivência.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* The Core Concept Highlight */}
        <motion.div 
          className="mt-24 text-center max-w-3xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl font-bold text-slate-100 sm:text-4xl">
            A Origem Simbólica das Formas
          </h2>
          <p className="text-slate-400 font-light">
            Nosso cérebro aprendeu estes códigos ao longo de milhares de anos. Quando vemos uma imagem hoje, ainda reagimos inconscientemente a estes símbolos ancestrais da natureza.
          </p>
        </motion.div>

        {/* Four Temperaments Grid Preview */}
        <motion.div 
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {temperaments.map((temp) => (
            <motion.div
              key={temp.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`flex flex-col justify-between rounded-2xl border ${temp.borderGlow} bg-slate-900/30 p-6 backdrop-blur-sm transition-all duration-300 cursor-pointer`}
              onClick={() => setActiveTab('teoria')}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${temp.bgGlow} ${temp.color}`}>
                    {temp.concept}
                  </span>
                  <div className={`h-2.5 w-2.5 rounded-full ${temp.iconColor} ring-4 ring-slate-950`} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-100">{temp.name}</h3>
                  <span className={`text-sm font-medium italic ${temp.color}`}>{temp.tagline}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed font-light">
                  {temp.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 hover:text-slate-300">
                <span>Forma: {temp.shape}</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Features Banner */}
        <motion.div 
          className="mt-20 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950 p-8 md:p-12 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.03)_0,transparent_60%)]" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-100">
                Pronto para se tornar um intérprete visual?
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
                Navegue pelas nossas ferramentas interativas. Você pode analisar as estruturas ocultas de obras de arte, experimentar a criação livre em nosso laboratório de sintaxe visual ou realizar o teste psicológico para descobrir qual é o seu arquétipo predominante.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setActiveTab('decoder')}
                className="p-5 rounded-xl border border-slate-800/80 bg-slate-950 hover:border-amber-500/40 hover:bg-slate-900/40 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif font-bold text-slate-200 group-hover:text-amber-400 transition-colors">Decodificador</h4>
                </div>
                <p className="text-xs text-slate-400 font-light">
                  Aprenda a decifrar as linhas de força ocultas de fotografias e pinturas.
                </p>
              </div>

              <div 
                onClick={() => setActiveTab('sandbox')}
                className="p-5 rounded-xl border border-slate-800/80 bg-slate-950 hover:border-rose-500/40 hover:bg-slate-900/40 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif font-bold text-slate-200 group-hover:text-rose-400 transition-colors">Laboratório</h4>
                </div>
                <p className="text-xs text-slate-400 font-light">
                  Crie composições abstratas e receba uma leitura simbólica em tempo real.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
