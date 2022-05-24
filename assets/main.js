'use strict';

/* <<<<<<<<<< Limpa  Formulário >>>>>>>>>*/
const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = ""; 
    document.getElementById('estado').value = "" ;
}

/* <<<<<<<<<< Preenchendo o formulário >>>>>>>>>*/
const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);
/* <<<<<<<<<< Evento focusout >>>>>>>>>  async/await */ 

const pesquisarCep = async() => {
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        // usando a ferramenta fetch API
        const dados = await fetch(url); // recebendo o resultado do fetch
        const endereco = await dados.json();// pegando os dados e aplicando essa function json()

        // TRATANDO CEP NÃO ENCONTRADO
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = "CEP não encontrado";
        } else {
            preencherFormulario(endereco);// Vou mandar pro método que vai preencher o form
        }
    } else {
        document.getElementById('endereco').value = "CEP incorreto!";
    }
} 

document.getElementById('cep')
            .addEventListener('focusout' ,pesquisarCep);
