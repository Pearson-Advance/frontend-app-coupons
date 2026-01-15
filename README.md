# Frontend App Coupons

## Overview

Frontend App Coupons is a modern frontend application designed to enhance the Coupons experience within the Open edX ecosystem. Its primary goal is to replace the existing, outdated Coupons page with a cleaner, more intuitive, and user-friendly interface. The application focuses on improving usability and providing a more efficient workflow for applying coupons, while remaining fully compatible with Open edX services.

---

## Getting Started

### Prerequisites

- Node Version Manager (nvm): Ensure you have nvm installed to manage Node.js versions:
  https://github.com/nvm-sh/nvm

> [!NOTE]
> Make sure Open edX services are running before launching this project.

---

### Setup and Startup

Follow these steps to get your local development environment running:

1. Clone the repository:
```bash
git clone git@github.com:Pearson-Advance/frontend-app-coupons.git
````

2. Install and use the correct Node.js version:

This project includes an `.nvmrc` file to ensure compatibility.

```bash
nvm install
nvm use
```

3. Install dependencies:

```bash
npm install
```

4. Configure environment:

The default port is 2006. If you need to change it, update the `PORT` variable in your `.env` file(s).

5. Start the development server:

```bash
npm run start
```

The application will be available at:
[http://localhost:2006](http://localhost:2006)

---

## Quality Control

To maintain code quality, run the following commands before submitting any changes:

* Run unit tests (Jest):

```bash
npm run test
```

* Run linting:

```bash
npm run lint
```
