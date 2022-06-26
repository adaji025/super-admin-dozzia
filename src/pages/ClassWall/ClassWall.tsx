import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { setClassWall } from "../../redux/data/data.actions";
import useClass from "../../hooks/useClass";
import { Button, Menu } from "@mantine/core";
import { ChevronDown } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import "./class-wall.scss";
import "../Classes/classes.scss";

const ClassWall = () => {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classWall = useSelector((state: any) => {
    return state.data.classWall;
  });
  const userdata = useSelector((state: any) => {
    return state.user.userdata;
  });
  const { getClassList, allClasses } = useClass();

  useEffect(() => {
    if (userdata?.role?.name === "Teacher") {
      getClassList(1, 300, true, userdata?.user_id);
    } else {
      getClassList(1, 300, true);
    }
    //eslint-disable-next-line
  }, []);

  const handleWallItemSelect = (route: string) => {
    if (!classWall?.activeClassId) {
      showNotification({
        message: "Select a class to continue",
        color: "yellow",
      });
    } else {
      navigate(route);
    }
  };

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
            <div className="d-p-h-left no-select">
              {classWall?.activeClassName ?? ""} Class Wall
            </div>

            <div className="d-p-h-right">
              <Menu
                size="sm"
                control={
                  <Button rightIcon={<ChevronDown size={14} />}>
                    <span style={{ textTransform: "capitalize" }}>
                      {classWall?.activeClassId === ""
                        ? "Select Class"
                        : classWall?.activeClassName}
                    </span>
                  </Button>
                }
              >
                <Menu.Label>Classroom List</Menu.Label>

                {allClasses.map(
                  (item: { classroom_id: string; classroom_name: string }) => (
                    <Menu.Item
                      key={item.classroom_id}
                      onClick={() => {
                        dispatch(
                          setClassWall({
                            ...classWall,
                            activeClassName: item?.classroom_name,
                            activeClassId: item?.classroom_id,
                          })
                        );
                      }}
                      disabled={classWall?.activeClassId === item.classroom_id}
                    >
                      {item.classroom_name.length > 18
                        ? `${item.classroom_name.substring(0, 18)}...`
                        : item.classroom_name}
                    </Menu.Item>
                  )
                )}
              </Menu>
            </div>
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
                  handleWallItemSelect(item.route);
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
