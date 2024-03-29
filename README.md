1. **To install the express backend for this app (for api calls) - 'npm install'**
2. **To install the frontend for this app - 'cd client' - 'npm install'**
3. **Then to run the app - 'yarn dev'**
4. **Note: An api key from https://newsapi.org/ is required to run this app locally**

## New York Times News App

- New York Times App is a news app which enables you to read the latest news articles from websites such as BBC News, Hacker News, and The Verge and you also have the ability to save the news articles for a later date (up to a week).

- This is a Single Page Application built with React.js, styled-components, and react-router that queries the news API endpoint, to fetch the latest news from different online publications.

- It features dynamic routing using react-router and usage of query strings that allow users to share the currently viewed page with their friends.

- The application makes use of the local storage API to save the latest news for a week, in case the user doesn’t have time to read or wants to read the news article at a later time.

- It features styling with styled-components (CSS in JS solution), for preventing CSS bleeding and allowing the styles to be more modular and portable.

- The app sends a request to an Express server which then calls the api, the api then responds to the server, the server then sends the result back to the app. This step was introduced as the api provider would no longer accept requests directly from apps it required a server to make the call, I investigated and found that Express would work for this purpose.

- It’s been developed using git along with Kanban methodology, to keep track of the features that need to be built and preventing development errors.

Notion Workflow:
https://www.notion.so/fe7c209e4ea84c29849075830f17d6de?v=2dd2d82dbb7b4864a56498424811f689
