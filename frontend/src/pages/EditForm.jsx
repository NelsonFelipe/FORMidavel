import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import QuestionEditor from '../components/QuestionEditor';
import FormHeaderCard from '../components/FormHeaderCard';
import FormActionsFooter from '../components/FormActionsFooter'; // Import FormActionsFooter
import { useForms } from '../contexts/FormContext'; // Import useForms

const EditForm = ({ formId }) => {
    const navigate = useNavigate(); // Added navigate hook which was missing in previous step
    const { refreshForms } = useForms(); // Use the context to get refreshForms
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const data = await api.getFormById(formId);
                setTitle(data.title);
                setDescription(data.description || '');
                
                // Map API questions back to internal state format
                // Ensure options are handled correctly for editing
                const mappedQuestions = data.questions.map(q => ({
                    id: q.id, // Keep DB ID
                    text: q.question_text,
                    type: q.question_type,
                    options: q.options ? q.options.map(opt => opt.option_text) : []
                }));
                setQuestions(mappedQuestions);
            } catch (err) {
                console.error("Error fetching form:", err);
                setError("Erro ao carregar o formulário.");
                toast.error("Erro ao carregar o formulário.", { "data-testid": 'toast-error' });
            } finally {
                setLoading(false);
            }
        };

        fetchForm();
    }, [formId]);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            // New questions start with a default short answer type and one empty option
            { id: Date.now(), text: '', type: 'short_answer', options: [''] }
        ]);
    };

    const removeQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    // This function now receives the full updated question object from QuestionEditor
    const handleQuestionChange = (updatedQuestion) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(q => (q.id === updatedQuestion.id ? updatedQuestion : q))
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (questions.length === 0) {
            toast.error('O formulário deve ter pelo menos uma pergunta.');
            return;
        }

        for (const q of questions) {
            if ((q.type === 'multiple_choice' || q.type === 'checkbox') && q.options.length < 2) {
                toast.error("Crie pelo menos 2 opções para perguntas de múltipla escolha ou caixa de seleção.");
                return; // Stop submission
            }
            if (q.text.trim() === '') {
                toast.error("Todas as perguntas devem ter texto.");
                return;
            }
        }
        
        // Transform state to API format
        const apiQuestions = questions.map(q => ({
            question_text: q.text,
            question_type: q.type,
            options: q.options
        }));

        const formData = { 
            title, 
            description, 
            questions: apiQuestions 
        };

        try {
            await api.updateForm(formId, formData);
            toast.success('Formulário atualizado com sucesso!', { "data-testid": 'toast-success' });
            refreshForms(); // Refresh forms in context
            navigate('/forms');
        } catch (err) {
            console.error("Error updating form:", err);
            toast.error("Erro ao atualizar formulário.", { "data-testid": 'toast-error' });
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
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto pb-20">
            
            <FormHeaderCard
                title={title}
                description={description}
                onTitleChange={(e) => setTitle(e.target.value)}
                onDescriptionChange={(e) => setDescription(e.target.value)}
            />

            <div className="space-y-6">
                {questions.map((q) => (
                    <QuestionEditor
                        key={q.id}
                        question={q}
                        isDeletable={true} // In edit mode, all but the last question can be deleted.
                        onRemove={removeQuestion}
                        onQuestionChange={handleQuestionChange} // New prop
                    />
                ))}
            </div>

            <FormActionsFooter
                onAddQuestion={addQuestion}
                submitButtonText="Salvar Alterações"
            />
        </form>
    );
};

export default EditForm;
