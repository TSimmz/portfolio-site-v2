# Portfolio for Tyler Simoni

This project is meant to showcase my skills as a developer, share a bit about myself, display some of the work I have done, as well as to act as a playground for trying out and understanding new technologies as they come to market. It was bootstrapped with `create-t3-app` which uses the [T3 Stack](https://create.t3.gg/) and is written entirely in TypeScript.

## View the live website
[www.tylersimoni.com/](http://www.tylersimoni.com/)

## Technologies Used
| Name | Description |
|:------|:------|
| [NextJs](https://nextjs.org)| A React framework for building full-stack web applications. |
| [Prisma](https://prisma.io) | A next generation Node.js and TypeScript ORM. |
| [Tailwind CSS](https://tailwindcss.com) | A utility-first CSS framework that can be composed to build any design, directly in your markup. |
| [tRPC](https://trpc.io) |  A tool to build & consume fully typesafe APIs without schemas or code generation. |
| [EmailJS](https://www.emailjs.com/)| A tool to send email directly from code, no server code needed. |
| [Framer Motion](https://www.framer.com/motion/)| A production-ready motion and animation library for React. |
| [React Hook Form](https://react-hook-form.com/)| A tool to build performant, flexible and extensible forms with easy-to-use validation. |
| [Zod](https://zod.dev/)| A TypeScript-first schema declaration and validation library. |
| [React Hotkeys Hook](https://github.com/JohannesKlauss/react-hotkeys-hook)| A React hook for using keyboard shortcuts in components in a declarative way. |
| [OctoKitJs](https://github.com/octokit/octokit.js)| An all-batteries-included GitHub SDK for Browsers, Node.js, and Deno |
| [Three JS](https://threejs.org/)| An easy to use, lightweight, cross-browser, general purpose 3D library. |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)| A React renderer for three.js |
| [Pop Motion IO](https://popmotion.io/)| A animator’s JavaScript toolbox.|
| [Sanity IO](https://www.sanity.io/)| A modern CMS that transforms content into a competitive advantage. |

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
