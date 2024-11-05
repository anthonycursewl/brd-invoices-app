import { Link } from "react-router-dom"
import './option.css'

interface OptionInterface {
    children: React.ReactNode
    path?: string;
}

export default function Option({ children, path }: OptionInterface) {
    
    const currentPath = window.location.pathname

    return (
        <Link to={path ? path : currentPath} className={`${currentPath === path ? 'option-active' : 'option'}`}>
            <p>{children}</p>
        </Link>
    )
}