class Entity {
    constructor(attrs) {
      Object.assign(this, attrs);
    }
}
  
class User extends Entity {}

class DeliveryAddress extends Entity {}

class CartItem extends Entity {}

class Order extends Entity {}

class Invoice extends Entity {}

class OrderItems extends Entity {}

module.exports = {
    User,
    DeliveryAddress,
    CartItem,
    Order,
    Invoice,
    OrderItems
}