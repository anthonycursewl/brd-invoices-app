import { useGlobalState } from "../../store/useGlobalState";
import "./navbar.css";
import Option from "../../shared/components/SideMenu/comp/option";
// Hooks
import { useState } from "react";

// Importación de los SVGs
import WorkSpaceIcon from "../../assets/svgs/workspace-icon";
import IconDash from "../../assets/svgs/dashboard/icon-dash";
import { IconList } from "../../assets/svgs/dashboard/icon-dash";
import { IconCards } from "../../assets/svgs/dashboard/icon-dash";
import { IconProducts } from "../../assets/svgs/dashboard/icon-dash";
import AccountIcon from "../../assets/svgs/account-icon";

export default function Navbar() {
  const { isDarkMode, setMenuNavStatus, menuNavStatus } = useGlobalState();

  const handleOpenMenu = () => {
    setMenuNavStatus(!menuNavStatus);
    console.log(menuNavStatus);
  };

  return (
    <nav
      className="navbar-main"
      style={{
        borderBottom: isDarkMode ? "1px solid #181e29" : "1px solid #8ea19;",
      }}
    >
      <div className="navbar-cn-mn">
        <div className="navbar-logo">
          <img src="/logos/tajinside-icon.png" alt="TAJ Inside Logo" />
        </div>

        <div className="navbar-menu" onClick={handleOpenMenu}>
          <span className={`part1 ${menuNavStatus ? "open" : ""}`}></span>
          <span className={`part2 ${menuNavStatus ? "open" : ""}`}></span>
        </div>
      </div>

      <div>
        <ul className={`navbar-menu-items ${menuNavStatus ? "open" : ""}`}>
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
            <Option path="/dashboard/cards">
              <IconCards />
              Repositories BRD-S
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
            <Option>
              <IconDash />
              Perfil
            </Option>
            <Option>
              <IconList />
              Configuración
            </Option>
          </div>
          
        </ul>
      </div>
    </nav>
  );
}
