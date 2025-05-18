# Environment Setup for GLB.Connect Backend

To properly run the backend server, you need to create a `.env` file in the backend directory with the following content:

```
PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/glb_connect?schema=public"
NODE_ENV=development
```

## Instructions:

1. Create a new file named `.env` in the backend directory
2. Copy the above content into the file
3. Replace the database credentials as needed:
   - Change `postgres` to your PostgreSQL username
   - Change `password` to your PostgreSQL password
   - If your PostgreSQL runs on a different port than 5432, update that as well

## Database Setup:

1. Make sure PostgreSQL is installed and running
2. Create a new database named `glb_connect`:
   ```
   CREATE DATABASE glb_connect;
   ```
3. Run Prisma migrations to set up the database schema:
   ```
   npx prisma migrate dev --name init
   ```

After setting up the environment variables and database, you can start the server with:
```
npm run dev
``` 