# CharXTZ

CharXTZ (pronounced "Char-X-T-Zee", in rhyme with "Charity") is a decentralized app built on top of the Tezos blockchain. It serves as an accumulator of funds.

---

## Overview

Initially, we had hoped to create a charity platform where users would have the ability to create campaigns of their own, but that proved to be a more time-consuming task that we had anticipated. As a result, we were compelled by time, and also by the fact that this happens to be our first dApp, to create a simple accumulator. It works as follows:

- The Smart Contract is deployed on the `ghostnet` testnet. There is an admin address associated with the contract (which is actually supposed to be set immediately after the deployment of the contract; have a look at the code for a better understanding of what we mean by this). Only the address associated with the contract can be used to initiate interactions that change the contract's storage fields.

- Any funds sent to the contract are kept track of by the contract's storage.

- When the funds reach the threshold of an admin-defined target, the target plus any excess amount accumulated is automatically transferred to the admin-defined charity account associated with the contract. While for a real application, one would want such a message as "Target completed" or the like, for the purpose of this demonstration, we have allowed the contract to merely reset its counters everytime the target is completed, so that it may be used more thoroughly by the evaluators.

## Development

CharXTZ is a React application, scaffolded using `create-react-app`. It uses the Tezos blockchain, specifically the `ghostnet` testnet chain for the backend, and the Smart Contract has been written in Smartpy.

For styling, we have opted for TailwindCSS and a Tailwind-compatible components library called Flowbite. There is also a little use of Framer Motion for some subtle micro-animations.

We have also utilized `commitizen` to enforce the format of Conventional Commits in our commit messages.

## Links and Attachments

- Head on to [this website](https://charxtz.vercel.app) to view and interact with the frontend. If the preview does not work, for whatever reason, as has been the case for us throughout the hackathon, because of build failures, consider cloning the repo and running a development server locally:

```
git clone <repo-url>
npm install
npm run dev
```

- The Smart Contract address is `KT1Gz2Fz5Y8U3WQ2kM4y9giNEveYVx34rt2T`, and can be interacted with [here](https://better-call.dev/ghostnet/KT1Gz2Fz5Y8U3WQ2kM4y9giNEveYVx34rt2T).
- The presentation can be downloaded by clicking on [this link](https://google.co.in).

<!-- Some images will go here -->

## License

MIT.
