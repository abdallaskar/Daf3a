import React, { useEffect, useState, useRef } from "react";
import { Track, ParticipantEvent } from "livekit-client";
import { FiVideoOff, FiMicOff, FiMaximize2, FiMinimize2 } from "react-icons/fi";

export default function ParticipantVideo({
  participant,
  isLocal = false,
  onToggleSpotlight,
  isSpotlight = false,
}) {
  const videoRef = useRef(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);

  //   useEffect(() => {
  //     const updateTracks = () => {
  //       if (!videoRef.current) return;
  //       videoRef.current.innerHTML = "";

  //       const getTrack = (source) =>
  //         participant.getTrackPublication(source)?.track;

  //       const videoTrack = getTrack(Track.Source.Camera);
  //       const audioTrack = getTrack(Track.Source.Microphone);

  //       setHasVideo(!!videoTrack);
  //       setHasAudio(!!audioTrack);

  //       if (videoTrack) {
  //         const videoElement = videoTrack.attach();
  //         videoElement.className = "w-full h-full object-cover";
  //         if (isLocal) {
  //           videoElement.style.transform = "scaleX(-1)";
  //         }
  //         videoRef.current.appendChild(videoElement);
  //       }
  //     };

  //     updateTracks();

  //     participant.on(ParticipantEvent.TrackSubscribed, updateTracks);
  //     participant.on(ParticipantEvent.TrackUnsubscribed, updateTracks);
  //     participant.on(ParticipantEvent.TrackMuted, updateTracks);
  //     participant.on(ParticipantEvent.TrackUnmuted, updateTracks);

  //     return () => {
  //       participant.off(ParticipantEvent.TrackSubscribed, updateTracks);
  //       participant.off(ParticipantEvent.TrackUnsubscribed, updateTracks);
  //       participant.off(ParticipantEvent.TrackMuted, updateTracks);
  //       participant.off(ParticipantEvent.TrackUnmuted, updateTracks);
  //     };
  //   }, [participant, isLocal]);
  useEffect(() => {
    const updateMediaAndAttachVideo = () => {
      // Step 1: Clean up any previously attached video elements.
      if (videoRef.current) {
        Array.from(videoRef.current.children).forEach((child) =>
          child.remove()
        );
      }

      // Step 2: Get the current camera and microphone track publications.
      const videoPublication = participant.getTrackPublication(
        Track.Source.Camera
      );
      const audioPublication = participant.getTrackPublication(
        Track.Source.Microphone
      );

      // Step 3: Update `hasVideo` and `hasAudio` states based on existence and muted status.
      setHasVideo(!!videoPublication && !videoPublication.isMuted);
      setHasAudio(!!audioPublication && !audioPublication.isMuted);

      // Step 4: If a video track publication exists and is NOT muted, prepare to attach its track.
      if (
        videoPublication &&
        videoPublication.track &&
        !videoPublication.isMuted
      ) {
        // *** CRITICAL CHANGE HERE: Introduce a small delay for local video attachment ***
        if (isLocal) {
          // For the local participant's video, add a small setTimeout.
          // This gives the browser's media pipeline a moment to fully activate.
          setTimeout(() => {
            // Re-check conditions inside timeout to ensure the track is still valid
            // (e.g., if user toggled off again quickly)
            const currentVideoPublication = participant.getTrackPublication(
              Track.Source.Camera
            );
            if (
              videoRef.current &&
              currentVideoPublication &&
              currentVideoPublication.track &&
              !currentVideoPublication.isMuted
            ) {
              const videoElement = currentVideoPublication.track.attach();
              videoElement.className = "w-full h-full object-cover";
              videoElement.style.transform = "scaleX(-1)"; // Mirror effect for local video
              videoRef.current.appendChild(videoElement);
            }
          }, 50); // 50ms is usually sufficient for such timing issues
        } else {
          // For remote participants, attach immediately as this issue is specific to local.
          const videoElement = videoPublication.track.attach();
          videoElement.className = "w-full h-full object-cover";
          // No mirror for remote participants by default (unless your app wants it)
          videoRef.current.appendChild(videoElement);
        }
      }
    };

    // Step 5: Call the update function immediately on component mount/dependency change.
    updateMediaAndAttachVideo();

    // Step 6: Subscribe to LiveKit participant events for real-time updates.
    participant.on(ParticipantEvent.TrackPublished, updateMediaAndAttachVideo);
    participant.on(
      ParticipantEvent.TrackUnpublished,
      updateMediaAndAttachVideo
    );
    participant.on(ParticipantEvent.TrackSubscribed, updateMediaAndAttachVideo);
    participant.on(
      ParticipantEvent.TrackUnsubscribed,
      updateMediaAndAttachVideo
    );
    participant.on(ParticipantEvent.TrackMuted, updateMediaAndAttachVideo);
    participant.on(ParticipantEvent.TrackUnmuted, updateMediaAndAttachVideo);

    // Step 7: Cleanup function to remove listeners and attached elements.
    return () => {
      participant.off(
        ParticipantEvent.TrackPublished,
        updateMediaAndAttachVideo
      );
      participant.off(
        ParticipantEvent.TrackUnpublished,
        updateMediaAndAttachVideo
      );
      participant.off(
        ParticipantEvent.TrackSubscribed,
        updateMediaAndAttachVideo
      );
      participant.off(
        ParticipantEvent.TrackUnsubscribed,
        updateMediaAndAttachVideo
      );
      participant.off(ParticipantEvent.TrackMuted, updateMediaAndAttachVideo);
      participant.off(ParticipantEvent.TrackUnmuted, updateMediaAndAttachVideo);

      if (videoRef.current) {
        Array.from(videoRef.current.children).forEach((child) =>
          child.remove()
        );
      }
    };
  }, [participant, isLocal]); // Dependencies: re-run if `participant` or `isLocal` changes.
  const handleClick = () => {
    if (!isLocal && onToggleSpotlight) {
      onToggleSpotlight(participant.identity);
    }
  };

  return (
    <div
      className={`relative bg-gray-900 rounded-lg overflow-hidden ${
        isSpotlight
          ? "w-full h-full"
          : isLocal
          ? "w-64 h-48"
          : "w-64 h-48 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
      }`}
      onClick={handleClick}
    >
      <div ref={videoRef} className="w-full h-full" />

      {!hasVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-semibold">
                {(participant.name || participant.identity)
                  .charAt(0)
                  .toUpperCase()}
              </span>
            </div>
            <p className="text-sm">
              {participant.name || participant.identity}
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
        <div className="flex items-center justify-between text-white text-sm">
          <span className="truncate">
            {isLocal ? "You" : participant.name || participant.identity}
          </span>
          <div className="flex items-center space-x-1">
            {!hasAudio && <FiMicOff className="w-4 h-4 text-red-400" />}
            {!hasVideo && <FiVideoOff className="w-4 h-4 text-red-400" />}
          </div>
        </div>
      </div>

      {!isLocal && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSpotlight(participant.identity);
          }}
          className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded text-white transition-colors"
        >
          {isSpotlight ? (
            <FiMinimize2 className="w-4 h-4" />
          ) : (
            <FiMaximize2 className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
}
