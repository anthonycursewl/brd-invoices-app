import { useGlobalState } from '../../../store/useGlobalState';
import './modal-qr-barcode.css'
import { createPortal } from "react-dom";

// Generate a QRCode lib
import { BakeryQrcode } from '@barcode-bakery/barcode-react/qrcode' 
import { BakeryCode128 } from '@barcode-bakery/barcode-react/1d' 
import { BakeryColor } from '@barcode-bakery/barcode-react'

// Import SVGs Share, download, close 
import IconShare from '../../../assets/svgs/products/icon-share';
import { IconClose } from '../../../assets/svgs/products/icon-share';
import { IconDownload } from '../../../assets/svgs/products/icon-share';
import IconScan from '../../../assets/svgs/products/icon-scan';
import IconCopy from '../../../assets/svgs/products/icon-copy';

// copiar al portapapeles
import { copyToClipPaper } from '../../Services/copyToClipPaper';

interface ModalQrBarcodeProps {
    info: {
        id: string
        desc: string,
        type: string
    } 
}

export default function ModalQrBarcode({ info }: ModalQrBarcodeProps) {
    const { modalQrBarcode, setModalQrBarcode } = useGlobalState()
    const colorGray = new BakeryColor(255, 255, 255)
    const foregroundColor = new BakeryColor(5, 5, 5)

    return (
        createPortal(
            <div className={`m-qr-barcode ${modalQrBarcode ? 'm-qr-barcode-active' : ''}`}>
                
                <div className={`m-qr-barcode-cn ${modalQrBarcode ? 'm-qr-barcode-cn-active' : ''}`}>
                    
                    <div>
                        <p>{info.desc} | {info.id}</p>
                    </div>

                    <div className='m-qr-barcode-info'>
                        <IconScan />
                        <p>Escanea el {info.type === 'qrcode' ? 'código QR' : 'código de barras'} para ver su ID</p>
                    </div>

                        {
                            info.type === 'qrcode' &&
                            <>
                                <div style={{ backgroundColor: 'white', padding: '.5rem .5rem 0rem .5rem' }}>
                                <BakeryQrcode text={info?.id} scale={8} quietZone={false} backgroundColor={colorGray} foregroundColor={foregroundColor} />
                                </div>
                            </>
                        }

                        {
                        info.type === 'code128' &&
                            <div style={{ backgroundColor: 'white', padding: '.5rem .5rem 0rem .5rem' }}>
                                <BakeryCode128 text={info?.id} scale={2} />
                            </div>
                        }

                    <div className='m-qr-barcode-options'>
                        <button onClick={() => setModalQrBarcode(false)}>
                            <IconClose />
                        </button>

                        <button>
                            <IconShare />
                        </button>

                        <button onClick={() => copyToClipPaper(info?.id)}>
                            <IconCopy />
                        </button>

                        <button>
                            <IconDownload />
                        </button>
                    </div>

                </div>

            </div>,
            document.getElementById('modal-qr-barcode')!
        )
    )
}