/*"Script for the tool "Color Picker"*/

(function(h, k, j) {
    function r(a) {
        if (h.event && h.event.contentOverflow !== j) return {
            x: h.event.offsetX,
            y: h.event.offsetY
        };
        if (a.offsetX !== j && a.offsetY !== j) return {
            x: a.offsetX,
            y: a.offsetY
        };
        var b = a.target.parentNode.parentNode;
        return {
            x: a.layerX - b.offsetLeft,
            y: a.layerY - b.offsetTop
        }
    }

    function e(a, b, c) {
        a = k.createElementNS(v, a);
        for (var d in b) a.setAttribute(d, b[d]);
        if (Object.prototype.toString.call(c) != "[object Array]") c = [c];
        b = 0;
        for (d = c[0] && c.length || 0; b < d; b++) a.appendChild(c[b]);
        return a
    }

    function l(a, b, c) {
        var d,
            f, g;
        a = a % 360 / 60;
        g = c * b;
        f = g * (1 - Math.abs(a % 2 - 1));
        d = b = c -= g;
        a = ~~a;
        d += [g, f, 0, 0, f, g][a];
        b += [f, g, g, f, 0, 0][a];
        c += [0, 0, f, g, g, f][a];
        a = d * 255;
        b *= 255;
        c *= 255;
        return {
            r: a,
            g: b,
            b: c,
            hex: "#" + (16777216 | c | b << 8 | a << 16).toString(16).slice(1)
        }
    }

    function s(a, b, c) {
        if (a > 1 || b > 1 || c > 1) {
            a /= 255;
            b /= 255;
            c /= 255
        }
        var d, f;
        d = Math.max(a, b, c);
        f = d - Math.min(a, b, c);
        return {
            h: (f == 0 ? null : d == a ? (b - c) / f : d == b ? (c - a) / f + 2 : (a - b) / f + 4) % 6 * 60,
            s: f == 0 ? 0 : f / d,
            v: d
        }
    }

    function t(a, b, c) {
        return function(d) {
            d = d || h.event;
            d = r(d);
            a.h = d.y / b.offsetHeight * 360 + o;
            var f = l(a.h, 1,
                1);
            c.style.backgroundColor = f.hex;
            a.callback && a.callback(f.hex, {
                h: a.h - o,
                s: a.s,
                v: a.v
            }, {
                r: f.r,
                g: f.g,
                b: f.b
            }, j, d)
        }
    }

    function u(a, b) {
        return function(c) {
            c = c || h.event;
            c = r(c);
            var d = b.offsetHeight;
            a.s = c.x / b.offsetWidth;
            a.v = (d - c.y) / d;
            d = l(a.h, a.s, a.v);
            a.callback && a.callback(d.hex, {
                h: a.h - o,
                s: a.s,
                v: a.v
            }, {
                r: d.r,
                g: d.g,
                b: d.b
            }, c)
        }
    }

    function i(a, b, c) {
        if (!(this instanceof i)) return new i(a, b, c);
        this.callback = c;
        this.h = 0;
        this.v = this.s = 1;
        this.pickerElement = b;
        this.slideElement = a;
        if (p == "SVG") {
            a.appendChild(m.cloneNode(true));
            b.appendChild(n.cloneNode(true))
        } else {
            a.innerHTML = m;
            b.innerHTML = n
        }
        if (a.attachEvent) {
            a.attachEvent("onclick", t(this, a, b));
            b.attachEvent("onclick", u(this, b))
        } else if (a.addEventListener) {
            a.addEventListener("mousedown", t(this, a, b), false);
            b.addEventListener("mousedown", u(this, b), false)
        }
    }

    function q(a, b, c, d) {
        a.h = b.h % 360;
        a.s = b.s;
        a.v = b.v;
        b = l(a.h, a.s, a.v);
        var f = {
                y: a.h * a.slideElement.offsetHeight / 360,
                x: 0
            },
            g = a.pickerElement.offsetHeight;
        g = {
            x: a.s * a.pickerElement.offsetWidth,
            y: g - a.v * g
        };
        a.pickerElement.style.backgroundColor =
            l(a.h, 1, 1).hex;
        a.callback && a.callback(d || b.hex, {
            h: a.h,
            s: a.s,
            v: a.v
        }, c || {
            r: b.r,
            g: b.g,
            b: b.b
        }, g, f)
    }
    var p = h.SVGAngle || k.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML",
        n, m, o = 15,
        v = "http://www.w3.org/2000/svg";
    if (p == "SVG") {
        m = e("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            version: "1.1",
            width: "100%",
            height: "100%"
        }, [e("defs", {}, e("linearGradient", {
            id: "gradient-hsv",
            x1: "0%",
            y1: "100%",
            x2: "0%",
            y2: "0%"
        }, [e("stop", {
                offset: "0%",
                "stop-color": "#FF0000",
                "stop-opacity": "1"
            }),
            e("stop", {
                offset: "13%",
                "stop-color": "#FF00FF",
                "stop-opacity": "1"
            }), e("stop", {
                offset: "25%",
                "stop-color": "#8000FF",
                "stop-opacity": "1"
            }), e("stop", {
                offset: "38%",
                "stop-color": "#0040FF",
                "stop-opacity": "1"
            }), e("stop", {
                offset: "50%",
                "stop-color": "#00FFFF",
                "stop-opacity": "1"
            }), e("stop", {
                offset: "63%",
                "stop-color": "#00FF40",
                "stop-opacity": "1"
            }), e("stop", {
                offset: "75%",
                "stop-color": "#0BED00",
                "stop-opacity": "1"
            }), e("stop", {
                offset: "88%",
                "stop-color": "#FFFF00",
                "stop-opacity": "1"
            }), e("stop", {
                offset: "100%",
                "stop-color": "#FF0000",
                "stop-opacity": "1"
            })
        ])), e("rect", {
            x: "0",
            y: "0",
            width: "100%",
            height: "100%",
            fill: "url(#gradient-hsv)"
        })]);
        n = e("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            version: "1.1",
            width: "100%",
            height: "100%"
        }, [e("defs", {}, [e("linearGradient", {
            id: "gradient-black",
            x1: "0%",
            y1: "100%",
            x2: "0%",
            y2: "0%"
        }, [e("stop", {
            offset: "0%",
            "stop-color": "#000000",
            "stop-opacity": "1"
        }), e("stop", {
            offset: "100%",
            "stop-color": "#CC9A81",
            "stop-opacity": "0"
        })]), e("linearGradient", {
            id: "gradient-white",
            x1: "0%",
            y1: "100%",
            x2: "100%",
            y2: "100%"
        }, [e("stop", {
            offset: "0%",
            "stop-color": "#FFFFFF",
            "stop-opacity": "1"
        }), e("stop", {
            offset: "100%",
            "stop-color": "#CC9A81",
            "stop-opacity": "0"
        })])]), e("rect", {
            x: "0",
            y: "0",
            width: "100%",
            height: "100%",
            fill: "url(#gradient-white)"
        }), e("rect", {
            x: "0",
            y: "0",
            width: "100%",
            height: "100%",
            fill: "url(#gradient-black)"
        })])
    } else if (p == "VML") {
        m = '<DIV style="position: relative; width: 100%; height: 100%"><v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t"><v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill></v:rect></DIV>';
        n = '<DIV style="position: relative; width: 100%; height: 100%"><v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t"><v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill></v:rect><v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t"><v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill></v:rect></DIV>';
        k.namespaces.v || k.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML")
    }
    i.prototype.setHsv = function(a) {
        q(this, a)
    };
    i.prototype.setRgb = function(a) {
        q(this, s(a.r, a.g, a.b), a)
    };
    i.prototype.setHex = function(a) {
        q(this, s(parseInt(a.substr(1, 2), 16), parseInt(a.substr(3, 2), 16), parseInt(a.substr(5, 2), 16)), j, a)
    };
    i.positionIndicators = function(a, b, c, d) {
        if (c) {
            b.style.left = "auto";
            b.style.right = "0px";
            b.style.top = "0px";
            a.style.top = c.y - a.offsetHeight / 2 + "px"
        }
        if (d) {
            b.style.top = d.y - b.offsetHeight / 2 + "px";
            b.style.left =
                d.x - b.offsetWidth / 2 + "px"
        }
    };
    h.ColorPicker = i
})(window, window.document);