import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import FormCard from '../components/FormCard';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import { toast } from 'react-toastify';

const FormsList = () => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        try {
            const data = await api.getForms();
            // Transform backend data if necessary or ensure it matches structure
            setForms(data);
        } catch (err) {
            console.error("Error fetching forms:", err);
            setError("Falha ao carregar os formulários.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.deleteForm(id);
            // Update UI locally
            setForms(forms.filter(f => f.id !== id));
            toast.success('Formulário excluído com sucesso!', { "data-testid": 'toast-success' });
        } catch (err) {
            console.error("Error deleting form:", err);
            toast.error("Erro ao excluir formulário.", { "data-testid": 'toast-error' });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto mt-8">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <PageHeader 
                    title="Meus Formulários" 
                    description="Gerencie e edite seus formulários criados." 
                />
                
                {/* Create button (only appears if forms exist) */}
                {forms.length > 0 && (
                    <Link to="/create" className="w-full md:w-auto">
                        <Button className="w-full md:w-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Novo Formulário
                        </Button>
                    </Link>
                )}
            </div>

            {forms.length > 0 ? (
                
                /* Cards Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="forms-grid">
                    {forms.map(form => (
                        <FormCard key={form.id} form={form} onDelete={handleDelete} />
                    ))}
                </div>

            ) : (
                
                <EmptyState
                    title="Nenhum formulário criado"
                    description="Comece criando seu primeiro formulário para coletar respostas de forma simples e rápida."
                    buttonText="Criar meu primeiro formulário"
                    buttonLink="/create"
                />

            )}

        </div>
    );
};

export default FormsList;
