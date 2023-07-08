import React from "react";
import { ReactComponent as ArrowCircleRight } from "../../assets/svg/arrow-circle-right.svg";
import MapImage from "../../assets/images/map.png";
import { Menu, Button, Group, Text } from "@mantine/core";

const TrackVehicle = () => {
  return (
    <div className="bus">
      <div className="title">Track Vehicle</div>

      <div className="img-container">
        <img src={MapImage} alt="" className="map" />
      </div>

      <div className="map-bottom">
        <div>
          <div className="title">Toyota Sienna</div>
          <div className="distance">3.1 kilometers away</div>
          <Group mt={24}>
            <Text size="sm">
              14, Wuse 904101, Abuja, Federal Capital Territory, Nigeria
            </Text>

            <Button rightIcon={<ArrowCircleRight />} compact variant="subtle">
              Direction
            </Button>
          </Group>
        </div>

        <Menu
          control={
            <Button variant="white">
              <Options />
            </Button>
          }
        >
          <Menu.Label>Menu</Menu.Label>
          <Menu.Item>Refresh</Menu.Item>
          <Menu.Item>Directions</Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

const Options = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17C10.9 17 10 17.9 10 19Z"
        stroke="#121212"
        stroke-width="1.5"
      />
      <path
        d="M10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3C10.9 3 10 3.9 10 5Z"
        stroke="#121212"
        stroke-width="1.5"
      />
      <path
        d="M10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12Z"
        stroke="#121212"
        stroke-width="1.5"
      />
    </svg>
  );
};

export default TrackVehicle;
