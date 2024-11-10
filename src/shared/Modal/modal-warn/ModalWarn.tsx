import './ModalWarn.css'
import { createPortal } from 'react-dom'
import { CloseModal, ErrorIcon, SuccessIcon, WarningIcon } from '../../../assets/svgs/login/close-modal'
import { ModalWarnProps } from '../../Interfaces/ModalWarnProps'

export default function ModalWarn({ options, setOptions }: ModalWarnProps) {
    const handleState = () => {
        setOptions({ state: false })
    }
    
    return (
        createPortal(
        <div className={`m_warn ${options.state ? 'm_warn_active' : ''}`}>
            <div className={`m_warn_cn ${options.state ? 'm_warn_cn_active' : ''}`}>
                
                <div className='m_warn_gradient'>
                    <div className='m_warn_gradient_cn'>
                    </div>
                </div>

                <div className='m_warn_text'>
                    {options.type === 'success' ? <SuccessIcon /> : options.type === 'error' ? <ErrorIcon /> : <WarningIcon />}
                    <span onClick={handleState}>
                        <CloseModal />
                    </span>
                </div>

                <div className={`m_warn_text_2 ${options.state ? 'm_warn_text_2_active' : ''}`}>
                    <p>{options.text}</p>
                </div>

                {
                    options.type === 'warning' ? (
                        <div className={`m_warn_text_3 ${options.state ? 'm_warn_text_3_active' : ''}`} onClick={handleState}>
                            <p>Continuar</p>
                        </div>
                    ) : null
                }

            </div>
        </div>,
        document.getElementById('modal-root')!
        )
    )
}