! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Barba", [], t) : "object" == typeof exports ? exports.Barba = t() : e.Barba = t()
}(this, function() {
    return function(e) {
        function t(o) {
            if (n[o]) return n[o].exports;
            var i = n[o] = {
                exports: {},
                id: o,
                loaded: !1
            };
            return e[o].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.p = "http://localhost:5500/", t(0)
    }([function(e, t, n) {
        "function" != typeof Promise && (window.Promise = n(1));
        var o = {
            version: "1.0.0",
            BaseTransition: n(4),
            BaseView: n(6),
            BaseCache: n(8),
            Dispatcher: n(7),
            HistoryManager: n(9),
            Pjax: n(10),
            Prefetch: n(13),
            Utils: n(5)
        };
        e.exports = o
    }, function(e, t, n) {
        (function(t) {
            ! function(n) {
                function o() {}

                function i(e, t) {
                    return function() {
                        e.apply(t, arguments)
                    }
                }

                function r(e) {
                    if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                    if ("function" != typeof e) throw new TypeError("not a function");
                    this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], u(e, this)
                }

                function a(e, t) {
                    for (; 3 === e._state;) e = e._value;
                    return 0 === e._state ? void e._deferreds.push(t) : (e._handled = !0, void f(function() {
                        var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                        if (null === n) return void(1 === e._state ? s : c)(t.promise, e._value);
                        var o;
                        try {
                            o = n(e._value)
                        } catch (e) {
                            return void c(t.promise, e)
                        }
                        s(t.promise, o)
                    }))
                }

                function s(e, t) {
                    try {
                        if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
                        if (t && ("object" == typeof t || "function" == typeof t)) {
                            var n = t.then;
                            if (t instanceof r) return e._state = 3, e._value = t, void l(e);
                            if ("function" == typeof n) return void u(i(n, t), e)
                        }
                        e._state = 1, e._value = t, l(e)
                    } catch (t) {
                        c(e, t)
                    }
                }

                function c(e, t) {
                    e._state = 2, e._value = t, l(e)
                }

                function l(e) {
                    2 === e._state && 0 === e._deferreds.length && f(function() {
                        e._handled || p(e._value)
                    });
                    for (var t = 0, n = e._deferreds.length; t < n; t++) a(e, e._deferreds[t]);
                    e._deferreds = null
                }

                function d(e, t, n) {
                    this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
                }

                function u(e, t) {
                    var n = !1;
                    try {
                        e(function(e) {
                            n || (n = !0, s(t, e))
                        }, function(e) {
                            n || (n = !0, c(t, e))
                        })
                    } catch (e) {
                        if (n) return;
                        n = !0, c(t, e)
                    }
                }
                var h = setTimeout,
                    f = "function" == typeof t && t || function(e) {
                        h(e, 0)
                    },
                    p = function(e) {
                        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
                    };
                r.prototype["catch"] = function(e) {
                    return this.then(null, e)
                }, r.prototype.then = function(e, t) {
                    var n = new this.constructor(o);
                    return a(this, new d(e, t, n)), n
                }, r.all = function(e) {
                    var t = Array.prototype.slice.call(e);
                    return new r(function(e, n) {
                        function o(r, a) {
                            try {
                                if (a && ("object" == typeof a || "function" == typeof a)) {
                                    var s = a.then;
                                    if ("function" == typeof s) return void s.call(a, function(e) {
                                        o(r, e)
                                    }, n)
                                }
                                t[r] = a, 0 == --i && e(t)
                            } catch (e) {
                                n(e)
                            }
                        }
                        if (0 === t.length) return e([]);
                        for (var i = t.length, r = 0; r < t.length; r++) o(r, t[r])
                    })
                }, r.resolve = function(e) {
                    return e && "object" == typeof e && e.constructor === r ? e : new r(function(t) {
                        t(e)
                    })
                }, r.reject = function(e) {
                    return new r(function(t, n) {
                        n(e)
                    })
                }, r.race = function(e) {
                    return new r(function(t, n) {
                        for (var o = 0, i = e.length; o < i; o++) e[o].then(t, n)
                    })
                }, r._setImmediateFn = function(e) {
                    f = e
                }, r._setUnhandledRejectionFn = function(e) {
                    p = e
                }, void 0 !== e && e.exports ? e.exports = r : n.Promise || (n.Promise = r)
            }(this)
        }).call(t, n(2).setImmediate)
    }, function(e, t, n) {
        (function(e, o) {
            function i(e, t) {
                this._id = e, this._clearFn = t
            }
            var r = n(3).nextTick,
                a = Function.prototype.apply,
                s = Array.prototype.slice,
                c = {},
                l = 0;
            t.setTimeout = function() {
                return new i(a.call(setTimeout, window, arguments), clearTimeout)
            }, t.setInterval = function() {
                return new i(a.call(setInterval, window, arguments), clearInterval)
            }, t.clearTimeout = t.clearInterval = function(e) {
                e.close()
            }, i.prototype.unref = i.prototype.ref = function() {}, i.prototype.close = function() {
                this._clearFn.call(window, this._id)
            }, t.enroll = function(e, t) {
                clearTimeout(e._idleTimeoutId), e._idleTimeout = t
            }, t.unenroll = function(e) {
                clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
            }, t._unrefActive = t.active = function(e) {
                clearTimeout(e._idleTimeoutId);
                var t = e._idleTimeout;
                t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                    e._onTimeout && e._onTimeout()
                }, t))
            }, t.setImmediate = "function" == typeof e ? e : function(e) {
                var n = l++,
                    o = !(arguments.length < 2) && s.call(arguments, 1);
                return c[n] = !0, r(function() {
                    c[n] && (o ? e.apply(null, o) : e.call(null), t.clearImmediate(n))
                }), n
            }, t.clearImmediate = "function" == typeof o ? o : function(e) {
                delete c[e]
            }
        }).call(t, n(2).setImmediate, n(2).clearImmediate)
    }, function(e) {
        function t() {
            d && c && (d = !1, c.length ? l = c.concat(l) : u = -1, l.length && n())
        }

        function n() {
            if (!d) {
                var e = r(t);
                d = !0;
                for (var n = l.length; n;) {
                    for (c = l, l = []; ++u < n;) c && c[u].run();
                    u = -1, n = l.length
                }
                c = null, d = !1, a(e)
            }
        }

        function o(e, t) {
            this.fun = e, this.array = t
        }

        function i() {}
        var r, a, s = e.exports = {};
        ! function() {
            try {
                r = setTimeout
            } catch (e) {
                r = function() {
                    throw new Error("setTimeout is not defined")
                }
            }
            try {
                a = clearTimeout
            } catch (e) {
                a = function() {
                    throw new Error("clearTimeout is not defined")
                }
            }
        }();
        var c, l = [],
            d = !1,
            u = -1;
        s.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
            l.push(new o(e, t)), 1 !== l.length || d || r(n, 0)
        }, o.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on = i, s.addListener = i, s.once = i, s.off = i, s.removeListener = i, s.removeAllListeners = i, s.emit = i, s.binding = function() {
            throw new Error("process.binding is not supported")
        }, s.cwd = function() {
            return "/"
        }, s.chdir = function() {
            throw new Error("process.chdir is not supported")
        }, s.umask = function() {
            return 0
        }
    }, function(e, t, n) {
        var o = n(5),
            i = {
                oldContainer: void 0,
                newContainer: void 0,
                newContainerLoading: void 0,
                extend: function(e) {
                    return o.extend(this, e)
                },
                init: function(e, t) {
                    var n = this;
                    return this.oldContainer = e, this._newContainerPromise = t, this.deferred = o.deferred(), this.newContainerReady = o.deferred(), this.newContainerLoading = this.newContainerReady.promise, this.start(), this._newContainerPromise.then(function(e) {
                        n.newContainer = e, n.newContainerReady.resolve()
                    }), this.deferred.promise
                },
                done: function() {
                    this.oldContainer.parentNode.removeChild(this.oldContainer), this.newContainer.style.visibility = "visible", this.deferred.resolve()
                },
                start: function() {}
            };
        e.exports = i
    }, function(e) {
        var t = {
            getCurrentUrl: function() {
                return window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search
            },
            cleanLink: function(e) {
                return e.replace(/#.*/, "")
            },
            xhrTimeout: 5e3,
            xhr: function(e) {
                var t = this.deferred(),
                    n = new XMLHttpRequest;
                return n.onreadystatechange = function() {
                    if (4 === n.readyState) return 200 === n.status ? t.resolve(n.responseText) : t.reject(new Error("xhr: HTTP code is not 200"))
                }, n.ontimeout = function() {
                    return t.reject(new Error("xhr: Timeout exceeded"))
                }, n.open("GET", e), n.timeout = this.xhrTimeout, n.setRequestHeader("x-barba", "yes"), n.send(), t.promise
            },
            extend: function(e, t) {
                var n = Object.create(e);
                for (var o in t) t.hasOwnProperty(o) && (n[o] = t[o]);
                return n
            },
            deferred: function() {
                return new function() {
                    this.resolve = null, this.reject = null, this.promise = new Promise(function(e, t) {
                        this.resolve = e, this.reject = t
                    }.bind(this))
                }
            },
            getPort: function(e) {
                var t = void 0 !== e ? e : window.location.port,
                    n = window.location.protocol;
                return "" != t ? parseInt(t) : "http:" === n ? 80 : "https:" === n ? 443 : void 0
            }
        };
        e.exports = t
    }, function(e, t, n) {
        var o = n(7),
            i = n(5),
            r = {
                namespace: null,
                extend: function(e) {
                    return i.extend(this, e)
                },
                init: function() {
                    var e = this;
                    o.on("initStateChange", function(t, n) {
                        n && n.namespace === e.namespace && e.onLeave()
                    }), o.on("newPageReady", function(t, n, o) {
                        e.container = o, t.namespace === e.namespace && e.onEnter()
                    }), o.on("transitionCompleted", function(t, n) {
                        t.namespace === e.namespace && e.onEnterCompleted(), n && n.namespace === e.namespace && e.onLeaveCompleted()
                    })
                },
                onEnter: function() {},
                onEnterCompleted: function() {},
                onLeave: function() {},
                onLeaveCompleted: function() {}
            };
        e.exports = r
    }, function(e) {
        var t = {
            events: {},
            on: function(e, t) {
                this.events[e] = this.events[e] || [], this.events[e].push(t)
            },
            off: function(e, t) {
                e in this.events != 0 && this.events[e].splice(this.events[e].indexOf(t), 1)
            },
            trigger: function(e) {
                if (e in this.events != 0)
                    for (var t = 0; t < this.events[e].length; t++) this.events[e][t].apply(this, Array.prototype.slice.call(arguments, 1))
            }
        };
        e.exports = t
    }, function(e, t, n) {
        var o = n(5),
            i = {
                data: {},
                extend: function(e) {
                    return o.extend(this, e)
                },
                set: function(e, t) {
                    this.data[e] = t
                },
                get: function(e) {
                    return this.data[e]
                },
                reset: function() {
                    this.data = {}
                }
            };
        e.exports = i
    }, function(e) {
        var t = {
            history: [],
            add: function(e, t) {
                t || (t = void 0), this.history.push({
                    url: e,
                    namespace: t
                })
            },
            currentStatus: function() {
                return this.history[this.history.length - 1]
            },
            prevStatus: function() {
                var e = this.history;
                return e.length < 2 ? null : e[e.length - 2]
            }
        };
        e.exports = t
    }, function(e, t, n) {
        var o = n(5),
            i = n(7),
            r = n(11),
            a = n(8),
            s = n(9),
            c = n(12),
            l = {
                Dom: c,
                History: s,
                Cache: a,
                cacheEnabled: !0,
                transitionProgress: !1,
                ignoreClassLink: "no-barba",
                start: function() {
                    this.init()
                },
                init: function() {
                    var e = this.Dom.getContainer();
                    this.Dom.getWrapper().setAttribute("aria-live", "polite"), this.History.add(this.getCurrentUrl(), this.Dom.getNamespace(e)), i.trigger("initStateChange", this.History.currentStatus()), i.trigger("newPageReady", this.History.currentStatus(), {}, e, this.Dom.currentHTML), i.trigger("transitionCompleted", this.History.currentStatus()), this.bindEvents()
                },
                bindEvents: function() {
                    document.addEventListener("click", this.onLinkClick.bind(this)), window.addEventListener("popstate", this.onStateChange.bind(this))
                },
                getCurrentUrl: function() {
                    return o.cleanLink(o.getCurrentUrl())
                },
                goTo: function(e) {
                    window.history.pushState(null, null, e);
                    this.onStateChange();
                },
                forceGoTo: function(e) {
                    window.location = e
                },
                load: function(e) {
                    var t, n = o.deferred(),
                        i = this;
                    return t = this.Cache.get(e), t || (t = o.xhr(e), this.Cache.set(e, t)), t.then(function(e) {
                        var t = i.Dom.parseResponse(e);
                        i.Dom.putContainer(t), i.cacheEnabled || i.Cache.reset(), n.resolve(t)
                    }, function() {
                        i.forceGoTo(e), n.reject()
                    }), n.promise
                },
                getHref: function(e) {
                    if (e) return e.getAttribute && "string" == typeof e.getAttribute("xlink:href") ? e.getAttribute("xlink:href") : "string" == typeof e.href ? e.href : void 0
                },
                onLinkClick: function(e) {
                    for (var t = e.target; t && !this.getHref(t);) t = t.parentNode;
                    if (this.preventCheck(e, t)) {
                        e.stopPropagation(), e.preventDefault(), i.trigger("linkClicked", t, e);
                        var n = this.getHref(t);
                        this.goTo(n)
                    }
                },
                preventCheck: function(e, t) {
                    if (!window.history.pushState) return !1;
                    var n = this.getHref(t);
                    return !(!t || !n || e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || t.target && "_blank" === t.target || window.location.protocol !== t.protocol || window.location.hostname !== t.hostname || o.getPort() !== o.getPort(t.port) || n.indexOf("#") > -1 || t.getAttribute && "string" == typeof t.getAttribute("download") || o.cleanLink(n) == o.cleanLink(location.href) || t.classList.contains(this.ignoreClassLink))
                },
                getTransition: function() {
                    return r
                },
                onStateChange: function() {
                    var e = this.getCurrentUrl();
                    if (this.transitionProgress && this.forceGoTo(e), this.History.currentStatus().url === e) return !1;
                    this.History.add(e);
                    var t = this.load(e),
                        n = Object.create(this.getTransition());
                    this.transitionProgress = !0, i.trigger("initStateChange", this.History.currentStatus(), this.History.prevStatus());
                    var o = n.init(this.Dom.getContainer(), t);
                    t.then(this.onNewContainerLoaded.bind(this)), o.then(this.onTransitionEnd.bind(this))
                },
                onNewContainerLoaded: function(e) {
                    this.History.currentStatus().namespace = this.Dom.getNamespace(e), i.trigger("newPageReady", this.History.currentStatus(), this.History.prevStatus(), e, this.Dom.currentHTML)
                },
                onTransitionEnd: function() {
                    this.transitionProgress = !1, i.trigger("transitionCompleted", this.History.currentStatus(), this.History.prevStatus())
                }
            };
        e.exports = l
    }, function(e, t, n) {
        var o = n(4),
            i = o.extend({
                start: function() {
                    this.newContainerLoading.then(this.finish.bind(this))
                },
                finish: function() {
                    document.body.scrollTop = 0, this.done()
                }
            });
        e.exports = i
    }, function(e) {
        var t = {
            dataNamespace: "namespace",
            wrapperId: "barba-wrapper",
            containerClass: "barba-container",
            currentHTML: document.documentElement.innerHTML,
            parseResponse: function(e) {
                this.currentHTML = e;
                var t = document.createElement("div");
                t.innerHTML = e;
                var n = t.querySelector("title");
                return n && (document.title = n.textContent), this.getContainer(t)
            },
            getWrapper: function() {
                var e = document.getElementById(this.wrapperId);
                if (!e) throw new Error("Barba.js: wrapper not found!");
                return e
            },
            getContainer: function(e) {
                if (e || (e = document.body), !e) throw new Error("Barba.js: DOM not ready!");
                var t = this.parseContainer(e);
                if (t && t.jquery && (t = t[0]), !t) throw new Error("Barba.js: no container found");
                return t
            },
            getNamespace: function(e) {
                return e && e.dataset ? e.dataset[this.dataNamespace] : e ? e.getAttribute("data-" + this.dataNamespace) : null
            },
            putContainer: function(e) {
                e.style.visibility = "hidden", this.getWrapper().appendChild(e)
            },
            parseContainer: function(e) {
                return e.querySelector("." + this.containerClass)
            }
        };
        e.exports = t
    }, function(e, t, n) {
        var o = n(5),
            i = n(10),
            r = {
                ignoreClassLink: "no-barba-prefetch",
                init: function() {
                    return !!window.history.pushState && (document.body.addEventListener("mouseover", this.onLinkEnter.bind(this)), void document.body.addEventListener("touchstart", this.onLinkEnter.bind(this)))
                },
                onLinkEnter: function(e) {
                    for (var t = e.target; t && !i.getHref(t);) t = t.parentNode;
                    if (t && !t.classList.contains(this.ignoreClassLink)) {
                        var n = i.getHref(t);
                        if (i.preventCheck(e, t) && !i.Cache.get(n)) {
                            var r = o.xhr(n);
                            i.Cache.set(n, r)
                        }
                    }
                }
            };
        e.exports = r
    }])
});
var resizeTimer;
$(window).on("resize", function() {
    $(".loader-slide-left").hide(), $(".loader-slide-right").hide(), clearTimeout(resizeTimer), resizeTimer = setTimeout(function() {
        $(".loader-slide-left").show(), $(".loader-slide-right").show()
    }, 250)
}), window.location.href.indexOf("index") > -1 && $("canvas").hide(), window.location.href.indexOf("thanks") > -1 && $("canvas").hide();
var caseStudy = new Array;
caseStudy[0] = "<a href='moodily.html' >We recently created a design inspiration builder. </a>", caseStudy[1] = "<a href='hazel.html' >We recently designed a new experience for Hazel Health.</a>", caseStudy[2] = "<a href='trackr.html' >We created a brand and marketing strategy for Trackr.</a>", caseStudy[3] = "<a href='atv.html' >We created a new experience for a vibrant coworking giant.</a>", caseStudy[4] = "<a href='toyota.html' >We created a data rich visual experience for Toyota.</a>";
var caseRandom = Math.floor(Math.random() * caseStudy.length),
    sayHello = new Array;
