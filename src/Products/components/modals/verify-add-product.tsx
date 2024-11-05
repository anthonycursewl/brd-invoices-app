import './verify-add-product.css'
import { CloseModal } from '../../../assets/svgs/login/close-modal'
import '../../../ProtectedRoutes/components/LoadingSession.css'
import { useEffect } from 'react';

interface VerifyAddProductProps {
    setIsOpen: (value: boolean) => void;
    isOpen: boolean;
    accept: () => void;
    name: string;
    description: string;
    unit: string;
    cost: string;
    date: string;
    loading?: boolean
}
export default function VerifyAddProduct({ setIsOpen, isOpen, accept, name, description, unit, cost, date, loading }: VerifyAddProductProps) {

    useEffect(() => { 
        const handleKeyDown = (event: KeyboardEvent) => { 
        if (event.key === 'Escape') { 
             whenCloseModal(); 
        } 
    }; 
    
    window.addEventListener('keydown', handleKeyDown);  
    return () => { 
        window.removeEventListener('keydown', handleKeyDown)
    }; 
}, []); 
    
    
    const whenCloseModal = () => { 
        setIsOpen(false)
    }

    const handleOpenModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={`v_product ${isOpen ? 'v_product_acitve' : ''}`}>
            <div className={`v_product_content ${isOpen ? 'v_product_content_acitve' : ''}`}>
                
                <div className='v_product_title'>
                    <p>
                        Confirmación | {name}
                    </p>

                    <div className='v_close_modal'>
                        <span onClick={handleOpenModal}>
                            <CloseModal />
                        </span>
                    </div>
                </div>

                <div className='v_product_info'> 
                    <div className='v_product_info_group'>
                        <div className='v_product_info_title'>
                            <h2>Desc. del Producto / Servicio</h2>
                            <p>{description}</p>
                        </div>

                        <div className='v_product_info_title'>
                            <h2>Unidad de Medida</h2>
                            <p>{unit}</p>
                        </div>
                    </div>

                    <div className='v_product_info_group'>
                        <div className='v_product_info_title'>
                            <h2>Costo Unitario</h2>
                            <p>{cost.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Bs"}</p>
                        </div>

                        <div className='v_product_info_title'>
                            <h2>Fecha de Creación</h2>
                            <p>{date}</p>
                        </div>
                    </div>

                    <div className='v_product_note'>
                        <p>Nota: Todos los productos registrados podrán verse reflejados en el apartado de Productos en esta misma sección.</p>
                    </div>

                    <div className='v_product_buttons_group'>
                        {
                        loading ? <div className='taj-brd-spinner'></div> :
                        <>
                            <button onClick={() => accept()}>
                            Confirmar
                            </button>
                            <button onClick={() => handleOpenModal()}>
                                Cancelar
                            </button>
                        </>
                        }
                    </div>

                </div>
                
            </div>
        </div>
    )
}