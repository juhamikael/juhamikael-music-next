import axios from "axios";
interface AxiosError {
  response?: {
    status: number;
  };
}

export const sendMessage = async (values: any, toast: any) => {
  try {
    const response = await axios.post(
      "https://resend-juhamikael-production.up.railway.app/api/send-message/music",
      { data: values }
    );

    if (response.status === 429) {
      // Rate limit exceeded, show toast
      toast({
        title: "Too many requests",
        description: "Please try again later or contact me on Discord.",
      });
      throw new Error("Rate limit exceeded");
    }

    if (response.status !== 200) {
      throw new Error("Request failed");
    }

    return response.data;
  } catch (err) {
    if (isAxiosError(err) && err.response && err.response.status !== 429) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please try again later.",
      });
    } else if (err instanceof Error) {
      throw err;
    }
  }
};

function isAxiosError(error: any): error is AxiosError {
  return error && error.response && typeof error.response.status === "number";
}
