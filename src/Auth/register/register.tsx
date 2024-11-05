import './register.css'
import { useEffect, useRef } from 'react'
import SecurityIcon from '../../assets/svgs/login/security-icon'
import IntegrityIcon from '../../assets/svgs/login/integrity'
import { AutoIcon } from '../../assets/svgs/login/integrity'
import { useGlobalState } from '../../store/useGlobalState'

// Importanción de la fecha
import { brd_date } from '../auth.config'

import { useState } from 'react'
import { secureFetch } from '../../shared/Services/secureFetch'
import { API_URL } from '../../Config/tajinside.config'

// Import del ModalWarn
import ModalWarn from '../../shared/Modal/modal-warn/ModalWarn'
import { TYPE_USERS } from '../../shared/TypeUsers/type.users'

export default function Register() {
    const formRef = useRef(null)
    const [loading, setLoading] = useState<boolean>(false)

    // Handle error or exceptions
    const [options, setOptions] = useState({ state: false, text: '', type: 'success' })

    const { isDarkMode } = useGlobalState()

    const handleLoginFormSumbit = async (e: any) => {
        e.preventDefault();
        if (!formRef.current) {
            return
        }

        const formData = formRef.current as HTMLFormElement;
        const { name, last_name, email, password, password_confirm, code } = formData.elements as any;
        
        if (!name.value || !last_name.value || !email.value || !password.value || !password_confirm.value || !code.value) {
            console.log("Todos los campos son obligatorios")
            setOptions({ state: true, text: "Todos los campos son obligatorios", type: 'error' })
            return 
        }
        
        if (password.value !== password_confirm.value) {
            console.log("Las contraseñas no coinciden")
            setOptions({ state: true, text: "Las contraseñas no coinciden", type: 'warning' })
            return
        }
        
        if (name.value.length > 200 || last_name.value.length > 200 || email.value.length > 255 || password.value.length > 70) {
            setOptions({ state: true, text: "Los campos no pueden superar los 200 caracteres", type: 'warning' })
            console.log("El nombre y el apellido deben ser de al menos 2 caracteres")
            return
        }
        
        const idUser = crypto.randomUUID()
        const { result, error} = await secureFetch(`${API_URL}/users/create`, 'POST', {
            id: idUser.split('-')[0],
            name: name.value.trim(),
            last_name: last_name.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
            code: code.value.trim(),
            type: TYPE_USERS.ADMIN
        }, setLoading)
        
        if (error) {
            setOptions({ state: true, text: error, type: 'error' })
            console.log(error)
            return
        }

        if (result) {
            console.log(result)
            setOptions({ state: true, text: 'Cuenta creada exitosamente!', type: 'success' })
        }
    }



    useEffect(() => {
        document.title = "TAJ Inside | Login"   
    })


    return (
        <>
            <section className='login-cn'>
                <div className='login'>

                    <div className='login-title-cn'>

                        <div className='login-title-inside'>
                            <div className='login-title'>
                                <div className='login-title-logo'>  
                                    <img src="/logos/tajinside-icon.png" alt="TAJ Inside Logo" />
                                    <h1>TAJ Inside | BRD-S</h1>
                                </div>
                                
                                <div>
                                    <p>Solo para personal autorizado. Regístrate mediante el código de acceso para continuar.</p>
                                </div>

                                <div className='register-gradient'>
                                    <div className='register-gradient-inside'>

                                    </div>
                                </div>
                            </div>

                            <div className='login-info-blocks'>
                                <div className="login-info-dall">

                                    <div className='login-info'>
                                        <SecurityIcon />
                                        <h1>Seguridad</h1>
                                    </div>

                                    <p>BRD-S es una solución segura para administrar pagos, facturas y manejar tarjetas del tipo BRD-S.</p>
                                </div>

                                <div className="login-info-dall">
                                    <div className='login-info'>
                                        <IntegrityIcon />
                                        <h1>Integridad y facilidad</h1>
                                    </div>
                                    <p>Brindamos soluciones integrales para administrar pagos, facturas y manejar tarjetas de creación.</p>
                                </div>

                                <div className="login-info-dall">
                                    <div className='login-info'>
                                        <AutoIcon />
                                        <h1>Automatización</h1>
                                    </div>
                                    <p>Brindamos automatización para generar facturas digitales y manejar cobros con links compartibles.</p>
                                </div>
                            </div>

                            <div className='login-footer'>
                                <p>© {brd_date.getFullYear()} TAJ Inside | Breadriuss. Todos los derechos reservados.</p>
                            </div>
                        </div>

                    </div>

                    <form ref={formRef} className='login-form' onSubmit={handleLoginFormSumbit}>
                        <div className='login-place-content'>
                            <div className='login-logo'>
                                <img src={isDarkMode ? '/logos/TAJ_INSIDE_LOGO_NEW_DARK.png' : '/logos/TAJ_INSIDE_LOGO_NEW.png'} alt="TAJ Inside Logo" />
                            </div>

                            <div className='login-inputs'>
                                <div className='login-form-cn'>
                                    <label>Nombres</label>
                                    <input type="text" placeholder='Nombres' maxLength={255} name='name' id='name'/>
                                </div>

                                <div className='login-form-cn'>
                                    <label>Apellidos</label>
                                    <input type="text" placeholder='Apellidos' maxLength={255} name='last_name' id='last_name'/>
                                </div>

                                <div className='login-form-cn'>
                                    <label>Email</label>
                                    <input type="email" placeholder='usuario@breadriuss.com' maxLength={255} name='email' id='email'/>
                                </div>

                                <div className='login-form-cn'>
                                    <label>Contraseña</label>
                                    <input type="password" placeholder='************' maxLength={255} name='password' id='password'/>
                                </div>

                                <div className='login-form-cn'>
                                    <label>Confirme su contraseña</label>
                                    <input type="password" placeholder='************' maxLength={255} name='password_confirm' id='password_confirm'/>
                                </div>

                                <div className='login-form-cn'>
                                    <label>Código de Acceso</label>
                                    <input type="text" placeholder='XXX XXX' maxLength={255} name='code' id='code'/>
                                </div>
                            </div>

                            <div className='login-btn-cn'>
                                {
                                    
                                    loading !== true ? (
                                        <button>Registrar</button>
                                    )
                                    : 'Cargando...'
                                }
                            </div>
                        </div>
                    </form>

                </div>
            </section>

            <ModalWarn options={options} setOptions={setOptions}/>
        </>
    )
}