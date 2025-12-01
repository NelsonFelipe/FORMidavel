import React from 'react';
import PageHeader from '../components/PageHeader'; // Import PageHeader

const Privacy = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-dark-border transition-colors">
            <PageHeader
                title="Política de Privacidade"
                description="Última atualização: Novembro 2025"
            />
            
            <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-brand rounded-full"></span>
                        1. Coleta de Dados
                    </h2>
                    <p>O FORMidável coleta apenas os dados estritamente necessários para o funcionamento do serviço. Ao criar um formulário, armazenamos o conteúdo das perguntas e configurações. Ao responder, armazenamos as respostas fornecidas.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-brand rounded-full"></span>
                        2. Uso das Informações
                    </h2>
                    <p>As informações coletadas são utilizadas exclusivamente para permitir a criação, gestão e análise dos formulários pelos seus respectivos criadores. Não vendemos nem compartilhamos seus dados com terceiros para fins publicitários.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-brand rounded-full"></span>
                        3. Cookies e Tecnologias
                    </h2>
                    <p>Utilizamos cookies essenciais para manter sua sessão ativa e garantir a segurança da navegação. Não utilizamos cookies de rastreamento invasivos.</p>
                </section>
                
                <section>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-brand rounded-full"></span>
                        4. Seus Direitos
                    </h2>
                    <p>Você tem o direito de solicitar a exclusão de seus dados ou formulários a qualquer momento através da nossa plataforma ou entrando em contato conosco.</p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
