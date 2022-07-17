import { useState, useEffect } from "react";
import {
  Button,
  Group,
  LoadingOverlay,
  Alert,
  Divider,
  Skeleton,
  Box,
  Table,
  ScrollArea,
  Text,
  NumberInput,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useTheme from "../../../hooks/useTheme";
import { Edit } from "tabler-icons-react";
import { useSelector } from "react-redux";
import useReportCard from "../../../hooks/useReportCard";
import useTermsSessions from "../../../hooks/useTermsSessions";
import useTestExams from "../../../hooks/useTestExams";
import "./class-wall-modals.scss";

const ViewReportCard = ({
  closeModal,
  studentId,
  modalActive,
}: {
  closeModal: () => void;
  modalActive: boolean;
  studentId: string;
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { loading, setLoading, handleGetStudentReportCard } = useReportCard();
  const { handlePostTestExam } = useTestExams();
  const { getActiveTerm } = useTermsSessions();
  const [reportCard, setReportCard] = useState<any>(null);
  const [edit, setEdit] = useState<any>(null);

  useEffect(() => {
    if (modalActive) {
      getReportCard();
    }

    //eslint-disable-next-line
  }, []);

  const getReportCard = () => {
    const term = getActiveTerm();

    handleGetStudentReportCard(term?.id, studentId).then((res) => {
      setReportCard(res);
    });
  };

  const onChange = (active: number) => {
    setActiveTab(active);
    if (active === 0 && edit) {
      setEdit(null);
    }
  };

  const onPressEdit = (scores: {
    test_exam_id: string;
    first_ca_score: number;
    second_ca_score: number;
    third_ca_score: number;
    exam_score: number;
    grade: string;
    subject: {
      subject_name: string;
    };
  }) => {
    onChange(1);
    setEdit(scores);
  };

  const postScores = (
    id: string,
    values: {
      first_ca_score: string;
      second_ca_score: string;
      third_ca_score: string;
      exam_score: string;
      grade_id: string;
    }
  ) => {
    setLoading(true);
    handlePostTestExam(id, values)
      .then(() => {
        onChange(0);
        getReportCard();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="r32">
      <LoadingOverlay visible={loading} />
      <Divider mb="sm" variant="dotted" />

      {activeTab === 0 && (
        <ReportCard
          closeModal={closeModal}
          reportCard={reportCard?.data}
          onPressEdit={onPressEdit}
        />
      )}

      {activeTab === 1 && (
        <EditScores onChange={onChange} edit={edit} submit={postScores} />
      )}
    </div>
  );
};

const ReportCard = ({ closeModal, reportCard, onPressEdit }: any) => {
  const { dark } = useTheme();

  return (
    <div>
      <div className="view-details">
        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Student Name:</div>
          <div className="d-r-right">
            {reportCard?.student?.first_name} {reportCard?.student?.last_name}
          </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Class:</div>
          <div className="d-r-right">
            {reportCard?.classroom?.classroom_name}
          </div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Term:</div>
          <div className="d-r-right">
            {reportCard?.term?.term === 1 && "1st Term"}
            {reportCard?.term?.term === 2 && "2nd Term"}
            {reportCard?.term?.term === 3 && "3rd Term"} -{" "}
            {reportCard?.term?.session?.start_year}/
            {reportCard?.term?.session?.end_year}
          </div>
        </div>
      </div>

      <div className="curriculum-container modal-table-container">
        <Box mt={10} sx={{ minHeight: 400 }}>
          {reportCard && reportCard?.test_exam_scores ? (
            <ScrollArea>
              <Table
                verticalSpacing="xs"
                style={{
                  minWidth: reportCard?.test_exam_scores.length > 0 ? 800 : "",
                }}
              >
                <thead className={dark ? "border-dark" : "border-light"}>
                  <tr>
                    <th>Subjects</th>
                    <th>CA 1</th>
                    <th>CA 2</th>
                    <th>CA 3</th>
                    <th>Exams</th>
                    <th>Total</th>
                    <th>Grade</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {reportCard?.test_exam_scores?.map(
                    (item: {
                      test_exam_id: string;
                      first_ca_score: string;
                      second_ca_score: string;
                      third_ca_score: string;
                      exam_score: string;
                      grade: {
                        name: string;
                      };
                      subject: {
                        subject_name: string;
                      };
                    }) => (
                      <tr
                        key={item.test_exam_id}
                        className={dark ? "border-dark" : "border-light"}
                      >
                        <td>
                          <Text size="xs">{item?.subject?.subject_name}</Text>
                        </td>

                        <td>
                          <Text size="sm">{Number(item?.first_ca_score)}</Text>
                        </td>

                        <td>
                          <Text size="sm">{Number(item?.second_ca_score)}</Text>
                        </td>

                        <td>
                          <Text size="sm">{Number(item?.third_ca_score)}</Text>
                        </td>

                        <td>
                          <Text size="sm">{Number(item?.exam_score)}</Text>
                        </td>

                        <td>
                          <Text size="sm">
                            {Number(item?.first_ca_score) +
                              Number(item?.second_ca_score) +
                              Number(item?.third_ca_score) +
                              Number(item?.exam_score)}
                          </Text>
                        </td>

                        <td>
                          <Text size="sm">{item?.grade?.name}</Text>
                        </td>

                        <td style={{ width: 90 }}>
                          <Button
                            variant="subtle"
                            leftIcon={<Edit size={14} />}
                            onClick={() => {
                              onPressEdit(item);
                            }}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>

              {reportCard?.test_exam_scores &&
                reportCard?.test_exam_scores.length === 0 && (
                  <Group grow position="center" my={100}>
                    <Alert
                      title="Bummer!"
                      color="red"
                      style={{ maxWidth: "300px" }}
                    >
                      No subject found.
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
      </div>

      <Divider mt="md" variant="dotted" />
      <Group position="right" mt="lg">
        <Button onClick={closeModal}>Close</Button>
      </Group>
    </div>
  );
};

const EditScores = ({ onChange, edit, submit }: any) => {
  const { dark } = useTheme();
  const grades = useSelector((state: any) => {
    return state.data.grades;
  });

  const form = useForm({
    initialValues: {
      first_ca_score: edit?.first_ca_score ? Number(edit?.first_ca_score) : "",
      second_ca_score: edit?.second_ca_score
        ? Number(edit?.second_ca_score)
        : "",
      third_ca_score: edit?.third_ca_score ? Number(edit.third_ca_score) : "",
      exam_score: edit?.exam_score ? Number(edit.exam_score) : "",
      grade_id: edit ? edit?.grade?.id : "",
    },
  });

  return (
    <div>
      <div className="view-details">
        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Subject Name:</div>
          <div className="d-r-right">{edit?.subject?.subject_name}</div>
        </div>
      </div>

      <form
        onSubmit={form.onSubmit((values) => {
          submit(edit?.test_exam_id, values);
        })}
      >
        <Box style={{ maxWidth: 400 }}>
          <NumberInput
            className="form-item"
            mt="sm"
            label="CA 1 Score"
            placeholder="e.g. 10"
            variant="filled"
            precision={1}
            {...form.getInputProps("first_ca_score")}
          />

          <NumberInput
            className="form-item"
            mt="sm"
            label="CA 2 Score"
            placeholder="e.g. 10"
            variant="filled"
            precision={1}
            {...form.getInputProps("second_ca_score")}
          />

          <NumberInput
            className="form-item"
            mt="sm"
            label="CA 3 Score"
            placeholder="e.g. 10"
            variant="filled"
            precision={1}
            {...form.getInputProps("third_ca_score")}
          />

          <NumberInput
            className="form-item"
            mt="sm"
            label="Exam Score"
            placeholder="e.g. 70"
            variant="filled"
            precision={1}
            {...form.getInputProps("exam_score")}
          />

          <Select
            mt="sm"
            label="Select Grade"
            placeholder="Select subject grade"
            variant="filled"
            searchable
            nothingFound="No grade found"
            data={grades?.data.map(
              (item: {
                id: string;
                min_score: number;
                max_score: number;
                name: string;
              }) => ({
                key: item?.id,
                value: item?.id,
                label: `${item?.name} (${item?.min_score} - ${item?.max_score})`,
              })
            )}
            {...form.getInputProps("grade_id")}
          />
        </Box>
        <Divider mt="md" variant="dotted" />

        <Group position="right" mt="xl">
          <Button
            variant="default"
            onClick={() => {
              onChange(0);
            }}
          >
            {edit ? "Go back" : "Close"}
          </Button>
          <Button type="submit">{edit ? "Save Changes" : "Submit"}</Button>
        </Group>
      </form>
    </div>
  );
};

export default ViewReportCard;
