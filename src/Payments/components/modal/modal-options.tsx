import { useState } from "react"
import "./modal-options.css"
import { Product } from "../payments-main";

interface ModalListOptionsProps {
    children: React.ReactNode;
    deleteItem: (desc: string) => void;
    product: Product
}

export default function ModalListOptions({ children, deleteItem, product }: ModalListOptionsProps) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen)
        console.log("click")
    }

    return (
        <section onClick={toggleModal} className="modal-options">
            {children}
            <div className={`modal-options-cn ${isOpen ? "modal-options-cn-active" : ""}`} onClick={() => deleteItem(product.desc)}>
                Eliminar
            </div>
        </section>
    )
}