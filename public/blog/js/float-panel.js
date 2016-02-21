var floatPanel = new McFloatPanel();
/* Float Panel v2015.12.5. Copyright www.menucool.com */
function McFloatPanel() {
  var f = "className",
    c = "length",
    b = "style",
    d = document,
    a = [],
    x, g = function(a, c, b) {
      if (a.addEventListener) a.addEventListener(c, b, false);
      else a.attachEvent && a.attachEvent("on" + c, b)
    },
    w = function(a, d) {
      var b = a[c];
      while (b--)
        if (a[b] === d) return true;
      return false
    },
    h = function(b, a) {
      return w(b[f].split(" "), a)
    },
    o = function(a, b) {
      if (!h(a, b))
        if (!a[f]) a[f] = b;
        else a[f] += " " + b
    },
    n = function(d, g) {
      if (d[f]) {
        for (var e = "", b = d[f].split(" "), a = 0, h = b[c]; a < h; a++)
          if (b[a] !== g) e += b[a] + " ";
        d[f] = e.replace(/^\s+|\s+$/g, "")
      }
    },
    l = function() {
      return window.pageYOffset || d.documentElement.scrollTop
    },
    u = function(a) {
      return a.getBoundingClientRect().top
    },
    m = function() {
      for (var e, d, g = l(), f = 0; f < a[c]; f++) {
        d = a[f];
        e = u(d);
        if (e < d.offTp && !h(d, "fixed")) {
          d.pHdr[b].display = "block";
          d.pHdr[b].height = d.offsetHeight + 1 + "px";
          d.tP = g + e - d.offTp;
          o(d, "fixed");
          d[b].position = "fixed";
          d[b].top = d.offTp + "px"
        } else if (h(d, "fixed") && g < d.tP) {
          n(d, "fixed");
          d[b].position = "";
          d[b].top = "";
          d.pHdr[b].display = "none"
        }
      }
    },
    s = function() {
      var i = [],
        f;
      if (d.getElementsByClassName) i = d.getElementsByClassName("float-panel");
      else {
        var j = d.getElementsByName("*");
        f = j[c];
        while (f--) h(j[f], "float-panel") && i.push(j[c])
      }
      f = i[c];
      for (var e = 0; e < f; e++) {
        a[e] = i[e];
        a[e].offTp = parseInt(a[e].getAttribute("data-top") || 0);
        a[e].pHdr = d.createElement("div");
        a[e].pHdr[b].width = a[e].offsetWidth + "px";
        a[e].pHdr[b].display = "none";
        a[e].parentNode.insertBefore(a[e].pHdr, a[e].nextSibling)
      }
      if (a[c]) {
        setTimeout(m, 99);
        g(window, "scroll", m)
      }
      v()
    };
  g(window, "load", s);
  var e, p = 200,
    q = 0,
    k, j, r = function() {
      return window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth
    };

  function t() {
    k = setInterval(function() {
      var a = d.body;
      if (a.scrollTop < 3) a.scrollTop = 0;
      else a.scrollTop = a.scrollTop / 1.4;
      if (!a.scrollTop) {
        clearInterval(k);
        k = null
      }
    }, 12)
  }

  function i() {
    clearTimeout(j);
    if (l() > p && r() > q) {
      j = setTimeout(function() {
        n(e, "mcOut")
      }, 60);
      e[b].display = "block"
    } else {
      o(e, "mcOut");
      j = setTimeout(function() {
        e[b].display = "none"
      }, 500)
    }
  }
  var v = function() {
    e = d.getElementById("backtop");
    if (e) {
      var a = e.getAttribute("data-v-w");
      if (a) {
        a = a.replace(/\s/g, "").split(",");
        p = parseInt(a[0]);
        if (a[c] > 1) q = parseInt(a[1])
      }
      g(e, "click", t);
      g(window, "resize", i);
      g(window, "scroll", i);
      i()
    }
  };
  return {
    changeFloatOffset: function(d) {
      if (a)
        for (var b = 0; b < a[c]; b++) a[b].offTp = d
    }
  }
}
