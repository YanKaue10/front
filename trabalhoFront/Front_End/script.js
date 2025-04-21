document.addEventListener("DOMContentLoaded", () => {
    const softwareForm = document.getElementById("software-form");
    const solicitacaoForm = document.getElementById("solicitacao-form");
    const professorForm = document.getElementById("professor-form");
    const softwareSelect = document.getElementById("software");

    const softwares = JSON.parse(localStorage.getItem("softwares")) || [];
    let professores = JSON.parse(localStorage.getItem("professores")) || [];
    let editIndex = -1;

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

            if (editIndex === -1) {
                professores.push({ nome, escola });
                mensagem.innerText = "Professor cadastrado com sucesso!";
            } else {
                professores[editIndex] = { nome, escola };
                mensagem.innerText = "Professor atualizado com sucesso!";
                editIndex = -1;
            }

            localStorage.setItem("professores", JSON.stringify(professores));
            professorForm.reset();
            atualizarSelectProfessores();
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        const softwares = JSON.parse(localStorage.getItem("softwares")) || [];
        const tabela = document.getElementById("tabela-softwares");
        const dataCadastro = new Date().toLocaleDateString();
        softwares.push({ nome, link, versao, tipo, dataCadastro });

        if (tabela) {
            const tbody = tabela.querySelector("tbody");

            if (softwares.length === 0) {
                const row = document.createElement("tr");
                row.innerHTML = `<td colspan="5">Nenhum software cadastrado.</td>`;
                tbody.appendChild(row);
            } else {
                softwares.forEach(software => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${software.nome}</td>
                        <td><a href="${software.link}" target="_blank">${software.link}</a></td>
                        <td>${software.versao}</td>
                        <td>${software.tipo}</td>
                        <td>${software.dataCadastro || "-"}</td>
                    `;
                    tbody.appendChild(row);
                });
            }
        }
    });


    const selectProfessores = document.getElementById("select-professores");
    const btnEditar = document.getElementById("btn-editar");
    const btnDeletar = document.getElementById("btn-deletar");

    function atualizarSelectProfessores() {
        if (!selectProfessores) return;

        selectProfessores.innerHTML = "";
        professores.forEach((prof, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.text = `${prof.nome} - ${prof.escola}`;
            selectProfessores.appendChild(option);
        });
    }

    if (professorForm) {
        atualizarSelectProfessores();
    }

    if (btnEditar) {
        btnEditar.addEventListener("click", () => {
            const selectedIndex = selectProfessores.value;
            if (selectedIndex === "") return alert("Selecione um professor para editar.");

            const prof = professores[selectedIndex];
            document.getElementById("nome-prof").value = prof.nome;
            document.getElementById("escola").value = prof.escola;
            editIndex = selectedIndex;
        });
    }

    if (btnDeletar) {
        btnDeletar.addEventListener("click", () => {
            const selectedIndex = selectProfessores.value;
            if (selectedIndex === "") return alert("Selecione um professor para deletar.");

            if (confirm("Deseja realmente deletar este professor?")) {
                professores.splice(selectedIndex, 1);
                localStorage.setItem("professores", JSON.stringify(professores));
                atualizarSelectProfessores();
            }
        });
    }
});
