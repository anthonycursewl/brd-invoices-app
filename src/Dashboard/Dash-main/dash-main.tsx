import './dash-main.css'
import SideMenu from '../../shared/components/SideMenu/SideMenu'
import { DashCard } from '../Dash-cards/dash.card'
import Tooltip from '../../shared/components/tips/Tooltip'
import DashSections from '../Dash-sections/dash-sections'

// SystemNotification import
import MainNotification from '../../shared/SystemNotification/main.notification'

export default function DashMain() {
    
    const username = localStorage.getItem('username')

    return (
        <section className='dash-main'>
            <SideMenu />
        
            <div className='dash-utils'>

                <div className='dash-utils-cn'>
                    <div className='dash-user-info'>
                        <img src="/icons-dash/user-img.svg" alt="User in the app" />
                        <h1>Bienvenido {username}</h1>
                    </div>
                    
                    <div className='dash-info-user-account'>
                        <p>Te encuentras en tu cuenta, para poder registrar facturas y generar facturas tienes que verificar tu cuenta.</p>
                    </div>
                </div>

                <div className='dash-cards'>
                    <Tooltip tooltipText='Tarjeta BRD-S Click para ver más'>
                        <DashCard cardExpires='10/23' cardNumber='1234 1234 1234 1234' cardType='brd-d-card-gold'/>
                    </Tooltip>
                    <Tooltip tooltipText='Tarjeta BRD-S Click para ver más'>
                        <DashCard cardExpires='10/23' cardNumber='1234 1234 1234 1234' cardType='brd-d-card-black'/>
                    </Tooltip>
                </div>

                <DashSections />


                <MainNotification />
            </div>
        </section>
    )
}   