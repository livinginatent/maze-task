import { useState, useEffect } from "react";
import { Player } from "./components/Player.js";
import "./App.css";
import { getAuthToken } from "./api/getAuthToken";
import { getCurrentLocation } from "./api/getCurrentLocation";

const App = () => {
  const [token, setToken] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const getLocation = async (authToken) => {
      const location = await getCurrentLocation(authToken);
      setLocation(location);
    };

    const fetchData = async () => {
      const authToken = await getAuthToken();
      getLocation(authToken);
      setToken(authToken); // fetch token from local storage if it exists otherwise fetch new token
    };

    fetchData();
  }, []);

  return <Player token={token} location={location} />;
};

export default App;
