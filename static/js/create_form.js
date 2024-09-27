const questionContainer = document.getElementById('questions');

optionIndex = 1;

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
            newInput.classList.add('inputs');
            newInput.setAttribute('maxlength', '200');
            optionContainer.appendChild(newInput);

            // resposta longa
        } else {
            const newTextarea = document.createElement('textarea');
            newTextarea.disabled = true;
            newTextarea.required = true;
            newTextarea.name = 'opcao';
            newTextarea.value = 'Texto de resposta longa';
            newTextarea.classList.add('inputs');
            optionContainer.appendChild(newTextarea);
        }
    }
});

function addMultipleChoiceOption(container) {
    const divRadio = document.createElement('div');
    divRadio.classList.add('div-options');

    // input radio
    const newInputRadio = document.createElement('input');
    newInputRadio.type = 'radio';
    newInputRadio.disabled = true;
    newInputRadio.name = 'opcao';
    divRadio.appendChild(newInputRadio);

    // input texto
    const newInputText = document.createElement('input');
    newInputText.type = 'text';
    newInputText.name = `opcao_text_0`;

    divRadio.appendChild(newInputText);

    container.appendChild(divRadio);

    const newButton = document.createElement('button');
    newButton.textContent = '+';
    newButton.type = 'button';
    newButton.classList.add('btn-plus');
    newButton.onclick = (event) => addOption(event);
    container.appendChild(newButton);
}

function addCheckboxOption(container) {
    const divCheckbox = document.createElement('div');
    divCheckbox.classList.add('div-options');

    const newInputCheckbox = document.createElement('input');
    newInputCheckbox.type = 'checkbox';
    newInputCheckbox.disabled = true;
    divCheckbox.appendChild(newInputCheckbox);

    const newInputText = document.createElement('input');
    newInputText.type = 'text';
    newInputText.name = `opcao_text_check_0`;
    divCheckbox.appendChild(newInputText);

    container.appendChild(divCheckbox);

    const newButton = document.createElement('button');
    newButton.textContent = '+';
    newButton.type = 'button';
    newButton.classList.add('btn-plus');
    newButton.onclick = (event) => addOption(event);
    container.appendChild(newButton);
}

function addOption(event) {
    const questionDiv = event.target.closest('.question');
    const optionContainer = questionDiv.querySelector('.options');

    const newDiv = document.createElement('div');
    newDiv.classList.add('div-options');

    const type = questionDiv.querySelector('.question_type').value;

    if (type === 'multiple_choice') {
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = `opcao`;
        optionInput.disabled = true;
        //input de texto com incremento
        const inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.name = `opcao_text_${optionIndex}`;
        newDiv.appendChild(optionInput);
        newDiv.appendChild(inputText);
        optionContainer.insertBefore(newDiv, event.target);
    } else if (type === 'checkbox') {
        const optionInput = document.createElement('input');
        optionInput.type = 'checkbox';
        optionInput.disabled = true;
        newDiv.appendChild(optionInput);
        //input de texto com incremento
        const inputText = document.createElement('input');
        inputText.type = 'text';
        inputText.name = `opcao_text_check_${optionIndex}`;
        newDiv.appendChild(inputText);
        optionContainer.insertBefore(newDiv, event.target);
    }
    optionIndex++;

}

function addQuestion() {
    optionIndex = 1;
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    questionDiv.innerHTML = `

        <div class="quest-types">
            <input type="text" class="question-text" name="quest" placeholder="Pergunta" required>
            <select name="type" class="question_type" required>
                <option value="short_answer">Resposta Curta</option>
                <option value="long_answer">Resposta Longa</option>
                <option value="multiple_choice">Múltipla Escolha</option>
                <option value="checkbox">Caixa de Seleção</option>
            </select>
        </div>

        <div class="options">
            <input class="inputs" type="text" maxlength="200" name="opcao" value="Texto de resposta curta" disabled>
        </div>
    `;

    questionContainer.appendChild(questionDiv);
}
