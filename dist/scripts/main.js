"use strict";
class App {
    constructor() {
        this.total = 0;
        this.initialize();
    }
    initialize() {
        const appElement = document.getElementById('app');
        if (appElement) {
            let inputDiv = document.createElement('div');
            inputDiv.classList.add('grocery-form');
            this.lu = document.createElement('lu');
            this.lu.id = 'list';
            this.lu.classList.add('no-marker');
            this.lu.classList.add('grocery-list');
            this.addItemButton = document.createElement('button');
            this.addItemButton.id = 'add-btn';
            this.addItemButton.textContent = '➕';
            this.inItemName = document.createElement('input');
            this.inItemName.id = 'item-name';
            this.inItemName.placeholder = 'Product';
            this.inItemName.classList.add('main-input');
            this.inItemPrice = document.createElement('input');
            this.inItemPrice.id = 'item-price';
            this.inItemPrice.placeholder = 'Price';
            this.inItemPrice.classList.add('main-input');
            this.inItemQuantity = document.createElement('input');
            this.inItemQuantity.id = 'item-qtd';
            this.inItemQuantity.placeholder = 'Quantity';
            this.inItemQuantity.classList.add('main-input');
            const h5 = document.createElement('h5');
            h5.id = 'total';
            h5.textContent = `Total: ${this.total}`;
            appElement.appendChild(h5);
            inputDiv.appendChild(this.inItemName);
            inputDiv.appendChild(this.inItemPrice);
            inputDiv.appendChild(this.inItemQuantity);
            inputDiv.appendChild(this.addItemButton);
            appElement.appendChild(inputDiv);
            appElement.appendChild(this.lu);
            this.bindEvents();
        }
    }
    addItem() {
        const name = document.getElementById('item-name');
        const price = document.getElementById('item-price');
        const qtd = document.getElementById('item-qtd');
        if (name && price && qtd) {
            const li = document.createElement('li');
            li.classList.add('grocery-item');
            let item = new Item(name.value, parseFloat(price.value), parseFloat(qtd.value));
            let spanName = document.createElement('span');
            spanName.classList.add('item-text');
            let spanPrice = document.createElement('span');
            spanPrice.classList.add('item-text');
            let spanQuantity = document.createElement('span');
            spanQuantity.classList.add('item-text');
            let spanTotal = document.createElement('span');
            spanTotal.classList.add('item-text');
            spanName.textContent = `Product: ${item.name}`;
            spanPrice.textContent = `Price: ${item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
            spanQuantity.textContent = `Quantity: ${item.quantity}`;
            spanTotal.textContent = `Total: ${item.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
            li.appendChild(spanName);
            li.appendChild(spanPrice);
            li.appendChild(spanQuantity);
            li.appendChild(spanTotal);
            let totalSpan = document.createElement('span');
            totalSpan.textContent = String(item.total);
            totalSpan.style.display = 'none';
            let removeItemButton = document.createElement('button');
            removeItemButton.textContent = '➖';
            removeItemButton.classList.add('delete-item');
            removeItemButton.addEventListener('click', () => this.removeItem(li));
            li.appendChild(removeItemButton);
            li.appendChild(totalSpan);
            if (this.lu.hasChildNodes()) {
                this.lu.insertBefore(li, this.lu.childNodes[0]);
            }
            else {
                this.lu.appendChild(li);
            }
            this.updateTotal(item.total, 'add');
            name.value = '';
            price.value = '';
            qtd.value = '';
        }
    }
    removeItem(item) {
        const lu = document.getElementById('list');
        if (lu) {
            lu.removeChild(item);
            if (item.childNodes[2].textContent) {
                let itemTotal = item.childNodes[2].textContent;
                this.updateTotal(parseFloat(itemTotal), 'subtract');
            }
        }
    }
    bindEvents() {
        if (this.addItemButton) {
            this.addItemButton.addEventListener('click', () => this.addItem());
        }
    }
    updateTotal(value, operation) {
        if (operation === 'add') {
            this.total += value;
        }
        else if (operation === 'subtract') {
            this.total -= value;
        }
        const total = document.getElementById('total');
        if (total) {
            if (isNaN(this.total)) {
                this.total = 0;
            }
            total.textContent = `Total: ${this.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
        }
    }
}
class Item {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.total = price * quantity;
    }
}
new App();
