# 🚀 Gitmate

**Gitmate** is a simple yet powerful JavaScript library that lets you fetch GitHub user and repository data easily using GitHub’s public API. It wraps API requests into clean, promise-based utility functions — perfect for dashboards, CLIs, or personal projects.

---

## 📦 Installation

```bash
npm install gitmate.js
```

---

## ✅ Features

- 🧑‍💻 `user(username)` – Fetches GitHub user details  
- 📦 `repos(username)` – Retrieves all public repositories  
- 📊 `concisedRepos(username)` – Returns summarized stats (stars, forks, languages)  
- 🌟 `topRepos(username, count)` – Returns top N repositories by stars  
- 🈯 `languageUsed(username)` – Lists languages used across all repositories  
- 🔐 Token support for authenticated requests *(optional)*  
- ⚠️ Built-in error handling for invalid usernames  

---

## 🔍 Usage Example

```js
import gitmate from "gitmate.js";

(async () => {
  const user = await gitmate.user("octocat");
  const repos = await gitmate.repos("octocat");
  const top = await gitmate.topRepos("octocat", 5);
  const concise = await gitmate.concisedRepos("octocat");
  const langs = await gitmate.languagesUsed("octocat");

  console.log(user);
  console.log(top);
  console.log(langs);
})();
```

---

## 🛠 Project Status

**Version 1.0.0 — Beta release**

Stable for general use. Open to feedback, improvements, and contributions.

---

## 🧾 License

Licensed under the [MIT License](LICENSE).





