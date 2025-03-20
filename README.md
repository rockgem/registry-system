![image](https://github.com/user-attachments/assets/cc2d7417-c64f-48d2-b93f-68696e3a2a4e)
![image](https://github.com/user-attachments/assets/b1c7a484-ba9d-4a59-9114-6ef3290c8643)
![image](https://github.com/user-attachments/assets/69b42aa1-bb1e-4ff5-9130-0be988f09deb)
![image](https://github.com/user-attachments/assets/98642a88-a958-40a6-b037-c77bb4c53686)



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

>[!IMPORTANT]
>Setup your the supabase database
## Create env file for supabase

.env.local file
```bash
NEXT_PUBLIC_SUPABASE_URL=<your_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<you_anon_key>
```

>[!IMPORTANT]
>Inside your supabase project create a table with the name "users" and enable Realtime option


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/login/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
