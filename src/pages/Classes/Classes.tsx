import { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Input, Modal, Text } from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import { AdjustmentsHorizontal, Search } from "tabler-icons-react";
import AddClass from "../../components/modals/AddClass";
import "./classes.scss";

const Classes = () => {
  const { dark } = useTheme();
  const [addClassModal, setAddClassModal] = useState<boolean>(false);

  return (
    <Fragment>
      <Helmet>
        <title>Classes</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Classes" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={addClassModal}
        onClose={() => setAddClassModal(false)}
        title={<Text weight={600}>Add Class</Text>}
        size="lg"
      >
        <AddClass
          closeModal={() => {
            setAddClassModal(false);
          }}
        />
      </Modal>

      <div
        className="data-page-container"
        style={{
          background: dark ? "#1a1b1e" : "#ffffff",
        }}
      >
        <div className="d-p-wrapper">
          <div className="d-p-header">
            <div className="d-p-h-left">Classes</div>

            <div className="d-p-h-right">
              <Button
                variant="light"
                onClick={() => {
                  setAddClassModal(true);
                }}
              >
                Add Class
              </Button>
            </div>
          </div>

          <div
            className="d-p-search"
            style={{
              background: dark ? "#121212" : "#f8f9fa",
            }}
          >
            <Input
              sx={{
                maxWidth: "1000px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              icon={<Search size={16} />}
              placeholder="Search class"
              rightSection={
                <AdjustmentsHorizontal
                  strokeWidth={1.4}
                  style={{ opacity: 0.5 }}
                  className="click"
                />
              }
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Classes;
