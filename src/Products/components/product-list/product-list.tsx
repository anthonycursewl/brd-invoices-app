// Styles
import './product-list.css'

import { useEffect, useState } from "react"
import { APP_URLS } from "../../../api/urls/url"
import { secureFetch } from "../../../shared/Services/secureFetch"

// Importanción de la interface Product
import { ProductType } from "../../../shared/Interfaces/Products" 
import { GetterType } from "../../../shared/Interfaces/Getter"

export default function ProductList() {
    const [loading, setLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<ProductType[]>([])
    const [getterOptions, setGetterOptions] = useState<GetterType>({
        page: 1,
        limit: 10
    })
    
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
    }, [])

    return (
        <div className='product-list-main'>
            {
            loading  ? <p>Loading...</p> : 
            products.map((product: ProductType) => (
                <div key={product.id}>
                    <p>
                        {product.description}
                    </p>
                </div>
            ))
            }
        </div>
    )
}