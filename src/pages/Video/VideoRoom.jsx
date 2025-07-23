import React, { useEffect, useRef } from "react";
import { Room, createLocalTracks } from "livekit-client";
import { useSearchParams } from "react-router";

export default function VideoRoom() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const roomRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteContainerRef = useRef(null);

  useEffect(() => {
    const joinRoom = async () => {
      if (!token) {
        console.error("No token found in URL");
        return;
      }

      // 1. اطلب تراكات الصوت والصورة من المستخدم
      const tracks = await createLocalTracks({
        audio: true,
        video: true,
      });

      // 2. أنشئ الغرفة واتصل بها مع إرسال التراكات
      const room = new Room();
      await room.connect("wss://df3a-k14433to.livekit.cloud", token, {
        autoSubscribe: true,
        tracks,
      });

      roomRef.current = room;

      // 3. عرض الفيديو المحلي
      tracks.forEach((track) => {
        const element = track.attach();
        if (localVideoRef.current) {
          localVideoRef.current.appendChild(element);
        }
      });

      // 4. التراك المحلي نُشر لاحقًا؟ أضفه
      room.on("localTrackPublished", (publication) => {
        const track = publication.track;
        if (track && localVideoRef.current) {
          const element = track.attach();
          localVideoRef.current.appendChild(element);
        }
      });

      // 5. عند انضمام مشارك آخر وبث تراك
      room.on("trackSubscribed", (track, publication, participant) => {
        const element = track.attach();
        element.setAttribute("data-participant", participant.identity);
        remoteContainerRef.current.appendChild(element);
      });

      // 6. عند مغادرة مشارك أو إزالة التراك
      room.on("trackUnsubscribed", (track, publication, participant) => {
        const elements = remoteContainerRef.current.querySelectorAll(
          `[data-participant="${participant.identity}"]`
        );
        elements.forEach((el) => el.remove());
      });
    };

    joinRoom();

    return () => {
      if (roomRef.current) {
        roomRef.current.disconnect();
      }
    };
  }, [token]);

  return (
    <div>
      <h2 className="text-xl font-bold">Live Video Room</h2>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">🧍 Local Participant</h3>
        <div ref={localVideoRef} className="border rounded p-2"></div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">👥 Remote Participants</h3>
        <div
          ref={remoteContainerRef}
          className="flex flex-wrap gap-2 border rounded p-2"
        ></div>
      </div>
    </div>
  );
}
