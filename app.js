let amigos = [];
let sorteio = [];

function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nome = inputAmigo.value.trim();
    if (nome === '') {
        alert("Por favor, digite o nome do amigo!");
        return;
    }
    if (amigos.includes(nome)) {
        alert("Este nome já foi adicionado.");
        return;
    }
    amigos.push(nome);
    renderizarListaAmigos();
    inputAmigo.value = '';
}

function renderizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    for (let i = 0; i < amigos.length; i++) {
        const item = document.createElement('li');
        item.textContent = amigos[i];
        item.addEventListener('click', () => { removerAmigo(i); });
        listaAmigos.appendChild(item);
    }
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    renderizarListaAmigos();
}

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function sortearAmigo() {
    if (amigos.length < 3) {
        alert("Adicione pelo menos 3 amigos para o sorteio.");
        return;
    }
    let sorteados = [...amigos];
    let valido = false;
    while (!valido) {
        embaralhar(sorteados);
        valido = true;
        for (let i = 0; i < amigos.length; i++) {
            if (amigos[i] === sorteados[i]) {
                valido = false;
                break;
            }
        }
    }
    sorteio = [];
    for (let i = 0; i < amigos.length; i++) {
        sorteio.push({ de: amigos[i], para: sorteados[i] });
    }
    prepararRevelacao();
}

function prepararRevelacao() {
    document.getElementById('secao-adicionar').classList.add('hidden');
    document.getElementById('secao-revelar').classList.remove('hidden');
    document.getElementById('botao-reiniciar').classList.remove('hidden');
    document.getElementById('botao-sortear').classList.add('hidden');
    const seletor = document.getElementById('selecao-nomes');
    seletor.innerHTML = '<option value="">-- Selecione seu nome --</option>';
    for (const amigo of amigos) {
        const option = document.createElement('option');
        option.value = amigo;
        option.textContent = amigo;
        seletor.appendChild(option);
    }
}

function mostrarResultado() {
    const seletor = document.getElementById('selecao-nomes');
    const nomeSelecionado = seletor.value;
    const resultadoDiv = document.getElementById('resultado');

    if (!nomeSelecionado) {
        resultadoDiv.innerHTML = `<p class="erro">Selecione seu nome primeiro!</p>`;
        return;
    }

    const par = sorteio.find(p => p.de === nomeSelecionado);
    if (par) {
        resultadoDiv.innerHTML = `<h3>${par.de}, seu amigo secreto é...</h3><p class="amigo-sorteado">${par.para}!</p>`;
    }
}

function esconderResultado() {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p>Pressione e segure "Revelar!" para ver quem você tirou.</p>`;
}

const botaoRevelar = document.getElementById('botao-revelar');

botaoRevelar.addEventListener('mousedown', mostrarResultado);
botaoRevelar.addEventListener('mouseup', esconderResultado);
botaoRevelar.addEventListener('mouseout', esconderResultado);

function reiniciarJogo() {
    amigos = [];
    sorteio = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('amigo').value = '';
    document.getElementById('selecao-nomes').innerHTML = '';
    document.getElementById('secao-adicionar').classList.remove('hidden');
    document.getElementById('secao-revelar').classList.add('hidden');
    document.getElementById('botao-reiniciar').classList.add('hidden');
    document.getElementById('botao-sortear').classList.remove('hidden');
    esconderResultado(); 
}

esconderResultado();