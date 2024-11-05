import { useState } from "react";
import "./modal-currency.css";

interface Currency {
    children: React.ReactNode;
    setCurrency: (currency: any) => void;
}

export default function ModalCurrency({ children, setCurrency }: Currency) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const currencys = [
    {
      name: "USD",
      img: "/flags/currency-usd.png",
      value: "",
    },
    {
      name: "BS",
      img: "/flags/currency-bs.png",
      value: "",
    },
    {
      name: "COP",
      img: "/flags/currency-cop.png",
      value: "",
    },
    {
        name: "EUR",
        img: "/flags/currency-eur.png",
        value: "",
    }
  ]

  return (
    <div className="modal-currency" onClick={toggleModal}>
      {children}
      <div
        className={`modal-currency-cn ${
          isOpen ? "modal-currency-cn-active" : ""}`}>

        <div className="all-flags">
          {currencys.map((currency, index) => (
            <div className="item-flag" key={index} onClick={() => {
                setCurrency(currency)
            }}>
              <img src={currency.img} alt={currency.name} />
              <p>{currency.name}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
