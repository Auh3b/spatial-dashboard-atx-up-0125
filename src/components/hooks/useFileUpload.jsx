import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFeedback } from "../../store/appStore";
import { FEEDBACK_MESSAGE } from "../../utils/feedbackUtils";
import { getFileExt, parseUpload } from "../../utils/fileUploadFuncs";

export default function useFileUpload() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileForm, setFileForm] = useState({});

  const handleFileUpload = async (event) => {
    setIsLoading(true);
    try {
      const upload = event.target.files[0];

      if (!upload) throw FEEDBACK_MESSAGE.NO_FILE_SELECTED;
      const uploadType = getFileExt(upload.name);
      const result = await parseUpload(upload, uploadType);
      setFile(result);
      setFileForm({
        source: upload.name.split(".")[0].replace(" ", "_"),
        name: upload.name,
      });
    } catch (error) {
      console.log(error);
      dispatch(
        setFeedback({
          status: "error",
          message: "Something went wrong. Try again.",
        }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (key) => {
    return (e) => {
      const value = e.currentTarget.value;
      setFileForm((prev) => ({ ...prev, [key]: value }));
    };
  };
  return {
    file,
    fileForm,
    isLoading,
    handleFileUpload,
    handleFormChange,
  };
}
