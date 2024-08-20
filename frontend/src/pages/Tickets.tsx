import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketQuantity from '../components/ForTicketPage/TicketQuantity';

export default function Tickets() {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(null);
  const [designFee, setDesignFee] = useState(false); //it's for the checkbox
  const image = './img/Product-Pages/Tickets/Tickets.png';

  useEffect(() => {
    axios.get('http://localhost:4000/tickets')
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleQuantityChange = (e) => {
    const selectedQuantity = e.target.value;
    setQuantity(selectedQuantity);

    const selectedProduct = product.find(p => p.quantity === parseInt(selectedQuantity));
    setPrice(selectedProduct ? selectedProduct.price : null);
  };

  const quantityOptions = product.map(p => ({ label: p.quantity, value: p.quantity }));

  const handleCheckboxChange = (e) => {
    const {id, checked } = e.target;
    if (id === 'designFee'){
      setDesignFee(checked);
    }
  }

  const calculateTotalPrice = () => {
    let totalPrice = price || 0;
    if (designFee) totalPrice += 45;
    return totalPrice;
  };

  return (
    <TicketQuantity
      displayName='Tickets'
      displayCode='(TIC)'
      quantity={quantity}
      quantityOptions={quantityOptions}
      handleQuantityChange={handleQuantityChange}
      price={calculateTotalPrice()}
      designFee={designFee}
      handleCheckboxChange={handleCheckboxChange}
      image={image}
    />
  );
}
