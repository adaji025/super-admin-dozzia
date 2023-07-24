import { Fragment, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import {
  Avatar,
  Button,
  TextInput,
  Group,
  Box,
  Modal,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import useTheme from "../../hooks/useTheme";
import PageHeader from "../../components/PageHeader/PageHeader";
import { updateProfile, changeProfileImage } from "../../services/auth/auth";
import { showNotification } from "@mantine/notifications";
import useNotification from "../../hooks/useNotification";
import { setUserData } from "../../redux/user/user.actions";
import ChangePassword from "../../components/modals/Auth/ChangePassword";
import "./settings.scss";
import { UserState } from "../../redux/user/user.reducer";

const Settings = () => {
  const inputFile: any = useRef();
  const { dark } = useTheme();
  const dispatch = useDispatch();
  const userdata = useSelector((state: { user: UserState }) => {
    return state.user.userdata;
  });
  const { handleError } = useNotification();
  const [changePasswordModal, setChangePasswordModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      first_name: userdata?.first_name ?? "",
      last_name: userdata?.last_name ?? "",
      middle_name: userdata?.middle_name ?? "",
      email: userdata?.email ?? "",
      address: userdata?.address ?? "",
      phone_number: userdata?.phone_number ?? "",
    },
  });

  const submit = (values: any) => {
    setLoading(true);

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
        setLoading(false);
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
        setLoading(true);

        var formData = new FormData();
        formData.append("image", selectedFile);

        changeProfileImage(formData)
          .then((res) => {
            showNotification({
              title: "Success",
              message: `${"Profile image changed."} 😶‍🌫️`,
              color: "green",
            });
            let data = userdata;
            data.picture = res.path;
            dispatch(setUserData(data));
          })
          .catch((error) => {
            handleError(error);
          })
          .finally(() => {
            setLoading(false);
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

      <LoadingOverlay visible={loading} />

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
              src={userdata?.picture ? userdata?.picture : null}
              className="avatar"
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
                placeholder=""
                type="text"
                {...form.getInputProps("first_name")}
                disabled
              />

              <TextInput
                required
                mt="lg"
                label="Last Name"
                placeholder=""
                type="text"
                {...form.getInputProps("last_name")}
                disabled
              />

              <TextInput
                className="form-item"
                required
                mt="lg"
                label="Middle Name"
                placeholder=""
                type="text"
                {...form.getInputProps("middle_name")}
                disabled
              />

              <TextInput
                className="form-item"
                required
                mt="lg"
                label="Email"
                placeholder=""
                type="email"
                {...form.getInputProps("email")}
                disabled
              />

              <TextInput
                required
                mt="lg"
                type="tel"
                label="Phone Number"
                placeholder=""
                {...form.getInputProps("phone_number")}
                disabled
              />

              <TextInput
                required
                mt="lg"
                label="Address"
                placeholder=""
                type="text"
                {...form.getInputProps("address")}
                disabled
              />

              <Group position="left" mt="xl">
                {/* <Button type="submit">Update Profile</Button> */}
                <Button
                  color="dark"
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

export default Settings;
