import React from 'react';

const PageHeader = ({ title, description }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            </div>
        </div>
    );
};

export default PageHeader;
