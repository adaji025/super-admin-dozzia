import { useState } from "react";
import {
  Button,
  PasswordInput,
  Group,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Lock } from "tabler-icons-react";

const ChangePassword = ({ closeModal }: any) => {

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

  return (
    <div>
      <Divider mb="md" variant="dashed" />

      <form>
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
