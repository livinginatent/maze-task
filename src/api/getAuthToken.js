import { ApiUrl } from "../constants/ApiUrl";

export const getAuthToken = async () => {
  try {
    const response = await fetch(`${ApiUrl}/Game/start`, {
      method: "POST",
    });
    const authToken = await response.json();

    return authToken.token;
  } catch (error) {
    console.log(error);
  }
};
