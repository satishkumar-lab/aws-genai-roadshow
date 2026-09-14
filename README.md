# AWS GenAI Roadshow

Static landing page for the AWS GenAI Roadshow event, hosted by AWS and CloudKeeper.

## Structure

```
index.html      — Main page
css/styles.css  — Styles
js/main.js      — Navigation, form validation, HubSpot submission
assets/         — Images and SVGs
fonts/          — Metropolis web fonts
```

## Local preview

Open `index.html` in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

## Deployment

Deploy the root folder to any static host (Vercel, Netlify, S3, etc.). No build step required.

## Form

Registration submits directly to HubSpot Forms API from the browser.
