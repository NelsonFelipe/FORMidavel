import React from 'react';

const Button = ({ 
    children, 
    variant = 'primary', 
    isLoading = false, 
    className = '', 
    ...props 
}) => {
    const baseStyles = "font-bold rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none";
    
    const variants = {
        primary: "bg-brand hover:bg-brand-hover text-white shadow-md hover:shadow-lg",
        secondary: "bg-white dark:bg-transparent border-2 border-gray-200 dark:border-gray-600 hover:border-brand dark:hover:border-brand text-gray-600 dark:text-gray-300 hover:text-brand dark:hover:text-brand",
        danger: "text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30", // Style for icon buttons like delete
        ghost: "text-gray-600 dark:text-gray-400 hover:text-brand dark:hover:text-brand font-semibold py-2 px-4 rounded hover:bg-gray-50 dark:hover:bg-gray-800",
        text: "text-brand hover:text-green-700 dark:hover:text-green-400 font-medium text-sm" // For "Add Option" etc
    };

    // Button sizing/padding logic could be added here, but keeping it flexible for now via className overrides if needed
    const defaultPadding = variant === 'danger' ? '' : (variant === 'text' ? '' : 'px-6 py-3');

    return (
        <button 
            className={`${baseStyles} ${variants[variant]} ${defaultPadding} ${className}`} 
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {!isLoading && children}
        </button>
    );
};

export default Button;
