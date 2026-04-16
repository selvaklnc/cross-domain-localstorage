# Cross-domain localStorage (No backend, Pure JavaScript)

Share localStorage across subdomains and completely different domains using pure JavaScript. No backend required. Works on static websites using iframe and postMessage.

---

![npm](https://img.shields.io/npm/v/cross-domain-localstorage)
![license](https://img.shields.io/npm/l/cross-domain-localstorage)
![downloads](https://img.shields.io/npm/dm/cross-domain-localstorage)

---

Access and share `localStorage` across:
- Subdomains
- Multiple domains
- Static websites
- Without any backend

Built using:
- `iframe`
- `postMessage`
- Native browser APIs only

---

## What is Cross Domain LocalStorage

Cross Domain LocalStorage is a lightweight JavaScript solution that allows you to share browser storage data across multiple domains and subdomains without using any backend service.

It uses iframe and postMessage to create a central storage hub that securely handles read and write operations.

---

## Why Use This

- Manage shared data across multiple websites  
- Avoid backend complexity for small storage needs  
- Keep user preferences consistent across domains  
- Build multi-domain tools with shared state  
- Use in static hosting environments without APIs  

---

## Live demo scenarios

| Demo Type | Description |
|----------|------------|
| Subdomain Sharing | `app.example.com` ↔ `admin.example.com` |
| Multi-Domain Sharing | `site1.com` ↔ `site2.net` |
| Restricted Domains | Only selected domains allowed |
| Open Global Mode | Any domain (secured with token) |

---

## How it works

All domains communicate with a **central storage hub**:

> your sites → iframe → storage hub → localStorage


- Data is stored in ONE domain
- All other domains access via messaging
- Works even for static hosting

---

## Project structure

```bash
src/        → SDK source
dist/       → Build files
storage/    → Storage hub
demo/       → Example demos
```
---

## Quick start

### Clone the project

#### 1. Host storage hub

Deploy:

`/storage/storage.html`

Example:

`https://storage.yourdomain.com/storage.html`

---

#### 2. Build

```bash
npm install
npm run build
```

#### 3. Include script

```html
<script src="dist/cross-storage.min.js"></script>
```

#### 4. Initialize

```js
const storage = new CrossStorage({
  iframeUrl: "https://storage.yourdomain.com/storage.html",
  token: "your-secret-key"
});
```

#### 5. Use like localStorage

```js
await storage.set("user", { name: "John" });

const user = await storage.get("user");

await storage.remove("user");

await storage.clear();
```

### npm Installation

```bash
npm install cross-domain-localstorage
```

### CDN usage

```html
<script src="https://unpkg.com/cross-domain-localstorage/dist/cross-storage.min.js"></script>
```

## Quick Example

```js
const CrossStorage = require("cross-domain-localstorage");

const storage = new CrossStorage({
  iframeUrl: "https://storage.yourdomain.com/storage.html",
  token: "your-secret-key"
});

await storage.set("theme", "dark");

const value = await storage.get("theme");
console.log(value);
```

## How Cross Domain LocalStorage Works

This solution creates a shared storage layer using:

- iframe hosted on a central domain
- postMessage for communication
- localStorage inside the storage hub

Each connected domain sends requests to the iframe, which performs storage operations and returns results.

## Security modes explained

### 1️ Subdomain storage sharing

- Works within same root domain
- Uses strict origin validation

Use when working within same root domain.

```js
mode: "subdomain"
```

### 2️ Multi-domain mode

- Works across different domains
- Requires shared hub

### 3 Restricted domain storage

- Only allowed domains can access
- Uses whitelist

Allow only specific domains.

```js
mode: "restricted",
allowedOrigins: [
  "https://app.example.com",
  "https://admin.example.com"
]
```

### 4️ Open cross domain storage (Token protected)

- Any domain can connect
- Requires secret token

Allow any domain with token validation.

```js
mode: "open",
token: "your-secret-key"
```

## Limitations

- Cannot access storage of another domain directly
- Requires iframe hub
- Safari / Brave may restrict third-party storage

## Security best practices

- Always validate `event.origin`
- Never use `"*"` without token protection
- Always validate origin or token
- Avoid storing sensitive data in plain text
- Use encryption if needed
- Use strong tokens in open mode
- Prefer restricted mode for better control
- Some browsers may restrict third-party storage

## Demo instructions

Each demo folder contains:

- `index.html`
- Example usage
- Instructions

Run locally or deploy to test.

## Features

- Works without backend or APIs
- Supports subdomains and different domains
- Multiple security modes (subdomain, restricted, open)
- Lightweight and dependency-free
- Promise-based API
- JSON data support
- Works on static hosting

## Demo use cases

- Share localStorage across subdomains
- Share localStorage across different domains
- Sync dashboard data across multiple sites
- Maintain user preferences across websites
- Enable login-like behavior without backend

## Where to use this library

- Multi-domain tools
- SaaS dashboards
- Static site ecosystems
- White-label platforms
- Shared user preferences

## Future improvements

- Encryption layer
- BroadcastChannel sync
- TypeScript support
- Advanced caching

## Creators

**Selvakumaran Krishnan**

- <https://x.com/selvakumarankri>
- <https://github.com/selvaklnc>

**Wikimint**

- <https://x.com/wikimint>
- <https://github.com/wikimint>

---

## How to share localStorage across subdomains

To share localStorage across subdomains, you need a central storage hub hosted on a common domain. Using an iframe and postMessage, subdomains can send requests to this hub and access shared data securely.

This approach avoids backend dependency and works entirely in the browser.

---

## How to share localStorage between different domains

Direct access is not possible due to browser security restrictions. However, you can use an iframe hosted on a shared domain to act as a bridge.

All domains communicate with this iframe using postMessage, allowing controlled data sharing across domains.

---

## Cross domain localStorage without backend

This solution enables cross domain storage without using any server. It relies on browser features like iframe and postMessage to create a shared storage layer.

It is ideal for static websites and lightweight applications that do not require a full backend.

---

## JavaScript solution for cross origin storage

Browsers restrict storage access across origins. This tool provides a practical workaround using JavaScript by routing all storage operations through a central iframe.

It ensures compatibility while respecting browser security rules.

---

## Share data between multiple websites using JavaScript

If you manage multiple websites and need shared state, this method allows you to store and retrieve values across all connected domains.

Useful for dashboards, tools, and multi-site platforms.

---

## Cross domain storage for static websites

Static websites often lack backend support. This solution allows them to share data using only frontend code, making it suitable for CDN-hosted projects.

No server setup is required.

---

## Sync user preferences across domains

Store user settings like theme, language, or layout once and reuse them across different domains. This ensures a consistent user experience without additional infrastructure.

---

## Alternative to cookies for cross domain storage

Cookies can be limited and sent with every request. This approach provides a cleaner alternative by using localStorage with controlled access through iframe communication.

---

## Cross domain localStorage example using iframe

This project includes working examples showing how iframe and postMessage can be used to implement cross domain storage in real scenarios.

---

## Is cross domain localStorage possible in JavaScript

Direct access is restricted by browsers, but with the right architecture using iframe messaging, it is possible to share data across domains safely and efficiently.

## License

[MIT License](LICENSE)

## Contributing

PRs are welcome!

## Support

If this project helps you, consider giving a star ⭐ on GitHub!