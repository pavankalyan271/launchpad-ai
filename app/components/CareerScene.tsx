"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Text } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type CareerStage = {
  id: string;
  label: string;
  color: string;
};

type CareerSceneProps = {
  activeStage: string;
  stages: CareerStage[];
  reducedMotion?: boolean;
};

/* =========================================================
   TARGET ROLE
   ========================================================= */

function TargetRoleScene({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const compassRef = useRef<THREE.Group>(null);
  const pointerRef = useRef<THREE.Group>(null);

  const [selected, setSelected] = useState(false);

  useFrame((state, delta) => {
    if (compassRef.current && !reducedMotion) {
      compassRef.current.rotation.y += delta * 0.2;
    }

    if (pointerRef.current && !reducedMotion) {
      pointerRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 1.5) * 0.5;
    }

    if (compassRef.current) {
      const targetScale = selected ? 1.12 : 1;

      compassRef.current.scale.lerp(
        new THREE.Vector3(
          targetScale,
          targetScale,
          targetScale,
        ),
        reducedMotion ? 1 : 0.12,
      );
    }
  });

  return (
    <group>
      <Float
        speed={reducedMotion ? 0 : 1.5}
        rotationIntensity={reducedMotion ? 0 : 0.08}
        floatIntensity={reducedMotion ? 0 : 0.35}
      >
        <group
          ref={compassRef}
          onClick={(event) => {
            event.stopPropagation();
            setSelected((value) => !value);
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
          }}
        >
          {/* Compass base */}
          <mesh>
            <cylinderGeometry
              args={[2.1, 2.1, 0.18, 48]}
            />

            <meshStandardMaterial
              color={selected ? "#1d4ed8" : "#172554"}
              emissive="#2563eb"
              emissiveIntensity={selected ? 0.7 : 0.2}
              metalness={0.55}
              roughness={0.4}
            />
          </mesh>

          {/* Compass rings */}
          {[1.65, 1.2, 0.75].map((radius) => (
            <mesh
              key={radius}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0.12, 0]}
            >
              <torusGeometry
                args={[radius, 0.035, 12, 64]}
              />

              <meshStandardMaterial
                color="#60a5fa"
                emissive="#2563eb"
                emissiveIntensity={selected ? 0.8 : 0.45}
              />
            </mesh>
          ))}

          {/* Compass pointer */}
          <group
            ref={pointerRef}
            position={[0, 0.25, 0]}
          >
            <mesh
              rotation={[0, 0, Math.PI / 4]}
            >
              <coneGeometry
                args={[0.25, 1.8, 4]}
              />

              <meshStandardMaterial
                color="#ef4444"
                emissive="#dc2626"
                emissiveIntensity={
                  selected ? 0.7 : 0.3
                }
              />
            </mesh>
          </group>

          {/* Center */}
          <mesh position={[0, 0.22, 0]}>
            <sphereGeometry
              args={[0.18, 20, 20]}
            />

            <meshStandardMaterial
              color="#f8fafc"
              emissive="#ffffff"
              emissiveIntensity={selected ? 0.8 : 0.2}
            />
          </mesh>
        </group>
      </Float>

      <Text
        position={[0, 2.4, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
      >
        TARGET ROLE
      </Text>

      <Text
        position={[0, -0.35, 2]}
        fontSize={0.16}
        color={selected ? "#60a5fa" : "#93c5fd"}
        anchorX="center"
      >
        {selected
          ? "DIRECTION SELECTED"
          : "CLICK THE COMPASS"}
      </Text>
    </group>
  );
}
/* =========================================================
   SKILLS
   ========================================================= */

