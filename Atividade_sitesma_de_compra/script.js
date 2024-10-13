// Produtos disponíveis
const produtos = [
    { nome: "Camiseta", preco: 50.00, quantidade: 10 },
    { nome: "Calça", preco: 120.00, quantidade: 5 },
    { nome: "Tênis", preco: 200.00, quantidade: 8 },
    { nome: "Boné", preco: 30.00, quantidade: 20 },
    { nome: "Jaqueta", preco: 250.00, quantidade: 3 }
];

// Carrinho de compras
let carrinho = [];

// Função para exibir o estoque inicial
function exibirEstoque() {
    const estoqueDiv = document.getElementById("estoque");
    estoqueDiv.innerHTML = '';
    produtos.forEach(produto => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <span>${produto.nome} - R$ ${produto.preco.toFixed(2)} (Estoque: ${produto.quantidade})</span>
            <button onclick="adicionarAoCarrinho('${produto.nome}')">Adicionar ao Carrinho</button>
        `;
        estoqueDiv.appendChild(div);
    });
}

// Função para buscar produto por nome
function buscarProduto() {
    const nomeProduto = document.getElementById("search").value.toLowerCase();
    const resultado = produtos.find(produto => produto.nome.toLowerCase() === nomeProduto);
    
    const searchResultDiv = document.getElementById("search-result");
    if (resultado) {
        searchResultDiv.innerHTML = `
            <p>Produto encontrado: ${resultado.nome} - R$ ${resultado.preco.toFixed(2)} (Estoque: ${resultado.quantidade})</p>
        `;
    } else {
        searchResultDiv.innerHTML = "<p>Produto não encontrado.</p>";
    }
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(nomeProduto) {
    const produto = produtos.find(produto => produto.nome === nomeProduto);

    if (produto && produto.quantidade > 0) {
        carrinho.push(produto);
        produto.quantidade--;

        exibirCarrinho();
        exibirEstoque();
    } else {
        alert("Produto fora de estoque!");
    }
}

// Função para remover produto do carrinho
function removerDoCarrinho(indice) {
    const produto = carrinho[indice];
    produto.quantidade++; 
    carrinho.splice(indice, 1); 

    exibirCarrinho();
    exibirEstoque();
}

// Função para exibir o carrinho
function exibirCarrinho() {
    const carrinhoDiv = document.getElementById("carrinho");
    carrinhoDiv.innerHTML = '';

    let total = 0;

    carrinho.forEach((produto, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <span>${produto.nome} - R$ ${produto.preco.toFixed(2)}</span>
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        carrinhoDiv.appendChild(div);
        total += produto.preco;
    });

    document.getElementById("total").innerText = total.toFixed(2);
}

// Função para ordenar o carrinho por preço (ordem crescente)
function ordenarCarrinho() {
    carrinho.sort((a, b) => a.preco - b.preco);
    exibirCarrinho();
}

// Inicializar exibição de estoque
exibirEstoque();
