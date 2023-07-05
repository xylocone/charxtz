# CharXTZ

CharXTZ (pronounced "Char-X-T-Zee", in rhyme with "Charity") is a decentralized app built on top of the Tezos blockchain. It serves as an accumulator of funds.

> _Note:_ Currently, the frontend works fine only locally. The build fails, because TaquitoJS seems to be using CommonJS `require` modular system, which `vite` does not recognise. I have tried polyfilling `require`, but not with any success. So, for the time being, consider running the frontend locally by cloning the repo, installing dependencies with `npm install` and starting a local server using `npm run dev`. Hopefully, I'll be able to resolve this issue by polyfilling `require` some other way or migrating the whole project to `create-react-app` instead of `vite` (`vite` uses `rollup` for bundling, while `create-react-app` uses `webpack`).

> Do note that although the frontend requires local server for now, that does not mean that it is not fetching data from the Smart Contract. The above note is only in the context of the frontend. Data is still fetched and stored into the Smart Contract, which can be explored using the link given a little below.

---

## Overview

Initially, we had hoped to create a charity platform where users would have the ability to create campaigns of their own, but that proved to be a more time-consuming task that we had anticipated. As a result, we were compelled by time, and also by the fact that this happens to be our first dApp, to create a simple accumulator. It works as follows:

- The Smart Contract is deployed on the `ghostnet` testnet. There is an admin address associated with the contract (which is actually supposed to be set immediately after the deployment of the contract; have a look at the code for a better understanding of what we mean by this). Only the address associated with the contract can be used to initiate interactions that change the contract's storage fields.

- Any funds sent to the contract are kept track of by the contract's storage.

- When the funds reach the threshold of an admin-defined target, the target plus any excess amount accumulated is automatically transferred to the admin-defined charity account associated with the contract. While for a real application, one would want such a message as "Target completed" or the like, for the purpose of this demonstration, we have allowed the contract to merely reset its counters everytime the target is completed, so that it may be used more thoroughly by the evaluators.

## Development

CharXTZ is a React application, scaffolded using `vite`. It uses the Tezos blockchain, specifically the `ghostnet` testnet chain for the backend, and the Smart Contract has been written in Smartpy.

For styling, we have opted for TailwindCSS and a Tailwind-compatible components library called Flowbite. There is also a little use of Framer Motion for some subtle micro-animations.

We have also utilized `commitizen` to enforce the format of Conventional Commits in our commit messages.

## Links and Attachments

- Head on to [this website](https://charxtz.vercel.app) to view and interact with the frontend. If the preview does not work, for whatever reason, as has been the case for us throughout the hackathon, because of build failures, consider cloning the repo and running a development server locally:

```
git clone <repo-url>
npm install
npm run dev
```

- The Smart Contract address is `KT1W1xZqZfaMRpR1cd17yVzsKhLgHwepYL9q`, and can be interacted with [here](https://better-call.dev/ghostnet/KT1W1xZqZfaMRpR1cd17yVzsKhLgHwepYL9q).
- The presentation can be downloaded by clicking on [this link](https://github.com/xylocone/charxtz/raw/develop/presentation.pptx).

![Desktop view](https://github.com/xylocone/charxtz/blob/develop/images/desktop.png?raw=true)
![Mobile view](https://github.com/xylocone/charxtz/blob/develop/images/mobile.JPG?raw=true)

## License

MIT.
