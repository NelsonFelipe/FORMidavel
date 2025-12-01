import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="w-full max-w-7xl mx-auto mt-8 md:mt-16 px-4">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white dark:bg-dark-card p-8 md:p-16 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-dark-border overflow-hidden relative transition-colors">
                    
                    {/* Decorator Background (Blob) */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand/10 dark:bg-brand/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="w-full lg:w-1/2 space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-brand text-sm font-semibold rounded-full">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                            </span>
                            Nova versão 2.0 disponível
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                            Crie formulários <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-green-600">extraordinários.</span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                            Crie pesquisas, organize dados, colete informações e feedbacks com o FORMidavel. Sem complicações, como deve ser.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to="/create" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto px-8 py-4 text-lg rounded-2xl">
                                    Começar Agora
                                </Button>
                            </Link>
                        </div>

                    </div>

                    <div className="w-full lg:w-1/2 flex justify-center relative z-10">
                        <div className="relative">
                            {/* Main Image */}
                            <img src="/img/form-1.jpg" 
                                 alt="Interface do FORMidável" 
                                 className="relative z-10 rounded-2xl shadow-2xl max-w-full h-auto object-cover transform rotate-2 hover:rotate-0 transition-transform duration-700 border-4 border-white dark:border-gray-700 w-[500px]" />
                            
                            {/* Floating Decorator Element */}
                            <div className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl z-20 animate-bounce" style={{animationDuration: '3s'}}>
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                        <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                                        <p className="font-bold text-gray-800 dark:text-white">Formulário Ativo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>

            {/* Features Section */}
            <section className="w-full max-w-7xl mx-auto mt-24 mb-24 px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Tudo o que você precisa</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Simplicidade e poder combinados em uma única ferramenta.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Feature 1 (Form Style - Azul) */}
                    <div className="bg-white dark:bg-dark-card rounded-xl shadow-md border border-gray-200 dark:border-dark-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                        <div className="h-3 w-full bg-blue-500"></div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Criação Relâmpago</h3>
                            
                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Arraste, solte e crie formulários em segundos. Interface intuitiva e rápida.</p>
                                <div className="h-px w-full bg-gray-100 dark:bg-gray-700"></div> 
                                
                                {/* Checkbox Simulation */}
                                <div className="flex items-center gap-3 opacity-50 group-hover:opacity-80 transition-opacity">
                                    <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded"></div>
                                    <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                                <div className="flex items-center gap-3 opacity-50 group-hover:opacity-80 transition-opacity">
                                    <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                                    </div>
                                    <div className="h-2 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2 (Form Style - Brand/Verde) */}
                    <div className="bg-white dark:bg-dark-card rounded-xl shadow-md border border-gray-200 dark:border-dark-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                        <div className="h-3 w-full bg-brand"></div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Totalmente Grátis</h3>
                            
                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Sem taxas escondidas. O FORMidável é Open Source e feito para a comunidade.</p>
                                <div className="h-px w-full bg-gray-100 dark:bg-gray-700"></div>
                                
                                {/* Radio Simulation */}
                                <div className="flex items-center gap-3 opacity-50 group-hover:opacity-80 transition-opacity">
                                    <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full"></div>
                                    <div className="h-2 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                                <div className="flex items-center gap-3 opacity-50 group-hover:opacity-80 transition-opacity">
                                    <div className="w-5 h-5 border-2 border-brand rounded-full flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-brand rounded-full"></div>
                                    </div>
                                    <div className="h-2 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 3 (Form Style - Roxo) */}
                    <div className="bg-white dark:bg-dark-card rounded-xl shadow-md border border-gray-200 dark:border-dark-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                        <div className="h-3 w-full bg-purple-500"></div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Diversos Formatos</h3>
                            
                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Múltipla escolha, texto curto, longo ou caixas de seleção. Tudo o que você precisa.</p>
                                <div className="h-px w-full bg-gray-100 dark:bg-gray-700"></div>
                                
                                {/* Text Input Simulation */}
                                <div className="mt-2 opacity-50 group-hover:opacity-80 transition-opacity">
                                    <div className="h-2 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                    <div className="h-8 w-full border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
