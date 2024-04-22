# Darrijha Bike 

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Technologies Used

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## How do I deploy this?

Make sure you have the latest versions of Node.js and npm installed. Check this [link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for information.

Clone this repository with: 
```git clone https://github.com/AbdullahAlmanei/bike_rental.git```.

Navigate to project directory and run ```npm install```.
Run ```npm install -g dotenv-cli``` to install the dotenv module, which is required for running some of the custom scripts.
Make sure you have set up your environment file named ```.env.local```.
Run ```npm run local:push``` to initlize the prisma DB and generate a schema for queries and mutations.

That's it! You can run ```npm run dev``` to run the app, and you can use ```npm run studio``` to start the interactive prisma database tool. (You can use this to set your account as an Admin.)