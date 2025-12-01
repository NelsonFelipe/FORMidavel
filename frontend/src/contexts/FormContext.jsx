import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';
import { toast } from 'react-toastify';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [forms, setForms] = useState([]);
    const [loadingForms, setLoadingForms] = useState(true);
    const [formsError, setFormsError] = useState(null);

    const fetchForms = async () => {
        setLoadingForms(true);
        setFormsError(null);
        try {
            const data = await api.getForms();
            setForms(data);
        } catch (err) {
            console.error("Error fetching forms in context:", err);
            setFormsError("Falha ao carregar os formulários.");
            toast.error("Erro ao carregar os formulários!", { "data-testid": 'toast-error' });
        } finally {
            setLoadingForms(false);
        }
    };

    useEffect(() => {
        fetchForms();
    }, []); // Fetch forms on initial load

    const refreshForms = () => {
        fetchForms();
    };

    // This function will handle deletion via API and then refresh the local state
    const deleteForm = async (id) => {
        try {
            await api.deleteForm(id);
            toast.success('Formulário excluído com sucesso!', { "data-testid": 'toast-success' });
            refreshForms(); // Refresh the list after deletion
            return true;
        } catch (err) {
            console.error("Error deleting form:", err);
            toast.error("Erro ao excluir formulário.", { "data-testid": 'toast-error' });
            return false;
        }
    };

    return (
        <FormContext.Provider value={{ 
            forms, 
            loadingForms, 
            formsError, 
            refreshForms, 
            deleteForm 
        }}>
            {children}
        </FormContext.Provider>
    );
};

export const useForms = () => useContext(FormContext);
