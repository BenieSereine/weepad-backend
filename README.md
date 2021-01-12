# weepad-backend
Access lovely books

To access the repo
- clone the repo using `git clone https://github.com/BenieSereine/weepad-backend.git`
- run `npm install`
- run `npm run devStart`
- Open postman
- use POST `http://localhost:3000/api/auth/signup` to sign up to the application
- use POST `http://localhost:3000/api/auth/signin` to sign in to the application
- use POST `http://localhost:3000/api/auth/forget-password` to get the link that helps you to reset the password
- use PATCH `http://localhost:3000/api/auth/reset-password` to reset the password
- use PATCH `http://localhost:3000/api/user/profile` to update the profile
- use GET `http://localhost:3000/api/user/profile` to get a specific user
- use POST `http://localhost:3000/api/auth/logout` to log out from the application
