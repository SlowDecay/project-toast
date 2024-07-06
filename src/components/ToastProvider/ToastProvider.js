import React from "react";

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

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
