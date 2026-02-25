function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function highlightJava(code) {
  let html = escapeHtml(code);
  const placeholders = [];
  const typeWords = [
    "int", "double", "boolean", "char", "long", "float", "short",
    "byte", "String", "var"
  ];
  const keywordWords = [
    "public", "private", "protected", "class", "static", "void",
    "if", "else", "switch", "case", "default", "for", "while", "do",
    "break", "continue", "return", "new", "import", "package", "final",
    "try", "catch", "finally", "throw", "throws", "true", "false",
    "null"
  ];
  const methodWords = [
    "print", "println", "printf", "nextInt", "nextDouble", "next",
    "nextLine", "equals"
  ];

  const buildWordRegex = (words) => {
    return new RegExp(`\\b(?:${words.join("|")})\\b`, "g");
  };

  const hold = (regex, cssClass) => {
    html = html.replace(regex, (match) => {
      const key = `__TOKEN_${placeholders.length}__`;
      placeholders.push(`<span class="${cssClass}">${match}</span>`);
      return key;
    });
  };

  hold(/\/\*[\s\S]*?\*\//g, "code-comment");
  hold(/\/\/[^\n]*/g, "code-comment");
  hold(/"(?:\\.|[^"\\])*"/g, "code-string");
  hold(/'(?:\\.|[^'\\])'/g, "code-string");

  html = html.replace(
    /\b\d+(?:\.\d+)?\b/g,
    '<span class="code-number">$&</span>'
  );
  html = html.replace(/@\w+/g, '<span class="code-annotation">$&</span>');
  html = html.replace(
    buildWordRegex(typeWords),
    '<span class="code-type">$&</span>'
  );
  html = html.replace(
    buildWordRegex(keywordWords),
    '<span class="code-keyword">$&</span>'
  );
  html = html.replace(
    buildWordRegex(methodWords),
    '<span class="code-method">$&</span>'
  );

  placeholders.forEach((token, index) => {
    html = html.replace(`__TOKEN_${index}__`, token);
  });

  return html;
}

document.addEventListener("DOMContentLoaded", () => {
  const codeBlocks = document.querySelectorAll(".code-box");
  codeBlocks.forEach((block) => {
    block.innerHTML = highlightJava(block.textContent || "");
  });
});