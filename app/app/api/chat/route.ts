import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";

import {
  careerAssistantModel,
  careerAssistantSystemPrompt,
} from "../../../lib/ai";

import { careerReadinessTool } from "../../../lib/tools/careerReadiness";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } =
      await req.json();

    const result = streamText({
      model: careerAssistantModel,

      system: `${careerAssistantSystemPrompt}

When the user asks for a career readiness assessment,
use the analyzeCareerReadiness tool.

Only use information that the user has provided in the
conversation when constructing the tool input.

Do not invent the user's skills, projects, interview
preparation, or CV readiness.

If important information is missing, ask the user for it
before calling the tool.

After the tool returns successfully, explain the result
briefly and let the structured UI display the detailed
assessment.`,

      messages: await convertToModelMessages(messages),

      tools: {
        analyzeCareerReadiness: careerReadinessTool,
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);

    return new Response(
      JSON.stringify({
        error: "Unable to process the chat request.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}