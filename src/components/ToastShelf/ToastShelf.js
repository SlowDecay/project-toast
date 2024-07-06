import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider";

function ToastShelf() {
  const { toasts } = React.useContext(ToastContext);

  return (
    <ol
      className={styles.wrapper}
      role="region"
      ariaLive="polite"
      ariaLabel="Notification"
    >
      {toasts.map(({ id, variant, onClose, children }) => (
        <li className={styles.toastWrapper} key={id}>
          <Toast variant={variant} onClose={onClose}>
            {children}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
