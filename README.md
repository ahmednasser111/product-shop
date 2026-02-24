# ProductShop

ProductShop is a small Angular application used for practicing core frontend concepts such as components, data binding, routing, and basic state management in a simple e‑commerce style UI.

---

## Features

- **Product listing**: Display a list/grid of products with basic information.
- **Product details**: Navigate to a dedicated page to see more details about a product.
- **Cart‑like behavior** (optional, depending on your exercises): Add/remove products and show a running total.
- **Angular best practices**: Uses components, services, and routing configured via the Angular CLI.

_Note: The exact feature set may vary slightly depending on the exercise or lab instructions you are following._

---

## Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **pnpm**: v9+
- **Angular CLI**: v21.1.4 or compatible

Install Angular CLI globally if you don’t already have it:

```bash
pnpm install -g @angular/cli
```

---

## Getting started

Clone the repository (or download the project files), then install dependencies:

```bash
pnpm install
```

Start the local development server:

```bash
ng serve
```

Open your browser at `http://localhost:4200/`. The app will automatically reload when you change any source files.

---

## Common commands

- **Development server**

  ```bash
  ng serve
  ```

- **Build for production**

  ```bash
  ng build
  ```

  The build artifacts are stored in the `dist/` directory and optimized for performance.

- **Run unit tests** (Vitest)

  ```bash
  ng test
  ```

- **Run end‑to‑end tests**

  ```bash
  ng e2e
  ```

  Angular CLI does not ship an e2e framework by default; configure the one required by your course or project.

---

## Project structure (high level)

Typical important folders and files:

- `src/app` – application modules, components, services, and routing.
- `src/app/components` – presentational and feature components (e.g. product list, product card).
- `src/app/services` – injectable services such as product data or cart logic.
- `src/assets` – static assets (images, JSON data, etc.).

Your specific structure may include extra folders created during the exercises.

---

## Additional resources

- **Angular CLI reference**: [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- **Angular docs**: [Angular documentation](https://angular.dev/)
