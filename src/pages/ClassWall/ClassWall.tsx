import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { setClassWall } from "../../redux/data/data.actions";
import useClass from "../../hooks/useClass";
import { Button, Menu } from "@mantine/core";
import { ChevronDown, ArrowLeft } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import RelaxedMascot from "../../assets/svg/relaxed-mascot.svg";

import AcademicLog from "../../assets/svg/academic-log.svg";
import BehavioralLog from "../../assets/svg/behavioral-log.svg";
import TestsExams from "../../assets/svg/tests-exams.svg";
import StudyResources from "../../assets/svg/study-resources.svg";
import ClassEvent from "../../assets/svg/class-event.svg";
import Curriculum from "../../assets/svg/curriculum.svg";

import AcademicLogIcon from "../../assets/svg/academic-log-icon.svg";
import BehavioralLogIcon from "../../assets/svg/behavioral-log-icon.svg";
import TestsExamsIcon from "../../assets/svg/test-exams-icon.svg";
import StudyResourcesIcon from "../../assets/svg/study-resources-icon.svg";
import ClassEventIcon from "../../assets/svg/class-event-icon.svg";
import CurriculumIcon from "../../assets/svg/curriculum-icon.svg";

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
  const { getClassList } = useClass();

  useEffect(() => {
    if (userdata?.role?.name === "Teacher") {
      getClassList(1, 300, "", "", true, userdata?.user_id).then((res: any) => {
        dispatch(
          setClassWall({
            ...classWall,
            classes: res?.data,
          })
        );
      });
    } else {
      getClassList(1, 300, "", "", true).then((res: any) => {
        dispatch(
          setClassWall({
            ...classWall,
            classes: res?.data,
          })
        );
      });
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
    {
      name: "Academic Log",
      route: "/class-wall/academic-log",
      ellipse: AcademicLog,
      icon: AcademicLogIcon,
    },
    {
      name: "Behavioral Log",
      route: "/class-wall/behavioral-log",
      ellipse: BehavioralLog,
      icon: BehavioralLogIcon,
    },
    {
      name: "Tests and Exams",
      route: "/class-wall/test-exam",
      ellipse: TestsExams,
      icon: TestsExamsIcon,
    },
    {
      name: "Study Resources",
      route: "/class-wall/study-resources",
      ellipse: StudyResources,
      icon: StudyResourcesIcon,
    },
    {
      name: "Class Events",
      route: "/class-wall/class-events",
      ellipse: ClassEvent,
      icon: ClassEventIcon,
    },
    {
      name: "Curriculum",
      route: "/class-wall/curriculum",
      ellipse: Curriculum,
      icon: CurriculumIcon,
    },
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
              {userdata?.role?.name === "School Admin" && (
                <span
                  className="go-back click"
                  onClick={() => {
                    navigate("/classes");
                  }}
                >
                  <ArrowLeft size={20} />
                </span>
              )}{" "}
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

                {classWall?.classes.map(
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
          style={{ background: dark ? "#121212" : "" }}
        >
          {classWallItems.map((item, index) => (
            <div
              className={`c-card card-${index + 1} click`}
              key={index}
              onClick={() => {
                handleWallItemSelect(item.route);
              }}
            >
              <div className="inner-c-card">
                <div className="inner-c-card-icon">
                  <img src={item.icon} alt="" />
                </div>
                <div className="inner-c-card-text">{item.name}</div>
                <div className="ellipse">
                  <img src={item.ellipse} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mascot-container relative">
          <img src={RelaxedMascot} alt="" />
          <div className="tool-tip">
            Relax and let Dozzia manage your school’s reports and activities
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ClassWall;
