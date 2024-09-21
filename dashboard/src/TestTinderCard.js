import React from 'react';
import TinderCard from 'react-tinder-card';

function TestTinderCard() {
  const handleSwipe = (direction) => {
    console.log('Swiped:', direction);
  };

  const handleCardLeftScreen = (name) => {
    console.log('Card left screen:', name);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <TinderCard
        onSwipe={handleSwipe}
        onCardLeftScreen={() => handleCardLeftScreen('Test User')}
        preventSwipe={['up', 'down']}
      >
        <div
          style={{
            backgroundColor: '#f3f4f6',
            width: '300px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
          }}
        >
          <h3>Test User</h3>
        </div>
      </TinderCard>
    </div>
  );
}

export default TestTinderCard;