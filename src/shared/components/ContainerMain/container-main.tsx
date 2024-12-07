import './container-main.css'
import { motion } from 'framer-motion'

interface ContainerMainProps {
    children: React.ReactNode
    backgroundColor?: string
}

export const ContainerMain = ({ children, backgroundColor }: ContainerMainProps) => {
    return (
        <section className='container-main' style={{ backgroundColor: backgroundColor }}>
            <div className='container-main-shadow'></div>

            <motion.div className='container-main-cn'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>

            <div className='container-main-shadow-2'></div>
            <div className='container-main-shadow-3'></div>
            <div className='container-main-shadow-4'></div>
        </section>
    )
}