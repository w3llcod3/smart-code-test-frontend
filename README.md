This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deployment

The project is deployed to Railway hosting. You can access it at [smart-code-frontend-challenge](https://smart-code-test-frontend-production.up.railway.app/)

- Absences list: [link](https://smart-code-test-frontend-production.up.railway.app/absences)
- Members list: [link](https://smart-code-test-frontend-production.up.railway.app/members)

## UI
Material-UI library is used in the project as a components library. Material UI is a library of React UI components that implements Google's Material Design.

## Pages 
- The Absences list makes calls to the server in a paginated fashion and also takes care of filters provided by the user for showing results of a certain type of absence or filter results by a specific date.
The Members list also shows a loading indicator, an empty list statement in case of no results, and an error message in case of an error that happened during the loading.
- The members list shows the members of the system.