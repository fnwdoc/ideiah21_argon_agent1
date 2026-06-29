import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Landmark, BookOpen, Compass, Award, ExternalLink } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    type: 'colerico' | 'sanguineo' | 'melancolico' | 'fleumatico';
    description: string;
    icon: string;
  }[];
}

export default function VisualQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<('colerico' | 'sanguineo' | 'melancolico' | 'fleumatico')[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Qual paisagem natural mais acalma e reconecta sua mente?',
      options: [
        {
          text: 'Montanhas majestosas e picos rochosos tocando o céu.',
          type: 'colerico',
          description: 'Verticalidade, imponência e poder absoluto.',
          icon: '🏔️',
        },
        {
          text: 'Raios de sol cortando as nuvens em diagonal após uma tempestade.',
          type: 'sanguineo',
          description: 'Inclinação, energia, luz e dinamismo vibrante.',
          icon: '⚡',
        },
        {
          text: 'Ondas suaves do mar se curvando no crepúsculo ou um lago com névoa.',
          type: 'melancolico',
          description: 'Curvatura, introspecção, mistério e profundidade.',
          icon: '🌊',
        },
        {
          text: 'Um campo verde plano estendendo-se até um horizonte infinito e calmo.',
          type: 'fleumatico',
          description: 'Horizontalidade, estabilidade, serenidade e equilíbrio.',
          icon: '🌾',
        },
      ],
    },
    {
      id: 2,
      question: 'Se você fosse pintar uma obra de arte abstrata representativa sobre você, qual seria a composição?',
      options: [
        {
          text: 'Linhas retas e verticais em vermelho vibrante, subindo com força.',
          type: 'colerico',
          description: 'Estrutura, decisão e presença marcante.',
          icon: '📊',
        },
        {
          text: 'Diagonais expressivas e formas geométricas em amarelo solar, sugerindo velocidade.',
          type: 'sanguineo',
          description: 'Entusiasmo, sociabilidade e criatividade expansiva.',
          icon: '📐',
        },
        {
          text: 'Formas fluidas, espirais e curvas orgânicas em azul profundo e roxo.',
          type: 'melancolico',
          description: 'Sensibilidade, refinamento artístico e emoção.',
          icon: '🌀',
        },
        {
          text: 'Faixas horizontais contínuas e simétricas em tons de verde e laranja terroso.',
          type: 'fleumatico',
          description: 'Segurança, constância e acolhimento sereno.',
          icon: '🌅',
        },
      ],
    },
    {
      id: 3,
      question: 'Qual dessas palavras melhor define a sua principal busca ou motor interno na vida?',
      options: [
        {
          text: 'Impacto, liderança, realização e autonomia.',
          type: 'colerico',
          description: 'A força que decide e comanda.',
          icon: '👑',
        },
        {
          text: 'Liberdade, entusiasmo, comunicação e novas conexões.',
          type: 'sanguineo',
          description: 'A energia que movimenta e alegra.',
          icon: '🎉',
        },
        {
          text: 'Profundidade, sensibilidade, significado e busca pela verdade.',
          type: 'melancolico',
          description: 'A alma que sente e reflete.',
          icon: '🔮',
        },
        {
          text: 'Serenidade, equilíbrio, constância e harmonia familiar.',
          type: 'fleumatico',
          description: 'O pilar que apoia e sustenta.',
          icon: '🛡️',
        },
      ],
    },
    {
      id: 4,
      question: 'Ao entrar em uma catedral ou um grande edifício arquitetônico, o que mais te impacta?',
      options: [
        {
          text: 'A altura colossal das colunas e o pé-direito imponente que evoca grandeza.',
          type: 'colerico',
          description: 'A força da verticalidade.',
          icon: '🏛️',
        },
        {
          text: 'O dinamismo das escadarias cruzadas e a iluminação solar que entra pelas diagonais.',
          type: 'sanguineo',
          description: 'O dinamismo da inclinação.',
          icon: '🪜',
        },
        {
          text: 'Os arcos ogivais góticos, as cúpulas arredondadas e os vitrais poéticos.',
          type: 'melancolico',
          description: 'O acolhimento da curva.',
          icon: '🕌',
        },
        {
          text: 'A simetria perfeita da base, a estabilidade das paredes e a sensação de abrigo seguro.',
          type: 'fleumatico',
          description: 'A segurança da horizontalidade.',
          icon: '🧱',
        },
      ],
    },
    {
      id: 5,
      question: 'Diante de uma grande mudança ou de um imprevisto na sua vida, como você reage?',
      options: [
        {
          text: 'Assumo o controle imediatamente, tomo decisões firmes e crio um plano de ação.',
          type: 'colerico',
          description: 'Ação rápida e focada no resultado.',
          icon: '🎯',
        },
        {
          text: 'Fico animado com as novas possibilidades, comunico-me com outros e me adapto rapidamente.',
          type: 'sanguineo',
          description: 'Adaptação otimista e comunicativa.',
          icon: '🗣️',
        },
        {
          text: 'Sinto profundamente o impacto, recolho-me para analisar os detalhes e refletir.',
          type: 'melancolico',
          description: 'Análise introspectiva e emocional.',
          icon: '💭',
        },
        {
          text: 'Mantenho a calma absoluta, busco apaziguar os ânimos e procuro estabilizar a situação.',
          type: 'fleumatico',
          description: 'Preservação da paz e equilíbrio.',
          icon: '🧘',
        },
      ],
    },
    {
      id: 6,
      question: 'Qual estilo de vestuário ou estética pessoal faz você se sentir mais autêntico?',
      options: [
        {
          text: 'Roupas estruturadas, cortes retos, ombreiras marcadas, cores contrastantes (preto/vermelho).',
          type: 'colerico',
          description: 'Estética de poder e autoridade.',
          icon: '🧥',
        },
        {
          text: 'Modelagens modernas, assimetria, toques de cores quentes e brilhantes, acessórios criativos.',
          type: 'sanguineo',
          description: 'Estética de dinamismo e alegria.',
          icon: '🕶️',
        },
        {
          text: 'Tecidos nobres e delicados, caimento fluido, cores sóbrias ou profundas (azul marinho, roxo), detalhes sutis.',
          type: 'melancolico',
          description: 'Estética de sensibilidade e refinamento.',
          icon: '🧣',
        },
        {
          text: 'Estilo minimalista, confortável, linhas limpas, tons neutros, verdes e terrosos.',
          type: 'fleumatico',
          description: 'Estética de equilíbrio e conforto.',
          icon: '👟',
        },
      ],
    },
  ];

  const handleOptionSelect = (type: 'colerico' | 'sanguineo' | 'melancolico' | 'fleumatico') => {
    const updatedAnswers = [...answers, type];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  // Calculate results
  const calculateResultBreakdown = () => {
    const counts = { colerico: 0, sanguineo: 0, melancolico: 0, fleumatico: 0 };
    answers.forEach((ans) => {
      counts[ans]++;
    });

    const total = answers.length;
    const percentages = {
      colerico: Math.round((counts.colerico / total) * 100),
      sanguineo: Math.round((counts.sanguineo / total) * 100),
      melancolico: Math.round((counts.melancolico / total) * 100),
      fleumatico: Math.round((counts.fleumatico / total) * 100),
    };

    // Determine dominant
    let dominant: 'colerico' | 'sanguineo' | 'melancolico' | 'fleumatico' = 'colerico';
    let maxVal = -1;
    (Object.keys(percentages) as ('colerico' | 'sanguineo' | 'melancolico' | 'fleumatico')[]).forEach((key) => {
      if (percentages[key] > maxVal) {
        maxVal = percentages[key];
        dominant = key;
      }
    });

    return { percentages, dominant };
  };

  const archetypeInfo = {
    colerico: {
      title: 'O Líder Soberano',
      concept: 'Verticalidade Reta',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      gradient: 'from-red-500 to-rose-600',
      tagline: '“Eu lidero”',
      desc: 'Seu perfil visual é dominado pela verticalidade estruturada. Você transmite poder, autoridade, foco em resultados e capacidade de tomar decisões firmes sob pressão. Na sintaxe visual, você é a coluna de sustentação, a torre imponente que direciona o olhar para o alto.',
      shapes: 'Retas verticais, ângulos agudos de 90 graus, formas rígidas e quadradas.',
      colors: 'Vermelho, preto, cinza chumbo e contrastes de alto impacto.',
      wardrobe: 'Alfaiataria estruturada, ombros marcados, linhas retas, tecidos encorpados que mantêm a forma.',
      branding: 'Use logotipos com tipografia serifada imponente ou sem serifa geométrica pesada. Prefira composições centralizadas e simétricas que evoquem peso e soberania.',
      symbolSVG: (
        <svg className="w-24 h-24 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L12 22" strokeLinecap="round" />
          <path d="M5 6H19" strokeLinecap="round" />
          <path d="M8 2L12 6L16 2" strokeLinecap="round" />
          <rect x="6" y="9" width="12" height="10" rx="1" strokeWidth="1.5" />
        </svg>
      ),
    },
    sanguineo: {
      title: 'O Criador Dinâmico',
      concept: 'Diagonal Expansiva',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/20',
      gradient: 'from-yellow-400 to-amber-500',
      tagline: '“Eu movimento”',
      desc: 'Seu perfil visual é dominado pelas diagonais dinâmicas. Você transmite entusiasmo, extroversão, criatividade, velocidade e facilidade de conexão social. Na sintaxe visual, você representa a flecha em movimento, a linha oblíqua que quebra a monotonia e empurra para o futuro.',
      shapes: 'Linhas inclinadas, triângulos, formas pontiagudas, composições descentralizadas e assimétricas.',
      colors: 'Amarelo solar, dourado, laranja vibrante e combinações multicoloridas alegres.',
      wardrobe: 'Modelagens fluidas porém dinâmicas, detalhes assimétricos, estampas geométricas marcantes, acessórios criativos e pontos focais de cor.',
      branding: 'Use tipografias gestuais, inclinadas ou modernas sem serifa. Composições dinâmicas fora do centro, com bastante espaço em branco e diagonais cruzadas que sugiram progresso.',
      symbolSVG: (
        <svg className="w-24 h-24 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 21L21 3" strokeLinecap="round" />
          <path d="M13 3H21V11" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12L12 16L16 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    melancolico: {
      title: 'O Poeta Sensível',
      concept: 'Curvatura Orgânica',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/20',
      gradient: 'from-blue-500 to-indigo-600',
      tagline: '“Eu sinto”',
      desc: 'Seu perfil visual é dominado pelas curvas orgânicas e acolhedoras. Você transmite profundidade, introspecção, sensibilidade, refinamento estético e inteligência emocional. Na sintaxe visual, você é o rio sinuoso, o círculo que protege e o detalhe que emociona.',
      shapes: 'Linhas curvas, círculos, formas ovais, texturas naturais e composições concêntricas ou onduladas.',
      colors: 'Azul profundo, roxo, violeta, tons pastel refinados e cinzas azulados.',
      wardrobe: 'Tecidos leves e nobres que acompanham o movimento do corpo (seda, linho fino, tricô), modelagens arredondadas ou drapeadas, detalhes delicados.',
      branding: 'Use logotipos com tipografia cursiva elegante, serifas delicadas ou símbolos circulares. Prefira composições com iluminação suave, baixo contraste e atmosfera intimista.',
      symbolSVG: (
        <svg className="w-24 h-24 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
          <path d="M12 6C9.5 9 9.5 15 12 18" strokeLinecap="round" />
          <path d="M12 6C14.5 9 14.5 15 12 18" strokeLinecap="round" />
        </svg>
      ),
    },
    fleumatico: {
      title: 'O Guardião Sereno',
      concept: 'Horizontalidade Estável',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
      borderColor: 'border-emerald-400/20',
      gradient: 'from-emerald-500 to-teal-600',
      tagline: '“Eu sustento”',
      desc: 'Seu perfil visual é dominado pelas linhas horizontais estáveis. Você transmite equilíbrio, paz, serenidade, permanência e segurança confiável. Na sintaxe visual, você é a linha do horizonte, o porto seguro onde o olhar repousa e se acalma.',
      shapes: 'Linhas horizontais longas, retângulos deitados, simetria bilateral perfeita e formas baixas e amplas.',
      colors: 'Verde oliva, verde menta, laranja acolhedor, tons de terra e cores quentes suaves.',
      wardrobe: 'Roupas confortáveis, estilo minimalista clássico, caimentos retos e descontraídos, tecidos naturais e duráveis.',
      branding: 'Use marcas com tipografias sólidas, limpas e espaçadas. Composições horizontais equilibradas, com simetria clara que evoque confiança sólida e tranquilidade inabalável.',
      symbolSVG: (
        <svg className="w-24 h-24 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 12H22" strokeLinecap="round" />
          <rect x="4" y="14" width="16" height="4" rx="1" strokeWidth="1.5" />
          <path d="M6 8H18" strokeLinecap="round" />
        </svg>
      ),
    },
  };

  const { percentages, dominant } = showResult ? calculateResultBreakdown() : { percentages: { colerico: 0, sanguineo: 0, melancolico: 0, fleumatico: 0 }, dominant: 'colerico' as const };
  const dominantProfile = archetypeInfo[dominant];

  return (
    <div className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="bg-grid-pattern absolute inset-0 -z-10 opacity-20" />
      <div className="absolute top-1/3 left-0 -z-10 h-[400px] w-[400px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_0,transparent_60%)]" />

      <div className="mx-auto max-w-4xl">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="quiz-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-10 backdrop-blur-sm shadow-2xl"
            >
              {/* Quiz Header */}
              <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase mb-1">
                    <Sparkles className="h-4 w-4" />
                    Quiz de Sintaxe Visual
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-100">Qual é o seu Arquétipo Estético?</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-semibold block uppercase">Progresso</span>
                  <span className="text-sm font-serif font-bold text-amber-400">
                    {currentQuestion + 1} de {questions.length}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-slate-800 rounded-full mb-10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="space-y-8">
                <motion.h4 
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-serif text-xl sm:text-2xl font-semibold text-slate-200 leading-relaxed"
                >
                  {questions[currentQuestion].question}
                </motion.h4>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option.type)}
                      className="group flex gap-4 items-start text-left p-5 rounded-2xl border border-slate-800 bg-slate-950/40 hover:border-amber-500/40 hover:bg-slate-900/30 transition-all duration-300 cursor-pointer"
                    >
                      <span className="text-3xl p-2 bg-slate-900 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        {option.icon}
                      </span>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-200 group-hover:text-amber-400 transition-colors duration-300">
                          {option.text}
                        </p>
                        <p className="text-xs text-slate-500 font-light group-hover:text-slate-400 transition-colors duration-300">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Result Header Card */}
              <div className={`rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-10 backdrop-blur-sm shadow-2xl relative overflow-hidden`}>
                <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0,transparent_60%)]" />

                <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-b border-slate-800 pb-8">
                  <div className="space-y-3 text-center md:text-left">
                    <span className={`text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full ${dominantProfile.bgColor} ${dominantProfile.color}`}>
                      {dominantProfile.concept}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 mt-2">
                      {dominantProfile.title}
                    </h3>
                    <p className={`font-serif text-lg italic font-medium ${dominantProfile.color}`}>
                      {dominantProfile.tagline}
                    </p>
                  </div>
                  
                  {/* Archetype Visual Symbol */}
                  <div className={`p-4 rounded-2xl bg-slate-950 border border-slate-800/80 shadow-inner flex items-center justify-center`}>
                    {dominantProfile.symbolSVG}
                  </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="py-8 space-y-5 border-b border-slate-800">
                  <h4 className="font-serif font-bold text-slate-300 text-sm uppercase tracking-wider">
                    Sua Harmonia de Temperamentos Visuais
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Colérico */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-400">Colérico (Vertical / Vermelho)</span>
                        <span className="text-red-400 font-bold">{percentages.colerico}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div className="h-full bg-gradient-to-r from-red-500 to-rose-600 rounded-full" style={{ width: `${percentages.colerico}%` }} />
                      </div>
                    </div>

                    {/* Sanguíneo */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-400">Sanguíneo (Inclinado / Amarelo)</span>
                        <span className="text-yellow-400 font-bold">{percentages.sanguineo}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full" style={{ width: `${percentages.sanguineo}%` }} />
                      </div>
                    </div>

                    {/* Melancólico */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-400">Melancólico (Curvo / Azul)</span>
                        <span className="text-blue-400 font-bold">{percentages.melancolico}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: `${percentages.melancolico}%` }} />
                      </div>
                    </div>

                    {/* Fleumático */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-400">Fleumático (Horizontal / Verde-Laranja)</span>
                        <span className="text-emerald-400 font-bold">{percentages.fleumatico}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" style={{ width: `${percentages.fleumatico}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <h4 className="font-serif font-bold text-slate-200 text-lg">Seu Perfil Visual Detalhado</h4>
                      <p className="text-sm text-slate-300 font-light leading-relaxed">
                        {dominantProfile.desc}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-serif font-bold text-slate-200 text-sm uppercase tracking-wider">
                        Códigos Sintáticos Recomendados
                      </h4>
                      <ul className="space-y-2.5 text-xs text-slate-400 font-light">
                        <li className="flex items-start gap-2">
                          <span className={`h-1.5 w-1.5 rounded-full ${dominantProfile.color} mt-1.5 flex-shrink-0`} />
                          <span><strong>Formas:</strong> {dominantProfile.shapes}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className={`h-1.5 w-1.5 rounded-full ${dominantProfile.color} mt-1.5 flex-shrink-0`} />
                          <span><strong>Cores de Ancoragem:</strong> {dominantProfile.colors}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-6">
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
                      <h4 className="font-serif font-bold text-amber-400 text-sm">Estilo &amp; Identidade Pessoal</h4>
                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        <strong>No Guarda-Roupa:</strong> {dominantProfile.wardrobe}
                      </p>
                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        <strong>No Branding / Design:</strong> {dominantProfile.branding}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="mt-10 pt-6 border-t border-slate-800/60 flex justify-center">
                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refazer o Quiz
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
