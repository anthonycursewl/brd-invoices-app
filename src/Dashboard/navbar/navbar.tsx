import { useGlobalState } from "../../store/useGlobalState";
import "./navbar.css";

// Components
import NavbarMobile from "./components/navbar-mobile";

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

      <NavbarMobile />
    </nav>
  );
}
