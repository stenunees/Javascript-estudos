// Stephanie Nunes - Gerenciador de Tarefas :)
class Tarefa {
    constructor(id, titulo, descricao, prioridade = "normal", concluida = false) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.prioridade = prioridade;
        this.concluida = concluida;
    }

    marcarComoConcluida() {
        this.concluida = true;
    }

    atualizarDetalhes(titulo, descricao, prioridade) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.prioridade = prioridade;
    }
}

class GerenciadorDeTarefas {
    constructor() {
        this.tarefas = [];
        this.idAtual = 1;
    }

    adicionarTarefa(titulo, descricao, prioridade = "normal") {
        const novaTarefa = new Tarefa(this.idAtual, titulo, descricao, prioridade);
        this.tarefas.push(novaTarefa);
        this.idAtual++;
        console.log(`Tarefa "${titulo}" adicionada com sucesso!`);
    }

    removerTarefa(id) {
        const indiceTarefa = this.tarefas.findIndex(tarefa => tarefa.id === id);
        if (indiceTarefa !== -1) {
            console.log(`Tarefa "${this.tarefas[indiceTarefa].titulo}" removida.`);
            this.tarefas.splice(indiceTarefa, 1);
        } else {
            console.log(`Tarefa com ID ${id} não encontrada.`);
        }
    }

    atualizarTarefa(id, titulo, descricao, prioridade) {
        const tarefa = this.tarefas.find(tarefa => tarefa.id === id);
        if (tarefa) {
            tarefa.atualizarDetalhes(titulo, descricao, prioridade);
            console.log(`Tarefa "${titulo}" atualizada.`);
        } else {
            console.log(`Tarefa com ID ${id} não encontrada.`);
        }
    }

    marcarTarefaComoConcluida(id) {
        const tarefa = this.tarefas.find(tarefa => tarefa.id === id);
        if (tarefa) {
            tarefa.marcarComoConcluida();
            console.log(`Tarefa "${tarefa.titulo}" marcada como concluída.`);
        } else {
            console.log(`Tarefa com ID ${id} não encontrada.`);
        }
    }

    listarTarefas(filtro = "todas") {
        let tarefasFiltradas = this.tarefas;

        if (filtro === "concluidas") {
            tarefasFiltradas = this.tarefas.filter(tarefa => tarefa.concluida);
        } else if (filtro === "pendentes") {
            tarefasFiltradas = this.tarefas.filter(tarefa => !tarefa.concluida);
        }

        if (tarefasFiltradas.length === 0) {
            console.log("Nenhuma tarefa encontrada.");
        } else {
            console.log("Lista de Tarefas:");
            tarefasFiltradas.forEach(tarefa => {
                console.log(`ID: ${tarefa.id} | Título: ${tarefa.titulo} | Concluída: ${tarefa.concluida}`);
            });
        }
    }
}

// Simulação de uso do gerenciador de tarefas

const gerenciador = new GerenciadorDeTarefas();

// Adicionando tarefas
gerenciador.adicionarTarefa("Estudar JavaScript", "Concluir o curso avançado de JavaScript", "alta");
gerenciador.adicionarTarefa("Fazer Compras", "Comprar vegetais, frutas e leite", "baixa");
gerenciador.adicionarTarefa("Exercício", "Completar 30 minutos de corrida", "normal");

// Listando todas as tarefas
gerenciador.listarTarefas();

// Marcando uma tarefa como concluída
gerenciador.marcarTarefaComoConcluida(1);

// Atualizando uma tarefa
gerenciador.atualizarTarefa(2, "Fazer Compras", "Comprar vegetais, frutas, leite e pão", "média");

// Listando tarefas pendentes
gerenciador.listarTarefas("pendentes");

// Removendo uma tarefa
gerenciador.removerTarefa(3);

// Listando todas as tarefas novamente
gerenciador.listarTarefas();
