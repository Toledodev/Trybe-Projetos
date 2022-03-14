const apiComputer = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
const localKey = localStorage.getItem('key');

// const total = () => {
//   const cartList = [...document.querySelectorAll('.cart__item')];
//   const amount = document.getElementsByClassName('total-price')[0];
//   let totalValue = cartList.reduce((acc, curr) => {
//     const valueCurr = parseFloat(curr.split(' price: $')[1]);
//     return acc + curr;
//   }, 0);
//   totalValue = totalValue.toFixed(2);
//   amount.innerText = `Preço total: ${totalValue}`;
//   };
  
const setItem = () => {
  localStorage.setItem('key', JSON
  .stringify(document.getElementsByClassName('cart__items')[0].innerHTML));
  // total();
};

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  setItem();
}

const getItem = () => {
  const result = document.querySelector('ol');
  result.innerHTML = JSON.parse(localStorage.getItem('key'));
  result.addEventListener('click', cartItemClickListener);
};
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

  const requestProducts = async (link) => fetch(link)
     .then((response) => response.json())
     .then((search) => search.results.forEach(({ id, title, thumbnail }) => {
      const myObject = {
        sku: id,
        name: title,
        image: thumbnail, 
      };
     const sections = document.getElementsByClassName('items')[0];
     const itemElement = createProductItemElement(myObject);
     sections.appendChild(itemElement);
  }))
  .catch(() => console.error('Endereço não encontrado'));

async function computerId(element) {
  const elementId = getSkuFromProductItem(element);
  const idApiML = `https://api.mercadolibre.com/items/${elementId}`;

  return fetch(idApiML)
    .then((response) => response.json())
    .then(({ id, title, price }) => {
      const myObject = {
        sku: id,
        name: title,
        salePrice: price,
      };
      const ol = document.getElementsByClassName('cart__items')[0];
      ol.appendChild(createCartItemElement(myObject));
      setItem();
    })
    .catch(console.error('Erro ao adicionar ao carrinho'));
}

function addButtons() {
  const allItems = document.querySelectorAll('.item');
  const loading = document.getElementsByClassName('loading')[0];
  allItems.forEach((item) => item.lastChild.addEventListener('click', (() => {
    computerId(item);
  })));
  loading.remove();
}

function requestOrder() {
  requestProducts(apiComputer)
    .then(() => addButtons())
    .then(() => {
      const clearButton = document.getElementsByClassName('empty-cart')[0];
  clearButton.addEventListener('click', () => {
  const olClear = document.querySelector('ol');
  olClear.innerText = '';
});
    })
    .catch(() => console.error('Endereço não encontrado.'));
}

window.onload = () => {
  if (localKey) {
    getItem();
    // total();
  }
 requestOrder();
};
