import { TypeNotification } from "../../Interfaces/TypeNotification";
import { ErrorIcon, SuccessIcon, WarningIcon } from "../../../assets/svgs/login/close-modal";
import { motion } from "framer-motion";

export default function CardNotification({ notification, index }: { notification: TypeNotification; index: number }) {
  return (
    <motion.aside key={index} className="s-noti-content-single" 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    viewport={{ once: true }}>
      <div className="s-n-content">
        <div className="s-notification-icon">
          {notification.type === "success" ? (
            <SuccessIcon />
          ) : notification.type === "error" ? (
            <ErrorIcon />
          ) : (
            notification.type === "warning" && <WarningIcon />
          )}
        </div>

        <div>
          <p>{notification.title}</p>
        </div>
      </div>

      <div>
        <p>{notification.message + "  " + "Prueba de sistemas de notis"}</p>
      </div>
    </motion.aside>
  );
}
