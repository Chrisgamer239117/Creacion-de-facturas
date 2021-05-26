


class product{
    constructor(name,quantity,cost){
        this.id=null;
        this.name=name;
        this.quantity=quantity;
        this.cost=cost;
        CHECK(quantity>=0)
    }
}
module.exports=product;