import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, ChevronDown } from 'lucide-react';
import { useAI, Message, AppContext } from './useAI';

interface AIChatProps {
  activeTab: AppContext;
  apiKey: string;
  /** Contexto extra injetado pela aba (ex: resultado do quiz, formas do sandbox) */
  contextHint?: string;
}

const TAB_LABELS: Record<AppContext, string> = {
  inicio: 'Início',
  teoria: 'Sintaxe Visual',
  quiz: 'Arquétipo',
  sandbox: 'Laboratório',
  decoder: 'Decodificador',
};

const QUICK_QUESTIONS: Record<AppContext, string[]> = {
  inicio: [
    'O que é Sintaxe Visual?',
    'Qual a diferença entre os 4 arquétipos?',
    'Como isso se aplica no design?',
  ],
  teoria: [
    'Explique a verticalidade no design',
    'O que são linhas de força?',
    'Como usar curvas para transmitir emoção?',
  ],
  quiz: [
    'O que significa ser Colérico?',
    'Posso ter mais de um arquétipo?',
    'Como interpretar meu resultado?',
  ],
  sandbox: [
    'O que minhas formas revelam sobre mim?',
    'Como criar equilíbrio visual?',
    'Qual a simbologia das diagonais?',
  ],
  decoder: [
    'Como identificar linhas de força?',
    'O que é composição visual?',
    'Como analisar uma fotografia?',
  ],
};

export default function AIChat({ activeTab, apiKey, contextHint }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [hasNew, setHasNew] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, loading } = useAI(apiKey);

  // Reset chat when tab changes, keeping context fresh
  useEffect(() => {
    setMessages([]);
  }, [activeTab]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSend = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: 'user', content };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput('');

    // Inject context hint if available
    const messagesWithContext: Message[] = contextHint
      ? [
          { role: 'user', content: `[Contexto atual: ${contextHint}]` },
          { role: 'assistant', content: 'Entendido, vou considerar esse contexto.' },
          ...updatedMessages,
        ]
      : updatedMessages;

    try {
      const reply = await sendMessage(messagesWithContext, activeTab);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      if (!isOpen) setHasNew(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Desculpe, ocorreu um erro. Verifique sua chave da API do OpenRouter.',
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl px-4 py-3.5 shadow-2xl shadow-amber-500/20 transition-all duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-semibold text-sm`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <Sparkles className="h-4 w-4" />
        <span>Perguntar à IA</span>
        {hasNew && (
          <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-rose-500 ring-2 ring-slate-950" />
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 w-[min(420px,calc(100vw-24px))] flex flex-col rounded-2xl border border-slate-700/80 bg-slate-950/95 shadow-2xl shadow-black/60 backdrop-blur-xl overflow-hidden"
            style={{ height: 'min(580px, calc(100vh - 120px))' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-500/20">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-100">Assistente IA</p>
                  <p className="text-[10px] text-amber-500/80 uppercase tracking-wider font-medium">
                    {TAB_LABELS[activeTab]}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 flex-shrink-0 mt-0.5">
                      <Bot className="h-3.5 w-3.5 text-amber-400" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-slate-800/60 px-4 py-3 text-sm text-slate-300 leading-relaxed border border-slate-700/50">
                      Olá! Sou seu guia de{' '}
                      <span className="text-amber-400 font-medium">Sintaxe Visual</span>. Estou no
                      contexto de <span className="text-amber-400 font-medium">{TAB_LABELS[activeTab]}</span>.
                      {' '}Como posso ajudar?
                    </div>
                  </div>

                  {/* Quick questions */}
                  <div className="space-y-1.5 pl-9">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                      Sugestões
                    </p>
                    {QUICK_QUESTIONS[activeTab].map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSend(q)}
                        className="block w-full text-left text-xs text-slate-400 hover:text-amber-400 border border-slate-800 hover:border-amber-500/30 rounded-xl px-3 py-2 bg-slate-900/40 hover:bg-slate-900/60 transition-all duration-200"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`p-1.5 rounded-full flex-shrink-0 mt-0.5 ${
                      msg.role === 'user'
                        ? 'bg-rose-500/10 border border-rose-500/20'
                        : 'bg-amber-500/10 border border-amber-500/20'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="h-3.5 w-3.5 text-rose-400" />
                    ) : (
                      <Bot className="h-3.5 w-3.5 text-amber-400" />
                    )}
                  </div>
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed border ${
                      msg.role === 'user'
                        ? 'rounded-tr-sm bg-rose-500/10 border-rose-500/20 text-slate-200'
                        : 'rounded-tl-sm bg-slate-800/60 border-slate-700/50 text-slate-300'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 flex-shrink-0 mt-0.5">
                    <Bot className="h-3.5 w-3.5 text-amber-400" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-slate-800/60 px-4 py-3 border border-slate-700/50">
                    <Loader2 className="h-4 w-4 text-amber-400 animate-spin" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-slate-800 bg-slate-900/40">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Pergunte sobre sintaxe visual..."
                  rows={1}
                  className="flex-1 resize-none rounded-xl bg-slate-800/60 border border-slate-700/60 px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/40 focus:bg-slate-800 transition-all duration-200 leading-relaxed"
                  style={{ maxHeight: '100px' }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[10px] text-slate-600 mt-1.5 text-center">
                Enter para enviar · Shift+Enter para nova linha
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
