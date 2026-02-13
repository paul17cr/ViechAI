# GitHub Upload (Copy/Paste, ohne Terminal)

**Du kopierst/ziehst nur den Inhalt dieses Ordners (`github_upload/`) ins GitHub Web-UI.**

## Schritte
1) Auf GitHub ein neues Repository erstellen (leer, ohne README).
2) Repo öffnen → **Add file → Upload files**.
3) In Finder/VS Code diesen Ordner öffnen und **alles darin** hochladen (Drag&Drop) → **Commit changes**.
4) Repo → **Settings → Pages → Source: GitHub Actions**.
5) Tab **Actions** → warten bis „Deploy to GitHub Pages“ grün ist.

## URL
- Project-Page: `https://<username>.github.io/<repo>/`
- User-Page (Repo heißt exakt `<username>.github.io`): `https://<username>.github.io/`

## Wichtig
- `node_modules/` wird absichtlich NICHT hochgeladen (zu groß, gehört nicht ins Repo).
- `dist/` wird über GitHub Actions gebaut und deployed.
