import { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Avatar,
  Button,
  TextInput,
  PasswordInput,
  Group,
  Box,
  Modal,
  Divider,
} from "@mantine/core";
import { Lock } from "tabler-icons-react";
import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import useTheme from "../../hooks/useTheme";
import PageHeader from "../../components/PageHeader/PageHeader";
import { changePassword, updateProfile } from "../../services/auth/auth";
import { showNotification } from "@mantine/notifications";
import useNotification from "../../hooks/useNotification";
import { showLoader } from "../../redux/utility/utility.actions";
import { setUserData } from "../../redux/user/user.actions";
import "./settings.scss";

const Settings = () => {
  const { dark } = useTheme();
  const dispatch = useDispatch();
  const userdata = useSelector((state: any) => {
    return state.user.userdata;
  });
  const { handleError } = useNotification();
  const [changePasswordModal, setChangePasswordModal] =
    useState<boolean>(false);

  const form = useForm({
    initialValues: {
      first_name: userdata?.profile_details?.first_name ?? "",
      last_name: userdata?.profile_details?.last_name ?? "",
      middle_name: userdata?.profile_details?.middle_name ?? "",
      email: userdata?.profile_details?.email ?? "",
      address: userdata?.profile_details?.address ?? "",
      phone_number: userdata?.profile_details?.phone_number ?? "",
    },
  });

  const submit = (values: any) => {
    dispatch(showLoader(true));

    updateProfile(
      values.first_name,
      values.last_name,
      values.middle_name,
      values.email,
      values.phone_number,
      values.address
    )
      .then((res) => {
        showNotification({
          title: "Success",
          message: `${"Profile updated."} ✍️`,
          color: "green",
        });
        dispatch(setUserData(res.user));
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Settings" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={changePasswordModal}
        onClose={() => setChangePasswordModal(false)}
        title="Change Password"
      >
        <ChangePassword
          closeModal={() => {
            setChangePasswordModal(false);
          }}
        />
      </Modal>

      <div className="settings-container">
        <PageHeader
          title="Settings"
          desc="Here you can view & edit your profile info."
        />

        <div
          className="settings-main"
          style={{
            background: dark ? "#121212" : "white",
          }}
        >
          <div className="image-section">
            <Avatar
              src={
                userdata?.profile_details?.picture
                  ? userdata?.profile_details?.picture
                  : null
              }
              radius="xl"
              size={90}
            />

            <Button ml="sm" variant="subtle">
              Change picture
            </Button>
          </div>

          <Box mt={40} sx={{ maxWidth: 400 }} className="settings-form">
            <form onSubmit={form.onSubmit((values) => submit(values))}>
              <TextInput
                required
                label="First Name"
                placeholder="First mame"
                type="text"
                // icon={<User size={16} />}
                {...form.getInputProps("first_name")}
              />

              <TextInput
                required
                mt="lg"
                label="Last Name"
                placeholder="Last name"
                type="text"
                // icon={<User size={16} />}
                {...form.getInputProps("last_name")}
              />

              <TextInput
                className="form-item"
                required
                mt="lg"
                label="Middle Name"
                placeholder="Middle name"
                type="text"
                {...form.getInputProps("middle_name")}
              />

              <TextInput
                className="form-item"
                required
                mt="lg"
                label="Email"
                placeholder="Email"
                type="email"
                {...form.getInputProps("email")}
              />

              <TextInput
                required
                mt="lg"
                type="tel"
                label="Phone Number"
                placeholder="Phone number"
                {...form.getInputProps("phone_number")}
              />

              <TextInput
                required
                mt="lg"
                label="Address"
                placeholder="Address"
                type="text"
                {...form.getInputProps("address")}
              />

              <Group position="left" mt="lg">
                <Button type="submit">Update Profile</Button>
                <Button
                  variant="light"
                  onClick={() => {
                    setChangePasswordModal(true);
                  }}
                >
                  Change password
                </Button>
              </Group>
            </form>
          </Box>
        </div>
      </div>
    </Fragment>
  );
};

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
      <Divider mb="sm" variant="dashed" />

      <form onSubmit={form.onSubmit((values) => submit(values))}>
        <PasswordInput
          required
          mt="sm"
          label="Current Password"
          placeholder="Current password"
          type="password"
          icon={<Lock size={16} />}
          {...form.getInputProps("current_password")}
        />

        <PasswordInput
          required
          mt="sm"
          label="New Password"
          placeholder="New password"
          type="password"
          icon={<Lock size={16} />}
          {...form.getInputProps("password")}
        />

        <PasswordInput
          required
          mt="sm"
          label="Confirm New Password"
          placeholder="Confirm new password"
          type="password"
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
export default Settings;
