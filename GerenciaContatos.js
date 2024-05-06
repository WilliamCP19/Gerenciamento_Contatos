class MenuHandler {
    handle(callback) {
        throw new Error('Método handle() não implementado.');
    }
}

class AddContatoHandler extends MenuHandler {
    constructor(gerenciador, rl) {
        super();
        this.gerenciador = gerenciador;
        this.rl = rl;
    }

    handle(callback) {
        this.rl.question('\nDigite o nome: ', nome => {
            this.rl.question('Digite o telefone: ', telefone => {
                this.rl.question('Digite o email: ', email => {
                    this.gerenciador.adicionarContato({ nome, telefone, email });
                    console.log('\n\t-------------------------------\n\tContato adicionado com sucesso!\n\t-------------------------------'); callback();
                });
            });
        })
    }
}

class RemoveContatoHandler extends MenuHandler {
    constructor(gerenciador, rl) {
        super();
        this.gerenciador = gerenciador;
        this.rl = rl;
    }

    handle(callback) {
        this.rl.question('\nDigite o nome do contato a ser removido: ', nome => {
            this.gerenciador.removerContato(nome);
            console.log('\n\t-----------------------------\n\tContato removido com sucesso!\n\t-----------------------------'); callback();
        });
    }
}

class ListarContatosHandler extends MenuHandler {
    constructor(gerenciador, rl) {
        super();
        this.gerenciador = gerenciador;
        this.rl = rl;
    }

    handle(callback) {
        console.log('\nLista de contatos:');
        this.gerenciador.listarContatos().forEach(contato => {
            console.log(`\tNome: ${contato.nome}, Telefone: ${contato.telefone}, Email: ${contato.email}`);
        }); callback();
    }
}

class BuscarContatoHandler extends MenuHandler {
    constructor(gerenciador, rl) {
        super();
        this.gerenciador = gerenciador;
        this.rl = rl;
    }

    handle(callback) {
        this.rl.question('\nDigite o nome do contato a ser buscado: ', nome => {
        const contatosEncontrados = this.gerenciador.listarContatos().filter(contato => contato.nome.toLowerCase() === nome.toLowerCase());
            if (contatosEncontrados.length === 0) {
                console.log('\n\t----------------------------------------\n\tNenhum contato encontrado com esse nome.\n\t----------------------------------------'); callback();
            } else {
                console.log('\nContatos encontrados:');
                contatosEncontrados.forEach(contato => {
                    console.log(`\tNome: ${contato.nome}, Telefone: ${contato.telefone}, Email: ${contato.email}`); callback();
                });
            }
        });
    }
}

module.exports = { AddContatoHandler, RemoveContatoHandler, ListarContatosHandler, BuscarContatoHandler };