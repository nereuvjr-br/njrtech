'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Cpu, Zap } from 'lucide-react';
import { NeonButton, StatusBadge, TechCard, GlitchText } from '@/components/ui/industrial-ui';

import { useChat } from '@/hooks/use-chat';

// ... inside component
export function HeroIndustrial() {
    const [mounted, setMounted] = useState(false);
    const { setOpen } = useChat();

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToServices = () => {
        const element = document.getElementById('services');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!mounted) return null;

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0%,transparent_70%)]" />
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] opacity-30 animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] opacity-30 animate-pulse-glow" style={{ animationDelay: '1s' }} />

            <div className="container relative z-10 px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {/* ... header content ... */}
                        <div className="flex items-center gap-4">
                            <StatusBadge status="online" />
                            <span className="font-mono text-primary text-xs tracking-widest uppercase">
                                v2.0.4 // Versão Estável
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
                            TRANSFORME SEU NEGÓCIO <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-pulse">
                                COM IA
                            </span>
                        </h1>

                        <div className="p-4 border-l-2 border-primary/50 bg-white/5 backdrop-blur-sm max-w-xl">
                            <p className="font-mono text-muted-foreground text-sm md:text-base leading-relaxed">
                                <span className="text-primary">{'>'}</span> Sites de Alta Performance e Inteligência Artificial...<br />
                                <span className="text-primary">{'>'}</span> Soluções escaláveis para <span className="text-white">empresas ambiciosas</span>...<br />
                                <span className="text-white">NJR Tech</span>: A referência em tecnologia e automação para empresas que querem liderar o mercado.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <NeonButton className="h-12 px-8 text-lg" onClick={() => setOpen(true)}>
                                Iniciar Projeto <ArrowRight className="ml-2 w-5 h-5" />
                            </NeonButton>
                            <NeonButton variant="secondary" className="h-12 px-8 text-lg" onClick={scrollToServices}>
                                Ver Capacidades
                            </NeonButton>
                        </div>

                        <div className="flex items-center gap-8 pt-8 border-t border-white/10">
                            <div className="flex items-center gap-2">
                                <Cpu className="w-5 h-5 text-primary" />
                                <span className="text-sm font-mono text-muted-foreground">IA INTEGRADA</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-primary" />
                                <span className="text-sm font-mono text-muted-foreground">ULTRA RÁPIDO</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-primary" />
                                <span className="text-sm font-mono text-muted-foreground">SEO OTIMIZADO</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Visual/Tech Element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <TechCard className="aspect-square flex items-center justify-center bg-black/80 border-primary/30">
                            <div className="relative w-full h-full p-8 flex flex-col">
                                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                                    <span className="font-mono text-xs text-muted-foreground">MONITOR_SISTEMA</span>
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                    </div>
                                </div>

                                <div className="flex-1 space-y-4 font-mono text-xs text-green-500/80 overflow-hidden">
                                    <div className="flex justify-between">
                                        <span>USO_CPU</span>
                                        <span className="text-white">12%</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-[12%] bg-primary" />
                                    </div>

                                    <div className="flex justify-between pt-2">
                                        <span>ALOC_MEMORIA</span>
                                        <span className="text-white">4.2GB</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-[45%] bg-primary" />
                                    </div>

                                    <div className="mt-8 p-4 bg-black/50 border border-white/10 rounded">
                                        <p className="mb-2 text-white">LOGS_RECENTES:</p>
                                        <p>{'>'} Usuário detectado de [ORIGEM_DESCONHECIDA]</p>
                                        <p>{'>'} Analisando intenção...</p>
                                        <p>{'>'} Probabilidade de conversão: 98.4%</p>
                                        <p className="animate-pulse">{'>'} Aguardando comando_</p>
                                    </div>
                                </div>

                                {/* Decorative rotating ring */}
                                <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none m-[-20px]" />
                            </div>
                        </TechCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
