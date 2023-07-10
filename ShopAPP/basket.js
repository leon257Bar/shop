'use strict';


function loadCart() {
    const cartGet = JSON.parse(localStorage.getItem('buy'));
    return cartGet || [];
}

function renderCart() {
    const cart = loadCart();
    const cartElement = document.querySelector('.basket-container-item');
    cartElement.innerHTML = null;

    cart.forEach((item) => {
        cartElement.insertAdjacentHTML('beforeend', `<div data-id="${item.id}" class="cart-item">
        <img class="img-basket" src="${item.image}" alt="Product 1">
        <h3 class="name-basket">${item.name}</h3>
        <p class="price-basket"> ${item.discount ? `<span class="price-span">${item.price}₽</span>` : `<span>${item.price}₽</span>`} <span class="discount-span-basket">${item.discount ? item.price - (item.price / 100 ) * item.discount + '₽' : ''}</span></p>
        <div class="count-container">
        <button onclick="countItem(event)" class="btn-minus btn-count">-</button>
        <span class="count"> ${item.count}</span>
        <button onclick="countItem(event)" class="btn-plus btn-count">+</button>
        </div>
        <button onclick="deleteItem(event)" class="btn-basket">Удалить</button>
        </div>`)
        
        //блок кнопки
        const minusBtn = cartElement.querySelector(`[data-id="${item.id}"] .btn-minus`);
        if (item.count <= 1) {
        minusBtn.disabled = true;
        } else {
        minusBtn.disabled = false;
        }
});

countAndPrice();
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
})

function deleteItem(event) {
    if (confirm('Вы уверены?')) {
    const elem = event.target.closest('.cart-item')
    const elemID = elem.dataset.id
    const cart = loadCart();
    console.log(event);
    const buy = cart.filter(element => element.id != elemID);
    localStorage.setItem('buy', JSON.stringify(buy));
    renderCart();
    } else {
        return
    }
}



function countItem(event) {
    const elem = event.target.closest('.cart-item');
    const elemID = elem.dataset.id;
    const cart = loadCart();
    const currentItem = cart.find((element) => element.id == elemID);

    
    if (event.target.innerText == '-') {
        currentItem.count--;
      } else {
        currentItem.count++;
      }
  
    localStorage.setItem('buy', JSON.stringify(cart));
    renderCart();
  }

const removeBtn = document.querySelector('.remove-all')
removeBtn.addEventListener('click', () => {
    removeAll()
})

function removeAll() {
    if (confirm('Хотите отчистить всю корзину?')) {
        localStorage.removeItem('buy')
        renderCart();
    }
}

function countAndPrice () {

    const spanCount = document.querySelector('.span-count')
    const spanPrice = document.querySelector('.span-price')
    const cart = loadCart();
    let sum = 0; 
    let count = cart.length;
    
    cart.map((element) => {
        let discount = element.price - (element.price / 100 ) * element.discount
        sum += discount * element.count
    })
    
    spanCount.innerText = count;
    spanPrice.innerText = sum;

    return sum
}

//Модальные окна корзины

const payBtn = document.querySelector('.buy-all')
payBtn.addEventListener('click', (e) => {
    const modalOpen = document.querySelector('.modal-wrapper')
    modalOpen.classList.add('active')
    const modalList = document.querySelector('.modal-basket-ul')
    const cart = loadCart();
    console.log(cart);
    cart.forEach((item) => {
        modalList.insertAdjacentHTML('beforeend', `<li class="modal-basket-list modal-name">${item.name} <sapn calss="span-count-modal">Количество: ${item.count}</span> </li>`)
    })
    const sumModal = document.createElement('li');
    sumModal.classList.add('modal-basket-list')
    sumModal.classList.add('modal-sum')
    sumModal.innerText = `Общая стоимость: ${countAndPrice()} ₽`
    modalList.append(sumModal)
})

const closeModalBtn = document.querySelector('.uil-times-circle')
closeModalBtn.addEventListener('click', () => {
    const modalList = document.querySelector('.modal-basket-ul')
    const modalOpen = document.querySelector('.modal-wrapper')
    modalOpen.classList.remove('active')
    modalList.innerHTML = null
}) 


window.onclick = function(event) {
    const modalOpen = document.querySelector('.modal-wrapper')
    const modalList = document.querySelector('.modal-basket-ul')
        if (event.target == modalOpen) {
        modalList.innerHTML = null
        modalOpen.classList.remove('active')
        }
      }

const buyFormModalBtn = document.querySelector('.add-modal')
buyFormModalBtn.addEventListener('click', () => {
    const modalFormContainer = document.querySelector('.modal-wrapper-form');
    modalFormContainer.classList.add('active')
    modalFormContainer.insertAdjacentHTML('beforeend',  `<div id="myModal" class="modal">
    <div class="modal-content-form">
    <i class="uil uil-times-circle close-form"></i>
      <h2>Заполните информацию для покупки</h2>
      <form>
        <label class="label-form" for="name">Имя:</label>
        <input class="input-form input-name" type="text" id="name" name="name" required><br>
  
        <label class="label-form" for="email">Email:</label>
        <input class="input-form input-email" type="email" id="email" name="email" required><br>
  
        <label class="label-form" for="phone">Телефон:</label>
        <input class="input-form input-phone" type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required><br>
  
        <button class="add-to-cart button-form" type="submit">Отправить</button>
      </form>
    </div>
  
  </div>`)

    const closeForm = document.querySelector('.close-form')
    console.log(closeForm);
    
    closeForm.addEventListener('click', () => {
    modalFormContainer.classList.remove('active')
    modalFormContainer.innerHTML = null
})
})

//Блочиить кнопку минус когда кол-во = 1. Если сток = 0, то отображать что нет в наличии. Добавляем ключ для скидок discount
// Сделать 4 категории, в каждый по 4 товара. Вёрстка нормальная, заполнить товары.