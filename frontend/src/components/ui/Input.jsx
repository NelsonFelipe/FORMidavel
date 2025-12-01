import React from 'react';

const Input = ({ 
    as = 'input', 
    variant = 'default', 
    className = '', 
    ...props 
}) => {
    const Component = as;

    const baseStyles = "bg-transparent outline-none transition-all w-full placeholder-gray-300 dark:placeholder-gray-600";
    
    const variants = {
        default: "border-b-2 border-gray-200 dark:border-gray-700 focus:border-brand text-gray-800 dark:text-white py-2",
        title: "text-4xl font-bold text-gray-800 dark:text-white border-b-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus:border-brand py-2",
        description: "text-base text-gray-600 dark:text-gray-300 border-b border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus:border-gray-300 dark:focus:border-gray-600 py-2 resize-none",
        option: "border-b border-gray-300 dark:border-gray-600 focus:border-brand py-1 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
    };

    return (
        <Component 
            className={`${baseStyles} ${variants[variant]} ${className}`} 
            {...props} 
        />
    );
};

export default Input;
