const readline = require('readline');
const GerenciadorContatos = require('./GerenciaContatos');

class CLI {
    
    constructor() {
        this.gerenciador = new GerenciadorContatos();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    iniciar() {
        console.log('\t___________________________________________________\n\n\tBem-vindo ao sistema de gerenciamento de contatos!\n\t___________________________________________________');
        this.FuncoesDefault()
    }

    exibirMenu() {
        console.log('\n======= Menu =======');
        console.log('1. Adicionar contato');
        console.log('2. Remover contato');
        console.log('3. Listar contatos');
        console.log('4. Buscar contato por nome');
        console.log('5. Sair');
    }

    menu() {
        this.rl.question('Escolha uma opção: ', opcao => {
            switch (opcao) {
                case '1':
                    this.adicionarContato(); break;
                case '2':
                    this.removerContato(); break;
                case '3':
                    this.listarContatos(); break;
                case '4':
                    this.buscarContato(); break;
                case '5':
                    console.log('Saindo...');
                    this.rl.close(); break;
                default:
                    console.log('Opção inválida. Tente novamente.');
                    this.FuncoesDefault(); break;
            }
        });
    }

    adicionarContato() {
        this.rl.question('\nDigite o nome: ', nome => {
            this.rl.question('Digite o telefone: ', telefone => {
                this.rl.question('Digite o email: ', email => {
                    this.gerenciador.adicionarContato({ nome, telefone, email });
                    console.log('\n\t-------------------------------\n\tContato adicionado com sucesso!\n\t-------------------------------');
                    this.FuncoesDefault();
                });
            });
        });
    }
    
    removerContato() {
        this.rl.question('\nDigite o nome do contato a ser removido: ', nome => {
            this.gerenciador.removerContato(nome);
            console.log('\n\t-----------------------------\n\tContato removido com sucesso!\n\t-----------------------------');
            this.FuncoesDefault();
        });
    }
    
    listarContatos() {
        console.log('\nLista de contatos:');
        this.gerenciador.listarContatos().forEach(contato => {
            console.log(`\tNome: ${contato.nome}, Telefone: ${contato.telefone}, Email: ${contato.email}`);
        });
        this.FuncoesDefault();
    }
    
    buscarContato() {
        this.rl.question('\nDigite o nome do contato a ser buscado: ', nome => {
            const contatosEncontrados = this.gerenciador.listarContatos().filter(contato => contato.nome.toLowerCase() === nome.toLowerCase());
            if (contatosEncontrados.length === 0) {
                console.log('\n\t----------------------------------------\n\tNenhum contato encontrado com esse nome.\n\t----------------------------------------');
            } else {
                console.log('\nContatos encontrados:');
                contatosEncontrados.forEach(contato => {
                    console.log(`\tNome: ${contato.nome}, Telefone: ${contato.telefone}, Email: ${contato.email}`);
                });
            }
            this.FuncoesDefault();
        });
    }

    FuncoesDefault () {
        this.exibirMenu();
        this.menu();
    }
}

module.exports = CLI;