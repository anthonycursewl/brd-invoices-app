import './SideMenu.css'
import Option from './comp/option'

// Importando los SVGs que se están construyendo desde el apartado de los assets
// Solo se usan los SVGs que tengan relación con ambos temas
import WorkSpaceIcon from '../../../assets/svgs/workspace-icon'
import AccountIcon from '../../../assets/svgs/account-icon'
import IconDash, { IconProducts } from '../../../assets/svgs/dashboard/icon-dash'
import { IconCards } from '../../../assets/svgs/dashboard/icon-dash'
import { IconList } from '../../../assets/svgs/dashboard/icon-dash'

export default function SideMenu() {

    return (
        <div className={`side-menu`}>
            <div className='side-menu-all'>

                <div className='side-menu-item'>
                    <div className='side-menu-titles'>
                        <WorkSpaceIcon /> 
                        <p>Workplace</p>
                    </div>  

                    <div className='side-menu-subtitles'>
                        <Option path='/dashboard'>
                            <IconDash />
                            Dashboard
                        </Option>
                        <Option path='/dashboard/payments'>
                            <IconList />
                            Pagos
                        </Option>
                        <Option path='/dashboard/cards'>
                            <IconCards />
                            Repositories BRD-S
                        </Option>
                        <Option path='/dashboard/products/add'>
                            <IconProducts />
                            Productos / Servicios
                        </Option>
                    </div>
                </div>

                <div className='side-menu-item'>
                    <div className='side-menu-titles'>
                        <AccountIcon /> 
                        <p>Cuenta</p>
                    </div>

                    <div className='side-menu-subtitles'>
                        <Option>
                            <IconDash />
                            Perfil
                        </Option>
                        <Option>
                            <IconList />
                            Configuración
                        </Option>
                    </div>
                </div>
            </div>
        </div>
    )
}