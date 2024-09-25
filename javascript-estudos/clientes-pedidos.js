// Gerenciador de pedidos de Clientes - Stephanie Nunes

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Pedido {
    constructor(id, nomeProduto, quantidade, preco) {
        this.id = id;
        this.nomeProduto = nomeProduto;
        this.quantidade = quantidade;
        this.preco = preco;
    }

    getValorTotal() {
        return this.quantidade * this.preco;
    }
}

class Cliente {
    constructor(nome) {
        this.nome = nome;
        this.pedidos = [];
        this.idPedidoAtual = 1;
    }

    adicionarPedido(nomeProduto, quantidade, preco) {
        const novoPedido = new Pedido(this.idPedidoAtual, nomeProduto, quantidade, preco);
        this.pedidos.push(novoPedido);
        this.idPedidoAtual++;
        console.log(`Pedido de "${nomeProduto}" adicionado com sucesso aos pedidos de ${this.nome}.`);
    }

    removerPedido(idPedido) {
        const indicePedido = this.pedidos.findIndex(pedido => pedido.id === idPedido);
        if (indicePedido !== -1) {
            console.log(`Pedido "${this.pedidos[indicePedido].nomeProduto}" removido dos pedidos de ${this.nome}.`);
            this.pedidos.splice(indicePedido, 1);
        } else {
            console.log(`Pedido com ID ${idPedido} não encontrado para ${this.nome}.`);
        }
    }

    getValorTotalPedidos() {
        return this.pedidos.reduce((total, pedido) => total + pedido.getValorTotal(), 0);
    }

    listarPedidos() {
        if (this.pedidos.length === 0) {
            console.log(`${this.nome} não tem pedidos.`);
        } else {
            console.log(`Pedidos de ${this.nome}:`);
            this.pedidos.forEach(pedido => {
                console.log(`ID: ${pedido.id} | Produto: ${pedido.nomeProduto} | Quantidade: ${pedido.quantidade} | Preço: R$${pedido.preco} | Total: R$${pedido.getValorTotal()}`);
            });
            console.log(`Valor total dos pedidos: R$${this.getValorTotalPedidos()}`);
        }
    }
}

class GerenciadorDePedidos {
    constructor() {
        this.clientes = [];
    }

    adicionarCliente(nome) {
        const novoCliente = new Cliente(nome);
        this.clientes.push(novoCliente);
        console.log(`Cliente "${nome}" adicionado.`);
    }

    encontrarCliente(nome) {
        return this.clientes.find(cliente => cliente.nome.toLowerCase() === nome.toLowerCase());
    }

    removerCliente(nome) {
        const indiceCliente = this.clientes.findIndex(cliente => cliente.nome.toLowerCase() === nome.toLowerCase());
        if (indiceCliente !== -1) {
            console.log(`Cliente "${this.clientes[indiceCliente].nome}" removido.`);
            this.clientes.splice(indiceCliente, 1);
        } else {
            console.log(`Cliente "${nome}" não encontrado.`);
        }
    }

    listarClientes() {
        if (this.clientes.length === 0) {
            console.log("Nenhum cliente encontrado.");
        } else {
            console.log("Lista de Clientes:");
            this.clientes.forEach(cliente => console.log(`- ${cliente.nome}`));
        }
    }
}

// Função para exibir o menu e processar as entradas do usuário
const gerenciadorDePedidos = new GerenciadorDePedidos();

const mostrarMenu = () => {
    console.log(`
    ==== Gerenciador de Pedidos ====
    1. Adicionar Cliente
    2. Adicionar Pedido ao Cliente
    3. Listar Pedidos de um Cliente
    4. Remover Pedido de um Cliente
    5. Listar Todos os Clientes
    6. Remover Cliente
    7. Sair
    `);

    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                rl.question('Digite o nome do cliente: ', (nome) => {
                    gerenciadorDePedidos.adicionarCliente(nome);
                    mostrarMenu();
                });
                break;
            case '2':
                rl.question('Digite o nome do cliente: ', (nome) => {
                    const cliente = gerenciadorDePedidos.encontrarCliente(nome);
                    if (cliente) {
                        rl.question('Digite o nome do produto: ', (nomeProduto) => {
                            rl.question('Digite a quantidade: ', (quantidade) => {
                                rl.question('Digite o preço por unidade: ', (preco) => {
                                    cliente.adicionarPedido(nomeProduto, parseInt(quantidade), parseFloat(preco));
                                    mostrarMenu();
                                });
                            });
                        });
                    } else {
                        console.log(`Cliente "${nome}" não encontrado.`);
                        mostrarMenu();
                    }
                });
                break;
            case '3':
                rl.question('Digite o nome do cliente: ', (nome) => {
                    const cliente = gerenciadorDePedidos.encontrarCliente(nome);
                    if (cliente) {
                        cliente.listarPedidos();
                    } else {
                        console.log(`Cliente "${nome}" não encontrado.`);
                    }
                    mostrarMenu();
                });
                break;
            case '4':
                rl.question('Digite o nome do cliente: ', (nome) => {
                    const cliente = gerenciadorDePedidos.encontrarCliente(nome);
                    if (cliente) {
                        rl.question('Digite o ID do pedido para remover: ', (idPedido) => {
                            cliente.removerPedido(parseInt(idPedido));
                            mostrarMenu();
                        });
                    } else {
                        console.log(`Cliente "${nome}" não encontrado.`);
                        mostrarMenu();
                    }
                });
                break;
            case '5':
                gerenciadorDePedidos.listarClientes();
                mostrarMenu();
                break;
            case '6':
                rl.question('Digite o nome do cliente para remover: ', (nome) => {
                    gerenciadorDePedidos.removerCliente(nome);
                    mostrarMenu();
                });
                break;
            case '7':
                console.log('Saindo do Gerenciador de Pedidos...');
                rl.close();
                break;
            default:
                console.log('Opção inválida, por favor escolha novamente.');
                mostrarMenu();
                break;
        }
    });
};


mostrarMenu();


