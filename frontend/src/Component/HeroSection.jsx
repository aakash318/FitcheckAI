
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";

import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
} from "@react-three/drei";

import { VRMLoaderPlugin } from "@pixiv/three-vrm";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

import "./style/HeroSection.css";

/* ------------------------------------------
   AVATAR LOADING  
------------------------------------------ */

function AvatarLoading() {
  return (
    <Html center>
      <div className="fc-avatar-loading">
        <span className="fc-loading-ring" />
        <p>Preparing your AI coach...</p>
      </div>
    </Html>
  );
}

/* ------------------------------------------
   3D VRM AVATAR
------------------------------------------ */

function AvatarModel() {
  const groupRef = useRef(null);
  const vrmRef = useRef(null);
  const armBonesRef = useRef(null);

  const gltf = useLoader(
    GLTFLoader,
    "/fitcheckAVATAR.vrm",
    (loader) => {
      loader.register(
        (parser) => new VRMLoaderPlugin(parser)
      );
    }
  );

  const vrm = gltf.userData.vrm;

  useEffect(() => {
    if (!vrm) return;

    vrmRef.current = vrm;
    // Capture the original arm poses.
const humanoid = vrm.humanoid;

const leftUpperArm = humanoid.getNormalizedBoneNode("leftUpperArm");
const rightUpperArm = humanoid.getNormalizedBoneNode("rightUpperArm");

const leftLowerArm = humanoid.getNormalizedBoneNode("leftLowerArm");
const rightLowerArm = humanoid.getNormalizedBoneNode("rightLowerArm");

armBonesRef.current = [
  leftUpperArm,
  rightUpperArm,
  leftLowerArm,
  rightLowerArm,
]
  .filter(Boolean)
  .map((bone) => ({
    bone,
    originalRotation: bone.quaternion.clone(),
  }));

    const avatar = vrm.scene;

    avatar.traverse((object) => {
      if (!object.isMesh) return;

      object.frustumCulled = false;

      const materials = Array.isArray(object.material)
        ? object.material
        : object.material
          ? [object.material]
          : [];

      materials.forEach((material) => {
        if (material.map) {
          material.map.colorSpace = THREE.SRGBColorSpace;
          material.map.anisotropy = 8;
        }

        material.needsUpdate = true;
      });
    });

    /*
      Center the avatar horizontally.

      Preserve its original model scale and proportions.
      Avoid aggressive material changes that could wash
      out the avatar's skin, clothing, or hair.
    */

    avatar.updateMatrixWorld(true);

    const bounds = new THREE.Box3().setFromObject(avatar);
    const center = bounds.getCenter(new THREE.Vector3());

    avatar.position.x -= center.x;
    avatar.position.z -= center.z;

    return () => {
      vrmRef.current = null;
    };
  }, [vrm]);

  useFrame((state, delta) => {
    if (vrmRef.current) {
      vrmRef.current.update(delta);
    }

    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Subtle premium floating animation.
   // Keep the avatar slightly lower while preserving the floating animation.
groupRef.current.position.y =
  -0.25 + Math.sin(time * 0.8) * 0.035;

    // Very gentle movement without distracting from the page.
    groupRef.current.rotation.y =
      Math.sin(time * 0.25) * 0.045;
  });
  

  if (!vrm) return null;

  return (
    <group
      ref={groupRef}
      position={[0,-0.25, 0]}
      scale={1.65}
    >
      <primitive object={vrm.scene} />
    </group>
  );
}

/* ------------------------------------------
   AVATAR SCENE
------------------------------------------ */

function AvatarScene() {
  return (
    <Canvas
      className="fc-avatar-canvas"
      camera={{
        position: [0, 1.15, 5.2],
        fov: 34,
        near: 0.1,
        far: 100,
      }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
      shadows
    >
      <ambientLight intensity={1.0} />

      <hemisphereLight
        skyColor="#e9ffe0"
        groundColor="#171b16"
        intensity={0.8}
      />

      <directionalLight
        position={[3, 5, 4]}
        intensity={2.0}
      />

      <directionalLight
        position={[-3, 2, -2]}
        intensity={1.1}
        color="#b7ff83"
      />

      <pointLight
        position={[0, 2.5, 2]}
        intensity={1.5}
        distance={8}
        color="#d9ffb8"
      />

      <Suspense fallback={<AvatarLoading />}>
        <AvatarModel />

        <Environment preset="studio" />

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.3}
          scale={3.5}
          blur={2.5}
          far={3}
          resolution={512}
        />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.07}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.9}
        rotateSpeed={0.4}
        target={[0, 0.85, 0]}
      />
    </Canvas>
  );
}

