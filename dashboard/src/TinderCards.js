import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import styles from './TinderCards.module.css';

function TinderCards() {
  const [people] = useState([
    {
      name: 'Elon Musk',
      url: 'https://media.gettyimages.com/photos/of-tesla-and-space-x-elon-musk-attends-the-2015-vanity-fair-oscar-picture-id464172224?k=6&m=464172224&s=612x612&w=0&h=M9Wf9-mcTJBLRWKFhAX_QGVAPXogzxyvZeCiIV5O3pw='
    },
    {
      name: 'Jeff Bezos',
      url: 'https://media.gettyimages.com/photos/amazon-ceo-jeff-bezos-founder-of-space-venture-blue-origin-and-owner-picture-id1036094130?k=6&m=1036094130&s=612x612&w=0&h=3tKtZs6_SIXFZ2sdRUB4LjAf_GlfCMekP2Morwkt5EM='
    }
  ]);

  const swiped = (direction, nameToDelete) => {
    console.log('Swiped', direction, nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log('Out of frame:', name);
  };

  return (
    <div className={styles.tinderCards}>
      <div className={styles.cardContainer}>
        {people.map((person) => (
          <TinderCard
            className={styles.swipe}
            key={person.name}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className={styles.card}
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;