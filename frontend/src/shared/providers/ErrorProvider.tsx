import { AxiosError } from "axios";
import { PropsWithChildren, createContext, useContext } from "react";
import toast from "react-hot-toast";

const ErrorContext = createContext<{
  displayError: (error: AxiosError) => void;
}>({
  displayError: (error) => {
    console.error(error.message);
  },
});

export const useErrorContext = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }: PropsWithChildren) => {
  const displayError = (error: AxiosError) => {
    //we can add more cases as we go
    if (error?.response?.status === 401 || error.message.includes("401")) {
      toast.error("User not authorized.");
    } else {
      toast.error("An unexpected error has occurred.");
    }
  };

  return (
    <ErrorContext.Provider value={{ displayError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