/* ------------------------------------------
   HERO SECTION
------------------------------------------ */

const features = [
  {
    number: "01",
    icon: "◎",
    title: "Real-Time Pose Tracking",
    description:
      "Track body position and joint alignment as you move.",
  },
  {
    number: "02",
    icon: "⌁",
    title: "AI Posture Analysis",
    description:
      "Understand your stance with visual feedback.",
  },
  {
    number: "03",
    icon: "✳",
    title: "Your Personal AI Coach",
    description:
      "Get guidance to improve your exercise technique.",
  },
];

export default function HeroSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="fc-hero" id="home">

      {/* BACKGROUND */}

      <div className="fc-hero-background" aria-hidden="true" />

      <div className="fc-hero-grid" aria-hidden="true" />

      <div className="fc-hero-glow fc-hero-glow-left" />

      <div className="fc-hero-glow fc-hero-glow-right" />

      {/* NAVIGATION */}

     

      {/* MAIN HERO */}

      <div className="fc-hero-layout">

        {/* LEFT CONTENT */}

        <div className="fc-hero-copy">

          <div className="fc-eyebrow">
            <span className="fc-status-dot" />
            YOUR PERSONAL AI FITNESS COMPANION
          </div>

          <h1 className="fc-hero-title">
            Meet your
            <br />

            <span className="fc-title-video-wrap">
              <video
                className="fc-title-video"
                src="title.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              />
              <span className="fc-title-video-text">_____________</span>
            </span>
          </h1>

          <p className="fc-hero-tagline">
            Move better. Train smarter. Feel stronger.
          </p>

          <p className="fc-hero-description">
            Your intelligent fitness companion observes
            your movements, analyzes your posture, and
            helps you understand your stance with
            interactive, real-time feedback.
          </p>

          <div className="fc-hero-actions">

            <a
              href="#start-session"
              className="fc-primary-button"
            >
              Start AI Session
              <span>↗</span>
            </a>

            <a
              href="#how-it-works"
              className="fc-secondary-button"
            >
              Explore how it works
              <span>↓</span>
            </a>

          </div>

          {/* FEATURES */}

          <div className="fc-feature-list" id="features">

            {features.map((feature, index) => (
              <button
                type="button"
                key={feature.number}
                className={`fc-feature-item ${
                  activeFeature === index
                    ? "is-active"
                    : ""
                }`}
                onMouseEnter={() => setActiveFeature(index)}
                onFocus={() => setActiveFeature(index)}
                onClick={() => setActiveFeature(index)}
              >

                <span className="fc-feature-icon">
                  {feature.icon}
                </span>

                <span className="fc-feature-content">

                  <strong>{feature.title}</strong>

                  <span>{feature.description}</span>

                </span>

                <span className="fc-feature-number">
                  {feature.number}
                </span>

              </button>
            ))}

          </div>

          <p className="fc-disclaimer">
            Designed to support your training,
            not replace professional advice.
          </p>

        </div>

        {/* RIGHT: LARGE ANIME AVATAR */}

        <div className="fc-hero-visual">

          <div className="fc-avatar-status">
            <span className="fc-status-dot" />
            AI AVATAR
            <span className="fc-status-divider">/</span>
            READY
          </div>

          {/* Ambient lighting */}

          <div
            className="fc-avatar-aura"
            aria-hidden="true"
          />

          {/* Tracking rings */}

          <div
            className="fc-avatar-ring fc-ring-outer"
            aria-hidden="true"
          />

          <div
            className="fc-avatar-ring fc-ring-inner"
            aria-hidden="true"
          />

          {/* Avatar platform */}

          <div
            className="fc-avatar-platform"
            aria-hidden="true"
          />

          {/* Actual 3D avatar */}

          <div className="fc-avatar-stage">

            <AvatarScene />

          </div>

          {/* Floating status card */}

          <div className="fc-avatar-info">

            <div className="fc-avatar-info-icon">
              ✳
            </div>

            <div className="fc-avatar-info-text">
              <strong>Your AI fitness coach</strong>
              <span>Ready to help you move better</span>
            </div>

            <span className="fc-live-indicator" />

          </div>

          <div className="fc-avatar-side-label">
            INTELLIGENT MOVEMENT
            <span />
            BUILT AROUND YOU
          </div>

        </div>

      </div>

  

    </section>
  );
}
