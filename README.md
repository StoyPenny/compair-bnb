# Airbnb Comparison App

A web application that helps users compare Airbnb listings based on what they value most. Easily add and remove properties from the comparison list, modify their rankings, adjust the weights of the rankings, and compare them based on your rankings and their scores.

## Features

- Compare multiple Airbnb listings at once
- Create and manage your own ranking categories
- Control the weights of each ranking category
- Favorite listings management

## Tech Stack

- Frontend: React.js
- Styling: Material UI


## Prerequisites

- Node.js (v14 or higher)
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
MAP_API_KEY=your_map_api_key
PORT=3000
```


## Local Development
3. Start the frontend development server:
```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:3000
The app will be available at http://localhost:3000 (or whatever port you have configured in your .env file).


## Production Deployment
1. Build the frontend:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

3. Set environment variables:
```env
MAP_API_KEY: API key for map service
PORT: Server port number
```

<!-- ## API Documentation
API endpoints are available at `/api/v1`:

- `GET /properties`: Fetch all properties
- `POST /properties/compare`: Compare selected properties
- `GET /users/favorites`: Get user's favorite listings
- `POST /auth/login`: User authentication -->


## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

