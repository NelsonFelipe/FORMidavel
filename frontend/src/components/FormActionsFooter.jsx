import React from 'react';
import Button from './ui/Button';

const FormActionsFooter = ({ onAddQuestion, isSubmitting, submitButtonText }) => {
    return (
        <div className="div-btns flex flex-col sm:flex-row gap-4 mt-8 justify-between items-center">
            <Button 
                variant="ghost"
                type="button" 
                onClick={onAddQuestion}
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
                {submitButtonText}
            </Button>
        </div>
    );
};

export default FormActionsFooter;
