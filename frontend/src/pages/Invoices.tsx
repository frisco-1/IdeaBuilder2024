import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDisplay from '../components/ProductSelect';

export default function Invoices() {
  const [product, setProduct] = useState([]);
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(null);
  const [productCode, setProductCode] = useState('');
  const [ncrNumbering, setNcrNumbering] = useState(false); //checkboxes
  const [bookletStyle, setBookletStyle] = useState(false); //checkboxes

  useEffect(() => {
    axios.get('http://localhost:4000/invoices')
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setQuantity(''); // Reset Quantity when type changes
    setPrice(null); // Reset price when type changes
    const selectedProduct = product.find(card => card.name === selectedType);
    setProductCode(selectedProduct?.code || '');
  };

  const handleQuantityChange = (e) => {
    const selectedQuantity = e.target.value;
    setQuantity(selectedQuantity);
    const selectedProduct = product.find(card => card.name === type);
    const selectedOrder = selectedProduct?.order.find(order => order.quantity === parseInt(selectedQuantity));
    setPrice(selectedOrder?.price !== null ? selectedOrder.price : 'N/A');
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    if (id === 'ncrNumbering') {
      setNcrNumbering(checked);
    } else if (id === 'bookletStyle') {
      setBookletStyle(checked);
    }
  };

   const calculateTotalPrice = () => {
    let totalPrice = price || 0;
    if (ncrNumbering) totalPrice += 30;
    if (bookletStyle) totalPrice += 50;
    return totalPrice;
  };

  const typeOptions = product.map((card) => card.name)
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((type) => ({ label: type, value: type }));

  const quantityOptions = product.filter(card => card.name === type)
    .flatMap(card => card.order)
    .map(order => order.quantity)
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((quantity) => ({ label: quantity, value: quantity }));

  return (
    <ProductDisplay
      displayName='Invoices'
      displayCode='(NCR)'
      type={type}
      typeOptions={typeOptions}
      handleTypeChange={handleTypeChange}
      quantity={quantity}
      quantityOptions={quantityOptions}
      handleQuantityChange={handleQuantityChange}
      price={calculateTotalPrice()}
      productCode={productCode}
      ncrNumbering={ncrNumbering}
      bookletStyle={bookletStyle}
      handleCheckboxChange={handleCheckboxChange}
    />
  );
}
