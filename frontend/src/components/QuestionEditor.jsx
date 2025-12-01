import React, { useState, useEffect } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import OptionEditor from './OptionEditor'; // Import the new OptionEditor

const QuestionEditor = ({ 
    question, // Initial question data from parent
    isDeletable,
    onRemove,    // Callback to remove this question from parent
    onQuestionChange // New callback to notify parent of changes to this question
}) => {
    // Manage internal state for the question
    const [questionText, setQuestionText] = useState(question.text);
    const [questionType, setQuestionType] = useState(question.type);
    const [options, setOptions] = useState(question.options);

    // Effect to notify parent of changes to this question's internal state
    useEffect(() => {
        onQuestionChange({
            ...question,
            text: questionText,
            type: questionType,
            options: options
        });
    }, [questionText, questionType, options]); // eslint-disable-line react-hooks/exhaustive-deps

    // --- Option Management (Internal to QuestionEditor) ---
    const addOption = () => {
        setOptions(prevOptions => [...prevOptions, '']);
    };

    const updateOption = (optionIndex, value) => {
        setOptions(prevOptions => 
            prevOptions.map((opt, idx) => (idx === optionIndex ? value : opt))
        );
    };

    const removeOption = (optionIndex) => {
        setOptions(prevOptions => prevOptions.filter((_, idx) => idx !== optionIndex));
    };

    // --- Handle Question Type Change ---
    const handleQuestionTypeChange = (e) => {
        const newType = e.target.value;
        setQuestionType(newType);
        // Clear options if type changes to non-option based
        if (!['multiple_choice', 'checkbox'].includes(newType)) {
            setOptions([]);
        } else if (options.length === 0) {
            // Initialize with one empty option if changing to option-based and no options exist
            setOptions(['']);
        }
    };

    return (
        <div className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-border mb-6 space-y-6 question relative group transition-colors" data-testid="question-item">
            
            {/* Delete Button */}
            {isDeletable && (
                <Button 
                    type="button" 
                    variant="danger"
                    onClick={() => onRemove(question.id)} 
                    className="absolute top-4 right-4" 
                    title="Excluir Pergunta" 
                    data-testid="delete-question-btn"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </Button>
            )}

            <div className="flex flex-col md:flex-row gap-4 items-start justify-between quest-types pr-10">
                <Input 
                    type="text" 
                    className="flex-grow text-lg font-medium question-text" 
                    placeholder="Digite sua pergunta" 
                    required 
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    data-testid="question-text-input"
                />
                
                <div className="relative min-w-[200px]">
                    <select 
                        className="block w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand question_type" 
                        required 
                        value={questionType}
                        onChange={handleQuestionTypeChange}
                        data-testid="question-type-select"
                    >
                        <option value="short_answer">Resposta Curta</option>
                        <option value="long_answer">Resposta Longa</option>
                        <option value="multiple_choice">Múltipla Escolha</option>
                        <option value="checkbox">Caixa de Seleção</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>

            {/* Options Area */}
            <div className="options pl-2">
                {questionType === 'short_answer' && (
                    <Input className="w-full border-dotted text-gray-500 dark:text-gray-500" type="text" value="Texto de resposta curta" disabled />
                )}
                {questionType === 'long_answer' && (
                    <Input as="textarea" className="w-full border-dotted text-gray-500 dark:text-gray-500 h-24 border rounded" value="Texto de resposta longa" disabled data-testid="long-answer-placeholder" />
                )}
                {(questionType === 'multiple_choice' || questionType === 'checkbox') && (
                    <div>
                        {options.map((opt, optIndex) => (
                            <OptionEditor 
                                key={optIndex} // Use index as key, or a unique ID if options had one
                                option={opt}
                                optionIndex={optIndex}
                                onUpdateOption={updateOption}
                                onRemoveOption={removeOption}
                            />
                        ))}
                        <Button 
                            type="button" 
                            variant="text"
                            onClick={addOption} 
                            className="mt-2"
                            data-testid="add-option-btn"
                        >
                            + Adicionar Opção
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionEditor;
