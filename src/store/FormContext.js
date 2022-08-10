import { createContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    questions: "5",
    category: "",
    difficulty: "",
    type: "",
  });

  const [apiError, setApiError] = useState({
    isError: false,
    message: "",
  });

  return (
    <FormContext.Provider
      value={{ formData, setFormData, apiError, setApiError }}
    >
      {children}
    </FormContext.Provider>
  );
}

export default FormContext;
