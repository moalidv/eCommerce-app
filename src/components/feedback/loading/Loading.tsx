import { TLoading } from "@customTypes/shared";

type LoadingProps = {
  loading: TLoading;
  error: string | null;
  children: React.ReactNode;
};

const Loading = ({ loading, error, children }: LoadingProps) => {
  if (loading === "pending") {
    return <div>Loading...</div>;
  }
  if (loading === "failed") {
    return <div>Error: {error}</div>;
  }
  return <>{children}</>;
};

export default Loading;
