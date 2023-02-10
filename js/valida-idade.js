export default function isMaiorIdade(paramCampo){
    const dataNascimento = new Date(paramCampo.value);

    if(!validaIdade(dataNascimento)){
        paramCampo.setCustomValidity('O usuário não é maior de idade.');
    }
}

function validaIdade(paramData){
    const dataAtual = new Date();
    const dataMais18 = new Date(paramData.getUTCFullYear() + 18, paramData.getUTCMonth(), paramData.getUTCDate());

    return dataAtual >= dataMais18;
}
