import { useState, useEffect } from "react";
import axios from "axios";
import InvitationNumselect from "../components/ForInvitationsPage/InvitationSelection";

interface Invitations {
  name: string;
  code: string;
  image: string;
  order: {
    quantity: number;
    price: number;
  }[];
  envelopeFee: number;
  extraQuantityFee: number;
}

export default function Invitations() {
  const [invitations, setInvitations] = useState<Invitations[]>([]);
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState(25);
  const [price, setPrice] = useState(0);
  const [productCode, setProductCode] = useState('');
  const [image, setImage] = useState('./img/No-Product-Selected.png');
  const [envelopeFee, setEnvelopeFee] = useState(0);
  const [extraQuantityFee, setExtraQuantityFee] = useState(0);
  const [envelopeSelected, setEnvelopeSelected] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/invitations')
      .then(res => setInvitations(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setQuantity(25); // Reset Quantity to minimum when type changes
    setPrice(0); // Reset price when type changes
    const selectedProduct = invitations.find(invitation => invitation.name === selectedType);
    setProductCode(selectedProduct?.code || '');
    setImage(selectedProduct?.image || './img/No-Product-Selected.png');
    setEnvelopeFee(selectedProduct?.envelopeFee || 0);
    setExtraQuantityFee(selectedProduct?.extraQuantityFee || 0);
    setEnvelopeSelected(false); // Reset envelope selection when type changes
  };

 const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedQuantity = Number(e.target.value);
    setQuantity(selectedQuantity);
 
    const selectedProduct = invitations.find(invitation => invitation.name === type);
    if (selectedProduct) {
        // Get the base price for the closest quantity (25, 50, 100)
        const order = selectedProduct.order.find(o => o.quantity === selectedQuantity) || selectedProduct.order[selectedProduct.order.length - 1];
        const basePrice = order ? order.price : 0;

        let totalPrice = basePrice;

        // Calculate the additional fee for quantities over 100
        if (selectedQuantity > 100) {
            const extraQuantityCounter = Math.floor((selectedQuantity - 100) / 25);
            totalPrice += extraQuantityCounter * selectedProduct.extraQuantityFee;
        }

        // Add the envelope fee if selected
        if (envelopeSelected) {
            totalPrice += selectedQuantity * selectedProduct.envelopeFee;
        }

        setPrice(totalPrice);
    }
};

const handleEnvelopeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = e.target.checked;
    setEnvelopeSelected(isSelected);
};

const calculateTotalPrice = () => {
    const selectedProduct = invitations.find(invitation => invitation.name === type);
    let totalPrice = price || 0;

    if (selectedProduct && envelopeSelected) {
        const envelopeCost = quantity * selectedProduct.envelopeFee;
        totalPrice += envelopeCost;
    }

    return totalPrice;
};


  const typeOptions = invitations.map((invitation) => invitation.name)
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((type) => ({ label: type, value: type }));

  return (
      <InvitationNumselect
        displayName='Invitations'
        displayCode='(INV)'
        image={image}
        type={type}
        productCode={productCode}
        handleQuantityChange={handleQuantityChange}
        handleTypeChange={handleTypeChange}
        handleEnvelopeChange={handleEnvelopeChange}
        envelopeSelected={envelopeSelected}
        typeOptions={typeOptions}
        quantity={quantity}
        price={price}
        quantityOptions={[]}
      />
    );
}
