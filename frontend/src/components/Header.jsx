import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Initialize theme from localStorage or system preference
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    return (
        <header className="w-full h-[80px] bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-100 dark:border-dark-border sticky top-0 z-50 transition-all">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
                
                {/* Logo */}
                <Link to="/" className="group flex items-center gap-3 select-none focus:outline-none" data-testid="nav-logo">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-green-200 dark:shadow-none group-hover:scale-105 transition-transform duration-300">
                        F
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
                        Form<span className="text-brand">idável</span>
                    </h2>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand dark:hover:text-brand transition-colors" data-testid="nav-home">
                        Início
                    </Link>
                    <Link to="/forms" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand dark:hover:text-brand transition-colors" data-testid="nav-my-forms">
                        Meus Formulários
                    </Link>
                    
                    {/* Dark Mode Toggle */}
                    <button id="theme-toggle" type="button" onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 transition-colors">
                        {isDarkMode ? (
                            <svg id="theme-toggle-light-icon" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h1a1 1 0 100 2h-1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        ) : (
                            <svg id="theme-toggle-dark-icon" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8 0 1010.586 10.586z"></path></svg>
                        )}
                    </button>

                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

                    {/* CTA Button in Header */}
                    <Link to="/create" >
                        <button className="px-6 py-2.5 bg-gray-900 hover:bg-black dark:bg-brand dark:hover:bg-green-600 text-white dark:text-gray-900 font-bold rounded-full text-sm transition-all transform hover:-translate-y-0.5 hover:shadow-xl ring-2 ring-transparent focus:ring-brand/50 outline-none" data-testid="nav-create-btn">
                            Criar Agora
                        </button>
                    </Link>
                </nav>

                {/* Simplified Mobile Menu */}
                <div className="md:hidden flex items-center gap-4" data-testid="mobile-menu">
                    <Link to="/forms" className="text-gray-600 dark:text-gray-300 hover:text-brand">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
