import './container-main.css'
import { motion } from 'framer-motion'

interface ContainerMainProps {
    children: React.ReactNode
    backgroundColor?: string
}

export const ContainerMain = ({ children, backgroundColor }: ContainerMainProps) => {
    return (
        <section className='container-main' style={{ backgroundColor: backgroundColor }}
       
        >
            <motion.div className='container-main-cn'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            >
                {children}
            </motion.div>
        </section>
    )
}