const questionContainer = document.getElementById('questions');

let optionIndex = 1;

questionContainer.addEventListener('change', function (e) {

    optionIndex = 1;

    if (e.target.classList.contains('question_type')) {
        const selectedValue = e.target.value;
        const optionContainer = e.target.closest('.question').querySelector('.options');

        optionContainer.innerHTML = '';

        if (selectedValue === 'multiple_choice') {
            addMultipleChoiceOption(optionContainer);

            // checkbox
        } else if (selectedValue === 'checkbox') {
            addCheckboxOption(optionContainer);

            // resposta curta
        } else if (selectedValue === 'short_answer') {
            const newInput = document.createElement('input');
            newInput.disabled = true;
            newInput.required = true;
            newInput.type = 'text';
            newInput.name = 'opcao';
            newInput.value = 'Texto de resposta curta';
            // Tailwind classes
            newInput.className = 'w-full border-b border-dotted border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-500 py-2 bg-transparent inputs';
            newInput.setAttribute('maxlength', '200');
            optionContainer.appendChild(newInput);

            // resposta longa
        } else {
            const newTextarea = document.createElement('textarea');
            newTextarea.disabled = true;
            newTextarea.required = true;
            newTextarea.name = 'opcao';
            newTextarea.value = 'Texto de resposta longa';
            // Tailwind classes
            newTextarea.className = 'w-full border border-dotted border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-500 p-2 rounded bg-transparent h-24 inputs';
            optionContainer.appendChild(newTextarea);
        }
    }
});

function removeQuestion(button) {
    const questionDiv = button.closest('.question');
    questionDiv.remove();
}

function addMultipleChoiceOption(container) {
    const divRadio = document.createElement('div');
    divRadio.className = 'flex items-center gap-3 mb-2 div-options';

    // input radio
    const newInputRadio = document.createElement('input');
    newInputRadio.type = 'radio';
    newInputRadio.disabled = true;
    newInputRadio.name = 'opcao';
    newInputRadio.className = 'w-4 h-4 text-brand focus:ring-brand border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700';
    divRadio.appendChild(newInputRadio);

    // input texto
    const newInputText = document.createElement('input');
    newInputText.type = 'text';
    newInputText.name = `opcao_text_0`;
    newInputText.placeholder = 'Opção 1';
    newInputText.setAttribute('maxlength', '100'); 
    newInputText.setAttribute('data-testid', 'option-input-text');
    newInputText.className = 'flex-grow border-b border-gray-300 dark:border-gray-600 focus:border-brand outline-none py-1 transition-colors hover:border-gray-400 dark:hover:border-gray-500 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600';

    divRadio.appendChild(newInputText);

    container.appendChild(divRadio);

    const newButton = document.createElement('button');
    newButton.textContent = '+ Adicionar Opção';
    newButton.type = 'button';
    newButton.className = 'text-sm text-brand hover:text-green-700 dark:hover:text-green-400 font-medium mt-2 btn-plus';
    newButton.setAttribute('data-testid', 'add-option-btn');
    newButton.onclick = (event) => addOption(event);
    container.appendChild(newButton);
}

function addCheckboxOption(container) {
    const divCheckbox = document.createElement('div');
    divCheckbox.className = 'flex items-center gap-3 mb-2 div-options';

    const newInputCheckbox = document.createElement('input');
    newInputCheckbox.type = 'checkbox';
    newInputCheckbox.disabled = true;
    newInputCheckbox.className = 'w-4 h-4 text-brand focus:ring-brand border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700';
    divCheckbox.appendChild(newInputCheckbox);

    const newInputText = document.createElement('input');
    newInputText.type = 'text';
    newInputText.name = `opcao_text_check_0`;
    newInputText.placeholder = 'Opção 1';
    newInputText.setAttribute('maxlength', '100');
    newInputText.setAttribute('data-testid', 'option-input-text');
    newInputText.className = 'flex-grow border-b border-gray-300 dark:border-gray-600 focus:border-brand outline-none py-1 transition-colors hover:border-gray-400 dark:hover:border-gray-500 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600';
    divCheckbox.appendChild(newInputText);

    container.appendChild(divCheckbox);

    const newButton = document.createElement('button');
    newButton.textContent = '+ Adicionar Opção';
    newButton.type = 'button';
    newButton.className = 'text-sm text-brand hover:text-green-700 dark:hover:text-green-400 font-medium mt-2 btn-plus';
    newButton.setAttribute('data-testid', 'add-option-btn');
    newButton.onclick = (event) => addOption(event);
    container.appendChild(newButton);
}

