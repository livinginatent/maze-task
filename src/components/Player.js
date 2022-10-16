import React, { useState, useEffect } from "react";
import { changeDirection } from "../api/changeDirection";
import { getCurrentLocation } from "../api/getCurrentLocation";
import styled from "styled-components";

export const Player = (props) => {
  const [location, setLocation] = useState({});
  const [message, setMessage] = useState("");
  const [locatedRoom, setLocatedRoom] = useState("");
  const [effect, setEffects] = useState("");
  const [previousDirection, setPreviousDirection] = useState("");
  const [room, setRoom] = useState({});

  const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
  `;

  const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0 1em;
    padding: 0.25em 1em;
    cursor: pointer;
  `;

  useEffect(() => {
    setLocation(props.location);
    if (props.location.id) {
      setRoom({ 1: props.location.id });
    }
  }, [props.location]);

  useEffect(() => {
    const currentRoom = Object.values(room).find(
      (value) => value === location.id
    );
    setLocatedRoom(Object.keys(room).find((key) => room[key] === currentRoom));
  }, [location]);

  const handleDirectionChange = async (direction) => {
    setPreviousDirection(direction);

    const receivedMessage = await changeDirection(props.token, direction);

    setMessage(receivedMessage);
    const newLocation = await getCurrentLocation(props.token);

    setLocation(newLocation);
    setEffects(newLocation.effect);

    const lastRoom = Number(Object.keys(room).slice(-1)[0]) + 1;

    const newRoom = {};

    newRoom[lastRoom] = newLocation.id;

    const checkRoomExists = Object.values(room).some(
      (room) => room === newLocation.id
    );

    if (!checkRoomExists) {
      setRoom({ ...room, ...newRoom });
    }
  };

  return (
    <Container>
      <div>
        {props.token ? (
          <div>
            <div>
              <Button onClick={() => handleDirectionChange("North")}>
                North
              </Button>
              <Button onClick={() => handleDirectionChange("South")}>
                South
              </Button>
              <Button onClick={() => handleDirectionChange("East")}>
                East
              </Button>
              <Button onClick={() => handleDirectionChange("West")}>
                West
              </Button>
            </div>
            <br />
            <h3>Available paths:</h3>
            {location.paths &&
              location.paths.map((loc) => (
                <li key={loc.name}>{loc.direction}</li>
              ))}
            <br />
            <h3>Rooms:</h3>
            <h6>
              {Object.keys(room).map((room) => (
                <li>{room}</li>
              ))}
            </h6>
            <br />

            <h3>Current room: {locatedRoom} </h3>
            <h7>
              Tip: Higher the room number, the closer you are to the exit!
            </h7>
            {previousDirection ? (
              <h3>Previous direction: {previousDirection}</h3>
            ) : (
              <h3>No directions chosen yet</h3>
            )}

            <br />

            <h5>{message}</h5>
            {effect ? (
              <h5>{effect}</h5>
            ) : (
              <h5>Please choose direction to win</h5>
            )}
          </div>
        ) : (
          <p>loading...</p>
        )}
      </div>
    </Container>
  );
};
