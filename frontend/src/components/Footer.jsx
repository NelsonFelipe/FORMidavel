import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full border-t border-gray-100 dark:border-dark-border py-12 mt-auto bg-gray-50 dark:bg-dark-bg transition-colors">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-gray-400 dark:text-gray-500 text-sm">© 2025 FORMidável. Todos os direitos reservados.</p>
                <div className="flex gap-6">
                    <Link to="/privacy" className="text-gray-400 dark:text-gray-500 hover:text-brand dark:hover:text-brand text-sm transition-colors">Privacidade</Link>
                    <Link to="/terms" className="text-gray-400 dark:text-gray-500 hover:text-brand dark:hover:text-brand text-sm transition-colors">Termos</Link>
                    <a href="https://github.com/NelsonFelipe/FORMidavel" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-brand dark:hover:text-brand text-sm transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
