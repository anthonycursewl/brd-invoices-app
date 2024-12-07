import { TypeNotification } from "../../Interfaces/TypeNotification";
import { ErrorIcon, SuccessIcon, WarningIcon } from "../../../assets/svgs/login/close-modal";
import { motion } from "framer-motion";

export default function CardNotification({ notification, index }: { notification: TypeNotification; index: number }) {
  return (
    <motion.aside key={index} className="s-noti-content-single" 
    initial={{ x: 150, y: -1, opacity: 0 }}
    whileInView={{ x: 0, y: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    viewport={{ once: false }}
    exit={{ opacity: 0, x: 100, y: 5 }}
    >
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
        <p>{notification.message}</p>
      </div>
    </motion.aside>
  );
}
