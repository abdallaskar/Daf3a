import { ClipLoader } from "react-spinners";
function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <ClipLoader color="#2e7d6b" size={40} speedMultiplier={1} />
    </div>
  );
}

export default Loading;
