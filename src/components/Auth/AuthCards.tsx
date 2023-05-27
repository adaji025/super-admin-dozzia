import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import { BsFlag } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Logo from "../../assets/svg/dozzia.svg";
import Mascot_1 from "../../assets/svg/mascot-1.svg";
import Mascot_2 from "../../assets/svg/mascot-2.svg";
import Mascot_3 from "../../assets/svg/mascot-3.svg";
import G from "../../assets/svg/G.svg";
import Graph from "../../assets/images/graph.png";
import { Box } from "@mantine/core";
import Ellipse_1 from "../../assets/svg/ellipse-1.svg";
import Ellipse_2 from "../../assets/svg/ellipse-2.svg";
import "./auth-c.scss";

export const CardOne = () => {
  return (
    <div className="cards-container">
      <div className="card-one">
        <img src={Ellipse_1} className="ellipse-1" alt="" />
        <img src={Ellipse_2} className="ellipse-2" alt="" />

        <Box sx={{ maxWidth: 680 }}>
          <img src={Logo} alt="" />

          <div className="auth-card-title">
            Best way to effectively manage your school
          </div>

          <div className="auth-desc">
            Use Dozzia to plan, organize, coordinate, command, and control your
            school activities among Students and Parents
          </div>

          <div className="controls">
            <div className="index-1"></div>
            <div className="index-2"></div>
            <div className="index-3"></div>
          </div>

          <div className="onboarding">
            <div className="o-card">
              <div className="icon">
                <IoIosCheckmark size={16} color="white" />
              </div>
              <span>Teacher Onboarding</span>
            </div>

            <div className="o-card">
              <div className="icon">
                <IoIosCheckmark size={16} color="white" />
              </div>
              <span>Student Onboarding</span>
            </div>
          </div>

          <div className="mascot-1">
            <img src={Mascot_1} alt="" />
          </div>
        </Box>
      </div>
    </div>
  );
};

export const CardTwo = () => {
  return (
    <div className="cards-container">
      <div className="card-two">
        <img src={Ellipse_1} className="ellipse-1" alt="" />
        <img src={Ellipse_2} className="ellipse-2" alt="" />
        <Box sx={{ maxWidth: 680 }}>
          <img src={Logo} alt="" />
          <div className="auth-card-title">
            Best way to effectively manage your school
          </div>
          <div className="auth-desc">
            Use Dozzia to plan, organize, coordinate, command, and control your
            school activities among Students and Parents
          </div>
          <div className="controls">
            <div className="index-2"></div>
            <div className="index-1"></div>
            <div className="index-3"></div>
          </div>
          <div className="school-event-container">
            <div className="mascot-2">
              <img src={Mascot_2} alt="" />
            </div>
            <div className="school-event">
              <div className="title">School Events</div>
              <div className="card">
                <img src={G} alt="" />
                <div className="card-text">
                  <div className="card-title">Graduation Party</div>
                  <div className="card-desc">
                    Dear parents/Teachers, please be informed that the gradation
                    party has been postponed to July 12, 2023.....
                  </div>
                </div>
              </div>
              <div className="card">
                <img src={G} alt="" />
                <div className="card-text">
                  <div className="card-title">Graduation Party</div>
                  <div className="card-desc">
                    Dear parents/Teachers, please be informed that the gradation
                    party has been postponed to July 12, 2023.....
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export const CardThree = () => {
  return (
    <div className="cards-container">
      <div className="card-three">
        <img src={Ellipse_1} className="ellipse-1" alt="" />
        <img src={Ellipse_2} className="ellipse-2" alt="" />
        <Box sx={{ maxWidth: 680 }}>
          <img src={Logo} alt="" />
          <div className="auth-card-title">
            Best way to effectively manage your school
          </div>
          <div className="auth-desc">
            Use Dozzia to plan, organize, coordinate, command, and control your
            school activities among Students and Parents
          </div>
          <div className="controls">
            <div className="index-2"></div>
            <div className="index-3"></div>
            <div className="index-1"></div>
          </div>
          <div className="graph">
            <Box sx={{ maxWidth: 300 }}>
              <img src={Graph} alt="" />
            </Box>
          </div>
          <div className="last-box">
            <div className="complaints">
              <div className="complaints-text">
                <span className="progress">Complaints in Progress</span>
                <span className="eight">8</span>
                <span className="view">View</span>
              </div>
              <BsFlag color="#FE6B6B" size={20} />
            </div>
            <div className="complaints">
              <div className="complaints-text">
                <span className="progress">Complaints Resolved</span>
                <span className="eight">2</span>
                <span className="view">View</span>
              </div>
              <FiEdit color="#33CC33" size={20} />
            </div>
          </div>
          <div className="mascot-1">
            <img src={Mascot_3} alt="" />
          </div>
        </Box>
      </div>
    </div>
  );
};
