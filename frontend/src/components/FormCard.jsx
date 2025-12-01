import React from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import SubmissionStatusBadge from './SubmissionStatusBadge'; // Import SubmissionStatusBadge

const FormCard = ({ form, onDelete }) => {
    return (
        <div className="group bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden" data-testid={`form-card-${form.id}`}>
            
            {/* Decorative top strip */}
            <div className="h-2 bg-brand w-full"></div>

            <div className="p-6 flex-grow">
                
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">#{form.id}</span>
                    
                    {/* Response Status */}
                    <SubmissionStatusBadge submissionsCount={form.submissions_count} />
                </div>

                <h2 data-testid="form-card-title" className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-brand transition-colors line-clamp-2" title={form.title}>
                    {form.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {form.description || "Sem descrição definida."}
                </p>
            </div>
            
            {/* Card Footer with Actions */}
            <div className="bg-gray-50 dark:bg-gray-800 px-5 py-4 border-t border-gray-100 dark:border-dark-border flex justify-between items-center gap-2">
                
                {/* Respond Button (Primary Action) */}
                <Link to={`/form/${form.id}`} title="Responder Formulário" className="flex-grow">
                    <Button variant="secondary" className="w-full text-sm py-2 h-10 justify-center" data-testid={`respond-btn-${form.id}`}>
                        Responder
                    </Button>
                </Link>

                <div className="flex items-center gap-1">
                    {/* Edit Button (Icon Only) */}
                    <Link to={`/edit/${form.id}`} title="Editar Formulário">
                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-lg" data-testid={`edit-btn-${form.id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </Button>
                    </Link>

                    {/* Delete Button (Icon Only) */}
                    <Button 
                        variant="danger"
                        onClick={() => onDelete(form.id)} 
                        className="h-10 w-10 p-0 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 text-gray-400 hover:text-red-600"
                        title="Excluir Formulário" 
                        data-testid={`delete-btn-${form.id}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FormCard;
