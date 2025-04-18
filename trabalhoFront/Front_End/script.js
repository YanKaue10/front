document.addEventListener("DOMContentLoaded", () => {
    const softwareForm = document.getElementById("software-form");
    const solicitacaoForm = document.getElementById("solicitacao-form");
    const professorForm = document.getElementById("professor-form");
    const softwareSelect = document.getElementById("software");

    const softwares = JSON.parse(localStorage.getItem("softwares")) || [];
    const professores = JSON.parse(localStorage.getItem("professores")) || [];

    if (softwareSelect) {
        softwareSelect.innerHTML = softwares.map(s => `<option value="${s.nome}">${s.nome}</option>`).join("");
    }

    if (softwareForm) {
        softwareForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("nome").value;
            const link = document.getElementById("link").value;
            const versao = document.getElementById("versao").value;
            const tipo = document.getElementById("tipo").value;

            softwares.push({ nome, link, versao, tipo });
            localStorage.setItem("softwares", JSON.stringify(softwares));

            document.getElementById("mensagem").innerText = "Software cadastrado com sucesso!";
            softwareForm.reset();
        });
    }

    if (solicitacaoForm) {
        solicitacaoForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const software = document.getElementById("software").value;
            const laboratorio = document.getElementById("laboratorio").value;
            const data = document.getElementById("data").value;

            console.log("Solicitação registrada:", { software, laboratorio, data });
            document.getElementById("mensagem-solicitacao").innerText = "Solicitação registrada com sucesso!";
            solicitacaoForm.reset();
        });
    }

    if (professorForm) {
        professorForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("nome-prof").value.trim();
            const escola = document.getElementById("escola").value.trim();
            const mensagem = document.getElementById("mensagem-professor");

            if (!nome || !escola) {
                mensagem.innerText = "Preencha todos os campos.";
                mensagem.style.color = "red";
                return;
            }

            professores.push({ nome, escola });
            localStorage.setItem("professores", JSON.stringify(professores));

            mensagem.innerText = "Professor cadastrado com sucesso!";
    
            professorForm.reset();
        });
    }
});
