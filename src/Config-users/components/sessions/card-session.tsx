import { UAParser } from "ua-parser-js";

// SVGs
import IconBrowser from "../../../assets/svgs/config/IconBrowser";
import IconTrash from "../../../assets/svgs/config/IconTrash";

// State
import { useModalState } from "../../../store/useGlobalState";

interface TypeSessions {
  ip: string;
  device: string;
  created_at: string;
  id_user: string;
  id: string
  setCurrentSession: (v: any) => void
}

export default function CardSession({ ...s }: TypeSessions, index: number) {

    // Mdal State
    const { setIsSessionActive } = useModalState()

  return (
    <>
        <div className="config-current-session" key={index} onClick={() => {
          s.setCurrentSession(s)
          setIsSessionActive(true)
        }}>
            <div className="config-cs-title">
                <div className="config-cs-browser">
                <IconBrowser />
                <p>{`${UAParser(s.device).browser.name?.trim()} (${s.id.split("-")[0]})` || "Desconocido"}</p>
                </div>

                <div className="config-cs-trash">
                <IconTrash />
                </div>
            </div>

            <div className="config-cs-details">
                <div className="config-cs-network">
                <p>IP Address</p>
                <span>{s.ip}</span>
                </div>

                <div className="config-cs-device">
                <p>Dispositivo</p>
                <span>{UAParser(s.device).device.type || "Desconocido"}</span>
                </div>
            </div>
        </div>
    </>
  );
}
