import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ProfileSettingsForm from "../src/ProfileSettingsForm";

describe("ProfileSettingsForm", () => {
  it("shows required validation errors for empty fields", async () => {
    const user = userEvent.setup();

    render(<ProfileSettingsForm />);

    await user.click(
      screen.getByRole("button", {
        name: "Save Changes",
      })
    );

    expect(
      screen.getByText("Full name is required.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Email is required.")
    ).toBeInTheDocument();
  });

  it("validates full name length", async () => {
    const user = userEvent.setup();

    render(<ProfileSettingsForm />);

    await user.type(
      screen.getByLabelText("Full Name"),
      "AB"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Save Changes",
      })
    );

    expect(
      screen.getByText(
        "Full name must be at least 3 characters."
      )
    ).toBeInTheDocument();
  });

  it("validates email format", async () => {
    const user = userEvent.setup();

    render(<ProfileSettingsForm />);

    await user.type(
      screen.getByLabelText("Full Name"),
      "Pavan Kalyan"
    );

    await user.type(
      screen.getByLabelText("Email"),
      "invalid-email"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Save Changes",
      })
    );

    expect(
      screen.getByText("Enter a valid email address.")
    ).toBeInTheDocument();
  });

  it("validates bio length", async () => {
    const user = userEvent.setup();

    render(<ProfileSettingsForm />);

    await user.type(
      screen.getByLabelText("Full Name"),
      "Pavan Kalyan"
    );

    await user.type(
      screen.getByLabelText("Email"),
      "pavan@example.com"
    );

    const longBio = "a".repeat(201);

    await user.type(
      screen.getByLabelText("Short Bio (optional)"),
      longBio
    );

    await user.click(
      screen.getByRole("button", {
        name: "Save Changes",
      })
    );

    expect(
      screen.getByText("Bio cannot exceed 200 characters.")
    ).toBeInTheDocument();
  });

  it("submits successfully with valid information", async () => {
    const user = userEvent.setup();

    render(<ProfileSettingsForm />);

    await user.type(
      screen.getByLabelText("Full Name"),
      "Pavan Kalyan"
    );

    await user.type(
      screen.getByLabelText("Email"),
      "pavan@example.com"
    );

    await user.type(
      screen.getByLabelText("Short Bio (optional)"),
      "Software engineering graduate."
    );

    await user.click(
      screen.getByRole("button", {
        name: "Save Changes",
      })
    );

    expect(
      screen.getByText("Profile updated successfully!")
    ).toBeInTheDocument();
  });
});