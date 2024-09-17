import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OneSelect from '../components/ForPrintedVinylLaminated/OneSelect-Quantity';

interface RollUpBanners {
  code: string;
  name: string;  
  price: number;
  image: string;
}

export default function RollUpBanners() {
  const [product, setProduct] = useState<RollUpBanners[]>([]);
  const [selectedName, setSelectedName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('./img/No-Product-Selected.png');

  useEffect(() => {
    axios.get('http://localhost:4000/roll_up_banners')
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setSelectedName(selectedName);
    setQuantity(1); // Reset quantity when name changes

    const selectedProduct = product.find(p => p.name === selectedName);
    setPrice(selectedProduct ? selectedProduct.price : 0);
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
      displayName='Roll Up Banners' 
      displayCode='(SSRUP)'
      image={image}
      name={selectedName}
      size={selectedName}  // Adjusted from size to selectedName
      handleSizeChange={handleNameChange}
      quantity={quantity}
      handleQuantityChange={handleQuantityChange}
      price={price}
      sizeOptions={nameOptions}  // Adjusted from sizeOptions to nameOptions
    />
  );
}
