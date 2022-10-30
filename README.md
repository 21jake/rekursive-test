# Rekursive: TEST (FULLSTACK/ FRONTEND) – NODEJS + REACTJS 

## I've decided to take the Fullstack approach. The project consists two components:

1. Frontend (`client` folder). The techstack includes:
    - Typescript, React
    - Redux
    - Bootstrap
2. Backend (`server` folder). The techstack includes:
    - TypeScript, NodeJS/ExpressJS

## Considerations:
1. Since I've taken the fullstack approach, the checkout calculation logic is implemented on the backend. The frontend should send a request upon checkout to get the reduced price if any special rule gets applied.
2. The frontend is fairly simple with the add-to-cart functionality. There's no Cypress testing. Since all the core logic is on the backend it's more reasonable to write unit tests on the backend.
3. To solve the stated problem, I created a key-values mapping between `Customer`->`Pricing rules[]`. I believe this is the most suitable approach where flexibility/readability is required (rules can be simply replaced/edited, and many rules could be applied for a customer).
4. The techstack on the frontend might seem overkill for a simple checkout page. I frequently bootstrap new projects from my boilerplates as they save development time considerably.

## Running the project
1. Start the server
    - Go to the `root/server` directory
    - Run `yarn install`, `yarn build` and `yarn start` consecutively
    - The server should be at the port `5005` by default. Change that by setting another port in the `.env`
    - Keep the terminal running

2. Start the client
    - Go to the `root/client` directory
    - Run `yarn install`, and `yarn start` after
    - (If you specified another backend port, go to `client/src/config/constants` to update the port value)

3. Run test cases:
    - Turn off the currently running backend process
    - Go to the `root/server` directory
    - run `yarn run test`

