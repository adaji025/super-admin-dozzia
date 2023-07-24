import { useEffect } from "react";
import {
  Button,
  TextInput,
  Select,
  Group,
  Divider,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useSubject from "../../../hooks/useSubject";
import useClass from "../../../hooks/useClass";
import useStaff from "../../../hooks/useStaff";
import { ClassroomType } from "../../../types/classTypes";
import { Roles } from "../../../types/authTypes";
import { StaffType } from "../../../types/staffTypes";
import { SubjectType } from "../../../types/subjectsTypes";

interface AddSubjectToClassProps {
  closeModal: () => void;
  subject: SubjectType | null;
  modalActive: boolean;
}

const AddSubjectToClass = ({
  closeModal,
  subject,
  modalActive,
}: AddSubjectToClassProps) => {
  const { handleAssignClassAndTeacher } = useSubject();
  const { allClasses, getClassList } = useClass();
  const { allStaff, handleGetStaffList } = useStaff();

  useEffect(() => {
    if (modalActive) {
      handleGetStaffList(1, 500, "", Roles.Teacher, true);
      getClassList(1, 300, "", "", true);
    }
    //eslint-disable-next-line
  }, []);

  const form = useForm({
    initialValues: {
      name: subject ? subject.name : "",
      category: subject ? subject.category : "",
      teacher: "",
      classroom: "",
    },

    validate: {
      category: (value) => (value === "" ? "Select subject category" : null),
    },
  });

  const submit = (values: any) => {
    handleAssignClassAndTeacher(subject?.subject_id ?? "", {
      teacher: values.teacher,
      classroom: values.classroom,
    });
  };

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <LoadingOverlay visible={!allStaff.meta} />

      <form
        onSubmit={form.onSubmit((values) => {
          closeModal();
          submit(values);
        })}
      >
        <TextInput
          required
          mt="sm"
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
          disabled
          {...form.getInputProps("category")}
        />

        <Select
          required
          mt="md"
          label="Select Teacher"
          placeholder="Select teacher"
          searchable
          nothingFound="No teacher found"
          data={allStaff.data.map((teacher: StaffType) => ({
            key: teacher.staff_id,
            value: teacher?.staff_id,
            label: `${teacher.title} ${teacher.first_name} ${teacher.last_name}`,
          }))}
          {...form.getInputProps("teacher")}
        />

        <Select
          required
          mt="md"
          label="Select Class"
          placeholder="Select class"
          searchable
          nothingFound="No class found"
          data={allClasses.map((item: ClassroomType) => ({
            key: item?.classroom_id,
            value: item?.classroom_id,
            label: item.name,
          }))}
          {...form.getInputProps("classroom")}
        />

        <Group position="right" mt="lg">
          <Button variant="default" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" color="dark">
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default AddSubjectToClass;
