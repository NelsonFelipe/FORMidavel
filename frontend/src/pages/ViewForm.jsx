import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import QuestionDisplay from '../components/QuestionDisplay';
import { useForms } from '../contexts/FormContext'; // Import useForms

const ViewForm = ({ formId }) => {
    const navigate = useNavigate();
    const { refreshForms } = useForms(); // Use the context to get refreshForms
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const data = await api.getFormById(formId);
                setForm(data);
            } catch (err) {
                console.error("Error fetching form:", err);
                setError("Formulário não encontrado ou erro ao carregar.");
                const toastOptions = { "data-testid": "toast-error" };
                toast.error("Erro ao carregar formulário.", toastOptions);
            } finally {
                setLoading(false);
            }
        };
        fetchForm();
    }, [formId]);

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: value
        }));
    };

    const handleCheckboxChange = (questionId, optionId, isChecked) => {
        setAnswers(prevAnswers => {
            const currentSelected = prevAnswers[questionId] || [];
            if (isChecked) {
                return { ...prevAnswers, [questionId]: [...currentSelected, optionId] };
            } else {
                return { ...prevAnswers, [questionId]: currentSelected.filter(id => id !== optionId) };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await api.submitResponse(formId, answers);
            toast.success('Respostas enviadas com sucesso!', { "data-testid": 'toast-success' });
            refreshForms(); // Refresh forms in context
            navigate(`/thank-you/${formId}`);
        } catch (err) {
            console.error("Error submitting response:", err);
            toast.error("Erro ao enviar resposta. Tente novamente.", { "data-testid": 'toast-error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
            </div>
        );
    }

    if (error || !form) {
        return <div className="text-center text-gray-500 dark:text-gray-400 mt-10">{error || "Formulário não encontrado."}</div>;
    }

    return (
        <div className="w-full max-w-3xl mx-auto pb-20 pt-4">            
            <form onSubmit={handleSubmit}>
                
                {/* Form Header */}
                <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border-t-8 border-brand border-x border-b border-gray-200 dark:border-dark-border p-8 mb-6 transition-colors">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{form.title}</h1>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{form.description}</p>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                    {form.questions.map(question => (
                        <QuestionDisplay 
                            key={question.id}
                            question={question}
                            answers={answers}
                            handleAnswerChange={handleAnswerChange}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                    ))}
                </div>

                {/* Footer and Submit */}
                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Button 
                        type="submit" 
                        className="w-full sm:w-auto px-10" 
                        isLoading={isSubmitting}
                        data-testid="submit-answer-btn"
                    >
                        Enviar Resposta
                    </Button>
                    
                    <Button 
                        type="button" 
                        variant="text" 
                        onClick={handlePrint} 
                        className="text-brand font-semibold"
                    >
                        Imprimir Formulário
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ViewForm;
