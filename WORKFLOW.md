# AI-Assisted Workflow Comparison

## Round 1 — Vague Workflow

For Round 1, I created the `workflow-vague` branch and used Microsoft Copilot in a fresh browser conversation with the prompt: “Build a React profile settings form with validation.”

The result was functional, but the vague prompt allowed the AI to make several assumptions. It added password and confirm-password fields that were not requested and introduced React Hook Form without being asked. The form included validation, but a valid submission only logged the data to the console and did not provide visible confirmation to the user. The labels were also not explicitly associated with their inputs.

I tested the form manually and caught the lack of visible feedback after clicking Save Changes. This became an important example of why AI-generated code needs developer review.

## Round 2 — Precise Workflow

For Round 2, I created the independent `workflow-precise` branch and used a fresh Microsoft Copilot conversation. I provided explicit fields, validation requirements, accessibility requirements, responsive behavior, styling constraints, a no-extra-dependencies rule, and a verification checklist.

The result was more focused. It included only the requested full name, email, and optional bio fields. It provided validation for required fields, email format, and the 200-character bio limit. It also associated labels with inputs using `htmlFor` and `id`, used the project's CSS approach, and displayed a visible success message after valid submission.

## Comparison

The precise workflow produced a result that required less correction and was closer to the requested behavior. The vague workflow was faster to start, but it made more assumptions that I had to review. The precise workflow required more effort in writing the prompt, but that effort reduced unnecessary implementation choices and made verification easier.

For accessibility, Round 2 was stronger because the labels were explicitly associated with their inputs. For edge cases, Round 2 clearly defined the validation requirements, including invalid email formats and bio length.

One important lesson was that precise instructions do not remove the need for human review. Microsoft Copilot in the browser could not directly inspect my local repository, so it initially made assumptions about the project structure. I had to provide the relevant project information and then verify the implementation myself.

## Conclusion

The precise AI-assisted workflow was more effective for this project. I would use an explore → plan → implement → verify process for future work, with clear requirements, constraints, and explicit testing criteria before accepting AI-generated code.