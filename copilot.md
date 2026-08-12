# LaunchPad AI — Copilot Instructions

## Project Overview

LaunchPad AI is an AI-powered career readiness platform designed mainly for:

- Final-year students
- Recent graduates
- Entry-level job seekers
- Career changers
- Candidates looking for their first professional role

The goal is to help candidates understand their career direction, identify skill gaps, improve job applications, prepare for interviews, build relevant projects, and track their progress toward becoming job-ready.

The core product concept is:

> Understand your strengths. Identify your gaps. Build evidence. Apply strategically. Prepare effectively. Get hired.

---

## Product Vision

LaunchPad AI should be more than a job application tracker or resume generator.

It should guide an entry-level candidate through the complete journey:

1. Understand their current skills and experience.
2. Identify suitable career paths.
3. Analyse job opportunities.
4. Determine job readiness.
5. Identify skill gaps.
6. Create a learning roadmap.
7. Improve their CV and applications.
8. Prepare for interviews.
9. Build portfolio projects.
10. Track applications and outcomes.
11. Learn from rejections and improve.
12. Progress toward employment.

---

## Target Users

Primary users are:

- Students
- Recent graduates
- Entry-level candidates
- Career changers
- First-time professional job seekers

The product should always consider that these users may have limited professional experience.

---

## Planned Technology Stack

The planned frontend stack is:

- React
- TypeScript
- Vite
- HTML5
- CSS
- REST APIs
- Git
- GitHub

Use TypeScript wherever the project supports it.

---

## Core Product Features

Planned features include:

### Career Discovery

Help users understand which career paths may suit their current skills, education, interests, and experience.

### Job Readiness

Provide an understandable readiness assessment for a selected role.

Example areas:

- Technical skills
- Projects
- Education
- Relevant experience
- CV quality
- Interview readiness

Do not present scores as guaranteed predictions of employment.

### Job Matching

Compare a user's profile with a job description.

Identify:

- Strong matches
- Missing skills
- Preferred skills
- Experience gaps
- Recommended actions

### Skill Gap Analysis

Identify skills that the candidate should develop for a target role.

Recommendations should be practical and actionable.

### Learning Roadmap

Convert identified skill gaps into a structured learning plan.

### CV Assistance

Help candidates improve their CV while preserving factual accuracy.

Never invent:

- Work experience
- Qualifications
- Certifications
- Projects
- Skills
- Achievements
- Job titles

### Interview Preparation

Provide:

- Behavioural questions
- Technical questions
- Role-specific questions
- Project questions
- Feedback
- Practice sessions

### Application Tracking

Allow users to track:

- Company
- Role
- Application date
- Status
- Interview dates
- Notes
- Outcomes

### Application Analytics

Help users understand patterns in their job search.

For example:

- Applications
- Interviews
- Rejections
- Response rate
- Interview conversion

Avoid making unsupported conclusions from small datasets.

### Portfolio Projects

Recommend practical projects that help candidates demonstrate skills they are missing.

### Transferable Skills

Help candidates identify legitimate transferable skills from previous work.

Do not falsely convert unrelated experience into professional technical experience.

---

## UI/UX Principles

The application should feel:

- Modern
- Professional
- Friendly
- Clear
- Encouraging
- Simple
- Trustworthy

Avoid overwhelming entry-level candidates with excessive information.

Prefer:

- Clear hierarchy
- Short explanations
- Actionable recommendations
- Progress indicators
- Cards where appropriate
- Consistent spacing
- Clear navigation
- Useful empty states

---

## Accessibility

Accessibility is a priority.

Use:

- Semantic HTML
- Proper heading hierarchy
- Accessible labels
- Keyboard navigation
- Visible focus states
- Sufficient colour contrast
- Accessible form controls
- Meaningful button labels
- Alternative text for meaningful images

Do not rely on colour alone to communicate information.

---

## Responsive Design

The application should work across:

- Desktop
- Laptop
- Tablet
- Mobile