sayHello[0] = "Hi there", sayHello[1] = "What's Crackin", sayHello[2] = "Sup Homeslice", sayHello[3] = "Salutations", sayHello[4] = "Ciao", sayHello[5] = "Aloha", sayHello[6] = "Ahoy", sayHello[7] = "Hiya", sayHello[5] = "Howdy partner";
var helloRandom = Math.floor(Math.random() * sayHello.length);
$(document).ready(function() {
        function e() {
            requestAnimationFrame(e), progTarget = window.scrollY / (document.body.offsetHeight - window.innerHeight), prog += .4 * (progTarget - prog), ctx.clearRect(0, 0, w, h), ctx.beginPath(), ctx.arc(w / 2, h / 2, w / 2 - lineWidth / 2, 0, TAU), ctx.lineWidth = lineWidth, ctx.strokeStyle = "hsla(0, 0%, 0%, 0.1)", ctx.stroke(), ctx.beginPath(), ctx.arc(w / 2, h / 2, w / 2 - lineWidth / 2, -Math.PI / 2, -Math.PI / 2 + prog * TAU), ctx.strokeStyle = "hsla(40, 54%, 76%, 1)", ctx.stroke()
        }
        $("#caseRandom").html(caseStudy[caseRandom]), $("#hello").html(sayHello[helloRandom]),
            function(e, t, n, o, i, r) {
                e.hj = e.hj || function() {
                    (e.hj.q = e.hj.q || []).push(arguments)
                }, e._hjSettings = {
                    hjid: 473775,
                    hjsv: 6
                }, i = t.getElementsByTagName("head")[0], r = t.createElement("script"), r.async = 1, r.src = n + e._hjSettings.hjid + o + e._hjSettings.hjsv, i.appendChild(r)
            }(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv="), setTimeout(function() {
                $(".intro-load").fadeOut()
            }, 1200), $(".shots").slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: !0
            }), $(".works").slick({
                infinite: !1,
                slidesToShow: 5,
                dots: !1,
                responsive: [{
                    breakpoint: 1150,
                    settings: {
                        slidesToShow: 4,
                        dots: !0,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 3,
                        dots: !0,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 2,
                        dots: !0,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        dots: !0,
                        slidesToScroll: 1
                    }
                }]
            }), $(".mobile-menu-icon").click(function() {
                $("#mobile-menu").addClass("show-mobile-menu"), $(".mobile-menu-icon").hide(), $("canvas").hide(), $(".back-to-top").hide()
            }), $(".close-mobile-menu").click(function() {
                $("#mobile-menu").removeClass("show-mobile-menu"), $("body").height() < $(window).height() ? ($("canvas").hide(), $(".back-to-top").hide()) : ($("canvas").show(), $(".back-to-top").show()), $(".mobile-menu-icon").delay(350).fadeIn("slow")
            }), $(".works-nav, .mobile-works").click(function() {
                $(".menu-items").toggleClass("hide-menu-items"), $(".our-works").toggleClass("show-work"), $("nav").toggleClass("hide-nav"), $(".case").toggleClass("case-slide"), $("canvas").fadeOut(), $(".back-to-top").fadeOut(), window.location.href.indexOf("index") > -1 && ($("canvas").hide(), $(".back-to-top").hide())
            }), $(".close-case").click(function() {
                $(".menu-items").toggleClass("hide-menu-items"), $(".our-works").toggleClass("show-work"), $(".case").toggleClass("case-slide"), setTimeout(function() {
                    $("nav").toggleClass("hide-nav"), $("body").height() < $(window).height() ? ($("canvas").hide(), $(".back-to-top").hide()) : ($("canvas").fadeIn(), $(".back-to-top").fadeIn()), $(".mobile-menu-icon").delay(350).fadeIn("slow")
                }, 700)
            });
        new SmoothScroll('a[href*="#"]');
        c = document.createElement("canvas"), ctx = c.getContext("2d"), w = h = c.width = c.height = 64, lineWidth = 12, prog = 0, progTarget = 0, TAU = 2 * Math.PI, e(), document.body.appendChild(c), $("body").height() < $(window).height() && $(c).hide();
        var t = plyr.setup(".video-container-services, .video-container");
        $(".play").click(function() {
            $(".loop-video").addClass("hide-loop"), setTimeout(function() {
                $(".video-container-services").toggleClass("play-video-services"), t[0].play()
            }, 300)
        }), $(".showreel").click(function() {
            $("canvas").fadeOut(), window.location.href.indexOf("index") > -1 && $("canvas").hide(), $(".content").toggleClass("hide-content"), $(".menu,.works-nav,.logo").fadeOut("slow"), setTimeout(function() {
                $("nav").toggleClass("expand-nav")
            }, 400), setTimeout(function() {
                $("body").addClass("video-active"), $(".modal").toggleClass("show-modal"), t[0].play()
            }, 1500), setTimeout(function() {
                $(".video-container").toggleClass("show-video-container")
            }, 1600)
        }), $(".close").on("click", function() {
            $("body").removeClass("video-active"), $(".video-container").toggleClass("show-video-container"), t[0].pause(), setTimeout(function() {
                $(".modal").toggleClass("show-modal")
            }, 500), setTimeout(function() {
                $("nav").toggleClass("expand-nav")
            }, 800), setTimeout(function() {
                $("canvas").fadeIn(), window.location.href.indexOf("index") > -1 && $("canvas").hide(), $(".content").toggleClass("hide-content"), $(".menu,.works-nav,.logo").fadeIn("slow")
            }, 1e3)
        })
    }),
    function(e, t) {
        if ("function" == typeof define && define.amd) define(["exports", "module"], t);
        else if ("undefined" != typeof exports && "undefined" != typeof module) t(exports, module);
        else {
            var n = {
                exports: {}
            };
            t(n.exports, n), e.autosize = n.exports
        }
    }(this, function(e, t) {
        "use strict";

        function n(e) {
            function t() {
                var t = window.getComputedStyle(e, null);
                "vertical" === t.resize ? e.style.resize = "none" : "both" === t.resize && (e.style.resize = "horizontal"), c = "content-box" === t.boxSizing ? -(parseFloat(t.paddingTop) + parseFloat(t.paddingBottom)) : parseFloat(t.borderTopWidth) + parseFloat(t.borderBottomWidth), isNaN(c) && (c = 0), s()
            }

            function n(t) {
                var n = e.style.width;
                e.style.width = "0px", e.offsetWidth, e.style.width = n, e.style.overflowY = t
            }

            function o(e) {
                for (var t = []; e && e.parentNode && e.parentNode instanceof Element;) e.parentNode.scrollTop && t.push({
                    node: e.parentNode,
                    scrollTop: e.parentNode.scrollTop
                }), e = e.parentNode;
                return t
            }

            function i() {
                var t = e.style.height,
                    n = o(e),
                    i = document.documentElement && document.documentElement.scrollTop;
                e.style.height = "";
                var r = e.scrollHeight + c;
                if (0 === e.scrollHeight) return void(e.style.height = t);
                e.style.height = r + "px", l = e.clientWidth, n.forEach(function(e) {
                    e.node.scrollTop = e.scrollTop
                }), i && (document.documentElement.scrollTop = i)
            }

            function s() {
                i();
                var t = Math.round(parseFloat(e.style.height)),
                    o = window.getComputedStyle(e, null),
                    r = "content-box" === o.boxSizing ? Math.round(parseFloat(o.height)) : e.offsetHeight;
                if (r !== t ? "hidden" === o.overflowY && (n("scroll"), i(), r = "content-box" === o.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight) : "hidden" !== o.overflowY && (n("hidden"), i(), r = "content-box" === o.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight), d !== r) {
                    d = r;
                    var s = a("autosize:resized");
                    try {
                        e.dispatchEvent(s)
                    } catch (e) {}
                }
            }
            if (e && e.nodeName && "TEXTAREA" === e.nodeName && !r.has(e)) {
                var c = null,
                    l = e.clientWidth,
                    d = null,
                    u = function() {
                        e.clientWidth !== l && s()
                    },
                    h = function(t) {
                        window.removeEventListener("resize", u, !1), e.removeEventListener("input", s, !1), e.removeEventListener("keyup", s, !1), e.removeEventListener("autosize:destroy", h, !1), e.removeEventListener("autosize:update", s, !1), Object.keys(t).forEach(function(n) {
                            e.style[n] = t[n]
                        }), r["delete"](e)
                    }.bind(e, {
                        height: e.style.height,
                        resize: e.style.resize,
                        overflowY: e.style.overflowY,
                        overflowX: e.style.overflowX,
                        wordWrap: e.style.wordWrap
                    });
                e.addEventListener("autosize:destroy", h, !1), "onpropertychange" in e && "oninput" in e && e.addEventListener("keyup", s, !1), window.addEventListener("resize", u, !1), e.addEventListener("input", s, !1), e.addEventListener("autosize:update", s, !1), e.style.overflowX = "hidden", e.style.wordWrap = "break-word", r.set(e, {
                    destroy: h,
                    update: s
                }), t()
            }
        }

        function o(e) {
            var t = r.get(e);
            t && t.destroy()
        }

        function i(e) {
            var t = r.get(e);
            t && t.update()
        }
        var r = "function" == typeof Map ? new Map : function() {
                var e = [],
                    t = [];
                return {
                    has: function(t) {
                        return e.indexOf(t) > -1
                    },
                    get: function(n) {
                        return t[e.indexOf(n)]
                    },
                    set: function(n, o) {
                        -1 === e.indexOf(n) && (e.push(n), t.push(o))
                    },
                    "delete": function(n) {
                        var o = e.indexOf(n);
                        o > -1 && (e.splice(o, 1), t.splice(o, 1))
                    }
                }
            }(),
            a = function(e) {
                return new Event(e, {
                    bubbles: !0
                })
            };
        try {
            new Event("test")
        } catch (e) {
            a = function(e) {
                var t = document.createEvent("Event");
                return t.initEvent(e, !0, !1), t
            }
        }
        var s = null;
        "undefined" == typeof window || "function" != typeof window.getComputedStyle ? (s = function(e) {
            return e
        }, s.destroy = function(e) {
            return e
        }, s.update = function(e) {
            return e
        }) : (s = function(e, t) {
            return e && Array.prototype.forEach.call(e.length ? e : [e], function(e) {
                return n(e, t)
            }), e
        }, s.destroy = function(e) {
            return e && Array.prototype.forEach.call(e.length ? e : [e], o), e
        }, s.update = function(e) {
            return e && Array.prototype.forEach.call(e.length ? e : [e], i), e
        }), t.exports = s
    }), document.addEventListener("DOMContentLoaded", function() {
        Barba.Pjax.init(), Barba.Prefetch.init();
        var e = new Array;
        e[0] = "<a href='moodily.html' >We recently created a design inspiration builder. </a>", e[1] = "<a href='hazel.html' >We recently designed a new experience for Hazel Health.</a>", e[2] = "<a href='trackr.html' >We created a brand and marketing strategy for Trackr.</a>", e[3] = "<a href='atv.html' >We created a new experience for a vibrant coworking giant.</a>", e[4] = "<a href='toyota.html' >We created a data rich visual experience for Toyota.</a>";
        var t = Math.floor(Math.random() * e.length),
            n = new Array;
        n[0] = "Hi there", n[1] = "What's Crackin", n[2] = "Sup Homeslice", n[3] = "Salutations", n[4] = "Ciao", n[5] = "Aloha", n[6] = "Ahoy", n[7] = "Hiya", n[5] = "Howdy partner";
        var o = Math.floor(Math.random() * n.length);
        window.location.href.indexOf("index") > -1 && ($("canvas").hide(), $(".back-to-top").hide()), window.location.href.indexOf("thanks") > -1 && ($("canvas").hide(), $(".back-to-top").hide());
        var i = Barba.BaseTransition.extend({
            start: function() {
                Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.showLoader).then(this.fadeIn.bind(this))
            },
            fadeOut: function() {
                var i = this.oldContainer;
                return new Promise(function(r) {
                    anime({
                        targets: i,
                        easing: "easeInOutQuad",
                        duration: 650,
                        opacity: 0,
                        complete: function() {
                            $("canvas").fadeOut(), $(".back-to-top").fadeOut(), $("#caseRandom").html(e[t]), $("#hello").html(n[o]), setTimeout(function() {
                                $(".loader-content").toggleClass("show-content"), $(".spinner").toggleClass("show-spinner")
                            }, 0), r()
                        }
                    })
                })
            },
            showLoader: function() {
                return new Promise(function(e) {
                    anime({
                        duration: 1100,
                        complete: function() {
                            $(".spinner").toggleClass("show-spinner"), $(".intro-load").fadeOut(), setTimeout(function() {
                                $(".loader-content").toggleClass("show-content")
                            }, 500), e()
                        }
                    })
                })
            },
            fadeIn: function() {
                var e = this,
                    t = this.oldContainer,
                    n = this.newContainer;
                window.scrollTo(0, 0), t.style.display = "none", n.style.visibility = "visible", n.style.opacity = "0", anime({
                    targets: n,
                    opacity: 1,
                    translateX: 0,
                    easing: "easeInOutQuad",
                    delay: 1250,
                    duration: 650,
                    complete: function() {
                        $(".no-scroll").length && $("body").removeClass("no-scroll"), $("canvas").fadeIn(), $(".back-to-top").fadeIn(), window.location.href.indexOf("index") > -1 && ($("canvas").hide(), $(".back-to-top").hide()), window.location.href.indexOf("thanks") > -1 && ($("canvas").hide(), $(".back-to-top").hide()), e.done()
                    }
                })
            }
        });
        Barba.Dispatcher.on("newPageReady", function() {
            ! function(e, t) {
                if ("function" == typeof define && define.amd) define(["exports", "module"], t);
                else if ("undefined" != typeof exports && "undefined" != typeof module) t(exports, module);
                else {
                    var n = {
                        exports: {}
                    };
                    t(n.exports, n), e.autosize = n.exports
                }
            }(this, function(e, t) {
                "use strict";

                function n(e) {
                    function t() {
                        var t = window.getComputedStyle(e, null);
                        "vertical" === t.resize ? e.style.resize = "none" : "both" === t.resize && (e.style.resize = "horizontal"), c = "content-box" === t.boxSizing ? -(parseFloat(t.paddingTop) + parseFloat(t.paddingBottom)) : parseFloat(t.borderTopWidth) + parseFloat(t.borderBottomWidth), isNaN(c) && (c = 0), s()
                    }

                    function n(t) {
                        var n = e.style.width;
                        e.style.width = "0px", e.offsetWidth, e.style.width = n, e.style.overflowY = t
                    }

                    function o(e) {
                        for (var t = []; e && e.parentNode && e.parentNode instanceof Element;) e.parentNode.scrollTop && t.push({
                            node: e.parentNode,
                            scrollTop: e.parentNode.scrollTop
                        }), e = e.parentNode;
                        return t
                    }

                    function i() {
                        var t = e.style.height,
                            n = o(e),
                            i = document.documentElement && document.documentElement.scrollTop;
                        e.style.height = "";
                        var r = e.scrollHeight + c;
                        if (0 === e.scrollHeight) return void(e.style.height = t);
                        e.style.height = r + "px", l = e.clientWidth, n.forEach(function(e) {
                            e.node.scrollTop = e.scrollTop
                        }), i && (document.documentElement.scrollTop = i)
                    }

                    function s() {
                        i();
                        var t = Math.round(parseFloat(e.style.height)),
                            o = window.getComputedStyle(e, null),
                            r = "content-box" === o.boxSizing ? Math.round(parseFloat(o.height)) : e.offsetHeight;
                        if (r !== t ? "hidden" === o.overflowY && (n("scroll"), i(), r = "content-box" === o.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight) : "hidden" !== o.overflowY && (n("hidden"), i(), r = "content-box" === o.boxSizing ? Math.round(parseFloat(window.getComputedStyle(e, null).height)) : e.offsetHeight), d !== r) {
                            d = r;
                            var s = a("autosize:resized");
                            try {
                                e.dispatchEvent(s)
                            } catch (e) {}
                        }
                    }
                    if (e && e.nodeName && "TEXTAREA" === e.nodeName && !r.has(e)) {
                        var c = null,
                            l = e.clientWidth,
                            d = null,
                            u = function() {
                                e.clientWidth !== l && s()
                            },
                            h = function(t) {
                                window.removeEventListener("resize", u, !1), e.removeEventListener("input", s, !1), e.removeEventListener("keyup", s, !1), e.removeEventListener("autosize:destroy", h, !1), e.removeEventListener("autosize:update", s, !1), Object.keys(t).forEach(function(n) {
                                    e.style[n] = t[n]
                                }), r["delete"](e)
                            }.bind(e, {
                                height: e.style.height,
                                resize: e.style.resize,
                                overflowY: e.style.overflowY,
                                overflowX: e.style.overflowX,
                                wordWrap: e.style.wordWrap
                            });
                        e.addEventListener("autosize:destroy", h, !1), "onpropertychange" in e && "oninput" in e && e.addEventListener("keyup", s, !1), window.addEventListener("resize", u, !1), e.addEventListener("input", s, !1), e.addEventListener("autosize:update", s, !1), e.style.overflowX = "hidden", e.style.wordWrap = "break-word", r.set(e, {
                            destroy: h,
                            update: s
                        }), t()
                    }
                }

                function o(e) {
                    var t = r.get(e);
                    t && t.destroy()
                }

                function i(e) {
                    var t = r.get(e);
                    t && t.update()
                }
                var r = "function" == typeof Map ? new Map : function() {
                        var e = [],
                            t = [];
                        return {
                            has: function(t) {
                                return e.indexOf(t) > -1
                            },
                            get: function(n) {
                                return t[e.indexOf(n)]
                            },
                            set: function(n, o) {
                                -1 === e.indexOf(n) && (e.push(n), t.push(o))
                            },
                            "delete": function(n) {
                                var o = e.indexOf(n);
                                o > -1 && (e.splice(o, 1), t.splice(o, 1))
                            }
                        }
                    }(),
                    a = function(e) {
                        return new Event(e, {
                            bubbles: !0
                        })
                    };
                try {
                    new Event("test")
                } catch (e) {
                    a = function(e) {
                        var t = document.createEvent("Event");
                        return t.initEvent(e, !0, !1), t
                    }
                }
                var s = null;
                "undefined" == typeof window || "function" != typeof window.getComputedStyle ? (s = function(e) {
                    return e
                }, s.destroy = function(e) {
                    return e
                }, s.update = function(e) {
                    return e
                }) : (s = function(e, t) {
                    return e && Array.prototype.forEach.call(e.length ? e : [e], function(e) {
                        return n(e, t)
                    }), e
                }, s.destroy = function(e) {
                    return e && Array.prototype.forEach.call(e.length ? e : [e], o), e
                }, s.update = function(e) {
                    return e && Array.prototype.forEach.call(e.length ? e : [e], i), e
                }), t.exports = s
            }), autosize(document.querySelectorAll("textarea")),
                function(e, t, n, o, i, r) {
                    e.hj = e.hj || function() {
                        (e.hj.q = e.hj.q || []).push(arguments)
                    }, e._hjSettings = {
                        hjid: 473775,
                        hjsv: 6
                    }, i = t.getElementsByTagName("head")[0], r = t.createElement("script"), r.async = 1, r.src = n + e._hjSettings.hjid + o + e._hjSettings.hjsv, i.appendChild(r)
                }(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv="), $(".mobile-menu-icon").click(function() {
                    $("#mobile-menu").addClass("show-mobile-menu"), $(".mobile-menu-icon").hide(), $("canvas").hide(), $(".back-to-top").hide()
                }), $(".close-mobile-menu").click(function() {
                    $("#mobile-menu").removeClass("show-mobile-menu"), $("canvas").show(), $(".back-to-top").show(), $(".mobile-menu-icon").delay(350).fadeIn("slow")
                });
            var e;
            $(window).on("resize", function() {
                $(".loader-slide-left").hide(), $(".loader-slide-right").hide(), clearTimeout(e), e = setTimeout(function() {
                    $(".loader-slide-left").show(), $(".loader-slide-right").show()
                }, 250)
            }), $(".shots").not(".slick-initialized").slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: !0
            }), $(".works").not(".slick-initialized").slick({
                infinite: !1,
                slidesToShow: 5,
                dots: !1,
                responsive: [{
                    breakpoint: 1150,
                    settings: {
                        slidesToShow: 4,
                        dots: !0,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 3,
                        dots: !0,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 650,
                    settings: {
                        slidesToShow: 2,
                        dots: !0,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        dots: !0,
                        slidesToScroll: 1
                    }
                }]
            });
            var t = plyr.setup(".video-container-services, .video-container");
            $(".play").click(function() {
                $(".loop-video").addClass("hide-loop"), setTimeout(function() {
                    $(".video-container-services").toggleClass("play-video-services"), t[0].play()
                }, 300)
            }), $(".showreel").click(function() {
                $("canvas").fadeOut(), $(".back-to-top").fadeOut(), window.location.href.indexOf("index") > -1 && ($("canvas").hide(), $(".back-to-top").hide()), window.location.href.indexOf("thanks") > -1 && ($("canvas").hide(), $(".back-to-top").hide()), $(".content").toggleClass("hide-content"), $(".menu,.works-nav,.logo").fadeOut("slow"), setTimeout(function() {
                    $("nav").toggleClass("expand-nav")
                }, 400), setTimeout(function() {
                    $(".modal").toggleClass("show-modal"), t[0].play()
                }, 1500), setTimeout(function() {
                    $(".video-container").toggleClass("show-video-container")
                }, 1600)
            }), $(".close").on("click", function() {
                $(".video-container").toggleClass("show-video-container"), t[0].pause(), setTimeout(function() {
                    $(".modal").toggleClass("show-modal")
                }, 500), setTimeout(function() {
                    $("nav").toggleClass("expand-nav")
                }, 800), setTimeout(function() {
                    $(".content").toggleClass("hide-content"), $(".menu,.works-nav,.logo").fadeIn("slow"), $("canvas").fadeIn(), $(".back-to-top").fadeIn(), window.location.href.indexOf("index") > -1 && ($("canvas").hide(), $(".back-to-top").hide())
                }, 1e3)
            }), $(".works-nav, .mobile-works").click(function() {
                $("body").toggleClass("no-scroll"), $(".menu-items").toggleClass("hide-menu-items"), $(".our-works").toggleClass("show-work"), $("nav").toggleClass("hide-nav"), $(".case").toggleClass("case-slide"), $("canvas").fadeOut(), $(".back-to-top").fadeOut(), window.location.href.indexOf("index") > -1 && ($("canvas").hide(), $(".back-to-top").hide())
            }), $(".close-case").click(function() {
                $("body").toggleClass("no-scroll"), $(".menu-items").toggleClass("hide-menu-items"), $(".our-works").toggleClass("show-work"), $(".case").toggleClass("case-slide"), setTimeout(function() {
                    $("nav").toggleClass("hide-nav"), $("canvas").fadeIn(), $(".back-to-top").fadeIn(), window.location.href.indexOf("index") > -1 && ($("canvas").hide(), $(".back-to-top").hide())
                }, 700)
            })
        });
        var r = !1;
        window.addEventListener("popstate", function() {
            r = !0
        });
        var a;
        Barba.Dispatcher.on("linkClicked", function(e) {
            a = e, r = !1
        }), Barba.Dispatcher.on("initStateChange", function() {}), Barba.Pjax.getTransition = function() {
            return i
        }
    });