# COPILOT.md — LaunchPad AI Development Rules

## Purpose
This file defines how GitHub Copilot should assist in the development of **LaunchPad AI**, an AI-powered career‑readiness platform for students, graduates, career changers, and entry‑level candidates.

Copilot should support development, not replace developer judgement. As stated in the project guidelines:  
“AI-generated code must be reviewed by the developer before being accepted.”

---

## Product Context
LaunchPad AI helps users:
- Understand their skills and strengths
- Identify suitable career paths
- Analyse job descriptions
- Assess job readiness
- Identify skill gaps
- Build learning roadmaps
- Improve CVs
- Prepare for interviews
- Track applications and outcomes
- Build portfolio projects

Copilot must generate code and suggestions that align with this mission.

---

## Technology Stack
Copilot should follow the project’s planned stack:

- React
- TypeScript
- Vite
- HTML5
- CSS
- REST APIs
- Git + GitHub

Use **TypeScript** wherever possible.

---

## Copilot Behaviour Rules

### 1. Accuracy & Trust
Copilot must **never fabricate**:
- Work experience  
- Qualifications  
- Certifications  
- Skills  
- Achievements  
- Job titles  
- Projects  

All candidate information must remain factual.

Copilot must avoid:
- Guaranteed employment claims  
- Overconfident predictions  
- Unsupported conclusions from small datasets  

---

### 2. Code Quality
Copilot should generate code that is:
- Readable  
- Maintainable  
- Modular  
- Accessible  
- Responsive  
- Consistent with existing patterns  

Avoid:
- Unnecessary abstraction  
- Dead code  
- Duplicate logic  
- Extremely long components  
- Unused imports  
- Hard-coded values when configuration is appropriate  

---

### 3. Component Design
Copilot should prefer:
- Small, reusable components  
- Clear responsibilities  
- Meaningful names  
- Predictable props  
- Consistent behaviour  

Avoid:
- Huge components with unrelated logic  
- Abstraction for abstraction’s sake  

---

### 4. Accessibility Requirements
Copilot must ensure:
- Semantic HTML  
- Proper heading hierarchy  
- Accessible labels  
- Keyboard navigation  
- Visible focus states  
- Sufficient colour contrast  
- Meaningful button labels  
- Alt text for meaningful images  

Copilot must **not** rely on colour alone to communicate information.

---

### 5. Responsive Design
Copilot must ensure UI works on:
- Desktop  
- Laptop  
- Tablet  
- Mobile  

Avoid:
- Fixed widths  
- Horizontal scrolling  
- Tiny touch targets  
- Overcrowded mobile layouts  

---

### 6. AI Development Workflow
Before generating code, Copilot should:
1. Understand the existing project structure  
2. Inspect relevant files  
3. Identify only the files that need changes  
4. Keep changes focused  
5. Preserve existing functionality  
6. Consider accessibility  
7. Consider responsive behaviour  
8. Reuse existing components where possible  
9. Avoid modifying unrelated files  

If a task is ambiguous, Copilot should ask for clarification.

---

### 7. Error Handling
Copilot should generate:
- Clear  
- Helpful  
- User-friendly  
- Actionable  

error messages.

Avoid exposing raw technical errors to users.

---

### 8. Loading & Empty States
Copilot should generate:
- Clear loading states  
- Clear empty states  
- Clear next-step actions  

Example empty state pattern:
- What is empty  
- Why it matters  
- What to do next  

---

### 9. Security Rules
Copilot must never:
- Commit `.env` files  
- Expose API keys  
- Expose tokens  
- Expose credentials  
- Trust client-side input  

All secrets must remain outside source control.

---

### 10. Dependencies
Copilot should avoid adding new dependencies unless:
- They provide meaningful value  
- They are necessary  
- They do not bloat the bundle  
- They align with project conventions  

Prefer built-in or existing utilities.

---

## Conventional Commits
Copilot must follow Conventional Commits:

Examples:
- `feat: add job readiness assessment`
- `fix: correct skill gap analysis`
- `docs: update career discovery documentation`
- `style: improve dashboard spacing`
- `refactor: simplify job matching logic`
- `test: add readiness score tests`
- `chore: update project configuration`

Commit messages must describe the actual change.

---

## Definition of Done
A change is complete only when:
- Functionality is implemented  
- Existing behaviour still works  
- Accessibility is considered  
- Responsive behaviour is considered  
- Errors and edge cases are handled  
- Tests or checks are run  
- Final diff is reviewed  
- No secrets were introduced  
- No unnecessary files were modified  
- Code follows project conventions  

---

## Copilot Summary
Copilot should:
- Assist, not replace judgement  
- Generate clean, accessible, responsive code  
- Follow TypeScript best practices  
- Respect product vision  
- Avoid fabrications  
- Keep changes scoped  
- Follow Conventional Commits  
- Ask for clarification when needed  

Copilot is a **development assistant**, not an autonomous decision-maker.

