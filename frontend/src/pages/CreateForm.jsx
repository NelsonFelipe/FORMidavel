import React, { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import QuestionEditor from '../components/QuestionEditor';
import FormHeaderCard from '../components/FormHeaderCard';
import FormActionsFooter from '../components/FormActionsFooter';
import { useForms } from '../contexts/FormContext'; // Import useForms

const CreateForm = () => {
    const navigate = useNavigate();
    const { refreshForms } = useForms(); // Use the context to get refreshForms
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([
        { id: Date.now(), text: '', type: 'short_answer', options: [''] }
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        // Validation for multiple choice/checkbox options
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

        setIsSubmitting(true);

        // Transform data to match API expectation
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
            await api.createForm(formData);
            toast.success('Formulário criado com sucesso!', { "data-testid": 'toast-success' });
            refreshForms(); // Refresh forms in context
            navigate('/forms');
        } catch (error) {
            console.error("Error creating form:", error);
            toast.error("Erro ao criar formulário. Verifique os dados.", { "data-testid": 'toast-error' });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        isDeletable={questions.length > 1}
                        onRemove={removeQuestion}
                        onQuestionChange={handleQuestionChange} // New prop
                    />
                ))}
            </div>

            <div className="div-btns flex flex-col sm:flex-row gap-4 mt-8 justify-between items-center">
                <Button 
                    variant="ghost"
                    type="button" 
                    onClick={addQuestion}
                    data-testid="add-question-btn"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Adicionar Pergunta
                </Button>

                <Button 
                    type="submit" 
                    isLoading={isSubmitting}
                    data-testid="save-form-btn"
                >
                    Salvar Formulário
                </Button>
            </div>

        </form>
    );
};

export default CreateForm;
