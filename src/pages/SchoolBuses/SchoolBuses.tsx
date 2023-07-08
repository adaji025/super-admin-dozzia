import React, { useState } from "react";
import { Button, Table, Menu, Group } from "@mantine/core";
import SetupBus from "./SetupBus";
import SuccessModal from "../Wallet/SuccessModal";
import Mascot from "../../assets/svg/smile-mascot.svg";
import Tick from "../../assets/svg/tick.svg";
import BusImage from "../../assets/images/bus.png";
import RelaxedMascot from "../../assets/svg/mascot-2.svg";
import VehicleDetails from "./VehicleDetails";
import { useNavigate } from "react-router-dom";
import "./buses.scss";

const Bus = () => {
  const navigate = useNavigate();
  const [openBusDrawer, setOPenBusDrawer] = useState<boolean>(false);
  const [successOpen, setSuccessOpen] = useState<boolean>(false);
  const [openVehicleDetails, setOpenVehicleDetails] = useState<boolean>(false);

  const features = [
    "Send money to teachers",
    "Receive funds from parents",
    "Create Bill/Ticket",
    "View wallet history ",
  ];

  const tableData = [
    {
      vehicle_name: "Toyota sienna",
      vehicle_color: "blue",
      drivers_name: "Mr Bode James",
    },
    {
      vehicle_name: "Toyota sienna",
      vehicle_color: "blue",
      drivers_name: "Mr Bode James",
    },
    {
      vehicle_name: "Toyota sienna",
      vehicle_color: "blue",
      drivers_name: "Mr Bode James",
    },
  ];
  return (
    <>
      <SetupBus
        callback={() => {}}
        close={() => setOPenBusDrawer(false)}
        drawerOpen={openBusDrawer}
        openSuccessModal={() => setSuccessOpen(true)}
      />

      <SuccessModal
        modalOpen={successOpen}
        close={() => setSuccessOpen(false)}
      />

      <VehicleDetails
        drawerOpen={openVehicleDetails}
        openSuccessModal={() => {}}
        close={() => setOpenVehicleDetails(false)}
        callback={() => {}}
      />

      {tableData.length === 0 && (
        <div className="wallet">
          <div className="purse-on-mobile">
            <img src={BusImage} alt="purse" className="purse-2" />
          </div>

          <div className="wallet-empty-state">
            <div className="wallet-features">
              {features.map((feature, index) => (
                <div className="feature" key={index}>
                  <div className="feature-box">
                    <img src={Tick} alt="small tick" />
                  </div>
                  <span className="feature-text">{feature}</span>
                </div>
              ))}

              <Button
                size="md"
                fullWidth
                onClick={() => setOPenBusDrawer(true)}
              >
                Add bus
              </Button>
            </div>

            <div className="mascot-wallet">
              <img src={BusImage} alt="purse" className="purse" />
              <img src={Mascot} alt="mascot" className="mascot" />
            </div>
          </div>
        </div>
      )}

      <div className="bus">
        <Group position="apart">
          <div className="title">School Vehicles</div>

          <Button onClick={() => setOPenBusDrawer(true)}>Add bus</Button>
        </Group>

        <div className="bus-content">
          <div className="table-container">
            <Table horizontalSpacing="sm">
              <thead>
                <tr>
                  <th>Vehicle name</th>
                  <th>Vehicle color</th>
                  <th>Driver’s name</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index: number) => (
                  <tr className="wallet-table-row" key={index}>
                    <td className="start">{data.vehicle_name}</td>
                    <td>{data.vehicle_color}</td>
                    <td>{data.drivers_name}</td>
                    <td className="end">
                      <Menu>
                        <Menu.Label>Menu</Menu.Label>
                        <Menu.Item
                          onClick={() =>
                            navigate("/school-buses/track-vehicle")
                          }
                        >
                          Track vehicle
                        </Menu.Item>
                        <Menu.Item onClick={() => setOpenVehicleDetails(true)}>
                          View vehicle details
                        </Menu.Item>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="mascot-container relative">
            <img src={RelaxedMascot} alt="" />
            <div className="tool-tip">
              Relax, monitor and track your school buses 🚌 all on Dozzia
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bus;
