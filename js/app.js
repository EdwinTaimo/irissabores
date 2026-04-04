import { db, ref, onValue, push, set } from './firebase-config.js';

const productGrid = document.getElementById('product-grid');

// Carregar Produtos em Tempo Real do Firebase
onValue(ref(db, 'produtos'), (snapshot) => {
    const data = snapshot.val();
    productGrid.innerHTML = "";
    
    for (let id in data) {
        const item = data[id];
        productGrid.innerHTML += `
            <div class="card">
                <h3>${item.nome}</h3>
                <p style="color: #86868b">${item.descricao}</p>
                <div style="display: flex; justify-content: space-between; align-items: center">
                    <b>${item.preco} MT</b>
                    <button class="btn-add" onclick="adicionarAoCarrinho('${id}')">Adicionar</button>
                </div>
            </div>
        `;
    }
});

window.adicionarAoCarrinho = (id) => {
    console.log("Adicionado: " + id);
    // Lógica do carrinho aqui
};
