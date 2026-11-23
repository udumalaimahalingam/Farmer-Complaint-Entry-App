# Farmer Complaint Management (Offline PWA)

A browser app for entering farmer complaints. It works online and offline,
can be installed on a phone or computer, and stores complaints on the device.

## Files

```
index.html            Main app
sw.js                 Service worker (offline support)
manifest.webmanifest  Install settings
icons/                App icons
vendor/xlsx.full.min.js   Excel library (needed for Excel export, works offline)
README.md
```

## Put it on GitHub Pages

1. Go to https://github.com and sign in (create a free account if needed).
2. Click **+ > New repository**. Name it, e.g. `farmer-complaint-app`. Set it to **Public**. Click **Create repository**.
3. Click **uploading an existing file**. Upload all files and folders above (keep the `icons` and `vendor` folders).
4. Get the Excel library: open https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js, save it as `xlsx.full.min.js`, and upload it into a folder named `vendor` in the repo. (Create the folder by typing `vendor/xlsx.full.min.js` as the file name when uploading.)
5. Click **Commit changes**.
6. Go to **Settings > Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main** and folder to **/ (root)**. Click **Save**.
7. After 1-2 minutes your app is live at:
   `https://YOUR-USERNAME.github.io/farmer-complaint-app/`

## Install on phone or computer

- **Android (Chrome):** open the link, tap the menu (⋮) > **Install app** (or use the Install App button).
- **iPhone (Safari):** open the link, tap Share > **Add to Home Screen**.
- **Computer (Chrome/Edge):** open the link, click the install icon in the address bar.

Open the app once while online so it can save itself for offline use.
After that it opens and works without internet.

## Offline notes

- Complaints are saved on the device (browser storage). They do not go to a server.
- Use **Current Excel** or **Export All History** to get Excel files.
- WhatsApp Share needs internet. When offline, the app tells you to try later.
- Keep your history safe: export to Excel regularly. Clearing browser data deletes saved complaints.

## Updating the app later

Edit files on GitHub, then change `CACHE_NAME` in `sw.js` (for example from
`complaint-app-v2` to `complaint-app-v3`). This makes phones pick up the new version.
