import { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import useTheme from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  Text,
  Input,
  Menu,
  Divider,
  Pagination,
  Skeleton,
  Alert,
  Group,
  Box,
  Table,
} from "@mantine/core";
import { CirclePlus, ArrowBackUp } from "tabler-icons-react";
import AddStudyResource from "../../components/modals/ClassWall/AddStudyResource";
import useStudyResources from "../../hooks/useStudyResources";

const StudyResources = () => {
  const { dark } = useTheme();
  const [addResourceModal, setAddResourceModal] = useState<boolean>(false);
  const { handlePostStudyResource } = useStudyResources();
  const navigate = useNavigate();

  return (
    <Fragment>
      <Helmet>
        <title>Study Resources</title>
        <meta name="description" content="" />
        <meta property="og:title" content="Study Resources" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
      </Helmet>

      <Modal
        opened={addResourceModal}
        onClose={() => {
          setAddResourceModal(false);
        }}
        title={<Text weight={600}>Add Study Resource</Text>}
        size="lg"
      >
        <AddStudyResource
          closeModal={() => {
            setAddResourceModal(false);
          }}
          submit={handlePostStudyResource}
          modalActive={addResourceModal}
        />
      </Modal>

      <div className="data-page-container study-resources">
        <div className="d-p-wrapper">
          <div className="d-p-header">
            <div className="d-p-h-left no-select">
              <span
                className="go-back click"
                onClick={() => {
                  navigate("/class-wall");
                }}
              >
                <ArrowBackUp />
              </span>
              Study Resources
            </div>

            <div className="d-p-h-right">
              <Button
                leftIcon={<CirclePlus size={14} />}
                onClick={() => {
                  setAddResourceModal(true);
                }}
              >
                Add Resource
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StudyResources;
