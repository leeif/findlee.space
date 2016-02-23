var renderer = new marked.Renderer();
renderer.code = function(code, lang) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code class="hljs">' +
      (escaped ? code : escape(code, true)) +
      '\n</code></pre>';
  }

  return '<pre><code class="hljs ' +
    this.options.langPrefix + escape(lang, true) + '">' +
    (escaped ? code : escape(code, true)) + '\n</code></pre>\n';
};
marked.setOptions({
  renderer: renderer,
  highlight: function(code, lang) {
    var html;
    if (lang) {
      html = hljs.highlight(lang, code).value;
    } else {
      html = hljs.highlightAuto(code).value;
    }
    return html;
  },
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});