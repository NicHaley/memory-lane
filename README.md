# Memory Lane

## Solution Overview

There are two main components to my solution I wanted to highlight:

1. Stack / Architecture: Given that the starting boilerplate was pretty light, I decided to implement a few extra libraries, including Next (with server actions), Turborepo, and Prisma. These allowed me to build out my solution faster, keep my code organized, and are likely what I would have reached for in a real-world scenario.

2. Features / Business Logic: The app is a relatively straighforward CRUD app. My solution is 'half-baked', meaning I chose to not implement many features in the interest of time. The features I chose implement were to demonstrate core functionality like routing, theming, validation / authorization, forms, image uploading, etc.

## What Next

This solution provides a strong foundation which could be used to build out other features. For instance, with more time I could add features like:

- Memory `/users/[id]/memories/[id]` route
- Home page for 'discovering' different users
- Proper auth, perhaps with AuthJS or Lucia
- Delete and update actions
- Profile updating
- Fancier UI
- Share button
- etc
