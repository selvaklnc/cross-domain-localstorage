const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "src/index.js");
const DIST = path.join(__dirname, "dist");

if (!fs.existsSync(DIST)) {
  fs.mkdirSync(DIST);
}

let code = fs.readFileSync(SRC, "utf8");


// -----------------------------
// BASIC MINIFIER (SAFE)
// -----------------------------
function minify(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, "")     // remove block comments
    .replace(/\/\/.*$/gm, "")             // remove line comments
    .replace(/\n/g, "")                   // remove new lines
    .replace(/\s+/g, " ")                 // collapse spaces
    .replace(/\s*([{}();,:=<>+\-*/])\s*/g, "$1"); // trim around symbols
}


// -----------------------------
// LIGHT VARIABLE RANDOMIZER
// -----------------------------
function randomName(len = 3) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let str = chars[Math.floor(Math.random() * 26)]; // first must be letter
  for (let i = 1; i < len; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

function obfuscateVariables(code) {
  const varRegex = /\b(let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  const map = new Map();

  return code.replace(varRegex, (match, type, name) => {
    if (!map.has(name)) {
      map.set(name, randomName());
    }
    return `${type} ${map.get(name)}`;
  }).replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, (name) => {
    return map.has(name) ? map.get(name) : name;
  });
}


// -----------------------------
// BUILD OUTPUTS
// -----------------------------

// Original (clean)
fs.writeFileSync(
  path.join(DIST, "cross-storage.js"),
  code,
  "utf8"
);

// Minified
const minified = minify(code);
fs.writeFileSync(
  path.join(DIST, "cross-storage.min.js"),
  minified,
  "utf8"
);

// Minified + light obfuscation
const obfuscated = obfuscateVariables(minified);
fs.writeFileSync(
  path.join(DIST, "cross-storage.obf.js"),
  obfuscated,
  "utf8"
);

console.log("✅ Build complete:");
console.log(" - dist/cross-storage.js");
console.log(" - dist/cross-storage.min.js");
console.log(" - dist/cross-storage.obf.js");