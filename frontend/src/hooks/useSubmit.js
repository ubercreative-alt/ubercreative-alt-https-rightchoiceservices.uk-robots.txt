import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const useSubmit = ({ path, successMessage, errorMessage }) => {
  const [sending, setSending] = useState(false);

  const submit = async (payload, onSuccess) => {
    setSending(true);
    try {
      await axios.post(`${API}${path}`, payload);
      toast.success(successMessage);
      onSuccess?.();
    } catch {
      toast.error(errorMessage);
    } finally {
      setSending(false);
    }
  };

  return { sending, submit };
};
