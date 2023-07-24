import { useState, useEffect } from "react";
import { Button, Group, Divider, LoadingOverlay } from "@mantine/core";
import { ArrowUpRight } from "tabler-icons-react";
import useTheme from "../../../hooks/useTheme";
import useStudyResources from "../../../hooks/useStudyResources";
import { StudyResourceType } from "../../../types/studyResourcesTypes";

interface ViewStudyResourceProps {
  closeModal: () => void;
  modalActive: boolean;
  resource: StudyResourceType | null;
}

const ViewStudyResource = ({
  closeModal,
  modalActive,
  resource,
}: ViewStudyResourceProps) => {
  const { dark } = useTheme();
  const { handleGetStudyResourceFiles, loading } = useStudyResources();
  const [resourceFiles, setResourceFiles] = useState<
    Array<{ file_path: string; id: string }>
  >([]);

  useEffect(() => {
    if (modalActive && resource) {
      handleGetStudyResourceFiles(resource?.id).then((res: any) => {
        setResourceFiles(res?.data);
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="r32">
      <LoadingOverlay visible={loading} />

      <Divider mb="md" variant="dashed" />

      <div className="view-details">
        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Title:</div>
          <div className="d-r-right">{resource?.title}</div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Description:</div>
          <div className="d-r-right">{resource?.description}</div>
        </div>

        <div
          className="v-d-row"
          style={{
            borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
          }}
        >
          <div className="d-r-left">Subject:</div>
          <div className="d-r-right">
            {/* {resource?.subject?.subject_name} (
            {resource?.subject?.subject_category}) */}
          </div>
        </div>

        {resource?.external_link && (
          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">External file URL:</div>
            <div
              className="d-r-right"
              style={{
                color: dark ? "#a8a8ff" : "blue",
                textDecoration: "underline",
              }}
            >
              <a
                href={resource?.external_link}
                target="_blank"
                rel="noreferrer"
              >
                {resource?.external_link}
              </a>{" "}
              <ArrowUpRight size={14} />
            </div>
          </div>
        )}

        {resourceFiles.length > 0 && (
          <div
            className="v-d-row"
            style={{
              borderBottom: `1px solid ${dark ? "#2c2e336b" : "#e9ecef61"}`,
            }}
          >
            <div className="d-r-left">Files:</div>
            <div className="d-r-right">
              {resourceFiles.map(
                (item: { file_path: string; id: string }, index: number) => (
                  <div
                    style={{
                      textDecoration: "underline",
                      marginBottom: "10px",
                      color: dark ? "#a8a8ff" : "blue",
                    }}
                    key={item.id}
                  >
                    <a href={item.file_path} target="_blank" rel="noreferrer">
                      File {index + 1} URL
                    </a>{" "}
                    <ArrowUpRight size={14} />
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <Group position="right" mt="lg">
          <Button variant="default" onClick={closeModal}>
            Close
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default ViewStudyResource;
