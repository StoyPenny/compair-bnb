# Airbnb Comparison App

A web application that helps users compare Airbnb listings based on what they value most. Easily add and remove properties from the comparison list, modify their rankings, adjust the weights of the rankings, and compare them based on your rankings and their scores.

## Screenshots
![localhost_5173_ (7)](https://github.com/user-attachments/assets/9a1d3647-c40f-46a2-8d0a-d8065175b66b)


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

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/StoyPenny/compair-bnb.git
```

2. Navigate to the project directory:
```bash
cd compair-bnb
```

3. Install dependencies:
```bash
npm install
```

4. Start the frontend development server:
```bash
npm run dev
```

5. Open your browser and navigate to http://localhost:3000
The app will be available at http://localhost:3000 (or whatever port you have configured in your .env file).

## Docker

1. Build the Docker image. The preview server is now fixed to port 25450 by default:
```bash
docker build -t compair-bnb .
```

2. Run the container, ensuring the host port matches 25450:
```bash
docker run --rm -p 25450:25450 compair-bnb
```

3. Visit http://localhost:25450 to use the production build served via `npm run preview`.

### Docker Compose

- Build and run using `docker compose` (it honors `PREVIEW_PORT`, defaulting to 4173):
```bash
docker compose up --build
```

- Override the port by setting `PREVIEW_PORT` before running Compose:
```bash
PREVIEW_PORT=25450 docker compose up --build
```


## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
