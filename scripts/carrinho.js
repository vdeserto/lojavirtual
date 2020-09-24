// codigo pronto de outro projeto, integrar com esse depois

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    //Remove produto do carrinho
    var removeItemButton = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeItemButton.length; i++) {
        var button = removeItemButton[i];
        button.addEventListener('click', removeProduto);
    }
}

function adicionaProduto(event){
    var escolhaClicked = event.target;
    var id = escolhaClicked.id;
    var titulo = escolhaClicked.innerText;
    var preco;
    var match = titulo.match(/[\d,]+/);
    if(match)
        preco = match[0];
    adicionaCarrinho(id, titulo, preco);
    updatePreco();
}

function adicionaCarrinho(id, titulo, preco){
    var cartItems = document.getElementsByClassName('carrinho')[0];
    //procurar se ja foi adicionado
    var cartItemsIds = cartItems.getElementsByClassName('produto');
    adicionar = true;
    for (var i = 0; i < cartItemsIds.length && adicionar; i++) {
        if (cartItemsIds[i].id === id) {
            //sdksmd
            console.log("Ja esta no carrinho");
            adicionar = false;
        }
    }
    if (adicionar) {
        var cartRow = document.createElement('li');
        cartRow.classList.add('produto');
        cartRow.id = id;
        preco = addZeros(preco);
        var cartRowContents = `
                        <div class="produto-info">
                            <strong>${titulo}</strong><br>
                            <span>Tamanho: G</span>
                        </div>
                        <div class="produto-preco">
                            <div>R$ ${preco}</div>
                        </div>
                        <button class="btn btn-danger" type="button"> Remover </button>
                        `
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
    }
}

function removeProduto(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatePreco();
}

function updatePreco(){
    var carrinho = document.getElementsByClassName('carrinho')[0];
    var listaProdutos = carrinho.getElementsByClassName('produto');
    var precoTotal = 0;
    var possuiCompras = false;
    for (var i = 0; i < listaProdutos.length; i++) {
        var produto = listaProdutos[i];
        var precoProduto = produto.getElementsByClassName('produto-preco')[0];
        var precoReal = parseFloat(precoProduto.innerText.replace('R$',''));
        precoTotal = precoTotal + precoReal;
        possuiCompras = true;
    }
    precoTotal = Math.round(precoTotal * 100) / 100;
    novoComprar(possuiCompras, precoTotal);
    document.getElementsByClassName('precoTotal')[0].innerText = 'R$ ' + precoTotal;
}

function togglePoint(ele) {
    pontoEscolhido = document.getElementById(ele);
    pontoEscolhido.classList.toggle("show");

    var escolhas = pontoEscolhido.getElementsByClassName("escolhaProduto");
    for (var i = 0; i < escolhas.length; i++) {
        escolhas[i].addEventListener('click', adicionaProduto);
    }
}

function novoComprar(possuiCompras, precoTotal) {
    //
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var targetPoint = event.target.parentNode;
        console.log(targetPoint);
        var dropdowns = targetPoint.getElementsByClassName("dropdown-content");
        console.log(dropdowns);
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function addZeros(input){
    var preco = 0;
    preco += input;
    var outFloat = Number(preco).toFixed(2);
    return outFloat;
}
