import { createPortal } from "react-dom";
import "./main.noti.css";
import { useGlobalState } from "../../store/useGlobalState";

// SVGs Share
import { ErrorIcon, WarningIcon, SuccessIcon } from "../../assets/svgs/login/close-modal";
import { TypeNotification } from "../Interfaces/TypeNotification";
import { useEffect } from "react";
import CardNotification from "./components/card-notification";

export default function MainNotification() {
  const { isNotification, setIsNotification, currentNotification, setCurrentNotification } = useGlobalState();

  const handleRemoveNotification = (index: number) => {
    const updatedNotifications = [...currentNotification];
    updatedNotifications.splice(index, 1);
    setCurrentNotification(updatedNotifications);
  };

  useEffect(() => { 
    const timers = currentNotification.map((notification, index) => {
      const timeout = (index + 1) * 1000; 

     const timer = setTimeout(() => {
        handleRemoveNotification(index);
      }, timeout);

      return timer;
    });

   return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [currentNotification]); 

  return createPortal(
    <section className={`system-notification ${isNotification ? "system-notification-active" : ""}`}>
      <div className={`s-notification-cn ${isNotification ? "s-notification-cn-active" : ""}`}>

        {currentNotification.length !== 0 ? currentNotification.map((notification: TypeNotification, index: number) => (
          notification.message !== '' && (
            <CardNotification
              notification={notification}
              index={index}
            />
          )
        )) : null}

      </div>
    </section>,
    document.getElementById("modal-system-notification")!
  );
}