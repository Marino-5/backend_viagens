const API_URL = "http://localhost:3000/pacotes"; // URL do backend

document.addEventListener("DOMContentLoaded", carregarPacotes);

// Função para buscar pacotes e exibir na tabela
async function carregarPacotes() {
    try {
        const response = await fetch(API_URL);
        const pacotes = await response.json();

        const tabela = document.getElementById("tabela-pacotes");
        tabela.innerHTML = ""; // Limpa a tabela antes de adicionar os novos dados
        
        pacotes.forEach((pacote) => {
            const row = tabela.insertRow();
            row.innerHTML = `
                <td>${pacote.id}</td>
                <td>${pacote.nome}</td>
                <td>${pacote.destino}</td>
                <td>${new Date(pacote.data_inicio).toLocaleDateString()}</td>
                <td>${new Date(pacote.data_fim).toLocaleDateString()}</td>
                <td>R$ ${pacote.preco.toFixed(2)}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarPacote(${pacote.id})">✏️ Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="excluirPacote(${pacote.id})">🗑️ Excluir</button>
                </td>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar pacotes:", error);
    }
}

// Função para cadastrar um novo pacote
async function cadastrarPacote(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const destino = document.getElementById("destino").value.trim();
    const data_inicio = document.getElementById("data_inicio").value;
    const data_fim = document.getElementById("data_fim").value;
    const preco = parseFloat(document.getElementById("preco").value);

    if (!nome || !destino || !data_inicio || !data_fim || isNaN(preco)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const pacote = { nome, destino, data_inicio, data_fim, preco };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pacote),
        });

        if (response.ok) {
            alert("Pacote cadastrado com sucesso!");
            document.getElementById("form-pacote").reset();
            carregarPacotes();
        } else {
            alert("Erro ao cadastrar pacote.");
        }
    } catch (error) {
        console.error("Erro ao cadastrar:", error);
    }
}

// Função para excluir um pacote
async function excluirPacote(id) {
    if (confirm("Tem certeza que deseja excluir este pacote?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

            if (response.ok) {
                alert("Pacote excluído!");
                carregarPacotes();
            } else {
                alert("Erro ao excluir.");
            }
        } catch (error) {
            console.error("Erro ao excluir:", error);
        }
    }
}

// Função para preencher o formulário para edição
async function editarPacote(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const pacote = await response.json();

        document.getElementById("nome").value = pacote.nome;
        document.getElementById("destino").value = pacote.destino;
        document.getElementById("data_inicio").value = pacote.data_inicio;
        document.getElementById("data_fim").value = pacote.data_fim;
        document.getElementById("preco").value = pacote.preco;
        
        document.getElementById("salvar").onclick = function () {
            atualizarPacote(id);
        };
    } catch (error) {
        console.error("Erro ao buscar pacote:", error);
    }
}

// Função para atualizar um pacote existente
async function atualizarPacote(id) {
    const nome = document.getElementById("nome").value.trim();
    const destino = document.getElementById("destino").value.trim();
    const data_inicio = document.getElementById("data_inicio").value;
    const data_fim = document.getElementById("data_fim").value;
    const preco = parseFloat(document.getElementById("preco").value);

    if (!nome || !destino || !data_inicio || !data_fim || isNaN(preco)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const pacote = { nome, destino, data_inicio, data_fim, preco };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pacote),
        });

        if (response.ok) {
            alert("Pacote atualizado!");
            carregarPacotes();
        } else {
            alert("Erro ao atualizar.");
        }
    } catch (error) {
        console.error("Erro ao atualizar:", error);
    }
}

// Associar o formulário ao evento de cadastro
document.getElementById("form-pacote").addEventListener("submit", cadastrarPacote);
