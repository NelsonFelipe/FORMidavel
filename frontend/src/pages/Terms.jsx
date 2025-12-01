import React from 'react';
import PageHeader from '../components/PageHeader'; // Import PageHeader

const Terms = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-dark-border transition-colors">
            <PageHeader
                title="Termos de Uso"
                description="Vigência a partir de: Novembro 2025"
            />
            
            <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-brand rounded-full"></span>
                        1. Aceitação
                    </h2>
                    <p>Ao acessar e usar o FORMidável, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis, e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-brand rounded-full"></span>
                        2. Uso do Serviço
                    </h2>
                    <p>Você é responsável por todo o conteúdo que criar e publicar através dos nossos formulários. É estritamente proibido usar o serviço para coletar senhas, dados de cartão de crédito ou realizar atividades ilegais/phishing.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-brand rounded-full"></span>
                        3. Limitação de Responsabilidade
                    </h2>
                    <p>O FORMidável é fornecido "como está". Não oferecemos garantias de que o serviço será ininterrupto ou livre de erros. Não nos responsabilizamos por perdas de dados decorrentes do uso da plataforma.</p>
                </section>
                
                <section>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-brand rounded-full"></span>
                        4. Modificações
                    </h2>
                    <p>O FORMidável pode revisar estes termos de serviço a qualquer momento sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
