import './brd-r.css'

// Components shared
import { ContainerMain } from '../shared/components/ContainerMain/container-main'
import SideMenu from '../shared/components/SideMenu/SideMenu'
import Navbar from '../Dashboard/navbar/navbar'
import { DashCard } from '../Dashboard/Dash-cards/dash.card'
import SelectTypeRepo from './components/NewTypeRepo/SelectTypeRepo'

// SVGS
import IconRepositories from '../assets/svgs/brd-r/IconRepositories'

// Constants
import { CARD_TYPE } from '../Config/tajinside.config'
import IconIDK, { IconBooks, IconMoneyRepo, IconSecurityRepo } from '../assets/svgs/brd-r/IconIDK'
import WorkSpaceIcon from '../assets/svgs/workspace-icon'
import React, { useRef, useState} from 'react'

// import constant date
import { brd_Date } from '../Config/tajinside.config'
import { useGlobalState } from '../store/useGlobalState'

// Interfaces
import { TypeRepo } from '../shared/Interfaces/TypesRepo'

interface TypeFilterRepo {
    name: string;
}

export default function BrdR() {
    const formRepoRef = useRef<HTMLFormElement>(null)
    const { sendNewNotification, currentNotification } = useGlobalState()

    // Type of repository
    // @ts-ignore
    const [typeRepo, setTypeRepo] = useState<TypeFilterRepo>()
    const [isOpenTypeRepo, setIsOpenTypeRepo] = useState<boolean>(false)

    const [typesRepo, setTypesRepo] = useState<TypeRepo>()

    const handleFormRepoSumbit = (e: React.FormEvent) => {
        e.preventDefault();

        const { repo_name, security_code } = formRepoRef.current as HTMLFormElement;

        if (repo_name.value?.trim().length == 0 || security_code.value?.trim().length == 0) {
            sendNewNotification({
                title: "Error | Repositorio",
                message: "¡Todos los campos son obligatorios!",
                type: "error"
            }, currentNotification)
            return 
        }

    }

    const handleOpenTypeRepo = () => {
        setIsOpenTypeRepo(!isOpenTypeRepo)
    }

    return (
        <ContainerMain>
            <Navbar />

            <div className='brd-r-utils'>
                <SideMenu />

                <div className='brd-r-utils-cn'>
                    <div className='brd-r-utils-title'>
                        <IconRepositories />
                        <h1>BRD-R | <span className='brd-r-color'>Repositorios</span></h1>
                    </div>

                    <div className='brd-r-introduce-repositories'>
                        <div className='brd-r-preview'>

                            <div className='brd-r-preview-repos'>
                                <div className='brd-r-control-cat'>
                                    <IconIDK />
                                </div>
                                <div className='brd-r-control-cat-2'>
                                    <IconMoneyRepo />
                                </div>
                                <div className='brd-r-control-cat-3'>
                                    <IconBooks />
                                </div>
                                <div className='brd-r-control-cat-4'>
                                    <IconSecurityRepo />
                                </div>
                                <DashCard cardNumber={"E-210db7c8"} cardExpires='00/00' cardType={CARD_TYPE.REPOSITORY.SIZE.SMALL.BRD_BLACK} size='small' />
                                <DashCard cardNumber={"E-ec7f0e53"} cardExpires='00/00' cardType={CARD_TYPE.REPOSITORY.SIZE.SMALL.BRD_GOLD} size='small'/>
                            </div>

                        </div>

                        <div className='brd-r-title-center'>
                            <div className='brd-r-title'>
                                <h2>¿Que son los repositorios?</h2>
                                <p>Los repositorios son una forma de separar los pagos de las 
                                    facturas que haces para tus clientes, 
                                    y así poder seperar todos tus ingresos dependiendo el ámbito.
                                </p>
                                <div className='brd-r-shadow'></div>
                                <div className='brd-r-shadow-2'></div>
                            </div>

                            <div className='brd-r-title-extra'>
                                <p>Puedes crear un repositorio para cada entidad que tengas. Ya sea una empresa, un proyecto personal, etc.</p>
                            </div>
                        </div>

                        <div className='brd-r-create'>
                            <div className='brd-r-create-title'>
                                <WorkSpaceIcon />
                                <h2>Crea un <span className='brd-r-color'>repositorio!</span></h2>
                            </div>

                            <form ref={formRepoRef} onSubmit={handleFormRepoSumbit}>
                                <div className='form-repo-grid'>

                                    <div className='form-repo-group'>
                                        <div className='form-repo-input'>
                                            <label>Nombre del repositorio</label>
                                            <input type="text" placeholder='Mi repositorio' id='repo_name' name='repo_name'/>
                                        </div>

                                        <div className='form-repo-input'>
                                            <label>Código de segurirdad</label>
                                            <input type="number" placeholder='0000' security='true' id='security_code' name='security_code'/>
                                        </div>

                                        <div className='form-repo-input'>
                                            <label>Fecha de creación</label>
                                            <span className='brd-r-date'>{brd_Date.toLocaleString()}</span>
                                        </div>

                                        <div className='form-repo-input'>
                                            <label>Tipo de Repositorio</label>
                                            <div className='brd-r-repo-type' onClick={() => handleOpenTypeRepo()}>
                                                <p>{typesRepo?.typeSelected}</p>
                                            </div>
                                        </div>

                                        <div className='form-repo-button'>
                                            <button>Crear</button>
                                        </div>
                                    </div>

                                    <div className='brd-r-repo-all-info'>
                                        <div className='brd-r-repo-info'>
                                            <h3 className='brd-r-color-warning'>Código de Seguridad</h3>    
                                            <p>El código de seguridad es un elemento de <b>seguridad</b> que permite el bloqueo de tu repositorio.</p>
                                        </div>

                                        <div className='brd-r-repo-info'>
                                            <h3 className='brd-r-color-success'>Tipo de Repositorio</h3>    
                                            <p>El tipo de repositorio permite al usuario establecer el volumen de transacciones que se pueden hacer por día en ese repositorio.</p>

                                            <div>
                                                <ul>
                                                    <li>R-S: Repositorio de pequeño volumen. (100 transacciones por dia)</li>
                                                    <li>R-M: Repositorio de volumen medio. (300 transacciones por dia)</li>
                                                    <li>R-B: Repositorio de volumen grande. (500 transacciones por dia)</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </form>
                        </div>



                    </div>

                </div>
            </div>


            <SelectTypeRepo isOpen={isOpenTypeRepo} setIsOpen={setIsOpenTypeRepo} setTypesRepo={setTypesRepo} typesRepo={typesRepo ? typesRepo : {}}/>
        </ContainerMain>
    )
}