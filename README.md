# Greenwick Parliament Website

A complete static website for the Parliament of the Commonwealth of Greenwick, built from the supplied 4 October 2026 website information archive and image assets.

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload **all files and folders in this repository** to the repository root.
3. Ensure the default branch is named `main`.
4. Open **Settings → Pages** and set **Source** to **GitHub Actions**.
5. Push a commit (or run the `Deploy Greenwick Parliament to GitHub Pages` workflow manually).
6. GitHub will provide the public Pages URL after deployment.

## Optional custom domain

Create a file named `CNAME` in the repository root containing only your domain, then point the domain's DNS records to GitHub Pages. Update `robots.txt` and `sitemap.xml` to replace the placeholder GitHub Pages URL.

## Site structure

- 42 source-derived information pages plus a custom 404 page
- Responsive government-style navigation and mobile menu
- Client-side site search (`Ctrl/Cmd + K` also opens search)
- Parliament 360-style interactive image explorer
- GitHub Actions deployment workflow
- No framework, build step, server, API, database, or paid hosting dependency

## Source fidelity note

The supplied archive contains internally inconsistent office-holder and election references on different pages (for example Sean Mannix, Thomas Delvecchio, and Michael Trent appear in different contexts). This repository preserves page-specific archive wording rather than silently rewriting the source. The dedicated Prime Minister page and home page use Sean Mannix because the archive explicitly identifies him as the sixth Prime Minister following Thomas Delvecchio's 2026 resignation.

The original `Prime Ministers` and `Latest` pages contained little or no substantive body text in the capture. Those two pages are reconstructed from other information in the same archive and link back into the site's primary records.

## Assets

All supplied Greenwick images are stored in `assets/img/`.

## November 2026 Government Portal Upgrade

The official site now includes a Government & Cabinet directory, Digital Services hub, National Statistics dashboard, revised latest updates, restored Commonwealth overview, economic summary and responsive styling with an optional dark theme. The existing information archive remains available.

### National population tracker

The national counter starts at **14,167** on **6 November 2026 at 12:32 pm Australia/Brisbane (UTC+10)** and increases by **3 every 2 hours**, calculated using a single absolute timestamp in `assets/site.js`. It is rendered on every page's top bar and on the homepage and statistics dashboard; it is consistent between browsers and survives reloads without a database.

To adjust the national population record in future, edit `POPULATION_START` and `POPULATION_EPOCH` together in `assets/site.js`. The counter requires JavaScript and accurate device time.

### Connected project links

The Digital Services hub links to GitHub repositories for Greenwick-associated public projects, which remain managed independently from this website. Production service availability and authentication are not asserted by those links.

## Automatic publication

The `.github/workflows/deploy-pages.yml` workflow deploys the static website to GitHub Pages on every push to `main`, provided the repository's GitHub Pages source is configured for **GitHub Actions**. If Pages is set to **Deploy from a branch**, GitHub's branch publisher can also serve the same root files; verify deployment under repository Settings → Pages.
