@echo off
echo Setting up environment files...

echo Creating backend .env file...
echo PORT=5000 > backend\.env
echo DATABASE_URL="postgresql://postgres:Kshitij@1234@localhost:5432/glb_connect?schema=public" >> backend\.env
echo NODE_ENV=development >> backend\.env

echo Creating frontend .env file...
echo VITE_API_URL=http://localhost:5000/api > frontend\.env

echo Environment files created successfully!
echo.
echo Please customize the database credentials in backend\.env if needed.
echo.
pause 