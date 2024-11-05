import Navbar from "../Dashboard/navbar/navbar"
import { ContainerMain } from "../shared/components/ContainerMain/container-main"
import PaymentsMain from "./components/payments-main"

export default function Payments() {
    return (
        <>
            <ContainerMain> 
                <Navbar />

                <PaymentsMain />
            </ContainerMain>
        </>
    )
}