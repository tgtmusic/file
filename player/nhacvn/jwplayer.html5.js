(function(b) {
    b.html5 = {};
    b.html5.version = "6.12.4956";
    var e = b.utils.css;
    var a = ".jwplayer ";
    var d = [a, "div", "span", "a", "img", "ul", "li", "video"].join(", " + a);
    e(d + ", .jwclick", {
        margin: 0,
        padding: 0,
        border: 0,
        color: "#000000",
        "font-size": "100%",
        font: "inherit",
        "vertical-align": "baseline",
        "background-color": "transparent",
        "text-align": "left",
        direction: "ltr",
        "line-height": 20,
        "-webkit-tap-highlight-color": "rgba(255, 255, 255, 0)"
    });
    e(a + "," + a + "*", {
        "box-sizing": "content-box"
    });
    e(a + "* button," + a + "* input," + a + "* select," + a + "* textarea", {
        "box-sizing": "border-box"
    });
    e(a + "ul", {
        "list-style": "none"
    });
    e(".jwplayer .jwcontrols", {
        "pointer-events": "none"
    });
    e(".jwplayer.jw-user-inactive .jwcontrols", {
        "pointer-events": "all"
    });
    var c = [".jwplayer .jwcontrols .jwdockbuttons", ".jwplayer .jwcontrols .jwcontrolbar", ".jwplayer .jwcontrols .jwskip", ".jwplayer .jwcontrols .jwdisplayIcon", ".jwplayer .jwcontrols .jwpreview", ".jwplayer .jwcontrols .jwlogo"];
    e(c.join(", "), {
        "pointer-events": "all"
    })
})(jwplayer);
(function(a) {
    var b = document;
    a.parseDimension = function(c) {
        if (typeof c === "string") {
            if (c === "") {
                return 0
            } else {
                if (c.lastIndexOf("%") > -1) {
                    return c
                }
            }
            return parseInt(c.replace("px", ""), 10)
        }
        return c
    };
    a.timeFormat = function(e) {
        if (e > 0) {
            var d = Math.floor(e / 3600),
                f = Math.floor((e - d * 3600) / 60),
                c = Math.floor(e % 60);
            return (d ? d + ":" : "") + (f < 10 ? "0" : "") + f + ":" + (c < 10 ? "0" : "") + c
        } else {
            return "00:00"
        }
    };
    a.bounds = function(d) {
        var g = {
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            top: 0,
            bottom: 0
        };
        if (!d || !b.body.contains(d)) {
            return g
        }
        if (d.getBoundingClientRect) {
            var f = d.getBoundingClientRect(d),
                c = window.pageYOffset,
                e = window.pageXOffset;
            if (!f.width && !f.height && !f.left && !f.top) {
                return g
            }
            g.left = f.left + e;
            g.right = f.right + e;
            g.top = f.top + c;
            g.bottom = f.bottom + c;
            g.width = f.right - f.left;
            g.height = f.bottom - f.top
        } else {
            g.width = d.offsetWidth | 0;
            g.height = d.offsetHeight | 0;
            do {
                g.left += d.offsetLeft | 0;
                g.top += d.offsetTop | 0
            } while (d = d.offsetParent);
            g.right = g.left + g.width;
            g.bottom = g.top + g.height
        }
        return g
    };
    a.empty = function(c) {
        if (!c) {
            return
        }
        while (c.childElementCount > 0) {
            c.removeChild(c.children[0])
        }
    }
})(jwplayer.utils);
(function(a) {
    var b = a.stretching = {
        NONE: "none",
        FILL: "fill",
        UNIFORM: "uniform",
        EXACTFIT: "exactfit"
    };
    a.scale = function(e, d, c, g, h) {
        var f = "";
        d = d || 1;
        c = c || 1;
        g = g | 0;
        h = h | 0;
        if (d !== 1 || c !== 1) {
            f = "scale(" + d + ", " + c + ")"
        }
        if (g || h) {
            if (f) {
                f += " "
            }
            f = "translate(" + g + "px, " + h + "px)"
        }
        a.transform(e, f)
    };
    a.stretch = function(j, n, m, h, l, i) {
        if (!n) {
            return false
        }
        if (!m || !h || !l || !i) {
            return false
        }
        j = j || b.UNIFORM;
        var d = Math.ceil(m / 2) * 2 / l,
            g = Math.ceil(h / 2) * 2 / i,
            e = (n.tagName.toLowerCase() === "video"),
            f = false,
            k = "jw" + j.toLowerCase();
        switch (j.toLowerCase()) {
            case b.FILL:
                if (d > g) {
                    g = d
                } else {
                    d = g
                }
                f = true;
                break;
            case b.NONE:
                d = g = 1;
            case b.EXACTFIT:
                f = true;
                break;
            case b.UNIFORM:
            default:
                if (d > g) {
                    if (l * g / m > 0.95) {
                        f = true;
                        k = "jwexactfit"
                    } else {
                        l = l * g;
                        i = i * g
                    }
                } else {
                    if (i * d / h > 0.95) {
                        f = true;
                        k = "jwexactfit"
                    } else {
                        l = l * d;
                        i = i * d
                    }
                }
                if (f) {
                    d = Math.ceil(m / 2) * 2 / l;
                    g = Math.ceil(h / 2) * 2 / i
                }
        }
        if (e) {
            var c = {
                left: "",
                right: "",
                width: "",
                height: ""
            };
            if (f) {
                if (m < l) {
                    c.left = c.right = Math.ceil((m - l) / 2)
                }
                if (h < i) {
                    c.top = c.bottom = Math.ceil((h - i) / 2)
                }
                c.width = l;
                c.height = i;
                a.scale(n, d, g, 0, 0)
            } else {
                f = false;
                a.transform(n)
            }
            a.css.style(n, c)
        } else {
            n.className = n.className.replace(/\s*jw(none|exactfit|uniform|fill)/g, "") + " " + k
        }
        return f
    }
})(jwplayer.utils);
(function(a) {
    a.dfxp = function() {
        var c = jwplayer.utils.seconds;
        this.parse = function(h) {
            var e = [{
                begin: 0,
                text: ""
            }];
            h = h.replace(/^\s+/, "").replace(/\s+$/, "");
            var g = h.split("</p>");
            var k = h.split("</tt:p>");
            var j = [];
            var d;
            for (d = 0; d < g.length; d++) {
                if (g[d].indexOf("<p") >= 0) {
                    g[d] = g[d].substr(g[d].indexOf("<p") + 2).replace(/^\s+/, "").replace(/\s+$/, "");
                    j.push(g[d])
                }
            }
            for (d = 0; d < k.length; d++) {
                if (k[d].indexOf("<tt:p") >= 0) {
                    k[d] = k[d].substr(k[d].indexOf("<tt:p") + 5).replace(/^\s+/, "").replace(/\s+$/, "");
                    j.push(k[d])
                }
            }
            g = j;
            for (d = 0; d < g.length; d++) {
                var f = b(g[d]);
                if (f.text) {
                    e.push(f);
                    if (f.end) {
                        e.push({
                            begin: f.end,
                            text: ""
                        });
                        delete f.end
                    }
                }
            }
            if (e.length > 1) {
                return e
            } else {
                throw {
                    message: "Invalid DFXP file:"
                }
            }
        };

        function b(g) {
            var f = {};
            try {
                var d = g.indexOf('begin="');
                g = g.substr(d + 7);
                d = g.indexOf('" end="');
                f.begin = c(g.substr(0, d));
                g = g.substr(d + 7);
                d = g.indexOf('"');
                f.end = c(g.substr(0, d));
                d = g.indexOf('">');
                g = g.substr(d + 2);
                f.text = g
            } catch (e) {}
            return f
        }
    }
})(jwplayer.parsers);
(function(a) {
    a.srt = function() {
        var c = jwplayer.utils,
            d = c.seconds;
        this.parse = function(j, k) {
            var f = k ? [] : [{
                begin: 0,
                text: ""
            }];
            j = c.trim(j);
            var h = j.split("\r\n\r\n");
            if (h.length === 1) {
                h = j.split("\n\n")
            }
            for (var e = 0; e < h.length; e++) {
                if (h[e] === "WEBVTT") {
                    continue
                }
                var g = b(h[e]);
                if (g.text) {
                    f.push(g);
                    if (g.end && !k) {
                        f.push({
                            begin: g.end,
                            text: ""
                        })
                    }
                }
            }
            if (f.length > 1) {
                return f
            } else {
                throw {
                    message: "Invalid SRT file"
                }
            }
        };

        function b(k) {
            var j = {};
            var l = k.split("\r\n");
            if (l.length === 1) {
                l = k.split("\n")
            }
            try {
                var e = 1;
                if (l[0].indexOf(" --> ") > 0) {
                    e = 0
                }
                var g = l[e].indexOf(" --> ");
                if (g > 0) {
                    j.begin = d(l[e].substr(0, g));
                    j.end = d(l[e].substr(g + 5))
                }
                if (l[e + 1]) {
                    j.text = l[e + 1];
                    for (var h = e + 2; h < l.length; h++) {
                        j.text += "<br/>" + l[h]
                    }
                }
            } catch (f) {}
            return j
        }
    }
})(jwplayer.parsers);
(function(b) {
    var e = b.utils.noop,
        a = b._,
        d = b.events,
        c = a.constant(false);
    var f = {
        supports: c,
        play: e,
        load: e,
        stop: e,
        volume: e,
        mute: e,
        seek: e,
        seekDrag: e,
        resize: e,
        remove: e,
        destroy: e,
        setVisibility: e,
        setFullscreen: c,
        getFullscreen: e,
        getContainer: e,
        setContainer: c,
        isAudioFile: c,
        supportsFullscreen: c,
        getQualityLevels: e,
        getCurrentQuality: e,
        setCurrentQuality: e,
        getAudioTracks: e,
        getCurrentAudioTrack: e,
        setCurrentAudioTrack: e,
        checkComplete: e,
        setControls: e,
        attachMedia: e,
        detachMedia: e,
        setState: function(h) {
            if (h === this.state) {
                return
            }
            var g = this.state || d.state.IDLE;
            this.state = h;
            this.sendEvent(d.JWPLAYER_PLAYER_STATE, {
                oldstate: g,
                newstate: h
            })
        }
    };
    b.html5.DefaultProvider = f
})(jwplayer);
(function(a) {
    function b(c) {
        if (a._.isObject(c) && a.html5.YoutubeProvider.supports(c)) {
            return a.html5.YoutubeProvider
        }
        return a.html5.VideoProvider
    }
    a.html5.chooseProvider = b
})(jwplayer);
(function(i) {
    var o = i.utils,
        q = i._,
        b = i.events,
        e = b.state,
        l = window.clearInterval,
        d = i.html5.DefaultProvider,
        f = o.isMSIE(),
        m = o.isMobile(),
        a = o.isSafari(),
        h = o.isAndroidNative(),
        n = o.isIOS(7);

    function r(t, s) {
        o.foreach(t, function(u, v) {
            s.addEventListener(u, v, false)
        })
    }

    function p(t, s) {
        o.foreach(t, function(u, v) {
            s.removeEventListener(u, v, false)
        })
    }

    function j(s) {
        return Math.floor(s * 10) / 10
    }

    function c(ao, u) {
        this.state = e.IDLE;
        var s = new i.events.eventdispatcher("provider." + this.name);
        o.extend(this, s);
        var v = this,
            ak = {
                abort: N,
                canplay: F,
                canplaythrough: N,
                click: K,
                durationchange: U,
                emptied: N,
                ended: A,
                error: B,
                loadeddata: N,
                loadedmetadata: F,
                loadstart: N,
                pause: an,
                play: an,
                playing: an,
                progress: V,
                ratechange: N,
                readystatechange: N,
                seeked: Z,
                seeking: f ? J : N,
                stalled: N,
                suspend: N,
                timeupdate: aq,
                volumechange: y,
                waiting: J,
                webkitbeginfullscreen: T,
                webkitendfullscreen: ar
            },
            P, ae, av, D, at = false,
            ad, al = 0,
            Y = false,
            af, C = -1,
            ac = -1,
            G = false,
            aa, W = -1,
            M = false,
            au = false;
        this.sendEvent = function() {
            if (!G) {
                return
            }
            s.sendEvent.apply(this, arguments)
        };
        var H = document.getElementById(ao);
        var ap = "video";
        var X = u.config.playlist[0];
        var R = X.sources[0];
        var O = R.file;
        var ag = O.indexOf(".mp3") > 0;
        if (ag) {
            ap = "audio"
        }
        var L = H.querySelector(ap);
        L = L || document.createElement(ap);
        r(ak, L);
        if (!n) {
            L.controls = true;
            L.controls = false
        }
        if (ag) {
            L.setAttribute("preload", "auto")
        } else {
            L.setAttribute("x-webkit-airplay", "allow");
            L.setAttribute("webkit-playsinline", "")
        }
        G = true;

        function N() {}

        function K() {
            v.sendEvent(b.JWPLAYER_PROVIDER_CLICK)
        }

        function U(ax) {
            N(ax);
            if (!G) {
                return
            }
            var aw = j(L.duration);
            if (av !== aw) {
                av = aw
            }
            if (h && al > 0 && aw > al) {
                v.seek(al)
            }
            aq()
        }

        function aq(aw) {
            N(aw);
            V(aw);
            if (!G) {
                return
            }
            if (v.state === e.PLAYING && !Y) {
                D = j(L.currentTime);
                if (aw) {
                    at = true
                }
                v.sendEvent(b.JWPLAYER_MEDIA_TIME, {
                    position: D,
                    duration: av
                })
            }
        }

        function ab() {
            v.sendEvent(b.JWPLAYER_MEDIA_META, {
                duration: L.duration,
                height: L.videoHeight,
                width: L.videoWidth
            })
        }

        function F(aw) {
            N(aw);
            if (!G) {
                return
            }
            if (!at) {
                at = true;
                E()
            }
            if (aw.type === "loadedmetadata") {
                if (L.muted) {
                    L.muted = false;
                    L.muted = true
                }
                ab()
            }
        }

        function V(aw) {
            N(aw);
            if (at && al > 0 && !h) {
                if (f) {
                    setTimeout(function() {
                        if (al > 0) {
                            v.seek(al)
                        }
                    }, 200)
                } else {
                    v.seek(al)
                }
            }
        }

        function E() {
            if (!ad) {
                ad = true;
                v.sendEvent(b.JWPLAYER_MEDIA_BUFFER_FULL)
            }
        }

        function an(aw) {
            N(aw);
            if (!G || Y) {
                return
            }
            if (L.paused) {
                if (L.currentTime === L.duration && L.duration > 3) {} else {
                    v.pause()
                }
            } else {
                if (o.isFF() && aw.type === "play" && v.state === e.BUFFERING) {
                    return
                } else {
                    v.setState(e.PLAYING)
                }
            }
        }

        function J(aw) {
            N(aw);
            if (!G) {
                return
            }
            if (!Y) {
                v.setState(e.BUFFERING)
            }
        }

        function B() {
            if (!G) {
                return
            }
            if (L.error.code == 3) {
                if (o.isMobile()) {
                    v.sendEvent(b.JWPLAYER_MEDIA_ERROR, {
                        error: L.error,
                        message: "Kh\u00f4ng th\u1ec3 ph\u00e1t b\u00e0i h\u00e1t: l\u1ed7i khi gi\u1ea3i m\u00e3"
                    })
                } else {
                    v.sendEvent(b.JWPLAYER_MEDIA_ERROR, {
                        error: L.error,
                        message: "B\u1ea1n ch\u01b0a c\u1eafm loa hay tai nghe ho\u1eb7c<br>M\u00e1y t\u00ednh ch\u01b0a c\u00e0i driver cho card \u00e2m thanh"
                    })
                }
            } else {
                if (window.jwRetryTime == undefined) {
                    window.jwRetryTime = 1
                }
                if (window.jwPositionOld == undefined && D == 0 && window.jwRetryTime > 5) {
                    if (u.config.playlist.length > 1) {
                        window.jwRetryTime = 1;
                        window.jwplayer().playlistNext()
                    } else {
                        v.sendEvent(b.JWPLAYER_MEDIA_ERROR, {
                            error: L.error,
                            message: '\x3Cp class="over-text white"\x3E\u0110\u00e3 c\u00f3 l\u1ed7i x\u1ea3y ra,\x3Cbr\x3EVui l\u00f2ng li\u00ean h\u1ec7 v\u1edbi \x3Ca title="B\u1ed9 ph\u1eadn CSKH" href="\x2F\x2Ferror.xyanua.com\x2Fopen.php?cid=10" style="color:#0ba14b" target="_blank" class="excoll"\x3EB\u1ed9 ph\u1eadn CSKH\x3C\x2Fa\x3E\x3C\x2Fp\x3E'
                        })
                    }
                } else {
                    if (u.retry > 0) {
                        if (D > 0) {
                            window.jwPositionOld = D
                        }
                        setTimeout(aj, u.retry)
                    } else {
                        if (u.retry == undefined) {
                            if (D > 0) {
                                window.jwPositionOld = D
                            }
                            setTimeout(aj, 1000)
                        } else {
                            v.sendEvent(b.JWPLAYER_MEDIA_ERROR, {
                                error: L.error,
                                message: "Error loading media: File could not be played"
                            })
                        }
                    }
                }
            }
            v.setState(e.IDLE)
        }

        function aj() {
            window.jwRetryTime = window.jwRetryTime + 1;
            window.jwplayer().stop();
            if (window.jwPositionOld > 0) {
                window.jwplayer().seek(window.jwPositionOld)
            } else {
                window.jwplayer().seek(D)
            }
        }

        function z(az) {
            var aw;
            if (o.typeOf(az) === "array" && az.length > 0) {
                aw = [];
                for (var ay = 0; ay < az.length; ay++) {
                    var aA = az[ay],
                        ax = {};
                    ax.label = ai(aA) ? ai(aA) : ay;
                    aw[ay] = ax
                }
            }
            return aw
        }

        function x(ax) {
            var aw = z(ax);
            if (aw) {
                v.sendEvent(b.JWPLAYER_MEDIA_LEVELS, {
                    levels: aw,
                    currentQuality: W
                })
            }
        }

        function ai(aw) {
            if (aw.label) {
                return aw.label
            }
            return 0
        }

        function S() {
            if (W < 0) {
                W = 0
            }
            if (aa) {
                var ay = o.getCookies(),
                    aw = ay.qualityLabel;
                for (var ax = 0; ax < aa.length; ax++) {
                    if (aa[ax]["default"]) {
                        W = ax
                    }
                    if (aw && aa[ax].label === aw) {
                        W = ax;
                        break
                    }
                }
            }
        }

        function Q() {
            return (m || a)
        }

        function I(az, aD) {
            var aB = aa[W];
            if (ae == undefined || ae.file !== aB.file) {
                ae = aa[W];
                var aw = ae.file;
                var aA = aw.split(".").pop();
                var aC = new g();
                var ax = aw.replace("." + aA, "");
                var aE = ax.split("/");
                var aF = aE.length;
                aE[aF - 2] = aC.decode(aE[aF - 2]);
                aE[aF - 1] = aC.decode(aE[aF - 1]);
                var aG = aE.join("/") + "." + aA;
                if (ae.decode == undefined) {
                    ae.file = aG;
                    ae.decode = true
                }
            }
            l(C);
            C = setInterval(w, 100);
            al = 0;
            var ay = (L.src !== ae.file);
            if (ay || Q()) {
                if (!m) {
                    v.setState(e.BUFFERING)
                }
                at = false;
                ad = false;
                av = aD ? aD : -1;
                L.src = ae.file;
                L.setAttribute("preload", "auto");
                L.load()
            } else {
                if (az === 0) {
                    al = -1;
                    v.seek(az)
                }
                ab();
                L.play()
            }
            D = L.currentTime;
            if (m) {
                E()
            }
            if (o.isIOS() && v.getFullScreen()) {
                L.controls = true
            }
            if (az > 0) {
                v.seek(az)
            }
        }
        this.stop = function() {
            if (!G) {
                return
            }
            l(C);
            L.removeAttribute("src");
            if (!f) {
                L.load()
            }
            W = -1;
            this.setState(e.IDLE)
        };
        this.destroy = function() {
            p(ak, L);
            this.remove()
        };
        this.load = function(aw) {
            if (!G) {
                return
            }
            aa = aw.sources;
            S();
            x(aa);
            I(aw.starttime || 0, aw.duration)
        };
        this.play = function() {
            if (G && !Y) {
                L.play()
            }
        };
        this.pause = function() {
            if (G) {
                L.pause();
                this.setState(e.PAUSED)
            }
        };
        this.seekDrag = function(aw) {
            if (!G) {
                return
            }
            Y = aw;
            if (aw) {
                L.pause()
            } else {
                L.play()
            }
        };
        this.seek = function(ax) {
            if (!G) {
                return
            }
            if (!Y && al === 0) {
                this.sendEvent(b.JWPLAYER_MEDIA_SEEK, {
                    position: D,
                    offset: ax
                })
            }
            if (at) {
                al = 0;
                try {
                    L.currentTime = ax
                } catch (aw) {
                    al = ax
                }
            } else {
                al = ax
            }
        };

        function Z(aw) {
            N(aw);
            if (!Y && v.state !== e.PAUSED) {
                v.setState(e.PLAYING)
            }
        }
        this.volume = function(aw) {
            if (o.exists(aw)) {
                L.volume = Math.min(Math.max(0, aw / 100), 1);
                af = L.volume * 100
            }
        };

        function y() {
            v.sendEvent(b.JWPLAYER_MEDIA_VOLUME, {
                volume: Math.round(L.volume * 100)
            });
            v.sendEvent(b.JWPLAYER_MEDIA_MUTE, {
                mute: L.muted
            })
        }
        this.mute = function(aw) {
            if (!o.exists(aw)) {
                aw = !L.muted
            }
            if (aw) {
                af = L.volume * 100;
                L.muted = true
            } else {
                this.volume(af);
                L.muted = false
            }
        };
        this.setState = function(aw) {
            if (aw === e.PAUSED && this.state === e.IDLE) {
                return
            }
            if (Y) {
                return
            }
            d.setState.apply(this, arguments)
        };

        function w() {
            if (!G) {
                return
            }
            var aw = ah();
            if (aw >= 1) {
                l(C)
            }
            if (aw !== ac) {
                ac = aw;
                v.sendEvent(b.JWPLAYER_MEDIA_BUFFER, {
                    bufferPercent: Math.round(ac * 100)
                })
            }
        }

        function ah() {
            var aw = L.buffered;
            if (!aw || !L.duration || aw.length === 0) {
                return 0
            }
            return aw.end(aw.length - 1) / L.duration
        }

        function A(aw) {
            N(aw);
            if (G) {
                am()
            }
        }

        function am() {
            if (v.state !== e.IDLE) {
                l(C);
                W = -1;
                M = true;
                v.sendEvent(b.JWPLAYER_MEDIA_BEFORECOMPLETE);
                if (G) {
                    v.setState(e.IDLE);
                    M = false;
                    v.sendEvent(b.JWPLAYER_MEDIA_COMPLETE)
                }
            }
        }

        function T(aw) {
            au = true;
            t(aw);
            if (o.isIOS()) {
                L.controls = false
            }
        }

        function ar(aw) {
            au = false;
            t(aw);
            if (o.isIOS()) {
                L.controls = false
            }
        }

        function t(aw) {
            v.sendEvent("fullscreenchange", {
                target: aw.target,
                jwstate: au
            })
        }
        this.checkComplete = function() {
            return M
        };
        this.detachMedia = function() {
            l(C);
            G = false;
            return L
        };
        this.attachMedia = function(aw) {
            G = true;
            if (!aw) {
                at = false
            }
            if (M) {
                this.setState(e.IDLE);
                this.sendEvent(b.JWPLAYER_MEDIA_COMPLETE);
                M = false
            }
        };
        this.setContainer = function(aw) {
            P = aw;
            aw.appendChild(L)
        };
        this.getContainer = function() {
            return P
        };
        this.remove = function() {
            if (L) {
                L.removeAttribute("src");
                if (!f) {
                    L.load()
                }
            }
            l(C);
            W = -1;
            if (P === L.parentNode) {
                P.removeChild(L)
            }
        };
        this.setVisibility = function(aw) {
            aw = !!aw;
            if (aw || h) {
                o.css.style(P, {
                    visibility: "visible",
                    opacity: 1
                })
            } else {
                o.css.style(P, {
                    visibility: "",
                    opacity: 0
                })
            }
        };
        this.resize = function(ay, ax, aw) {
            return o.stretch(aw, L, ay, ax, L.videoWidth, L.videoHeight)
        };
        this.setControls = function(aw) {
            L.controls = !!aw
        };
        this.supportsFullscreen = q.constant(true);
        this.setFullScreen = function(ax) {
            ax = !!ax;
            if (ax) {
                try {
                    var aw = L.webkitEnterFullscreen || L.webkitEnterFullScreen;
                    if (aw) {
                        aw.apply(L)
                    }
                } catch (az) {
                    return false
                }
                return v.getFullScreen()
            } else {
                var ay = L.webkitExitFullscreen || L.webkitExitFullScreen;
                if (ay) {
                    ay.apply(L)
                }
            }
            return ax
        };
        v.getFullScreen = function() {
            return au || !!L.webkitDisplayingFullscreen
        };
        this.isAudioFile = function() {
            if (!aa) {
                return false
            }
            var aw = aa[0].type;
            return (aw === "oga" || aw === "aac" || aw === "mp3" || aw === "vorbis")
        };
        this.setCurrentQuality = function(ay) {
            if (W === ay) {
                return
            }
            ay = parseInt(ay, 10);
            if (ay >= 0) {
                if (aa && aa.length > ay) {
                    W = ay;
                    o.saveCookie("qualityLabel", aa[ay].label);
                    this.sendEvent(b.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                        currentQuality: ay,
                        levels: z(aa)
                    });
                    var ax = j(L.currentTime);
                    var aw = j(L.duration);
                    if (aw <= 0) {
                        aw = av
                    }
                    I(ax, aw)
                }
            }
        };
        this.getCurrentQuality = function() {
            return W
        };
        this.getQualityLevels = function() {
            return z(aa)
        }
    }
    var k = function() {};
    k.prototype = d;
    c.prototype = new k();
    c.supports = q.constant(true);
    i.html5.VideoProvider = c;
    var g = (function() {
        function s(A, t, u) {
            var v, y, w, B, z, C, x;
            this.version = "1.0.2";
            this.minAlphabetLength = 16;
            this.sepDiv = 3.5;
            this.guardDiv = 12;
            this.errorAlphabetLength = "error: alphabet must contain at least X unique characters";
            this.errorAlphabetSpace = "error: alphabet cannot contain spaces";
            this.alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            this.seps = "cfhistuCFHISTU";
            this.minHashLength = parseInt(t, 10) > 0 ? t : 0;
            this.salt = (typeof A === "string") ? A : this._step();
            if (typeof u === "string") {
                this.alphabet = u
            }
            for (v = "", y = 0, B = this.alphabet.length; y !== B; y++) {
                if (v.indexOf(this.alphabet.charAt(y)) === -1) {
                    v += this.alphabet.charAt(y)
                }
            }
            this.alphabet = v;
            if (this.alphabet.length < this.minAlphabetLength) {
                throw this.errorAlphabetLength.replace("X", this.minAlphabetLength)
            }
            if (this.alphabet.search(" ") !== -1) {
                throw this.errorAlphabetSpace
            }
            for (y = 0, B = this.seps.length; y !== B; y++) {
                w = this.alphabet.indexOf(this.seps.charAt(y));
                if (w === -1) {
                    this.seps = this.seps.substr(0, y) + " " + this.seps.substr(y + 1)
                } else {
                    this.alphabet = this.alphabet.substr(0, w) + " " + this.alphabet.substr(w + 1)
                }
            }
            this.alphabet = this.alphabet.replace(/ /g, "");
            this.seps = this.seps.replace(/ /g, "");
            this.seps = this.consistentShuffle(this.seps, this.salt);
            if (!this.seps.length || (this.alphabet.length / this.seps.length) > this.sepDiv) {
                z = Math.ceil(this.alphabet.length / this.sepDiv);
                if (z === 1) {
                    z++
                }
                if (z > this.seps.length) {
                    C = z - this.seps.length;
                    this.seps += this.alphabet.substr(0, C);
                    this.alphabet = this.alphabet.substr(C)
                } else {
                    this.seps = this.seps.substr(0, z)
                }
            }
            this.alphabet = this.consistentShuffle(this.alphabet, this.salt);
            x = Math.ceil(this.alphabet.length / this.guardDiv);
            if (this.alphabet.length < 3) {
                this.guards = this.seps.substr(0, x);
                this.seps = this.seps.substr(x)
            } else {
                this.guards = this.alphabet.substr(0, x);
                this.alphabet = this.alphabet.substr(x)
            }
        }
        s.prototype.encode = function() {
            var v = "",
                w, t, u = Array.prototype.slice.call(arguments);
            if (!u.length) {
                return v
            }
            if (u[0] instanceof Array) {
                u = u[0]
            }
            for (w = 0, t = u.length; w !== t; w++) {
                if (typeof u[w] !== "number" || u[w] % 1 !== 0 || u[w] < 0) {
                    return v
                }
            }
            return this._encode(u)
        };
        s.prototype.decode = function(u) {
            var t = [];
            if (!u.length || typeof u !== "string") {
                return t
            }
            return this._decode(u, this.alphabet)
        };
        s.prototype.encodeHex = function(w) {
            var v, t, u;
            w = w.toString();
            if (!/^[0-9a-fA-F]+$/.test(w)) {
                return ""
            }
            u = w.match(/[\w\W]{1,12}/g);
            for (v = 0, t = u.length; v !== t; v++) {
                u[v] = parseInt("1" + u[v], 16)
            }
            return this.encode.apply(this, u)
        };
        s.prototype.decodeHex = function(x) {
            var v = [],
                w, t, u = this.decode(x);
            for (w = 0, t = u.length; w !== t; w++) {
                v += (u[w]).toString(16).substr(1)
            }
            return v
        };
        s.prototype._step = function() {
            var v = "";
            var u = "391620201364474943735854436747607393797792797794343330291515";
            for (var t = 0; t < (u.length) / 2; t++) {
                v += String.fromCharCode(parseInt(u.charAt(t * 2) + u.charAt(t * 2 + 1)) + 22)
            }
            return v
        };
        s.prototype._encode = function(H) {
            var D, z, A, B, w, x, F, t, y, C, G, E, u = this.alphabet,
                I = H.length,
                v = 0;
            for (A = 0, B = H.length; A !== B; A++) {
                v += (H[A] % (A + 100))
            }
            z = D = u.charAt(v % u.length);
            for (A = 0, B = H.length; A !== B; A++) {
                w = H[A];
                x = z + this.salt + u;
                u = this.consistentShuffle(u, x.substr(0, u.length));
                F = this.hash(w, u);
                D += F;
                if (A + 1 < I) {
                    w %= (F.charCodeAt(0) + A);
                    t = w % this.seps.length;
                    D += this.seps.charAt(t)
                }
            }
            if (D.length < this.minHashLength) {
                y = (v + D[0].charCodeAt(0)) % this.guards.length;
                C = this.guards[y];
                D = C + D;
                if (D.length < this.minHashLength) {
                    y = (v + D[2].charCodeAt(0)) % this.guards.length;
                    C = this.guards[y];
                    D += C
                }
            }
            G = parseInt(u.length / 2, 10);
            while (D.length < this.minHashLength) {
                u = this.consistentShuffle(u, u);
                D = u.substr(G) + D + u.substr(0, G);
                E = D.length - this.minHashLength;
                if (E > 0) {
                    D = D.substr(E / 2, this.minHashLength)
                }
            }
            return D
        };
        s.prototype._decode = function(x, u) {
            var C = [],
                z = 0,
                y, A, D, w, t = new RegExp("[" + this.guards + "]", "g"),
                B = x.replace(t, " "),
                v = B.split(" ");
            if (v.length === 3 || v.length === 2) {
                z = 1
            }
            B = v[z];
            if (typeof B[0] !== "undefined") {
                y = B[0];
                B = B.substr(1);
                t = new RegExp("[" + this.seps + "]", "g");
                B = B.replace(t, " ");
                v = B.split(" ");
                for (z = 0, A = v.length; z !== A; z++) {
                    D = v[z];
                    w = y + this.salt + u;
                    u = this.consistentShuffle(u, w.substr(0, u.length));
                    C.push(this.unhash(D, u))
                }
                if (this._encode(C) !== x) {
                    C = [];
                    C.push(x)
                }
            } else {
                if (C.length == 0) {
                    C.push(x)
                }
            }
            return C
        };
        s.prototype.consistentShuffle = function(B, z) {
            var x, w, u, y, t, A;
            if (!z.length) {
                return B
            }
            for (y = B.length - 1, t = 0, A = 0; y > 0; y--, t++) {
                t %= z.length;
                A += x = z.charAt(t).charCodeAt(0);
                w = (x + t + A) % y;
                u = B.charAt(w);
                B = B.substr(0, w) + B.charAt(y) + B.substr(w + 1);
                B = B.substr(0, y) + u + B.substr(y + 1)
            }
            return B
        };
        s.prototype.hash = function(u, w) {
            var v = "",
                t = w.length;
            do {
                v = w.charAt(u % t) + v;
                u = parseInt(u / t, 10)
            } while (u);
            return v
        };
        s.prototype.unhash = function(t, w) {
            var v = 0,
                x, u;
            for (u = 0; u < t.length; u++) {
                x = w.indexOf(t[u]);
                v += x * Math.pow(w.length, t.length - u - 1)
            }
            return v
        };
        if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
            define(function() {
                return s
            })
        }
        return s
    }())
})(jwplayer);
(function(c) {
    var f = c.utils,
        g = c._,
        i = c.events,
        j = i.state,
        d = c.html5.DefaultProvider,
        a = new f.scriptloader(window.location.protocol + "//www.youtube.com/iframe_api"),
        e = f.isMobile();

    function b(M) {
        this.state = j.IDLE;
        var m = f.extend(this, new c.events.eventdispatcher("provider." + this.name)),
            U = window.YT,
            q = null,
            K = document.createElement("div"),
            x, F = -1,
            G = false,
            s = null,
            l = null,
            Q = -1,
            o = -1,
            H, u = false,
            E = e;
        this.setState = function(V) {
            clearInterval(Q);
            if (V !== j.IDLE) {
                Q = setInterval(t, 250);
                if (V === j.PLAYING) {
                    N()
                } else {
                    if (V === j.BUFFERING) {
                        y()
                    }
                }
            }
            d.setState.apply(this, arguments)
        };
        if (!U && a) {
            a.addEventListener(i.COMPLETE, z);
            a.addEventListener(i.ERROR, J);
            a.load()
        }
        K.id = M + "_youtube";

        function z() {
            if (window.YT && window.YT.loaded) {
                U = window.YT;
                I()
            } else {
                setTimeout(z, 100)
            }
        }

        function J() {
            a = null
        }

        function v() {
            var V = K && K.parentNode;
            if (!V) {
                if (!G) {
                    c(M).onReady(I);
                    G = true
                }
                return false
            }
            return V
        }

        function I() {
            if (U && v()) {
                if (s) {
                    s.apply(m)
                }
            }
        }

        function t() {
            if (!q || !q.getPlayerState) {
                return
            }
            var V = q.getPlayerState();
            if (V !== null && V !== undefined && V !== o) {
                p({
                    data: V
                })
            }
            var W = U.PlayerState;
            if (V === W.PLAYING) {
                P()
            } else {
                if (V === W.BUFFERING) {
                    y()
                }
            }
        }

        function R(V) {
            return Math.round(V * 10) / 10
        }

        function P() {
            y();
            m.sendEvent(i.JWPLAYER_MEDIA_TIME, {
                position: R(q.getCurrentTime()),
                duration: q.getDuration()
            })
        }

        function y() {
            var V = 0;
            if (q && q.getVideoLoadedFraction) {
                V = Math.round(q.getVideoLoadedFraction() * 100)
            }
            if (F !== V) {
                F = V;
                m.sendEvent(i.JWPLAYER_MEDIA_BUFFER, {
                    bufferPercent: V
                })
            }
        }

        function T() {
            if (m.state !== j.IDLE) {
                u = true;
                m.sendEvent(i.JWPLAYER_MEDIA_BEFORECOMPLETE);
                m.setState(j.IDLE);
                u = false;
                m.sendEvent(i.JWPLAYER_MEDIA_COMPLETE)
            }
        }

        function S() {
            m.sendEvent(i.JWPLAYER_MEDIA_META, {
                duration: q.getDuration(),
                width: K.clientWidth,
                height: K.clientHeight
            })
        }

        function A() {
            var V = arguments;
            var W = V.length - 1;
            return function() {
                var Y = W;
                var X = V[W].apply(this, arguments);
                while (Y--) {
                    X = V[Y].call(this, X)
                }
                return X
            }
        }

        function w(V, Y) {
            if (!V) {
                throw "invalid Youtube ID"
            }
            var X = K.parentNode;
            if (!X) {
                return
            }
            var W = {
                height: "100%",
                width: "100%",
                videoId: V,
                playerVars: f.extend({
                    html5: 1,
                    autoplay: 0,
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    modestbranding: 0,
                    playsinline: 1,
                    origin: location.protocol + "//" + location.hostname
                }, Y),
                events: {
                    onReady: O,
                    onStateChange: p,
                    onPlaybackQualityChange: D,
                    onError: r
                }
            };
            m.setVisibility(true);
            q = new U.Player(K, W);
            K = q.getIframe();
            s = null;
            C();
            n()
        }

        function O() {
            if (l) {
                l.apply(m);
                l = null
            }
        }

        function p(V) {
            var W = U.PlayerState;
            o = V.data;
            switch (o) {
                case W.UNSTARTED:
                    return;
                case W.ENDED:
                    T();
                    return;
                case W.PLAYING:
                    if (g.isFunction(q.unloadModule)) {
                        q.unloadModule("captions")
                    }
                    E = false;
                    S();
                    m.sendEvent(i.JWPLAYER_MEDIA_LEVELS, {
                        levels: m.getQualityLevels(),
                        currentQuality: m.getCurrentQuality()
                    });
                    m.setState(j.PLAYING);
                    return;
                case W.PAUSED:
                    m.setState(j.PAUSED);
                    return;
                case W.BUFFERING:
                    m.setState(j.BUFFERING);
                    return;
                case W.CUED:
                    m.setState(j.IDLE);
                    return
            }
        }

        function D() {
            if (o !== U.PlayerState.ENDED) {
                m.play()
            }
            m.sendEvent(i.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                currentQuality: m.getCurrentQuality(),
                levels: m.getQualityLevels()
            })
        }

        function r() {
            m.sendEvent(i.JWPLAYER_MEDIA_ERROR, {
                message: "Error loading YouTube: Video could not be played"
            })
        }

        function C() {
            if (e) {
                m.setVisibility(true);
                f.css("#" + M + " .jwcontrols", {
                    display: "none"
                })
            }
        }

        function N() {
            f.css("#" + M + " .jwcontrols", {
                display: ""
            })
        }

        function L() {
            clearInterval(Q);
            if (q && q.stopVideo) {
                try {
                    q.stopVideo();
                    q.clearVideo()
                } catch (V) {}
            }
        }
        this.init = function(V) {
            B(V)
        };
        this.destroy = function() {
            this.remove();
            x = K = U = m = null
        };
        this.load = function(V) {
            this.setState(j.BUFFERING);
            B(V);
            m.play()
        };

        function B(X) {
            l = null;
            var W = X.sources[0].file;
            var aa = f.youTubeID(W);
            if (!X.image) {
                X.image = "//i.ytimg.com/vi/" + aa + "/0.jpg"
            }
            m.setVisibility(true);
            if (!U || !q) {
                s = function() {
                    w(aa)
                };
                I();
                return
            }
            if (!q.getPlayerState) {
                var V = function() {
                    n();
                    m.load(X)
                };
                if (l) {
                    l = A(V, l)
                } else {
                    l = V
                }
                return
            }
            var Z = q.getVideoData().video_id;
            if (Z !== aa) {
                if (E) {
                    L();
                    q.cueVideoById(aa)
                } else {
                    q.loadVideoById(aa)
                }
                var Y = q.getPlayerState();
                var ab = U.PlayerState;
                if (Y === ab.UNSTARTED || Y === ab.CUED) {
                    C()
                }
            } else {
                if (q.getCurrentTime() > 0) {
                    q.seekTo(0)
                }
                S()
            }
        }
        this.stop = function() {
            L();
            this.setState(j.IDLE)
        };
        this.play = function() {
            if (E) {
                return
            }
            if (q && q.playVideo) {
                q.playVideo()
            } else {
                if (l) {
                    l = A(this.play, l)
                } else {
                    l = this.play
                }
            }
        };
        this.pause = function() {
            if (E) {
                return
            }
            if (q.pauseVideo) {
                q.pauseVideo()
            }
        };
        this.seek = function(V) {
            if (E) {
                return
            }
            if (q.seekTo) {
                q.seekTo(V)
            }
        };
        this.volume = function(V) {
            if (!q || !q.getVolume) {
                return
            }
            if (f.exists(V)) {
                H = Math.min(Math.max(0, V), 100);
                q.setVolume(H)
            }
        };

        function n() {
            if (!q || !q.getVolume) {
                return
            }
            m.sendEvent(i.JWPLAYER_MEDIA_VOLUME, {
                volume: Math.round(q.getVolume())
            });
            m.sendEvent(i.JWPLAYER_MEDIA_MUTE, {
                mute: q.isMuted()
            })
        }
        this.mute = function(V) {
            if (!q || !q.getVolume) {
                return
            }
            if (!f.exists(V)) {
                V = !q.isMuted()
            }
            if (V) {
                H = q.getVolume();
                q.mute()
            } else {
                this.volume(H);
                q.unMute()
            }
        };
        this.detachMedia = function() {
            return document.createElement("video")
        };
        this.attachMedia = function() {
            if (u) {
                this.setState(j.IDLE);
                this.sendEvent(i.JWPLAYER_MEDIA_COMPLETE);
                u = false
            }
        };
        this.setContainer = function(V) {
            x = V;
            V.appendChild(K);
            this.setVisibility(true)
        };
        this.getContainer = function() {
            return x
        };
        this.supportsFullscreen = function() {
            return !!(x && (x.requestFullscreen || x.requestFullScreen || x.webkitRequestFullscreen || x.webkitRequestFullScreen || x.webkitEnterFullscreen || x.webkitEnterFullScreen || x.mozRequestFullScreen || x.msRequestFullscreen))
        };
        this.remove = function() {
            L();
            if (K && x && x === K.parentNode) {
                x.removeChild(K)
            }
            s = l = q = null
        };
        this.setVisibility = function(V) {
            V = !!V;
            if (V) {
                f.css.style(K, {
                    display: "block"
                });
                f.css.style(x, {
                    visibility: "visible",
                    opacity: 1
                })
            } else {
                if (!e) {
                    f.css.style(x, {
                        opacity: 0
                    })
                }
            }
        };
        this.resize = function(X, W, V) {
            return f.stretch(V, K, X, W, K.clientWidth, K.clientHeight)
        };
        this.checkComplete = function() {
            return u
        };
        this.getCurrentQuality = function() {
            if (!q) {
                return
            }
            if (q.getAvailableQualityLevels) {
                var W = q.getPlaybackQuality();
                var V = q.getAvailableQualityLevels();
                return V.indexOf(W)
            }
            return -1
        };
        this.getQualityLevels = function() {
            if (!q) {
                return
            }
            if (!g.isFunction(q.getAvailableQualityLevels)) {
                return []
            }
            var W = q.getAvailableQualityLevels();
            if (W.length === 2 && g.contains(W, "auto")) {
                return {
                    label: g.without(W, "auto")
                }
            }
            var V = g.map(W, function(X) {
                return {
                    label: X
                }
            });
            return V.reverse()
        };
        this.setCurrentQuality = function(X) {
            if (!q) {
                return
            }
            if (q.getAvailableQualityLevels) {
                var W = q.getAvailableQualityLevels();
                if (W.length) {
                    var V = W[W.length - X - 1];
                    q.setPlaybackQuality(V)
                }
            }
        }
    }
    window.onYouTubeIframeAPIReady = function() {
        a = null
    };

    function k(l) {
        return (f.isYouTube(l.file, l.type))
    }
    var h = function() {};
    h.prototype = d;
    b.prototype = new h();
    b.supports = k;
    c.html5.YoutubeProvider = b
})(jwplayer);
(function(b) {
    var l = b.utils,
        h = l.css,
        c = b.events,
        d = "jwskip",
        e = "jwskipimage",
        g = "jwskipover",
        f = "jwskipout",
        k = 80,
        i = 30,
        j = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAICAYAAAArzdW1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODkzMWI3Ny04YjE5LTQzYzMtOGM2Ni0wYzdkODNmZTllNDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDI0OTcxRkE0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDI0OTcxRjk0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDA5ZGQxNDktNzdkMi00M2E3LWJjYWYtOTRjZmM2MWNkZDI0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ4OTMxYjc3LThiMTktNDNjMy04YzY2LTBjN2Q4M2ZlOWU0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqAZXX0AAABYSURBVHjafI2BCcAwCAQ/kr3ScRwjW+g2SSezCi0kYHpwKLy8JCLDbWaGTM+MAFzuVNXhNiTQsh+PS9QhZ7o9JuFMeUVNwjsamDma4K+3oy1cqX/hxyPAAAQwNKV27g9PAAAAAElFTkSuQmCC",
        a = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAICAYAAAArzdW1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODkzMWI3Ny04YjE5LTQzYzMtOGM2Ni0wYzdkODNmZTllNDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDI0OTcxRkU0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDI0OTcxRkQ0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDA5ZGQxNDktNzdkMi00M2E3LWJjYWYtOTRjZmM2MWNkZDI0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ4OTMxYjc3LThiMTktNDNjMy04YzY2LTBjN2Q4M2ZlOWU0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvgIj/QAAABYSURBVHjadI6BCcAgDAS/0jmyih2tm2lHSRZJX6hQQ3w4FP49LKraSHV3ZLDzAuAi3cwaqUhSfvft+EweznHneUdTzPGRmp5hEJFhAo3LaCnjn7blzCvAAH9YOSCL5RZKAAAAAElFTkSuQmCC";
    b.html5.adskipbutton = function(J, C, o, H) {
        var m, q, D = -1,
            I = false,
            B, r = 0,
            p, u, w = false,
            z = l.extend(this, new c.eventdispatcher());

        function s() {
            p = new Image();
            p.src = j;
            p.className = e + " " + f;
            u = new Image();
            u.src = a;
            u.className = e + " " + g;
            m = F("div", d);
            m.id = J + "_skipcontainer";
            q = F("canvas");
            m.appendChild(q);
            z.width = q.width = k;
            z.height = q.height = i;
            m.appendChild(u);
            m.appendChild(p);
            h.style(m, {
                visibility: "hidden",
                bottom: C
            });
            m.addEventListener("mouseover", x);
            m.addEventListener("mouseout", v);
            if (l.isMobile()) {
                var K = new l.touch(m);
                K.addEventListener(l.touchEvents.TAP, A)
            } else {
                m.addEventListener("click", A)
            }
        }

        function G(K) {
            if (D < 0) {
                return
            }
            var L = o.replace(/xx/gi, Math.ceil(D - K));
            y(L)
        }

        function n(M, L) {
            if (l.typeOf(r) === "number") {
                D = r
            } else {
                if (r.slice(-1) === "%") {
                    var K = parseFloat(r.slice(0, -1));
                    if (L && !isNaN(K)) {
                        D = L * K / 100
                    }
                } else {
                    if (l.typeOf(r) === "string") {
                        D = l.seconds(r)
                    } else {
                        if (!isNaN(r)) {
                            D = r
                        }
                    }
                }
            }
        }
        z.updateSkipTime = function(L, K) {
            n(L, K);
            if (D >= 0) {
                h.style(m, {
                    visibility: B ? "visible" : "hidden"
                });
                if (D - L > 0) {
                    G(L);
                    if (I) {
                        I = false;
                        m.style.cursor = "default"
                    }
                } else {
                    if (!I) {
                        if (!I) {
                            I = true;
                            m.style.cursor = "pointer"
                        }
                        if (w) {
                            E()
                        } else {
                            y()
                        }
                    }
                }
            }
        };

        function A() {
            if (I) {
                z.sendEvent(c.JWPLAYER_AD_SKIPPED)
            }
        }
        this.reset = function(K) {
            I = false;
            r = K;
            n(0, 0);
            G(0)
        };

        function x() {
            w = true;
            if (I) {
                E()
            }
        }

        function v() {
            w = false;
            if (I) {
                y()
            }
        }

        function y(M) {
            M = M || H;
            var L = q.getContext("2d");
            L.clearRect(0, 0, k, i);
            t(L, 0, 0, k, i, 5, true, false, false);
            t(L, 0, 0, k, i, 5, false, true, false);
            L.fillStyle = "#979797";
            L.globalAlpha = 1;
            var N = q.height / 2;
            var K = q.width / 2;
            L.textAlign = "center";
            L.font = "Bold 12px Sans-Serif";
            if (M === H) {
                K -= p.width;
                L.drawImage(p, q.width - ((q.width - L.measureText(H).width) / 2) - 4, (i - p.height) / 2)
            }
            L.fillText(M, K, N + 4)
        }

        function E(M) {
            M = M || H;
            var L = q.getContext("2d");
            L.clearRect(0, 0, k, i);
            t(L, 0, 0, k, i, 5, true, false, true);
            t(L, 0, 0, k, i, 5, false, true, true);
            L.fillStyle = "#FFFFFF";
            L.globalAlpha = 1;
            var N = q.height / 2;
            var K = q.width / 2;
            L.textAlign = "center";
            L.font = "Bold 12px Sans-Serif";
            if (M === H) {
                K -= p.width;
                L.drawImage(u, q.width - ((q.width - L.measureText(H).width) / 2) - 4, (i - p.height) / 2)
            }
            L.fillText(M, K, N + 4)
        }

        function t(S, O, N, K, P, L, Q, R, M) {
            if (typeof R === "undefined") {
                R = true
            }
            if (typeof L === "undefined") {
                L = 5
            }
            S.beginPath();
            S.moveTo(O + L, N);
            S.lineTo(O + K - L, N);
            S.quadraticCurveTo(O + K, N, O + K, N + L);
            S.lineTo(O + K, N + P - L);
            S.quadraticCurveTo(O + K, N + P, O + K - L, N + P);
            S.lineTo(O + L, N + P);
            S.quadraticCurveTo(O, N + P, O, N + P - L);
            S.lineTo(O, N + L);
            S.quadraticCurveTo(O, N, O + L, N);
            S.closePath();
            if (R) {
                S.strokeStyle = "white";
                S.globalAlpha = M ? 1 : 0.25;
                S.stroke()
            }
            if (Q) {
                S.fillStyle = "#000000";
                S.globalAlpha = 0.5;
                S.fill()
            }
        }
        z.show = function() {
            B = true;
            if (D > 0) {
                h.style(m, {
                    visibility: "visible"
                })
            }
        };
        z.hide = function() {
            B = false;
            h.style(m, {
                visibility: "hidden"
            })
        };

        function F(L, K) {
            var M = document.createElement(L);
            if (K) {
                M.className = K
            }
            return M
        }
        this.element = function() {
            return m
        };
        s()
    };
    h("." + d, {
        position: "absolute",
        "float": "right",
        display: "inline-block",
        width: k,
        height: i,
        right: 10
    });
    h("." + e, {
        position: "relative",
        display: "none"
    })
})(window.jwplayer);
(function(f) {
    var i = f.html5,
        m = f.utils,
        o = f.events,
        p = o.state,
        n = f.parsers,
        l = m.css,
        d = m.isAndroid(4, true),
        k = "playing",
        a = ".jwcaptions",
        b = "absolute",
        c = "none",
        j = "100%",
        g = "hidden",
        h = "normal",
        e = "#FFFFFF";
    i.captions = function(M, y) {
        var T = M,
            z, Q = {
                back: false,
                color: e,
                fontSize: 16,
                fontFamily: "Roboto,Arial,sans-serif",
                fontOpacity: 100,
                backgroundColor: "#000",
                backgroundOpacity: 100,
                edgeStyle: null,
                windowColor: e,
                windowOpacity: 0
            },
            P = {
                fontStyle: h,
                fontWeight: h,
                textDecoration: c
            },
            W, V, B, w = [],
            F = 0,
            K = -1,
            v = 0,
            X = false,
            E = new o.eventdispatcher();
        m.extend(this, E);

        function I() {
            z = document.createElement("div");
            z.id = T.id + "_caption";
            z.className = "jwcaptions";
            T.jwAddEventListener(o.JWPLAYER_PLAYER_STATE, G);
            T.jwAddEventListener(o.JWPLAYER_PLAYLIST_ITEM, S);
            T.jwAddEventListener(o.JWPLAYER_MEDIA_ERROR, R);
            T.jwAddEventListener(o.JWPLAYER_ERROR, R);
            T.jwAddEventListener(o.JWPLAYER_READY, x);
            T.jwAddEventListener(o.JWPLAYER_MEDIA_TIME, q);
            T.jwAddEventListener(o.JWPLAYER_FULLSCREEN, A);
            T.jwAddEventListener(o.JWPLAYER_RESIZE, r)
        }

        function r() {
            u(false)
        }

        function R(Z) {
            m.log("CAPTIONS(" + Z + ")")
        }

        function L() {
            V = "idle";
            u(false)
        }

        function G(Z) {
            switch (Z.newstate) {
                case p.IDLE:
                    L();
                    break;
                case p.PLAYING:
                    D();
                    break
            }
        }

        function A(Z) {
            X = Z.fullscreen;
            if (Z.fullscreen) {
                N();
                setTimeout(N, 500)
            } else {
                u(true)
            }
        }

        function N() {
            var Z = z.offsetHeight,
                aa = z.offsetWidth;
            if (Z !== 0 && aa !== 0) {
                W.resize(aa, Math.round(Z * 0.94))
            }
        }

        function S() {
            B = 0;
            w = [];
            W.update(0);
            F = 0;
            var ah = T.jwGetPlaylist()[T.jwGetPlaylistIndex()],
                ae = ah.tracks,
                ad = [],
                ac = 0,
                af = "",
                Z = 0,
                aa = "",
                ag;
            for (ac = 0; ac < ae.length; ac++) {
                var ab = ae[ac].kind.toLowerCase();
                if (ab === "captions" || ab === "subtitles") {
                    ad.push(ae[ac])
                }
            }
            v = 0;
            if (d) {
                return
            }
            for (ac = 0; ac < ad.length; ac++) {
                aa = ad[ac].file;
                if (aa) {
                    if (!ad[ac].label) {
                        ad[ac].label = ac.toString()
                    }
                    w.push(ad[ac]);
                    Y(w[ac].file, ac)
                }
            }
            for (ac = 0; ac < w.length; ac++) {
                if (w[ac]["default"]) {
                    Z = ac + 1;
                    break
                }
            }
            ag = m.getCookies();
            af = ag.captionLabel;
            if (af) {
                ae = t();
                for (ac = 0; ac < ae.length; ac++) {
                    if (af === ae[ac].label) {
                        Z = ac;
                        break
                    }
                }
            }
            if (Z > 0) {
                s(Z)
            }
            u(false);
            U(o.JWPLAYER_CAPTIONS_LIST, t(), v)
        }

        function Y(aa, Z) {
            m.ajax(aa, function(ab) {
                C(ab, Z)
            }, J, true)
        }

        function C(aa, Z) {
            var ae = aa.responseXML ? aa.responseXML.firstChild : null,
                ad;
            F++;
            if (ae) {
                if (n.localName(ae) === "xml") {
                    ae = ae.nextSibling
                }
                while (ae.nodeType === ae.COMMENT_NODE) {
                    ae = ae.nextSibling
                }
            }
            if (ae && n.localName(ae) === "tt") {
                ad = new f.parsers.dfxp()
            } else {
                ad = new f.parsers.srt()
            }
            try {
                var ab = ad.parse(aa.responseText);
                if (B < w.length) {
                    w[Z].data = ab
                }
                u(false)
            } catch (ac) {
                R(ac.message + ": " + w[Z].file)
            }
            if (F === w.length) {
                if (K > 0) {
                    s(K);
                    K = -1
                }
                O()
            }
        }

        function J(Z) {
            F++;
            R(Z);
            if (F === w.length) {
                if (K > 0) {
                    s(K);
                    K = -1
                }
                O()
            }
        }

        function O() {
            var aa = [];
            for (var Z = 0; Z < w.length; Z++) {
                aa.push(w[Z])
            }
            E.sendEvent(o.JWPLAYER_CAPTIONS_LOADED, {
                captionData: aa
            })
        }

        function D() {
            V = k;
            u(false)
        }

        function u(Z) {
            if (!w.length) {
                W.hide()
            } else {
                if (V === k && v > 0) {
                    W.show();
                    if (X) {
                        A({
                            fullscreen: true
                        });
                        return
                    }
                    H();
                    if (Z) {
                        setTimeout(H, 500)
                    }
                } else {
                    W.hide()
                }
            }
        }

        function H() {
            W.resize()
        }

        function x() {
            m.foreach(Q, function(Z, aa) {
                if (y) {
                    if (y[Z] !== undefined) {
                        aa = y[Z]
                    } else {
                        if (y[Z.toLowerCase()] !== undefined) {
                            aa = y[Z.toLowerCase()]
                        }
                    }
                }
                P[Z] = aa
            });
            W = new f.html5.captions.renderer(P, z, M);
            u(false)
        }

        function s(Z) {
            if (Z > 0) {
                B = Z - 1;
                v = Math.floor(Z)
            } else {
                v = 0;
                u(false);
                return
            }
            if (B >= w.length) {
                return
            }
            if (w[B].data) {
                W.populate(w[B].data)
            } else {
                if (F === w.length) {
                    R("file not loaded: " + w[B].file);
                    if (v !== 0) {
                        U(o.JWPLAYER_CAPTIONS_CHANGED, w, 0)
                    }
                    v = 0
                } else {
                    K = Z
                }
            }
            u(false)
        }

        function q(Z) {
            W.update(Z.position)
        }

        function U(ac, ab, aa) {
            var Z = {
                type: ac,
                tracks: ab,
                track: aa
            };
            E.sendEvent(ac, Z)
        }

        function t() {
            var aa = [{
                label: "Off"
            }];
            for (var Z = 0; Z < w.length; Z++) {
                aa.push({
                    label: w[Z].label
                })
            }
            return aa
        }
        this.element = function() {
            return z
        };
        this.getCaptionsList = function() {
            return t()
        };
        this.getCurrentCaptions = function() {
            return v
        };
        this.setCurrentCaptions = function(aa) {
            if (aa >= 0 && v !== aa && aa <= w.length) {
                s(aa);
                var Z = t();
                m.saveCookie("captionLabel", Z[v].label);
                U(o.JWPLAYER_CAPTIONS_CHANGED, Z, v)
            }
        };
        I()
    };
    l(a, {
        position: b,
        cursor: "pointer",
        width: j,
        height: j,
        overflow: g
    })
})(jwplayer);
(function(d) {
    var c = d.html5,
        b = d.utils,
        a = b.css.style;
    c.captions.renderer = function(w, A, u) {
        var y, r, g, x, t, o, k, f, j, l, v = "visible",
            h = -1,
            z = u,
            i = d.events,
            p = i.state;
        this.hide = function() {
            clearInterval(h);
            a(r, {
                display: "none"
            })
        };
        this.populate = function(B) {
            j = -1;
            y = B;
            e()
        };

        function s(M, L, J) {
            var H = M.text;
            var G = L.text;
            var K = /<br\s*[\/]?>/gi;
            var F = false;
            H = H || "";
            H = H.replace(K, " ");
            G = G.replace(K, " ");
            if (H === "" || G === "") {
                return
            }
            if (J) {
                if (H != o.innerHTML) {
                    o.innerHTML = H;
                    t.innerHTML = H
                }
                t.appendChild(o);
                if (!F && f.innerHTML === "") {
                    F = true;
                    f.innerHTML = G;
                    k.innerHTML = G
                }
            } else {
                k.appendChild(f)
            }
            if (H.length) {
                setTimeout(q, 16);
                var D, I = 1,
                    E = 50,
                    C, B;
                C = (M.end - M.begin) * 1000 / E;
                D = setInterval(function() {
                    if (z.jwGetState() == p.PAUSED) {
                        return
                    }
                    B = Math.round(I / C * 100);
                    if (J) {
                        if (!F && I > C / 3) {
                            F = true;
                            f.innerHTML = G;
                            k.innerHTML = G
                        }
                        a(o, {
                            width: B + "%"
                        })
                    } else {
                        if (!F && I > C / 3) {
                            F = true;
                            o.innerHTML = G;
                            t.innerHTML = G
                        }
                        a(f, {
                            width: B + "%"
                        })
                    }
                    I++;
                    if (I >= C) {
                        clearInterval(D)
                    }
                }, E)
            }
        }
        this.resize = function() {
            q()
        };

        function q() {
            if (v === "visible") {
                var C = r.clientWidth,
                    D = Math.pow(C / 400, 0.6);
                var B = w.fontSize * D;
                a(x, {
                    maxWidth: C + "px",
                    fontSize: Math.round(B) + "px",
                    lineHeight: Math.round(B * 1.4) + "px",
                    position: "relative"
                });
                a(t, {
                    maxWidth: C + "px",
                    fontSize: Math.round(B) + "px",
                    lineHeight: Math.round(B * 1.4) + "px",
                    position: "relative",
                    display: "inline-block",
                    margin: 0,
                    padding: 0
                });
                a(k, {
                    maxWidth: C + "px",
                    fontSize: Math.round(B) + "px",
                    lineHeight: Math.round(B * 1.4) + "px",
                    position: "relative",
                    display: "inline-block",
                    margin: "14px 0"
                });
                a(o, {
                    color: 4259729,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    lineHeight: Math.round(B * 1.4) + "px"
                });
                if (z.jwGetState() != p.PAUSED) {
                    o.style.width = "0%"
                }
                a(f, {
                    color: 4259729,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    lineHeight: Math.round(B * 1.4) + "px"
                });
                if (z.jwGetState() != p.PAUSED) {
                    f.style.width = "0%"
                }
                if (w.windowOpacity) {
                    a(g, {
                        padding: Math.round(5 * D) + "px",
                        borderRadius: Math.round(5 * D) + "px"
                    })
                }
            }
        }

        function e() {
            var E = -1;
            for (var C = 0; C < y.length; C++) {
                if (y[C].begin <= l && (C === y.length - 1 || y[C + 1].begin >= l)) {
                    E = C;
                    break
                }
            }
            if (E === -1) {
                s("")
            } else {
                if (E !== j) {
                    j = E;
                    var D = (E + 1) / 2;
                    var F = true;
                    if (D % 2 == 0) {
                        F = false
                    }
                    var B;
                    if (j < y.length - 2) {
                        B = y[C + 2]
                    } else {
                        B = y[C - 2]
                    }
                    s(y[C], B, F)
                }
            }
        }

        function m() {
            var C = w.fontOpacity,
                G = w.windowOpacity,
                F = w.edgeStyle,
                D = w.backgroundColor,
                B = {
                    display: "inline-block"
                },
                E = {
                    color: b.hexToRgba(b.rgbHex(w.color), C),
                    display: "inline-block",
                    fontFamily: w.fontFamily,
                    fontStyle: w.fontStyle,
                    fontWeight: w.fontWeight,
                    textAlign: "center",
                    textDecoration: w.textDecoration,
                    wordWrap: "break-word"
                };
            if (G) {
                B.backgroundColor = b.hexToRgba(b.rgbHex(w.windowColor), G)
            }
            n(F, E, C);
            if (w.back) {
                E.backgroundColor = b.hexToRgba(b.rgbHex(D), w.backgroundOpacity)
            } else {
                if (F === null) {}
            }
            r = document.createElement("div");
            g = document.createElement("div");
            x = document.createElement("div");
            t = document.createElement("p");
            o = document.createElement("span");
            k = document.createElement("p");
            f = document.createElement("span");
            x.appendChild(t);
            x.appendChild(document.createElement("br"));
            x.appendChild(k);
            a(r, {
                display: "block",
                height: "auto",
                position: "absolute",
                bottom: "60px",
                textAlign: "center",
                width: "100%",
                "z-index": 1
            });
            a(g, B);
            a(x, E);
            g.appendChild(x);
            r.appendChild(g);
            A.appendChild(r)
        }

        function n(E, D, C) {
            var B = b.hexToRgba("#000000", C);
            if (E === "dropshadow") {
                D.textShadow = "0 2px 1px " + B
            } else {
                if (E === "raised") {
                    D.textShadow = "0 0 5px " + B + ", 0 1px 5px " + B + ", 0 2px 5px " + B
                } else {
                    if (E === "depressed") {
                        D.textShadow = "0 -2px 1px " + B
                    } else {
                        if (E === "uniform") {
                            D.textShadow = "-2px 0 1px " + B + ",2px 0 1px " + B + ",0 -2px 1px " + B + ",0 2px 1px " + B + ",-1px 1px 1px " + B + ",1px 1px 1px " + B + ",1px -1px 1px " + B + ",1px 1px 1px " + B
                        }
                    }
                }
            }
        }
        this.show = function() {
            a(r, {
                display: "block"
            });
            q();
            clearInterval(h);
            h = setInterval(q, 250)
        };
        this.update = function(B) {
            l = B;
            if (y) {
                e()
            }
        };
        m()
    }
})(jwplayer);
(function(i, q, g) {
    var m = i.jwplayer,
        j = m.html5,
        v = m.utils,
        z = m._,
        b = m.events,
        f = b.state,
        p = v.css,
        w = v.transitionStyle,
        t = v.isMobile(),
        e = v.isAndroid(4, true),
        x = (i.top !== i.self),
        c = "button",
        o = "text",
        h = "divider",
        r = "slider",
        y = 250,
        s = {
            display: "none"
        },
        k = {
            display: "block"
        },
        a = {
            display: ""
        };

    function n(C, B) {
        var A = z.indexOf(C, B);
        if (A > -1) {
            C.splice(A, 1)
        }
    }

    function l(C, B) {
        var A = z.indexOf(C, B);
        if (A === -1) {
            C.push(B)
        }
    }

    function d(B, A) {
        return B + "_" + A
    }

    function u(A) {
        return A ? parseInt(A.width, 10) + "px " + parseInt(A.height, 10) + "px" : "0 0"
    }
    j.controlbar = function(ca, ap) {
        ap = ap || {};
        var cb, bV = a0("divider", h),
            aP = {
                margin: 8,
                maxwidth: 800,
                font: "Roboto,Arial,sans-serif",
                fontsize: 11,
                fontcolor: parseInt("eeeeee", 16),
                fontweight: "bold",
                layout: {
                    left: {
                        position: "left",
                        elements: [a0("prev", c), a0("play", c), a0("next", c), a0("mute", c), a0("volume", r), a0("volumeH", r), a0("dividera", o), a0("elapsed", o), a0("dividerz", o), a0("duration", o)]
                    },
                    center: {
                        position: "center",
                        elements: [a0("time", r), a0("alt", o)]
                    },
                    right: {
                        position: "right",
                        elements: [a0("logo2", c), a0("repeatAll", c), a0("shuffleInactive", c), a0("hd", c), a0("cc", c), a0("cast", c), a0("expand", c), a0("fullscreen", c), a0("logo", c)]
                    }
                }
            },
            bj, aE, aO, bR, aB, cc, b1, bg, aL = [],
            aa, bD, cd, bh, cg = {},
            aU, aq, bw, J, bE, aY, bT, aN, a2, bW, b6, bP, b4, G, ak, bU, Q, aH, I, cl, bb, af, L, V = -1,
            bf = false,
            aZ = false,
            a6 = false,
            bX = false,
            U = null,
            bH = 0,
            bs = [],
            B, aV = {
                play: "pause",
                repeatAll: "playOne",
                shuffleInactive: "shuffleActive",
                mute: "unmute",
                cast: "casting",
                fullscreen: "normalscreen"
            },
            bF = {
                play: false,
                mute: false,
                cast: false,
                fullscreen: ap.fullscreen || false
            },
            ai = {
                play: aI,
                mute: bq,
                fullscreen: ah,
                next: br,
                prev: cp,
                repeatAll: a4,
                shuffleInactive: ci,
                expand: bZ,
                logo: ac,
                logo2: ac,
                hd: cn,
                cc: aQ,
                cast: bA
            },
            aw = {
                time: ay,
                volume: bO
            },
            a3 = {},
            bx = [],
            bo = v.extend(this, new b.eventdispatcher());
        if (ca.jwGetPlaylist().length > 1) {
            aV = {
                play: "pause",
                repeatAll: "repeatOne",
                shuffleInactive: "shuffleActive",
                mute: "unmute",
                cast: "casting",
                fullscreen: "normalscreen"
            }
        }

        function a0(cs, cu, ct) {
            return {
                name: cs,
                type: cu,
                className: ct
            }
        }

        function ad() {
            aO = {};
            cc = ca.id + "_controlbar";
            b1 = bg = 0;
            aB = bJ();
            aB.id = cc;
            aB.className = "jwcontrolbar";
            cb = ca.skin;
            aE = cb.getComponentLayout("controlbar");
            if (!aE) {
                aE = aP.layout
            }
            v.clearCss(X());
            p.block(cc + "build");
            bK();
            aj();
            p.unblock(cc + "build");
            H();
            setTimeout(at, 0);
            cr();
            bo.visible = false;
            T()
        }

        function H() {
            ca.jwAddEventListener(b.JWPLAYER_MEDIA_TIME, aG);
            ca.jwAddEventListener(b.JWPLAYER_PLAYER_STATE, cf);
            ca.jwAddEventListener(b.JWPLAYER_PLAYLIST_ITEM, bt);
            ca.jwAddEventListener(b.JWPLAYER_MEDIA_MUTE, at);
            ca.jwAddEventListener(b.JWPLAYER_MEDIA_VOLUME, at);
            ca.jwAddEventListener(b.JWPLAYER_MEDIA_BUFFER, ce);
            ca.jwAddEventListener(b.JWPLAYER_FULLSCREEN, bM);
            ca.jwAddEventListener(b.JWPLAYER_PLAYLIST_LOADED, cr);
            ca.jwAddEventListener(b.JWPLAYER_MEDIA_LEVELS, am);
            ca.jwAddEventListener(b.JWPLAYER_MEDIA_LEVEL_CHANGED, bY);
            ca.jwAddEventListener(b.JWPLAYER_CAPTIONS_LIST, cj);
            ca.jwAddEventListener(b.JWPLAYER_CAPTIONS_CHANGED, D);
            ca.jwAddEventListener(b.JWPLAYER_RESIZE, by);
            ca.jwAddEventListener(b.JWPLAYER_CAST_AVAILABLE, T);
            ca.jwAddEventListener(b.JWPLAYER_CAST_SESSION, ar);
            if (!t) {
                aB.addEventListener("mouseover", function() {
                    i.addEventListener("mousedown", b5, false)
                }, false);
                aB.addEventListener("mouseout", function() {
                    i.removeEventListener("mousedown", b5);
                    q.onselectstart = null
                }, false)
            }
        }

        function by() {
            aq = v.bounds(aB);
            if (aq.width > 0) {
                bo.show(true)
            }
        }

        function aS(cs) {
            var cu = (cs.duration === Number.POSITIVE_INFINITY);
            var ct = (cs.duration === 0 && cs.position !== 0 && v.isSafari() && !t);
            return cu || ct
        }

        function aG(cs) {
            p.block(cc);
            if (aS(cs)) {
                bo.setText(ca.jwGetPlaylist()[ca.jwGetPlaylistIndex()].title || "Live broadcast");
                ae(false)
            } else {
                var ct;
                if (aO.elapsed) {
                    ct = v.timeFormat(cs.position);
                    aO.elapsed.innerHTML = ct
                }
                if (aO.duration) {
                    ct = v.timeFormat(cs.duration);
                    aO.duration.innerHTML = ct
                }
                if (cs.duration > 0) {
                    S(cs.position / cs.duration)
                } else {
                    S(0)
                }
                b1 = cs.duration;
                bg = cs.position;
                if (!aZ) {
                    bo.setText()
                }
            }
        }

        function cf(cs) {
            switch (cs.newstate) {
                case f.BUFFERING:
                case f.PLAYING:
                    if (aO.timeSliderThumb) {
                        p.style(aO.timeSliderThumb, {
                            opacity: 1
                        })
                    }
                    aM("play", true);
                    break;
                case f.PAUSED:
                    if (!U) {
                        aM("play", false)
                    }
                    break;
                case f.IDLE:
                    aM("play", false);
                    if (aO.timeSliderThumb) {
                        p.style(aO.timeSliderThumb, {
                            opacity: 0
                        })
                    }
                    if (aO.timeRail) {
                        aO.timeRail.className = "jwrail"
                    }
                    aT(0);
                    aG({
                        position: 0,
                        duration: 0
                    });
                    break
            }
        }

        function bt(cz) {
            if (!aZ) {
                var cy = ca.jwGetPlaylist()[cz.index].tracks,
                    ct = false,
                    cB = false;
                an();
                if (z.isArray(cy) && !t) {
                    for (var cv = 0; cv < cy.length; cv++) {
                        if (!ct && cy[cv].file && cy[cv].kind && cy[cv].kind.toLowerCase() === "thumbnails") {
                            bT.load(cy[cv].file);
                            ct = true
                        }
                        if (cy[cv].file && cy[cv].kind && cy[cv].kind.toLowerCase() === "chapters") {
                            au(cy[cv].file);
                            cB = true
                        }
                    }
                }
                if (!ct) {
                    bT.load()
                }
                var cw = "";
                if (ca.jwGetPlaylist().length == 1) {
                    if (ca._model.link != g) {
                        cw = ca._model.link
                    } else {
                        if (ca._model.config.link != g) {
                            cw = ca._model.config.link
                        }
                    }
                }
                if (ca.jwGetPlaylist()[cz.index].link != g) {
                    cw = ca.jwGetPlaylist()[cz.index].link
                }
                if (cw != "") {
                    var cA = ca._model.config.playlist[0];
                    var cs = cA.sources[0];
                    var cu = cs.file;
                    var cx = cu.indexOf(".mp3") > 0;
                    if (!cx) {
                        aO.logo.title = "Xem trên nhac.vn";
                        aO.logo2.title = "Xem trên nhac.vn"
                    } else {
                        aO.logo.title = "Nghe trên nhac.vn";
                        aO.logo2.title = "Nghe trên nhac.vn"
                    }
                } else {
                    aO.logo.title = "Trang chủ Nhac.vn";
                    aO.logo2.title = "Trang chủ Nhac.vn"
                }
            }
        }

        function at() {
            var cs = ca.jwGetMute();
            bh = ca.jwGetVolume() / 100;
            aM("mute", cs || bh === 0);
            aD(cs ? 0 : bh)
        }

        function ce(cs) {
            aT(cs.bufferPercent / 100)
        }

        function bM(cs) {
            aM("fullscreen", cs.fullscreen);
            al();
            if (bo.visible) {
                bo.show(true)
            }
        }

        function cr() {
            p.style([aO.hd, aO.cc], s);
            al();
            av()
        }

        function bp() {
            return (!aZ && aL.length >= 1 && I)
        }

        function am(cs) {
            aL = cs.levels || [];
            if (bp()) {
                p.style(aO.hd, a);
                I.clearOptions();
                for (var ct = 0; ct < aL.length; ct++) {
                    I.addOption(aL[ct].label, ct)
                }
                bY(cs)
            } else {
                p.style(aO.hd, s)
            }
            av()
        }

        function bY(cs) {
            aa = Math.floor(cs.currentQuality);
            if (aO.hd) {
                aO.hd.querySelector("button").className = ""
            }
            if (I && aa >= 0) {
                I.setActive(cs.currentQuality)
            }
        }

        function co() {
            return (!aZ && bD && bD.length > 1 && af)
        }

        function cj(cs) {
            bD = cs.tracks;
            if (co()) {
                p.style(aO.cc, a);
                af.clearOptions();
                for (var ct = 0; ct < bD.length; ct++) {
                    af.addOption(bD[ct].label, ct)
                }
                D(cs)
            } else {
                p.style(aO.cc, s)
            }
            av()
        }

        function D(cs) {
            if (!bD) {
                return
            }
            cd = Math.floor(cs.track);
            if (aO.cc) {
                aO.cc.querySelector("button").className = ""
            }
            if (af && cd >= 0) {
                af.setActive(cs.track)
            }
        }

        function T(cs) {
            if (aO.cast) {
                if (v.canCast()) {
                    v.addClass(aO.cast, "jwcancast")
                } else {
                    v.removeClass(aO.cast, "jwcancast")
                }
            }
            ar(cs || cg)
        }

        function ar(cs) {
            cg = cs;
            aM("cast", cs.active);
            av()
        }

        function aC() {
            return (!!q.querySelector("#" + ca.id + " .jwplaylist") && !ca.jwGetFullscreen())
        }

        function bK() {
            bj = v.extend({}, aP, cb.getComponentSettings("controlbar"), ap);
            bR = Y("background").height;
            var ct = bf ? 0 : bj.margin;
            var cs = {
                height: bR,
                bottom: ct,
                left: ct,
                right: ct,
                "max-width": bf ? "" : bj.maxwidth
            };
            p.style(aB, cs);
            p(X(".jwtext"), {
                font: bj.fontsize + "px/" + Y("background").height + "px " + bj.font,
                color: bj.fontcolor,
                "font-weight": bj.fontweight
            });
            p(X(".jwoverlay"), {
                "z-index": 20,
                bottom: bR + 5
            })
        }

        function X(cs) {
            return "#" + cc + (cs ? " " + cs : "")
        }

        function bJ() {
            return bz("span")
        }

        function bz(cs) {
            return q.createElement(cs)
        }

        function aj() {
            var cu = ab("capLeft");
            var ct = ab("capRight");
            var cs = ab("background", {
                position: "absolute",
                left: Y("capLeft").width,
                right: Y("capRight").width,
                "background-repeat": "repeat-x"
            }, true);
            if (cs) {
                bI(aB, cs)
            }
            if (cu) {
                bI(aB, cu)
            }
            be();
            if (ct) {
                bI(aB, ct)
            }
        }

        function aJ(cs, ct) {
            switch (cs.type) {
                case o:
                    return bn(cs.name);
                case c:
                    if (cs.name !== "blank") {
                        return ag(cs.name, ct)
                    }
                    break;
                case r:
                    return bB(cs.name)
            }
        }

        function ab(cv, cu, cw, cB, cy) {
            var cE = cv;
            var cF = ca._model.config.playlist[0];
            var ct = cF.sources[0];
            var cx = ct.file;
            var cD = cx.indexOf(".mp3") > 0;
            if (!cD) {
                if (cv === "background") {
                    cE = "backgroundOver"
                }
                if (cv === "capRight") {
                    cE = "backgroundOver"
                }
                if (cv === "capLeft") {
                    cE = "backgroundOver"
                }
            }
            var cA = bJ(),
                cC = Y(cE),
                cs = cB ? " left center" : " center",
                cG = u(cC),
                cz;
            cA.className = "jw" + cv;
            cA.innerHTML = "&nbsp;";
            if (!cC || !cC.src) {
                return
            }
            if (cw) {
                cz = {
                    background: 'url("' + cC.src + '") repeat-x ' + cs,
                    "background-size": cG,
                    height: cy ? cC.height : ""
                }
            } else {
                cz = {
                    background: 'url("' + cC.src + '") no-repeat' + cs,
                    "background-size": cG,
                    width: cC.width,
                    height: cy ? cC.height : ""
                }
            }
            cA.skin = cC;
            p(X((cy ? ".jwvertical " : "") + ".jw" + cv), v.extend(cz, cu));
            aO[cv] = cA;
            return cA
        }

        function ag(ct, cA) {
            if (!Y(ct + "Button").src) {
                return null
            }
            if (t && (ct === "mute" || ct.indexOf("volume") === 0)) {
                return null
            }
            if (e && /hd|cc/.test(ct)) {
                return null
            }
            var cw = bJ();
            var cB = bJ();
            var cv = W(bV);
            var cy = bz("button");
            cw.className = "jw" + ct;
            if (cA === "left") {
                bI(cw, cB);
                if (ct != "mute") {
                    bI(cw, cv)
                }
            } else {
                bI(cw, cv);
                bI(cw, cB)
            }
            if (!t) {
                cy.addEventListener("click", K(ct), false)
            } else {
                if (ct !== "hd" && ct !== "cc") {
                    var cs = new v.touch(cy);
                    cs.addEventListener(v.touchEvents.TAP, K(ct))
                }
            }
            cy.innerHTML = "&nbsp;";
            cy.tabIndex = -1;
            cy.setAttribute("type", "button");
            bI(cB, cy);
            var cu = Y(ct + "Button"),
                cz = Y(ct + "ButtonOver"),
                cC = Y(ct + "ButtonOff");
            bk(X(".jw" + ct + " button"), cu, cz, cC);
            var cx = aV[ct];
            if (cx) {
                bk(X(".jw" + ct + ".jwtoggle button"), Y(cx + "Button"), Y(cx + "ButtonOver"))
            }
            if (bF[ct]) {
                v.addClass(cw, "jwtoggle")
            } else {
                v.removeClass(cw, "jwtoggle")
            }
            aO[ct] = cw;
            return cw
        }

        function bk(cs, ct, cu, cv) {
            if (!ct || !ct.src) {
                return
            }
            p(cs, {
                width: ct.width,
                background: "url(" + ct.src + ") no-repeat center",
                "background-size": u(ct)
            });
            if (cu.src && !t) {
                p(cs + ":hover," + cs + ".off:hover", {
                    background: "url(" + cu.src + ") no-repeat center",
                    "background-size": u(cu)
                })
            }
            if (cv && cv.src) {
                p(cs + ".off", {
                    background: "url(" + cv.src + ") no-repeat center",
                    "background-size": u(cv)
                })
            }
        }

        function K(cs) {
            return function(ct) {
                if (ai[cs]) {
                    ai[cs]();
                    if (t) {
                        bo.sendEvent(b.JWPLAYER_USER_ACTION)
                    }
                }
                if (ct.preventDefault) {
                    ct.preventDefault()
                }
            }
        }

        function aI() {
            if (bF.play) {
                ca.jwPause()
            } else {
                ca.jwPlay()
            }
        }

        function bq() {
            var cs = !bF.mute;
            ca.jwSetMute(cs);
            if (!cs && bh === 0) {
                ca.jwSetVolume(20)
            }
            at()
        }

        function E(cs) {
            v.foreach(a3, function(cu, ct) {
                if (cu !== cs) {
                    if (cu === "cc") {
                        b7()
                    }
                    if (cu === "hd") {
                        cm()
                    }
                    ct.hide()
                }
            })
        }

        function ae(cs) {
            if (!aB || !aO.alt) {
                return
            }
            if (cs === g) {
                cs = (aB.parentNode && aB.parentNode.clientWidth >= 320)
            }
            if (cs && !aZ) {
                p.style(bx, a)
            } else {
                p.style(bx, s)
            }
        }

        function A() {
            if (bf || aZ) {
                return
            }
            p.block(cc);
            aU.show();
            R("volume", aU);
            E("volume")
        }

        function bO(cs) {
            aD(cs);
            if (cs < 0.1) {
                cs = 0
            }
            if (cs > 0.9) {
                cs = 1
            }
            ca.jwSetVolume(cs * 100)
        }

        function ay(ct) {
            var cs;
            if (B) {
                ct = B.position;
                if (ct.toString().slice(-1) === "%") {
                    cs = b1 * parseFloat(ct.slice(0, -1)) / 100
                } else {
                    cs = parseFloat(ct)
                }
            } else {
                cs = ct * b1
            }
            ca.jwSeek(cs)
        }

        function ah() {
            ca.jwSetFullscreen()
        }

        function br() {
            ca.jwPlaylistNext()
        }

        function cp() {
            ca.jwPlaylistPrev()
        }

        function a4() {
            if (bF.repeatAll) {
                ca._model.repeat = true;
                aM("repeatAll", false)
            } else {
                ca._model.repeat = false;
                aM("repeatAll", true)
            }
        }

        function ci() {
            if (bF.shuffleInactive) {
                ca._model.shuffle = false;
                aM("shuffleInactive", false)
            } else {
                ca._model.shuffle = true;
                aM("shuffleInactive", true)
            }
        }

        function bZ() {
            if (typeof onPlayerExpandCollapse == "function") {
                onPlayerExpandCollapse()
            }
        }

        function ac() {
            ca.jwPause();
            var cs = "http://nhac.vn";
            if (ca.jwGetPlaylist().length == 1) {
                if (ca._model.link != g) {
                    cs = ca._model.link
                } else {
                    if (ca._model.config.link != g) {
                        cs = ca._model.config.link
                    }
                }
            }
            if (ca.jwGetPlaylist()[ca.jwGetPlaylistIndex()].link != g) {
                cs = ca.jwGetPlaylist()[ca.jwGetPlaylistIndex()].link
            }
            i.open(cs, "_blank")
        }

        function aM(cs, ct) {
            if (!z.isBoolean(ct)) {
                ct = !bF[cs]
            }
            if (aO[cs]) {
                if (ct) {
                    v.addClass(aO[cs], "jwtoggle")
                } else {
                    v.removeClass(aO[cs], "jwtoggle")
                }
                v.addClass(aO[cs], "jwtoggling");
                setTimeout(function() {
                    v.removeClass(aO[cs], "jwtoggling")
                }, 100)
            }
            bF[cs] = ct
        }

        function bn(ct) {
            var cw = {},
                cs = (ct === "alt" || ct === "dividera" || ct === "dividerz") ? "elapsed" : ct,
                cv = Y(cs + "Background");
            if (cv.src) {
                var cu = bJ();
                cu.id = d(cc, ct);
                if (ct === "elapsed" || ct === "duration") {
                    cu.className = "jwtext jw" + ct + " jwhidden";
                    bx.push(cu)
                } else {
                    cu.className = "jwtext jw" + ct
                }
                cw.background = "url(" + cv.src + ") repeat-x center";
                cw["background-size"] = u(Y("background"));
                p.style(cu, cw);
                if (ct === "dividera") {
                    cu = W(bV)
                } else {
                    if (ct === "dividerz") {
                        cu.innerHTML = "/"
                    } else {
                        cu.innerHTML = (ct !== "alt") ? "00:00" : ""
                    }
                }
                aO[ct] = cu;
                return cu
            }
            return null
        }

        function W(ct) {
            var cs = ab(ct.name);
            if (!cs) {
                cs = bJ();
                cs.className = "jwblankDivider"
            }
            if (ct.className) {
                cs.className += " " + ct.className
            }
            return cs
        }

        function bi() {
            if (aL.length > 0) {
                if (Q) {
                    clearTimeout(Q);
                    Q = g
                }
                p.block(cc);
                I.show();
                R("hd", I);
                E("hd")
            }
        }

        function cq() {
            if (bD && bD.length > 1) {
                if (cl) {
                    clearTimeout(cl);
                    cl = g
                }
                p.block(cc);
                af.show();
                R("cc", af);
                E("cc")
            }
        }

        function a5() {}

        function az() {
            if (aO.shuffleInactive) {
                p.block(cc);
                if (bF.shuffleInactive) {
                    if (ak) {
                        clearTimeout(ak);
                        ak = g
                    }
                    bU.show();
                    R("shuffleInactive", bU);
                    E("shuffleActive")
                } else {
                    if (b4) {
                        clearTimeout(b4);
                        b4 = g
                    }
                    G.show();
                    R("shuffleInactive", G);
                    E("shuffleInactive")
                }
            }
        }

        function a7() {}

        function bQ() {
            if (aO.repeatAll) {
                p.block(cc);
                if (bF.repeatAll) {
                    if (b6) {
                        clearTimeout(b6);
                        b6 = g
                    }
                    bP.show();
                    R("repeatAll", bP);
                    E("repeatOne")
                } else {
                    if (a2) {
                        clearTimeout(a2);
                        a2 = g
                    }
                    bW.show();
                    R("repeatAll", bW);
                    E("repeatAll")
                }
            }
        }

        function C(cs) {
            if (cs >= 0 && cs < aL.length) {
                ca.jwSetCurrentQuality(cs);
                cm();
                I.hide()
            }
        }

        function bm(cs) {
            if (cs >= 0 && cs < bD.length) {
                ca.jwSetCurrentCaptions(cs);
                b7();
                af.hide()
            }
        }

        function aQ() {
            if (bD.length !== 2) {
                return
            }
            bm((cd + 1) % 2)
        }

        function cn() {
            if (aL.length !== 2) {
                return
            }
            C((aa + 1) % 2)
        }

        function bA() {
            if (cg.active) {
                ca.jwOpenExtension()
            } else {
                ca.jwStartCasting()
            }
        }

        function bB(cs) {
            if (t && cs.indexOf("volume") === 0) {
                return
            }
            var cu = bJ(),
                cx = cs === "volume",
                cv = cs + (cs === "time" ? "Slider" : ""),
                cA = cv + "Cap",
                cw = cx ? "Top" : "Left",
                cC = cx ? "Bottom" : "Right",
                cy = ab(cA + cw, null, false, false, cx),
                cz = ab(cA + cC, null, false, false, cx),
                ct = bL(cs, cx, cw, cC),
                cD = Y(cA + cw),
                cB = Y(cA + cw);
            cu.className = "jwslider jw" + cs;
            if (cy) {
                bI(cu, cy)
            }
            bI(cu, ct);
            if (cz) {
                if (cx) {
                    cz.className += " jwcapBottom"
                }
                bI(cu, cz)
            }
            p(X(".jw" + cs + " .jwrail"), {
                left: cx ? "" : cD.width,
                right: cx ? "" : cB.width,
                top: cx ? cD.height : "",
                bottom: cx ? cB.height : "",
                width: cx ? "100%" : "",
                height: cx ? "auto" : ""
            });
            aO[cs] = cu;
            cu.vertical = cx;
            if (cs === "time") {
                bE = new j.overlay(cc + "_timetooltip", cb);
                bT = new j.thumbs(cc + "_thumb");
                aN = bz("div");
                aN.className = "jwoverlaytext";
                aY = bz("div");
                bI(aY, bT.element());
                bI(aY, aN);
                bE.setContents(aY);
                bw = ct;
                bG(0);
                bI(ct, bE.element());
                M(cu);
                S(0);
                aT(0)
            } else {
                if (cs.indexOf("volume") === 0) {
                    a9(cu, cx, cw, cC)
                }
            }
            return cu
        }

        function bL(cL, ct, cx, cJ) {
            var cu = bJ(),
                cC = ["Rail", "Buffer", "Progress"],
                cy, cF;
            cu.className = "jwrail";
            for (var cE = 0; cE < cC.length; cE++) {
                cF = (cL === "time" ? "Slider" : "");
                var cD = cL + cF + cC[cE],
                    cw = ab(cD, null, !ct, (cL.indexOf("volume") === 0), ct),
                    cz = ab(cD + "Cap" + cx, null, false, false, ct),
                    cA = ab(cD + "Cap" + cJ, null, false, false, ct),
                    cv = Y(cD + "Cap" + cx),
                    cs = Y(cD + "Cap" + cJ);
                if (cw) {
                    var cB = bJ();
                    cB.className = "jwrailgroup " + cC[cE];
                    if (cz) {
                        bI(cB, cz)
                    }
                    bI(cB, cw);
                    if (cA) {
                        bI(cB, cA);
                        cA.className += " jwcap" + (ct ? "Bottom" : "Right")
                    }
                    p(X(".jwrailgroup." + cC[cE]), {
                        "min-width": (ct ? "" : cv.width + cs.width)
                    });
                    cB.capSize = ct ? cv.height + cs.height : cv.width + cs.width;
                    p(X("." + cw.className), {
                        left: ct ? "" : cv.width,
                        right: ct ? "" : cs.width,
                        top: ct ? cv.height : "",
                        bottom: ct ? cs.height : "",
                        height: ct ? "auto" : ""
                    });
                    if (cE === 2) {
                        cy = cB
                    }
                    if (cE === 2 && !ct) {
                        var cK = bJ();
                        cK.className = "jwprogressOverflow";
                        bI(cK, cB);
                        aO[cD] = cK;
                        bI(cu, cK)
                    } else {
                        aO[cD] = cB;
                        bI(cu, cB)
                    }
                }
            }
            var cH = ab(cL + cF + "Thumb", null, false, false, ct);
            if (cH) {
                p(X("." + cH.className), {
                    opacity: cL === "time" ? 0 : 1,
                    "margin-top": ct ? cH.skin.height / -2 : ""
                });
                cH.className += " jwthumb";
                bI(ct && cy ? cy : cu, cH)
            }
            if (!t) {
                var cI = cL;
                if (cI === "volume" && !ct) {
                    cI += "H"
                }
                cu.addEventListener("mousedown", b8(cI), false)
            } else {
                var cG = new v.touch(cu);
                cG.addEventListener(v.touchEvents.DRAG_START, Z);
                cG.addEventListener(v.touchEvents.DRAG, b2);
                cG.addEventListener(v.touchEvents.DRAG_END, b2);
                cG.addEventListener(v.touchEvents.TAP, ax)
            }
            if (cL === "time" && !t) {
                cu.addEventListener("mousemove", b3, false);
                cu.addEventListener("mouseout", P, false)
            }
            aO[cL + "Rail"] = cu;
            return cu
        }

        function F() {
            var cs = ca.jwGetState();
            return (cs === f.IDLE)
        }

        function b5(cs) {
            cs.preventDefault();
            q.onselectstart = function() {
                return false
            }
        }

        function aF(cs) {
            N();
            U = cs;
            i.addEventListener("mouseup", bS, false);
            i.addEventListener("mousemove", bS, false)
        }

        function N() {
            i.removeEventListener("mouseup", bS);
            i.removeEventListener("mousemove", bS);
            U = null
        }

        function Z() {
            aO.timeRail.className = "jwrail";
            if (!F()) {
                ca.jwSeekDrag(true);
                aF("time");
                b3();
                bo.sendEvent(b.JWPLAYER_USER_ACTION)
            }
        }

        function b2(cs) {
            if (!U) {
                return
            }
            var cv = aO[U].querySelector(".jwrail"),
                cw = v.bounds(cv),
                cu = cs.x / cw.width;
            if (cu > 100) {
                cu = 100
            }
            if (cs.type === v.touchEvents.DRAG_END) {
                ca.jwSeekDrag(false);
                aO.timeRail.className = "jwrail";
                N();
                aw.time(cu);
                P();
                bo.sendEvent(b.JWPLAYER_USER_ACTION)
            } else {
                S(cu);
                var ct = (new Date()).getTime();
                if (ct - bH > 500) {
                    bH = ct;
                    aw.time(cu)
                }
                bo.sendEvent(b.JWPLAYER_USER_ACTION)
            }
        }

        function ax(cs) {
            var cu = aO.time.querySelector(".jwrail"),
                cv = v.bounds(cu),
                ct = cs.x / cv.width;
            if (ct > 100) {
                ct = 100
            }
            if (!F()) {
                aw.time(ct);
                bo.sendEvent(b.JWPLAYER_USER_ACTION)
            }
        }

        function b8(cs) {
            return function(ct) {
                if (ct.button) {
                    return
                }
                aO[cs + "Rail"].className = "jwrail";
                if (cs === "time") {
                    if (!F()) {
                        ca.jwSeekDrag(true);
                        aF(cs)
                    }
                } else {
                    aF(cs)
                }
            }
        }

        function bS(cs) {
            if (!U || cs.button) {
                return
            }
            var cw = aO[U].querySelector(".jwrail"),
                cx = v.bounds(cw),
                ct = U,
                cv;
            if (ao()) {
                cv = aO[ct].vertical ? ((cx.bottom * 100 - cs.pageY) / (cx.height * 100)) : ((cs.pageX - (cx.left * 100)) / (cx.width * 100))
            } else {
                cv = aO[ct].vertical ? ((cx.bottom - cs.pageY) / cx.height) : ((cs.pageX - cx.left) / cx.width)
            }
            if (cs.type === "mouseup") {
                if (ct === "time") {
                    ca.jwSeekDrag(false)
                }
                aO[ct + "Rail"].className = "jwrail";
                N();
                aw[ct.replace("H", "")](cv)
            } else {
                if (U === "time") {
                    S(cv)
                } else {
                    aD(cv)
                }
                var cu = (new Date()).getTime();
                if (cu - bH > 500) {
                    bH = cu;
                    aw[U.replace("H", "")](cv)
                }
            }
            return false
        }

        function b3(cs) {
            if (cs) {
                bc.apply(this, arguments)
            }
            if (bE && b1 && !bf && !t) {
                p.block(cc);
                bE.show();
                R("time", bE)
            }
        }

        function P() {
            if (bE) {
                bE.hide()
            }
        }

        function bc(ct) {
            aq = v.bounds(aB);
            J = v.bounds(bw);
            if (!J || J.width === 0) {
                return
            }
            var cs, cu;
            if (ao()) {
                cs = (ct.pageX ? (ct.pageX - J.left * 100) : ct.x);
                cu = J.width * 100
            } else {
                cs = (ct.pageX ? (ct.pageX - J.left) : ct.x);
                cu = J.width
            }
            bE.positionX(Math.round(cs));
            bG(b1 * cs / cu)
        }
        var bG = (function() {
            var ct;
            var cs = function(cu) {
                p.style(bE.element(), {
                    width: cu
                });
                R("time", bE)
            };
            return function(cu) {
                var cw = bT.updateTimeline(cu, cs);
                var cv;
                if (B) {
                    cv = B.text;
                    if (cv && (cv !== ct)) {
                        ct = cv;
                        p.style(bE.element(), {
                            width: (cv.length > 32) ? 160 : ""
                        })
                    }
                } else {
                    cv = v.timeFormat(cu);
                    if (!cw) {
                        p.style(bE.element(), {
                            width: ""
                        })
                    }
                }
                if (aN.innerHTML !== cv) {
                    aN.innerHTML = cv
                }
                R("time", bE)
            }
        })();

        function M() {
            if (!aO.timeSliderRail) {
                p.style(aO.time, s)
            }
            if (aO.timeSliderThumb) {
                p.style(aO.timeSliderThumb, {
                    "margin-left": (Y("timeSliderThumb").width / -2)
                })
            }
            var cu = "timeSliderCue",
                cs = Y(cu),
                ct = {
                    "z-index": 1
                };
            if (cs && cs.src) {
                ab(cu);
                ct["margin-left"] = cs.width / -2
            } else {
                ct.display = "none"
            }
            p(X(".jw" + cu), ct);
            aT(0);
            S(0)
        }

        function a8(cw, cv) {
            if (/^[\d\.]+%?$/.test(cw.toString())) {
                var ct = ab("timeSliderCue"),
                    cu = aO.timeSliderRail,
                    cs = {
                        position: cw,
                        text: cv,
                        element: ct
                    };
                if (ct && cu) {
                    cu.appendChild(ct);
                    ct.addEventListener("mouseover", function() {
                        B = cs
                    }, false);
                    ct.addEventListener("mouseout", function() {
                        B = null
                    }, false);
                    bs.push(cs)
                }
            }
            aX()
        }

        function aX() {
            v.foreach(bs, function(ct, cs) {
                var cu = {};
                if (cs.position.toString().slice(-1) === "%") {
                    cu.left = cs.position
                } else {
                    if (b1 > 0) {
                        cu.left = (100 * cs.position / b1).toFixed(2) + "%";
                        cu.display = null
                    } else {
                        cu.left = 0;
                        cu.display = "none"
                    }
                }
                p.style(cs.element, cu)
            })
        }

        function an() {
            var cs = aO.timeSliderRail;
            v.foreach(bs, function(cu, ct) {
                cs.removeChild(ct.element)
            });
            bs.length = 0
        }
        bo.setText = function(cu) {
            p.block(cc);
            var cs = aO.alt,
                ct = aO.time;
            if (!aO.timeSliderRail) {
                p.style(ct, s)
            } else {
                p.style(ct, cu ? s : k)
            }
            if (cs) {
                p.style(cs, cu ? k : s);
                cs.innerHTML = cu || ""
            }
            av()
        };

        function a9(cu, cs, cx, ct) {
            var cv = "volume" + (cs ? "" : "H"),
                cw = cs ? "vertical" : "horizontal";
            p(X(".jw" + cv + ".jw" + cw), {
                width: Y(cv + "Rail", cs).width + (cs ? 0 : (Y(cv + "Cap" + cx).width + Y(cv + "RailCap" + cx).width + Y(cv + "RailCap" + ct).width + Y(cv + "Cap" + ct).width)),
                height: cs ? (Y(cv + "Cap" + cx).height + Y(cv + "Rail").height + Y(cv + "RailCap" + cx).height + Y(cv + "RailCap" + ct).height + Y(cv + "Cap" + ct).height) : ""
            });
            cu.className += " jw" + cw
        }
        var aW = {};

        function be() {
            ba("left");
            ba("center");
            ba("right");
            bI(aB, aW.left);
            bI(aB, aW.center);
            bI(aB, aW.right);
            a1();
            p.style(aW.right, {
                right: Y("capRight").width
            })
        }

        function a1() {
            if (aO.hd) {
                I = new j.menu("hd", cc + "_hd", cb, C);
                if (!t) {
                    aR(I, aO.hd, bi, b0)
                } else {
                    bN(I, aO.hd, bi, "hd")
                }
                a3.hd = I
            }
            if (aO.cc) {
                af = new j.menu("cc", cc + "_cc", cb, bm);
                if (!t) {
                    aR(af, aO.cc, cq, bu)
                } else {
                    bN(af, aO.cc, cq, "cc")
                }
                a3.cc = af
            }
            if (aO.repeatAll) {
                if (ca.jwGetPlaylist().length > 1) {
                    bW = new j.menu("repeatAll", cc + "repeatAll", cb, bm)
                } else {
                    bW = new j.menu("repeat", cc + "repeat", cb, bm)
                }
                if (!t) {
                    aR(bW, aO.repeatAll, bQ, bd)
                } else {
                    bN(bW, aO.repeatAll, bQ, "repeatAll")
                }
                a3.repeatAll = bW;
                if (ca.jwGetPlaylist().length > 1) {
                    bP = new j.menu("repeatOne", cc + "repeatOne", cb, bm)
                } else {
                    bP = new j.menu("repeatNon", cc + "repeatNon", cb, bm)
                }
                if (!t) {
                    aR(bP, aO.repeatAll, a7, ch)
                } else {
                    bN(bP, aO.repeatAll, a7, "repeatAll")
                }
                a3.repeatOne = bP
            }
            if (aO.shuffleInactive) {
                G = new j.menu("shuffleInactive", cc + "shuffleInactive", cb, bm);
                if (!t) {
                    aR(G, aO.shuffleInactive, az, O)
                } else {
                    bN(G, aO.shuffleInactive, az, "repeatAll")
                }
                a3.shuffleInactive = G;
                bU = new j.menu("shuffleActive", cc + "shuffleActive", cb, bm);
                if (!t) {
                    aR(bU, aO.shuffleInactive, a5, aA)
                } else {
                    bN(bU, aO.shuffleInactive, a5, "repeatAll")
                }
                a3.shuffleActive = bU
            }
            if (aO.mute && aO.volume && aO.volume.vertical) {
                aU = new j.overlay(cc + "_volumeoverlay", cb);
                aU.setContents(aO.volume);
                aR(aU, aO.mute, A);
                a3.volume = aU
            }
        }

        function bd() {
            a2 = setTimeout(bW.hide, 500)
        }

        function ch() {
            b6 = setTimeout(bP.hide, 500)
        }

        function O() {
            b4 = setTimeout(G.hide, 500)
        }

        function aA() {
            ak = setTimeout(bU.hide, 500)
        }

        function bu() {
            cl = setTimeout(af.hide, 500)
        }

        function b0() {
            Q = setTimeout(I.hide, 500)
        }

        function aR(cs, cu, cv, cw) {
            if (t) {
                return
            }
            var ct = cs.element();
            bI(cu, ct);
            cu.addEventListener("mousemove", cv, false);
            if (cw) {
                cu.addEventListener("mouseout", cw, false)
            } else {
                cu.addEventListener("mouseout", cs.hide, false)
            }
            p.style(ct, {
                left: "50%"
            })
        }

        function bN(ct, cw, cx, cs) {
            if (!t) {
                return
            }
            var cv = ct.element();
            bI(cw, cv);
            var cu = new v.touch(cw);
            cu.addEventListener(v.touchEvents.TAP, function() {
                ck(ct, cx, cs)
            })
        }

        function ck(ct, cu, cs) {
            if (cs === "cc") {
                if (bD.length === 2) {
                    cu = aQ
                }
                if (bb) {
                    b7();
                    ct.hide()
                } else {
                    bb = setTimeout(function() {
                        ct.hide();
                        bb = g
                    }, 4000);
                    cu()
                }
                bo.sendEvent(b.JWPLAYER_USER_ACTION)
            } else {
                if (cs === "hd") {
                    if (aL.length === 2) {
                        cu = cn
                    }
                    if (aH) {
                        cm();
                        ct.hide()
                    } else {
                        aH = setTimeout(function() {
                            ct.hide();
                            aH = g
                        }, 4000);
                        cu()
                    }
                    bo.sendEvent(b.JWPLAYER_USER_ACTION)
                }
            }
        }

        function ba(ct) {
            var cs = bJ();
            cs.className = "jwgroup jw" + ct;
            aW[ct] = cs;
            if (aE[ct]) {
                aK(aE[ct], aW[ct], ct)
            }
        }

        function aK(cv, cs, cw) {
            if (cv && cv.elements.length > 0) {
                for (var cu = 0; cu < cv.elements.length; cu++) {
                    var ct = aJ(cv.elements[cu], cw);
                    if (ct) {
                        if (cv.elements[cu].name === "volume" && ct.vertical) {
                            aU = new j.overlay(cc + "_volumeOverlay", cb);
                            aU.setContents(ct)
                        } else {
                            bI(cs, ct)
                        }
                    }
                }
            }
        }

        function ao() {
            return (x && v.isIE() && ca.jwGetFullscreen())
        }

        function av() {
            clearTimeout(L);
            L = setTimeout(bo.redraw, 0)
        }
        bo.redraw = function(ct) {
            p.block(cc);
            if (ct && bo.visible) {
                bo.show(true)
            }
            bK();
            var cv = x && v.isMSIE();
            var cw = cg.active;
            var cC = ca._model.config.playlist[0];
            var cs = cC.sources[0];
            var cu = cs.file;
            var cy = cu.indexOf(".mp3") > 0;
            p.style(aO.fullscreen, {
                display: (bf || cw || bX || cv || cy) ? "none" : ""
            });
            p.style(aO.volumeH, {
                display: "block"
            });
            var cA = Math.floor(bj.maxwidth);
            if (cA) {
                if (aB.parentNode && v.isIE()) {
                    if (!bf && aB.parentNode.clientWidth > cA + (Math.floor(bj.margin) * 2)) {
                        p.style(aB, {
                            width: cA
                        })
                    } else {
                        p.style(aB, {
                            width: ""
                        })
                    }
                }
            }
            if (aU) {
                p.style(aU.element(), {
                    display: "none"
                })
            }
            p.style(aO.logo2, {
                display: ((ca._model.mode == "embed" || ca._model.config.mode == "embed") && (!cy || ca._model.height == "100%")) ? "" : "none"
            });
            p.style(aO.logo, {
                display: ((ca._model.mode == "embed" || ca._model.config.mode == "embed") && cy) ? "" : "none"
            });
            p.style(aO.repeatAll, {
                display: (cy || ca.jwGetPlaylist().length > 1) ? "" : "none"
            });
            p.style(aO.shuffleInactive, {
                display: (ca.jwGetPlaylist().length > 1) ? "" : "none"
            });
            p.style(aO.expand, {
                display: (!cy && ca._model.expand) ? "" : "none"
            });
            p.style(aO.hd, {
                display: !bf && !cw && bp() ? "" : "none"
            });
            p.style(aO.cc, {
                display: !bf && co() ? "" : "none"
            });
            aX();
            p.unblock(cc);
            if (bo.visible) {
                var cx = Y("capLeft"),
                    cz = Y("capRight"),
                    cB;
                cB = {
                    top: -5,
                    height: 10,
                    left: 0,
                    right: 0
                };
                p.style(aW.center, cB)
            }
        };

        function al() {
            if (!a6 && ca.jwGetPlaylist().length > 1 && !aC()) {
                p.style(aO.next, a);
                p.style(aO.prev, a)
            } else {
                p.style(aO.next, s);
                p.style(aO.prev, s)
            }
        }

        function R(cu, ct) {
            if (!aq) {
                aq = v.bounds(aB)
            }
            var cs = true;
            ct.constrainX(aq, cs)
        }
        bo.audioMode = function(cs) {
            if (cs !== g && cs !== bf) {
                bf = !!cs;
                av()
            }
            return bf
        };
        bo.instreamMode = function(cs) {
            if (cs !== g && cs !== aZ) {
                aZ = !!cs;
                p.style(aO.cast, aZ ? s : a)
            }
            return aZ
        };
        bo.adMode = function(cs) {
            if (z.isBoolean(cs) && cs !== a6) {
                a6 = cs;
                if (cs) {
                    n(bx, aO.elapsed);
                    n(bx, aO.duration)
                } else {
                    l(bx, aO.elapsed);
                    l(bx, aO.duration)
                }
                p.style([aO.cast, aO.elapsed, aO.duration], cs ? s : a);
                al()
            }
            return a6
        };
        bo.hideFullscreen = function(cs) {
            if (cs !== g && cs !== bX) {
                bX = !!cs;
                av()
            }
            return bX
        };
        bo.element = function() {
            return aB
        };
        bo.margin = function() {
            return parseInt(bj.margin, 10)
        };
        bo.height = function() {
            return bR
        };

        function aT(cs) {
            if (aO.timeSliderBuffer) {
                cs = Math.min(Math.max(0, cs), 1);
                p.style(aO.timeSliderBuffer, {
                    width: (cs * 100).toFixed(1) + "%",
                    opacity: cs > 0 ? 1 : 0
                })
            }
        }

        function b9(cv, cz) {
            if (!aO[cv]) {
                return
            }
            var ct = aO[cv].vertical,
                cy = cv + (cv === "time" ? "Slider" : ""),
                cw = 100 * Math.min(Math.max(0, cz), 1) + "%",
                cu = aO[cy + "Progress"],
                cs = aO[cy + "Thumb"],
                cx;
            if (cu) {
                cx = {};
                if (ct) {
                    cx.height = cw;
                    cx.bottom = 0
                } else {
                    cx.width = cw
                }
                if (cv !== "volume") {
                    cx.opacity = (cz > 0 || U) ? 1 : 0
                }
                p.style(cu, cx)
            }
            if (cs) {
                cx = {};
                if (ct) {
                    cx.top = 0
                } else {
                    cx.left = cw
                }
                p.style(cs, cx)
            }
        }

        function aD(cs) {
            b9("volume", cs);
            b9("volumeH", cs)
        }

        function S(cs) {
            b9("time", cs)
        }

        function Y(ct) {
            var cs = "controlbar",
                cv, cu = ct;
            if (ct.indexOf("volume") === 0) {
                if (ct.indexOf("volumeH") === 0) {
                    cu = ct.replace("volumeH", "volume")
                } else {
                    cs = "tooltip"
                }
            }
            cv = cb.getSkinElement(cs, cu);
            if (cv) {
                return cv
            } else {
                return {
                    width: 0,
                    height: 0,
                    src: "",
                    image: g,
                    ready: false
                }
            }
        }

        function bI(cs, ct) {
            cs.appendChild(ct)
        }
        bo.show = function(cs) {
            if (bo.visible && !cs) {
                return
            }
            bo.visible = true;
            var ct = {
                display: "inline-block"
            };
            p.style(aB, ct);
            aq = v.bounds(aB);
            ae();
            p.block(cc);
            at();
            av();
            bC();
            V = setTimeout(function() {
                p.style(aB, {
                    opacity: 1
                })
            }, 0)
        };
        bo.showTemp = function() {
            if (!this.visible) {
                aB.style.opacity = 0;
                aB.style.display = "inline-block"
            }
        };
        bo.hideTemp = function() {
            if (!this.visible) {
                aB.style.display = "none"
            }
        };

        function bC() {
            clearTimeout(V);
            V = -1
        }

        function b7() {
            clearTimeout(bb);
            bb = g
        }

        function cm() {
            clearTimeout(aH);
            aH = g
        }

        function au(cs) {
            if (cs) {
                v.ajax(cs, bl, bv, true)
            } else {
                bs.length = 0
            }
        }

        function bl(cs) {
            var ct = new m.parsers.srt().parse(cs.responseText, true);
            if (!z.isArray(ct)) {
                return bv("Invalid data")
            }
            bo.addCues(ct)
        }
        bo.addCues = function(cs) {
            v.foreach(cs, function(ct, cu) {
                if (cu.text) {
                    a8(cu.begin, cu.text)
                }
            })
        };

        function bv(cs) {
            v.log("Cues failed to load: " + cs)
        }
        bo.hide = function() {
            if (!bo.visible) {
                return
            }
            if (aZ && t && ca.jwGetControls()) {
                return
            }
            bo.visible = false;
            p.style(aB, {
                opacity: 0
            });
            bC();
            V = setTimeout(function() {
                p.style(aB, {
                    display: "none"
                })
            }, y)
        };
        ad()
    };
    (function() {
        var C = "absolute",
            B = "relative",
            A = "opacity .25s, background .25s, visibility .25s",
            D = "span.jwcontrolbar";
        p(D, {
            position: C,
            margin: "auto",
            opacity: 0,
            display: "none"
        });
        p(D + " span", {
            height: "100%"
        });
        v.dragStyle(D + " span", "none");
        p(D + " .jwgroup", {
            display: "inline"
        });
        p(D + " span, " + D + " .jwgroup button," + D + " .jwleft", {
            position: B,
            "float": "left"
        });
        p(D + " .jwright", {
            position: B,
            "float": "right"
        });
        p(D + " .jwcenter", {
            position: C
        });
        p(D + " button", {
            display: "inline-block",
            height: "100%",
            border: "none",
            cursor: "pointer"
        });
        p(D + " .jwcapRight," + D + " .jwtimeSliderCapRight," + D + " .jwvolumeCapRight", {
            right: 0,
            position: C
        });
        p(D + " .jwcapBottom", {
            bottom: 0,
            position: C
        });
        p(D + " .jwtime", {
            position: C,
            height: "100%",
            width: "100%",
            left: 0
        });
        p(D + " .jwthumb", {
            position: C,
            height: "100%",
            cursor: "pointer"
        });
        p(D + " .jwrail", {
            position: C,
            cursor: "pointer"
        });
        p(D + " .jwrailgroup", {
            position: C,
            width: "100%"
        });
        p(D + " .jwrailgroup span", {
            position: C
        });
        p(D + " .jwdivider+.jwdivider", {
            display: "none"
        });
        p(D + " .jwtext", {
            padding: "1px 0 0 3px",
            height: "39px",
            "text-align": "center"
        });
        p(D + " .jwcast", {
            display: "none"
        });
        p(D + " .jwcast.jwcancast", {
            display: "block"
        });
        p(D + " .jwalt", {
            display: "none",
            overflow: "hidden"
        });
        p(D + " .jwalt", {
            position: C,
            left: 0,
            right: 0,
            "text-align": "left"
        }, true);
        p(D + " .jwoverlaytext", {
            padding: 3,
            "text-align": "center"
        });
        p(D + " .jwvertical *", {
            display: "block"
        });
        p(D + " .jwvertical .jwvolumeProgress", {
            height: "auto"
        }, true);
        p(D + " .jwprogressOverflow", {
            position: C,
            overflow: "hidden"
        });
        w(D, A);
        w(D + " button", A);
        w(D + " .jwtoggling", "none")
    })()
})(window, document);
(function(d) {
    var c = d.html5,
        a = d.utils,
        e = d.events,
        b = e.state,
        f = d.playlist;
    c.controller = function(m, j) {
        var t = false,
            p = -1,
            D = false,
            N, R = false,
            h, A = [],
            n = a.extend(this, new e.eventdispatcher(m.id, m.config.debug));
        var o = -1,
            B = [0];

        function S() {
            m.addEventListener(e.JWPLAYER_MEDIA_BUFFER_FULL, s);
            m.addEventListener(e.JWPLAYER_MEDIA_COMPLETE, function() {
                setTimeout(G, 25)
            });
            m.addEventListener(e.JWPLAYER_MEDIA_ERROR, function(X) {
                var W = a.extend({}, X);
                W.type = e.JWPLAYER_ERROR;
                n.sendEvent(W.type, W)
            })
        }

        function r() {
            return m.getVideo()
        }

        function u(W) {
            if (!t) {
                j.completeSetup();
                n.sendEvent(W.type, W);
                if (d.utils.exists(d.playerReady)) {
                    d.playerReady(W)
                }
                m.addGlobalListener(q);
                j.addGlobalListener(q);
                n.sendEvent(d.events.JWPLAYER_PLAYLIST_LOADED, {
                    playlist: d(m.id).getPlaylist()
                });
                n.sendEvent(d.events.JWPLAYER_PLAYLIST_ITEM, {
                    index: m.item
                });
                P();
                if (m.autostart && !a.isMobile()) {
                    H()
                }
                t = true;
                while (A.length > 0) {
                    var X = A.shift();
                    F(X.method, X.arguments)
                }
            }
        }

        function q(W) {
            n.sendEvent(W.type, W)
        }

        function s() {
            r().play()
        }

        function P(W) {
            z(true);
            switch (a.typeOf(W)) {
                case "string":
                    U(W);
                    break;
                case "object":
                case "array":
                    m.setPlaylist(new d.playlist(W));
                    break;
                case "number":
                    m.setItem(W);
                    break
            }
        }

        function U(X) {
            var W = new f.loader();
            W.addEventListener(e.JWPLAYER_PLAYLIST_LOADED, function(Y) {
                P(Y.playlist)
            });
            W.addEventListener(e.JWPLAYER_ERROR, function(Y) {
                P([]);
                Y.message = "Could not load playlist: " + Y.message;
                q(Y)
            });
            W.load(X)
        }

        function H(X) {
            if (!a.exists(X)) {
                X = true
            } else {
                if (!X) {
                    return i()
                }
            }
            try {
                if (p >= 0) {
                    P(p);
                    p = -1
                }
                if (!D) {
                    D = true;
                    n.sendEvent(e.JWPLAYER_MEDIA_BEFOREPLAY);
                    D = false;
                    if (h) {
                        h = false;
                        N = null;
                        return
                    }
                }
                if (g()) {
                    if (m.playlist.length === 0) {
                        return false
                    }
                    r().load(m.playlist[m.item])
                } else {
                    if (m.state === b.PAUSED) {
                        r().play()
                    }
                }
                return true
            } catch (W) {
                n.sendEvent(e.JWPLAYER_ERROR, W);
                N = null
            }
            return false
        }

        function z(W) {
            N = null;
            try {
                r().stop();
                if (!W) {
                    R = true
                }
                if (D) {
                    h = true
                }
                return true
            } catch (X) {
                n.sendEvent(e.JWPLAYER_ERROR, X)
            }
            return false
        }

        function i(X) {
            N = null;
            if (!a.exists(X)) {
                X = true
            } else {
                if (!X) {
                    return H()
                }
            }
            switch (m.state) {
                case b.PLAYING:
                case b.BUFFERING:
                    try {
                        r().pause()
                    } catch (W) {
                        n.sendEvent(e.JWPLAYER_ERROR, W);
                        return false
                    }
                    break;
                default:
                    if (D) {
                        h = true
                    }
            }
            return true
        }

        function g() {
            return (m.state === b.IDLE)
        }

        function C(W) {
            if (m.state !== b.PLAYING) {
                H(true)
            }
            r().seek(W)
        }

        function x(W) {
            j.fullscreen(W)
        }

        function I(W) {
            a.css.block(m.id + "_next");
            P(W);
            H();
            a.css.unblock(m.id + "_next")
        }

        function J() {
            I(m.item - 1)
        }

        function k() {
            if (B.length >= m.playlist.length) {
                B.length = 0
            }
            if (m.shuffle) {
                do {
                    o = Math.floor(Math.random() * m.playlist.length)
                } while (B.indexOf(o) > -1)
            } else {
                if (m.item < m.playlist.length - 1) {
                    o = m.item + 1
                } else {
                    o = 0
                }
            }
            if (B.indexOf(o) < 0) {
                B.push(o)
            }
            I(o)
        }

        function G() {
            if (!g()) {
                return
            } else {
                if (R) {
                    R = false;
                    return
                }
            }
            N = G;
            if (m.repeat) {
                k()
            } else {
                if (m.playlist.length > 1) {
                    H()
                } else {
                    if (m.item === m.playlist.length - 1) {
                        p = 0;
                        z(true);
                        setTimeout(function() {
                            n.sendEvent(e.JWPLAYER_PLAYLIST_COMPLETE)
                        }, 0)
                    } else {
                        k()
                    }
                }
            }
        }

        function y(W) {
            r().setCurrentQuality(W)
        }

        function T() {
            if (r()) {
                return r().getCurrentQuality()
            }
            return -1
        }

        function Q() {
            if (r()) {
                return r().getQualityLevels()
            }
            return null
        }

        function v(W) {
            r().setCurrentAudioTrack(W)
        }

        function K() {
            if (r()) {
                return r().getCurrentAudioTrack()
            }
            return -1
        }

        function L() {
            if (r()) {
                return r().getAudioTracks()
            }
            return null
        }

        function V(W) {
            j.setCurrentCaptions(W)
        }

        function M() {
            return j.getCurrentCaptions()
        }

        function E() {
            return j.getCaptionsList()
        }

        function w() {
            try {
                return m.getVideo().detachMedia()
            } catch (W) {
                a.log("Error calling detachMedia", W)
            }
            return null
        }

        function l(X) {
            try {
                m.getVideo().attachMedia(X)
            } catch (W) {
                a.log("Error calling detachMedia", W);
                return
            }
            if (typeof N === "function") {
                N()
            }
        }

        function O(W) {
            return function() {
                var X = Array.prototype.slice.call(arguments, 0);
                if (t) {
                    F(W, X)
                } else {
                    A.push({
                        method: W,
                        arguments: X
                    })
                }
            }
        }

        function F(X, W) {
            X.apply(this, W)
        }
        this.play = O(H);
        this.pause = O(i);
        this.seek = O(C);
        this.stop = function() {
            if (g()) {
                R = true
            }
            O(z)()
        };
        this.load = O(P);
        this.next = O(k);
        this.prev = O(J);
        this.item = O(I);
        this.setVolume = O(m.setVolume);
        this.setMute = O(m.setMute);
        this.setFullscreen = O(x);
        this.detachMedia = w;
        this.attachMedia = l;
        this.setCurrentQuality = O(y);
        this.getCurrentQuality = T;
        this.getQualityLevels = Q;
        this.setCurrentAudioTrack = v;
        this.getCurrentAudioTrack = K;
        this.getAudioTracks = L;
        this.setCurrentCaptions = O(V);
        this.getCurrentCaptions = M;
        this.getCaptionsList = E;
        this.checkBeforePlay = function() {
            return D
        };
        this.playerReady = u;
        S()
    }
})(jwplayer);
(function(b) {
    var c = '\x3Cskin version="1.3" name="Nhac.vn - Vega Skin" author="tan@clip.vn" target="6.0"\x3E\n\n\t\x3Ccomponents\x3E\n\t\t\x3Ccomponent name="controlbar"\x3E\n\t\t\t\x3Csettings\x3E\n\t\t\t\t\x3Csetting name="margin" value="0"\x2F\x3E\n\t\t\t\t\x3Csetting name="fontcolor" value="ffffff"\x2F\x3E\n\t\t\t\t\x3Csetting name="fontsize" value="11"\x2F\x3E\n\t\t\t\t\x3Csetting name="fontweight" value="normal"\x2F\x3E\n\t\t\t\t\x3Csetting name="maxwidth" value="9600"\x2F\x3E\n\t\t\t\x3C\x2Fsettings\x3E\n\n\t\t\t\x3Celements\x3E\n\t\t\t\t\x3Celement name="background" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAoCAYAAADHVmuAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAACdJREFUeNpi\x2FP\x2F\x2FPwMxgImBSDCqcFThqMJRhaMKRxUiAAAAAP\x2F\x2FAwAmogNNovXlJAAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="backgroundOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAoCAYAAADHVmuAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAJpJREFUeNq8lFEOgCAMQwui979x\x2FREysSBTkR+T8dJSBwskMbICgHh8aWqsakgAlrqoBDN4u5RirR4AMB2wSxEmhATXhsgpuct69YA2cROcYz0Ebp1\x2FWGpzrSEuQ7HPINXm4zNuDctT+teKl96rMPy31+ydz536ezANzJ6J1mpudidFt4XJY916gbA3fHjiRhHg8m6sogKL9T4A5ocqSGm7uecAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="capLeft" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAoCAYAAADHVmuAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAACdJREFUeNpi\x2FP\x2F\x2FPwMxgImBSDCqcFThqMJRhaMKRxUiAAAAAP\x2F\x2FAwAmogNNovXlJAAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="capRight" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAoCAYAAADHVmuAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAACdJREFUeNpi\x2FP\x2F\x2FPwMxgImBSDCqcFThqMJRhaMKRxUiAAAAAP\x2F\x2FAwAmogNNovXlJAAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="divider" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAoCAYAAADHVmuAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAACdJREFUeNpi\x2FP\x2F\x2FPwMxgImBSDCqcFThqMJRhaMKRxUiAAAAAP\x2F\x2FAwAmogNNovXlJAAAAABJRU5ErkJggg=="\x2F\x3E\n\n\t\t\t\t\x3Celement name="playButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAYAAACSN4jeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAR1JREFUeNrs2C1LBFEUxvHfyGI2WGw2LWIwiF\x2FCajeIaFAEg+C30GoQETSKdW0quKCgQdRiE4NgMNgcyw0bNuzLzHLE+8C0y+HPc54553KLsixF1IigymAZLINlsP8EdobJiGCLeMQORusGK3rYle0Hn7GOi2gZm0ITJ5iIGP4lPGETjQit7KR7rOE62riYxSUOMB5tjhVYTj\x2FHyiD1q2xlJ92k9t5Fm\x2FzzaGEPY5Eca9c7tnHcTa1h7soifWGW+A\x2F2MY2jbp1v1AzVSuG\x2FjRL+T6xioR+oOhwrcZhC\x2FjFIoSrBHlLbrqKspC9sYa4qqCocO01Qb1WHtF+wl3RRbEa5KH5jFzN1QvXq2Dk28DqUNZHfxzJYBstgfxzsdwDCUkFmWew4ogAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="playButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAYAAACSN4jeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAUxJREFUeNrs2C9IBFEQx\x2FHvHocgDCJisdlMImgQrdbBanvBIKJBObggaLUaBMFgcEDQKG68qIZDywVRi00MgoILNteixXR\x2F9s4R3+Rl+fB78+a93STPczxWCacVYREWYRH2b2Bieiqmox4TmwduxHRDTPu8LWU\x2FsA00xHTOY4+NATUxPRbTEY\x2FNvwDcium6mJa97coBYAe4EtNZj+NiAjgX0wMxHfY2xxJgEbgT0yUxLXmBfdcQsA9ciumkx8k\x2FDdTFdFdMB1uKvtk7v5h2+nHwBFSBoyyk+W8n9rP\x2FkmYfLvcA9AHsAVtZSF+9wOrAShbSay\x2FN\x2FwIsAzPtoLqRWA4cAtUspM+dvKhIWONr2S68HElvQAWYKgpVRGInQCUL6WPRTdou7B5YzUJa83JRfAc2gfFuolpN7AxYy0L60JNjIv4fi7AIi7A\x2FDvscAD3bW9nDlMCgAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="pauseButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAYAAACSN4jeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAFJJREFUeNrs1zEKACAMA8BW\x2FP+X6wdcRAcLlznDQYbSrKr4MSM+DRgYGFh32Dzs785EXvRMCQYGBgYGBgYGBgbW+0vKxz1TgoGB3WYBAAD\x2F\x2FwMAzzQFUzpX13AAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="pauseButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAYAAACSN4jeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAF1JREFUeNrs2LENgDAMBMA4omQ0ZshwmSGj0ZsBqKBypPv6i5O+sOTIzFYxvRUNGBgY2O6w40v5nNfrTNxjxd+eKcHAwMDAwMDAwMDAyiX8x8DAwDaHPQAAAP\x2F\x2FAwC5mg5LQBEWSAAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="prevButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAoCAYAAAAG0SEsAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAJNJREFUeNrs1lEKgCAQBNCxO+gtuk0d0jpZXWL6XcjKUFqIGdifFJ+KYoEkvDLAMcKFCxcuXLgbTlNXiQBy\x2FYhkbdmU2ieS2037qXrgkWSumFx33K72M7y02td4ePEPZzvuANJN3\x2FDbez4CWJv1xgM3exw4+z2RXLzw0i58jttd6H7V9KQKFy5cuPDHHAAAAP\x2F\x2FAwAtHCrRwpCvxQAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="prevButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAoCAYAAAAG0SEsAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAKRJREFUeNrs17ENwjAQheHfKGXasAWbpIxC56nCAmnT3iiZIrV700R0IIgPLKR39Umf3p0tyyHnTK06UbGECxcuXLhw12rebWzn\x2FvH2pmjhSU8HTCna9afJ27kfgBUY3ZO\x2FQDtg+gR1wfe0N+D81Z17pfVIvh5N+\x2Ff3\x2FAIsVfAUbUvRxn3nW5Wxp2hLyRSKd14yBbcDd2QKQd8l4cKFCxfuWfcBAJErLKLHvmrVAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="nextButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAoCAYAAAAG0SEsAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAJRJREFUeNrs11sKgCAQheGZFtEq2k7tscvGahN\x2FT0FIiFY4L+eAT6YfmgPqgEWls8AIFy5cuHDhYfhsZn2mn1srC1DaAHZgzPRfKZqzFr+yAH0U\x2FrQLTfF0F6pxr7jD5T48ksPoLUvNo+p8M7Ph1cgP\x2F\x2FwApogDt0aUWrraZvjTaj\x2FhrueScOHChQv\x2FMycAAAD\x2F\x2FwMAQoAq3z8p9kIAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="nextButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAoCAYAAAAG0SEsAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAK1JREFUeNrs1zEOwiAUxvF\x2FTUfmnsKjsKIbF7Beis3akZv0FnZlr5MmDk1Mxb7leyuQX3i8B6FZlgWrOGAYwoULFy5ceNVov53okr8B1xLzY2X8\x2FTaXmJvaOz8Bk0s+WKW9AwaX\x2FOCS76zOPNTIQvvD2lcW7kBvVe0BmCxbrbHCR+C4Nz4D5xJzWOv9fxXcCFy2olvxGehLzMOu12ut3X5Uqb5LwoULFy68ZjwHANKvLypitt3rAAAAAElFTkSuQmCC"\x2F\x3E\n\n\t\t\t\t\x3Celement name="elapsedBackground" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAoCAYAAADHVmuAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAACdJREFUeNpi\x2FP\x2F\x2FPwMxgImBSDCqcFThqMJRhaMKRxUiAAAAAP\x2F\x2FAwAmogNNovXlJAAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="timeSliderRail" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAuCAYAAAAPxrguAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAACVJREFUeNpi\x2FP\x2F\x2FPwMyYGJAA6MC1BdgYWBg+E9QBeNoiNFZADAARQ0EXZ83UQwAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="timeSliderBuffer" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAuCAYAAAAPxrguAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAACZJREFUeNpi\x2FP\x2F\x2FPwMyYGJAA6MC1Bdgmchw4D9eFYyj8TIAAoABAK1+CKfxII6vAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="timeSliderProgress" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAuCAYAAAAPxrguAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAACRJREFUeNpi\x2FP\x2F\x2FPwMyYGJAA6MC1Bdg5F7o\x2FR+\x2FitF4GQABwAAZ6QhK5CKm4QAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="timeSliderThumb" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAHpJREFUeNqM0LENg0AQRNG\x2FWxP0YAE1XA8QIycQG7cANdxJFEFPQ+ALCCy4F49W2m+SALCtewEDUPFzAB+FuAOYJGzrJmDkv0khvo21bYDEvcaBnmeDA3XBsHIKef7uyeHAUjD8ukJMwHwzmhViskvwNhe4Bl\x2FyIc4BAIE5JtQH8hlHAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="durationBackground" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAoCAYAAADHVmuAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAACdJREFUeNpi\x2FP\x2F\x2FPwMxgImBSDCqcFThqMJRhaMKRxUiAAAAAP\x2F\x2FAwAmogNNovXlJAAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="timeSliderCue" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAA4CAYAAADEgGkbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAADdJREFUeNpi\x2FP\x2F\x2FPwMxgImBSDCqcFThqMLBqPA\x2FFI8GD\x2FEKWbCIMY4Gz6jCUYVDWiEAAAD\x2F\x2FwMA3fAFbrkJAOgAAAAASUVORK5CYII="\x2F\x3E\n\n\t\t\t\t\x3Celement name="repeatAllButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAoCAYAAAB99ePgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAANdJREFUeNrsljEOgUEQhb\x2F9o+EeEoWOxCU0GlFSuYJS4QQuQO8mKgXhJEqjsJWE7K74M+RNMskWO9kvb9\x2FMbjAzvEaF4xCc4AQnOMEJTnC\x2FCbcBWrlFoaYvkwFHYAKcvqGcfZAAXWAPTP\x2FCc42CmlB4rWdgHK\x2FXlXJboJ8DVuK5RSHcDLjG9Sr9RLPUnGfsfZVre0TS\x2FtJRUgG3Qu8l+7YqaIYRcPDWrUNgCfSeVHDxfDWBdp1zLtdzHWAXp33wpBzABRjEueVOOf3nBCc4wQlOcIJ7H\x2FcBAB9dqaqZzur8AAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="repeatAllButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAoCAYAAAB99ePgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAQJJREFUeNrslzFrQjEQx3+RLtV8DUGodFHwQ7wMTh2DaxFnhy4VunR1c1KzuuZLdC+0HyQ4mi4OTvryfK\x2FkwR1ku0t+XO7+uagYI7lah4xN4ARO4ARO4ARO4FoIp53Zame6uWZuBnxpZ55SglTZeU47U8fgdwTmwfpd62vuITUgWK8q1FwEfoCXYP13bjW3A8YpYADEGEut3r449fbFsqz\x2FlX0+yvqmZO41WP95p6SsgbfarzVYv7k4pGo5LBprCO2MAqbACnjOplu1MwZ4B0Y16l5t3foI9P9T51TKj187MwAOwLCK3jX6tgbrf4HJWbfyypzMcwIncAIncAIncDftbwDwLqotnvBisgAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="playOneButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAoCAYAAAB99ePgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAR9JREFUeNrslrFKQ1EMhr\x2FrlQ5u3X0AB8eCT6I4OLRjwRfwQRw62dKr3YtP4VqlTl3q4hvoIL+DEe4iPbneyrEkcAg5JOQjCeekkESuskfGEnABF3ABF3ABF3D\x2FE+4GOPAGFX+0Mgl4BM6Bp21UTr84AMfAA9DfiZnbbxBTNGzrEjiz9mZVuTHQ84B5KyfgqiHcYNttHQKjXN+5kXPuToEpUJpdApXdJ\x2FZK8p6upPsEv1t9yZ2kjqSZ2VVqLi9YT9LKkmzyLWtAa9Mzu28d7lLSm9LkO6ZTA1ubnZzTM3OvwLvDvwQmwCHwYnpcm8HWZ+5I0iKxrdUPMzdNzef9IZ6BE+A6wXdub2Mf+AAuTM9z20pi2Qy4gAu4gAu4FuVzAG6II\x2Fl1BEw8AAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="playOneButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAoCAYAAAB99ePgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAVdJREFUeNrsl7FKxEAQhr+oKMg29teIpZYHVr7BojaK4t16lqIv4Dv4AlYmq6KYSt2XsFbQxs7GfhFOOGKzV18SspqDmXKZhS8z\x2F\x2Fw7SYqioK0xQ4tD4ARO4ARO4ARO4KYQTll9qaxebGvlBsCzsnq1yqWk7D6nrG5i8fsGTrxx6dRrbq7qBW9cUkNzBfAG7HrjXtumuRToVgGrWrkCOKtD5o07it3WY2\x2FcxV9qLqnz96WsTrxxxYScHWATGHjjRsrqWSADHrxxeRTNKauXgKcSqdtAD7hSVs8D18ABsBVlWpXVXeAeWC6RbsLH7wMbQAe4Aw5jmPApcA4slLWbULGPAPYJrHjjfmJYyRcwrFDlscbGYB0gDefNttUblyurX4AcWCthxhmwB9yGtzULLR4B\x2FcYHwhv3DqwHU50Uj2EI+qGVPeAmnMezElk2BU7gBE7gBO5\x2F43cAmXFqPza6TdgAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="repeatOneButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAoCAYAAAB99ePgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAOVJREFUeNrsliEOwkAQRd8SVB1HwCObcAIUGoIEheEAcBAECjySK6BIcDQoDoBCowYBAoHoTNlmIfOTcfvTl9nt\x2FAkiQqpqkLAczuEczuEczuEc7jfh1kCmNYWaViYBTsAIKGJ0TioUQAc4AOO\x2FeHNNgycYr\x2FUMDF\x2FXm1TnNkCuAdN2ToCFEW5i+41EytZUcfZTDUTkovFYPxSU51fylArO8uZawE7puQG92AmRA0egr\x2FTNY8fXDNgDbcVQri1br8A91eDfAt23WRVKVCVZgj8DlubZleBW4sumwzmcwzmcw31RjwEASfsmjHffgwoAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="repeatOneButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAoCAYAAAB99ePgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAARFJREFUeNrsmDFKRDEQhr8sgrAvjefQcq9g9dJqGbSy0APoHbzAVrsvpVuaS2yxlYKVB7CyCYJVbLcRMtl9kAczMF1++Gb4+Rlics60WjMaLoVTOIVTOIVTOIWbIJwNbmWDm7e6uRtga4M7l4hM6T1ngzvG4fcD3Ccf15P33IlUkHw0FZ7LwAdwnXx8b81za2AhAZNuLgNPNWTJx9uqkXLORd0N\x2FV3p23\x2F0V93Qf0o0M8H0yz0PGaHnlsDL6DlngzsDXoWyb+ByVDgb3ALYAb3Qc4+jRokN7gF4Bk5LQ7kmdmo39wX8NhnCyceNDe4N2AAXh27lqFGyFwnzbuhXh8RKaRv9yFE4hVM4hVO46cH9DQDtlyHVnVsZrgAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="shuffleInactiveButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM\x2FrhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAIVJREFUeNrs1r0JgDAQhuFXsXIWS2cRSzfTeawVxzkbF4h\x2FRHkPUgYe7i4fKSKCnKsk8xIoUKBAgQIF3lIjUJ+5WLz0mwlgAXpgfaqDceEANMAMDL\x2FawSplHS6OeAO6Y9TZdXAC2lTcm4\x2FEHDSoDWqD2qA2qAUKFChQoMBPAncAAAD\x2F\x2FwMAVhJAc5fTOkEAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="shuffleInactiveButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM\x2FrhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAJFJREFUeNrs1rEJgDAQheEXS8kmto6R2jLYO5SSGVzCXnCRYBsbBzAoEuW\x2F\x2FuDjcTzOpJRU8lQqfAACBAgQIECA98cGN9rg6pIT7CUtNrgmd9FcfbdscE\x2F8ZbukIfp5+s0Nmjce1jP9TVIX\x2FbyWeIOTpDYX91qC9CBFTVFT1BQ1RQ0QIECAAAF+FXgAAAD\x2F\x2FwMAdd0+Z+ES03wAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="shuffleActiveButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM\x2FrhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAPZJREFUeNrslj1Ow0AQRl9Il6uQEolbuESUaVNQcBWQ0oYrkFNEtPzdgd5dpEfBSFghLhYnKwvmk75iR2PN0+yudyYqY9YZI1cCJmACJmACJmAC\x2Fh\x2FANTAr\x2FWhScdwSeAGugddTdNAeLw\x2FkLg\x2FkAcyBJ2BRc4vvgaazbiJ2pL7rEK\x2F8UqtehtuIrfZyVd\x2FUeUmNoYBT9TGKf4SN2HQvd63OSmsMBSSKbv3W9jcgfR79f\x2FDPb\x2FFd4SV5Vs9PBdinndp08pqI9alVFzXP4C2w6aw3wM2xjmDtp+4duIonb3TDwgNwUQJXu4M5DyZgAiZgAiZgAv7U5wDH8SBIAz3wBwAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="shuffleActiveButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM\x2FrhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAASRJREFUeNrslrFqwzAQhj83nYzeII+QtZA9s+qhQ0fRNSkZ+iQdDMkYoyVbh1Rz9uyFPERX4a24yxVMaCBuiiPIHQjE6YQ+\x2FZJ+lDVNQ8pxQ+KhgAqogAqogAqogFcCaLxdGW\x2FzlBV8AnbG21GXSdmp\x2F0Hj7bHCWXRheVA7BRZH6mvgObpQ9aVgabwtWnAFUP6X7Nk5P2rj7QKYiioTSW+BHFhGF2YHJ7AHHqMLH6eucXvmBufAECiAd8nlwEbG2lHJ0da9KSjK5KLaWFI7YNIV5Dp90Hg7ANai3qe0MbCWsYv74Kvcvxq4l1ZLrkzFB7+Ah+jCpmUzb8AgFR98+YEDkP48CR\x2FseF\x2F\x2F5IN9vuIKuOsC16uC6oMKqIAKqIAKqIC\x2FxvcAAlxtSNIeCD4AAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\n\t\t\t\t\x3Celement name="logo2Button" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAAoCAYAAAAmPX7RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAABTdJREFUeNrsmn1MVWUcxz8XLi8pLhumxSTZUGi09WKhZMjwpZbTjRSqtVo5WNGMbv\x2FR22rrxZZZf8hu1nQaa8618oa2SpdRMZBdo6ic0SLdrpORMEiSlzBA+oPf0ecezrn35r333NWe78bOuc\x2F53efte76\x2Fl+fimpycROO\x2FiyS9BZpADU2ghiZQE6ihCdTQBGr8O7jDGWS8vy6cyY1ABVAMXA9kSns\x2F0AF8AewHOiOZ0NDDn2pWYklgCJQCm4FlNs+vlb9VwBagGXgBaNLbnlgXOgPYAXwVgjwrLAe+Bt4FrtBbnxgCM4W4RwHXZYznAqqFyMwYr2UAmAQCmkB75X0GLI3BuEulrxlaQ87FQK8deXPTZ\x2FNEQRlr5i8hd1YWACcHuznY9S1vdxygd3TAjsRtomaNy4Qr3K8RkoWuABqt3GZ5znK2L3uKme50y+8Pj4+yqXUbvkCz1eNJYCXwTQyy0AHgSuAUkKNdaDA225FXX1JrSx7ATHc69SW1VOSU2MXEV7WO4qjA3Z2HbgHapwVEdxrlOSWkJCVHNNDYhQl8gWZGxkenPfP4vTcDP1kocL9cJwB1oDGgVbLhYZMCh4HDygs3DnwHvAP8qfRxDVADFCgv8gRwTMJFvyl5q5Ga15jHBalzvcAZaXsGKJL7V4DvDUcG7FHmuRF4VglJ5vWdBLbLNboY6PF7K6zaX168cRp5T7ftZFfnQQCq8tawpfBSeEtJSqZ7pI8X2+utuis3CDShLMTUKoBHpDwZVEUP3GPRf6WUPX3AIuAIcLVFvxuAKrHtAubLy5JtYbseeAy4A\x2FhNXhBjzgGFwLVK+x4lBwi1vseBO2XsqBTYBEzzf+tzirkqNePiZ3\x2FvL3QMnAqyKZh9HUVzCy5+Pvv3EA2BFqthmoBSj99rVmAk\x2Fy7wPPCaosBQ2ArUAh8C94ax3Snk7Igg0foIuA\x2FIEtJdwGlggazhA+B+5cXziXcpC9NvG7AkWgXmW7U\x2FtHB10Oe1h5\x2Fj\x2FMRYUFtacgr9DzYExUOP32vVXX6YaZwGblCUViq1JMBtJtuzQK5cAW4CfpT7QsXmgLiuTUCPtC9Q6shC0xVJjoy3dJ7cpyk23YAfuF0Uuxg4LgoEGAU+t1jfCiWRmwX8LN8vjNqF1hXVzLFqT00K\x2FurWwuqwUklNclNXVGN3QBAKf5jcZCBEInZOIQ9lw1HiYrWo5UmJjWoMNNu6bPrqEbecCgwp7R8LgYbrzpIYiJD3l8X61PUMynqzY1IH2iiGyry7Y2pnZx8nLJLYMifKfvZatDWIqzbi6TyLpMy5Qr6uqKbPNAk7u4gGtLHrj4TcGOL1GJCHxFyXZKTnlAzymGSs+eKWjWz4E8cJ9Pi9nVYExliBvzpcPt2qbGq2UgbkAifC7Ne44lq7xD2aDw98QiCAUSQ3msoYxxTYIql6PBXY4rACe0QZbskg+5Xa0IzfJREy5nlGidsZio1LFHle3OhLFq6VRChwnxSd8VSgz2EFvgHsk\x2FviMLZvAXdJomN3kP8msE5cZLso\x2FASwUCmH4kJgJEdp7cDROG5mK\x2FCDwwT6gAfCuEsDX0rBftziWaf04wvzUh4BehNylCaH2atkIfHASqWm0\x2F9SEQcFGgH4vTiMv0slTyN+BMLUYW4sXelRwKMpcI7AEQnUbTEYt036GtEUOEcgTJ3kl0bpTndLH316+50n0FBiJbCaqYPbSOGXhKVKK8\x2FBOjBMYtMoNc8GKfbzuPQbW6+csByS+qhDb3cCygiN\x2F58L1dAEamgCNTSBmkCNhOOfAQCmiGUIz8m6SgAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\n\t\t\t\t\x3Celement name="hdButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAYAAACSN4jeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAX5JREFUeNrsmMtKw0AUhr\x2FYbkQLFgR15cYXEGnBS2sX7gXF1xDE4kJQH8EncO3SVfdVsOpDKIKg4AVBqlQx\x2Fm6mOIRanJBowTlw4CT5Z87HnMnJkEASvWh99Kh5MA\x2FmwTyYB\x2FNg8WwSaAIvQLGXwCrAANAPzP8V2AxwDmwCGWAOWLGeLwMlEw8CWwbczSS5+oW+7Ebf26GkSxM\x2FS5pwyRNnxfaseLSLrgyMm\x2FgdeHNJEsQ4KGaAK2DMuvcE1IHQlC0fGbMEHKRdytlIyeqShq3nQ5JqEc2Cax4XcUHSuqQTK2EzAtX2nKR7S3dmxhbSAGt12OC1Lvr9DvpWGps\x2FTKA9hWnssaKkqqRGzFJWzRyJl7LtUzE2f8U1T5x2MQ0cA8EP28WdaS1hmu0iL+la7rbtumKunT9nHOARaHTR3lrx6m98K8uSdiWNmOtS5IU4NZqspB1JD5IW02yw3XzNAttIYs5sQuexOvAKfABHSUwY+L89HsyDeTAP9s\x2FAPgcABBB49rYEzaAAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="hdButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAYAAACSN4jeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAdtJREFUeNrs171rFEEYx\x2FHPifiCe2JQIWKhllYiovgC5q6w0UUQUlgtgr2QIljYWGoK8R9Is2ITEEG2s7nkQMnpn+AL2CgqCmYVFOPZzMFyJIGTXTlxB4adeXhm+e78nnnm2Ua\x2F3zeObZMxbTVYDVaD1WA12P8GtrmMl0RpfBTd8KGtPMl647JjLezAdkyV8cLGqNVFlMancQ\x2FzuI1TmAtPWMZsnmTdKI0jzKCbJ1mnarBXOBSm7zC5jusSDoT+DUfyJHtRpZTzhfHkBn5nAxT8xI+qY+wW3g7ZvuARHuLzGmuu5En2pupTeRL7CvNFTOdJ9jFIvQv3cb7gs1JZ8EdpfDzIMx3g4CsODqAKvk28xu5g6mEBS3mSPSt7x7rYOmRbHIaCPMlWojR+jMvBdCL079hWdoytlpCeVqsI\x2FjZm8bRgm4rSeM8asjdxrmDqhbXtKvPYMTwfMfjboybYPzmVW9BHY7BreBmlcSdI1cJEwf9DiM\x2Fq7soojSfwoAA1aDtxEZeGoGAvblR9iTdDFxLpkw183xfG1yoFC9n7Au7icJ5kZ0JuKx6I5SDvftzEJ1ytvLpYR+IZ3AnT63mSzY1FoYhOSJ6\x2FQlXx9+ux+mekBqvBarAa7B8H+z0AMLqMPPWpZLoAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="hdButtonOff" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAYAAACSN4jeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAdFJREFUeNrs171rFEEYx\x2FHPiQiiJwYVIhZqaSUiii9gksJGQRDyBwi2s0KKYGFjqUFE2GlTiY0QBFubSw6UnP4JvoCNoqJgUFCMZzMHw5EELtzKiTsw7MzDM8N35\x2FfMs882ut2uUWxbjGirwWqwGqwGq8H+N7Ctw9ikCOEY2ulFJ8sYO6NyYpPYge2YGMaGjUGriyKEM7iPedzGacylJyxjtoyxXYSwEzNolzG2qgZ7jcNp+h7j67gu4WDq33G0jPFllVLOZ+PxDfzOJSj4hZ9Vx9gtvOuzfcVjPMKXNdZcKWN8W\x2FWtPIX92XwR02WMn5LUu\x2FEAFzKflcqCvwjhRJJnOsHBNxzqQWW+TbzBnmTq4CGWyhifD1vKNu5kULDYDwVljCt4kplOprXtKmJsdQjpabUKsCnM4llmmyhC2LuG7E2cz0ydtHaqyjx2HC8GDP6pQRPsZm7lNnTR6J0aXhUhtJJUkxjL\x2FD8OElubymNFCGNYyKB6bRcu4XIfFOzDjao\x2F4s3UpUT6dAPfD9n4WqVgKXtfxD0cKWM8m3JbfiGWk7wHcBOfcbXy6mIdiWdwN02vlzHOjUShiBZ+4HeqKv5+PVb\x2FjNRgNVgNVoP942B\x2FBgAVaoty7v7kkAAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="ccButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAYAAACFFRgXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAVZJREFUeNrslzGOwjAQRb+3pkoT7TZ0zj2cbq+x2+UM8Q24QU5gnyDiFKFLkXIBN6lC\x2FbdZIkUglABBoJ0vufB8yX6yPJ6xIolX0hteTAIswAIswAIswAL8ssCfALYAeOex+1t7lNSEbm0L4H2mg9sB+Lg38Nx9qHrIHbbWQikFpRTSNEVZlr232WyQpmnvW2txOBxu25Dk2HGioihojGHTNCRJ5xwBMITAEAK11lytViTJEAKNMf38jEZxXA3cdR0B0Dk3iGut6ZxjURTUWg8859xJ7GHATdMQAKuqOrt7nufMsowTNIrj6jvcdd1Fv23b5yoci8Xioh9F0XMBx3EMAKjrehBPkgTeeyyXS6zX64HnvUeSJPJKjAY+JtexzBpjBklYVRWNMb2f5\x2FnNSff\x2FKt0zd2u7GTn2cwB\x2FT1l4gn4AfM3RXsqPQ4AFWIAFWIAFeHb9DgCj7QjesgakBgAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="ccButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAYAAACFFRgXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAglJREFUeNrsl01rE1EUhp8RieikFRuMH2TVwYhCRdfBLioYrNm3FBXBgkLVhQtdCP4AoatS1EUXzapQsF2UohUUY6sgiI2b0mCCtrGpig22mYbM5rhIM43WRTLtpAbvC3dx5mXufTjMPeeMJiLUk3ZQZ1LAClgBK2AFrIAVcN0CtwMLgGzxyqztXZG0Kqa1BeCQS4nLAIe3GtjtOVSryTc8PDOBFo2gRSOcGb3J0+SU7ZlWnnuTD2z\x2F+vP7pLLpzR0oIpWuDep9GxUGz0t8cfa3eGruvYiIdI7flbaRG5IrrNpxcOiiHf+hijgcZ9i08jxKPaMn0MqJA0EALhwv3p0nn9\x2Fwen6aoe\x2FTXDsaQffsBuBy8ByJwhLjyVeOE7zT6YvJ7DyJwhJXG9bvoV\x2F3IZfG+Gb+4OXcOwAaPbrth40QYhT9mtfhnLUKwF6Pd4Pn130sWyYADWXA5X7Ngb2ePQD8tHJ\x2F9UuZXVkD3\x2FZOd9BbzFJqJWM\x2FS2XTdjUoAS+XAZcqyvDMRO2B\x2FbqP3mMd9KdjfPiaAGD04wsAuo6cJWyE6Nx\x2FkoezY5hWHoDHn2IEdzXRbpx2Xqw32zgG4iN0xwcAaGts5nZLB2EjZFeSO5N99KdjAPQEWrl1qovmfQHHjeP\x2F63T\x2F8rSWcZFj0Q3g7mo2rkJfgCtuXDr1x6GAFbACVsAKWAG7rl8DACnPOVdGvqGTAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="ccButtonOff" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAYAAACFFRgXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAdZJREFUeNrsmEtrGlEYhh9LRuQsHNKFVMhFEMaVMylpXKb7kixjN8kiTZfm18RliYvkH1S7jQ0MuGhoZlw54CLXBoUEXRxEF3bTDljakJAZNfS8y\x2FMNh4dv3vOeS2Q4HPKc9IJnJgWsgBWwAlbAClgBT5VmHvrhbqHwDvgEJANmuAF29orFL0F3OAxYgFe\x2F5g7cEskQ\x2F3QycEv8S7Zt8\x2F30FIBEIkFuZYVUKgVAu93mqFql1WoB8HppiVwuh6Zp4Xv4b6rX61xdX7O1uYmu6zQ8j3KlwoftbQA+l8uYpkl+YwMpJeVKBcd1ebO8PP6UGAwGfD0+xrIsdF0HIGMYCCG4uLyk2WwC+HBCCCzLwnXd8aTEn5JSAvBydnZk\x2FHd3bdtmcWFhpJYxDDKGMZkc7vf799Z7vd50bRzRaPTeeiwWmy5gIQQAt3d3I+P7pRINzyMej3N2fj5Sa3ge+6XSZIA1TePt6iqO49DpdHwgKSXzc3Ok02kAvp2c+J53HAfTNCez6ACy2SzdbpeDw0M\x2Fh9\x2Fn837319fWOKpWqdVqfg4\x2FJdIAIg99SNktFEJ9cdkrFiP\x2F\x2FfHyR4gcN2EAf3zMxI\x2FQFbATuIfVjUMBK2AFrIAVsAIeh34OAAqQjeMpxsGJAAAAAElFTkSuQmCC"\x2F\x3E\n\n\t\t\t\t\x3Celement name="muteButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAYAAACSN4jeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAVlJREFUeNrsmL1KA0EUhc9G\x2FHsDNSqChRK0ipBCrASrVMFGH0C0sfQhxFKsbawsfA6LEARtJKISRfQNDMhncxfXuIZdd7MMOAcuzN653PkYmDPLBIBcVEmOyoN5MA\x2FmwTyYB8umsotg+5LuY\x2FK1P60DZI0x4JQvRefmLHeUtm9WqDJwyXf11pxYfrMosFXghZ8SsAi0gGVgBLgBOsDooMF2gHfiJWASeAPaBtOwua1BgCVVWF+37z2gZLt7lnS9IMWvddLCIDJuS3qUtC7pQlJV0qwLBtuUtGDjjqQpV52\x2F6wpYVdKtjaclPbsAVpc0L+nc1qlJag3a+XeBbp9TOQE8AXdmF+EJ3S7CYNeA11\x2FAKkATWAGGgCvgoQiDDWPGAPpdSYdpdysPMAHjZpxxYBXLHRd9iUfjAPjoyQXABjCctl+Q86PKkqTrPBoF\x2FrXHg3kwD+bB\x2FhnY5wAb8dDRkzpR\x2FwAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="muteButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAYAAACSN4jeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAadJREFUeNrs2D1oFUEUhuFnRUFwsbAKJoKgoIiVFinUykLQqSRgERghhVjZqKWlCIKNIMZGcItYaFBwasXORsRKFPwjiD+dsCCKuDZThMu94NVNsuAeGBh2hjMv3575ZpiiaRpdjHU6Gj1YD9aD9WA9WA\x2F2D1FWYbJzYGUVzuDtkO\x2FTZRXGXmd9C0AbMY+TQ8a24wmu4NyqKZZ\x2F3eNhUFDH9A7Xcbaswsw4uYu\x2FvY+VVTiAu5gYgCnKKuzGbUS8xDNsxs46pu8rplhZhVN4OAi1LL5iEvdQ4AKmcLz1Giur8MfS1jF9LKswhweYww18QshKrp2P1TElvMZMHdOvvAkOdcVgn2JX7i9ha1ed\x2F0dXwPbjVe5P4cOag5VVCNiBO9n5p7NttLsr65iKZYuexlVsGAE1kU+DN7iJo7m+7q+oYnVM8ziMLyOmbMFnnMBPXMR7LK6482dltmUV9g1TNs+5jPOYrWNaWJUaq2NawkEsjADfk6GujQPVyu2ijukbZssqPMelgeEXOIJHYydumqa1tunWsb1t5Sr6154erAfrwXqw\x2Fwzs9wAdw+IQD2psSQAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="unmuteButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAYAAACSN4jeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAVNJREFUeNrsmLFKA0EQhr9TiRCxk1iJnakMGC0sUlhoChFSCGKnT2Ap2Fn6CpY2YmFjIVpoQBQfwM5XkBRpBC3kt9nAYbFuzJ5ZZQaW3Z1jmI+9uX9vN5NEijZComZgBmZgBmZgBvYPwerAc2pgW8A9MJcKWAYcAmdAOearHBsgdgI4ATaLqLGfgs0AF8BCUcXfD9hxbtwCpgNiKkANuMn5VoEn4MUbKSm0hVo+pi3pTVLTzZtu3v4uX9FgNUkdSa+SDlzfcf6hgiFpUVLXPetKqofk+w3lLzlZ6clLKYUtaQm4AkaBPddfO79fIPs4Vx7lxtvArEd0e3YLLAPrwB2wAlwCj8BarK8y3yqSHgJqbEpS44uv4fzeHNkAJ\x2FFxp207nhUbyl75DuwC+8BH7OLMIt1dbACnwGSsFcsiXqrMA+dANTUw+7U2MAMzMAP7C2CfAwBdJB9WcbOj8AAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="unmuteButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAYAAACSN4jeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAVpJREFUeNrs2K9LBEEUwPHv6KrBieIlq5gExaZRzuCAgmAcTUa5JFi0KWI0XXSSyUN4oMGmf8EltVnF5hQRWcuECYr3Y49ddAaGZR772A\x2Fs483sqjzPqeIYoqIjwRIswRIswRLsr8G0M\x2FPamcdKwbQzm8AdMF0ULOsTpIBD4ABQRb7KrA\x2FUOHAObAyixrIeUVPAFTA3qOLPusA0o+UaUOsgZxKY9VZuo9gy0PZWXooq\x2Fp1o1jrMuQBEO1MPqDogIV5qH2sAHmhpZ\x2FaBVlg3SoV5K21gBfgAjsK1HuKld\x2F7RqJWosC53S9LOLADXwDCwG643IV4Y7CSaz13kjACr3soZYML6+LdE1csHb2gDl8DiN3WlovsmgBlv5T6KLQEP3spr4bDwgDGgCWz9BCtlE\x2FdW3r2VbWAP+KzcscdbOQXWgbfKnce8FQn19lQUTKW\x2FPQmWYAmWYP8M9jUAjcZhxhA9uZEAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\n\t\t\t\t\x3Celement name="expandButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM\x2FrhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAFdJREFUeNrs1kEKACAIBECN\x2Fv9le0MgJDF77jC4ImVVxeSsGB5AQEBAQEDAt9kXb7u\x2FPaniaRVf19OxJioGBAQcegfLBH+sOE0QEBAQEBCwPQcAAP\x2F\x2FAwD+iQZVjnEI0AAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="expandButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM\x2FrhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAGhJREFUeNrs2LENgDAMBMAYUTIaMzAcMzAavVkBIaO4uK9dnPRRYiUyc3TOMpoHEBAQEBAQcG7Wt4PbuZeuPfdxhYpbVfylnopjomJAQMCO92D1s6fiPxP+ZgABAQEBAafmAQAA\x2F\x2F8DAOrnEEhfl6YeAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\n\t\t\t\t\x3Celement name="fullscreenButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAG9JREFUeNrs1lsOgCAMBVFq3P+W6wqIAZ\x2FV028Kk0ybS2Rmq1BLK1JAgQIFChQo0G+DrgNne9+suKOf+ifVz+ju9aStr6Q+Tnw3qAd6cTIdndfhu6h\x2FSzLNjEHa+r8mU1APFChQoEB3awMAAP\x2F\x2FAwBX2wpdrVkK4wAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="fullscreenButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAIhJREFUeNrsmEEKgDAMBLvisU\x2FrG3xc3+DTvMe7WIxaMJXZcxMGdkNCZWZpBE1pEAEKKKCAAgoooP8Gnb0Pcy2tM0vOFqf127IK60Nb37Ir1+It01UMsD6k9d7pfBADrAe0+2bqkFe7m1esD7GZDgfKq6OEqf9K4jcPUEABBRTQUNoBAAD\x2F\x2FwMAzCcZVUSgmCoAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="normalscreenButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAGxJREFUeNrsljkOACAMwwji\x2F18uKyt3C+4eYWFUIjNLESanIAMooIACCiiggL4NWgZzbeXSxgzqXahf2bC7nwHqb6rX5Fn64kYB9biedCKPei\x2FrafaXopSE7aM6lEE9oIACCuhvoBUAAP\x2F\x2FAwAkkApdnyWPwgAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="normalscreenButtonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAIVJREFUeNrsmMsNgCAQRBnj0dKsgeKsgdK4r1djNAE0YdE39yEvzH4IMrMwgqYwiAAFFFBAAQUU0G+Dzi2mZVuPTy4V2i49OSai9x39Ke6nqi4dou8WfY5JNyVReoR+caOAehxPLZup2k\x2F0LsbTC1tKdH1vid88QAEFFFBAXWkHAAD\x2F\x2FwMAEckYSbjN71YAAAAASUVORK5CYII="\x2F\x3E\n\n\t\t\t\t\x3Celement name="logoButton" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAoCAYAAAAv1t6rAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAABTpJREFUeNrsmn1MVWUcxz8XLi8pLhumxSTZUGi09WKhZMjwpZbTjRSqtVo5WNGMbv\x2FR22rrxZZZf8hu1nQaa6618oa2SpdRMZBdo6ic0SLdrpORMEiSlzBA+oPf0YfDOffe4tyXsee7sXPuc57zO89zvs\x2F39\x2FIcXOPj42jMHCToV6AJ1dCEamhCNTShGppQTahGfMMdbse09zeE6nIjUAYUAtcD6dLeC7QBXwIHgPZwnjfw8GeanUgSGgTFwFZghc31a+VvDbANaAReABr0648vlzsL2AV8HYRMK6wEvgHeBa7QFMQHoelC5KOA63\x2Fc7wIqhdh0h+fUB4wDAU1o+Mr8HFjuwPOXi61ZWluxi6FeOzLnp87libwS1i1cRvacDABO9XdyqOM73m47SPdwnx2pO0TtGtOEK9yvLZLlrgLqrdxsadZKdq54itnuVMv7B0eH2dK8A1+g0eryOLAa+NaBLLcPuBI4DWRplxscW+3IrC2qtiUTYLY7ldqiasqyiuxi6qtaX1FU6N72w7cArVMCqjuF0qwikhISw7IzcnEMX6CRodHhKdc8fu\x2FNwM8WCj0gxzFAfdAI0CzZ9qBJoYPAEWUBjgLfA+8Afyk2rgGqgDxlgY8BxyW89JqSwSqpuY1xXJQ62wuclbZngAI5fwX4wXB0wD5lnJuBZ5UQZp7fKWCnHJ2NoR6\x2Ft8yq\x2FeWlm6eQ+XTLbva0HwKgImcd2\x2FIvh8ekhEQ6h3p4sbXWylypQagJJUGGVgY8IuVQv+oUgHss7JdLmdUDLAGOAldb2N0EVEjfDmChLJ5Mi74bgceAO4DfZcEYYw4ohK5X2vcpOUSw+T0O3CnPdlShDcAUf7kxq5CrktMu\x2FfZ3\x2F0pb3+lJffLmXkfB\x2FLxLv8\x2F9M0BdoMnqMQ1AscfvNSs0nEE+D7ymKDQYtgPVwEfAvSH67haydoWRuH0M3AdkyCJwAWeARTKHD4H7lYXoE+9TEsJuC7DMaYXmWrU\x2FtHjtpN\x2FrjzzHhbGRSW0piUn0Plg3KZ56\x2FF4rc7khhnEGuEFRYrHUsgC3mfqeA7LlCHAT8JOc5yt9Doqr2wJ0SfsipY7NNx2RZMtYtQvkPEXp0wn4gdtF0UuBE6JQgGHgC4v5rVISwznAL3J\x2FvuMut6agap5Ve3LCZBPb8ytD2kpOcFNTUGW3YREMf5rcaiBIgndeIROFAJS4WilqelJiqxpDzX1dNra6xI0nAwNK+ydCqOHqMySGImT+bTE\x2FdT79Mt\x2FMiNShNoqiPOduR\x2FvZ9Y8QlkhsmjdNOx9YtNWJazfi8QKLJC92Gws1BVU9pkHZ9QvXnlVzbzhkO4jXHSATidkuyXjPKxnqccmIc8WNG9n2pzEn1OP3tlsR6rBCf4ty2Xar8pIzlbIjGzgZ4r2NKq64Q9ypeTPDJ4QCGEV6valsiplCm6Q0iKRCm6Ks0C5Rjlsy1F6lNjXjD0msjHGeVeJ+mtLHJYq9IG73JQtXTDwodL8UwZFUqC\x2FKCn0D2C\x2FnhSH6vgXcJYmT3YeJN4EN4lJbxQOcBBYr5VdECf0vW3+twLEIjqUZ+DHKhPqAB0K4VwNfyQbCCYtr7WLHF2KRHgW642LrTzbn18jEIoHVSk2p\x2FwUlCgo1Avp7ERjHHpVMjegRChOb00663mOAR1MRO0KHJPC3OPD8FrE1pKmIHaEw8aWieJrud6\x2FY6NE0xJ5QQ6nlwFomNqLDhV8SoAqtzBjWoSESpXqpuTbJ5kMOl78xdjOxA3RY6rM2\x2FdrjoGzRmPkuV0MTqqEJ1dCEakI1Zgz+HQB\x2FpGUIXm0qiwAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\n\t\t\t\t\x3Celement name="volumeCapLeft" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAoCAYAAADHVmuAAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAACdJREFUeNpi\x2FP\x2F\x2FPwMxgImBSDCqcFThqMJRhaMKRxUiAAAAAP\x2F\x2FAwAmogNNovXlJAAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="volumeRail" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAUCAYAAADRA14pAAAACXBIWXMAAAsSAAALEgHS3X78AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABBSURBVHja7NdBDQAgEAPBHsEe\x2FuUcMiAw62DSV6u781MjnwUMDAwMDAx8rplkWRj4ncp5AAYGBga+pw0AAP\x2F\x2FAwBYygZwspn0OAAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="volumeProgress" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAUCAYAAADRA14pAAAACXBIWXMAAAsSAAALEgHS3X78AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABCSURBVHja7NdBEQAgDAPBFnuoRGmQAQN7DnaaTztJ\x2FdSozwIGBgYGBgY+V9eacWHghybteQAGBgYGvqcNAAD\x2F\x2FwMAce4IC3w7y0AAAAAASUVORK5CYII="\x2F\x3E\n\n\t\t\t\x3C\x2Felements\x3E\n\t\t\x3C\x2Fcomponent\x3E\n\n\t\t\x3Ccomponent name="display"\x3E\n\t\t\t\x3Csettings\x3E\n\t\t\t\t\x3Csetting name="bufferinterval" value="110"\x2F\x3E\n\t\t\t\t\x3Csetting name="bufferrotation" value="45"\x2F\x3E\n\t\t\t\t\x3Csetting name="fontcolor" value="ffffff"\x2F\x3E\n\t\t\t\t\x3Csetting name="overcolor" value="0ba14b"\x2F\x3E\n\t\t\t\t\x3Csetting name="fontsize" value="15"\x2F\x3E\n\t\t\t\t\x3Csetting name="fontweight" value="normal"\x2F\x3E\n\t\t\t\x3C\x2Fsettings\x3E\n\t\t\t\x3Celements\x3E\n\t\t\t\t\x3Celement name="background" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABQCAYAAAAz8KTYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAABxJREFUeNpi\x2FP\x2F\x2FPwMDAwMDEwMUjDJGGUOXARgARe0DnWre200AAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="capLeft" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABQCAYAAAAz8KTYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAABxJREFUeNpi\x2FP\x2F\x2FPwMDAwMDEwMUjDJGGUOXARgARe0DnWre200AAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="capRight" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABQCAYAAAAz8KTYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAABxJREFUeNpi\x2FP\x2F\x2FPwMDAwMDEwMUjDJGGUOXARgARe0DnWre200AAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="bufferIcon" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAACqtJREFUeNrsW29sW9UVv+e+Z\x2Fu9Z\x2FvZcZq\x2FbheSNi1rYAaWUpJVYmGllFCQOsmZNgRTKaMTAk2aNKmfJiM+IU2ahKaKfGHSkPYh0aDaumgTXb2iYmhpC2kxTeKakqbEie3E9rPj53ffve\x2FuAzbqqqRxGied1h7Jkp99\x2F5zfPef+zjn32oDWUTjnvPIeAGA958boDpG7QO94oPF43JNMJpsJIb+klJ4khPxirXWMRCLy6OioMxQKiesGtKWlZZuqqt\x2FDGD8PAFsBoOvKlSvetUI5MjJi8\x2Fl8oqIowv79+x3rBpQQkmaMzQOACyGEMMaP+f3+Z9fKmn6\x2FXxQEARhjfGFhwVo3oF6v98vLly9fYoy9jRCaRQg1YIz75+bmNq3GtRbTbWRkxOZwODBCCBUKBdbb22usKxkFAoGFo0ePHuGcf1GOiR2qqh587rnnnLVCGQwGoaOjw16xZjKZZAgh67YwmWEYA5TSDxhjCcbYp7lcrnO5hKEiyxkgHA5LY2Nj7lgspkYiEXm1EWJVnSORyF8556fLj3WKorySyWTuWe0ChkIhvHHjRrsgCEAIsS5evEhvmzUrUiqVnqSUfli26nSpVNq7GosGg0EhEonIsVhMjcVi6sjIiKMW8f7GAXAsFlMHBwdt1Q5w\x2Fvz5f1uW9adKCiuK4jOapt17qwodOHBAbGhosJUZ3jpz5kzVezMYDApLESK+kQBUVZWfeuop9ezZs0o1K9nb26sTQj7inF9CCDEA2C9J0uO3SEBCY2OjgBBCjDEejUZJKBSq1mXx7t27cUtLCyyrdyQSkU3T\x2FDWl9B1CyEuxWEytZoZYLKYahvEsY2yCMZaglP65UCgEVuq64XBYqrjs6OiocyUuOzIy4kgkEg3T09MbhoaG7Dd+\x2F62Zs9lsu81mqwOA\x2FQCgYIyb29vb7zcM4+S5c+f+3tvbqy81SWdnp5ZKpU7U1dXtBYAfAUCfw+H4EiE0ugICEn0+n1Bx2fHxcbMalx0aGrLv2LFDkWXZLoqiDSGEenp6XAih+UVdlxCim6aZ5Zy\x2FzznXAMAHAL2CIDy\x2FY8eOX+m6\x2Fmg0GnUtNWE4HJ4zTfOPnPPL5dj6Q8MwflolT+B9+\x2FbZFUUREEJI13VrYGCALAdwbGzMvWvXLtXtdjsrIAkhhqZpZMk92tjYOOP1er+Mx+O\x2FtyzrHc75hTJgP8Y4aLPZXuns7PyJpmn3LgZ4YGCAyLJ8ohJuAKAeY\x2FxgtcmBLMu4Ys1z586ZN7N8JBKRe3p6XBs2bFDtdrujvKfpwsJCcXx8vNDV1VW4sd+SVf7s7GxTXV3dzzDGTyCEVABwlPfZOGNsaG5u7tRnn32W7+\x2FvN24IN0+LovgCQihPCBlUFOXDatO9trY2WzKZpH19faXF2gwNDYk7d+50Op1O5bp9b5mmaY6PjxeW6Lc8A46Ojjo1TdtmmuZvKKURxtg5SuknlNIwpfQPpVLp8cU2fq0lFAqJlfIwlUq1ptNpfzqd9s\x2FMzDSOjo46g8GgsBxxVXVuk0wmm91u9zZRFJ\x2FEGD9+3Wpe5Zx\x2Fbprm3xRFOVNrgMFgUHj99dcVj8cjiaIoAgCuuGkmkyleuHDBGBgYqCprWtEBlaZpWyVJ6sEYPwwAj1wH+Axj7H2Hw\x2FFurQB2dXXBgQMH3IqiSNcDLBaLRiKRMMqVTNVp4YrKKlVVJxBCE\x2Fl8\x2FqwkSVcB4EEA6EQIPYAxjtXKkl1dXbB9+3Ysy7IDADDn3DIMg8zMzOjd3d2ldc97dV3vo5T+hVL6djqd9te66I5Go66ZmZnGK1eueGtc696Vu3JX\x2FscEKKXHVjuIKIr71krBhYWF7pow251iUXzXqe\x2FKXfn\x2FlXQ67SeEvEQIeal8xlPTyiWVSrXm8\x2Fnt6XTaXy7Fbj283EqneDzu8fv9PYIgdAFAG+ecWpb1gcPhOFqr+nPPnj22QCDQhTFWOOeEUprJ5XKpTZs2zd9SCFxJ42g06mpvb79PFMX7AOC7AOAufzVTa28xDINzzilCSAAA2WazyT6fT8lms95MJjPf3t6erblFo9Goy+\x2F3N8qyfD\x2FG+AcA4C3XoRrnfJIxNqpp2nhTU9NsLUPf1NSU1+PxNIii6AGAb7cGYyyj6\x2Frs5ORkrru7u7hqoENDQ\x2FadO3c6m5qaugVBeAwA6itHQ5zzDGPs9NTU1KnOzk5tLblgcnKyrr6+\x2FjuCIKgIIaGsN6eUJpPJ5NfHjx8vHjp06KYn+jcDiovF4iM2m20vQsgDAHIFJGPsX\x2Fl8\x2FuzFixfn+vr6yPUTaJq21eFwBDjnhdnZ2Y\x2Fb2toy1RDPm2++6fN6vdtM00ypqjq+2OHZQw895HG73X6Msbf8ucU5p5TSuYmJias3s+6iQIvF4k5RFLsBwA8AG8ofU8uyPjIM42wymZzevHlzbrG+pVKpXxCEhznnOcuyvpAk6Z83AxmJROSmpiZ7a2vrAwDgsSwrlUqlxhZboPLditzU1OSRZbkZY1y5SWCWZRVN08xMTk7OBAKBhSWBRqNRV11dnVRfX\x2F8oxvh+AGit8IJlWZcYY2O5XO7z5ubm5FJM+eqrrza73e6nAaCZcz5PKT2tKMrHlTaEkEOV93a7fRChb64S2trabB0dHQ8CQB1CCFFKv3K5XBeq2L8bRFH0Xrd\x2FGaV0vlQqzTU0NCQWzXVdLpdNkiRFEITdZZCEcx5njJ3IZrPvyrJ8YimQCCG0Z88em8vl6gGAhjJRXTt27Nj55dy2v7\x2FfCIVCejabHeOc5xFCSBAE37Vr1+pvEjutTZs2zR88eDBeKBSuUkpTnPMSQkgQRbFBkqR6tJwbEUJ+bprm7wghLySTyeZqg3s2m91smuZh0zRfI4S8kM1mO25sRwg5VHktUZJ9v1QqPVMqlZ4pFos95bvRapOLlmKxuHNhYaF7amrKt2yHyuFwLBZTq81GZmdnmwghB0zT\x2FK1pmq+VSqUnFmu3HNBEItGg6\x2FquMti9MzMzjdVWWMFgUBgbG3PH43HPYnrjRciklMvlCidOnNCHh4dZNZM4nc5mALgHISRwzr\x2FSdX38VsJIS0tLihBSicU2j8ezNR6Pu6vpOzw8zBKJhFkoFOhieq\x2F6F5bZbLZdUZQ+AGgrW+2o0+n8dCmL3khGi8XMhoaGToxxczlD+uLFF1+8Uu2ir1nhLUnStjJIxjm\x2FnM\x2Fnv17NeG1tbRld16crsdlut3\x2FnyJEjjbf1hKFQKDyAMd5SftR1Xf\x2Forbfeml+tUteuXcswxqbRNz8VcEmS5LutQG0225ZyOCGWZU3EYrHpUChEV6tUIBDQc7ncVYSQWT58a5ybm9u47kAHBwdthUIhAAD+csyc0zTtkzfeeMNAtRHr1KlTGqV0FiFEAcAty3JrteGmJvVoLBZTVVWV6+rqfgwAzQghwhg7LUnS8eX6VkNG1xshHo+7W1tbA+VqqUQIuaqq6ti6WNTr9bokSXIDgAchhCzL+iqXy11cg6LF2rx5c840zVmEEEUISTabbcO6ua6maQu6rmuWZY1xzrOMsXiN69D\x2FkomJiSnGWIJznjcMI3Gr46z4Ku7w4cMFhFDh5Zdf\x2FseWLVuU+fl5A62hdHd3F8Ph8CWfzye89957xroBrQTu4eFhFg6HUSqVWvNL2ZMnT9KWlha2GkZf1\x2F+erJCMaip3zJXEfwYAp5akmRaQGIYAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="errorIcon" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAA0CAYAAADxAdr3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAaFJREFUeNrsmE1Kw0AARl+CoDRZCKL74gHqOWoW6gFyiq4svYe4KhHX2eQgdi+4V9BNFF3FzRSGkHQyM0mcynwwtJPm5\x2FUjfR0SVFXFPiVkz+KBPbAH9sAe2AP\x2Fb+AD2xPEWdK0+QSogHfV8WVajAvckky8XjrXcENmwFx6v3H5Hg6BXJrnQOAy8A0wleZT4NpV4CPgoWH7I3DoIvCtgG76IkvXgE+B1Y7PV2IfZ4DvO+xz5wrwDLiS5lFtyD\x2FI2Z8Cx1lS19g2X2LUY60524brGlPFWnOhRbttGlPFSnM2DbdprIuvl6MCx1mi0pgqxpozbXjdg13WowDHWSKvxmwyN9FcqAnbpjHT5HGWBEM23FVjEzF611zQ9XGr0NiHoRl25Rs4LtPip++GFwPAbjW36LVhobHXjueMavPPjsedlWnx1lfDugpqW0tYX0PZsNDYk8aFIwl2otEwwEWZFhtjYKGxZ80FjuktAfACnJdpUZneErqrsS2gPHSi1FxrwwNqzEpz4QCrsT40t7T+43Al\x2FnGrB\x2FbAHtgDe2AP7FR+BwC7V2DZEs8WtAAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="playIcon" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAACzFJREFUeNrsnX1QVNcZhx9WMLASwF0WByysho2iiYqYArsOGrWUODGKRKNpGGOI06q17ZDxAz8n0WIaNWGq1iYZQ0yaTBQSdMQEozUGNSxQpSTOKFJ2XCSsFZZb3a648Wv7x57t3BhU0EWWhd8Ms4e7s\x2Fee+8x5zz3nPed9r5\x2FT6aQLFQ6MBoYCceJzIKAGlEAwcBWwAxfFZxNwBqgRn\x2F8ErF11A34PGKASmARMBCYAIwG\x2F+zynE\x2FgOOAx8BRwCWn0JoAJIBeYCzwD95F9KklRps9nMTU1NZpPJVF9TU9N8+vTpi\x2FX19Y7KyspWrVbbd\x2Fjw4UFxcXEPR0REKLVabf\x2FY2FhtRETEoJCQkEEqlSrxlutdBoqBHcBB4GZ3BRgMzAP+AAySAStvaGioPHz48PGVK1fWtLa23tcNKpVKRW5ubtyECROeiI6OTlSpVMmyr83An4Htwvy7BcAgYBGwVPRxXLp0qaqhoaEiLy+vOD8\x2Fv6kzW0RWVlZEdnb2M9HR0UmhoaEJ4rAV2AhsAa54M8DZwBtAjGhtZeXl5Xuefvrpr7qig\x2F\x2F8888nJicnp6tUKoM4dA5YBuz0NoBa4G3gKQGu4ujRo7vS09OP4AUqKioaN378+FkqlSpJHPoS+A1Q7w0AM4G\x2FACEOh8NSXV39kV6vL8ALZTQan4uPj38hMDBwIGADfgt81FUAAwW4LIDz58+XpKenv15ZWdmKFysxMVG5Z8+e5ZGRkZPFofeBhYDjQQKMAPYAeqfTedVoNG4aO3ZsEd1I33zzTUZycvJihULRFzAC6WKQ3uExWkc1GCgD9Ha7vXbFihWzuxs8gLFjxxYtW7Zstt1urwX04p4Gd3YLHAb8HYiSJKl83rx5a3bv3i3RjTV9+nTV9u3b14rxowX4BXC6MwDqxHTpZ83NzaWpqamrvv322yv4gEaNGhV08ODBP2o0mvHA92KaWedJgBrRxHVWq\x2FVIbGzsYpvNdhMfUkhIiMJkMm0KDw8fJ+AZgGZP9IF9xdxSJ0lShV6vz\x2FE1eAA2m+2mXq\x2FPkSSpQlhbMfCQJwBuA5LsdnvN\x2FPnzV9fV1V3FR1VXV3d1\x2Fvz5q+12ew2QJIZp9wUwE3jZ6XReW79+\x2FcrCwkIJH1dhYaG0fv36lU6n8xrwsmBwT32gFpefLaSsrGx9dxyq3O840WAwrBAzlpG3m\x2FbdCeB+IO38+fMlUVFRq+mBslgs68SM5Uv3PL+9JjwbSHM4HI3p6emv00OVnp7+usPhaATSgOfbC1ApXFJUV1d\x2F7O1z285UZWVla3V1tdvZ8CfB5q4AFwExkiSVd6ZXpampaeOcOXMivB2iXq8vlCSpHJePc9HdAAYDSwBKS0s71SWl0Wgm5OfnFxiNxplKpVLhzRBlLJYKRrcF+BIQLklSWUZGRqc7Q\x2Fv06ROcnJy8zGKxbF+7dm2stwLMyMg4IklSGa7l1pduB1ABZAvbL36QFQwNDR25atWqj06dOrVAp9P19dL+0M3kFTk3+TAmDdh\x2F6dKlqrCwsF93doWcTufxto5fuXLlXEFBQe7cuXNPeBvEixcvvisWqiaLYd6PWuBcgIaGhoqurGRQUFDMiy+++Pa5c+fWpKWlhXgTwIaGhnI5KzlAJa5Fb\x2FLy8oq9oK5+0dHRU4uLiz89cOBAmrcA3Lhx4z5RnILYIOAG+EugnyRJ5Z29btsRBQQEqFJTU3OtVuvmhQsXRnV1fT788MMmSZKMAl6qHOBTAGazudwbO3C1Wm3YsmXLrhMnTrygVqv7dGVdzGZzhZyZG+BEgH379pV561BCoVAEJSQkZJvN5h2bNm2K66p6yBhNdD+FI4AL169f\x2F09AQEDqg6rI7Z7C7fztDZPJ9MmMGTPe6YplhWvXrh309\x2FfvDwxQAAkANputprvMUf38\x2FProdLrM8vLyXTt37jQ86OvbbDb3otMYBRAPYLVaz3S3yX5gYGDUrFmzNlsslj9Onz5d9aCua7Vaa0VxlAKX\x2F58LFy40dFevSWRk5FMFBQWffv3111MDAgL8Ovt6MlY6BWIx2Ww2W7qz68nf3z9k\x2FPjxa5qamv6ak5MT08lPYjerRxRAFEBtba0VH1BYWNgTubm5n5w8eTJr4MCBAZ1xDRmrSAWgAjhz5swlfEQKheKhxx9\x2FfGFtbe3ftm3bNtLT55exUilw7SilsbHxB3xMSqVSt2DBgu1nz55dajAY+nnqvPX19e6dXEo\x2Fp3DH+Pn5PfEgb+5+xoH3OHZr2r9\x2F\x2F8apU6ce9mT9FbjiMNBqtX3xYd24cePa9evXb3i8uwD+CzBixAilL4K7efPmD6dOnXp39OjRz3nKy56YmOhmZf8\x2FwMGDB\x2FscQKvVenTx4sWzHnvssXdramo81sdrtdpAUWz1dwMcMGCAzwB0OByNJSUlb3bWus7QoUNDRVHyR2zhiomJ6e8L5lpTU\x2FPBs88++4EnW9ytevTRR9Wi+G8FcBZg0KBBUb3m2j4NHjx4oCia\x2FBE7MQcMGBDda67tk4xVnT9QDRAeHj6011zbJ7VaPUQUv1MAVQAhISFxvebaPoWGhg4TxeMKXLERdf7+\x2Fv3XrFnziLeb6+7du1\x2FRaDTZeXl533dFHV577bVHhDf6X0CTe03kK4Bp06YZvNVcPT0YvldNmTLFIGfmBlginsRJveZ6Z8kY\x2FWhnwkHgskql0nvLljNvMNdbNWfOnAiVSqXHFRV\x2FUA7wMrAPYMmSJVN6zbVtydjsE8x+tDdmB0B0dHRyr7m2LRmbHXJvjFsHAHNoaGhCSUlJak8311v1xRdfTBI7s+oFq58AvAm8Jdw1z\x2FR0c71VSUlJ00QxD1kmkFt3qL4PtKhUKkNRUdG4nmyuchUVFY0TeRdagPfk37UVJ7IUeEOSpHK1Wr2IXtHS0rJVhMMuAzbIv2trc\x2FdW4JxKpUo2Go0zezq8srKyGQLeOcGGuwFsBXIA4uPjMxMSEpQ9Fd6oUaOCRo8e7Y6VW04bKaV6Q73uIFmo1wFce8hpTwt0az5gi4yMnHzs2LGMngbv2LFjGQKeTbCgowDNiMgcg8GwZPny5dqeAi8nJyfGYDAsFv8uQnjt21J7Qv63Ay\x2Fb7faarKys3\x2Ft6zPDMmTNV+fn5m4ODg+OAfFwxw9wPwIeAUiBJkqSKpKSkbF+NWtfpdH0rKiryRIqoCuBJ7pKQp8NJJ5qbm4\x2FodDqfTDpRV1e3SaPReDzpBOJEk4FGjUYzzmQyvZmSkhLsK\x2FBSUlKCTSbTmwJeo7jX5vb8tiNRknW4YiMawsPDU\x2Fbu3ftWZmamprvDy8zM1Ozdu\x2Fet8PDwFKBB3GNde39\x2FL7mzosUYcfjly5drt23b9urSpUtruyO8DRs2DFm4cOGr\x2Ffr1GwKcwhX70aGtzveafEyFK6+KAaCqqipvzJgxH3cneMePH\x2F\x2FVmDFjXnHP2HCFunV4hHGvgc4SrkCTrQAJCQnZFoslV7ZryWuVkJCgtFgsuTJ4W8W93NPwzBMJGKeL8VKYw+FoFAkYC70RntFonBkfH58pEjBeFGO8+0rn4skUoO+454uSJFWUlpbu8hYn6WeffZby5JNPzr4lBeh8MdvCGwC69Tyu7BYxAC0tLWUVFRVdmoQ2KSkpXa1Wy5PQ5gCfeOoanZUG+Xe4kld4UxrkTcBmvDwNslwPiz6mzUTchw4d+sfq1avPeCIR97p164ZOmjTp53dIxP0eYiOpp+UNqeArbDZb\x2Fa2p4E0mk6OqqqrV\x2FeSMjY0NHDZsWFhcXJxGlgpeK+vX3PKZVPBtNhhcLyOYhCtL5Ag88zKCk7iyax7CB19GcDcnxWhgCD99HUY\x2FWWu9LP5axFzV\x2FTqMWlyvw2juqhv43wBp8vneRDcbNAAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="playIconOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAC1dJREFUeNrsnXtwVNUdxz\x2Fn7t7dvbubkLcQYoJJCKEFBIMJBKSCImrBKlXAilN8tFrFB2oUVJgiWBFEB3xUGaw4vh9VZ8IUKaMOWNIEwSpMFWKIEORhSEhMstnN3uze\x2FrFnmzUiJJDHTcJ3ZmfP7ubu3vPJ+Z17z+t7hOvlX9ONSgBGAUOAbPk8EIgHnIAb8AMNQK18rgT2ALvl83+Aqu7KgLWLf88JXARMAiYCIwBxkmNsQJx8hHVxRNoAdgKfAB8DHwGNXZUh0QUlUAEmA3OAaYAr8kPDo2\x2FD27zPqGvaF6xs3B883HDUONRQG6zy+oLltY0iQbMpyW5NGeCOEtF2p0jQYpUkZ5qItg9Csw4SLjW31e95gEJgHbAJCPZUgG7gZuAuYFAEsGKj2rst8HX1dv+7e3bjD5xeBm0WxXb1kGzL0PjRIl7LFS51TMSn+4BVwFoZ\x2Fj0CoAbMBe6XdRyGt\x2Flzo9pbom\x2F8trB5y4HKTq2TJpydpE45Z5qI1\x2FKEZj1Pvl0FrACeBrxmBjgLeBxIlaWtKFhW84Hvyc8+7o4K3nHP+ZOUzNgrhUvNl29VAA8Ab5oNYBrwPHCpBFcS3HPsLd+q7VswgRx35kxQsuNnCpeaJ9\x2FaCNwC7DcDwNnAs0A0evBQsKLuVe8jW9\x2FGhNIWjZuhpEZfh6oMBOqA24FXuwugQ4K7EcCobdrgW7X9sWB5bSMmlpIe43TcNXqBiLFfJt96CbgN8J3K91lsV2WdynFJwAbgCgz8gbKax70Pbn7OqPHpmFxGjU\x2FXPyz\x2FxDIssUqJc+QhxGh5b1oob4E6HeA5wGZghOFrLtU\x2FKL3Vv3ZnMT1MzVsOfE1TYJOSGTtKWJWRwHQJsba9N7nt0VDgX0CG4dGLm9Z8OVdfv7eCHip9Q3lF05ov5xoevRjIkHkb2lkAM4F\x2FAslGvX+zb1lxQWDHkWP0cAV2HDnmW1ZcYNT7NwPJMo+ZHQ0wUdZ5KUa9f4u34JOCYEWdl16iYEWd11vwSYFR798CpMi8JnYUQJusGzINj17iW1I03\x2FA2B+llMrzNQd+SovmGRy+RJbAQsHcEwOeAPMPXvNu\x2FbtfC4PceP71Uwe89fv+6XQsNX\x2FNuIE\x2Fepp0WwNnATRjoeuHeh5q3HT5GL1fztsPH9MK9D2GgAzdJBqcEMC38HwiU1azQ15ftp49IX1+2P1BWs0K+fFayaDfAF4Boo7Zpg29p0Xv0MfmWFr1n1DZtAKIli3YBnAVMQQ8e9K3a\x2Fhh9VL5V2x9DDx4EpgDXthWgU3ZJEayoe83sbdtOvaiU1zYGK+rCnQ3LJJuTApwLpBoevbgze1Wcz0xeYR2XkmR2iN5Htr4jWyqpks0JAbqBAoDg7upO7ZISUbaJ9ptHvK0tGncNNoti6pLYwuJ+yehnAd4AJBgevci3ekfnd4Yqwq1kxDzgXH3xWtv0rAzT1oWrd2wxPHoRoeHWG34OoALMk7Ff2JUnKDTrCPWKwa9qj\x2F3qT8pZLptJ68Mwk3siuUUCnAycY3ibP\x2Fc9sW1Tl5+hQFWS3TdpSy940\x2F6Hc3NMVwqf2LbJ8DZ\x2FTmiE8ZLjAZwDYFR7S7r1TG2WVOv4lOedT01aZBmeGG2q9nK1tziSVSRAJ6FBb\x2FSN3xaa4FyFiNOucMw7\x2F11HQd4U07RQ\x2FlG+XianIicIhAFeArgMj17c2eO27ZJFxFmGJTzqfHbyavWitORubydv\x2Fa7S8Oj\x2FlvAmRwIMDUcebTRl17xw2\x2FJt1\x2F\x2FyLW3x+OuE22bp1jA+2lgSySwMcBJA4IvKItPejAmhKYP6zdNWTlxnmzU0u7tOI4LRpDDAJGAwAaPG\x2F35pudlbBsJhHapemv6ytvzCu5XUaK2rf9\x2F\x2Ffmk5AaMGGAwkKcB5ALITsWdIYFHOcs3WFo17y37bqPwuD2Nf89cymaMAIwGMev+eHtfaV5Vka17yaueqi5dacvrHdRnAen+pTJ6rIEegjB+aDvTUXhMRY7\x2FUcft57zoWjLkCixCdDrCFVaZCaKAco8p7iJ4si4i2ZMcvcj4z+a\x2Fq1IzUTgXYwipdITQWSvBIQxW9QMKpjrZdPeQN7dEJN4pYh9op7eIWVgMU5Nxj44jnB3qLhLArKVG3OZdf+Irt98NGdHgJbGEVpxCaUYpR42uit8lmyVQnpa11rpx0v2VwrKvDSmCVNzyTy6kAUQCBb2o89E4pIkGb4Vgw9h3H3aMndgjAlmEOt0JoHQYiQbPRmxU0dIJGoKO\x2F1grUA\x2FFKSpQzUOXtfbMODKMpeMjzctPTO14OHm7okGpKSY8JDy41tABMdDoD7ZwbZ3p29f5P9cKylfrGb7\x2Fr0DohQXPIZGMYICLa7uw15PTgwcDOypWdNa4j+rv6yeQxK3AUQMRrsWfCtY0lsL8rXiaPWIFv5UUk+Uy4trEEJjgHyuReK1AGIPrZzz4Trm0E2MKqzAp8ASCibEPOhGsbAbrV8Mz8nVbgcwDhsGafCdc2AtTU8ET07VZCC5jLsIhM9crB6foH35SfCdcTtA6vykrHImKBb4DK8ILrj4FM66iz8k0JsBvDtbUsI5PyI5j9f8X6BuCPItGZx2muHett4fqT8A0xAvgwEuAmwCNc6ljruJSk5q3fVZ4J1+O0e8elJAmXOpbQkrBN0DKs6QHWA6iXp0\x2Ft9nA92LDGu\x2FDTGWaC14rNesnsR6YT64CZIl4bA\x2FztTLgeJ3xDbMKsiCyBEFritE9o1vMc9+VO7vJw3XHknsa5m+aZFZ7j3tyLpIXAfsmK1iUwCDwJrFbSY6aFY7yvXF1P2v7NiPmNTD5FhBNI6xmqLwHVwqXmO+7MmdDZ4ep\x2F4+uZ3gc3rzE7PMedOROk70I18OKPwLb62wZgOYCSHT+jM0\x2FKzOH6k9LXwmI5rexTjje5+xmgQrjUMdqicdfQx6UtzL9aetFUSDacDGAjMB9ASY2erQzq5+yr8JTUaE1J6xdeK7eA41hK\x2FdzygjeAjajKQMe88xf0VYCOe3MfRFVS5FX39eNCPsHxtwJ1IsZ+mePh\x2FOl9Dt7D+dOls0edZEF7Ae5DrsyxZMYWqFMz0\x2FoKPHVqRqolM\x2FY++XIuste+vQABXgFeRKCq0zIeteYOiOvt8Ky5A+LUaZl\x2FQWCTLbJXTlhPtuE7bwdKhMOabZszfIlZF8J0yEXjLJfNNmf4Etm5XCLzzukCbCK0BKJMuNQ8x8L8ZUKzKr0NntCsimNh\x2FjLpr1Um8+zrCIAQGvq8DDgoomwTtBUTV1qGxLl7CzzLkDi3tmLiShFlmwAclHk92qZj2+FcdAxp9yTsluGWnP4jjBpfcfBAfY9eT2zNH5hov2XkcuG2jQEOEFozU9pm+O20fqoC3gWmCNUywjo8MVc41V2B\x2F1ZV90R4tplDs2zTsx4XmnUY8BWhpQt721VvnsLvHgAuAIqwW7LUy9Nf1xaPv67HNdEWj\x2F+denn669gtWUCRzFO754mfqnubF3gNiAFyRYxjrDoxLS1QeqzY7A5uyqB+Tm3xBX9W+ruuj2j7X8cpeqx2hAHjVfJ+KQY9eFAaML5jylK3aNw1Smr0bGnAWEvIF+a0HEk60gL0BULuFiEL0N3Vb5llTMN+R84FlqHxs1pZgN4qW1uYAWBY1xJytwiZ0Db4i4J7a7vXhDYj5krhtkWa0M6XnSUdc\x2F\x2FYSTbIdxAyrzCTDfITwGpMboMcqShZxxzfiPurqs\x2F8fy\x2Fd0yFG3L\x2FNGmL5RcL5JzDifhE5kbTDWzAmsIIvwdu8\x2FydW8JWNvuC+HxrDV04lyekQye4YZYA7McIKPi2iXgur11jBH0\x2FhzQguIrQZwXBOvhnByWQAuwhtRvARXbwZQVfv5tAoS0fYlyGR0HYYWfx0OwxXRGn1yEe1bKuGt8MoJbQdxlG6Sf8bALMnhlfsjGO6AAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\x3C\x2Felements\x3E\n\t\t\x3C\x2Fcomponent\x3E\n\n\t\t\x3Ccomponent name="dock"\x3E\n\t\t\t\x3Csettings\x3E\n\t\t\t\t\x3Csetting name="iconalpha" value="0.75"\x2F\x3E\n\t\t\t\t\x3Csetting name="iconalphaactive" value="0.5"\x2F\x3E\n\t\t\t\t\x3Csetting name="iconalphaover" value="1"\x2F\x3E\n\t\t\t\t\x3Csetting name="margin" value="8"\x2F\x3E\n\t\t\t\x3C\x2Fsettings\x3E\n\t\t\t\x3Celements\x3E\n\t\t\t\t\x3Celement name="button" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABiSURBVHja7M6xEYJQAECxAB01s1g4HIXnUGxj7+EOds7A914myIQ7dmyu7cRjwjFA9peeB8rCNhtM4cKFCxcuXLhw4cKFCxcuXLhw4X8OnwN9PwteuGG9ePaN5xcAAP\x2F\x2FAwAeWAjACQPviAAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="buttonOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABfSURBVHja7M5BFYAgEEDBz7YgkjnwQCnjKbTAGxlc358EU1bnAC6g8m0DaGV1ngTZnY5EWYAaJGPYsGHDhg0bNmzYsGHDhg0bNmz4z+GR6DsDOIGZIHsD7QUAAP\x2F\x2FAwBQbAvRiX9i6QAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="buttonActive" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABiSURBVHja7M5BFYAgFADBhQKciWQOrGUbqihcacDNDH7fToJJq5cDuIDKtw2gpdXLEyD7pnOgLEDNBGPYsGHDhg0bNmzYsGHDhg0bNmz4z+ER6DszcAIzQPYG2gYAAP\x2F\x2FAwAioQyLbEMKjwAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="divider" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVR42mP4\x2F\x2F8\x2FAzJmIF0AAHImL9Fd8LZHAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\x3C\x2Felements\x3E\n\t\t\x3C\x2Fcomponent\x3E\n\n\t\t\x3Ccomponent name="playlist"\x3E\n\t\t\t\x3Csettings\x3E\n\t\t\t\t\x3Csetting name="activecolor" value="0ba14b"\x2F\x3E\n\t\t\t\t\x3Csetting name="backgroundcolor" value="282828"\x2F\x3E\n\t\t\t\t\x3Csetting name="fontcolor" value="d6dbdf"\x2F\x3E\n\t\t\t\t\x3Csetting name="fontsize" value="11"\x2F\x3E\n\t\t\t\t\x3Csetting name="fontweight" value="normal"\x2F\x3E\n\t\t\t\t\x3Csetting name="overcolor" value="90ffbf"\x2F\x3E\n\t\t\t\t\x3Csetting name="titlecolor" value="d6dbdf"\x2F\x3E\n\t\t\t\t\x3Csetting name="titleactivecolor" value="0ba14b"\x2F\x3E\n\t\t\t\t\x3Csetting name="titleovercolor" value="90ffbf"\x2F\x3E\n\t\t\t\t\x3Csetting name="titlesize" value="13"\x2F\x3E\n\t\t\t\t\x3Csetting name="titleweight" value="normal"\x2F\x3E\n\t\t\t\x3C\x2Fsettings\x3E\n\t\t\t\x3Celements\x3E\n\t\t\t\t\x3Celement name="divider" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAAABCAIAAAAkUWeUAAAAD0lEQVR42mOSGwWjgO4AAAmASdeh6\x2F43AAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="item" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQAQMAAAC032DuAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAABFJREFUGBljYBgFo2AU0AsAAANwAAFvnYTuAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="itemActive" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABQCAIAAADTD63nAAAAm0lEQVR42u3SMQ0AAAgDMDIh+JeJih0krYZmoSADBWIhFmIhFoiFWIgFYiEWYoFYiIVYIBZiIRaIhViIBWIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWIgFYiEWYoFYiIVYIBZiIRaIhViIBWIhFmKBWIiFWCAWYiEWiIVYiAViIRZigViIhVggFmIhFoiFWHx0NVZG8QaBAzEAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="itemImage" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAAAAACpLjUBAAAAeklEQVR42mPiJQswMXCSARiYGFjIAEBtZAEmRnJ0MZJrG321jfpt1G+DzW8jMUj2lzMwlO8n2W87PMrLPXaQ7LfOHR4eOzpJ99vLe\x2Fdeku63eItDhyziSfab5fGFC49bkuy3jIUMDAszRtPkaDYd9duo34aT3\x2F6TARgA1wJNszqw3XsAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="sliderCapBottom" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAKCAYAAACqnE5VAAAAEklEQVQ4EWNgGAWjYBSMAnQAAAQaAAFh133DAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="sliderCapTop" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAKCAYAAACqnE5VAAAAEklEQVQ4EWNgGAWjYBSMAnQAAAQaAAFh133DAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="sliderRail" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAABCAYAAADAW76WAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAhSURBVHjaYvz\x2F\x2Fz8DIXD9zgO8ijRVFBgJmQEAAAD\x2F\x2FwMAMPsG\x2F3JXtWIAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="sliderRailCapBottom" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABESURBVHjaYvz\x2F\x2Fz8DIXD9zgO8ijRVFBgJmcHEQBx4QKYcyRYVkClHmkWaKgobGRgYAtBc\x2F4CBgSEAKkcQAAAAAP\x2F\x2FAwAQeg5BhxhpgQAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="sliderRailCapTop" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABKSURBVHjaYvz\x2F\x2Fz8DMeD6nQf+DAwMExgYGBSgQg8YGBgKNFUUNhKjn5EYi6CWbMAhHUCMZUwMxIEJZMqRbJECmXJwAAAAAP\x2F\x2FAwAj8RJhMGf2BgAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="sliderThumb" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAABCAYAAADAW76WAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAB9JREFUeNpi\x2FP\x2F\x2FPwNBkMmIX9H0\x2F4yEjAAAAAD\x2F\x2FwMAx8wF\x2F++ErzEAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="sliderThumbCapBottom" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAEFJREFUeNpi\x2FP\x2F\x2FPwNBkMmIX9H0\x2F4yEjGBiIA48IFOOZIsKyJQj0aLp\x2FzcyMDAEoLn+AQMDQwBUjiAAAAAA\x2F\x2F8DAOUmD5OKmaX8AAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="sliderThumbCapTop" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAECAYAAACQli8lAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAEpJREFUeNpi\x2FP\x2F\x2FPwNRIJPRn4GBYQIDA4MCVOQBAwNDAcP0\x2FxuJ0c5IlEUQSzbgkA0gxjIm4rzDMIFMOZItUiBTDg4AAAAA\x2F\x2F8DAFHMEGHsuM7dAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\x3C\x2Felements\x3E\n\t\t\x3C\x2Fcomponent\x3E\n\n\t\t\x3Ccomponent name="tooltip"\x3E\n\t\t\t\x3Csettings\x3E\n\t\t\t\t\x3Csetting name="fontcase" value="normal"\x2F\x3E\n\t\t\t\t\x3Csetting name="fontcolor" value="ffffff"\x2F\x3E\n\t\t\t\t\x3Csetting name="fontsize" value="12"\x2F\x3E\n\t\t\t\t\x3Csetting name="fontweight" value="normal"\x2F\x3E\n\t\t\t\t\x3Csetting name="activecolor" value="0ba14b"\x2F\x3E\n\t\t\t\t\x3Csetting name="overcolor" value="90ffbf"\x2F\x3E\n\t\t\t\x3C\x2Fsettings\x3E\n\n\t\t\t\x3Celements\x3E\n\t\t\t\t\x3Celement name="arrow" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAADZJREFUeNpiZGBgcIBifOAAMwMDwwMoRwGXIphCBjyKD0AxAzOSILpiuCJcAKubAQAAAP\x2F\x2FAwDVWglLzxK7FQAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="background" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAABtJREFUeNpiZGBgaGBAAkwMaICwAAAAAP\x2F\x2FAwAhVACIR9YHmQAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="capTop" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAABtJREFUeNpiZGBgaGBAAkwMaICwAAAAAP\x2F\x2FAwAhVACIR9YHmQAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="capBottom" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAABtJREFUeNpiZGBgaGBAAkwMaICwAAAAAP\x2F\x2FAwAhVACIR9YHmQAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="capLeft" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAABtJREFUeNpiZGBgaGBAAkwMaICwAAAAAP\x2F\x2FAwAhVACIR9YHmQAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="capRight" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAABtJREFUeNpiZGBgaGBAAkwMaICwAAAAAP\x2F\x2FAwAhVACIR9YHmQAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="capTopLeft" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAACpJREFUeNpMyLEBABAMALAoS59hdAH\x2Fn2QxNGMaOi4mcuBg+wJLEcgabwA6pQE+P4ockAAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="capTopRight" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAClJREFUeNpiZmBgaGBgYDBnYGDgY2BguM\x2FCAAGcUMHfTAyowBhdgBMwAI9WAyeYeHlrAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="capBottomLeft" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAACpJREFUeNpMyDEOABAABLAiEovJ6rF+6hlW63VswREqXkbDxM64GFjofwBfPQKpZjBWIgAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="capBottomRight" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAClJREFUeNpiZGBgaGBAAkwMqOA7usA5FpgMAwPDJQYGhn0AAAAA\x2F\x2F8DAF8+BNYjb05IAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="menuTopRepeatAll" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAcRJREFUeNrsWdFtwjAQfam6gDuCO0JWCCOwghkhK9ARYIQwAoyQjkBHCCNcP3ioJ8uGQpIC6T3JIrHPz\x2FFd\x2FM4mhYjAcD+8mAssABYAgwXAAjARtACaZ3rg1wk5vwLgAcxsBVxGAyDQad1AnAGAA1AOwLUFIPwdFyIyRqnkCJ9pL+UH4Qb+Jup3Gm8pIvszdtcUibhGKfeSoE8ARY\x2F+JYCdut8pvjVXwiFhdw2KqUpQyWQpLC2126tlf2oLGXnwAFYA6gRfwwDEdinJ6tQzONYvFVfuGZ5agraUBrC9o3R49mlFxFE6chx7JS05vthOF6fs9PWc115JWDc1CdK7lC\x2FKkVN1H5SPNd\x2FcOetu5cvtmBzHOAB4U22bSNrmU9uGOi5zcHInR+j8oB3aly\x2FXJ8dfU7rKgXZUD5cDWjWxWeRwRJP2A\x2FClcMjwB5UvNgAWUwyAV5OrEm9ZUL8+koTUW3yJLyVHOwYhRCdoz\x2FoFbepnPwfECCJSq\x2FuWia6NkrAw+eX28Eva1Gf4YruYI3AMUeN7Jm5RiVl4bhnFV8UDfZDxAPYA3n+p\x2FfZnXE+s\x2FuSo\x2F+Ao7JPk\x2F10BBguABcACYC64L74HANCR7ov8E3+jAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="menuTopRepeatOne" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAaZJREFUeNrsWdFtg0AMfVRdgIxwGYGOkI5AR4ARyAjJCGGEZoRkBBghjEBGcD76TrVOEKWi4aLETzqBMNiH3\x2Fn5BImIwBAPb5YCI8AIMBgBRoDBCDACIuAbQAFgBaCPOI8Dx\x2FwQkXuOlfzAjdgz+UUxIU4lIqcRm6P\x2F1ZXnnYj0nI+\x2FthORw53zg\x2FfIFdACSCb6qABsAHQTfHQAFsG18tklKAPQABCOBoDjEEqCtxUjPna0HW+I51S8IpBBH6dXtt0cshSTAL9qEwBLJkgnJuWqLJkMN+Bjz2dvISAH8BH4q9h\x2FlpxHd4XspyPgE8CXkoCWSffYAjgDqGnPB3wc\x2FxBvzWPNWDljLJR87YM53B0xe0DKKvCrM2VydH\x2FQGj0V55HzitWQcXSvUgENX9hXQzvQI7R+\x2Fwfh4XmlJKdWVfISBDiWfEkdzgJ7oY7+3qk9x\x2FvL6M+v+JILoHhWCToNbPHWTMqGL78PSEi5Mznz\x2FqnSUKudlve3VbutTvWG2UhIHvCHjCNhy7n1+FW\x2FBc2y335UJPZL0irACDAYAUaAIQ4uAAAA\x2F\x2F8DAKpug4kmL2\x2FaAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="menuTopRepeat" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAbBJREFUeNrsWdGNgzAMfZxuAToCNwI3Ah2BjkBHoCOUEcIIZYQyQhkBRiAjcD8PyULRNdxJLQq2FClOgiP8\x2FGyXRtM0QeV98qEuUAAUABUFQAFQUQAUgMClBGAAxABGAOkeASgBTGIYsWcA3P9gM6Gt7Ml6zfkIoAHQbQGAzxfedWPUHQG0nN\x2Fo+PM\x2F7A4AIo9zFsDXXlNQCiCno1uudQAuTAkyantGbk8djNxeMKfk6H9hgJSYYM\x2FPj+J8T+a5WBkMABkjsF2sNwBOCwDOAA7UC67dmUIi7l8Z+dbz\x2FoJBcKCNgTZkgHxz5DwfXA3wcVZHkKxIUzn1SuTyjhF98by7YvqxAnjJvNlmx70stBpgFy+8FiTr0GuClKxoABKCmpIFso7IeRYaA1oCkDlS0+TREsYOfVhxvxFppRZskqlPzm1oAAx8cSNASKk\x2FawnndFEu8nmzslXtWD8GR47PBTtyR60KogbMHdDccTyonzzAO4rfEFfhSF+pBNsMgyERzLLshh7cq1\x2FllEj\x2FkEFPgOp3XL63b0EFWbAZUQbs7FuQigKgAKgoANuRHwAAAP\x2F\x2FAwCQdHmHTJdvvwAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="menuTopRepeatNon" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAeBJREFUeNrsWdFtgzAQfVRdgI7gjEBHcEZghTACGQFGSEeAEcgIdIRkhGaE68+z5FpWsKq6JOiehAjHne+4d2dsUogIFOvhRVOgBCgBCiVACVAoAUrAg+ECQACYjD4GAAcAFsDXlgiwkeQ52YkPfW8D0vJ8pv5fIfTbc\x2FwJwHENAl7\x2FyY\x2F1HrJnIu6h55EbnwCKrU9BVZB8HzMrUkgSAJTUd\x2FKBcuN1kLvXBl3j5NNCh7m4fP8zfZhgDEkomIcl4F7yAWBkBY4AOso6kvAG4J3E+Ik2tDl6upa\x2F97QrE2LrAFw51o7j+ol2MTQkPc+7SERyHFZ+YgjuHygvg2vwXHu6nYjMImJ4z1LuX58CH7U3XsxvLOaJ45hIDBcRaXPkKncHfLCK66CKHW7BtYnIbwkVbSI2SyhZ2SeugGzk\x2FeBwfdYpqOeDuOmiWtC\x2FesnxE3VLsAttljB78eyDhCOI1TwrAT4RI98HJqFrWiax4rw8LtiM7DJLuzYhJkO7hnZVZMnqziYhhoffiDWs5GFB70i9L1bpOWFJeqbd5G2obgl+Oq5yaia4CrpIqNPkmoaKjf4hMzCB+1\x2FYGu7Cdznn\x2Fq19C3KfEsTbgTeJtm4nvAoK\x2FUtSP8YpAQolQAlQrIPvAQCGc6emkxeMFgAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="menuTopShuffleInactive" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAdtJREFUeNrsWNFtgzAUvFRdIBnBGYGOQEdIRyAjkBGSEWCEZAQYIR0BRigj0J+zdLJMShraJOg9yXJi4Nl+57v3YNH3PczuZy8WAgPAADAzAAyAmdkSQAOgePSFLmZcBSUAKgBrAJ0xYDhIPYDNH\x2FhOyYR8rhLkGLywHXk94\x2F9LtgFQAjjJ2JHPDsmKGylBOYAD++QXB6P5DwBeJ\x2FCxBtAGtM9GPrsb2Hw9EFQ30m8HYHVhjjEAPKUEfbItZews7EiFPTp+FvAck2coHY30WcRfL7JzFN9fcl\x2FBufzcMUalvM\x2F7zAI25JLgq0cDIGUgNemdACzY72UT4Piam90AeCebtpSPkGm+ry+sIeMaVvTfyrz+dO+EISFba87f8vkhO0yR3KcAoJHTVlHTS7leysY8tbcA3vi7jbDmFjsElc8p8F2zdcGari1zi8ghuXsOGNLjmO25kZQMKCdkYk6fCVs7MdM7svVpy9BKdPnjB0kZeyIhOp8J+3Z4YLsXAE60NpHkGQtoLNid5JxQx53kkfaG94ClnHZlUz4HAHx97quMWqoRn6zDjfpc4SumrfgIffsXvIIscFfmGM\x2FInuuppXr6tE8RMzL7Gnr9m39qDDAGmBkABoCZATAD+x4As3qG3UKCHiUAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="menuTopShuffleActive" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAktJREFUeNrsWe1xozAQfWSuAaUEuQSnBKeEpARcAi7BLgFKsEuAEnAJuARUwubP09yORuDDgfOQaGd2DMJard7bD2FnIoIkz5OXBEEiIBGQJBGQCFiptAB6ADv1uSr5s2Lwt9R3ACUAB+CaMuAvOALgY0HfrwS\x2FBnADsCEJ\x2F1tK7jV\x2FaLaIhGolLmc+z3mPET2KSBmMnTkXM2pLu\x2F3MtksRqQeedSJS8HqrsOlFxExda6wEbRhZPqLrCSwfBrKimTn63p4Q8ZsgCzNeG6pbogRdqSZogEL1zc8G460izzJdi8B2zgZ6jtgD5\x2FrxmgoARzUuym7Oewzc\x2F+u6FkDH8Y734HUR8aFW4JfcexuZ\x2FxABOwKp2b2Q\x2FQsdgXIsY6RY9oF3ZtMewCli36hoCu1Z2nqjD96fgmPhnCkytK4nYA\x2FgVRGmpeCY98GRTJ3xh5H5dwnoAnYrqhd\x2F3Shg9qos3CJZMyaniL2c63hbes1MnXoaBehUia3rs74hsOEzMLAq5cOBgWGUvbH5d4+hugfEZKjWHenEjlFUfaPe2mAdF5SQLb+z+wYBU\x2Fens6eIlFT7zGNorcD4nKHp3gJQjQL\x2FqCJtfweoJcQxe7JAr88kwCpAtkFKPgJGRbAt7eXKjmPaX4L66lSJMAu+i1xUFvrG20\x2Fd49wEnJiS\x2FsWkUSnpm1wx0d6N\x2Fci\x2FcDnactxwp6LO8FnFhtgv+HZ84v5adYL6nHoMzVb0h4zhZquBk1T6MW4BKdRJzEfzjwF\x2FbRnwIyX9H5AISAQkSQT8XvkaADOI3MDMk27PAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="menuTopHD" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAf1JREFUeNrsWdtxgzAQXDxpQC6BlEBKMCU4JZAScAmmBKsEuwQoIZSASjAlkJ9V5sLIRnH8IJ67GcbmZJ3E7u1JwskwDFB7nC0UAiVACVBTApSAG9sWQAfAKOQ\x2FLbnDLsgQ\x2FHcAjUJ+fwUUJCFTuC8jwADYAxh4HQGUbEvpW53pWwKoWIZS+jOqImSdiP\x2F09hIB\x2FieAHsArAMeM3tE3VVJ6AEt+3wgVqBoiFeDLR07wAcAyo81okfUKKc8ox1AtO6Gec2MPgfsSQE1fKeJ3jF3TX3BMOQep1Fr4axFzVgRkzPJ+5N+QBJnpCf1bAl2w\x2F5Jtjm0NgA\x2FeJxfM2fJzzXg54zQE+zBScMv2A3\x2FviUup6rdHKnIRUYL6X4ByEMRVfMBetF1jG7on0WvGbERS+DVHkuATpRFAF5yzI0F2rmuAiwTtFEk+0zJe7gpzzkVyuMAcqohx0tGc+7kqoGXdNAFgjxN9d8w0uW789TwxJt0E2tuIWO5E39kRYPmgtdhCFqylVUSWtaLeFxOAhsgHEyAN9LcsQyuxEXCRBFjG8+os5nwOyElCxx3DNrAIh6wiOAPVYPnARtTtYYIAS\x2FK7QFlpOA+\x2Fm8l42o4xX6Y69nePKkOJ\x2FiHzfda5Rpmc5auIW9vUafzU5kCeT9pHgK8K+CfvgtSUACVATQl4TvsaAPupl+ACgIBVAAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="menuTopCC" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAYCAYAAAAF6fiUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAblJREFUeNrsWdGNwjAMfT3dAr0RygjcCGWEMkI7QjvCMUIyAh0BRoAR6AgwQvh5kayIQmirgyI\x2FKYIEbIyf\x2FWJB4pyD4nX40hQoAUqAQglQAhRKgBIwAEsAZwDlhDHV9JlO7C+bIwE5AHcn+COATQ8BJ3752HOPDYAu8FkyjhB95xIFgIY+PbYTF81gfE\x2FgY8MVYjHC52+wt1xT+PKdu\x2F8ECdqyAh2AAzvFsboeVfqO7zWBXDix\x2FiIr\x2FSBsctG9J3G+o6ztGKd5EN\x2FbE1CzkhYAfnhmhITcQwmgYnUW3C+Z8DWAhH7qyLugpU0rSDPifE1CcgArxlf1dO5sJKikLHRCirZ83jywlXaWibFMlsf+CQKssDE3JLDlY4o3wxgCMgAXsffPqwjb0C4VslFwXzwRy6UnvloUy8eNoV1QUSkT0UXY3rLLqc9+ulqNiC0VdxKEROKTOsCyslomsBatHiNfLRNVUrKW9NOIS3qobKRclp9jeoifTQecgumkpOYf+do5SF4MeYZVasXq6OssxsRsYHdaMaVlQcf6y\x2FrlU1Cif8job0FKgEIJUAIUSoASoPh\x2FXAEAAP\x2F\x2FAwBmjXhoPYQNMgAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="menuOption" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAChJREFUeNpi\x2FP\x2F\x2FPwM1ARMDlcGogaMGjho4auCogUPFQAAAAAD\x2F\x2FwMAaQsDJYnTLeIAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="menuOptionOver" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAChJREFUeNpi\x2FP\x2F\x2FPwM1ARMDlcGogaMGjho4auCogUPFQAAAAAD\x2F\x2FwMAaQsDJYnTLeIAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="menuOptionActive" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAE9JREFUeNrs06ERACAMBMEDndJSC4oWcChKSIsMOrSAiGJyBey8+eLuRFYJLsEEATEdYrrFdEQt7IAALQqcwAHWC1jyegn+CF4AAAD\x2F\x2FwMAJcEODWFdO9MAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="volumeCapTop" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAB5JREFUeNpi\x2FP\x2F\x2FPwM1ARMDlcGogZQDAAAAAP\x2F\x2FAwCz6QMJ1cE\x2FIQAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="volumeCapBottom" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAB5JREFUeNpi\x2FP\x2F\x2FPwM1ARMDlcGogZQDAAAAAP\x2F\x2FAwCz6QMJ1cE\x2FIQAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\t\x3Celement name="volumeRail" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAABQCAYAAAAZQFV3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABbSURBVHja7NkxEYBQEEPBwNCBKByhBUeIgvqQ8K+gYvbVmTWQqaoy6sx1J8mRfRttl\x2FRam7vM+TggEAgEAoFAIBAIBAKBQCAQCAQCgf8Gu2\x2FF0wVfAAAA\x2F\x2F8DAIsIB6GC0lE1AAAAAElFTkSuQmCC"\x2F\x3E\n\t\t\t\t\x3Celement name="volumeProgress" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAABQCAYAAAAZQFV3AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABOSURBVHja7MwxEcAgFAXBBzXSogFxaIi09B8JNJmh2atvtlVVTo31VJJ8822nt+fngEAgEAgEAoFAIBAIBAKBQCAQCAQC74IbAAD\x2F\x2FwMAQPYHnVZtUEoAAAAASUVORK5CYII="\x2F\x3E\n\t\t\t\t\x3Celement name="volumeThumb" src="data:image\x2Fpng;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN\x2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz\x2FSMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH\x2Fw\x2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA\x2Fg88wAAKCRFRHgg\x2FP9eM4Ors7ONo62Dl8t6r8G\x2FyJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt\x2FqIl7gRoXgugdfeLZrIPQLUAoOnaV\x2FNw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl\x2FAV\x2F1s+X48\x2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H\x2FLcL\x2F\x2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93\x2F+8\x2F\x2FUegJQCAZkmScQAAXkQkLlTKsz\x2FHCAAARKCBKrBBG\x2FTBGCzABhzBBdzBC\x2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD\x2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q\x2FpH5Z\x2FYkGWcNMw09DpFGgsV\x2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY\x2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4\x2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L\x2F1U\x2FW36p\x2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N\x2FT0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26\x2FuNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE\x2FC5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV\x2FMN8C3yLfLT8Nvnl+F30N\x2FI\x2F9k\x2F3r\x2F0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt\x2F87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi\x2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a\x2FzYnKOZarnivN7cyzytuQN5zvn\x2F\x2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO\x2FPLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3\x2FT7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA\x2F0HIw6217nU1R3SPVRSj9Yr60cOxx++\x2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3\x2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX\x2Fi+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8\x2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb\x2F1tWeOT3dvfN6b\x2FfF9\x2FXfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR\x2FcGhYPP\x2FpH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF\x2F6i\x2FsuuFxYvfvjV69fO0ZjRoZfyl5O\x2FbXyl\x2FerA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o\x2F2j5sfVT0Kf7kxmTk\x2F8EA5jz\x2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5\x2FwAAgOkAAHUwAADqYAAAOpgAABdvkl\x2FFRgAAAHhJREFUeNrkkzEKgDAQBDd+QN8gFvp2wcJS36TRxnZsrtMLKMHGgYOQZa\x2FIkAAoJ4Uy8\x2FnCTtIo6bAZ7c4H8KYFIleiZbe91MIBn8HrhYTlTVLpZLukKqcU3kiZE9n0RkoNrDfvt1j2WIqABujNbLRzk+qE\x2F329cwD7RRdVdNEIHAAAAABJRU5ErkJggg=="\x2F\x3E\n\t\t\t\x3C\x2Felements\x3E\n\t\t\x3C\x2Fcomponent\x3E\n\n\t\x3C\x2Fcomponents\x3E\n\n\x3C\x2Fskin\x3E';
    var a;
    b.html5.defaultskin = function() {
        a = a || b.utils.parseXML(c);
        return a
    }
})(jwplayer);
(function(b) {
    var c = b.html5,
        g = b.utils,
        h = b.events,
        i = h.state,
        e = g.css,
        f = g.isMobile(),
        a = ".jwdisplay",
        d = ".jwpreview";
    var j = {
        showicons: true,
        bufferrotation: 45,
        bufferinterval: 100,
        fontcolor: "#ccc",
        overcolor: "#fff",
        fontsize: 15,
        fontweight: ""
    };
    c.display = function(m, P) {
        var A = m.skin,
            Z, ac, G, u, K, F, o, C, V, k = false,
            ad = {},
            T = false,
            Y = false,
            l, M, H, R, I, aa = g.extend({}, j, A.getComponentSettings("display"), P),
            Q = new h.eventdispatcher(),
            p, X;
        g.extend(this, Q);

        function W() {
            Z = document.createElement("div");
            Z.id = m.id + "_display";
            Z.className = "jwdisplay";
            ac = document.createElement("div");
            ac.className = "jwpreview jw" + m.jwGetStretching();
            Z.appendChild(ac);
            var af = m._model.config.playlist[0];
            var ah = af.sources[0];
            var ae = ah.file;
            var ag = ae.indexOf(".mp3") > 0;
            if (ag) {
                G = document.createElement("div");
                G.className = "jwpreviewmask";
                Z.appendChild(G);
                u = document.createElement("div");
                u.className = "jwpreviewtitle";
                Z.appendChild(u)
            }
            m.jwAddEventListener(h.JWPLAYER_PLAYER_STATE, r);
            m.jwAddEventListener(h.JWPLAYER_PLAYLIST_ITEM, s);
            m.jwAddEventListener(h.JWPLAYER_PLAYLIST_COMPLETE, S);
            m.jwAddEventListener(h.JWPLAYER_MEDIA_ERROR, q);
            m.jwAddEventListener(h.JWPLAYER_ERROR, q);
            m.jwAddEventListener(h.JWPLAYER_PROVIDER_CLICK, ab);
            if (!f) {
                Z.addEventListener("click", ab, false)
            } else {
                K = new g.touch(Z);
                K.addEventListener(g.touchEvents.TAP, ab)
            }
            U();
            r({
                newstate: i.IDLE
            })
        }

        function ab(af) {
            if (p && (m.jwGetControls() || m.jwGetState() === i.PLAYING)) {
                p(af);
                return
            }
            if (!f || !m.jwGetControls()) {
                Q.sendEvent(h.JWPLAYER_DISPLAY_CLICK)
            }
            if (!m.jwGetControls()) {
                return
            }
            var ag = E();
            if (X && ag - X < 500) {
                if (!m._model.getVideo().isAudioFile()) {
                    m.jwSetFullscreen()
                }
                X = undefined
            } else {
                X = E()
            }
            var ae = g.bounds(Z.parentNode.querySelector(".jwcontrolbar")),
                aj = g.bounds(Z),
                ai = {
                    left: ae.left - 10 - aj.left,
                    right: ae.left + 30 - aj.left,
                    top: aj.bottom - 40,
                    bottom: aj.bottom
                },
                ah = {
                    left: ae.right - 30 - aj.left,
                    right: ae.right + 10 - aj.left,
                    top: ai.top,
                    bottom: ai.bottom
                };
            if (f) {
                if (J(ai, af.x, af.y)) {} else {
                    if (J(ah, af.x, af.y)) {
                        m.jwSetFullscreen();
                        return
                    } else {
                        Q.sendEvent(h.JWPLAYER_DISPLAY_CLICK);
                        if (l) {
                            return
                        }
                    }
                }
            }
            switch (m.jwGetState()) {
                case i.PLAYING:
                case i.BUFFERING:
                    m.jwPause();
                    break;
                default:
                    m.jwPlay();
                    break
            }
        }

        function J(af, ae, ag) {
            return (ae >= af.left && ae <= af.right && ag >= af.top && ag <= af.bottom)
        }

        function E() {
            return new Date().getTime()
        }
        this.clickHandler = ab;

        function U() {
            var ae = {
                    font: aa.fontweight + " " + aa.fontsize + "px/" + (parseInt(aa.fontsize, 10) + 3) + "px Arial, Helvetica, sans-serif",
                    color: aa.fontcolor
                },
                af = {
                    color: aa.overcolor
                };
            H = new c.displayicon(Z.id + "_button", m, ae, af);
            Z.appendChild(H.element())
        }

        function v(ae, af) {
            if (!aa.showicons) {
                return
            }
            if (ae || af) {
                H.setRotation(ae === "buffer" ? parseInt(aa.bufferrotation, 10) : 0, parseInt(aa.bufferinterval, 10));
                H.setIcon(ae);
                H.setText(af)
            } else {
                H.hide()
            }
        }

        function s() {
            w();
            F = m.jwGetPlaylist()[m.jwGetPlaylistIndex()];
            var ah = F ? F.image : "";
            I = undefined;
            n(ah);
            if (F != undefined) {
                var ag = F.media_desc;
                var ae = F.media_title;
				if (F.video_key != 1)
				{
					if (ae != undefined) {
						af = '<font class=\'media_title\'>' + ae + "</font>";
						if (ag != undefined) {
							af += ' <br /> <font class=\'media_desc\'>' + ag + "</font>";
						}
					}
					u.innerHTML = af
				}
            }
        }

        function n(ae) {
            if (o !== ae) {
                if (o) {
                    N(d, false)
                }
                o = ae;
                D()
            } else {
                if (o && !l) {
                    N(d, true)
                }
            }
            t(m.jwGetState())
        }

        function S() {
            Y = true;
            v("replay");
            var ae = m.jwGetPlaylist()[0];
            n(ae.image)
        }
        var B;

        function z() {
            return R ? R : (m ? m.jwGetState() : i.IDLE)
        }

        function r(ae) {
            clearTimeout(B);
            B = setTimeout(function() {
                t(ae.newstate)
            }, 100)
        }

        function t(aj) {
            aj = z();
            if (aj !== I) {
                I = aj;
                if (H) {
                    H.setRotation(0)
                }
                switch (aj) {
                    case i.IDLE:
                        if (!T && !Y) {
                            if (o && !k) {
                                N(d, true)
                            }
                            var ae = true;
                            if (m._model && m._model.config.displaytitle === false) {
                                ae = false
                            }
                            var ag = m._model.config.playlist[0];
                            var ai = ag.sources[0];
                            var af = ai.file;
                            var ah = af.indexOf(".mp3") > 0;
                            if (!ah || (g.isIOS() && m._model.height > 100)) {
                                v("play", (F && ae) ? F.title : "")
                            } else {
                                v()
                            }
                        }
                        break;
                    case i.BUFFERING:
                        w();
                        Y = false;
                        var ag = m._model.config.playlist[0];
                        var ai = ag.sources[0];
                        var af = ai.file;
                        var ah = af.indexOf(".mp3") > 0;
                        if (ah) {
                            v()
                        } else {
                            v("buffer")
                        }
                        break;
                    case i.PLAYING:
                        v();
                        break;
                    case i.PAUSED:
                        v("play");
                        break
                }
            }
        }
        this.forceState = function(ae) {
            R = ae;
            t(ae);
            this.show()
        };
        this.releaseState = function(ae) {
            R = null;
            t(ae);
            this.show()
        };
        this.hidePreview = function(ae) {
            k = ae;
            N(d, !ae);
            if (ae) {
                l = true
            }
        };
        this.setHiding = function() {
            l = true
        };
        this.element = function() {
            return Z
        };

        function O(ae) {
            return "#" + Z.id + " " + ae
        }

        function D() {
            if (o) {
                var ae = new Image();
                ae.addEventListener("load", y, false);
                ae.src = o
            } else {
                e(O(d), {
                    "background-image": ""
                });
                N(d, false);
                C = V = 0
            }
        }

        function y() {
            C = this.width;
            V = this.height;
            t(m.jwGetState());
            x();
            if (o) {
                e(O(d), {
                    "background-image": "url(" + o + ")"
                })
            }
        }

        function q(ae) {
            T = true;
            v("error", ae.message)
        }

        function w() {
            T = false;
            if (ad.error) {
                ad.error.setText()
            }
        }

        function x() {
            if (Z.clientWidth * Z.clientHeight > 0) {
                g.stretch(m.jwGetStretching(), ac, Z.clientWidth, Z.clientHeight, C, V)
            }
        }
        this.redraw = x;

        function N(ae, af) {
            e(O(ae), {
                opacity: af ? 1 : 0,
                visibility: af ? "visible" : "hidden"
            })
        }
        this.show = function(ae) {
            if (H && (ae || z() !== i.PLAYING)) {
                L();
                Z.style.display = "block";
                H.show();
                l = false
            }
        };
        this.hide = function() {
            if (H) {
                H.hide();
                l = true
            }
        };

        function L() {
            clearTimeout(M);
            M = undefined
        }
        this.setAlternateClickHandler = function(ae) {
            p = ae
        };
        this.revertAlternateClickHandler = function() {
            p = null
        };
        W()
    };
    e(a, {
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden"
    });
    e(a + " " + d, {
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "#000 no-repeat center",
        overflow: "hidden",
        opacity: 0
    });
    e(a + " .jwpreviewmask", {
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "#000 no-repeat center",
        overflow: "hidden",
        opacity: 0.6
    });
    e(a + " .jwpreviewtitle", {
        position: "absolute",
        color: "#fff",
        font: "15px/20px Roboto,Arial,sans-serif",
        overflow: "hidden",
        "text-overflow": "ellipsis",
        "white-space": "nowrap",
        top: "7px",
        left: "9px",
        right: "9px"
    });
    g.transitionStyle(a + ", " + a + " *", "opacity .25s, color .25s")
})(jwplayer);
(function(b) {
    var d = b.html5,
        h = b.utils,
        f = h.css,
        c = ".jwplayer .jwdisplayIcon",
        g = document,
        a = "none",
        e = "100%",
        i = "center";
    d.displayicon = function(n, H, s, B) {
        var v = H.skin,
            P = H.id,
            w, I, O, z, u, m, C, A = {},
            E, D = 0,
            x = -1,
            L = 0;
        if (H instanceof b.html5.instream) {
            P = P.replace("_instream", "")
        }

        function y() {
            w = K("jwdisplayIcon");
            w.id = n;
            t();
            m = K("jwtext", w, s, B);
            C = K("jwicon", w);
            H.jwAddEventListener(b.events.JWPLAYER_RESIZE, r);
            k();
            l()
        }

        function p() {
            return "#" + n
        }

        function K(R, T, S, Q) {
            var U = g.createElement("div");
            U.className = R;
            if (T) {
                T.appendChild(U)
            }
            if (w) {
                M(R, "." + R, S, Q)
            }
            return U
        }

        function t() {
            I = F("background");
            O = F("capLeft");
            z = F("capRight");
            u = (O.width * z.width > 0);
            var Q = {
                "background-image": "url(" + O.src + "), url(" + I.src + "), url(" + z.src + ")",
                "background-position": "left,center,right",
                "background-repeat": "no-repeat",
                padding: "0 " + z.width + "px 0 " + O.width + "px",
                height: I.height,
                "margin-top": I.height / -2
            };
            f(p(), Q);
            if (!h.isMobile()) {
                if (I.overSrc) {
                    Q["background-image"] = "url(" + O.overSrc + "), url(" + I.overSrc + "), url(" + z.overSrc + ")"
                }
                f(".jw-tab-focus " + p() + ", #" + P + " .jwdisplay:hover " + p(), Q)
            }
        }

        function M(S, U, R, X) {
            var W = F(S);
            if (S === "replayIcon" && !W.src) {
                W = F("playIcon")
            }
            if (W.overSrc) {
                X = h.extend({}, X);
                X["background-image"] = "url(" + W.overSrc + ")"
            }
            if (W.src) {
                R = h.extend({}, R);
                if (S.indexOf("Icon") > 0) {
                    D = W.width | 0
                }
                R.width = W.width;
                R["background-image"] = "url(" + W.src + ")";
                R["background-size"] = W.width + "px " + W.height + "px";
                R["float"] = "none";
                var Y = H._model.config.playlist[0];
                var Q = Y.sources[0];
                var T = Q.file;
                var V = T.indexOf(".mp3") > 0;
                if (S == "playIcon" && V) {
                    f.style(w, {
                        display: "none"
                    })
                } else {
                    f.style(w, {
                        display: "table"
                    })
                }
            } else {
                f.style(w, {
                    display: "none"
                })
            }
            if (R) {
                f("#" + P + " .jwdisplay " + U, R)
            }
            if (X) {
                f("#" + P + " .jwdisplay:hover " + U, X)
            }
            E = W
        }

        function F(R) {
            var S = v.getSkinElement("display", R),
                Q = v.getSkinElement("display", R + "Over");
            if (S) {
                S.overSrc = (Q && Q.src) ? Q.src : "";
                return S
            }
            return {
                src: "",
                overSrc: "",
                width: 0,
                height: 0
            }
        }

        function l() {
            var Q = u || (D === 0);
            f.style(m, {
                display: (m.innerHTML && Q) ? "" : a
            });
            L = Q ? 30 : 0;
            r()
        }

        function r() {
            clearTimeout(x);
            if (L-- > 0) {
                x = setTimeout(r, 33)
            }
            var S = "px " + e;
            var Q = Math.ceil(Math.max(E.width, h.bounds(w).width - z.width - O.width));
            var R = [O.width + S, Q + S, z.width + S].join(", ");
            var T = {
                "background-size": R
            };
            if (w.parentNode) {
                T.left = (w.parentNode.clientWidth % 2 === 1) ? "0.5px" : ""
            }
            f.style(w, T)
        }
        this.element = function() {
            return w
        };
        this.setText = function(R) {
            var Q = m.style;
            m.innerHTML = R ? R.replace(":", ":<br>") : "";
            Q.height = "0";
            Q.display = "block";
            if (R) {
                while (j(m) > 2) {
                    m.innerHTML = m.innerHTML.replace(/(.*) .*$/, "$1...")
                }
            }
            Q.height = "";
            Q.display = "";
            l()
        };
        this.setIcon = function(Q) {
            var R = A[Q];
            if (!R) {
                R = K("jwicon");
                R.id = w.id + "_" + Q;
                A[Q] = R
            }
            M(Q + "Icon", "#" + R.id);
            if (w.contains(C)) {
                w.replaceChild(R, C)
            } else {
                w.appendChild(R)
            }
            C = R
        };
        var q, o = 0,
            N;

        function G(R, Q) {
            clearInterval(q);
            N = 0;
            o = R | 0;
            if (o === 0) {
                J()
            } else {
                q = setInterval(J, Q)
            }
        }

        function J() {
            N = (N + o) % 360;
            h.rotate(C, N)
        }
        this.setRotation = G;

        function j(Q) {
            return Math.floor(Q.scrollHeight / g.defaultView.getComputedStyle(Q, null).lineHeight.replace("px", ""))
        }
        var k = this.hide = function() {
            w.style.opacity = 0;
            w.style.cursor = ""
        };
        this.show = function() {
            w.style.opacity = 1;
            w.style.cursor = "pointer"
        };
        y()
    };
    f(c, {
        display: "table",
        position: "relative",
        "margin-left": "auto",
        "margin-right": "auto",
        top: "50%",
        "float": "none"
    });
    f(c + " div", {
        position: "relative",
        display: "table-cell",
        "vertical-align": "middle",
        "background-repeat": "no-repeat",
        "background-position": i
    });
    f(c + " div", {
        "vertical-align": "middle"
    }, true);
    f(c + " .jwtext", {
        color: "#fff",
        padding: "0 1px",
        "max-width": "300px",
        "overflow-y": "hidden",
        "text-align": i,
        "-webkit-user-select": a,
        "-moz-user-select": a,
        "-ms-user-select": a,
        "user-select": a
    })
})(jwplayer);
(function(c) {
    var b = c.html5,
        a = c.utils,
        d = a.css,
        h = a.bounds,
        g = (window.top !== window.self),
        e = ".jwdock",
        f = ".jwdockbuttons";
    b.dock = function(t, E) {
        var w = t,
            v = {
                iconalpha: 0.75,
                iconalphaactive: 0.5,
                iconalphaover: 1,
                margin: 8
            },
            o = a.extend({}, v, E),
            i = w.id + "_dock",
            p = w.skin,
            z = 0,
            l = {},
            m = {},
            q, A, F, x, y = this;

        function r() {
            y.visible = false;
            q = D("div", "jwdock");
            A = D("div", "jwdockbuttons");
            q.appendChild(A);
            q.id = i;
            s();
            setTimeout(function() {
                F = h(q)
            })
        }

        function s() {
            var H = u("button"),
                I = u("buttonOver"),
                J = u("buttonActive");
            if (!H) {
                return
            }
            d(j(), {
                height: H.height,
                padding: o.margin
            });
            d(f, {
                height: H.height
            });
            d(j("div.button"), a.extend(n(H), {
                width: H.width,
                cursor: "pointer",
                border: "none"
            }));
            d(j("div.button:hover"), n(I));
            d(j("div.button:active"), n(J));
            d(j("div.button>div"), {
                opacity: o.iconalpha
            });
            d(j("div.button:hover>div"), {
                opacity: o.iconalphaover
            });
            d(j("div.button:active>div"), {
                opacity: o.iconalphaactive
            });
            d(j(".jwoverlay"), {
                top: o.margin + H.height
            });
            B("capLeft", A);
            B("capRight", A);
            B("divider")
        }

        function n(H) {
            if (!(H && H.src)) {
                return {}
            }
            return {
                background: "url(" + H.src + ") center",
                "background-size": H.width + "px " + H.height + "px"
            }
        }

        function B(J, I) {
            var H = u(J);
            d(j("." + J), a.extend(n(H), {
                width: H.width
            }));
            return D("div", J, I)
        }

        function j(H) {
            return "#" + i + " " + (H ? H : "")
        }

        function D(J, H, I) {
            var K = document.createElement(J);
            if (H) {
                K.className = H
            }
            if (I) {
                I.appendChild(K)
            }
            return K
        }

        function u(H) {
            var I = p.getSkinElement("dock", H);
            return I ? I : {
                width: 0,
                height: 0,
                src: ""
            }
        }
        y.redraw = function() {
            F = h(q)
        };

        function C() {
            return (g && a.isIE() && w.jwGetFullscreen())
        }

        function G(I) {
            var L = m[I],
                H, K = l[I],
                M, J = h(K.icon);
            L.offsetX(0);
            M = h(q);
            if (C()) {
                d("#" + L.element().id, {
                    left: J.left * 100 + 50 + J.width * 100 / 2
                })
            } else {
                d("#" + L.element().id, {
                    left: J.left - M.left + J.width / 2
                })
            }
            H = h(L.element());
            if (M.left > H.left) {
                L.offsetX(M.left - H.left + 8)
            }
        }
        y.element = function() {
            return q
        };
        y.offset = function(H) {
            d(j(), {
                "margin-left": H
            })
        };
        y.hide = function() {
            if (!y.visible) {
                return
            }
            y.visible = false;
            q.style.opacity = 0;
            clearTimeout(x);
            x = setTimeout(function() {
                q.style.display = "none"
            }, 250)
        };
        y.showTemp = function() {
            if (!y.visible) {
                q.style.opacity = 0;
                q.style.display = "block"
            }
        };
        y.hideTemp = function() {
            if (!y.visible) {
                q.style.display = "none"
            }
        };
        y.show = function() {
            if (y.visible || !z) {
                return
            }
            y.visible = true;
            q.style.display = "block";
            clearTimeout(x);
            x = setTimeout(function() {
                q.style.opacity = 1
            }, 0)
        };
        y.addButton = function(I, Q, M, J) {
            if (l[J]) {
                return
            }
            var K = D("div", "divider", A),
                L = D("div", "button", A),
                P = D("div", null, L);
            P.id = i + "_" + J;
            P.innerHTML = "&nbsp;";
            d("#" + P.id, {
                "background-image": I
            });
            if (typeof M === "string") {
                M = new Function(M)
            }
            if (!a.isMobile()) {
                L.addEventListener("click", function(S) {
                    M(S);
                    S.preventDefault()
                })
            } else {
                var H = new a.touch(L);
                H.addEventListener(a.touchEvents.TAP, function(S) {
                    M(S)
                })
            }
            l[J] = {
                element: L,
                label: Q,
                divider: K,
                icon: P
            };
            if (Q) {
                var R = new b.overlay(P.id + "_tooltip", p, true),
                    N = D("div");
                N.id = P.id + "_label";
                N.innerHTML = Q;
                d("#" + N.id, {
                    padding: 3
                });
                R.setContents(N);
                if (!a.isMobile()) {
                    var O;
                    L.addEventListener("mouseover", function() {
                        clearTimeout(O);
                        G(J);
                        R.show();
                        a.foreach(m, function(S, T) {
                            if (S !== J) {
                                T.hide()
                            }
                        })
                    }, false);
                    L.addEventListener("mouseout", function() {
                        O = setTimeout(R.hide, 100)
                    }, false);
                    q.appendChild(R.element());
                    m[J] = R
                }
            }
            z++;
            k()
        };
        y.removeButton = function(I) {
            if (l[I]) {
                A.removeChild(l[I].element);
                A.removeChild(l[I].divider);
                var H = document.getElementById("" + i + "_" + I + "_tooltip");
                if (H) {
                    q.removeChild(H)
                }
                delete l[I];
                z--;
                k()
            }
        };
        y.numButtons = function() {
            return z
        };

        function k() {
            d(f + " .capLeft, " + f + " .capRight", {
                display: z ? "block" : "none"
            })
        }
        r()
    };
    d(e, {
        opacity: 0,
        display: "none"
    });
    d(e + " > *", {
        height: "100%",
        "float": "left"
    });
    d(e + " > .jwoverlay", {
        height: "auto",
        "float": "none",
        "z-index": 99
    });
    d(f + " div.button", {
        position: "relative"
    });
    d(f + " > *", {
        height: "100%",
        "float": "left"
    });
    d(f + " .divider", {
        display: "none"
    });
    d(f + " div.button ~ .divider", {
        display: "block"
    });
    d(f + " .capLeft, " + f + " .capRight", {
        display: "none"
    });
    d(f + " .capRight", {
        "float": "right"
    });
    d(f + " div.button > div", {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 5,
        position: "absolute",
        "background-position": "center",
        "background-repeat": "no-repeat"
    });
    a.transitionStyle(e, "background .25s, opacity .25s");
    a.transitionStyle(e + " .jwoverlay", "opacity .25s");
    a.transitionStyle(f + " div.button div", "opacity .25s")
})(jwplayer);
(function(c) {
    var a = c.html5,
        e = c.utils,
        b = c._,
        f = c.events,
        d = f.state,
        g = c.playlist;
    a.instream = function(C, G, n, x) {
        var u = {
            controlbarseekable: "never",
            controlbarpausable: true,
            controlbarstoppable: true,
            loadingmessage: "Loading ad",
            playlistclickable: true,
            skipoffset: null,
            tag: null
        };
        var w, M, y = 0,
            J, z = {
                controlbarseekable: "never",
                controlbarpausable: false,
                controlbarstoppable: false
            },
            h, t, I, j, k, K, l, p, o, i, F = -1,
            E = e.extend(this, new f.eventdispatcher());
        C.jwAddEventListener(f.JWPLAYER_RESIZE, r);
        C.jwAddEventListener(f.JWPLAYER_FULLSCREEN, q);
        E.init = function() {
            t = x.detachMedia();
            H();
            K = new a.model({}, l);
            K.setVolume(G.volume);
            K.setFullscreen(G.fullscreen);
            K.setMute(G.mute);
            K.addEventListener("fullscreenchange", A);
            k = G.playlist[G.item];
            I = t.currentTime;
            if (x.checkBeforePlay() || (I === 0 && !G.getVideo().checkComplete())) {
                I = 0;
                j = d.PLAYING
            } else {
                if (G.getVideo().checkComplete()) {
                    j = d.IDLE
                } else {
                    if (C.jwGetState() === d.IDLE) {
                        j = d.IDLE
                    } else {
                        j = d.PLAYING
                    }
                }
            }
            if (j === d.PLAYING) {
                t.pause()
            }
            o = new a.display(E);
            o.forceState(d.BUFFERING);
            i = document.createElement("div");
            i.id = E.id + "_instream_container";
            e.css.style(i, {
                width: "100%",
                height: "100%"
            });
            i.appendChild(o.element());
            var P = {
                fullscreen: G.fullscreen
            };
            p = new a.controlbar(E, P);
            p.instreamMode(true);
            i.appendChild(p.element());
            if (C.jwGetControls()) {
                p.show();
                o.show()
            } else {
                p.hide();
                o.hide()
            }
            n.setupInstream(i, p, o, K);
            r();
            E.jwInstreamSetText(u.loadingmessage)
        };
        E.load = function(T, Q) {
            if (e.isAndroid(2.3)) {
                s({
                    type: f.JWPLAYER_ERROR,
                    message: "Error loading instream: Cannot play instream on Android 2.3"
                });
                return
            }
            D(f.JWPLAYER_PLAYLIST_ITEM, {
                index: y
            }, true);
            var S = i.parentNode;
            var P = 10 + e.bounds(S).bottom - e.bounds(p.element()).top;
            if (b.isArray(T)) {
                if (Q) {
                    J = Q;
                    Q = Q[y]
                }
                M = T;
                T = M[y]
            }
            z = e.extend(u, Q);
            w = new g.item(T);
            K.setPlaylist([T]);
            h = new a.adskipbutton(C.id, P, z.skipMessage, z.skipText);
            h.addEventListener(f.JWPLAYER_AD_SKIPPED, m);
            h.reset(z.skipoffset || -1);
            if (C.jwGetControls()) {
                h.show()
            } else {
                h.hide()
            }
            var R = h.element();
            i.appendChild(R);
            K.addEventListener(f.JWPLAYER_ERROR, s);
            o.setAlternateClickHandler(function(U) {
                U = U || {};
                U.hasControls = !!C.jwGetControls();
                D(f.JWPLAYER_INSTREAM_CLICK, U);
                if (K.state === d.PAUSED) {
                    if (U.hasControls) {
                        E.jwInstreamPlay()
                    }
                } else {
                    E.jwInstreamPause()
                }
            });
            if (e.isMSIE()) {
                t.parentElement.addEventListener("click", o.clickHandler)
            }
            n.addEventListener(f.JWPLAYER_AD_SKIPPED, m);
            l.load(K.playlist[0])
        };

        function s(P) {
            D(P.type, P);
            if (K) {
                C.jwInstreamDestroy(false, E)
            }
        }
        E.jwInstreamDestroy = function(P) {
            if (!K) {
                return
            }
            K.removeEventListener("fullscreenchange", A);
            clearTimeout(F);
            F = -1;
            l.detachMedia();
            x.attachMedia();
            if (j !== d.IDLE) {
                var Q = e.extend({}, k);
                Q.starttime = I;
                G.getVideo().load(Q)
            } else {
                G.getVideo().stop()
            }
            E.resetEventListeners();
            l.resetEventListeners();
            K.resetEventListeners();
            if (p) {
                try {
                    p.element().parentNode.removeChild(p.element())
                } catch (R) {}
            }
            if (o) {
                if (t && t.parentElement) {
                    t.parentElement.removeEventListener("click", o.clickHandler)
                }
                o.revertAlternateClickHandler()
            }
            D(f.JWPLAYER_INSTREAM_DESTROYED, {
                reason: P ? "complete" : "destroyed"
            }, true);
            if (j === d.PLAYING) {
                t.play()
            }
            n.destroyInstream(l.isAudioFile());
            K = null
        };
        E.jwInstreamAddEventListener = function(P, Q) {
            E.addEventListener(P, Q)
        };
        E.jwInstreamRemoveEventListener = function(P, Q) {
            E.removeEventListener(P, Q)
        };
        E.jwInstreamPlay = function() {
            l.play(true);
            G.state = d.PLAYING;
            o.show()
        };
        E.jwInstreamPause = function() {
            l.pause(true);
            G.state = d.PAUSED;
            if (C.jwGetControls()) {
                o.show();
                p.show()
            }
        };
        E.jwInstreamSeek = function(P) {
            l.seek(P)
        };
        E.jwInstreamSetText = function(P) {
            p.setText(P)
        };
        E.jwInstreamState = function() {
            return K.state
        };

        function H() {
            var P = c.html5.chooseProvider({});
            l = new P(G.id, G);
            l.addGlobalListener(L);
            l.addEventListener(f.JWPLAYER_MEDIA_META, O);
            l.addEventListener(f.JWPLAYER_MEDIA_COMPLETE, v);
            l.addEventListener(f.JWPLAYER_MEDIA_BUFFER_FULL, B);
            l.addEventListener(f.JWPLAYER_MEDIA_ERROR, s);
            l.addEventListener(f.JWPLAYER_PLAYER_STATE, N);
            l.addEventListener(f.JWPLAYER_MEDIA_TIME, function(Q) {
                if (h) {
                    h.updateSkipTime(Q.position, Q.duration)
                }
            });
            l.attachMedia();
            l.mute(G.mute);
            l.volume(G.volume)
        }

        function N(P) {
            if (P.newstate === K.state) {
                return
            }
            K.state = P.newstate;
            switch (K.state) {
                case d.PLAYING:
                    E.jwInstreamPlay();
                    break;
                case d.PAUSED:
                    E.jwInstreamPause();
                    break
            }
        }

        function m(P) {
            D(P.type, P);
            v()
        }

        function L(P) {
            D(P.type, P)
        }

        function A(P) {
            G.sendEvent(P.type, P);
            D(f.JWPLAYER_FULLSCREEN, {
                fullscreen: P.jwstate
            })
        }

        function q(P) {
            L(P);
            if (!K) {
                return
            }
            r();
            if (!P.fullscreen && e.isIPad()) {
                if (K.state === d.PAUSED) {
                    o.show(true)
                } else {
                    if (K.state === d.PLAYING) {
                        o.hide()
                    }
                }
            }
        }

        function B() {
            if (o) {
                o.releaseState(E.jwGetState())
            }
            l.play()
        }

        function v() {
            if (M && y + 1 < M.length) {
                y++;
                var P = M[y];
                w = new g.item(P);
                K.setPlaylist([P]);
                var Q;
                if (J) {
                    Q = J[y]
                }
                z = e.extend(u, Q);
                l.load(K.playlist[0]);
                h.reset(z.skipoffset || -1);
                F = setTimeout(function() {
                    D(f.JWPLAYER_PLAYLIST_ITEM, {
                        index: y
                    }, true)
                }, 0)
            } else {
                F = setTimeout(function() {
                    D(f.JWPLAYER_PLAYLIST_COMPLETE, {}, true);
                    C.jwInstreamDestroy(true, E)
                }, 0)
            }
        }

        function O(P) {
            if (P.width && P.height) {
                if (o) {
                    o.releaseState(E.jwGetState())
                }
                n.resizeMedia()
            }
        }

        function D(P, Q) {
            Q = Q || {};
            if (u.tag && !Q.tag) {
                Q.tag = u.tag
            }
            E.sendEvent(P, Q)
        }

        function r() {
            if (p) {
                p.redraw()
            }
            if (o) {
                o.redraw()
            }
        }
        E.setControls = function(P) {
            if (P) {
                h.show()
            } else {
                h.hide()
            }
        };
        E.jwPlay = function() {
            if (z.controlbarpausable.toString().toLowerCase() === "true") {
                E.jwInstreamPlay()
            }
        };
        E.jwPause = function() {
            if (z.controlbarpausable.toString().toLowerCase() === "true") {
                E.jwInstreamPause()
            }
        };
        E.jwStop = function() {
            if (z.controlbarstoppable.toString().toLowerCase() === "true") {
                C.jwInstreamDestroy(false, E);
                C.jwStop()
            }
        };
        E.jwSeek = function(P) {
            switch (z.controlbarseekable.toLowerCase()) {
                case "never":
                    return;
                case "always":
                    E.jwInstreamSeek(P);
                    break;
                case "backwards":
                    if (K.position > P) {
                        E.jwInstreamSeek(P)
                    }
                    break
            }
        };
        E.jwSeekDrag = function(P) {
            K.seekDrag(P)
        };
        E.jwGetPosition = function() {};
        E.jwGetDuration = function() {};
        E.jwGetWidth = C.jwGetWidth;
        E.jwGetHeight = C.jwGetHeight;
        E.jwGetFullscreen = C.jwGetFullscreen;
        E.jwSetFullscreen = C.jwSetFullscreen;
        E.jwGetVolume = function() {
            return G.volume
        };
        E.jwSetVolume = function(P) {
            K.setVolume(P);
            C.jwSetVolume(P)
        };
        E.jwGetMute = function() {
            return G.mute
        };
        E.jwSetMute = function(P) {
            K.setMute(P);
            C.jwSetMute(P)
        };
        E.jwGetState = function() {
            if (!K) {
                return d.IDLE
            }
            return K.state
        };
        E.jwGetPlaylist = function() {
            return [w]
        };
        E.jwGetPlaylistIndex = function() {
            return 0
        };
        E.jwGetStretching = function() {
            return G.config.stretching
        };
        E.jwAddEventListener = function(Q, P) {
            E.addEventListener(Q, P)
        };
        E.jwRemoveEventListener = function(Q, P) {
            E.removeEventListener(Q, P)
        };
        E.jwSetCurrentQuality = function() {};
        E.jwGetQualityLevels = function() {
            return []
        };
        E.jwGetControls = function() {
            return C.jwGetControls()
        };
        E.skin = C.skin;
        E.id = C.id + "_instream";
        return E
    }
})(window.jwplayer);
(function(b) {
    var i = b.utils,
        e = b.html5,
        h = i.css,
        k = b.events.state,
        f = "free",
        c = "pro",
        d = "premium",
        j = "ads",
        l = "http://xyanua.com",
        g = ".jwlogo";
    var a = e.logo = function(t, u) {
        var z = t,
            A = z.id + "_logo",
            q, n, r = a.defaults,
            y = false;

        function s() {
            x();
            o()
        }

        function x() {
            var B = "o";
            if (z.edition) {
                B = v(z.edition())
            }
            if (B === "o" || B === "f") {
                r.link = l
            }
            q = i.extend({}, r, u);
            q.hide = (q.hide.toString() === "true")
        }

        function o() {
            n = document.createElement("img");
            n.className = "jwlogo";
            n.id = A;
            if (!q.file) {
                n.style.display = "none";
                return
            }
            var B = (/(\w+)-(\w+)/).exec(q.position),
                C = {},
                E = q.margin;
            if (B.length === 3) {
                C[B[1]] = E;
                C[B[2]] = E
            } else {
                C.top = C.right = E
            }
            h(m(), C);
            if (!i.isMobile()) {
                n.onclick = w
            } else {
                var D = new i.touch(n);
                D.addEventListener(i.touchEvents.TAP, w)
            }
        }
        this.resize = function() {};
        this.element = function() {
            return n
        };
        this.offset = function(B) {
            h(m(), {
                "margin-bottom": B
            })
        };
        this.position = function() {
            return q.position
        };
        this.margin = function() {
            return parseInt(q.margin, 10)
        };

        function p() {
            if (z.jwGetState() === k.IDLE || z.jwGetState() === k.PAUSED) {
                z.jwPlay()
            } else {
                z.jwPause()
            }
        }

        function w(B) {
            if (i.exists(B) && B.stopPropagation) {
                B.stopPropagation()
            }
            if (!y || !q.link) {
                p()
            }
            if (y && q.link) {
                z.jwPause();
                z.jwSetFullscreen(false);
                window.open(q.link, q.linktarget)
            }
            return
        }

        function v(B) {
            if (B === c) {
                return "p"
            } else {
                if (B === d) {
                    return "r"
                } else {
                    if (B === j) {
                        return "a"
                    } else {
                        if (B === f) {
                            return "f"
                        } else {
                            return "o"
                        }
                    }
                }
            }
        }

        function m(B) {
            return "#" + A + " " + (B ? B : "")
        }
        this.hide = function(B) {
            if (q.hide || B) {
                y = false;
                n.style.visibility = "hidden";
                n.style.opacity = 0
            }
        };
        this.show = function() {
            y = true;
            n.style.visibility = "visible";
            n.style.opacity = 1
        };
        s();
        return this
    };
    a.defaults = {
        prefix: i.repo(),
        file: "logo.png",
        linktarget: "_top",
        margin: 8,
        hide: false,
        position: "top-right"
    };
    h(g, {
        cursor: "pointer",
        position: "absolute"
    })
})(jwplayer);
(function(e) {
    var d = e.html5,
        b = e.utils,
        f = b.css,
        g = "jwmenu",
        a = "jwoption";
    d.menu = function(i, j, w, p) {
        var t = j,
            k = p,
            m = new d.overlay(t + "_overlay", w),
            n = b.extend({
                fontcase: undefined,
                fontcolor: "#cccccc",
                fontsize: 11,
                fontweight: undefined,
                activecolor: "#ffffff",
                overcolor: "#ffffff"
            }, w.getComponentSettings("tooltip")),
            l, v = [];

        function s() {
            l = q(g);
            l.id = t;
            var B = o("menuTop" + i),
                z = o("menuOption"),
                y = o("menuOptionOver"),
                A = o("menuOptionActive");
            if (B && B.image) {
                var C = new Image();
                C.src = B.src;
                C.width = B.width;
                C.height = B.height;
                l.appendChild(C)
            }
            if (z) {
                var x = "#" + j + " ." + a;
                f(x, b.extend(u(z), {
                    height: z.height,
                    color: n.fontcolor,
                    "padding-left": z.width,
                    font: n.fontweight + " " + n.fontsize + "px Arial,Helvetica,sans-serif",
                    "line-height": z.height,
                    "text-transform": (n.fontcase === "upper") ? "uppercase" : undefined
                }));
                f(x + ":hover", b.extend(u(y), {
                    color: n.overcolor
                }));
                f(x + ".active", b.extend(u(A), {
                    color: n.activecolor
                }))
            }
            m.setContents(l)
        }

        function u(x) {
            if (!(x && x.src)) {
                return {}
            }
            return {
                background: "url(" + x.src + ") no-repeat left",
                "background-size": x.width + "px " + x.height + "px"
            }
        }
        this.element = function() {
            return m.element()
        };
        this.addOption = function(y, A) {
            var z = q(a, l);
            z.id = t + "_option_" + A;
            z.innerHTML = y;
            if (!b.isMobile()) {
                z.addEventListener("click", r(v.length, A))
            } else {
                var x = new b.touch(z);
                x.addEventListener(b.touchEvents.TAP, r(v.length, A))
            }
            v.push(z)
        };

        function r(x, y) {
            return function() {
                h(x);
                if (k) {
                    k(y)
                }
            }
        }
        this.clearOptions = function() {
            while (v.length > 0) {
                l.removeChild(v.pop())
            }
        };
        var h = this.setActive = function(x) {
            for (var y = 0; y < v.length; y++) {
                var z = v[y];
                z.className = z.className.replace(" active", "");
                if (y === x) {
                    z.className += " active"
                }
            }
        };

        function q(y, x) {
            var z = document.createElement("div");
            if (y) {
                z.className = y
            }
            if (x) {
                x.appendChild(z)
            }
            return z
        }

        function o(x) {
            var y = w.getSkinElement("tooltip", x);
            return y ? y : {
                width: 0,
                height: 0,
                src: undefined
            }
        }
        this.show = m.show;
        this.hide = m.hide;
        this.offsetX = m.offsetX;
        this.positionX = m.positionX;
        this.constrainX = m.constrainX;
        s()
    };

    function c(h) {
        return "." + h.replace(/ /g, " .")
    }
    f(c(g + " " + a), {
        cursor: "pointer",
        "white-space": "nowrap",
        position: "relative"
    })
})(jwplayer);
(function(c) {
    var b = c.html5,
        a = c.utils,
        d = c.events;
    b.model = function(h, e) {
        var n = this,
            j, p = a.getCookies(),
            f = {
                controlbar: {},
                display: {}
            },
            g = a.noop,
            l = {
                autostart: false,
                controls: true,
                fullscreen: false,
                height: 320,
                mobilecontrols: false,
                mute: false,
                playlist: [],
                playlistposition: "none",
                playlistsize: 180,
                playlistlayout: "extended",
                repeat: true,
                shuffle: false,
                expand: false,
                stretching: a.stretching.UNIFORM,
                width: 480,
                volume: 90
            };

        function m(q) {
            a.foreach(q, function(r, s) {
                q[r] = a.serialize(s)
            });
            return q
        }

        function o() {
            a.extend(n, new d.eventdispatcher());
            n.config = m(a.extend({}, l, p, h));
            a.extend(n, {
                id: h.id,
                state: d.state.IDLE,
                duration: -1,
                position: 0,
                buffer: 0
            }, n.config);
            n.playlist = [];
            n.setItem(0)
        }
        var k = {};
        k[d.JWPLAYER_MEDIA_MUTE] = ["mute"];
        k[d.JWPLAYER_MEDIA_VOLUME] = ["volume"];
        k[d.JWPLAYER_PLAYER_STATE] = ["newstate->state"];
        k[d.JWPLAYER_MEDIA_BUFFER] = ["bufferPercent->buffer"];
        k[d.JWPLAYER_MEDIA_TIME] = ["position", "duration"];

        function i(q) {
            var x = k[q.type];
            if (x && x.length) {
                var w = false;
                for (var u = 0; u < x.length; u++) {
                    var s = x[u];
                    var t = s.split("->");
                    var v = t[0];
                    var r = t[1] || v;
                    if (n[r] !== q[v]) {
                        n[r] = q[v];
                        w = true
                    }
                }
                if (w) {
                    n.sendEvent(q.type, q)
                }
            } else {
                n.sendEvent(q.type, q)
            }
        }
        n.setVideoProvider = function(r) {
            if (j) {
                j.removeGlobalListener(i);
                var q = j.getContainer();
                if (q) {
                    j.remove();
                    r.setContainer(q)
                }
            }
            j = r;
            j.volume(n.volume);
            j.mute(n.mute);
            j.addGlobalListener(i)
        };
        n.destroy = function() {
            if (j) {
                j.removeGlobalListener(i);
                j.destroy()
            }
        };
        n.getVideo = function() {
            return j
        };
        n.seekDrag = function(q) {
            j.seekDrag(q)
        };
        n.setRepeat = function(q) {
            n.repeat = !n.repeat
        };
        n.setShuffle = function(q) {
            n.shuffle = !n.shuffle
        };
        n.setFullscreen = function(q) {
            q = !!q;
            if (q !== n.fullscreen) {
                n.fullscreen = q;
                n.sendEvent(d.JWPLAYER_FULLSCREEN, {
                    fullscreen: q
                })
            }
        };
        n.setPlaylist = function(q) {
            n.playlist = c.playlist.filterPlaylist(q, n.androidhls);
            if (n.playlist.length === 0) {
                n.sendEvent(d.JWPLAYER_ERROR, {
                    message: "Error loading playlist: No playable sources found"
                })
            } else {
                n.sendEvent(d.JWPLAYER_PLAYLIST_LOADED, {
                    playlist: c(n.id).getPlaylist()
                });
                n.item = -1;
                n.setItem(0)
            }
        };
        n.setItem = function(q) {
            var r;
            var u = false;
            if (q === n.playlist.length || q < -1) {
                r = 0;
                u = true
            } else {
                if (q === -1 || q > n.playlist.length) {
                    r = n.playlist.length - 1
                } else {
                    r = q
                }
            }
            if (u || r !== n.item) {
                n.item = r;
                n.sendEvent(d.JWPLAYER_PLAYLIST_ITEM, {
                    index: n.item
                });
                var s = n.playlist[r];
                var t = s && s.sources && s.sources[0];
                var v = b.chooseProvider(t);
                if (!(g instanceof v)) {
                    g = e || new v(n.id, n);
                    n.setVideoProvider(g)
                }
                if (g.init) {
                    g.init(s)
                }
            }
        };
        n.setVolume = function(q) {
            if (n.mute && q > 0) {
                n.setMute(false)
            }
            q = Math.round(q);
            if (!n.mute) {
                a.saveCookie("volume", q)
            }
            i({
                type: d.JWPLAYER_MEDIA_VOLUME,
                volume: q
            });
            j.volume(q)
        };
        n.setMute = function(q) {
            if (!a.exists(q)) {
                q = !n.mute
            }
            a.saveCookie("mute", q);
            i({
                type: d.JWPLAYER_MEDIA_MUTE,
                mute: q
            });
            j.mute(q)
        };
        n.componentConfig = function(q) {
            return f[q]
        };
        o()
    }
})(jwplayer);
(function(e) {
    var h = e.html5,
        l = e.utils,
        k = l.css,
        m = l.transitionStyle,
        b = ".jwoverlay",
        g = "jwcontents",
        d = "top",
        j = "bottom",
        i = "right",
        a = "left",
        c = "#ffffff",
        f = {
            fontcase: undefined,
            fontcolor: c,
            fontsize: 12,
            fontweight: undefined,
            activecolor: c,
            overcolor: c
        };
    h.overlay = function(z, B, x) {
        var C = this,
            p = z,
            u = B,
            D = x,
            v, G, A, n, o = l.extend({}, f, u.getComponentSettings("tooltip")),
            r = {};

        function w() {
            v = E(b.replace(".", ""));
            v.id = p;
            var I = q("arrow", "jwarrow");
            n = I[0];
            A = I[1];
            k.style(n, {
                position: "absolute",
                bottom: D ? undefined : 0,
                top: D ? 0 : undefined,
                width: A.width,
                height: A.height,
                left: "50%"
            });
            F(d, a);
            F(j, a);
            F(d, i);
            F(j, i);
            F(a);
            F(i);
            F(d);
            F(j);
            var H = q("background", "jwback");
            k.style(H[0], {
                left: r.left,
                right: r.right,
                top: r.top,
                bottom: r.bottom
            });
            G = E(g, v);
            k(s(g) + " *", {
                color: o.fontcolor,
                font: o.fontweight + " " + (o.fontsize) + "px Arial,Helvetica,sans-serif",
                "text-transform": (o.fontcase === "upper") ? "uppercase" : undefined
            });
            if (D) {
                l.transform(s("jwarrow"), "rotate(180deg)")
            }
            if (z.indexOf("_timetooltip") > 0) {
                k.style(v, {
                    bottom: "14px",
                    padding: (r.top + 1) + "px " + r.right + "px " + (r.bottom + 1) + "px " + r.left + "px"
                })
            } else {
                k.style(v, {
                    padding: (r.top + 1) + "px " + r.right + "px " + (r.bottom + 1) + "px " + r.left + "px"
                })
            }
            C.showing = false
        }

        function s(H) {
            return "#" + p + (H ? " ." + H : "")
        }

        function E(I, H) {
            var J = document.createElement("div");
            if (I) {
                J.className = I
            }
            if (H) {
                H.appendChild(J)
            }
            return J
        }

        function q(H, J) {
            var I = y(H),
                K = E(J, v);
            k.style(K, t(I));
            return [K, I]
        }

        function t(H) {
            return {
                background: "url(" + H.src + ") center",
                "background-size": H.width + "px " + H.height + "px"
            }
        }

        function F(N, M) {
            if (!M) {
                M = ""
            }
            var J = q("cap" + N + M, "jwborder jw" + N + (M ? M : "")),
                H = J[0],
                K = J[1],
                I = l.extend(t(K), {
                    width: (N === a || M === a || N === i || M === i) ? K.width : undefined,
                    height: (N === d || M === d || N === j || M === j) ? K.height : undefined
                });
            I[N] = ((N === j && !D) || (N === d && D)) ? A.height : 0;
            if (M) {
                I[M] = 0
            }
            k.style(H, I);
            var L = {},
                P = {},
                O = {
                    left: K.width,
                    right: K.width,
                    top: (D ? A.height : 0) + K.height,
                    bottom: (D ? 0 : A.height) + K.height
                };
            if (M) {
                L[M] = O[M];
                L[N] = 0;
                P[N] = O[N];
                P[M] = 0;
                k(s("jw" + N), L);
                k(s("jw" + M), P);
                r[N] = O[N];
                r[M] = O[M]
            }
        }
        C.element = function() {
            return v
        };
        C.setContents = function(H) {
            l.empty(G);
            G.appendChild(H)
        };
        C.positionX = function(H) {
            k.style(v, {
                left: Math.round(H)
            })
        };
        C.constrainX = function(H, I) {
            if (C.showing && H.width !== 0) {
                var J = C.offsetX(0);
                if (J) {
                    if (I) {
                        k.unblock()
                    }
                    var K = l.bounds(v);
                    if (K.width !== 0) {
                        if (K.right > H.right) {
                            C.offsetX(H.right - K.right)
                        } else {
                            if (K.left < H.left) {
                                C.offsetX(H.left - K.left)
                            }
                        }
                    }
                }
            }
        };
        C.offsetX = function(I) {
            I = Math.round(I);
            var H = v.clientWidth;
            if (H !== 0) {
                k.style(v, {
                    "margin-left": Math.round(-H / 2) + I
                });
                k.style(n, {
                    "margin-left": Math.round(-A.width / 2) - I
                })
            }
            return H
        };
        C.borderWidth = function() {
            return r.left
        };

        function y(H) {
            var I = u.getSkinElement("tooltip", H);
            if (I) {
                return I
            } else {
                return {
                    width: 0,
                    height: 0,
                    src: "",
                    image: undefined,
                    ready: false
                }
            }
        }
        C.show = function() {
            C.showing = true;
            k.style(v, {
                opacity: 1,
                visibility: "visible"
            })
        };
        C.hide = function() {
            C.showing = false;
            k.style(v, {
                opacity: 0,
                visibility: "hidden"
            })
        };
        w()
    };
    k(b, {
        position: "absolute",
        visibility: "hidden",
        opacity: 0
    });
    k(b + " .jwcontents", {
        position: "relative",
        "z-index": 1
    });
    k(b + " .jwborder", {
        position: "absolute",
        "background-size": "100% 100%"
    }, true);
    k(b + " .jwback", {
        position: "absolute",
        "background-size": "100% 100%"
    });
    m(b, "opacity .25s, visibility .25s")
})(jwplayer);
(function(c) {
    var b = c.html5,
        a = c.utils;
    b.player = function(f) {
        var o = this,
            p, l, m, n, e;

        function q() {
            p = new b.model(f);
            o.id = p.id;
            o._model = p;
            a.css.block(o.id);
            l = new b.view(o, p);
            m = new b.controller(p, l);
            h();
            o.initializeAPI = h;
            n = new b.setup(p, l);
            n.addEventListener(c.events.JWPLAYER_READY, i);
            n.addEventListener(c.events.JWPLAYER_ERROR, k);
            n.start()
        }

        function i(r) {
            m.playerReady(r);
            a.css.unblock(o.id)
        }

        function k(r) {
            a.css.unblock(o.id);
            c(o.id).dispatchEvent(c.events.JWPLAYER_SETUP_ERROR, r)
        }

        function g() {
            var t = p.playlist,
                r = [];
            for (var s = 0; s < t.length; s++) {
                r.push(d(t[s]))
            }
            return r
        }

        function d(r) {
            var s = {
                description: r.description,
                file: r.file,
                image: r.image,
                mediaid: r.mediaid,
                title: r.title
            };
            a.foreach(r, function(t, u) {
                s[t] = u
            });
            s.sources = [];
            s.tracks = [];
            if (r.sources.length > 0) {
                a.foreach(r.sources, function(t, u) {
                    var v = {
                        file: u.file,
                        type: u.type ? u.type : undefined,
                        label: u.label,
                        "default": u["default"] ? true : false
                    };
                    s.sources.push(v)
                })
            }
            if (r.tracks.length > 0) {
                a.foreach(r.tracks, function(v, u) {
                    var t = {
                        file: u.file,
                        kind: u.kind ? u.kind : undefined,
                        label: u.label,
                        "default": u["default"] ? true : false
                    };
                    s.tracks.push(t)
                })
            }
            if (!r.file && r.sources.length > 0) {
                s.file = r.sources[0].file
            }
            return s
        }

        function h() {
            o.jwPlay = m.play;
            o.jwPause = m.pause;
            o.jwStop = m.stop;
            o.jwSeek = m.seek;
            o.jwSetVolume = m.setVolume;
            o.jwSetMute = m.setMute;
            o.jwLoad = m.load;
            o.jwPlaylistNext = m.next;
            o.jwPlaylistPrev = m.prev;
            o.jwPlaylistItem = m.item;
            o.jwSetFullscreen = m.setFullscreen;
            o.jwResize = l.resize;
            o.jwSeekDrag = p.seekDrag;
            o.jwRepeat = p.setRepeat;
            o.jwShuffle = p.setShuffle;
            o.jwGetQualityLevels = m.getQualityLevels;
            o.jwGetCurrentQuality = m.getCurrentQuality;
            o.jwSetCurrentQuality = m.setCurrentQuality;
            o.jwGetAudioTracks = m.getAudioTracks;
            o.jwGetCurrentAudioTrack = m.getCurrentAudioTrack;
            o.jwSetCurrentAudioTrack = m.setCurrentAudioTrack;
            o.jwGetCaptionsList = m.getCaptionsList;
            o.jwGetCurrentCaptions = m.getCurrentCaptions;
            o.jwSetCurrentCaptions = m.setCurrentCaptions;
            o.jwGetSafeRegion = l.getSafeRegion;
            o.jwForceState = l.forceState;
            o.jwReleaseState = l.releaseState;
            o.jwGetPlaylistIndex = j("item");
            o.jwGetPosition = j("position");
            o.jwGetDuration = j("duration");
            o.jwGetBuffer = j("buffer");
            o.jwGetWidth = j("width");
            o.jwGetHeight = j("height");
            o.jwGetFullscreen = j("fullscreen");
            o.jwGetVolume = j("volume");
            o.jwGetMute = j("mute");
            o.jwGetState = j("state");
            o.jwGetStretching = j("stretching");
            o.jwGetPlaylist = g;
            o.jwGetControls = j("controls");
            o.jwDetachMedia = m.detachMedia;
            o.jwAttachMedia = m.attachMedia;
            o.jwPlayAd = function(s) {
                var r = c(o.id).plugins;
                if (r.vast) {
                    r.vast.jwPlayAd(s)
                }
            };
            o.jwPauseAd = function() {
                var r = c(o.id).plugins;
                if (r.googima) {
                    r.googima.jwPauseAd()
                }
            };
            o.jwDestroyGoogima = function() {
                var r = c(o.id).plugins;
                if (r.googima) {
                    r.googima.jwDestroyGoogima()
                }
            };
            o.jwInitInstream = function() {
                o.jwInstreamDestroy();
                e = new b.instream(o, p, l, m);
                e.init()
            };
            o.jwLoadItemInstream = function(s, r) {
                if (!e) {
                    throw "Instream player undefined"
                }
                e.load(s, r)
            };
            o.jwLoadArrayInstream = function(s, r) {
                if (!e) {
                    throw "Instream player undefined"
                }
                e.load(s, r)
            };
            o.jwSetControls = function(r) {
                l.setControls(r);
                if (e) {
                    e.setControls(r)
                }
            };
            o.jwInstreamPlay = function() {
                if (e) {
                    e.jwInstreamPlay()
                }
            };
            o.jwInstreamPause = function() {
                if (e) {
                    e.jwInstreamPause()
                }
            };
            o.jwInstreamState = function() {
                if (e) {
                    return e.jwInstreamState()
                }
                return ""
            };
            o.jwInstreamDestroy = function(r, s) {
                s = s || e;
                if (s) {
                    s.jwInstreamDestroy(r || false);
                    if (s === e) {
                        e = undefined
                    }
                }
            };
            o.jwInstreamAddEventListener = function(r, s) {
                if (e) {
                    e.jwInstreamAddEventListener(r, s)
                }
            };
            o.jwInstreamRemoveEventListener = function(r, s) {
                if (e) {
                    e.jwInstreamRemoveEventListener(r, s)
                }
            };
            o.jwPlayerDestroy = function() {
                if (m) {
                    m.stop()
                }
                if (l) {
                    l.destroy()
                }
                if (p) {
                    p.destroy()
                }
                if (n) {
                    n.resetEventListeners();
                    n.destroy()
                }
            };
            o.jwInstreamSetText = function(r) {
                if (e) {
                    e.jwInstreamSetText(r)
                }
            };
            o.jwIsBeforePlay = function() {
                return m.checkBeforePlay()
            };
            o.jwIsBeforeComplete = function() {
                return p.getVideo().checkComplete()
            };
            o.jwSetCues = l.addCues;
            o.jwAddEventListener = m.addEventListener;
            o.jwRemoveEventListener = m.removeEventListener;
            o.jwDockAddButton = l.addButton;
            o.jwDockRemoveButton = l.removeButton
        }

        function j(r) {
            return function() {
                return p[r]
            }
        }
        q()
    }
})(window.jwplayer);
(function(c) {
    var a = "#FFFFFF",
        b = "#CCCCCC",
        g = "#333333",
        e = "#999999",
        d = {
            size: 180,
            backgroundcolor: g,
            fontcolor: e,
            overcolor: b,
            activecolor: b,
            titlecolor: b,
            titleovercolor: a,
            titleactivecolor: a,
            fontweight: "normal",
            titleweight: "normal",
            fontsize: 11,
            titlesize: 13
        },
        f = c.html5,
        l = c.events,
        j = c.utils,
        h = j.css,
        i = j.isMobile(),
        k = ".jwplaylist";
    f.playlistcomponent = function(E, P) {
        var I = E,
            x = I.skin,
            o = j.extend({}, d, I.skin.getComponentSettings("playlist"), P),
            J, y, m, q, w = -1,
            z, p, r = 76,
            s = {
                background: undefined,
                divider: undefined,
                item: undefined,
                itemOver: undefined,
                itemImage: undefined,
                itemActive: undefined
            },
            v, K = this;
        K.element = function() {
            return J
        };
        K.redraw = function() {
            if (p) {
                p.redraw()
            }
        };
        K.show = function() {
            j.show(J)
        };
        K.hide = function() {
            j.hide(J)
        };

        function u() {
            J = N("div", "jwplaylist");
            J.id = I.id + "_jwplayer_playlistcomponent";
            v = (I._model.playlistlayout === "basic");
            y = N("div", "jwlistcontainer");
            O(J, y);
            M();
            if (v) {
                r = 32
            }
            if (s.divider) {
                r += s.divider.height
            }
            C();
            I.jwAddEventListener(l.JWPLAYER_PLAYLIST_LOADED, F);
            I.jwAddEventListener(l.JWPLAYER_PLAYLIST_ITEM, H);
            I.jwAddEventListener(l.JWPLAYER_RESIZE, n)
        }

        function n() {
            K.redraw()
        }

        function t(Q) {
            return "#" + J.id + (Q ? " ." + Q : "")
        }

        function C() {
            var T = 0,
                S = 0,
                Q = 0;
            j.clearCss(t());
            h(t(), {
                "background-color": o.backgroundcolor
            });
            h(t("jwlist"), {
                "background-image": s.background ? " url(" + s.background.src + ")" : ""
            });
            h(t("jwlist *"), {
                color: o.fontcolor,
                font: o.fontweight + " " + o.fontsize + "px Arial, Helvetica, sans-serif"
            });
            if (s.itemImage) {
                T = (r - s.itemImage.height) / 2 + "px ";
                S = s.itemImage.width;
                Q = s.itemImage.height
            } else {
                S = r * 4 / 3;
                Q = r
            }
            if (s.divider) {
                h(t("jwplaylistdivider"), {
                    "background-image": "url(" + s.divider.src + ")",
                    "background-size": "100% " + s.divider.height + "px",
                    width: "100%",
                    height: s.divider.height
                })
            }
            h(t("jwplaylistimg"), {
                height: Q,
                width: S,
                margin: T ? (T + "0 " + T + T) : "0 5px 0 0"
            });
            h(t("jwlist li"), {
                "background-image": s.item ? "url(" + s.item.src + ")" : "",
                height: r,
                overflow: "hidden",
                "background-size": "100% " + r + "px",
                cursor: "pointer"
            });
            var R = {
                overflow: "hidden"
            };
            if (o.activecolor !== "") {
                R.color = o.activecolor
            }
            if (s.itemActive) {
                R["background-image"] = "url(" + s.itemActive.src + ")"
            }
            h(t("jwlist li.active"), R);
            h(t("jwlist li.active .jwtitle"), {
                color: o.titleactivecolor
            });
            h(t("jwlist li.active .jwdescription"), {
                color: o.activecolor
            });
            var U = {
                overflow: "hidden"
            };
            if (o.overcolor !== "") {
                U.color = o.overcolor
            }
            if (s.itemOver) {
                U["background-image"] = "url(" + s.itemOver.src + ")"
            }
            if (!i) {
                h(t("jwlist li:hover"), U);
                h(t("jwlist li:hover .jwtitle"), {
                    color: o.titleovercolor
                });
                h(t("jwlist li:hover .jwdescription"), {
                    color: o.overcolor
                })
            }
            h(t("jwtextwrapper"), {
                height: r,
                position: "relative"
            });
            h(t("jwtitle"), {
                overflow: "hidden",
                display: "inline-block",
                height: v ? r : 20,
                color: o.titlecolor,
                "font-size": o.titlesize,
                "font-weight": o.titleweight,
                "margin-top": v ? "0 10px" : 10,
                "margin-left": 10,
                "margin-right": 10,
                "line-height": v ? r : 20
            });
            h(t("jwdescription"), {
                display: "block",
                "font-size": o.fontsize,
                "line-height": 18,
                "margin-left": 10,
                "margin-right": 10,
                overflow: "hidden",
                height: 36,
                position: "relative"
            })
        }

        function B() {
            var Q = N("ul", "jwlist");
            Q.id = J.id + "_ul" + Math.round(Math.random() * 10000000);
            return Q
        }

        function D(U) {
            var Z = m[U],
                Y = N("li", "jwitem"),
                R;
            Y.id = q.id + "_item_" + U;
            if (U > 0) {
                R = N("div", "jwplaylistdivider");
                O(Y, R)
            } else {
                var S = s.divider ? s.divider.height : 0;
                Y.style.height = (r - S) + "px";
                Y.style["background-size"] = "100% " + (r - S) + "px"
            }
            var V = N("div", "jwplaylistimg jwfill");
            var X;
            if (Z["playlist.image"] && s.itemImage) {
                X = Z["playlist.image"]
            } else {
                if (Z.image && s.itemImage) {
                    X = Z.image
                } else {
                    if (s.itemImage) {
                        X = s.itemImage.src
                    }
                }
            }
            if (X && !v) {
                h("#" + Y.id + " .jwplaylistimg", {
                    "background-image": X
                });
                O(Y, V)
            }
            var Q = N("div", "jwtextwrapper");
            var W = N("span", "jwtitle");
            W.innerHTML = (Z && Z.title) ? Z.title : "";
            O(Q, W);
            if (Z.description && !v) {
                var T = N("span", "jwdescription");
                T.innerHTML = Z.description;
                O(Q, T)
            }
            O(Y, Q);
            return Y
        }

        function N(R, Q) {
            var S = document.createElement(R);
            if (Q) {
                S.className = Q
            }
            return S
        }

        function O(Q, R) {
            Q.appendChild(R)
        }

        function F() {
            y.innerHTML = "";
            m = G();
            if (!m) {
                return
            }
            q = B();
            for (var R = 0; R < m.length; R++) {
                var Q = D(R);
                if (i) {
                    var S = new j.touch(Q);
                    S.addEventListener(j.touchEvents.TAP, L(R))
                } else {
                    Q.onclick = L(R)
                }
                O(q, Q)
            }
            w = I.jwGetPlaylistIndex();
            O(y, q);
            p = new f.playlistslider(J.id + "_slider", I.skin, J, q)
        }

        function G() {
            var R = I.jwGetPlaylist();
            var S = [];
            for (var Q = 0; Q < R.length; Q++) {
                if (!R[Q]["ova.hidden"]) {
                    S.push(R[Q])
                }
            }
            return S
        }

        function L(Q) {
            return function() {
                z = Q;
                I.jwPlaylistItem(Q);
                I.jwPlay(true)
            }
        }

        function A() {
            var Q = I.jwGetPlaylistIndex();
            if (Q === z) {
                return
            }
            z = -1;
            if (p && p.visible()) {
                p.thumbPosition(Q / (I.jwGetPlaylist().length - 1))
            }
        }

        function H(Q) {
            if (w >= 0) {
                document.getElementById(q.id + "_item_" + w).className = "jwitem";
                w = Q.index
            }
            document.getElementById(q.id + "_item_" + Q.index).className = "jwitem active";
            A()
        }

        function M() {
            j.foreach(s, function(Q) {
                s[Q] = x.getSkinElement("playlist", Q)
            })
        }
        u();
        return this
    };
    h(k, {
        position: "absolute",
        width: "100%",
        height: "100%"
    });
    j.dragStyle(k, "none");
    h(k + " .jwplaylistimg", {
        position: "relative",
        width: "100%",
        "float": "left",
        margin: "0 5px 0 0",
        background: "#000",
        overflow: "hidden"
    });
    h(k + " .jwlist", {
        position: "absolute",
        width: "100%",
        "list-style": "none",
        margin: 0,
        padding: 0,
        overflow: "hidden"
    });
    h(k + " .jwlistcontainer", {
        position: "absolute",
        overflow: "hidden",
        width: "100%",
        height: "100%"
    });
    h(k + " .jwlist li", {
        width: "100%"
    });
    h(k + " .jwtextwrapper", {
        overflow: "hidden"
    });
    h(k + " .jwplaylistdivider", {
        position: "absolute"
    });
    if (i) {
        j.transitionStyle(k + " .jwlist", "top .35s")
    }
})(jwplayer);
(function(i) {
    var r = jwplayer.utils,
        n = r.touchEvents,
        m = r.css,
        a = "jwslider",
        p = "jwslidertop",
        g = "jwsliderbottom",
        e = "jwrail",
        q = "jwrailtop",
        o = "jwrailback",
        l = "jwrailbottom",
        b = "jwthumb",
        u = "jwthumbtop",
        h = "jwthumbback",
        t = "jwthumbbottom",
        d = document,
        s = window,
        v, f = "absolute",
        j = "hidden",
        k = "100%";
    i.playlistslider = function(U, M, I, Y) {
        var N = M,
            Z = Y,
            ag, D, ad, R, ah = 0,
            V, ae, B = r.isMobile(),
            aj, ak = true,
            E, Q, ac, y, ab, w, F, P, T, af, K;
        this.element = function() {
            return ag
        };
        this.visible = function() {
            return ak
        };

        function H() {
            var am, al;
            ag = ai(a, null, I);
            ag.id = U;
            aj = new r.touch(Z);
            if (B) {
                aj.addEventListener(n.DRAG, X)
            } else {
                ag.addEventListener("mousedown", C, false);
                ag.addEventListener("click", aa, false)
            }
            O();
            T = E.height;
            af = Q.height;
            m(W(), {
                width: ac.width
            });
            m(W(e), {
                top: T,
                bottom: af
            });
            m(W(b), {
                top: T
            });
            am = ai(p, E, ag);
            al = ai(g, Q, ag);
            D = ai(e, null, ag);
            ad = ai(b, null, ag);
            if (!B) {
                am.addEventListener("mousedown", x(-1), false);
                al.addEventListener("mousedown", x(1), false)
            }
            ai(q, y, D);
            ai(o, ac, D, true);
            ai(l, ab, D);
            m(W(o), {
                top: y.height,
                bottom: ab.height
            });
            ai(u, F, ad);
            ai(h, w, ad, true);
            ai(t, P, ad);
            m(W(h), {
                top: F.height,
                bottom: P.height
            });
            J();
            if (Z) {
                if (!B) {
                    Z.addEventListener("mousewheel", A, false);
                    Z.addEventListener("DOMMouseScroll", A, false)
                }
            }
        }

        function W(al) {
            return "#" + ag.id + (al ? " ." + al : "")
        }

        function ai(ao, an, am, al) {
            var ap = d.createElement("div");
            if (ao) {
                ap.className = ao;
                if (an) {
                    m(W(ao), {
                        "background-image": an.src ? an.src : v,
                        "background-repeat": al ? "repeat-y" : "no-repeat",
                        height: al ? v : an.height
                    })
                }
            }
            if (am) {
                am.appendChild(ap)
            }
            return ap
        }

        function O() {
            E = G("sliderCapTop");
            Q = G("sliderCapBottom");
            ac = G("sliderRail");
            y = G("sliderRailCapTop");
            ab = G("sliderRailCapBottom");
            w = G("sliderThumb");
            F = G("sliderThumbCapTop");
            P = G("sliderThumbCapBottom")
        }

        function G(al) {
            var am = N.getSkinElement("playlist", al);
            return am ? am : {
                width: 0,
                height: 0,
                src: v
            }
        }
        var J = this.redraw = function() {
            clearTimeout(K);
            K = setTimeout(function() {
                if (Z && Z.clientHeight) {
                    S(Z.parentNode.clientHeight / Z.clientHeight)
                } else {
                    K = setTimeout(J, 10)
                }
            }, 0)
        };

        function A(al) {
            if (!ak) {
                return
            }
            al = al ? al : s.event;
            var am = al.detail ? al.detail * -1 : al.wheelDelta / 40;
            L(ah - am / 10);
            if (al.stopPropagation) {
                al.stopPropagation()
            }
            if (al.preventDefault) {
                al.preventDefault()
            } else {
                al.returnValue = false
            }
            al.cancelBubble = true;
            al.cancel = true;
            return false
        }

        function S(al) {
            if (al < 0) {
                al = 0
            }
            if (al > 1) {
                ak = false
            } else {
                ak = true;
                m(W(b), {
                    height: Math.max(D.clientHeight * al, F.height + P.height)
                })
            }
            m(W(), {
                visibility: ak ? "visible" : j
            });
            if (Z) {
                Z.style.width = ak ? Z.parentElement.clientWidth - ac.width + "px" : ""
            }
        }
        var L = this.thumbPosition = function(al) {
            if (isNaN(al)) {
                al = 0
            }
            ah = Math.max(0, Math.min(1, al));
            m(W(b), {
                top: T + (D.clientHeight - ad.clientHeight) * ah
            });
            if (Y) {
                Y.style.top = Math.min(0, ag.clientHeight - Y.scrollHeight) * ah + "px"
            }
        };

        function C(al) {
            if (al.button === 0) {
                R = true
            }
            d.onselectstart = function() {
                return false
            };
            s.addEventListener("mousemove", aa, false);
            s.addEventListener("mouseup", z, false)
        }

        function X(al) {
            L(ah - (al.deltaY * 2 / Z.clientHeight))
        }

        function aa(al) {
            if (R || al.type === "click") {
                var aq = r.bounds(D),
                    an = ad.clientHeight / 2,
                    am = aq.height - an,
                    ap = al.pageY - aq.top,
                    ao = (ap - an) / (am - an);
                L(ao)
            }
        }

        function x(al) {
            return function(am) {
                if (am.button > 0) {
                    return
                }
                L(ah + (al * 0.05));
                V = setTimeout(function() {
                    ae = setInterval(function() {
                        L(ah + (al * 0.05))
                    }, 50)
                }, 500)
            }
        }

        function z() {
            R = false;
            s.removeEventListener("mousemove", aa);
            s.removeEventListener("mouseup", z);
            d.onselectstart = v;
            clearTimeout(V);
            clearInterval(ae)
        }
        H();
        return this
    };

    function c() {
        var w = [],
            x;
        for (x = 0; x < arguments.length; x++) {
            w.push(".jwplaylist ." + arguments[x])
        }
        return w.join(",")
    }
    m(c(a), {
        position: f,
        height: k,
        visibility: j,
        right: 0,
        top: 0,
        cursor: "pointer",
        "z-index": 1,
        overflow: j
    });
    m(c(a) + " *", {
        position: f,
        width: k,
        "background-position": "center",
        "background-size": k + " " + k,
        overflow: j
    });
    m(c(p, q, u), {
        top: 0
    });
    m(c(g, l, t), {
        bottom: 0
    })
})(jwplayer.html5);
(function(e) {
    var k = jwplayer.utils,
        i = k.css,
        a = "About Xyanua Player",
        l = "http://xyanua.com",
        j = document,
        h = ".jwclick",
        g = h + "_item",
        f = "100%",
        d = "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset",
        b = "none",
        c = "#FFF";
    e.rightclick = function(q, o) {
        return false;
		var w = q,
            p, v = k.extend({
                aboutlink: l,
                abouttext: a
            }, o),
            m = false,
            x, r;

        function u() {
            p = j.getElementById(w.id);
            x = s(h);
            x.id = w.id + "_menu";
            x.style.display = b;
            p.oncontextmenu = n;
            x.onmouseover = function() {
                m = true
            };
            x.onmouseout = function() {
                m = false
            };
            j.addEventListener("mousedown", y, false);
            r = s(g);
            r.innerHTML = v.abouttext;
            r.onclick = t;
            x.appendChild(r);
            p.appendChild(x)
        }

        function s(z) {
            var A = j.createElement("div");
            A.className = z.replace(".", "");
            return A
        }

        function t() {
            window.open(v.aboutlink, "_blank")
        }

        function n(A) {
            var C, z, B;
            if (m) {
                return
            }
            A = A || window.event;
            C = A.target || A.srcElement;
            z = k.bounds(p);
            B = k.bounds(C);
            x.style.display = b;
            x.style.left = (A.offsetX ? A.offsetX : A.layerX) + B.left - z.left + "px";
            x.style.top = (A.offsetY ? A.offsetY : A.layerY) + B.top - z.top + "px";
            x.style.display = "block";
            A.preventDefault()
        }

        function y() {
            if (m) {
                return
            } else {
                x.style.display = b
            }
        }
        this.element = function() {
            return x
        };
        this.destroy = function() {
            j.removeEventListener("mousedown", y, false)
        };
        u()
    };
    i(h, {
        height: "auto",
        "font-family": "'MS Sans Serif', 'Geneva', sans-serif",
        "font-size": 10,
        width: 320,
        position: "absolute",
        "z-index": 999
    }, true);
    i(h + " div", {
        padding: "8px 21px",
        margin: "0px",
        "background-color": "rgba(63,222,0,0.3)",
        border: "none",
        "font-family": "'MS Sans Serif', 'Geneva', sans-serif",
        "font-size": 10,
		"font-weight": "bold",
        color: "#FAFAFA"
    }, true);
    i(g, {
        padding: "8px 21px",
        "text-align": "left",
        cursor: "pointer"
    }, true);
    i(g + ":hover", {
        "background-color": "rgba(63,222,0,0.5)",
        color: "#FAFAFA"
    }, true);
    i(g + " a", {
        "text-decoration": b,
        color: "#FAFAFA"
    }, true);
    i(h + " hr", {
        width: f,
        padding: 0,
        margin: 0
    }, true)
})(jwplayer.html5);
(function(d) {
    var b = d.html5,
        a = d.utils,
        c = d._,
        e = d.events;
    b.setup = function(k, v) {
        var x = k,
            h = v,
            q, p = new e.eventdispatcher(),
            l = false;
        var F = {
                method: g,
                depends: []
            },
            j = {
                method: E,
                depends: [F]
            },
            D = {
                method: o,
                depends: [F]
            },
            B = {
                method: C,
                depends: [D, j]
            },
            r = {
                method: w,
                depends: [B, D]
            },
            A = {
                method: t,
                depends: [r]
            };
        var m = [F, j, D, B, r, A];
        this.start = function() {
            c.defer(u)
        };

        function u() {
            if (this.cancelled) {
                return
            }
            for (var H = 0; H < m.length; H++) {
                var G = m[H];
                if (z(G.depends)) {
                    m.splice(H, 1);
                    G.method();
                    c.defer(u)
                }
            }
        }

        function z(G) {
            return c.all(c.map(G, c.property("complete")))
        }

        function f(G) {
            G.complete = true;
            if (m.length > 0 && !l) {
                c.defer(u)
            }
        }

        function g() {
            if (k.edition && k.edition() === "invalid") {
                n("Error setting up player: Invalid license key")
            } else {
                f(F)
            }
        }

        function E() {
            q = new b.skin();
            q.load(x.config.skin, s, y)
        }

        function s() {
            f(j)
        }

        function y(G) {
            n("Error loading skin: " + G)
        }

        function o() {
            var G = a.typeOf(x.config.playlist);
            if (G === "array") {
                i(new d.playlist(x.config.playlist))
            } else {
                n("Playlist type not supported: " + G)
            }
        }

        function i(G) {
            x.setPlaylist(G);
            if (x.playlist.length === 0 || x.playlist[0].sources.length === 0) {
                n("Error loading playlist: No playable sources found")
            } else {
                f(D)
            }
        }

        function C() {
            h.setup(q);
            f(B)
        }

        function w() {
            f(r)
        }

        function t() {
            if (this.cancelled) {
                return
            }
            p.sendEvent(e.JWPLAYER_READY);
            f(A)
        }

        function n(G) {
            l = true;
            p.sendEvent(e.JWPLAYER_ERROR, {
                message: G
            });
            h.setupError(G)
        }
        this.destroy = function() {
            this.cancelled = true
        };
        a.extend(this, p)
    }
})(jwplayer);
(function(a) {
    a.skin = function() {
        var b = {};
        var d = false;
        this.load = function(g, f, e) {
            new a.skinloader(g, function(h) {
                d = true;
                b = h;
                if (typeof f === "function") {
                    f()
                }
            }, function(h) {
                if (typeof e === "function") {
                    e(h)
                }
            })
        };
        this.getSkinElement = function(e, f) {
            e = c(e);
            f = c(f);
            if (d) {
                try {
                    return b[e].elements[f]
                } catch (g) {
                    jwplayer.utils.log("No such skin component / element: ", [e, f])
                }
            }
            return null
        };
        this.getComponentSettings = function(e) {
            e = c(e);
            if (d && b && b[e]) {
                return b[e].settings
            }
            return null
        };
        this.getComponentLayout = function(e) {
            e = c(e);
            if (d) {
                var f = b[e].layout;
                if (f && (f.left || f.right || f.center)) {
                    return b[e].layout
                }
            }
            return null
        };

        function c(e) {
            return e.toLowerCase()
        }
    }
})(jwplayer.html5);
(function(b) {
    var a = jwplayer.utils,
        c = "Skin formatting error";
    b.skinloader = function(e, j, g) {
        var h = {},
            l = j,
            r = g,
            p = true,
            s = e,
            f = false,
            u = jwplayer.utils.isMobile() ? 1 : 1,
            t = 1;

        function w() {
            if (typeof s !== "string" || s === "") {
                v(b.defaultskin())
            } else {
                if (a.extension(s) !== "xml") {
                    r("Skin not a valid file type");
                    return
                }
                new b.skinloader("", m, r)
            }
        }

        function m(x) {
            h = x;
            a.ajax(a.getAbsolutePath(s), function(y) {
                try {
                    if (a.exists(y.responseXML)) {
                        v(y.responseXML)
                    }
                } catch (z) {
                    r(c)
                }
            }, function(y) {
                r(y)
            })
        }

        function k(x, y) {
            return x ? x.getElementsByTagName(y) : null
        }

        function v(D) {
            var C = k(D, "skin")[0],
                L = k(C, "component"),
                W = C.getAttribute("target"),
                G = parseFloat(C.getAttribute("pixelratio"));
            if (G > 0) {
                t = G
            }
            if (!a.versionCheck(W)) {
                r("Incompatible player version")
            }
            if (L.length === 0) {
                l(h);
                return
            }
            for (var O = 0; O < L.length; O++) {
                var J = i(L[O].getAttribute("name")),
                    I = {
                        settings: {},
                        elements: {},
                        layout: {}
                    },
                    N = k(k(L[O], "elements")[0], "element");
                h[J] = I;
                for (var M = 0; M < N.length; M++) {
                    n(N[M], J)
                }
                var E = k(L[O], "settings")[0];
                if (E && E.childNodes.length > 0) {
                    var Q = k(E, "setting");
                    for (var V = 0; V < Q.length; V++) {
                        var X = Q[V].getAttribute("name");
                        var P = Q[V].getAttribute("value");
                        if (/color$/.test(X)) {
                            P = a.stringToColor(P)
                        }
                        I.settings[i(X)] = P
                    }
                }
                var R = k(L[O], "layout")[0];
                if (R && R.childNodes.length > 0) {
                    var S = k(R, "group");
                    for (var A = 0; A < S.length; A++) {
                        var H = S[A],
                            F = {
                                elements: []
                            };
                        I.layout[i(H.getAttribute("position"))] = F;
                        for (var U = 0; U < H.attributes.length; U++) {
                            var K = H.attributes[U];
                            F[K.name] = K.value
                        }
                        var T = k(H, "*");
                        for (var z = 0; z < T.length; z++) {
                            var y = T[z];
                            F.elements.push({
                                type: y.tagName
                            });
                            for (var B = 0; B < y.attributes.length; B++) {
                                var x = y.attributes[B];
                                F.elements[z][i(x.name)] = x.value
                            }
                            if (!a.exists(F.elements[z].name)) {
                                F.elements[z].name = y.tagName
                            }
                        }
                    }
                }
                p = false;
                d()
            }
        }

        function n(C, B) {
            B = i(B);
            var A = new Image(),
                x = i(C.getAttribute("name")),
                z = C.getAttribute("src"),
                E;
            if (z.indexOf("data:image/png;base64,") === 0) {
                E = z
            } else {
                var y = a.getAbsolutePath(s);
                var D = y.substr(0, y.lastIndexOf("/"));
                E = [D, B, z].join("/")
            }
            h[B].elements[x] = {
                height: 0,
                width: 0,
                src: "",
                ready: false,
                image: A
            };
            A.onload = function() {
                o(A, x, B)
            };
            A.onerror = function() {
                f = true;
                r("Skin image not found: " + this.src)
            };
            A.src = E
        }

        function d() {
            var z = true;
            for (var x in h) {
                if (x !== "properties" && h.hasOwnProperty(x)) {
                    var A = h[x].elements;
                    for (var y in A) {
                        if (A.hasOwnProperty(y)) {
                            z &= q(x, y).ready
                        }
                    }
                }
            }
            if (!z) {
                return
            }
            if (!p) {
                l(h)
            }
        }

        function o(y, A, z) {
            var x = q(z, A);
            if (x) {
                x.height = Math.round((y.height / t) * u);
                x.width = Math.round((y.width / t) * u);
                x.src = y.src;
                x.ready = true;
                d()
            } else {
                a.log("Loaded an image for a missing element: " + z + "." + A)
            }
        }

        function q(x, y) {
            return h[i(x)] ? h[i(x)].elements[i(y)] : null
        }

        function i(x) {
            return x ? x.toLowerCase() : ""
        }
        w()
    }
})(jwplayer.html5);
(function(c) {
    var b = c.html5,
        a = c.utils,
        d = c.events,
        e = a.css;
    b.thumbs = function(g) {
        var n, j, p, t, o = g,
            k, i = {},
            m, h = new d.eventdispatcher();
        a.extend(this, h);
        n = document.createElement("div");
        n.id = o;

        function s(u) {
            e.style(n, {
                display: "none"
            });
            if (t) {
                t.onload = null;
                t.onreadystatechange = null;
                t.onerror = null;
                if (t.abort) {
                    t.abort()
                }
                t = null
            }
            if (m) {
                m.onload = null
            }
            if (u) {
                p = u.split("?")[0].split("/").slice(0, -1).join("/");
                t = a.ajax(u, q, r, true)
            } else {
                j = k = m = null;
                i = {}
            }
        }

        function q(u) {
            t = null;
            try {
                u = new c.parsers.srt().parse(u.responseText, true)
            } catch (v) {
                r(v.message);
                return
            }
            if (a.typeOf(u) !== "array") {
                return r("Invalid data")
            }
            j = u
        }

        function r(u) {
            t = null;
            a.log("Thumbnails could not be loaded: " + u)
        }

        function f(v, A) {
            if (v && v !== k) {
                k = v;
                if (v.indexOf("://") < 0) {
                    v = p ? p + "/" + v : v
                }
                var x = {
                    display: "block",
                    margin: "0 auto",
                    "background-position": "0 0",
                    width: 0,
                    height: 0
                };
                var w = v.indexOf("#xywh");
                if (w > 0) {
                    try {
                        var u = (/(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/).exec(v);
                        v = u[1];
                        x["background-position"] = (u[2] * -1) + "px " + (u[3] * -1) + "px";
                        x.width = u[4];
                        x.height = u[5]
                    } catch (z) {
                        r("Could not parse thumbnail");
                        return
                    }
                }
                var y = i[v];
                if (!y) {
                    y = new Image();
                    y.onload = function() {
                        l(y, x, A)
                    };
                    i[v] = y;
                    y.src = v
                } else {
                    l(y, x, A)
                }
                if (m) {
                    m.onload = null
                }
                m = y
            }
        }

        function l(v, u, w) {
            v.onload = null;
            if (!u.width) {
                u.width = v.width;
                u.height = v.height
            }
            u["background-image"] = v.src;
            e.style(n, u);
            if (w) {
                w(u.width)
            }
        }
        this.load = function(u) {
            s(u)
        };
        this.element = function() {
            return n
        };
        this.updateTimeline = function(w, x) {
            if (!j) {
                return
            }
            var v = 0;
            while (v < j.length && w > j[v].end) {
                v++
            }
            if (v === j.length) {
                v--
            }
            var u = j[v].text;
            f(u, x);
            return u
        }
    }
})(jwplayer);
(function(k) {
    var p = k.jwplayer,
        l = p.html5,
        y = p.utils,
        c = p.events,
        i = c.state,
        s = y.css,
        t = y.bounds,
        w = y.isMobile(),
        g = y.isIPad(),
        B = y.isIPod(),
        q = "jwplayer",
        e = "aspectMode",
        d = "." + q + ".jwfullscreen",
        r = "jwmain",
        A = "jwinstream",
        z = "jwvideo",
        f = "jwcontrols",
        b = "jwaspect",
        h = "jwplaylistcontainer",
        x = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"],
        v = "opacity .25s ease",
        o = "100%",
        j = "absolute",
        u = " !important",
        m = "hidden",
        a = "none",
        n = "block";
    l.view = function(aR, E) {
        var a5, a9, aY, Z, Q, a0 = -1,
            aH = w ? 4000 : 2000,
            av, at, Y, ae, aG, J, X, aD = false,
            a2, af, bf, aE, L, az = y.extend({}, E.componentConfig("logo")),
            aZ, N, aM, ao = false,
            ap = false,
            R = null,
            ax, an, a8 = -1,
            O = false,
            ar, H, ac, be = false,
            aF = false,
            U = y.extend(this, new c.eventdispatcher());

        function aS() {
            a5 = a4("div", q + " playlist-" + E.playlistposition);
            a5.id = aR.id;
            a5.tabIndex = 0;
            H = a5.requestFullscreen || a5.webkitRequestFullscreen || a5.webkitRequestFullScreen || a5.mozRequestFullScreen || a5.msRequestFullscreen;
            ac = document.exitFullscreen || document.webkitExitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen;
            be = H && ac;
            if (E.aspectratio) {
                s.style(a5, {
                    display: "inline-block"
                });
                a5.className = a5.className.replace(q, q + " " + e)
            }
            var bl = document.getElementById(aR.id);
            bl.parentNode.replaceChild(a5, bl)
        }

        function bh(bm) {
            var bl = y.between(E.position + bm, 0, this.getDuration());
            this.seek(bl)
        }

        function bk(bl) {
            var bm = y.between(this.getVolume() + bl, 0, 100);
            this.setVolume(bm)
        }

        function aT(bl) {
            if (bl.ctrlKey || bl.metaKey) {
                return false
            }
            if (!E.controls) {
                return false
            }
            return true
        }

        function M(bl) {
            if (!aT(bl)) {
                return true
            }
            if (!a2.adMode()) {
                G();
                aB()
            }
            var bn = p(aR.id);
            switch (bl.keyCode) {
                case 27:
                    bn.setFullscreen(false);
                    break;
                case 13:
                case 32:
                    bn.play();
                    break;
                case 37:
                    if (!a2.adMode()) {
                        bh.call(bn, -5)
                    }
                    break;
                case 39:
                    if (!a2.adMode()) {
                        bh.call(bn, 5)
                    }
                    break;
                case 38:
                    bk.call(bn, 10);
                    break;
                case 40:
                    bk.call(bn, -10);
                    break;
                case 77:
                    bn.setMute();
                    break;
                case 70:
                    if (!E.getVideo().isAudioFile()) {
                        bn.setFullscreen()
                    }
                    break;
                default:
                    if (bl.keyCode >= 48 && bl.keyCode <= 59) {
                        var bo = bl.keyCode - 48;
                        var bm = (bo / 10) * bn.getDuration();
                        bn.seek(bm)
                    }
                    break
            }
            if (/13|32|37|38|39|40/.test(bl.keyCode)) {
                bl.preventDefault();
                return false
            }
        }

        function aU() {
            aF = true;
            U.sendEvent(c.JWPLAYER_VIEW_TAB_FOCUS, {
                hasFocus: false
            })
        }

        function I() {
            var bl = !aF;
            aF = false;
            if (bl) {
                U.sendEvent(c.JWPLAYER_VIEW_TAB_FOCUS, {
                    hasFocus: true
                })
            }
            if (!a2.adMode()) {
                G();
                aB()
            }
        }

        function aA() {
            aF = false;
            U.sendEvent(c.JWPLAYER_VIEW_TAB_FOCUS, {
                hasFocus: false
            })
        }
        this.getCurrentCaptions = function() {
            return aZ.getCurrentCaptions()
        };
        this.setCurrentCaptions = function(bl) {
            aZ.setCurrentCaptions(bl)
        };
        this.getCaptionsList = function() {
            return aZ.getCaptionsList()
        };

        function aQ() {
            var bl = t(a5),
                bn = Math.round(bl.width),
                bm = Math.round(bl.height);
            if (!document.body.contains(a5)) {
                k.removeEventListener("resize", aQ);
                if (w) {
                    k.removeEventListener("orientationchange", aQ)
                }
            } else {
                if (bn && bm) {
                    if (bn !== at || bm !== Y) {
                        at = bn;
                        Y = bm;
                        if (af) {
                            af.redraw()
                        }
                        clearTimeout(a8);
                        a8 = setTimeout(al, 50);
                        U.sendEvent(c.JWPLAYER_RESIZE, {
                            width: bn,
                            height: bm
                        })
                    }
                }
            }
            return bl
        }
        this.setup = function(bo) {
            if (ao) {
                return
            }
            aR.skin = bo;
            a9 = a4("span", r);
            a9.id = aR.id + "_view";
            av = a4("span", z);
            av.id = aR.id + "_media";
            aY = a4("span", f);
            ae = a4("span", A);
            Q = a4("span", h);
            Z = a4("span", b);
            T();
            a9.appendChild(av);
            a9.appendChild(aY);
            a9.appendChild(ae);
            a5.appendChild(a9);
            a5.appendChild(Z);
            a5.appendChild(Q);
            E.getVideo().setContainer(av);
            E.addEventListener("fullscreenchange", F);
            for (var bn = x.length; bn--;) {
                document.addEventListener(x[bn], F, false)
            }
            k.removeEventListener("resize", aQ);
            k.addEventListener("resize", aQ, false);
            if (w) {
                k.removeEventListener("orientationchange", aQ);
                k.addEventListener("orientationchange", aQ, false)
            }
            p(aR.id).onAdPlay(function() {
                a2.adMode(true);
                ad(i.PLAYING);
                aB()
            });
            p(aR.id).onAdSkipped(function() {
                a2.adMode(false)
            });
            p(aR.id).onAdComplete(function() {
                a2.adMode(false)
            });
            p(aR.id).onAdError(function() {
                a2.adMode(false)
            });
            aR.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, P);
            aR.jwAddEventListener(c.JWPLAYER_MEDIA_ERROR, aV);
            aR.jwAddEventListener(c.JWPLAYER_PLAYLIST_COMPLETE, a3);
            aR.jwAddEventListener(c.JWPLAYER_PLAYLIST_ITEM, ag);
            aR.jwAddEventListener(c.JWPLAYER_CAST_AVAILABLE, function() {
                if (y.canCast()) {
                    U.forceControls(true)
                } else {
                    U.releaseControls()
                }
            });
            aR.jwAddEventListener(c.JWPLAYER_CAST_SESSION, function(bp) {
                if (!bf) {
                    bf = new p.html5.castDisplay(aR.id);
                    bf.statusDelegate = function(bq) {
                        bf.setState(bq.newstate)
                    }
                }
                if (bp.active) {
                    s.style(aZ.element(), {
                        display: "none"
                    });
                    U.forceControls(true);
                    bf.setState("connecting").setName(bp.deviceName).show();
                    aR.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, bf.statusDelegate);
                    aR.jwAddEventListener(c.JWPLAYER_CAST_AD_CHANGED, bi)
                } else {
                    aR.jwRemoveEventListener(c.JWPLAYER_PLAYER_STATE, bf.statusDelegate);
                    aR.jwRemoveEventListener(c.JWPLAYER_CAST_AD_CHANGED, bi);
                    bf.hide();
                    if (a2.adMode()) {
                        aL()
                    }
                    s.style(aZ.element(), {
                        display: null
                    });
                    P({
                        newstate: aR.jwGetState()
                    });
                    aQ()
                }
            });
            P({
                newstate: i.IDLE
            });
            if (!w) {
                aY.addEventListener("mouseout", aq, false);
                aY.addEventListener("mousemove", ba, false);
                if (y.isMSIE()) {
                    av.addEventListener("mousemove", ba, false);
                    av.addEventListener("click", af.clickHandler)
                }
            }
            aa(a2);
            aa(aE);
            aa(L);
            s("#" + a5.id + "." + e + " ." + b, {
                "margin-top": E.aspectratio,
                display: n
            });
            var bl = y.exists(E.aspectratio) ? parseFloat(E.aspectratio) : 100,
                bm = E.playlistsize;
            s("#" + a5.id + ".playlist-right ." + b, {
                "margin-bottom": -1 * bm * (bl / 100) + "px"
            });
            s("#" + a5.id + ".playlist-right ." + h, {
                width: bm + "px",
                right: 0,
                top: 0,
                height: "100%"
            });
            s("#" + a5.id + ".playlist-bottom ." + b, {
                "padding-bottom": bm + "px"
            });
            s("#" + a5.id + ".playlist-bottom ." + h, {
                width: "100%",
                height: bm + "px",
                bottom: 0
            });
            s("#" + a5.id + ".playlist-right ." + r, {
                right: bm + "px"
            });
            s("#" + a5.id + ".playlist-bottom ." + r, {
                bottom: bm + "px"
            });
            setTimeout(function() {
                S(E.width, E.height)
            }, 0)
        };

        function aa(bl) {
            if (bl) {
                bl.element().addEventListener("mousemove", ah, false);
                bl.element().addEventListener("mouseout", bb, false)
            }
        }

        function aK() {}

        function aq() {
            clearTimeout(a0);
            a0 = setTimeout(bd, aH)
        }

        function a4(bm, bl) {
            var bn = document.createElement(bm);
            if (bl) {
                bn.className = bl
            }
            return bn
        }

        function am() {
            if (w) {
                if (ap) {
                    bd()
                } else {
                    aj()
                }
            } else {
                P({
                    newstate: aR.jwGetState()
                })
            }
            if (ap) {
                aB()
            }
        }

        function aB() {
            clearTimeout(a0);
            a0 = setTimeout(bd, aH)
        }

        function ba() {
            clearTimeout(a0);
            var bl = aR.jwGetState();
            if (bl === i.PLAYING || bl === i.PAUSED || aD) {
                aj();
                if (!O) {
                    a0 = setTimeout(bd, aH)
                }
            }
        }

        function ah() {
            clearTimeout(a0);
            O = true
        }

        function bb() {
            O = false
        }

        function aN(bl) {
            U.sendEvent(bl.type, bl)
        }

        function T() {
            var bm = E.componentConfig("controlbar"),
                bl = E.componentConfig("display");
            aZ = new l.captions(aR, E.captions);
            aZ.addEventListener(c.JWPLAYER_CAPTIONS_LIST, aN);
            aZ.addEventListener(c.JWPLAYER_CAPTIONS_CHANGED, aN);
            aZ.addEventListener(c.JWPLAYER_CAPTIONS_LOADED, aK);
            aY.appendChild(aZ.element());
            af = new l.display(aR, bl);
            af.addEventListener(c.JWPLAYER_DISPLAY_CLICK, function(bn) {
                aN(bn);
                am()
            });
            aY.appendChild(af.element());
            L = new l.logo(aR, az);
            aY.appendChild(L.element());
            aE = new l.dock(aR, E.componentConfig("dock"));
            aY.appendChild(aE.element());
            if (aR.edition && !w) {
                an = new l.rightclick(aR, {
                    abouttext: E.abouttext,
                    aboutlink: E.aboutlink
                })
            } else {
                if (!w) {
                    an = new l.rightclick(aR, {})
                }
            }
            if (E.playlistsize && E.playlistposition && E.playlistposition !== a) {
                N = new l.playlistcomponent(aR, {});
                Q.appendChild(N.element())
            }
            a2 = new l.controlbar(aR, bm);
            a2.addEventListener(c.JWPLAYER_USER_ACTION, aB);
            aY.appendChild(a2.element());
            if (B) {
                aO()
            }
            if (y.canCast()) {
                U.forceControls(true)
            }
            a5.onmousedown = aU;
            a5.onfocusin = I;
            a5.addEventListener("focus", I);
            a5.onfocusout = aA;
            a5.addEventListener("blur", aA);
            a5.addEventListener("keydown", M)
        }

        function bi(bl) {
            if (bl.done) {
                aL();
                return
            }
            if (!bl.complete) {
                if (!a2.adMode()) {
                    aP()
                }
                a2.setText(bl.message);
                var bn = bl.onClick;
                if (bn !== undefined) {
                    af.setAlternateClickHandler(function() {
                        bn(bl)
                    })
                }
                var bm = bl.onSkipAd;
                if (bm !== undefined && bf) {
                    bf.setSkipoffset(bl, bl.onSkipAd)
                }
            }
            if (bf) {
                bf.adChanged(bl)
            }
        }

        function aP() {
            a2.instreamMode(true);
            a2.adMode(true);
            a2.show(true)
        }

        function aL() {
            a2.setText("");
            a2.adMode(false);
            a2.instreamMode(false);
            a2.show(true);
            if (bf) {
                bf.adsEnded();
                bf.setState(aR.jwGetState())
            }
            af.revertAlternateClickHandler()
        }
        var aw = this.fullscreen = function(bl) {
            if (!y.exists(bl)) {
                bl = !E.fullscreen
            }
            bl = !!bl;
            if (bl === E.fullscreen) {
                return
            }
            if (be) {
                if (bl) {
                    H.apply(a5)
                } else {
                    ac.apply(document)
                }
                aJ(a5, bl)
            } else {
                if (y.isIE()) {
                    aJ(a5, bl)
                } else {
                    if (X) {
                        X.getVideo().setFullScreen(bl)
                    }
                    E.getVideo().setFullScreen(bl)
                }
            }
        };

        function bc(bl) {
            if (bl) {
                bl.redraw()
            }
        }

        function S(bm, bt, bq) {
            var bp = a5.className,
                bu, bo, bs, bn, br, bl = aR.id + "_view";
            s.block(bl);
            bq = !!bq;
            if (bq) {
                bp = bp.replace(/\s*aspectMode/, "");
                if (a5.className !== bp) {
                    a5.className = bp
                }
                s.style(a5, {
                    display: n
                }, bq)
            }
            if (y.exists(bm) && y.exists(bt)) {
                E.width = bm;
                E.height = bt
            }
            bu = {
                width: bm
            };
            if (bp.indexOf(e) === -1) {
                bu.height = bt
            }
            s.style(a5, bu, true);
            if (af) {
                af.redraw()
            }
            if (a2) {
                a2.redraw(true)
            }
            if (L) {
                L.offset(a2 && L.position().indexOf("bottom") >= 0 ? a2.height() + a2.margin() : 0);
                setTimeout(function() {
                    if (aE) {
                        aE.offset(L.position() === "top-left" ? L.element().clientWidth + L.margin() : 0)
                    }
                }, 500)
            }
            ab(bt);
            bn = E.playlistsize;
            br = E.playlistposition;
            if (N && bn && (br === "right" || br === "bottom")) {
                N.redraw();
                bo = {
                    display: n
                };
                bs = {};
                bo[br] = 0;
                bs[br] = bn;
                if (br === "right") {
                    bo.width = bn
                } else {
                    bo.height = bn
                }
                s.style(Q, bo);
                s.style(a9, bs)
            }
            al(bm, bt);
            s.unblock(bl)
        }

        function ab(bl) {
            aM = ai(bl);
            if (a2) {
                if (aM) {
                    a2.audioMode(true);
                    aj();
                    af.hidePreview(true);
                    C();
                    a6(false)
                } else {
                    a2.audioMode(false);
                    ad(aR.jwGetState())
                }
            }
            if (L && aM) {
                D()
            }
            a5.style.backgroundColor = aM ? "transparent" : "#000"
        }

        function ai(bl) {
            if (E.aspectratio) {
                return false
            }
            if (p._.isNumber(bl)) {
                return aI(bl)
            }
            if (p._.isString(bl) && bl.indexOf("%") > -1) {
                return false
            }
            var bm = t(a5);
            return aI(bm.height)
        }

        function aI(bl) {
            if (!bl) {
                return false
            }
            if (E.playlistposition === "bottom") {
                bl -= E.playlistsize
            }
            return bl <= 66
        }

        function al(bm, bl) {
            if (!bm || isNaN(Number(bm))) {
                if (!av) {
                    return
                }
                bm = av.clientWidth
            }
            if (!bl || isNaN(Number(bl))) {
                if (!av) {
                    return
                }
                bl = av.clientHeight
            }
            if (y.isMSIE(9) && document.all && !k.atob) {
                bm = bl = "100%"
            }
            var bn = E.getVideo().resize(bm, bl, E.stretching);
            if (bn) {
                clearTimeout(a8);
                a8 = setTimeout(al, 250)
            }
        }
        this.resize = function(bn, bl) {
            var bm = true;
            S(bn, bl, bm);
            aQ()
        };
        this.resizeMedia = al;
        var ay = this.completeSetup = function() {
            s.style(a5, {
                opacity: 1
            });
            k.addEventListener("beforeunload", function() {
                if (!bj()) {
                    aR.jwStop()
                }
            })
        };

        function W() {
            if (be) {
                var bl = document.fullscreenElement || document.webkitCurrentFullScreenElement || document.mozFullScreenElement || document.msFullscreenElement;
                return !!(bl && bl.id === aR.id)
            }
            return aD ? X.getVideo().getFullScreen() : E.getVideo().getFullScreen()
        }

        function F(bm) {
            var bl = (bm.jwstate !== undefined) ? bm.jwstate : W();
            if (be) {
                aJ(a5, bl)
            } else {
                aW(bl)
            }
        }

        function aJ(bm, bl) {
            y.removeClass(bm, "jwfullscreen");
            if (bl) {
                y.addClass(bm, "jwfullscreen");
                s.style(document.body, {
                    "overflow-y": m
                });
                aB()
            } else {
                s.style(document.body, {
                    "overflow-y": ""
                })
            }
            bc(a2);
            bc(af);
            bc(aE);
            al();
            aW(bl)
        }

        function aW(bl) {
            E.setFullscreen(bl);
            if (X) {
                X.setFullscreen(bl)
            }
            if (bl) {
                clearTimeout(a8);
                a8 = setTimeout(al, 200)
            } else {
                if (g && aR.jwGetState() === i.PAUSED) {
                    setTimeout(ak, 500)
                }
            }
        }

        function G() {
            if (a2 && E.controls) {
                if (aD) {
                    aG.show()
                } else {
                    a2.show()
                }
            }
        }

        function aO() {
            if (R === true) {
                return
            }
            if (a2 && !aM && !E.getVideo().isAudioFile()) {
                if (aD) {
                    aG.hide()
                }
                a2.hide()
            }
        }

        function V() {
            if (aE && !aM && E.controls) {
                aE.show()
            }
        }

        function au() {
            if (aE && !ax && !E.getVideo().isAudioFile()) {
                aE.hide()
            }
        }

        function aX() {
            if (L && !aM) {
                L.show()
            }
        }

        function D() {
            if (L && (!E.getVideo().isAudioFile() || aM)) {
                L.hide(aM)
            }
        }

        function ak() {
            if (af && E.controls && !aM) {
                if (!B || aR.jwGetState() === i.IDLE) {
                    af.show()
                }
            }
            if (!(w && E.fullscreen)) {
                E.getVideo().setControls(false)
            }
        }

        function C() {
            if (af) {
                af.hide()
            }
        }

        function bd() {
            clearTimeout(a0);
            if (R === true) {
                return
            }
            ap = false;
            var bl = aR.jwGetState();
            if (!E.controls || bl !== i.PAUSED) {
                aO()
            }
            if (!E.controls) {
                au()
            }
            if (bl !== i.IDLE && bl !== i.PAUSED) {
                au();
                D()
            }
            y.addClass(a5, "jw-user-inactive")
        }

        function aj() {
            if (R === false) {
                return
            }
            ap = true;
            if (E.controls || aM) {
                G();
                V()
            }
            if (az.hide) {
                aX()
            }
            y.removeClass(a5, "jw-user-inactive")
        }

        function a6(bl) {
            bl = bl && !aM;
            E.getVideo().setVisibility(bl)
        }

        function a3() {
            ax = true;
            aw(false);
            if (E.controls) {
                V()
            }
        }

        function ag() {
            if (bf) {
                bf.setState(aR.jwGetState())
            }
        }
        var a1;

        function P(bl) {
            ax = false;
            clearTimeout(a1);
            a1 = setTimeout(function() {
                ad(bl.newstate)
            }, 100)
        }

        function aV() {
            aO()
        }

        function K() {
            var bl = aD ? X : E;
            return bl.getVideo().isAudioFile()
        }

        function bj() {
            return E.getVideo().isCaster
        }

        function ad(bl) {
            ar = bl;
            if (bj()) {
                if (af) {
                    af.show();
                    af.hidePreview(false)
                }
                s.style(av, {
                    visibility: "visible",
                    opacity: 1
                });
                if (a2) {
                    a2.show();
                    a2.hideFullscreen(true)
                }
                return
            }
            switch (bl) {
                case i.PLAYING:
                    if (E.getVideo().isCaster !== true) {
                        R = null
                    } else {
                        R = true
                    }
                    if (K()) {
                        a6(false);
                        af.hidePreview(aM);
                        af.setHiding(true);
                        if (a2) {
                            aj();
                            a2.hideFullscreen(true)
                        }
                        V()
                    } else {
                        a6(true);
                        al();
                        af.hidePreview(true);
                        if (a2) {
                            a2.hideFullscreen(!E.getVideo().supportsFullscreen())
                        }
                    }
                    break;
                case i.IDLE:
                    a6(false);
                    if (!aM) {
                        af.hidePreview(false);
                        ak();
                        V();
                        if (a2) {
                            a2.hideFullscreen(false)
                        }
                    }
                    break;
                case i.BUFFERING:
                    ak();
                    bd();
                    if (w) {
                        a6(true)
                    }
                    break;
                case i.PAUSED:
                    ak();
                    aj();
                    break
            }
            aX()
        }

        function aC(bl) {
            return "#" + aR.id + (bl ? " ." + bl : "")
        }
        this.setupInstream = function(bm, bl, bo, bn) {
            s.unblock();
            bg(aC(A), true);
            bg(aC(f), false);
            ae.appendChild(bm);
            aG = bl;
            J = bo;
            X = bn;
            P({
                newstate: i.PLAYING
            });
            aD = true;
            ae.addEventListener("mousemove", ba);
            ae.addEventListener("mouseout", aq)
        };
        this.destroyInstream = function() {
            s.unblock();
            bg(aC(A), false);
            bg(aC(f), true);
            ae.innerHTML = "";
            ae.removeEventListener("mousemove", ba);
            ae.removeEventListener("mouseout", aq);
            aD = false
        };
        this.setupError = function(bl) {
            ao = true;
            p.embed.errorScreen(a5, bl, E);
            ay()
        };

        function bg(bl, bm) {
            s(bl, {
                display: bm ? n : a
            })
        }
        this.addButton = function(bn, bl, bm, bo) {
            if (aE) {
                aE.addButton(bn, bl, bm, bo);
                if (aR.jwGetState() === i.IDLE) {
                    V()
                }
            }
        };
        this.removeButton = function(bl) {
            if (aE) {
                aE.removeButton(bl)
            }
        };
        this.setControls = function(bm) {
            var bl = !!bm;
            if (bl === E.controls) {
                return
            }
            E.controls = bl;
            if (aD) {
                a7(!bm)
            } else {
                if (bl) {
                    P({
                        newstate: aR.jwGetState()
                    })
                }
            }
            if (!bl) {
                bd();
                C()
            }
            U.sendEvent(c.JWPLAYER_CONTROLS, {
                controls: bl
            })
        };
        this.forceControls = function(bl) {
            R = !!bl;
            if (bl) {
                aj()
            } else {
                bd()
            }
        };
        this.releaseControls = function() {
            R = null;
            ad(aR.jwGetState())
        };

        function a7(bl) {
            if (bl) {
                aG.hide();
                J.hide()
            } else {
                aG.show();
                J.show()
            }
        }
        this.addCues = function(bl) {
            if (a2) {
                a2.addCues(bl)
            }
        };
        this.forceState = function(bl) {
            af.forceState(bl)
        };
        this.releaseState = function() {
            af.releaseState(aR.jwGetState())
        };
        this.getSafeRegion = function(bm) {
            var bl = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            bm = bm || !y.exists(bm);
            a2.showTemp();
            aE.showTemp();
            var bt = t(a9),
                bo = bt.top,
                br = aD ? t(document.getElementById(aR.id + "_instream_controlbar")) : t(a2.element()),
                bn = aD ? false : (aE.numButtons() > 0),
                bs = (L.position().indexOf("top") === 0),
                bq, bp = t(L.element());
            if (bn && E.controls) {
                bq = t(aE.element());
                bl.y = Math.max(0, bq.bottom - bo)
            }
            if (bs) {
                bl.y = Math.max(bl.y, bp.bottom - bo)
            }
            bl.width = bt.width;
            if (br.height && bm && E.controls) {
                bl.height = (bs ? br.top : bp.top) - bo - bl.y
            } else {
                bl.height = bt.height - bl.y
            }
            a2.hideTemp();
            aE.hideTemp();
            return bl
        };
        this.destroy = function() {
            k.removeEventListener("resize", aQ);
            k.removeEventListener("orientationchange", aQ);
            for (var bl = x.length; bl--;) {
                document.removeEventListener(x[bl], F, false)
            }
            E.removeEventListener("fullscreenchange", F);
            a5.removeEventListener("keydown", M, false);
            if (an) {
                an.destroy()
            }
            if (bf) {
                aR.jwRemoveEventListener(c.JWPLAYER_PLAYER_STATE, bf.statusDelegate);
                bf.destroy();
                bf = null
            }
            if (aY) {
                aY.removeEventListener("mousemove", ba);
                aY.removeEventListener("mouseout", aq)
            }
            if (av) {
                av.removeEventListener("mousemove", ba);
                av.removeEventListener("click", af.clickHandler)
            }
            if (aD) {
                this.destroyInstream()
            }
        };
        aS()
    };
    s("." + q, {
        position: "relative",
        display: "block",
        opacity: 0,
        "min-height": 0,
        "-webkit-transition": v,
        "-moz-transition": v,
        "-o-transition": v
    });
    s("." + r, {
        position: j,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        "-webkit-transition": v,
        "-moz-transition": v,
        "-o-transition": v
    });
    s("." + z + ", ." + f, {
        position: j,
        height: o,
        width: o,
        "-webkit-transition": v,
        "-moz-transition": v,
        "-o-transition": v
    });
    s("." + z, {
        overflow: m,
        visibility: m,
        opacity: 0
    });
    s("." + z + " video", {
        background: "transparent",
        height: o,
        width: o,
        position: "absolute",
        margin: "auto",
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    });
    s("." + h, {
        position: j,
        height: o,
        width: o,
        display: a
    });
    s("." + A, {
        position: j,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "none"
    });
    s("." + b, {
        display: "none"
    });
    s("." + q + "." + e, {
        height: "auto"
    });
    s(d, {
        width: o,
        height: o,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        "z-index": 1000,
        margin: 0,
        position: "fixed"
    }, true);
    s(d + ".jw-user-inactive", {
        cursor: "none",
        "-webkit-cursor-visibility": "auto-hide"
    });
    s(d + " ." + r, {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }, true);
    s(d + " ." + h, {
        display: a
    }, true);
    s("." + q + " .jwuniform", {
        "background-size": "contain" + u
    });
    s("." + q + " .jwfill", {
        "background-size": "cover" + u,
        "background-position": "center"
    });
    s("." + q + " .jwnone", {
        "background-repeat": "repeat"
    });
    s("." + q + " .jwexactfit", {
        "background-size": o + " " + o + u
    })
})(window);