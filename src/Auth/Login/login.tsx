import './login.css'
import '../../ProtectedRoutes/components/LoadingSession.css'
import { useEffect, useRef } from 'react'
import SecurityIcon from '../../assets/svgs/login/security-icon'
import IntegrityIcon from '../../assets/svgs/login/integrity'
import { AutoIcon } from '../../assets/svgs/login/integrity'
import { useGlobalState } from '../../store/useGlobalState'
import ModalWarn from '../../shared/Modal/modal-warn/ModalWarn'

// Constantes de la app
import { API_URL } from '../../Config/tajinside.config'
import { createCookie } from '../../shared/Cookies/setCookie'
import { Link } from 'react-router-dom'

// Importación del useState
import { useState } from 'react'
import { secureFetch } from '../../shared/Services/secureFetch'
import { useNavigate } from 'react-router-dom'
import LoadingSession from '../../ProtectedRoutes/components/LoadingSession'

export default function Login() {
    const formRef = useRef(null)
    const date = new Date();

    // Options modal
    const [options, setOptions] = useState({ state: false, text: '', type: 'success' })
    const [loading, setLoading] = useState<boolean>(false)

    // Objeto para manejar rutas y blah
    const navigate = useNavigate()

    const { isDarkMode } = useGlobalState()

    const handleLoginFormSumbit = async (e: any) => {
        e.preventDefault();
        if (!formRef.current) {
            return
        }

        const formData = formRef.current as HTMLFormElement;
        const { email, password } = formData.elements as any;

        if (!email.value || !password.value) {
            console.log("Todos los campos son obligatorios")
            setOptions({ state: true, text: "Todos los campos son obligatorios", type: 'warning' })
            return
        }

        if (email.value.length > 255 || password.value.length > 80) {
            setOptions({ state: true, text: "Los campos no pueden superar los 255 caracteres", type: 'warning' })
            console.log("El email y la contraseña deben ser de al menos 2 caracteres")
            return
        }

        const { result, error } = await secureFetch(`${API_URL}/users/login`, 'POST', {
            email: email.value.trim(),
            password: password.value.trim()
        }, setLoading)

        if (result) {
            console.log(result)
            setOptions({ state: true, text: result.message, type: 'success' })
            createCookie('AuthTokenBRD', result?.token, 3650 * 2)
            
            setTimeout(() => {
                navigate('/dashboard') 
            }, 1000);
        }

        if (error) {
            setOptions({ state: true, text: error, type: 'error' })
            console.log(error)
        }
        
    }

    useEffect(() => {
        document.title = "TAJ Inside | Login"   
    })


    return (
        <>
            {
            loading ? 
            <LoadingSession /> 
            :
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
                                    <p>Solo para personal autorizado. Inicia sesión para continuar.</p>
                                </div>

                                <div className='login-gradient'>
                                    <div className='login-gradient-inside'>
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
                                <p>© {date.getFullYear()} TAJ Inside | Breadriuss. Todos los derechos reservados.</p>
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
                                    <label>Email</label>
                                    <input type="email" placeholder='usuario@breadriuss.com' maxLength={255} name='email' id='email'/>
                                </div>

                                <div className='login-form-cn'>
                                    <label>Contraseña</label>
                                    <input type="password" placeholder='************' maxLength={255} name='password' id='password'/>
                                </div>
                            </div>

                            <div className='login-btn-cn'>
                                {
                                    loading
                                        ? <div className='taj-brd-spinner'></div>
                                        :
                                    <button>Iniciar Sesión</button>
                                }
                            </div>

                            <div className='login-s-t-register'>
                                <Link to={'/register'}>¿Aún no tienes una cuenta? ¡Registrate aquí!</Link>
                            </div>
                        </div>
                    </form>

                </div>
                </section>
            }
            <ModalWarn setOptions={setOptions} options={options}/>
        </>
    )
}