import React from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useSearchParams } from "react-router";
import "@livekit/components-styles";

export default function VideoCall() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const serverUrl = import.meta.env.VITE_VIDEO_LIVEKIT;

  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect={true}
      data-lk-theme="default"
      style={{ height: "100vh" }}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}
