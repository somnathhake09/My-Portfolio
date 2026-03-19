# 🚀 Portfolio Setup Guide — Step by Step

## FOLDER STRUCTURE (what you downloaded)
```
portfolio/
├── frontend/               ← React app
│   ├── public/
│   │   └── index.html      ← required!
│   ├── src/
│   │   ├── index.js        ← required!
│   │   └── App.jsx         ← all 5 pages
│   └── package.json
│
├── backend/                ← Node.js API
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── About.js
│   │   ├── Skill.js
│   │   ├── Project.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── about.js
│   │   ├── skills.js
│   │   ├── projects.js
│   │   └── contact.js
│   ├── server.js
│   ├── seed.js
│   ├── .env                ← YOU EDIT THIS
│   └── package.json
│
└── SETUP_GUIDE.md          ← this file
```

---

## ✅ STEP 1 — Install Node.js

Download: https://nodejs.org  (choose LTS)

Check it works — open Terminal/CMD and type:
```
node --version
npm --version
```
Both should show a version number.

---

## ✅ STEP 2 — Create MongoDB Atlas Account (FREE)

1. Go to: https://www.mongodb.com/atlas
2. Click **"Try Free"**
3. Sign up with Google or email
4. Choose **FREE M0 tier** (512MB, always free)
5. Pick any region close to you (e.g. Mumbai)
6. Click **"Create Cluster"** — wait 2 minutes

---

## ✅ STEP 3 — Get Your Atlas Connection String

### 3a. Create a Database User
- In Atlas sidebar → **Database Access**
- Click **"Add New Database User"**
- Username: `somnath`  (write this down)
- Password: `mypassword123`  (write this down)
- Role: **"Read and write to any database"**
- Click **"Add User"**

### 3b. Allow Your IP Address
- In Atlas sidebar → **Network Access**
- Click **"Add IP Address"**
- Click **"Allow Access from Anywhere"** → this adds `0.0.0.0/0`
- Click **"Confirm"**

### 3c. Get the Connection String
- In Atlas sidebar → **Database** → click **"Connect"** on your cluster
- Choose **"Drivers"**
- Select **Node.js**, version **5.5 or later**
- Copy the connection string — looks like:
  ```
  mongodb+srv://somnath:<password>@cluster0.abc12.mongodb.net/?retryWrites=true&w=majority
  ```

---

## ✅ STEP 4 — Configure Your .env File

Open `backend/.env` in Notepad/VSCode.

Replace this line:
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.XXXXX.mongodb.net/portfolio?retryWrites=true&w=majority
```

With YOUR actual values:
```
MONGODB_URI=mongodb+srv://somnath:mypassword123@cluster0.abc12.mongodb.net/portfolio?retryWrites=true&w=majority
```

⚠️ Important:
- Replace `YOUR_USERNAME` with `somnath` (your Atlas username)
- Replace `YOUR_PASSWORD` with `mypassword123` (your Atlas password)
- Replace `cluster0.XXXXX` with your actual cluster address
- Add `/portfolio` before the `?` — this is your database name
- No spaces anywhere

---

## ✅ STEP 5 — Run the Backend

Open Terminal in the `portfolio` folder and run:

```bash
# Go into backend folder
cd backend

# Install packages (one time only)
npm install

# Add sample data to Atlas
npm run seed
```

You should see:
```
✅  Atlas connected → cluster0.abc12.mongodb.net
🗑️  Old data cleared
✔  About inserted
✔  6 Skills inserted
✔  6 Projects inserted
✅  Seed done!
```

Then start the server:
```bash
npm run dev
```

You should see:
```
✅  Atlas connected
🚀  Backend running → http://localhost:5000
```

Test it: Open browser → http://localhost:5000/api/health
Should show: `{"ok":true,"db":"connected",...}`

---

## ✅ STEP 6 — Run the Frontend

Open a **NEW** Terminal window in the `portfolio` folder:

```bash
# Go into frontend folder
cd frontend

# Install packages (one time only)
npm install

# Start the app
npm start
```

Browser opens automatically at: **http://localhost:3000** 🎉

---

## ❌ COMMON ERRORS & FIXES

### Error: "Cannot find module 'react-scripts'"
```bash
cd frontend
npm install
```

### Error: "MONGODB_URI is not set"
→ Open `backend/.env` and fill in your Atlas URI (Step 4)

### Error: "MongooseServerSelectionError"
→ Atlas → Network Access → Add IP: `0.0.0.0/0` (Step 3b)

### Error: "Authentication failed"
→ Your username/password in the URI is wrong. Re-check Step 4.

### Error: "querySrv ENOTFOUND"
→ No internet, or your cluster address is wrong.

### Frontend shows blank white page
→ Did you run `npm install` in the frontend folder?
→ Check browser console for errors (F12)

---

## 🌐 Both Running At The Same Time

Terminal 1 (backend):
```bash
cd backend && npm run dev
```

Terminal 2 (frontend):
```bash
cd frontend && npm start
```

Frontend: http://localhost:3000
Backend:  http://localhost:5000/api/health
