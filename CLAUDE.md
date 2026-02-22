# Claude Instructions for Petral Project

## Notifications

**IMPORTANT: Always emit a sound notification when:**
- Requesting user permission (e.g., "Do you want to proceed?")
- Completing a task
- Encountering an error that needs user attention

Use `\a` (bell character) or explicit notification in the message.

When task is complete, add 😊 emoji at the end.

## Docker Hub Publishing

**IMPORTANT: Do NOT push to Docker Hub automatically. Only push when explicitly asked by the user.**

## Testing Protocol

**IMPORTANT: Always test changes using Playwright UI mode before committing.**

```bash
npm run test:ui
```

- Test all modified functionality interactively
- Use Playwright's time-travel debugging
- Verify fixes visually in the browser
- Add new tests for new features

## Alternative Testing Commands

```bash
npm test              # Run all tests headless
npm run test:ui       # Interactive UI mode (preferred)
npm run test:report   # View HTML report after tests run
npx playwright codegen http://localhost:3000  # Record new tests
```

## Development Workflow

1. Make code changes
2. **Run `npm run test:ui`** to verify
3. Fix any failing tests
4. Commit and push
5. Build Docker image for deployment

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment instructions.

Quick update command for TrueNAS:
```bash
sudo docker pull npashofff/petral-web:latest && sudo docker restart ix-petral-web-petral-web-1
```
