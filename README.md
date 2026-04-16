# 🌍 Cross-Domain LocalStorage (No Backend, Pure JavaScript)

Access and share `localStorage` across:
- ✅ Subdomains
- ✅ Multiple domains
- ✅ Static websites
- ✅ Without any backend

Built using:
- `iframe`
- `postMessage`
- Native browser APIs only

---

## 🚀 Live Demo Scenarios

| Demo Type | Description |
|----------|------------|
| 🔹 Subdomain Sharing | `app.example.com` ↔ `admin.example.com` |
| 🔹 Multi-Domain Sharing | `site1.com` ↔ `site2.net` |
| 🔹 Restricted Domains | Only selected domains allowed |
| 🔹 Open Global Mode | Any domain (secured with token) |

---

## 🧠 How It Works

All domains communicate with a **central storage hub**:

> your sites → iframe → storage hub → localStorage


- Data is stored in ONE domain
- All other domains access via messaging
- Works even for static hosting

---

## 📁 Project Structure

├── demo/
│ ├── subdomain/
│ ├── multi-domain/
│ ├── restricted/
│ └── open/
├── src/
├── dist/
├── storage/
│ └── storage.html
├── build.js
└── README.md


---

## ⚡ Quick Start

### 1. Host Storage Hub

Deploy:

`/storage/storage.html`

Example:

`https://storage.yourdomain.com/storage.html`


---

### 2. Include Script

```html
<script src="dist/cross-storage.min.js"></script>
```

### 3. Initialize

```js
const storage = new CrossStorage({
  iframeUrl: "https://storage.yourdomain.com/storage.html",
  token: "your-secret-key"
});
```

### 4. Use Like localStorage

```js
await storage.set("user", { name: "John" });

const user = await storage.get("user");

await storage.remove("user");

await storage.clear();
```

## 🔐 Modes Explained

### 1️⃣ Subdomain Mode

- Works within same root domain
- Uses strict origin validation

### 2️⃣ Multi-Domain Mode

- Works across different domains
- Requires shared hub

### 3️⃣ Restricted Mode

- Only allowed domains can access
- Uses whitelist

### 4️⃣ Open Mode (Token Protected)

- Any domain can connect
- Requires secret token

## ⚠️ Limitations

- ❌ Cannot access storage of another domain directly
- ❌ Requires iframe hub
- ⚠️ Safari / Brave may restrict third-party storage

## 🛡️ Security Best Practices

- Always validate `event.origin`
- Never use `"*"` without token protection
- Avoid storing sensitive data in plain text
- Use encryption if needed

## 🧪 Demo Instructions

Each demo folder contains:

- `index.html`
- Example usage
- Instructions

Run locally or deploy to test.

## 🏗️ Build

```bash
npm install
npm run build
```

## 📦 Features

- ✅ No dependencies
- ✅ Works on static hosting
- ✅ Promise-based API
- ✅ JSON support
- ✅ Lightweight

## 🚀 Future Improvements

- Encryption layer
- BroadcastChannel sync
- TypeScript support
- Advanced caching

## 📄 License

[MIT License](LICENSE)

## 🙌 Contributing

PRs are welcome!

## ⭐ Support

If this helped you, give a ⭐ on GitHub!