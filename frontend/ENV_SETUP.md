# Environment Setup for GLB.Connect Frontend

The frontend uses environment variables to configure API endpoints and other settings. Here's how to set it up:

## Instructions:

1. Create a `.env` file in the frontend directory with the following content:

```
VITE_API_URL=http://localhost:5000/api
```

This will enable the frontend to connect to the backend API running on port 5000.

## Additional Environment Variables (Optional):

For production deployment, you might want to add these variables:

```
VITE_API_URL=https://your-production-api.com/api
VITE_APP_ENV=production
```

## Starting the Frontend Development Server:

After setting up the environment variables, you can start the frontend development server with:

```
npm run dev
```

This will start the Vite development server, usually on port 3000. You can access the application by opening `http://localhost:3000` in your browser. 