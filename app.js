// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do Número Secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = [];

let numeroMaximo = 50;

let numeroSecreto = gerarNumeroAleatorio();

let numeroTentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {

    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}`);

}

exibirMensagemInicial();


function verificarChute() {

    let chute = document.querySelector('input').value;

 
        if (chute == numeroSecreto) {
          exibirTextoNaTela('h1', 'Acertou!');
          let palavraTentativa = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
          let mensagemTentativa = `Você descobriu o número secreto com ${numeroTentativas} ${palavraTentativa}!`;
          exibirTextoNaTela('p', mensagemTentativa);
          document.getElementById('reiniciar').removeAttribute('disabled');
          document.getElementById('chutar').setAttribute('disabled', true);
             } else {
                    if (chute > numeroSecreto) {
                         exibirTextoNaTela('h1', 'Errou!');
                         exibirTextoNaTela('p', 'Número secreto é menor! Tente novamente.');
                               } else {
                                     exibirTextoNaTela('h1', 'Errou!');
                                     exibirTextoNaTela('p', 'Número secreto é maior! Tente novamente.');
                                     }
                        numeroTentativas++; 
                        limparCampo();
                     }

    }


function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1 );
    let quantidadeDeElementosNalista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNalista == numeroMaximo) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    numeroTentativas = 1;
    exibirMensagemInicial();
    console.log(numeroSecreto);
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
}


