import React from 'react';

const SubmissionStatusBadge = ({ submissionsCount }) => {
    return (
        <div className="mb-3">
            {submissionsCount && submissionsCount > 0 ? (
                <span data-testid="submission-status-badge" className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold border border-green-200 dark:border-green-800">
                    {submissionsCount} Resp.
                </span>
            ) : (
                <span data-testid="submission-status-badge" className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] font-medium border border-gray-200 dark:border-gray-600">
                    Aguardando respostas
                </span>
            )}
        </div>
    );
};

export default SubmissionStatusBadge;
