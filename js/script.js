import isCPF from "./valida-cpf.js";
import isMaiorIdade from "./valida-idade.js";

const camposFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value
    }
    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
    window.location.href = './abrir-conta-form-2.html';
});

camposFormulario.forEach((elementCampo) => {
    elementCampo.addEventListener("blur", () => verificaCampo(elementCampo));
    elementCampo.addEventListener("invalid", event => event.preventDefault());
});

const erros = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'A data de nascimento não pode estar vazia.',
        customError: 'Você deve ter mais que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(paramCampo){
    let mensagem = '';
    paramCampo.setCustomValidity('');

    if(paramCampo.name == "cpf" && paramCampo.value.length >= 11){
        isCPF(paramCampo);
    }
    if(paramCampo.name == "aniversario" && paramCampo.value != ""){
        isMaiorIdade(paramCampo);
    }

    erros.forEach(paramErro => {
        if(paramCampo.validity[paramErro]){
            mensagem = mensagens[paramCampo.name][paramErro];
        }
    });

    const mensagemErro = paramCampo.parentNode.querySelector('.mensagem-erro');
    const validaInput = paramCampo.checkValidity();

    if(!validaInput){
        mensagemErro.textContent = mensagem;
    }else{
        mensagemErro.textContent = '';
    }
}
