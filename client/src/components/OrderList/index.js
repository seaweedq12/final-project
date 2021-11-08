import React from "react";
import './style.css';

function Orderlist({me}) {
  const reversed = me.previousOrder.map(item => item).reverse();
  
  return (
    <div>
      <h2 className="col-12">Orders List</h2>
        {me.previousOrder.length? (
          reversed.map(( order , i) => (
            <div key={reversed[i]._id} className="order-card mb-3 col-12">
              <div className="pt-2 pb-2">
                <p className="order-text">{reversed[i].orderdate}</p>
                <p className="order-text">items: {reversed[i].productList.length}</p>
                <p className="order-text">total price: $ {reversed[i].productList.reduce(function (accumulator, item) {
                  return accumulator + item.price;
                }, 0)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <h3 className="col-12">No Order</h3>
        )}
    </div>
  );
}

export default Orderlist;