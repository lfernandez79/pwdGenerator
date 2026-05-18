# Password Generator — Claude Code Context

## Project overview
Vanilla JS static webapp that generates random passwords. Originally built as a Full Stack learning project.
Live at: https://pwdg.netlify.app/

## Stack
- HTML5, CSS3, vanilla JavaScript (ES6) — no frameworks, no build tools
- Font Awesome icons (CDN)
- Deployed on Netlify via GitHub auto-deploy from `master`

## Ground rules
- Keep it vanilla — no frameworks, no bundlers, no unnecessary dependencies
- Make changes methodically, one concern at a time
- Show code diffs before editing so changes can be reviewed
- Suggest a commit after each logical unit of work
- This is a live site — test before committing

## Local dev server
Uses Python's built-in HTTP server (no Node required):
- Configured in `.claude/launch.json` on port 5500
- Start via Claude Code preview tool or manually:
  `python3 -m http.server 5500 -d /path/to/project`

## Git workflow
- Work happens on feature branches (e.g. `claude/branch-name`)
- PRs target `master`
- Merging to `master` triggers an automatic Netlify deploy
- Remote: git@github.com:lfernandez79/pwdGenerator.git (SSH)

## Completed improvements
- [x] Replace `Math.random()` with `crypto.getRandomValues()` for secure generation
- [x] Fix empty selection guard — `return` early instead of `location.reload()`
- [x] Add `.claude/` to `.gitignore`
- [x] Remove unused `package.json` and `package-lock.json`
- [x] Remove `console.log` statements from script.js
- [x] Remove dead code: `hsimp.min.js` (references and file)
- [x] Fix fragile charString charset management (replaced with Set-based approach)
- [x] Add copy-to-clipboard via `navigator.clipboard.writeText()`
- [x] Migrate to ES Modules (`type="module"`)
- [x] Add `netlify.toml` for cache/security headers
- [x] Add ARIA attributes for accessibility
- [x] Clean up PWA manifest (removed broken duplicate `site.webmanifest`)
- [x] Add password strength estimate above Copy button (log10-space crack-time calc, offline 10B guesses/sec model)
