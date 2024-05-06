const { AddContatoHandler, RemoveContatoHandler, ListarContatosHandler, BuscarContatoHandler } = require('./GerenciaContatos');
const Gerenciador = require('./Contato');
const readline = require('readline');

class UserInterface {
    constructor() {
        this.gerenciador = new Gerenciador();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.handlers = {
            '1': new AddContatoHandler(this.gerenciador, this.rl),
            '2': new RemoveContatoHandler(this.gerenciador, this.rl),
            '3': new ListarContatosHandler(this.gerenciador, this.rl),
            '4': new BuscarContatoHandler(this.gerenciador, this.rl)
        };
    }

    start() {
        console.log('\t___________________________________________________\n\n\tBem-vindo ao sistema de gerenciamento de contatos!\n\t___________________________________________________');
        this.exibirMenu();
    }

    exibirMenu() {
        console.log('\n======= Menu =======');
        console.log('1. Adicionar contato');
        console.log('2. Remover contato');
        console.log('3. Listar contatos');
        console.log('4. Buscar contato por nome');
        console.log('5. Sair');
        this.menu();
    }

    menu() {
        this.rl.question('Escolha uma opção: ', opcao => {
            if (opcao == 5) {
                console.log('Saindo...');
                this.rl.close(); return;
            }

            const handler = this.handlers[opcao];
            if (handler) {
                handler.handle(() => {
                    this.exibirMenu();
                });
            } else {
                console.log('Opção inválida. Tente novamente.');
                this.exibirMenu();
            }
        });
    }
}

new UserInterface().start();
