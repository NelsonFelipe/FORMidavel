import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const ThankYou = ({ formId }) => {
    // In a real app, we might fetch the form title here or receive it via location state
    const formTitle = "Pesquisa de Opinião"; 

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="bg-white dark:bg-dark-card p-10 md:p-16 rounded-[2.5rem] shadow-2xl shadow-gray-200/60 dark:shadow-none text-center max-w-lg border border-gray-50 dark:border-dark-border relative overflow-hidden transition-colors">
                
                {/* Confetti Decorator */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand to-green-400"></div>

                <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 text-brand rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Sucesso!</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                    Sua resposta para o formulário <br /> 
                    <strong className="text-gray-900 dark:text-white">"{formTitle}"</strong> <br />
                    foi enviada com sucesso.
                </p>
                
                <div className="flex flex-col gap-4">
                    <Link to="/forms" className="w-full">
                        <Button className="w-full">
                            Voltar para Meus Formulários
                        </Button>
                    </Link>
                    
                    <Link to={`/form/${formId}`} className="w-full">
                        <Button variant="secondary" className="w-full">
                            Enviar outra resposta
                        </Button>
                    </Link>
                    
                    <Link to="/create" className="text-center">
                        <Button variant="text" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-medium text-sm mt-2">
                            Crie seu próprio formulário grátis
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
