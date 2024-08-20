import { useState, useEffect } from 'react';

import ProductNumInput from '../components/ProductNumInput';

export default function Banners() {
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const image = './img/Product-Pages/Banners/Banners.png';
  const area = Number(width) * Number(length);

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

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(Number(e.target.value));
  }

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(e.target.value));
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  }

  return (
      <ProductNumInput
        displayName='Banners'
        displayCode='BAN'
        type='banner'
        productCode='BAN'
        length={length}
        width={width}
        quantity={quantity}
        area={area}
        price={price}
        handleLengthChange={handleLengthChange}
        handleWidthChange={handleWidthChange}
        handleQuantityChange={handleQuantityChange}
        image={image}
      />
    );
}
