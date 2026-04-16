# 🤝 Contributing Guide

Thanks for your interest in contributing! 🚀

We welcome all kinds of contributions:

- Bug fixes
- Feature improvements
- Documentation updates
- Demo enhancements

---

## 📦 Getting Started

1. Fork the repository
2. Clone your fork:

```bash
git clone https://github.com/wikimint/cross-domain-localstorage.git
```

3. Install dependencies (optional):

```bash
npm install
```

## 🛠️ Development

### Run build

```bash
npm run build
```

### Project structure

- `src/` → Source code
- `dist/` → Build output
- `storage/` → Storage hub
- `demo/` → Demo examples

### ✏️ Coding Guidelines

- Keep code simple and minimal
- Avoid adding heavy dependencies
- Maintain compatibility with modern browsers
- Follow existing coding style

### 🧪 Testing

- Test changes in:
    - Subdomain mode
    - Multi-domain mode
    - Restricted mode
    - Open mode
- Ensure no breaking changes

### 🔐 Security Guidelines

- Do NOT introduce insecure defaults
- Always validate origin/token logic
- Avoid exposing sensitive data

## 🚀 Submitting Changes

### 1. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

### 2. Commit your changes:

```bash
git commit -m "Add: your feature"
```

### 3. Push:

```bash
git push origin feature/your-feature-name
```

### 4. Open a Pull Request

After completeing all the above steps, open pull request.

## 💡 Suggestions

If you have ideas:

- Open an issue
- Describe use-case clearly

## 🙌 Thanks

Your contributions help make this project better!