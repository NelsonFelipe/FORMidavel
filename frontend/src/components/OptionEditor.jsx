import React from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

const OptionEditor = ({ option, optionIndex, onUpdateOption, onRemoveOption }) => {
    return (
        <div className="flex items-center gap-3 mb-2 div-options">
            {/* O rádio/checkbox é desabilitado aqui, apenas para visualização */}
            <input 
                type="radio" // Tipo padrão, será sobrescrito ou ignorado pelo QuestionEditor se necessário
                disabled 
                className="w-5 h-5 text-brand focus:ring-brand border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-pointer" 
            />
            <Input 
                type="text" 
                variant="option"
                className="flex-grow" 
                value={option || ''} // Use 'option' directly here for consistency
                onChange={(e) => onUpdateOption(optionIndex, e.target.value)}
                placeholder={`Opção ${optionIndex + 1}`}
                data-testid="option-input-text"
                required
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemoveOption(optionIndex)}
                data-testid="delete-option-btn"
                title="Remover Opção"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </Button>
        </div>
    );
};

export default OptionEditor;
