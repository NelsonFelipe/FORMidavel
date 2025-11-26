function loadQuestions(formData) {

    const questionsDiv = document.getElementById('questions');

    formData.questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-border mb-6 space-y-6 question relative group transition-colors'; // Dark mode
        questionDiv.setAttribute('data-testid', 'question-item');

        // Botão de Excluir (Absolute)
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'absolute top-4 right-4 text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20';
        deleteBtn.title = 'Excluir Pergunta';
        deleteBtn.setAttribute('data-testid', 'delete-question-btn');
        deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>';
        deleteBtn.onclick = function() { removeQuestion(this); };
        questionDiv.appendChild(deleteBtn);

        // Header da Pergunta (Texto + Tipo)
        const divQuestTypes = document.createElement('div');
        divQuestTypes.className = 'flex flex-col md:flex-row gap-4 items-start justify-between quest-types pr-10';
        questionDiv.appendChild(divQuestTypes);

        // Input da Pergunta
        const questionTextInput = document.createElement('input');
        questionTextInput.className = 'flex-grow text-lg font-medium border-b-2 border-gray-200 dark:border-gray-700 focus:border-brand outline-none py-2 transition-colors bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 question-text';
        questionTextInput.type = 'text';
        questionTextInput.name = `questions[${index}][text]`;
        questionTextInput.value = question.text;
        questionTextInput.setAttribute('maxlength', '200');
        questionTextInput.setAttribute('data-testid', 'question-text-input');
        questionTextInput.required = true;
        divQuestTypes.appendChild(questionTextInput);

        const typeTranslations = {
            short_answer: 'Resposta Curta',
            long_answer: 'Resposta Longa',
            multiple_choice: 'Múltipla Escolha',
            checkbox: 'Caixa de Seleção'
        };

        // Select Wrapper para estilo
        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'relative min-w-[200px]';

        const typeSelect = document.createElement('select');
        typeSelect.name = `questions[${index}][type]`;
        typeSelect.className = 'block w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand question_type';
        typeSelect.setAttribute('data-testid', 'question-type-select');

        ['short_answer', 'long_answer', 'multiple_choice', 'checkbox']
            .forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = typeTranslations[type];
                typeSelect.appendChild(option);
            });
        typeSelect.value = question.type;
        selectWrapper.appendChild(typeSelect);

        // Seta do select
        const arrowIcon = document.createElement('div');
        arrowIcon.className = 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400';
        arrowIcon.innerHTML = '<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>';
        selectWrapper.appendChild(arrowIcon);

        divQuestTypes.appendChild(selectWrapper);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options pl-2';

        if (question.type === 'short_answer') {
            const divInputs = document.createElement('div');
            // divInputs.classList.add('options'); // Redundante
            optionsDiv.appendChild(divInputs);

            const defaultInput = document.createElement('input');
            defaultInput.type = 'text';
            defaultInput.name = `questions[${index}][options][]`;
            defaultInput.disabled = true;
            defaultInput.value = 'Texto de resposta curta';
            defaultInput.className = 'w-full border-b border-dotted border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-500 py-2 bg-transparent inputs';
            divInputs.appendChild(defaultInput);

        } else if (question.type === 'long_answer') {
            const divInputs = document.createElement('div');
            optionsDiv.appendChild(divInputs);

            const defaultInput = document.createElement('input'); 
            defaultInput.type = 'text';
            defaultInput.name = `questions[${index}][options][]`;
            defaultInput.disabled = true;
            defaultInput.value = 'Texto de resposta longa';
            defaultInput.className = 'w-full border border-dotted border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-500 p-2 rounded bg-transparent inputs';
            divInputs.appendChild(defaultInput);
        } else if (question.type === 'multiple_choice') {
            question.options.forEach(optionText => {
                const divOptions = document.createElement('div');
                divOptions.className = 'flex items-center gap-3 mb-2 div-options';
                optionsDiv.appendChild(divOptions);

                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = `questions[${index}][options][]`; 
                radioInput.className = 'w-4 h-4 text-brand focus:ring-brand border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700';
                radioInput.disabled = true; 
                divOptions.appendChild(radioInput);

                const optionInput = document.createElement('input');
                optionInput.type = 'text';
                optionInput.name = `questions[${index}][options][]`; 
                optionInput.value = optionText;
                optionInput.setAttribute('maxlength', '100'); 
                optionInput.setAttribute('data-testid', 'option-input-text'); 
                optionInput.className = 'flex-grow border-b border-gray-300 dark:border-gray-600 focus:border-brand outline-none py-1 transition-colors hover:border-gray-400 dark:hover:border-gray-500 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600';
                divOptions.appendChild(optionInput);
            });
        } else if (question.type === 'checkbox') {
            question.options.forEach(optionText => {
                const divOptions = document.createElement('div');
                divOptions.className = 'flex items-center gap-3 mb-2 div-options';
                optionsDiv.appendChild(divOptions);

                const radioInput = document.createElement('input');
                radioInput.type = 'checkbox';
                radioInput.name = `questions[${index}][options][]`; 
                radioInput.className = 'w-4 h-4 text-brand focus:ring-brand border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700';
                radioInput.disabled = true; 
                divOptions.appendChild(radioInput);

                const optionInput = document.createElement('input');
                optionInput.type = 'text';
                optionInput.name = `questions[${index}][options][]`; 
                optionInput.value = optionText;
                optionInput.setAttribute('maxlength', '100'); 
                optionInput.setAttribute('data-testid', 'option-input-text'); 
                optionInput.className = 'flex-grow border-b border-gray-300 dark:border-gray-600 focus:border-brand outline-none py-1 transition-colors hover:border-gray-400 dark:hover:border-gray-500 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600';
                divOptions.appendChild(optionInput);
            });
        }

        // Botão de adicionar opção se for múltipla escolha
        if (['multiple_choice', 'checkbox'].includes(question.type)) {
             const newButton = document.createElement('button');
            newButton.textContent = '+ Adicionar Opção';
            newButton.type = 'button';
            newButton.className = 'text-sm text-brand hover:text-green-700 dark:hover:text-green-400 font-medium mt-2 btn-plus';
            newButton.setAttribute('data-testid', 'add-option-btn');
            newButton.onclick = (event) => addOption(event);
            optionsDiv.appendChild(newButton);
        }

        questionDiv.appendChild(optionsDiv);
        questionsDiv.appendChild(questionDiv);
    });
}

const formData = JSON.parse(document.getElementById('form-data').textContent);
loadQuestions(formData);