import { useState, useEffect, Fragment } from "react";
import {
  Button,
  Group,
  LoadingOverlay,
  Tabs,
  Pagination,
  Skeleton,
  ScrollArea,
  Table,
  Box,
  Alert,
  NumberInput,
  Divider,
} from "@mantine/core";
import { ArrowUpRight } from "tabler-icons-react";
import useTheme from "../../../hooks/useTheme";
import { InfoCircle, Messages } from "tabler-icons-react";
import useAcademicLog from "../../../hooks/useAcademicLog";
import moment from "moment";
import { saveAs } from "file-saver";

const ViewAcademicTask = ({ closeModal, task, modalActive }: any) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const onChange = (active: number) => {
    setActiveTab(active);
  };

  return (
    <div className="r32">
      <Tabs active={activeTab} onTabChange={onChange} variant="outline">
        <Tabs.Tab
          icon={<InfoCircle size={14} />}
          label="Task Details"
          tabKey="1"
        >
          <TaskDetails closeModal={closeModal} task={task} />
        </Tabs.Tab>
        <Tabs.Tab icon={<Messages size={14} />} label="Responses" tabKey="2">
          <TaskResponses
            closeModal={closeModal}
            modalActive={modalActive}
            task={task}
          />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

const TaskDetails = ({ closeModal, task }: any) => {
  const { dark } = useTheme();

  return (
    <div className="view-details">
      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Title:</div>
        <div className="d-r-right">{task?.title}</div>
      </div>

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Description:</div>
        <div className="d-r-right">{task?.description}</div>
      </div>

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Subject:</div>
        <div className="d-r-right">{task?.subject?.name}</div>
      </div>

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Date Created:</div>
        <div className="d-r-right">
          {moment(task?.created_at).format("Do MMM, YYYY")}
        </div>
      </div>

      <div
        className="v-d-row"
        style={{
          borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
        }}
      >
        <div className="d-r-left">Submission Deadline:</div>
        <div className="d-r-right">
          {moment(task?.end_at).format("Do MMM, YYYY")}
        </div>
      </div>

      {task?.link && (
        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Download link:</div>
          <div
            className="d-r-right"
            style={{
              color: dark ? "#a8a8ff" : "blue",
              textDecoration: "underline",
            }}
          >
            <a href={task?.link} target="_blank" rel="noreferrer">
              {task?.link}
            </a>{" "}
            <ArrowUpRight size={14} />
          </div>
        </div>
      )}

      {task?.file_url && (
        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Document:</div>
          <div
            className="d-r-right"
            style={{
              color: dark ? "#a8a8ff" : "blue",
              textDecoration: "underline",
            }}
          >
            <a href={task?.file_url} target="_blank" rel="noreferrer">
              {task?.file_url}
            </a>{" "}
            <ArrowUpRight size={14} />
          </div>
        </div>
      )}

      <Group position="right" mt="lg">
        <Button variant="default" onClick={closeModal}>
          Close
        </Button>
      </Group>
    </div>
  );
};

interface TaskScore {
  response_id: string;
  grade: number;
}

const TaskResponses = ({ closeModal, modalActive, task }: any) => {
  const [activeView, setActiveView] = useState<string>("responses");
  const [taskResponses, setTaskResponses] = useState<any>(null);
  const { loading, handleGetTaskResponses, handleGradeTaskResponses } =
    useAcademicLog();
  const [taskTotalScore, setTaskTotalScore] = useState<number>(0);
  const [scoreData, setScoreData] = useState<Array<TaskScore>>([]);
  const [scoreDataUpdateTrigger, setScoreDataUpdateTrigger] = useState<
    [number, number]
  >([0, 0]);
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(20);
  const { dark } = useTheme();

  useEffect(() => {
    if (modalActive) {
      getResponses();
    }

    //eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (taskResponses) {
      handleScoreUpdate(scoreDataUpdateTrigger[0], scoreDataUpdateTrigger[1]);
    }

    //eslint-disable-next-line
  }, [scoreDataUpdateTrigger]);

  const getResponses = () => {
    handleGetTaskResponses(page, perPage, task?.task_id).then((res: any) => {
      setTaskResponses(res);
      createScores(res?.data);
    });
  };

  const createScores = (scores: any) => {
    let data: Array<TaskScore> = [];
    let total: number = 0;

    for (let i = 0; i < scores.length; i++) {
      data.push({
        response_id: scores[i].response_id,
        grade: scores[i].grade,
      });

      if (scores[i].total_grade) {
        total = scores[i].total_grade;
      }
    }
    setTaskTotalScore(total);
    setScoreData(data);
  };

  const handleScoreUpdate = (index: number, value: number) => {
    let data = scoreData;
    data[index].grade = value;

    setScoreData(data);
  };

  const submitGrading = () => {
    let reqArray = [];

    for (let i = 0; i < scoreData.length; i++) {
      const item = { ...scoreData[i], total_grade: taskTotalScore };
      reqArray.push(item);
    }

    handleGradeTaskResponses(reqArray).then(() => {
      getResponses();
      setActiveView("responses");
    });
  };

  return (
    <div className="task-responses modal-table-container">
      <LoadingOverlay visible={loading} />

      <Box sx={{ minHeight: 400 }}>
        {taskResponses && taskResponses.data && !loading ? (
          <ScrollArea>
            <Table
              striped
              verticalSpacing="sm"
              style={{ minWidth: taskResponses?.data.length > 0 ? 700 : "" }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: `1px solid #0000`,
                    }}
                  >
                    Student Name
                  </th>

                  {activeView === "responses" && (
                    <Fragment>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Uploaded File
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Shared URL
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Date Submitted
                      </th>
                    </Fragment>
                  )}

                  {activeView === "grade" && (
                    <Fragment>
                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Total Score
                      </th>

                      <th
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                      >
                        Student Score
                      </th>
                    </Fragment>
                  )}
                </tr>
              </thead>
              <tbody>
                {taskResponses?.data.map(
                  (
                    item: {
                      response_id: string;
                      file_url: string;
                      grade: string;
                      total_grade: string;
                      link: string;
                      student: {
                        first_name: string;
                        last_name: string;
                      };
                    },
                    index: number
                  ) => (
                    <tr key={item.response_id}>
                      <td
                        style={{
                          borderBottom: `1px solid #0000`,
                        }}
                        className="large-only"
                      >
                        {`${item.student.first_name} ${item.student.last_name}`}
                      </td>

                      {activeView === "responses" && (
                        <Fragment>
                          <td
                            style={{
                              borderBottom: `1px solid #0000`,
                              color: dark ? "#a8a8ff" : "blue",
                              textDecoration: "underline",
                            }}
                          >
                            <span
                              className="click"
                              onClick={() => {
                                saveAs(
                                  item?.file_url,
                                  `${item.student.first_name} ${item.student.last_name} task submission`
                                );
                              }}
                            >
                              View file
                            </span>{" "}
                            <ArrowUpRight size={14} />
                          </td>

                          <td
                            style={{
                              borderBottom: `1px solid #0000`,
                              color: dark ? "#a8a8ff" : "blue",
                              textDecoration: "underline",
                            }}
                          >
                            <a
                              href={item?.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open URL
                            </a>{" "}
                            <ArrowUpRight size={14} />
                          </td>

                          <td
                            style={{
                              borderBottom: `1px solid #0000`,
                            }}
                          ></td>
                        </Fragment>
                      )}

                      {activeView === "grade" && (
                        <Fragment>
                          <td
                            style={{
                              borderBottom: `1px solid #0000`,
                            }}
                          >
                            <NumberInput
                              value={taskTotalScore}
                              sx={{ maxWidth: 150 }}
                              placeholder="Total Score"
                              hideControls
                              onChange={(value: number) => {
                                setTaskTotalScore(value);
                              }}
                            />
                          </td>

                          <td
                            style={{
                              borderBottom: `1px solid #0000`,
                            }}
                          >
                            {item?.grade ? (
                              item?.grade
                            ) : (
                              <NumberInput
                                sx={{ maxWidth: 150 }}
                                placeholder="Task Score"
                                hideControls
                                value={
                                  scoreData[index]?.grade
                                    ? scoreData[index]?.grade
                                    : 0
                                }
                                onChange={(value: number) => {
                                  setScoreDataUpdateTrigger([index, value]);
                                }}
                              />
                            )}
                          </td>
                        </Fragment>
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </Table>

            {taskResponses?.data.length === 0 && (
              <Group grow position="center" my={80}>
                <Alert
                  title="Bummer!"
                  color="red"
                  style={{ maxWidth: "350px" }}
                >
                  No task found.
                </Alert>
              </Group>
            )}
          </ScrollArea>
        ) : (
          <>
            <Skeleton height={25} mt={30} radius="sm" />
            <Skeleton height={25} mt={12} radius="sm" />
            <Skeleton height={25} mt={12} radius="sm" />
            <Skeleton height={25} mt={12} radius="sm" />
            <Skeleton height={25} mt={12} radius="sm" />
          </>
        )}
      </Box>

      {activeView === "responses" &&
        taskResponses?.meta &&
        taskResponses?.data.length > 0 && (
          <Pagination
            sx={{ maxWidth: 1000 }}
            position="center"
            mt={25}
            onChange={(value) => {
              if (value !== taskResponses.meta.current_page) {
                setPage(value);
              }
            }}
            initialPage={taskResponses.meta.current_page}
            total={taskResponses.meta.last_page}
          />
        )}

      <Divider mt="sm" variant="dotted" />

      <Group position="right" mt="lg">
        <Button
          variant="default"
          onClick={() => {
            if (activeView === "grade") {
              setActiveView("responses");
            } else {
              closeModal();
            }
          }}
        >
          {activeView === "responses" && "Close"}
          {activeView === "grade" && "Go back"}
        </Button>

        <Button
          disabled={scoreData.length === 0}
          onClick={() => {
            if (activeView === "responses") {
              setActiveView("grade");
            } else {
              submitGrading();
            }
          }}
        >
          {activeView === "responses" && "Grade Students"}
          {activeView === "grade" && "Submit"}
        </Button>
      </Group>
    </div>
  );
};

export default ViewAcademicTask;
