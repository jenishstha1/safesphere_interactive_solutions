# SafeSphere Interactive Solutions: promotional website (CET257 Task B2)

Static HTML, CSS, and JavaScript site. No dependencies or build step are required.

## Deploy to Vercel

From this directory, run:

```powershell
npx vercel login
npx vercel --prod
```

Select your Vercel account, create a new project named `safesphere-site`, and use `./` as the code directory. The included `vercel.json` serves the files directly from the project root.

Alternatively, push all website files to GitHub and import the repository at https://vercel.com/new. Choose **Other** as the framework, use the directory containing `index.html` as the root, leave the build command empty, and set the output directory to `.`.

After deployment, replace the email placeholders in `contact.html` and the live URL placeholders in `robots.txt` and `sitemap.xml` with your real details.

## GitHub Pages alternative

1. Search the project for `[PLACEHOLDER` and replace every one (team names, email, links, live URL).
2. Upload to a GitHub repo, then Settings > Pages > branch `main`, folder `/ (root)`.
3. Run Lighthouse and WAVE and keep screenshots as evidence.

Files: index.html, styles.css, script.js, logo.svg, favicon.svg, robots.txt, sitemap.xml, MARKETING-PLAN.md
