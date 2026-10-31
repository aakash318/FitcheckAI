import React, { useCallback, useEffect, useRef, useState } from "react";
import "./sessionstyle/SessionRoom.css";

export default function SessionRoom() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [screen, setScreen] = useState("confirm"); // confirm | room | error
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [error, setError] = useState("");

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const startSession = async () => {
    setError("");
    try {
      // The browser will ask the user to allow camera and microphone access.
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      setScreen("room");
      setCameraOn(true);
      setMicOn(true);

      // Attach the live stream after the room has rendered.
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      });
    } catch (err) {
      let message = "Unable to access your camera and microphone.";
      if (err?.name === "NotAllowedError" || err?.name === "PermissionDeniedError") {
        message = "Camera and microphone permission was denied. Allow access in your browser settings, then try again.";
      } else if (err?.name === "NotFoundError" || err?.name === "DevicesNotFoundError") {
        message = "No camera or microphone was found. Connect a device and try again.";
      } else if (err?.name === "NotReadableError") {
        message = "Your camera or microphone may already be in use by another app. Close that app and try again.";
      } else if (!navigator.mediaDevices?.getUserMedia) {
        message = "Camera access requires HTTPS or localhost and a supported browser.";
      }
      setError(message);
      setScreen("error");
    }
  };

  useEffect(() => {
    return () => stopStream();
  }, [stopStream]);

  const toggleCamera = () => {
    const next = !cameraOn;
    streamRef.current?.getVideoTracks().forEach((track) => {
      track.enabled = next;
    });
    setCameraOn(next);
  };

  const toggleMic = () => {
    const next = !micOn;
    streamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = next;
    });
    setMicOn(next);
  };

  const endSession = () => {
    stopStream();
    setScreen("confirm");
    setCameraOn(true);
    setMicOn(true);
    setError("");
  };

  return (
    <main className="fit-session">
      <header className="fit-session__topbar">
        <a className="fit-session__brand" href="/">FitCheck <span>AI</span></a>
        <div className="fit-session__status"><i /> PRIVATE SESSION</div>
      </header>

      {screen === "confirm" && (
        <section className="fit-session__welcome">
          <div className="fit-session__eyebrow"><i /> YOUR PERSONAL AI FITNESS ROOM</div>
          <h1>Let’s get you <span>moving.</span></h1>
          <p className="fit-session__intro">
            Before we begin, FitCheck AI needs access to your camera and microphone
            so you can see yourself and interact during your session.
          </p>

          <div className="fit-session__permission-card">
            <div className="fit-session__permission-item">
              <div className="fit-session__permission-icon">▣</div>
              <div><strong>Camera access</strong><small>Show your movement for posture guidance.</small></div>
              <span className="fit-session__required">REQUIRED</span>
            </div>
            <div className="fit-session__permission-item">
              <div className="fit-session__permission-icon">♫</div>
              <div><strong>Microphone access</strong><small>Speak with your AI fitness companion.</small></div>
              <span className="fit-session__required">REQUIRED</span>
            </div>
          </div>

          <p className="fit-session__privacy">
            Your browser will show a permission prompt. You can turn your camera
            or microphone off at any time during the session.
          </p>
          <button className="fit-session__primary" onClick={startSession}>
            Allow camera & microphone <span>↗</span>
          </button>
          <a className="fit-session__back" href="/">Back to home</a>
        </section>
      )}

      {screen === "error" && (
        <section className="fit-session__welcome">
          <div className="fit-session__eyebrow"><i /> DEVICE ACCESS</div>
          <h1>We need your <span>permission.</span></h1>
          <div className="fit-session__error" role="alert">{error}</div>
          <button className="fit-session__primary" onClick={() => setScreen("confirm")}>
            Try again <span>↻</span>
          </button>
          <a className="fit-session__back" href="/">Back to home</a>
        </section>
      )}

      {screen === "room" && (
        <section className="fit-session__room">
          <div className="fit-session__room-heading">
            <div>
              <div className="fit-session__eyebrow"><i /> SESSION ACTIVE</div>
              <h1>Your <span>fitness room.</span></h1>
            </div>
            <div className="fit-session__live"><i /> LIVE</div>
          </div>

          <div className="fit-session__stage">
            <div className="fit-session__video-wrap">
              <video ref={videoRef} autoPlay playsInline muted className="fit-session__video" />
              {!cameraOn && <div className="fit-session__camera-off">Camera is off</div>}
              <div className="fit-session__video-label"><i /> YOUR CAMERA</div>
              <div className="fit-session__scan-corners" aria-hidden="true" />
            </div>
            <aside className="fit-session__coach">
              <div className="fit-session__coach-orb">✳</div>
              <div className="fit-session__coach-tag">FITCHECK AI COACH</div>
              <h2>Hi! I’m ready when you are.</h2>
              <p>Position yourself so your full body is visible. Your AI coach can guide you through the session.</p>
              <div className="fit-session__coach-state"><i /> Camera connected <span>✓</span></div>
              <div className="fit-session__coach-state"><i /> Microphone connected <span>✓</span></div>
              <div className="fit-session__coming">POSTURE ANALYSIS · READY TO CONNECT</div>
            </aside>
          </div>

          <div className="fit-session__controls">
            <button className={!micOn ? "is-off" : ""} onClick={toggleMic} aria-pressed={micOn}>
              <span>{micOn ? "🎙" : "🔇"}</span>{micOn ? "Mute mic" : "Unmute mic"}
            </button>
            <button className={!cameraOn ? "is-off" : ""} onClick={toggleCamera} aria-pressed={cameraOn}>
              <span>{cameraOn ? "▣" : "⊘"}</span>{cameraOn ? "Turn camera off" : "Turn camera on"}
            </button>
            <button className="fit-session__end" onClick={endSession}>
              End session <span>×</span>
            </button>
          </div>
          <p className="fit-session__footnote">Your camera preview is shown locally in this browser. No recording is started by this page.</p>
        </section>
      )}
    </main>
  );
}
