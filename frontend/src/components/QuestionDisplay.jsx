import React from 'react';
import Input from './ui/Input';

const QuestionDisplay = ({ question, answers, handleAnswerChange, handleCheckboxChange }) => {
    return (
        <div key={question.id} className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-border transition-all hover:shadow-md">
            <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                {question.question_text}
                <span className="text-red-500">*</span>
            </label>

            {question.question_type === 'short_answer' && (
                <Input 
                    type="text" 
                    name={`question_${question.id}`} 
                    required 
                    maxLength="200"
                    placeholder="Sua resposta"
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    data-testid={`short-answer-input-${question.id}`}
                />
            )}

            {question.question_type === 'long_answer' && (
                <Input 
                    as="textarea"
                    name={`question_${question.id}`} 
                    required 
                    maxLength="5000"
                    className="border rounded-lg p-3 h-32 resize-y" 
                    rows="3" 
                    placeholder="Sua resposta"
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    data-testid={`long-answer-input-${question.id}`}
                ></Input>
            )}

            {question.question_type === 'multiple_choice' && (
                <div className="space-y-2">
                    {question.options.map(option => (
                        <label key={option.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 -ml-2">
                            <input 
                                type="radio" 
                                name={`question_${question.id}`} 
                                value={option.id} 
                                required 
                                className="w-5 h-5 text-brand focus:ring-brand border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-pointer"
                                checked={answers[question.id] === option.id}
                                onChange={() => handleAnswerChange(question.id, option.id)}
                                data-testid={`mc-option-input-${option.id}`}
                            />
                            <span className="text-gray-700 dark:text-gray-300">{option.option_text}</span>
                        </label>
                    ))}
                </div>
            )}

            {question.question_type === 'checkbox' && (
                <div className="space-y-2">
                    {question.options.map(option => (
                        <label key={option.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700 -ml-2">
                            <input 
                                type="checkbox" 
                                name={`question_${question.id}`} 
                                value={option.id} 
                                className="w-5 h-5 text-brand focus:ring-brand border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 cursor-pointer"
                                checked={(answers[question.id] || []).includes(option.id)}
                                onChange={(e) => handleCheckboxChange(question.id, option.id, e.target.checked)}
                                data-testid={`checkbox-option-input-${option.id}`}
                            />
                            <span className="text-gray-700 dark:text-gray-300">{option.option_text}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuestionDisplay;
