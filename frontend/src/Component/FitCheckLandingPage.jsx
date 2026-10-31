import React, { useState } from "react";
import "./style/FitCheckLandingPage.css";

const features = [
  {
    number: "01",
    icon: "◎",
    title: "Real-Time Pose Tracking",
    description:
      "Track body position and joint alignment while performing an exercise.",
  },
  {
    number: "02",
    icon: "⌁",
    title: "AI Posture Analysis",
    description:
      "Understand your stance with clear visual feedback and movement insights.",
  },
  {
    number: "03",
    icon: "✳",
    title: "Your Personal AI Coach",
    description:
      "Get supportive guidance to improve your exercise technique and consistency.",
  },
];

const steps = [
  {
    number: "01",
    title: "Start your session",
    description:
      "Open FitCheck AI and allow camera access when your session begins.",
  },
  {
    number: "02",
    title: "Position yourself",
    description:
      "Keep your full body visible in the camera frame and make sure the area is well lit.",
  },
  {
    number: "03",
    title: "Move and get feedback",
    description:
      "Follow the exercise, review the movement feedback, and adjust your form.",
  },
];

const faqs = [
  {
    question: "Do I need any special equipment?",
    answer:
      "You need a device with a camera and a stable internet connection. Wear comfortable clothing and make sure your body is visible in the camera frame.",
  },
  {
    question: "How should I position my camera?",
    answer:
      "Place your device on a stable surface, keep the camera facing you, and try to keep your full body inside the frame. Good lighting helps the camera see your movements.",
  },
  {
    question: "Does FitCheck AI replace a fitness trainer?",
    answer:
      "No. FitCheck AI is designed to provide helpful movement and posture feedback. It does not replace a qualified fitness professional or medical advice.",
  },
  {
    question: "Can I use FitCheck AI on a phone?",
    answer:
      "The experience should be tested on your supported mobile browsers and devices. Camera permissions and performance may vary by device.",
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="fcl-section-heading">
      <span className="fcl-eyebrow">
        <span className="fcl-dot" />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function FitCheckLandingPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="fcl-page">
      {/* FEATURES */}
      <section className="fcl-section fcl-features" id="features">
        <div className="fcl-container">
          <SectionHeading
            eyebrow="BUILT FOR BETTER MOVEMENT"
            title={
              <>
                More than a workout.
                <br />
                <span>Your movement companion.</span>
              </>
            }
            description="Understand how you move with tools designed to make exercise feedback easier to follow."
          />

          <div className="fcl-feature-grid">
            {features.map((feature) => (
              <article className="fcl-feature-card" key={feature.number}>
                <div className="fcl-card-top">
                  <span className="fcl-feature-icon">{feature.icon}</span>
                  <span className="fcl-card-number">{feature.number}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="fcl-card-arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="fcl-section fcl-how" id="how-it-works">
        <div className="fcl-container fcl-how-layout">
          <div className="fcl-how-copy">
            <SectionHeading
              eyebrow="A SIMPLE SESSION"
              title={
                <>
                  Three steps.
                  <br />
                  <span>One smarter routine.</span>
                </>
              }
              description="Getting started is simple. Set up your camera, follow the movement, and use the feedback to guide your next rep."
            />

            <a className="fcl-button fcl-button-primary" href="#user-guide">
              See the user guide <span aria-hidden="true">↘</span>
            </a>
          </div>

          <div className="fcl-steps">
            {steps.map((step) => (
              <article className="fcl-step" key={step.number}>
                <span className="fcl-step-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                <span className="fcl-step-line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* USER GUIDE VIDEO */}
      <section className="fcl-section fcl-guide" id="user-guide">
        <div className="fcl-container">
          <SectionHeading
            eyebrow="YOUR FIRST SESSION"
            title={
              <>
                See how it <span>works.</span>
              </>
            }
            description="A quick walkthrough can help users understand camera setup, body positioning, and the session flow before they begin."
          />

          <div className="fcl-guide-panel">
            <div className="fcl-video-wrap">
              <video
                className="fcl-guide-video"
                 autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                
              >
                <source src="kira.mp4" type="video/mp4" />
                Your browser does not support the video element.
              </video>
              <div className="fcl-video-caption">
                <span className="fcl-video-live-dot" />
                FITCHECK AI — USER WALKTHROUGH
              </div>
            </div>

            <div className="fcl-guide-notes">
              <span className="fcl-guide-label">QUICK START CHECKLIST</span>
              <h3>Get ready before you move.</h3>
              <ul>
                <li>
                  <span>✓</span> Allow camera access when prompted.
                </li>
                <li>
                  <span>✓</span> Keep your device stable.
                </li>
                <li>
                  <span>✓</span> Make sure your full body is visible.
                </li>
                <li>
                  <span>✓</span> Choose a well-lit space.
                </li>
              </ul>
              <a className="fcl-text-link" href="#start-session">
                Ready to try it? <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <p className="fcl-video-hint">
            Add your walkthrough video at{" "}
            <code>public/videos/fitcheck-user-guide.mp4</code> and its poster
            image at <code>public/images/fitcheck-guide-poster.jpg</code>.
          </p>
        </div>
      </section>

      {/* PRIVACY / TRUST STRIP */}
      <section className="fcl-trust">
        <div className="fcl-container fcl-trust-inner">
          <div>
            <span className="fcl-trust-mark">✳</span>
            <p>
              <strong>Move at your own pace.</strong>
              <span>Build confidence one session at a time.</span>
            </p>
          </div>
          <p className="fcl-trust-note">
            FitCheck AI supports training feedback and is not a substitute for
            professional medical or fitness advice.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="fcl-section fcl-faq" id="faq">
        <div className="fcl-container fcl-faq-layout">
          <SectionHeading
            eyebrow="NEED TO KNOW"
            title={
              <>
                A few things,
                <br />
                <span>answered.</span>
              </>
            }
            description="Helpful details to make your first FitCheck AI session easier."
          />

          <div className="fcl-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <article
                  className={`fcl-faq-item ${isOpen ? "is-open" : ""}`}
                  key={faq.question}
                >
                  <button
                    className="fcl-faq-question"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span>{faq.question}</span>
                    <span className="fcl-faq-toggle" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && <p className="fcl-faq-answer">{faq.answer}</p>}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="fcl-bottom-cta" id="start-session">
        <div className="fcl-container fcl-cta-inner">
          <span className="fcl-eyebrow">
            <span className="fcl-dot" />
            YOUR NEXT REP STARTS HERE
          </span>
          <h2>
            Ready to move
            <br />
            <span>with more confidence?</span>
          </h2>
          <p>
            Start a session and explore a smarter way to understand your
            movement.
          </p>
          <a className="fcl-button fcl-button-primary" href="/start-session">
            Start AI Session <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="fcl-footer">
        <div className="fcl-container fcl-footer-inner">
          <a className="fcl-footer-brand" href="#home">
            FitCheck<span>AI</span>
          </a>
          <p>Move better. Train smarter. Feel stronger.</p>
          <nav aria-label="Footer navigation">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#user-guide">User guide</a>
            <a href="#faq">FAQ</a>
          </nav>
          <span className="fcl-copyright">
            © {new Date().getFullYear()} FitCheck AI. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}
