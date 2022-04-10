import { Fragment, useState, useRef } from "react";
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
  Text,
} from "@mantine/core";
import { Lock } from "tabler-icons-react";
import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import useTheme from "../../hooks/useTheme";
import PageHeader from "../../components/PageHeader/PageHeader";
import {
  changePassword,
  updateProfile,
  changeProfileImage,
} from "../../services/auth/auth";
import { showNotification } from "@mantine/notifications";
import useNotification from "../../hooks/useNotification";
import { showLoader } from "../../redux/utility/utility.actions";
import { setUserData } from "../../redux/user/user.actions";

import "./settings.scss";

const Settings = () => {
  const inputFile: any = useRef();
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

  const onImageButtonClick = () => {
    inputFile.current.click();
  };

  const types = ["image/png", "image/jpeg", "image/jpg"];

  const handleImageUpload = (e: any) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        dispatch(showLoader(true));

        var formData = new FormData();
        formData.append("image", selectedFile);

        changeProfileImage(formData)
          .then((res) => {
            showNotification({
              title: "Success",
              message: `${"Profile image changed."} 😶‍🌫️`,
              color: "green",
            });
            console.log(res);
          })
          .catch((error) => {
            handleError(error);
          })
          .finally(() => {
            dispatch(showLoader(false));
            inputFile.current.value = null;
          });
      } else {
        showNotification({
          title: "Error",
          message: `Please select an image file (png or jpg) 🖼️`,
          color: "red",
        });
      }
    }
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
        title={<Text weight={600}>Change Password</Text>}
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
            background: dark ? "#1a1b1e" : "#ffffff",
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
              size={120}
            />

            <Button ml="sm" variant="subtle" onClick={onImageButtonClick}>
              Change picture
            </Button>

            <input
              type="file"
              id="file"
              ref={inputFile}
              accept="image/*"
              onChange={(event) => {
                handleImageUpload(event);
              }}
              style={{ display: "none" }}
            />
          </div>

          <Box mt={40} sx={{ maxWidth: 430 }} className="settings-form">
            <form onSubmit={form.onSubmit((values) => submit(values))}>
              <TextInput
                required
                label="First Name"
                placeholder="First mame"
                type="text"
                variant="filled"
                {...form.getInputProps("first_name")}
              />

              <TextInput
                required
                mt="lg"
                label="Last Name"
                placeholder="Last name"
                type="text"
                variant="filled"
                {...form.getInputProps("last_name")}
              />

              <TextInput
                className="form-item"
                required
                mt="lg"
                label="Middle Name"
                placeholder="Middle name"
                type="text"
                variant="filled"
                {...form.getInputProps("middle_name")}
              />

              <TextInput
                className="form-item"
                required
                mt="lg"
                label="Email"
                placeholder="Email"
                type="email"
                variant="filled"
                {...form.getInputProps("email")}
              />

              <TextInput
                required
                mt="lg"
                type="tel"
                label="Phone Number"
                placeholder="Phone number"
                variant="filled"
                {...form.getInputProps("phone_number")}
              />

              <TextInput
                required
                mt="lg"
                label="Address"
                placeholder="Address"
                type="text"
                variant="filled"
                {...form.getInputProps("address")}
              />

              <Group position="left" mt="xl">
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
      <Divider mb="md" variant="dashed" />

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
