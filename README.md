# Memory Lane

## Running the Project

1. `pnpm i`
2. `pnpm dev`

## Solution Overview

There are two main components to my solution I wanted to highlight:

1. Stack / Architecture: Given that the starting boilerplate was pretty light, I
   decided to implement a few extra libraries, including Next (with server
   actions), Turborepo, and Prisma. These allowed me to build out my solution
   faster, keep my code organized, and are likely what I would have reached for
   in a real-world scenario.

2. Features / Business Logic: The app is a relatively straighforward CRUD app.
   My solution is 'half-baked', meaning I chose to not implement many features
   in the interest of time. The features I chose implement were to demonstrate
   core functionality like routing, validation / authorization, forms, image
   uploading, styling, etc.

## What Next

This solution provides a strong foundation which could be used to build out
other features. For instance, with more time I could add features like:

- Memory `/users/[id]/memories/[id]` route
- Home page for 'discovering' different users
- Proper auth, perhaps with AuthJS or Lucia
- Delete and update actions
- Profile updating
- Fancier UI
- Share button
- etc

## Video Walkthroughs

1. https://www.loom.com/share/9c8d28ed7e9c40a98ff5cf8e6ae485b7?sid=05fedede-1f4e-437d-888e-553b9ec81619
2. https://www.loom.com/share/0742db416fea4e42a8e29181e9387439?sid=d3a2465f-9cbc-452d-abce-7e9922eee458
