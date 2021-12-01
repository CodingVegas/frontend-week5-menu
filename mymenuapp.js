class Burrito {
    constructor(meat, toppings) {
        this.meat = meat;
        this.toppings = toppings;
    }

    describe() {
        return `${this.meat} is great with ${this.toppings}.`;
    }
}

class Order {
    constructor(name) {
        this.name = name;
        this.burrito = [];
    }

    addBurrito(burrito) {
        if (burrito instanceof Burrito) {
            this.burrito.push(burrito);
        }else {
            throw new Error(`Error`)
        }
    }
    
    describe() {
        return `${this.name} has ${this.burrito.length} burritos in their order.`;
    }
}

class Menu {
    constructor() {
        this.order = [];
        this.selectedOrder = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createOrder();
                    break;
                case '2':
                    this.viewOrder();
                    break;
                case '3':
                    this.deleteOrder();
                    break;
                case '4':
                    this.displayOrder();
                    break;
                default:
                    selection = 0;    
            }
            selection = this.showMainMenuOptions();
        }

        alert('Have a fabulous day!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new order
        2) view order
        3) delete order
        4) display all orders
        `)
    }

    showOrderMenuOptions(order) {
        return prompt(`
        0) back
        1) create burrito
        2) delete burrito
        3) number of burritos
        --------------------------------
        ${order}
        `)
    }

    displayOrder() {
        let orderString = '';
        for (let i = 0; i < this.order.length; i++) {
            orderString += i + ') ' + this.order[i].name + '\n'
        }
        alert(orderString);
    }
    createOrder() {
        let name = prompt('Enter name for new order:');
        this.order.push(new Order(name));
    }

    viewOrder() {
        let orderString = '';
        for (let i = 0; i < this.order.length; i++) {
            orderString += i + ') ' + this.order[i].name + '\n'
        }
        let index = prompt(`${orderString}
        -------------------------
        Enter the index of the order you wish to view
        `);
        if (index > -1 && index < this.order.length) {
            this.selectedOrder = this.order[index];
            let description = 'Order Name: ' + this.selectedOrder.name + '\n';
            
            for (let i = 0; i < this.selectedOrder.burrito.length; i++){
                description += i + ') ' + this.selectedOrder.burrito[i].meat
                    + ' - ' + this.selectedOrder.burrito[i].toppings + '\n'
            }

            let selection = this.showOrderMenuOptions(description);
                switch (selection) {
                    case '1':
                        this.createBurrito();
                        break;
                    case '2':
                        this.deleteBurrito();
                        break;
                    case '3':
                        alert(this.selectedOrder.describe());
                }
        }   
     }

     deleteOrder() {
        let orderString = '';
        for (let i = 0; i < this.order.length; i++) {
            orderString += i + ') ' + this.order[i].name + '\n'
        }
        let index = prompt(`${orderString}
        ------------------------- 
        Enter the index of the order you wish to delete:
        `);
         if (index > -1 && index < this.order.length) {
             this.order.splice(index, 1);
         }
     }

     createBurrito() {
        let meat = prompt('Enter meat for new Burrito');
        let toppings = prompt('Enter toppings for new burrito');
        this.selectedOrder.burrito.push(new Burrito(meat, toppings));
     }

     deleteBurrito() {
         let index = prompt('Enter the index of the burrito you want to delete');
         if (index > -1 && index < this.selectedOrder.burrito.length) {
            this.selectedOrder.burrito.splice(index, 1);        
         }
     }
}
let menu = new Menu();
menu.start();