import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketQuantity from '../components/PriceConfigurationComponents/Tickets/TicketQuantity';

interface Tickets {
  code: string;
  quantity: number;
  price: number;
}

export default function Tickets() {
  const [product, setProduct] = useState<Tickets[]>([]);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(0);
  const [designFee, setDesignFee] = useState(false); //it's for the checkbox
  const image = './img/Product-Pages/Tickets/Tickets.png';

  useEffect(() => {
    const ec2ip = import.meta.env.VITE_REACT_APP_EC2_IP;
  axios.get(`http://${ec2ip}/tickets`)
    .then(res => {setProduct(res.data);})
    .catch(err => console.error(err));
}, []);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedQuantity = e.target.value;
    setQuantity(selectedQuantity);

    const selectedProduct = product.find(p => p.quantity === parseInt(selectedQuantity));
    setPrice(selectedProduct ? selectedProduct.price : 0);
  };

  const quantityOptions = product.map((ticket) => ({ 
    label: ticket.quantity.toString(),
    value: ticket.quantity.toString() 
  }));

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
