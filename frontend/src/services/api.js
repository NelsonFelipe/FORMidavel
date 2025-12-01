const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

/**
 * Helper function to handle API responses
 */
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || 'API request failed');
    }
    // Some endpoints (like DELETE) might return 204 No Content
    if (response.status === 204) {
        return null;
    }
    return response.json();
};

export const api = {
    // GET /forms - List all forms
    getForms: async () => {
        const response = await fetch(`${API_BASE_URL}/forms`);
        return handleResponse(response);
    },

    // GET /forms/:id - Get a single form by ID
    getFormById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/forms/${id}`);
        return handleResponse(response);
    },

    // POST /forms - Create a new form
    createForm: async (formData) => {
        const response = await fetch(`${API_BASE_URL}/forms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        return handleResponse(response);
    },

    // PUT /forms/:id - Update an existing form
    updateForm: async (id, formData) => {
        const response = await fetch(`${API_BASE_URL}/forms/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        return handleResponse(response);
    },

    // DELETE /forms/:id - Delete a form
    deleteForm: async (id) => {
        const response = await fetch(`${API_BASE_URL}/forms/${id}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    },
    
    // POST /forms/:id/responses - Submit a response
    submitResponse: async (id, answers) => {
        const response = await fetch(`${API_BASE_URL}/forms/${id}/responses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers }),
        });
        return handleResponse(response);
    }
};
