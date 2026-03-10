export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

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
