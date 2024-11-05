import './ModalWarn.css'
import { CloseModal, ErrorIcon, SuccessIcon, WarningIcon } from '../../../assets/svgs/login/close-modal'

interface ModalWarnProps {
    options: any
    setOptions: any
}

export default function ModalWarn({ setOptions, options }: ModalWarnProps) {
    const handleState = () => {
        setOptions({ state: false, type: options.type })
        console.log('handleState')
    }
    
    return (
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

            </div>
        </div>
    )
}