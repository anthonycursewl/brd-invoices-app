import "./modal-details.css";
import { createPortal } from "react-dom";
import { UAParser } from "ua-parser-js";

// SVGS
import IconBrowser from "../../../assets/svgs/config/IconBrowser";
import IconTrash from "../../../assets/svgs/config/IconTrash";

// Global state to handle modals
import { useGlobalState, useModalState } from "../../../store/useGlobalState";
import { useState } from "react";
import IconCheckConfig, {
  IconCancelConfig,
} from "../../../assets/svgs/config/IconOptions";
import { secureFetch } from "../../../shared/Services/secureFetch";
import { APP_URLS } from "../../../api/urls/url";
import { useNavigate } from "react-router-dom";

interface TypeSession {
  s: s;
}

interface s {
  id: string;
  ip: string;
  device: string;
  created_at: string;
  id_user: string;
  token: string;
}

export default function ModalDetails({ s }: TypeSession) {
  const [deleteActive, setDeleteActive] = useState<boolean>(false);
  const { isSessionsActive, setIsSessionActive } = useModalState();
  const [loading, setLoading] = useState<boolean>(false);

  // Navigate routes
  const nav = useNavigate()
  const { sendNewNotification, currentNotification, signalReload, updateSignalReload} = useGlobalState()

  const handleDeleteSession = async (id: string) => {
    console.log(id)
    setLoading(true);
    const { error, result} = await secureFetch(`${APP_URLS.DELETE_SESSION_BY_ID}/${id}`, "DELETE", null, () => {}, nav);

    if (error) {
        setLoading(false);
    }

    if (result.status === 200) {
        sendNewNotification({
            type: 'success',
            message: result.message,
            title: 'Sesión Eliminada'
        }, currentNotification)

        updateSignalReload(signalReload + 1)
        setDeleteActive(false);
        setIsSessionActive(false);
    }

    setLoading(false);
  };

  return createPortal(
    <div
      className={`modal-details ${
        isSessionsActive ? "modal-details-active" : ""
      }`}
      onClick={() => {
        setIsSessionActive(false);
      }}
    >
      <div
        className={`modal-details-cn ${
          isSessionsActive ? "modal-details-cn-active" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-details-header">
          <div className="modal-details-title">
            <IconBrowser />
            <p>{UAParser(s.device).browser.name?.trim() || "Desconocido"}</p>
          </div>

          <div className="modal-details-trash">
            <div
              onClick={() => setDeleteActive(true)}
              className="modal-icon-trash"
            >
              {deleteActive ? null : <IconTrash />}
            </div>

            <div className="modal-icon-options">
              {deleteActive ? (
                loading ? (
                    <div className="modal-spinner-loading"></div>
                ) :
                <div className="modal-options">
                    <span onClick={() => handleDeleteSession(s.id)}>
                        <IconCheckConfig />
                    </span>
                    <span onClick={() => setDeleteActive(false)}>
                        <IconCancelConfig />
                    </span>
                </div>
              ) : null}
            </div>

            <div
              className="modal-icon-x"
              onClick={() => {
                setIsSessionActive(false);
                setDeleteActive(false);
              }}
            >
              <p>x</p>
            </div>
          </div>
        </div>

        <div className="modal-details-session">
          <div className="modal-details-part">
            <p>IP Address</p>
            <span>{s.ip}</span>
          </div>

          <div className="modal-details-part">
            <p>Operating System</p>
            <span>{UAParser(s.device).os.name || "Desconocido"}</span>
          </div>

          <div className="modal-details-part">
            <p>Engine</p>
            <span>{UAParser(s.device).engine.name || "Desconocido"}</span>
          </div>

          <div className="modal-details-part">
            <p>Date</p>
            <span>{s.created_at.slice(0, 10)}</span>
          </div>

          <div className="modal-details-part">
            <p>ID Session</p>
            <span>{s.id}</span>
          </div>

          <div className="modal-details-part">
            <p>ID User</p>
            <span>{s.id_user}</span>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-details-session")!
  );
}
