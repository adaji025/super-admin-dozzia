import React from "react";
import { Button, PasswordInput, Group, Divider } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Lock } from "tabler-icons-react";
import { changePassword } from "../../../services/auth/auth";
import { useDispatch } from "react-redux";
import useNotification from "../../../hooks/useNotification";
import { showLoader } from "../../../redux/utility/utility.actions";

const ChangePassword = ({ closeModal }: any) => {
  const dispatch = useDispatch();
  const { handleError } = useNotification();

  const form = useForm({
    initialValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      password: (value) =>
        value.length < 8 ? "Password must be at least 8 characters" : null,
      password_confirmation: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const submit = (values: any) => {
    closeModal();
    dispatch(showLoader(true));

    changePassword(
      values.current_password,
      values.password,
      values.password_confirmation
    )
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Password changed."} 🔒`,
          color: "green",
        });
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <form onSubmit={form.onSubmit((values) => submit(values))}>
        <PasswordInput
          required
          mt="sm"
          variant="filled"
          label="Current Password"
          placeholder="Current password"
          icon={<Lock size={16} />}
          {...form.getInputProps("current_password")}
        />

        <PasswordInput
          required
          mt="sm"
          variant="filled"
          label="New Password"
          placeholder="New password"
          icon={<Lock size={16} />}
          {...form.getInputProps("password")}
        />

        <PasswordInput
          required
          mt="sm"
          variant="filled"
          label="Confirm New Password"
          placeholder="Confirm new password"
          icon={<Lock size={16} />}
          {...form.getInputProps("password_confirmation")}
        />

        <Group position="right" mt="lg">
          <Button variant="light" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit">Change password</Button>
        </Group>
      </form>
    </div>
  );
};

export default ChangePassword;
