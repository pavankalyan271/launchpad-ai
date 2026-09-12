import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";

import {
  careerAssistantModel,
  careerAssistantSystemPrompt,
} from "../../../lib/ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: careerAssistantModel,
      system: careerAssistantSystemPrompt,
      messages: await convertToModelMessages(messages),
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