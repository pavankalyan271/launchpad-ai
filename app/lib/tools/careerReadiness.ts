import { tool } from "ai";
import { z } from "zod";

export const careerReadinessTool = tool({
  description:
    "Assess a candidate's readiness for an entry-level software engineering role based on their technical skills, projects, interview preparation, and CV readiness.",

  inputSchema: z.object({
    targetRole: z
      .string()
      .min(2)
      .max(80)
      .describe(
        "The entry-level role the candidate is targeting, such as Junior Software Engineer or Frontend Developer."
      ),

    technicalSkills: z
      .array(z.string().min(1).max(40))
      .max(10)
      .describe(
        "Technical skills explicitly mentioned by the candidate."
      ),

    projects: z
      .array(z.string().min(1).max(100))
      .max(10)
      .describe(
        "Relevant projects explicitly mentioned by the candidate."
      ),

    interviewPreparation: z
      .number()
      .min(0)
      .max(100)
      .describe(
        "Estimated interview preparation level from 0 to 100."
      ),

    cvReadiness: z
      .number()
      .min(0)
      .max(100)
      .describe(
        "Estimated CV readiness from 0 to 100."
      ),
  }),

  execute: async ({
    targetRole,
    technicalSkills,
    projects,
    interviewPreparation,
    cvReadiness,
  }) => {
    if (!targetRole.trim()) {
      throw new Error("Target role is required.");
    }

    // This gives reviewers a reliable way to test
    // the designed tool-error state.
    if (targetRole.trim().toLowerCase() === "error-demo") {
      throw new Error(
        "Career readiness service is temporarily unavailable."
      );
    }

    const technicalScore = Math.min(
      100,
      technicalSkills.length * 15
    );

    const projectScore = Math.min(
      100,
      projects.length * 20
    );

    const overallScore = Math.round(
      technicalScore * 0.35 +
        projectScore * 0.25 +
        interviewPreparation * 0.2 +
        cvReadiness * 0.2
    );

    const strengths: string[] = [];
    const skillGaps: string[] = [];
    const nextSteps: string[] = [];

    if (technicalScore >= 70) {
      strengths.push("Good technical foundation");
    } else {
      skillGaps.push(
        "Strengthen core technical skills"
      );
    }

    if (projectScore >= 60) {
      strengths.push(
        "Practical project experience"
      );
    } else {
      skillGaps.push(
        "Build more practical projects"
      );
    }

    if (interviewPreparation >= 70) {
      strengths.push(
        "Good interview preparation"
      );
    } else {
      skillGaps.push(
        "Practice technical and behavioural interviews"
      );
    }

    if (cvReadiness >= 70) {
      strengths.push(
        "CV is relatively well prepared"
      );
    } else {
      skillGaps.push(
        "Improve CV structure and impact"
      );
    }

    if (technicalScore < 70) {
      nextSteps.push(
        "Strengthen the technical skills most relevant to the target role."
      );
    }

    if (projectScore < 60) {
      nextSteps.push(
        "Complete one strong portfolio project related to the target role."
      );
    }

    if (interviewPreparation < 70) {
      nextSteps.push(
        "Practice common technical and behavioural interview questions."
      );
    }

    if (cvReadiness < 70) {
      nextSteps.push(
        "Tailor the CV to the target role and highlight measurable project outcomes."
      );
    }

    if (nextSteps.length === 0) {
      nextSteps.push(
        "Start applying to suitable entry-level roles and continue improving through feedback."
      );
    }

    return {
      targetRole,
      overallScore,

      breakdown: {
        technicalSkills: technicalScore,
        projects: projectScore,
        interviewPreparation,
        cvReadiness,
      },

      strengths,
      skillGaps,
      nextSteps,
    };
  },
});