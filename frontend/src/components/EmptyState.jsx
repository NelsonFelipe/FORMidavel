import React from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

const EmptyState = ({ title, description, buttonText, buttonLink, icon }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-dark-card rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 text-center transition-colors">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-full mb-6">
                {icon || (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )}
            </div>
            <h2 data-testid="empty-state-title" className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">{description}</p>
            
            <Link to={buttonLink}>
                <Button data-testid="empty-state-create-button">
                    {buttonText}
                </Button>
            </Link>
        </div>
    );
};

export default EmptyState;
