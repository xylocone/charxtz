# CharXTZ

CharXTZ (pronounced "Char-X-T-Zee", in rhyme with "Charity") is a decentralized app built on top of the Tezos blockchain. It serves as an accumulator of funds.

The webapp has been deployed to Vercel [here](https://charxtz.vercel.app).

> _Note_: Make sure you use a Ghostnet account to interact with this dApp. If you're using Temple wallet, and are on mobile, you'll first have to add an RPC in the settings with the URL `https://ghostnet.SmartPy.io` and set it as your default for your account. Unlike the Temple Wallet browser extension, Ghostnet RPC is not there out-of-the-box in the mobile app.

![Desktop view](https://github.com/xylocone/charxtz/blob/develop/images/desktop.png?raw=true)

## Overview

Initially, we had hoped to create a charity platform where users would have the ability to create campaigns of their own, but that proved to be a more time-consuming task that we had anticipated. As a result, we were compelled by time, and also by the fact that this happens to be our first dApp, to create a simple accumulator. It works as follows:

- The Smart Contract is deployed on the `ghostnet` testnet. There is an admin address associated with the contract (which is actually supposed to be set immediately after the deployment of the contract; have a look at the code for a better understanding of what we mean by this). Only the address associated with the contract can be used to initiate interactions that change the contract's storage fields.

- Any funds sent to the contract are kept track of by the contract's storage.

- When the funds reach the threshold of an admin-defined target, the target plus any excess amount accumulated is automatically transferred to the admin-defined charity account associated with the contract. While for a real application, one would want such a message as "Target completed" or the like, for the purpose of this demonstration, we have allowed the contract to merely reset its counters everytime the target is completed, so that it may be used more thoroughly by the evaluators.

## Development and Tech Stack

CharXTZ is a React application, scaffolded using `create-react-app`. It uses the Tezos blockchain, specifically the `ghostnet` testnet chain for the backend, and the Smart Contract has been written in SmartPy.

For styling, we have opted for TailwindCSS and a Tailwind-compatible components library called Flowbite. There is also a little use of Framer Motion for some subtle micro-animations.

We have also utilized `commitizen` to enforce the format of Conventional Commits in our commit messages.

## Challenges Faced

- <strike>Currently, the frontend works fine only locally. The build fails, because TaquitoJS seems to be using CommonJS `require` module system, which `vite` does not recognise. I have tried polyfilling `require`, but not with any success. So, for the time being, consider running the frontend locally by cloning the repo, installing dependencies with `npm install` and starting a local server using `npm run dev`. Hopefully, I'll be able to resolve this issue by polyfilling `require` some other way or migrating the whole project to `create-react-app` instead of `vite` (`vite` uses `rollup` for bundling, while `create-react-app` uses `webpack`).</strike> Porting to `create-react-app`, which uses `webpack` under the hood, and using a custom `webpack` config through `react-app-rewired` resolved the issue.

- SmartPy development was a little overwhelming because this happened to be our first web3 project. Also, since Tezos is currently in a state of flux, we often encountered conflicting documentation. It was a little difficult to discern what is currently the standard and what is not.

- We tried to develop the Smart Contract locally, and have it deployed through the CLI, but that proved to be very difficult to set up. We had to make do with the web IDE.

## Links and Attachments

- Head on to [this website](https://charxtz.vercel.app) to view and interact with the frontend. You may also consider cloning the repo and running a development server locally:

```
git clone <repo-url>
npm install
npm run start
```

- The Smart Contract address is `KT1W1xZqZfaMRpR1cd17yVzsKhLgHwepYL9q`, and can be interacted with [here](https://better-call.dev/ghostnet/KT1W1xZqZfaMRpR1cd17yVzsKhLgHwepYL9q).
- The presentation can be downloaded by clicking on [this link](https://github.com/xylocone/charxtz/raw/develop/presentation.pptx).

![Desktop view](https://github.com/xylocone/charxtz/blob/develop/images/desktop.png?raw=true)
![Mobile view](https://github.com/xylocone/charxtz/blob/develop/images/mobile.JPG?raw=true)

## License

MIT.
