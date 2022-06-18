import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import "./class-wall.scss";
import "../Classes/classes.scss";

const ClassWall = () => {
  const { dark } = useTheme();
  const navigate = useNavigate();

  const classWallItems = [
    { name: "Academic Log", route: "/class-wall/academic-log" },
    { name: "Behavioral Log", route: "/class-wall/behavioral-log" },
    { name: "Test/Exam", route: "/class-wall/test-exam" },
    { name: "Study Resources", route: "/class-wall/study-resources" },
    { name: "Class Events", route: "/class-wall/class-events" },
    { name: "Curriculum", route: "/class-wall/curriculum" },
  ];

  return (
    <Fragment>
      <Helmet>
        <title>Class Wall</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Class Wall" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <div
        className="data-page-container classwall-container"
        style={{
          background: dark ? "#1a1b1e" : "#ffffff",
        }}
      >
        <div className="d-p-wrapper">
          <div className="d-p-header">
            <div className="d-p-h-left">Class Wall</div>
          </div>
        </div>

        <div
          className="class-wall-main"
          style={{ background: dark ? "#121212" : "#f6f6f6fc" }}
        >
          {classWallItems.map((item, index) => (
            <div className="c-card" key={index}>
              <div
                className="c-c-inner click no-select"
                style={{
                  background: dark ? "#1a1b1e" : "#ffffff",
                }}
                onClick={() => {
                  navigate(item.route);
                }}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ClassWall;
