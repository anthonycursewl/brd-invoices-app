import './config.users.css'

// Componets
import Navbar from "../Dashboard/navbar/navbar"
import { ContainerMain } from "../shared/components/ContainerMain/container-main"
import SideMenu from "../shared/components/SideMenu/SideMenu"
import ModalDetails from './components/modal/modal-details'

// hooks and constans
import { useEffect, useState } from 'react'
import { secureFetch } from '../shared/Services/secureFetch'
import { API_URL } from '../Config/tajinside.config'

// Svgs importados
import IconConfig from '../assets/svgs/config/IconConfig'
import IconHeart from '../assets/svgs/config/IconHeart'

// Store
import { useGlobalState } from '../store/useGlobalState'

// Import CardSession Component
import CardSession from './components/sessions/card-session'
import IconSession from '../assets/svgs/config/IconSession'
import { useNavigate } from 'react-router-dom'

interface TypeSession {
    id: string;
    ip: string;
    device: string;
    created_at: string;
    id_user: string;
    token: string
}

interface TypeSessions {
    email: string;
    status: number;
    sessions: TypeSession
}

export default function ConfigUsers() {
    const [email, setEmail] = useState('')
    const [sessions, setSessions] = useState<TypeSessions[]>([])
    const [currentSession, setCurrentSession] = useState<TypeSession>()
    const { infoUser, signalReload, sendNewNotification, currentNotification } = useGlobalState()

    // Navigate to other pages
    // path: string e.g "/login"
    const nav = useNavigate()

    const getConfigData = async() => {
        const { error, result } = await secureFetch(`${API_URL}/users/sessions`, 'GET', null, () => {})
        if (error && error.status === 401) {
            sendNewNotification({
                type: 'error',
                message: error.message,
                title: 'Sesión caducada'
            }, currentNotification)

            nav('/login')
        }
        
        if (result) {
            setEmail(result.email)
            setSessions(result.sessions)
        }
    }
      

    useEffect(() => {
        getConfigData()
    }, [signalReload])
 
    return (
        <ContainerMain>
            <Navbar />

            <div className="main-config">
                <SideMenu />

                <div className="config-utils">

                    <div className='config-utils-title'>
                        <IconConfig />
                        <h1>Configuración</h1>
                    </div>

                    <div className='config-utils-content'>

                        <div className='config-utils-info-account'>
                            <div className='config-u-title'>
                                <IconHeart /> 
                                <h2>Información | <span className='config-info-user'> ID {infoUser.id}</span></h2>
                            </div>

                            <div className='config-utils-divider'>
                                <div className='config-personal-information'>
                                    <div className='config-p-title'>
                                        <p>Email personal</p>
                                    </div>
                                    
                                    <div className='config-p-content'>
                                        <p>{email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='config-utils-info-account'>
                            <div className='config-u-title'>
                                <IconSession /> 
                                <h2>Sesiones <span className='config-info-user'>Activas | {sessions.length}</span></h2>
                            </div>

                            <div className='config-utils-divider'>
                                <div className='config-personal-information'>

                                    <div className='config-current-sessions'>
                                        {sessions.map((s: any, index: number) => (
                                            <CardSession key={index} {...s} index={index} setCurrentSession={setCurrentSession}/>
                                        ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <ModalDetails s={currentSession ? currentSession : { id: '', ip: '', device: '', created_at: '', id_user: '', token: ''}}/>

        </ContainerMain>
    )
}