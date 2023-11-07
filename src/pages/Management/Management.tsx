import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { LoadingOverlay, Text, Table, Menu, Divider } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import Mountain from "../../assets/svg/mountains.svg";
import CloudIcon from "../../assets/svg/cloud.svg";

import { useNavigate } from "react-router-dom";
import { deleteSchool, getSchoolList } from "../../services/shcool/school";
import { SchoolTypes } from "../../types/schoolTypes";
import useNotification from "../../hooks/useNotification";
import "./management.scss";

const Management = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [schoolList, setSchoolList] = useState<SchoolTypes[]>([]);
  const [perPage] = useState(10);
  const [page] = useState(1);
  const [searchInput] = useState<string>("");
  const [schoolId, setSchoolId] = useState<string | null>(null);

  console.log(schoolList);

  const navigate = useNavigate();

  const { handleError } = useNotification();

  useEffect(() => {
    handleGetSchoolList();
    //eslint-disable-next-line
  }, []);

  const handleGetSchoolList = () => {
    setLoading(true);
    getSchoolList(perPage, page, searchInput)
      .then((res: any) => {
        setSchoolList(res.data.data);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const analyticsData = [
    {
      title: "Total Schools",
      value: 1000,
      desc: "3.5% increase this month",
    },
    {
      title: "Active Schools",
      value: 900,
      desc: "5% increase this month",
    },
    {
      title: "Total Parents",
      value: 300,
      desc: "6% increase this month",
    },
    {
      title: "Total Staff",
      value: 1000,
      desc: "3.5% decrease this month",
    },
  ];

  const handleDeleteSchool = () => {
    setLoading(true);

    if (schoolId)
      deleteSchool(schoolId)
        .then(() => {
          showNotification({
            title: "Success",
            message: "School deleted successfully 🤗",
            color: "green",
          });
        })
        .catch((err) => {
          handleError(err);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Management</title>
        <meta property="og:title" content="Management" />
      </Helmet>

      <LoadingOverlay visible={loading} />

      <div className="analytics">
        {analyticsData.map((item, index) => (
          <AnalyticsCard item={item} index={index} key={index} />
        ))}
      </div>

      <div className="dashboard">
        <Text size="xl" weight={600}>
          Schools
        </Text>
        <div className="table-container">
          <Table>
            <thead>
              <tr>
                <th>School name</th>
                <th>Address</th>
                <th>Date Onboarded</th>
                <th>Onboarded by</th>
              </tr>
            </thead>
            <tbody>
              {schoolList?.map((element) => (
                <tr key={element.school_id} className="deleted">
                  <td className={`${element.deleted_at && "deleted"}`}>{element.name}</td>
                  <td className={`${element.deleted_at && "deleted"}`}>{element.address}</td>
                  <td className={`${element.deleted_at && "deleted"}`}>{element.created_at}</td>
                  <td className={`${element.deleted_at && "deleted"}`}>onboarded_by</td>
                  <td className={`${element.deleted_at && "deleted"}`} onClick={() => setSchoolId(element.school_id)}>
                    <Menu>
                      <Menu.Item>
                        <Text weight={300} color="#495057">
                          Menu
                        </Text>
                      </Menu.Item>

                      <Divider />
                      <Menu.Item onClick={() => navigate("/onboard-student")}>
                        Edit school
                      </Menu.Item>
                      <Divider />
                      <Menu.Item
                        onClick={() =>
                          navigate(`/school-details/${element.school_id}`)
                        }
                      >
                        View student details
                      </Menu.Item>
                      <Divider />
                      <Menu.Item color="red" onClick={handleDeleteSchool}>
                        Delete school
                      </Menu.Item>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
};

type AnalyticsProps = {
  index: number;
  item: {
    title: string;
    value: number;
    desc: string;
  };
};

const AnalyticsCard = ({ item, index }: AnalyticsProps) => {
  return (
    <div className={`analytic-card c-${index}`}>
      <div className="a-title">{item.title}</div>
      <div className="a-total">{item.value}</div>
      <div className="a-desc">
        <img src={CloudIcon} alt="dozzia" />
        {item.desc}
      </div>
      <img src={Mountain} alt="mountains" className="mountains" />
    </div>
  );
};

export default Management;
