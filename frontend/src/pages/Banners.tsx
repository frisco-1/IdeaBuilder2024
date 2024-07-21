import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductNumInput from '../components/ProductNumInput';

export default function Banners() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(null);
  const area = width * length;

  useEffect(() => {
    let newPrice = 0;
    if (area >=10 && area <= 30) {
      newPrice = area * 6.5;
    }
    else if (area == 8)
    {
      newPrice = area * 10;
    }
    else if (area >= 31 && area <= 70) {
      newPrice = area * 4.25;
    }
    else if(area >= 71) {
      newPrice = area * 3;
    }
    setPrice(newPrice * quantity);
  }, [area, quantity]);

  const handleLengthChange = (e) => {
    setLength(e.target.value);
  }

  const handleWidthChange = (e) => {
    setWidth(e.target.value);
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value)
  }

  return (
    <ProductNumInput
      displayName='Banners'
      displayCode='BAN'
      length={length}
      width={width}
      quantity={quantity}
      area={area}
      price={price}
      handleLengthChange={handleLengthChange}
      handleWidthChange={handleWidthChange}
      handleQuantityChange={handleQuantityChange}
    />
  );
}
