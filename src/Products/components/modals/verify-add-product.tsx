// @ts-nocheck
import './verify-add-product.css'
import { CloseModal } from '../../../assets/svgs/login/close-modal'
import '../../../ProtectedRoutes/components/LoadingSession.css'
import { useEffect } from 'react';

// import react portal 
import { useGlobalState } from '../../../store/useGlobalState';
import { createPortal } from 'react-dom';

interface VerifyAddProductProps {
    accept: () => void;
    name: string;
    description: string;
    unit: string;
    cost: string;
    date: string;
    loading?: boolean
}

export default function VerifyAddProduct({ accept, name, description, unit, cost, date, loading }: VerifyAddProductProps) {

    const { isOpenConfirm, setIsOpenConfirm } = useGlobalState() 

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
        setIsOpenConfirm(false)
    }

    const handleOpenModal = () => {
        setIsOpenConfirm(!isOpenConfirm)
    }

    return (
        createPortal(
            <div className={`v_product ${isOpenConfirm ? 'v_product_active' : ''}`}>
                <div className='v_product-content'>
                    WOLAAAAAAAAAAAAA
                </div>
            </div>,
            document.getElementById('modal-arroz')!
        )
    )
}