import "./SelectTypeRepo.css";
import { createPortal } from "react-dom";

// Components
import { DashCard } from "../../../Dashboard/Dash-cards/dash.card";

// Constants
import { CARD_TYPE } from "../../../Config/tajinside.config";

// Interfaces
import { TypeRepo } from "../../../shared/Interfaces/TypesRepo";


export default function SelectTypeRepo({ isOpen, setIsOpen, setTypesRepo, typesRepo }: { isOpen: boolean, setIsOpen: (v: boolean) => void, setTypesRepo: (v: TypeRepo) => void, typesRepo: TypeRepo }) {
    // States
  
    const handleCloseSelection = () => {
        setIsOpen(false)
        setTypesRepo({})
    }

    const handleAccpet = () => {
        setIsOpen(false)

        console.log(typesRepo)
    }
  
    const sizes = [
        {
            name: "Pequeño",
            value: "r-s"
        },
        {
            name: "Mediano",
            value: "r-m"
        },
        {
            name: "Grande",
            value: "r-b"
        }
    ]

    const repositories = [
      {
        id: "E-ec7f0e5",
        name: "BRD-R-GOLD",
        value: CARD_TYPE.REPOSITORY.SIZE.SMALL.BRD_GOLD,
        emitDate: "00/00",
        size: "small"
      },
      {
        id: "E-210db7c",
        name: "BRD-R-BLACK",
        value: CARD_TYPE.REPOSITORY.SIZE.SMALL.BRD_BLACK,
        emitDate: "00/00",
        size: "small"
      }
    ]


  return createPortal(
    
    <div className={`modal_type_repo ${isOpen ? 'modal_type_repo_active' : ''}`}>

      <div className={`modal_type_repo_content ${isOpen ? 'modal_type_repo_content_active' : ''}`}>
        <div className="type-repo">
            <p>Seleccione el tipo de repositorio</p>
        </div>

        <div className="type-repositories">
          <div className="type-repo-title">
            <h3>Tipo de Repositorio</h3>
          </div>
          
            {
              repositories.map((repo: any) => (
                <span 
                className={`type-repo-selected ${typesRepo?.typeSelected === repo.value ? 'type-repo-selected-active' : ''}`}
                onClick={() => {
                  console.log(repo.value)
                  setTypesRepo({ typeSelected: repo.value, sizeSelected: typesRepo?.sizeSelected }) 
                }}>
                  <DashCard cardExpires={repo.emitDate} cardNumber={repo.id} cardType={repo.value} size={repo.size}/>
                </span>
              ))
            }
        </div>

        <div className="type-repositories">
          <div className="type-repo-size">
            <h3>Tamaño del Repositorio</h3>
          </div>

          <div className="type-repo-options-size">
              {
                sizes.map((size: { name: string; value: string; }) => (
                <div
                className={`${typesRepo?.sizeSelected === size.value ? 'type-repo-size-option-selected' : 'type-repo-size-option '}`} 
                onClick={() => {
                  setTypesRepo({ typeSelected: typesRepo?.typeSelected, sizeSelected: size.value })
                }}>
                  <p>{size.name}</p>
                </div>
                ))
              }
          </div>

        </div>

        <div className="type-repo-button">
          <button onClick={handleCloseSelection}>Cancelar</button>
          <button onClick={handleAccpet}>Aceptar</button>
        </div>
      </div>

    </div>
    ,
    document.getElementById('select-type-repo')!
  );

}
