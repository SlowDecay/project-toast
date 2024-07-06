import React from "react";

import useKeydown from "../../hooks/use-key-down";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function createToast(variant, message) {
    const id = crypto.randomUUID();
    const toast = {
      id,
      variant,
      onClose: () => {
        setToasts((currentToasts) => {
          const newToasts = currentToasts.filter(
            ({ id: toastId }) => toastId !== id
          );
          return newToasts;
        });
      },
      children: message,
    };

    const newToasts = [...toasts, toast];
    setToasts(newToasts);
  }

  const contextValue = {
    toasts,
    createToast,
  };

  const dismissToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown("Escape", dismissToasts);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
