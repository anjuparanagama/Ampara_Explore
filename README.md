This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Authentication and TiDB

Authentication uses TiDB through server-only route handlers. Passwords are
hashed with bcrypt, and authenticated users receive a revocable HttpOnly
session cookie backed by the `users` and `sessions` tables.

1. Copy the TiDB connection string into `DB_URL` in `.env.local`. The
   connection must target an application database, not a restricted system
   database, and the account must have permission to create tables for the
   initial migration.
2. Run the migration:

   ```bash
   npm run db:migrate
   ```

3. Optionally set `SEED_USER_NAME`, `SEED_USER_EMAIL`, and
   `SEED_USER_PASSWORD` in the environment, then run:

   ```bash
   npm run db:seed
   ```

   Alternatively, pass credentials directly:

   ```powershell
   npm run db:seed -- --name="Ampara Explorer" --email="explorer@example.com" --password="ChangeMe123"
   ```

The connection parser enforces certificate-validated TLS for TiDB Serverless.
After the initial migration, the application runtime only needs normal
database read/write permissions.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
