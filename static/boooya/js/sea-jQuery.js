function wrapFunc(e) {
  return function (t) {
    return e.apply(t, ARRAY_CORE.slice.call(arguments, 1))
  }
}

function Subscribe() {
}

function DepSubscribe() {
  this.path = "", this.subscribe = new Subscribe
}

function createGetterSetter(e, t, n, r) {
  function i(e) {
    o = object_common.isObject(e) ? ObserverObject(e, t.newSubscribe(n)) : object_common.isArray(e) ? ObserverArray(e, t.newSubscribe(n)) : e
  }

  var o, a = object_common.getOwnPropertyDescriptor(e, n), s = a && a.set, u = a && a.get, l = a && a.configurable;
  a && s && u || a && !l || (object_common.defineProperty(e, n, {
    configurable: !0, enumerable: !0, get: function () {
      return o
    }, set: function (e) {
      var r = o;
      r !== e && (i(e), t.trigger(n, r, o))
    }
  }), i(r))
}

function extendDefineProperties(e, t, n) {
  var r = object_common.keys(n);
  return array_common.forEach(r, function (r) {
    createGetterSetter(e, t, r, n[r])
  }), e
}

function ObserverObject(e, t) {
  return extendDefineProperties({}, t, e)
}

function ObserverArray(e, t) {
  if (!(this instanceof ObserverArray)) return new ObserverArray(e, t);
  var n = extendDefineProperties([], t, e);
  return array_common.forEach(["splice", "push", "shift", "unshift"], function (e) {
    n[e] = function () {
      var n = array_common.from(arguments);
      n.unshift(this), array_common[e].apply(this, n), t.triggerArray(e, arguments)
    }
  }), n
}

