# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: MongoDB Atlas (via Mongoose)
- **Validation**: Zod
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Architecture

### Frontend (artifacts/todo-app)
- React + Vite app
- Uses generated hooks from `@workspace/api-client-react`
- `useGetTasks()` — fetches all tasks
- `useAddTask` — mutation to add a new task
- Route `/` — main to-do page with input + task list

### Backend (artifacts/api-server)
- Express 5 server
- `GET /api/tasks` — returns all tasks from MongoDB
- `POST /api/tasks` — creates a new task
- MongoDB Atlas via Mongoose (MONGODB_URI secret required)

### Models (artifacts/api-server/src/models/task.ts)
- Task: { title: string, createdAt: Date } stored in MongoDB

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
