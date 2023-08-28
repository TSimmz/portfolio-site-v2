# Portfolio for Tyler Simoni

This project is meant to showcase my skills as a developer, share a bit about myself, display some of the work I have done, as well as to act as a playground for trying out and understanding new technologies as they come to market. It was bootstrapped with `create-t3-app` which uses the [T3 Stack](https://create.t3.gg/) and is written entirely in TypeScript.

## Technologies Used
| Name | Description |
|:------|:------|
| [NextJs](https://nextjs.org)| A React framework for building full-stack web applications |
| [Prisma](https://prisma.io) | placeholder |
| [Tailwind CSS](https://tailwindcss.com) | placeholder |
| [tRPC](https://trpc.io) |  placeholder |
| [EmailJS](https://www.emailjs.com/)| placeholder |
| [Framer Motion](https://www.framer.com/motion/)| placeholder |
| [React Hook Form](https://react-hook-form.com/)| placeholder |
| [Zod](https://zod.dev/)| placeholder |
| [React Hotkeys Hook](https://github.com/JohannesKlauss/react-hotkeys-hook)| placeholder |
| [OctoKit](https://github.com/octokit)| placeholder |
| [Three JS](https://threejs.org/)| placeholder |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)| placeholder |
| [Pop Motion IO](https://popmotion.io/)| placeholder |
| [Sanity IO](https://www.sanity.io/)| placeholder |

## Features

- Server side rendered components created using out of the box NextJS 13 features
  - About section and Portfolio section fetch GitHub information via OctoKit on the server before forwarding it via props to their respective client side components.
- About section displays GitHub bio and profile picture fetched from my GitHub profile data.
- Portfolio section displays noteable projects with information fetched from my GitHub repository data.
- Contact form built with React-Hook-Form, using Zod for validation, and EmailJS to send messages from users.
- Notification system built to provide various status notifications to the user.
  - Note: Currently the only active notifications are created via filling out the Contact form.
- Navigation Link underline built manually, inspired by [Kevin Powell](https://www.youtube.com/@KevinPowell)'s wonderfull CSS videos.
- Entry, resting, and exit animations created using Framer Motion.
- Light/Dark/System color theming using TailwindCSS with custom theme switcher provider, hook, and UI component.
- Themed resume download available depending on currently active theme.
- Ability to show/hide the navbar via a button click or a hotkey press (alt+h).
- Ability to open the resume via a hotkey press (alt+r)
- Smooth scrolling down the page via navigation links in navbar or through various call-to-action (CTA) buttons in the page

## Future Plans For This Project

- Add a dev blog

  - Utitize Sanity IO to build my own CMS system.
  - It will act less like a blog and more like a notebook with a view into my mind as a developer as I learn cool, new, fun technologies.

- To act as a project catalog of sorts; to be a place I can host my past, present, and future personal projects.

## Goals As A Developer

- I absolutely LOVE to learn new things, whether it be new technologies, new recipes, or new ways to make art. I want to learn anything and everything about anything that interests me. Once I start diving into a new fixation, I will not stop until I understand it all the way down.
- I strive to be the go-to knowledge source on a team and if I don't know something, it will not take me long to learn, understand, and apply it.
- I make it my mission to make future developers lives on a project as easy as I can. To me, this means:
  - Squeaky clean code
  - Verbose variable and function naming
  - Commenting anything and everything that isn't immediately clear
  - Using common coding standard practices to the best of my abilities
  - Building file/directory architectures that are clear and make sense

## A Bit About Me

I'v been a developer working with ReactJS for about 6 years now and I love it. Outside of being a developer some things I love to do are working on my digital art, trying new breweries and eateries in and around my area (Knoxville, TN), hiking the Great Smoky Mountains and all the surrounding mountains/trails, and just relaxing with my wife, dog, and two rabbits.
