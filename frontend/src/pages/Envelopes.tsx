import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDisplay from '../components/PriceConfigurationComponents/ProductSelect';

interface Envelopes {
  name: string;
  code: string;
  image: string;
  order: {
    quantity: number;
    price: number | string;
  }[];
}

export default function Envelopes() {
  const [envelopes, setEnvelopes] = useState<Envelopes[]>([]);
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(0);
  const [productCode, setProductCode] = useState('');
  const [image, setImage] = useState('./img/No-Product-Selected.png');

  useEffect(() => {
    const backend = import.meta.env.VITE_BACKEND_BASE_URL;
    axios.get(`${backend}/envelopes`)
      .then(res => setEnvelopes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setQuantity(''); // Reset Quantity when type changes
    setPrice(0); // Reset price when type changes
    const selectedProduct = envelopes.find(card => card.name === selectedType);
    setProductCode(selectedProduct?.code || '');
    setImage(selectedProduct?.image || './img/No-Product-Selected.png');
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedQuantity = e.target.value;
    setQuantity(selectedQuantity);
    const selectedProduct = envelopes.find(card => card.name === type);
    const selectedOrder = selectedProduct?.order.find(order => Number(order.quantity) === Number(selectedQuantity));
    setPrice(selectedOrder?.price !== undefined && selectedOrder?.price !== 0 ? Number(selectedOrder.price) : 0);
  };

  const typeOptions = envelopes.map((card) => card.name)
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((type) => ({ label: type, value: type }));

  const quantityOptions = envelopes.filter(card => card.name === type)
    .flatMap(card => card.order)
    .map(order => order.quantity)
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((quantity) => ({ label: quantity.toString(), value: quantity.toString() }));

  return (
    <ProductDisplay
      displayName='Envelopes'
      displayCode='(ENV)'
      type={type}
      typeOptions={typeOptions}
      handleTypeChange={handleTypeChange}
      quantity={quantity}
      quantityOptions={quantityOptions}
      handleQuantityChange={handleQuantityChange}
      price={price}
      productCode={productCode}
      image={image}
      ncrNumbering={false}
      bookletStyle={false}
      handleCheckboxChange={() => {}}
    />
  );
}
