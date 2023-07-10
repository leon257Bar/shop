'use strict';

let allProducts = [];

window.addEventListener("load", async () => {
    allProducts = await api.getAllProductsApi();
    generateProducts(allProducts)
})

const api = new Api()
console.log(api.getAllProductsApi());

const buy = localStorage.getItem('buy') ? JSON.parse(localStorage.getItem('buy')) : []

// const shopCardArr = [

// { name: 'Смартфон Xiaomi Redmi 10', 
// id: 15,
// image: 'https://img.mvideo.ru/Big/30063640bb.jpg',   
// stock: 0,
// category: 'Смартфоны',
// price: 20000,
// discount: 25, 
// },

// { name: 'Ноутбук HUAWEI 53013ERR', 
// id: 11,
// image: 'https://img.mvideo.ru/Big/30066688bb.jpg',
// stock: 4,
// category: 'Ноутбуки',
// price: 20000,
// discount: 0, 
// },

// { name: 'Моноблок Irbis MB2385', 
// id: 13,
// image: 'https://img.mvideo.ru/Big/30066145bb.jpg',
// stock: 7,
// category: 'Моноблоки',
// price: 40000,
// discount: 0, 
// },

// { name: 'Смартфон HONOR X8', 
// id: 9,
// image: 'https://img.mvideo.ru/Big/30065649bb.jpg',
// stock: 4,
// category: 'Смартфоны',
// price: 13000,
// discount: 15, 
// },

// { name: 'Наушники Apple AirPods 3rd', 
// id: 10,
// image: 'https://img.mvideo.ru/Pdb/50174855b.jpg',
// stock: 2,
// category: 'Наушники',
// price: 20000,
// discount: 0, 
// },

// { name: 'Наушники Apple AirPods with Charging', 
// id: 43,
// image: 'https://img.mvideo.ru/Big/50172848bb.jpg',
// stock: 2,
// category: 'Наушники',
// price: 17000,
// discount: 50, 
// },

// { name: 'Смартфон Apple iPhone 14 Pro 128GB', 
// id: 22,
// image: 'https://img.mvideo.ru/Big/30064911bb.jpg',
// stock: 2,
// category: 'Смартфоны',
// price: 17000,
// discount: 0, 
// },

// { name: 'Ноутбук ASUS M1502IA-BQ093', 
// id: 15,
// image: 'https://img.mvideo.ru/Big/30067509bb.jpg',
// stock: 2,
// category: 'Ноутбуки',
// price: 34000,
// discount: 10, 
// },

// { name: 'Ноутбук HUAWEI MateBook D15 i5', 
// id: 17,
// image: 'https://img.mvideo.ru/Big/30067463bb.jpg',
// stock: 2,
// category: 'Ноутбуки',
// price: 50000,
// discount: 0, 
// },

// { name: 'Моноблок Irbis MB2390', 
// id: 13,
// image: 'https://img.mvideo.ru/Big/30064482bb.jpg',
// stock: 6,
// category: 'Моноблоки',
// price: 60000,
// discount: 20, 
// },

// { name: 'Моноблок Nerpa Saimaa I510', 
// id: 11,
// image: 'https://img.mvideo.ru/Big/30063801bb.jpg',
// stock: 7,
// category: 'Моноблоки',
// price: 45000,
// discount: 19, 
// },

// { name: 'Моноблок Acer C24-1700 DQ.BJFMC.00E', 
// id: 12,
// image: 'https://img.mvideo.ru/Big/400130459bb.jpg',
// stock: 3,
// category: 'Моноблоки',
// price: 51000,
// discount: 0, 
// },

// { name: 'Ноутбук Apple MacBook Air 13 M1/8/256 Silver', 
// id: 19,
// image: 'https://img.mvideo.ru/Pdb/30064274b.jpg',
// stock: 2,
// category: 'Ноутбуки',
// price: 60000,
// discount: 10, 
// },

// { name: 'Смартфон Apple iPhone 14 Pro 128GB nanoSim/eSim Deep Purple', 
// id: 3,
// image: 'https://img.mvideo.ru/Big/30064911bb.jpg',
// stock: 4,
// category: 'Смартфоны',
// price: 80000,
// discount: 20, 
// },

// { name: 'Наушники накладные Bluetooth Marshall Major IV Black', 
// id: 10,
// image: 'https://img.mvideo.ru/Big/50174560bb.jpg',
// stock: 2,
// category: 'Наушники',
// price: 14000,
// discount: 5, 
// },

