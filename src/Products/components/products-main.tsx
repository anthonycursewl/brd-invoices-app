import './products-main.css'
import '../../ProtectedRoutes/components/LoadingSession.css'
import React, { useRef, useState } from "react"

import SideMenu from "../../shared/components/SideMenu/SideMenu"

import { IconProductAdd } from "../../assets/svgs/dashboard/icon-dash"
import { AddPayment } from "../../assets/svgs/payments/add-payment"

// Importaciónd de la fecha
import { brd_Date } from "../../Config/tajinside.config"
import { generateIdInteger } from '../../shared/Services/generateIdInterger'

// Componentes shared 
import ModalWarn from '../../shared/Modal/modal-warn/ModalWarn'
import VerifyAddProduct from './modals/verify-add-product'
import { secureFetch } from '../../shared/Services/secureFetch'
import { APP_URLS } from '../../api/urls/url'

export default function ProductsMain() {
    const productFormRef = useRef<HTMLFormElement>(null)
    const [formData, setFormData] = useState({
        desc: '',
        quantity: '',
        cost_u: ''
    })
    
    // Options para controlar el comportamiento del modal
    const [options, setOptions] = useState({
        state: false,
        text: '',
        type: 'success'
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const handleFormSubmit = async () => {

        if (formData.desc === '' || formData.quantity === '' || formData.cost_u === '') {
            console.log('Todos los campos son obligatorios')
            setOptions({ state: true, text: "Todos los campos son obligatorios", type: 'warning' })
            return
        }

        if (formData.desc.length > 255 || formData.quantity.length > 50) {
            setOptions({ state: true, text: "Los campos no pueden superar los 100 caracteres", type: 'warning' })
            return
        }

        if (parseInt(formData.cost_u) <= 0) {
            setOptions({ state: true, text: "Los campos no pueden ser negativos o nulos. Intenta de nuevo!", type: 'Error' })
            return
        }

        if (isNaN(parseFloat(formData.cost_u))) {
            setOptions({ state: true, text: "El campo tiene que ser un entero o decimal! Intenta de nuevo!", type: 'Error' })
            return 
        }

        setIsOpen(true)

        if (isOpen) {
            const { error, result } = await secureFetch(APP_URLS.CREATE_PRODUCT, 'POST', {
                id: generateIdInteger(3).toString(),
                description: formData.desc,
                u_price: formData.cost_u,
                type_unit: formData.quantity,
                created_at: brd_Date.toISOString(),
                updated_at: brd_Date.toISOString()
            }, setLoading)
            
            if (error) {
                setIsOpen(false)
                setOptions({ state: true, text: error, type: 'error' })
                return
            }
            
            setIsOpen(false)
            setOptions({ state: true, text: result?.message, type: 'success' })
            
            setFormData({   
                desc: '',
                quantity: '',
                cost_u: ''
            })
        }
    }

    return (
    <>
        <section className="products-main">
            <SideMenu />

            <div className="products-utils">
                <div className="products-utils-title">
                    <IconProductAdd />
                    <h1>Registro de Productos / Servicios</h1>
                </div>

                <div className="products-options-form">
                    <p>Ingresa los datos del producto/servicio a registrar</p>

                    <div>
                        <button className='p-generate-invoice'>
                            <img src="/payments/generate-invoice.svg" alt="SVG Generar Factura" />
                            Generar Factura
                        </button>
                    </div>
                </div>

                <div className='products-note'>
                    <p>
                        Nota: Si el producto/servicio no tiene unidad de medida puede optar por colocar un valor como "--"
                    </p>
                </div>

                <form className="product-options" ref={productFormRef} onSubmit={(e) => {
                    e.preventDefault()
                    handleFormSubmit()
                    }}>
                    <div className="products-in-p">
                        <label>Desc. Producto/Servicio</label>
                        <input type="text" 
                        placeholder="Paquete/producto a registrar..." 
                        name="desc" 
                        id="desc"
                        value={formData.desc}
                        onChange={handleChangeInput}
                        />
                    </div>

                    <div className="products-in-p">
                        <label>Unidad de Medida</label>
                        <input 
                        type="text" 
                        placeholder="Kg..." 
                        name="quantity" 
                        id="quantity"
                        value={formData.quantity}
                        onChange={handleChangeInput}
                        />
                    </div>

                    <div className="products-in-p-2">
                        <div>
                            <label>Costo Unitario</label>
                            <input 
                            placeholder="1.000,00" 
                            name="cost_u" 
                            id="cost_u"
                            value={formData.cost_u}
                            onChange={handleChangeInput}
                            />
                        </div>
                    </div>

                    <div className="products-in-p-2">
                        <div>
                            <label>Fecha Creación</label>
                            <input placeholder={`${brd_Date.toLocaleDateString()}`} readOnly name="date" id="date"/>
                        </div>
                    </div>

                    <div className="products-button">
                        {
                        loading ? <div className='taj-brd-spinner'></div> :
                            <button>
                            <AddPayment />
                            Registrar
                        </button>
                        }
                    </div>
                </form>

            </div>
        </section>

        <VerifyAddProduct setIsOpen={setIsOpen} isOpen={isOpen} accept={handleFormSubmit} name={formData.desc} description={formData.desc} unit={formData.quantity} cost={formData.cost_u} date={brd_Date.toISOString().slice(0,10)} 
        loading={loading}
        />
        <ModalWarn options={options} setOptions={setOptions} />
    </>
    )
}