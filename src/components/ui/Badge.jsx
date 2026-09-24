import React from 'react';

export const Badge = ({ children, variant = 'default', className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs sm:text-sm',
    lg: 'px-4 py-1.5 text-sm',
  };

  const variants = {
    default: 'bg-obsidian-800 text-slate-300 border border-slate-700/50',
    emerald: 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-medium',
    cyan: 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-medium',
    indigo: 'bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 font-medium',
    glow: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 shadow-glow-emerald font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full transition-all duration-200 ${sizeClasses[size]} ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
};
