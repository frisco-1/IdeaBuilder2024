import { useState, useEffect } from "react";
import axios from "axios";
import BookletNumselect from "../components/PriceConfigurationComponents/Booklets/OneSelect-Booklets";

interface Booklets {
  name: string;
  code: string;
  image: string;
  pricing: {
    quantityRange: string;
    price: number;
  }[];
}

export default function Booklets() {
  const [booklets, setBooklets] = useState<Booklets[]>([]);
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState(25);
  const [price, setPrice] = useState(0);
  const [productCode, setProductCode] = useState('');
  const [image, setImage] = useState('./img/No-Product-Selected.png');

  useEffect(() => {
    axios.get('http://localhost:4000/booklets')
      .then(res => setBooklets(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setQuantity(25); // Reset Quantity to minimum when type changes
    setPrice(0); // Reset price when type changes
    const selectedProduct = booklets.find(booklet => booklet.name === selectedType);
    setProductCode(selectedProduct?.code || '');
    setImage(selectedProduct?.image || './img/No-Product-Selected.png');
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedQuantity = Number(e.target.value);
    setQuantity(selectedQuantity);

    const selectedProduct = booklets.find(booklet => booklet.name === type);
    if (selectedProduct) {
      const pricingTier = selectedProduct.pricing.find(tier => {

          const range = tier.quantityRange;
          
          if (range.includes('+')) {
            // Handle open-ended ranges like "100+"
            const min = parseInt(range);
            return selectedQuantity >= min;
          } else {
            // Handle closed ranges like "25-49"
            const [min, max] = range.split('-').map(Number);
            return selectedQuantity >= min && selectedQuantity <= max;
          }
        });
      setPrice(pricingTier ? pricingTier.price * selectedQuantity : 0);
    }
  };

  const typeOptions = booklets.map((booklet) => booklet.name)
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((type) => ({ label: type, value: type }));

  return (
      <BookletNumselect
        displayName='Booklets'
        displayCode='(BKT)'
        image={image}
        type={type}
        productCode={productCode}
        handleQuantityChange={handleQuantityChange}
        handleTypeChange={handleTypeChange}
        typeOptions={typeOptions}
        quantity={quantity}
        price={price}
        quantityOptions={[]}
      />
    );
}
