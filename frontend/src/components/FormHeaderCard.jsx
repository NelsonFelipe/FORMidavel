import React from 'react';
import Input from './ui/Input';

const FormHeaderCard = ({ title, description, onTitleChange, onDescriptionChange }) => {
    return (
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border-t-8 border-brand border-x border-b border-gray-200 dark:border-dark-border p-8 mb-8 form-header transition-colors">
            <Input 
                variant="title"
                type="text" 
                maxLength="100" 
                required 
                placeholder="Título do Formulário" 
                value={title}
                onChange={onTitleChange}
                data-testid="form-title-input"
            />
            
            <Input 
                as="textarea"
                variant="description"
                className="w-full mt-4"
                rows="2" 
                maxLength="500" 
                required 
                placeholder="Descrição do formulário" 
                value={description}
                onChange={onDescriptionChange}
                data-testid="form-desc-input"
            />
        </div>
    );
};

export default FormHeaderCard;
