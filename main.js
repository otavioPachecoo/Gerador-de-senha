const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

botoes[0].onclick = diminuirTamanho;
botoes[1].onclick = aumentarTamanho;

function diminuirTamanho() {
    if (tamanhoSenha > 1)
        tamanhoSenha--;

    numeroSenha.textContent = tamanhoSenha;
    gerarSenha();
}

function aumentarTamanho() {
    if (tamanhoSenha < 20)
        tamanhoSenha++;

    numeroSenha.textContent = tamanhoSenha;
    gerarSenha();
}

for (i = 0; i < checkbox.length; i++)
    checkbox[i].onclick = gerarSenha;

gerarSenha();

function gerarSenha() {
    let alfabeto = '';
    let senha = '';

    if (checkbox[0].checked)
        alfabeto = alfabeto + letrasMaiusculas;

    if (checkbox[1].checked)
        alfabeto = alfabeto + letrasMinusculas;

    if (checkbox[2].checked)
        alfabeto = alfabeto + numeros;

    if (checkbox[3].checked)
        alfabeto = alfabeto + simbolos;

    if (!checkbox[0].checked && !checkbox[1].checked && !checkbox[2].checked && !checkbox[3].checked) {
        campoSenha.value = "";
        classificarSenha(0);
        return;
    }

    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }

    campoSenha.value = senha;
    classificarSenha(alfabeto.length);
}

function classificarSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    forcaSenha.classList.remove('fraca', 'media', 'forte');

    if (entropia > 57)
        forcaSenha.classList.add('forte');
    else if (entropia > 35 && entropia < 57)
        forcaSenha.classList.add('media');
    else if (entropia <= 35)
        forcaSenha.classList.add('fraca');

    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = 2 ** Math.floor(entropia) / (100e6 * 60 * 60 * 24);
}