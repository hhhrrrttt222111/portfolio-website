import { useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { getEmailJSConfig } from "@/config";

export interface EmailFormData {
  name: string;
  email: string;
  message: string;
}

export interface SendEmailResult {
  success: boolean;
  error: string | null;
}

export interface UseEmailJSReturn {
  sendEmail: (formData: EmailFormData) => Promise<SendEmailResult>;
  isLoading: boolean;
}

const useEmailJS = (): UseEmailJSReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = useCallback(async (formData: EmailFormData): Promise<SendEmailResult> => {
    setIsLoading(true);

    const { serviceId, templateId, publicKey } = getEmailJSConfig();

    if (!serviceId || !templateId || !publicKey) {
      setIsLoading(false);
      return {
        success: false,
        error: "EmailJS configuration is missing. Please check environment variables.",
      };
    }

    try {
      const templateParams = {
        to_email: "hemanththanal@gmail.com",
        to_name: "Hemanth",
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        email: formData.email,
        name: formData.name,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey,
      });

      setIsLoading(false);
      return { success: true, error: null };
    } catch (err: unknown) {
      let errorMessage = "Failed to send email";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "object" && err !== null && "text" in err) {
        errorMessage = (err as { text: string }).text;
      }
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  return {
    sendEmail,
    isLoading,
  };
};

export default useEmailJS;
