import "./profile.css";

import { ContainerMain } from "../shared/components/ContainerMain/container-main";
import Navbar from "../Dashboard/navbar/navbar";
import SideMenu from "../shared/components/SideMenu/SideMenu";
import ProfileSection from "./components/sections/profile-section";
import { useEffect, useState } from "react";

// SVGS
import IconProfile from "../assets/svgs/profile/IconProfile";
import IconProfileCat from "../assets/svgs/profile/IconProfileCat";

import { secureFetch } from "../shared/Services/secureFetch";
import { APP_URLS } from "../api/urls/url";
import { useGlobalState } from "../store/useGlobalState";

// Import interface User
import { User } from "../shared/Interfaces/User";
import IconEmail from "../assets/svgs/profile/IconEmail";
import IconID from "../assets/svgs/profile/IconID";
import IconDate from "../assets/svgs/profile/IconDate";
import IconTypeAccount from "../assets/svgs/profile/IconTypeAccount";
import IconPasswordChange from "../assets/svgs/profile/IconPasswordChange";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(false);
  const { infoUser } = useGlobalState();
  const getUserInformation = async () => {
    setLoading(true);
    const { error, result } = await secureFetch(
      `${APP_URLS.GET_PROFILE_BY_ID}/${infoUser.id}`,
      "GET",
      null,
      () => {}
    );

    if (error) {
      console.log(error);
    }

    if (result) {
      console.log(result);
      setCurrentUser(result.user);
    }

    setLoading(false);
  };

  useEffect(() => {
    getUserInformation();
  }, []);

  return (
    <ContainerMain>
      <Navbar />

      <div className="profile-utils">
        <SideMenu />

        <div className="profile-utils-cn">
          <div className="profile-utils-title">
            <IconProfile />
            <h1>Perfil</h1>
          </div>

        {
            loading ? <div className="profile-loading"><h1>Loading...</h1></div> :
            <div className="profile-utils-info">

            <div className="profile-main-info">
                <ProfileSection info={{ type: "Nombres", desc: currentUser.name, title: "Información Personal" }} icon={<IconProfileCat />}/>
                <ProfileSection info={{ type: "Apellidos", desc: currentUser.last_name, title: "Información Personal" }} icon={<IconProfileCat />}/>
                <ProfileSection info={{ type: "Email", desc: currentUser.email, title: "Email Personal" }} icon={<IconEmail />}/>
                <ProfileSection info={{ type: "Identificador", desc: currentUser.id, title: "# ID Cuenta" }} icon={<IconID />}/>
                <ProfileSection info={{ type: "Fecha de creación", desc: new Date(currentUser.created_at).toLocaleString(), title: "Registro de fechas" }} icon={<IconDate />}/>
                <ProfileSection info={{ type: "BRD Cuenta", desc: currentUser.type, title: "Tipo de cuenta" }} icon={<IconTypeAccount />}/>
            </div>

            <div className="profile-main-info">
                <ProfileSection info={{ type: "Contraseñas", desc: "**********", title: "Cambio de contraseña" }} icon={<IconPasswordChange />}/>
            </div>

            <div>
                Opciones de la cuenta
            </div>

          </div>
        }

        </div>
      </div>
    </ContainerMain>
  );
}
