import './LoadingSession.css'
import { motion } from 'framer-motion'

export default function LoadingSession() {
    return (
        <motion.section className='session-loading' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <div className='session-loading-cn'>
                
                <div className='session-loading-logo'>
                    <img src="/logos/tajinside-icon.png" alt="TAJ Inside Logo Loading Screen" />

                    <div className='session-loading-spinner'>
                        <div className='taj-brd-spinner'></div>
                    </div>
                </div>


            </div>
        </motion.section>
    )
}