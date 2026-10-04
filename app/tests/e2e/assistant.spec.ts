import { test, expect } from "@playwright/test";

test("user can open Career Assistant and send a message", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "text/event-stream",
      headers: {
        "X-Vercel-AI-UI-Message-Stream": "v1",
      },
      body: [
        'data: {"type":"start","messageId":"mock-message"}\n\n',
        'data: {"type":"text-start","id":"mock-text"}\n\n',
        'data: {"type":"text-delta","id":"mock-text","delta":"Here is some mock career advice."}\n\n',
        'data: {"type":"text-end","id":"mock-text"}\n\n',
        'data: {"type":"finish","finishReason":"stop"}\n\n',
      ].join(""),
    });
  });

  await page.goto("/assistant");

  await expect(
    page.getByRole("heading", {
      name: "LaunchPad AI Career Assistant",
    })
  ).toBeVisible();

  await expect(
    page.getByText("Welcome to LaunchPad AI 👋")
  ).toBeVisible();

  const messageInput = page.getByRole("textbox", {
    name: "Message LaunchPad AI",
  });

  await messageInput.fill(
    "Help me prepare for a Junior Software Engineer role."
  );

  await page.getByRole("button", {
    name: "Send message",
  }).click();

  await expect(
    page.getByText("Here is some mock career advice.")
  ).toBeVisible();
});