class App {
    private lu!: HTMLElement;
    private total: number = 0;
    private addItemButton!: HTMLButtonElement;
    private inItemName!: HTMLInputElement;
    private inItemPrice!: HTMLInputElement;
    private inItemQuantity!: HTMLInputElement;

    constructor() {
        this.initialize();
    }

    private initialize(): void {
        const appElement: HTMLElement | null = document.getElementById('app');
        if (appElement) {

            let inputDiv = document.createElement('div');
            inputDiv.classList.add('grocery-form');

            this.lu = document.createElement('lu');
            this.lu.id = 'list';
            this.lu.classList.add('no-marker');
            this.lu.classList.add('grocery-list')

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

            const h5: HTMLElement = document.createElement('h5');
            h5.id = 'total'
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

    addItem(): void {

        const name: HTMLInputElement = document.getElementById('item-name') as HTMLInputElement;
        const price: HTMLInputElement = document.getElementById('item-price') as HTMLInputElement;
        const qtd: HTMLInputElement = document.getElementById('item-qtd') as HTMLInputElement;

        if (name && price && qtd) {
            const li: HTMLElement = document.createElement('li');
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
            spanPrice.textContent = `Price: ${item.price.toLocaleString('en-US', {style:'currency', currency: 'USD'})}`;
            spanQuantity.textContent = `Quantity: ${item.quantity}`;
            spanTotal.textContent = `Total: ${item.total.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`;

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
                this.lu.insertBefore(li, this.lu.childNodes[0])
            } else {
                this.lu.appendChild(li);
            }
            this.updateTotal(item.total, 'add');
            name.value = '';
            price.value = '';
            qtd.value = '';
        }
    }

    removeItem(item: HTMLElement): void {
        const lu: HTMLElement | null = document.getElementById('list');
        if (lu) {
            lu.removeChild(item);
            console.log(item);
            if (item.childNodes[2].textContent) {
                let itemTotal = item.childNodes[5].textContent;
                this.updateTotal(parseFloat(itemTotal!), 'subtract')
            }
        }
    }

    private bindEvents(): void {
        if (this.addItemButton) {
            this.addItemButton.addEventListener('click', () => this.addItem());
        }

        if(this.inItemName){
            this.inItemName.addEventListener("keypress", function (event){
                if(event.key==="Enter"){
                    event.preventDefault();
                    document.getElementById("item-price")!.focus();
                }
            });
        }
        if(this.inItemPrice){
            this.inItemPrice.addEventListener("keypress", function (event){
                if(event.key==="Enter"){
                    event.preventDefault();
                    document.getElementById("item-qtd")!.focus();
                }
            });
        }

        if(this.inItemQuantity){
            this.inItemQuantity.addEventListener("keypress", function (event) {
                if(event.key==="Enter"){
                    event.preventDefault()
                    document.getElementById('add-btn')!.click();
                    document.getElementById('item-name')!.focus();
                }
            })
        }
    }

    private updateTotal(value: number, operation: 'add' | 'subtract'): void {
        console.log(value);
        if (operation === 'add') {
            this.total += value;
        } else if (operation === 'subtract') {
            this.total -= value;
        }

        console.log(this.total);

        const total = document.getElementById('total');
        if (total) {
            if(isNaN(this.total)){
                this.total = 0;
            }
            total.textContent = `Total: ${this.total.toLocaleString('en-US',{ style: 'currency', currency: 'USD'})}`
        }
    }
}

class Item {
    readonly name: string;
    readonly price: number;
    readonly quantity: number;
    readonly total: number;

    constructor(name: string, price: number, quantity: number) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.total = price * quantity;
    }
}

new App();
