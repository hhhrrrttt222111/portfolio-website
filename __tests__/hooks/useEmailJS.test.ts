import { renderHook, act, waitFor } from "@testing-library/react";
import emailjs from "@emailjs/browser";
import useEmailJS, { type SendEmailResult } from "@/hooks/useEmailJS";

jest.mock("@emailjs/browser", () => ({
  send: jest.fn(),
}));

const mockGetEmailJSConfig = jest.fn();

jest.mock("@/config", () => ({
  getEmailJSConfig: () => mockGetEmailJSConfig(),
}));

const mockFormData = {
  name: "John Doe",
  email: "john@example.com",
  message: "Hello, this is a test message.",
};

const mockConfig = {
  serviceId: "test_service_id",
  templateId: "test_template_id",
  publicKey: "test_public_key",
};

describe("useEmailJS", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetEmailJSConfig.mockReturnValue(mockConfig);
  });

  it("initializes with default state", () => {
    const { result } = renderHook(() => useEmailJS());

    expect(result.current.isLoading).toBe(false);
    expect(typeof result.current.sendEmail).toBe("function");
  });

  it("sends email successfully", async () => {
    (emailjs.send as jest.Mock).mockResolvedValueOnce({ status: 200, text: "OK" });

    const { result } = renderHook(() => useEmailJS());

    let sendResult: SendEmailResult;
    await act(async () => {
      sendResult = await result.current.sendEmail(mockFormData);
    });

    expect(sendResult!.success).toBe(true);
    expect(sendResult!.error).toBeNull();
    expect(result.current.isLoading).toBe(false);

    expect(emailjs.send).toHaveBeenCalledWith(
      "test_service_id",
      "test_template_id",
      {
        to_email: "hemanththanal@gmail.com",
        to_name: "Hemanth",
        from_name: mockFormData.name,
        from_email: mockFormData.email,
        reply_to: mockFormData.email,
        email: mockFormData.email,
        name: mockFormData.name,
        message: mockFormData.message,
      },
      { publicKey: "test_public_key" },
    );
  });

  it("handles email send failure", async () => {
    const errorMessage = "Failed to send email";
    (emailjs.send as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useEmailJS());

    let sendResult: SendEmailResult;
    await act(async () => {
      sendResult = await result.current.sendEmail(mockFormData);
    });

    expect(sendResult!.success).toBe(false);
    expect(sendResult!.error).toBe(errorMessage);
    expect(result.current.isLoading).toBe(false);
  });

  it("handles non-Error rejection", async () => {
    (emailjs.send as jest.Mock).mockRejectedValueOnce("Unknown error");

    const { result } = renderHook(() => useEmailJS());

    let sendResult: SendEmailResult;
    await act(async () => {
      sendResult = await result.current.sendEmail(mockFormData);
    });

    expect(sendResult!.success).toBe(false);
    expect(sendResult!.error).toBe("Failed to send email");
  });

  it("returns error when environment variables are missing", async () => {
    mockGetEmailJSConfig.mockReturnValue({
      serviceId: "",
      templateId: "",
      publicKey: "",
    });

    const { result } = renderHook(() => useEmailJS());

    let sendResult: SendEmailResult;
    await act(async () => {
      sendResult = await result.current.sendEmail(mockFormData);
    });

    expect(sendResult!.success).toBe(false);
    expect(sendResult!.error).toBe(
      "EmailJS configuration is missing. Please check environment variables.",
    );
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it("sets isLoading to true while sending", async () => {
    let resolvePromise: (value: unknown) => void;
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    (emailjs.send as jest.Mock).mockReturnValueOnce(pendingPromise);

    const { result } = renderHook(() => useEmailJS());

    act(() => {
      result.current.sendEmail(mockFormData);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await act(async () => {
      resolvePromise!({ status: 200, text: "OK" });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("handles emailjs text error format", async () => {
    (emailjs.send as jest.Mock).mockRejectedValueOnce({ text: "EmailJS specific error" });

    const { result } = renderHook(() => useEmailJS());

    let sendResult: SendEmailResult;
    await act(async () => {
      sendResult = await result.current.sendEmail(mockFormData);
    });

    expect(sendResult!.success).toBe(false);
    expect(sendResult!.error).toBe("EmailJS specific error");
  });

  it("returns independent results for consecutive calls", async () => {
    (emailjs.send as jest.Mock)
      .mockRejectedValueOnce(new Error("First error"))
      .mockResolvedValueOnce({ status: 200, text: "OK" });

    const { result } = renderHook(() => useEmailJS());

    let firstResult: SendEmailResult;
    await act(async () => {
      firstResult = await result.current.sendEmail(mockFormData);
    });

    expect(firstResult!.success).toBe(false);
    expect(firstResult!.error).toBe("First error");

    let secondResult: SendEmailResult;
    await act(async () => {
      secondResult = await result.current.sendEmail(mockFormData);
    });

    expect(secondResult!.success).toBe(true);
    expect(secondResult!.error).toBeNull();
  });
});
