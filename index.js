const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function iniciarSorteio() {
    const input = document.getElementById('listaNomes');
    const status = document.getElementById('statusSorteio');
    const btn = document.getElementById('btnSortear');
    const listaCT = document.getElementById('listaCT');
    const listaTR = document.getElementById('listaTR');

    let nomes = input.value.split('\n').filter(n => n.trim() !== "");

    if (nomes.length < 2) {
        alert("Insira pelo menos 2 nomes para realizar o draft.");
        return;
    }

    // Reset de interface
    listaCT.innerHTML = "";
    listaTR.innerHTML = "";
    btn.disabled = true;
    
    // Embaralhar (Fisher-Yates)
    for (let i = nomes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nomes[i], nomes[j]] = [nomes[j], nomes[i]];
    }

    status.innerText = "Sorteando equipes...";

    // Distribuição animada
    for (let i = 0; i < nomes.length; i++) {
        await sleep(900); // Velocidade do sorteio (quase 1 segundo)
        
        const nomeAtual = nomes[i];
        const li = document.createElement('li');
        li.innerText = (i + 1) + ". " + nomeAtual;
        li.style.animation = "entradaNome 0.6s forwards";

        // Alterna entre times para manter equilíbrio numérico
        if (i % 2 === 0) {
            listaCT.appendChild(li);
        } else {
            listaTR.appendChild(li);
        }
    }

    status.innerText = "Draft Concluído!";
    btn.disabled = false;
}