import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [businessCards, setBusinessCards] = useState([]);

  useEffect(() => {
    const fetchBusinessCards = async () => {
      try {
        const response = await axios.get('http://localhost:4000/business_cards'); // Ensure this matches your backend route
        setBusinessCards(response.data);
      } catch (error) {
        console.error('Error fetching business cards:', error);
      }
    };

    fetchBusinessCards();
  }, []);

  return (
    <div>
      <h1>Business Cards</h1>
      <ul>
        {businessCards.map((card) => (
          <li key={card._id}>
            <h2>{card.name}</h2>
            <p>Code: {card.code}</p>
            <ul>
              {card.order.map((order, index) => (
                <li key={index}>
                  Quantity: {order.quantity}, Price: {order.price}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
