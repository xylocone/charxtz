# CharXTZ

CharXTZ (pronounced "Char-X-T-Zee", in rhyme with "Charity") is a decentralized app for aggregating funds in a Smart Contract with an admin-defined target. When the aggregation reaches a defined threshold, it is transferred to a predefined Tezos address, representing a charity.

> _Note_: A notable lack of functionality in this dApp is that once the target is met, the counter jusst resets. We can create a boolean flag to represent whether a contract has finished its purpose, but then the dApp would not be left with any interactibilty after exhausting the limit of the SmartContract. For that reason, we chose it to keep it this way only.

## Development

CharXTZ is powered by a simple Smart Contract on the backend, hosted on the Tezos blockchain. Since this is still pretty much a prototype, it is not hosted on the `mainnet` but is hosted on the `Ghostnet testnet` instead.

The frontend is very simple, consisting of only three routes. It has been written in Next.js with Typescript. The styling has been done with Tailwind and a Tailwind components library called Flowbite. For some simple animation, Framer motion has been used.

Vercel has been used for hosting the frontend. Vercel provides an intuitive and barebones CI/CD mechanism, so no dedicated CI/CD pipeline has been employed.

---

# Older Version

We had started out with a different vision about the dApp, but things proved to be a little difficult and what we endeed up making isn't quite what we had hoped to. This is what we had in mind, for what it's worth:

--

## CharXTZ

CharXTZ (pronounced "Char-X-T-Zee", in rhyme with "Charity") is a decentralized app for initiating campaigns, donating funds to those compaigns and voting on where the accumulated funds should go.

---

### Overview

A **Campaign** is an entity that can accumulate a pool of XTZs. Associated with each campaign are soem Tezos addresses corresponding to different charities. Once a user has donated some amount to a campaign, they are allowed to vote on which of the associated charities the aggregated fund should go to. Votes are given weight in proportion to the amount donated, i.e. someone who has donated a larger sum to a campaign will have a greater say in what particular charity associated with the campaign should the funds go to.

### Development

CharXTZ is powered by a simple Smart Contract on the backend, hosted on the Tezos blockchain. Since this is still pretty much a prototype, it is not hosted on the `mainnet` but is hosted on the `Ghostnet testnet` instead.

The frontend is very simple, consisting of only three routes. It has been written in Next.js with Typescript. The styling has been done with Tailwind and a Tailwind components library called Flowbite. For some simple animation, Framer motion has been used.

Vercel has been used for hosting the frontend. Vercel provides an intuitive and barebones CI/CD mechanism, so no dedicated CI/CD pipeline has been employed.

### Usage

Head on to [this website](https://charxtz.vercel.app) to view and interact with the frontend.

Then, you can:

- Browse campaigns
- Create campaigns
- Donate to existing campaigns
- Vote on campaigns you have donated to

---
