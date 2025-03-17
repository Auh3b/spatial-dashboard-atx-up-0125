import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFeedback } from "../../store/appStore";
import { FEEDBACK_MESSAGE } from "../../utils/feedbackUtils";
import { getFileExt, parseUpload } from "../../utils/fileUploadFuncs";
import { getNameFromString } from "../../utils/legendUtils";

export default function useFileUpload() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileUpload = async (event) => {
    setIsLoading(true);
    try {
      const upload = event.target.files[0];

      if (!upload) throw FEEDBACK_MESSAGE.NO_FILE_SELECTED;
      const type = getFileExt(upload.name);
      const data = await parseUpload(upload, type);
      const name = getNameFromString(upload.name);
      setFile({ name, data, type });
    } catch (error) {
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

  return {
    file,
    isLoading,
    handleFileUpload,
  };
}
