import { ContainerMain } from "../shared/components/ContainerMain/container-main"
import Navbar from "./navbar/navbar"
import DashMain from "./Dash-main/dash-main"
import { useEffect } from "react"

export default function Dashboard() {

    useEffect(() => {

        document.title = "TAJ Inside | Dashboard"
    }, [])  

    return (
        <ContainerMain backgroundColor={'transparent'}>
            <Navbar />

                <DashMain />
                          
        </ContainerMain>
    )
}