// { name: 'Наушники True Wireless Honor Choice EarBuds X3 Grey', 
// id: 10,
// image: 'https://img.mvideo.ru/Big/50174024bb.jpg',
// stock: 2,
// category: 'Наушники',
// price: 4000,
// discount: 12, 
// },


// ]

const btnCategory = document.querySelectorAll('.btn-category')
btnCategory.forEach(elem => elem.addEventListener('click', (e) => {
btnCategory.forEach(btn => btn.classList.remove('btn-category-activ'))
e.target.classList.add('btn-category-activ')
filterProducts(e.target.innerText)
}))

async function filterProducts(categoryName) {
    
    if (categoryName === 'Все категории') {
        generateProducts(allProducts)
    } else {
        const result = await api.getProductsInCategory(categoryName) 
        generateProducts(result)
}}

function generateProducts(arr) {

    const container = document.querySelector('.product-block')
    container.innerHTML = null;
    arr.forEach(element => { container.insertAdjacentHTML('beforeend', `<div data-elem = '${JSON.stringify(element)} 'class="product-card">
    <div onclick="openModal(event)" class="product-image">
    <img class="img-product" src=${element.image} alt="Product Image">
    </div>
    <div class="product-info">
    <h3 class="product-name">${element.name}</h3>
    <p class="product-price"> ${element.discount ? `<span class="price-span">${element.price}₽</span>` : `<span>${element.price}₽</span>`} <span class="discount-span">${element.discount ? Math.round(element.price - (element.price / 100 ) * element.discount, 2) + '₽' : ''}</span></p>
    <span class="product-availability">Наличие: ${element.stock} </span>
    <button onclick="addCard(event)" class="add-to-cart">Добавить в корзину</button>
    </div>
</div>`)
const addBtn = container.querySelector(`.add-to-cart`);
const availability = container.querySelector(`.product-availability`);
    if (element.stock <= 0) {
        availability.innerHTML = 'Нет в наличии'
        addBtn.disabled = true;
    }
    else {
        addBtn.disabled = false;
    }
// insertAdjacentHTML позволяет создавать HTML рызметку внутри JS\
// button onclick="addCard(event)" вызывваеи функцию по клику, принимает в себя только event внутри insertAdjacentHTML
    });

// Атрибут data (52 строка) хранит доп информацию, в нашем случае JSON
} 

function addCard (element) {
   const saveHtmlElem = element.target.closest('.product-card')
   const cardObj = JSON.parse(saveHtmlElem.dataset.elem)
   
   const currentItem = buy.find(element => element.id === cardObj.id)
   if (currentItem) {
    currentItem.count ++
   } else {
    cardObj.count = 1
    buy.push(cardObj)
   }
   localStorage.setItem('buy', JSON.stringify(buy))
}
generateProducts(allProducts)

const searchInp = document.querySelector('.header-search-input')
searchInp.addEventListener('change', async (e) => {
    const value = e.target.value;
    // const searchArr = shopCardArr.filter(element => element.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    const searchArr = await api.getProductsSearch(value)
    generateProducts(searchArr)
})

const sortProducts = document.querySelector('.sort-select')
sortProducts.addEventListener('change', async (e) => {
const selectedValue = e.target.value
const [field, order] = selectedValue.split(',');

const sortResult = await api.getSortProducts(field, order)
generateProducts(sortResult)
})


function openModal(event) {
    const saveHtmlElem = event.target.closest('.product-card')
    const cardObj = JSON.parse(saveHtmlElem.dataset.elem)
    const modalName = document.querySelector('.name-modal')
    const modalImg = document.querySelector('.modal-img')
    modalName.innerHTML = cardObj.name
    modalImg.src = cardObj.image
    const modalOpen = document.querySelector('.modal-wrapper')
    modalOpen.classList.add('active')

    modalOpen.dataset.elem = JSON.stringify(cardObj)
    console.log(modalOpen.dataset.elem);
}

const addBasketModal = document.querySelector('.add-modal')
addBasketModal.addEventListener('click', (e) => {
    addCard(e)
})

const closeModalBtn = document.querySelector('.uil-times-circle')
closeModalBtn.addEventListener('click', (e) => {
    const modalOpen = document.querySelector('.modal-wrapper')
    modalOpen.classList.remove('active')

})


window.onclick = function(event) {
    const modalOpen = document.querySelector('.modal-wrapper')
    if (event.target == modalOpen) {
    modalOpen.classList.remove('active')
    }}
   
//ДЗ на главной цена без, со скидкой. Стилизовать, сделать красиво.

//ДЗ модальное окно для оплаты заказа (ul список товаров, цена, кол-во, общая стоимость, кнопка оплатить(да\нет) > модальное окно для заполнения данных)