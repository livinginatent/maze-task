import { ApiUrl } from "../constants/ApiUrl";

export const getCurrentLocation = async (token) => {
  try {
    const response = await fetch(`${ApiUrl}/Room/current`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const currentRoom = await response.json();

    return currentRoom;
  } catch (error) {
    console.log(error);
  }
};
