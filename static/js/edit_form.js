function loadQuestions(formData) {

    const questionsDiv = document.getElementById('questions');

    formData.questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const divQuestTypes = document.createElement('div');
        divQuestTypes.classList.add('quest-types');
        questionDiv.appendChild(divQuestTypes);
        const questionTextInput = document.createElement('input');
        questionTextInput.classList.add('question-text');
        questionTextInput.type = 'text';
        questionTextInput.name = `quest`;
        questionTextInput.value = question.text;
        questionTextInput.required = true;
        divQuestTypes.appendChild(questionTextInput);

        const typeTranslations = {
            short_answer: 'Resposta Curta',
            long_answer: 'Resposta Longa',
            multiple_choice: 'Múltipla Escolha',
            checkbox: 'Caixa de Seleção'
        };

        const typeSelect = document.createElement('select');
        typeSelect.name = `questions[${index}][type]`;
        typeSelect.classList.add('question_type');

        ['short_answer', 'long_answer', 'multiple_choice', 'checkbox']
            .forEach(type => {
                const option = document.createElement('option');
                option.value = type;
                option.textContent = typeTranslations[type];
                typeSelect.appendChild(option);
            });
        typeSelect.value = question.type;
        divQuestTypes.appendChild(typeSelect);

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');

        if (question.type === 'short_answer') {
            const divInputs = document.createElement('div');
            divInputs.classList.add('options');
            optionsDiv.appendChild(divInputs);

            const defaultInput = document.createElement('input');
            defaultInput.type = 'text';
            defaultInput.name = `questions[${index}][options][]`;
            defaultInput.disabled = true;
            defaultInput.value = 'Texto de resposta curta';
            defaultInput.classList.add('inputs');
            divInputs.appendChild(defaultInput);

        } else if (question.type === 'long_answer') {
            const divInputs = document.createElement('div');
            divInputs.classList.add('options');
            optionsDiv.appendChild(divInputs);

            const defaultInput = document.createElement('input');
            defaultInput.type = 'text';
            defaultInput.name = `questions[${index}][options][]`;
            defaultInput.disabled = true;
            defaultInput.value = 'Texto de resposta longa';
            defaultInput.classList.add('inputs');
            divInputs.appendChild(defaultInput);
        } else if (question.type === 'multiple_choice') {
            question.options.forEach(optionText => {
                const divOptions = document.createElement('div');
                divOptions.classList.add('div-options');
                optionsDiv.appendChild(divOptions);

                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = `questions[${index}][options][]`;
                divOptions.appendChild(radioInput);

                const optionInput = document.createElement('input');
                optionInput.type = 'text';
                optionInput.name = `questions[${index}][options][]`;
                optionInput.value = optionText;
                divOptions.appendChild(optionInput);
            });
        } else if (question.type === 'checkbox') {
            question.options.forEach(optionText => {
                const divOptions = document.createElement('div');
                divOptions.classList.add('div-options');
                optionsDiv.appendChild(divOptions);

                const radioInput = document.createElement('input');
                radioInput.type = 'checkbox';
                radioInput.name = `questions[${index}][options][]`;
                divOptions.appendChild(radioInput);

                const optionInput = document.createElement('input');
                optionInput.type = 'text';
                optionInput.name = `questions[${index}][options][]`;
                optionInput.value = optionText;
                divOptions.appendChild(optionInput);
            });
        }

        questionDiv.appendChild(optionsDiv);
        questionsDiv.appendChild(questionDiv);
    });
}

const formData = JSON.parse(document.getElementById('form-data').textContent);
loadQuestions(formData);
