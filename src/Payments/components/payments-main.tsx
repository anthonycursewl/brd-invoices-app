import './payments-main.css'

// Hooks 
import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../shared/Services/useFetch";

// Componentes
import SideMenu from "../../shared/components/SideMenu/SideMenu";
import ModalWarn from "../../shared/Modal/modal-warn/ModalWarn";
import ModalCurrency from "./modal/modal-currency";
import PaymentDetailList from "./list/payment-detail-list";
import ModalListOptions from "./modal/modal-options";

// Assets importados
import { AddPayment } from "../../assets/svgs/payments/add-payment";

interface Currency {
    img: string;
    name: string;
    value: string;
}

export interface Product {
    desc: string;
    quantity: number;
    cost_u: number;
    currency: Currency;
}


export default function PaymentsMain() {
  const [products, setProducts] = useState<Product[]>([]);
  const productFormRef = useRef(null);

  const [options, setOptions] = useState({ state: false, text: '', type: "success" });
  const [loading, setLoading] = useState(false);

  const [bcvPrice, setBcvPrice] = useState<any>();
  const [currency, setCurrency] = useState<Currency>({ img: "", name: "", value: "" });
  // @ts-ignore
  const [currencies, setCurrencies] = useState<string[]>(['USD', 'BS', 'COP', 'EUR']);
  
  const handleAddProduct = (e: any) => {
    e.preventDefault();

    if (!productFormRef.current) {
      return
    }

    const formData = productFormRef.current as HTMLFormElement;
    const elements = formData.elements as any;

    if (!elements.desc.value || !elements.quantity.value || !elements.cost_u.value || !currency.name) {
      setOptions({ state: true, text: "Todos los campos son obligatorios para agregar un producto.", type: 'warning' })
      return
    }

    if (elements.desc.value.length > 100) {
      setOptions({ state: true, text: "Los campos no pueden superar los 100 caracteres", type: 'warning' })
      return
    }

    if (elements.cost_u.value <= 0 || elements.quantity.value <= 0) {
      setOptions({ state: true, text: "Los campos no pueden ser negativos o nulos. Intenta de nuevo!", type: 'Error' })
      return
    }

    if (products.find((product) => product.desc === elements.desc.value)) {
      setOptions({ state: true, text: "Este producto ya se encuentra en la lista!. Intenta de nuevo.", type: 'warning' })
      return
    }

    if (isNaN(elements.cost_u.value) || isNaN(elements.quantity.value)) {
      setOptions({ state: true, text: "Los campos deben ser numéricos. Intenta de nuevo!", type: 'Error' })
      return
    }

    const newProduct = {
      desc: elements.desc.value,
      quantity: elements.quantity.value,
      cost_u: elements.cost_u.value,
      currency: currency
    }

    setProducts([...products, newProduct]);

    formData.reset();
    setOptions({ state: false, text: '', type: "" })
  };

  const dollarCurrencyBDV = async () => {
    const { result, error } = await useFetch('https://pydolarve.org/api/v1/dollar', 'GET', null, setLoading)

    if (result) {
      setBcvPrice(result.monitors.bcv)
    }

    if (error) {
      console.log(error)
    }
  }

  const getTotal = (currency: string) => {
    
    if (currencies.includes(currency)) {
      let total = 0;
      const totalNumber = products.filter((p) => p.currency.name === currency)
      totalNumber.forEach((p) => {
        total += p.cost_u * p.quantity
      })
      return parseNumber(total)
    }

    return false
  }

  const deleteItem = (desc: string) => {
    setProducts(products.filter((product) => product.desc !== desc))
    setOptions({ state: false, text: '', type: "" })
  }

  function parseNumber(numero: number): string {
    const newNumber = Number(numero)
    const partes = newNumber.toFixed(2).split('.');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return partes.join(','); 
  }


  useEffect (() => {
    dollarCurrencyBDV()
  }, [])

  return (
    <>
    <section className="payments-main">
      <SideMenu />

      <div className="payments-utils">
            <div className="payments-utils-title">
                <h1>Registro de Pagos | Dolar BCV {loading ? "--" : bcvPrice?.price}</h1>
            </div>

            <div className="payments-options-form">
                <p>Ingresa los datos de tu pago</p>

                <div className='payments-options-btn-generate'>
                  <button className='p-generate-invoice'>
                    <img src="/payments/generate-invoice.svg" alt="SVG Generar Factura" />
                    Generar Factura
                  </button>
                </div>
            </div>

            <form className="payments-options" ref={productFormRef} onSubmit={(e) => {handleAddProduct(e)}}>
              <div className="payments-in-p">
                <label>Desc. Producto/Servicio</label>
                <input type="text" placeholder="Paquete/producto a registrar..." name="desc" id="desc"/>
              </div>

              <div className="payments-in-p">
                <label>Cantidad</label>
                <input type="text" placeholder="100" name="quantity" id="quantity"/>
              </div>

              <div className="payments-in-p-2">

                <div>
                  <label>Costo Unitario</label>
                  <input placeholder="1.000,00" name="cost_u" id="cost_u"/>
                </div>

                <ModalCurrency setCurrency={setCurrency}>
                  <div>
                    <label>Tipo de Moneda</label>
                    <div className="type-currency">
                      <div className="type-currency-img">
                        <img src={currency.img || "/flags/currency-usd.png"} alt="" />
                        <p>{currency.name || "USD"}</p>
                      </div>
                    </div>
                  </div>
                </ModalCurrency>

              </div>

              <div className="payments-button">
                <button>
                  <AddPayment />
                  Agregar
                </button>
              </div>
            </form>

            <div className="p-product-list">
                <div className="payments-products-titles">
                  <div className="p-index">
                    <p>#</p>
                  </div>
                  <div>
                    <p>Desc. Producto/Servicio</p>
                  </div>
                  <div>
                    <p>Cantidad</p>
                  </div>
                  <div>
                    <p>Costo Unitario</p>
                  </div>
                  <div>
                    <p>Tipo de Moneda</p>
                  </div>
                  <div>
                    <p>Total</p>
                  </div>
                </div>
                
                {products.map((product: Product, index) => (
                  <ModalListOptions deleteItem={deleteItem} key={product.desc} product={product}>
                    <PaymentDetailList product={product} index={index} parseNumber={parseNumber}/>
                  </ModalListOptions>
                ))}

                <div className="payments-total">
                  {
                    currencies.map((c) => (
                      <div key={c} className="payments-tl-img">
                        <img src={`/flags/currency-${c.toLocaleLowerCase()}.png`}/>
                        <p>Total {c}: ${getTotal(c)}</p>
                      </div>
                    ))
                  }
                </div>
            </div>

      </div>

      <ModalWarn setOptions={setOptions} options={options}/>
    </section>

    </>
  );
}
