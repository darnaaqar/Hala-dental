# Hala Dent 🦷

A visually stunning, responsive React dental wellness application meticulously styled with tailwindcss. This application includes an interactive smartphone emulator layout, clinic GPS locator, doctor directories, diagnostic/treatment categorization systems, and dummy live doctor-patient consultations logic.

## ✨ Features

- **Standard Interactive Smartphone Emulator Workspace**: Test complete desktop or adaptive mobile clinic configurations.
- **Dynamic Viewport Scale Control**: Custom viewport scale controls (75% to 100%) to fit any display context cleanly.
- **Nearest Clinics Locator Map**: Live GPS route coordinates, locator distances, and travel estimates.
- **Appointment Planner**: Interactive booking sheets, clinic slots selector, and direct status trackers.
- **Diagnostics Specialties**: Browse clinical treatment divisions: Orthodontics, Endodontics, Cosmetic Whitening, etc.
- **Emergency Hotline Callback**: Quick-dial panel for dental trauma routing.

---

## 🛠️ Getting Started

### Local Setup & Prerequisites

Make sure you have Node.js (version 20+) installed on your local computer.

1. **Clone or Download the Repository**:
   Extract all contents cleanly to your local environment.

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Local Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser to the local URL (usually `http://localhost:3000`) to view the application with hot module reloading.

4. **Production Build**:
   To bundle the static client SPA for production hosting (Vercel, Netlify, Cloud Run, etc.):
   ```bash
   npm run build
   ```

5. **Linting and Type Checks**:
   Validate TypeScript compilation strictly before deploying:
   ```bash
   npm run lint
   ```

---

## 🚀 Push & Build to GitHub

To store this app in your GitHub account and configure automated builds:

### Step 1: Export directly via Google AI Studio (Recommended)
1. In the top-right corner of Google AI Studio, select the **Share** or **Settings** menu.
2. Select **Export to GitHub** or **Export ZIP**.
3. If exporting via GitHub integration, link your personal repository to push branches instantly!

### Step 2: Custom Local Command-line Push
If you prefer pushing using your local terminal:
```bash
# Initialize a new local Git repository
git init

# Add all files (excluding logs, node_modules, and dist which are pre-ignored)
git add .

# Create the initial commit
git commit -m "feat: initial commit of Hala Dent application"

# Rename to default main branch
git branch -M main

# Link to your remote GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push upstream
git push -u origin main
```

### Step 3: Download your Android .apk from GitHub Actions
We have fully integrated Ionic Capacitor for native Android builds, and configured your continuous integration pipeline to auto-compile your APK!
- Check out the **`.github/workflows/ci.yml`** file in this repo.
- Whenever you push updates to `main` or `master`, GitHub Actions will spin up a fresh runner, install dependencies, run type checks, compile the web assets, sync with Capacitor, and automatically build your Android `.apk` file!
- **How to download your APK file from GitHub**:
  1. Push your code changes/commits to your remote GitHub repository (`git push`).
  2. Open your repository in your web browser.
  3. Click on the **"Actions"** tab at the very top of your GitHub repository menu.
  4. Click on the most recent run (e.g., matching your latest commit message).
  5. Scroll down to the bottom of that run's summary page to find the **"Artifacts"** section.
  6. You will see a named package: **`Hala-Dent-APK`**. Click it to download the ZIP file containing your installable Android `.apk` file!
  7. Extract the ZIP, transfer the `.apk` to your phone, and install it!
