import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Landmark, Flame, Trees, Eye, User, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function VisualTheory() {
  const [selectedTemp, setSelectedTemp] = useState<string>('colerico');

  const shapeOrigins = [
    {
      title: 'Linhas Verticais',
      nature: 'Árvores, montanhas majestosas, postura humana ereta.',
      symbolism: 'Poder, liderança, crescimento, domínio, espiritualidade.',
      visual: '↑',
      color: 'border-red-500/30 text-red-400 bg-red-500/5',
    },
    {
      title: 'Linhas Horizontais',
      nature: 'O horizonte, o chão plano, o mar calmo, o corpo em repouso.',
      symbolism: 'Estabilidade, calma, descanso, segurança, permanência.',
      visual: '→',
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
    },
    {
      title: 'Linhas Inclinadas',
      nature: 'Raios de sol oblíquos, árvores ao vento, um corpo correndo.',
      symbolism: 'Movimento, mudança, instabilidade, ação, energia, velocidade.',
      visual: '↗',
      color: 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5',
    },
    {
      title: 'Linhas Curvas',
      nature: 'Rios serpenteantes, ondas, dunas de areia, formas orgânicas e o corpo feminino.',
      symbolism: 'Acolhimento, fluidez, sensibilidade, emoção, ritmo orgânico.',
      visual: '∿',
      color: 'border-blue-500/30 text-blue-400 bg-blue-500/5',
    },
  ];

  const temperamentsDetails = {
    colerico: {
      name: 'Colérico',
      archetype: 'O Líder Soberano',
      shape: 'Reta, Vertical, Estruturada, Ascendente',
      message: 'Poder, liderança, autoridade, decisão, firmeza.',
      tagline: '“Eu lidero”',
      color: 'Vermelho Vibrante',
      colorDesc: 'O vermelho ativa urgência, coragem, intensidade e comando.',
      symbolism: 'A vertical simboliza força e direção. É a imagem da torre, do líder, da coluna inabalável.',
      branding: 'Ideal para marcas de alta performance, luxo imponente, advocacia corporativa ou liderança de mercado.',
      gradient: 'from-red-500 via-rose-600 to-red-700',
      textColor: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      glowColor: 'shadow-red-500/20',
      image: '/images/vertical-colerico.png',
    },
    sanguineo: {
      name: 'Sanguíneo',
      archetype: 'O Criador Dinâmico',
      shape: 'Diagonal, Inclinada, Expansiva, Assimétrica',
      message: 'Movimento, entusiasmo, sociabilidade, espontaneidade, alegria.',
      tagline: '“Eu movimento”',
      color: 'Amarelo Solar',
      colorDesc: 'O amarelo simboliza luz, calor, alegria, criatividade e comunicação.',
      symbolism: 'A diagonal nunca está parada. Ela rompe a estática, avança no espaço e gera energia.',
      branding: 'Ideal para marcas de inovação, startups, entretenimento, publicidade e comunicação expressiva.',
      gradient: 'from-yellow-400 via-amber-500 to-yellow-600',
      textColor: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/30',
      glowColor: 'shadow-yellow-500/20',
      image: '/images/inclinada-sanguineo.png',
    },
    melancolico: {
      name: 'Melancólico',
      archetype: 'O Poeta Sensível',
      shape: 'Curva, Orgânica, Delicada, Concêntrica',
      message: 'Profundidade, introspecção, refinamento, emoção, mistério.',
      tagline: '“Eu sinto”',
      color: 'Azul Profundo e Roxo',
      colorDesc: 'O azul traz confiança, contemplação; o roxo traz transcendência e mistério.',
      symbolism: 'A curva acolhe, aproxima e envolve. É a forma que protege, expressando o mundo interno.',
      branding: 'Ideal para psicoterapeutas, marcas artesanais de luxo, arte, poesia, estética minimalista e intimista.',
      gradient: 'from-blue-500 via-indigo-600 to-violet-700',
      textColor: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/30',
      glowColor: 'shadow-blue-500/20',
      image: '/images/curva-melancolico.png',
    },
    fleumatico: {
      name: 'Fleumático',
      archetype: 'O Guardião Sereno',
      shape: 'Horizontal, Ampla, Contínua, Simétrica',
      message: 'Equilíbrio, serenidade, segurança, permanência, constância.',
      tagline: '“Eu sustento”',
      color: 'Verde e Laranja',
      colorDesc: 'O verde traz equilíbrio e harmonia; o laranja traz calor humano e acolhimento.',
      symbolism: 'A horizontal repousa. Ela estabiliza o caos e serve de alicerce para tudo o que cresce.',
      branding: 'Ideal para serviços de saúde, finanças, consultoria de longo prazo, marcas de bem-estar e ecologia.',
      gradient: 'from-emerald-500 via-teal-600 to-orange-600',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
      borderColor: 'border-emerald-400/30',
      glowColor: 'shadow-emerald-500/20',
      image: '/images/horizontal-fleumatico.png',
    },
  };

  return (
    <div className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="bg-grid-pattern absolute inset-0 -z-10 opacity-20" />
      <div className="absolute top-1/4 right-0 -z-10 h-[500px] w-[500px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0,transparent_60%)]" />

      <div className="mx-auto max-w-5xl">
        {/* Section Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400 tracking-wider uppercase">
            <Landmark className="h-3.5 w-3.5" />
            AULA COMPLETA
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100">
            Sintaxe Visual &amp; Arquétipos
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Como o ser humano interpreta imagens desde as cavernas e como podemos usar essa gramática simbólica para decifrar a estética e o comportamento.
          </p>
        </div>

        {/* Part 1: Ancestral Origin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-b border-slate-800/80 pb-16 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-100">A Leitura Anterior à Escrita</h3>
            </div>
            <p className="text-slate-300 font-light leading-relaxed">
              Antes de inventarmos o alfabeto, nossa relação com o mundo era mediada pela observação de formas, cores e movimentos. 
              A antropologia mostra que nossos ancestrais interpretavam o ambiente para sobreviver: distinguiam perigo e segurança, fertilidade e escassez, abrigo e ameaça.
            </p>
            <div className="border-l-2 border-amber-500/50 pl-4 py-2 italic text-sm text-amber-400/90 font-light">
              &quot;Uma montanha, um rio, o fogo, a noite — tudo carregava significado. Nós somos, biologicamente e culturalmente, programados para atribuir significado às formas.&quot;
            </div>
          </div>
          <div className="relative rounded-2xl border border-slate-800 bg-slate-900/30 p-2 overflow-hidden shadow-2xl">
            <img 
              src="/images/cave-ancestral.png" 
              alt="Ancestral Cave" 
              className="rounded-xl object-cover w-full h-[280px] brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold bg-slate-950/80 px-2.5 py-1 rounded-md">
                Arqueologia Visual
              </span>
            </div>
          </div>
        </div>

        {/* Part 2: Shapes in Nature */}
        <div className="space-y-8 border-b border-slate-800/80 pb-16 mb-16">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Trees className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-100">A Origem Simbólica das Formas</h3>
            </div>
            <p className="text-slate-400 max-w-xl mx-auto text-sm font-light">
              Na natureza, as formas sempre nos ensinaram códigos silenciosos que moldaram nossa cognição visual.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shapeOrigins.map((shape, idx) => (
              <div 
                key={idx} 
                className={`rounded-xl border p-5 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${shape.color}`}
              >
                <div className="space-y-3">
                  <div className="text-3xl font-serif font-black">{shape.visual}</div>
                  <h4 className="font-serif font-bold text-slate-100 text-lg">{shape.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    <strong className="text-slate-100 block mb-1">Na Natureza:</strong> {shape.nature}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/40 text-xs text-slate-400">
                  <strong className="text-slate-200 block mb-1">Significado:</strong> {shape.symbolism}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 3: Hippocrates & Visual Temperaments */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <User className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-100">Hipócrates e os Temperamentos Visuais</h3>
            </div>
            <p className="text-slate-400 max-w-xl mx-auto text-sm font-light">
              A relação dos quatro grandes temperamentos ancestrais com a sintaxe visual moderna. Clique em cada perfil para ver a decodificação.
            </p>
          </div>

          {/* Interactive Temperament Selector */}
          <div className="flex flex-wrap justify-center gap-3 border-b border-slate-800 pb-4">
            {Object.keys(temperamentsDetails).map((key) => {
              const temp = temperamentsDetails[key as keyof typeof temperamentsDetails];
              const isActive = selectedTemp === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedTemp(key)}
                  className={`px-5 py-3 rounded-xl font-serif text-sm font-bold tracking-wide transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${temp.gradient} text-slate-950 shadow-lg ${temp.glowColor} scale-[1.05]`
                      : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800/60'
                  }`}
                >
                  {temp.name}
                </button>
              );
            })}
          </div>

          {/* Temperament Detail Card */}
          <AnimatePresence mode="wait">
            {selectedTemp && (
              <motion.div
                key={selectedTemp}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={`rounded-2xl border ${temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].borderColor} bg-slate-900/30 p-6 md:p-8 backdrop-blur-sm`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].bgColor} ${temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].textColor}`}>
                        {temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].archetype}
                      </span>
                      <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-100 mt-3 flex items-center gap-3">
                        {temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].name}
                        <span className={`text-xl font-medium italic ${temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].textColor}`}>
                          {temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].tagline}
                        </span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                        <h4 className="font-serif font-semibold text-slate-200 text-sm mb-1 uppercase tracking-wider">
                          Formas Sintáticas
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">
                          {temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].shape}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                        <h4 className="font-serif font-semibold text-slate-200 text-sm mb-1 uppercase tracking-wider">
                          Cor Ancestral
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">
                          <strong className={temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].textColor}>
                            {temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].color}:
                          </strong>{' '}
                          {temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].colorDesc}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-serif font-bold text-slate-200">Mensagem e Leitura Simbólica</h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-light">
                        {temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].symbolism}
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed font-light">
                        {temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].message}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex gap-3 items-start">
                      <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-serif font-bold text-amber-400 text-sm">Aplicação de Marca &amp; Estilo</h5>
                        <p className="text-xs text-slate-300 mt-1 font-light leading-relaxed">
                          {temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].branding}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-2 overflow-hidden shadow-xl aspect-video sm:aspect-auto lg:h-[340px]">
                      <img 
                        src={temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].image} 
                        alt={temperamentsDetails[selectedTemp as keyof typeof temperamentsDetails].name} 
                        className="rounded-lg object-cover w-full h-full brightness-90 hover:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Part 4: Image as Extension of Personality */}
        <div className="mt-20 rounded-2xl border border-slate-800 bg-slate-900/20 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 -z-10 h-[300px] w-[300px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.03)_0,transparent_60%)]" />
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="p-4 rounded-full bg-purple-500/10 text-purple-400 flex-shrink-0">
              <Layers className="h-10 w-10" />
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-slate-100">A Imagem como Extensão da Personalidade</h3>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                Quando escolhemos uma roupa, decoramos um ambiente, criamos uma marca ou postamos uma fotografia, estamos fazendo mais do que estética: <strong>estamos emitindo sinais silenciosos.</strong> 
                Toda composição responde a perguntas invisíveis: <em>Quem sou eu? Como desejo ser percebido? Que emoção quero despertar? Que narrativa estou construindo?</em>
              </p>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                A sintaxe visual permite entender por que determinadas formas e composições &quot;combinam&quot; mais com algumas pessoas do que com outras: porque dialogam diretamente com seus padrões simbólicos internos.
              </p>
            </div>
          </div>
        </div>

        {/* Conclusion Box */}
        <div className="mt-16 text-center space-y-4 max-w-2xl mx-auto border-t border-slate-800 pt-10">
          <h4 className="font-serif text-xl font-bold text-amber-400">Conclusão da Aula</h4>
          <p className="text-slate-200 font-serif text-lg italic leading-relaxed">
            &quot;Ler imagens é, no fundo, ler humanidade. Nossa relação com a estética não começa na moda, no design ou na fotografia. Ela começa na caverna. Começa no horizonte. Começa no medo do escuro e no fascínio pelo fogo.&quot;
          </p>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
            Toda imagem é uma memória ancestral organizada em símbolos.
          </p>
        </div>
      </div>
    </div>
  );
}
