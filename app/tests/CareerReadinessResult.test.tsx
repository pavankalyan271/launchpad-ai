import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CareerReadinessResult from "../components/tools/CareerReadinessResult";

const mockResult = {
  targetRole: "Frontend Developer",
  overallScore: 82,
  breakdown: {
    technicalSkills: 90,
    projects: 80,
    interviewPreparation: 75,
    cvReadiness: 85,
  },
  strengths: [
    "Strong React knowledge",
    "Good project experience",
  ],
  skillGaps: [
    "Testing experience",
    "Advanced TypeScript",
  ],
  nextSteps: [
    "Build a testing project",
    "Improve TypeScript skills",
  ],
};

describe("CareerReadinessResult", () => {
  it("renders the career readiness result", () => {
    render(<CareerReadinessResult result={mockResult} />);

    expect(
      screen.getByText("Career Readiness Assessment")
    ).toBeInTheDocument();

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();

    expect(
      screen.getByLabelText("Overall readiness score: 82 out of 100")
    ).toBeInTheDocument();
  });

  it("shows strong readiness for a high score", () => {
    render(<CareerReadinessResult result={mockResult} />);

    expect(screen.getByText("Strong readiness")).toBeInTheDocument();
  });

  it("renders the readiness breakdown", () => {
    render(<CareerReadinessResult result={mockResult} />);

    expect(screen.getByText("Readiness breakdown")).toBeInTheDocument();

    expect(screen.getByText("Technical skills")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Interview preparation")).toBeInTheDocument();
    expect(screen.getByText("CV readiness")).toBeInTheDocument();
  });

  it("renders strengths", () => {
    render(<CareerReadinessResult result={mockResult} />);

    expect(screen.getByText("Strong React knowledge")).toBeInTheDocument();
    expect(screen.getByText("Good project experience")).toBeInTheDocument();
  });

  it("renders skill gaps", () => {
    render(<CareerReadinessResult result={mockResult} />);

    expect(screen.getByText("Testing experience")).toBeInTheDocument();
    expect(screen.getByText("Advanced TypeScript")).toBeInTheDocument();
  });

  it("renders recommended next steps", () => {
    render(<CareerReadinessResult result={mockResult} />);

    expect(screen.getByText("Build a testing project")).toBeInTheDocument();
    expect(screen.getByText("Improve TypeScript skills")).toBeInTheDocument();
  });
});