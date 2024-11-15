// Styles
import './product-list.css'

import { useEffect, useState } from "react"
import { APP_URLS } from "../../../api/urls/url"
import { secureFetch } from "../../../shared/Services/secureFetch"

// Importanción de la interface Product
import { ProductType } from "../../../shared/Interfaces/Products" 
import { GetterType } from "../../../shared/Interfaces/Getter"
import { InfoQrBarcodeType } from '../../../shared/Interfaces/InfoQrBarcode'

// import store de la app
import { useGlobalState } from '../../../store/useGlobalState'

// Svgs icons de la app
import LoadMoreProducts from '../../../assets/svgs/products/load-more-products'
import IconQr from '../../../assets/svgs/products/icon-qr'
import { IconBarCode } from '../../../assets/svgs/products/icon-qr'

// Import del ModalQrBarcode
import ModalQrBarcode from '../../../shared/Modal/modal-qr-barcode/modal-qr-barcode'


export default function ProductList() {
    const [loading, setLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<ProductType[]>([])
    // @ts-ignore
    const [getterOptions, setGetterOptions] = useState<GetterType>({
        page: 1,
        limit: 10
    })
    const [infoQr, setInfoQr] = useState<InfoQrBarcodeType>()
    
    // @ts-ignore
    const { signalReload, setModalQrBarcode, setIsNotification, isNotification, setCurrentNotification, currentNotification, sendNewNotification } = useGlobalState()

    
    const getAllProducts = async () => {
        const { error, result } = await secureFetch(`${APP_URLS.GET_ALL_PRODUCTS}/${getterOptions.limit}/${getterOptions.page}`, 'GET', null, setLoading)

        if (error) {
            console.log(error)
        }

        if (result) {
            setProducts(result.products)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [signalReload])


    const handleSetInfoQr = (info: InfoQrBarcodeType) => {
        setInfoQr(info)
        setModalQrBarcode(true)
    }

    return (
        <div className='product-list-main'>
            {
            loading  ? <p>Loading...</p> : 
            products?.slice(0, 4).map((product: ProductType) => (
                <div className='product-list-item' key={product.id}>

                    <div className='product-list-info'>
                        <div className='product-list-id'>
                            <h3>ID</h3>

                            <div className='p-id-qr' onClick={() => handleSetInfoQr({ id: product.id, desc: product.description, type: 'qrcode' })}>
                                <IconQr />
                            </div>

                            <div className='p-id-qr' onClick={() => handleSetInfoQr({ id: product.id, desc: product.description, type: 'code128' })}>
                                <IconBarCode />
                            </div>
                        </div>
                        <div className='product-list-content'>
                            <p className='p-id'>{product.id}</p>
                        </div>
                    </div>

                    <div className='product-list-info'>
                        <div className='product-list-desc'>
                            <h3>Desc</h3>
                        </div>
                        <div className='product-list-content'>
                            <p>{product.description}</p>
                        </div>
                    </div>

                    <div className='product-list-info'>
                        <div className='product-list-desc'>
                            <h3>Precio Unit</h3>
                        </div>
                        <div className='product-list-content'>
                            <p>{product.u_price}</p>
                        </div>
                    </div>

                    <div className='product-list-info'>
                        <div className='product-list-desc'>
                            <h3>Unidad de Medida</h3>
                        </div>
                        <div className='product-list-content'>
                            <p>{product.type_unit}</p>
                        </div>
                    </div>

                    <div className='product-list-info'>
                        <div className='product-list-desc'>
                            <h3>Fecha Creación</h3>
                        </div>
                        <div className='product-list-content'>
                            <p>{product.created_at.slice(0, 10)}</p>
                        </div>
                    </div>

                    <div className='product-list-info'>
                        <div className='product-list-desc'>
                            <h3>Fecha Actualización</h3>
                        </div>
                        <div className='product-list-content'>
                            <p>{product.updated_at === product.created_at ? 'Sin actualizar' : product.updated_at.slice(0, 10)}</p>
                        </div>
                    </div>
                </div>
            ))
            }

            <ModalQrBarcode info={infoQr ? infoQr : { id: '', desc: '', type: ''}} />

            {
                products.length > 4 ? (
                    <div className='product-list-more' onClick={() => {
                        sendNewNotification({ type: 'success', message: 'Cargando...', title: 'Productos' }, currentNotification)
                    }}>
                        <p>
                        <LoadMoreProducts />
                        Ver más
                        </p>
                    </div>
                ) : loading == true ? null : products.length === 0 ? (
                    <div className='product-list-empty'>
                        <p>No hay productos</p>
                    </div>
                ) : null
            }
        </div>
    )
}