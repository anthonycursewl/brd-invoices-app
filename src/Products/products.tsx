import { ContainerMain } from "../shared/components/ContainerMain/container-main"
import Navbar from "../Dashboard/navbar/navbar"
import ProductsMain from "./components/products-main"

export default function Products() {
    return (
        <ContainerMain>
            <Navbar />

            <ProductsMain />
        </ContainerMain>
    )
}