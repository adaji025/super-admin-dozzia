import { useState } from "react";
import {
  Button,
  TextInput,
  Group,
  Divider,
  LoadingOverlay,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useGrades from "../../../hooks/useGrades";
import { GradeType } from "../../../types/gradeTypes";
import useNotification from "../../../hooks/useNotification";
import { AxiosError } from "axios";
import { showNotification } from "@mantine/notifications";

interface AddGradeProps {
  closeModal: () => void;
  grade: GradeType | null;
  callback: () => void;
}

const AddGrade = ({ closeModal, grade, callback }: AddGradeProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { handleError } = useNotification();

  const { handleAddGrade, handleUpdateGrade } = useGrades();
  const form = useForm({
    initialValues: {
      name: grade ? grade.name : "",
      remark: grade ? grade.remark : "",
      min_score: grade ? grade.min_score : 0,
      max_score: grade ? grade.max_score : 0,
    },
  });

  const submit = (values: typeof form.values) => {
    setLoading(true);

    const action = grade ? handleUpdateGrade : handleAddGrade;

    action(values, `${grade?.id}`)
      .then(() => {
        showNotification({
          title: "Success",
          message: `Grade ${grade ? "updated" : "created"} successfully.`,
          color: "green",
        });
        closeModal();
        callback && callback();
      })
      .catch((err: AxiosError) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Divider mb="md" variant="dashed" />
      <LoadingOverlay visible={loading} />

      <form onSubmit={form.onSubmit((values) => submit(values))}>
        <TextInput
          required
          mt="sm"
          label="Grade Name"
          placeholder="e.g. A"
          {...form.getInputProps("name")}
        />

        <TextInput
          required
          mt="sm"
          label="Remark"
          placeholder="e.g. Excellent"
          {...form.getInputProps("remark")}
        />

        <NumberInput
          className="form-item"
          required
          mt="sm"
          label="Min Score"
          placeholder="e.g. 85"
          {...form.getInputProps("min_score")}
        />

        <NumberInput
          className="form-item"
          required
          mt="sm"
          label="Max Score"
          placeholder="e.g. 100"
          {...form.getInputProps("max_score")}
        />

        <Group position="right" mt="lg">
          <Button variant="default" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit">{grade ? "Update" : "Submit"}</Button>
        </Group>
      </form>
    </div>
  );
};

export default AddGrade;
