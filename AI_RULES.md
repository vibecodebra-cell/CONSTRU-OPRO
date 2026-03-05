# AI Development Rules

## Tech Stack
- **React**: Core frontend library for building the user interface.
- **TypeScript**: Used for all files to ensure type safety and better developer experience.
- **Tailwind CSS**: The primary framework for styling, used via utility classes.
- **shadcn/ui**: The foundation for UI components (built on Radix UI).
- **Lucide React**: The standard library for all application icons.
- **React Router**: Handles all client-side navigation and routing.
- **Vite**: The build tool and development server.

## Development Guidelines

### 1. Component Structure
- **Pages**: Place all top-level page components in `src/pages/`.
- **Components**: Place reusable UI elements in `src/components/`.
- **Size**: Keep components focused and small (aim for under 100 lines). Refactor into smaller sub-components when they grow too large.

### 2. Styling & UI
- **Tailwind First**: Use Tailwind CSS utility classes for all styling. Avoid creating separate `.css` files unless absolutely necessary.
- **shadcn/ui**: Always check for an existing shadcn/ui component before building a custom one.
- **Icons**: Use `lucide-react` for all iconography to maintain a consistent visual style.

### 3. Routing
- **Centralized Routes**: All application routes must be defined and managed within `src/App.tsx`.
- **Main Entry**: `src/pages/Index.tsx` serves as the default landing page for the application.

### 4. Best Practices
- **TypeScript**: Define interfaces or types for all component props.
- **Responsiveness**: Always build with a mobile-first, responsive mindset using Tailwind's responsive modifiers (e.g., `md:`, `lg:`).
- **Clean Code**: Prioritize readability and simplicity over complex abstractions.