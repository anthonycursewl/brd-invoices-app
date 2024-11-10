// Styles
import './product-list.css'

import { useEffect, useState } from "react"
import { APP_URLS } from "../../../api/urls/url"
import { secureFetch } from "../../../shared/Services/secureFetch"

// Importanción de la interface Product
import { ProductType } from "../../../shared/Interfaces/Products" 
import { GetterType } from "../../../shared/Interfaces/Getter"

// import store de la app
import { useGlobalState } from '../../../store/useGlobalState'

export default function ProductList() {
    const [loading, setLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<ProductType[]>([])
    const [getterOptions, setGetterOptions] = useState<GetterType>({
        page: 1,
        limit: 10
    })

    const { signalReload } = useGlobalState()

    
    const getAllProducts = async () => {
        const { error, result } = await secureFetch(`${APP_URLS.GET_ALL_PRODUCTS}/${getterOptions.limit}/${getterOptions.page}`, 'GET', null, setLoading)

        if (error) {
            console.log(error)
        }

        if (result) {
            console.log(result.products)
            setProducts(result.products)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [signalReload])

    return (
        <div className='product-list-main'>
            {
            loading  ? <p>Loading...</p> : 
            products.map((product: ProductType) => (
                <div className='product-list-item' key={product.id}>

                    <div className='product-list-info'>
                        <div className='product-list-desc'>
                            <h3>ID</h3>
                        </div>
                        <div className='product-list-content'>
                            <p>{product.id}</p>
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
        </div>
    )
}