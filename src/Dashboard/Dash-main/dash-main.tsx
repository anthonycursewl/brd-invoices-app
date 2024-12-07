import './dash-main.css'
import SideMenu from '../../shared/components/SideMenu/SideMenu'
import { DashCard } from '../Dash-cards/dash.card'
import Tooltip from '../../shared/components/tips/Tooltip'
import DashSections from '../Dash-sections/dash-sections'

// SystemNotification import
import MainNotification from '../../shared/SystemNotification/main.notification'
import { CARD_TYPE } from '../../Config/tajinside.config'
import { useGlobalState } from '../../store/useGlobalState'

export default function DashMain() {
    
    const { infoUser } = useGlobalState()

    return (
        <section className='dash-main'>
            <SideMenu />
        
            <div className='dash-utils'>

                <div className='dash-utils-cn'>
                    <div className='dash-user-info'>
                        <img src="/icons-dash/user-img.svg" alt="User in the app" />
                        <h1>Bienvenido <span className='brd-username-color'>{infoUser.name.split(' ')[0]} {infoUser.name.split(' ')[2]}</span></h1>
                    </div>
                    
                    <div className='dash-info-user-account'>
                        <p>Te encuentras en tu cuenta, para poder registrar facturas y generar facturas tienes que verificar tu cuenta.</p>
                    </div>
                </div>

                <div className='dash-cards'>
                    <Tooltip tooltipText='Tarjeta BRD-S Click para ver más'>
                        <DashCard cardExpires='10/23' cardNumber={crypto.randomUUID().split('-')[0]} cardType={CARD_TYPE.REPOSITORY.SIZE.SMALL.BRD_GOLD} size='small'/>
                    </Tooltip>
                    <Tooltip tooltipText='Tarjeta BRD-S Click para ver más'>
                        <DashCard cardExpires='10/23' cardNumber={crypto.randomUUID().split('-')[0]} cardType={CARD_TYPE.REPOSITORY.SIZE.SMALL.BRD_BLACK} size='small'/>
                    </Tooltip>
                </div>

                <DashSections />


                <MainNotification />
            </div>
        </section>
    )
}   