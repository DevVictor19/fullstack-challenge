import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

interface IStatusFeedbackProps {
  successMessage?: string;
  errorMessage?: string;
  isSuccess?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

export default function StatusFeedback({
  errorMessage,
  isError,
  isLoading,
  isSuccess,
  successMessage,
}: IStatusFeedbackProps) {
  if (isError && errorMessage) {
    return (
      <Alert sx={{ width: "100%" }} severity="error">
        {errorMessage}
      </Alert>
    );
  }

  if (isLoading) {
    return <CircularProgress size={32} />;
  }

  if (isSuccess && successMessage) {
    return (
      <Alert sx={{ width: "100%" }} severity="success">
        {successMessage}
      </Alert>
    );
  }

  return null;
}
