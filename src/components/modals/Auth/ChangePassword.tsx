import React, { useState } from "react";
import {
  Button,
  PasswordInput,
  Group,
  Divider,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Lock } from "tabler-icons-react";
import { changePassword } from "../../../services/auth/auth";
import useNotification from "../../../hooks/useNotification";

const ChangePassword = ({ closeModal }: any) => {
  const { handleError } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);

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

        closeModal();
      })
      .catch((error) => {
        handleError(error);
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
        <PasswordInput
          required
          mt="sm"
          label="Current Password"
          placeholder="Current password"
          icon={<Lock size={16} />}
          {...form.getInputProps("current_password")}
        />

        <PasswordInput
          required
          mt="sm"
          label="New Password"
          placeholder="New password"
          icon={<Lock size={16} />}
          {...form.getInputProps("password")}
        />

        <PasswordInput
          required
          mt="sm"
          label="Confirm New Password"
          placeholder="Confirm new password"
          icon={<Lock size={16} />}
          {...form.getInputProps("password_confirmation")}
        />

        <Group position="right" mt="lg">
          <Button variant="default" onClick={closeModal}>
            Cancel
          </Button>
          <Button color="dark" type="submit">
            Change password
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default ChangePassword;
