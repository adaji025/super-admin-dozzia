import { useState, useEffect } from "react";
import {
  Button,
  Group,
  Tabs,
  Textarea,
  LoadingOverlay,
  Alert,
  TextInput,
  Divider,
  Skeleton,
  Box,
  Table,
  ScrollArea,
  ColorSwatch,
  useMantineTheme,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useTheme from "../../../hooks/useTheme";
import { List, CirclePlus, Edit, Check } from "tabler-icons-react";
import { DatePicker } from "@mantine/dates";
import useCurriculum from "../../../hooks/useCurriculum";
import moment from "moment";
import "./class-wall-modals.scss";

const ViewCurriculum = ({
  closeModal,
  subjectId,
  classId,
  modalActive,
}: {
  closeModal: () => void;
  subjectId: string;
  classId: string;
  modalActive: boolean;
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const {
    loading,
    setLoading,
    handleCreateCurriculumItem,
    handleUpdateCurriculumItem,
    handleGetCurriculum,
  } = useCurriculum();
  const [page] = useState<number>(1);
  const [perPage] = useState<number>(100);
  const [curriculum, setCurriculum] = useState<any>(null);
  const [edit, setEdit] = useState<any>(null);

  useEffect(() => {
    if (modalActive) {
      getCurriculum();
    }

    //eslint-disable-next-line
  }, [page]);

  const getCurriculum = () => {
    handleGetCurriculum(page, perPage, subjectId, classId).then((res) => {
      setCurriculum(res);
    });
  };

  const onChange = (active: number) => {
    setActiveTab(active);
    if (active === 0 && edit) {
      setEdit(null);
    }
  };

  const addTopic = (values: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    color: string;
    components: Array<string>;
  }) => {
    handleCreateCurriculumItem({
      ...values,
      subject_id: subjectId,
      classroom_id: classId,
    }).then(() => {
      onChange(0);
      getCurriculum();
    });
  };

  return (
    <div className="r32">
      <LoadingOverlay visible={loading} />

      <Tabs active={activeTab} onTabChange={onChange} variant="outline">
        <Tabs.Tab icon={<List size={14} />} label="View Curriculum" tabKey="1">
          <ViewCurricula closeModal={closeModal} curriculum={curriculum} />
        </Tabs.Tab>
        <Tabs.Tab
          icon={edit ? <Edit size={14} /> : <CirclePlus size={14} />}
          label={`${edit ? "Edit" : "Add"} Topic`}
          tabKey="2"
        >
          <AddTopic
            closeModal={() => {
              closeModal();
            }}
            submit={addTopic}
          />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

const ViewCurricula = ({ closeModal, curriculum }: any) => {
  return (
    <div className="curriculum-container">
      <Box sx={{ minHeight: 450 }}>
        {curriculum && curriculum?.data ? (
          <ScrollArea>
            <Table
              striped
              style={{ minWidth: curriculum?.data.length > 0 ? 800 : "" }}
            >
              <thead>
                <tr>
                  <th>Timeline</th>
                  <th>Topics</th>
                  <th>Assessment</th>
                </tr>
              </thead>

              <tbody>
                {curriculum?.data.map(
                  (
                    item: {
                      id: string;
                      subject: {
                        subject_id: string;
                        subject_name: string;
                        subject_category: number;
                      };
                      teacher: {
                        title: string;
                        first_name: string;
                        last_name: string;
                        staff_id: string;
                      };
                    },
                    index: number
                  ) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.subject.subject_name}</td>
                      <td className="large-only">
                        {item.subject.subject_category}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>

            {curriculum?.data && curriculum?.data.length === 0 && (
              <Group grow position="center" my={100}>
                <Alert
                  title="Bummer!"
                  color="red"
                  style={{ maxWidth: "300px" }}
                >
                  Curriculum is empty.
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

      <Divider mt="md" variant="dotted" />

      <Group position="right" mt="lg">
        <Button onClick={closeModal}>Close</Button>
      </Group>
    </div>
  );
};

const AddTopic = ({ closeModal, edit, submit }: any) => {
  const theme = useMantineTheme();
  const [selectedColor, setSelectedColor] = useState<string>("dark");
  const { dark } = useTheme();

  const form = useForm({
    initialValues: {
      components: edit ? `${edit?.is_draft}` : "",
      title: edit ? `${edit?.title}` : "",
      start_date: edit ? moment(edit.start_date).toDate() : "",
      end_date: edit ? moment(edit.end_date).toDate() : "",
      description: edit ? edit?.description : "",
    },

    validate: {
      description: (value) => (value === "" ? "Input topic description" : null),
      components: (value) => (value === "" ? "Select assesment methods" : null),
      start_date: (value) => (value === "" ? "Select start date" : null),
      end_date: (value) => (value === "" ? "Select end date" : null),
    },
  });

  const swatches = Object.keys(theme.colors).map((color) => (
    <ColorSwatch
      key={color}
      color={dark && color === "dark" ? "white" : theme.colors[color][6]}
      onClick={() => {
        setSelectedColor(color);
      }}
      style={{ cursor: "pointer" }}
      size={40}
    >
      {selectedColor === color && (
        <Check color={!dark && color === "dark" ? "white" : "black"} />
      )}
    </ColorSwatch>
  ));

  return (
    <div>
      <form
        onSubmit={form.onSubmit((values) => {
          submit({ ...values, color: selectedColor });
        })}
      >
        <TextInput
          required
          mt="sm"
          variant="filled"
          label="Title"
          placeholder="Title"
          {...form.getInputProps("title")}
        />

        <Textarea
          mt="md"
          required
          label="Description"
          placeholder="Enter brief description of the topic"
          variant="filled"
          autosize
          minRows={3}
          maxRows={5}
          {...form.getInputProps("description")}
        />

        <div className="form-row">
          <DatePicker
            mt="md"
            initialLevel="year"
            className="form-item"
            label="Send Date"
            placeholder="Date"
            variant="filled"
            required
            {...form.getInputProps("start_date")}
          />

          <DatePicker
            mt="md"
            initialLevel="year"
            className="form-item"
            label="Send Date"
            placeholder="Date"
            variant="filled"
            required
            {...form.getInputProps("end_date")}
          />
        </div>

        <MultiSelect
          mt="md"
          variant="filled"
          required
          data={[
            { value: "Classwork", label: "Classwork" },
            { value: "Assignment", label: "Assignment" },
            { value: "Examination", label: "Examination" },
          ]}
          label="Assessment"
          placeholder="Select all that applies"
          {...form.getInputProps("components")}
        />

        <div className="color-select">
          <div className="c-s-title">
            Select Color (Default: {dark ? "white" : "black"}) <span>*</span>
          </div>

          <Group position="left" spacing="xs">
            {swatches}
          </Group>
        </div>

        <Group position="right" mt="xl">
          <Button variant="default" onClick={closeModal}>
            {edit ? "Go back" : "Close"}
          </Button>
          <Button type="submit">{edit ? "Save Changes" : "Submit"}</Button>
        </Group>
      </form>
    </div>
  );
};

export default ViewCurriculum;
