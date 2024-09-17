# Welcome

We are the platform engineers who have gathered to build a platform called Philly Truce.

## Background

Philly Truce aims to use technology to reduce violent conflict in Philadelphia. Partnering with the Penn Injury Science Center's Safe Path Program, they are developing an incident-management platform based on the original Philly Truce app. This platform will provide a free, anonymous way for students, community members, and Safe Path personnel to report conflicts along school routes, preventing potentially deadly disputes. Mediators will also use the platform to resolve conflicts before they turn violent.

## Local Setup

1. Download the local file from (git@github.com:johnjang94/phillytruce-frontend.git)
2. Copy & paste the environment variables with one of the following commands:
```bash
cp .env.example .env #for MacOS and Linux
copy .env.example .env #for Windows
```

3. Install all the dependencies using the following command:
```bash
yarn install #or npm install or pnpm install
```

4. Now, run the project
```bash
yarn dev # or npm run dev or pnpm run dev
```

## Tech Stack

- Front-End
  - Next.js
  - TypeScript
  - Tailwind CSS
  - Shadcn
  - Next Auth

- Back-End
  - MongoDB
  - Twilio
  - Prisma ORM

## Working Tree

```
- public
- src
    - app
        - layout.tsx
        - page.tsx
- configuration files
```