function SkillsScene({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const orbitRef = useRef<THREE.Group>(null);

  const [selectedSkill, setSelectedSkill] =
    useState<string | null>(null);

  const skills = [
    ["JS", "#facc15"],
    ["TS", "#3b82f6"],
    ["AWS", "#f97316"],
    ["SQL", "#22c55e"],
    ["AI", "#a855f7"],
    ["Git", "#ef4444"],
  ];

  useFrame((state, delta) => {
    if (orbitRef.current && !reducedMotion) {
      orbitRef.current.rotation.y += delta * 0.28;
    }

    if (orbitRef.current) {
      orbitRef.current.children.forEach(
        (child, index) => {
          const group = child as THREE.Group;

          const label = skills[index]?.[0];

          if (!label) return;

          const target =
            selectedSkill === label ? 1.3 : 1;

          group.scale.lerp(
            new THREE.Vector3(
              target,
              target,
              target,
            ),
            reducedMotion ? 1 : 0.12,
          );
        },
      );
    }

    if (!reducedMotion && orbitRef.current) {
      const pulse =
        1 +
        Math.sin(state.clock.elapsedTime * 2) *
          0.03;

      orbitRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Central skill core */}
      <Float
        speed={reducedMotion ? 0 : 2}
        rotationIntensity={reducedMotion ? 0 : 0.2}
        floatIntensity={reducedMotion ? 0 : 0.5}
      >
        <mesh>
          <icosahedronGeometry args={[0.85, 2]} />

          <meshStandardMaterial
            color="#7c3aed"
            emissive="#6d28d9"
            emissiveIntensity={0.55}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
      </Float>

      {/* Skill orbit */}
      <group ref={orbitRef}>
        {skills.map(([label, color], index) => {
          const angle =
            (index / skills.length) *
            Math.PI *
            2;

          const radius = 2.1;

          const isSelected =
            selectedSkill === label;

          return (
            <group
              key={label}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 0.35,
                Math.sin(angle) * radius,
              ]}
            >
              <Float
                speed={
                  reducedMotion
                    ? 0
                    : 1.5 + index * 0.1
                }
                rotationIntensity={
                  reducedMotion ? 0 : 0.15
                }
                floatIntensity={
                  reducedMotion ? 0 : 0.3
                }
              >
                <mesh
                  onClick={(event) => {
                    event.stopPropagation();

                    setSelectedSkill(
                      isSelected
                        ? null
                        : label,
                    );
                  }}
                  onPointerOver={(event) => {
                    event.stopPropagation();

                    document.body.style.cursor =
                      "pointer";
                  }}
                  onPointerOut={() => {
                    document.body.style.cursor =
                      "default";
                  }}
                >
                  <boxGeometry
                    args={[
                      isSelected
                        ? 0.76
                        : 0.62,
                      isSelected
                        ? 0.76
                        : 0.62,
                      isSelected
                        ? 0.76
                        : 0.62,
                    ]}
                  />

                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={
                      isSelected ? 0.75 : 0.2
                    }
                    metalness={0.35}
                    roughness={0.4}
                  />
                </mesh>

                <Text
                  position={[0, 0, 0.4]}
                  fontSize={
                    isSelected ? 0.18 : 0.15
                  }
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                >
                  {label}
                </Text>
              </Float>
            </group>
          );
        })}
      </group>

      <Text
        position={[0, 2.65, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
      >
        BUILD YOUR SKILLS
      </Text>

      <Text
        position={[0, -2.55, 0]}
        fontSize={0.16}
        color="#c4b5fd"
        anchorX="center"
      >
        {selectedSkill
          ? `${selectedSkill} SELECTED`
          : "CLICK A SKILL"}
      </Text>
    </group>
  );
}
/* =========================================================
   PROJECTS
   ========================================================= */

function ProjectsScene({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const laptopRef = useRef<THREE.Group>(null);

  const [selectedProject, setSelectedProject] =
    useState<number | null>(null);

  const projectColors = [
    "#22c55e",
    "#a855f7",
    "#f97316",
  ];

  useFrame((state, delta) => {
    if (!laptopRef.current || reducedMotion) {
      return;
    }

    laptopRef.current.rotation.y += delta * 0.16;

    laptopRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
  });

  return (
    <group ref={laptopRef}>
      {/* =================================================
          LAPTOP
          ================================================= */}

      <Float
        speed={reducedMotion ? 0 : 1.5}
        rotationIntensity={reducedMotion ? 0 : 0.08}
        floatIntensity={reducedMotion ? 0 : 0.35}
      >
        <group>
          {/* Laptop screen */}

          <mesh position={[0, 0.75, 0]}>
            <boxGeometry
              args={[3.3, 1.9, 0.16]}
            />

            <meshStandardMaterial
              color="#1e293b"
              metalness={0.55}
              roughness={0.3}
            />
          </mesh>

          {/* Screen */}

          <mesh position={[0, 0.75, 0.1]}>
            <planeGeometry
              args={[2.75, 1.4]}
            />

            <meshStandardMaterial
              color="#0ea5e9"
              emissive="#0284c7"
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Project 1 on screen */}

          <mesh
            position={[-0.7, 0.75, 0.14]}
          >
            <boxGeometry
              args={[0.45, 0.5, 0.05]}
            />

            <meshStandardMaterial
              color="#22c55e"
            />
          </mesh>

          {/* Project 2 on screen */}

          <mesh
            position={[0, 0.75, 0.14]}
          >
            <boxGeometry
              args={[0.45, 0.5, 0.05]}
            />

            <meshStandardMaterial
              color="#a855f7"
            />
          </mesh>

          {/* Project 3 on screen */}

          <mesh
            position={[0.7, 0.75, 0.14]}
          >
            <boxGeometry
              args={[0.45, 0.5, 0.05]}
            />

            <meshStandardMaterial
              color="#f97316"
            />
          </mesh>

          {/* Laptop base */}

          <mesh
            position={[0, -0.35, 0.15]}
            rotation={[-0.12, 0, 0]}
          >
            <boxGeometry
              args={[3.9, 0.25, 2.2]}
            />

            <meshStandardMaterial
              color="#94a3b8"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </group>
      </Float>

      {/* =================================================
          PROJECT CARD 1
          ================================================= */}

      <Float
        speed={reducedMotion ? 0 : 1.8}
        rotationIntensity={reducedMotion ? 0 : 0.1}
        floatIntensity={reducedMotion ? 0 : 0.3}
      >
        <mesh
          position={[-1.1, -1.25, 0]}
          scale={
            selectedProject === 0
              ? 1.25
              : 1
          }
          onClick={(event) => {
            event.stopPropagation();

            setSelectedProject(
              selectedProject === 0
                ? null
                : 0,
            );
          }}
          onPointerOver={(event) => {
            event.stopPropagation();

            document.body.style.cursor =
              "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor =
              "default";
          }}
        >
          <boxGeometry
            args={[0.8, 0.45, 0.08]}
          />

          <meshStandardMaterial
            color={projectColors[0]}
            emissive={projectColors[0]}
            emissiveIntensity={
              selectedProject === 0
                ? 0.8
                : 0.25
            }
          />
        </mesh>
      </Float>

      {/* =================================================
          PROJECT CARD 2
          ================================================= */}

      <Float
        speed={reducedMotion ? 0 : 2}
        rotationIntensity={reducedMotion ? 0 : 0.1}
        floatIntensity={reducedMotion ? 0 : 0.35}
      >
        <mesh
          position={[0, -1.25, 0]}
          scale={
            selectedProject === 1
              ? 1.25
              : 1
          }
          onClick={(event) => {
            event.stopPropagation();

            setSelectedProject(
              selectedProject === 1
                ? null
                : 1,
            );
          }}
          onPointerOver={(event) => {
            event.stopPropagation();

            document.body.style.cursor =
              "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor =
              "default";
          }}
        >
          <boxGeometry
            args={[0.8, 0.45, 0.08]}
          />

          <meshStandardMaterial
            color={projectColors[1]}
            emissive={projectColors[1]}
            emissiveIntensity={
              selectedProject === 1
                ? 0.8
                : 0.25
            }
          />
        </mesh>
      </Float>

      {/* =================================================
          PROJECT CARD 3
          ================================================= */}

      <Float
        speed={reducedMotion ? 0 : 2.2}
        rotationIntensity={reducedMotion ? 0 : 0.1}
        floatIntensity={reducedMotion ? 0 : 0.4}
      >
        <mesh
          position={[1.1, -1.25, 0]}
          scale={
            selectedProject === 2
              ? 1.25
              : 1
          }
          onClick={(event) => {
            event.stopPropagation();

            setSelectedProject(
              selectedProject === 2
                ? null
                : 2,
            );
          }}
          onPointerOver={(event) => {
            event.stopPropagation();

            document.body.style.cursor =
              "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor =
              "default";
          }}
        >
          <boxGeometry
            args={[0.8, 0.45, 0.08]}
          />

          <meshStandardMaterial
            color={projectColors[2]}
            emissive={projectColors[2]}
            emissiveIntensity={
              selectedProject === 2
                ? 0.8
                : 0.25
            }
          />
        </mesh>
      </Float>

      {/* =================================================
          TITLE
          ================================================= */}

      <Text
        position={[0, 2.35, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
      >
        BUILD PROJECTS
      </Text>

      {/* =================================================
          INTERACTION MESSAGE
          ================================================= */}

      <Text
        position={[0, -2.1, 0]}
        fontSize={0.17}
        color={
          selectedProject !== null
            ? "#a78bfa"
            : "#94a3b8"
        }
        anchorX="center"
      >
        {selectedProject !== null
          ? `PROJECT ${
              selectedProject + 1
            } SELECTED`
          : "CLICK A PROJECT"}
      </Text>
    </group>
  );
}

/* =========================================================
   CV
   ========================================================= */

function CVScene({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const documentRef = useRef<THREE.Group>(null);
  const scanRef = useRef<THREE.Mesh>(null);
  const checkRef = useRef<THREE.Group>(null);

  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);

  useFrame((state, delta) => {
    if (documentRef.current && !reducedMotion) {
      documentRef.current.rotation.y += delta * 0.12;

      documentRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    }

    if (scanRef.current && scanning && !reducedMotion) {
      scanRef.current.position.y =
        -1.35 +
        ((Math.sin(state.clock.elapsedTime * 2.5) + 1) / 2) *
          2.7;
    }

    if (checkRef.current && !reducedMotion) {
      const pulse =
        1 +
        Math.sin(state.clock.elapsedTime * 3) * 0.04;

      checkRef.current.scale.setScalar(
        verified ? pulse : 0.01,
      );
    }
  });

  function handleDocumentClick(
    event: THREE.Event & {
      stopPropagation: () => void;
    },
  ) {
    event.stopPropagation();

    if (scanning) {
      return;
    }

    setScanning(true);
    setVerified(false);

    window.setTimeout(() => {
      setScanning(false);
      setVerified(true);
    }, 1600);
  }

  return (
    <group>
      {/* =================================================
          CV DOCUMENT
          ================================================= */}

      <Float
        speed={reducedMotion ? 0 : 1.4}
        rotationIntensity={reducedMotion ? 0 : 0.05}
        floatIntensity={reducedMotion ? 0 : 0.25}
      >
        <group
          ref={documentRef}
          onClick={handleDocumentClick}
          onPointerOver={(event) => {
            event.stopPropagation();
            document.body.style.cursor =
              "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor =
              "default";
          }}
        >
          {/* Paper */}

          <mesh>
            <boxGeometry
              args={[2.8, 3.8, 0.12]}
            />

            <meshStandardMaterial
              color="#f8fafc"
              roughness={0.55}
            />
          </mesh>

          {/* CV header */}

          <mesh
            position={[0, 1.35, 0.1]}
          >
            <boxGeometry
              args={[2, 0.25, 0.04]}
            />

            <meshStandardMaterial
              color="#2563eb"
              emissive="#2563eb"
              emissiveIntensity={
                scanning ? 0.6 : 0.2
              }
            />
          </mesh>

          {/* Profile block */}

          <mesh
            position={[-0.85, 0.85, 0.1]}
          >
            <boxGeometry
              args={[0.45, 0.45, 0.04]}
            />

            <meshStandardMaterial
              color="#64748b"
            />
          </mesh>

          {/* CV lines */}

          {[
            -0.15,
            -0.5,
            -0.85,
            -1.2,
          ].map((y, index) => (
            <mesh
              key={index}
              position={[0, y, 0.1]}
            >
              <boxGeometry
                args={[
                  index === 3
                    ? 1.5
                    : 2.1,
                  0.1,
                  0.04,
                ]}
              />

              <meshStandardMaterial
                color={
                  scanning
                    ? "#3b82f6"
                    : "#64748b"
                }
                emissive={
                  scanning
                    ? "#2563eb"
                    : "#000000"
                }
                emissiveIntensity={
                  scanning ? 0.25 : 0
                }
              />
            </mesh>
          ))}

          {/* Skill bars */}

          <mesh
            position={[-0.45, -0.1, 0.1]}
          >
            <boxGeometry
              args={[0.8, 0.12, 0.04]}
            />

            <meshStandardMaterial
              color="#22c55e"
            />
          </mesh>

          <mesh
            position={[0.45, -0.1, 0.1]}
          >
            <boxGeometry
              args={[0.65, 0.12, 0.04]}
            />

            <meshStandardMaterial
              color="#7c3aed"
            />
          </mesh>

          {/* Scanning line */}

          {scanning && (
            <mesh
              ref={scanRef}
              position={[0, -1.35, 0.18]}
            >
              <boxGeometry
                args={[2.5, 0.035, 0.02]}
              />

              <meshStandardMaterial
                color="#22d3ee"
                emissive="#06b6d4"
                emissiveIntensity={1}
              />
            </mesh>
          )}

          {/* Verification check */}

          <group
            ref={checkRef}
            position={[0, 0.35, 0.2]}
            scale={verified ? 1 : 0.01}
          >
            <mesh>
              <sphereGeometry
                args={[0.42, 24, 24]}
              />

              <meshStandardMaterial
                color="#22c55e"
                emissive="#16a34a"
                emissiveIntensity={0.55}
              />
            </mesh>

            <Text
              position={[0, 0, 0.4]}
              fontSize={0.42}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              ✓
            </Text>
          </group>
        </group>
      </Float>

      {/* =================================================
          TITLE
          ================================================= */}

      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
      >
        PERFECT YOUR CV
      </Text>

      {/* =================================================
          STATUS
          ================================================= */}

      <Text
        position={[0, -2.35, 0]}
        fontSize={0.17}
        color={
          verified
            ? "#4ade80"
            : scanning
              ? "#22d3ee"
              : "#94a3b8"
        }
        anchorX="center"
      >
        {verified
          ? "CV VERIFIED"
          : scanning
            ? "ANALYSING YOUR CV..."
            : "CLICK TO ANALYSE"}
      </Text>
    </group>
  );
}
/* =========================================================
   INTERVIEW
   ========================================================= */

function InterviewScene({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const interviewerRef = useRef<THREE.Group>(null);
  const candidateRef = useRef<THREE.Group>(null);
  const questionRef = useRef<THREE.Group>(null);
  const answerRef = useRef<THREE.Group>(null);
  const evaluationRef = useRef<THREE.Group>(null);

  const [questionActive, setQuestionActive] = useState(false);
  const [answered, setAnswered] = useState(false);

  useFrame((state) => {
    if (!reducedMotion) {
      if (interviewerRef.current) {
        interviewerRef.current.position.y =
          Math.sin(state.clock.elapsedTime * 1.4) * 0.05;
      }

      if (candidateRef.current) {
        candidateRef.current.position.y =
          Math.sin(state.clock.elapsedTime * 1.4 + 1) * 0.05;
      }
    }

    if (questionRef.current) {
      const targetScale = questionActive ? 1.12 : 1;

      questionRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        reducedMotion ? 1 : 0.12,
      );
    }

    if (answerRef.current) {
      const targetScale = answered ? 1.12 : questionActive ? 1 : 0.01;

      answerRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        reducedMotion ? 1 : 0.12,
      );
    }

    if (evaluationRef.current) {
      const targetScale = answered ? 1 : 0.01;

      evaluationRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        reducedMotion ? 1 : 0.12,
      );
    }
  });

  return (
    <group>
      {/* INTERVIEWER */}
      <Float
        speed={reducedMotion ? 0 : 1.2}
        rotationIntensity={reducedMotion ? 0 : 0.04}
        floatIntensity={reducedMotion ? 0 : 0.15}
      >
        <group ref={interviewerRef} position={[-1.65, 0.2, 0]}>
          <mesh position={[0, 0, 0]}>
            <capsuleGeometry args={[0.45, 1.15, 8, 16]} />
            <meshStandardMaterial
              color="#2563eb"
              emissive="#1d4ed8"
              emissiveIntensity={0.2}
              roughness={0.4}
            />
          </mesh>

          <mesh position={[0, 0.95, 0]}>
            <sphereGeometry args={[0.4, 24, 24]} />
            <meshStandardMaterial
              color="#f8fafc"
              roughness={0.5}
            />
          </mesh>

          <mesh position={[0, 0.96, 0.34]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial
              color="#0f172a"
              roughness={0.3}
            />
          </mesh>

          {/* Interviewer laptop */}
          <mesh position={[0, -0.65, 0.35]} rotation={[-0.15, 0, 0]}>
            <boxGeometry args={[1.15, 0.08, 0.75]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.6}
              roughness={0.35}
            />
          </mesh>
        </group>
      </Float>

      {/* CANDIDATE */}
      <Float
        speed={reducedMotion ? 0 : 1.3}
        rotationIntensity={reducedMotion ? 0 : 0.04}
        floatIntensity={reducedMotion ? 0 : 0.15}
      >
        <group ref={candidateRef} position={[1.65, 0.2, 0]}>
          <mesh>
            <capsuleGeometry args={[0.45, 1.15, 8, 16]} />
            <meshStandardMaterial
              color="#7c3aed"
              emissive="#6d28d9"
              emissiveIntensity={0.2}
              roughness={0.4}
            />
          </mesh>

          <mesh position={[0, 0.95, 0]}>
            <sphereGeometry args={[0.4, 24, 24]} />
            <meshStandardMaterial
              color="#f8fafc"
              roughness={0.5}
            />
          </mesh>

          <mesh position={[0, 0.96, 0.34]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial
              color="#0f172a"
              roughness={0.3}
            />
          </mesh>

          {/* Candidate laptop */}
          <mesh position={[0, -0.65, 0.35]} rotation={[-0.15, 0, 0]}>
            <boxGeometry args={[1.15, 0.08, 0.75]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.6}
              roughness={0.35}
            />
          </mesh>
        </group>
      </Float>

      {/* TABLE */}
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[5.2, 0.18, 1.8]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.35}
          roughness={0.55}
        />
      </mesh>

      {/* QUESTION */}
      <group
        ref={questionRef}
        position={[-1.05, 2.0, 0]}
        onClick={(event) => {
          event.stopPropagation();
          setQuestionActive(true);
          setAnswered(false);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <mesh>
          <sphereGeometry args={[0.55, 24, 24]} />
          <meshStandardMaterial
            color={questionActive ? "#2563eb" : "#1d4ed8"}
            emissive="#2563eb"
            emissiveIntensity={questionActive ? 0.8 : 0.35}
          />
        </mesh>

        <Text
          position={[0, 0, 0.48]}
          fontSize={0.45}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          ?
        </Text>
      </group>

      {/* ANSWER */}
      <group
        ref={answerRef}
        position={[1.05, 2.0, 0]}
        onClick={(event) => {
          event.stopPropagation();

          if (!questionActive) {
            return;
          }

          setAnswered(true);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();

          if (questionActive) {
            document.body.style.cursor = "pointer";
          }
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <mesh>
          <sphereGeometry args={[0.55, 24, 24]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#16a34a"
            emissiveIntensity={answered ? 0.9 : 0.45}
          />
        </mesh>

        <Text
          position={[0, 0, 0.48]}
          fontSize={0.38}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          ✓
        </Text>
      </group>

      {/* EVALUATION */}
      <group
        ref={evaluationRef}
        position={[0, -2.0, 0]}
      >
        <mesh>
          <boxGeometry args={[2.8, 0.85, 0.18]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#2563eb"
            emissiveIntensity={0.25}
            metalness={0.35}
            roughness={0.4}
          />
        </mesh>

        <Text
          position={[0, 0.18, 0.15]}
          fontSize={0.16}
          color="#94a3b8"
          anchorX="center"
        >
          INTERVIEW SCORE
        </Text>

        <Text
          position={[0, -0.12, 0.15]}
          fontSize={0.3}
          color="#4ade80"
          anchorX="center"
        >
          92% READY
        </Text>
      </group>

      {/* TITLE */}
      <Text
        position={[0, 2.85, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
      >
        INTERVIEW PREPARATION
      </Text>

      {/* INSTRUCTION */}
      <Text
        position={[0, -2.65, 0]}
        fontSize={0.17}
        color={
          answered
            ? "#4ade80"
            : questionActive
              ? "#22d3ee"
              : "#94a3b8"
        }
        anchorX="center"
      >
        {answered
          ? "ANSWER EVALUATED"
          : questionActive
            ? "CLICK ✓ TO SUBMIT YOUR ANSWER"
            : "CLICK ? TO GET A QUESTION"}
      </Text>
    </group>
  );
}

/* =========================================================
   JOB READY
   ========================================================= */

function JobReadyScene({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const rocketRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  const [launched, setLaunched] = useState(false);

  useFrame((state, delta) => {
    if (rocketRef.current) {
      if (!reducedMotion) {
        const targetY = launched
          ? 1.2 + Math.sin(state.clock.elapsedTime * 4) * 0.08
          : Math.sin(state.clock.elapsedTime * 1.5) * 0.12;

        rocketRef.current.position.y = THREE.MathUtils.lerp(
          rocketRef.current.position.y,
          targetY,
          0.08,
        );

        rocketRef.current.rotation.z = THREE.MathUtils.lerp(
          rocketRef.current.rotation.z,
          launched
            ? Math.sin(state.clock.elapsedTime * 2) * 0.04
            : 0,
          0.08,
        );
      }
    }

    if (flameRef.current) {
      const targetScale = launched ? 1.35 : 0.8;

      if (reducedMotion) {
        flameRef.current.scale.setScalar(launched ? 1 : 0.8);
      } else {
        const pulse =
          targetScale +
          Math.sin(state.clock.elapsedTime * 8) * 0.12;

        flameRef.current.scale.lerp(
          new THREE.Vector3(pulse, pulse, pulse),
          0.15,
        );
      }
    }

    if (ringRef.current && !reducedMotion) {
      ringRef.current.rotation.z += delta * (launched ? 0.7 : 0.25);
      ringRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      {/* CAREER RING */}
      <group ref={ringRef} position={[0, 0.2, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.1, 0.045, 12, 64]} />
          <meshStandardMaterial
            color={launched ? "#22c55e" : "#2563eb"}
            emissive={launched ? "#16a34a" : "#1d4ed8"}
            emissiveIntensity={launched ? 0.9 : 0.4}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.65, 0.025, 12, 64]} />
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#2563eb"
            emissiveIntensity={0.35}
          />
        </mesh>
      </group>

      {/* ROCKET */}
      <Float
        speed={reducedMotion ? 0 : 1.5}
        rotationIntensity={reducedMotion ? 0 : 0.04}
        floatIntensity={reducedMotion ? 0 : 0.2}
      >
        <group
          ref={rocketRef}
          position={[0, 0.2, 0]}
          onClick={(event) => {
            event.stopPropagation();
            setLaunched((value) => !value);
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
          }}
        >
          {/* Rocket body */}
          <mesh>
            <capsuleGeometry args={[0.48, 1.35, 8, 16]} />
            <meshStandardMaterial
              color={launched ? "#f8fafc" : "#e2e8f0"}
              metalness={0.45}
              roughness={0.3}
            />
          </mesh>

          {/* Rocket nose */}
          <mesh position={[0, 1.15, 0]}>
            <coneGeometry args={[0.48, 0.8, 32]} />
            <meshStandardMaterial
              color="#ef4444"
              emissive="#dc2626"
              emissiveIntensity={launched ? 0.65 : 0.2}
              metalness={0.25}
              roughness={0.35}
            />
          </mesh>

          {/* Window */}
          <mesh position={[0, 0.45, 0.43]}>
            <sphereGeometry args={[0.2, 24, 24]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0ea5e9"
              emissiveIntensity={launched ? 1 : 0.5}
              metalness={0.3}
              roughness={0.2}
            />
          </mesh>

          {/* Left fin */}
          <mesh
            position={[-0.52, -0.55, 0]}
            rotation={[0, 0, 0.25]}
          >
            <boxGeometry args={[0.22, 0.65, 0.12]} />
            <meshStandardMaterial
              color="#2563eb"
              emissive="#1d4ed8"
              emissiveIntensity={0.25}
            />
          </mesh>

          {/* Right fin */}
          <mesh
            position={[0.52, -0.55, 0]}
            rotation={[0, 0, -0.25]}
          >
            <boxGeometry args={[0.22, 0.65, 0.12]} />
            <meshStandardMaterial
              color="#2563eb"
              emissive="#1d4ed8"
              emissiveIntensity={0.25}
            />
          </mesh>

          {/* Engine */}
          <mesh position={[0, -0.95, 0]}>
            <cylinderGeometry args={[0.23, 0.3, 0.25, 24]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>

          {/* Flame */}
          <group ref={flameRef} position={[0, -1.35, 0]}>
            <mesh>
              <coneGeometry args={[0.3, 0.9, 16]} />
              <meshStandardMaterial
                color="#f97316"
                emissive="#ea580c"
                emissiveIntensity={1.2}
              />
            </mesh>

            <mesh position={[0, -0.35, 0]}>
              <coneGeometry args={[0.16, 0.55, 16]} />
              <meshStandardMaterial
                color="#facc15"
                emissive="#f59e0b"
                emissiveIntensity={1.3}
              />
            </mesh>
          </group>
        </group>
      </Float>

      {/* CAREER STAGE MARKERS */}
      {[
        [-2.5, -1.4, "#2563eb"],
        [-1.5, -1.75, "#7c3aed"],
        [-0.5, -2.0, "#0891b2"],
        [0.5, -2.0, "#059669"],
        [1.5, -1.75, "#d97706"],
        [2.5, -1.4, "#22c55e"],
      ].map(([x, y, color], index) => (
        <group key={index} position={[x as number, y as number, 0]}>
          <mesh>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshStandardMaterial
              color={color as string}
              emissive={color as string}
              emissiveIntensity={0.5}
            />
          </mesh>

          {index < 5 && (
            <mesh position={[0.5, 0.15, 0]}>
              <boxGeometry args={[0.75, 0.025, 0.025]} />
              <meshStandardMaterial
                color="#475569"
                emissive="#334155"
                emissiveIntensity={0.2}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* TITLE */}
      <Text
        position={[0, 2.8, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
      >
        JOB READY
      </Text>

      {/* STATUS */}
      <Text
        position={[0, -2.55, 0]}
        fontSize={0.18}
        color={launched ? "#4ade80" : "#93c5fd"}
        anchorX="center"
      >
        {launched
          ? "CAREER LAUNCHED"
          : "CLICK THE ROCKET TO LAUNCH"}
      </Text>

      {/* SUPPORTING TEXT */}
      <Text
        position={[0, -2.9, 0]}
        fontSize={0.13}
        color="#64748b"
        anchorX="center"
      >
        UNDERSTAND → BUILD → PREPARE → APPLY
      </Text>
    </group>
  );
}

/* =========================================================
   SCENE SWITCHER
   ========================================================= */

function CareerSceneContent({
  activeStage,
  reducedMotion,
}: {
  activeStage: string;
  reducedMotion: boolean;
}) {
  switch (activeStage) {
    case "skills":
      return (
        <SkillsScene
          reducedMotion={reducedMotion}
        />
      );

    case "projects":
      return (
        <ProjectsScene
          reducedMotion={reducedMotion}
        />
      );

    case "cv":
      return (
        <CVScene
          reducedMotion={reducedMotion}
        />
      );

    case "interview":
      return (
        <InterviewScene
          reducedMotion={reducedMotion}
        />
      );

    case "ready":
      return (
        <JobReadyScene
          reducedMotion={reducedMotion}
        />
      );

    case "role":
    default:
      return (
        <TargetRoleScene
          reducedMotion={reducedMotion}
        />
      );
  }
}

/* =========================================================
   MAIN 3D COMPONENT
   ========================================================= */

export default function CareerScene({
  activeStage,
  stages,
  reducedMotion = false,
}: CareerSceneProps) {
  const [displayedStage, setDisplayedStage] =
    useState(activeStage);

  const [transitioning, setTransitioning] =
    useState(false);

  useEffect(() => {
    if (activeStage === displayedStage) {
      return;
    }

    if (reducedMotion) {
      setDisplayedStage(activeStage);
      return;
    }

    setTransitioning(true);

    const timer = window.setTimeout(() => {
      setDisplayedStage(activeStage);
      setTransitioning(false);
    }, 180);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeStage, displayedStage, reducedMotion]);

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl bg-slate-950">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [0, 1, 7],
          fov: 45,
        }}
        fallback={
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-200">
            3D preview unavailable. Your career journey is
            still available through the controls below.
          </div>
        }
      >
        <color
          attach="background"
          args={["#020617"]}
        />

        <ambientLight intensity={1.35} />

        <directionalLight
          position={[4, 6, 4]}
          intensity={2}
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />

        <pointLight
          position={[-4, 3, 2]}
          intensity={1.2}
          color="#60a5fa"
        />

        <CareerSceneContent
          activeStage={displayedStage}
          reducedMotion={reducedMotion}
        />

        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={9}
          enableDamping={!reducedMotion}
          dampingFactor={0.08}
        />

        <gridHelper
          args={[
            10,
            20,
            "#1e293b",
            "#0f172a",
          ]}
          position={[0, -1.65, 0]}
        />
      </Canvas>

      {!reducedMotion && (
        <div
          className={[
            "pointer-events-none absolute inset-0",
            "bg-slate-950 transition-opacity duration-200",
            transitioning
              ? "opacity-40"
              : "opacity-0",
          ].join(" ")}
          aria-hidden="true"
        />
      )}
    </div>
  );
}