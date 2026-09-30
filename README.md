# Xpertend

Xpertend is an expert offline coordination desk. It helps clients connect directly with independent professionals across accounting, heavy machinery, and astrology services.

The app presents a responsive single-page experience with service discovery, direct contact actions, and a callback request form.

## Service desks

- **CA Connect**: GST registration, tax filing, audits, ROC filings, and incorporation support.
- **Heavy Machinery**: Equipment rentals, field repairs, overhauls, and spare parts dispatch.
- **Astrology Connect**: Kundali analysis, matchmaking, timing guidance, Vastu planning, and consultations.

## Features

- Responsive coordination-desk landing page for desktop and mobile.
- Direct phone, email, and WhatsApp contact links.
- Callback form with name, phone, email, service, and location fields.
- Service buttons that select a category and scroll to the callback form.
- Client-side success state after a valid callback form submission.
- Bootstrap 5 and Bootstrap Icons for layout and interface icons.
- Outfit and Inter typography with Xpertend brand styling.

> The callback form currently provides a client-side confirmation only. Connect it to a backend or form service before using it to collect production requests.

## Tech stack

- Angular 21 with standalone components
- Angular Router with a single application route (`/`)
- Angular Forms with template-driven form bindings
- TypeScript
- Bootstrap 5
- Bootstrap Icons
- Vitest through the Angular test runner

## Getting started

### Requirements

- Node.js compatible with the project dependencies
- npm 11 or later

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

Open `http://localhost:4200/` in a browser. The app reloads automatically as source files change.

## Available commands

| Command | Description |
| --- | --- |
| `npm start` | Start the Angular development server. |
| `npm run build` | Create an optimized production build in `dist/`. |
| `npm run watch` | Rebuild continuously using the development configuration. |
| `npm test` | Run the unit tests with Vitest. |

## Project structure

```text
src/
	app/
		home/
			home.html    # Single-page coordination desk UI
			home.css     # Responsive Xpertend design system
			home.ts      # Service data and form interactions
		app.routes.ts  # Single route with fallback redirect
	index.html       # Page metadata and font loading
	styles.css       # Global Bootstrap, icon, and typography styles
```

## Testing

Run the unit tests once without watch mode:

```bash
npm test -- --watch=false
```

The current test suite verifies that the root application component is created and renders its router outlet.
