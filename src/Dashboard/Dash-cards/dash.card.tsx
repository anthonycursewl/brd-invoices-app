import './dash.card.css'
import VisibleIcon, { UnvisibleIcon } from '../../assets/svgs/visible-icon';
import { useState } from 'react';

interface DashCardProps {
    cardNumber: string;
    cardExpires: string;
    cardType: string;
    size: string
}

export const DashCard = ({ cardNumber, cardExpires, cardType, size = 'normal' }: DashCardProps) => {
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
              <p>{visible ? size == 'normal' ? cardNumber : cardNumber.slice(0, 9) : size == 'normal' ? parseCardNumber(cardNumber) : parseCardNumber(cardNumber).slice(0, 9)}</p>

              <span onClick={() => handleClick()} className='brd-d-card-weedo'>
                {visible ? <UnvisibleIcon /> : <VisibleIcon />
                }
              </span>

            </div>
            <p >{cardExpires}</p>
          </div>

          <div>
            <img style={{ width: size === 'normal' ? '35px' : '28px' }} src="https://www.breadriuss.com/logo_recortado.png" alt="Breadriuss Logo in the card" />
          </div>
        </div>
      </div>
  );
};
