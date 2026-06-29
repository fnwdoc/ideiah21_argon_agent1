import React from 'react';
import { Landmark } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('inicio')}>
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-amber-500 to-rose-600 p-0.5 shadow-lg shadow-rose-500/10">
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-slate-950">
              <span className="font-serif text-sm font-bold text-amber-400">Φ</span>
            </div>
          </div>
          <div>
            <h1 className="font-serif text-sm font-semibold tracking-wider text-slate-300">
              SINTAXE VISUAL
            </h1>
            <p className="text-[8px] uppercase tracking-widest text-amber-500/70 font-semibold">
              &amp; Arquétipos Humanos
            </p>
          </div>
        </div>

        {/* Poetic Quote */}
        <p className="text-center text-xs text-slate-500 font-light max-w-md leading-relaxed sm:text-right">
          &ldquo;Toda imagem é uma memória ancestral organizada em símbolos. Ao compreendermos a sintaxe visual, deixamos de apenas ver para começar verdadeiramente a interpretar.&rdquo;
        </p>
      </div>

      {/* Copyright / Attribution */}
      <div className="mx-auto max-w-7xl mt-8 pt-8 border-t border-slate-900/60 flex flex-col items-center justify-between gap-4 text-[11px] text-slate-600 sm:flex-row">
        <p>© {new Date().getFullYear()} Sintaxe Visual &amp; Arquétipos. Todos os direitos reservados.</p>
        <p className="font-light">
          Desenvolvido com paixão pela arqueologia da percepção humana.
        </p>
      </div>
    </footer>
  );
}
