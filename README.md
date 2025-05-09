# Airbnb Comparison App

A web application that helps users compare Airbnb listings based on what  they value most. Easily add and remove properties from the comparison list, modify their rankings, adjust the weights of the rankings, and compare them based on your rankings and their scores. 

## Features

- Compare multiple Airbnb listings at once
- Create and manage your own ranking categories
- Control the weights of each ranking category
- Favorite listings management

## Tech Stack

- Frontend: React.js
- Backend: Node.js/Express
- Styling: Tailwind CSS
<!-- - Database: MongoDB -->
<!-- - Authentication: JWT -->


## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- API keys for Mapbox/Google Maps

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/airbnb-comparison.git
```

2. Navigate to the project directory:
```bash
cd airbnb-comparison
```

3. Install dependencies:
```bash
npm install
```
4. Create a .env file in the root directory and add the following environment variables:
Create a .env file in the root directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MAP_API_KEY=your_map_api_key
PORT=3000
```


## Local Development
1. Start the MongoDB service:
```bash
mongod
```

2. Start the backend server:
```bash
npm run server
```

3. Start the frontend development server:
```bash
npm run client
```

4. Open your browser and navigate to http://localhost:3000
The app will be available at http://localhost:3000


## Production Deployment
1. Build the frontend:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```


## For deployment platforms like Heroku:

1. Create a Heroku app:
```bash
heroku create
```

2. 
```bash
git push heroku main
```

3. Set environment variables:
```env
MONGODB_URI: MongoDB connection string
JWT_SECRET: Secret key for JWT authentication
MAP_API_KEY: API key for map service
NODE_ENV: Production/Development environment
PORT: Server port number
```

## API Documentation
API endpoints are available at `/api/v1`:

- `GET /properties`: Fetch all properties
- `POST /properties/compare`: Compare selected properties
- `GET /users/favorites`: Get user's favorite listings
- `POST /auth/login`: User authentication


## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing
Run the test suite:
```bash
npm run test
```

## License

All rights reserved. This project is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.


## Contact
Project Link: https://github.com/yourusername/airbnb-comparison

## Support
For support, email support@airbnbcomparison.com or join our Slack channel.
