import './navbar-mobile.css'
import { createPortal } from "react-dom";
import Option from "../../../shared/components/SideMenu/comp/option";

// SVGs
import WorkSpaceIcon from "../../../assets/svgs/workspace-icon";
import IconDash from "../../../assets/svgs/dashboard/icon-dash";
import { IconList } from "../../../assets/svgs/dashboard/icon-dash";
import { IconCards } from "../../../assets/svgs/dashboard/icon-dash";
import { IconProducts } from "../../../assets/svgs/dashboard/icon-dash";
import AccountIcon from "../../../assets/svgs/account-icon";
import { useGlobalState } from "../../../store/useGlobalState";

export default function NavbarMobile() {
  const { infoUser, setMenuNavStatus, menuNavStatus } = useGlobalState();

  const handleOpenMenu = () => {
    setMenuNavStatus(!menuNavStatus);
  };

  return createPortal(
    <>
      <div onClick={handleOpenMenu}>
        <ul className={`navbar-menu-items ${menuNavStatus ? "open" : ""}`}>

          <div className="navbar-logo-mobile">
            <div className='nav-ph'>
              <img src="/logos/tajinside-icon.png" alt="TAJ Inside Logo" />
              <p>TAJ Inside</p>
            </div>

            <div className="navbar-menu" onClick={handleOpenMenu}>
              <span className={`part1 ${menuNavStatus ? "open" : ""}`}></span>
              <span className={`part2 ${menuNavStatus ? "open" : ""}`}></span>
            </div>
          </div>

          <div className="navbar-res-menu">
            <WorkSpaceIcon />
            WorkSpace
          </div>

          <div className="navbar-options">
            <Option path="/dashboard">
              <IconDash />
              Dashboard
            </Option>
            <Option path="/dashboard/payments">
              <IconList />
              Pagos
            </Option>
            <Option path={`/dashboard/repositories/${infoUser}`}>
              <IconCards />
              Repositories BRD-R
            </Option>
            <Option path="/dashboard/products/add">
              <IconProducts />
              Productos / Servicios
            </Option>
          </div>

          <div className="navbar-res-menu">
            <AccountIcon />
            Cuenta
          </div>

          <div className="navbar-options">
            <Option path={`/dashboard/profile/${infoUser}`}>
              <IconDash />
              Perfil
            </Option>
            <Option path={`/dashboard/config/${infoUser}`}>
              <IconList />
              Configuración
            </Option>
          </div>
        </ul>
      </div>
    </>,
    document.getElementById("modal-navbar")!
  );
}
