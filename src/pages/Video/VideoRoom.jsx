import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Room,
  createLocalTracks,
  Track,
  RoomEvent,
  ParticipantEvent,
} from "livekit-client";
import {
  FiVideo,
  FiVideoOff,
  FiMic,
  FiMicOff,
  FiPhone,
  FiMaximize2,
  FiMinimize2,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import ParticipantVideo from "./ParticipantVideo";

const LIVEKIT_URL = "wss://df3a-k14433to.livekit.cloud";

export default function VideoRoom() {
  const [room, setRoom] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState(null);
  const [localParticipant, setLocalParticipant] = useState(null);
  const [remoteParticipants, setRemoteParticipants] = useState([]);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [spotlightParticipant, setSpotlightParticipant] = useState(null);

  const getTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("token");
  };

  const token = getTokenFromUrl();

  const connectToRoom = useCallback(async () => {
    if (!token) {
      setError(
        "No token provided in URL. Please add ?token=your_token to the URL."
      );
      setIsConnecting(false);
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);

      const tracks = await createLocalTracks({ audio: true, video: true });

      const newRoom = new Room();
      await newRoom.connect(LIVEKIT_URL, token, {
        autoSubscribe: true,
        tracks,
      });

      setRoom(newRoom);
      setLocalParticipant(newRoom.localParticipant);
      setRemoteParticipants(Array.from(newRoom.remoteParticipants.values()));
      setIsVideoEnabled(newRoom.localParticipant.isCameraEnabled);
      setIsAudioEnabled(newRoom.localParticipant.isMicrophoneEnabled);

      newRoom.on(RoomEvent.ParticipantConnected, (participant) => {
        setRemoteParticipants((prev) => [...prev, participant]);
      });

      newRoom.on(RoomEvent.ParticipantDisconnected, (participant) => {
        setRemoteParticipants((prev) =>
          prev.filter((p) => p.identity !== participant.identity)
        );
        if (spotlightParticipant === participant.identity) {
          setSpotlightParticipant(null);
        }
      });

      newRoom.on(RoomEvent.Disconnected, () => {
        setRoom(null);
        setLocalParticipant(null);
        setRemoteParticipants([]);
        setSpotlightParticipant(null);
      });

      setIsConnecting(false);
    } catch (err) {
      console.error("Failed to connect to room:", err);
      setError(`Failed to connect: ${err.message}`);
      setIsConnecting(false);
    }
  }, [token, spotlightParticipant]);

  const disconnectFromRoom = useCallback(() => {
    if (!room) return;
    try {
      room.disconnect();
    } catch (error) {
      console.error("Error while disconnecting:", error);
    }
  }, [room]);

  const toggleVideo = useCallback(() => {
    if (!room || !room.localParticipant) return;
    const enabled = room.localParticipant.isCameraEnabled;
    room.localParticipant.setCameraEnabled(!enabled);
    setIsVideoEnabled(!enabled);
  }, [room]);

  const toggleAudio = useCallback(() => {
    if (!room || !room.localParticipant) return;
    const enabled = room.localParticipant.isMicrophoneEnabled;
    room.localParticipant.setMicrophoneEnabled(!enabled);
    setIsAudioEnabled(!enabled);
  }, [room]);

  const toggleSpotlight = useCallback((participantIdentity) => {
    setSpotlightParticipant((prev) =>
      prev === participantIdentity ? null : participantIdentity
    );
  }, []);

  useEffect(() => {
    connectToRoom();
    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, []);

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Connecting to room...
          </h2>
          <p className="text-gray-600">
            Please wait while we set up your video call
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Connection Failed
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={connectToRoom}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const spotlightParticipantObj = remoteParticipants.find(
    (p) => p.identity === spotlightParticipant
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Video Call</h1>
            <span className="text-sm text-gray-600">
              {remoteParticipants.length + 1} participant
              {remoteParticipants.length !== 0 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        {spotlightParticipantObj ? (
          <div className="h-[70vh] mb-4">
            <ParticipantVideo
              participant={spotlightParticipantObj}
              onToggleSpotlight={toggleSpotlight}
              isSpotlight={true}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
            {localParticipant && (
              <ParticipantVideo participant={localParticipant} isLocal={true} />
            )}
            {remoteParticipants.map((participant) => (
              <ParticipantVideo
                key={participant.identity}
                participant={participant}
                onToggleSpotlight={toggleSpotlight}
              />
            ))}
          </div>
        )}

        {spotlightParticipantObj && (
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {localParticipant && (
              <div className="flex-shrink-0">
                <ParticipantVideo
                  participant={localParticipant}
                  isLocal={true}
                />
              </div>
            )}
            {remoteParticipants
              .filter((p) => p.identity !== spotlightParticipant)
              .map((participant) => (
                <div key={participant.identity} className="flex-shrink-0">
                  <ParticipantVideo
                    participant={participant}
                    onToggleSpotlight={toggleSpotlight}
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full transition-colors ${
                isVideoEnabled
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
            >
              {isVideoEnabled ? (
                <FiVideo className="w-6 h-6" />
              ) : (
                <FiVideoOff className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full transition-colors ${
                isAudioEnabled
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              title={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
            >
              {isAudioEnabled ? (
                <FiMic className="w-6 h-6" />
              ) : (
                <FiMicOff className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={disconnectFromRoom}
              className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
              title="Leave call"
            >
              <FiPhone className="w-6 h-6 transform rotate-135" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-20"></div>
    </div>
  );
}
