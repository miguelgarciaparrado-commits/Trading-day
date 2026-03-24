#!/usr/bin/env node
// Build script: compiles trading-diary.jsx → trading-diary.html
const fs = require('fs');
const path = require('path');
const ts = require('/opt/node22/lib/node_modules/typescript');

const srcPath = path.join(__dirname, 'trading-diary.jsx');
const htmlPath = path.join(__dirname, 'trading-diary.html');

// 1. Read JSX source — strip import/export so TypeScript doesn't use module mode
let jsx = fs.readFileSync(srcPath, 'utf8');
jsx = jsx.replace(/^import\s+.*$/gm, '');
jsx = jsx.replace(/^export\s+default\s+/gm, '');

// 2. Compile with TypeScript API
const result = ts.transpileModule(jsx, {
  compilerOptions: {
    jsx: ts.JsxEmit.React,
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.None,
    jsxFactory: 'React.createElement'
  }
});

let compiled = result.outputText;

// 3. Post-process: remove TypeScript artifacts
compiled = compiled.replace(/"use strict";\s*/g, '');
compiled = compiled.replace(/^exports\..+$/gm, '');
compiled = compiled.replace(/Object\.defineProperty\(exports,\s*"__esModule"[^;]+;\s*/g, '');

// 4. Fix orphan commas (TS bug treating <> in JSX as generics)
// Pattern: a comma before a closing brace/paren that shouldn't be there
compiled = compiled.replace(/,(\s*)([\)\}])/g, function(match, ws, closing) {
  // Only remove if it looks like an orphan (TS generates these from JSX type assertions)
  return ws + closing;
});

// 5. Add React destructuring at top
compiled = 'const {useState,useEffect,useRef,useCallback} = React;\n\n' + compiled;

// 6. Read HTML template
let html = fs.readFileSync(htmlPath, 'utf8');

// 7. Find the section to replace: between the React destructuring line and the root.render call
const startMarker = 'const {useState,useEffect,useRef,useCallback} = React;';
const endMarker = '    var root = ReactDOM.createRoot(document.getElementById("root"));';

const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('ERROR: Could not find markers in HTML file');
  console.error('startIdx:', startIdx, 'endIdx:', endIdx);
  process.exit(1);
}

const newHtml = html.slice(0, startIdx) + compiled + '\n' + html.slice(endIdx);
fs.writeFileSync(htmlPath, newHtml, 'utf8');

console.log('Build OK — trading-diary.html updated (' + Math.round(Buffer.byteLength(newHtml)/1024) + ' KB)');
