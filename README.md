# Stephen Zhang — Personal Landing Page

A dependency-free static portfolio translated from the desktop and mobile Figma wireframes. It is ready for GitHub Pages and can be edited in any code editor.

## Preview locally

You can open `index.html` directly, or run a small local server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Personalize before publishing

Search `index.html` for `placeholder` and update:

- GitHub and LinkedIn profile URLs
- `hello@your-domain.com`
- résumé content or the résumé file/link
- project, writing, and experience details

The project and blog cards already lead to editable static pages in `projects/index.html` and `blog/index.html`.

## Deploy to GitHub Pages

1. Create an empty repository on GitHub.
2. In this project folder, run:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

3. In the GitHub repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** as the source.
5. The included workflow will deploy on every push to `main`. The first deployment URL appears in the repository’s **Actions** and **Environments** views.

## Project structure

```text
.
├── .github/workflows/deploy-pages.yml
├── blog/index.html
├── projects/index.html
├── index.html
├── resume.html
├── script.js
└── styles.css
```

No build step, package manager, or framework is required.