function addOption(event) {
    const questionDiv = event.target.closest('.question');
    const optionContainer = questionDiv.querySelector('.options');

    const newDiv = document.createElement('div');
    newDiv.className = 'flex items-center gap-3 mb-2 div-options';

    const type = questionDiv.querySelector('.question_type').value;

    if (type === 'multiple_choice') {
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = `opcao`;
        optionInput.disabled = true;
        optionInput.className = 'w-4 h-4 text-brand focus:ring-brand border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700';
        
        const inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.name = `opcao_text_${optionIndex}`;
        inputText.placeholder = `Opção ${optionIndex + 1}`;
        inputText.setAttribute('maxlength', '100');
        inputText.setAttribute('data-testid', 'option-input-text');
        inputText.className = 'flex-grow border-b border-gray-300 dark:border-gray-600 focus:border-brand outline-none py-1 transition-colors hover:border-gray-400 dark:hover:border-gray-500 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600';

        newDiv.appendChild(optionInput);
        newDiv.appendChild(inputText);
        optionContainer.insertBefore(newDiv, event.target);
    } else if (type === 'checkbox') {
        const optionInput = document.createElement('input');
        optionInput.type = 'checkbox';
        optionInput.disabled = true;
        optionInput.className = 'w-4 h-4 text-brand focus:ring-brand border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700';

        newDiv.appendChild(optionInput);
        
        const inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.name = `opcao_text_check_${optionIndex}`;
        inputText.placeholder = `Opção ${optionIndex + 1}`;
        inputText.setAttribute('maxlength', '100');
        inputText.setAttribute('data-testid', 'option-input-text');
        inputText.className = 'flex-grow border-b border-gray-300 dark:border-gray-600 focus:border-brand outline-none py-1 transition-colors hover:border-gray-400 dark:hover:border-gray-500 bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600';

        newDiv.appendChild(inputText);
        optionContainer.insertBefore(newDiv, event.target);
    }
    optionIndex++;

}

function addQuestion() {
    optionIndex = 1;
    const questionDiv = document.createElement('div');
    questionDiv.className = 'bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm border border-gray-200 dark:border-dark-border mb-6 space-y-6 question relative group transition-colors'; // Dark mode classes
    questionDiv.setAttribute('data-testid', 'question-item');

    questionDiv.innerHTML = `
        <!-- Botão de Excluir (Absolute) -->
        <button type="button" onclick="removeQuestion(this)" class="absolute top-4 right-4 text-gray-300 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20" title="Excluir Pergunta" data-testid="delete-question-btn">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>

        <div class="flex flex-col md:flex-row gap-4 items-start justify-between quest-types pr-10">
            <input type="text" class="flex-grow text-lg font-medium border-b-2 border-gray-200 dark:border-gray-700 focus:border-brand outline-none py-2 transition-colors bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 question-text" maxlength="200" name="quest" placeholder="Digite sua pergunta" required data-testid="question-text-input">
            
            <div class="relative min-w-[200px]">
                <select name="type" class="block w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand question_type" required data-testid="question-type-select">
                    <option value="short_answer">Resposta Curta</option>
                    <option value="long_answer">Resposta Longa</option>
                    <option value="multiple_choice">Múltipla Escolha</option>
                    <option value="checkbox">Caixa de Seleção</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </div>

        <div class="options pl-2">
            <input class="w-full border-b border-dotted border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-500 py-2 bg-transparent inputs" type="text" maxlength="200" name="opcao" value="Texto de resposta curta" disabled>
        </div>
    `;

    questionContainer.appendChild(questionDiv);
}