Do not design only for desktop.

Avoid:

- Fixed widths that break on smaller screens
- Horizontal scrolling
- Tiny touch targets
- Overcrowded mobile layouts

---

## Component Design

Prefer small, reusable components.

Components should have:

- Clear responsibilities
- Meaningful names
- Minimal unnecessary complexity
- Predictable props
- Consistent behaviour

Avoid creating huge components that contain unrelated functionality.

---

## Code Quality

Write:

- Readable code
- Maintainable code
- Simple solutions
- Meaningful variable names
- Meaningful function names
- Meaningful component names

Avoid:

- Unnecessary abstraction
- Duplicate logic
- Dead code
- Unused imports
- Unnecessary dependencies
- Extremely long functions
- Hard-coded values when configuration is more appropriate

---

## AI Development Rules

Before making a significant change:

1. Understand the existing project structure.
2. Identify the files that need to change.
3. Keep the change focused.
4. Do not modify unrelated files.
5. Consider accessibility.
6. Consider responsive behaviour.
7. Preserve existing functionality.

When a task is ambiguous, ask for clarification rather than making major assumptions.

---

## AI-Generated Code

AI-generated code must be reviewed by the developer before being accepted.

Do not blindly accept generated code.

After generating code:

1. Read the changes.
2. Check for errors.
3. Check for unnecessary complexity.
4. Check accessibility.
5. Check responsive behaviour.
6. Check security concerns.
7. Check whether the implementation actually solves the requested problem.
8. Run appropriate tests or checks.

---

## Data and Privacy

Never commit sensitive information.

Never place the following in source control:

- API keys
- Passwords
- Authentication tokens
- Private credentials
- `.env` files
- Personal sensitive information

Use environment variables for secrets when required.

---

## AI and User Trust

AI recommendations must be presented as assistance rather than guaranteed truth.

Avoid claims such as:

- "You will get this job."
- "This CV guarantees an interview."
- "You are definitely qualified."

Prefer language such as:

- "Your profile appears to match..."
- "Consider improving..."
- "You may want to develop..."
- "Based on the information provided..."

The application should never fabricate candidate information.

---

## Job Readiness Score

If a readiness score is implemented:

- Explain what contributes to the score.
- Make the score understandable.
- Avoid pretending that it is scientifically predictive.
- Allow the user to see areas that affect the score.
- Provide actionable steps for improvement.

The score should motivate improvement rather than discourage users.

---

## Error Handling

Errors should be:

- Clear
- Helpful
- User-friendly
- Actionable

Avoid exposing technical errors directly to users unless appropriate.

For example, prefer:

> "We couldn't analyse this job description. Please try again."

instead of displaying raw API or server errors.

---

## Loading States

Use appropriate loading states for asynchronous operations.

Users should understand when:

- Data is loading
- AI is processing
- A request is being submitted
- An analysis is running

Avoid unnecessary blocking screens.

---

## Empty States

Empty states should explain:

1. What is currently empty.
2. Why it matters.
3. What the user can do next.

Example:

> No applications yet.

> Start tracking your job applications to see your progress and application trends.

> [Add Application]

---

## Security

Never trust client-side input.

Validate user input where appropriate.

Do not expose:

- API secrets
- Private tokens
- Internal credentials
- Sensitive backend information

Do not implement authentication or authorization assumptions without understanding the application's architecture.

---

## Dependencies

Do not add a dependency unless it provides meaningful value.

Before adding a package:

- Check whether the functionality can reasonably be implemented without it.
- Consider bundle size.
- Consider maintenance.
- Consider security.
- Consider whether the project actually needs it.

---

## Git and Commit Rules

Use Conventional Commits.

Examples:

```text
feat: add career readiness dashboard
feat: add job description analysis
fix: correct readiness score calculation
docs: update project documentation
style: improve dashboard spacing
refactor: simplify job matching logic
test: add readiness score tests
chore: update project configuration