!function (e, t) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document) throw new Error("jQuery requires a window with a document");
    return t(e)
  } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
  function n(e) {
    var t = !!e && "length" in e && e.length, n = pe.type(e);
    return "function" !== n && !pe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
  }

  function r(e, t, n) {
    if (pe.isFunction(t)) return pe.grep(e, function (e, r) {
      return !!t.call(e, r, e) !== n
    });
    if (t.nodeType) return pe.grep(e, function (e) {
      return e === t !== n
    });
    if ("string" == typeof t) {
      if (Ce.test(t)) return pe.filter(t, e, n);
      t = pe.filter(t, e)
    }
    return pe.grep(e, function (e) {
      return pe.inArray(e, t) > -1 !== n
    })
  }

  function i(e, t) {
    do e = e[t]; while (e && 1 !== e.nodeType);
    return e
  }

  function o(e) {
    var t = {};
    return pe.each(e.match(De) || [], function (e, n) {
      t[n] = !0
    }), t
  }

  function a() {
    re.addEventListener ? (re.removeEventListener("DOMContentLoaded", s), e.removeEventListener("load", s)) : (re.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
  }

  function s() {
    (re.addEventListener || "load" === e.event.type || "complete" === re.readyState) && (a(), pe.ready())
  }

  function u(e, t, n) {
    if (void 0 === n && 1 === e.nodeType) {
      var r = "data-" + t.replace(Oe, "-$1").toLowerCase();
      if (n = e.getAttribute(r), "string" == typeof n) {
        try {
          n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Pe.test(n) ? pe.parseJSON(n) : n)
        } catch (i) {
        }
        pe.data(e, t, n)
      } else n = void 0
    }
    return n
  }

  function l(e) {
    var t;
    for (t in e) if (("data" !== t || !pe.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
    return !0
  }

  function c(e, t, n, r) {
    if (_e(e)) {
      var i, o, a = pe.expando, s = e.nodeType, u = s ? pe.cache : e, l = s ? e[a] : e[a] && a;
      if (l && u[l] && (r || u[l].data) || void 0 !== n || "string" != typeof t) return l || (l = s ? e[a] = ne.pop() || pe.guid++ : a), u[l] || (u[l] = s ? {} : {toJSON: pe.noop}), "object" != typeof t && "function" != typeof t || (r ? u[l] = pe.extend(u[l], t) : u[l].data = pe.extend(u[l].data, t)), o = u[l], r || (o.data || (o.data = {}), o = o.data), void 0 !== n && (o[pe.camelCase(t)] = n), "string" == typeof t ? (i = o[t], null == i && (i = o[pe.camelCase(t)])) : i = o, i
    }
  }

  function f(e, t, n) {
    if (_e(e)) {
      var r, i, o = e.nodeType, a = o ? pe.cache : e, s = o ? e[pe.expando] : pe.expando;
      if (a[s]) {
        if (t && (r = n ? a[s] : a[s].data)) {
          pe.isArray(t) ? t = t.concat(pe.map(t, pe.camelCase)) : t in r ? t = [t] : (t = pe.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
          for (; i--;) delete r[t[i]];
          if (n ? !l(r) : !pe.isEmptyObject(r)) return
        }
        (n || (delete a[s].data, l(a[s]))) && (o ? pe.cleanData([e], !0) : fe.deleteExpando || a != a.window ? delete a[s] : a[s] = void 0)
      }
    }
  }

  function d(e, t, n, r) {
    var i, o = 1, a = 20, s = r ? function () {
        return r.cur()
      } : function () {
        return pe.css(e, t, "")
      }, u = s(), l = n && n[3] || (pe.cssNumber[t] ? "" : "px"),
      c = (pe.cssNumber[t] || "px" !== l && +u) && Be.exec(pe.css(e, t));
    if (c && c[3] !== l) {
      l = l || c[3], n = n || [], c = +u || 1;
      do o = o || ".5", c /= o, pe.style(e, t, c + l); while (o !== (o = s() / u) && 1 !== o && --a)
    }
    return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
  }

  function p(e) {
    var t = Xe.split("|"), n = e.createDocumentFragment();
    if (n.createElement) for (; t.length;) n.createElement(t.pop());
    return n
  }

  function h(e, t) {
    var n, r, i = 0,
      o = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : void 0;
    if (!o) for (o = [], n = e.childNodes || e; null != (r = n[i]); i++) !t || pe.nodeName(r, t) ? o.push(r) : pe.merge(o, h(r, t));
    return void 0 === t || t && pe.nodeName(e, t) ? pe.merge([e], o) : o
  }

  function g(e, t) {
    for (var n, r = 0; null != (n = e[r]); r++) pe._data(n, "globalEval", !t || pe._data(t[r], "globalEval"))
  }

  function m(e) {
    Ie.test(e.type) && (e.defaultChecked = e.checked)
  }

  function v(e, t, n, r, i) {
    for (var o, a, s, u, l, c, f, d = e.length, v = p(t), y = [], b = 0; d > b; b++) if (a = e[b], a || 0 === a) if ("object" === pe.type(a)) pe.merge(y, a.nodeType ? [a] : a); else if (Ge.test(a)) {
      for (u = u || v.appendChild(t.createElement("div")), l = (Re.exec(a) || ["", ""])[1].toLowerCase(), f = ze[l] || ze._default, u.innerHTML = f[1] + pe.htmlPrefilter(a) + f[2], o = f[0]; o--;) u = u.lastChild;
      if (!fe.leadingWhitespace && We.test(a) && y.push(t.createTextNode(We.exec(a)[0])), !fe.tbody) for (a = "table" !== l || Ue.test(a) ? "<table>" !== f[1] || Ue.test(a) ? 0 : u : u.firstChild, o = a && a.childNodes.length; o--;) pe.nodeName(c = a.childNodes[o], "tbody") && !c.childNodes.length && a.removeChild(c);
      for (pe.merge(y, u.childNodes), u.textContent = ""; u.firstChild;) u.removeChild(u.firstChild);
      u = v.lastChild
    } else y.push(t.createTextNode(a));
    for (u && v.removeChild(u), fe.appendChecked || pe.grep(h(y, "input"), m), b = 0; a = y[b++];) if (r && pe.inArray(a, r) > -1) i && i.push(a); else if (s = pe.contains(a.ownerDocument, a), u = h(v.appendChild(a), "script"), s && g(u), n) for (o = 0; a = u[o++];) Fe.test(a.type || "") && n.push(a);
    return u = null, v
  }

  function y() {
    return !0
  }

  function b() {
    return !1
  }

  function x() {
    try {
      return re.activeElement
    } catch (e) {
    }
  }

  function w(e, t, n, r, i, o) {
    var a, s;
    if ("object" == typeof t) {
      "string" != typeof n && (r = r || n, n = void 0);
      for (s in t) w(e, s, n, r, t[s], o);
      return e
    }
    if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), i === !1) i = b; else if (!i) return e;
    return 1 === o && (a = i, i = function (e) {
      return pe().off(e), a.apply(this, arguments)
    }, i.guid = a.guid || (a.guid = pe.guid++)), e.each(function () {
      pe.event.add(this, t, i, r, n)
    })
  }

  function T(e, t) {
    return pe.nodeName(e, "table") && pe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
  }

  function C(e) {
    return e.type = (null !== pe.find.attr(e, "type")) + "/" + e.type, e
  }

  function E(e) {
    var t = it.exec(e.type);
    return t ? e.type = t[1] : e.removeAttribute("type"), e
  }

  function k(e, t) {
    if (1 === t.nodeType && pe.hasData(e)) {
      var n, r, i, o = pe._data(e), a = pe._data(t, o), s = o.events;
      if (s) {
        delete a.handle, a.events = {};
        for (n in s) for (r = 0, i = s[n].length; i > r; r++) pe.event.add(t, n, s[n][r])
      }
      a.data && (a.data = pe.extend({}, a.data))
    }
  }

  function A(e, t) {
    var n, r, i;
    if (1 === t.nodeType) {
      if (n = t.nodeName.toLowerCase(), !fe.noCloneEvent && t[pe.expando]) {
        i = pe._data(t);
        for (r in i.events) pe.removeEvent(t, r, i.handle);
        t.removeAttribute(pe.expando)
      }
      "script" === n && t.text !== e.text ? (C(t).text = e.text, E(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), fe.html5Clone && e.innerHTML && !pe.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ie.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }
  }

  function N(e, t, n, r) {
    t = oe.apply([], t);
    var i, o, a, s, u, l, c = 0, f = e.length, d = f - 1, p = t[0], g = pe.isFunction(p);
    if (g || f > 1 && "string" == typeof p && !fe.checkClone && rt.test(p)) return e.each(function (i) {
      var o = e.eq(i);
      g && (t[0] = p.call(this, i, o.html())), N(o, t, n, r)
    });
    if (f && (l = v(t, e[0].ownerDocument, !1, e, r), i = l.firstChild, 1 === l.childNodes.length && (l = i), i || r)) {
      for (s = pe.map(h(l, "script"), C), a = s.length; f > c; c++) o = l, c !== d && (o = pe.clone(o, !0, !0), a && pe.merge(s, h(o, "script"))), n.call(e[c], o, c);
      if (a) for (u = s[s.length - 1].ownerDocument, pe.map(s, E), c = 0; a > c; c++) o = s[c], Fe.test(o.type || "") && !pe._data(o, "globalEval") && pe.contains(u, o) && (o.src ? pe._evalUrl && pe._evalUrl(o.src) : pe.globalEval((o.text || o.textContent || o.innerHTML || "").replace(ot, "")));
      l = i = null
    }
    return e
  }

  function S(e, t, n) {
    for (var r, i = t ? pe.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || pe.cleanData(h(r)), r.parentNode && (n && pe.contains(r.ownerDocument, r) && g(h(r, "script")), r.parentNode.removeChild(r));
    return e
  }

  function D(e, t) {
    var n = pe(t.createElement(e)).appendTo(t.body), r = pe.css(n[0], "display");
    return n.detach(), r
  }

  function L(e) {
    var t = re, n = lt[e];
    return n || (n = D(e, t), "none" !== n && n || (ut = (ut || pe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (ut[0].contentWindow || ut[0].contentDocument).document, t.write(), t.close(), n = D(e, t), ut.detach()), lt[e] = n), n
  }

  function j(e, t) {
    return {
      get: function () {
        return e() ? void delete this.get : (this.get = t).apply(this, arguments)
      }
    }
  }

  function _(e) {
    if (e in Et) return e;
    for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = Ct.length; n--;) if (e = Ct[n] + t, e in Et) return e
  }

  function P(e, t) {
    for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++) r = e[a], r.style && (o[a] = pe._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && Me(r) && (o[a] = pe._data(r, "olddisplay", L(r.nodeName)))) : (i = Me(r), (n && "none" !== n || !i) && pe._data(r, "olddisplay", i ? n : pe.css(r, "display"))));
    for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
    return e
  }

  function O(e, t, n) {
    var r = xt.exec(t);
    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
  }

  function H(e, t, n, r, i) {
    for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += pe.css(e, n + qe[o], !0, i)), r ? ("content" === n && (a -= pe.css(e, "padding" + qe[o], !0, i)), "margin" !== n && (a -= pe.css(e, "border" + qe[o] + "Width", !0, i))) : (a += pe.css(e, "padding" + qe[o], !0, i), "padding" !== n && (a += pe.css(e, "border" + qe[o] + "Width", !0, i)));
    return a
  }

  function B(t, n, r) {
    var i = !0, o = "width" === n ? t.offsetWidth : t.offsetHeight, a = ht(t),
      s = fe.boxSizing && "border-box" === pe.css(t, "boxSizing", !1, a);
    if (re.msFullscreenElement && e.top !== e && t.getClientRects().length && (o = Math.round(100 * t.getBoundingClientRect()[n])), 0 >= o || null == o) {
      if (o = gt(t, n, a), (0 > o || null == o) && (o = t.style[n]), ft.test(o)) return o;
      i = s && (fe.boxSizingReliable() || o === t.style[n]), o = parseFloat(o) || 0
    }
    return o + H(t, n, r || (s ? "border" : "content"), i, a) + "px"
  }

  function q(e, t, n, r, i) {
    return new q.prototype.init(e, t, n, r, i)
  }

  function M() {
    return e.setTimeout(function () {
      kt = void 0
    }), kt = pe.now()
  }

  function $(e, t) {
    var n, r = {height: e}, i = 0;
    for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = qe[i], r["margin" + n] = r["padding" + n] = e;
    return t && (r.opacity = r.width = e), r
  }

  function I(e, t, n) {
    for (var r, i = (W.tweeners[t] || []).concat(W.tweeners["*"]), o = 0, a = i.length; a > o; o++) if (r = i[o].call(n, t, e)) return r
  }

  function R(e, t, n) {
    var r, i, o, a, s, u, l, c, f = this, d = {}, p = e.style, h = e.nodeType && Me(e), g = pe._data(e, "fxshow");
    n.queue || (s = pe._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function () {
      s.unqueued || u()
    }), s.unqueued++, f.always(function () {
      f.always(function () {
        s.unqueued--, pe.queue(e, "fx").length || s.empty.fire()
      })
    })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], l = pe.css(e, "display"), c = "none" === l ? pe._data(e, "olddisplay") || L(e.nodeName) : l, "inline" === c && "none" === pe.css(e, "float") && (fe.inlineBlockNeedsLayout && "inline" !== L(e.nodeName) ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", fe.shrinkWrapBlocks() || f.always(function () {
      p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
    }));
    for (r in t) if (i = t[r], Nt.exec(i)) {
      if (delete t[r], o = o || "toggle" === i, i === (h ? "hide" : "show")) {
        if ("show" !== i || !g || void 0 === g[r]) continue;
        h = !0
      }
      d[r] = g && g[r] || pe.style(e, r)
    } else l = void 0;
    if (pe.isEmptyObject(d)) "inline" === ("none" === l ? L(e.nodeName) : l) && (p.display = l); else {
      g ? "hidden" in g && (h = g.hidden) : g = pe._data(e, "fxshow", {}), o && (g.hidden = !h), h ? pe(e).show() : f.done(function () {
        pe(e).hide()
      }), f.done(function () {
        var t;
        pe._removeData(e, "fxshow");
        for (t in d) pe.style(e, t, d[t])
      });
      for (r in d) a = I(h ? g[r] : 0, r, f), r in g || (g[r] = a.start, h && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
    }
  }

  function F(e, t) {
    var n, r, i, o, a;
    for (n in e) if (r = pe.camelCase(n), i = t[r], o = e[n], pe.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = pe.cssHooks[r], a && "expand" in a) {
      o = a.expand(o), delete e[r];
      for (n in o) n in e || (e[n] = o[n], t[n] = i)
    } else t[r] = i
  }

  function W(e, t, n) {
    var r, i, o = 0, a = W.prefilters.length, s = pe.Deferred().always(function () {
      delete u.elem
    }), u = function () {
      if (i) return !1;
      for (var t = kt || M(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; u > a; a++) l.tweens[a].run(o);
      return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1)
    }, l = s.promise({
      elem: e,
      props: pe.extend({}, t),
      opts: pe.extend(!0, {specialEasing: {}, easing: pe.easing._default}, n),
      originalProperties: t,
      originalOptions: n,
      startTime: kt || M(),
      duration: n.duration,
      tweens: [],
      createTween: function (t, n) {
        var r = pe.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
        return l.tweens.push(r), r
      },
      stop: function (t) {
        var n = 0, r = t ? l.tweens.length : 0;
        if (i) return this;
        for (i = !0; r > n; n++) l.tweens[n].run(1);
        return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this
      }
    }), c = l.props;
    for (F(c, l.opts.specialEasing); a > o; o++) if (r = W.prefilters[o].call(l, e, c, l.opts)) return pe.isFunction(r.stop) && (pe._queueHooks(l.elem, l.opts.queue).stop = pe.proxy(r.stop, r)), r;
    return pe.map(c, I, l), pe.isFunction(l.opts.start) && l.opts.start.call(e, l), pe.fx.timer(pe.extend(u, {
      elem: e,
      anim: l,
      queue: l.opts.queue
    })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
  }

  function X(e) {
    return pe.attr(e, "class") || ""
  }

  function z(e) {
    return function (t, n) {
      "string" != typeof t && (n = t, t = "*");
      var r, i = 0, o = t.toLowerCase().match(De) || [];
      if (pe.isFunction(n)) for (; r = o[i++];) "+" === r.charAt(0) ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
    }
  }

  function G(e, t, n, r) {
    function i(s) {
      var u;
      return o[s] = !0, pe.each(e[s] || [], function (e, s) {
        var l = s(t, n, r);
        return "string" != typeof l || a || o[l] ? a ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
      }), u
    }

    var o = {}, a = e === Qt;
    return i(t.dataTypes[0]) || !o["*"] && i("*")
  }

  function U(e, t) {
    var n, r, i = pe.ajaxSettings.flatOptions || {};
    for (r in t) void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
    return n && pe.extend(!0, e, n), e
  }

  function Y(e, t, n) {
    for (var r, i, o, a, s = e.contents, u = e.dataTypes; "*" === u[0];) u.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
    if (i) for (a in s) if (s[a] && s[a].test(i)) {
      u.unshift(a);
      break
    }
    if (u[0] in n) o = u[0]; else {
      for (a in n) {
        if (!u[0] || e.converters[a + " " + u[0]]) {
          o = a;
          break
        }
        r || (r = a)
      }
      o = o || r
    }
    return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0
  }

  function V(e, t, n, r) {
    var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
    if (c[1]) for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
    for (o = c.shift(); o;) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u; else if ("*" !== u && u !== o) {
      if (a = l[u + " " + o] || l["* " + o], !a) for (i in l) if (s = i.split(" "), s[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
        a === !0 ? a = l[i] : l[i] !== !0 && (o = s[0], c.unshift(s[1]));
        break
      }
      if (a !== !0) if (a && e["throws"]) t = a(t); else try {
        t = a(t)
      } catch (f) {
        return {state: "parsererror", error: a ? f : "No conversion from " + u + " to " + o}
      }
    }
    return {state: "success", data: t}
  }

  function J(e) {
    return e.style && e.style.display || pe.css(e, "display")
  }

  function K(e) {
    for (; e && 1 === e.nodeType;) {
      if ("none" === J(e) || "hidden" === e.type) return !0;
      e = e.parentNode
    }
    return !1
  }

  function Q(e, t, n, r) {
    var i;
    if (pe.isArray(t)) pe.each(t, function (t, i) {
      n || rn.test(e) ? r(e, i) : Q(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
    }); else if (n || "object" !== pe.type(t)) r(e, t); else for (i in t) Q(e + "[" + i + "]", t[i], n, r)
  }

  function Z() {
    try {
      return new e.XMLHttpRequest
    } catch (t) {
    }
  }

  function ee() {
    try {
      return new e.ActiveXObject("Microsoft.XMLHTTP")
    } catch (t) {
    }
  }

  function te(e) {
    return pe.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
  }

  var ne = [], re = e.document, ie = ne.slice, oe = ne.concat, ae = ne.push, se = ne.indexOf, ue = {}, le = ue.toString,
    ce = ue.hasOwnProperty, fe = {}, de = "1.12.3", pe = function (e, t) {
      return new pe.fn.init(e, t)
    }, he = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ge = /^-ms-/, me = /-([\da-z])/gi, ve = function (e, t) {
      return t.toUpperCase()
    };
  pe.fn = pe.prototype = {
    jquery: de, constructor: pe, selector: "", length: 0, toArray: function () {
      return ie.call(this)
    }, get: function (e) {
      return null != e ? 0 > e ? this[e + this.length] : this[e] : ie.call(this)
    }, pushStack: function (e) {
      var t = pe.merge(this.constructor(), e);
      return t.prevObject = this, t.context = this.context, t
    }, each: function (e) {
      return pe.each(this, e)
    }, map: function (e) {
      return this.pushStack(pe.map(this, function (t, n) {
        return e.call(t, n, t)
      }))
    }, slice: function () {
      return this.pushStack(ie.apply(this, arguments))
    }, first: function () {
      return this.eq(0)
    }, last: function () {
      return this.eq(-1)
    }, eq: function (e) {
      var t = this.length, n = +e + (0 > e ? t : 0);
      return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
    }, end: function () {
      return this.prevObject || this.constructor()
    }, push: ae, sort: ne.sort, splice: ne.splice
  }, pe.extend = pe.fn.extend = function () {
    var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
    for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || pe.isFunction(a) || (a = {}), s === u && (a = this, s--); u > s; s++) if (null != (i = arguments[s])) for (r in i) e = a[r], n = i[r], a !== n && (l && n && (pe.isPlainObject(n) || (t = pe.isArray(n))) ? (t ? (t = !1, o = e && pe.isArray(e) ? e : []) : o = e && pe.isPlainObject(e) ? e : {}, a[r] = pe.extend(l, o, n)) : void 0 !== n && (a[r] = n));
    return a
  }, pe.extend({
    expando: "jQuery" + (de + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
      throw new Error(e)
    }, noop: function () {
    }, isFunction: function (e) {
      return "function" === pe.type(e)
    }, isArray: Array.isArray || function (e) {
      return "array" === pe.type(e)
    }, isWindow: function (e) {
      return null != e && e == e.window
    }, isNumeric: function (e) {
      var t = e && e.toString();
      return !pe.isArray(e) && t - parseFloat(t) + 1 >= 0
    }, isEmptyObject: function (e) {
      var t;
      for (t in e) return !1;
      return !0
    }, isPlainObject: function (e) {
      var t;
      if (!e || "object" !== pe.type(e) || e.nodeType || pe.isWindow(e)) return !1;
      try {
        if (e.constructor && !ce.call(e, "constructor") && !ce.call(e.constructor.prototype, "isPrototypeOf")) return !1
      } catch (n) {
        return !1
      }
      if (!fe.ownFirst) for (t in e) return ce.call(e, t);
      for (t in e) ;
      return void 0 === t || ce.call(e, t)
    }, type: function (e) {
      return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ue[le.call(e)] || "object" : typeof e
    }, globalEval: function (t) {
      t && pe.trim(t) && (e.execScript || function (t) {
        e.eval.call(e, t)
      })(t)
    }, camelCase: function (e) {
      return e.replace(ge, "ms-").replace(me, ve)
    }, nodeName: function (e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }, each: function (e, t) {
      var r, i = 0;
      if (n(e)) for (r = e.length; r > i && t.call(e[i], i, e[i]) !== !1; i++) ; else for (i in e) if (t.call(e[i], i, e[i]) === !1) break;
      return e
    }, trim: function (e) {
      return null == e ? "" : (e + "").replace(he, "")
    }, makeArray: function (e, t) {
      var r = t || [];
      return null != e && (n(Object(e)) ? pe.merge(r, "string" == typeof e ? [e] : e) : ae.call(r, e)), r
    }, inArray: function (e, t, n) {
      var r;
      if (t) {
        if (se) return se.call(t, e, n);
        for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) if (n in t && t[n] === e) return n
      }
      return -1
    }, merge: function (e, t) {
      for (var n = +t.length, r = 0, i = e.length; n > r;) e[i++] = t[r++];
      if (n !== n) for (; void 0 !== t[r];) e[i++] = t[r++];
      return e.length = i, e
    }, grep: function (e, t, n) {
      for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++) r = !t(e[o], o), r !== s && i.push(e[o]);
      return i
    }, map: function (e, t, r) {
      var i, o, a = 0, s = [];
      if (n(e)) for (i = e.length; i > a; a++) o = t(e[a], a, r), null != o && s.push(o); else for (a in e) o = t(e[a], a, r), null != o && s.push(o);
      return oe.apply([], s)
    }, guid: 1, proxy: function (e, t) {
      var n, r, i;
      return "string" == typeof t && (i = e[t], t = e, e = i), pe.isFunction(e) ? (n = ie.call(arguments, 2), r = function () {
        return e.apply(t || this, n.concat(ie.call(arguments)))
      }, r.guid = e.guid = e.guid || pe.guid++, r) : void 0
    }, now: function () {
      return +new Date
    }, support: fe
  }), "function" == typeof Symbol && (pe.fn[Symbol.iterator] = ne[Symbol.iterator]), pe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
    ue["[object " + t + "]"] = t.toLowerCase()
  });
  var ye = function (e) {
    function t(e, t, n, r) {
      var i, o, a, s, u, l, f, p, h = t && t.ownerDocument, g = t ? t.nodeType : 9;
      if (n = n || [], "string" != typeof e || !e || 1 !== g && 9 !== g && 11 !== g) return n;
      if (!r && ((t ? t.ownerDocument || t : I) !== _ && j(t), t = t || _, O)) {
        if (11 !== g && (l = ve.exec(e))) if (i = l[1]) {
          if (9 === g) {
            if (!(a = t.getElementById(i))) return n;
            if (a.id === i) return n.push(a), n
          } else if (h && (a = h.getElementById(i)) && M(t, a) && a.id === i) return n.push(a), n
        } else {
          if (l[2]) return Q.apply(n, t.getElementsByTagName(e)), n;
          if ((i = l[3]) && w.getElementsByClassName && t.getElementsByClassName) return Q.apply(n, t.getElementsByClassName(i)), n
        }
        if (w.qsa && !z[e + " "] && (!H || !H.test(e))) {
          if (1 !== g) h = t, p = e; else if ("object" !== t.nodeName.toLowerCase()) {
            for ((s = t.getAttribute("id")) ? s = s.replace(be, "\\$&") : t.setAttribute("id", s = $), f = k(e), o = f.length, u = de.test(s) ? "#" + s : "[id='" + s + "']"; o--;) f[o] = u + " " + d(f[o]);
            p = f.join(","), h = ye.test(e) && c(t.parentNode) || t
          }
          if (p) try {
            return Q.apply(n, h.querySelectorAll(p)), n
          } catch (m) {
          } finally {
            s === $ && t.removeAttribute("id")
          }
        }
      }
      return N(e.replace(se, "$1"), t, n, r)
    }

    function n() {
      function e(n, r) {
        return t.push(n + " ") > T.cacheLength && delete e[t.shift()], e[n + " "] = r
      }

      var t = [];
      return e
    }

    function r(e) {
      return e[$] = !0, e
    }

    function i(e) {
      var t = _.createElement("div");
      try {
        return !!e(t)
      } catch (n) {
        return !1
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null
      }
    }

    function o(e, t) {
      for (var n = e.split("|"), r = n.length; r--;) T.attrHandle[n[r]] = t
    }

    function a(e, t) {
      var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || U) - (~e.sourceIndex || U);
      if (r) return r;
      if (n) for (; n = n.nextSibling;) if (n === t) return -1;
      return e ? 1 : -1
    }

    function s(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();
        return "input" === n && t.type === e
      }
    }

    function u(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();
        return ("input" === n || "button" === n) && t.type === e
      }
    }

    function l(e) {
      return r(function (t) {
        return t = +t, r(function (n, r) {
          for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
        })
      })
    }

    function c(e) {
      return e && "undefined" != typeof e.getElementsByTagName && e
    }

    function f() {
    }

    function d(e) {
      for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
      return r
    }

    function p(e, t, n) {
      var r = t.dir, i = n && "parentNode" === r, o = F++;
      return t.first ? function (t, n, o) {
        for (; t = t[r];) if (1 === t.nodeType || i) return e(t, n, o)
      } : function (t, n, a) {
        var s, u, l, c = [R, o];
        if (a) {
          for (; t = t[r];) if ((1 === t.nodeType || i) && e(t, n, a)) return !0
        } else for (; t = t[r];) if (1 === t.nodeType || i) {
          if (l = t[$] || (t[$] = {}), u = l[t.uniqueID] || (l[t.uniqueID] = {}), (s = u[r]) && s[0] === R && s[1] === o) return c[2] = s[2];
          if (u[r] = c, c[2] = e(t, n, a)) return !0
        }
      }
    }

    function h(e) {
      return e.length > 1 ? function (t, n, r) {
        for (var i = e.length; i--;) if (!e[i](t, n, r)) return !1;
        return !0
      } : e[0]
    }

    function g(e, n, r) {
      for (var i = 0, o = n.length; o > i; i++) t(e, n[i], r);
      return r
    }

    function m(e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = null != t; u > s; s++) (o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
      return a
    }

    function v(e, t, n, i, o, a) {
      return i && !i[$] && (i = v(i)), o && !o[$] && (o = v(o, a)), r(function (r, a, s, u) {
        var l, c, f, d = [], p = [], h = a.length, v = r || g(t || "*", s.nodeType ? [s] : s, []),
          y = !e || !r && t ? v : m(v, d, e, s, u), b = n ? o || (r ? e : h || i) ? [] : a : y;
        if (n && n(y, b, s, u), i) for (l = m(b, p), i(l, [], s, u), c = l.length; c--;) (f = l[c]) && (b[p[c]] = !(y[p[c]] = f));
        if (r) {
          if (o || e) {
            if (o) {
              for (l = [], c = b.length; c--;) (f = b[c]) && l.push(y[c] = f);
              o(null, b = [], l, u)
            }
            for (c = b.length; c--;) (f = b[c]) && (l = o ? ee(r, f) : d[c]) > -1 && (r[l] = !(a[l] = f))
          }
        } else b = m(b === a ? b.splice(h, b.length) : b), o ? o(null, a, b, u) : Q.apply(a, b)
      })
    }

    function y(e) {
      for (var t, n, r, i = e.length, o = T.relative[e[0].type], a = o || T.relative[" "], s = o ? 1 : 0, u = p(function (e) {
        return e === t
      }, a, !0), l = p(function (e) {
        return ee(t, e) > -1
      }, a, !0), c = [function (e, n, r) {
        var i = !o && (r || n !== S) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
        return t = null, i
      }]; i > s; s++) if (n = T.relative[e[s].type]) c = [p(h(c), n)]; else {
        if (n = T.filter[e[s].type].apply(null, e[s].matches), n[$]) {
          for (r = ++s; i > r && !T.relative[e[r].type]; r++) ;
          return v(s > 1 && h(c), s > 1 && d(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(se, "$1"), n, r > s && y(e.slice(s, r)), i > r && y(e = e.slice(r)), i > r && d(e))
        }
        c.push(n)
      }
      return h(c)
    }

    function b(e, n) {
      var i = n.length > 0, o = e.length > 0, a = function (r, a, s, u, l) {
        var c, f, d, p = 0, h = "0", g = r && [], v = [], y = S, b = r || o && T.find.TAG("*", l),
          x = R += null == y ? 1 : Math.random() || .1, w = b.length;
        for (l && (S = a === _ || a || l); h !== w && null != (c = b[h]); h++) {
          if (o && c) {
            for (f = 0, a || c.ownerDocument === _ || (j(c), s = !O); d = e[f++];) if (d(c, a || _, s)) {
              u.push(c);
              break
            }
            l && (R = x)
          }
          i && ((c = !d && c) && p--, r && g.push(c))
        }
        if (p += h, i && h !== p) {
          for (f = 0; d = n[f++];) d(g, v, a, s);
          if (r) {
            if (p > 0) for (; h--;) g[h] || v[h] || (v[h] = J.call(u));
            v = m(v)
          }
          Q.apply(u, v), l && !r && v.length > 0 && p + n.length > 1 && t.uniqueSort(u)
        }
        return l && (R = x, S = y), g
      };
      return i ? r(a) : a
    }

    var x, w, T, C, E, k, A, N, S, D, L, j, _, P, O, H, B, q, M, $ = "sizzle" + 1 * new Date, I = e.document, R = 0,
      F = 0, W = n(), X = n(), z = n(), G = function (e, t) {
        return e === t && (L = !0), 0
      }, U = 1 << 31, Y = {}.hasOwnProperty, V = [], J = V.pop, K = V.push, Q = V.push, Z = V.slice,
      ee = function (e, t) {
        for (var n = 0, r = e.length; r > n; n++) if (e[n] === t) return n;
        return -1
      },
      te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      ne = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]",
      oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)",
      ae = new RegExp(ne + "+", "g"), se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
      ue = new RegExp("^" + ne + "*," + ne + "*"), le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
      ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"), fe = new RegExp(oe),
      de = new RegExp("^" + re + "$"), pe = {
        ID: new RegExp("^#(" + re + ")"),
        CLASS: new RegExp("^\\.(" + re + ")"),
        TAG: new RegExp("^(" + re + "|[*])"),
        ATTR: new RegExp("^" + ie),
        PSEUDO: new RegExp("^" + oe),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + te + ")$", "i"),
        needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
      }, he = /^(?:input|select|textarea|button)$/i, ge = /^h\d$/i, me = /^[^{]+\{\s*\[native \w/,
      ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ye = /[+~]/, be = /'|\\/g,
      xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"), we = function (e, t, n) {
        var r = "0x" + t - 65536;
        return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
      }, Te = function () {
        j()
      };
    try {
      Q.apply(V = Z.call(I.childNodes), I.childNodes), V[I.childNodes.length].nodeType
    } catch (Ce) {
      Q = {
        apply: V.length ? function (e, t) {
          K.apply(e, Z.call(t))
        } : function (e, t) {
          for (var n = e.length, r = 0; e[n++] = t[r++];) ;
          e.length = n - 1
        }
      }
    }
    w = t.support = {}, E = t.isXML = function (e) {
      var t = e && (e.ownerDocument || e).documentElement;
      return !!t && "HTML" !== t.nodeName
    }, j = t.setDocument = function (e) {
      var t, n, r = e ? e.ownerDocument || e : I;
      return r !== _ && 9 === r.nodeType && r.documentElement ? (_ = r, P = _.documentElement, O = !E(_), (n = _.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Te, !1) : n.attachEvent && n.attachEvent("onunload", Te)), w.attributes = i(function (e) {
        return e.className = "i", !e.getAttribute("className")
      }), w.getElementsByTagName = i(function (e) {
        return e.appendChild(_.createComment("")), !e.getElementsByTagName("*").length
      }), w.getElementsByClassName = me.test(_.getElementsByClassName), w.getById = i(function (e) {
        return P.appendChild(e).id = $, !_.getElementsByName || !_.getElementsByName($).length
      }), w.getById ? (T.find.ID = function (e, t) {
        if ("undefined" != typeof t.getElementById && O) {
          var n = t.getElementById(e);
          return n ? [n] : []
        }
      }, T.filter.ID = function (e) {
        var t = e.replace(xe, we);
        return function (e) {
          return e.getAttribute("id") === t
        }
      }) : (delete T.find.ID, T.filter.ID = function (e) {
        var t = e.replace(xe, we);
        return function (e) {
          var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
          return n && n.value === t
        }
      }), T.find.TAG = w.getElementsByTagName ? function (e, t) {
        return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
      } : function (e, t) {
        var n, r = [], i = 0, o = t.getElementsByTagName(e);
        if ("*" === e) {
          for (; n = o[i++];) 1 === n.nodeType && r.push(n);
          return r
        }
        return o
      }, T.find.CLASS = w.getElementsByClassName && function (e, t) {
        return "undefined" != typeof t.getElementsByClassName && O ? t.getElementsByClassName(e) : void 0
      }, B = [], H = [], (w.qsa = me.test(_.querySelectorAll)) && (i(function (e) {
        P.appendChild(e).innerHTML = "<a id='" + $ + "'></a><select id='" + $ + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && H.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || H.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + $ + "-]").length || H.push("~="), e.querySelectorAll(":checked").length || H.push(":checked"), e.querySelectorAll("a#" + $ + "+*").length || H.push(".#.+[+~]")
      }), i(function (e) {
        var t = _.createElement("input");
        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && H.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), H.push(",.*:")
      })), (w.matchesSelector = me.test(q = P.matches || P.webkitMatchesSelector || P.mozMatchesSelector || P.oMatchesSelector || P.msMatchesSelector)) && i(function (e) {
        w.disconnectedMatch = q.call(e, "div"), q.call(e, "[s!='']:x"), B.push("!=", oe)
      }), H = H.length && new RegExp(H.join("|")), B = B.length && new RegExp(B.join("|")), t = me.test(P.compareDocumentPosition), M = t || me.test(P.contains) ? function (e, t) {
        var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
      } : function (e, t) {
        if (t) for (; t = t.parentNode;) if (t === e) return !0;
        return !1
      }, G = t ? function (e, t) {
        if (e === t) return L = !0, 0;
        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === _ || e.ownerDocument === I && M(I, e) ? -1 : t === _ || t.ownerDocument === I && M(I, t) ? 1 : D ? ee(D, e) - ee(D, t) : 0 : 4 & n ? -1 : 1)
      } : function (e, t) {
        if (e === t) return L = !0, 0;
        var n, r = 0, i = e.parentNode, o = t.parentNode, s = [e], u = [t];
        if (!i || !o) return e === _ ? -1 : t === _ ? 1 : i ? -1 : o ? 1 : D ? ee(D, e) - ee(D, t) : 0;
        if (i === o) return a(e, t);
        for (n = e; n = n.parentNode;) s.unshift(n);
        for (n = t; n = n.parentNode;) u.unshift(n);
        for (; s[r] === u[r];) r++;
        return r ? a(s[r], u[r]) : s[r] === I ? -1 : u[r] === I ? 1 : 0
      }, _) : _
    }, t.matches = function (e, n) {
      return t(e, null, null, n)
    }, t.matchesSelector = function (e, n) {
      if ((e.ownerDocument || e) !== _ && j(e), n = n.replace(ce, "='$1']"), w.matchesSelector && O && !z[n + " "] && (!B || !B.test(n)) && (!H || !H.test(n))) try {
        var r = q.call(e, n);
        if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
      } catch (i) {
      }
      return t(n, _, null, [e]).length > 0
    }, t.contains = function (e, t) {
      return (e.ownerDocument || e) !== _ && j(e), M(e, t)
    }, t.attr = function (e, t) {
      (e.ownerDocument || e) !== _ && j(e);
      var n = T.attrHandle[t.toLowerCase()], r = n && Y.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !O) : void 0;
      return void 0 !== r ? r : w.attributes || !O ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
    }, t.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e)
    }, t.uniqueSort = function (e) {
      var t, n = [], r = 0, i = 0;
      if (L = !w.detectDuplicates, D = !w.sortStable && e.slice(0), e.sort(G), L) {
        for (; t = e[i++];) t === e[i] && (r = n.push(i));
        for (; r--;) e.splice(n[r], 1)
      }
      return D = null, e
    }, C = t.getText = function (e) {
      var t, n = "", r = 0, i = e.nodeType;
      if (i) {
        if (1 === i || 9 === i || 11 === i) {
          if ("string" == typeof e.textContent) return e.textContent;
          for (e = e.firstChild; e; e = e.nextSibling) n += C(e)
        } else if (3 === i || 4 === i) return e.nodeValue
      } else for (; t = e[r++];) n += C(t);
      return n
    }, T = t.selectors = {
      cacheLength: 50,
      createPseudo: r,
      match: pe,
      attrHandle: {},
      find: {},
      relative: {
        ">": {dir: "parentNode", first: !0},
        " ": {dir: "parentNode"},
        "+": {dir: "previousSibling", first: !0},
        "~": {dir: "previousSibling"}
      },
      preFilter: {
        ATTR: function (e) {
          return e[1] = e[1].replace(xe, we), e[3] = (e[3] || e[4] || e[5] || "").replace(xe, we), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
        }, CHILD: function (e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
        }, PSEUDO: function (e) {
          var t, n = !e[6] && e[2];
          return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && fe.test(n) && (t = k(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
        }
      },
      filter: {
        TAG: function (e) {
          var t = e.replace(xe, we).toLowerCase();
          return "*" === e ? function () {
            return !0
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t
          }
        }, CLASS: function (e) {
          var t = W[e + " "];
          return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && W(e, function (e) {
            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
          })
        }, ATTR: function (e, n, r) {
          return function (i) {
            var o = t.attr(i, e);
            return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
          }
        }, CHILD: function (e, t, n, r, i) {
          var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
          return 1 === r && 0 === i ? function (e) {
            return !!e.parentNode
          } : function (t, n, u) {
            var l, c, f, d, p, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode,
              v = s && t.nodeName.toLowerCase(), y = !u && !s, b = !1;
            if (m) {
              if (o) {
                for (; g;) {
                  for (d = t; d = d[g];) if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                  h = g = "only" === e && !h && "nextSibling"
                }
                return !0
              }
              if (h = [a ? m.firstChild : m.lastChild], a && y) {
                for (d = m, f = d[$] || (d[$] = {}), c = f[d.uniqueID] || (f[d.uniqueID] = {}), l = c[e] || [], p = l[0] === R && l[1], b = p && l[2], d = p && m.childNodes[p]; d = ++p && d && d[g] || (b = p = 0) || h.pop();) if (1 === d.nodeType && ++b && d === t) {
                  c[e] = [R, p, b];
                  break
                }
              } else if (y && (d = t, f = d[$] || (d[$] = {}), c = f[d.uniqueID] || (f[d.uniqueID] = {}), l = c[e] || [], p = l[0] === R && l[1], b = p), b === !1) for (; (d = ++p && d && d[g] || (b = p = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++b || (y && (f = d[$] || (d[$] = {}), c = f[d.uniqueID] || (f[d.uniqueID] = {}), c[e] = [R, b]), d !== t));) ;
              return b -= i, b === r || b % r === 0 && b / r >= 0
            }
          }
        }, PSEUDO: function (e, n) {
          var i, o = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
          return o[$] ? o(n) : o.length > 1 ? (i = [e, e, "", n], T.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
            for (var r, i = o(e, n), a = i.length; a--;) r = ee(e, i[a]), e[r] = !(t[r] = i[a])
          }) : function (e) {
            return o(e, 0, i)
          }) : o
        }
      },
      pseudos: {
        not: r(function (e) {
          var t = [], n = [], i = A(e.replace(se, "$1"));
          return i[$] ? r(function (e, t, n, r) {
            for (var o, a = i(e, null, r, []), s = e.length; s--;) (o = a[s]) && (e[s] = !(t[s] = o))
          }) : function (e, r, o) {
            return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
          }
        }), has: r(function (e) {
          return function (n) {
            return t(e, n).length > 0
          }
        }), contains: r(function (e) {
          return e = e.replace(xe, we), function (t) {
            return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
          }
        }), lang: r(function (e) {
          return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(xe, we).toLowerCase(), function (t) {
            var n;
            do if (n = O ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
            return !1
          }
        }), target: function (t) {
          var n = e.location && e.location.hash;
          return n && n.slice(1) === t.id
        }, root: function (e) {
          return e === P
        }, focus: function (e) {
          return e === _.activeElement && (!_.hasFocus || _.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        }, enabled: function (e) {
          return e.disabled === !1
        }, disabled: function (e) {
          return e.disabled === !0
        }, checked: function (e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && !!e.checked || "option" === t && !!e.selected
        }, selected: function (e) {
          return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
        }, empty: function (e) {
          for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
          return !0
        }, parent: function (e) {
          return !T.pseudos.empty(e)
        }, header: function (e) {
          return ge.test(e.nodeName)
        }, input: function (e) {
          return he.test(e.nodeName)
        }, button: function (e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && "button" === e.type || "button" === t
        }, text: function (e) {
          var t;
          return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
        }, first: l(function () {
          return [0]
        }), last: l(function (e, t) {
          return [t - 1]
        }), eq: l(function (e, t, n) {
          return [0 > n ? n + t : n]
        }), even: l(function (e, t) {
          for (var n = 0; t > n; n += 2) e.push(n);
          return e
        }), odd: l(function (e, t) {
          for (var n = 1; t > n; n += 2) e.push(n);
          return e
        }), lt: l(function (e, t, n) {
          for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
          return e
        }), gt: l(function (e, t, n) {
          for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
          return e
        })
      }
    }, T.pseudos.nth = T.pseudos.eq;
    for (x in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) T.pseudos[x] = s(x);
    for (x in{submit: !0, reset: !0}) T.pseudos[x] = u(x);
    return f.prototype = T.filters = T.pseudos, T.setFilters = new f, k = t.tokenize = function (e, n) {
      var r, i, o, a, s, u, l, c = X[e + " "];
      if (c) return n ? 0 : c.slice(0);
      for (s = e, u = [], l = T.preFilter; s;) {
        r && !(i = ue.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), r = !1, (i = le.exec(s)) && (r = i.shift(), o.push({
          value: r,
          type: i[0].replace(se, " ")
        }), s = s.slice(r.length));
        for (a in T.filter) !(i = pe[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(), o.push({
          value: r,
          type: a,
          matches: i
        }), s = s.slice(r.length));
        if (!r) break
      }
      return n ? s.length : s ? t.error(e) : X(e, u).slice(0)
    }, A = t.compile = function (e, t) {
      var n, r = [], i = [], o = z[e + " "];
      if (!o) {
        for (t || (t = k(e)), n = t.length; n--;) o = y(t[n]), o[$] ? r.push(o) : i.push(o);
        o = z(e, b(i, r)), o.selector = e
      }
      return o
    }, N = t.select = function (e, t, n, r) {
      var i, o, a, s, u, l = "function" == typeof e && e, f = !r && k(e = l.selector || e);
      if (n = n || [], 1 === f.length) {
        if (o = f[0] = f[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && O && T.relative[o[1].type]) {
          if (t = (T.find.ID(a.matches[0].replace(xe, we), t) || [])[0], !t) return n;
          l && (t = t.parentNode), e = e.slice(o.shift().value.length)
        }
        for (i = pe.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !T.relative[s = a.type]);) if ((u = T.find[s]) && (r = u(a.matches[0].replace(xe, we), ye.test(o[0].type) && c(t.parentNode) || t))) {
          if (o.splice(i, 1), e = r.length && d(o), !e) return Q.apply(n, r), n;
          break
        }
      }
      return (l || A(e, f))(r, t, !O, n, !t || ye.test(e) && c(t.parentNode) || t), n
    }, w.sortStable = $.split("").sort(G).join("") === $, w.detectDuplicates = !!L, j(), w.sortDetached = i(function (e) {
      return 1 & e.compareDocumentPosition(_.createElement("div"))
    }), i(function (e) {
      return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
    }) || o("type|href|height|width", function (e, t, n) {
      return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
    }), w.attributes && i(function (e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
    }) || o("value", function (e, t, n) {
      return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
    }), i(function (e) {
      return null == e.getAttribute("disabled")
    }) || o(te, function (e, t, n) {
      var r;
      return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
    }), t
  }(e);
  pe.find = ye, pe.expr = ye.selectors, pe.expr[":"] = pe.expr.pseudos, pe.uniqueSort = pe.unique = ye.uniqueSort, pe.text = ye.getText, pe.isXMLDoc = ye.isXML, pe.contains = ye.contains;
  var be = function (e, t, n) {
    for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;) if (1 === e.nodeType) {
      if (i && pe(e).is(n)) break;
      r.push(e)
    }
    return r
  }, xe = function (e, t) {
    for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
    return n
  }, we = pe.expr.match.needsContext, Te = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, Ce = /^.[^:#\[\.,]*$/;
  pe.filter = function (e, t, n) {
    var r = t[0];
    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? pe.find.matchesSelector(r, e) ? [r] : [] : pe.find.matches(e, pe.grep(t, function (e) {
      return 1 === e.nodeType
    }))
  }, pe.fn.extend({
    find: function (e) {
      var t, n = [], r = this, i = r.length;
      if ("string" != typeof e) return this.pushStack(pe(e).filter(function () {
        for (t = 0; i > t; t++) if (pe.contains(r[t], this)) return !0
      }));
      for (t = 0; i > t; t++) pe.find(e, r[t], n);
      return n = this.pushStack(i > 1 ? pe.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
    }, filter: function (e) {
      return this.pushStack(r(this, e || [], !1))
    }, not: function (e) {
      return this.pushStack(r(this, e || [], !0))
    }, is: function (e) {
      return !!r(this, "string" == typeof e && we.test(e) ? pe(e) : e || [], !1).length
    }
  });
  var Ee, ke = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, Ae = pe.fn.init = function (e, t, n) {
    var r, i;
    if (!e) return this;
    if (n = n || Ee, "string" == typeof e) {
      if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ke.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
      if (r[1]) {
        if (t = t instanceof pe ? t[0] : t, pe.merge(this, pe.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : re, !0)), Te.test(r[1]) && pe.isPlainObject(t)) for (r in t) pe.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
        return this
      }
      if (i = re.getElementById(r[2]), i && i.parentNode) {
        if (i.id !== r[2]) return Ee.find(e);
        this.length = 1, this[0] = i
      }
      return this.context = re, this.selector = e, this
    }
    return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : pe.isFunction(e) ? "undefined" != typeof n.ready ? n.ready(e) : e(pe) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), pe.makeArray(e, this))
  };
  Ae.prototype = pe.fn, Ee = pe(re);
  var Ne = /^(?:parents|prev(?:Until|All))/, Se = {children: !0, contents: !0, next: !0, prev: !0};
  pe.fn.extend({
    has: function (e) {
      var t, n = pe(e, this), r = n.length;
      return this.filter(function () {
        for (t = 0; r > t; t++) if (pe.contains(this, n[t])) return !0
      })
    }, closest: function (e, t) {
      for (var n, r = 0, i = this.length, o = [], a = we.test(e) || "string" != typeof e ? pe(e, t || this.context) : 0; i > r; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && pe.find.matchesSelector(n, e))) {
        o.push(n);
        break
      }
      return this.pushStack(o.length > 1 ? pe.uniqueSort(o) : o)
    }, index: function (e) {
      return e ? "string" == typeof e ? pe.inArray(this[0], pe(e)) : pe.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    }, add: function (e, t) {
      return this.pushStack(pe.uniqueSort(pe.merge(this.get(), pe(e, t))))
    }, addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
  }), pe.each({
    parent: function (e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null
    }, parents: function (e) {
      return be(e, "parentNode")
    }, parentsUntil: function (e, t, n) {
      return be(e, "parentNode", n)
    }, next: function (e) {
      return i(e, "nextSibling")
    }, prev: function (e) {
      return i(e, "previousSibling")
    }, nextAll: function (e) {
      return be(e, "nextSibling")
    }, prevAll: function (e) {
      return be(e, "previousSibling")
    }, nextUntil: function (e, t, n) {
      return be(e, "nextSibling", n)
    }, prevUntil: function (e, t, n) {
      return be(e, "previousSibling", n)
    }, siblings: function (e) {
      return xe((e.parentNode || {}).firstChild, e)
    }, children: function (e) {
      return xe(e.firstChild)
    }, contents: function (e) {
      return pe.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : pe.merge([], e.childNodes)
    }
  }, function (e, t) {
    pe.fn[e] = function (n, r) {
      var i = pe.map(this, t, n);
      return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = pe.filter(r, i)), this.length > 1 && (Se[e] || (i = pe.uniqueSort(i)), Ne.test(e) && (i = i.reverse())), this.pushStack(i)
    }
  });
  var De = /\S+/g;
  pe.Callbacks = function (e) {
    e = "string" == typeof e ? o(e) : pe.extend({}, e);
    var t, n, r, i, a = [], s = [], u = -1, l = function () {
      for (i = e.once, r = t = !0; s.length; u = -1) for (n = s.shift(); ++u < a.length;) a[u].apply(n[0], n[1]) === !1 && e.stopOnFalse && (u = a.length, n = !1);
      e.memory || (n = !1), t = !1, i && (a = n ? [] : "")
    }, c = {
      add: function () {
        return a && (n && !t && (u = a.length - 1, s.push(n)), function r(t) {
          pe.each(t, function (t, n) {
            pe.isFunction(n) ? e.unique && c.has(n) || a.push(n) : n && n.length && "string" !== pe.type(n) && r(n)
          })
        }(arguments), n && !t && l()), this
      }, remove: function () {
        return pe.each(arguments, function (e, t) {
          for (var n; (n = pe.inArray(t, a, n)) > -1;) a.splice(n, 1), u >= n && u--
        }), this
      }, has: function (e) {
        return e ? pe.inArray(e, a) > -1 : a.length > 0
      }, empty: function () {
        return a && (a = []), this
      }, disable: function () {
        return i = s = [], a = n = "", this
      }, disabled: function () {
        return !a
      }, lock: function () {
        return i = !0, n || c.disable(), this
      }, locked: function () {
        return !!i
      }, fireWith: function (e, n) {
        return i || (n = n || [], n = [e, n.slice ? n.slice() : n], s.push(n), t || l()), this
      }, fire: function () {
        return c.fireWith(this, arguments), this
      }, fired: function () {
        return !!r
      }
    };
    return c
  }, pe.extend({
    Deferred: function (e) {
      var t = [["resolve", "done", pe.Callbacks("once memory"), "resolved"], ["reject", "fail", pe.Callbacks("once memory"), "rejected"], ["notify", "progress", pe.Callbacks("memory")]],
        n = "pending", r = {
          state: function () {
            return n
          }, always: function () {
            return i.done(arguments).fail(arguments), this
          }, then: function () {
            var e = arguments;
            return pe.Deferred(function (n) {
              pe.each(t, function (t, o) {
                var a = pe.isFunction(e[t]) && e[t];
                i[o[1]](function () {
                  var e = a && a.apply(this, arguments);
                  e && pe.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                })
              }), e = null
            }).promise()
          }, promise: function (e) {
            return null != e ? pe.extend(e, r) : r
          }
        }, i = {};
      return r.pipe = r.then, pe.each(t, function (e, o) {
        var a = o[2], s = o[3];
        r[o[1]] = a.add, s && a.add(function () {
          n = s
        }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
          return i[o[0] + "With"](this === i ? r : this, arguments), this
        }, i[o[0] + "With"] = a.fireWith
      }), r.promise(i), e && e.call(i, i), i
    }, when: function (e) {
      var t, n, r, i = 0, o = ie.call(arguments), a = o.length, s = 1 !== a || e && pe.isFunction(e.promise) ? a : 0,
        u = 1 === s ? e : pe.Deferred(), l = function (e, n, r) {
          return function (i) {
            n[e] = this, r[e] = arguments.length > 1 ? ie.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
          }
        };
      if (a > 1) for (t = new Array(a), n = new Array(a), r = new Array(a); a > i; i++) o[i] && pe.isFunction(o[i].promise) ? o[i].promise().progress(l(i, n, t)).done(l(i, r, o)).fail(u.reject) : --s;
      return s || u.resolveWith(r, o), u.promise()
    }
  });
  var Le;
  pe.fn.ready = function (e) {
    return pe.ready.promise().done(e), this
  }, pe.extend({
    isReady: !1, readyWait: 1, holdReady: function (e) {
      e ? pe.readyWait++ : pe.ready(!0)
    }, ready: function (e) {
      (e === !0 ? --pe.readyWait : pe.isReady) || (pe.isReady = !0, e !== !0 && --pe.readyWait > 0 || (Le.resolveWith(re, [pe]), pe.fn.triggerHandler && (pe(re).triggerHandler("ready"), pe(re).off("ready"))))
    }
  }), pe.ready.promise = function (t) {
    if (!Le) if (Le = pe.Deferred(), "complete" === re.readyState || "loading" !== re.readyState && !re.documentElement.doScroll) e.setTimeout(pe.ready); else if (re.addEventListener) re.addEventListener("DOMContentLoaded", s), e.addEventListener("load", s); else {
      re.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
      var n = !1;
      try {
        n = null == e.frameElement && re.documentElement
      } catch (r) {
      }
      n && n.doScroll && !function i() {
        if (!pe.isReady) {
          try {
            n.doScroll("left")
          } catch (t) {
            return e.setTimeout(i, 50)
          }
          a(), pe.ready()
        }
      }()
    }
    return Le.promise(t)
  }, pe.ready.promise();
  var je;
  for (je in pe(fe)) break;
  fe.ownFirst = "0" === je, fe.inlineBlockNeedsLayout = !1, pe(function () {
    var e, t, n, r;
    n = re.getElementsByTagName("body")[0], n && n.style && (t = re.createElement("div"), r = re.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", fe.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(r))
  }), function () {
    var e = re.createElement("div");
    fe.deleteExpando = !0;
    try {
      delete e.test
    } catch (t) {
      fe.deleteExpando = !1
    }
    e = null
  }();
  var _e = function (e) {
    var t = pe.noData[(e.nodeName + " ").toLowerCase()], n = +e.nodeType || 1;
    return (1 === n || 9 === n) && (!t || t !== !0 && e.getAttribute("classid") === t)
  }, Pe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Oe = /([A-Z])/g;
  pe.extend({
    cache: {},
    noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
    hasData: function (e) {
      return e = e.nodeType ? pe.cache[e[pe.expando]] : e[pe.expando], !!e && !l(e)
    },
    data: function (e, t, n) {
      return c(e, t, n)
    },
    removeData: function (e, t) {
      return f(e, t)
    },
    _data: function (e, t, n) {
      return c(e, t, n, !0)
    },
    _removeData: function (e, t) {
      return f(e, t, !0)
    }
  }), pe.fn.extend({
    data: function (e, t) {
      var n, r, i, o = this[0], a = o && o.attributes;
      if (void 0 === e) {
        if (this.length && (i = pe.data(o), 1 === o.nodeType && !pe._data(o, "parsedAttrs"))) {
          for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = pe.camelCase(r.slice(5)), u(o, r, i[r])));
          pe._data(o, "parsedAttrs", !0)
        }
        return i
      }
      return "object" == typeof e ? this.each(function () {
        pe.data(this, e)
      }) : arguments.length > 1 ? this.each(function () {
        pe.data(this, e, t)
      }) : o ? u(o, e, pe.data(o, e)) : void 0
    }, removeData: function (e) {
      return this.each(function () {
        pe.removeData(this, e)
      })
    }
  }), pe.extend({
    queue: function (e, t, n) {
      var r;
      return e ? (t = (t || "fx") + "queue", r = pe._data(e, t), n && (!r || pe.isArray(n) ? r = pe._data(e, t, pe.makeArray(n)) : r.push(n)), r || []) : void 0
    }, dequeue: function (e, t) {
      t = t || "fx";
      var n = pe.queue(e, t), r = n.length, i = n.shift(), o = pe._queueHooks(e, t), a = function () {
        pe.dequeue(e, t)
      };
      "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
    }, _queueHooks: function (e, t) {
      var n = t + "queueHooks";
      return pe._data(e, n) || pe._data(e, n, {
        empty: pe.Callbacks("once memory").add(function () {
          pe._removeData(e, t + "queue"), pe._removeData(e, n)
        })
      })
    }
  }), pe.fn.extend({
    queue: function (e, t) {
      var n = 2;
      return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? pe.queue(this[0], e) : void 0 === t ? this : this.each(function () {
        var n = pe.queue(this, e, t);
        pe._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && pe.dequeue(this, e)
      })
    }, dequeue: function (e) {
      return this.each(function () {
        pe.dequeue(this, e)
      })
    }, clearQueue: function (e) {
      return this.queue(e || "fx", [])
    }, promise: function (e, t) {
      var n, r = 1, i = pe.Deferred(), o = this, a = this.length, s = function () {
        --r || i.resolveWith(o, [o])
      };
      for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = pe._data(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
      return s(), i.promise(t)
    }
  }), function () {
    var e;
    fe.shrinkWrapBlocks = function () {
      if (null != e) return e;
      e = !1;
      var t, n, r;
      return n = re.getElementsByTagName("body")[0], n && n.style ? (t = re.createElement("div"), r = re.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(re.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(r), e) : void 0
    }
  }();
  var He = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Be = new RegExp("^(?:([+-])=|)(" + He + ")([a-z%]*)$", "i"),
    qe = ["Top", "Right", "Bottom", "Left"], Me = function (e, t) {
      return e = t || e, "none" === pe.css(e, "display") || !pe.contains(e.ownerDocument, e)
    }, $e = function (e, t, n, r, i, o, a) {
      var s = 0, u = e.length, l = null == n;
      if ("object" === pe.type(n)) {
        i = !0;
        for (s in n) $e(e, t, s, n[s], !0, o, a)
      } else if (void 0 !== r && (i = !0, pe.isFunction(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
        return l.call(pe(e), n)
      })), t)) for (; u > s; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
      return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
    }, Ie = /^(?:checkbox|radio)$/i, Re = /<([\w:-]+)/, Fe = /^$|\/(?:java|ecma)script/i, We = /^\s+/,
    Xe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
  !function () {
    var e = re.createElement("div"), t = re.createDocumentFragment(), n = re.createElement("input");
    e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", fe.leadingWhitespace = 3 === e.firstChild.nodeType, fe.tbody = !e.getElementsByTagName("tbody").length, fe.htmlSerialize = !!e.getElementsByTagName("link").length, fe.html5Clone = "<:nav></:nav>" !== re.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, t.appendChild(n), fe.appendChecked = n.checked, e.innerHTML = "<textarea>x</textarea>", fe.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, t.appendChild(e), n = re.createElement("input"), n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), e.appendChild(n), fe.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, fe.noCloneEvent = !!e.addEventListener, e[pe.expando] = 1, fe.attributes = !e.getAttribute(pe.expando)
  }();
  var ze = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    legend: [1, "<fieldset>", "</fieldset>"],
    area: [1, "<map>", "</map>"],
    param: [1, "<object>", "</object>"],
    thead: [1, "<table>", "</table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: fe.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
  };
  ze.optgroup = ze.option, ze.tbody = ze.tfoot = ze.colgroup = ze.caption = ze.thead, ze.th = ze.td;
  var Ge = /<|&#?\w+;/, Ue = /<tbody/i;
  !function () {
    var t, n, r = re.createElement("div");
    for (t in{
      submit: !0,
      change: !0,
      focusin: !0
    }) n = "on" + t, (fe[t] = n in e) || (r.setAttribute(n, "t"), fe[t] = r.attributes[n].expando === !1);
    r = null
  }();
  var Ye = /^(?:input|select|textarea)$/i, Ve = /^key/, Je = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    Ke = /^(?:focusinfocus|focusoutblur)$/, Qe = /^([^.]*)(?:\.(.+)|)/;
  pe.event = {
    global: {},
    add: function (e, t, n, r, i) {
      var o, a, s, u, l, c, f, d, p, h, g, m = pe._data(e);
      if (m) {
        for (n.handler && (u = n, n = u.handler, i = u.selector), n.guid || (n.guid = pe.guid++), (a = m.events) || (a = m.events = {}), (c = m.handle) || (c = m.handle = function (e) {
          return "undefined" == typeof pe || e && pe.event.triggered === e.type ? void 0 : pe.event.dispatch.apply(c.elem, arguments)
        }, c.elem = e), t = (t || "").match(De) || [""], s = t.length; s--;) o = Qe.exec(t[s]) || [], p = g = o[1], h = (o[2] || "").split(".").sort(), p && (l = pe.event.special[p] || {}, p = (i ? l.delegateType : l.bindType) || p, l = pe.event.special[p] || {}, f = pe.extend({
          type: p,
          origType: g,
          data: r,
          handler: n,
          guid: n.guid,
          selector: i,
          needsContext: i && pe.expr.match.needsContext.test(i),
          namespace: h.join(".")
        }, u), (d = a[p]) || (d = a[p] = [], d.delegateCount = 0, l.setup && l.setup.call(e, r, h, c) !== !1 || (e.addEventListener ? e.addEventListener(p, c, !1) : e.attachEvent && e.attachEvent("on" + p, c))), l.add && (l.add.call(e, f), f.handler.guid || (f.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, f) : d.push(f), pe.event.global[p] = !0);
        e = null
      }
    },
    remove: function (e, t, n, r, i) {
      var o, a, s, u, l, c, f, d, p, h, g, m = pe.hasData(e) && pe._data(e);
      if (m && (c = m.events)) {
        for (t = (t || "").match(De) || [""], l = t.length; l--;) if (s = Qe.exec(t[l]) || [], p = g = s[1], h = (s[2] || "").split(".").sort(), p) {
          for (f = pe.event.special[p] || {}, p = (r ? f.delegateType : f.bindType) || p, d = c[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = d.length; o--;) a = d[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (d.splice(o, 1), a.selector && d.delegateCount--, f.remove && f.remove.call(e, a));
          u && !d.length && (f.teardown && f.teardown.call(e, h, m.handle) !== !1 || pe.removeEvent(e, p, m.handle), delete c[p])
        } else for (p in c) pe.event.remove(e, p + t[l], n, r, !0);
        pe.isEmptyObject(c) && (delete m.handle, pe._removeData(e, "events"))
      }
    },
    trigger: function (t, n, r, i) {
      var o, a, s, u, l, c, f, d = [r || re], p = ce.call(t, "type") ? t.type : t,
        h = ce.call(t, "namespace") ? t.namespace.split(".") : [];
      if (s = c = r = r || re, 3 !== r.nodeType && 8 !== r.nodeType && !Ke.test(p + pe.event.triggered) && (p.indexOf(".") > -1 && (h = p.split("."), p = h.shift(), h.sort()), a = p.indexOf(":") < 0 && "on" + p, t = t[pe.expando] ? t : new pe.Event(p, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : pe.makeArray(n, [t]), l = pe.event.special[p] || {}, i || !l.trigger || l.trigger.apply(r, n) !== !1)) {
        if (!i && !l.noBubble && !pe.isWindow(r)) {
          for (u = l.delegateType || p, Ke.test(u + p) || (s = s.parentNode); s; s = s.parentNode) d.push(s), c = s;
          c === (r.ownerDocument || re) && d.push(c.defaultView || c.parentWindow || e)
        }
        for (f = 0; (s = d[f++]) && !t.isPropagationStopped();) t.type = f > 1 ? u : l.bindType || p, o = (pe._data(s, "events") || {})[t.type] && pe._data(s, "handle"), o && o.apply(s, n), o = a && s[a], o && o.apply && _e(s) && (t.result = o.apply(s, n), t.result === !1 && t.preventDefault());
        if (t.type = p, !i && !t.isDefaultPrevented() && (!l._default || l._default.apply(d.pop(), n) === !1) && _e(r) && a && r[p] && !pe.isWindow(r)) {
          c = r[a], c && (r[a] = null), pe.event.triggered = p;
          try {
            r[p]()
          } catch (g) {
          }
          pe.event.triggered = void 0, c && (r[a] = c)
        }
        return t.result
      }
    },
    dispatch: function (e) {
      e = pe.event.fix(e);
      var t, n, r, i, o, a = [], s = ie.call(arguments), u = (pe._data(this, "events") || {})[e.type] || [],
        l = pe.event.special[e.type] || {};
      if (s[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
        for (a = pe.event.handlers.call(this, e, u), t = 0; (i = a[t++]) && !e.isPropagationStopped();) for (e.currentTarget = i.elem, n = 0; (o = i.handlers[n++]) && !e.isImmediatePropagationStopped();) e.rnamespace && !e.rnamespace.test(o.namespace) || (e.handleObj = o, e.data = o.data, r = ((pe.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
        return l.postDispatch && l.postDispatch.call(this, e), e.result
      }
    },
    handlers: function (e, t) {
      var n, r, i, o, a = [], s = t.delegateCount, u = e.target;
      if (s && u.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1)) for (; u != this; u = u.parentNode || this) if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
        for (r = [], n = 0; s > n; n++) o = t[n], i = o.selector + " ", void 0 === r[i] && (r[i] = o.needsContext ? pe(i, this).index(u) > -1 : pe.find(i, this, null, [u]).length), r[i] && r.push(o);
        r.length && a.push({elem: u, handlers: r})
      }
      return s < t.length && a.push({elem: this, handlers: t.slice(s)}), a
    },
    fix: function (e) {
      if (e[pe.expando]) return e;
      var t, n, r, i = e.type, o = e, a = this.fixHooks[i];
      for (a || (this.fixHooks[i] = a = Je.test(i) ? this.mouseHooks : Ve.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new pe.Event(o), t = r.length; t--;) n = r[t], e[n] = o[n];
      return e.target || (e.target = o.srcElement || re), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "), filter: function (e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function (e, t) {
        var n, r, i, o = t.button, a = t.fromElement;
        return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || re, i = r.documentElement, n = r.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
      }
    },
    special: {
      load: {noBubble: !0}, focus: {
        trigger: function () {
          if (this !== x() && this.focus) try {
            return this.focus(), !1
          } catch (e) {
          }
        }, delegateType: "focusin"
      }, blur: {
        trigger: function () {
          return this === x() && this.blur ? (this.blur(), !1) : void 0
        }, delegateType: "focusout"
      }, click: {
        trigger: function () {
          return pe.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
        }, _default: function (e) {
          return pe.nodeName(e.target, "a")
        }
      }, beforeunload: {
        postDispatch: function (e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
        }
      }
    },
    simulate: function (e, t, n) {
      var r = pe.extend(new pe.Event, n, {type: e, isSimulated: !0});
      pe.event.trigger(r, null, t), r.isDefaultPrevented() && n.preventDefault()
    }
  }, pe.removeEvent = re.removeEventListener ? function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n)
  } : function (e, t, n) {
    var r = "on" + t;
    e.detachEvent && ("undefined" == typeof e[r] && (e[r] = null), e.detachEvent(r, n))
  }, pe.Event = function (e, t) {
    return this instanceof pe.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? y : b) : this.type = e, t && pe.extend(this, t), this.timeStamp = e && e.timeStamp || pe.now(), void(this[pe.expando] = !0)) : new pe.Event(e, t)
  }, pe.Event.prototype = {
    constructor: pe.Event,
    isDefaultPrevented: b,
    isPropagationStopped: b,
    isImmediatePropagationStopped: b,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = y, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = y, e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
    },
    stopImmediatePropagation: function () {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = y, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
    }
  }, pe.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (e, t) {
    pe.event.special[e] = {
      delegateType: t, bindType: t, handle: function (e) {
        var n, r = this, i = e.relatedTarget, o = e.handleObj;
        return i && (i === r || pe.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
      }
    }
  }), fe.submit || (pe.event.special.submit = {
    setup: function () {
      return !pe.nodeName(this, "form") && void pe.event.add(this, "click._submit keypress._submit", function (e) {
        var t = e.target, n = pe.nodeName(t, "input") || pe.nodeName(t, "button") ? pe.prop(t, "form") : void 0;
        n && !pe._data(n, "submit") && (pe.event.add(n, "submit._submit", function (e) {
          e._submitBubble = !0
        }), pe._data(n, "submit", !0))
      })
    }, postDispatch: function (e) {
      e._submitBubble && (delete e._submitBubble, this.parentNode && !e.isTrigger && pe.event.simulate("submit", this.parentNode, e))
    }, teardown: function () {
      return !pe.nodeName(this, "form") && void pe.event.remove(this, "._submit")
    }
  }), fe.change || (pe.event.special.change = {
    setup: function () {
      return Ye.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (pe.event.add(this, "propertychange._change", function (e) {
        "checked" === e.originalEvent.propertyName && (this._justChanged = !0)
      }), pe.event.add(this, "click._change", function (e) {
        this._justChanged && !e.isTrigger && (this._justChanged = !1), pe.event.simulate("change", this, e)
      })), !1) : void pe.event.add(this, "beforeactivate._change", function (e) {
        var t = e.target;
        Ye.test(t.nodeName) && !pe._data(t, "change") && (pe.event.add(t, "change._change", function (e) {
          !this.parentNode || e.isSimulated || e.isTrigger || pe.event.simulate("change", this.parentNode, e)
        }), pe._data(t, "change", !0))
      })
    }, handle: function (e) {
      var t = e.target;
      return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
    }, teardown: function () {
      return pe.event.remove(this, "._change"), !Ye.test(this.nodeName)
    }
  }), fe.focusin || pe.each({focus: "focusin", blur: "focusout"}, function (e, t) {
    var n = function (e) {
      pe.event.simulate(t, e.target, pe.event.fix(e))
    };
    pe.event.special[t] = {
      setup: function () {
        var r = this.ownerDocument || this, i = pe._data(r, t);
        i || r.addEventListener(e, n, !0), pe._data(r, t, (i || 0) + 1)
      }, teardown: function () {
        var r = this.ownerDocument || this, i = pe._data(r, t) - 1;
        i ? pe._data(r, t, i) : (r.removeEventListener(e, n, !0), pe._removeData(r, t))
      }
    }
  }), pe.fn.extend({
    on: function (e, t, n, r) {
      return w(this, e, t, n, r)
    }, one: function (e, t, n, r) {
      return w(this, e, t, n, r, 1)
    }, off: function (e, t, n) {
      var r, i;
      if (e && e.preventDefault && e.handleObj) return r = e.handleObj, pe(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
      if ("object" == typeof e) {
        for (i in e) this.off(i, t, e[i]);
        return this
      }
      return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = b), this.each(function () {
        pe.event.remove(this, e, n, t)
      })
    }, trigger: function (e, t) {
      return this.each(function () {
        pe.event.trigger(e, t, this)
      })
    }, triggerHandler: function (e, t) {
      var n = this[0];
      return n ? pe.event.trigger(e, t, n, !0) : void 0
    }
  });
  var Ze = / jQuery\d+="(?:null|\d+)"/g, et = new RegExp("<(?:" + Xe + ")[\\s/>]", "i"),
    tt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, nt = /<script|<style|<link/i,
    rt = /checked\s*(?:[^=]|=\s*.checked.)/i, it = /^true\/(.*)/, ot = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    at = p(re), st = at.appendChild(re.createElement("div"));
  pe.extend({
    htmlPrefilter: function (e) {
      return e.replace(tt, "<$1></$2>")
    }, clone: function (e, t, n) {
      var r, i, o, a, s, u = pe.contains(e.ownerDocument, e);
      if (fe.html5Clone || pe.isXMLDoc(e) || !et.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (st.innerHTML = e.outerHTML, st.removeChild(o = st.firstChild)), !(fe.noCloneEvent && fe.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || pe.isXMLDoc(e))) for (r = h(o), s = h(e), a = 0; null != (i = s[a]); ++a) r[a] && A(i, r[a]);
      if (t) if (n) for (s = s || h(e), r = r || h(o), a = 0; null != (i = s[a]); a++) k(i, r[a]); else k(e, o);
      return r = h(o, "script"), r.length > 0 && g(r, !u && h(e, "script")), r = s = i = null, o
    }, cleanData: function (e, t) {
      for (var n, r, i, o, a = 0, s = pe.expando, u = pe.cache, l = fe.attributes, c = pe.event.special; null != (n = e[a]); a++) if ((t || _e(n)) && (i = n[s], o = i && u[i])) {
        if (o.events) for (r in o.events) c[r] ? pe.event.remove(n, r) : pe.removeEvent(n, r, o.handle);
        u[i] && (delete u[i], l || "undefined" == typeof n.removeAttribute ? n[s] = void 0 : n.removeAttribute(s), ne.push(i))
      }
    }
  }), pe.fn.extend({
    domManip: N, detach: function (e) {
      return S(this, e, !0)
    }, remove: function (e) {
      return S(this, e)
    }, text: function (e) {
      return $e(this, function (e) {
        return void 0 === e ? pe.text(this) : this.empty().append((this[0] && this[0].ownerDocument || re).createTextNode(e))
      }, null, e, arguments.length)
    }, append: function () {
      return N(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = T(this, e);
          t.appendChild(e)
        }
      })
    }, prepend: function () {
      return N(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = T(this, e);
          t.insertBefore(e, t.firstChild)
        }
      })
    }, before: function () {
      return N(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this)
      })
    }, after: function () {
      return N(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
      })
    }, empty: function () {
      for (var e, t = 0; null != (e = this[t]); t++) {
        for (1 === e.nodeType && pe.cleanData(h(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
        e.options && pe.nodeName(e, "select") && (e.options.length = 0)
      }
      return this
    }, clone: function (e, t) {
      return e = null != e && e, t = null == t ? e : t, this.map(function () {
        return pe.clone(this, e, t)
      })
    }, html: function (e) {
      return $e(this, function (e) {
        var t = this[0] || {}, n = 0, r = this.length;
        if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Ze, "") : void 0;
        if ("string" == typeof e && !nt.test(e) && (fe.htmlSerialize || !et.test(e)) && (fe.leadingWhitespace || !We.test(e)) && !ze[(Re.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = pe.htmlPrefilter(e);
          try {
            for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (pe.cleanData(h(t, !1)), t.innerHTML = e);
            t = 0
          } catch (i) {
          }
        }
        t && this.empty().append(e)
      }, null, e, arguments.length)
    }, replaceWith: function () {
      var e = [];
      return N(this, arguments, function (t) {
        var n = this.parentNode;
        pe.inArray(this, e) < 0 && (pe.cleanData(h(this)), n && n.replaceChild(t, this))
      }, e)
    }
  }), pe.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (e, t) {
    pe.fn[e] = function (e) {
      for (var n, r = 0, i = [], o = pe(e), a = o.length - 1; a >= r; r++) n = r === a ? this : this.clone(!0), pe(o[r])[t](n), ae.apply(i, n.get());
      return this.pushStack(i)
    }
  });
  var ut, lt = {HTML: "block", BODY: "block"}, ct = /^margin/, ft = new RegExp("^(" + He + ")(?!px)[a-z%]+$", "i"),
    dt = function (e, t, n, r) {
      var i, o, a = {};
      for (o in t) a[o] = e.style[o], e.style[o] = t[o];
      i = n.apply(e, r || []);
      for (o in t) e.style[o] = a[o];
      return i
    }, pt = re.documentElement;
  !function () {
    function t() {
      var t, c, f = re.documentElement;
      f.appendChild(u), l.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", n = i = s = !1, r = a = !0, e.getComputedStyle && (c = e.getComputedStyle(l), n = "1%" !== (c || {}).top, s = "2px" === (c || {}).marginLeft, i = "4px" === (c || {width: "4px"}).width, l.style.marginRight = "50%", r = "4px" === (c || {marginRight: "4px"}).marginRight, t = l.appendChild(re.createElement("div")), t.style.cssText = l.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", l.style.width = "1px", a = !parseFloat((e.getComputedStyle(t) || {}).marginRight), l.removeChild(t)), l.style.display = "none", o = 0 === l.getClientRects().length, o && (l.style.display = "", l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", t = l.getElementsByTagName("td"), t[0].style.cssText = "margin:0;border:0;padding:0;display:none", o = 0 === t[0].offsetHeight, o && (t[0].style.display = "", t[1].style.display = "none", o = 0 === t[0].offsetHeight)), f.removeChild(u)
    }

    var n, r, i, o, a, s, u = re.createElement("div"), l = re.createElement("div");
    l.style && (l.style.cssText = "float:left;opacity:.5", fe.opacity = "0.5" === l.style.opacity, fe.cssFloat = !!l.style.cssFloat, l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", fe.clearCloneStyle = "content-box" === l.style.backgroundClip, u = re.createElement("div"), u.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", l.innerHTML = "", u.appendChild(l), fe.boxSizing = "" === l.style.boxSizing || "" === l.style.MozBoxSizing || "" === l.style.WebkitBoxSizing, pe.extend(fe, {
      reliableHiddenOffsets: function () {
        return null == n && t(), o
      }, boxSizingReliable: function () {
        return null == n && t(), i
      }, pixelMarginRight: function () {
        return null == n && t(), r
      }, pixelPosition: function () {
        return null == n && t(), n
      }, reliableMarginRight: function () {
        return null == n && t(), a
      }, reliableMarginLeft: function () {
        return null == n && t(), s
      }
    }))
  }();
  var ht, gt, mt = /^(top|right|bottom|left)$/;
  e.getComputedStyle ? (ht = function (t) {
    var n = t.ownerDocument.defaultView;
    return n && n.opener || (n = e), n.getComputedStyle(t)
  }, gt = function (e, t, n) {
    var r, i, o, a, s = e.style;
    return n = n || ht(e), a = n ? n.getPropertyValue(t) || n[t] : void 0, "" !== a && void 0 !== a || pe.contains(e.ownerDocument, e) || (a = pe.style(e, t)), n && !fe.pixelMarginRight() && ft.test(a) && ct.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o), void 0 === a ? a : a + ""
  }) : pt.currentStyle && (ht = function (e) {
    return e.currentStyle
  }, gt = function (e, t, n) {
    var r, i, o, a, s = e.style;
    return n = n || ht(e), a = n ? n[t] : void 0, null == a && s && s[t] && (a = s[t]), ft.test(a) && !mt.test(t) && (r = s.left, i = e.runtimeStyle, o = i && i.left, o && (i.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = r, o && (i.left = o)), void 0 === a ? a : a + "" || "auto"
  });
  var vt = /alpha\([^)]*\)/i, yt = /opacity\s*=\s*([^)]*)/i, bt = /^(none|table(?!-c[ea]).+)/,
    xt = new RegExp("^(" + He + ")(.*)$", "i"), wt = {position: "absolute", visibility: "hidden", display: "block"},
    Tt = {letterSpacing: "0", fontWeight: "400"}, Ct = ["Webkit", "O", "Moz", "ms"], Et = re.createElement("div").style;
  pe.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var n = gt(e, "opacity");
            return "" === n ? "1" : n
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {"float": fe.cssFloat ? "cssFloat" : "styleFloat"},
    style: function (e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i, o, a, s = pe.camelCase(t), u = e.style;
        if (t = pe.cssProps[s] || (pe.cssProps[s] = _(s) || s), a = pe.cssHooks[t] || pe.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : u[t];
        if (o = typeof n, "string" === o && (i = Be.exec(n)) && i[1] && (n = d(e, t, i), o = "number"), null != n && n === n && ("number" === o && (n += i && i[3] || (pe.cssNumber[s] ? "" : "px")), fe.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(e, n, r))))) try {
          u[t] = n
        } catch (l) {
        }
      }
    },
    css: function (e, t, n, r) {
      var i, o, a, s = pe.camelCase(t);
      return t = pe.cssProps[s] || (pe.cssProps[s] = _(s) || s), a = pe.cssHooks[t] || pe.cssHooks[s], a && "get" in a && (o = a.get(e, !0, n)), void 0 === o && (o = gt(e, t, r)), "normal" === o && t in Tt && (o = Tt[t]), "" === n || n ? (i = parseFloat(o), n === !0 || isFinite(i) ? i || 0 : o) : o
    }
  }), pe.each(["height", "width"], function (e, t) {
    pe.cssHooks[t] = {
      get: function (e, n, r) {
        return n ? bt.test(pe.css(e, "display")) && 0 === e.offsetWidth ? dt(e, wt, function () {
          return B(e, t, r)
        }) : B(e, t, r) : void 0
      }, set: function (e, n, r) {
        var i = r && ht(e);
        return O(e, n, r ? H(e, t, r, fe.boxSizing && "border-box" === pe.css(e, "boxSizing", !1, i), i) : 0)
      }
    }
  }), fe.opacity || (pe.cssHooks.opacity = {
    get: function (e, t) {
      return yt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
    }, set: function (e, t) {
      var n = e.style, r = e.currentStyle, i = pe.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
        o = r && r.filter || n.filter || "";
      n.zoom = 1, (t >= 1 || "" === t) && "" === pe.trim(o.replace(vt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = vt.test(o) ? o.replace(vt, i) : o + " " + i)
    }
  }), pe.cssHooks.marginRight = j(fe.reliableMarginRight, function (e, t) {
    return t ? dt(e, {display: "inline-block"}, gt, [e, "marginRight"]) : void 0
  }), pe.cssHooks.marginLeft = j(fe.reliableMarginLeft, function (e, t) {
    return t ? (parseFloat(gt(e, "marginLeft")) || (pe.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - dt(e, {marginLeft: 0}, function () {
      return e.getBoundingClientRect().left
    }) : 0)) + "px" : void 0
  }), pe.each({margin: "", padding: "", border: "Width"}, function (e, t) {
    pe.cssHooks[e + t] = {
      expand: function (n) {
        for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + qe[r] + t] = o[r] || o[r - 2] || o[0];
        return i
      }
    }, ct.test(e) || (pe.cssHooks[e + t].set = O)
  }), pe.fn.extend({
    css: function (e, t) {
      return $e(this, function (e, t, n) {
        var r, i, o = {}, a = 0;
        if (pe.isArray(t)) {
          for (r = ht(e), i = t.length; i > a; a++) o[t[a]] = pe.css(e, t[a], !1, r);
          return o
        }
        return void 0 !== n ? pe.style(e, t, n) : pe.css(e, t)
      }, e, t, arguments.length > 1)
    }, show: function () {
      return P(this, !0)
    }, hide: function () {
      return P(this)
    }, toggle: function (e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        Me(this) ? pe(this).show() : pe(this).hide()
      })
    }
  }), pe.Tween = q, q.prototype = {
    constructor: q, init: function (e, t, n, r, i, o) {
      this.elem = e, this.prop = n, this.easing = i || pe.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (pe.cssNumber[n] ? "" : "px")
    }, cur: function () {
      var e = q.propHooks[this.prop];
      return e && e.get ? e.get(this) : q.propHooks._default.get(this)
    }, run: function (e) {
      var t, n = q.propHooks[this.prop];
      return this.options.duration ? this.pos = t = pe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : q.propHooks._default.set(this), this
    }
  }, q.prototype.init.prototype = q.prototype, q.propHooks = {
    _default: {
      get: function (e) {
        var t;
        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = pe.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
      }, set: function (e) {
        pe.fx.step[e.prop] ? pe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[pe.cssProps[e.prop]] && !pe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : pe.style(e.elem, e.prop, e.now + e.unit)
      }
    }
  }, q.propHooks.scrollTop = q.propHooks.scrollLeft = {
    set: function (e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }
  }, pe.easing = {
    linear: function (e) {
      return e
    }, swing: function (e) {
      return .5 - Math.cos(e * Math.PI) / 2
    }, _default: "swing"
  }, pe.fx = q.prototype.init, pe.fx.step = {};
  var kt, At, Nt = /^(?:toggle|show|hide)$/, St = /queueHooks$/;
  pe.Animation = pe.extend(W, {
    tweeners: {
      "*": [function (e, t) {
        var n = this.createTween(e, t);
        return d(n.elem, e, Be.exec(t), n), n
      }]
    }, tweener: function (e, t) {
      pe.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(De);
      for (var n, r = 0, i = e.length; i > r; r++) n = e[r], W.tweeners[n] = W.tweeners[n] || [], W.tweeners[n].unshift(t)
    }, prefilters: [R], prefilter: function (e, t) {
      t ? W.prefilters.unshift(e) : W.prefilters.push(e)
    }
  }), pe.speed = function (e, t, n) {
    var r = e && "object" == typeof e ? pe.extend({}, e) : {
      complete: n || !n && t || pe.isFunction(e) && e,
      duration: e,
      easing: n && t || t && !pe.isFunction(t) && t
    };
    return r.duration = pe.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in pe.fx.speeds ? pe.fx.speeds[r.duration] : pe.fx.speeds._default, null != r.queue && r.queue !== !0 || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
      pe.isFunction(r.old) && r.old.call(this), r.queue && pe.dequeue(this, r.queue)
    }, r
  }, pe.fn.extend({
    fadeTo: function (e, t, n, r) {
      return this.filter(Me).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
    }, animate: function (e, t, n, r) {
      var i = pe.isEmptyObject(e), o = pe.speed(t, n, r), a = function () {
        var t = W(this, pe.extend({}, e), o);
        (i || pe._data(this, "finish")) && t.stop(!0)
      };
      return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
    }, stop: function (e, t, n) {
      var r = function (e) {
        var t = e.stop;
        delete e.stop, t(n)
      };
      return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
        var t = !0, i = null != e && e + "queueHooks", o = pe.timers, a = pe._data(this);
        if (i) a[i] && a[i].stop && r(a[i]); else for (i in a) a[i] && a[i].stop && St.test(i) && r(a[i]);
        for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
        !t && n || pe.dequeue(this, e)
      })
    }, finish: function (e) {
      return e !== !1 && (e = e || "fx"), this.each(function () {
        var t, n = pe._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = pe.timers, a = r ? r.length : 0;
        for (n.finish = !0, pe.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
        for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
        delete n.finish
      })
    }
  }), pe.each(["toggle", "show", "hide"], function (e, t) {
    var n = pe.fn[t];
    pe.fn[t] = function (e, r, i) {
      return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate($(t, !0), e, r, i)
    }
  }), pe.each({
    slideDown: $("show"),
    slideUp: $("hide"),
    slideToggle: $("toggle"),
    fadeIn: {opacity: "show"},
    fadeOut: {opacity: "hide"},
    fadeToggle: {opacity: "toggle"}
  }, function (e, t) {
    pe.fn[e] = function (e, n, r) {
      return this.animate(t, e, n, r)
    }
  }), pe.timers = [], pe.fx.tick = function () {
    var e, t = pe.timers, n = 0;
    for (kt = pe.now(); n < t.length; n++) e = t[n], e() || t[n] !== e || t.splice(n--, 1);
    t.length || pe.fx.stop(), kt = void 0
  }, pe.fx.timer = function (e) {
    pe.timers.push(e), e() ? pe.fx.start() : pe.timers.pop()
  }, pe.fx.interval = 13, pe.fx.start = function () {
    At || (At = e.setInterval(pe.fx.tick, pe.fx.interval))
  }, pe.fx.stop = function () {
    e.clearInterval(At), At = null
  }, pe.fx.speeds = {slow: 600, fast: 200, _default: 400}, pe.fn.delay = function (t, n) {
    return t = pe.fx ? pe.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function (n, r) {
      var i = e.setTimeout(n, t);
      r.stop = function () {
        e.clearTimeout(i)
      }
    })
  }, function () {
    var e, t = re.createElement("input"), n = re.createElement("div"), r = re.createElement("select"),
      i = r.appendChild(re.createElement("option"));
    n = re.createElement("div"), n.setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = n.getElementsByTagName("a")[0], t.setAttribute("type", "checkbox"), n.appendChild(t), e = n.getElementsByTagName("a")[0], e.style.cssText = "top:1px", fe.getSetAttribute = "t" !== n.className, fe.style = /top/.test(e.getAttribute("style")), fe.hrefNormalized = "/a" === e.getAttribute("href"), fe.checkOn = !!t.value, fe.optSelected = i.selected, fe.enctype = !!re.createElement("form").enctype, r.disabled = !0, fe.optDisabled = !i.disabled, t = re.createElement("input"), t.setAttribute("value", ""), fe.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), fe.radioValue = "t" === t.value
  }();
  var Dt = /\r/g, Lt = /[\x20\t\r\n\f]+/g;
  pe.fn.extend({
    val: function (e) {
      var t, n, r, i = this[0];
      return arguments.length ? (r = pe.isFunction(e), this.each(function (n) {
        var i;
        1 === this.nodeType && (i = r ? e.call(this, n, pe(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : pe.isArray(i) && (i = pe.map(i, function (e) {
          return null == e ? "" : e + ""
        })), t = pe.valHooks[this.type] || pe.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
      })) : i ? (t = pe.valHooks[i.type] || pe.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(Dt, "") : null == n ? "" : n)) : void 0
    }
  }), pe.extend({
    valHooks: {
      option: {
        get: function (e) {
          var t = pe.find.attr(e, "value");
          return null != t ? t : pe.trim(pe.text(e)).replace(Lt, " ")
        }
      }, select: {
        get: function (e) {
          for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++) if (n = r[u], (n.selected || u === i) && (fe.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !pe.nodeName(n.parentNode, "optgroup"))) {
            if (t = pe(n).val(), o) return t;
            a.push(t)
          }
          return a
        }, set: function (e, t) {
          for (var n, r, i = e.options, o = pe.makeArray(t), a = i.length; a--;) if (r = i[a], pe.inArray(pe.valHooks.option.get(r), o) > -1) try {
            r.selected = n = !0
          } catch (s) {
            r.scrollHeight
          } else r.selected = !1;
          return n || (e.selectedIndex = -1), i
        }
      }
    }
  }), pe.each(["radio", "checkbox"], function () {
    pe.valHooks[this] = {
      set: function (e, t) {
        return pe.isArray(t) ? e.checked = pe.inArray(pe(e).val(), t) > -1 : void 0
      }
    }, fe.checkOn || (pe.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value
    })
  });
  var jt, _t, Pt = pe.expr.attrHandle, Ot = /^(?:checked|selected)$/i, Ht = fe.getSetAttribute, Bt = fe.input;
  pe.fn.extend({
    attr: function (e, t) {
      return $e(this, pe.attr, e, t, arguments.length > 1)
    }, removeAttr: function (e) {
      return this.each(function () {
        pe.removeAttr(this, e)
      })
    }
  }), pe.extend({
    attr: function (e, t, n) {
      var r, i, o = e.nodeType;
      return 3 !== o && 8 !== o && 2 !== o ? "undefined" == typeof e.getAttribute ? pe.prop(e, t, n) : (1 === o && pe.isXMLDoc(e) || (t = t.toLowerCase(), i = pe.attrHooks[t] || (pe.expr.match.bool.test(t) ? _t : jt)), void 0 !== n ? null === n ? void pe.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = pe.find.attr(e, t), null == r ? void 0 : r)) : void 0
    }, attrHooks: {
      type: {
        set: function (e, t) {
          if (!fe.radioValue && "radio" === t && pe.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
          }
        }
      }
    }, removeAttr: function (e, t) {
      var n, r, i = 0, o = t && t.match(De);
      if (o && 1 === e.nodeType) for (; n = o[i++];) r = pe.propFix[n] || n, pe.expr.match.bool.test(n) ? Bt && Ht || !Ot.test(n) ? e[r] = !1 : e[pe.camelCase("default-" + n)] = e[r] = !1 : pe.attr(e, n, ""), e.removeAttribute(Ht ? n : r)
    }
  }), _t = {
    set: function (e, t, n) {
      return t === !1 ? pe.removeAttr(e, n) : Bt && Ht || !Ot.test(n) ? e.setAttribute(!Ht && pe.propFix[n] || n, n) : e[pe.camelCase("default-" + n)] = e[n] = !0, n
    }
  }, pe.each(pe.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var n = Pt[t] || pe.find.attr;
    Bt && Ht || !Ot.test(t) ? Pt[t] = function (e, t, r) {
      var i, o;
      return r || (o = Pt[t], Pt[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, Pt[t] = o), i
    } : Pt[t] = function (e, t, n) {
      return n ? void 0 : e[pe.camelCase("default-" + t)] ? t.toLowerCase() : null
    }
  }), Bt && Ht || (pe.attrHooks.value = {
    set: function (e, t, n) {
      return pe.nodeName(e, "input") ? void(e.defaultValue = t) : jt && jt.set(e, t, n)
    }
  }), Ht || (jt = {
    set: function (e, t, n) {
      var r = e.getAttributeNode(n);
      return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
    }
  }, Pt.id = Pt.name = Pt.coords = function (e, t, n) {
    var r;
    return n ? void 0 : (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
  }, pe.valHooks.button = {
    get: function (e, t) {
      var n = e.getAttributeNode(t);
      return n && n.specified ? n.value : void 0
    }, set: jt.set
  }, pe.attrHooks.contenteditable = {
    set: function (e, t, n) {
      jt.set(e, "" !== t && t, n)
    }
  }, pe.each(["width", "height"], function (e, t) {
    pe.attrHooks[t] = {
      set: function (e, n) {
        return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
      }
    }
  })), fe.style || (pe.attrHooks.style = {
    get: function (e) {
      return e.style.cssText || void 0
    }, set: function (e, t) {
      return e.style.cssText = t + ""
    }
  });
  var qt = /^(?:input|select|textarea|button|object)$/i, Mt = /^(?:a|area)$/i;
  pe.fn.extend({
    prop: function (e, t) {
      return $e(this, pe.prop, e, t, arguments.length > 1)
    }, removeProp: function (e) {
      return e = pe.propFix[e] || e, this.each(function () {
        try {
          this[e] = void 0, delete this[e]
        } catch (t) {
        }
      })
    }
  }), pe.extend({
    prop: function (e, t, n) {
      var r, i, o = e.nodeType;
      return 3 !== o && 8 !== o && 2 !== o ? (1 === o && pe.isXMLDoc(e) || (t = pe.propFix[t] || t, i = pe.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]) : void 0
    }, propHooks: {
      tabIndex: {
        get: function (e) {
          var t = pe.find.attr(e, "tabindex");
          return t ? parseInt(t, 10) : qt.test(e.nodeName) || Mt.test(e.nodeName) && e.href ? 0 : -1
        }
      }
    }, propFix: {"for": "htmlFor", "class": "className"}
  }), fe.hrefNormalized || pe.each(["href", "src"], function (e, t) {
    pe.propHooks[t] = {
      get: function (e) {
        return e.getAttribute(t, 4)
      }
    }
  }), fe.optSelected || (pe.propHooks.selected = {
    get: function (e) {
      var t = e.parentNode;
      return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
    }, set: function (e) {
      var t = e.parentNode;
      t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
    }
  }), pe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    pe.propFix[this.toLowerCase()] = this
  }), fe.enctype || (pe.propFix.enctype = "encoding");
  var $t = /[\t\r\n\f]/g;
  pe.fn.extend({
    addClass: function (e) {
      var t, n, r, i, o, a, s, u = 0;
      if (pe.isFunction(e)) return this.each(function (t) {
        pe(this).addClass(e.call(this, t, X(this)))
      });
      if ("string" == typeof e && e) for (t = e.match(De) || []; n = this[u++];) if (i = X(n), r = 1 === n.nodeType && (" " + i + " ").replace($t, " ")) {
        for (a = 0; o = t[a++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
        s = pe.trim(r), i !== s && pe.attr(n, "class", s)
      }
      return this
    }, removeClass: function (e) {
      var t, n, r, i, o, a, s, u = 0;
      if (pe.isFunction(e)) return this.each(function (t) {
        pe(this).removeClass(e.call(this, t, X(this)))
      });
      if (!arguments.length) return this.attr("class", "");
      if ("string" == typeof e && e) for (t = e.match(De) || []; n = this[u++];) if (i = X(n), r = 1 === n.nodeType && (" " + i + " ").replace($t, " ")) {
        for (a = 0; o = t[a++];) for (; r.indexOf(" " + o + " ") > -1;) r = r.replace(" " + o + " ", " ");
        s = pe.trim(r), i !== s && pe.attr(n, "class", s)
      }
      return this
    }, toggleClass: function (e, t) {
      var n = typeof e;
      return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : pe.isFunction(e) ? this.each(function (n) {
        pe(this).toggleClass(e.call(this, n, X(this), t), t)
      }) : this.each(function () {
        var t, r, i, o;
        if ("string" === n) for (r = 0, i = pe(this), o = e.match(De) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else void 0 !== e && "boolean" !== n || (t = X(this), t && pe._data(this, "__className__", t), pe.attr(this, "class", t || e === !1 ? "" : pe._data(this, "__className__") || ""))
      })
    }, hasClass: function (e) {
      var t, n, r = 0;
      for (t = " " + e + " "; n = this[r++];) if (1 === n.nodeType && (" " + X(n) + " ").replace($t, " ").indexOf(t) > -1) return !0;
      return !1
    }
  }), pe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
    pe.fn[t] = function (e, n) {
      return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
    }
  }), pe.fn.extend({
    hover: function (e, t) {
      return this.mouseenter(e).mouseleave(t || e)
    }
  });
  var It = e.location, Rt = pe.now(), Ft = /\?/,
    Wt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  pe.parseJSON = function (t) {
    if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
    var n, r = null, i = pe.trim(t + "");
    return i && !pe.trim(i.replace(Wt, function (e, t, i, o) {
      return n && t && (r = 0), 0 === r ? e : (n = i || t, r += !o - !i, "")
    })) ? Function("return " + i)() : pe.error("Invalid JSON: " + t)
  }, pe.parseXML = function (t) {
    var n, r;
    if (!t || "string" != typeof t) return null;
    try {
      e.DOMParser ? (r = new e.DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new e.ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
    } catch (i) {
      n = void 0
    }
    return n && n.documentElement && !n.getElementsByTagName("parsererror").length || pe.error("Invalid XML: " + t), n
  };
  var Xt = /#.*$/, zt = /([?&])_=[^&]*/, Gt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Ut = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Yt = /^(?:GET|HEAD)$/, Vt = /^\/\//,
    Jt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Kt = {}, Qt = {}, Zt = "*/".concat("*"),
    en = It.href, tn = Jt.exec(en.toLowerCase()) || [];
  pe.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: en,
      type: "GET",
      isLocal: Ut.test(tn[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Zt,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
      responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
      converters: {"* text": String, "text html": !0, "text json": pe.parseJSON, "text xml": pe.parseXML},
      flatOptions: {url: !0, context: !0}
    },
    ajaxSetup: function (e, t) {
      return t ? U(U(e, pe.ajaxSettings), t) : U(pe.ajaxSettings, e)
    },
    ajaxPrefilter: z(Kt),
    ajaxTransport: z(Qt),
    ajax: function (t, n) {
      function r(t, n, r, i) {
        var o, f, y, b, w, C = n;
        2 !== x && (x = 2, u && e.clearTimeout(u), c = void 0, s = i || "", T.readyState = t > 0 ? 4 : 0, o = t >= 200 && 300 > t || 304 === t, r && (b = Y(d, T, r)), b = V(d, b, T, o), o ? (d.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (pe.lastModified[a] = w), w = T.getResponseHeader("etag"), w && (pe.etag[a] = w)), 204 === t || "HEAD" === d.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = b.state, f = b.data, y = b.error, o = !y)) : (y = C, !t && C || (C = "error", 0 > t && (t = 0))), T.status = t, T.statusText = (n || C) + "", o ? g.resolveWith(p, [f, C, T]) : g.rejectWith(p, [T, C, y]), T.statusCode(v), v = void 0, l && h.trigger(o ? "ajaxSuccess" : "ajaxError", [T, d, o ? f : y]), m.fireWith(p, [T, C]), l && (h.trigger("ajaxComplete", [T, d]), --pe.active || pe.event.trigger("ajaxStop")))
      }

      "object" == typeof t && (n = t, t = void 0), n = n || {};
      var i, o, a, s, u, l, c, f, d = pe.ajaxSetup({}, n), p = d.context || d,
        h = d.context && (p.nodeType || p.jquery) ? pe(p) : pe.event, g = pe.Deferred(),
        m = pe.Callbacks("once memory"), v = d.statusCode || {}, y = {}, b = {}, x = 0, w = "canceled", T = {
          readyState: 0, getResponseHeader: function (e) {
            var t;
            if (2 === x) {
              if (!f) for (f = {}; t = Gt.exec(s);) f[t[1].toLowerCase()] = t[2];
              t = f[e.toLowerCase()]
            }
            return null == t ? null : t
          }, getAllResponseHeaders: function () {
            return 2 === x ? s : null
          }, setRequestHeader: function (e, t) {
            var n = e.toLowerCase();
            return x || (e = b[n] = b[n] || e, y[e] = t), this
          }, overrideMimeType: function (e) {
            return x || (d.mimeType = e), this
          }, statusCode: function (e) {
            var t;
            if (e) if (2 > x) for (t in e) v[t] = [v[t], e[t]]; else T.always(e[T.status]);
            return this
          }, abort: function (e) {
            var t = e || w;
            return c && c.abort(t), r(0, t), this
          }
        };
      if (g.promise(T).complete = m.add, T.success = T.done, T.error = T.fail, d.url = ((t || d.url || en) + "").replace(Xt, "").replace(Vt, tn[1] + "//"), d.type = n.method || n.type || d.method || d.type, d.dataTypes = pe.trim(d.dataType || "*").toLowerCase().match(De) || [""], null == d.crossDomain && (i = Jt.exec(d.url.toLowerCase()), d.crossDomain = !(!i || i[1] === tn[1] && i[2] === tn[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (tn[3] || ("http:" === tn[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = pe.param(d.data, d.traditional)), G(Kt, d, n, T), 2 === x) return T;
      l = pe.event && d.global, l && 0 === pe.active++ && pe.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !Yt.test(d.type), a = d.url, d.hasContent || (d.data && (a = d.url += (Ft.test(a) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = zt.test(a) ? a.replace(zt, "$1_=" + Rt++) : a + (Ft.test(a) ? "&" : "?") + "_=" + Rt++)), d.ifModified && (pe.lastModified[a] && T.setRequestHeader("If-Modified-Since", pe.lastModified[a]), pe.etag[a] && T.setRequestHeader("If-None-Match", pe.etag[a])), (d.data && d.hasContent && d.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", d.contentType), T.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Zt + "; q=0.01" : "") : d.accepts["*"]);
      for (o in d.headers) T.setRequestHeader(o, d.headers[o]);
      if (d.beforeSend && (d.beforeSend.call(p, T, d) === !1 || 2 === x)) return T.abort();
      w = "abort";
      for (o in{success: 1, error: 1, complete: 1}) T[o](d[o]);
      if (c = G(Qt, d, n, T)) {
        if (T.readyState = 1, l && h.trigger("ajaxSend", [T, d]), 2 === x) return T;
        d.async && d.timeout > 0 && (u = e.setTimeout(function () {
          T.abort("timeout")
        }, d.timeout));
        try {
          x = 1, c.send(y, r)
        } catch (C) {
          if (!(2 > x)) throw C;
          r(-1, C)
        }
      } else r(-1, "No Transport");
      return T
    },
    getJSON: function (e, t, n) {
      return pe.get(e, t, n, "json")
    },
    getScript: function (e, t) {
      return pe.get(e, void 0, t, "script")
    }
  }), pe.each(["get", "post"], function (e, t) {
    pe[t] = function (e, n, r, i) {
      return pe.isFunction(n) && (i = i || r, r = n, n = void 0), pe.ajax(pe.extend({
        url: e,
        type: t,
        dataType: i,
        data: n,
        success: r
      }, pe.isPlainObject(e) && e))
    }
  }), pe._evalUrl = function (e) {
    return pe.ajax({url: e, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0})
  }, pe.fn.extend({
    wrapAll: function (e) {
      if (pe.isFunction(e)) return this.each(function (t) {
        pe(this).wrapAll(e.call(this, t))
      });
      if (this[0]) {
        var t = pe(e, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
          for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
          return e
        }).append(this)
      }
      return this
    }, wrapInner: function (e) {
      return pe.isFunction(e) ? this.each(function (t) {
        pe(this).wrapInner(e.call(this, t))
      }) : this.each(function () {
        var t = pe(this), n = t.contents();
        n.length ? n.wrapAll(e) : t.append(e)
      })
    }, wrap: function (e) {
      var t = pe.isFunction(e);
      return this.each(function (n) {
        pe(this).wrapAll(t ? e.call(this, n) : e)
      })
    }, unwrap: function () {
      return this.parent().each(function () {
        pe.nodeName(this, "body") || pe(this).replaceWith(this.childNodes)
      }).end()
    }
  }), pe.expr.filters.hidden = function (e) {
    return fe.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : K(e)
  }, pe.expr.filters.visible = function (e) {
    return !pe.expr.filters.hidden(e)
  };
  var nn = /%20/g, rn = /\[\]$/, on = /\r?\n/g, an = /^(?:submit|button|image|reset|file)$/i,
    sn = /^(?:input|select|textarea|keygen)/i;
  pe.param = function (e, t) {
    var n, r = [], i = function (e, t) {
      t = pe.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
    };
    if (void 0 === t && (t = pe.ajaxSettings && pe.ajaxSettings.traditional), pe.isArray(e) || e.jquery && !pe.isPlainObject(e)) pe.each(e, function () {
      i(this.name, this.value)
    }); else for (n in e) Q(n, e[n], t, i);
    return r.join("&").replace(nn, "+")
  }, pe.fn.extend({
    serialize: function () {
      return pe.param(this.serializeArray())
    }, serializeArray: function () {
      return this.map(function () {
        var e = pe.prop(this, "elements");
        return e ? pe.makeArray(e) : this
      }).filter(function () {
        var e = this.type;
        return this.name && !pe(this).is(":disabled") && sn.test(this.nodeName) && !an.test(e) && (this.checked || !Ie.test(e))
      }).map(function (e, t) {
        var n = pe(this).val();
        return null == n ? null : pe.isArray(n) ? pe.map(n, function (e) {
          return {name: t.name, value: e.replace(on, "\r\n")}
        }) : {name: t.name, value: n.replace(on, "\r\n")}
      }).get()
    }
  }), pe.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function () {
    return this.isLocal ? ee() : re.documentMode > 8 ? Z() : /^(get|post|head|put|delete|options)$/i.test(this.type) && Z() || ee()
  } : Z;
  var un = 0, ln = {}, cn = pe.ajaxSettings.xhr();
  e.attachEvent && e.attachEvent("onunload", function () {
    for (var e in ln) ln[e](void 0, !0)
  }), fe.cors = !!cn && "withCredentials" in cn, cn = fe.ajax = !!cn, cn && pe.ajaxTransport(function (t) {
    if (!t.crossDomain || fe.cors) {
      var n;
      return {
        send: function (r, i) {
          var o, a = t.xhr(), s = ++un;
          if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields) for (o in t.xhrFields) a[o] = t.xhrFields[o];
          t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
          for (o in r) void 0 !== r[o] && a.setRequestHeader(o, r[o] + "");
          a.send(t.hasContent && t.data || null), n = function (e, r) {
            var o, u, l;
            if (n && (r || 4 === a.readyState)) if (delete ln[s], n = void 0, a.onreadystatechange = pe.noop, r) 4 !== a.readyState && a.abort(); else {
              l = {}, o = a.status, "string" == typeof a.responseText && (l.text = a.responseText);
              try {
                u = a.statusText
              } catch (c) {
                u = ""
              }
              o || !t.isLocal || t.crossDomain ? 1223 === o && (o = 204) : o = l.text ? 200 : 404
            }
            l && i(o, u, l, a.getAllResponseHeaders())
          }, t.async ? 4 === a.readyState ? e.setTimeout(n) : a.onreadystatechange = ln[s] = n : n()
        }, abort: function () {
          n && n(void 0, !0)
        }
      }
    }
  }), pe.ajaxSetup({
    accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
    contents: {script: /\b(?:java|ecma)script\b/},
    converters: {
      "text script": function (e) {
        return pe.globalEval(e), e
      }
    }
  }), pe.ajaxPrefilter("script", function (e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
  }), pe.ajaxTransport("script", function (e) {
    if (e.crossDomain) {
      var t, n = re.head || pe("head")[0] || re.documentElement;
      return {
        send: function (r, i) {
          t = re.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function (e, n) {
            (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || i(200, "success"))
          }, n.insertBefore(t, n.firstChild)
        }, abort: function () {
          t && t.onload(void 0, !0)
        }
      }
    }
  });
  var fn = [], dn = /(=)\?(?=&|$)|\?\?/;
  pe.ajaxSetup({
    jsonp: "callback", jsonpCallback: function () {
      var e = fn.pop() || pe.expando + "_" + Rt++;
      return this[e] = !0, e
    }
  }), pe.ajaxPrefilter("json jsonp", function (t, n, r) {
    var i, o, a,
      s = t.jsonp !== !1 && (dn.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && dn.test(t.data) && "data");
    return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = pe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(dn, "$1" + i) : t.jsonp !== !1 && (t.url += (Ft.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
      return a || pe.error(i + " was not called"), a[0]
    }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
      a = arguments
    }, r.always(function () {
      void 0 === o ? pe(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, fn.push(i)), a && pe.isFunction(o) && o(a[0]), a = o = void 0
    }), "script") : void 0
  }), pe.parseHTML = function (e, t, n) {
    if (!e || "string" != typeof e) return null;
    "boolean" == typeof t && (n = t, t = !1), t = t || re;
    var r = Te.exec(e), i = !n && [];
    return r ? [t.createElement(r[1])] : (r = v([e], t, i), i && i.length && pe(i).remove(), pe.merge([], r.childNodes))
  };
  var pn = pe.fn.load;
  pe.fn.load = function (e, t, n) {
    if ("string" != typeof e && pn) return pn.apply(this, arguments);
    var r, i, o, a = this, s = e.indexOf(" ");
    return s > -1 && (r = pe.trim(e.slice(s, e.length)), e = e.slice(0, s)), pe.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && pe.ajax({
      url: e,
      type: i || "GET",
      dataType: "html",
      data: t
    }).done(function (e) {
      o = arguments, a.html(r ? pe("<div>").append(pe.parseHTML(e)).find(r) : e)
    }).always(n && function (e, t) {
      a.each(function () {
        n.apply(this, o || [e.responseText, t, e])
      })
    }), this
  }, pe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    pe.fn[t] = function (e) {
      return this.on(t, e)
    }
  }), pe.expr.filters.animated = function (e) {
    return pe.grep(pe.timers, function (t) {
      return e === t.elem
    }).length
  }, pe.offset = {
    setOffset: function (e, t, n) {
      var r, i, o, a, s, u, l, c = pe.css(e, "position"), f = pe(e), d = {};
      "static" === c && (e.style.position = "relative"),
        s = f.offset(), o = pe.css(e, "top"), u = pe.css(e, "left"), l = ("absolute" === c || "fixed" === c) && pe.inArray("auto", [o, u]) > -1, l ? (r = f.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), pe.isFunction(t) && (t = t.call(e, n, pe.extend({}, s))), null != t.top && (d.top = t.top - s.top + a), null != t.left && (d.left = t.left - s.left + i), "using" in t ? t.using.call(e, d) : f.css(d)
    }
  }, pe.fn.extend({
    offset: function (e) {
      if (arguments.length) return void 0 === e ? this : this.each(function (t) {
        pe.offset.setOffset(this, e, t)
      });
      var t, n, r = {top: 0, left: 0}, i = this[0], o = i && i.ownerDocument;
      return o ? (t = o.documentElement, pe.contains(t, i) ? ("undefined" != typeof i.getBoundingClientRect && (r = i.getBoundingClientRect()), n = te(o), {
        top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
        left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
      }) : r) : void 0
    }, position: function () {
      if (this[0]) {
        var e, t, n = {top: 0, left: 0}, r = this[0];
        return "fixed" === pe.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), pe.nodeName(e[0], "html") || (n = e.offset()), n.top += pe.css(e[0], "borderTopWidth", !0), n.left += pe.css(e[0], "borderLeftWidth", !0)), {
          top: t.top - n.top - pe.css(r, "marginTop", !0),
          left: t.left - n.left - pe.css(r, "marginLeft", !0)
        }
      }
    }, offsetParent: function () {
      return this.map(function () {
        for (var e = this.offsetParent; e && !pe.nodeName(e, "html") && "static" === pe.css(e, "position");) e = e.offsetParent;
        return e || pt
      })
    }
  }), pe.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
    var n = /Y/.test(t);
    pe.fn[e] = function (r) {
      return $e(this, function (e, r, i) {
        var o = te(e);
        return void 0 === i ? o ? t in o ? o[t] : o.document.documentElement[r] : e[r] : void(o ? o.scrollTo(n ? pe(o).scrollLeft() : i, n ? i : pe(o).scrollTop()) : e[r] = i)
      }, e, r, arguments.length, null)
    }
  }), pe.each(["top", "left"], function (e, t) {
    pe.cssHooks[t] = j(fe.pixelPosition, function (e, n) {
      return n ? (n = gt(e, t), ft.test(n) ? pe(e).position()[t] + "px" : n) : void 0
    })
  }), pe.each({Height: "height", Width: "width"}, function (e, t) {
    pe.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
      pe.fn[r] = function (r, i) {
        var o = arguments.length && (n || "boolean" != typeof r), a = n || (r === !0 || i === !0 ? "margin" : "border");
        return $e(this, function (t, n, r) {
          var i;
          return pe.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? pe.css(t, n, a) : pe.style(t, n, r, a)
        }, t, o ? r : void 0, o, null)
      }
    })
  }), pe.fn.extend({
    bind: function (e, t, n) {
      return this.on(e, null, t, n)
    }, unbind: function (e, t) {
      return this.off(e, null, t)
    }, delegate: function (e, t, n, r) {
      return this.on(t, e, n, r)
    }, undelegate: function (e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
    }
  }), pe.fn.size = function () {
    return this.length
  }, pe.fn.andSelf = pe.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
    return pe
  });
  var hn = e.jQuery, gn = e.$;
  return pe.noConflict = function (t) {
    return e.$ === pe && (e.$ = gn), t && e.jQuery === pe && (e.jQuery = hn), pe
  }, t || (e.jQuery = e.$ = pe), pe
}), function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}(function (e) {
  function t(e) {
    return s.raw ? e : encodeURIComponent(e)
  }

  function n(e) {
    return s.raw ? e : decodeURIComponent(e)
  }

  function r(e) {
    return t(s.json ? JSON.stringify(e) : String(e))
  }

  function i(e) {
    0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
    try {
      return e = decodeURIComponent(e.replace(a, " ")), s.json ? JSON.parse(e) : e
    } catch (t) {
    }
  }

  function o(t, n) {
    var r = s.raw ? t : i(t);
    return e.isFunction(n) ? n(r) : r
  }

  var a = /\+/g, s = e.cookie = function (i, a, u) {
    if (void 0 !== a && !e.isFunction(a)) {
      if (u = e.extend({}, s.defaults, u), "number" == typeof u.expires) {
        var l = u.expires, c = u.expires = new Date;
        c.setTime(+c + 864e5 * l)
      }
      return document.cookie = [t(i), "=", r(a), u.expires ? "; expires=" + u.expires.toUTCString() : "", u.path ? "; path=" + u.path : "", u.domain ? "; domain=" + u.domain : "", u.secure ? "; secure" : ""].join("")
    }
    for (var f = i ? void 0 : {}, d = document.cookie ? document.cookie.split("; ") : [], p = 0, h = d.length; h > p; p++) {
      var g = d[p].split("="), m = n(g.shift()), v = g.join("=");
      if (i && i === m) {
        f = o(v, a);
        break
      }
      i || void 0 === (v = o(v)) || (f[m] = v)
    }
    return f
  };
  s.defaults = {}, e.removeCookie = function (t, n) {
    return void 0 !== e.cookie(t) && (e.cookie(t, "", e.extend({}, n, {expires: -1})), !e.cookie(t))
  }
}), function (e) {
  e.fn.qrcode = function (t) {
    function n(e) {
      this.mode = s, this.data = e
    }

    function r(e, t) {
      this.typeNumber = e, this.errorCorrectLevel = t, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = []
    }

    function i(e, t) {
      if (void 0 == e.length) throw Error(e.length + "/" + t);
      for (var n = 0; n < e.length && 0 == e[n];) n++;
      this.num = Array(e.length - n + t);
      for (var r = 0; r < e.length - n; r++) this.num[r] = e[r + n]
    }

    function o(e, t) {
      this.totalCount = e, this.dataCount = t
    }

    function a() {
      this.buffer = [], this.length = 0
    }

    var s;
    n.prototype = {
      getLength: function () {
        return this.data.length
      }, write: function (e) {
        for (var t = 0; t < this.data.length; t++) e.put(this.data.charCodeAt(t), 8)
      }
    }, r.prototype = {
      addData: function (e) {
        this.dataList.push(new n(e)), this.dataCache = null
      }, isDark: function (e, t) {
        if (0 > e || this.moduleCount <= e || 0 > t || this.moduleCount <= t) throw Error(e + "," + t);
        return this.modules[e][t]
      }, getModuleCount: function () {
        return this.moduleCount
      }, make: function () {
        if (1 > this.typeNumber) {
          for (var e = 1, e = 1; 40 > e; e++) {
            for (var t = o.getRSBlocks(e, this.errorCorrectLevel), n = new a, r = 0, i = 0; i < t.length; i++) r += t[i].dataCount;
            for (i = 0; i < this.dataList.length; i++) t = this.dataList[i], n.put(t.mode, 4), n.put(t.getLength(), u.getLengthInBits(t.mode, e)), t.write(n);
            if (n.getLengthInBits() <= 8 * r) break
          }
          this.typeNumber = e
        }
        this.makeImpl(!1, this.getBestMaskPattern())
      }, makeImpl: function (e, t) {
        this.moduleCount = 4 * this.typeNumber + 17, this.modules = Array(this.moduleCount);
        for (var n = 0; n < this.moduleCount; n++) {
          this.modules[n] = Array(this.moduleCount);
          for (var i = 0; i < this.moduleCount; i++) this.modules[n][i] = null
        }
        this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(e, t), 7 <= this.typeNumber && this.setupTypeNumber(e), null == this.dataCache && (this.dataCache = r.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, t)
      }, setupPositionProbePattern: function (e, t) {
        for (var n = -1; 7 >= n; n++) if (!(-1 >= e + n || this.moduleCount <= e + n)) for (var r = -1; 7 >= r; r++) -1 >= t + r || this.moduleCount <= t + r || (this.modules[e + n][t + r] = 0 <= n && 6 >= n && (0 == r || 6 == r) || 0 <= r && 6 >= r && (0 == n || 6 == n) || 2 <= n && 4 >= n && 2 <= r && 4 >= r)
      }, getBestMaskPattern: function () {
        for (var e = 0, t = 0, n = 0; 8 > n; n++) {
          this.makeImpl(!0, n);
          var r = u.getLostPoint(this);
          (0 == n || e > r) && (e = r, t = n)
        }
        return t
      }, createMovieClip: function (e, t, n) {
        for (e = e.createEmptyMovieClip(t, n), this.make(), t = 0; t < this.modules.length; t++) for (var n = 1 * t, r = 0; r < this.modules[t].length; r++) {
          var i = 1 * r;
          this.modules[t][r] && (e.beginFill(0, 100), e.moveTo(i, n), e.lineTo(i + 1, n), e.lineTo(i + 1, n + 1), e.lineTo(i, n + 1), e.endFill())
        }
        return e
      }, setupTimingPattern: function () {
        for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[e][6] && (this.modules[e][6] = 0 == e % 2);
        for (e = 8; e < this.moduleCount - 8; e++) null == this.modules[6][e] && (this.modules[6][e] = 0 == e % 2)
      }, setupPositionAdjustPattern: function () {
        for (var e = u.getPatternPosition(this.typeNumber), t = 0; t < e.length; t++) for (var n = 0; n < e.length; n++) {
          var r = e[t], i = e[n];
          if (null == this.modules[r][i]) for (var o = -2; 2 >= o; o++) for (var a = -2; 2 >= a; a++) this.modules[r + o][i + a] = -2 == o || 2 == o || -2 == a || 2 == a || 0 == o && 0 == a
        }
      }, setupTypeNumber: function (e) {
        for (var t = u.getBCHTypeNumber(this.typeNumber), n = 0; 18 > n; n++) {
          var r = !e && 1 == (t >> n & 1);
          this.modules[Math.floor(n / 3)][n % 3 + this.moduleCount - 8 - 3] = r
        }
        for (n = 0; 18 > n; n++) r = !e && 1 == (t >> n & 1), this.modules[n % 3 + this.moduleCount - 8 - 3][Math.floor(n / 3)] = r
      }, setupTypeInfo: function (e, t) {
        for (var n = u.getBCHTypeInfo(this.errorCorrectLevel << 3 | t), r = 0; 15 > r; r++) {
          var i = !e && 1 == (n >> r & 1);
          6 > r ? this.modules[r][8] = i : 8 > r ? this.modules[r + 1][8] = i : this.modules[this.moduleCount - 15 + r][8] = i
        }
        for (r = 0; 15 > r; r++) i = !e && 1 == (n >> r & 1), 8 > r ? this.modules[8][this.moduleCount - r - 1] = i : 9 > r ? this.modules[8][15 - r - 1 + 1] = i : this.modules[8][15 - r - 1] = i;
        this.modules[this.moduleCount - 8][8] = !e
      }, mapData: function (e, t) {
        for (var n = -1, r = this.moduleCount - 1, i = 7, o = 0, a = this.moduleCount - 1; 0 < a; a -= 2) for (6 == a && a--; ;) {
          for (var s = 0; 2 > s; s++) if (null == this.modules[r][a - s]) {
            var l = !1;
            o < e.length && (l = 1 == (e[o] >>> i & 1)), u.getMask(t, r, a - s) && (l = !l), this.modules[r][a - s] = l, i--, -1 == i && (o++, i = 7)
          }
          if (r += n, 0 > r || this.moduleCount <= r) {
            r -= n, n = -n;
            break
          }
        }
      }
    }, r.PAD0 = 236, r.PAD1 = 17, r.createData = function (e, t, n) {
      for (var t = o.getRSBlocks(e, t), i = new a, s = 0; s < n.length; s++) {
        var l = n[s];
        i.put(l.mode, 4), i.put(l.getLength(), u.getLengthInBits(l.mode, e)), l.write(i)
      }
      for (s = e = 0; s < t.length; s++) e += t[s].dataCount;
      if (i.getLengthInBits() > 8 * e) throw Error("code length overflow. (" + i.getLengthInBits() + ">" + 8 * e + ")");
      for (i.getLengthInBits() + 4 <= 8 * e && i.put(0, 4); 0 != i.getLengthInBits() % 8;) i.putBit(!1);
      for (; !(i.getLengthInBits() >= 8 * e) && (i.put(r.PAD0, 8), !(i.getLengthInBits() >= 8 * e));) i.put(r.PAD1, 8);
      return r.createBytes(i, t)
    }, r.createBytes = function (e, t) {
      for (var n = 0, r = 0, o = 0, a = Array(t.length), s = Array(t.length), l = 0; l < t.length; l++) {
        var c = t[l].dataCount, f = t[l].totalCount - c, r = Math.max(r, c), o = Math.max(o, f);
        a[l] = Array(c);
        for (var d = 0; d < a[l].length; d++) a[l][d] = 255 & e.buffer[d + n];
        for (n += c, d = u.getErrorCorrectPolynomial(f), c = new i(a[l], d.getLength() - 1).mod(d), s[l] = Array(d.getLength() - 1), d = 0; d < s[l].length; d++) f = d + c.getLength() - s[l].length, s[l][d] = 0 <= f ? c.get(f) : 0
      }
      for (d = l = 0; d < t.length; d++) l += t[d].totalCount;
      for (n = Array(l), d = c = 0; d < r; d++) for (l = 0; l < t.length; l++) d < a[l].length && (n[c++] = a[l][d]);
      for (d = 0; d < o; d++) for (l = 0; l < t.length; l++) d < s[l].length && (n[c++] = s[l][d]);
      return n
    }, s = 4;
    for (var u = {
      PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
      G15: 1335,
      G18: 7973,
      G15_MASK: 21522,
      getBCHTypeInfo: function (e) {
        for (var t = e << 10; 0 <= u.getBCHDigit(t) - u.getBCHDigit(u.G15);) t ^= u.G15 << u.getBCHDigit(t) - u.getBCHDigit(u.G15);
        return (e << 10 | t) ^ u.G15_MASK
      },
      getBCHTypeNumber: function (e) {
        for (var t = e << 12; 0 <= u.getBCHDigit(t) - u.getBCHDigit(u.G18);) t ^= u.G18 << u.getBCHDigit(t) - u.getBCHDigit(u.G18);
        return e << 12 | t
      },
      getBCHDigit: function (e) {
        for (var t = 0; 0 != e;) t++, e >>>= 1;
        return t
      },
      getPatternPosition: function (e) {
        return u.PATTERN_POSITION_TABLE[e - 1]
      },
      getMask: function (e, t, n) {
        switch (e) {
          case 0:
            return 0 == (t + n) % 2;
          case 1:
            return 0 == t % 2;
          case 2:
            return 0 == n % 3;
          case 3:
            return 0 == (t + n) % 3;
          case 4:
            return 0 == (Math.floor(t / 2) + Math.floor(n / 3)) % 2;
          case 5:
            return 0 == t * n % 2 + t * n % 3;
          case 6:
            return 0 == (t * n % 2 + t * n % 3) % 2;
          case 7:
            return 0 == (t * n % 3 + (t + n) % 2) % 2;
          default:
            throw Error("bad maskPattern:" + e)
        }
      },
      getErrorCorrectPolynomial: function (e) {
        for (var t = new i([1], 0), n = 0; n < e; n++) t = t.multiply(new i([1, l.gexp(n)], 0));
        return t
      },
      getLengthInBits: function (e, t) {
        if (1 <= t && 10 > t) switch (e) {
          case 1:
            return 10;
          case 2:
            return 9;
          case s:
            return 8;
          case 8:
            return 8;
          default:
            throw Error("mode:" + e)
        } else if (27 > t) switch (e) {
          case 1:
            return 12;
          case 2:
            return 11;
          case s:
            return 16;
          case 8:
            return 10;
          default:
            throw Error("mode:" + e)
        } else {
          if (!(41 > t)) throw Error("type:" + t);
          switch (e) {
            case 1:
              return 14;
            case 2:
              return 13;
            case s:
              return 16;
            case 8:
              return 12;
            default:
              throw Error("mode:" + e)
          }
        }
      },
      getLostPoint: function (e) {
        for (var t = e.getModuleCount(), n = 0, r = 0; r < t; r++) for (var i = 0; i < t; i++) {
          for (var o = 0, a = e.isDark(r, i), s = -1; 1 >= s; s++) if (!(0 > r + s || t <= r + s)) for (var u = -1; 1 >= u; u++) 0 > i + u || t <= i + u || 0 == s && 0 == u || a == e.isDark(r + s, i + u) && o++;
          5 < o && (n += 3 + o - 5)
        }
        for (r = 0; r < t - 1; r++) for (i = 0; i < t - 1; i++) o = 0, e.isDark(r, i) && o++, e.isDark(r + 1, i) && o++, e.isDark(r, i + 1) && o++, e.isDark(r + 1, i + 1) && o++, (0 == o || 4 == o) && (n += 3);
        for (r = 0; r < t; r++) for (i = 0; i < t - 6; i++) e.isDark(r, i) && !e.isDark(r, i + 1) && e.isDark(r, i + 2) && e.isDark(r, i + 3) && e.isDark(r, i + 4) && !e.isDark(r, i + 5) && e.isDark(r, i + 6) && (n += 40);
        for (i = 0; i < t; i++) for (r = 0; r < t - 6; r++) e.isDark(r, i) && !e.isDark(r + 1, i) && e.isDark(r + 2, i) && e.isDark(r + 3, i) && e.isDark(r + 4, i) && !e.isDark(r + 5, i) && e.isDark(r + 6, i) && (n += 40);
        for (i = o = 0; i < t; i++) for (r = 0; r < t; r++) e.isDark(r, i) && o++;
        return e = Math.abs(100 * o / t / t - 50) / 5, n + 10 * e
      }
    }, l = {
      glog: function (e) {
        if (1 > e) throw Error("glog(" + e + ")");
        return l.LOG_TABLE[e]
      }, gexp: function (e) {
        for (; 0 > e;) e += 255;
        for (; 256 <= e;) e -= 255;
        return l.EXP_TABLE[e]
      }, EXP_TABLE: Array(256), LOG_TABLE: Array(256)
    }, c = 0; 8 > c; c++) l.EXP_TABLE[c] = 1 << c;
    for (c = 8; 256 > c; c++) l.EXP_TABLE[c] = l.EXP_TABLE[c - 4] ^ l.EXP_TABLE[c - 5] ^ l.EXP_TABLE[c - 6] ^ l.EXP_TABLE[c - 8];
    for (c = 0; 255 > c; c++) l.LOG_TABLE[l.EXP_TABLE[c]] = c;
    return i.prototype = {
      get: function (e) {
        return this.num[e]
      }, getLength: function () {
        return this.num.length
      }, multiply: function (e) {
        for (var t = Array(this.getLength() + e.getLength() - 1), n = 0; n < this.getLength(); n++) for (var r = 0; r < e.getLength(); r++) t[n + r] ^= l.gexp(l.glog(this.get(n)) + l.glog(e.get(r)));
        return new i(t, 0)
      }, mod: function (e) {
        if (0 > this.getLength() - e.getLength()) return this;
        for (var t = l.glog(this.get(0)) - l.glog(e.get(0)), n = Array(this.getLength()), r = 0; r < this.getLength(); r++) n[r] = this.get(r);
        for (r = 0; r < e.getLength(); r++) n[r] ^= l.gexp(l.glog(e.get(r)) + t);
        return new i(n, 0).mod(e)
      }
    }, o.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], o.getRSBlocks = function (e, t) {
      var n = o.getRsBlockTable(e, t);
      if (void 0 == n) throw Error("bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + t);
      for (var r = n.length / 3, i = [], a = 0; a < r; a++) for (var s = n[3 * a + 0], u = n[3 * a + 1], l = n[3 * a + 2], c = 0; c < s; c++) i.push(new o(u, l));
      return i
    }, o.getRsBlockTable = function (e, t) {
      switch (t) {
        case 1:
          return o.RS_BLOCK_TABLE[4 * (e - 1) + 0];
        case 0:
          return o.RS_BLOCK_TABLE[4 * (e - 1) + 1];
        case 3:
          return o.RS_BLOCK_TABLE[4 * (e - 1) + 2];
        case 2:
          return o.RS_BLOCK_TABLE[4 * (e - 1) + 3]
      }
    }, a.prototype = {
      get: function (e) {
        return 1 == (this.buffer[Math.floor(e / 8)] >>> 7 - e % 8 & 1)
      }, put: function (e, t) {
        for (var n = 0; n < t; n++) this.putBit(1 == (e >>> t - n - 1 & 1))
      }, getLengthInBits: function () {
        return this.length
      }, putBit: function (e) {
        var t = Math.floor(this.length / 8);
        this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++
      }
    }, "string" == typeof t && (t = {text: t}), t = e.extend({}, {
      render: "canvas",
      width: 256,
      height: 256,
      typeNumber: -1,
      correctLevel: 2,
      background: "#ffffff",
      foreground: "#000000"
    }, t), this.each(function () {
      var n;
      if ("canvas" == t.render) {
        n = new r(t.typeNumber, t.correctLevel), n.addData(t.text), n.make();
        var i = document.createElement("canvas");
        i.width = t.width, i.height = t.height;
        for (var o = i.getContext("2d"), a = t.width / n.getModuleCount(), s = t.height / n.getModuleCount(), u = 0; u < n.getModuleCount(); u++) for (var l = 0; l < n.getModuleCount(); l++) {
          o.fillStyle = n.isDark(u, l) ? t.foreground : t.background;
          var c = Math.ceil((l + 1) * a) - Math.floor(l * a), f = Math.ceil((u + 1) * a) - Math.floor(u * a);
          o.fillRect(Math.round(l * a), Math.round(u * s), c, f)
        }
      } else for (n = new r(t.typeNumber, t.correctLevel), n.addData(t.text), n.make(), i = e("<table></table>").css("width", t.width + "px").css("height", t.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", t.background), o = t.width / n.getModuleCount(), a = t.height / n.getModuleCount(), s = 0; s < n.getModuleCount(); s++) for (u = e("<tr></tr>").css("height", a + "px").appendTo(i), l = 0; l < n.getModuleCount(); l++) e("<td></td>").css("width", o + "px").css("background-color", n.isDark(s, l) ? t.foreground : t.background).appendTo(u);
      n = i, jQuery(n).appendTo(this)
    })
  }
}(jQuery), !function () {
  function e(e) {
    return e.replace(b, "").replace(x, ",").replace(w, "").replace(T, "").replace(C, "").split(E)
  }

  function t(e) {
    return "'" + e.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
  }

  function n(n, r) {
    function i(e) {
      return d += e.split(/\n/).length - 1, c && (e = e.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), e && (e = y[1] + t(e) + y[2] + "\n"), e
    }

    function o(t) {
      var n = d;
      if (l ? t = l(t, r) : a && (t = t.replace(/\n/g, function () {
        return d++, "$line=" + d + ";"
      })), 0 === t.indexOf("=")) {
        var i = f && !/^=[=#]/.test(t);
        if (t = t.replace(/^=[=#]?|[\s;]*$/g, ""), i) {
          var o = t.replace(/\s*\([^\)]+\)/, "");
          p[o] || /^(include|print)$/.test(o) || (t = "$escape(" + t + ")")
        } else t = "$string(" + t + ")";
        t = y[1] + t + y[2]
      }
      return a && (t = "$line=" + n + ";" + t), v(e(t), function (e) {
        if (e && !g[e]) {
          var t;
          t = "print" === e ? x : "include" === e ? w : p[e] ? "$utils." + e : h[e] ? "$helpers." + e : "$data." + e, T += e + "=" + t + ",", g[e] = !0
        }
      }), t + "\n"
    }

    var a = r.debug, s = r.openTag, u = r.closeTag, l = r.parser, c = r.compress, f = r.escape, d = 1,
      g = {$data: 1, $filename: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1}, m = "".trim,
      y = m ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
      b = m ? "$out+=text;return $out;" : "$out.push(text);",
      x = "function(){var text=''.concat.apply('',arguments);" + b + "}",
      w = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + b + "}",
      T = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (a ? "$line=0," : ""), C = y[0],
      E = "return new String(" + y[3] + ");";
    v(n.split(s), function (e) {
      e = e.split(u);
      var t = e[0], n = e[1];
      1 === e.length ? C += i(t) : (C += o(t), n && (C += i(n)))
    });
    var k = T + C + E;
    a && (k = "try{" + k + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + t(n) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
    try {
      var A = new Function("$data", "$filename", k);
      return A.prototype = p, A
    } catch (N) {
      throw N.temp = "function anonymous($data,$filename) {" + k + "}", N
    }
  }

  var r = function (e, t) {
    return "string" == typeof t ? m(t, {filename: e}) : a(e, t)
  };
  r.version = "3.0.0", r._tid = 0, r.config = function (e, t) {
    i[e] = t
  };
  var i = r.defaults = {openTag: "<%", closeTag: "%>", escape: !0, cache: !0, compress: !1, parser: null},
    o = r.cache = {};
  r.render = function (e, t) {
    return m(e, t)
  };
  var a = r.renderFile = function (e, t) {
    var n = r.get(e) || g({filename: e, name: "Render Error", message: "Template not found"});
    return t ? n(t) : n
  };
  r.get = function (e) {
    var t;
    if (o[e]) t = o[e]; else if ("object" == typeof document) {
      var n = e;
      if (n) {
        r._tid++;
        var i = e.replace(/^\s*|\s*$/g, "");
        t = m(i, {filename: "_cache_" + r._tid})
      }
    }
    return t
  };
  var s = function (e, t) {
    return "string" != typeof e && (t = typeof e, "number" === t ? e += "" : e = "function" === t ? s(e.call(e)) : ""), e
  }, u = {"<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "&": "&#38;"}, l = function (e) {
    return u[e]
  }, c = function (e) {
    return s(e).replace(/&(?![\w#]+;)|[<>"']/g, l)
  }, f = Array.isArray || function (e) {
    return "[object Array]" === {}.toString.call(e)
  }, d = function (e, t) {
    var n, r;
    if (f(e)) for (n = 0, r = e.length; n < r; n++) t.call(e, e[n], n, e); else for (n in e) t.call(e, e[n], n)
  }, p = r.utils = {$helpers: {}, $include: a, $string: s, $escape: c, $each: d};
  r.helper = function (e, t) {
    h[e] = t
  };
  var h = r.helpers = p.$helpers;
  r.onerror = function (e) {
    var t = "Template Error\n\n";
    for (var n in e) t += "<" + n + ">\n" + e[n] + "\n\n";
    "object" == typeof console && console.error(t)
  };
  var g = function (e) {
      return r.onerror(e), function () {
        return "{Template Error}"
      }
    }, m = r.compile = function (e, t) {
      function r(n) {
        try {
          return new u(n, s) + ""
        } catch (r) {
          return t.debug ? g(r)() : (t.debug = !0, m(e, t)(n))
        }
      }

      t = t || {};
      for (var a in i) void 0 === t[a] && (t[a] = i[a]);
      var s = t.filename;
      try {
        var u = n(e, t)
      } catch (l) {
        return l.filename = s || "anonymous", l.name = "Syntax Error", g(l)
      }
      return r.prototype = u.prototype, r.toString = function () {
        return u.toString()
      }, s && t.cache && (o[s] = r), r
    }, v = p.$each,
    y = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
    b = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
    x = /[^\w$]+/g, w = new RegExp(["\\b" + y.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
    T = /^\d[^,]*|,\d[^,]*/g, C = /^,+|,+$/g, E = /^$|,+/;
  i.openTag = "{{", i.closeTag = "}}";
  var k = function (e, t) {
    var n = t.split(":"), r = n.shift(), i = n.join(":") || "";
    return i && (i = ", " + i), "$helpers." + r + "(" + e + i + ")"
  };
  i.parser = function (e, t) {
    e = e.replace(/^\s/, "");
    var n = e.split(" "), i = n.shift(), o = n.join(" ");
    switch (i) {
      case"if":
        e = "if(" + o + "){";
        break;
      case"else":
        n = "if" === n.shift() ? " if(" + n.join(" ") + ")" : "", e = "}else" + n + "{";
        break;
      case"/if":
        e = "}";
        break;
      case"each":
        var a = n[0] || "$data", s = n[1] || "as", u = n[2] || "$value", l = n[3] || "$index", c = u + "," + l;
        "as" !== s && (a = "[]"), e = "$each(" + a + ",function(" + c + "){";
        break;
      case"/each":
        e = "});";
        break;
      case"echo":
        e = "print(" + o + ");";
        break;
      case"print":
      case"include":
        e = i + "(" + n.join(",") + ");";
        break;
      default:
        if (/^\s*\|\s*[\w\$]/.test(o)) {
          var f = !0;
          0 === e.indexOf("#") && (e = e.substr(1), f = !1);
          for (var d = 0, p = e.split("|"), h = p.length, g = p[d++]; d < h; d++) g = k(g, p[d]);
          e = (f ? "=" : "=#") + g
        } else e = r.helpers[i] ? "=#" + i + "(" + n.join(",") + ");" : "=" + e
    }
    return e
  }, "function" == typeof define ? define(function () {
    return r
  }) : "undefined" != typeof exports ? module.exports = r : this.template = r
}(), function (e, t) {
  function n(e) {
    return function (t) {
      return {}.toString.call(t) == "[object " + e + "]"
    }
  }

  function r() {
    return k++
  }

  function i(e) {
    return e.match(S)[0]
  }

  function o(e) {
    for (e = e.replace(D, "/"), e = e.replace(j, "$1/"); e.match(L);) e = e.replace(L, "/");
    return e
  }

  function a(e) {
    var t = e.length - 1, n = e.charAt(t);
    return "#" === n ? e.substring(0, t) : ".js" === e.substring(t - 2) || e.indexOf("?") > 0 || "/" === n ? e : e + ".js"
  }

  function s(e) {
    var t = x.alias;
    return t && T(t[e]) ? t[e] : e
  }

  function u(e) {
    var t, n = x.paths;
    return n && (t = e.match(_)) && T(n[t[1]]) && (e = n[t[1]] + t[2]), e
  }

  function l(e) {
    var t = x.vars;
    return t && e.indexOf("{") > -1 && (e = e.replace(P, function (e, n) {
      return T(t[n]) ? t[n] : e
    })), e
  }

  function c(e) {
    var t = x.map, n = e;
    if (t) for (var r = 0, i = t.length; r < i; r++) {
      var o = t[r];
      if (n = E(o) ? o(e) || e : e.replace(o[0], o[1]), n !== e) break
    }
    return n
  }

  function f(e, t) {
    var n, r = e.charAt(0);
    if (O.test(e)) n = e; else if ("." === r) n = o((t ? i(t) : x.cwd) + e); else if ("/" === r) {
      var a = x.cwd.match(H);
      n = a ? a[0] + e.substring(1) : e
    } else n = x.base + e;
    return 0 === n.indexOf("//") && (n = location.protocol + n), n
  }

  function d(e, t) {
    if (!e) return "";
    e = s(e), e = u(e), e = l(e), e = a(e);
    var n = f(e, t);
    return n = c(n)
  }

  function p(e) {
    return e.hasAttribute ? e.src : e.getAttribute("src", 4)
  }

  function h(e, t, n) {
    var r = B.createElement("script");
    if (n) {
      var i = E(n) ? n(e) : n;
      i && (r.charset = i)
    }
    g(r, t, e), r.async = !0, r.src = e, R = r, X ? W.insertBefore(r, X) : W.appendChild(r), R = null
  }

  function g(e, t, n) {
    function r() {
      e.onload = e.onerror = e.onreadystatechange = null, x.debug || W.removeChild(e), e = null, t()
    }

    var i = "onload" in e;
    i ? (e.onload = r, e.onerror = function () {
      N("error", {uri: n, node: e}), r()
    }) : e.onreadystatechange = function () {
      /loaded|complete/.test(e.readyState) && r()
    }
  }

  function m() {
    if (R) return R;
    if (F && "interactive" === F.readyState) return F;
    for (var e = W.getElementsByTagName("script"), t = e.length - 1; t >= 0; t--) {
      var n = e[t];
      if ("interactive" === n.readyState) return F = n
    }
  }

  function v(e) {
    var t = [];
    return e.replace(U, "").replace(G, function (e, n, r) {
      r && t.push(r)
    }), t
  }

  function y(e, t) {
    this.uri = e, this.dependencies = t || [], this.exports = null, this.status = 0, this._waitings = {}, this._remain = 0
  }

  if (!e.seajs) {
    var b = e.seajs = {version: "2.3.0"}, x = b.data = {}, w = n("Object"), T = n("String"),
      C = Array.isArray || n("Array"), E = n("Function"), k = 0, A = x.events = {};
    b.on = function (e, t) {
      var n = A[e] || (A[e] = []);
      return n.push(t), b
    }, b.off = function (e, t) {
      if (!e && !t) return A = x.events = {}, b;
      var n = A[e];
      if (n) if (t) for (var r = n.length - 1; r >= 0; r--) n[r] === t && n.splice(r, 1); else delete A[e];
      return b
    };
    var N = b.emit = function (e, t) {
        var n = A[e];
        if (n) {
          n = n.slice();
          for (var r = 0, i = n.length; r < i; r++) n[r](t)
        }
        return b
      }, S = /[^?#]*\//, D = /\/\.\//g, L = /\/[^\/]+\/\.\.\//, j = /([^:\/])\/+\//g, _ = /^([^\/:]+)(\/.+)$/,
      P = /{([^{]+)}/g, O = /^\/\/.|:\//, H = /^.*?\/\/.*?\//, B = document,
      q = location.href && 0 !== location.href.indexOf("about:") ? i(location.href) : "", M = B.scripts,
      $ = B.getElementById("seajsnode") || M[M.length - 1], I = i(p($) || q);
    b.resolve = d;
    var R, F, W = B.head || B.getElementsByTagName("head")[0] || B.documentElement,
      X = W.getElementsByTagName("base")[0];
    b.request = h;
    var z,
      G = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,
      U = /\\\\/g, Y = b.cache = {}, V = {}, J = {}, K = {},
      Q = y.STATUS = {FETCHING: 1, SAVED: 2, LOADING: 3, LOADED: 4, EXECUTING: 5, EXECUTED: 6};
    y.prototype.resolve = function () {
      for (var e = this, t = e.dependencies, n = [], r = 0, i = t.length; r < i; r++) n[r] = y.resolve(t[r], e.uri);
      return n
    }, y.prototype.load = function () {
      var e = this;
      if (!(e.status >= Q.LOADING)) {
        e.status = Q.LOADING;
        var t = e.resolve();
        N("load", t);
        for (var n, r = e._remain = t.length, i = 0; i < r; i++) n = y.get(t[i]), n.status < Q.LOADED ? n._waitings[e.uri] = (n._waitings[e.uri] || 0) + 1 : e._remain--;
        if (0 === e._remain) return void e.onload();
        var o = {};
        for (i = 0; i < r; i++) n = Y[t[i]], n.status < Q.FETCHING ? n.fetch(o) : n.status === Q.SAVED && n.load();
        for (var a in o) o.hasOwnProperty(a) && o[a]()
      }
    }, y.prototype.onload = function () {
      var e = this;
      e.status = Q.LOADED, e.callback && e.callback();
      var t, n, r = e._waitings;
      for (t in r) r.hasOwnProperty(t) && (n = Y[t], n._remain -= r[t], 0 === n._remain && n.onload());
      delete e._waitings, delete e._remain
    }, y.prototype.fetch = function (e) {
      function t() {
        b.request(o.requestUri, o.onRequest, o.charset)
      }

      function n() {
        delete V[a], J[a] = !0, z && (y.save(i, z), z = null);
        var e, t = K[a];
        for (delete K[a]; e = t.shift();) e.load()
      }

      var r = this, i = r.uri;
      r.status = Q.FETCHING;
      var o = {uri: i};
      N("fetch", o);
      var a = o.requestUri || i;
      return !a || J[a] ? void r.load() : V[a] ? void K[a].push(r) : (V[a] = !0, K[a] = [r], N("request", o = {
        uri: i,
        requestUri: a,
        onRequest: n,
        charset: x.charset
      }), void(o.requested || (e ? e[o.requestUri] = t : t())))
    }, y.prototype.exec = function () {
      function e(t) {
        return y.get(e.resolve(t)).exec()
      }

      var n = this;
      if (n.status >= Q.EXECUTING) return n.exports;
      n.status = Q.EXECUTING;
      var i = n.uri;
      e.resolve = function (e) {
        return y.resolve(e, i)
      }, e.async = function (t, n) {
        return y.use(t, n, i + "_async_" + r()), e
      };
      var o = n.factory, a = E(o) ? o(e, n.exports = {}, n) : o;
      return a === t && (a = n.exports), delete n.factory, n.exports = a, n.status = Q.EXECUTED, N("exec", n), a
    }, y.resolve = function (e, t) {
      var n = {id: e, refUri: t};
      return N("resolve", n), n.uri || b.resolve(n.id, t)
    }, y.define = function (e, n, r) {
      var i = arguments.length;
      1 === i ? (r = e, e = t) : 2 === i && (r = n, C(e) ? (n = e, e = t) : n = t), !C(n) && E(r) && (n = v(r.toString()));
      var o = {id: e, uri: y.resolve(e), deps: n, factory: r};
      if (!o.uri && B.attachEvent) {
        var a = m();
        a && (o.uri = a.src)
      }
      N("define", o), o.uri ? y.save(o.uri, o) : z = o
    }, y.save = function (e, t) {
      var n = y.get(e);
      n.status < Q.SAVED && (n.id = t.id || e, n.dependencies = t.deps || [], n.factory = t.factory, n.status = Q.SAVED, N("save", n))
    }, y.get = function (e, t) {
      return Y[e] || (Y[e] = new y(e, t))
    }, y.use = function (t, n, r) {
      var i = y.get(r, C(t) ? t : [t]);
      i.callback = function () {
        for (var t = [], r = i.resolve(), o = 0, a = r.length; o < a; o++) t[o] = Y[r[o]].exec();
        n && n.apply(e, t), delete i.callback
      }, i.load()
    }, b.use = function (e, t) {
      return y.use(e, t, x.cwd + "_use_" + r()), b
    }, y.define.cmd = {}, e.define = y.define, b.Module = y, x.fetchedList = J, x.cid = r, b.require = function (e) {
      var t = y.get(y.resolve(e));
      return t.status < Q.EXECUTING && (t.onload(), t.exec()), t.exports
    }, x.base = I, x.dir = I, x.cwd = q, x.charset = "utf-8", b.config = function (e) {
      for (var t in e) {
        var n = e[t], r = x[t];
        if (r && w(r)) for (var i in n) r[i] = n[i]; else C(r) ? n = r.concat(n) : "base" === t && ("/" !== n.slice(-1) && (n += "/"), n = f(n)), x[t] = n
      }
      return N("config", e), b
    }
  }
}(this);
var TD = {};
TD.Events = {
  on: function (e, t, n) {
    if (this._events || (this._events = {}), object_common.isObject(e)) {
      for (var r in e) this.on(r, e[r], n);
      return this
    }
    var i = this._events[e] = this._events[e] || [];
    return n && (t = function (e, t) {
      return function n() {
        t.apply(this, arguments), this.off(e, n)
      }
    }(e, t)), i.push(t), this
  }, one: function (e, t) {
    return this.on(e, t, !0), this
  }, off: function (e, t) {
    if (!this._events) return this;
    if (e) if (e && !t) this._events[e] = []; else for (var n = this._events[e] || [], r = n.length - 1; r >= 0; r--) n[r] == t && n.splice(r, 1); else this._events = {};
    return this
  }, trigger: function (e) {
    if (!this._events) return this;
    if (!e) {
      for (var e in this._events) this.trigger(e);
      return this
    }
    var t, n, r, i = this._events[e] || [], o = ARRAY_CORE.slice.call(arguments, 1), a = this._events.all || [];
    for (i = i.slice(), a = a.slice(), t = 0, n = i.length; t < n; t++) if ("function" == typeof i[t] && (r = i[t].apply(this, o), r === !0)) return !0;
    for (o = [e].concat(o), t = 0, n = a.length; t < n; t++) "function" == typeof a[t] && a[t].apply(this, o);
    return this
  }
};
var ARRAY_CORE = [], OBJECT_CORE = {}, array_common = {}, object_common = {};
Array.from = function () {
  return Array.from && "function" == typeof Array.from ? Array.from : function (arguments) {
    return [].slice.call(arguments)
  }
}(), ["pop", "push", "reverse", "shift", "unshift", "slice", "splice", "sort", "filter", "forEach", "some", "every", "map", "indexOf", "lastIndexOf", "reduce", "reduceRight", "copyWithin", "find", "findIndex", "fill", "includes", "entries", "keys", "concat"].forEach(function (e) {
  array_common[e] = wrapFunc(ARRAY_CORE[e])
}), ["isArray", "from", "of"].forEach(function (e) {
  array_common[e] = Array[e]
}), ["hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toString"].forEach(function (e) {
  object_common[e] = wrapFunc(OBJECT_CORE[e])
}), ["assign", "create", "freeze", "getOwnPropertyDescriptor", "getOwnPropertyNames", "getOwnPropertySymbols", "is", "isExtensible", "isFrozen", "isSealed", "keys", "preventExtensions", "seal", "defineProperty", "defineProperties", "getPrototypeOf", "setPrototypeOf"].forEach(function (e) {
  object_common[e] = Object[e]
}), ["Object", "Array", "Function"].forEach(function (e) {
  object_common["is" + e] = wrapFunc(function () {
    return object_common.toString(this) == "[object " + e + "]"
  })
}), Subscribe.prototype.__proto__ = TD.Events, $.extend(!0, DepSubscribe.prototype, {
  on: function (e, t) {
    e = "*" == e ? "all" : e + ".change", this.subscribe.on(e, t)
  }, trigger: function () {
    var e = array_common.from(arguments);
    e[0] = this.getPath(e[0]), "" == this.getPath() && (e[0] = e[0] + ".change"), this.subscribe.trigger.apply(this.subscribe, e)
  }, triggerArray: function (e, t) {
    this.trigger.apply(this, array_common.concat([e], array_common.from(t)))
  }, off: function () {
    this.subscribe.off.apply(this.subscribe, arguments)
  }, _listernerData: function (e) {
    var t = this;
    e.on("*", function (e) {
      t.trigger.apply(t, arguments)
    })
  }, newSubscribe: function (e) {
    var t = new DepSubscribe;
    return t.path = e, this._listernerData(t), t
  }, getPath: function (e) {
    return e = e || "", "" != this.path ? this.path + "." + e : e
  }
}), function (e) {
  var t = {wheelSpeed: 10, wheelPropagation: !1};
  e.fn.perfectScrollbar = function (n, r) {
    return this.each(function () {
      var i = e.extend(!0, {}, t);
      if ("object" == typeof n ? e.extend(!0, i, n) : r = n, "update" === r) return e(this).data("perfect-scrollbar-update") && e(this).data("perfect-scrollbar-update")(), e(this);
      if ("destroy" === r) return e(this).data("perfect-scrollbar-destroy") && e(this).data("perfect-scrollbar-destroy")(), e(this);
      if (e(this).data("perfect-scrollbar")) return e(this).data("perfect-scrollbar");
      var o, a, s, u, l, c, f, d, p = e(this).addClass("ps-container"),
        h = e("<div class='ps-scrollbar-x'></div>").appendTo(p),
        g = e("<div class='ps-scrollbar-y'></div>").appendTo(p), m = parseInt(h.css("bottom"), 10),
        v = parseInt(g.css("right"), 10), y = function () {
          var e = parseInt(d * u / a, 10);
          p.scrollTop(e), h.css({bottom: m - e})
        }, b = function () {
          var e = parseInt(c * s / o, 10);
          p.scrollLeft(e), g.css({right: v - e})
        }, x = function () {
          h.css({left: c + p.scrollLeft(), bottom: m - p.scrollTop(), width: l}), g.css({
            top: d + p.scrollTop(),
            right: v - p.scrollLeft(),
            height: f
          })
        }, w = function () {
          o = p.width(), a = p.height(), s = p.prop("scrollWidth"), u = p.prop("scrollHeight"), s > o ? (l = parseInt(o * o / s, 10), c = parseInt(p.scrollLeft() * o / s, 10)) : (l = 0, c = 0, p.scrollLeft(0)), u > a ? (f = parseInt(a * a / u, 10), d = parseInt(p.scrollTop() * a / u, 10)) : (f = 0, d = 0, p.scrollTop(0)), d >= a - f && (d = a - f), c >= o - l && (c = o - l), x()
        }, T = function (e, t) {
          var n = e + t, r = o - l;
          c = 0 > n ? 0 : n > r ? r : n, h.css({left: c + p.scrollLeft()})
        }, C = function (e, t) {
          var n = e + t, r = a - f;
          d = 0 > n ? 0 : n > r ? r : n, g.css({top: d + p.scrollTop()})
        }, E = function () {
          var t, n;
          h.bind("mousedown.perfect-scroll", function (e) {
            n = e.pageX, t = h.position().left, h.addClass("in-scrolling"), e.stopPropagation(), e.preventDefault()
          }), e(document).bind("mousemove.perfect-scroll", function (e) {
            h.hasClass("in-scrolling") && (b(), T(t, e.pageX - n), e.stopPropagation(), e.preventDefault())
          }), e(document).bind("mouseup.perfect-scroll", function () {
            h.hasClass("in-scrolling") && h.removeClass("in-scrolling")
          })
        }, k = function () {
          var t, n;
          g.bind("mousedown.perfect-scroll", function (e) {
            n = e.pageY, t = g.position().top, g.addClass("in-scrolling"), e.stopPropagation(), e.preventDefault()
          }), e(document).bind("mousemove.perfect-scroll", function (e) {
            g.hasClass("in-scrolling") && (y(), C(t, e.pageY - n), e.stopPropagation(), e.preventDefault())
          }), e(document).bind("mouseup.perfect-scroll", function () {
            g.hasClass("in-scrolling") && g.removeClass("in-scrolling")
          })
        }, A = function () {
          var e = function (e, t) {
            var n = p.scrollTop();
            if (0 === n && t > 0 && 0 === e) return !i.wheelPropagation;
            if (n >= u - a && 0 > t && 0 === e) return !i.wheelPropagation;
            var r = p.scrollLeft();
            return 0 === r && 0 > e && 0 === t ? !i.wheelPropagation : !(r >= s - o && e > 0 && 0 === t) || !i.wheelPropagation
          };
          p.bind("mousewheel.perfect-scroll", function (t, n, r, o) {
            p.scrollTop(p.scrollTop() - o * i.wheelSpeed), p.scrollLeft(p.scrollLeft() + r * i.wheelSpeed), w(), e(r, o) && t.preventDefault()
          })
        }, N = function () {
          var t = function (e, t) {
            p.scrollTop(p.scrollTop() - t), p.scrollLeft(p.scrollLeft() - e), w()
          }, n = {}, r = 0, i = {}, o = null, a = !1;
          e(window).bind("touchstart.perfect-scroll", function () {
            a = !0
          }), e(window).bind("touchend.perfect-scroll", function () {
            a = !1
          }), p.bind("touchstart.perfect-scroll", function (e) {
            var t = e.originalEvent.targetTouches[0];
            n.pageX = t.pageX, n.pageY = t.pageY, r = (new Date).getTime(), null !== o && clearInterval(o), e.stopPropagation()
          }), p.bind("touchmove.perfect-scroll", function (e) {
            if (!a && 1 === e.originalEvent.targetTouches.length) {
              var o = e.originalEvent.targetTouches[0], s = {};
              s.pageX = o.pageX, s.pageY = o.pageY;
              var u = s.pageX - n.pageX, l = s.pageY - n.pageY;
              t(u, l), n = s;
              var c = (new Date).getTime();
              i.x = u / (c - r), i.y = l / (c - r), r = c, e.preventDefault()
            }
          }), p.bind("touchend.perfect-scroll", function () {
            o = setInterval(function () {
              return .01 > Math.abs(i.x) && .01 > Math.abs(i.y) ? void clearInterval(o) : (t(30 * i.x, 30 * i.y), i.x *= .8, void(i.y *= .8))
            }, 10)
          })
        }, S = function () {
          h.remove(), g.remove(), p.unbind(".perfect-scroll"), e(window).unbind(".perfect-scroll"), p.data("perfect-scrollbar", null), p.data("perfect-scrollbar-update", null), p.data("perfect-scrollbar-destroy", null)
        }, D = function (t) {
          p.addClass("ie").addClass("ie" + t);
          var n = function () {
            var t = function () {
              e(this).addClass("hover")
            }, n = function () {
              e(this).removeClass("hover")
            };
            p.bind("mouseenter.perfect-scroll", t).bind("mouseleave.perfect-scroll", n), h.bind("mouseenter.perfect-scroll", t).bind("mouseleave.perfect-scroll", n), g.bind("mouseenter.perfect-scroll", t).bind("mouseleave.perfect-scroll", n)
          }, r = function () {
            x = function () {
              h.css({left: c + p.scrollLeft(), bottom: m, width: l}), g.css({
                top: d + p.scrollTop(),
                right: v,
                height: f
              }), h.hide().show(), g.hide().show()
            }, y = function () {
              var e = parseInt(d * u / a, 10);
              p.scrollTop(e), h.css({bottom: m}), h.hide().show()
            }, b = function () {
              var e = parseInt(c * s / o, 10);
              p.scrollLeft(e), g.hide().show()
            }
          };
          6 === t && (n(), r())
        }, L = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent), j = function () {
          var e = navigator.userAgent.toLowerCase().match(/(msie) ([\w.]+)/);
          e && "msie" === e[1] && D(parseInt(e[2], 10)), w(), E(), k(), L && N(), p.mousewheel && A(), p.data("perfect-scrollbar", p), p.data("perfect-scrollbar-update", w), p.data("perfect-scrollbar-destroy", S)
        };
      return j(), p
    })
  }
}(jQuery), function (e) {
  function t(t) {
    var n = t || window.event, r = [].slice.call(arguments, 1), i = 0, o = 0, a = 0;
    return t = e.event.fix(n), t.type = "mousewheel", n.wheelDelta && (i = n.wheelDelta / 120), n.detail && (i = -n.detail / 3), a = i, void 0 !== n.axis && n.axis === n.HORIZONTAL_AXIS && (a = 0, o = -1 * i), void 0 !== n.wheelDeltaY && (a = n.wheelDeltaY / 120), void 0 !== n.wheelDeltaX && (o = -1 * n.wheelDeltaX / 120), r.unshift(t, i, o, a), (e.event.dispatch || e.event.handle).apply(this, r)
  }

  var n = ["DOMMouseScroll", "mousewheel"];
  if (e.event.fixHooks) for (var r = n.length; r;) e.event.fixHooks[n[--r]] = e.event.mouseHooks;
  e.event.special.mousewheel = {
    setup: function () {
      if (this.addEventListener) for (var e = n.length; e;) this.addEventListener(n[--e], t, !1); else this.onmousewheel = t
    }, teardown: function () {
      if (this.removeEventListener) for (var e = n.length; e;) this.removeEventListener(n[--e], t, !1); else this.onmousewheel = null
    }
  }, e.fn.extend({
    mousewheel: function (e) {
      return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
    }, unmousewheel: function (e) {
      return this.unbind("mousewheel", e)
    }
  })
}(jQuery);
