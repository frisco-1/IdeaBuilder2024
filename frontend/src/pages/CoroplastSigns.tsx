import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OneSelect from '../components/PriceConfigurationComponents/OneSelect-Quantity';

interface CoroplastSigns {
  code: string;
  name: string;  // Adjusted from size to name
  price: number;
  image: string;
}

export default function CoroplastSigns() {
  const [product, setProduct] = useState<CoroplastSigns[]>([]);
  const [selectedName, setSelectedName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [productCode, setProductCode] = useState('');
  const [image, setImage] = useState('./img/No-Product-Selected.png');

  useEffect(() => {
    axios.get('http://localhost:4000/coroplast_signs')
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setSelectedName(selectedName);
    setQuantity(1); // Reset quantity when name changes

    const selectedProduct = product.find(p => p.name === selectedName);
    setPrice(selectedProduct ? selectedProduct.price : 0);
    setProductCode(selectedProduct ? selectedProduct.code : '');
    setImage(selectedProduct ? selectedProduct.image : './img/No-Product-Selected.png');
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedQuantity = parseInt(e.target.value, 10);
    setQuantity(selectedQuantity);

    const selectedProduct = product.find(p => p.name === selectedName);
    if (selectedProduct) {
      setPrice(selectedProduct.price * selectedQuantity);
    }
  };

  const nameOptions = product.map((p) => ({
    label: p.name,
    value: p.name,
  }));

  return (
    <OneSelect
      displayName='Coroplast Signs 18" x 24"' 
      displayCode='(SSC)'
      image={image}
      name={selectedName}
      size={selectedName}  
      handleSizeChange={handleNameChange}
      quantity={quantity}
      handleQuantityChange={handleQuantityChange}
      price={price}
      sizeOptions={nameOptions}
      productCode={productCode}
    />
  );
}
