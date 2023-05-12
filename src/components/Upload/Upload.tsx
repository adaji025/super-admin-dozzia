import { Fragment, useRef } from "react";
import { Upload, CircleCheck } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import useTheme from "../../hooks/useTheme";
import "./upload.scss";

interface UploadProps {
  text: string;
  accept: string[];
  extraClasses?: string;
  setFile: (value: any) => void;
  acceptAll?: boolean;
}

const UploadComponent = ({
  text,
  accept,
  extraClasses,
  setFile,
  acceptAll,
}: UploadProps) => {
  const uploadFile: any = useRef(null);
  const { dark } = useTheme();

  const handleChange = (e: any) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (accept.includes(selectedFile.type) || acceptAll) {
        setFile(selectedFile);
        uploadFile.current.value = null;
      } else {
        setFile(null);
        showNotification({
          title: "Error",
          message: "Invalid file format",
          color: "yellow",
        });
        uploadFile.current.value = null;
      }
    }
  };

  return (
    <Fragment>
      <input
        type="file"
        id="file"
        ref={uploadFile}
        accept={accept.toString()}
        onChange={(event) => {
          handleChange(event);
        }}
        style={{ display: "none" }}
      />
      <div
        className={`d-upload click no-select ${extraClasses}`}
        style={{ background: dark ? "#2C2E33" : "#F1F3F5" }}
        onClick={() => {
          uploadFile.current.click();
        }}
      >
        {extraClasses === "file-selected" ? <CircleCheck /> : <Upload />}
        <div className="d-u-text">{text}</div>
      </div>
    </Fragment>
  );
};

export default UploadComponent;
