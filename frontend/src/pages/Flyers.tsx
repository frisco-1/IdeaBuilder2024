import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDisplay from '../components/ProductDisplay';

export default function Flyers() {
  const [flyers, setFlyers] = useState([]);
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(null);
  const [productCode, setProductCode] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/flyers')
      .then(res => setFlyers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setQuantity(''); // Reset Quantity when type changes
    setPrice(null); // Reset price when type changes
    const selectedProduct = flyers.find(card => card.name === selectedType);
    setProductCode(selectedProduct?.code || '');
  };

  const handleQuantityChange = (e) => {
    const selectedQuantity = e.target.value;
    setQuantity(selectedQuantity);
    const selectedProduct = flyers.find(card => card.name === type);
    const selectedOrder = selectedProduct?.order.find(order => order.quantity === parseInt(selectedQuantity));
    setPrice(selectedOrder?.price !== null ? selectedOrder.price : 'N/A');
  };

  const typeOptions = flyers.map((card) => card.name)
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((type) => ({ label: type, value: type }));

  const quantityOptions = flyers.filter(card => card.name === type)
    .flatMap(card => card.order)
    .map(order => order.quantity)
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((quantity) => ({ label: quantity, value: quantity }));

  return (
    <ProductDisplay
      displayName='Flyers'
      displayCode='(FLY)'
      type={type}
      typeOptions={typeOptions}
      handleTypeChange={handleTypeChange}
      quantity={quantity}
      quantityOptions={quantityOptions}
      handleQuantityChange={handleQuantityChange}
      price={price}
      productCode={productCode}
    />
  );
}
