import { ApiUrl } from "../constants/ApiUrl";

export const changeDirection = async (token, direction) => {
  try {
    const response = await fetch(
      `${ApiUrl}/Player/move/?direction=${direction}`,
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const message = await response.text();
 

    return message;
  } catch (error) {
    console.log(error);
  }
};
