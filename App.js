import React, { useState } from "react";
import "./App.css";
import AddTocart from "./AddTocart";

const products = [
  {
    id: 1,
    name: "Macbook Pro",
    price: 2500000,
    image:
      "https://hips.hearstapps.com/hmg-prod/images/apple-m4-macbook-pro-lead-672b861685fd0.jpg",
  },
  {
    id: 2,
    name: "Iphone",
    price: 250000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVa819W7iXdXwSL5HCBg2i3JMuuHkH68Kntw&s",
  },
  {
    id: 3,
    name: "HeadPhone",
    price: 25000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX9FZZnQuVM61-7GryJdtynjolAhPLQtLC1g&s",
  },
];

export default function App() {
  let [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      const updateCart = cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
      setCart(updateCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeOneFromCart = (id) => {
    const existing = cart.find((item) => item.id === id);

    if (existing.qty === 1) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      const updateCart = cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      );
      setCart(updateCart);
    }
  };

  const removeAllItem =(productId)=>{
    setCart(cart.filter(item=>item.id !== productId))


  }

  const getTotal=()=>{
    return cart.reduce((total,item) => total + item.price * item.qty, 10);
  }

  return (
    <>
      <h1>Add To Cart</h1>
      <div className="container">
        <h2>Products</h2>
        <div className="products">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div>
                <h3>{product.name}</h3>
                <p>Price: ₹{product.price}</p>
                <button onClick={() => addToCart(product)}>Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2>Cart</h2>
      {cart.length == 0 ? (
        <p className="empty-cart"> Cart is Empty</p>
      ) : (
        <div className="cart">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>
                {item.name} = ${item.price} X {item.qty}
              </span>
              <div className="cart-button">
                <button onClick={() => addToCart(item)}>+</button>
                <button onClick={() => removeOneFromCart(item.id, item.qty)}>
                  -
                </button>
                <button onClick={()=> removeAllItem(item.id)}>X</button>
              </div>
            </div>
          ))}

          <h3>Total: ${getTotal()}</h3>

          <AddTocart></AddTocart>
        </div>
      )}
    </>
  );
}
