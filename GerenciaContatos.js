// Interface para os adaptadores de adição e remoção de contatos
class ContatoAdapter {
    adicionarContato(contato) {}
    removerContato(nome) {}
}

// Implementação padrão do adaptador
class GerenciadorContatosAdapter extends ContatoAdapter {
    constructor() {
        super();
        this.contatos = [];
    }

    adicionarContato(contato) {
        this.contatos.push(contato);
    }

    removerContato(nome) {
        this.contatos = this.contatos.filter(contato => contato.nome.toLowerCase() !== nome.toLowerCase());
    }

    listarContatos() {
        return this.contatos;
    }
}

module.exports = GerenciadorContatosAdapter;