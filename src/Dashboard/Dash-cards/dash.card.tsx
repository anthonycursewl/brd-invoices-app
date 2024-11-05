import './dash.card.css'
import VisibleIcon, { UnvisibleIcon } from '../../assets/svgs/visible-icon';
import { useState } from 'react';

interface DashCardProps {
    cardNumber: string;
    cardExpires: string;
    cardType: string;
}

export const DashCard = ({ cardNumber, cardExpires, cardType }: DashCardProps) => {
  const [visible, setVisible] = useState(false);

  const parseCardNumber = (cardNumber: string) => {
    let card = cardNumber.slice(0, 4);

    const digitsNotVisibles = cardNumber.length - 4;
    let cardDigits = ""

    for (let i = 0; i < digitsNotVisibles; i++) {
      cardDigits += '*';
    }

    return card + ' ' + cardDigits.substring(0, 4) + ' ' + cardDigits.substring(4);
  }

  const handleClick = () => {
    setVisible(!visible)
  }
  
  return (
      <div className={cardType} data-tooltip={cardType}>
        <div className="brd-d-card-cn">
          <div>
            <div className='brd-d-card-number'>
              <p>{visible ? cardNumber : parseCardNumber(cardNumber)}</p>
              <span onClick={() => handleClick()}>
                {visible ? <UnvisibleIcon /> : <VisibleIcon />
                }
              </span>
            </div>
            <p>{cardExpires}</p>
          </div>

          <div>
            <img src="/icons-dash/brd-card.webp" alt="" />
          </div>
        </div>
      </div>
  );
};
