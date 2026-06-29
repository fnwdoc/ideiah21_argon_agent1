import React, { useState } from 'react';
import { Compass, Menu, X, Landmark, BrainCircuit, Sparkles, Eye } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'inicio', label: 'Início', icon: Landmark },
    { id: 'teoria', label: 'Sintaxe Visual', icon: Compass },
    { id: 'quiz', label: 'Descubra seu Arquétipo', icon: BrainCircuit },
    { id: 'sandbox', label: 'Laboratório Criativo', icon: Sparkles },
    { id: 'decoder', label: 'Decodificador', icon: Eye },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('inicio')}>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 to-rose-600 p-0.5 shadow-lg shadow-rose-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-slate-950">
                <span className="font-serif text-lg font-bold text-amber-400">Φ</span>
              </div>
            </div>
            <div>
              <h1 className="font-serif text-lg font-semibold tracking-wider text-slate-100 sm:text-xl">
                SINTAXE VISUAL
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-amber-500/80 font-semibold">
                &amp; Arquétipos Humanos
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-slate-900 text-amber-400 border border-amber-500/30 shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
