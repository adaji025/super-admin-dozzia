import { useEffect } from "react";
import {
  Button,
  TextInput,
  Select,
  Group,
  Divider,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useSubject from "../../../hooks/useSubject";
import useClass from "../../../hooks/useClass";
import useStaff from "../../../hooks/useStaff";

const AssignToClass = ({
  closeModal,
  subject,
  modalActive,
}: {
  closeModal: () => void;
  subject: {
    subject_id: string;
    subject_name: string;
    subject_category: string;
    subject_description: string;
  };
  modalActive: boolean;
}) => {
  const { handleAssignClassAndTeacher } = useSubject();
  const { allClasses, getClassList } = useClass();
  const { allStaff, handleGetStaffList } = useStaff();

  useEffect(() => {
    if (modalActive) {
      handleGetStaffList(1, 500, "", "teacher", true);
      getClassList(1, 300, true);
    }
    //eslint-disable-next-line
  }, []);

  const form = useForm({
    initialValues: {
      name: subject ? subject.subject_name : "",
      category: subject ? subject.subject_category : "",
      teacher: "",
      classroom: "",
    },

    validate: {
      category: (value) => (value === "" ? "Select subject category" : null),
    },
  });

  const submit = (values: any) => {
    handleAssignClassAndTeacher(subject.subject_id, {
      teacher: values.teacher,
      classroom: values.classroom,
    });
  };

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      {allStaff ? (
        <form
          onSubmit={form.onSubmit((values) => {
            closeModal();
            submit(values);
          })}
        >
          <TextInput
            required
            mt="sm"
            variant="filled"
            label="Subject Name"
            placeholder="Subject name"
            disabled
            {...form.getInputProps("name")}
          />

          <TextInput
            required
            mt="md"
            label="Subject Category"
            placeholder="Subject category"
            variant="filled"
            disabled
            {...form.getInputProps("category")}
          />

          <Select
            required
            mt="md"
            label="Select Teacher"
            placeholder="Select teacher"
            variant="filled"
            searchable
            nothingFound="No teacher found"
            data={allStaff.map(
              (teacher: {
                staff_id: string;
                first_name: string;
                middle_name: string;
                last_name: string;
                title: string;
              }) => ({
                key: teacher?.staff_id,
                value: teacher?.staff_id,
                label: `${teacher.title} ${teacher.first_name} ${teacher.middle_name} ${teacher.last_name}`,
              })
            )}
            {...form.getInputProps("teacher")}
          />

          <Select
            required
            mt="md"
            label="Select Class"
            placeholder="Select class"
            variant="filled"
            searchable
            nothingFound="No class found"
            data={allClasses.map(
              (item: { classroom_id: string; classroom_name: string }) => ({
                key: item?.classroom_id,
                value: item?.classroom_id,
                label: item.classroom_name,
              })
            )}
            {...form.getInputProps("classroom")}
          />

          <Group position="right" mt="lg">
            <Button variant="light" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      ) : (
        <Box sx={{ minHeight: 270 }}>
          <LoadingOverlay visible />
        </Box>
      )}
    </div>
  );
};

export default AssignToClass;
