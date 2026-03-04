var fa = Object.defineProperty;
var da = (n, r, s) => r in n ? fa(n, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: s
}) : n[r] = s;
var _1 = (n, r, s) => da(n, typeof r != "symbol" ? r + "" : r, s);
(function() {
    const r = document.createElement("link").relList;
    if (r && r.supports && r.supports("modulepreload"))
        return;
    for (const u of document.querySelectorAll('link[rel="modulepreload"]'))
        l(u);
    new MutationObserver(u => {
        for (const d of u)
            if (d.type === "childList")
                for (const f of d.addedNodes)
                    f.tagName === "LINK" && f.rel === "modulepreload" && l(f)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function s(u) {
        const d = {};
        return u.integrity && (d.integrity = u.integrity),
        u.referrerPolicy && (d.referrerPolicy = u.referrerPolicy),
        u.crossOrigin === "use-credentials" ? d.credentials = "include" : u.crossOrigin === "anonymous" ? d.credentials = "omit" : d.credentials = "same-origin",
        d
    }
    function l(u) {
        if (u.ep)
            return;
        u.ep = !0;
        const d = s(u);
        fetch(u.href, d)
    }
}
)();
function vs(n) {
    return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n
}
var f0 = {
    exports: {}
}
  , yn = {}
  , d0 = {
    exports: {}
}
  , d1 = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fi;
function Ca() {
    if (Fi)
        return d1;
    Fi = 1;
    var n = Symbol.for("react.element")
      , r = Symbol.for("react.portal")
      , s = Symbol.for("react.fragment")
      , l = Symbol.for("react.strict_mode")
      , u = Symbol.for("react.profiler")
      , d = Symbol.for("react.provider")
      , f = Symbol.for("react.context")
      , h = Symbol.for("react.forward_ref")
      , p = Symbol.for("react.suspense")
      , g = Symbol.for("react.memo")
      , y = Symbol.for("react.lazy")
      , v = Symbol.iterator;
    function w(S) {
        return S === null || typeof S != "object" ? null : (S = v && S[v] || S["@@iterator"],
        typeof S == "function" ? S : null)
    }
    var j = {
        isMounted: function() {
            return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    }
      , A = Object.assign
      , P = {};
    function _(S, Z, u1) {
        this.props = S,
        this.context = Z,
        this.refs = P,
        this.updater = u1 || j
    }
    _.prototype.isReactComponent = {},
    _.prototype.setState = function(S, Z) {
        if (typeof S != "object" && typeof S != "function" && S != null)
            throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, S, Z, "setState")
    }
    ,
    _.prototype.forceUpdate = function(S) {
        this.updater.enqueueForceUpdate(this, S, "forceUpdate")
    }
    ;
    function D() {}
    D.prototype = _.prototype;
    function V(S, Z, u1) {
        this.props = S,
        this.context = Z,
        this.refs = P,
        this.updater = u1 || j
    }
    var N = V.prototype = new D;
    N.constructor = V,
    A(N, _.prototype),
    N.isPureReactComponent = !0;
    var X = Array.isArray
      , $ = Object.prototype.hasOwnProperty
      , t1 = {
        current: null
    }
      , s1 = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
    function e1(S, Z, u1) {
        var c1, C1 = {}, a1 = null, x1 = null;
        if (Z != null)
            for (c1 in Z.ref !== void 0 && (x1 = Z.ref),
            Z.key !== void 0 && (a1 = "" + Z.key),
            Z)
                $.call(Z, c1) && !s1.hasOwnProperty(c1) && (C1[c1] = Z[c1]);
        var g1 = arguments.length - 2;
        if (g1 === 1)
            C1.children = u1;
        else if (1 < g1) {
            for (var k1 = Array(g1), ne = 0; ne < g1; ne++)
                k1[ne] = arguments[ne + 2];
            C1.children = k1
        }
        if (S && S.defaultProps)
            for (c1 in g1 = S.defaultProps,
            g1)
                C1[c1] === void 0 && (C1[c1] = g1[c1]);
        return {
            $$typeof: n,
            type: S,
            key: a1,
            ref: x1,
            props: C1,
            _owner: t1.current
        }
    }
    function y1(S, Z) {
        return {
            $$typeof: n,
            type: S.type,
            key: Z,
            ref: S.ref,
            props: S.props,
            _owner: S._owner
        }
    }
    function w1(S) {
        return typeof S == "object" && S !== null && S.$$typeof === n
    }
    function b1(S) {
        var Z = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + S.replace(/[=:]/g, function(u1) {
            return Z[u1]
        })
    }
    var H = /\/+/g;
    function n1(S, Z) {
        return typeof S == "object" && S !== null && S.key != null ? b1("" + S.key) : Z.toString(36)
    }
    function f1(S, Z, u1, c1, C1) {
        var a1 = typeof S;
        (a1 === "undefined" || a1 === "boolean") && (S = null);
        var x1 = !1;
        if (S === null)
            x1 = !0;
        else
            switch (a1) {
            case "string":
            case "number":
                x1 = !0;
                break;
            case "object":
                switch (S.$$typeof) {
                case n:
                case r:
                    x1 = !0
                }
            }
        if (x1)
            return x1 = S,
            C1 = C1(x1),
            S = c1 === "" ? "." + n1(x1, 0) : c1,
            X(C1) ? (u1 = "",
            S != null && (u1 = S.replace(H, "$&/") + "/"),
            f1(C1, Z, u1, "", function(ne) {
                return ne
            })) : C1 != null && (w1(C1) && (C1 = y1(C1, u1 + (!C1.key || x1 && x1.key === C1.key ? "" : ("" + C1.key).replace(H, "$&/") + "/") + S)),
            Z.push(C1)),
            1;
        if (x1 = 0,
        c1 = c1 === "" ? "." : c1 + ":",
        X(S))
            for (var g1 = 0; g1 < S.length; g1++) {
                a1 = S[g1];
                var k1 = c1 + n1(a1, g1);
                x1 += f1(a1, Z, u1, k1, C1)
            }
        else if (k1 = w(S),
        typeof k1 == "function")
            for (S = k1.call(S),
            g1 = 0; !(a1 = S.next()).done; )
                a1 = a1.value,
                k1 = c1 + n1(a1, g1++),
                x1 += f1(a1, Z, u1, k1, C1);
        else if (a1 === "object")
            throw Z = String(S),
            Error("Objects are not valid as a React child (found: " + (Z === "[object Object]" ? "object with keys {" + Object.keys(S).join(", ") + "}" : Z) + "). If you meant to render a collection of children, use an array instead.");
        return x1
    }
    function U(S, Z, u1) {
        if (S == null)
            return S;
        var c1 = []
          , C1 = 0;
        return f1(S, c1, "", "", function(a1) {
            return Z.call(u1, a1, C1++)
        }),
        c1
    }
    function p1(S) {
        if (S._status === -1) {
            var Z = S._result;
            Z = Z(),
            Z.then(function(u1) {
                (S._status === 0 || S._status === -1) && (S._status = 1,
                S._result = u1)
            }, function(u1) {
                (S._status === 0 || S._status === -1) && (S._status = 2,
                S._result = u1)
            }),
            S._status === -1 && (S._status = 0,
            S._result = Z)
        }
        if (S._status === 1)
            return S._result.default;
        throw S._result
    }
    var q = {
        current: null
    }
      , b = {
        transition: null
    }
      , K = {
        ReactCurrentDispatcher: q,
        ReactCurrentBatchConfig: b,
        ReactCurrentOwner: t1
    };
    function B() {
        throw Error("act(...) is not supported in production builds of React.")
    }
    return d1.Children = {
        map: U,
        forEach: function(S, Z, u1) {
            U(S, function() {
                Z.apply(this, arguments)
            }, u1)
        },
        count: function(S) {
            var Z = 0;
            return U(S, function() {
                Z++
            }),
            Z
        },
        toArray: function(S) {
            return U(S, function(Z) {
                return Z
            }) || []
        },
        only: function(S) {
            if (!w1(S))
                throw Error("React.Children.only expected to receive a single React element child.");
            return S
        }
    },
    d1.Component = _,
    d1.Fragment = s,
    d1.Profiler = u,
    d1.PureComponent = V,
    d1.StrictMode = l,
    d1.Suspense = p,
    d1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = K,
    d1.act = B,
    d1.cloneElement = function(S, Z, u1) {
        if (S == null)
            throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + S + ".");
        var c1 = A({}, S.props)
          , C1 = S.key
          , a1 = S.ref
          , x1 = S._owner;
        if (Z != null) {
            if (Z.ref !== void 0 && (a1 = Z.ref,
            x1 = t1.current),
            Z.key !== void 0 && (C1 = "" + Z.key),
            S.type && S.type.defaultProps)
                var g1 = S.type.defaultProps;
            for (k1 in Z)
                $.call(Z, k1) && !s1.hasOwnProperty(k1) && (c1[k1] = Z[k1] === void 0 && g1 !== void 0 ? g1[k1] : Z[k1])
        }
        var k1 = arguments.length - 2;
        if (k1 === 1)
            c1.children = u1;
        else if (1 < k1) {
            g1 = Array(k1);
            for (var ne = 0; ne < k1; ne++)
                g1[ne] = arguments[ne + 2];
            c1.children = g1
        }
        return {
            $$typeof: n,
            type: S.type,
            key: C1,
            ref: a1,
            props: c1,
            _owner: x1
        }
    }
    ,
    d1.createContext = function(S) {
        return S = {
            $$typeof: f,
            _currentValue: S,
            _currentValue2: S,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null
        },
        S.Provider = {
            $$typeof: d,
            _context: S
        },
        S.Consumer = S
    }
    ,
    d1.createElement = e1,
    d1.createFactory = function(S) {
        var Z = e1.bind(null, S);
        return Z.type = S,
        Z
    }
    ,
    d1.createRef = function() {
        return {
            current: null
        }
    }
    ,
    d1.forwardRef = function(S) {
        return {
            $$typeof: h,
            render: S
        }
    }
    ,
    d1.isValidElement = w1,
    d1.lazy = function(S) {
        return {
            $$typeof: y,
            _payload: {
                _status: -1,
                _result: S
            },
            _init: p1
        }
    }
    ,
    d1.memo = function(S, Z) {
        return {
            $$typeof: g,
            type: S,
            compare: Z === void 0 ? null : Z
        }
    }
    ,
    d1.startTransition = function(S) {
        var Z = b.transition;
        b.transition = {};
        try {
            S()
        } finally {
            b.transition = Z
        }
    }
    ,
    d1.unstable_act = B,
    d1.useCallback = function(S, Z) {
        return q.current.useCallback(S, Z)
    }
    ,
    d1.useContext = function(S) {
        return q.current.useContext(S)
    }
    ,
    d1.useDebugValue = function() {}
    ,
    d1.useDeferredValue = function(S) {
        return q.current.useDeferredValue(S)
    }
    ,
    d1.useEffect = function(S, Z) {
        return q.current.useEffect(S, Z)
    }
    ,
    d1.useId = function() {
        return q.current.useId()
    }
    ,
    d1.useImperativeHandle = function(S, Z, u1) {
        return q.current.useImperativeHandle(S, Z, u1)
    }
    ,
    d1.useInsertionEffect = function(S, Z) {
        return q.current.useInsertionEffect(S, Z)
    }
    ,
    d1.useLayoutEffect = function(S, Z) {
        return q.current.useLayoutEffect(S, Z)
    }
    ,
    d1.useMemo = function(S, Z) {
        return q.current.useMemo(S, Z)
    }
    ,
    d1.useReducer = function(S, Z, u1) {
        return q.current.useReducer(S, Z, u1)
    }
    ,
    d1.useRef = function(S) {
        return q.current.useRef(S)
    }
    ,
    d1.useState = function(S) {
        return q.current.useState(S)
    }
    ,
    d1.useSyncExternalStore = function(S, Z, u1) {
        return q.current.useSyncExternalStore(S, Z, u1)
    }
    ,
    d1.useTransition = function() {
        return q.current.useTransition()
    }
    ,
    d1.version = "18.3.1",
    d1
}
var Ni;
function o5() {
    return Ni || (Ni = 1,
    d0.exports = Ca()),
    d0.exports
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ii;
function ha() {
    if (Ii)
        return yn;
    Ii = 1;
    var n = o5()
      , r = Symbol.for("react.element")
      , s = Symbol.for("react.fragment")
      , l = Object.prototype.hasOwnProperty
      , u = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
      , d = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
    function f(h, p, g) {
        var y, v = {}, w = null, j = null;
        g !== void 0 && (w = "" + g),
        p.key !== void 0 && (w = "" + p.key),
        p.ref !== void 0 && (j = p.ref);
        for (y in p)
            l.call(p, y) && !d.hasOwnProperty(y) && (v[y] = p[y]);
        if (h && h.defaultProps)
            for (y in p = h.defaultProps,
            p)
                v[y] === void 0 && (v[y] = p[y]);
        return {
            $$typeof: r,
            type: h,
            key: w,
            ref: j,
            props: v,
            _owner: u.current
        }
    }
    return yn.Fragment = s,
    yn.jsx = f,
    yn.jsxs = f,
    yn
}
var bi;
function pa() {
    return bi || (bi = 1,
    f0.exports = ha()),
    f0.exports
}
var C = pa()
  , R = o5();
const wt = vs(R);
var K4 = {}
  , C0 = {
    exports: {}
}
  , fe = {}
  , h0 = {
    exports: {}
}
  , p0 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zi;
function ma() {
    return zi || (zi = 1,
    (function(n) {
        function r(b, K) {
            var B = b.length;
            b.push(K);
            e: for (; 0 < B; ) {
                var S = B - 1 >>> 1
                  , Z = b[S];
                if (0 < u(Z, K))
                    b[S] = K,
                    b[B] = Z,
                    B = S;
                else
                    break e
            }
        }
        function s(b) {
            return b.length === 0 ? null : b[0]
        }
        function l(b) {
            if (b.length === 0)
                return null;
            var K = b[0]
              , B = b.pop();
            if (B !== K) {
                b[0] = B;
                e: for (var S = 0, Z = b.length, u1 = Z >>> 1; S < u1; ) {
                    var c1 = 2 * (S + 1) - 1
                      , C1 = b[c1]
                      , a1 = c1 + 1
                      , x1 = b[a1];
                    if (0 > u(C1, B))
                        a1 < Z && 0 > u(x1, C1) ? (b[S] = x1,
                        b[a1] = B,
                        S = a1) : (b[S] = C1,
                        b[c1] = B,
                        S = c1);
                    else if (a1 < Z && 0 > u(x1, B))
                        b[S] = x1,
                        b[a1] = B,
                        S = a1;
                    else
                        break e
                }
            }
            return K
        }
        function u(b, K) {
            var B = b.sortIndex - K.sortIndex;
            return B !== 0 ? B : b.id - K.id
        }
        if (typeof performance == "object" && typeof performance.now == "function") {
            var d = performance;
            n.unstable_now = function() {
                return d.now()
            }
        } else {
            var f = Date
              , h = f.now();
            n.unstable_now = function() {
                return f.now() - h
            }
        }
        var p = []
          , g = []
          , y = 1
          , v = null
          , w = 3
          , j = !1
          , A = !1
          , P = !1
          , _ = typeof setTimeout == "function" ? setTimeout : null
          , D = typeof clearTimeout == "function" ? clearTimeout : null
          , V = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function N(b) {
            for (var K = s(g); K !== null; ) {
                if (K.callback === null)
                    l(g);
                else if (K.startTime <= b)
                    l(g),
                    K.sortIndex = K.expirationTime,
                    r(p, K);
                else
                    break;
                K = s(g)
            }
        }
        function X(b) {
            if (P = !1,
            N(b),
            !A)
                if (s(p) !== null)
                    A = !0,
                    p1($);
                else {
                    var K = s(g);
                    K !== null && q(X, K.startTime - b)
                }
        }
        function $(b, K) {
            A = !1,
            P && (P = !1,
            D(e1),
            e1 = -1),
            j = !0;
            var B = w;
            try {
                for (N(K),
                v = s(p); v !== null && (!(v.expirationTime > K) || b && !b1()); ) {
                    var S = v.callback;
                    if (typeof S == "function") {
                        v.callback = null,
                        w = v.priorityLevel;
                        var Z = S(v.expirationTime <= K);
                        K = n.unstable_now(),
                        typeof Z == "function" ? v.callback = Z : v === s(p) && l(p),
                        N(K)
                    } else
                        l(p);
                    v = s(p)
                }
                if (v !== null)
                    var u1 = !0;
                else {
                    var c1 = s(g);
                    c1 !== null && q(X, c1.startTime - K),
                    u1 = !1
                }
                return u1
            } finally {
                v = null,
                w = B,
                j = !1
            }
        }
        var t1 = !1
          , s1 = null
          , e1 = -1
          , y1 = 5
          , w1 = -1;
        function b1() {
            return !(n.unstable_now() - w1 < y1)
        }
        function H() {
            if (s1 !== null) {
                var b = n.unstable_now();
                w1 = b;
                var K = !0;
                try {
                    K = s1(!0, b)
                } finally {
                    K ? n1() : (t1 = !1,
                    s1 = null)
                }
            } else
                t1 = !1
        }
        var n1;
        if (typeof V == "function")
            n1 = function() {
                V(H)
            }
            ;
        else if (typeof MessageChannel < "u") {
            var f1 = new MessageChannel
              , U = f1.port2;
            f1.port1.onmessage = H,
            n1 = function() {
                U.postMessage(null)
            }
        } else
            n1 = function() {
                _(H, 0)
            }
            ;
        function p1(b) {
            s1 = b,
            t1 || (t1 = !0,
            n1())
        }
        function q(b, K) {
            e1 = _(function() {
                b(n.unstable_now())
            }, K)
        }
        n.unstable_IdlePriority = 5,
        n.unstable_ImmediatePriority = 1,
        n.unstable_LowPriority = 4,
        n.unstable_NormalPriority = 3,
        n.unstable_Profiling = null,
        n.unstable_UserBlockingPriority = 2,
        n.unstable_cancelCallback = function(b) {
            b.callback = null
        }
        ,
        n.unstable_continueExecution = function() {
            A || j || (A = !0,
            p1($))
        }
        ,
        n.unstable_forceFrameRate = function(b) {
            0 > b || 125 < b ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : y1 = 0 < b ? Math.floor(1e3 / b) : 5
        }
        ,
        n.unstable_getCurrentPriorityLevel = function() {
            return w
        }
        ,
        n.unstable_getFirstCallbackNode = function() {
            return s(p)
        }
        ,
        n.unstable_next = function(b) {
            switch (w) {
            case 1:
            case 2:
            case 3:
                var K = 3;
                break;
            default:
                K = w
            }
            var B = w;
            w = K;
            try {
                return b()
            } finally {
                w = B
            }
        }
        ,
        n.unstable_pauseExecution = function() {}
        ,
        n.unstable_requestPaint = function() {}
        ,
        n.unstable_runWithPriority = function(b, K) {
            switch (b) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                b = 3
            }
            var B = w;
            w = b;
            try {
                return K()
            } finally {
                w = B
            }
        }
        ,
        n.unstable_scheduleCallback = function(b, K, B) {
            var S = n.unstable_now();
            switch (typeof B == "object" && B !== null ? (B = B.delay,
            B = typeof B == "number" && 0 < B ? S + B : S) : B = S,
            b) {
            case 1:
                var Z = -1;
                break;
            case 2:
                Z = 250;
                break;
            case 5:
                Z = 1073741823;
                break;
            case 4:
                Z = 1e4;
                break;
            default:
                Z = 5e3
            }
            return Z = B + Z,
            b = {
                id: y++,
                callback: K,
                priorityLevel: b,
                startTime: B,
                expirationTime: Z,
                sortIndex: -1
            },
            B > S ? (b.sortIndex = B,
            r(g, b),
            s(p) === null && b === s(g) && (P ? (D(e1),
            e1 = -1) : P = !0,
            q(X, B - S))) : (b.sortIndex = Z,
            r(p, b),
            A || j || (A = !0,
            p1($))),
            b
        }
        ,
        n.unstable_shouldYield = b1,
        n.unstable_wrapCallback = function(b) {
            var K = w;
            return function() {
                var B = w;
                w = K;
                try {
                    return b.apply(this, arguments)
                } finally {
                    w = B
                }
            }
        }
    }
    )(p0)),
    p0
}
var Bi;
function ya() {
    return Bi || (Bi = 1,
    h0.exports = ma()),
    h0.exports
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ui;
function ga() {
    if (Ui)
        return fe;
    Ui = 1;
    var n = o5()
      , r = ya();
    function s(e) {
        for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, i = 1; i < arguments.length; i++)
            t += "&args[]=" + encodeURIComponent(arguments[i]);
        return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }
    var l = new Set
      , u = {};
    function d(e, t) {
        f(e, t),
        f(e + "Capture", t)
    }
    function f(e, t) {
        for (u[e] = t,
        e = 0; e < t.length; e++)
            l.add(t[e])
    }
    var h = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
      , p = Object.prototype.hasOwnProperty
      , g = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
      , y = {}
      , v = {};
    function w(e) {
        return p.call(v, e) ? !0 : p.call(y, e) ? !1 : g.test(e) ? v[e] = !0 : (y[e] = !0,
        !1)
    }
    function j(e, t, i, o) {
        if (i !== null && i.type === 0)
            return !1;
        switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return o ? !1 : i !== null ? !i.acceptsBooleans : (e = e.toLowerCase().slice(0, 5),
            e !== "data-" && e !== "aria-");
        default:
            return !1
        }
    }
    function A(e, t, i, o) {
        if (t === null || typeof t > "u" || j(e, t, i, o))
            return !0;
        if (o)
            return !1;
        if (i !== null)
            switch (i.type) {
            case 3:
                return !t;
            case 4:
                return t === !1;
            case 5:
                return isNaN(t);
            case 6:
                return isNaN(t) || 1 > t
            }
        return !1
    }
    function P(e, t, i, o, a, c, m) {
        this.acceptsBooleans = t === 2 || t === 3 || t === 4,
        this.attributeName = o,
        this.attributeNamespace = a,
        this.mustUseProperty = i,
        this.propertyName = e,
        this.type = t,
        this.sanitizeURL = c,
        this.removeEmptyString = m
    }
    var _ = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
        _[e] = new P(e,0,!1,e,null,!1,!1)
    }),
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
        var t = e[0];
        _[t] = new P(t,1,!1,e[1],null,!1,!1)
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
        _[e] = new P(e,2,!1,e.toLowerCase(),null,!1,!1)
    }),
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
        _[e] = new P(e,2,!1,e,null,!1,!1)
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
        _[e] = new P(e,3,!1,e.toLowerCase(),null,!1,!1)
    }),
    ["checked", "multiple", "muted", "selected"].forEach(function(e) {
        _[e] = new P(e,3,!0,e,null,!1,!1)
    }),
    ["capture", "download"].forEach(function(e) {
        _[e] = new P(e,4,!1,e,null,!1,!1)
    }),
    ["cols", "rows", "size", "span"].forEach(function(e) {
        _[e] = new P(e,6,!1,e,null,!1,!1)
    }),
    ["rowSpan", "start"].forEach(function(e) {
        _[e] = new P(e,5,!1,e.toLowerCase(),null,!1,!1)
    });
    var D = /[\-:]([a-z])/g;
    function V(e) {
        return e[1].toUpperCase()
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
        var t = e.replace(D, V);
        _[t] = new P(t,1,!1,e,null,!1,!1)
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
        var t = e.replace(D, V);
        _[t] = new P(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)
    }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
        var t = e.replace(D, V);
        _[t] = new P(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)
    }),
    ["tabIndex", "crossOrigin"].forEach(function(e) {
        _[e] = new P(e,1,!1,e.toLowerCase(),null,!1,!1)
    }),
    _.xlinkHref = new P("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),
    ["src", "href", "action", "formAction"].forEach(function(e) {
        _[e] = new P(e,1,!1,e.toLowerCase(),null,!0,!0)
    });
    function N(e, t, i, o) {
        var a = _.hasOwnProperty(t) ? _[t] : null;
        (a !== null ? a.type !== 0 : o || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (A(t, i, a, o) && (i = null),
        o || a === null ? w(t) && (i === null ? e.removeAttribute(t) : e.setAttribute(t, "" + i)) : a.mustUseProperty ? e[a.propertyName] = i === null ? a.type === 3 ? !1 : "" : i : (t = a.attributeName,
        o = a.attributeNamespace,
        i === null ? e.removeAttribute(t) : (a = a.type,
        i = a === 3 || a === 4 && i === !0 ? "" : "" + i,
        o ? e.setAttributeNS(o, t, i) : e.setAttribute(t, i))))
    }
    var X = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
      , $ = Symbol.for("react.element")
      , t1 = Symbol.for("react.portal")
      , s1 = Symbol.for("react.fragment")
      , e1 = Symbol.for("react.strict_mode")
      , y1 = Symbol.for("react.profiler")
      , w1 = Symbol.for("react.provider")
      , b1 = Symbol.for("react.context")
      , H = Symbol.for("react.forward_ref")
      , n1 = Symbol.for("react.suspense")
      , f1 = Symbol.for("react.suspense_list")
      , U = Symbol.for("react.memo")
      , p1 = Symbol.for("react.lazy")
      , q = Symbol.for("react.offscreen")
      , b = Symbol.iterator;
    function K(e) {
        return e === null || typeof e != "object" ? null : (e = b && e[b] || e["@@iterator"],
        typeof e == "function" ? e : null)
    }
    var B = Object.assign, S;
    function Z(e) {
        if (S === void 0)
            try {
                throw Error()
            } catch (i) {
                var t = i.stack.trim().match(/\n( *(at )?)/);
                S = t && t[1] || ""
            }
        return `
` + S + e
    }
    var u1 = !1;
    function c1(e, t) {
        if (!e || u1)
            return "";
        u1 = !0;
        var i = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
            if (t)
                if (t = function() {
                    throw Error()
                }
                ,
                Object.defineProperty(t.prototype, "props", {
                    set: function() {
                        throw Error()
                    }
                }),
                typeof Reflect == "object" && Reflect.construct) {
                    try {
                        Reflect.construct(t, [])
                    } catch (L) {
                        var o = L
                    }
                    Reflect.construct(e, [], t)
                } else {
                    try {
                        t.call()
                    } catch (L) {
                        o = L
                    }
                    e.call(t.prototype)
                }
            else {
                try {
                    throw Error()
                } catch (L) {
                    o = L
                }
                e()
            }
        } catch (L) {
            if (L && o && typeof L.stack == "string") {
                for (var a = L.stack.split(`
`), c = o.stack.split(`
`), m = a.length - 1, x = c.length - 1; 1 <= m && 0 <= x && a[m] !== c[x]; )
                    x--;
                for (; 1 <= m && 0 <= x; m--,
                x--)
                    if (a[m] !== c[x]) {
                        if (m !== 1 || x !== 1)
                            do
                                if (m--,
                                x--,
                                0 > x || a[m] !== c[x]) {
                                    var k = `
` + a[m].replace(" at new ", " at ");
                                    return e.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", e.displayName)),
                                    k
                                }
                            while (1 <= m && 0 <= x);
                        break
                    }
            }
        } finally {
            u1 = !1,
            Error.prepareStackTrace = i
        }
        return (e = e ? e.displayName || e.name : "") ? Z(e) : ""
    }
    function C1(e) {
        switch (e.tag) {
        case 5:
            return Z(e.type);
        case 16:
            return Z("Lazy");
        case 13:
            return Z("Suspense");
        case 19:
            return Z("SuspenseList");
        case 0:
        case 2:
        case 15:
            return e = c1(e.type, !1),
            e;
        case 11:
            return e = c1(e.type.render, !1),
            e;
        case 1:
            return e = c1(e.type, !0),
            e;
        default:
            return ""
        }
    }
    function a1(e) {
        if (e == null)
            return null;
        if (typeof e == "function")
            return e.displayName || e.name || null;
        if (typeof e == "string")
            return e;
        switch (e) {
        case s1:
            return "Fragment";
        case t1:
            return "Portal";
        case y1:
            return "Profiler";
        case e1:
            return "StrictMode";
        case n1:
            return "Suspense";
        case f1:
            return "SuspenseList"
        }
        if (typeof e == "object")
            switch (e.$$typeof) {
            case b1:
                return (e.displayName || "Context") + ".Consumer";
            case w1:
                return (e._context.displayName || "Context") + ".Provider";
            case H:
                var t = e.render;
                return e = e.displayName,
                e || (e = t.displayName || t.name || "",
                e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
                e;
            case U:
                return t = e.displayName || null,
                t !== null ? t : a1(e.type) || "Memo";
            case p1:
                t = e._payload,
                e = e._init;
                try {
                    return a1(e(t))
                } catch {}
            }
        return null
    }
    function x1(e) {
        var t = e.type;
        switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return e = t.render,
            e = e.displayName || e.name || "",
            t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return a1(t);
        case 8:
            return t === e1 ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function")
                return t.displayName || t.name || null;
            if (typeof t == "string")
                return t
        }
        return null
    }
    function g1(e) {
        switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return ""
        }
    }
    function k1(e) {
        var t = e.type;
        return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
    }
    function ne(e) {
        var t = k1(e) ? "checked" : "value"
          , i = Object.getOwnPropertyDescriptor(e.constructor.prototype, t)
          , o = "" + e[t];
        if (!e.hasOwnProperty(t) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
            var a = i.get
              , c = i.set;
            return Object.defineProperty(e, t, {
                configurable: !0,
                get: function() {
                    return a.call(this)
                },
                set: function(m) {
                    o = "" + m,
                    c.call(this, m)
                }
            }),
            Object.defineProperty(e, t, {
                enumerable: i.enumerable
            }),
            {
                getValue: function() {
                    return o
                },
                setValue: function(m) {
                    o = "" + m
                },
                stopTracking: function() {
                    e._valueTracker = null,
                    delete e[t]
                }
            }
        }
    }
    function _3(e) {
        e._valueTracker || (e._valueTracker = ne(e))
    }
    function jt(e) {
        if (!e)
            return !1;
        var t = e._valueTracker;
        if (!t)
            return !0;
        var i = t.getValue()
          , o = "";
        return e && (o = k1(e) ? e.checked ? "true" : "false" : e.value),
        e = o,
        e !== i ? (t.setValue(e),
        !0) : !1
    }
    function Wt(e) {
        if (e = e || (typeof document < "u" ? document : void 0),
        typeof e > "u")
            return null;
        try {
            return e.activeElement || e.body
        } catch {
            return e.body
        }
    }
    function g7(e, t) {
        var i = t.checked;
        return B({}, t, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: i ?? e._wrapperState.initialChecked
        })
    }
    function H5(e, t) {
        var i = t.defaultValue == null ? "" : t.defaultValue
          , o = t.checked != null ? t.checked : t.defaultChecked;
        i = g1(t.value != null ? t.value : i),
        e._wrapperState = {
            initialChecked: o,
            initialValue: i,
            controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
        }
    }
    function $5(e, t) {
        t = t.checked,
        t != null && N(e, "checked", t, !1)
    }
    function v7(e, t) {
        $5(e, t);
        var i = g1(t.value)
          , o = t.type;
        if (i != null)
            o === "number" ? (i === 0 && e.value === "" || e.value != i) && (e.value = "" + i) : e.value !== "" + i && (e.value = "" + i);
        else if (o === "submit" || o === "reset") {
            e.removeAttribute("value");
            return
        }
        t.hasOwnProperty("value") ? x7(e, t.type, i) : t.hasOwnProperty("defaultValue") && x7(e, t.type, g1(t.defaultValue)),
        t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
    }
    function W5(e, t, i) {
        if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
            var o = t.type;
            if (!(o !== "submit" && o !== "reset" || t.value !== void 0 && t.value !== null))
                return;
            t = "" + e._wrapperState.initialValue,
            i || t === e.value || (e.value = t),
            e.defaultValue = t
        }
        i = e.name,
        i !== "" && (e.name = ""),
        e.defaultChecked = !!e._wrapperState.initialChecked,
        i !== "" && (e.name = i)
    }
    function x7(e, t, i) {
        (t !== "number" || Wt(e.ownerDocument) !== e) && (i == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + i && (e.defaultValue = "" + i))
    }
    var R3 = Array.isArray;
    function Kt(e, t, i, o) {
        if (e = e.options,
        t) {
            t = {};
            for (var a = 0; a < i.length; a++)
                t["$" + i[a]] = !0;
            for (i = 0; i < e.length; i++)
                a = t.hasOwnProperty("$" + e[i].value),
                e[i].selected !== a && (e[i].selected = a),
                a && o && (e[i].defaultSelected = !0)
        } else {
            for (i = "" + g1(i),
            t = null,
            a = 0; a < e.length; a++) {
                if (e[a].value === i) {
                    e[a].selected = !0,
                    o && (e[a].defaultSelected = !0);
                    return
                }
                t !== null || e[a].disabled || (t = e[a])
            }
            t !== null && (t.selected = !0)
        }
    }
    function w7(e, t) {
        if (t.dangerouslySetInnerHTML != null)
            throw Error(s(91));
        return B({}, t, {
            value: void 0,
            defaultValue: void 0,
            children: "" + e._wrapperState.initialValue
        })
    }
    function K5(e, t) {
        var i = t.value;
        if (i == null) {
            if (i = t.children,
            t = t.defaultValue,
            i != null) {
                if (t != null)
                    throw Error(s(92));
                if (R3(i)) {
                    if (1 < i.length)
                        throw Error(s(93));
                    i = i[0]
                }
                t = i
            }
            t == null && (t = ""),
            i = t
        }
        e._wrapperState = {
            initialValue: g1(i)
        }
    }
    function G5(e, t) {
        var i = g1(t.value)
          , o = g1(t.defaultValue);
        i != null && (i = "" + i,
        i !== e.value && (e.value = i),
        t.defaultValue == null && e.defaultValue !== i && (e.defaultValue = i)),
        o != null && (e.defaultValue = "" + o)
    }
    function X5(e) {
        var t = e.textContent;
        t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
    }
    function Y5(e) {
        switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml"
        }
    }
    function k7(e, t) {
        return e == null || e === "http://www.w3.org/1999/xhtml" ? Y5(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
    }
    var In, Q5 = (function(e) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, i, o, a) {
            MSApp.execUnsafeLocalFunction(function() {
                return e(t, i, o, a)
            })
        }
        : e
    }
    )(function(e, t) {
        if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML"in e)
            e.innerHTML = t;
        else {
            for (In = In || document.createElement("div"),
            In.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = In.firstChild; e.firstChild; )
                e.removeChild(e.firstChild);
            for (; t.firstChild; )
                e.appendChild(t.firstChild)
        }
    });
    function A3(e, t) {
        if (t) {
            var i = e.firstChild;
            if (i && i === e.lastChild && i.nodeType === 3) {
                i.nodeValue = t;
                return
            }
        }
        e.textContent = t
    }
    var D3 = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    }
      , po = ["Webkit", "ms", "Moz", "O"];
    Object.keys(D3).forEach(function(e) {
        po.forEach(function(t) {
            t = t + e.charAt(0).toUpperCase() + e.substring(1),
            D3[t] = D3[e]
        })
    });
    function q5(e, t, i) {
        return t == null || typeof t == "boolean" || t === "" ? "" : i || typeof t != "number" || t === 0 || D3.hasOwnProperty(e) && D3[e] ? ("" + t).trim() : t + "px"
    }
    function J5(e, t) {
        e = e.style;
        for (var i in t)
            if (t.hasOwnProperty(i)) {
                var o = i.indexOf("--") === 0
                  , a = q5(i, t[i], o);
                i === "float" && (i = "cssFloat"),
                o ? e.setProperty(i, a) : e[i] = a
            }
    }
    var mo = B({
        menuitem: !0
    }, {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    });
    function M7(e, t) {
        if (t) {
            if (mo[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
                throw Error(s(137, e));
            if (t.dangerouslySetInnerHTML != null) {
                if (t.children != null)
                    throw Error(s(60));
                if (typeof t.dangerouslySetInnerHTML != "object" || !("__html"in t.dangerouslySetInnerHTML))
                    throw Error(s(61))
            }
            if (t.style != null && typeof t.style != "object")
                throw Error(s(62))
        }
    }
    function S7(e, t) {
        if (e.indexOf("-") === -1)
            return typeof t.is == "string";
        switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0
        }
    }
    var j7 = null;
    function T7(e) {
        return e = e.target || e.srcElement || window,
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    }
    var E7 = null
      , Gt = null
      , Xt = null;
    function er(e) {
        if (e = tn(e)) {
            if (typeof E7 != "function")
                throw Error(s(280));
            var t = e.stateNode;
            t && (t = a4(t),
            E7(e.stateNode, e.type, t))
        }
    }
    function tr(e) {
        Gt ? Xt ? Xt.push(e) : Xt = [e] : Gt = e
    }
    function nr() {
        if (Gt) {
            var e = Gt
              , t = Xt;
            if (Xt = Gt = null,
            er(e),
            t)
                for (e = 0; e < t.length; e++)
                    er(t[e])
        }
    }
    function rr(e, t) {
        return e(t)
    }
    function ir() {}
    var P7 = !1;
    function sr(e, t, i) {
        if (P7)
            return e(t, i);
        P7 = !0;
        try {
            return rr(e, t, i)
        } finally {
            P7 = !1,
            (Gt !== null || Xt !== null) && (ir(),
            nr())
        }
    }
    function V3(e, t) {
        var i = e.stateNode;
        if (i === null)
            return null;
        var o = a4(i);
        if (o === null)
            return null;
        i = o[t];
        e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (o = !o.disabled) || (e = e.type,
            o = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
            e = !o;
            break e;
        default:
            e = !1
        }
        if (e)
            return null;
        if (i && typeof i != "function")
            throw Error(s(231, t, typeof i));
        return i
    }
    var L7 = !1;
    if (h)
        try {
            var Z3 = {};
            Object.defineProperty(Z3, "passive", {
                get: function() {
                    L7 = !0
                }
            }),
            window.addEventListener("test", Z3, Z3),
            window.removeEventListener("test", Z3, Z3)
        } catch {
            L7 = !1
        }
    function yo(e, t, i, o, a, c, m, x, k) {
        var L = Array.prototype.slice.call(arguments, 3);
        try {
            t.apply(i, L)
        } catch (F) {
            this.onError(F)
        }
    }
    var O3 = !1
      , bn = null
      , zn = !1
      , _7 = null
      , go = {
        onError: function(e) {
            O3 = !0,
            bn = e
        }
    };
    function vo(e, t, i, o, a, c, m, x, k) {
        O3 = !1,
        bn = null,
        yo.apply(go, arguments)
    }
    function xo(e, t, i, o, a, c, m, x, k) {
        if (vo.apply(this, arguments),
        O3) {
            if (O3) {
                var L = bn;
                O3 = !1,
                bn = null
            } else
                throw Error(s(198));
            zn || (zn = !0,
            _7 = L)
        }
    }
    function Tt(e) {
        var t = e
          , i = e;
        if (e.alternate)
            for (; t.return; )
                t = t.return;
        else {
            e = t;
            do
                t = e,
                (t.flags & 4098) !== 0 && (i = t.return),
                e = t.return;
            while (e)
        }
        return t.tag === 3 ? i : null
    }
    function or(e) {
        if (e.tag === 13) {
            var t = e.memoizedState;
            if (t === null && (e = e.alternate,
            e !== null && (t = e.memoizedState)),
            t !== null)
                return t.dehydrated
        }
        return null
    }
    function lr(e) {
        if (Tt(e) !== e)
            throw Error(s(188))
    }
    function wo(e) {
        var t = e.alternate;
        if (!t) {
            if (t = Tt(e),
            t === null)
                throw Error(s(188));
            return t !== e ? null : e
        }
        for (var i = e, o = t; ; ) {
            var a = i.return;
            if (a === null)
                break;
            var c = a.alternate;
            if (c === null) {
                if (o = a.return,
                o !== null) {
                    i = o;
                    continue
                }
                break
            }
            if (a.child === c.child) {
                for (c = a.child; c; ) {
                    if (c === i)
                        return lr(a),
                        e;
                    if (c === o)
                        return lr(a),
                        t;
                    c = c.sibling
                }
                throw Error(s(188))
            }
            if (i.return !== o.return)
                i = a,
                o = c;
            else {
                for (var m = !1, x = a.child; x; ) {
                    if (x === i) {
                        m = !0,
                        i = a,
                        o = c;
                        break
                    }
                    if (x === o) {
                        m = !0,
                        o = a,
                        i = c;
                        break
                    }
                    x = x.sibling
                }
                if (!m) {
                    for (x = c.child; x; ) {
                        if (x === i) {
                            m = !0,
                            i = c,
                            o = a;
                            break
                        }
                        if (x === o) {
                            m = !0,
                            o = c,
                            i = a;
                            break
                        }
                        x = x.sibling
                    }
                    if (!m)
                        throw Error(s(189))
                }
            }
            if (i.alternate !== o)
                throw Error(s(190))
        }
        if (i.tag !== 3)
            throw Error(s(188));
        return i.stateNode.current === i ? e : t
    }
    function ar(e) {
        return e = wo(e),
        e !== null ? ur(e) : null
    }
    function ur(e) {
        if (e.tag === 5 || e.tag === 6)
            return e;
        for (e = e.child; e !== null; ) {
            var t = ur(e);
            if (t !== null)
                return t;
            e = e.sibling
        }
        return null
    }
    var cr = r.unstable_scheduleCallback
      , fr = r.unstable_cancelCallback
      , ko = r.unstable_shouldYield
      , Mo = r.unstable_requestPaint
      , Z1 = r.unstable_now
      , So = r.unstable_getCurrentPriorityLevel
      , R7 = r.unstable_ImmediatePriority
      , dr = r.unstable_UserBlockingPriority
      , Bn = r.unstable_NormalPriority
      , jo = r.unstable_LowPriority
      , Cr = r.unstable_IdlePriority
      , Un = null
      , Ze = null;
    function To(e) {
        if (Ze && typeof Ze.onCommitFiberRoot == "function")
            try {
                Ze.onCommitFiberRoot(Un, e, void 0, (e.current.flags & 128) === 128)
            } catch {}
    }
    var Te = Math.clz32 ? Math.clz32 : Lo
      , Eo = Math.log
      , Po = Math.LN2;
    function Lo(e) {
        return e >>>= 0,
        e === 0 ? 32 : 31 - (Eo(e) / Po | 0) | 0
    }
    var Hn = 64
      , $n = 4194304;
    function F3(e) {
        switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e
        }
    }
    function Wn(e, t) {
        var i = e.pendingLanes;
        if (i === 0)
            return 0;
        var o = 0
          , a = e.suspendedLanes
          , c = e.pingedLanes
          , m = i & 268435455;
        if (m !== 0) {
            var x = m & ~a;
            x !== 0 ? o = F3(x) : (c &= m,
            c !== 0 && (o = F3(c)))
        } else
            m = i & ~a,
            m !== 0 ? o = F3(m) : c !== 0 && (o = F3(c));
        if (o === 0)
            return 0;
        if (t !== 0 && t !== o && (t & a) === 0 && (a = o & -o,
        c = t & -t,
        a >= c || a === 16 && (c & 4194240) !== 0))
            return t;
        if ((o & 4) !== 0 && (o |= i & 16),
        t = e.entangledLanes,
        t !== 0)
            for (e = e.entanglements,
            t &= o; 0 < t; )
                i = 31 - Te(t),
                a = 1 << i,
                o |= e[i],
                t &= ~a;
        return o
    }
    function _o(e, t) {
        switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1
        }
    }
    function Ro(e, t) {
        for (var i = e.suspendedLanes, o = e.pingedLanes, a = e.expirationTimes, c = e.pendingLanes; 0 < c; ) {
            var m = 31 - Te(c)
              , x = 1 << m
              , k = a[m];
            k === -1 ? ((x & i) === 0 || (x & o) !== 0) && (a[m] = _o(x, t)) : k <= t && (e.expiredLanes |= x),
            c &= ~x
        }
    }
    function A7(e) {
        return e = e.pendingLanes & -1073741825,
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    }
    function hr() {
        var e = Hn;
        return Hn <<= 1,
        (Hn & 4194240) === 0 && (Hn = 64),
        e
    }
    function D7(e) {
        for (var t = [], i = 0; 31 > i; i++)
            t.push(e);
        return t
    }
    function N3(e, t, i) {
        e.pendingLanes |= t,
        t !== 536870912 && (e.suspendedLanes = 0,
        e.pingedLanes = 0),
        e = e.eventTimes,
        t = 31 - Te(t),
        e[t] = i
    }
    function Ao(e, t) {
        var i = e.pendingLanes & ~t;
        e.pendingLanes = t,
        e.suspendedLanes = 0,
        e.pingedLanes = 0,
        e.expiredLanes &= t,
        e.mutableReadLanes &= t,
        e.entangledLanes &= t,
        t = e.entanglements;
        var o = e.eventTimes;
        for (e = e.expirationTimes; 0 < i; ) {
            var a = 31 - Te(i)
              , c = 1 << a;
            t[a] = 0,
            o[a] = -1,
            e[a] = -1,
            i &= ~c
        }
    }
    function V7(e, t) {
        var i = e.entangledLanes |= t;
        for (e = e.entanglements; i; ) {
            var o = 31 - Te(i)
              , a = 1 << o;
            a & t | e[o] & t && (e[o] |= t),
            i &= ~a
        }
    }
    var v1 = 0;
    function pr(e) {
        return e &= -e,
        1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1
    }
    var mr, Z7, yr, gr, vr, O7 = !1, Kn = [], tt = null, nt = null, rt = null, I3 = new Map, b3 = new Map, it = [], Do = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function xr(e, t) {
        switch (e) {
        case "focusin":
        case "focusout":
            tt = null;
            break;
        case "dragenter":
        case "dragleave":
            nt = null;
            break;
        case "mouseover":
        case "mouseout":
            rt = null;
            break;
        case "pointerover":
        case "pointerout":
            I3.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            b3.delete(t.pointerId)
        }
    }
    function z3(e, t, i, o, a, c) {
        return e === null || e.nativeEvent !== c ? (e = {
            blockedOn: t,
            domEventName: i,
            eventSystemFlags: o,
            nativeEvent: c,
            targetContainers: [a]
        },
        t !== null && (t = tn(t),
        t !== null && Z7(t)),
        e) : (e.eventSystemFlags |= o,
        t = e.targetContainers,
        a !== null && t.indexOf(a) === -1 && t.push(a),
        e)
    }
    function Vo(e, t, i, o, a) {
        switch (t) {
        case "focusin":
            return tt = z3(tt, e, t, i, o, a),
            !0;
        case "dragenter":
            return nt = z3(nt, e, t, i, o, a),
            !0;
        case "mouseover":
            return rt = z3(rt, e, t, i, o, a),
            !0;
        case "pointerover":
            var c = a.pointerId;
            return I3.set(c, z3(I3.get(c) || null, e, t, i, o, a)),
            !0;
        case "gotpointercapture":
            return c = a.pointerId,
            b3.set(c, z3(b3.get(c) || null, e, t, i, o, a)),
            !0
        }
        return !1
    }
    function wr(e) {
        var t = Et(e.target);
        if (t !== null) {
            var i = Tt(t);
            if (i !== null) {
                if (t = i.tag,
                t === 13) {
                    if (t = or(i),
                    t !== null) {
                        e.blockedOn = t,
                        vr(e.priority, function() {
                            yr(i)
                        });
                        return
                    }
                } else if (t === 3 && i.stateNode.current.memoizedState.isDehydrated) {
                    e.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
                    return
                }
            }
        }
        e.blockedOn = null
    }
    function Gn(e) {
        if (e.blockedOn !== null)
            return !1;
        for (var t = e.targetContainers; 0 < t.length; ) {
            var i = N7(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
            if (i === null) {
                i = e.nativeEvent;
                var o = new i.constructor(i.type,i);
                j7 = o,
                i.target.dispatchEvent(o),
                j7 = null
            } else
                return t = tn(i),
                t !== null && Z7(t),
                e.blockedOn = i,
                !1;
            t.shift()
        }
        return !0
    }
    function kr(e, t, i) {
        Gn(e) && i.delete(t)
    }
    function Zo() {
        O7 = !1,
        tt !== null && Gn(tt) && (tt = null),
        nt !== null && Gn(nt) && (nt = null),
        rt !== null && Gn(rt) && (rt = null),
        I3.forEach(kr),
        b3.forEach(kr)
    }
    function B3(e, t) {
        e.blockedOn === t && (e.blockedOn = null,
        O7 || (O7 = !0,
        r.unstable_scheduleCallback(r.unstable_NormalPriority, Zo)))
    }
    function U3(e) {
        function t(a) {
            return B3(a, e)
        }
        if (0 < Kn.length) {
            B3(Kn[0], e);
            for (var i = 1; i < Kn.length; i++) {
                var o = Kn[i];
                o.blockedOn === e && (o.blockedOn = null)
            }
        }
        for (tt !== null && B3(tt, e),
        nt !== null && B3(nt, e),
        rt !== null && B3(rt, e),
        I3.forEach(t),
        b3.forEach(t),
        i = 0; i < it.length; i++)
            o = it[i],
            o.blockedOn === e && (o.blockedOn = null);
        for (; 0 < it.length && (i = it[0],
        i.blockedOn === null); )
            wr(i),
            i.blockedOn === null && it.shift()
    }
    var Yt = X.ReactCurrentBatchConfig
      , Xn = !0;
    function Oo(e, t, i, o) {
        var a = v1
          , c = Yt.transition;
        Yt.transition = null;
        try {
            v1 = 1,
            F7(e, t, i, o)
        } finally {
            v1 = a,
            Yt.transition = c
        }
    }
    function Fo(e, t, i, o) {
        var a = v1
          , c = Yt.transition;
        Yt.transition = null;
        try {
            v1 = 4,
            F7(e, t, i, o)
        } finally {
            v1 = a,
            Yt.transition = c
        }
    }
    function F7(e, t, i, o) {
        if (Xn) {
            var a = N7(e, t, i, o);
            if (a === null)
                t6(e, t, o, Yn, i),
                xr(e, o);
            else if (Vo(a, e, t, i, o))
                o.stopPropagation();
            else if (xr(e, o),
            t & 4 && -1 < Do.indexOf(e)) {
                for (; a !== null; ) {
                    var c = tn(a);
                    if (c !== null && mr(c),
                    c = N7(e, t, i, o),
                    c === null && t6(e, t, o, Yn, i),
                    c === a)
                        break;
                    a = c
                }
                a !== null && o.stopPropagation()
            } else
                t6(e, t, o, null, i)
        }
    }
    var Yn = null;
    function N7(e, t, i, o) {
        if (Yn = null,
        e = T7(o),
        e = Et(e),
        e !== null)
            if (t = Tt(e),
            t === null)
                e = null;
            else if (i = t.tag,
            i === 13) {
                if (e = or(t),
                e !== null)
                    return e;
                e = null
            } else if (i === 3) {
                if (t.stateNode.current.memoizedState.isDehydrated)
                    return t.tag === 3 ? t.stateNode.containerInfo : null;
                e = null
            } else
                t !== e && (e = null);
        return Yn = e,
        null
    }
    function Mr(e) {
        switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (So()) {
            case R7:
                return 1;
            case dr:
                return 4;
            case Bn:
            case jo:
                return 16;
            case Cr:
                return 536870912;
            default:
                return 16
            }
        default:
            return 16
        }
    }
    var st = null
      , I7 = null
      , Qn = null;
    function Sr() {
        if (Qn)
            return Qn;
        var e, t = I7, i = t.length, o, a = "value"in st ? st.value : st.textContent, c = a.length;
        for (e = 0; e < i && t[e] === a[e]; e++)
            ;
        var m = i - e;
        for (o = 1; o <= m && t[i - o] === a[c - o]; o++)
            ;
        return Qn = a.slice(e, 1 < o ? 1 - o : void 0)
    }
    function qn(e) {
        var t = e.keyCode;
        return "charCode"in e ? (e = e.charCode,
        e === 0 && t === 13 && (e = 13)) : e = t,
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    }
    function Jn() {
        return !0
    }
    function jr() {
        return !1
    }
    function Ce(e) {
        function t(i, o, a, c, m) {
            this._reactName = i,
            this._targetInst = a,
            this.type = o,
            this.nativeEvent = c,
            this.target = m,
            this.currentTarget = null;
            for (var x in e)
                e.hasOwnProperty(x) && (i = e[x],
                this[x] = i ? i(c) : c[x]);
            return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Jn : jr,
            this.isPropagationStopped = jr,
            this
        }
        return B(t.prototype, {
            preventDefault: function() {
                this.defaultPrevented = !0;
                var i = this.nativeEvent;
                i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1),
                this.isDefaultPrevented = Jn)
            },
            stopPropagation: function() {
                var i = this.nativeEvent;
                i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0),
                this.isPropagationStopped = Jn)
            },
            persist: function() {},
            isPersistent: Jn
        }),
        t
    }
    var Qt = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0
    }, b7 = Ce(Qt), H3 = B({}, Qt, {
        view: 0,
        detail: 0
    }), No = Ce(H3), z7, B7, $3, e4 = B({}, H3, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: H7,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
        },
        movementX: function(e) {
            return "movementX"in e ? e.movementX : (e !== $3 && ($3 && e.type === "mousemove" ? (z7 = e.screenX - $3.screenX,
            B7 = e.screenY - $3.screenY) : B7 = z7 = 0,
            $3 = e),
            z7)
        },
        movementY: function(e) {
            return "movementY"in e ? e.movementY : B7
        }
    }), Tr = Ce(e4), Io = B({}, e4, {
        dataTransfer: 0
    }), bo = Ce(Io), zo = B({}, H3, {
        relatedTarget: 0
    }), U7 = Ce(zo), Bo = B({}, Qt, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }), Uo = Ce(Bo), Ho = B({}, Qt, {
        clipboardData: function(e) {
            return "clipboardData"in e ? e.clipboardData : window.clipboardData
        }
    }), $o = Ce(Ho), Wo = B({}, Qt, {
        data: 0
    }), Er = Ce(Wo), Ko = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    }, Go = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    }, Xo = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };
    function Yo(e) {
        var t = this.nativeEvent;
        return t.getModifierState ? t.getModifierState(e) : (e = Xo[e]) ? !!t[e] : !1
    }
    function H7() {
        return Yo
    }
    var Qo = B({}, H3, {
        key: function(e) {
            if (e.key) {
                var t = Ko[e.key] || e.key;
                if (t !== "Unidentified")
                    return t
            }
            return e.type === "keypress" ? (e = qn(e),
            e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Go[e.keyCode] || "Unidentified" : ""
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: H7,
        charCode: function(e) {
            return e.type === "keypress" ? qn(e) : 0
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        },
        which: function(e) {
            return e.type === "keypress" ? qn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        }
    })
      , qo = Ce(Qo)
      , Jo = B({}, e4, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    })
      , Pr = Ce(Jo)
      , el = B({}, H3, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: H7
    })
      , tl = Ce(el)
      , nl = B({}, Qt, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    })
      , rl = Ce(nl)
      , il = B({}, e4, {
        deltaX: function(e) {
            return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
    })
      , sl = Ce(il)
      , ol = [9, 13, 27, 32]
      , $7 = h && "CompositionEvent"in window
      , W3 = null;
    h && "documentMode"in document && (W3 = document.documentMode);
    var ll = h && "TextEvent"in window && !W3
      , Lr = h && (!$7 || W3 && 8 < W3 && 11 >= W3)
      , _r = " "
      , Rr = !1;
    function Ar(e, t) {
        switch (e) {
        case "keyup":
            return ol.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1
        }
    }
    function Dr(e) {
        return e = e.detail,
        typeof e == "object" && "data"in e ? e.data : null
    }
    var qt = !1;
    function al(e, t) {
        switch (e) {
        case "compositionend":
            return Dr(t);
        case "keypress":
            return t.which !== 32 ? null : (Rr = !0,
            _r);
        case "textInput":
            return e = t.data,
            e === _r && Rr ? null : e;
        default:
            return null
        }
    }
    function ul(e, t) {
        if (qt)
            return e === "compositionend" || !$7 && Ar(e, t) ? (e = Sr(),
            Qn = I7 = st = null,
            qt = !1,
            e) : null;
        switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                if (t.char && 1 < t.char.length)
                    return t.char;
                if (t.which)
                    return String.fromCharCode(t.which)
            }
            return null;
        case "compositionend":
            return Lr && t.locale !== "ko" ? null : t.data;
        default:
            return null
        }
    }
    var cl = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
    };
    function Vr(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t === "input" ? !!cl[e.type] : t === "textarea"
    }
    function Zr(e, t, i, o) {
        tr(o),
        t = s4(t, "onChange"),
        0 < t.length && (i = new b7("onChange","change",null,i,o),
        e.push({
            event: i,
            listeners: t
        }))
    }
    var K3 = null
      , G3 = null;
    function fl(e) {
        Jr(e, 0)
    }
    function t4(e) {
        var t = r3(e);
        if (jt(t))
            return e
    }
    function dl(e, t) {
        if (e === "change")
            return t
    }
    var Or = !1;
    if (h) {
        var W7;
        if (h) {
            var K7 = "oninput"in document;
            if (!K7) {
                var Fr = document.createElement("div");
                Fr.setAttribute("oninput", "return;"),
                K7 = typeof Fr.oninput == "function"
            }
            W7 = K7
        } else
            W7 = !1;
        Or = W7 && (!document.documentMode || 9 < document.documentMode)
    }
    function Nr() {
        K3 && (K3.detachEvent("onpropertychange", Ir),
        G3 = K3 = null)
    }
    function Ir(e) {
        if (e.propertyName === "value" && t4(G3)) {
            var t = [];
            Zr(t, G3, e, T7(e)),
            sr(fl, t)
        }
    }
    function Cl(e, t, i) {
        e === "focusin" ? (Nr(),
        K3 = t,
        G3 = i,
        K3.attachEvent("onpropertychange", Ir)) : e === "focusout" && Nr()
    }
    function hl(e) {
        if (e === "selectionchange" || e === "keyup" || e === "keydown")
            return t4(G3)
    }
    function pl(e, t) {
        if (e === "click")
            return t4(t)
    }
    function ml(e, t) {
        if (e === "input" || e === "change")
            return t4(t)
    }
    function yl(e, t) {
        return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
    }
    var Ee = typeof Object.is == "function" ? Object.is : yl;
    function X3(e, t) {
        if (Ee(e, t))
            return !0;
        if (typeof e != "object" || e === null || typeof t != "object" || t === null)
            return !1;
        var i = Object.keys(e)
          , o = Object.keys(t);
        if (i.length !== o.length)
            return !1;
        for (o = 0; o < i.length; o++) {
            var a = i[o];
            if (!p.call(t, a) || !Ee(e[a], t[a]))
                return !1
        }
        return !0
    }
    function br(e) {
        for (; e && e.firstChild; )
            e = e.firstChild;
        return e
    }
    function zr(e, t) {
        var i = br(e);
        e = 0;
        for (var o; i; ) {
            if (i.nodeType === 3) {
                if (o = e + i.textContent.length,
                e <= t && o >= t)
                    return {
                        node: i,
                        offset: t - e
                    };
                e = o
            }
            e: {
                for (; i; ) {
                    if (i.nextSibling) {
                        i = i.nextSibling;
                        break e
                    }
                    i = i.parentNode
                }
                i = void 0
            }
            i = br(i)
        }
    }
    function Br(e, t) {
        return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Br(e, t.parentNode) : "contains"in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
    }
    function Ur() {
        for (var e = window, t = Wt(); t instanceof e.HTMLIFrameElement; ) {
            try {
                var i = typeof t.contentWindow.location.href == "string"
            } catch {
                i = !1
            }
            if (i)
                e = t.contentWindow;
            else
                break;
            t = Wt(e.document)
        }
        return t
    }
    function G7(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
    }
    function gl(e) {
        var t = Ur()
          , i = e.focusedElem
          , o = e.selectionRange;
        if (t !== i && i && i.ownerDocument && Br(i.ownerDocument.documentElement, i)) {
            if (o !== null && G7(i)) {
                if (t = o.start,
                e = o.end,
                e === void 0 && (e = t),
                "selectionStart"in i)
                    i.selectionStart = t,
                    i.selectionEnd = Math.min(e, i.value.length);
                else if (e = (t = i.ownerDocument || document) && t.defaultView || window,
                e.getSelection) {
                    e = e.getSelection();
                    var a = i.textContent.length
                      , c = Math.min(o.start, a);
                    o = o.end === void 0 ? c : Math.min(o.end, a),
                    !e.extend && c > o && (a = o,
                    o = c,
                    c = a),
                    a = zr(i, c);
                    var m = zr(i, o);
                    a && m && (e.rangeCount !== 1 || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== m.node || e.focusOffset !== m.offset) && (t = t.createRange(),
                    t.setStart(a.node, a.offset),
                    e.removeAllRanges(),
                    c > o ? (e.addRange(t),
                    e.extend(m.node, m.offset)) : (t.setEnd(m.node, m.offset),
                    e.addRange(t)))
                }
            }
            for (t = [],
            e = i; e = e.parentNode; )
                e.nodeType === 1 && t.push({
                    element: e,
                    left: e.scrollLeft,
                    top: e.scrollTop
                });
            for (typeof i.focus == "function" && i.focus(),
            i = 0; i < t.length; i++)
                e = t[i],
                e.element.scrollLeft = e.left,
                e.element.scrollTop = e.top
        }
    }
    var vl = h && "documentMode"in document && 11 >= document.documentMode
      , Jt = null
      , X7 = null
      , Y3 = null
      , Y7 = !1;
    function Hr(e, t, i) {
        var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
        Y7 || Jt == null || Jt !== Wt(o) || (o = Jt,
        "selectionStart"in o && G7(o) ? o = {
            start: o.selectionStart,
            end: o.selectionEnd
        } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(),
        o = {
            anchorNode: o.anchorNode,
            anchorOffset: o.anchorOffset,
            focusNode: o.focusNode,
            focusOffset: o.focusOffset
        }),
        Y3 && X3(Y3, o) || (Y3 = o,
        o = s4(X7, "onSelect"),
        0 < o.length && (t = new b7("onSelect","select",null,t,i),
        e.push({
            event: t,
            listeners: o
        }),
        t.target = Jt)))
    }
    function n4(e, t) {
        var i = {};
        return i[e.toLowerCase()] = t.toLowerCase(),
        i["Webkit" + e] = "webkit" + t,
        i["Moz" + e] = "moz" + t,
        i
    }
    var e3 = {
        animationend: n4("Animation", "AnimationEnd"),
        animationiteration: n4("Animation", "AnimationIteration"),
        animationstart: n4("Animation", "AnimationStart"),
        transitionend: n4("Transition", "TransitionEnd")
    }
      , Q7 = {}
      , $r = {};
    h && ($r = document.createElement("div").style,
    "AnimationEvent"in window || (delete e3.animationend.animation,
    delete e3.animationiteration.animation,
    delete e3.animationstart.animation),
    "TransitionEvent"in window || delete e3.transitionend.transition);
    function r4(e) {
        if (Q7[e])
            return Q7[e];
        if (!e3[e])
            return e;
        var t = e3[e], i;
        for (i in t)
            if (t.hasOwnProperty(i) && i in $r)
                return Q7[e] = t[i];
        return e
    }
    var Wr = r4("animationend")
      , Kr = r4("animationiteration")
      , Gr = r4("animationstart")
      , Xr = r4("transitionend")
      , Yr = new Map
      , Qr = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    function ot(e, t) {
        Yr.set(e, t),
        d(t, [e])
    }
    for (var q7 = 0; q7 < Qr.length; q7++) {
        var J7 = Qr[q7]
          , xl = J7.toLowerCase()
          , wl = J7[0].toUpperCase() + J7.slice(1);
        ot(xl, "on" + wl)
    }
    ot(Wr, "onAnimationEnd"),
    ot(Kr, "onAnimationIteration"),
    ot(Gr, "onAnimationStart"),
    ot("dblclick", "onDoubleClick"),
    ot("focusin", "onFocus"),
    ot("focusout", "onBlur"),
    ot(Xr, "onTransitionEnd"),
    f("onMouseEnter", ["mouseout", "mouseover"]),
    f("onMouseLeave", ["mouseout", "mouseover"]),
    f("onPointerEnter", ["pointerout", "pointerover"]),
    f("onPointerLeave", ["pointerout", "pointerover"]),
    d("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    d("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
    d("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    d("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    d("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
    d("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Q3 = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
      , kl = new Set("cancel close invalid load scroll toggle".split(" ").concat(Q3));
    function qr(e, t, i) {
        var o = e.type || "unknown-event";
        e.currentTarget = i,
        xo(o, t, void 0, e),
        e.currentTarget = null
    }
    function Jr(e, t) {
        t = (t & 4) !== 0;
        for (var i = 0; i < e.length; i++) {
            var o = e[i]
              , a = o.event;
            o = o.listeners;
            e: {
                var c = void 0;
                if (t)
                    for (var m = o.length - 1; 0 <= m; m--) {
                        var x = o[m]
                          , k = x.instance
                          , L = x.currentTarget;
                        if (x = x.listener,
                        k !== c && a.isPropagationStopped())
                            break e;
                        qr(a, x, L),
                        c = k
                    }
                else
                    for (m = 0; m < o.length; m++) {
                        if (x = o[m],
                        k = x.instance,
                        L = x.currentTarget,
                        x = x.listener,
                        k !== c && a.isPropagationStopped())
                            break e;
                        qr(a, x, L),
                        c = k
                    }
            }
        }
        if (zn)
            throw e = _7,
            zn = !1,
            _7 = null,
            e
    }
    function S1(e, t) {
        var i = t[l6];
        i === void 0 && (i = t[l6] = new Set);
        var o = e + "__bubble";
        i.has(o) || (e8(t, e, 2, !1),
        i.add(o))
    }
    function e6(e, t, i) {
        var o = 0;
        t && (o |= 4),
        e8(i, e, o, t)
    }
    var i4 = "_reactListening" + Math.random().toString(36).slice(2);
    function q3(e) {
        if (!e[i4]) {
            e[i4] = !0,
            l.forEach(function(i) {
                i !== "selectionchange" && (kl.has(i) || e6(i, !1, e),
                e6(i, !0, e))
            });
            var t = e.nodeType === 9 ? e : e.ownerDocument;
            t === null || t[i4] || (t[i4] = !0,
            e6("selectionchange", !1, t))
        }
    }
    function e8(e, t, i, o) {
        switch (Mr(t)) {
        case 1:
            var a = Oo;
            break;
        case 4:
            a = Fo;
            break;
        default:
            a = F7
        }
        i = a.bind(null, t, i, e),
        a = void 0,
        !L7 || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0),
        o ? a !== void 0 ? e.addEventListener(t, i, {
            capture: !0,
            passive: a
        }) : e.addEventListener(t, i, !0) : a !== void 0 ? e.addEventListener(t, i, {
            passive: a
        }) : e.addEventListener(t, i, !1)
    }
    function t6(e, t, i, o, a) {
        var c = o;
        if ((t & 1) === 0 && (t & 2) === 0 && o !== null)
            e: for (; ; ) {
                if (o === null)
                    return;
                var m = o.tag;
                if (m === 3 || m === 4) {
                    var x = o.stateNode.containerInfo;
                    if (x === a || x.nodeType === 8 && x.parentNode === a)
                        break;
                    if (m === 4)
                        for (m = o.return; m !== null; ) {
                            var k = m.tag;
                            if ((k === 3 || k === 4) && (k = m.stateNode.containerInfo,
                            k === a || k.nodeType === 8 && k.parentNode === a))
                                return;
                            m = m.return
                        }
                    for (; x !== null; ) {
                        if (m = Et(x),
                        m === null)
                            return;
                        if (k = m.tag,
                        k === 5 || k === 6) {
                            o = c = m;
                            continue e
                        }
                        x = x.parentNode
                    }
                }
                o = o.return
            }
        sr(function() {
            var L = c
              , F = T7(i)
              , I = [];
            e: {
                var O = Yr.get(e);
                if (O !== void 0) {
                    var W = b7
                      , Y = e;
                    switch (e) {
                    case "keypress":
                        if (qn(i) === 0)
                            break e;
                    case "keydown":
                    case "keyup":
                        W = qo;
                        break;
                    case "focusin":
                        Y = "focus",
                        W = U7;
                        break;
                    case "focusout":
                        Y = "blur",
                        W = U7;
                        break;
                    case "beforeblur":
                    case "afterblur":
                        W = U7;
                        break;
                    case "click":
                        if (i.button === 2)
                            break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        W = Tr;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        W = bo;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        W = tl;
                        break;
                    case Wr:
                    case Kr:
                    case Gr:
                        W = Uo;
                        break;
                    case Xr:
                        W = rl;
                        break;
                    case "scroll":
                        W = No;
                        break;
                    case "wheel":
                        W = sl;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        W = $o;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        W = Pr
                    }
                    var Q = (t & 4) !== 0
                      , O1 = !Q && e === "scroll"
                      , T = Q ? O !== null ? O + "Capture" : null : O;
                    Q = [];
                    for (var M = L, E; M !== null; ) {
                        E = M;
                        var z = E.stateNode;
                        if (E.tag === 5 && z !== null && (E = z,
                        T !== null && (z = V3(M, T),
                        z != null && Q.push(J3(M, z, E)))),
                        O1)
                            break;
                        M = M.return
                    }
                    0 < Q.length && (O = new W(O,Y,null,i,F),
                    I.push({
                        event: O,
                        listeners: Q
                    }))
                }
            }
            if ((t & 7) === 0) {
                e: {
                    if (O = e === "mouseover" || e === "pointerover",
                    W = e === "mouseout" || e === "pointerout",
                    O && i !== j7 && (Y = i.relatedTarget || i.fromElement) && (Et(Y) || Y[He]))
                        break e;
                    if ((W || O) && (O = F.window === F ? F : (O = F.ownerDocument) ? O.defaultView || O.parentWindow : window,
                    W ? (Y = i.relatedTarget || i.toElement,
                    W = L,
                    Y = Y ? Et(Y) : null,
                    Y !== null && (O1 = Tt(Y),
                    Y !== O1 || Y.tag !== 5 && Y.tag !== 6) && (Y = null)) : (W = null,
                    Y = L),
                    W !== Y)) {
                        if (Q = Tr,
                        z = "onMouseLeave",
                        T = "onMouseEnter",
                        M = "mouse",
                        (e === "pointerout" || e === "pointerover") && (Q = Pr,
                        z = "onPointerLeave",
                        T = "onPointerEnter",
                        M = "pointer"),
                        O1 = W == null ? O : r3(W),
                        E = Y == null ? O : r3(Y),
                        O = new Q(z,M + "leave",W,i,F),
                        O.target = O1,
                        O.relatedTarget = E,
                        z = null,
                        Et(F) === L && (Q = new Q(T,M + "enter",Y,i,F),
                        Q.target = E,
                        Q.relatedTarget = O1,
                        z = Q),
                        O1 = z,
                        W && Y)
                            t: {
                                for (Q = W,
                                T = Y,
                                M = 0,
                                E = Q; E; E = t3(E))
                                    M++;
                                for (E = 0,
                                z = T; z; z = t3(z))
                                    E++;
                                for (; 0 < M - E; )
                                    Q = t3(Q),
                                    M--;
                                for (; 0 < E - M; )
                                    T = t3(T),
                                    E--;
                                for (; M--; ) {
                                    if (Q === T || T !== null && Q === T.alternate)
                                        break t;
                                    Q = t3(Q),
                                    T = t3(T)
                                }
                                Q = null
                            }
                        else
                            Q = null;
                        W !== null && t8(I, O, W, Q, !1),
                        Y !== null && O1 !== null && t8(I, O1, Y, Q, !0)
                    }
                }
                e: {
                    if (O = L ? r3(L) : window,
                    W = O.nodeName && O.nodeName.toLowerCase(),
                    W === "select" || W === "input" && O.type === "file")
                        var J = dl;
                    else if (Vr(O))
                        if (Or)
                            J = ml;
                        else {
                            J = hl;
                            var r1 = Cl
                        }
                    else
                        (W = O.nodeName) && W.toLowerCase() === "input" && (O.type === "checkbox" || O.type === "radio") && (J = pl);
                    if (J && (J = J(e, L))) {
                        Zr(I, J, i, F);
                        break e
                    }
                    r1 && r1(e, O, L),
                    e === "focusout" && (r1 = O._wrapperState) && r1.controlled && O.type === "number" && x7(O, "number", O.value)
                }
                switch (r1 = L ? r3(L) : window,
                e) {
                case "focusin":
                    (Vr(r1) || r1.contentEditable === "true") && (Jt = r1,
                    X7 = L,
                    Y3 = null);
                    break;
                case "focusout":
                    Y3 = X7 = Jt = null;
                    break;
                case "mousedown":
                    Y7 = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    Y7 = !1,
                    Hr(I, i, F);
                    break;
                case "selectionchange":
                    if (vl)
                        break;
                case "keydown":
                case "keyup":
                    Hr(I, i, F)
                }
                var i1;
                if ($7)
                    e: {
                        switch (e) {
                        case "compositionstart":
                            var l1 = "onCompositionStart";
                            break e;
                        case "compositionend":
                            l1 = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            l1 = "onCompositionUpdate";
                            break e
                        }
                        l1 = void 0
                    }
                else
                    qt ? Ar(e, i) && (l1 = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (l1 = "onCompositionStart");
                l1 && (Lr && i.locale !== "ko" && (qt || l1 !== "onCompositionStart" ? l1 === "onCompositionEnd" && qt && (i1 = Sr()) : (st = F,
                I7 = "value"in st ? st.value : st.textContent,
                qt = !0)),
                r1 = s4(L, l1),
                0 < r1.length && (l1 = new Er(l1,e,null,i,F),
                I.push({
                    event: l1,
                    listeners: r1
                }),
                i1 ? l1.data = i1 : (i1 = Dr(i),
                i1 !== null && (l1.data = i1)))),
                (i1 = ll ? al(e, i) : ul(e, i)) && (L = s4(L, "onBeforeInput"),
                0 < L.length && (F = new Er("onBeforeInput","beforeinput",null,i,F),
                I.push({
                    event: F,
                    listeners: L
                }),
                F.data = i1))
            }
            Jr(I, t)
        })
    }
    function J3(e, t, i) {
        return {
            instance: e,
            listener: t,
            currentTarget: i
        }
    }
    function s4(e, t) {
        for (var i = t + "Capture", o = []; e !== null; ) {
            var a = e
              , c = a.stateNode;
            a.tag === 5 && c !== null && (a = c,
            c = V3(e, i),
            c != null && o.unshift(J3(e, c, a)),
            c = V3(e, t),
            c != null && o.push(J3(e, c, a))),
            e = e.return
        }
        return o
    }
    function t3(e) {
        if (e === null)
            return null;
        do
            e = e.return;
        while (e && e.tag !== 5);
        return e || null
    }
    function t8(e, t, i, o, a) {
        for (var c = t._reactName, m = []; i !== null && i !== o; ) {
            var x = i
              , k = x.alternate
              , L = x.stateNode;
            if (k !== null && k === o)
                break;
            x.tag === 5 && L !== null && (x = L,
            a ? (k = V3(i, c),
            k != null && m.unshift(J3(i, k, x))) : a || (k = V3(i, c),
            k != null && m.push(J3(i, k, x)))),
            i = i.return
        }
        m.length !== 0 && e.push({
            event: t,
            listeners: m
        })
    }
    var Ml = /\r\n?/g
      , Sl = /\u0000|\uFFFD/g;
    function n8(e) {
        return (typeof e == "string" ? e : "" + e).replace(Ml, `
`).replace(Sl, "")
    }
    function o4(e, t, i) {
        if (t = n8(t),
        n8(e) !== t && i)
            throw Error(s(425))
    }
    function l4() {}
    var n6 = null
      , r6 = null;
    function i6(e, t) {
        return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
    }
    var s6 = typeof setTimeout == "function" ? setTimeout : void 0
      , jl = typeof clearTimeout == "function" ? clearTimeout : void 0
      , r8 = typeof Promise == "function" ? Promise : void 0
      , Tl = typeof queueMicrotask == "function" ? queueMicrotask : typeof r8 < "u" ? function(e) {
        return r8.resolve(null).then(e).catch(El)
    }
    : s6;
    function El(e) {
        setTimeout(function() {
            throw e
        })
    }
    function o6(e, t) {
        var i = t
          , o = 0;
        do {
            var a = i.nextSibling;
            if (e.removeChild(i),
            a && a.nodeType === 8)
                if (i = a.data,
                i === "/$") {
                    if (o === 0) {
                        e.removeChild(a),
                        U3(t);
                        return
                    }
                    o--
                } else
                    i !== "$" && i !== "$?" && i !== "$!" || o++;
            i = a
        } while (i);
        U3(t)
    }
    function lt(e) {
        for (; e != null; e = e.nextSibling) {
            var t = e.nodeType;
            if (t === 1 || t === 3)
                break;
            if (t === 8) {
                if (t = e.data,
                t === "$" || t === "$!" || t === "$?")
                    break;
                if (t === "/$")
                    return null
            }
        }
        return e
    }
    function i8(e) {
        e = e.previousSibling;
        for (var t = 0; e; ) {
            if (e.nodeType === 8) {
                var i = e.data;
                if (i === "$" || i === "$!" || i === "$?") {
                    if (t === 0)
                        return e;
                    t--
                } else
                    i === "/$" && t++
            }
            e = e.previousSibling
        }
        return null
    }
    var n3 = Math.random().toString(36).slice(2)
      , Oe = "__reactFiber$" + n3
      , en = "__reactProps$" + n3
      , He = "__reactContainer$" + n3
      , l6 = "__reactEvents$" + n3
      , Pl = "__reactListeners$" + n3
      , Ll = "__reactHandles$" + n3;
    function Et(e) {
        var t = e[Oe];
        if (t)
            return t;
        for (var i = e.parentNode; i; ) {
            if (t = i[He] || i[Oe]) {
                if (i = t.alternate,
                t.child !== null || i !== null && i.child !== null)
                    for (e = i8(e); e !== null; ) {
                        if (i = e[Oe])
                            return i;
                        e = i8(e)
                    }
                return t
            }
            e = i,
            i = e.parentNode
        }
        return null
    }
    function tn(e) {
        return e = e[Oe] || e[He],
        !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
    }
    function r3(e) {
        if (e.tag === 5 || e.tag === 6)
            return e.stateNode;
        throw Error(s(33))
    }
    function a4(e) {
        return e[en] || null
    }
    var a6 = []
      , i3 = -1;
    function at(e) {
        return {
            current: e
        }
    }
    function j1(e) {
        0 > i3 || (e.current = a6[i3],
        a6[i3] = null,
        i3--)
    }
    function M1(e, t) {
        i3++,
        a6[i3] = e.current,
        e.current = t
    }
    var ut = {}
      , Q1 = at(ut)
      , oe = at(!1)
      , Pt = ut;
    function s3(e, t) {
        var i = e.type.contextTypes;
        if (!i)
            return ut;
        var o = e.stateNode;
        if (o && o.__reactInternalMemoizedUnmaskedChildContext === t)
            return o.__reactInternalMemoizedMaskedChildContext;
        var a = {}, c;
        for (c in i)
            a[c] = t[c];
        return o && (e = e.stateNode,
        e.__reactInternalMemoizedUnmaskedChildContext = t,
        e.__reactInternalMemoizedMaskedChildContext = a),
        a
    }
    function le(e) {
        return e = e.childContextTypes,
        e != null
    }
    function u4() {
        j1(oe),
        j1(Q1)
    }
    function s8(e, t, i) {
        if (Q1.current !== ut)
            throw Error(s(168));
        M1(Q1, t),
        M1(oe, i)
    }
    function o8(e, t, i) {
        var o = e.stateNode;
        if (t = t.childContextTypes,
        typeof o.getChildContext != "function")
            return i;
        o = o.getChildContext();
        for (var a in o)
            if (!(a in t))
                throw Error(s(108, x1(e) || "Unknown", a));
        return B({}, i, o)
    }
    function c4(e) {
        return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || ut,
        Pt = Q1.current,
        M1(Q1, e),
        M1(oe, oe.current),
        !0
    }
    function l8(e, t, i) {
        var o = e.stateNode;
        if (!o)
            throw Error(s(169));
        i ? (e = o8(e, t, Pt),
        o.__reactInternalMemoizedMergedChildContext = e,
        j1(oe),
        j1(Q1),
        M1(Q1, e)) : j1(oe),
        M1(oe, i)
    }
    var $e = null
      , f4 = !1
      , u6 = !1;
    function a8(e) {
        $e === null ? $e = [e] : $e.push(e)
    }
    function _l(e) {
        f4 = !0,
        a8(e)
    }
    function ct() {
        if (!u6 && $e !== null) {
            u6 = !0;
            var e = 0
              , t = v1;
            try {
                var i = $e;
                for (v1 = 1; e < i.length; e++) {
                    var o = i[e];
                    do
                        o = o(!0);
                    while (o !== null)
                }
                $e = null,
                f4 = !1
            } catch (a) {
                throw $e !== null && ($e = $e.slice(e + 1)),
                cr(R7, ct),
                a
            } finally {
                v1 = t,
                u6 = !1
            }
        }
        return null
    }
    var o3 = []
      , l3 = 0
      , d4 = null
      , C4 = 0
      , ye = []
      , ge = 0
      , Lt = null
      , We = 1
      , Ke = "";
    function _t(e, t) {
        o3[l3++] = C4,
        o3[l3++] = d4,
        d4 = e,
        C4 = t
    }
    function u8(e, t, i) {
        ye[ge++] = We,
        ye[ge++] = Ke,
        ye[ge++] = Lt,
        Lt = e;
        var o = We;
        e = Ke;
        var a = 32 - Te(o) - 1;
        o &= ~(1 << a),
        i += 1;
        var c = 32 - Te(t) + a;
        if (30 < c) {
            var m = a - a % 5;
            c = (o & (1 << m) - 1).toString(32),
            o >>= m,
            a -= m,
            We = 1 << 32 - Te(t) + a | i << a | o,
            Ke = c + e
        } else
            We = 1 << c | i << a | o,
            Ke = e
    }
    function c6(e) {
        e.return !== null && (_t(e, 1),
        u8(e, 1, 0))
    }
    function f6(e) {
        for (; e === d4; )
            d4 = o3[--l3],
            o3[l3] = null,
            C4 = o3[--l3],
            o3[l3] = null;
        for (; e === Lt; )
            Lt = ye[--ge],
            ye[ge] = null,
            Ke = ye[--ge],
            ye[ge] = null,
            We = ye[--ge],
            ye[ge] = null
    }
    var he = null
      , pe = null
      , E1 = !1
      , Pe = null;
    function c8(e, t) {
        var i = ke(5, null, null, 0);
        i.elementType = "DELETED",
        i.stateNode = t,
        i.return = e,
        t = e.deletions,
        t === null ? (e.deletions = [i],
        e.flags |= 16) : t.push(i)
    }
    function f8(e, t) {
        switch (e.tag) {
        case 5:
            var i = e.type;
            return t = t.nodeType !== 1 || i.toLowerCase() !== t.nodeName.toLowerCase() ? null : t,
            t !== null ? (e.stateNode = t,
            he = e,
            pe = lt(t.firstChild),
            !0) : !1;
        case 6:
            return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t,
            t !== null ? (e.stateNode = t,
            he = e,
            pe = null,
            !0) : !1;
        case 13:
            return t = t.nodeType !== 8 ? null : t,
            t !== null ? (i = Lt !== null ? {
                id: We,
                overflow: Ke
            } : null,
            e.memoizedState = {
                dehydrated: t,
                treeContext: i,
                retryLane: 1073741824
            },
            i = ke(18, null, null, 0),
            i.stateNode = t,
            i.return = e,
            e.child = i,
            he = e,
            pe = null,
            !0) : !1;
        default:
            return !1
        }
    }
    function d6(e) {
        return (e.mode & 1) !== 0 && (e.flags & 128) === 0
    }
    function C6(e) {
        if (E1) {
            var t = pe;
            if (t) {
                var i = t;
                if (!f8(e, t)) {
                    if (d6(e))
                        throw Error(s(418));
                    t = lt(i.nextSibling);
                    var o = he;
                    t && f8(e, t) ? c8(o, i) : (e.flags = e.flags & -4097 | 2,
                    E1 = !1,
                    he = e)
                }
            } else {
                if (d6(e))
                    throw Error(s(418));
                e.flags = e.flags & -4097 | 2,
                E1 = !1,
                he = e
            }
        }
    }
    function d8(e) {
        for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
            e = e.return;
        he = e
    }
    function h4(e) {
        if (e !== he)
            return !1;
        if (!E1)
            return d8(e),
            E1 = !0,
            !1;
        var t;
        if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type,
        t = t !== "head" && t !== "body" && !i6(e.type, e.memoizedProps)),
        t && (t = pe)) {
            if (d6(e))
                throw C8(),
                Error(s(418));
            for (; t; )
                c8(e, t),
                t = lt(t.nextSibling)
        }
        if (d8(e),
        e.tag === 13) {
            if (e = e.memoizedState,
            e = e !== null ? e.dehydrated : null,
            !e)
                throw Error(s(317));
            e: {
                for (e = e.nextSibling,
                t = 0; e; ) {
                    if (e.nodeType === 8) {
                        var i = e.data;
                        if (i === "/$") {
                            if (t === 0) {
                                pe = lt(e.nextSibling);
                                break e
                            }
                            t--
                        } else
                            i !== "$" && i !== "$!" && i !== "$?" || t++
                    }
                    e = e.nextSibling
                }
                pe = null
            }
        } else
            pe = he ? lt(e.stateNode.nextSibling) : null;
        return !0
    }
    function C8() {
        for (var e = pe; e; )
            e = lt(e.nextSibling)
    }
    function a3() {
        pe = he = null,
        E1 = !1
    }
    function h6(e) {
        Pe === null ? Pe = [e] : Pe.push(e)
    }
    var Rl = X.ReactCurrentBatchConfig;
    function nn(e, t, i) {
        if (e = i.ref,
        e !== null && typeof e != "function" && typeof e != "object") {
            if (i._owner) {
                if (i = i._owner,
                i) {
                    if (i.tag !== 1)
                        throw Error(s(309));
                    var o = i.stateNode
                }
                if (!o)
                    throw Error(s(147, e));
                var a = o
                  , c = "" + e;
                return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === c ? t.ref : (t = function(m) {
                    var x = a.refs;
                    m === null ? delete x[c] : x[c] = m
                }
                ,
                t._stringRef = c,
                t)
            }
            if (typeof e != "string")
                throw Error(s(284));
            if (!i._owner)
                throw Error(s(290, e))
        }
        return e
    }
    function p4(e, t) {
        throw e = Object.prototype.toString.call(t),
        Error(s(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
    }
    function h8(e) {
        var t = e._init;
        return t(e._payload)
    }
    function p8(e) {
        function t(T, M) {
            if (e) {
                var E = T.deletions;
                E === null ? (T.deletions = [M],
                T.flags |= 16) : E.push(M)
            }
        }
        function i(T, M) {
            if (!e)
                return null;
            for (; M !== null; )
                t(T, M),
                M = M.sibling;
            return null
        }
        function o(T, M) {
            for (T = new Map; M !== null; )
                M.key !== null ? T.set(M.key, M) : T.set(M.index, M),
                M = M.sibling;
            return T
        }
        function a(T, M) {
            return T = gt(T, M),
            T.index = 0,
            T.sibling = null,
            T
        }
        function c(T, M, E) {
            return T.index = E,
            e ? (E = T.alternate,
            E !== null ? (E = E.index,
            E < M ? (T.flags |= 2,
            M) : E) : (T.flags |= 2,
            M)) : (T.flags |= 1048576,
            M)
        }
        function m(T) {
            return e && T.alternate === null && (T.flags |= 2),
            T
        }
        function x(T, M, E, z) {
            return M === null || M.tag !== 6 ? (M = s0(E, T.mode, z),
            M.return = T,
            M) : (M = a(M, E),
            M.return = T,
            M)
        }
        function k(T, M, E, z) {
            var J = E.type;
            return J === s1 ? F(T, M, E.props.children, z, E.key) : M !== null && (M.elementType === J || typeof J == "object" && J !== null && J.$$typeof === p1 && h8(J) === M.type) ? (z = a(M, E.props),
            z.ref = nn(T, M, E),
            z.return = T,
            z) : (z = I4(E.type, E.key, E.props, null, T.mode, z),
            z.ref = nn(T, M, E),
            z.return = T,
            z)
        }
        function L(T, M, E, z) {
            return M === null || M.tag !== 4 || M.stateNode.containerInfo !== E.containerInfo || M.stateNode.implementation !== E.implementation ? (M = o0(E, T.mode, z),
            M.return = T,
            M) : (M = a(M, E.children || []),
            M.return = T,
            M)
        }
        function F(T, M, E, z, J) {
            return M === null || M.tag !== 7 ? (M = Nt(E, T.mode, z, J),
            M.return = T,
            M) : (M = a(M, E),
            M.return = T,
            M)
        }
        function I(T, M, E) {
            if (typeof M == "string" && M !== "" || typeof M == "number")
                return M = s0("" + M, T.mode, E),
                M.return = T,
                M;
            if (typeof M == "object" && M !== null) {
                switch (M.$$typeof) {
                case $:
                    return E = I4(M.type, M.key, M.props, null, T.mode, E),
                    E.ref = nn(T, null, M),
                    E.return = T,
                    E;
                case t1:
                    return M = o0(M, T.mode, E),
                    M.return = T,
                    M;
                case p1:
                    var z = M._init;
                    return I(T, z(M._payload), E)
                }
                if (R3(M) || K(M))
                    return M = Nt(M, T.mode, E, null),
                    M.return = T,
                    M;
                p4(T, M)
            }
            return null
        }
        function O(T, M, E, z) {
            var J = M !== null ? M.key : null;
            if (typeof E == "string" && E !== "" || typeof E == "number")
                return J !== null ? null : x(T, M, "" + E, z);
            if (typeof E == "object" && E !== null) {
                switch (E.$$typeof) {
                case $:
                    return E.key === J ? k(T, M, E, z) : null;
                case t1:
                    return E.key === J ? L(T, M, E, z) : null;
                case p1:
                    return J = E._init,
                    O(T, M, J(E._payload), z)
                }
                if (R3(E) || K(E))
                    return J !== null ? null : F(T, M, E, z, null);
                p4(T, E)
            }
            return null
        }
        function W(T, M, E, z, J) {
            if (typeof z == "string" && z !== "" || typeof z == "number")
                return T = T.get(E) || null,
                x(M, T, "" + z, J);
            if (typeof z == "object" && z !== null) {
                switch (z.$$typeof) {
                case $:
                    return T = T.get(z.key === null ? E : z.key) || null,
                    k(M, T, z, J);
                case t1:
                    return T = T.get(z.key === null ? E : z.key) || null,
                    L(M, T, z, J);
                case p1:
                    var r1 = z._init;
                    return W(T, M, E, r1(z._payload), J)
                }
                if (R3(z) || K(z))
                    return T = T.get(E) || null,
                    F(M, T, z, J, null);
                p4(M, z)
            }
            return null
        }
        function Y(T, M, E, z) {
            for (var J = null, r1 = null, i1 = M, l1 = M = 0, $1 = null; i1 !== null && l1 < E.length; l1++) {
                i1.index > l1 ? ($1 = i1,
                i1 = null) : $1 = i1.sibling;
                var m1 = O(T, i1, E[l1], z);
                if (m1 === null) {
                    i1 === null && (i1 = $1);
                    break
                }
                e && i1 && m1.alternate === null && t(T, i1),
                M = c(m1, M, l1),
                r1 === null ? J = m1 : r1.sibling = m1,
                r1 = m1,
                i1 = $1
            }
            if (l1 === E.length)
                return i(T, i1),
                E1 && _t(T, l1),
                J;
            if (i1 === null) {
                for (; l1 < E.length; l1++)
                    i1 = I(T, E[l1], z),
                    i1 !== null && (M = c(i1, M, l1),
                    r1 === null ? J = i1 : r1.sibling = i1,
                    r1 = i1);
                return E1 && _t(T, l1),
                J
            }
            for (i1 = o(T, i1); l1 < E.length; l1++)
                $1 = W(i1, T, l1, E[l1], z),
                $1 !== null && (e && $1.alternate !== null && i1.delete($1.key === null ? l1 : $1.key),
                M = c($1, M, l1),
                r1 === null ? J = $1 : r1.sibling = $1,
                r1 = $1);
            return e && i1.forEach(function(vt) {
                return t(T, vt)
            }),
            E1 && _t(T, l1),
            J
        }
        function Q(T, M, E, z) {
            var J = K(E);
            if (typeof J != "function")
                throw Error(s(150));
            if (E = J.call(E),
            E == null)
                throw Error(s(151));
            for (var r1 = J = null, i1 = M, l1 = M = 0, $1 = null, m1 = E.next(); i1 !== null && !m1.done; l1++,
            m1 = E.next()) {
                i1.index > l1 ? ($1 = i1,
                i1 = null) : $1 = i1.sibling;
                var vt = O(T, i1, m1.value, z);
                if (vt === null) {
                    i1 === null && (i1 = $1);
                    break
                }
                e && i1 && vt.alternate === null && t(T, i1),
                M = c(vt, M, l1),
                r1 === null ? J = vt : r1.sibling = vt,
                r1 = vt,
                i1 = $1
            }
            if (m1.done)
                return i(T, i1),
                E1 && _t(T, l1),
                J;
            if (i1 === null) {
                for (; !m1.done; l1++,
                m1 = E.next())
                    m1 = I(T, m1.value, z),
                    m1 !== null && (M = c(m1, M, l1),
                    r1 === null ? J = m1 : r1.sibling = m1,
                    r1 = m1);
                return E1 && _t(T, l1),
                J
            }
            for (i1 = o(T, i1); !m1.done; l1++,
            m1 = E.next())
                m1 = W(i1, T, l1, m1.value, z),
                m1 !== null && (e && m1.alternate !== null && i1.delete(m1.key === null ? l1 : m1.key),
                M = c(m1, M, l1),
                r1 === null ? J = m1 : r1.sibling = m1,
                r1 = m1);
            return e && i1.forEach(function(ca) {
                return t(T, ca)
            }),
            E1 && _t(T, l1),
            J
        }
        function O1(T, M, E, z) {
            if (typeof E == "object" && E !== null && E.type === s1 && E.key === null && (E = E.props.children),
            typeof E == "object" && E !== null) {
                switch (E.$$typeof) {
                case $:
                    e: {
                        for (var J = E.key, r1 = M; r1 !== null; ) {
                            if (r1.key === J) {
                                if (J = E.type,
                                J === s1) {
                                    if (r1.tag === 7) {
                                        i(T, r1.sibling),
                                        M = a(r1, E.props.children),
                                        M.return = T,
                                        T = M;
                                        break e
                                    }
                                } else if (r1.elementType === J || typeof J == "object" && J !== null && J.$$typeof === p1 && h8(J) === r1.type) {
                                    i(T, r1.sibling),
                                    M = a(r1, E.props),
                                    M.ref = nn(T, r1, E),
                                    M.return = T,
                                    T = M;
                                    break e
                                }
                                i(T, r1);
                                break
                            } else
                                t(T, r1);
                            r1 = r1.sibling
                        }
                        E.type === s1 ? (M = Nt(E.props.children, T.mode, z, E.key),
                        M.return = T,
                        T = M) : (z = I4(E.type, E.key, E.props, null, T.mode, z),
                        z.ref = nn(T, M, E),
                        z.return = T,
                        T = z)
                    }
                    return m(T);
                case t1:
                    e: {
                        for (r1 = E.key; M !== null; ) {
                            if (M.key === r1)
                                if (M.tag === 4 && M.stateNode.containerInfo === E.containerInfo && M.stateNode.implementation === E.implementation) {
                                    i(T, M.sibling),
                                    M = a(M, E.children || []),
                                    M.return = T,
                                    T = M;
                                    break e
                                } else {
                                    i(T, M);
                                    break
                                }
                            else
                                t(T, M);
                            M = M.sibling
                        }
                        M = o0(E, T.mode, z),
                        M.return = T,
                        T = M
                    }
                    return m(T);
                case p1:
                    return r1 = E._init,
                    O1(T, M, r1(E._payload), z)
                }
                if (R3(E))
                    return Y(T, M, E, z);
                if (K(E))
                    return Q(T, M, E, z);
                p4(T, E)
            }
            return typeof E == "string" && E !== "" || typeof E == "number" ? (E = "" + E,
            M !== null && M.tag === 6 ? (i(T, M.sibling),
            M = a(M, E),
            M.return = T,
            T = M) : (i(T, M),
            M = s0(E, T.mode, z),
            M.return = T,
            T = M),
            m(T)) : i(T, M)
        }
        return O1
    }
    var u3 = p8(!0)
      , m8 = p8(!1)
      , m4 = at(null)
      , y4 = null
      , c3 = null
      , p6 = null;
    function m6() {
        p6 = c3 = y4 = null
    }
    function y6(e) {
        var t = m4.current;
        j1(m4),
        e._currentValue = t
    }
    function g6(e, t, i) {
        for (; e !== null; ) {
            var o = e.alternate;
            if ((e.childLanes & t) !== t ? (e.childLanes |= t,
            o !== null && (o.childLanes |= t)) : o !== null && (o.childLanes & t) !== t && (o.childLanes |= t),
            e === i)
                break;
            e = e.return
        }
    }
    function f3(e, t) {
        y4 = e,
        p6 = c3 = null,
        e = e.dependencies,
        e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (ae = !0),
        e.firstContext = null)
    }
    function ve(e) {
        var t = e._currentValue;
        if (p6 !== e)
            if (e = {
                context: e,
                memoizedValue: t,
                next: null
            },
            c3 === null) {
                if (y4 === null)
                    throw Error(s(308));
                c3 = e,
                y4.dependencies = {
                    lanes: 0,
                    firstContext: e
                }
            } else
                c3 = c3.next = e;
        return t
    }
    var Rt = null;
    function v6(e) {
        Rt === null ? Rt = [e] : Rt.push(e)
    }
    function y8(e, t, i, o) {
        var a = t.interleaved;
        return a === null ? (i.next = i,
        v6(t)) : (i.next = a.next,
        a.next = i),
        t.interleaved = i,
        Ge(e, o)
    }
    function Ge(e, t) {
        e.lanes |= t;
        var i = e.alternate;
        for (i !== null && (i.lanes |= t),
        i = e,
        e = e.return; e !== null; )
            e.childLanes |= t,
            i = e.alternate,
            i !== null && (i.childLanes |= t),
            i = e,
            e = e.return;
        return i.tag === 3 ? i.stateNode : null
    }
    var ft = !1;
    function x6(e) {
        e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: {
                pending: null,
                interleaved: null,
                lanes: 0
            },
            effects: null
        }
    }
    function g8(e, t) {
        e = e.updateQueue,
        t.updateQueue === e && (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            effects: e.effects
        })
    }
    function Xe(e, t) {
        return {
            eventTime: e,
            lane: t,
            tag: 0,
            payload: null,
            callback: null,
            next: null
        }
    }
    function dt(e, t, i) {
        var o = e.updateQueue;
        if (o === null)
            return null;
        if (o = o.shared,
        (h1 & 2) !== 0) {
            var a = o.pending;
            return a === null ? t.next = t : (t.next = a.next,
            a.next = t),
            o.pending = t,
            Ge(e, i)
        }
        return a = o.interleaved,
        a === null ? (t.next = t,
        v6(o)) : (t.next = a.next,
        a.next = t),
        o.interleaved = t,
        Ge(e, i)
    }
    function g4(e, t, i) {
        if (t = t.updateQueue,
        t !== null && (t = t.shared,
        (i & 4194240) !== 0)) {
            var o = t.lanes;
            o &= e.pendingLanes,
            i |= o,
            t.lanes = i,
            V7(e, i)
        }
    }
    function v8(e, t) {
        var i = e.updateQueue
          , o = e.alternate;
        if (o !== null && (o = o.updateQueue,
        i === o)) {
            var a = null
              , c = null;
            if (i = i.firstBaseUpdate,
            i !== null) {
                do {
                    var m = {
                        eventTime: i.eventTime,
                        lane: i.lane,
                        tag: i.tag,
                        payload: i.payload,
                        callback: i.callback,
                        next: null
                    };
                    c === null ? a = c = m : c = c.next = m,
                    i = i.next
                } while (i !== null);
                c === null ? a = c = t : c = c.next = t
            } else
                a = c = t;
            i = {
                baseState: o.baseState,
                firstBaseUpdate: a,
                lastBaseUpdate: c,
                shared: o.shared,
                effects: o.effects
            },
            e.updateQueue = i;
            return
        }
        e = i.lastBaseUpdate,
        e === null ? i.firstBaseUpdate = t : e.next = t,
        i.lastBaseUpdate = t
    }
    function v4(e, t, i, o) {
        var a = e.updateQueue;
        ft = !1;
        var c = a.firstBaseUpdate
          , m = a.lastBaseUpdate
          , x = a.shared.pending;
        if (x !== null) {
            a.shared.pending = null;
            var k = x
              , L = k.next;
            k.next = null,
            m === null ? c = L : m.next = L,
            m = k;
            var F = e.alternate;
            F !== null && (F = F.updateQueue,
            x = F.lastBaseUpdate,
            x !== m && (x === null ? F.firstBaseUpdate = L : x.next = L,
            F.lastBaseUpdate = k))
        }
        if (c !== null) {
            var I = a.baseState;
            m = 0,
            F = L = k = null,
            x = c;
            do {
                var O = x.lane
                  , W = x.eventTime;
                if ((o & O) === O) {
                    F !== null && (F = F.next = {
                        eventTime: W,
                        lane: 0,
                        tag: x.tag,
                        payload: x.payload,
                        callback: x.callback,
                        next: null
                    });
                    e: {
                        var Y = e
                          , Q = x;
                        switch (O = t,
                        W = i,
                        Q.tag) {
                        case 1:
                            if (Y = Q.payload,
                            typeof Y == "function") {
                                I = Y.call(W, I, O);
                                break e
                            }
                            I = Y;
                            break e;
                        case 3:
                            Y.flags = Y.flags & -65537 | 128;
                        case 0:
                            if (Y = Q.payload,
                            O = typeof Y == "function" ? Y.call(W, I, O) : Y,
                            O == null)
                                break e;
                            I = B({}, I, O);
                            break e;
                        case 2:
                            ft = !0
                        }
                    }
                    x.callback !== null && x.lane !== 0 && (e.flags |= 64,
                    O = a.effects,
                    O === null ? a.effects = [x] : O.push(x))
                } else
                    W = {
                        eventTime: W,
                        lane: O,
                        tag: x.tag,
                        payload: x.payload,
                        callback: x.callback,
                        next: null
                    },
                    F === null ? (L = F = W,
                    k = I) : F = F.next = W,
                    m |= O;
                if (x = x.next,
                x === null) {
                    if (x = a.shared.pending,
                    x === null)
                        break;
                    O = x,
                    x = O.next,
                    O.next = null,
                    a.lastBaseUpdate = O,
                    a.shared.pending = null
                }
            } while (!0);
            if (F === null && (k = I),
            a.baseState = k,
            a.firstBaseUpdate = L,
            a.lastBaseUpdate = F,
            t = a.shared.interleaved,
            t !== null) {
                a = t;
                do
                    m |= a.lane,
                    a = a.next;
                while (a !== t)
            } else
                c === null && (a.shared.lanes = 0);
            Vt |= m,
            e.lanes = m,
            e.memoizedState = I
        }
    }
    function x8(e, t, i) {
        if (e = t.effects,
        t.effects = null,
        e !== null)
            for (t = 0; t < e.length; t++) {
                var o = e[t]
                  , a = o.callback;
                if (a !== null) {
                    if (o.callback = null,
                    o = i,
                    typeof a != "function")
                        throw Error(s(191, a));
                    a.call(o)
                }
            }
    }
    var rn = {}
      , Fe = at(rn)
      , sn = at(rn)
      , on = at(rn);
    function At(e) {
        if (e === rn)
            throw Error(s(174));
        return e
    }
    function w6(e, t) {
        switch (M1(on, t),
        M1(sn, e),
        M1(Fe, rn),
        e = t.nodeType,
        e) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : k7(null, "");
            break;
        default:
            e = e === 8 ? t.parentNode : t,
            t = e.namespaceURI || null,
            e = e.tagName,
            t = k7(t, e)
        }
        j1(Fe),
        M1(Fe, t)
    }
    function d3() {
        j1(Fe),
        j1(sn),
        j1(on)
    }
    function w8(e) {
        At(on.current);
        var t = At(Fe.current)
          , i = k7(t, e.type);
        t !== i && (M1(sn, e),
        M1(Fe, i))
    }
    function k6(e) {
        sn.current === e && (j1(Fe),
        j1(sn))
    }
    var P1 = at(0);
    function x4(e) {
        for (var t = e; t !== null; ) {
            if (t.tag === 13) {
                var i = t.memoizedState;
                if (i !== null && (i = i.dehydrated,
                i === null || i.data === "$?" || i.data === "$!"))
                    return t
            } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
                if ((t.flags & 128) !== 0)
                    return t
            } else if (t.child !== null) {
                t.child.return = t,
                t = t.child;
                continue
            }
            if (t === e)
                break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                    return null;
                t = t.return
            }
            t.sibling.return = t.return,
            t = t.sibling
        }
        return null
    }
    var M6 = [];
    function S6() {
        for (var e = 0; e < M6.length; e++)
            M6[e]._workInProgressVersionPrimary = null;
        M6.length = 0
    }
    var w4 = X.ReactCurrentDispatcher
      , j6 = X.ReactCurrentBatchConfig
      , Dt = 0
      , L1 = null
      , z1 = null
      , U1 = null
      , k4 = !1
      , ln = !1
      , an = 0
      , Al = 0;
    function q1() {
        throw Error(s(321))
    }
    function T6(e, t) {
        if (t === null)
            return !1;
        for (var i = 0; i < t.length && i < e.length; i++)
            if (!Ee(e[i], t[i]))
                return !1;
        return !0
    }
    function E6(e, t, i, o, a, c) {
        if (Dt = c,
        L1 = t,
        t.memoizedState = null,
        t.updateQueue = null,
        t.lanes = 0,
        w4.current = e === null || e.memoizedState === null ? Ol : Fl,
        e = i(o, a),
        ln) {
            c = 0;
            do {
                if (ln = !1,
                an = 0,
                25 <= c)
                    throw Error(s(301));
                c += 1,
                U1 = z1 = null,
                t.updateQueue = null,
                w4.current = Nl,
                e = i(o, a)
            } while (ln)
        }
        if (w4.current = j4,
        t = z1 !== null && z1.next !== null,
        Dt = 0,
        U1 = z1 = L1 = null,
        k4 = !1,
        t)
            throw Error(s(300));
        return e
    }
    function P6() {
        var e = an !== 0;
        return an = 0,
        e
    }
    function Ne() {
        var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
        };
        return U1 === null ? L1.memoizedState = U1 = e : U1 = U1.next = e,
        U1
    }
    function xe() {
        if (z1 === null) {
            var e = L1.alternate;
            e = e !== null ? e.memoizedState : null
        } else
            e = z1.next;
        var t = U1 === null ? L1.memoizedState : U1.next;
        if (t !== null)
            U1 = t,
            z1 = e;
        else {
            if (e === null)
                throw Error(s(310));
            z1 = e,
            e = {
                memoizedState: z1.memoizedState,
                baseState: z1.baseState,
                baseQueue: z1.baseQueue,
                queue: z1.queue,
                next: null
            },
            U1 === null ? L1.memoizedState = U1 = e : U1 = U1.next = e
        }
        return U1
    }
    function un(e, t) {
        return typeof t == "function" ? t(e) : t
    }
    function L6(e) {
        var t = xe()
          , i = t.queue;
        if (i === null)
            throw Error(s(311));
        i.lastRenderedReducer = e;
        var o = z1
          , a = o.baseQueue
          , c = i.pending;
        if (c !== null) {
            if (a !== null) {
                var m = a.next;
                a.next = c.next,
                c.next = m
            }
            o.baseQueue = a = c,
            i.pending = null
        }
        if (a !== null) {
            c = a.next,
            o = o.baseState;
            var x = m = null
              , k = null
              , L = c;
            do {
                var F = L.lane;
                if ((Dt & F) === F)
                    k !== null && (k = k.next = {
                        lane: 0,
                        action: L.action,
                        hasEagerState: L.hasEagerState,
                        eagerState: L.eagerState,
                        next: null
                    }),
                    o = L.hasEagerState ? L.eagerState : e(o, L.action);
                else {
                    var I = {
                        lane: F,
                        action: L.action,
                        hasEagerState: L.hasEagerState,
                        eagerState: L.eagerState,
                        next: null
                    };
                    k === null ? (x = k = I,
                    m = o) : k = k.next = I,
                    L1.lanes |= F,
                    Vt |= F
                }
                L = L.next
            } while (L !== null && L !== c);
            k === null ? m = o : k.next = x,
            Ee(o, t.memoizedState) || (ae = !0),
            t.memoizedState = o,
            t.baseState = m,
            t.baseQueue = k,
            i.lastRenderedState = o
        }
        if (e = i.interleaved,
        e !== null) {
            a = e;
            do
                c = a.lane,
                L1.lanes |= c,
                Vt |= c,
                a = a.next;
            while (a !== e)
        } else
            a === null && (i.lanes = 0);
        return [t.memoizedState, i.dispatch]
    }
    function _6(e) {
        var t = xe()
          , i = t.queue;
        if (i === null)
            throw Error(s(311));
        i.lastRenderedReducer = e;
        var o = i.dispatch
          , a = i.pending
          , c = t.memoizedState;
        if (a !== null) {
            i.pending = null;
            var m = a = a.next;
            do
                c = e(c, m.action),
                m = m.next;
            while (m !== a);
            Ee(c, t.memoizedState) || (ae = !0),
            t.memoizedState = c,
            t.baseQueue === null && (t.baseState = c),
            i.lastRenderedState = c
        }
        return [c, o]
    }
    function k8() {}
    function M8(e, t) {
        var i = L1
          , o = xe()
          , a = t()
          , c = !Ee(o.memoizedState, a);
        if (c && (o.memoizedState = a,
        ae = !0),
        o = o.queue,
        R6(T8.bind(null, i, o, e), [e]),
        o.getSnapshot !== t || c || U1 !== null && U1.memoizedState.tag & 1) {
            if (i.flags |= 2048,
            cn(9, j8.bind(null, i, o, a, t), void 0, null),
            H1 === null)
                throw Error(s(349));
            (Dt & 30) !== 0 || S8(i, t, a)
        }
        return a
    }
    function S8(e, t, i) {
        e.flags |= 16384,
        e = {
            getSnapshot: t,
            value: i
        },
        t = L1.updateQueue,
        t === null ? (t = {
            lastEffect: null,
            stores: null
        },
        L1.updateQueue = t,
        t.stores = [e]) : (i = t.stores,
        i === null ? t.stores = [e] : i.push(e))
    }
    function j8(e, t, i, o) {
        t.value = i,
        t.getSnapshot = o,
        E8(t) && P8(e)
    }
    function T8(e, t, i) {
        return i(function() {
            E8(t) && P8(e)
        })
    }
    function E8(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
            var i = t();
            return !Ee(e, i)
        } catch {
            return !0
        }
    }
    function P8(e) {
        var t = Ge(e, 1);
        t !== null && Ae(t, e, 1, -1)
    }
    function L8(e) {
        var t = Ne();
        return typeof e == "function" && (e = e()),
        t.memoizedState = t.baseState = e,
        e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: un,
            lastRenderedState: e
        },
        t.queue = e,
        e = e.dispatch = Zl.bind(null, L1, e),
        [t.memoizedState, e]
    }
    function cn(e, t, i, o) {
        return e = {
            tag: e,
            create: t,
            destroy: i,
            deps: o,
            next: null
        },
        t = L1.updateQueue,
        t === null ? (t = {
            lastEffect: null,
            stores: null
        },
        L1.updateQueue = t,
        t.lastEffect = e.next = e) : (i = t.lastEffect,
        i === null ? t.lastEffect = e.next = e : (o = i.next,
        i.next = e,
        e.next = o,
        t.lastEffect = e)),
        e
    }
    function _8() {
        return xe().memoizedState
    }
    function M4(e, t, i, o) {
        var a = Ne();
        L1.flags |= e,
        a.memoizedState = cn(1 | t, i, void 0, o === void 0 ? null : o)
    }
    function S4(e, t, i, o) {
        var a = xe();
        o = o === void 0 ? null : o;
        var c = void 0;
        if (z1 !== null) {
            var m = z1.memoizedState;
            if (c = m.destroy,
            o !== null && T6(o, m.deps)) {
                a.memoizedState = cn(t, i, c, o);
                return
            }
        }
        L1.flags |= e,
        a.memoizedState = cn(1 | t, i, c, o)
    }
    function R8(e, t) {
        return M4(8390656, 8, e, t)
    }
    function R6(e, t) {
        return S4(2048, 8, e, t)
    }
    function A8(e, t) {
        return S4(4, 2, e, t)
    }
    function D8(e, t) {
        return S4(4, 4, e, t)
    }
    function V8(e, t) {
        if (typeof t == "function")
            return e = e(),
            t(e),
            function() {
                t(null)
            }
            ;
        if (t != null)
            return e = e(),
            t.current = e,
            function() {
                t.current = null
            }
    }
    function Z8(e, t, i) {
        return i = i != null ? i.concat([e]) : null,
        S4(4, 4, V8.bind(null, t, e), i)
    }
    function A6() {}
    function O8(e, t) {
        var i = xe();
        t = t === void 0 ? null : t;
        var o = i.memoizedState;
        return o !== null && t !== null && T6(t, o[1]) ? o[0] : (i.memoizedState = [e, t],
        e)
    }
    function F8(e, t) {
        var i = xe();
        t = t === void 0 ? null : t;
        var o = i.memoizedState;
        return o !== null && t !== null && T6(t, o[1]) ? o[0] : (e = e(),
        i.memoizedState = [e, t],
        e)
    }
    function N8(e, t, i) {
        return (Dt & 21) === 0 ? (e.baseState && (e.baseState = !1,
        ae = !0),
        e.memoizedState = i) : (Ee(i, t) || (i = hr(),
        L1.lanes |= i,
        Vt |= i,
        e.baseState = !0),
        t)
    }
    function Dl(e, t) {
        var i = v1;
        v1 = i !== 0 && 4 > i ? i : 4,
        e(!0);
        var o = j6.transition;
        j6.transition = {};
        try {
            e(!1),
            t()
        } finally {
            v1 = i,
            j6.transition = o
        }
    }
    function I8() {
        return xe().memoizedState
    }
    function Vl(e, t, i) {
        var o = mt(e);
        if (i = {
            lane: o,
            action: i,
            hasEagerState: !1,
            eagerState: null,
            next: null
        },
        b8(e))
            z8(t, i);
        else if (i = y8(e, t, i, o),
        i !== null) {
            var a = ie();
            Ae(i, e, o, a),
            B8(i, t, o)
        }
    }
    function Zl(e, t, i) {
        var o = mt(e)
          , a = {
            lane: o,
            action: i,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
        if (b8(e))
            z8(t, a);
        else {
            var c = e.alternate;
            if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer,
            c !== null))
                try {
                    var m = t.lastRenderedState
                      , x = c(m, i);
                    if (a.hasEagerState = !0,
                    a.eagerState = x,
                    Ee(x, m)) {
                        var k = t.interleaved;
                        k === null ? (a.next = a,
                        v6(t)) : (a.next = k.next,
                        k.next = a),
                        t.interleaved = a;
                        return
                    }
                } catch {} finally {}
            i = y8(e, t, a, o),
            i !== null && (a = ie(),
            Ae(i, e, o, a),
            B8(i, t, o))
        }
    }
    function b8(e) {
        var t = e.alternate;
        return e === L1 || t !== null && t === L1
    }
    function z8(e, t) {
        ln = k4 = !0;
        var i = e.pending;
        i === null ? t.next = t : (t.next = i.next,
        i.next = t),
        e.pending = t
    }
    function B8(e, t, i) {
        if ((i & 4194240) !== 0) {
            var o = t.lanes;
            o &= e.pendingLanes,
            i |= o,
            t.lanes = i,
            V7(e, i)
        }
    }
    var j4 = {
        readContext: ve,
        useCallback: q1,
        useContext: q1,
        useEffect: q1,
        useImperativeHandle: q1,
        useInsertionEffect: q1,
        useLayoutEffect: q1,
        useMemo: q1,
        useReducer: q1,
        useRef: q1,
        useState: q1,
        useDebugValue: q1,
        useDeferredValue: q1,
        useTransition: q1,
        useMutableSource: q1,
        useSyncExternalStore: q1,
        useId: q1,
        unstable_isNewReconciler: !1
    }
      , Ol = {
        readContext: ve,
        useCallback: function(e, t) {
            return Ne().memoizedState = [e, t === void 0 ? null : t],
            e
        },
        useContext: ve,
        useEffect: R8,
        useImperativeHandle: function(e, t, i) {
            return i = i != null ? i.concat([e]) : null,
            M4(4194308, 4, V8.bind(null, t, e), i)
        },
        useLayoutEffect: function(e, t) {
            return M4(4194308, 4, e, t)
        },
        useInsertionEffect: function(e, t) {
            return M4(4, 2, e, t)
        },
        useMemo: function(e, t) {
            var i = Ne();
            return t = t === void 0 ? null : t,
            e = e(),
            i.memoizedState = [e, t],
            e
        },
        useReducer: function(e, t, i) {
            var o = Ne();
            return t = i !== void 0 ? i(t) : t,
            o.memoizedState = o.baseState = t,
            e = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: t
            },
            o.queue = e,
            e = e.dispatch = Vl.bind(null, L1, e),
            [o.memoizedState, e]
        },
        useRef: function(e) {
            var t = Ne();
            return e = {
                current: e
            },
            t.memoizedState = e
        },
        useState: L8,
        useDebugValue: A6,
        useDeferredValue: function(e) {
            return Ne().memoizedState = e
        },
        useTransition: function() {
            var e = L8(!1)
              , t = e[0];
            return e = Dl.bind(null, e[1]),
            Ne().memoizedState = e,
            [t, e]
        },
        useMutableSource: function() {},
        useSyncExternalStore: function(e, t, i) {
            var o = L1
              , a = Ne();
            if (E1) {
                if (i === void 0)
                    throw Error(s(407));
                i = i()
            } else {
                if (i = t(),
                H1 === null)
                    throw Error(s(349));
                (Dt & 30) !== 0 || S8(o, t, i)
            }
            a.memoizedState = i;
            var c = {
                value: i,
                getSnapshot: t
            };
            return a.queue = c,
            R8(T8.bind(null, o, c, e), [e]),
            o.flags |= 2048,
            cn(9, j8.bind(null, o, c, i, t), void 0, null),
            i
        },
        useId: function() {
            var e = Ne()
              , t = H1.identifierPrefix;
            if (E1) {
                var i = Ke
                  , o = We;
                i = (o & ~(1 << 32 - Te(o) - 1)).toString(32) + i,
                t = ":" + t + "R" + i,
                i = an++,
                0 < i && (t += "H" + i.toString(32)),
                t += ":"
            } else
                i = Al++,
                t = ":" + t + "r" + i.toString(32) + ":";
            return e.memoizedState = t
        },
        unstable_isNewReconciler: !1
    }
      , Fl = {
        readContext: ve,
        useCallback: O8,
        useContext: ve,
        useEffect: R6,
        useImperativeHandle: Z8,
        useInsertionEffect: A8,
        useLayoutEffect: D8,
        useMemo: F8,
        useReducer: L6,
        useRef: _8,
        useState: function() {
            return L6(un)
        },
        useDebugValue: A6,
        useDeferredValue: function(e) {
            var t = xe();
            return N8(t, z1.memoizedState, e)
        },
        useTransition: function() {
            var e = L6(un)[0]
              , t = xe().memoizedState;
            return [e, t]
        },
        useMutableSource: k8,
        useSyncExternalStore: M8,
        useId: I8,
        unstable_isNewReconciler: !1
    }
      , Nl = {
        readContext: ve,
        useCallback: O8,
        useContext: ve,
        useEffect: R6,
        useImperativeHandle: Z8,
        useInsertionEffect: A8,
        useLayoutEffect: D8,
        useMemo: F8,
        useReducer: _6,
        useRef: _8,
        useState: function() {
            return _6(un)
        },
        useDebugValue: A6,
        useDeferredValue: function(e) {
            var t = xe();
            return z1 === null ? t.memoizedState = e : N8(t, z1.memoizedState, e)
        },
        useTransition: function() {
            var e = _6(un)[0]
              , t = xe().memoizedState;
            return [e, t]
        },
        useMutableSource: k8,
        useSyncExternalStore: M8,
        useId: I8,
        unstable_isNewReconciler: !1
    };
    function Le(e, t) {
        if (e && e.defaultProps) {
            t = B({}, t),
            e = e.defaultProps;
            for (var i in e)
                t[i] === void 0 && (t[i] = e[i]);
            return t
        }
        return t
    }
    function D6(e, t, i, o) {
        t = e.memoizedState,
        i = i(o, t),
        i = i == null ? t : B({}, t, i),
        e.memoizedState = i,
        e.lanes === 0 && (e.updateQueue.baseState = i)
    }
    var T4 = {
        isMounted: function(e) {
            return (e = e._reactInternals) ? Tt(e) === e : !1
        },
        enqueueSetState: function(e, t, i) {
            e = e._reactInternals;
            var o = ie()
              , a = mt(e)
              , c = Xe(o, a);
            c.payload = t,
            i != null && (c.callback = i),
            t = dt(e, c, a),
            t !== null && (Ae(t, e, a, o),
            g4(t, e, a))
        },
        enqueueReplaceState: function(e, t, i) {
            e = e._reactInternals;
            var o = ie()
              , a = mt(e)
              , c = Xe(o, a);
            c.tag = 1,
            c.payload = t,
            i != null && (c.callback = i),
            t = dt(e, c, a),
            t !== null && (Ae(t, e, a, o),
            g4(t, e, a))
        },
        enqueueForceUpdate: function(e, t) {
            e = e._reactInternals;
            var i = ie()
              , o = mt(e)
              , a = Xe(i, o);
            a.tag = 2,
            t != null && (a.callback = t),
            t = dt(e, a, o),
            t !== null && (Ae(t, e, o, i),
            g4(t, e, o))
        }
    };
    function U8(e, t, i, o, a, c, m) {
        return e = e.stateNode,
        typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, c, m) : t.prototype && t.prototype.isPureReactComponent ? !X3(i, o) || !X3(a, c) : !0
    }
    function H8(e, t, i) {
        var o = !1
          , a = ut
          , c = t.contextType;
        return typeof c == "object" && c !== null ? c = ve(c) : (a = le(t) ? Pt : Q1.current,
        o = t.contextTypes,
        c = (o = o != null) ? s3(e, a) : ut),
        t = new t(i,c),
        e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null,
        t.updater = T4,
        e.stateNode = t,
        t._reactInternals = e,
        o && (e = e.stateNode,
        e.__reactInternalMemoizedUnmaskedChildContext = a,
        e.__reactInternalMemoizedMaskedChildContext = c),
        t
    }
    function $8(e, t, i, o) {
        e = t.state,
        typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, o),
        typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, o),
        t.state !== e && T4.enqueueReplaceState(t, t.state, null)
    }
    function V6(e, t, i, o) {
        var a = e.stateNode;
        a.props = i,
        a.state = e.memoizedState,
        a.refs = {},
        x6(e);
        var c = t.contextType;
        typeof c == "object" && c !== null ? a.context = ve(c) : (c = le(t) ? Pt : Q1.current,
        a.context = s3(e, c)),
        a.state = e.memoizedState,
        c = t.getDerivedStateFromProps,
        typeof c == "function" && (D6(e, t, c, i),
        a.state = e.memoizedState),
        typeof t.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (t = a.state,
        typeof a.componentWillMount == "function" && a.componentWillMount(),
        typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(),
        t !== a.state && T4.enqueueReplaceState(a, a.state, null),
        v4(e, i, a, o),
        a.state = e.memoizedState),
        typeof a.componentDidMount == "function" && (e.flags |= 4194308)
    }
    function C3(e, t) {
        try {
            var i = ""
              , o = t;
            do
                i += C1(o),
                o = o.return;
            while (o);
            var a = i
        } catch (c) {
            a = `
Error generating stack: ` + c.message + `
` + c.stack
        }
        return {
            value: e,
            source: t,
            stack: a,
            digest: null
        }
    }
    function Z6(e, t, i) {
        return {
            value: e,
            source: null,
            stack: i ?? null,
            digest: t ?? null
        }
    }
    function O6(e, t) {
        try {
            console.error(t.value)
        } catch (i) {
            setTimeout(function() {
                throw i
            })
        }
    }
    var Il = typeof WeakMap == "function" ? WeakMap : Map;
    function W8(e, t, i) {
        i = Xe(-1, i),
        i.tag = 3,
        i.payload = {
            element: null
        };
        var o = t.value;
        return i.callback = function() {
            D4 || (D4 = !0,
            Q6 = o),
            O6(e, t)
        }
        ,
        i
    }
    function K8(e, t, i) {
        i = Xe(-1, i),
        i.tag = 3;
        var o = e.type.getDerivedStateFromError;
        if (typeof o == "function") {
            var a = t.value;
            i.payload = function() {
                return o(a)
            }
            ,
            i.callback = function() {
                O6(e, t)
            }
        }
        var c = e.stateNode;
        return c !== null && typeof c.componentDidCatch == "function" && (i.callback = function() {
            O6(e, t),
            typeof o != "function" && (ht === null ? ht = new Set([this]) : ht.add(this));
            var m = t.stack;
            this.componentDidCatch(t.value, {
                componentStack: m !== null ? m : ""
            })
        }
        ),
        i
    }
    function G8(e, t, i) {
        var o = e.pingCache;
        if (o === null) {
            o = e.pingCache = new Il;
            var a = new Set;
            o.set(t, a)
        } else
            a = o.get(t),
            a === void 0 && (a = new Set,
            o.set(t, a));
        a.has(i) || (a.add(i),
        e = Jl.bind(null, e, t, i),
        t.then(e, e))
    }
    function X8(e) {
        do {
            var t;
            if ((t = e.tag === 13) && (t = e.memoizedState,
            t = t !== null ? t.dehydrated !== null : !0),
            t)
                return e;
            e = e.return
        } while (e !== null);
        return null
    }
    function Y8(e, t, i, o, a) {
        return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128,
        i.flags |= 131072,
        i.flags &= -52805,
        i.tag === 1 && (i.alternate === null ? i.tag = 17 : (t = Xe(-1, 1),
        t.tag = 2,
        dt(i, t, 1))),
        i.lanes |= 1),
        e) : (e.flags |= 65536,
        e.lanes = a,
        e)
    }
    var bl = X.ReactCurrentOwner
      , ae = !1;
    function re(e, t, i, o) {
        t.child = e === null ? m8(t, null, i, o) : u3(t, e.child, i, o)
    }
    function Q8(e, t, i, o, a) {
        i = i.render;
        var c = t.ref;
        return f3(t, a),
        o = E6(e, t, i, o, c, a),
        i = P6(),
        e !== null && !ae ? (t.updateQueue = e.updateQueue,
        t.flags &= -2053,
        e.lanes &= ~a,
        Ye(e, t, a)) : (E1 && i && c6(t),
        t.flags |= 1,
        re(e, t, o, a),
        t.child)
    }
    function q8(e, t, i, o, a) {
        if (e === null) {
            var c = i.type;
            return typeof c == "function" && !i0(c) && c.defaultProps === void 0 && i.compare === null && i.defaultProps === void 0 ? (t.tag = 15,
            t.type = c,
            J8(e, t, c, o, a)) : (e = I4(i.type, null, o, t, t.mode, a),
            e.ref = t.ref,
            e.return = t,
            t.child = e)
        }
        if (c = e.child,
        (e.lanes & a) === 0) {
            var m = c.memoizedProps;
            if (i = i.compare,
            i = i !== null ? i : X3,
            i(m, o) && e.ref === t.ref)
                return Ye(e, t, a)
        }
        return t.flags |= 1,
        e = gt(c, o),
        e.ref = t.ref,
        e.return = t,
        t.child = e
    }
    function J8(e, t, i, o, a) {
        if (e !== null) {
            var c = e.memoizedProps;
            if (X3(c, o) && e.ref === t.ref)
                if (ae = !1,
                t.pendingProps = o = c,
                (e.lanes & a) !== 0)
                    (e.flags & 131072) !== 0 && (ae = !0);
                else
                    return t.lanes = e.lanes,
                    Ye(e, t, a)
        }
        return F6(e, t, i, o, a)
    }
    function ei(e, t, i) {
        var o = t.pendingProps
          , a = o.children
          , c = e !== null ? e.memoizedState : null;
        if (o.mode === "hidden")
            if ((t.mode & 1) === 0)
                t.memoizedState = {
                    baseLanes: 0,
                    cachePool: null,
                    transitions: null
                },
                M1(p3, me),
                me |= i;
            else {
                if ((i & 1073741824) === 0)
                    return e = c !== null ? c.baseLanes | i : i,
                    t.lanes = t.childLanes = 1073741824,
                    t.memoizedState = {
                        baseLanes: e,
                        cachePool: null,
                        transitions: null
                    },
                    t.updateQueue = null,
                    M1(p3, me),
                    me |= e,
                    null;
                t.memoizedState = {
                    baseLanes: 0,
                    cachePool: null,
                    transitions: null
                },
                o = c !== null ? c.baseLanes : i,
                M1(p3, me),
                me |= o
            }
        else
            c !== null ? (o = c.baseLanes | i,
            t.memoizedState = null) : o = i,
            M1(p3, me),
            me |= o;
        return re(e, t, a, i),
        t.child
    }
    function ti(e, t) {
        var i = t.ref;
        (e === null && i !== null || e !== null && e.ref !== i) && (t.flags |= 512,
        t.flags |= 2097152)
    }
    function F6(e, t, i, o, a) {
        var c = le(i) ? Pt : Q1.current;
        return c = s3(t, c),
        f3(t, a),
        i = E6(e, t, i, o, c, a),
        o = P6(),
        e !== null && !ae ? (t.updateQueue = e.updateQueue,
        t.flags &= -2053,
        e.lanes &= ~a,
        Ye(e, t, a)) : (E1 && o && c6(t),
        t.flags |= 1,
        re(e, t, i, a),
        t.child)
    }
    function ni(e, t, i, o, a) {
        if (le(i)) {
            var c = !0;
            c4(t)
        } else
            c = !1;
        if (f3(t, a),
        t.stateNode === null)
            P4(e, t),
            H8(t, i, o),
            V6(t, i, o, a),
            o = !0;
        else if (e === null) {
            var m = t.stateNode
              , x = t.memoizedProps;
            m.props = x;
            var k = m.context
              , L = i.contextType;
            typeof L == "object" && L !== null ? L = ve(L) : (L = le(i) ? Pt : Q1.current,
            L = s3(t, L));
            var F = i.getDerivedStateFromProps
              , I = typeof F == "function" || typeof m.getSnapshotBeforeUpdate == "function";
            I || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (x !== o || k !== L) && $8(t, m, o, L),
            ft = !1;
            var O = t.memoizedState;
            m.state = O,
            v4(t, o, m, a),
            k = t.memoizedState,
            x !== o || O !== k || oe.current || ft ? (typeof F == "function" && (D6(t, i, F, o),
            k = t.memoizedState),
            (x = ft || U8(t, i, x, o, O, k, L)) ? (I || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(),
            typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()),
            typeof m.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (t.flags |= 4194308),
            t.memoizedProps = o,
            t.memoizedState = k),
            m.props = o,
            m.state = k,
            m.context = L,
            o = x) : (typeof m.componentDidMount == "function" && (t.flags |= 4194308),
            o = !1)
        } else {
            m = t.stateNode,
            g8(e, t),
            x = t.memoizedProps,
            L = t.type === t.elementType ? x : Le(t.type, x),
            m.props = L,
            I = t.pendingProps,
            O = m.context,
            k = i.contextType,
            typeof k == "object" && k !== null ? k = ve(k) : (k = le(i) ? Pt : Q1.current,
            k = s3(t, k));
            var W = i.getDerivedStateFromProps;
            (F = typeof W == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (x !== I || O !== k) && $8(t, m, o, k),
            ft = !1,
            O = t.memoizedState,
            m.state = O,
            v4(t, o, m, a);
            var Y = t.memoizedState;
            x !== I || O !== Y || oe.current || ft ? (typeof W == "function" && (D6(t, i, W, o),
            Y = t.memoizedState),
            (L = ft || U8(t, i, L, o, O, Y, k) || !1) ? (F || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(o, Y, k),
            typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(o, Y, k)),
            typeof m.componentDidUpdate == "function" && (t.flags |= 4),
            typeof m.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || x === e.memoizedProps && O === e.memoizedState || (t.flags |= 4),
            typeof m.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && O === e.memoizedState || (t.flags |= 1024),
            t.memoizedProps = o,
            t.memoizedState = Y),
            m.props = o,
            m.state = Y,
            m.context = k,
            o = L) : (typeof m.componentDidUpdate != "function" || x === e.memoizedProps && O === e.memoizedState || (t.flags |= 4),
            typeof m.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && O === e.memoizedState || (t.flags |= 1024),
            o = !1)
        }
        return N6(e, t, i, o, c, a)
    }
    function N6(e, t, i, o, a, c) {
        ti(e, t);
        var m = (t.flags & 128) !== 0;
        if (!o && !m)
            return a && l8(t, i, !1),
            Ye(e, t, c);
        o = t.stateNode,
        bl.current = t;
        var x = m && typeof i.getDerivedStateFromError != "function" ? null : o.render();
        return t.flags |= 1,
        e !== null && m ? (t.child = u3(t, e.child, null, c),
        t.child = u3(t, null, x, c)) : re(e, t, x, c),
        t.memoizedState = o.state,
        a && l8(t, i, !0),
        t.child
    }
    function ri(e) {
        var t = e.stateNode;
        t.pendingContext ? s8(e, t.pendingContext, t.pendingContext !== t.context) : t.context && s8(e, t.context, !1),
        w6(e, t.containerInfo)
    }
    function ii(e, t, i, o, a) {
        return a3(),
        h6(a),
        t.flags |= 256,
        re(e, t, i, o),
        t.child
    }
    var I6 = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0
    };
    function b6(e) {
        return {
            baseLanes: e,
            cachePool: null,
            transitions: null
        }
    }
    function si(e, t, i) {
        var o = t.pendingProps, a = P1.current, c = !1, m = (t.flags & 128) !== 0, x;
        if ((x = m) || (x = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0),
        x ? (c = !0,
        t.flags &= -129) : (e === null || e.memoizedState !== null) && (a |= 1),
        M1(P1, a & 1),
        e === null)
            return C6(t),
            e = t.memoizedState,
            e !== null && (e = e.dehydrated,
            e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824,
            null) : (m = o.children,
            e = o.fallback,
            c ? (o = t.mode,
            c = t.child,
            m = {
                mode: "hidden",
                children: m
            },
            (o & 1) === 0 && c !== null ? (c.childLanes = 0,
            c.pendingProps = m) : c = b4(m, o, 0, null),
            e = Nt(e, o, i, null),
            c.return = t,
            e.return = t,
            c.sibling = e,
            t.child = c,
            t.child.memoizedState = b6(i),
            t.memoizedState = I6,
            e) : z6(t, m));
        if (a = e.memoizedState,
        a !== null && (x = a.dehydrated,
        x !== null))
            return zl(e, t, m, o, x, a, i);
        if (c) {
            c = o.fallback,
            m = t.mode,
            a = e.child,
            x = a.sibling;
            var k = {
                mode: "hidden",
                children: o.children
            };
            return (m & 1) === 0 && t.child !== a ? (o = t.child,
            o.childLanes = 0,
            o.pendingProps = k,
            t.deletions = null) : (o = gt(a, k),
            o.subtreeFlags = a.subtreeFlags & 14680064),
            x !== null ? c = gt(x, c) : (c = Nt(c, m, i, null),
            c.flags |= 2),
            c.return = t,
            o.return = t,
            o.sibling = c,
            t.child = o,
            o = c,
            c = t.child,
            m = e.child.memoizedState,
            m = m === null ? b6(i) : {
                baseLanes: m.baseLanes | i,
                cachePool: null,
                transitions: m.transitions
            },
            c.memoizedState = m,
            c.childLanes = e.childLanes & ~i,
            t.memoizedState = I6,
            o
        }
        return c = e.child,
        e = c.sibling,
        o = gt(c, {
            mode: "visible",
            children: o.children
        }),
        (t.mode & 1) === 0 && (o.lanes = i),
        o.return = t,
        o.sibling = null,
        e !== null && (i = t.deletions,
        i === null ? (t.deletions = [e],
        t.flags |= 16) : i.push(e)),
        t.child = o,
        t.memoizedState = null,
        o
    }
    function z6(e, t) {
        return t = b4({
            mode: "visible",
            children: t
        }, e.mode, 0, null),
        t.return = e,
        e.child = t
    }
    function E4(e, t, i, o) {
        return o !== null && h6(o),
        u3(t, e.child, null, i),
        e = z6(t, t.pendingProps.children),
        e.flags |= 2,
        t.memoizedState = null,
        e
    }
    function zl(e, t, i, o, a, c, m) {
        if (i)
            return t.flags & 256 ? (t.flags &= -257,
            o = Z6(Error(s(422))),
            E4(e, t, m, o)) : t.memoizedState !== null ? (t.child = e.child,
            t.flags |= 128,
            null) : (c = o.fallback,
            a = t.mode,
            o = b4({
                mode: "visible",
                children: o.children
            }, a, 0, null),
            c = Nt(c, a, m, null),
            c.flags |= 2,
            o.return = t,
            c.return = t,
            o.sibling = c,
            t.child = o,
            (t.mode & 1) !== 0 && u3(t, e.child, null, m),
            t.child.memoizedState = b6(m),
            t.memoizedState = I6,
            c);
        if ((t.mode & 1) === 0)
            return E4(e, t, m, null);
        if (a.data === "$!") {
            if (o = a.nextSibling && a.nextSibling.dataset,
            o)
                var x = o.dgst;
            return o = x,
            c = Error(s(419)),
            o = Z6(c, o, void 0),
            E4(e, t, m, o)
        }
        if (x = (m & e.childLanes) !== 0,
        ae || x) {
            if (o = H1,
            o !== null) {
                switch (m & -m) {
                case 4:
                    a = 2;
                    break;
                case 16:
                    a = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    a = 32;
                    break;
                case 536870912:
                    a = 268435456;
                    break;
                default:
                    a = 0
                }
                a = (a & (o.suspendedLanes | m)) !== 0 ? 0 : a,
                a !== 0 && a !== c.retryLane && (c.retryLane = a,
                Ge(e, a),
                Ae(o, e, a, -1))
            }
            return r0(),
            o = Z6(Error(s(421))),
            E4(e, t, m, o)
        }
        return a.data === "$?" ? (t.flags |= 128,
        t.child = e.child,
        t = ea.bind(null, e),
        a._reactRetry = t,
        null) : (e = c.treeContext,
        pe = lt(a.nextSibling),
        he = t,
        E1 = !0,
        Pe = null,
        e !== null && (ye[ge++] = We,
        ye[ge++] = Ke,
        ye[ge++] = Lt,
        We = e.id,
        Ke = e.overflow,
        Lt = t),
        t = z6(t, o.children),
        t.flags |= 4096,
        t)
    }
    function oi(e, t, i) {
        e.lanes |= t;
        var o = e.alternate;
        o !== null && (o.lanes |= t),
        g6(e.return, t, i)
    }
    function B6(e, t, i, o, a) {
        var c = e.memoizedState;
        c === null ? e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: o,
            tail: i,
            tailMode: a
        } : (c.isBackwards = t,
        c.rendering = null,
        c.renderingStartTime = 0,
        c.last = o,
        c.tail = i,
        c.tailMode = a)
    }
    function li(e, t, i) {
        var o = t.pendingProps
          , a = o.revealOrder
          , c = o.tail;
        if (re(e, t, o.children, i),
        o = P1.current,
        (o & 2) !== 0)
            o = o & 1 | 2,
            t.flags |= 128;
        else {
            if (e !== null && (e.flags & 128) !== 0)
                e: for (e = t.child; e !== null; ) {
                    if (e.tag === 13)
                        e.memoizedState !== null && oi(e, i, t);
                    else if (e.tag === 19)
                        oi(e, i, t);
                    else if (e.child !== null) {
                        e.child.return = e,
                        e = e.child;
                        continue
                    }
                    if (e === t)
                        break e;
                    for (; e.sibling === null; ) {
                        if (e.return === null || e.return === t)
                            break e;
                        e = e.return
                    }
                    e.sibling.return = e.return,
                    e = e.sibling
                }
            o &= 1
        }
        if (M1(P1, o),
        (t.mode & 1) === 0)
            t.memoizedState = null;
        else
            switch (a) {
            case "forwards":
                for (i = t.child,
                a = null; i !== null; )
                    e = i.alternate,
                    e !== null && x4(e) === null && (a = i),
                    i = i.sibling;
                i = a,
                i === null ? (a = t.child,
                t.child = null) : (a = i.sibling,
                i.sibling = null),
                B6(t, !1, a, i, c);
                break;
            case "backwards":
                for (i = null,
                a = t.child,
                t.child = null; a !== null; ) {
                    if (e = a.alternate,
                    e !== null && x4(e) === null) {
                        t.child = a;
                        break
                    }
                    e = a.sibling,
                    a.sibling = i,
                    i = a,
                    a = e
                }
                B6(t, !0, i, null, c);
                break;
            case "together":
                B6(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null
            }
        return t.child
    }
    function P4(e, t) {
        (t.mode & 1) === 0 && e !== null && (e.alternate = null,
        t.alternate = null,
        t.flags |= 2)
    }
    function Ye(e, t, i) {
        if (e !== null && (t.dependencies = e.dependencies),
        Vt |= t.lanes,
        (i & t.childLanes) === 0)
            return null;
        if (e !== null && t.child !== e.child)
            throw Error(s(153));
        if (t.child !== null) {
            for (e = t.child,
            i = gt(e, e.pendingProps),
            t.child = i,
            i.return = t; e.sibling !== null; )
                e = e.sibling,
                i = i.sibling = gt(e, e.pendingProps),
                i.return = t;
            i.sibling = null
        }
        return t.child
    }
    function Bl(e, t, i) {
        switch (t.tag) {
        case 3:
            ri(t),
            a3();
            break;
        case 5:
            w8(t);
            break;
        case 1:
            le(t.type) && c4(t);
            break;
        case 4:
            w6(t, t.stateNode.containerInfo);
            break;
        case 10:
            var o = t.type._context
              , a = t.memoizedProps.value;
            M1(m4, o._currentValue),
            o._currentValue = a;
            break;
        case 13:
            if (o = t.memoizedState,
            o !== null)
                return o.dehydrated !== null ? (M1(P1, P1.current & 1),
                t.flags |= 128,
                null) : (i & t.child.childLanes) !== 0 ? si(e, t, i) : (M1(P1, P1.current & 1),
                e = Ye(e, t, i),
                e !== null ? e.sibling : null);
            M1(P1, P1.current & 1);
            break;
        case 19:
            if (o = (i & t.childLanes) !== 0,
            (e.flags & 128) !== 0) {
                if (o)
                    return li(e, t, i);
                t.flags |= 128
            }
            if (a = t.memoizedState,
            a !== null && (a.rendering = null,
            a.tail = null,
            a.lastEffect = null),
            M1(P1, P1.current),
            o)
                break;
            return null;
        case 22:
        case 23:
            return t.lanes = 0,
            ei(e, t, i)
        }
        return Ye(e, t, i)
    }
    var ai, U6, ui, ci;
    ai = function(e, t) {
        for (var i = t.child; i !== null; ) {
            if (i.tag === 5 || i.tag === 6)
                e.appendChild(i.stateNode);
            else if (i.tag !== 4 && i.child !== null) {
                i.child.return = i,
                i = i.child;
                continue
            }
            if (i === t)
                break;
            for (; i.sibling === null; ) {
                if (i.return === null || i.return === t)
                    return;
                i = i.return
            }
            i.sibling.return = i.return,
            i = i.sibling
        }
    }
    ,
    U6 = function() {}
    ,
    ui = function(e, t, i, o) {
        var a = e.memoizedProps;
        if (a !== o) {
            e = t.stateNode,
            At(Fe.current);
            var c = null;
            switch (i) {
            case "input":
                a = g7(e, a),
                o = g7(e, o),
                c = [];
                break;
            case "select":
                a = B({}, a, {
                    value: void 0
                }),
                o = B({}, o, {
                    value: void 0
                }),
                c = [];
                break;
            case "textarea":
                a = w7(e, a),
                o = w7(e, o),
                c = [];
                break;
            default:
                typeof a.onClick != "function" && typeof o.onClick == "function" && (e.onclick = l4)
            }
            M7(i, o);
            var m;
            i = null;
            for (L in a)
                if (!o.hasOwnProperty(L) && a.hasOwnProperty(L) && a[L] != null)
                    if (L === "style") {
                        var x = a[L];
                        for (m in x)
                            x.hasOwnProperty(m) && (i || (i = {}),
                            i[m] = "")
                    } else
                        L !== "dangerouslySetInnerHTML" && L !== "children" && L !== "suppressContentEditableWarning" && L !== "suppressHydrationWarning" && L !== "autoFocus" && (u.hasOwnProperty(L) ? c || (c = []) : (c = c || []).push(L, null));
            for (L in o) {
                var k = o[L];
                if (x = a != null ? a[L] : void 0,
                o.hasOwnProperty(L) && k !== x && (k != null || x != null))
                    if (L === "style")
                        if (x) {
                            for (m in x)
                                !x.hasOwnProperty(m) || k && k.hasOwnProperty(m) || (i || (i = {}),
                                i[m] = "");
                            for (m in k)
                                k.hasOwnProperty(m) && x[m] !== k[m] && (i || (i = {}),
                                i[m] = k[m])
                        } else
                            i || (c || (c = []),
                            c.push(L, i)),
                            i = k;
                    else
                        L === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0,
                        x = x ? x.__html : void 0,
                        k != null && x !== k && (c = c || []).push(L, k)) : L === "children" ? typeof k != "string" && typeof k != "number" || (c = c || []).push(L, "" + k) : L !== "suppressContentEditableWarning" && L !== "suppressHydrationWarning" && (u.hasOwnProperty(L) ? (k != null && L === "onScroll" && S1("scroll", e),
                        c || x === k || (c = [])) : (c = c || []).push(L, k))
            }
            i && (c = c || []).push("style", i);
            var L = c;
            (t.updateQueue = L) && (t.flags |= 4)
        }
    }
    ,
    ci = function(e, t, i, o) {
        i !== o && (t.flags |= 4)
    }
    ;
    function fn(e, t) {
        if (!E1)
            switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var i = null; t !== null; )
                    t.alternate !== null && (i = t),
                    t = t.sibling;
                i === null ? e.tail = null : i.sibling = null;
                break;
            case "collapsed":
                i = e.tail;
                for (var o = null; i !== null; )
                    i.alternate !== null && (o = i),
                    i = i.sibling;
                o === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null
            }
    }
    function J1(e) {
        var t = e.alternate !== null && e.alternate.child === e.child
          , i = 0
          , o = 0;
        if (t)
            for (var a = e.child; a !== null; )
                i |= a.lanes | a.childLanes,
                o |= a.subtreeFlags & 14680064,
                o |= a.flags & 14680064,
                a.return = e,
                a = a.sibling;
        else
            for (a = e.child; a !== null; )
                i |= a.lanes | a.childLanes,
                o |= a.subtreeFlags,
                o |= a.flags,
                a.return = e,
                a = a.sibling;
        return e.subtreeFlags |= o,
        e.childLanes = i,
        t
    }
    function Ul(e, t, i) {
        var o = t.pendingProps;
        switch (f6(t),
        t.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return J1(t),
            null;
        case 1:
            return le(t.type) && u4(),
            J1(t),
            null;
        case 3:
            return o = t.stateNode,
            d3(),
            j1(oe),
            j1(Q1),
            S6(),
            o.pendingContext && (o.context = o.pendingContext,
            o.pendingContext = null),
            (e === null || e.child === null) && (h4(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024,
            Pe !== null && (e0(Pe),
            Pe = null))),
            U6(e, t),
            J1(t),
            null;
        case 5:
            k6(t);
            var a = At(on.current);
            if (i = t.type,
            e !== null && t.stateNode != null)
                ui(e, t, i, o, a),
                e.ref !== t.ref && (t.flags |= 512,
                t.flags |= 2097152);
            else {
                if (!o) {
                    if (t.stateNode === null)
                        throw Error(s(166));
                    return J1(t),
                    null
                }
                if (e = At(Fe.current),
                h4(t)) {
                    o = t.stateNode,
                    i = t.type;
                    var c = t.memoizedProps;
                    switch (o[Oe] = t,
                    o[en] = c,
                    e = (t.mode & 1) !== 0,
                    i) {
                    case "dialog":
                        S1("cancel", o),
                        S1("close", o);
                        break;
                    case "iframe":
                    case "object":
                    case "embed":
                        S1("load", o);
                        break;
                    case "video":
                    case "audio":
                        for (a = 0; a < Q3.length; a++)
                            S1(Q3[a], o);
                        break;
                    case "source":
                        S1("error", o);
                        break;
                    case "img":
                    case "image":
                    case "link":
                        S1("error", o),
                        S1("load", o);
                        break;
                    case "details":
                        S1("toggle", o);
                        break;
                    case "input":
                        H5(o, c),
                        S1("invalid", o);
                        break;
                    case "select":
                        o._wrapperState = {
                            wasMultiple: !!c.multiple
                        },
                        S1("invalid", o);
                        break;
                    case "textarea":
                        K5(o, c),
                        S1("invalid", o)
                    }
                    M7(i, c),
                    a = null;
                    for (var m in c)
                        if (c.hasOwnProperty(m)) {
                            var x = c[m];
                            m === "children" ? typeof x == "string" ? o.textContent !== x && (c.suppressHydrationWarning !== !0 && o4(o.textContent, x, e),
                            a = ["children", x]) : typeof x == "number" && o.textContent !== "" + x && (c.suppressHydrationWarning !== !0 && o4(o.textContent, x, e),
                            a = ["children", "" + x]) : u.hasOwnProperty(m) && x != null && m === "onScroll" && S1("scroll", o)
                        }
                    switch (i) {
                    case "input":
                        _3(o),
                        W5(o, c, !0);
                        break;
                    case "textarea":
                        _3(o),
                        X5(o);
                        break;
                    case "select":
                    case "option":
                        break;
                    default:
                        typeof c.onClick == "function" && (o.onclick = l4)
                    }
                    o = a,
                    t.updateQueue = o,
                    o !== null && (t.flags |= 4)
                } else {
                    m = a.nodeType === 9 ? a : a.ownerDocument,
                    e === "http://www.w3.org/1999/xhtml" && (e = Y5(i)),
                    e === "http://www.w3.org/1999/xhtml" ? i === "script" ? (e = m.createElement("div"),
                    e.innerHTML = "<script><\/script>",
                    e = e.removeChild(e.firstChild)) : typeof o.is == "string" ? e = m.createElement(i, {
                        is: o.is
                    }) : (e = m.createElement(i),
                    i === "select" && (m = e,
                    o.multiple ? m.multiple = !0 : o.size && (m.size = o.size))) : e = m.createElementNS(e, i),
                    e[Oe] = t,
                    e[en] = o,
                    ai(e, t, !1, !1),
                    t.stateNode = e;
                    e: {
                        switch (m = S7(i, o),
                        i) {
                        case "dialog":
                            S1("cancel", e),
                            S1("close", e),
                            a = o;
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            S1("load", e),
                            a = o;
                            break;
                        case "video":
                        case "audio":
                            for (a = 0; a < Q3.length; a++)
                                S1(Q3[a], e);
                            a = o;
                            break;
                        case "source":
                            S1("error", e),
                            a = o;
                            break;
                        case "img":
                        case "image":
                        case "link":
                            S1("error", e),
                            S1("load", e),
                            a = o;
                            break;
                        case "details":
                            S1("toggle", e),
                            a = o;
                            break;
                        case "input":
                            H5(e, o),
                            a = g7(e, o),
                            S1("invalid", e);
                            break;
                        case "option":
                            a = o;
                            break;
                        case "select":
                            e._wrapperState = {
                                wasMultiple: !!o.multiple
                            },
                            a = B({}, o, {
                                value: void 0
                            }),
                            S1("invalid", e);
                            break;
                        case "textarea":
                            K5(e, o),
                            a = w7(e, o),
                            S1("invalid", e);
                            break;
                        default:
                            a = o
                        }
                        M7(i, a),
                        x = a;
                        for (c in x)
                            if (x.hasOwnProperty(c)) {
                                var k = x[c];
                                c === "style" ? J5(e, k) : c === "dangerouslySetInnerHTML" ? (k = k ? k.__html : void 0,
                                k != null && Q5(e, k)) : c === "children" ? typeof k == "string" ? (i !== "textarea" || k !== "") && A3(e, k) : typeof k == "number" && A3(e, "" + k) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (u.hasOwnProperty(c) ? k != null && c === "onScroll" && S1("scroll", e) : k != null && N(e, c, k, m))
                            }
                        switch (i) {
                        case "input":
                            _3(e),
                            W5(e, o, !1);
                            break;
                        case "textarea":
                            _3(e),
                            X5(e);
                            break;
                        case "option":
                            o.value != null && e.setAttribute("value", "" + g1(o.value));
                            break;
                        case "select":
                            e.multiple = !!o.multiple,
                            c = o.value,
                            c != null ? Kt(e, !!o.multiple, c, !1) : o.defaultValue != null && Kt(e, !!o.multiple, o.defaultValue, !0);
                            break;
                        default:
                            typeof a.onClick == "function" && (e.onclick = l4)
                        }
                        switch (i) {
                        case "button":
                        case "input":
                        case "select":
                        case "textarea":
                            o = !!o.autoFocus;
                            break e;
                        case "img":
                            o = !0;
                            break e;
                        default:
                            o = !1
                        }
                    }
                    o && (t.flags |= 4)
                }
                t.ref !== null && (t.flags |= 512,
                t.flags |= 2097152)
            }
            return J1(t),
            null;
        case 6:
            if (e && t.stateNode != null)
                ci(e, t, e.memoizedProps, o);
            else {
                if (typeof o != "string" && t.stateNode === null)
                    throw Error(s(166));
                if (i = At(on.current),
                At(Fe.current),
                h4(t)) {
                    if (o = t.stateNode,
                    i = t.memoizedProps,
                    o[Oe] = t,
                    (c = o.nodeValue !== i) && (e = he,
                    e !== null))
                        switch (e.tag) {
                        case 3:
                            o4(o.nodeValue, i, (e.mode & 1) !== 0);
                            break;
                        case 5:
                            e.memoizedProps.suppressHydrationWarning !== !0 && o4(o.nodeValue, i, (e.mode & 1) !== 0)
                        }
                    c && (t.flags |= 4)
                } else
                    o = (i.nodeType === 9 ? i : i.ownerDocument).createTextNode(o),
                    o[Oe] = t,
                    t.stateNode = o
            }
            return J1(t),
            null;
        case 13:
            if (j1(P1),
            o = t.memoizedState,
            e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                if (E1 && pe !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
                    C8(),
                    a3(),
                    t.flags |= 98560,
                    c = !1;
                else if (c = h4(t),
                o !== null && o.dehydrated !== null) {
                    if (e === null) {
                        if (!c)
                            throw Error(s(318));
                        if (c = t.memoizedState,
                        c = c !== null ? c.dehydrated : null,
                        !c)
                            throw Error(s(317));
                        c[Oe] = t
                    } else
                        a3(),
                        (t.flags & 128) === 0 && (t.memoizedState = null),
                        t.flags |= 4;
                    J1(t),
                    c = !1
                } else
                    Pe !== null && (e0(Pe),
                    Pe = null),
                    c = !0;
                if (!c)
                    return t.flags & 65536 ? t : null
            }
            return (t.flags & 128) !== 0 ? (t.lanes = i,
            t) : (o = o !== null,
            o !== (e !== null && e.memoizedState !== null) && o && (t.child.flags |= 8192,
            (t.mode & 1) !== 0 && (e === null || (P1.current & 1) !== 0 ? B1 === 0 && (B1 = 3) : r0())),
            t.updateQueue !== null && (t.flags |= 4),
            J1(t),
            null);
        case 4:
            return d3(),
            U6(e, t),
            e === null && q3(t.stateNode.containerInfo),
            J1(t),
            null;
        case 10:
            return y6(t.type._context),
            J1(t),
            null;
        case 17:
            return le(t.type) && u4(),
            J1(t),
            null;
        case 19:
            if (j1(P1),
            c = t.memoizedState,
            c === null)
                return J1(t),
                null;
            if (o = (t.flags & 128) !== 0,
            m = c.rendering,
            m === null)
                if (o)
                    fn(c, !1);
                else {
                    if (B1 !== 0 || e !== null && (e.flags & 128) !== 0)
                        for (e = t.child; e !== null; ) {
                            if (m = x4(e),
                            m !== null) {
                                for (t.flags |= 128,
                                fn(c, !1),
                                o = m.updateQueue,
                                o !== null && (t.updateQueue = o,
                                t.flags |= 4),
                                t.subtreeFlags = 0,
                                o = i,
                                i = t.child; i !== null; )
                                    c = i,
                                    e = o,
                                    c.flags &= 14680066,
                                    m = c.alternate,
                                    m === null ? (c.childLanes = 0,
                                    c.lanes = e,
                                    c.child = null,
                                    c.subtreeFlags = 0,
                                    c.memoizedProps = null,
                                    c.memoizedState = null,
                                    c.updateQueue = null,
                                    c.dependencies = null,
                                    c.stateNode = null) : (c.childLanes = m.childLanes,
                                    c.lanes = m.lanes,
                                    c.child = m.child,
                                    c.subtreeFlags = 0,
                                    c.deletions = null,
                                    c.memoizedProps = m.memoizedProps,
                                    c.memoizedState = m.memoizedState,
                                    c.updateQueue = m.updateQueue,
                                    c.type = m.type,
                                    e = m.dependencies,
                                    c.dependencies = e === null ? null : {
                                        lanes: e.lanes,
                                        firstContext: e.firstContext
                                    }),
                                    i = i.sibling;
                                return M1(P1, P1.current & 1 | 2),
                                t.child
                            }
                            e = e.sibling
                        }
                    c.tail !== null && Z1() > m3 && (t.flags |= 128,
                    o = !0,
                    fn(c, !1),
                    t.lanes = 4194304)
                }
            else {
                if (!o)
                    if (e = x4(m),
                    e !== null) {
                        if (t.flags |= 128,
                        o = !0,
                        i = e.updateQueue,
                        i !== null && (t.updateQueue = i,
                        t.flags |= 4),
                        fn(c, !0),
                        c.tail === null && c.tailMode === "hidden" && !m.alternate && !E1)
                            return J1(t),
                            null
                    } else
                        2 * Z1() - c.renderingStartTime > m3 && i !== 1073741824 && (t.flags |= 128,
                        o = !0,
                        fn(c, !1),
                        t.lanes = 4194304);
                c.isBackwards ? (m.sibling = t.child,
                t.child = m) : (i = c.last,
                i !== null ? i.sibling = m : t.child = m,
                c.last = m)
            }
            return c.tail !== null ? (t = c.tail,
            c.rendering = t,
            c.tail = t.sibling,
            c.renderingStartTime = Z1(),
            t.sibling = null,
            i = P1.current,
            M1(P1, o ? i & 1 | 2 : i & 1),
            t) : (J1(t),
            null);
        case 22:
        case 23:
            return n0(),
            o = t.memoizedState !== null,
            e !== null && e.memoizedState !== null !== o && (t.flags |= 8192),
            o && (t.mode & 1) !== 0 ? (me & 1073741824) !== 0 && (J1(t),
            t.subtreeFlags & 6 && (t.flags |= 8192)) : J1(t),
            null;
        case 24:
            return null;
        case 25:
            return null
        }
        throw Error(s(156, t.tag))
    }
    function Hl(e, t) {
        switch (f6(t),
        t.tag) {
        case 1:
            return le(t.type) && u4(),
            e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 3:
            return d3(),
            j1(oe),
            j1(Q1),
            S6(),
            e = t.flags,
            (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 5:
            return k6(t),
            null;
        case 13:
            if (j1(P1),
            e = t.memoizedState,
            e !== null && e.dehydrated !== null) {
                if (t.alternate === null)
                    throw Error(s(340));
                a3()
            }
            return e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 19:
            return j1(P1),
            null;
        case 4:
            return d3(),
            null;
        case 10:
            return y6(t.type._context),
            null;
        case 22:
        case 23:
            return n0(),
            null;
        case 24:
            return null;
        default:
            return null
        }
    }
    var L4 = !1
      , ee = !1
      , $l = typeof WeakSet == "function" ? WeakSet : Set
      , G = null;
    function h3(e, t) {
        var i = e.ref;
        if (i !== null)
            if (typeof i == "function")
                try {
                    i(null)
                } catch (o) {
                    A1(e, t, o)
                }
            else
                i.current = null
    }
    function H6(e, t, i) {
        try {
            i()
        } catch (o) {
            A1(e, t, o)
        }
    }
    var fi = !1;
    function Wl(e, t) {
        if (n6 = Xn,
        e = Ur(),
        G7(e)) {
            if ("selectionStart"in e)
                var i = {
                    start: e.selectionStart,
                    end: e.selectionEnd
                };
            else
                e: {
                    i = (i = e.ownerDocument) && i.defaultView || window;
                    var o = i.getSelection && i.getSelection();
                    if (o && o.rangeCount !== 0) {
                        i = o.anchorNode;
                        var a = o.anchorOffset
                          , c = o.focusNode;
                        o = o.focusOffset;
                        try {
                            i.nodeType,
                            c.nodeType
                        } catch {
                            i = null;
                            break e
                        }
                        var m = 0
                          , x = -1
                          , k = -1
                          , L = 0
                          , F = 0
                          , I = e
                          , O = null;
                        t: for (; ; ) {
                            for (var W; I !== i || a !== 0 && I.nodeType !== 3 || (x = m + a),
                            I !== c || o !== 0 && I.nodeType !== 3 || (k = m + o),
                            I.nodeType === 3 && (m += I.nodeValue.length),
                            (W = I.firstChild) !== null; )
                                O = I,
                                I = W;
                            for (; ; ) {
                                if (I === e)
                                    break t;
                                if (O === i && ++L === a && (x = m),
                                O === c && ++F === o && (k = m),
                                (W = I.nextSibling) !== null)
                                    break;
                                I = O,
                                O = I.parentNode
                            }
                            I = W
                        }
                        i = x === -1 || k === -1 ? null : {
                            start: x,
                            end: k
                        }
                    } else
                        i = null
                }
            i = i || {
                start: 0,
                end: 0
            }
        } else
            i = null;
        for (r6 = {
            focusedElem: e,
            selectionRange: i
        },
        Xn = !1,
        G = t; G !== null; )
            if (t = G,
            e = t.child,
            (t.subtreeFlags & 1028) !== 0 && e !== null)
                e.return = t,
                G = e;
            else
                for (; G !== null; ) {
                    t = G;
                    try {
                        var Y = t.alternate;
                        if ((t.flags & 1024) !== 0)
                            switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (Y !== null) {
                                    var Q = Y.memoizedProps
                                      , O1 = Y.memoizedState
                                      , T = t.stateNode
                                      , M = T.getSnapshotBeforeUpdate(t.elementType === t.type ? Q : Le(t.type, Q), O1);
                                    T.__reactInternalSnapshotBeforeUpdate = M
                                }
                                break;
                            case 3:
                                var E = t.stateNode.containerInfo;
                                E.nodeType === 1 ? E.textContent = "" : E.nodeType === 9 && E.documentElement && E.removeChild(E.documentElement);
                                break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                throw Error(s(163))
                            }
                    } catch (z) {
                        A1(t, t.return, z)
                    }
                    if (e = t.sibling,
                    e !== null) {
                        e.return = t.return,
                        G = e;
                        break
                    }
                    G = t.return
                }
        return Y = fi,
        fi = !1,
        Y
    }
    function dn(e, t, i) {
        var o = t.updateQueue;
        if (o = o !== null ? o.lastEffect : null,
        o !== null) {
            var a = o = o.next;
            do {
                if ((a.tag & e) === e) {
                    var c = a.destroy;
                    a.destroy = void 0,
                    c !== void 0 && H6(t, i, c)
                }
                a = a.next
            } while (a !== o)
        }
    }
    function _4(e, t) {
        if (t = t.updateQueue,
        t = t !== null ? t.lastEffect : null,
        t !== null) {
            var i = t = t.next;
            do {
                if ((i.tag & e) === e) {
                    var o = i.create;
                    i.destroy = o()
                }
                i = i.next
            } while (i !== t)
        }
    }
    function $6(e) {
        var t = e.ref;
        if (t !== null) {
            var i = e.stateNode;
            switch (e.tag) {
            case 5:
                e = i;
                break;
            default:
                e = i
            }
            typeof t == "function" ? t(e) : t.current = e
        }
    }
    function di(e) {
        var t = e.alternate;
        t !== null && (e.alternate = null,
        di(t)),
        e.child = null,
        e.deletions = null,
        e.sibling = null,
        e.tag === 5 && (t = e.stateNode,
        t !== null && (delete t[Oe],
        delete t[en],
        delete t[l6],
        delete t[Pl],
        delete t[Ll])),
        e.stateNode = null,
        e.return = null,
        e.dependencies = null,
        e.memoizedProps = null,
        e.memoizedState = null,
        e.pendingProps = null,
        e.stateNode = null,
        e.updateQueue = null
    }
    function Ci(e) {
        return e.tag === 5 || e.tag === 3 || e.tag === 4
    }
    function hi(e) {
        e: for (; ; ) {
            for (; e.sibling === null; ) {
                if (e.return === null || Ci(e.return))
                    return null;
                e = e.return
            }
            for (e.sibling.return = e.return,
            e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
                if (e.flags & 2 || e.child === null || e.tag === 4)
                    continue e;
                e.child.return = e,
                e = e.child
            }
            if (!(e.flags & 2))
                return e.stateNode
        }
    }
    function W6(e, t, i) {
        var o = e.tag;
        if (o === 5 || o === 6)
            e = e.stateNode,
            t ? i.nodeType === 8 ? i.parentNode.insertBefore(e, t) : i.insertBefore(e, t) : (i.nodeType === 8 ? (t = i.parentNode,
            t.insertBefore(e, i)) : (t = i,
            t.appendChild(e)),
            i = i._reactRootContainer,
            i != null || t.onclick !== null || (t.onclick = l4));
        else if (o !== 4 && (e = e.child,
        e !== null))
            for (W6(e, t, i),
            e = e.sibling; e !== null; )
                W6(e, t, i),
                e = e.sibling
    }
    function K6(e, t, i) {
        var o = e.tag;
        if (o === 5 || o === 6)
            e = e.stateNode,
            t ? i.insertBefore(e, t) : i.appendChild(e);
        else if (o !== 4 && (e = e.child,
        e !== null))
            for (K6(e, t, i),
            e = e.sibling; e !== null; )
                K6(e, t, i),
                e = e.sibling
    }
    var W1 = null
      , _e = !1;
    function Ct(e, t, i) {
        for (i = i.child; i !== null; )
            pi(e, t, i),
            i = i.sibling
    }
    function pi(e, t, i) {
        if (Ze && typeof Ze.onCommitFiberUnmount == "function")
            try {
                Ze.onCommitFiberUnmount(Un, i)
            } catch {}
        switch (i.tag) {
        case 5:
            ee || h3(i, t);
        case 6:
            var o = W1
              , a = _e;
            W1 = null,
            Ct(e, t, i),
            W1 = o,
            _e = a,
            W1 !== null && (_e ? (e = W1,
            i = i.stateNode,
            e.nodeType === 8 ? e.parentNode.removeChild(i) : e.removeChild(i)) : W1.removeChild(i.stateNode));
            break;
        case 18:
            W1 !== null && (_e ? (e = W1,
            i = i.stateNode,
            e.nodeType === 8 ? o6(e.parentNode, i) : e.nodeType === 1 && o6(e, i),
            U3(e)) : o6(W1, i.stateNode));
            break;
        case 4:
            o = W1,
            a = _e,
            W1 = i.stateNode.containerInfo,
            _e = !0,
            Ct(e, t, i),
            W1 = o,
            _e = a;
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (!ee && (o = i.updateQueue,
            o !== null && (o = o.lastEffect,
            o !== null))) {
                a = o = o.next;
                do {
                    var c = a
                      , m = c.destroy;
                    c = c.tag,
                    m !== void 0 && ((c & 2) !== 0 || (c & 4) !== 0) && H6(i, t, m),
                    a = a.next
                } while (a !== o)
            }
            Ct(e, t, i);
            break;
        case 1:
            if (!ee && (h3(i, t),
            o = i.stateNode,
            typeof o.componentWillUnmount == "function"))
                try {
                    o.props = i.memoizedProps,
                    o.state = i.memoizedState,
                    o.componentWillUnmount()
                } catch (x) {
                    A1(i, t, x)
                }
            Ct(e, t, i);
            break;
        case 21:
            Ct(e, t, i);
            break;
        case 22:
            i.mode & 1 ? (ee = (o = ee) || i.memoizedState !== null,
            Ct(e, t, i),
            ee = o) : Ct(e, t, i);
            break;
        default:
            Ct(e, t, i)
        }
    }
    function mi(e) {
        var t = e.updateQueue;
        if (t !== null) {
            e.updateQueue = null;
            var i = e.stateNode;
            i === null && (i = e.stateNode = new $l),
            t.forEach(function(o) {
                var a = ta.bind(null, e, o);
                i.has(o) || (i.add(o),
                o.then(a, a))
            })
        }
    }
    function Re(e, t) {
        var i = t.deletions;
        if (i !== null)
            for (var o = 0; o < i.length; o++) {
                var a = i[o];
                try {
                    var c = e
                      , m = t
                      , x = m;
                    e: for (; x !== null; ) {
                        switch (x.tag) {
                        case 5:
                            W1 = x.stateNode,
                            _e = !1;
                            break e;
                        case 3:
                            W1 = x.stateNode.containerInfo,
                            _e = !0;
                            break e;
                        case 4:
                            W1 = x.stateNode.containerInfo,
                            _e = !0;
                            break e
                        }
                        x = x.return
                    }
                    if (W1 === null)
                        throw Error(s(160));
                    pi(c, m, a),
                    W1 = null,
                    _e = !1;
                    var k = a.alternate;
                    k !== null && (k.return = null),
                    a.return = null
                } catch (L) {
                    A1(a, t, L)
                }
            }
        if (t.subtreeFlags & 12854)
            for (t = t.child; t !== null; )
                yi(t, e),
                t = t.sibling
    }
    function yi(e, t) {
        var i = e.alternate
          , o = e.flags;
        switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if (Re(t, e),
            Ie(e),
            o & 4) {
                try {
                    dn(3, e, e.return),
                    _4(3, e)
                } catch (Q) {
                    A1(e, e.return, Q)
                }
                try {
                    dn(5, e, e.return)
                } catch (Q) {
                    A1(e, e.return, Q)
                }
            }
            break;
        case 1:
            Re(t, e),
            Ie(e),
            o & 512 && i !== null && h3(i, i.return);
            break;
        case 5:
            if (Re(t, e),
            Ie(e),
            o & 512 && i !== null && h3(i, i.return),
            e.flags & 32) {
                var a = e.stateNode;
                try {
                    A3(a, "")
                } catch (Q) {
                    A1(e, e.return, Q)
                }
            }
            if (o & 4 && (a = e.stateNode,
            a != null)) {
                var c = e.memoizedProps
                  , m = i !== null ? i.memoizedProps : c
                  , x = e.type
                  , k = e.updateQueue;
                if (e.updateQueue = null,
                k !== null)
                    try {
                        x === "input" && c.type === "radio" && c.name != null && $5(a, c),
                        S7(x, m);
                        var L = S7(x, c);
                        for (m = 0; m < k.length; m += 2) {
                            var F = k[m]
                              , I = k[m + 1];
                            F === "style" ? J5(a, I) : F === "dangerouslySetInnerHTML" ? Q5(a, I) : F === "children" ? A3(a, I) : N(a, F, I, L)
                        }
                        switch (x) {
                        case "input":
                            v7(a, c);
                            break;
                        case "textarea":
                            G5(a, c);
                            break;
                        case "select":
                            var O = a._wrapperState.wasMultiple;
                            a._wrapperState.wasMultiple = !!c.multiple;
                            var W = c.value;
                            W != null ? Kt(a, !!c.multiple, W, !1) : O !== !!c.multiple && (c.defaultValue != null ? Kt(a, !!c.multiple, c.defaultValue, !0) : Kt(a, !!c.multiple, c.multiple ? [] : "", !1))
                        }
                        a[en] = c
                    } catch (Q) {
                        A1(e, e.return, Q)
                    }
            }
            break;
        case 6:
            if (Re(t, e),
            Ie(e),
            o & 4) {
                if (e.stateNode === null)
                    throw Error(s(162));
                a = e.stateNode,
                c = e.memoizedProps;
                try {
                    a.nodeValue = c
                } catch (Q) {
                    A1(e, e.return, Q)
                }
            }
            break;
        case 3:
            if (Re(t, e),
            Ie(e),
            o & 4 && i !== null && i.memoizedState.isDehydrated)
                try {
                    U3(t.containerInfo)
                } catch (Q) {
                    A1(e, e.return, Q)
                }
            break;
        case 4:
            Re(t, e),
            Ie(e);
            break;
        case 13:
            Re(t, e),
            Ie(e),
            a = e.child,
            a.flags & 8192 && (c = a.memoizedState !== null,
            a.stateNode.isHidden = c,
            !c || a.alternate !== null && a.alternate.memoizedState !== null || (Y6 = Z1())),
            o & 4 && mi(e);
            break;
        case 22:
            if (F = i !== null && i.memoizedState !== null,
            e.mode & 1 ? (ee = (L = ee) || F,
            Re(t, e),
            ee = L) : Re(t, e),
            Ie(e),
            o & 8192) {
                if (L = e.memoizedState !== null,
                (e.stateNode.isHidden = L) && !F && (e.mode & 1) !== 0)
                    for (G = e,
                    F = e.child; F !== null; ) {
                        for (I = G = F; G !== null; ) {
                            switch (O = G,
                            W = O.child,
                            O.tag) {
                            case 0:
                            case 11:
                            case 14:
                            case 15:
                                dn(4, O, O.return);
                                break;
                            case 1:
                                h3(O, O.return);
                                var Y = O.stateNode;
                                if (typeof Y.componentWillUnmount == "function") {
                                    o = O,
                                    i = O.return;
                                    try {
                                        t = o,
                                        Y.props = t.memoizedProps,
                                        Y.state = t.memoizedState,
                                        Y.componentWillUnmount()
                                    } catch (Q) {
                                        A1(o, i, Q)
                                    }
                                }
                                break;
                            case 5:
                                h3(O, O.return);
                                break;
                            case 22:
                                if (O.memoizedState !== null) {
                                    xi(I);
                                    continue
                                }
                            }
                            W !== null ? (W.return = O,
                            G = W) : xi(I)
                        }
                        F = F.sibling
                    }
                e: for (F = null,
                I = e; ; ) {
                    if (I.tag === 5) {
                        if (F === null) {
                            F = I;
                            try {
                                a = I.stateNode,
                                L ? (c = a.style,
                                typeof c.setProperty == "function" ? c.setProperty("display", "none", "important") : c.display = "none") : (x = I.stateNode,
                                k = I.memoizedProps.style,
                                m = k != null && k.hasOwnProperty("display") ? k.display : null,
                                x.style.display = q5("display", m))
                            } catch (Q) {
                                A1(e, e.return, Q)
                            }
                        }
                    } else if (I.tag === 6) {
                        if (F === null)
                            try {
                                I.stateNode.nodeValue = L ? "" : I.memoizedProps
                            } catch (Q) {
                                A1(e, e.return, Q)
                            }
                    } else if ((I.tag !== 22 && I.tag !== 23 || I.memoizedState === null || I === e) && I.child !== null) {
                        I.child.return = I,
                        I = I.child;
                        continue
                    }
                    if (I === e)
                        break e;
                    for (; I.sibling === null; ) {
                        if (I.return === null || I.return === e)
                            break e;
                        F === I && (F = null),
                        I = I.return
                    }
                    F === I && (F = null),
                    I.sibling.return = I.return,
                    I = I.sibling
                }
            }
            break;
        case 19:
            Re(t, e),
            Ie(e),
            o & 4 && mi(e);
            break;
        case 21:
            break;
        default:
            Re(t, e),
            Ie(e)
        }
    }
    function Ie(e) {
        var t = e.flags;
        if (t & 2) {
            try {
                e: {
                    for (var i = e.return; i !== null; ) {
                        if (Ci(i)) {
                            var o = i;
                            break e
                        }
                        i = i.return
                    }
                    throw Error(s(160))
                }
                switch (o.tag) {
                case 5:
                    var a = o.stateNode;
                    o.flags & 32 && (A3(a, ""),
                    o.flags &= -33);
                    var c = hi(e);
                    K6(e, c, a);
                    break;
                case 3:
                case 4:
                    var m = o.stateNode.containerInfo
                      , x = hi(e);
                    W6(e, x, m);
                    break;
                default:
                    throw Error(s(161))
                }
            } catch (k) {
                A1(e, e.return, k)
            }
            e.flags &= -3
        }
        t & 4096 && (e.flags &= -4097)
    }
    function Kl(e, t, i) {
        G = e,
        gi(e)
    }
    function gi(e, t, i) {
        for (var o = (e.mode & 1) !== 0; G !== null; ) {
            var a = G
              , c = a.child;
            if (a.tag === 22 && o) {
                var m = a.memoizedState !== null || L4;
                if (!m) {
                    var x = a.alternate
                      , k = x !== null && x.memoizedState !== null || ee;
                    x = L4;
                    var L = ee;
                    if (L4 = m,
                    (ee = k) && !L)
                        for (G = a; G !== null; )
                            m = G,
                            k = m.child,
                            m.tag === 22 && m.memoizedState !== null ? wi(a) : k !== null ? (k.return = m,
                            G = k) : wi(a);
                    for (; c !== null; )
                        G = c,
                        gi(c),
                        c = c.sibling;
                    G = a,
                    L4 = x,
                    ee = L
                }
                vi(e)
            } else
                (a.subtreeFlags & 8772) !== 0 && c !== null ? (c.return = a,
                G = c) : vi(e)
        }
    }
    function vi(e) {
        for (; G !== null; ) {
            var t = G;
            if ((t.flags & 8772) !== 0) {
                var i = t.alternate;
                try {
                    if ((t.flags & 8772) !== 0)
                        switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            ee || _4(5, t);
                            break;
                        case 1:
                            var o = t.stateNode;
                            if (t.flags & 4 && !ee)
                                if (i === null)
                                    o.componentDidMount();
                                else {
                                    var a = t.elementType === t.type ? i.memoizedProps : Le(t.type, i.memoizedProps);
                                    o.componentDidUpdate(a, i.memoizedState, o.__reactInternalSnapshotBeforeUpdate)
                                }
                            var c = t.updateQueue;
                            c !== null && x8(t, c, o);
                            break;
                        case 3:
                            var m = t.updateQueue;
                            if (m !== null) {
                                if (i = null,
                                t.child !== null)
                                    switch (t.child.tag) {
                                    case 5:
                                        i = t.child.stateNode;
                                        break;
                                    case 1:
                                        i = t.child.stateNode
                                    }
                                x8(t, m, i)
                            }
                            break;
                        case 5:
                            var x = t.stateNode;
                            if (i === null && t.flags & 4) {
                                i = x;
                                var k = t.memoizedProps;
                                switch (t.type) {
                                case "button":
                                case "input":
                                case "select":
                                case "textarea":
                                    k.autoFocus && i.focus();
                                    break;
                                case "img":
                                    k.src && (i.src = k.src)
                                }
                            }
                            break;
                        case 6:
                            break;
                        case 4:
                            break;
                        case 12:
                            break;
                        case 13:
                            if (t.memoizedState === null) {
                                var L = t.alternate;
                                if (L !== null) {
                                    var F = L.memoizedState;
                                    if (F !== null) {
                                        var I = F.dehydrated;
                                        I !== null && U3(I)
                                    }
                                }
                            }
                            break;
                        case 19:
                        case 17:
                        case 21:
                        case 22:
                        case 23:
                        case 25:
                            break;
                        default:
                            throw Error(s(163))
                        }
                    ee || t.flags & 512 && $6(t)
                } catch (O) {
                    A1(t, t.return, O)
                }
            }
            if (t === e) {
                G = null;
                break
            }
            if (i = t.sibling,
            i !== null) {
                i.return = t.return,
                G = i;
                break
            }
            G = t.return
        }
    }
    function xi(e) {
        for (; G !== null; ) {
            var t = G;
            if (t === e) {
                G = null;
                break
            }
            var i = t.sibling;
            if (i !== null) {
                i.return = t.return,
                G = i;
                break
            }
            G = t.return
        }
    }
    function wi(e) {
        for (; G !== null; ) {
            var t = G;
            try {
                switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var i = t.return;
                    try {
                        _4(4, t)
                    } catch (k) {
                        A1(t, i, k)
                    }
                    break;
                case 1:
                    var o = t.stateNode;
                    if (typeof o.componentDidMount == "function") {
                        var a = t.return;
                        try {
                            o.componentDidMount()
                        } catch (k) {
                            A1(t, a, k)
                        }
                    }
                    var c = t.return;
                    try {
                        $6(t)
                    } catch (k) {
                        A1(t, c, k)
                    }
                    break;
                case 5:
                    var m = t.return;
                    try {
                        $6(t)
                    } catch (k) {
                        A1(t, m, k)
                    }
                }
            } catch (k) {
                A1(t, t.return, k)
            }
            if (t === e) {
                G = null;
                break
            }
            var x = t.sibling;
            if (x !== null) {
                x.return = t.return,
                G = x;
                break
            }
            G = t.return
        }
    }
    var Gl = Math.ceil
      , R4 = X.ReactCurrentDispatcher
      , G6 = X.ReactCurrentOwner
      , we = X.ReactCurrentBatchConfig
      , h1 = 0
      , H1 = null
      , N1 = null
      , K1 = 0
      , me = 0
      , p3 = at(0)
      , B1 = 0
      , Cn = null
      , Vt = 0
      , A4 = 0
      , X6 = 0
      , hn = null
      , ue = null
      , Y6 = 0
      , m3 = 1 / 0
      , Qe = null
      , D4 = !1
      , Q6 = null
      , ht = null
      , V4 = !1
      , pt = null
      , Z4 = 0
      , pn = 0
      , q6 = null
      , O4 = -1
      , F4 = 0;
    function ie() {
        return (h1 & 6) !== 0 ? Z1() : O4 !== -1 ? O4 : O4 = Z1()
    }
    function mt(e) {
        return (e.mode & 1) === 0 ? 1 : (h1 & 2) !== 0 && K1 !== 0 ? K1 & -K1 : Rl.transition !== null ? (F4 === 0 && (F4 = hr()),
        F4) : (e = v1,
        e !== 0 || (e = window.event,
        e = e === void 0 ? 16 : Mr(e.type)),
        e)
    }
    function Ae(e, t, i, o) {
        if (50 < pn)
            throw pn = 0,
            q6 = null,
            Error(s(185));
        N3(e, i, o),
        ((h1 & 2) === 0 || e !== H1) && (e === H1 && ((h1 & 2) === 0 && (A4 |= i),
        B1 === 4 && yt(e, K1)),
        ce(e, o),
        i === 1 && h1 === 0 && (t.mode & 1) === 0 && (m3 = Z1() + 500,
        f4 && ct()))
    }
    function ce(e, t) {
        var i = e.callbackNode;
        Ro(e, t);
        var o = Wn(e, e === H1 ? K1 : 0);
        if (o === 0)
            i !== null && fr(i),
            e.callbackNode = null,
            e.callbackPriority = 0;
        else if (t = o & -o,
        e.callbackPriority !== t) {
            if (i != null && fr(i),
            t === 1)
                e.tag === 0 ? _l(Mi.bind(null, e)) : a8(Mi.bind(null, e)),
                Tl(function() {
                    (h1 & 6) === 0 && ct()
                }),
                i = null;
            else {
                switch (pr(o)) {
                case 1:
                    i = R7;
                    break;
                case 4:
                    i = dr;
                    break;
                case 16:
                    i = Bn;
                    break;
                case 536870912:
                    i = Cr;
                    break;
                default:
                    i = Bn
                }
                i = Ri(i, ki.bind(null, e))
            }
            e.callbackPriority = t,
            e.callbackNode = i
        }
    }
    function ki(e, t) {
        if (O4 = -1,
        F4 = 0,
        (h1 & 6) !== 0)
            throw Error(s(327));
        var i = e.callbackNode;
        if (y3() && e.callbackNode !== i)
            return null;
        var o = Wn(e, e === H1 ? K1 : 0);
        if (o === 0)
            return null;
        if ((o & 30) !== 0 || (o & e.expiredLanes) !== 0 || t)
            t = N4(e, o);
        else {
            t = o;
            var a = h1;
            h1 |= 2;
            var c = ji();
            (H1 !== e || K1 !== t) && (Qe = null,
            m3 = Z1() + 500,
            Ot(e, t));
            do
                try {
                    Ql();
                    break
                } catch (x) {
                    Si(e, x)
                }
            while (!0);
            m6(),
            R4.current = c,
            h1 = a,
            N1 !== null ? t = 0 : (H1 = null,
            K1 = 0,
            t = B1)
        }
        if (t !== 0) {
            if (t === 2 && (a = A7(e),
            a !== 0 && (o = a,
            t = J6(e, a))),
            t === 1)
                throw i = Cn,
                Ot(e, 0),
                yt(e, o),
                ce(e, Z1()),
                i;
            if (t === 6)
                yt(e, o);
            else {
                if (a = e.current.alternate,
                (o & 30) === 0 && !Xl(a) && (t = N4(e, o),
                t === 2 && (c = A7(e),
                c !== 0 && (o = c,
                t = J6(e, c))),
                t === 1))
                    throw i = Cn,
                    Ot(e, 0),
                    yt(e, o),
                    ce(e, Z1()),
                    i;
                switch (e.finishedWork = a,
                e.finishedLanes = o,
                t) {
                case 0:
                case 1:
                    throw Error(s(345));
                case 2:
                    Ft(e, ue, Qe);
                    break;
                case 3:
                    if (yt(e, o),
                    (o & 130023424) === o && (t = Y6 + 500 - Z1(),
                    10 < t)) {
                        if (Wn(e, 0) !== 0)
                            break;
                        if (a = e.suspendedLanes,
                        (a & o) !== o) {
                            ie(),
                            e.pingedLanes |= e.suspendedLanes & a;
                            break
                        }
                        e.timeoutHandle = s6(Ft.bind(null, e, ue, Qe), t);
                        break
                    }
                    Ft(e, ue, Qe);
                    break;
                case 4:
                    if (yt(e, o),
                    (o & 4194240) === o)
                        break;
                    for (t = e.eventTimes,
                    a = -1; 0 < o; ) {
                        var m = 31 - Te(o);
                        c = 1 << m,
                        m = t[m],
                        m > a && (a = m),
                        o &= ~c
                    }
                    if (o = a,
                    o = Z1() - o,
                    o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * Gl(o / 1960)) - o,
                    10 < o) {
                        e.timeoutHandle = s6(Ft.bind(null, e, ue, Qe), o);
                        break
                    }
                    Ft(e, ue, Qe);
                    break;
                case 5:
                    Ft(e, ue, Qe);
                    break;
                default:
                    throw Error(s(329))
                }
            }
        }
        return ce(e, Z1()),
        e.callbackNode === i ? ki.bind(null, e) : null
    }
    function J6(e, t) {
        var i = hn;
        return e.current.memoizedState.isDehydrated && (Ot(e, t).flags |= 256),
        e = N4(e, t),
        e !== 2 && (t = ue,
        ue = i,
        t !== null && e0(t)),
        e
    }
    function e0(e) {
        ue === null ? ue = e : ue.push.apply(ue, e)
    }
    function Xl(e) {
        for (var t = e; ; ) {
            if (t.flags & 16384) {
                var i = t.updateQueue;
                if (i !== null && (i = i.stores,
                i !== null))
                    for (var o = 0; o < i.length; o++) {
                        var a = i[o]
                          , c = a.getSnapshot;
                        a = a.value;
                        try {
                            if (!Ee(c(), a))
                                return !1
                        } catch {
                            return !1
                        }
                    }
            }
            if (i = t.child,
            t.subtreeFlags & 16384 && i !== null)
                i.return = t,
                t = i;
            else {
                if (t === e)
                    break;
                for (; t.sibling === null; ) {
                    if (t.return === null || t.return === e)
                        return !0;
                    t = t.return
                }
                t.sibling.return = t.return,
                t = t.sibling
            }
        }
        return !0
    }
    function yt(e, t) {
        for (t &= ~X6,
        t &= ~A4,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes; 0 < t; ) {
            var i = 31 - Te(t)
              , o = 1 << i;
            e[i] = -1,
            t &= ~o
        }
    }
    function Mi(e) {
        if ((h1 & 6) !== 0)
            throw Error(s(327));
        y3();
        var t = Wn(e, 0);
        if ((t & 1) === 0)
            return ce(e, Z1()),
            null;
        var i = N4(e, t);
        if (e.tag !== 0 && i === 2) {
            var o = A7(e);
            o !== 0 && (t = o,
            i = J6(e, o))
        }
        if (i === 1)
            throw i = Cn,
            Ot(e, 0),
            yt(e, t),
            ce(e, Z1()),
            i;
        if (i === 6)
            throw Error(s(345));
        return e.finishedWork = e.current.alternate,
        e.finishedLanes = t,
        Ft(e, ue, Qe),
        ce(e, Z1()),
        null
    }
    function t0(e, t) {
        var i = h1;
        h1 |= 1;
        try {
            return e(t)
        } finally {
            h1 = i,
            h1 === 0 && (m3 = Z1() + 500,
            f4 && ct())
        }
    }
    function Zt(e) {
        pt !== null && pt.tag === 0 && (h1 & 6) === 0 && y3();
        var t = h1;
        h1 |= 1;
        var i = we.transition
          , o = v1;
        try {
            if (we.transition = null,
            v1 = 1,
            e)
                return e()
        } finally {
            v1 = o,
            we.transition = i,
            h1 = t,
            (h1 & 6) === 0 && ct()
        }
    }
    function n0() {
        me = p3.current,
        j1(p3)
    }
    function Ot(e, t) {
        e.finishedWork = null,
        e.finishedLanes = 0;
        var i = e.timeoutHandle;
        if (i !== -1 && (e.timeoutHandle = -1,
        jl(i)),
        N1 !== null)
            for (i = N1.return; i !== null; ) {
                var o = i;
                switch (f6(o),
                o.tag) {
                case 1:
                    o = o.type.childContextTypes,
                    o != null && u4();
                    break;
                case 3:
                    d3(),
                    j1(oe),
                    j1(Q1),
                    S6();
                    break;
                case 5:
                    k6(o);
                    break;
                case 4:
                    d3();
                    break;
                case 13:
                    j1(P1);
                    break;
                case 19:
                    j1(P1);
                    break;
                case 10:
                    y6(o.type._context);
                    break;
                case 22:
                case 23:
                    n0()
                }
                i = i.return
            }
        if (H1 = e,
        N1 = e = gt(e.current, null),
        K1 = me = t,
        B1 = 0,
        Cn = null,
        X6 = A4 = Vt = 0,
        ue = hn = null,
        Rt !== null) {
            for (t = 0; t < Rt.length; t++)
                if (i = Rt[t],
                o = i.interleaved,
                o !== null) {
                    i.interleaved = null;
                    var a = o.next
                      , c = i.pending;
                    if (c !== null) {
                        var m = c.next;
                        c.next = a,
                        o.next = m
                    }
                    i.pending = o
                }
            Rt = null
        }
        return e
    }
    function Si(e, t) {
        do {
            var i = N1;
            try {
                if (m6(),
                w4.current = j4,
                k4) {
                    for (var o = L1.memoizedState; o !== null; ) {
                        var a = o.queue;
                        a !== null && (a.pending = null),
                        o = o.next
                    }
                    k4 = !1
                }
                if (Dt = 0,
                U1 = z1 = L1 = null,
                ln = !1,
                an = 0,
                G6.current = null,
                i === null || i.return === null) {
                    B1 = 1,
                    Cn = t,
                    N1 = null;
                    break
                }
                e: {
                    var c = e
                      , m = i.return
                      , x = i
                      , k = t;
                    if (t = K1,
                    x.flags |= 32768,
                    k !== null && typeof k == "object" && typeof k.then == "function") {
                        var L = k
                          , F = x
                          , I = F.tag;
                        if ((F.mode & 1) === 0 && (I === 0 || I === 11 || I === 15)) {
                            var O = F.alternate;
                            O ? (F.updateQueue = O.updateQueue,
                            F.memoizedState = O.memoizedState,
                            F.lanes = O.lanes) : (F.updateQueue = null,
                            F.memoizedState = null)
                        }
                        var W = X8(m);
                        if (W !== null) {
                            W.flags &= -257,
                            Y8(W, m, x, c, t),
                            W.mode & 1 && G8(c, L, t),
                            t = W,
                            k = L;
                            var Y = t.updateQueue;
                            if (Y === null) {
                                var Q = new Set;
                                Q.add(k),
                                t.updateQueue = Q
                            } else
                                Y.add(k);
                            break e
                        } else {
                            if ((t & 1) === 0) {
                                G8(c, L, t),
                                r0();
                                break e
                            }
                            k = Error(s(426))
                        }
                    } else if (E1 && x.mode & 1) {
                        var O1 = X8(m);
                        if (O1 !== null) {
                            (O1.flags & 65536) === 0 && (O1.flags |= 256),
                            Y8(O1, m, x, c, t),
                            h6(C3(k, x));
                            break e
                        }
                    }
                    c = k = C3(k, x),
                    B1 !== 4 && (B1 = 2),
                    hn === null ? hn = [c] : hn.push(c),
                    c = m;
                    do {
                        switch (c.tag) {
                        case 3:
                            c.flags |= 65536,
                            t &= -t,
                            c.lanes |= t;
                            var T = W8(c, k, t);
                            v8(c, T);
                            break e;
                        case 1:
                            x = k;
                            var M = c.type
                              , E = c.stateNode;
                            if ((c.flags & 128) === 0 && (typeof M.getDerivedStateFromError == "function" || E !== null && typeof E.componentDidCatch == "function" && (ht === null || !ht.has(E)))) {
                                c.flags |= 65536,
                                t &= -t,
                                c.lanes |= t;
                                var z = K8(c, x, t);
                                v8(c, z);
                                break e
                            }
                        }
                        c = c.return
                    } while (c !== null)
                }
                Ei(i)
            } catch (J) {
                t = J,
                N1 === i && i !== null && (N1 = i = i.return);
                continue
            }
            break
        } while (!0)
    }
    function ji() {
        var e = R4.current;
        return R4.current = j4,
        e === null ? j4 : e
    }
    function r0() {
        (B1 === 0 || B1 === 3 || B1 === 2) && (B1 = 4),
        H1 === null || (Vt & 268435455) === 0 && (A4 & 268435455) === 0 || yt(H1, K1)
    }
    function N4(e, t) {
        var i = h1;
        h1 |= 2;
        var o = ji();
        (H1 !== e || K1 !== t) && (Qe = null,
        Ot(e, t));
        do
            try {
                Yl();
                break
            } catch (a) {
                Si(e, a)
            }
        while (!0);
        if (m6(),
        h1 = i,
        R4.current = o,
        N1 !== null)
            throw Error(s(261));
        return H1 = null,
        K1 = 0,
        B1
    }
    function Yl() {
        for (; N1 !== null; )
            Ti(N1)
    }
    function Ql() {
        for (; N1 !== null && !ko(); )
            Ti(N1)
    }
    function Ti(e) {
        var t = _i(e.alternate, e, me);
        e.memoizedProps = e.pendingProps,
        t === null ? Ei(e) : N1 = t,
        G6.current = null
    }
    function Ei(e) {
        var t = e;
        do {
            var i = t.alternate;
            if (e = t.return,
            (t.flags & 32768) === 0) {
                if (i = Ul(i, t, me),
                i !== null) {
                    N1 = i;
                    return
                }
            } else {
                if (i = Hl(i, t),
                i !== null) {
                    i.flags &= 32767,
                    N1 = i;
                    return
                }
                if (e !== null)
                    e.flags |= 32768,
                    e.subtreeFlags = 0,
                    e.deletions = null;
                else {
                    B1 = 6,
                    N1 = null;
                    return
                }
            }
            if (t = t.sibling,
            t !== null) {
                N1 = t;
                return
            }
            N1 = t = e
        } while (t !== null);
        B1 === 0 && (B1 = 5)
    }
    function Ft(e, t, i) {
        var o = v1
          , a = we.transition;
        try {
            we.transition = null,
            v1 = 1,
            ql(e, t, i, o)
        } finally {
            we.transition = a,
            v1 = o
        }
        return null
    }
    function ql(e, t, i, o) {
        do
            y3();
        while (pt !== null);
        if ((h1 & 6) !== 0)
            throw Error(s(327));
        i = e.finishedWork;
        var a = e.finishedLanes;
        if (i === null)
            return null;
        if (e.finishedWork = null,
        e.finishedLanes = 0,
        i === e.current)
            throw Error(s(177));
        e.callbackNode = null,
        e.callbackPriority = 0;
        var c = i.lanes | i.childLanes;
        if (Ao(e, c),
        e === H1 && (N1 = H1 = null,
        K1 = 0),
        (i.subtreeFlags & 2064) === 0 && (i.flags & 2064) === 0 || V4 || (V4 = !0,
        Ri(Bn, function() {
            return y3(),
            null
        })),
        c = (i.flags & 15990) !== 0,
        (i.subtreeFlags & 15990) !== 0 || c) {
            c = we.transition,
            we.transition = null;
            var m = v1;
            v1 = 1;
            var x = h1;
            h1 |= 4,
            G6.current = null,
            Wl(e, i),
            yi(i, e),
            gl(r6),
            Xn = !!n6,
            r6 = n6 = null,
            e.current = i,
            Kl(i),
            Mo(),
            h1 = x,
            v1 = m,
            we.transition = c
        } else
            e.current = i;
        if (V4 && (V4 = !1,
        pt = e,
        Z4 = a),
        c = e.pendingLanes,
        c === 0 && (ht = null),
        To(i.stateNode),
        ce(e, Z1()),
        t !== null)
            for (o = e.onRecoverableError,
            i = 0; i < t.length; i++)
                a = t[i],
                o(a.value, {
                    componentStack: a.stack,
                    digest: a.digest
                });
        if (D4)
            throw D4 = !1,
            e = Q6,
            Q6 = null,
            e;
        return (Z4 & 1) !== 0 && e.tag !== 0 && y3(),
        c = e.pendingLanes,
        (c & 1) !== 0 ? e === q6 ? pn++ : (pn = 0,
        q6 = e) : pn = 0,
        ct(),
        null
    }
    function y3() {
        if (pt !== null) {
            var e = pr(Z4)
              , t = we.transition
              , i = v1;
            try {
                if (we.transition = null,
                v1 = 16 > e ? 16 : e,
                pt === null)
                    var o = !1;
                else {
                    if (e = pt,
                    pt = null,
                    Z4 = 0,
                    (h1 & 6) !== 0)
                        throw Error(s(331));
                    var a = h1;
                    for (h1 |= 4,
                    G = e.current; G !== null; ) {
                        var c = G
                          , m = c.child;
                        if ((G.flags & 16) !== 0) {
                            var x = c.deletions;
                            if (x !== null) {
                                for (var k = 0; k < x.length; k++) {
                                    var L = x[k];
                                    for (G = L; G !== null; ) {
                                        var F = G;
                                        switch (F.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            dn(8, F, c)
                                        }
                                        var I = F.child;
                                        if (I !== null)
                                            I.return = F,
                                            G = I;
                                        else
                                            for (; G !== null; ) {
                                                F = G;
                                                var O = F.sibling
                                                  , W = F.return;
                                                if (di(F),
                                                F === L) {
                                                    G = null;
                                                    break
                                                }
                                                if (O !== null) {
                                                    O.return = W,
                                                    G = O;
                                                    break
                                                }
                                                G = W
                                            }
                                    }
                                }
                                var Y = c.alternate;
                                if (Y !== null) {
                                    var Q = Y.child;
                                    if (Q !== null) {
                                        Y.child = null;
                                        do {
                                            var O1 = Q.sibling;
                                            Q.sibling = null,
                                            Q = O1
                                        } while (Q !== null)
                                    }
                                }
                                G = c
                            }
                        }
                        if ((c.subtreeFlags & 2064) !== 0 && m !== null)
                            m.return = c,
                            G = m;
                        else
                            e: for (; G !== null; ) {
                                if (c = G,
                                (c.flags & 2048) !== 0)
                                    switch (c.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        dn(9, c, c.return)
                                    }
                                var T = c.sibling;
                                if (T !== null) {
                                    T.return = c.return,
                                    G = T;
                                    break e
                                }
                                G = c.return
                            }
                    }
                    var M = e.current;
                    for (G = M; G !== null; ) {
                        m = G;
                        var E = m.child;
                        if ((m.subtreeFlags & 2064) !== 0 && E !== null)
                            E.return = m,
                            G = E;
                        else
                            e: for (m = M; G !== null; ) {
                                if (x = G,
                                (x.flags & 2048) !== 0)
                                    try {
                                        switch (x.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            _4(9, x)
                                        }
                                    } catch (J) {
                                        A1(x, x.return, J)
                                    }
                                if (x === m) {
                                    G = null;
                                    break e
                                }
                                var z = x.sibling;
                                if (z !== null) {
                                    z.return = x.return,
                                    G = z;
                                    break e
                                }
                                G = x.return
                            }
                    }
                    if (h1 = a,
                    ct(),
                    Ze && typeof Ze.onPostCommitFiberRoot == "function")
                        try {
                            Ze.onPostCommitFiberRoot(Un, e)
                        } catch {}
                    o = !0
                }
                return o
            } finally {
                v1 = i,
                we.transition = t
            }
        }
        return !1
    }
    function Pi(e, t, i) {
        t = C3(i, t),
        t = W8(e, t, 1),
        e = dt(e, t, 1),
        t = ie(),
        e !== null && (N3(e, 1, t),
        ce(e, t))
    }
    function A1(e, t, i) {
        if (e.tag === 3)
            Pi(e, e, i);
        else
            for (; t !== null; ) {
                if (t.tag === 3) {
                    Pi(t, e, i);
                    break
                } else if (t.tag === 1) {
                    var o = t.stateNode;
                    if (typeof t.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (ht === null || !ht.has(o))) {
                        e = C3(i, e),
                        e = K8(t, e, 1),
                        t = dt(t, e, 1),
                        e = ie(),
                        t !== null && (N3(t, 1, e),
                        ce(t, e));
                        break
                    }
                }
                t = t.return
            }
    }
    function Jl(e, t, i) {
        var o = e.pingCache;
        o !== null && o.delete(t),
        t = ie(),
        e.pingedLanes |= e.suspendedLanes & i,
        H1 === e && (K1 & i) === i && (B1 === 4 || B1 === 3 && (K1 & 130023424) === K1 && 500 > Z1() - Y6 ? Ot(e, 0) : X6 |= i),
        ce(e, t)
    }
    function Li(e, t) {
        t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = $n,
        $n <<= 1,
        ($n & 130023424) === 0 && ($n = 4194304)));
        var i = ie();
        e = Ge(e, t),
        e !== null && (N3(e, t, i),
        ce(e, i))
    }
    function ea(e) {
        var t = e.memoizedState
          , i = 0;
        t !== null && (i = t.retryLane),
        Li(e, i)
    }
    function ta(e, t) {
        var i = 0;
        switch (e.tag) {
        case 13:
            var o = e.stateNode
              , a = e.memoizedState;
            a !== null && (i = a.retryLane);
            break;
        case 19:
            o = e.stateNode;
            break;
        default:
            throw Error(s(314))
        }
        o !== null && o.delete(t),
        Li(e, i)
    }
    var _i;
    _i = function(e, t, i) {
        if (e !== null)
            if (e.memoizedProps !== t.pendingProps || oe.current)
                ae = !0;
            else {
                if ((e.lanes & i) === 0 && (t.flags & 128) === 0)
                    return ae = !1,
                    Bl(e, t, i);
                ae = (e.flags & 131072) !== 0
            }
        else
            ae = !1,
            E1 && (t.flags & 1048576) !== 0 && u8(t, C4, t.index);
        switch (t.lanes = 0,
        t.tag) {
        case 2:
            var o = t.type;
            P4(e, t),
            e = t.pendingProps;
            var a = s3(t, Q1.current);
            f3(t, i),
            a = E6(null, t, o, e, a, i);
            var c = P6();
            return t.flags |= 1,
            typeof a == "object" && a !== null && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1,
            t.memoizedState = null,
            t.updateQueue = null,
            le(o) ? (c = !0,
            c4(t)) : c = !1,
            t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null,
            x6(t),
            a.updater = T4,
            t.stateNode = a,
            a._reactInternals = t,
            V6(t, o, e, i),
            t = N6(null, t, o, !0, c, i)) : (t.tag = 0,
            E1 && c && c6(t),
            re(null, t, a, i),
            t = t.child),
            t;
        case 16:
            o = t.elementType;
            e: {
                switch (P4(e, t),
                e = t.pendingProps,
                a = o._init,
                o = a(o._payload),
                t.type = o,
                a = t.tag = ra(o),
                e = Le(o, e),
                a) {
                case 0:
                    t = F6(null, t, o, e, i);
                    break e;
                case 1:
                    t = ni(null, t, o, e, i);
                    break e;
                case 11:
                    t = Q8(null, t, o, e, i);
                    break e;
                case 14:
                    t = q8(null, t, o, Le(o.type, e), i);
                    break e
                }
                throw Error(s(306, o, ""))
            }
            return t;
        case 0:
            return o = t.type,
            a = t.pendingProps,
            a = t.elementType === o ? a : Le(o, a),
            F6(e, t, o, a, i);
        case 1:
            return o = t.type,
            a = t.pendingProps,
            a = t.elementType === o ? a : Le(o, a),
            ni(e, t, o, a, i);
        case 3:
            e: {
                if (ri(t),
                e === null)
                    throw Error(s(387));
                o = t.pendingProps,
                c = t.memoizedState,
                a = c.element,
                g8(e, t),
                v4(t, o, null, i);
                var m = t.memoizedState;
                if (o = m.element,
                c.isDehydrated)
                    if (c = {
                        element: o,
                        isDehydrated: !1,
                        cache: m.cache,
                        pendingSuspenseBoundaries: m.pendingSuspenseBoundaries,
                        transitions: m.transitions
                    },
                    t.updateQueue.baseState = c,
                    t.memoizedState = c,
                    t.flags & 256) {
                        a = C3(Error(s(423)), t),
                        t = ii(e, t, o, i, a);
                        break e
                    } else if (o !== a) {
                        a = C3(Error(s(424)), t),
                        t = ii(e, t, o, i, a);
                        break e
                    } else
                        for (pe = lt(t.stateNode.containerInfo.firstChild),
                        he = t,
                        E1 = !0,
                        Pe = null,
                        i = m8(t, null, o, i),
                        t.child = i; i; )
                            i.flags = i.flags & -3 | 4096,
                            i = i.sibling;
                else {
                    if (a3(),
                    o === a) {
                        t = Ye(e, t, i);
                        break e
                    }
                    re(e, t, o, i)
                }
                t = t.child
            }
            return t;
        case 5:
            return w8(t),
            e === null && C6(t),
            o = t.type,
            a = t.pendingProps,
            c = e !== null ? e.memoizedProps : null,
            m = a.children,
            i6(o, a) ? m = null : c !== null && i6(o, c) && (t.flags |= 32),
            ti(e, t),
            re(e, t, m, i),
            t.child;
        case 6:
            return e === null && C6(t),
            null;
        case 13:
            return si(e, t, i);
        case 4:
            return w6(t, t.stateNode.containerInfo),
            o = t.pendingProps,
            e === null ? t.child = u3(t, null, o, i) : re(e, t, o, i),
            t.child;
        case 11:
            return o = t.type,
            a = t.pendingProps,
            a = t.elementType === o ? a : Le(o, a),
            Q8(e, t, o, a, i);
        case 7:
            return re(e, t, t.pendingProps, i),
            t.child;
        case 8:
            return re(e, t, t.pendingProps.children, i),
            t.child;
        case 12:
            return re(e, t, t.pendingProps.children, i),
            t.child;
        case 10:
            e: {
                if (o = t.type._context,
                a = t.pendingProps,
                c = t.memoizedProps,
                m = a.value,
                M1(m4, o._currentValue),
                o._currentValue = m,
                c !== null)
                    if (Ee(c.value, m)) {
                        if (c.children === a.children && !oe.current) {
                            t = Ye(e, t, i);
                            break e
                        }
                    } else
                        for (c = t.child,
                        c !== null && (c.return = t); c !== null; ) {
                            var x = c.dependencies;
                            if (x !== null) {
                                m = c.child;
                                for (var k = x.firstContext; k !== null; ) {
                                    if (k.context === o) {
                                        if (c.tag === 1) {
                                            k = Xe(-1, i & -i),
                                            k.tag = 2;
                                            var L = c.updateQueue;
                                            if (L !== null) {
                                                L = L.shared;
                                                var F = L.pending;
                                                F === null ? k.next = k : (k.next = F.next,
                                                F.next = k),
                                                L.pending = k
                                            }
                                        }
                                        c.lanes |= i,
                                        k = c.alternate,
                                        k !== null && (k.lanes |= i),
                                        g6(c.return, i, t),
                                        x.lanes |= i;
                                        break
                                    }
                                    k = k.next
                                }
                            } else if (c.tag === 10)
                                m = c.type === t.type ? null : c.child;
                            else if (c.tag === 18) {
                                if (m = c.return,
                                m === null)
                                    throw Error(s(341));
                                m.lanes |= i,
                                x = m.alternate,
                                x !== null && (x.lanes |= i),
                                g6(m, i, t),
                                m = c.sibling
                            } else
                                m = c.child;
                            if (m !== null)
                                m.return = c;
                            else
                                for (m = c; m !== null; ) {
                                    if (m === t) {
                                        m = null;
                                        break
                                    }
                                    if (c = m.sibling,
                                    c !== null) {
                                        c.return = m.return,
                                        m = c;
                                        break
                                    }
                                    m = m.return
                                }
                            c = m
                        }
                re(e, t, a.children, i),
                t = t.child
            }
            return t;
        case 9:
            return a = t.type,
            o = t.pendingProps.children,
            f3(t, i),
            a = ve(a),
            o = o(a),
            t.flags |= 1,
            re(e, t, o, i),
            t.child;
        case 14:
            return o = t.type,
            a = Le(o, t.pendingProps),
            a = Le(o.type, a),
            q8(e, t, o, a, i);
        case 15:
            return J8(e, t, t.type, t.pendingProps, i);
        case 17:
            return o = t.type,
            a = t.pendingProps,
            a = t.elementType === o ? a : Le(o, a),
            P4(e, t),
            t.tag = 1,
            le(o) ? (e = !0,
            c4(t)) : e = !1,
            f3(t, i),
            H8(t, o, a),
            V6(t, o, a, i),
            N6(null, t, o, !0, e, i);
        case 19:
            return li(e, t, i);
        case 22:
            return ei(e, t, i)
        }
        throw Error(s(156, t.tag))
    }
    ;
    function Ri(e, t) {
        return cr(e, t)
    }
    function na(e, t, i, o) {
        this.tag = e,
        this.key = i,
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
        this.index = 0,
        this.ref = null,
        this.pendingProps = t,
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
        this.mode = o,
        this.subtreeFlags = this.flags = 0,
        this.deletions = null,
        this.childLanes = this.lanes = 0,
        this.alternate = null
    }
    function ke(e, t, i, o) {
        return new na(e,t,i,o)
    }
    function i0(e) {
        return e = e.prototype,
        !(!e || !e.isReactComponent)
    }
    function ra(e) {
        if (typeof e == "function")
            return i0(e) ? 1 : 0;
        if (e != null) {
            if (e = e.$$typeof,
            e === H)
                return 11;
            if (e === U)
                return 14
        }
        return 2
    }
    function gt(e, t) {
        var i = e.alternate;
        return i === null ? (i = ke(e.tag, t, e.key, e.mode),
        i.elementType = e.elementType,
        i.type = e.type,
        i.stateNode = e.stateNode,
        i.alternate = e,
        e.alternate = i) : (i.pendingProps = t,
        i.type = e.type,
        i.flags = 0,
        i.subtreeFlags = 0,
        i.deletions = null),
        i.flags = e.flags & 14680064,
        i.childLanes = e.childLanes,
        i.lanes = e.lanes,
        i.child = e.child,
        i.memoizedProps = e.memoizedProps,
        i.memoizedState = e.memoizedState,
        i.updateQueue = e.updateQueue,
        t = e.dependencies,
        i.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        },
        i.sibling = e.sibling,
        i.index = e.index,
        i.ref = e.ref,
        i
    }
    function I4(e, t, i, o, a, c) {
        var m = 2;
        if (o = e,
        typeof e == "function")
            i0(e) && (m = 1);
        else if (typeof e == "string")
            m = 5;
        else
            e: switch (e) {
            case s1:
                return Nt(i.children, a, c, t);
            case e1:
                m = 8,
                a |= 8;
                break;
            case y1:
                return e = ke(12, i, t, a | 2),
                e.elementType = y1,
                e.lanes = c,
                e;
            case n1:
                return e = ke(13, i, t, a),
                e.elementType = n1,
                e.lanes = c,
                e;
            case f1:
                return e = ke(19, i, t, a),
                e.elementType = f1,
                e.lanes = c,
                e;
            case q:
                return b4(i, a, c, t);
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                    case w1:
                        m = 10;
                        break e;
                    case b1:
                        m = 9;
                        break e;
                    case H:
                        m = 11;
                        break e;
                    case U:
                        m = 14;
                        break e;
                    case p1:
                        m = 16,
                        o = null;
                        break e
                    }
                throw Error(s(130, e == null ? e : typeof e, ""))
            }
        return t = ke(m, i, t, a),
        t.elementType = e,
        t.type = o,
        t.lanes = c,
        t
    }
    function Nt(e, t, i, o) {
        return e = ke(7, e, o, t),
        e.lanes = i,
        e
    }
    function b4(e, t, i, o) {
        return e = ke(22, e, o, t),
        e.elementType = q,
        e.lanes = i,
        e.stateNode = {
            isHidden: !1
        },
        e
    }
    function s0(e, t, i) {
        return e = ke(6, e, null, t),
        e.lanes = i,
        e
    }
    function o0(e, t, i) {
        return t = ke(4, e.children !== null ? e.children : [], e.key, t),
        t.lanes = i,
        t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        },
        t
    }
    function ia(e, t, i, o, a) {
        this.tag = t,
        this.containerInfo = e,
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
        this.timeoutHandle = -1,
        this.callbackNode = this.pendingContext = this.context = null,
        this.callbackPriority = 0,
        this.eventTimes = D7(0),
        this.expirationTimes = D7(-1),
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
        this.entanglements = D7(0),
        this.identifierPrefix = o,
        this.onRecoverableError = a,
        this.mutableSourceEagerHydrationData = null
    }
    function l0(e, t, i, o, a, c, m, x, k) {
        return e = new ia(e,t,i,x,k),
        t === 1 ? (t = 1,
        c === !0 && (t |= 8)) : t = 0,
        c = ke(3, null, null, t),
        e.current = c,
        c.stateNode = e,
        c.memoizedState = {
            element: o,
            isDehydrated: i,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null
        },
        x6(c),
        e
    }
    function sa(e, t, i) {
        var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
            $$typeof: t1,
            key: o == null ? null : "" + o,
            children: e,
            containerInfo: t,
            implementation: i
        }
    }
    function Ai(e) {
        if (!e)
            return ut;
        e = e._reactInternals;
        e: {
            if (Tt(e) !== e || e.tag !== 1)
                throw Error(s(170));
            var t = e;
            do {
                switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (le(t.type)) {
                        t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e
                    }
                }
                t = t.return
            } while (t !== null);
            throw Error(s(171))
        }
        if (e.tag === 1) {
            var i = e.type;
            if (le(i))
                return o8(e, i, t)
        }
        return t
    }
    function Di(e, t, i, o, a, c, m, x, k) {
        return e = l0(i, o, !0, e, a, c, m, x, k),
        e.context = Ai(null),
        i = e.current,
        o = ie(),
        a = mt(i),
        c = Xe(o, a),
        c.callback = t ?? null,
        dt(i, c, a),
        e.current.lanes = a,
        N3(e, a, o),
        ce(e, o),
        e
    }
    function z4(e, t, i, o) {
        var a = t.current
          , c = ie()
          , m = mt(a);
        return i = Ai(i),
        t.context === null ? t.context = i : t.pendingContext = i,
        t = Xe(c, m),
        t.payload = {
            element: e
        },
        o = o === void 0 ? null : o,
        o !== null && (t.callback = o),
        e = dt(a, t, m),
        e !== null && (Ae(e, a, m, c),
        g4(e, a, m)),
        m
    }
    function B4(e) {
        if (e = e.current,
        !e.child)
            return null;
        switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode
        }
    }
    function Vi(e, t) {
        if (e = e.memoizedState,
        e !== null && e.dehydrated !== null) {
            var i = e.retryLane;
            e.retryLane = i !== 0 && i < t ? i : t
        }
    }
    function a0(e, t) {
        Vi(e, t),
        (e = e.alternate) && Vi(e, t)
    }
    function oa() {
        return null
    }
    var Zi = typeof reportError == "function" ? reportError : function(e) {
        console.error(e)
    }
    ;
    function u0(e) {
        this._internalRoot = e
    }
    U4.prototype.render = u0.prototype.render = function(e) {
        var t = this._internalRoot;
        if (t === null)
            throw Error(s(409));
        z4(e, t, null, null)
    }
    ,
    U4.prototype.unmount = u0.prototype.unmount = function() {
        var e = this._internalRoot;
        if (e !== null) {
            this._internalRoot = null;
            var t = e.containerInfo;
            Zt(function() {
                z4(null, e, null, null)
            }),
            t[He] = null
        }
    }
    ;
    function U4(e) {
        this._internalRoot = e
    }
    U4.prototype.unstable_scheduleHydration = function(e) {
        if (e) {
            var t = gr();
            e = {
                blockedOn: null,
                target: e,
                priority: t
            };
            for (var i = 0; i < it.length && t !== 0 && t < it[i].priority; i++)
                ;
            it.splice(i, 0, e),
            i === 0 && wr(e)
        }
    }
    ;
    function c0(e) {
        return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
    }
    function H4(e) {
        return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    }
    function Oi() {}
    function la(e, t, i, o, a) {
        if (a) {
            if (typeof o == "function") {
                var c = o;
                o = function() {
                    var L = B4(m);
                    c.call(L)
                }
            }
            var m = Di(t, o, e, 0, null, !1, !1, "", Oi);
            return e._reactRootContainer = m,
            e[He] = m.current,
            q3(e.nodeType === 8 ? e.parentNode : e),
            Zt(),
            m
        }
        for (; a = e.lastChild; )
            e.removeChild(a);
        if (typeof o == "function") {
            var x = o;
            o = function() {
                var L = B4(k);
                x.call(L)
            }
        }
        var k = l0(e, 0, !1, null, null, !1, !1, "", Oi);
        return e._reactRootContainer = k,
        e[He] = k.current,
        q3(e.nodeType === 8 ? e.parentNode : e),
        Zt(function() {
            z4(t, k, i, o)
        }),
        k
    }
    function $4(e, t, i, o, a) {
        var c = i._reactRootContainer;
        if (c) {
            var m = c;
            if (typeof a == "function") {
                var x = a;
                a = function() {
                    var k = B4(m);
                    x.call(k)
                }
            }
            z4(t, m, e, a)
        } else
            m = la(i, t, e, a, o);
        return B4(m)
    }
    mr = function(e) {
        switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var i = F3(t.pendingLanes);
                i !== 0 && (V7(t, i | 1),
                ce(t, Z1()),
                (h1 & 6) === 0 && (m3 = Z1() + 500,
                ct()))
            }
            break;
        case 13:
            Zt(function() {
                var o = Ge(e, 1);
                if (o !== null) {
                    var a = ie();
                    Ae(o, e, 1, a)
                }
            }),
            a0(e, 1)
        }
    }
    ,
    Z7 = function(e) {
        if (e.tag === 13) {
            var t = Ge(e, 134217728);
            if (t !== null) {
                var i = ie();
                Ae(t, e, 134217728, i)
            }
            a0(e, 134217728)
        }
    }
    ,
    yr = function(e) {
        if (e.tag === 13) {
            var t = mt(e)
              , i = Ge(e, t);
            if (i !== null) {
                var o = ie();
                Ae(i, e, t, o)
            }
            a0(e, t)
        }
    }
    ,
    gr = function() {
        return v1
    }
    ,
    vr = function(e, t) {
        var i = v1;
        try {
            return v1 = e,
            t()
        } finally {
            v1 = i
        }
    }
    ,
    E7 = function(e, t, i) {
        switch (t) {
        case "input":
            if (v7(e, i),
            t = i.name,
            i.type === "radio" && t != null) {
                for (i = e; i.parentNode; )
                    i = i.parentNode;
                for (i = i.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'),
                t = 0; t < i.length; t++) {
                    var o = i[t];
                    if (o !== e && o.form === e.form) {
                        var a = a4(o);
                        if (!a)
                            throw Error(s(90));
                        jt(o),
                        v7(o, a)
                    }
                }
            }
            break;
        case "textarea":
            G5(e, i);
            break;
        case "select":
            t = i.value,
            t != null && Kt(e, !!i.multiple, t, !1)
        }
    }
    ,
    rr = t0,
    ir = Zt;
    var aa = {
        usingClientEntryPoint: !1,
        Events: [tn, r3, a4, tr, nr, t0]
    }
      , mn = {
        findFiberByHostInstance: Et,
        bundleType: 0,
        version: "18.3.1",
        rendererPackageName: "react-dom"
    }
      , ua = {
        bundleType: mn.bundleType,
        version: mn.version,
        rendererPackageName: mn.rendererPackageName,
        rendererConfig: mn.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: X.ReactCurrentDispatcher,
        findHostInstanceByFiber: function(e) {
            return e = ar(e),
            e === null ? null : e.stateNode
        },
        findFiberByHostInstance: mn.findFiberByHostInstance || oa,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
        var W4 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!W4.isDisabled && W4.supportsFiber)
            try {
                Un = W4.inject(ua),
                Ze = W4
            } catch {}
    }
    return fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = aa,
    fe.createPortal = function(e, t) {
        var i = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!c0(t))
            throw Error(s(200));
        return sa(e, t, null, i)
    }
    ,
    fe.createRoot = function(e, t) {
        if (!c0(e))
            throw Error(s(299));
        var i = !1
          , o = ""
          , a = Zi;
        return t != null && (t.unstable_strictMode === !0 && (i = !0),
        t.identifierPrefix !== void 0 && (o = t.identifierPrefix),
        t.onRecoverableError !== void 0 && (a = t.onRecoverableError)),
        t = l0(e, 1, !1, null, null, i, !1, o, a),
        e[He] = t.current,
        q3(e.nodeType === 8 ? e.parentNode : e),
        new u0(t)
    }
    ,
    fe.findDOMNode = function(e) {
        if (e == null)
            return null;
        if (e.nodeType === 1)
            return e;
        var t = e._reactInternals;
        if (t === void 0)
            throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","),
            Error(s(268, e)));
        return e = ar(t),
        e = e === null ? null : e.stateNode,
        e
    }
    ,
    fe.flushSync = function(e) {
        return Zt(e)
    }
    ,
    fe.hydrate = function(e, t, i) {
        if (!H4(t))
            throw Error(s(200));
        return $4(null, e, t, !0, i)
    }
    ,
    fe.hydrateRoot = function(e, t, i) {
        if (!c0(e))
            throw Error(s(405));
        var o = i != null && i.hydratedSources || null
          , a = !1
          , c = ""
          , m = Zi;
        if (i != null && (i.unstable_strictMode === !0 && (a = !0),
        i.identifierPrefix !== void 0 && (c = i.identifierPrefix),
        i.onRecoverableError !== void 0 && (m = i.onRecoverableError)),
        t = Di(t, null, e, 1, i ?? null, a, !1, c, m),
        e[He] = t.current,
        q3(e),
        o)
            for (e = 0; e < o.length; e++)
                i = o[e],
                a = i._getVersion,
                a = a(i._source),
                t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [i, a] : t.mutableSourceEagerHydrationData.push(i, a);
        return new U4(t)
    }
    ,
    fe.render = function(e, t, i) {
        if (!H4(t))
            throw Error(s(200));
        return $4(null, e, t, !1, i)
    }
    ,
    fe.unmountComponentAtNode = function(e) {
        if (!H4(e))
            throw Error(s(40));
        return e._reactRootContainer ? (Zt(function() {
            $4(null, null, e, !1, function() {
                e._reactRootContainer = null,
                e[He] = null
            })
        }),
        !0) : !1
    }
    ,
    fe.unstable_batchedUpdates = t0,
    fe.unstable_renderSubtreeIntoContainer = function(e, t, i, o) {
        if (!H4(i))
            throw Error(s(200));
        if (e == null || e._reactInternals === void 0)
            throw Error(s(38));
        return $4(e, t, i, !1, o)
    }
    ,
    fe.version = "18.3.1-next-f1338f8080-20240426",
    fe
}
var Hi;
function va() {
    if (Hi)
        return C0.exports;
    Hi = 1;
    function n() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
            try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)
            } catch (r) {
                console.error(r)
            }
    }
    return n(),
    C0.exports = ga(),
    C0.exports
}
var $i;
function xa() {
    if ($i)
        return K4;
    $i = 1;
    var n = va();
    return K4.createRoot = n.createRoot,
    K4.hydrateRoot = n.hydrateRoot,
    K4
}
var wa = xa();
const ka = vs(wa)
  , Ma = "_page_1hnby_1"
  , Sa = "_container_1hnby_23"
  , ja = "_content_1hnby_40"
  , Ta = "_phone_1hnby_47"
  , Ea = "_screen_1hnby_58"
  , Pa = "_scan_1hnby_63"
  , La = "_qrcode_1hnby_74"
  , It = {
    page: Ma,
    container: Sa,
    content: ja,
    phone: Ta,
    screen: Ea,
    scan: Pa,
    qrcode: La
}
  , _a = "_footer_1bjvj_1"
  , Ra = "_credits_1bjvj_15"
  , Aa = "_details_1bjvj_41"
  , m0 = {
    footer: _a,
    credits: Ra,
    details: Aa
};
var C7 = {
    success: {
        pattern: [{
            duration: 30,
            intensity: .5
        }, {
            delay: 60,
            duration: 40,
            intensity: 1
        }]
    },
    warning: {
        pattern: [{
            duration: 40,
            intensity: .8
        }, {
            delay: 100,
            duration: 40,
            intensity: .6
        }]
    },
    error: {
        pattern: [{
            duration: 40,
            intensity: .9
        }, {
            delay: 40,
            duration: 40,
            intensity: .9
        }, {
            delay: 40,
            duration: 40,
            intensity: .9
        }]
    },
    light: {
        pattern: [{
            duration: 15,
            intensity: .4
        }]
    },
    medium: {
        pattern: [{
            duration: 25,
            intensity: .7
        }]
    },
    heavy: {
        pattern: [{
            duration: 35,
            intensity: 1
        }]
    },
    soft: {
        pattern: [{
            duration: 40,
            intensity: .5
        }]
    },
    rigid: {
        pattern: [{
            duration: 10,
            intensity: 1
        }]
    },
    selection: {
        pattern: [{
            duration: 8,
            intensity: .3
        }]
    },
    nudge: {
        pattern: [{
            duration: 80,
            intensity: .8
        }, {
            delay: 80,
            duration: 50,
            intensity: .3
        }]
    },
    buzz: {
        pattern: [{
            duration: 1e3,
            intensity: 1
        }]
    }
}
  , Da = 16
  , Va = 184
  , Wi = 1e3
  , G4 = 20;
function Za(n) {
    if (typeof n == "number")
        return {
            vibrations: [{
                duration: n
            }]
        };
    if (typeof n == "string") {
        let r = C7[n];
        return r ? {
            vibrations: r.pattern.map(s => ({
                ...s
            }))
        } : (console.warn(`[web-haptics] Unknown preset: "${n}"`),
        null)
    }
    if (Array.isArray(n)) {
        if (n.length === 0)
            return {
                vibrations: []
            };
        if (typeof n[0] == "number") {
            let r = n
              , s = [];
            for (let l = 0; l < r.length; l += 2) {
                let u = l > 0 ? r[l - 1] : 0;
                s.push({
                    ...u > 0 && {
                        delay: u
                    },
                    duration: r[l]
                })
            }
            return {
                vibrations: s
            }
        }
        return {
            vibrations: n.map(r => ({
                ...r
            }))
        }
    }
    return {
        vibrations: n.pattern.map(r => ({
            ...r
        }))
    }
}
function Oa(n, r) {
    if (r >= 1)
        return [n];
    if (r <= 0)
        return [];
    let s = Math.max(1, Math.round(G4 * r))
      , l = G4 - s
      , u = []
      , d = n;
    for (; d >= G4; )
        u.push(s),
        u.push(l),
        d -= G4;
    if (d > 0) {
        let f = Math.max(1, Math.round(d * r));
        u.push(f);
        let h = d - f;
        h > 0 && u.push(h)
    }
    return u
}
function Fa(n, r) {
    let s = [];
    for (let l = 0; l < n.length; l++) {
        let u = n[l]
          , d = Math.max(0, Math.min(1, u.intensity ?? r))
          , f = u.delay ?? 0;
        f > 0 && (s.length > 0 && s.length % 2 === 0 ? s[s.length - 1] += f : (s.length === 0 && s.push(0),
        s.push(f)));
        let h = Oa(u.duration, d);
        if (h.length === 0) {
            s.length > 0 && s.length % 2 === 0 ? s[s.length - 1] += u.duration : u.duration > 0 && (s.push(0),
            s.push(u.duration));
            continue
        }
        for (let p of h)
            s.push(p)
    }
    return s
}
var Na = 0, qe, Ki = (qe = class {
    constructor(r) {
        _1(this, "hapticLabel", null);
        _1(this, "domInitialized", !1);
        _1(this, "instanceId");
        _1(this, "debug");
        _1(this, "showSwitch");
        _1(this, "rafId", null);
        _1(this, "patternResolve", null);
        _1(this, "audioCtx", null);
        _1(this, "audioFilter", null);
        _1(this, "audioGain", null);
        _1(this, "audioBuffer", null);
        this.instanceId = ++Na,
        this.debug = (r == null ? void 0 : r.debug) ?? !1,
        this.showSwitch = (r == null ? void 0 : r.showSwitch) ?? !1
    }
    async trigger(r=[{
        duration: 25,
        intensity: .7
    }], s) {
        var f;
        let l = Za(r);
        if (!l)
            return;
        let {vibrations: u} = l;
        if (u.length === 0)
            return;
        let d = Math.max(0, Math.min(1, (s == null ? void 0 : s.intensity) ?? .5));
        for (let h of u)
            if (h.duration > Wi && (h.duration = Wi),
            !Number.isFinite(h.duration) || h.duration < 0 || h.delay !== void 0 && (!Number.isFinite(h.delay) || h.delay < 0)) {
                console.warn("[web-haptics] Invalid vibration values. Durations and delays must be finite non-negative numbers.");
                return
            }
        if (qe.isSupported && navigator.vibrate(Fa(u, d)),
        !qe.isSupported || this.debug) {
            if (this.ensureDOM(),
            !this.hapticLabel)
                return;
            this.debug && await this.ensureAudio(),
            this.stopPattern();
            let h = (((f = u[0]) == null ? void 0 : f.delay) ?? 0) === 0;
            if (h && (this.hapticLabel.click(),
            this.debug && this.audioCtx)) {
                let p = Math.max(0, Math.min(1, u[0].intensity ?? d));
                this.playClick(p)
            }
            await this.runPattern(u, d, h)
        }
    }
    cancel() {
        this.stopPattern(),
        qe.isSupported && navigator.vibrate(0)
    }
    destroy() {
        this.stopPattern(),
        this.hapticLabel && (this.hapticLabel.remove(),
        this.hapticLabel = null,
        this.domInitialized = !1),
        this.audioCtx && (this.audioCtx.close(),
        this.audioCtx = null,
        this.audioFilter = null,
        this.audioGain = null,
        this.audioBuffer = null)
    }
    setDebug(r) {
        this.debug = r,
        !r && this.audioCtx && (this.audioCtx.close(),
        this.audioCtx = null,
        this.audioFilter = null,
        this.audioGain = null,
        this.audioBuffer = null)
    }
    setShowSwitch(r) {
        if (this.showSwitch = r,
        this.hapticLabel) {
            let s = this.hapticLabel.querySelector("input");
            this.hapticLabel.style.display = r ? "" : "none",
            s && (s.style.display = r ? "" : "none")
        }
    }
    stopPattern() {
        var r;
        this.rafId !== null && (cancelAnimationFrame(this.rafId),
        this.rafId = null),
        (r = this.patternResolve) == null || r.call(this),
        this.patternResolve = null
    }
    runPattern(r, s, l) {
        return new Promise(u => {
            this.patternResolve = u;
            let d = []
              , f = 0;
            for (let v of r) {
                let w = Math.max(0, Math.min(1, v.intensity ?? s))
                  , j = v.delay ?? 0;
                j > 0 && (f += j,
                d.push({
                    end: f,
                    isOn: !1,
                    intensity: 0
                })),
                f += v.duration,
                d.push({
                    end: f,
                    isOn: !0,
                    intensity: w
                })
            }
            let h = f
              , p = 0
              , g = -1
              , y = v => {
                var A, P;
                p === 0 && (p = v);
                let w = v - p;
                if (w >= h) {
                    this.rafId = null,
                    this.patternResolve = null,
                    u();
                    return
                }
                let j = d[0];
                for (let _ of d)
                    if (w < _.end) {
                        j = _;
                        break
                    }
                if (j.isOn) {
                    let _ = Da + (1 - j.intensity) * Va;
                    g === -1 ? (g = v,
                    l || ((A = this.hapticLabel) == null || A.click(),
                    this.debug && this.audioCtx && this.playClick(j.intensity),
                    l = !0)) : v - g >= _ && ((P = this.hapticLabel) == null || P.click(),
                    this.debug && this.audioCtx && this.playClick(j.intensity),
                    g = v)
                }
                this.rafId = requestAnimationFrame(y)
            }
            ;
            this.rafId = requestAnimationFrame(y)
        }
        )
    }
    playClick(r) {
        if (!this.audioCtx || !this.audioFilter || !this.audioGain || !this.audioBuffer)
            return;
        let s = this.audioBuffer.getChannelData(0);
        for (let f = 0; f < s.length; f++)
            s[f] = (Math.random() * 2 - 1) * Math.exp(-f / 25);
        this.audioGain.gain.value = .5 * r;
        let l = 2e3 + r * 2e3
          , u = 1 + (Math.random() - .5) * .3;
        this.audioFilter.frequency.value = l * u;
        let d = this.audioCtx.createBufferSource();
        d.buffer = this.audioBuffer,
        d.connect(this.audioFilter),
        d.onended = () => d.disconnect(),
        d.start()
    }
    async ensureAudio() {
        var r;
        if (!this.audioCtx && typeof AudioContext < "u") {
            this.audioCtx = new AudioContext,
            this.audioFilter = this.audioCtx.createBiquadFilter(),
            this.audioFilter.type = "bandpass",
            this.audioFilter.frequency.value = 4e3,
            this.audioFilter.Q.value = 8,
            this.audioGain = this.audioCtx.createGain(),
            this.audioFilter.connect(this.audioGain),
            this.audioGain.connect(this.audioCtx.destination);
            let s = .004;
            this.audioBuffer = this.audioCtx.createBuffer(1, this.audioCtx.sampleRate * s, this.audioCtx.sampleRate);
            let l = this.audioBuffer.getChannelData(0);
            for (let u = 0; u < l.length; u++)
                l[u] = (Math.random() * 2 - 1) * Math.exp(-u / 25)
        }
        ((r = this.audioCtx) == null ? void 0 : r.state) === "suspended" && await this.audioCtx.resume()
    }
    ensureDOM() {
        if (this.domInitialized || typeof document > "u")
            return;
        let r = `web-haptics-${this.instanceId}`
          , s = document.createElement("label");
        s.setAttribute("for", r),
        s.textContent = "Haptic feedback",
        s.style.position = "fixed",
        s.style.bottom = "10px",
        s.style.left = "10px",
        s.style.padding = "5px 10px",
        s.style.backgroundColor = "rgba(0, 0, 0, 0.7)",
        s.style.color = "white",
        s.style.fontFamily = "sans-serif",
        s.style.fontSize = "14px",
        s.style.borderRadius = "4px",
        s.style.zIndex = "9999",
        s.style.userSelect = "none",
        this.hapticLabel = s;
        let l = document.createElement("input");
        l.type = "checkbox",
        l.setAttribute("switch", ""),
        l.id = r,
        l.style.all = "initial",
        l.style.appearance = "auto",
        this.showSwitch || (s.style.display = "none",
        l.style.display = "none"),
        s.appendChild(l),
        document.body.appendChild(s),
        this.domInitialized = !0
    }
}
,
_1(qe, "isSupported", typeof navigator < "u" && typeof navigator.vibrate == "function"),
qe), Ia = "0.0.6";
const xs = () => C.jsxs("footer", {
    className: m0.footer,
    children: [C.jsxs("div", {
        className: m0.credits,
        children: ["Crafted for the web by", C.jsxs("a", {
            href: "https://twitter.com/lochieaxon",
            target: "_blank",
            rel: "noopener noreferrer",
            children: [C.jsx("img", {
                src: "https://lochie.me/avatar.jpg",
                alt: "Avatar of Lochie",
                width: 20,
                height: 20
            }), "Lochie"]
        })]
    }), C.jsxs("div", {
        className: m0.details,
        children: [C.jsxs("span", {
            children: ["v", Ia]
        }), " •", C.jsx("a", {
            href: "https://github.com/lochie/web-haptics",
            target: "_blank",
            rel: "noopener noreferrer",
            children: "GitHub"
        })]
    })]
})
  , ba = "_page_9euvt_1"
  , za = "_safariUI_9euvt_18"
  , Ba = "_debug_9euvt_28"
  , Ua = "_container_9euvt_49"
  , Ha = "_top_9euvt_56"
  , $a = "_scrollarea_9euvt_79"
  , Wa = "_content_9euvt_87"
  , Ka = "_installation_9euvt_92"
  , Ga = "_header_9euvt_109"
  , Xa = "_demo_9euvt_128"
  , Ya = "_buttons_9euvt_136"
  , Qa = "_button_9euvt_136"
  , qa = "_success_9euvt_193"
  , Ja = "_nudge_9euvt_208"
  , eu = "_error_9euvt_226"
  , tu = "_buzz_9euvt_244"
  , X1 = {
    page: ba,
    safariUI: za,
    debug: Ba,
    container: Ua,
    top: Ha,
    scrollarea: $a,
    content: Wa,
    installation: Ka,
    header: Ga,
    demo: Xa,
    buttons: Ya,
    button: Qa,
    success: qa,
    nudge: Ja,
    error: eu,
    buzz: tu
}
  , nu = "_particles_441q0_1"
  , ru = {
    particles: nu
}
  , ws = R.createContext(null)
  , iu = () => {
    const n = R.useContext(ws);
    if (!n)
        throw new Error("useParticles must be used within a ParticlesProvider");
    return n
}
  , su = 500
  , Gi = 120
  , l5 = 2
  , Xi = new Map;
function ou(n) {
    const r = Xi.get(n);
    if (r)
        return r;
    const s = Math.min(window.devicePixelRatio || 1, l5)
      , u = Math.ceil(64 * s)
      , d = Math.ceil(u * 1.5)
      , f = document.createElement("canvas");
    f.width = d,
    f.height = d;
    const h = f.getContext("2d");
    return h.textAlign = "center",
    h.textBaseline = "middle",
    h.font = `${u}px serif`,
    h.fillText(n, d / 2, d / 2),
    Xi.set(n, f),
    f
}
function lu(n) {
    n.a += n.xv * .5,
    n.yv *= .9,
    n.y += n.yv,
    n.xv *= .98,
    n.x += n.xv,
    n.s += (1 - n.s) * .3,
    n.xv += n.gx * .1,
    n.yv += (n.gy + n.yv) * .1,
    n.radius = n.fontSize * n.s * .5,
    n.life--;
    const r = n.life / n.maxLife;
    return r < .25 && (n.opacity = r / .25),
    n.life > 0 && n.opacity > .01
}
function au(n) {
    const r = n.length;
    for (let s = 0; s < r; s++)
        for (let l = s + 1; l < r; l++) {
            const u = n[s]
              , d = n[l]
              , f = d.x - u.x
              , h = d.y - u.y
              , p = f * f + h * h
              , g = u.radius + d.radius;
            if (p < g * g && p > 1e-4) {
                const y = Math.sqrt(p)
                  , v = f / y
                  , w = h / y
                  , A = (g - y) * .5;
                u.x -= v * A,
                u.y -= w * A,
                d.x += v * A,
                d.y += w * A;
                const P = u.xv - d.xv
                  , _ = u.yv - d.yv
                  , D = P * v + _ * w;
                if (D > 0) {
                    const N = D * .5;
                    u.xv -= N * v,
                    u.yv -= N * w,
                    d.xv += N * v,
                    d.yv += N * w
                }
            }
        }
}
function Yi(n) {
    const r = Math.min(window.devicePixelRatio || 1, l5)
      , s = window.innerWidth
      , l = window.innerHeight
      , u = Math.round(s * r)
      , d = Math.round(l * r);
    (n.width !== u || n.height !== d) && (n.width = u,
    n.height = d,
    n.style.width = `${s}px`,
    n.style.height = `${l}px`)
}
function Qi(n, r, s, l, u, d) {
    if (!(n.length + 4 > su))
        for (let h = 0; h < 4; h++) {
            const p = Math.random() * 16 - 8
              , g = (h === 0 ? 4 : h === 1 || h === 2 ? 8 : 0) * (.25 + Math.random() * .25)
              , y = l[Math.floor(Math.random() * l.length)];
            n.push({
                x: r,
                y: s,
                xv: p,
                yv: g,
                a: 0,
                s: .2,
                opacity: 1,
                life: Gi,
                maxLife: Gi,
                emoji: (y == null ? void 0 : y.emoji) || "✨",
                flipH: y != null && y.canFlip ? Math.random() < .5 : !1,
                fontSize: 20 + Math.ceil(Math.random() * 40),
                radius: 0,
                gx: u,
                gy: d
            })
        }
}
const uu = ({children: n}) => {
    const r = R.useRef(null)
      , s = R.useRef([])
      , l = R.useRef(null)
      , u = R.useRef(null)
      , d = R.useCallback( () => {
        if (l.current !== null)
            return;
        const h = r.current;
        if (!h || !u.current)
            return;
        const p = u.current;
        function g() {
            const y = Math.min(window.devicePixelRatio || 1, l5)
              , v = s.current;
            for (let w = v.length - 1; w >= 0; w--)
                lu(v[w]) || (v[w] = v[v.length - 1],
                v.pop());
            if (v.length === 0) {
                p.setTransform(1, 0, 0, 1, 0, 0),
                p.clearRect(0, 0, h.width, h.height),
                l.current = null;
                return
            }
            au(v),
            p.setTransform(1, 0, 0, 1, 0, 0),
            p.clearRect(0, 0, h.width, h.height),
            p.globalAlpha = 1;
            for (let w = 0; w < 2; w++)
                for (let j = 0; j < v.length; j++) {
                    const A = v[j]
                      , P = A.opacity < 1;
                    if (w === 0 && P || w === 1 && !P)
                        continue;
                    w === 1 && (p.globalAlpha = A.opacity);
                    const _ = ou(A.emoji)
                      , D = A.fontSize * A.s * 1.5
                      , V = D / 2
                      , N = A.a * Math.PI / 180
                      , X = Math.cos(N) * y
                      , $ = Math.sin(N) * y
                      , t1 = A.flipH ? -1 : 1;
                    p.setTransform(X * t1, $ * t1, -$, X, A.x * y, A.y * y),
                    p.drawImage(_, -V, -V, D, D)
                }
            l.current = requestAnimationFrame(g)
        }
        l.current = requestAnimationFrame(g)
    }
    , []);
    R.useEffect( () => {
        const h = r.current;
        if (!h)
            return;
        u.current = h.getContext("2d"),
        Yi(h);
        const p = () => Yi(h);
        return window.addEventListener("resize", p),
        () => {
            l.current !== null && (cancelAnimationFrame(l.current),
            l.current = null),
            window.removeEventListener("resize", p)
        }
    }
    , []);
    const f = R.useCallback( (h, p, g=[{
        emoji: "✨",
        canFlip: !1
    }, {
        emoji: "🔥",
        canFlip: !1
    }], y, v=0, w=-1.5) => {
        const j = s.current;
        if (Qi(j, h, p, g, v, w),
        d(),
        y && y > 0) {
            const P = Math.floor(y / 150);
            for (let _ = 1; _ <= P; _++)
                setTimeout( () => {
                    Qi(j, h, p, g, v, w),
                    d()
                }
                , _ * 150)
        }
    }
    , [d]);
    return C.jsxs(ws.Provider, {
        value: {
            create: f
        },
        children: [n, C.jsx("canvas", {
            ref: r,
            className: ru.particles
        })]
    })
}
;
function ks(n) {
    let r = R.useRef(null);
    R.useEffect( () => (r.current = new Ki(n),
    () => {
        var d;
        (d = r.current) == null || d.destroy(),
        r.current = null
    }
    ), []),
    R.useEffect( () => {
        var d;
        (d = r.current) == null || d.setDebug((n == null ? void 0 : n.debug) ?? !1)
    }
    , [n == null ? void 0 : n.debug]),
    R.useEffect( () => {
        var d;
        (d = r.current) == null || d.setShowSwitch((n == null ? void 0 : n.showSwitch) ?? !1)
    }
    , [n == null ? void 0 : n.showSwitch]);
    let s = R.useCallback( (d, f) => {
        var h;
        return (h = r.current) == null ? void 0 : h.trigger(d, f)
    }
    , [])
      , l = R.useCallback( () => {
        var d;
        return (d = r.current) == null ? void 0 : d.cancel()
    }
    , [])
      , u = Ki.isSupported;
    return {
        trigger: s,
        cancel: l,
        isSupported: u
    }
}
const Ms = R.createContext(null)
  , a5 = () => {
    const n = R.useContext(Ms);
    if (!n)
        throw new Error("useApp must be used within an AppProvider");
    return n
}
  , cu = ({children: n}) => {
    const [r,s] = R.useState( () => !("ontouchstart"in window));
    return C.jsx(Ms.Provider, {
        value: {
            debug: r,
            setDebug: s
        },
        children: n
    })
}
  , Ss = "🫨"
  , fu = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${Ss}</text></svg>`
  , js = 8
  , du = 80
  , Ts = [];
for (let n = 0; n < js; n++) {
    const r = (Math.random() - .5) * 20
      , s = (Math.random() - .5) * 20;
    Ts.push(`data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' transform='translate(${r},${s})'>${Ss}</text></svg>`)
}
let gn = null;
function Cu(n=300) {
    const r = document.querySelector("link[rel='icon']");
    if (!r)
        return;
    gn !== null && cancelAnimationFrame(gn);
    const s = performance.now();
    let l = 0
      , u = 0;
    const d = f => {
        if (f - s >= n) {
            r.href = fu,
            gn = null;
            return
        }
        f - l >= du && (r.href = Ts[u % js],
        u++,
        l = f),
        gn = requestAnimationFrame(d)
    }
    ;
    gn = requestAnimationFrame(d)
}
const T3 = () => {
    const {debug: n} = a5()
      , {trigger: r} = ks({
        debug: n
    });
    return {
        trigger: R.useCallback( (l, u) => (Cu(),
        r(l, u)), [r])
    }
}
  , hu = ["success", "nudge", "error", "buzz"]
  , pu = {
    success: [["✅", 3], ["🎉", 2, !0], ["🤝", 1], ["💚", 2], ["👍", 3, !0]],
    warning: [["⚠️", 3], ["😬", 2], ["👀", 2], ["🫣", 1]],
    nudge: [["🫨", 2, !0], ["🙉", 3], ["👉", 2, !0], ["😳", 1]],
    error: [["⛔️", 3], ["🚨", 1], ["🚫", 3], ["🙅‍♀️", 1, !0]],
    buzz: [["🐝", 12, !0], ["🍯", 8], ["🌼", 3]]
};
function mu(n) {
    return n.flatMap( ([r,s,l]) => Array.from({
        length: s
    }, () => ({
        emoji: r,
        canFlip: l ?? !1
    })))
}
const yu = ({setShaking: n}) => {
    const {trigger: r} = T3()
      , {create: s} = iu()
      , l = R.useRef(new Map)
      , u = (d, f, h, p) => {
        r(f),
        n && d === "buzz" && (n(!0),
        setTimeout( () => n(!1), 1e3)),
        h !== void 0 && p !== void 0 && s(h, p, mu(pu[d]), d === "buzz" ? 1e3 : void 0);
        const g = l.current.get(d);
        g && (g.classList.remove(X1[d]),
        g.offsetWidth,
        g.classList.add(X1[d]))
    }
    ;
    return C.jsx("div", {
        className: X1.demo,
        children: C.jsx("div", {
            className: X1.buttons,
            children: hu.map(d => C.jsx("div", {
                className: X1.button,
                ref: f => {
                    f && l.current.set(d, f)
                }
                ,
                onAnimationEnd: f => f.currentTarget.classList.remove(X1[d]),
                children: C.jsx("button", {
                    "data-pattern": d,
                    onClick: f => {
                        const h = f.clientX || f.currentTarget.getBoundingClientRect().left + f.currentTarget.offsetWidth / 2
                          , p = f.clientY || f.currentTarget.getBoundingClientRect().top + f.currentTarget.offsetHeight / 2;
                        u(d, C7[d], h, p)
                    }
                    ,
                    children: C.jsx("span", {
                        children: d.charAt(0).toUpperCase() + d.slice(1)
                    })
                })
            }, d))
        })
    })
}
  , Pn = R.createContext({});
function u5(n) {
    const r = R.useRef(null);
    return r.current === null && (r.current = n()),
    r.current
}
const c5 = typeof window < "u"
  , f5 = c5 ? R.useLayoutEffect : R.useEffect
  , h7 = R.createContext(null);
function d5(n, r) {
    n.indexOf(r) === -1 && n.push(r)
}
function C5(n, r) {
    const s = n.indexOf(r);
    s > -1 && n.splice(s, 1)
}
const Je = (n, r, s) => s > r ? r : s < n ? n : s;
let h5 = () => {}
;
const et = {}
  , Es = n => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n);
function Ps(n) {
    return typeof n == "object" && n !== null
}
const Ls = n => /^0[^.\s]+$/u.test(n);
function p5(n) {
    let r;
    return () => (r === void 0 && (r = n()),
    r)
}
const je = n => n
  , gu = (n, r) => s => r(n(s))
  , Zn = (...n) => n.reduce(gu)
  , Ln = (n, r, s) => {
    const l = r - n;
    return l === 0 ? 1 : (s - n) / l
}
;
class m5 {
    constructor() {
        this.subscriptions = []
    }
    add(r) {
        return d5(this.subscriptions, r),
        () => C5(this.subscriptions, r)
    }
    notify(r, s, l) {
        const u = this.subscriptions.length;
        if (u)
            if (u === 1)
                this.subscriptions[0](r, s, l);
            else
                for (let d = 0; d < u; d++) {
                    const f = this.subscriptions[d];
                    f && f(r, s, l)
                }
    }
    getSize() {
        return this.subscriptions.length
    }
    clear() {
        this.subscriptions.length = 0
    }
}
const ze = n => n * 1e3
  , Be = n => n / 1e3;
function _s(n, r) {
    return r ? n * (1e3 / r) : 0
}
const Rs = (n, r, s) => (((1 - 3 * s + 3 * r) * n + (3 * s - 6 * r)) * n + 3 * r) * n
  , vu = 1e-7
  , xu = 12;
function wu(n, r, s, l, u) {
    let d, f, h = 0;
    do
        f = r + (s - r) / 2,
        d = Rs(f, l, u) - n,
        d > 0 ? s = f : r = f;
    while (Math.abs(d) > vu && ++h < xu);
    return f
}
function On(n, r, s, l) {
    if (n === r && s === l)
        return je;
    const u = d => wu(d, 0, 1, n, s);
    return d => d === 0 || d === 1 ? d : Rs(u(d), r, l)
}
const As = n => r => r <= .5 ? n(2 * r) / 2 : (2 - n(2 * (1 - r))) / 2
  , Ds = n => r => 1 - n(1 - r)
  , Vs = On(.33, 1.53, .69, .99)
  , y5 = Ds(Vs)
  , Zs = As(y5)
  , Os = n => (n *= 2) < 1 ? .5 * y5(n) : .5 * (2 - Math.pow(2, -10 * (n - 1)))
  , g5 = n => 1 - Math.sin(Math.acos(n))
  , Fs = Ds(g5)
  , Ns = As(g5)
  , ku = On(.42, 0, 1, 1)
  , Mu = On(0, 0, .58, 1)
  , Is = On(.42, 0, .58, 1)
  , Su = n => Array.isArray(n) && typeof n[0] != "number"
  , bs = n => Array.isArray(n) && typeof n[0] == "number"
  , ju = {
    linear: je,
    easeIn: ku,
    easeInOut: Is,
    easeOut: Mu,
    circIn: g5,
    circInOut: Ns,
    circOut: Fs,
    backIn: y5,
    backInOut: Zs,
    backOut: Vs,
    anticipate: Os
}
  , Tu = n => typeof n == "string"
  , qi = n => {
    if (bs(n)) {
        h5(n.length === 4);
        const [r,s,l,u] = n;
        return On(r, s, l, u)
    } else if (Tu(n))
        return ju[n];
    return n
}
  , X4 = ["setup", "read", "resolveKeyframes", "preUpdate", "update", "preRender", "render", "postRender"];
function Eu(n, r) {
    let s = new Set
      , l = new Set
      , u = !1
      , d = !1;
    const f = new WeakSet;
    let h = {
        delta: 0,
        timestamp: 0,
        isProcessing: !1
    };
    function p(y) {
        f.has(y) && (g.schedule(y),
        n()),
        y(h)
    }
    const g = {
        schedule: (y, v=!1, w=!1) => {
            const A = w && u ? s : l;
            return v && f.add(y),
            A.has(y) || A.add(y),
            y
        }
        ,
        cancel: y => {
            l.delete(y),
            f.delete(y)
        }
        ,
        process: y => {
            if (h = y,
            u) {
                d = !0;
                return
            }
            u = !0,
            [s,l] = [l, s],
            s.forEach(p),
            s.clear(),
            u = !1,
            d && (d = !1,
            g.process(y))
        }
    };
    return g
}
const Pu = 40;
function zs(n, r) {
    let s = !1
      , l = !0;
    const u = {
        delta: 0,
        timestamp: 0,
        isProcessing: !1
    }
      , d = () => s = !0
      , f = X4.reduce( (N, X) => (N[X] = Eu(d),
    N), {})
      , {setup: h, read: p, resolveKeyframes: g, preUpdate: y, update: v, preRender: w, render: j, postRender: A} = f
      , P = () => {
        const N = et.useManualTiming ? u.timestamp : performance.now();
        s = !1,
        et.useManualTiming || (u.delta = l ? 1e3 / 60 : Math.max(Math.min(N - u.timestamp, Pu), 1)),
        u.timestamp = N,
        u.isProcessing = !0,
        h.process(u),
        p.process(u),
        g.process(u),
        y.process(u),
        v.process(u),
        w.process(u),
        j.process(u),
        A.process(u),
        u.isProcessing = !1,
        s && r && (l = !1,
        n(P))
    }
      , _ = () => {
        s = !0,
        l = !0,
        u.isProcessing || n(P)
    }
    ;
    return {
        schedule: X4.reduce( (N, X) => {
            const $ = f[X];
            return N[X] = (t1, s1=!1, e1=!1) => (s || _(),
            $.schedule(t1, s1, e1)),
            N
        }
        , {}),
        cancel: N => {
            for (let X = 0; X < X4.length; X++)
                f[X4[X]].cancel(N)
        }
        ,
        state: u,
        steps: f
    }
}
const {schedule: T1, cancel: kt, state: Y1, steps: y0} = zs(typeof requestAnimationFrame < "u" ? requestAnimationFrame : je, !0);
let r7;
function Lu() {
    r7 = void 0
}
const de = {
    now: () => (r7 === void 0 && de.set(Y1.isProcessing || et.useManualTiming ? Y1.timestamp : performance.now()),
    r7),
    set: n => {
        r7 = n,
        queueMicrotask(Lu)
    }
}
  , Bs = n => r => typeof r == "string" && r.startsWith(n)
  , v5 = Bs("--")
  , _u = Bs("var(--")
  , x5 = n => _u(n) ? Ru.test(n.split("/*")[0].trim()) : !1
  , Ru = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu
  , E3 = {
    test: n => typeof n == "number",
    parse: parseFloat,
    transform: n => n
}
  , _n = {
    ...E3,
    transform: n => Je(0, 1, n)
}
  , Y4 = {
    ...E3,
    default: 1
}
  , kn = n => Math.round(n * 1e5) / 1e5
  , w5 = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function Au(n) {
    return n == null
}
const Du = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu
  , k5 = (n, r) => s => !!(typeof s == "string" && Du.test(s) && s.startsWith(n) || r && !Au(s) && Object.prototype.hasOwnProperty.call(s, r))
  , Us = (n, r, s) => l => {
    if (typeof l != "string")
        return l;
    const [u,d,f,h] = l.match(w5);
    return {
        [n]: parseFloat(u),
        [r]: parseFloat(d),
        [s]: parseFloat(f),
        alpha: h !== void 0 ? parseFloat(h) : 1
    }
}
  , Vu = n => Je(0, 255, n)
  , g0 = {
    ...E3,
    transform: n => Math.round(Vu(n))
}
  , Bt = {
    test: k5("rgb", "red"),
    parse: Us("red", "green", "blue"),
    transform: ({red: n, green: r, blue: s, alpha: l=1}) => "rgba(" + g0.transform(n) + ", " + g0.transform(r) + ", " + g0.transform(s) + ", " + kn(_n.transform(l)) + ")"
};
function Zu(n) {
    let r = ""
      , s = ""
      , l = ""
      , u = "";
    return n.length > 5 ? (r = n.substring(1, 3),
    s = n.substring(3, 5),
    l = n.substring(5, 7),
    u = n.substring(7, 9)) : (r = n.substring(1, 2),
    s = n.substring(2, 3),
    l = n.substring(3, 4),
    u = n.substring(4, 5),
    r += r,
    s += s,
    l += l,
    u += u),
    {
        red: parseInt(r, 16),
        green: parseInt(s, 16),
        blue: parseInt(l, 16),
        alpha: u ? parseInt(u, 16) / 255 : 1
    }
}
const I0 = {
    test: k5("#"),
    parse: Zu,
    transform: Bt.transform
}
  , Fn = n => ({
    test: r => typeof r == "string" && r.endsWith(n) && r.split(" ").length === 1,
    parse: parseFloat,
    transform: r => `${r}${n}`
})
  , xt = Fn("deg")
  , Ue = Fn("%")
  , o1 = Fn("px")
  , Ou = Fn("vh")
  , Fu = Fn("vw")
  , Ji = {
    ...Ue,
    parse: n => Ue.parse(n) / 100,
    transform: n => Ue.transform(n * 100)
}
  , g3 = {
    test: k5("hsl", "hue"),
    parse: Us("hue", "saturation", "lightness"),
    transform: ({hue: n, saturation: r, lightness: s, alpha: l=1}) => "hsla(" + Math.round(n) + ", " + Ue.transform(kn(r)) + ", " + Ue.transform(kn(s)) + ", " + kn(_n.transform(l)) + ")"
}
  , I1 = {
    test: n => Bt.test(n) || I0.test(n) || g3.test(n),
    parse: n => Bt.test(n) ? Bt.parse(n) : g3.test(n) ? g3.parse(n) : I0.parse(n),
    transform: n => typeof n == "string" ? n : n.hasOwnProperty("red") ? Bt.transform(n) : g3.transform(n),
    getAnimatableNone: n => {
        const r = I1.parse(n);
        return r.alpha = 0,
        I1.transform(r)
    }
}
  , Nu = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Iu(n) {
    var r, s;
    return isNaN(n) && typeof n == "string" && (((r = n.match(w5)) == null ? void 0 : r.length) || 0) + (((s = n.match(Nu)) == null ? void 0 : s.length) || 0) > 0
}
const Hs = "number"
  , $s = "color"
  , bu = "var"
  , zu = "var("
  , e2 = "${}"
  , Bu = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Rn(n) {
    const r = n.toString()
      , s = []
      , l = {
        color: [],
        number: [],
        var: []
    }
      , u = [];
    let d = 0;
    const h = r.replace(Bu, p => (I1.test(p) ? (l.color.push(d),
    u.push($s),
    s.push(I1.parse(p))) : p.startsWith(zu) ? (l.var.push(d),
    u.push(bu),
    s.push(p)) : (l.number.push(d),
    u.push(Hs),
    s.push(parseFloat(p))),
    ++d,
    e2)).split(e2);
    return {
        values: s,
        split: h,
        indexes: l,
        types: u
    }
}
function Ws(n) {
    return Rn(n).values
}
function Ks(n) {
    const {split: r, types: s} = Rn(n)
      , l = r.length;
    return u => {
        let d = "";
        for (let f = 0; f < l; f++)
            if (d += r[f],
            u[f] !== void 0) {
                const h = s[f];
                h === Hs ? d += kn(u[f]) : h === $s ? d += I1.transform(u[f]) : d += u[f]
            }
        return d
    }
}
const Uu = n => typeof n == "number" ? 0 : I1.test(n) ? I1.getAnimatableNone(n) : n;
function Hu(n) {
    const r = Ws(n);
    return Ks(n)(r.map(Uu))
}
const Mt = {
    test: Iu,
    parse: Ws,
    createTransformer: Ks,
    getAnimatableNone: Hu
};
function v0(n, r, s) {
    return s < 0 && (s += 1),
    s > 1 && (s -= 1),
    s < 1 / 6 ? n + (r - n) * 6 * s : s < 1 / 2 ? r : s < 2 / 3 ? n + (r - n) * (2 / 3 - s) * 6 : n
}
function $u({hue: n, saturation: r, lightness: s, alpha: l}) {
    n /= 360,
    r /= 100,
    s /= 100;
    let u = 0
      , d = 0
      , f = 0;
    if (!r)
        u = d = f = s;
    else {
        const h = s < .5 ? s * (1 + r) : s + r - s * r
          , p = 2 * s - h;
        u = v0(p, h, n + 1 / 3),
        d = v0(p, h, n),
        f = v0(p, h, n - 1 / 3)
    }
    return {
        red: Math.round(u * 255),
        green: Math.round(d * 255),
        blue: Math.round(f * 255),
        alpha: l
    }
}
function a7(n, r) {
    return s => s > 0 ? r : n
}
const R1 = (n, r, s) => n + (r - n) * s
  , x0 = (n, r, s) => {
    const l = n * n
      , u = s * (r * r - l) + l;
    return u < 0 ? 0 : Math.sqrt(u)
}
  , Wu = [I0, Bt, g3]
  , Ku = n => Wu.find(r => r.test(n));
function t2(n) {
    const r = Ku(n);
    if (!r)
        return !1;
    let s = r.parse(n);
    return r === g3 && (s = $u(s)),
    s
}
const n2 = (n, r) => {
    const s = t2(n)
      , l = t2(r);
    if (!s || !l)
        return a7(n, r);
    const u = {
        ...s
    };
    return d => (u.red = x0(s.red, l.red, d),
    u.green = x0(s.green, l.green, d),
    u.blue = x0(s.blue, l.blue, d),
    u.alpha = R1(s.alpha, l.alpha, d),
    Bt.transform(u))
}
  , b0 = new Set(["none", "hidden"]);
function Gu(n, r) {
    return b0.has(n) ? s => s <= 0 ? n : r : s => s >= 1 ? r : n
}
function Xu(n, r) {
    return s => R1(n, r, s)
}
function M5(n) {
    return typeof n == "number" ? Xu : typeof n == "string" ? x5(n) ? a7 : I1.test(n) ? n2 : qu : Array.isArray(n) ? Gs : typeof n == "object" ? I1.test(n) ? n2 : Yu : a7
}
function Gs(n, r) {
    const s = [...n]
      , l = s.length
      , u = n.map( (d, f) => M5(d)(d, r[f]));
    return d => {
        for (let f = 0; f < l; f++)
            s[f] = u[f](d);
        return s
    }
}
function Yu(n, r) {
    const s = {
        ...n,
        ...r
    }
      , l = {};
    for (const u in s)
        n[u] !== void 0 && r[u] !== void 0 && (l[u] = M5(n[u])(n[u], r[u]));
    return u => {
        for (const d in l)
            s[d] = l[d](u);
        return s
    }
}
function Qu(n, r) {
    const s = []
      , l = {
        color: 0,
        var: 0,
        number: 0
    };
    for (let u = 0; u < r.values.length; u++) {
        const d = r.types[u]
          , f = n.indexes[d][l[d]]
          , h = n.values[f] ?? 0;
        s[u] = h,
        l[d]++
    }
    return s
}
const qu = (n, r) => {
    const s = Mt.createTransformer(r)
      , l = Rn(n)
      , u = Rn(r);
    return l.indexes.var.length === u.indexes.var.length && l.indexes.color.length === u.indexes.color.length && l.indexes.number.length >= u.indexes.number.length ? b0.has(n) && !u.values.length || b0.has(r) && !l.values.length ? Gu(n, r) : Zn(Gs(Qu(l, u), u.values), s) : a7(n, r)
}
;
function Xs(n, r, s) {
    return typeof n == "number" && typeof r == "number" && typeof s == "number" ? R1(n, r, s) : M5(n)(n, r)
}
const Ju = n => {
    const r = ({timestamp: s}) => n(s);
    return {
        start: (s=!0) => T1.update(r, s),
        stop: () => kt(r),
        now: () => Y1.isProcessing ? Y1.timestamp : de.now()
    }
}
  , Ys = (n, r, s=10) => {
    let l = "";
    const u = Math.max(Math.round(r / s), 2);
    for (let d = 0; d < u; d++)
        l += Math.round(n(d / (u - 1)) * 1e4) / 1e4 + ", ";
    return `linear(${l.substring(0, l.length - 2)})`
}
  , u7 = 2e4;
function S5(n) {
    let r = 0;
    const s = 50;
    let l = n.next(r);
    for (; !l.done && r < u7; )
        r += s,
        l = n.next(r);
    return r >= u7 ? 1 / 0 : r
}
function ec(n, r=100, s) {
    const l = s({
        ...n,
        keyframes: [0, r]
    })
      , u = Math.min(S5(l), u7);
    return {
        type: "keyframes",
        ease: d => l.next(u * d).value / r,
        duration: Be(u)
    }
}
const tc = 5;
function Qs(n, r, s) {
    const l = Math.max(r - tc, 0);
    return _s(s - n(l), r - l)
}
const D1 = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: .3,
    visualDuration: .3,
    restSpeed: {
        granular: .01,
        default: 2
    },
    restDelta: {
        granular: .005,
        default: .5
    },
    minDuration: .01,
    maxDuration: 10,
    minDamping: .05,
    maxDamping: 1
}
  , w0 = .001;
function nc({duration: n=D1.duration, bounce: r=D1.bounce, velocity: s=D1.velocity, mass: l=D1.mass}) {
    let u, d, f = 1 - r;
    f = Je(D1.minDamping, D1.maxDamping, f),
    n = Je(D1.minDuration, D1.maxDuration, Be(n)),
    f < 1 ? (u = g => {
        const y = g * f
          , v = y * n
          , w = y - s
          , j = z0(g, f)
          , A = Math.exp(-v);
        return w0 - w / j * A
    }
    ,
    d = g => {
        const v = g * f * n
          , w = v * s + s
          , j = Math.pow(f, 2) * Math.pow(g, 2) * n
          , A = Math.exp(-v)
          , P = z0(Math.pow(g, 2), f);
        return (-u(g) + w0 > 0 ? -1 : 1) * ((w - j) * A) / P
    }
    ) : (u = g => {
        const y = Math.exp(-g * n)
          , v = (g - s) * n + 1;
        return -w0 + y * v
    }
    ,
    d = g => {
        const y = Math.exp(-g * n)
          , v = (s - g) * (n * n);
        return y * v
    }
    );
    const h = 5 / n
      , p = ic(u, d, h);
    if (n = ze(n),
    isNaN(p))
        return {
            stiffness: D1.stiffness,
            damping: D1.damping,
            duration: n
        };
    {
        const g = Math.pow(p, 2) * l;
        return {
            stiffness: g,
            damping: f * 2 * Math.sqrt(l * g),
            duration: n
        }
    }
}
const rc = 12;
function ic(n, r, s) {
    let l = s;
    for (let u = 1; u < rc; u++)
        l = l - n(l) / r(l);
    return l
}
function z0(n, r) {
    return n * Math.sqrt(1 - r * r)
}
const sc = ["duration", "bounce"]
  , oc = ["stiffness", "damping", "mass"];
function r2(n, r) {
    return r.some(s => n[s] !== void 0)
}
function lc(n) {
    let r = {
        velocity: D1.velocity,
        stiffness: D1.stiffness,
        damping: D1.damping,
        mass: D1.mass,
        isResolvedFromDuration: !1,
        ...n
    };
    if (!r2(n, oc) && r2(n, sc))
        if (n.visualDuration) {
            const s = n.visualDuration
              , l = 2 * Math.PI / (s * 1.2)
              , u = l * l
              , d = 2 * Je(.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(u);
            r = {
                ...r,
                mass: D1.mass,
                stiffness: u,
                damping: d
            }
        } else {
            const s = nc(n);
            r = {
                ...r,
                ...s,
                mass: D1.mass
            },
            r.isResolvedFromDuration = !0
        }
    return r
}
function c7(n=D1.visualDuration, r=D1.bounce) {
    const s = typeof n != "object" ? {
        visualDuration: n,
        keyframes: [0, 1],
        bounce: r
    } : n;
    let {restSpeed: l, restDelta: u} = s;
    const d = s.keyframes[0]
      , f = s.keyframes[s.keyframes.length - 1]
      , h = {
        done: !1,
        value: d
    }
      , {stiffness: p, damping: g, mass: y, duration: v, velocity: w, isResolvedFromDuration: j} = lc({
        ...s,
        velocity: -Be(s.velocity || 0)
    })
      , A = w || 0
      , P = g / (2 * Math.sqrt(p * y))
      , _ = f - d
      , D = Be(Math.sqrt(p / y))
      , V = Math.abs(_) < 5;
    l || (l = V ? D1.restSpeed.granular : D1.restSpeed.default),
    u || (u = V ? D1.restDelta.granular : D1.restDelta.default);
    let N;
    if (P < 1) {
        const $ = z0(D, P);
        N = t1 => {
            const s1 = Math.exp(-P * D * t1);
            return f - s1 * ((A + P * D * _) / $ * Math.sin($ * t1) + _ * Math.cos($ * t1))
        }
    } else if (P === 1)
        N = $ => f - Math.exp(-D * $) * (_ + (A + D * _) * $);
    else {
        const $ = D * Math.sqrt(P * P - 1);
        N = t1 => {
            const s1 = Math.exp(-P * D * t1)
              , e1 = Math.min($ * t1, 300);
            return f - s1 * ((A + P * D * _) * Math.sinh(e1) + $ * _ * Math.cosh(e1)) / $
        }
    }
    const X = {
        calculatedDuration: j && v || null,
        next: $ => {
            const t1 = N($);
            if (j)
                h.done = $ >= v;
            else {
                let s1 = $ === 0 ? A : 0;
                P < 1 && (s1 = $ === 0 ? ze(A) : Qs(N, $, t1));
                const e1 = Math.abs(s1) <= l
                  , y1 = Math.abs(f - t1) <= u;
                h.done = e1 && y1
            }
            return h.value = h.done ? f : t1,
            h
        }
        ,
        toString: () => {
            const $ = Math.min(S5(X), u7)
              , t1 = Ys(s1 => X.next($ * s1).value, $, 30);
            return $ + "ms " + t1
        }
        ,
        toTransition: () => {}
    };
    return X
}
c7.applyToOptions = n => {
    const r = ec(n, 100, c7);
    return n.ease = r.ease,
    n.duration = ze(r.duration),
    n.type = "keyframes",
    n
}
;
function B0({keyframes: n, velocity: r=0, power: s=.8, timeConstant: l=325, bounceDamping: u=10, bounceStiffness: d=500, modifyTarget: f, min: h, max: p, restDelta: g=.5, restSpeed: y}) {
    const v = n[0]
      , w = {
        done: !1,
        value: v
    }
      , j = e1 => h !== void 0 && e1 < h || p !== void 0 && e1 > p
      , A = e1 => h === void 0 ? p : p === void 0 || Math.abs(h - e1) < Math.abs(p - e1) ? h : p;
    let P = s * r;
    const _ = v + P
      , D = f === void 0 ? _ : f(_);
    D !== _ && (P = D - v);
    const V = e1 => -P * Math.exp(-e1 / l)
      , N = e1 => D + V(e1)
      , X = e1 => {
        const y1 = V(e1)
          , w1 = N(e1);
        w.done = Math.abs(y1) <= g,
        w.value = w.done ? D : w1
    }
    ;
    let $, t1;
    const s1 = e1 => {
        j(w.value) && ($ = e1,
        t1 = c7({
            keyframes: [w.value, A(w.value)],
            velocity: Qs(N, e1, w.value),
            damping: u,
            stiffness: d,
            restDelta: g,
            restSpeed: y
        }))
    }
    ;
    return s1(0),
    {
        calculatedDuration: null,
        next: e1 => {
            let y1 = !1;
            return !t1 && $ === void 0 && (y1 = !0,
            X(e1),
            s1(e1)),
            $ !== void 0 && e1 >= $ ? t1.next(e1 - $) : (!y1 && X(e1),
            w)
        }
    }
}
function ac(n, r, s) {
    const l = []
      , u = s || et.mix || Xs
      , d = n.length - 1;
    for (let f = 0; f < d; f++) {
        let h = u(n[f], n[f + 1]);
        if (r) {
            const p = Array.isArray(r) ? r[f] || je : r;
            h = Zn(p, h)
        }
        l.push(h)
    }
    return l
}
function uc(n, r, {clamp: s=!0, ease: l, mixer: u}={}) {
    const d = n.length;
    if (h5(d === r.length),
    d === 1)
        return () => r[0];
    if (d === 2 && r[0] === r[1])
        return () => r[1];
    const f = n[0] === n[1];
    n[0] > n[d - 1] && (n = [...n].reverse(),
    r = [...r].reverse());
    const h = ac(r, l, u)
      , p = h.length
      , g = y => {
        if (f && y < n[0])
            return r[0];
        let v = 0;
        if (p > 1)
            for (; v < n.length - 2 && !(y < n[v + 1]); v++)
                ;
        const w = Ln(n[v], n[v + 1], y);
        return h[v](w)
    }
    ;
    return s ? y => g(Je(n[0], n[d - 1], y)) : g
}
function cc(n, r) {
    const s = n[n.length - 1];
    for (let l = 1; l <= r; l++) {
        const u = Ln(0, r, l);
        n.push(R1(s, 1, u))
    }
}
function fc(n) {
    const r = [0];
    return cc(r, n.length - 1),
    r
}
function dc(n, r) {
    return n.map(s => s * r)
}
function Cc(n, r) {
    return n.map( () => r || Is).splice(0, n.length - 1)
}
function Mn({duration: n=300, keyframes: r, times: s, ease: l="easeInOut"}) {
    const u = Su(l) ? l.map(qi) : qi(l)
      , d = {
        done: !1,
        value: r[0]
    }
      , f = dc(s && s.length === r.length ? s : fc(r), n)
      , h = uc(f, r, {
        ease: Array.isArray(u) ? u : Cc(r, u)
    });
    return {
        calculatedDuration: n,
        next: p => (d.value = h(p),
        d.done = p >= n,
        d)
    }
}
const hc = n => n !== null;
function j5(n, {repeat: r, repeatType: s="loop"}, l, u=1) {
    const d = n.filter(hc)
      , h = u < 0 || r && s !== "loop" && r % 2 === 1 ? 0 : d.length - 1;
    return !h || l === void 0 ? d[h] : l
}
const pc = {
    decay: B0,
    inertia: B0,
    tween: Mn,
    keyframes: Mn,
    spring: c7
};
function qs(n) {
    typeof n.type == "string" && (n.type = pc[n.type])
}
class T5 {
    constructor() {
        this.updateFinished()
    }
    get finished() {
        return this._finished
    }
    updateFinished() {
        this._finished = new Promise(r => {
            this.resolve = r
        }
        )
    }
    notifyFinished() {
        this.resolve()
    }
    then(r, s) {
        return this.finished.then(r, s)
    }
}
const mc = n => n / 100;
class E5 extends T5 {
    constructor(r) {
        super(),
        this.state = "idle",
        this.startTime = null,
        this.isStopped = !1,
        this.currentTime = 0,
        this.holdTime = null,
        this.playbackSpeed = 1,
        this.stop = () => {
            var l, u;
            const {motionValue: s} = this.options;
            s && s.updatedAt !== de.now() && this.tick(de.now()),
            this.isStopped = !0,
            this.state !== "idle" && (this.teardown(),
            (u = (l = this.options).onStop) == null || u.call(l))
        }
        ,
        this.options = r,
        this.initAnimation(),
        this.play(),
        r.autoplay === !1 && this.pause()
    }
    initAnimation() {
        const {options: r} = this;
        qs(r);
        const {type: s=Mn, repeat: l=0, repeatDelay: u=0, repeatType: d, velocity: f=0} = r;
        let {keyframes: h} = r;
        const p = s || Mn;
        p !== Mn && typeof h[0] != "number" && (this.mixKeyframes = Zn(mc, Xs(h[0], h[1])),
        h = [0, 100]);
        const g = p({
            ...r,
            keyframes: h
        });
        d === "mirror" && (this.mirroredGenerator = p({
            ...r,
            keyframes: [...h].reverse(),
            velocity: -f
        })),
        g.calculatedDuration === null && (g.calculatedDuration = S5(g));
        const {calculatedDuration: y} = g;
        this.calculatedDuration = y,
        this.resolvedDuration = y + u,
        this.totalDuration = this.resolvedDuration * (l + 1) - u,
        this.generator = g
    }
    updateTime(r) {
        const s = Math.round(r - this.startTime) * this.playbackSpeed;
        this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = s
    }
    tick(r, s=!1) {
        const {generator: l, totalDuration: u, mixKeyframes: d, mirroredGenerator: f, resolvedDuration: h, calculatedDuration: p} = this;
        if (this.startTime === null)
            return l.next(0);
        const {delay: g=0, keyframes: y, repeat: v, repeatType: w, repeatDelay: j, type: A, onUpdate: P, finalKeyframe: _} = this.options;
        this.speed > 0 ? this.startTime = Math.min(this.startTime, r) : this.speed < 0 && (this.startTime = Math.min(r - u / this.speed, this.startTime)),
        s ? this.currentTime = r : this.updateTime(r);
        const D = this.currentTime - g * (this.playbackSpeed >= 0 ? 1 : -1)
          , V = this.playbackSpeed >= 0 ? D < 0 : D > u;
        this.currentTime = Math.max(D, 0),
        this.state === "finished" && this.holdTime === null && (this.currentTime = u);
        let N = this.currentTime
          , X = l;
        if (v) {
            const e1 = Math.min(this.currentTime, u) / h;
            let y1 = Math.floor(e1)
              , w1 = e1 % 1;
            !w1 && e1 >= 1 && (w1 = 1),
            w1 === 1 && y1--,
            y1 = Math.min(y1, v + 1),
            !!(y1 % 2) && (w === "reverse" ? (w1 = 1 - w1,
            j && (w1 -= j / h)) : w === "mirror" && (X = f)),
            N = Je(0, 1, w1) * h
        }
        const $ = V ? {
            done: !1,
            value: y[0]
        } : X.next(N);
        d && ($.value = d($.value));
        let {done: t1} = $;
        !V && p !== null && (t1 = this.playbackSpeed >= 0 ? this.currentTime >= u : this.currentTime <= 0);
        const s1 = this.holdTime === null && (this.state === "finished" || this.state === "running" && t1);
        return s1 && A !== B0 && ($.value = j5(y, this.options, _, this.speed)),
        P && P($.value),
        s1 && this.finish(),
        $
    }
    then(r, s) {
        return this.finished.then(r, s)
    }
    get duration() {
        return Be(this.calculatedDuration)
    }
    get time() {
        return Be(this.currentTime)
    }
    set time(r) {
        var s;
        r = ze(r),
        this.currentTime = r,
        this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = r : this.driver && (this.startTime = this.driver.now() - r / this.playbackSpeed),
        (s = this.driver) == null || s.start(!1)
    }
    get speed() {
        return this.playbackSpeed
    }
    set speed(r) {
        this.updateTime(de.now());
        const s = this.playbackSpeed !== r;
        this.playbackSpeed = r,
        s && (this.time = Be(this.currentTime))
    }
    play() {
        var u, d;
        if (this.isStopped)
            return;
        const {driver: r=Ju, startTime: s} = this.options;
        this.driver || (this.driver = r(f => this.tick(f))),
        (d = (u = this.options).onPlay) == null || d.call(u);
        const l = this.driver.now();
        this.state === "finished" ? (this.updateFinished(),
        this.startTime = l) : this.holdTime !== null ? this.startTime = l - this.holdTime : this.startTime || (this.startTime = s ?? l),
        this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration),
        this.holdTime = null,
        this.state = "running",
        this.driver.start()
    }
    pause() {
        this.state = "paused",
        this.updateTime(de.now()),
        this.holdTime = this.currentTime
    }
    complete() {
        this.state !== "running" && this.play(),
        this.state = "finished",
        this.holdTime = null
    }
    finish() {
        var r, s;
        this.notifyFinished(),
        this.teardown(),
        this.state = "finished",
        (s = (r = this.options).onComplete) == null || s.call(r)
    }
    cancel() {
        var r, s;
        this.holdTime = null,
        this.startTime = 0,
        this.tick(0),
        this.teardown(),
        (s = (r = this.options).onCancel) == null || s.call(r)
    }
    teardown() {
        this.state = "idle",
        this.stopDriver(),
        this.startTime = this.holdTime = null
    }
    stopDriver() {
        this.driver && (this.driver.stop(),
        this.driver = void 0)
    }
    sample(r) {
        return this.startTime = 0,
        this.tick(r, !0)
    }
    attachTimeline(r) {
        var s;
        return this.options.allowFlatten && (this.options.type = "keyframes",
        this.options.ease = "linear",
        this.initAnimation()),
        (s = this.driver) == null || s.stop(),
        r.observe(this)
    }
}
function yc(n) {
    for (let r = 1; r < n.length; r++)
        n[r] ?? (n[r] = n[r - 1])
}
const Ut = n => n * 180 / Math.PI
  , U0 = n => {
    const r = Ut(Math.atan2(n[1], n[0]));
    return H0(r)
}
  , gc = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: n => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
    rotate: U0,
    rotateZ: U0,
    skewX: n => Ut(Math.atan(n[1])),
    skewY: n => Ut(Math.atan(n[2])),
    skew: n => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}
  , H0 = n => (n = n % 360,
n < 0 && (n += 360),
n)
  , i2 = U0
  , s2 = n => Math.sqrt(n[0] * n[0] + n[1] * n[1])
  , o2 = n => Math.sqrt(n[4] * n[4] + n[5] * n[5])
  , vc = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: s2,
    scaleY: o2,
    scale: n => (s2(n) + o2(n)) / 2,
    rotateX: n => H0(Ut(Math.atan2(n[6], n[5]))),
    rotateY: n => H0(Ut(Math.atan2(-n[2], n[0]))),
    rotateZ: i2,
    rotate: i2,
    skewX: n => Ut(Math.atan(n[4])),
    skewY: n => Ut(Math.atan(n[1])),
    skew: n => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function $0(n) {
    return n.includes("scale") ? 1 : 0
}
function W0(n, r) {
    if (!n || n === "none")
        return $0(r);
    const s = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let l, u;
    if (s)
        l = vc,
        u = s;
    else {
        const h = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        l = gc,
        u = h
    }
    if (!u)
        return $0(r);
    const d = l[r]
      , f = u[1].split(",").map(wc);
    return typeof d == "function" ? d(f) : f[d]
}
const xc = (n, r) => {
    const {transform: s="none"} = getComputedStyle(n);
    return W0(s, r)
}
;
function wc(n) {
    return parseFloat(n.trim())
}
const P3 = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"]
  , L3 = new Set(P3)
  , l2 = n => n === E3 || n === o1
  , kc = new Set(["x", "y", "z"])
  , Mc = P3.filter(n => !kc.has(n));
function Sc(n) {
    const r = [];
    return Mc.forEach(s => {
        const l = n.getValue(s);
        l !== void 0 && (r.push([s, l.get()]),
        l.set(s.startsWith("scale") ? 1 : 0))
    }
    ),
    r
}
const Ht = {
    width: ({x: n}, {paddingLeft: r="0", paddingRight: s="0"}) => n.max - n.min - parseFloat(r) - parseFloat(s),
    height: ({y: n}, {paddingTop: r="0", paddingBottom: s="0"}) => n.max - n.min - parseFloat(r) - parseFloat(s),
    top: (n, {top: r}) => parseFloat(r),
    left: (n, {left: r}) => parseFloat(r),
    bottom: ({y: n}, {top: r}) => parseFloat(r) + (n.max - n.min),
    right: ({x: n}, {left: r}) => parseFloat(r) + (n.max - n.min),
    x: (n, {transform: r}) => W0(r, "x"),
    y: (n, {transform: r}) => W0(r, "y")
};
Ht.translateX = Ht.x;
Ht.translateY = Ht.y;
const $t = new Set;
let K0 = !1
  , G0 = !1
  , X0 = !1;
function Js() {
    if (G0) {
        const n = Array.from($t).filter(l => l.needsMeasurement)
          , r = new Set(n.map(l => l.element))
          , s = new Map;
        r.forEach(l => {
            const u = Sc(l);
            u.length && (s.set(l, u),
            l.render())
        }
        ),
        n.forEach(l => l.measureInitialState()),
        r.forEach(l => {
            l.render();
            const u = s.get(l);
            u && u.forEach( ([d,f]) => {
                var h;
                (h = l.getValue(d)) == null || h.set(f)
            }
            )
        }
        ),
        n.forEach(l => l.measureEndState()),
        n.forEach(l => {
            l.suspendedScrollY !== void 0 && window.scrollTo(0, l.suspendedScrollY)
        }
        )
    }
    G0 = !1,
    K0 = !1,
    $t.forEach(n => n.complete(X0)),
    $t.clear()
}
function e9() {
    $t.forEach(n => {
        n.readKeyframes(),
        n.needsMeasurement && (G0 = !0)
    }
    )
}
function jc() {
    X0 = !0,
    e9(),
    Js(),
    X0 = !1
}
class P5 {
    constructor(r, s, l, u, d, f=!1) {
        this.state = "pending",
        this.isAsync = !1,
        this.needsMeasurement = !1,
        this.unresolvedKeyframes = [...r],
        this.onComplete = s,
        this.name = l,
        this.motionValue = u,
        this.element = d,
        this.isAsync = f
    }
    scheduleResolve() {
        this.state = "scheduled",
        this.isAsync ? ($t.add(this),
        K0 || (K0 = !0,
        T1.read(e9),
        T1.resolveKeyframes(Js))) : (this.readKeyframes(),
        this.complete())
    }
    readKeyframes() {
        const {unresolvedKeyframes: r, name: s, element: l, motionValue: u} = this;
        if (r[0] === null) {
            const d = u == null ? void 0 : u.get()
              , f = r[r.length - 1];
            if (d !== void 0)
                r[0] = d;
            else if (l && s) {
                const h = l.readValue(s, f);
                h != null && (r[0] = h)
            }
            r[0] === void 0 && (r[0] = f),
            u && d === void 0 && u.set(r[0])
        }
        yc(r)
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete(r=!1) {
        this.state = "complete",
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, r),
        $t.delete(this)
    }
    cancel() {
        this.state === "scheduled" && ($t.delete(this),
        this.state = "pending")
    }
    resume() {
        this.state === "pending" && this.scheduleResolve()
    }
}
const Tc = n => n.startsWith("--");
function Ec(n, r, s) {
    Tc(r) ? n.style.setProperty(r, s) : n.style[r] = s
}
const Pc = p5( () => window.ScrollTimeline !== void 0)
  , Lc = {};
function _c(n, r) {
    const s = p5(n);
    return () => Lc[r] ?? s()
}
const t9 = _c( () => {
    try {
        document.createElement("div").animate({
            opacity: 0
        }, {
            easing: "linear(0, 1)"
        })
    } catch {
        return !1
    }
    return !0
}
, "linearEasing")
  , wn = ([n,r,s,l]) => `cubic-bezier(${n}, ${r}, ${s}, ${l})`
  , a2 = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: wn([0, .65, .55, 1]),
    circOut: wn([.55, 0, 1, .45]),
    backIn: wn([.31, .01, .66, -.59]),
    backOut: wn([.33, 1.53, .69, .99])
};
function n9(n, r) {
    if (n)
        return typeof n == "function" ? t9() ? Ys(n, r) : "ease-out" : bs(n) ? wn(n) : Array.isArray(n) ? n.map(s => n9(s, r) || a2.easeOut) : a2[n]
}
function Rc(n, r, s, {delay: l=0, duration: u=300, repeat: d=0, repeatType: f="loop", ease: h="easeOut", times: p}={}, g=void 0) {
    const y = {
        [r]: s
    };
    p && (y.offset = p);
    const v = n9(h, u);
    Array.isArray(v) && (y.easing = v);
    const w = {
        delay: l,
        duration: u,
        easing: Array.isArray(v) ? "linear" : v,
        fill: "both",
        iterations: d + 1,
        direction: f === "reverse" ? "alternate" : "normal"
    };
    return g && (w.pseudoElement = g),
    n.animate(y, w)
}
function r9(n) {
    return typeof n == "function" && "applyToOptions"in n
}
function Ac({type: n, ...r}) {
    return r9(n) && t9() ? n.applyToOptions(r) : (r.duration ?? (r.duration = 300),
    r.ease ?? (r.ease = "easeOut"),
    r)
}
class Dc extends T5 {
    constructor(r) {
        if (super(),
        this.finishedTime = null,
        this.isStopped = !1,
        !r)
            return;
        const {element: s, name: l, keyframes: u, pseudoElement: d, allowFlatten: f=!1, finalKeyframe: h, onComplete: p} = r;
        this.isPseudoElement = !!d,
        this.allowFlatten = f,
        this.options = r,
        h5(typeof r.type != "string");
        const g = Ac(r);
        this.animation = Rc(s, l, u, g, d),
        g.autoplay === !1 && this.animation.pause(),
        this.animation.onfinish = () => {
            if (this.finishedTime = this.time,
            !d) {
                const y = j5(u, this.options, h, this.speed);
                this.updateMotionValue ? this.updateMotionValue(y) : Ec(s, l, y),
                this.animation.cancel()
            }
            p == null || p(),
            this.notifyFinished()
        }
    }
    play() {
        this.isStopped || (this.animation.play(),
        this.state === "finished" && this.updateFinished())
    }
    pause() {
        this.animation.pause()
    }
    complete() {
        var r, s;
        (s = (r = this.animation).finish) == null || s.call(r)
    }
    cancel() {
        try {
            this.animation.cancel()
        } catch {}
    }
    stop() {
        if (this.isStopped)
            return;
        this.isStopped = !0;
        const {state: r} = this;
        r === "idle" || r === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(),
        this.isPseudoElement || this.cancel())
    }
    commitStyles() {
        var r, s;
        this.isPseudoElement || (s = (r = this.animation).commitStyles) == null || s.call(r)
    }
    get duration() {
        var s, l;
        const r = ((l = (s = this.animation.effect) == null ? void 0 : s.getComputedTiming) == null ? void 0 : l.call(s).duration) || 0;
        return Be(Number(r))
    }
    get time() {
        return Be(Number(this.animation.currentTime) || 0)
    }
    set time(r) {
        this.finishedTime = null,
        this.animation.currentTime = ze(r)
    }
    get speed() {
        return this.animation.playbackRate
    }
    set speed(r) {
        r < 0 && (this.finishedTime = null),
        this.animation.playbackRate = r
    }
    get state() {
        return this.finishedTime !== null ? "finished" : this.animation.playState
    }
    get startTime() {
        return Number(this.animation.startTime)
    }
    set startTime(r) {
        this.animation.startTime = r
    }
    attachTimeline({timeline: r, observe: s}) {
        var l;
        return this.allowFlatten && ((l = this.animation.effect) == null || l.updateTiming({
            easing: "linear"
        })),
        this.animation.onfinish = null,
        r && Pc() ? (this.animation.timeline = r,
        je) : s(this)
    }
}
const i9 = {
    anticipate: Os,
    backInOut: Zs,
    circInOut: Ns
};
function Vc(n) {
    return n in i9
}
function Zc(n) {
    typeof n.ease == "string" && Vc(n.ease) && (n.ease = i9[n.ease])
}
const u2 = 10;
class Oc extends Dc {
    constructor(r) {
        Zc(r),
        qs(r),
        super(r),
        r.startTime && (this.startTime = r.startTime),
        this.options = r
    }
    updateMotionValue(r) {
        const {motionValue: s, onUpdate: l, onComplete: u, element: d, ...f} = this.options;
        if (!s)
            return;
        if (r !== void 0) {
            s.set(r);
            return
        }
        const h = new E5({
            ...f,
            autoplay: !1
        })
          , p = ze(this.finishedTime ?? this.time);
        s.setWithVelocity(h.sample(p - u2).value, h.sample(p).value, u2),
        h.stop()
    }
}
const c2 = (n, r) => r === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && (Mt.test(n) || n === "0") && !n.startsWith("url("));
function Fc(n) {
    const r = n[0];
    if (n.length === 1)
        return !0;
    for (let s = 0; s < n.length; s++)
        if (n[s] !== r)
            return !0
}
function Nc(n, r, s, l) {
    const u = n[0];
    if (u === null)
        return !1;
    if (r === "display" || r === "visibility")
        return !0;
    const d = n[n.length - 1]
      , f = c2(u, r)
      , h = c2(d, r);
    return !f || !h ? !1 : Fc(n) || (s === "spring" || r9(s)) && l
}
function Y0(n) {
    n.duration = 0,
    n.type
}
const Ic = new Set(["opacity", "clipPath", "filter", "transform"])
  , bc = p5( () => Object.hasOwnProperty.call(Element.prototype, "animate"));
function zc(n) {
    var y;
    const {motionValue: r, name: s, repeatDelay: l, repeatType: u, damping: d, type: f} = n;
    if (!(((y = r == null ? void 0 : r.owner) == null ? void 0 : y.current)instanceof HTMLElement))
        return !1;
    const {onUpdate: p, transformTemplate: g} = r.owner.getProps();
    return bc() && s && Ic.has(s) && (s !== "transform" || !g) && !p && !l && u !== "mirror" && d !== 0 && f !== "inertia"
}
const Bc = 40;
class Uc extends T5 {
    constructor({autoplay: r=!0, delay: s=0, type: l="keyframes", repeat: u=0, repeatDelay: d=0, repeatType: f="loop", keyframes: h, name: p, motionValue: g, element: y, ...v}) {
        var A;
        super(),
        this.stop = () => {
            var P, _;
            this._animation && (this._animation.stop(),
            (P = this.stopTimeline) == null || P.call(this)),
            (_ = this.keyframeResolver) == null || _.cancel()
        }
        ,
        this.createdAt = de.now();
        const w = {
            autoplay: r,
            delay: s,
            type: l,
            repeat: u,
            repeatDelay: d,
            repeatType: f,
            name: p,
            motionValue: g,
            element: y,
            ...v
        }
          , j = (y == null ? void 0 : y.KeyframeResolver) || P5;
        this.keyframeResolver = new j(h, (P, _, D) => this.onKeyframesResolved(P, _, w, !D),p,g,y),
        (A = this.keyframeResolver) == null || A.scheduleResolve()
    }
    onKeyframesResolved(r, s, l, u) {
        this.keyframeResolver = void 0;
        const {name: d, type: f, velocity: h, delay: p, isHandoff: g, onUpdate: y} = l;
        this.resolvedAt = de.now(),
        Nc(r, d, f, h) || ((et.instantAnimations || !p) && (y == null || y(j5(r, l, s))),
        r[0] = r[r.length - 1],
        Y0(l),
        l.repeat = 0);
        const w = {
            startTime: u ? this.resolvedAt ? this.resolvedAt - this.createdAt > Bc ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
            finalKeyframe: s,
            ...l,
            keyframes: r
        }
          , j = !g && zc(w) ? new Oc({
            ...w,
            element: w.motionValue.owner.current
        }) : new E5(w);
        j.finished.then( () => this.notifyFinished()).catch(je),
        this.pendingTimeline && (this.stopTimeline = j.attachTimeline(this.pendingTimeline),
        this.pendingTimeline = void 0),
        this._animation = j
    }
    get finished() {
        return this._animation ? this.animation.finished : this._finished
    }
    then(r, s) {
        return this.finished.finally(r).then( () => {}
        )
    }
    get animation() {
        var r;
        return this._animation || ((r = this.keyframeResolver) == null || r.resume(),
        jc()),
        this._animation
    }
    get duration() {
        return this.animation.duration
    }
    get time() {
        return this.animation.time
    }
    set time(r) {
        this.animation.time = r
    }
    get speed() {
        return this.animation.speed
    }
    get state() {
        return this.animation.state
    }
    set speed(r) {
        this.animation.speed = r
    }
    get startTime() {
        return this.animation.startTime
    }
    attachTimeline(r) {
        return this._animation ? this.stopTimeline = this.animation.attachTimeline(r) : this.pendingTimeline = r,
        () => this.stop()
    }
    play() {
        this.animation.play()
    }
    pause() {
        this.animation.pause()
    }
    complete() {
        this.animation.complete()
    }
    cancel() {
        var r;
        this._animation && this.animation.cancel(),
        (r = this.keyframeResolver) == null || r.cancel()
    }
}
const Hc = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function $c(n) {
    const r = Hc.exec(n);
    if (!r)
        return [, ];
    const [,s,l,u] = r;
    return [`--${s ?? l}`, u]
}
function s9(n, r, s=1) {
    const [l,u] = $c(n);
    if (!l)
        return;
    const d = window.getComputedStyle(r).getPropertyValue(l);
    if (d) {
        const f = d.trim();
        return Es(f) ? parseFloat(f) : f
    }
    return x5(u) ? s9(u, r, s + 1) : u
}
function L5(n, r) {
    return (n == null ? void 0 : n[r]) ?? (n == null ? void 0 : n.default) ?? n
}
const o9 = new Set(["width", "height", "top", "left", "right", "bottom", ...P3])
  , Wc = {
    test: n => n === "auto",
    parse: n => n
}
  , l9 = n => r => r.test(n)
  , a9 = [E3, o1, Ue, xt, Fu, Ou, Wc]
  , f2 = n => a9.find(l9(n));
function Kc(n) {
    return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || Ls(n) : !0
}
const Gc = new Set(["brightness", "contrast", "saturate", "opacity"]);
function Xc(n) {
    const [r,s] = n.slice(0, -1).split("(");
    if (r === "drop-shadow")
        return n;
    const [l] = s.match(w5) || [];
    if (!l)
        return n;
    const u = s.replace(l, "");
    let d = Gc.has(r) ? 1 : 0;
    return l !== s && (d *= 100),
    r + "(" + d + u + ")"
}
const Yc = /\b([a-z-]*)\(.*?\)/gu
  , Q0 = {
    ...Mt,
    getAnimatableNone: n => {
        const r = n.match(Yc);
        return r ? r.map(Xc).join(" ") : n
    }
}
  , d2 = {
    ...E3,
    transform: Math.round
}
  , Qc = {
    rotate: xt,
    rotateX: xt,
    rotateY: xt,
    rotateZ: xt,
    scale: Y4,
    scaleX: Y4,
    scaleY: Y4,
    scaleZ: Y4,
    skew: xt,
    skewX: xt,
    skewY: xt,
    distance: o1,
    translateX: o1,
    translateY: o1,
    translateZ: o1,
    x: o1,
    y: o1,
    z: o1,
    perspective: o1,
    transformPerspective: o1,
    opacity: _n,
    originX: Ji,
    originY: Ji,
    originZ: o1
}
  , _5 = {
    borderWidth: o1,
    borderTopWidth: o1,
    borderRightWidth: o1,
    borderBottomWidth: o1,
    borderLeftWidth: o1,
    borderRadius: o1,
    radius: o1,
    borderTopLeftRadius: o1,
    borderTopRightRadius: o1,
    borderBottomRightRadius: o1,
    borderBottomLeftRadius: o1,
    width: o1,
    maxWidth: o1,
    height: o1,
    maxHeight: o1,
    top: o1,
    right: o1,
    bottom: o1,
    left: o1,
    padding: o1,
    paddingTop: o1,
    paddingRight: o1,
    paddingBottom: o1,
    paddingLeft: o1,
    margin: o1,
    marginTop: o1,
    marginRight: o1,
    marginBottom: o1,
    marginLeft: o1,
    backgroundPositionX: o1,
    backgroundPositionY: o1,
    ...Qc,
    zIndex: d2,
    fillOpacity: _n,
    strokeOpacity: _n,
    numOctaves: d2
}
  , qc = {
    ..._5,
    color: I1,
    backgroundColor: I1,
    outlineColor: I1,
    fill: I1,
    stroke: I1,
    borderColor: I1,
    borderTopColor: I1,
    borderRightColor: I1,
    borderBottomColor: I1,
    borderLeftColor: I1,
    filter: Q0,
    WebkitFilter: Q0
}
  , u9 = n => qc[n];
function c9(n, r) {
    let s = u9(n);
    return s !== Q0 && (s = Mt),
    s.getAnimatableNone ? s.getAnimatableNone(r) : void 0
}
const Jc = new Set(["auto", "none", "0"]);
function ef(n, r, s) {
    let l = 0, u;
    for (; l < n.length && !u; ) {
        const d = n[l];
        typeof d == "string" && !Jc.has(d) && Rn(d).values.length && (u = n[l]),
        l++
    }
    if (u && s)
        for (const d of r)
            n[d] = c9(s, u)
}
class tf extends P5 {
    constructor(r, s, l, u, d) {
        super(r, s, l, u, d, !0)
    }
    readKeyframes() {
        const {unresolvedKeyframes: r, element: s, name: l} = this;
        if (!s || !s.current)
            return;
        super.readKeyframes();
        for (let p = 0; p < r.length; p++) {
            let g = r[p];
            if (typeof g == "string" && (g = g.trim(),
            x5(g))) {
                const y = s9(g, s.current);
                y !== void 0 && (r[p] = y),
                p === r.length - 1 && (this.finalKeyframe = g)
            }
        }
        if (this.resolveNoneKeyframes(),
        !o9.has(l) || r.length !== 2)
            return;
        const [u,d] = r
          , f = f2(u)
          , h = f2(d);
        if (f !== h)
            if (l2(f) && l2(h))
                for (let p = 0; p < r.length; p++) {
                    const g = r[p];
                    typeof g == "string" && (r[p] = parseFloat(g))
                }
            else
                Ht[l] && (this.needsMeasurement = !0)
    }
    resolveNoneKeyframes() {
        const {unresolvedKeyframes: r, name: s} = this
          , l = [];
        for (let u = 0; u < r.length; u++)
            (r[u] === null || Kc(r[u])) && l.push(u);
        l.length && ef(r, l, s)
    }
    measureInitialState() {
        const {element: r, unresolvedKeyframes: s, name: l} = this;
        if (!r || !r.current)
            return;
        l === "height" && (this.suspendedScrollY = window.pageYOffset),
        this.measuredOrigin = Ht[l](r.measureViewportBox(), window.getComputedStyle(r.current)),
        s[0] = this.measuredOrigin;
        const u = s[s.length - 1];
        u !== void 0 && r.getValue(l, u).jump(u, !1)
    }
    measureEndState() {
        var h;
        const {element: r, name: s, unresolvedKeyframes: l} = this;
        if (!r || !r.current)
            return;
        const u = r.getValue(s);
        u && u.jump(this.measuredOrigin, !1);
        const d = l.length - 1
          , f = l[d];
        l[d] = Ht[s](r.measureViewportBox(), window.getComputedStyle(r.current)),
        f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f),
        (h = this.removedTransforms) != null && h.length && this.removedTransforms.forEach( ([p,g]) => {
            r.getValue(p).set(g)
        }
        ),
        this.resolveNoneKeyframes()
    }
}
function nf(n, r, s) {
    if (n instanceof EventTarget)
        return [n];
    if (typeof n == "string") {
        let l = document;
        const u = (s == null ? void 0 : s[n]) ?? l.querySelectorAll(n);
        return u ? Array.from(u) : []
    }
    return Array.from(n)
}
const f9 = (n, r) => r && typeof n == "number" ? r.transform(n) : n;
function d9(n) {
    return Ps(n) && "offsetHeight"in n
}
const C2 = 30
  , rf = n => !isNaN(parseFloat(n));
class sf {
    constructor(r, s={}) {
        this.canTrackVelocity = null,
        this.events = {},
        this.updateAndNotify = l => {
            var d;
            const u = de.now();
            if (this.updatedAt !== u && this.setPrevFrameValue(),
            this.prev = this.current,
            this.setCurrent(l),
            this.current !== this.prev && ((d = this.events.change) == null || d.notify(this.current),
            this.dependents))
                for (const f of this.dependents)
                    f.dirty()
        }
        ,
        this.hasAnimated = !1,
        this.setCurrent(r),
        this.owner = s.owner
    }
    setCurrent(r) {
        this.current = r,
        this.updatedAt = de.now(),
        this.canTrackVelocity === null && r !== void 0 && (this.canTrackVelocity = rf(this.current))
    }
    setPrevFrameValue(r=this.current) {
        this.prevFrameValue = r,
        this.prevUpdatedAt = this.updatedAt
    }
    onChange(r) {
        return this.on("change", r)
    }
    on(r, s) {
        this.events[r] || (this.events[r] = new m5);
        const l = this.events[r].add(s);
        return r === "change" ? () => {
            l(),
            T1.read( () => {
                this.events.change.getSize() || this.stop()
            }
            )
        }
        : l
    }
    clearListeners() {
        for (const r in this.events)
            this.events[r].clear()
    }
    attach(r, s) {
        this.passiveEffect = r,
        this.stopPassiveEffect = s
    }
    set(r) {
        this.passiveEffect ? this.passiveEffect(r, this.updateAndNotify) : this.updateAndNotify(r)
    }
    setWithVelocity(r, s, l) {
        this.set(s),
        this.prev = void 0,
        this.prevFrameValue = r,
        this.prevUpdatedAt = this.updatedAt - l
    }
    jump(r, s=!0) {
        this.updateAndNotify(r),
        this.prev = r,
        this.prevUpdatedAt = this.prevFrameValue = void 0,
        s && this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect()
    }
    dirty() {
        var r;
        (r = this.events.change) == null || r.notify(this.current)
    }
    addDependent(r) {
        this.dependents || (this.dependents = new Set),
        this.dependents.add(r)
    }
    removeDependent(r) {
        this.dependents && this.dependents.delete(r)
    }
    get() {
        return this.current
    }
    getPrevious() {
        return this.prev
    }
    getVelocity() {
        const r = de.now();
        if (!this.canTrackVelocity || this.prevFrameValue === void 0 || r - this.updatedAt > C2)
            return 0;
        const s = Math.min(this.updatedAt - this.prevUpdatedAt, C2);
        return _s(parseFloat(this.current) - parseFloat(this.prevFrameValue), s)
    }
    start(r) {
        return this.stop(),
        new Promise(s => {
            this.hasAnimated = !0,
            this.animation = r(s),
            this.events.animationStart && this.events.animationStart.notify()
        }
        ).then( () => {
            this.events.animationComplete && this.events.animationComplete.notify(),
            this.clearAnimation()
        }
        )
    }
    stop() {
        this.animation && (this.animation.stop(),
        this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation()
    }
    isAnimating() {
        return !!this.animation
    }
    clearAnimation() {
        delete this.animation
    }
    destroy() {
        var r, s;
        (r = this.dependents) == null || r.clear(),
        (s = this.events.destroy) == null || s.notify(),
        this.clearListeners(),
        this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect()
    }
}
function S3(n, r) {
    return new sf(n,r)
}
const {schedule: R5} = zs(queueMicrotask, !1)
  , De = {
    x: !1,
    y: !1
};
function C9() {
    return De.x || De.y
}
function of(n) {
    return n === "x" || n === "y" ? De[n] ? null : (De[n] = !0,
    () => {
        De[n] = !1
    }
    ) : De.x || De.y ? null : (De.x = De.y = !0,
    () => {
        De.x = De.y = !1
    }
    )
}
function h9(n, r) {
    const s = nf(n)
      , l = new AbortController
      , u = {
        passive: !0,
        ...r,
        signal: l.signal
    };
    return [s, u, () => l.abort()]
}
function h2(n) {
    return !(n.pointerType === "touch" || C9())
}
function lf(n, r, s={}) {
    const [l,u,d] = h9(n, s)
      , f = h => {
        if (!h2(h))
            return;
        const {target: p} = h
          , g = r(p, h);
        if (typeof g != "function" || !p)
            return;
        const y = v => {
            h2(v) && (g(v),
            p.removeEventListener("pointerleave", y))
        }
        ;
        p.addEventListener("pointerleave", y, u)
    }
    ;
    return l.forEach(h => {
        h.addEventListener("pointerenter", f, u)
    }
    ),
    d
}
const p9 = (n, r) => r ? n === r ? !0 : p9(n, r.parentElement) : !1
  , A5 = n => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1
  , af = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
function uf(n) {
    return af.has(n.tagName) || n.tabIndex !== -1
}
const i7 = new WeakSet;
function p2(n) {
    return r => {
        r.key === "Enter" && n(r)
    }
}
function k0(n, r) {
    n.dispatchEvent(new PointerEvent("pointer" + r,{
        isPrimary: !0,
        bubbles: !0
    }))
}
const cf = (n, r) => {
    const s = n.currentTarget;
    if (!s)
        return;
    const l = p2( () => {
        if (i7.has(s))
            return;
        k0(s, "down");
        const u = p2( () => {
            k0(s, "up")
        }
        )
          , d = () => k0(s, "cancel");
        s.addEventListener("keyup", u, r),
        s.addEventListener("blur", d, r)
    }
    );
    s.addEventListener("keydown", l, r),
    s.addEventListener("blur", () => s.removeEventListener("keydown", l), r)
}
;
function m2(n) {
    return A5(n) && !C9()
}
function ff(n, r, s={}) {
    const [l,u,d] = h9(n, s)
      , f = h => {
        const p = h.currentTarget;
        if (!m2(h))
            return;
        i7.add(p);
        const g = r(p, h)
          , y = (j, A) => {
            window.removeEventListener("pointerup", v),
            window.removeEventListener("pointercancel", w),
            i7.has(p) && i7.delete(p),
            m2(j) && typeof g == "function" && g(j, {
                success: A
            })
        }
          , v = j => {
            y(j, p === window || p === document || s.useGlobalTarget || p9(p, j.target))
        }
          , w = j => {
            y(j, !1)
        }
        ;
        window.addEventListener("pointerup", v, u),
        window.addEventListener("pointercancel", w, u)
    }
    ;
    return l.forEach(h => {
        (s.useGlobalTarget ? window : h).addEventListener("pointerdown", f, u),
        d9(h) && (h.addEventListener("focus", g => cf(g, u)),
        !uf(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0))
    }
    ),
    d
}
function m9(n) {
    return Ps(n) && "ownerSVGElement"in n
}
function df(n) {
    return m9(n) && n.tagName === "svg"
}
const te = n => !!(n && n.getVelocity)
  , Cf = [...a9, I1, Mt]
  , hf = n => Cf.find(l9(n))
  , D5 = R.createContext({
    transformPagePoint: n => n,
    isStatic: !1,
    reducedMotion: "never"
});
function y2(n, r) {
    if (typeof n == "function")
        return n(r);
    n != null && (n.current = r)
}
function pf(...n) {
    return r => {
        let s = !1;
        const l = n.map(u => {
            const d = y2(u, r);
            return !s && typeof d == "function" && (s = !0),
            d
        }
        );
        if (s)
            return () => {
                for (let u = 0; u < l.length; u++) {
                    const d = l[u];
                    typeof d == "function" ? d() : y2(n[u], null)
                }
            }
    }
}
function mf(...n) {
    return R.useCallback(pf(...n), n)
}
class yf extends R.Component {
    getSnapshotBeforeUpdate(r) {
        const s = this.props.childRef.current;
        if (s && r.isPresent && !this.props.isPresent) {
            const l = s.offsetParent
              , u = d9(l) && l.offsetWidth || 0
              , d = this.props.sizeRef.current;
            d.height = s.offsetHeight || 0,
            d.width = s.offsetWidth || 0,
            d.top = s.offsetTop,
            d.left = s.offsetLeft,
            d.right = u - d.width - d.left
        }
        return null
    }
    componentDidUpdate() {}
    render() {
        return this.props.children
    }
}
function gf({children: n, isPresent: r, anchorX: s, root: l}) {
    const u = R.useId()
      , d = R.useRef(null)
      , f = R.useRef({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0
    })
      , {nonce: h} = R.useContext(D5)
      , p = mf(d, n == null ? void 0 : n.ref);
    return R.useInsertionEffect( () => {
        const {width: g, height: y, top: v, left: w, right: j} = f.current;
        if (r || !d.current || !g || !y)
            return;
        const A = s === "left" ? `left: ${w}` : `right: ${j}`;
        d.current.dataset.motionPopId = u;
        const P = document.createElement("style");
        h && (P.nonce = h);
        const _ = l ?? document.head;
        return _.appendChild(P),
        P.sheet && P.sheet.insertRule(`
          [data-motion-pop-id="${u}"] {
            position: absolute !important;
            width: ${g}px !important;
            height: ${y}px !important;
            ${A}px !important;
            top: ${v}px !important;
          }
        `),
        () => {
            _.contains(P) && _.removeChild(P)
        }
    }
    , [r]),
    C.jsx(yf, {
        isPresent: r,
        childRef: d,
        sizeRef: f,
        children: R.cloneElement(n, {
            ref: p
        })
    })
}
const vf = ({children: n, initial: r, isPresent: s, onExitComplete: l, custom: u, presenceAffectsLayout: d, mode: f, anchorX: h, root: p}) => {
    const g = u5(xf)
      , y = R.useId();
    let v = !0
      , w = R.useMemo( () => (v = !1,
    {
        id: y,
        initial: r,
        isPresent: s,
        custom: u,
        onExitComplete: j => {
            g.set(j, !0);
            for (const A of g.values())
                if (!A)
                    return;
            l && l()
        }
        ,
        register: j => (g.set(j, !1),
        () => g.delete(j))
    }), [s, g, l]);
    return d && v && (w = {
        ...w
    }),
    R.useMemo( () => {
        g.forEach( (j, A) => g.set(A, !1))
    }
    , [s]),
    R.useEffect( () => {
        !s && !g.size && l && l()
    }
    , [s]),
    f === "popLayout" && (n = C.jsx(gf, {
        isPresent: s,
        anchorX: h,
        root: p,
        children: n
    })),
    C.jsx(h7.Provider, {
        value: w,
        children: n
    })
}
;
function xf() {
    return new Map
}
function y9(n=!0) {
    const r = R.useContext(h7);
    if (r === null)
        return [!0, null];
    const {isPresent: s, onExitComplete: l, register: u} = r
      , d = R.useId();
    R.useEffect( () => {
        if (n)
            return u(d)
    }
    , [n]);
    const f = R.useCallback( () => n && l && l(d), [d, l, n]);
    return !s && l ? [!1, f] : [!0]
}
const Q4 = n => n.key || "";
function g2(n) {
    const r = [];
    return R.Children.forEach(n, s => {
        R.isValidElement(s) && r.push(s)
    }
    ),
    r
}
const g9 = ({children: n, custom: r, initial: s=!0, onExitComplete: l, presenceAffectsLayout: u=!0, mode: d="sync", propagate: f=!1, anchorX: h="left", root: p}) => {
    const [g,y] = y9(f)
      , v = R.useMemo( () => g2(n), [n])
      , w = f && !g ? [] : v.map(Q4)
      , j = R.useRef(!0)
      , A = R.useRef(v)
      , P = u5( () => new Map)
      , [_,D] = R.useState(v)
      , [V,N] = R.useState(v);
    f5( () => {
        j.current = !1,
        A.current = v;
        for (let t1 = 0; t1 < V.length; t1++) {
            const s1 = Q4(V[t1]);
            w.includes(s1) ? P.delete(s1) : P.get(s1) !== !0 && P.set(s1, !1)
        }
    }
    , [V, w.length, w.join("-")]);
    const X = [];
    if (v !== _) {
        let t1 = [...v];
        for (let s1 = 0; s1 < V.length; s1++) {
            const e1 = V[s1]
              , y1 = Q4(e1);
            w.includes(y1) || (t1.splice(s1, 0, e1),
            X.push(e1))
        }
        return d === "wait" && X.length && (t1 = X),
        N(g2(t1)),
        D(v),
        null
    }
    const {forceRender: $} = R.useContext(Pn);
    return C.jsx(C.Fragment, {
        children: V.map(t1 => {
            const s1 = Q4(t1)
              , e1 = f && !g ? !1 : v === V || w.includes(s1)
              , y1 = () => {
                if (P.has(s1))
                    P.set(s1, !0);
                else
                    return;
                let w1 = !0;
                P.forEach(b1 => {
                    b1 || (w1 = !1)
                }
                ),
                w1 && ($ == null || $(),
                N(A.current),
                f && (y == null || y()),
                l && l())
            }
            ;
            return C.jsx(vf, {
                isPresent: e1,
                initial: !j.current || s ? void 0 : !1,
                custom: r,
                presenceAffectsLayout: u,
                mode: d,
                root: p,
                onExitComplete: e1 ? void 0 : y1,
                anchorX: h,
                children: t1
            }, s1)
        }
        )
    })
}
  , wf = R.createContext(null);
function kf() {
    const n = R.useRef(!1);
    return f5( () => (n.current = !0,
    () => {
        n.current = !1
    }
    ), []),
    n
}
function Mf() {
    const n = kf()
      , [r,s] = R.useState(0)
      , l = R.useCallback( () => {
        n.current && s(r + 1)
    }
    , [r]);
    return [R.useCallback( () => T1.postRender(l), [l]), r]
}
const Sf = n => !n.isLayoutDirty && n.willUpdate(!1);
function v2() {
    const n = new Set
      , r = new WeakMap
      , s = () => n.forEach(Sf);
    return {
        add: l => {
            n.add(l),
            r.set(l, l.addEventListener("willUpdate", s))
        }
        ,
        remove: l => {
            n.delete(l);
            const u = r.get(l);
            u && (u(),
            r.delete(l)),
            s()
        }
        ,
        dirty: s
    }
}
const v9 = n => n === !0
  , jf = n => v9(n === !0) || n === "id"
  , Tf = ({children: n, id: r, inherit: s=!0}) => {
    const l = R.useContext(Pn)
      , u = R.useContext(wf)
      , [d,f] = Mf()
      , h = R.useRef(null)
      , p = l.id || u;
    h.current === null && (jf(s) && p && (r = r ? p + "-" + r : p),
    h.current = {
        id: r,
        group: v9(s) && l.group || v2()
    });
    const g = R.useMemo( () => ({
        ...h.current,
        forceRender: d
    }), [f]);
    return C.jsx(Pn.Provider, {
        value: g,
        children: n
    })
}
  , x9 = R.createContext({
    strict: !1
})
  , x2 = {
    animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"]
}
  , j3 = {};
for (const n in x2)
    j3[n] = {
        isEnabled: r => x2[n].some(s => !!r[s])
    };
function Ef(n) {
    for (const r in n)
        j3[r] = {
            ...j3[r],
            ...n[r]
        }
}
const Pf = new Set(["animate", "exit", "variants", "initial", "style", "values", "variants", "transition", "transformTemplate", "custom", "inherit", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave", "globalTapTarget", "ignoreStrict", "viewport"]);
function f7(n) {
    return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || Pf.has(n)
}
let w9 = n => !f7(n);
function Lf(n) {
    typeof n == "function" && (w9 = r => r.startsWith("on") ? !f7(r) : n(r))
}
try {
    Lf(require("@emotion/is-prop-valid").default)
} catch {}
function _f(n, r, s) {
    const l = {};
    for (const u in n)
        u === "values" && typeof n.values == "object" || (w9(u) || s === !0 && f7(u) || !r && !f7(u) || n.draggable && u.startsWith("onDrag")) && (l[u] = n[u]);
    return l
}
const p7 = R.createContext({});
function m7(n) {
    return n !== null && typeof n == "object" && typeof n.start == "function"
}
function An(n) {
    return typeof n == "string" || Array.isArray(n)
}
const V5 = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"]
  , Z5 = ["initial", ...V5];
function y7(n) {
    return m7(n.animate) || Z5.some(r => An(n[r]))
}
function k9(n) {
    return !!(y7(n) || n.variants)
}
function Rf(n, r) {
    if (y7(n)) {
        const {initial: s, animate: l} = n;
        return {
            initial: s === !1 || An(s) ? s : void 0,
            animate: An(l) ? l : void 0
        }
    }
    return n.inherit !== !1 ? r : {}
}
function Af(n) {
    const {initial: r, animate: s} = Rf(n, R.useContext(p7));
    return R.useMemo( () => ({
        initial: r,
        animate: s
    }), [w2(r), w2(s)])
}
function w2(n) {
    return Array.isArray(n) ? n.join(" ") : n
}
const Dn = {};
function Df(n) {
    for (const r in n)
        Dn[r] = n[r],
        v5(r) && (Dn[r].isCSSVariable = !0)
}
function M9(n, {layout: r, layoutId: s}) {
    return L3.has(n) || n.startsWith("origin") || (r || s !== void 0) && (!!Dn[n] || n === "opacity")
}
const Vf = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective"
}
  , Zf = P3.length;
function Of(n, r, s) {
    let l = ""
      , u = !0;
    for (let d = 0; d < Zf; d++) {
        const f = P3[d]
          , h = n[f];
        if (h === void 0)
            continue;
        let p = !0;
        if (typeof h == "number" ? p = h === (f.startsWith("scale") ? 1 : 0) : p = parseFloat(h) === 0,
        !p || s) {
            const g = f9(h, _5[f]);
            if (!p) {
                u = !1;
                const y = Vf[f] || f;
                l += `${y}(${g}) `
            }
            s && (r[f] = g)
        }
    }
    return l = l.trim(),
    s ? l = s(r, u ? "" : l) : u && (l = "none"),
    l
}
function O5(n, r, s) {
    const {style: l, vars: u, transformOrigin: d} = n;
    let f = !1
      , h = !1;
    for (const p in r) {
        const g = r[p];
        if (L3.has(p)) {
            f = !0;
            continue
        } else if (v5(p)) {
            u[p] = g;
            continue
        } else {
            const y = f9(g, _5[p]);
            p.startsWith("origin") ? (h = !0,
            d[p] = y) : l[p] = y
        }
    }
    if (r.transform || (f || s ? l.transform = Of(r, n.transform, s) : l.transform && (l.transform = "none")),
    h) {
        const {originX: p="50%", originY: g="50%", originZ: y=0} = d;
        l.transformOrigin = `${p} ${g} ${y}`
    }
}
const F5 = () => ({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {}
});
function S9(n, r, s) {
    for (const l in r)
        !te(r[l]) && !M9(l, s) && (n[l] = r[l])
}
function Ff({transformTemplate: n}, r) {
    return R.useMemo( () => {
        const s = F5();
        return O5(s, r, n),
        Object.assign({}, s.vars, s.style)
    }
    , [r])
}
function Nf(n, r) {
    const s = n.style || {}
      , l = {};
    return S9(l, s, n),
    Object.assign(l, Ff(n, r)),
    l
}
function If(n, r) {
    const s = {}
      , l = Nf(n, r);
    return n.drag && n.dragListener !== !1 && (s.draggable = !1,
    l.userSelect = l.WebkitUserSelect = l.WebkitTouchCallout = "none",
    l.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`),
    n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (s.tabIndex = 0),
    s.style = l,
    s
}
const bf = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray"
}
  , zf = {
    offset: "strokeDashoffset",
    array: "strokeDasharray"
};
function Bf(n, r, s=1, l=0, u=!0) {
    n.pathLength = 1;
    const d = u ? bf : zf;
    n[d.offset] = o1.transform(-l);
    const f = o1.transform(r)
      , h = o1.transform(s);
    n[d.array] = `${f} ${h}`
}
function j9(n, {attrX: r, attrY: s, attrScale: l, pathLength: u, pathSpacing: d=1, pathOffset: f=0, ...h}, p, g, y) {
    if (O5(n, h, g),
    p) {
        n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
        return
    }
    n.attrs = n.style,
    n.style = {};
    const {attrs: v, style: w} = n;
    v.transform && (w.transform = v.transform,
    delete v.transform),
    (w.transform || v.transformOrigin) && (w.transformOrigin = v.transformOrigin ?? "50% 50%",
    delete v.transformOrigin),
    w.transform && (w.transformBox = (y == null ? void 0 : y.transformBox) ?? "fill-box",
    delete v.transformBox),
    r !== void 0 && (v.x = r),
    s !== void 0 && (v.y = s),
    l !== void 0 && (v.scale = l),
    u !== void 0 && Bf(v, u, d, f, !1)
}
const T9 = () => ({
    ...F5(),
    attrs: {}
})
  , E9 = n => typeof n == "string" && n.toLowerCase() === "svg";
function Uf(n, r, s, l) {
    const u = R.useMemo( () => {
        const d = T9();
        return j9(d, r, E9(l), n.transformTemplate, n.style),
        {
            ...d.attrs,
            style: {
                ...d.style
            }
        }
    }
    , [r]);
    if (n.style) {
        const d = {};
        S9(d, n.style, n),
        u.style = {
            ...d,
            ...u.style
        }
    }
    return u
}
const Hf = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "switch", "symbol", "svg", "text", "tspan", "use", "view"];
function N5(n) {
    return typeof n != "string" || n.includes("-") ? !1 : !!(Hf.indexOf(n) > -1 || /[A-Z]/u.test(n))
}
function $f(n, r, s, {latestValues: l}, u, d=!1) {
    const h = (N5(n) ? Uf : If)(r, l, u, n)
      , p = _f(r, typeof n == "string", d)
      , g = n !== R.Fragment ? {
        ...p,
        ...h,
        ref: s
    } : {}
      , {children: y} = r
      , v = R.useMemo( () => te(y) ? y.get() : y, [y]);
    return R.createElement(n, {
        ...g,
        children: v
    })
}
function k2(n) {
    const r = [{}, {}];
    return n == null || n.values.forEach( (s, l) => {
        r[0][l] = s.get(),
        r[1][l] = s.getVelocity()
    }
    ),
    r
}
function I5(n, r, s, l) {
    if (typeof r == "function") {
        const [u,d] = k2(l);
        r = r(s !== void 0 ? s : n.custom, u, d)
    }
    if (typeof r == "string" && (r = n.variants && n.variants[r]),
    typeof r == "function") {
        const [u,d] = k2(l);
        r = r(s !== void 0 ? s : n.custom, u, d)
    }
    return r
}
function s7(n) {
    return te(n) ? n.get() : n
}
function Wf({scrapeMotionValuesFromProps: n, createRenderState: r}, s, l, u) {
    return {
        latestValues: Kf(s, l, u, n),
        renderState: r()
    }
}
function Kf(n, r, s, l) {
    const u = {}
      , d = l(n, {});
    for (const w in d)
        u[w] = s7(d[w]);
    let {initial: f, animate: h} = n;
    const p = y7(n)
      , g = k9(n);
    r && g && !p && n.inherit !== !1 && (f === void 0 && (f = r.initial),
    h === void 0 && (h = r.animate));
    let y = s ? s.initial === !1 : !1;
    y = y || f === !1;
    const v = y ? h : f;
    if (v && typeof v != "boolean" && !m7(v)) {
        const w = Array.isArray(v) ? v : [v];
        for (let j = 0; j < w.length; j++) {
            const A = I5(n, w[j]);
            if (A) {
                const {transitionEnd: P, transition: _, ...D} = A;
                for (const V in D) {
                    let N = D[V];
                    if (Array.isArray(N)) {
                        const X = y ? N.length - 1 : 0;
                        N = N[X]
                    }
                    N !== null && (u[V] = N)
                }
                for (const V in P)
                    u[V] = P[V]
            }
        }
    }
    return u
}
const P9 = n => (r, s) => {
    const l = R.useContext(p7)
      , u = R.useContext(h7)
      , d = () => Wf(n, r, l, u);
    return s ? d() : u5(d)
}
;
function b5(n, r, s) {
    var d;
    const {style: l} = n
      , u = {};
    for (const f in l)
        (te(l[f]) || r.style && te(r.style[f]) || M9(f, n) || ((d = s == null ? void 0 : s.getValue(f)) == null ? void 0 : d.liveStyle) !== void 0) && (u[f] = l[f]);
    return u
}
const Gf = P9({
    scrapeMotionValuesFromProps: b5,
    createRenderState: F5
});
function L9(n, r, s) {
    const l = b5(n, r, s);
    for (const u in n)
        if (te(n[u]) || te(r[u])) {
            const d = P3.indexOf(u) !== -1 ? "attr" + u.charAt(0).toUpperCase() + u.substring(1) : u;
            l[d] = n[u]
        }
    return l
}
const Xf = P9({
    scrapeMotionValuesFromProps: L9,
    createRenderState: T9
})
  , Yf = Symbol.for("motionComponentSymbol");
function v3(n) {
    return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current")
}
function Qf(n, r, s) {
    return R.useCallback(l => {
        l && n.onMount && n.onMount(l),
        r && (l ? r.mount(l) : r.unmount()),
        s && (typeof s == "function" ? s(l) : v3(s) && (s.current = l))
    }
    , [r])
}
const z5 = n => n.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase()
  , qf = "framerAppearId"
  , _9 = "data-" + z5(qf)
  , R9 = R.createContext({});
function Jf(n, r, s, l, u) {
    var P, _;
    const {visualElement: d} = R.useContext(p7)
      , f = R.useContext(x9)
      , h = R.useContext(h7)
      , p = R.useContext(D5).reducedMotion
      , g = R.useRef(null);
    l = l || f.renderer,
    !g.current && l && (g.current = l(n, {
        visualState: r,
        parent: d,
        props: s,
        presenceContext: h,
        blockInitialAnimation: h ? h.initial === !1 : !1,
        reducedMotionConfig: p
    }));
    const y = g.current
      , v = R.useContext(R9);
    y && !y.projection && u && (y.type === "html" || y.type === "svg") && ed(g.current, s, u, v);
    const w = R.useRef(!1);
    R.useInsertionEffect( () => {
        y && w.current && y.update(s, h)
    }
    );
    const j = s[_9]
      , A = R.useRef(!!j && !((P = window.MotionHandoffIsComplete) != null && P.call(window, j)) && ((_ = window.MotionHasOptimisedAnimation) == null ? void 0 : _.call(window, j)));
    return f5( () => {
        y && (w.current = !0,
        window.MotionIsMounted = !0,
        y.updateFeatures(),
        y.scheduleRenderMicrotask(),
        A.current && y.animationState && y.animationState.animateChanges())
    }
    ),
    R.useEffect( () => {
        y && (!A.current && y.animationState && y.animationState.animateChanges(),
        A.current && (queueMicrotask( () => {
            var D;
            (D = window.MotionHandoffMarkAsComplete) == null || D.call(window, j)
        }
        ),
        A.current = !1),
        y.enteringChildren = void 0)
    }
    ),
    y
}
function ed(n, r, s, l) {
    const {layoutId: u, layout: d, drag: f, dragConstraints: h, layoutScroll: p, layoutRoot: g, layoutCrossfade: y} = r;
    n.projection = new s(n.latestValues,r["data-framer-portal-id"] ? void 0 : A9(n.parent)),
    n.projection.setOptions({
        layoutId: u,
        layout: d,
        alwaysMeasureLayout: !!f || h && v3(h),
        visualElement: n,
        animationType: typeof d == "string" ? d : "both",
        initialPromotionConfig: l,
        crossfade: y,
        layoutScroll: p,
        layoutRoot: g
    })
}
function A9(n) {
    if (n)
        return n.options.allowProjection !== !1 ? n.projection : A9(n.parent)
}
function M0(n, {forwardMotionProps: r=!1}={}, s, l) {
    s && Ef(s);
    const u = N5(n) ? Xf : Gf;
    function d(h, p) {
        let g;
        const y = {
            ...R.useContext(D5),
            ...h,
            layoutId: td(h)
        }
          , {isStatic: v} = y
          , w = Af(h)
          , j = u(h, v);
        if (!v && c5) {
            nd();
            const A = rd(y);
            g = A.MeasureLayout,
            w.visualElement = Jf(n, j, y, l, A.ProjectionNode)
        }
        return C.jsxs(p7.Provider, {
            value: w,
            children: [g && w.visualElement ? C.jsx(g, {
                visualElement: w.visualElement,
                ...y
            }) : null, $f(n, h, Qf(j, w.visualElement, p), j, v, r)]
        })
    }
    d.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
    const f = R.forwardRef(d);
    return f[Yf] = n,
    f
}
function td({layoutId: n}) {
    const r = R.useContext(Pn).id;
    return r && n !== void 0 ? r + "-" + n : n
}
function nd(n, r) {
    R.useContext(x9).strict
}
function rd(n) {
    const {drag: r, layout: s} = j3;
    if (!r && !s)
        return {};
    const l = {
        ...r,
        ...s
    };
    return {
        MeasureLayout: r != null && r.isEnabled(n) || s != null && s.isEnabled(n) ? l.MeasureLayout : void 0,
        ProjectionNode: l.ProjectionNode
    }
}
function id(n, r) {
    if (typeof Proxy > "u")
        return M0;
    const s = new Map
      , l = (d, f) => M0(d, f, n, r)
      , u = (d, f) => l(d, f);
    return new Proxy(u,{
        get: (d, f) => f === "create" ? l : (s.has(f) || s.set(f, M0(f, void 0, n, r)),
        s.get(f))
    })
}
function D9({top: n, left: r, right: s, bottom: l}) {
    return {
        x: {
            min: r,
            max: s
        },
        y: {
            min: n,
            max: l
        }
    }
}
function sd({x: n, y: r}) {
    return {
        top: r.min,
        right: n.max,
        bottom: r.max,
        left: n.min
    }
}
function od(n, r) {
    if (!r)
        return n;
    const s = r({
        x: n.left,
        y: n.top
    })
      , l = r({
        x: n.right,
        y: n.bottom
    });
    return {
        top: s.y,
        left: s.x,
        bottom: l.y,
        right: l.x
    }
}
function S0(n) {
    return n === void 0 || n === 1
}
function q0({scale: n, scaleX: r, scaleY: s}) {
    return !S0(n) || !S0(r) || !S0(s)
}
function zt(n) {
    return q0(n) || V9(n) || n.z || n.rotate || n.rotateX || n.rotateY || n.skewX || n.skewY
}
function V9(n) {
    return M2(n.x) || M2(n.y)
}
function M2(n) {
    return n && n !== "0%"
}
function d7(n, r, s) {
    const l = n - s
      , u = r * l;
    return s + u
}
function S2(n, r, s, l, u) {
    return u !== void 0 && (n = d7(n, u, l)),
    d7(n, s, l) + r
}
function J0(n, r=0, s=1, l, u) {
    n.min = S2(n.min, r, s, l, u),
    n.max = S2(n.max, r, s, l, u)
}
function Z9(n, {x: r, y: s}) {
    J0(n.x, r.translate, r.scale, r.originPoint),
    J0(n.y, s.translate, s.scale, s.originPoint)
}
const j2 = .999999999999
  , T2 = 1.0000000000001;
function ld(n, r, s, l=!1) {
    const u = s.length;
    if (!u)
        return;
    r.x = r.y = 1;
    let d, f;
    for (let h = 0; h < u; h++) {
        d = s[h],
        f = d.projectionDelta;
        const {visualElement: p} = d.options;
        p && p.props.style && p.props.style.display === "contents" || (l && d.options.layoutScroll && d.scroll && d !== d.root && w3(n, {
            x: -d.scroll.offset.x,
            y: -d.scroll.offset.y
        }),
        f && (r.x *= f.x.scale,
        r.y *= f.y.scale,
        Z9(n, f)),
        l && zt(d.latestValues) && w3(n, d.latestValues))
    }
    r.x < T2 && r.x > j2 && (r.x = 1),
    r.y < T2 && r.y > j2 && (r.y = 1)
}
function x3(n, r) {
    n.min = n.min + r,
    n.max = n.max + r
}
function E2(n, r, s, l, u=.5) {
    const d = R1(n.min, n.max, u);
    J0(n, r, s, d, l)
}
function w3(n, r) {
    E2(n.x, r.x, r.scaleX, r.scale, r.originX),
    E2(n.y, r.y, r.scaleY, r.scale, r.originY)
}
function O9(n, r) {
    return D9(od(n.getBoundingClientRect(), r))
}
function ad(n, r, s) {
    const l = O9(n, s)
      , {scroll: u} = r;
    return u && (x3(l.x, u.offset.x),
    x3(l.y, u.offset.y)),
    l
}
const P2 = () => ({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0
})
  , k3 = () => ({
    x: P2(),
    y: P2()
})
  , L2 = () => ({
    min: 0,
    max: 0
})
  , F1 = () => ({
    x: L2(),
    y: L2()
})
  , e5 = {
    current: null
}
  , F9 = {
    current: !1
};
function ud() {
    if (F9.current = !0,
    !!c5)
        if (window.matchMedia) {
            const n = window.matchMedia("(prefers-reduced-motion)")
              , r = () => e5.current = n.matches;
            n.addEventListener("change", r),
            r()
        } else
            e5.current = !1
}
const cd = new WeakMap;
function fd(n, r, s) {
    for (const l in r) {
        const u = r[l]
          , d = s[l];
        if (te(u))
            n.addValue(l, u);
        else if (te(d))
            n.addValue(l, S3(u, {
                owner: n
            }));
        else if (d !== u)
            if (n.hasValue(l)) {
                const f = n.getValue(l);
                f.liveStyle === !0 ? f.jump(u) : f.hasAnimated || f.set(u)
            } else {
                const f = n.getStaticValue(l);
                n.addValue(l, S3(f !== void 0 ? f : u, {
                    owner: n
                }))
            }
    }
    for (const l in s)
        r[l] === void 0 && n.removeValue(l);
    return r
}
const _2 = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure", "LayoutAnimationStart", "LayoutAnimationComplete"];
class dd {
    scrapeMotionValuesFromProps(r, s, l) {
        return {}
    }
    constructor({parent: r, props: s, presenceContext: l, reducedMotionConfig: u, blockInitialAnimation: d, visualState: f}, h={}) {
        this.current = null,
        this.children = new Set,
        this.isVariantNode = !1,
        this.isControllingVariants = !1,
        this.shouldReduceMotion = null,
        this.values = new Map,
        this.KeyframeResolver = P5,
        this.features = {},
        this.valueSubscriptions = new Map,
        this.prevMotionValues = {},
        this.events = {},
        this.propEventSubscriptions = {},
        this.notifyUpdate = () => this.notify("Update", this.latestValues),
        this.render = () => {
            this.current && (this.triggerBuild(),
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection))
        }
        ,
        this.renderScheduledAt = 0,
        this.scheduleRender = () => {
            const w = de.now();
            this.renderScheduledAt < w && (this.renderScheduledAt = w,
            T1.render(this.render, !1, !0))
        }
        ;
        const {latestValues: p, renderState: g} = f;
        this.latestValues = p,
        this.baseTarget = {
            ...p
        },
        this.initialValues = s.initial ? {
            ...p
        } : {},
        this.renderState = g,
        this.parent = r,
        this.props = s,
        this.presenceContext = l,
        this.depth = r ? r.depth + 1 : 0,
        this.reducedMotionConfig = u,
        this.options = h,
        this.blockInitialAnimation = !!d,
        this.isControllingVariants = y7(s),
        this.isVariantNode = k9(s),
        this.isVariantNode && (this.variantChildren = new Set),
        this.manuallyAnimateOnMount = !!(r && r.current);
        const {willChange: y, ...v} = this.scrapeMotionValuesFromProps(s, {}, this);
        for (const w in v) {
            const j = v[w];
            p[w] !== void 0 && te(j) && j.set(p[w])
        }
    }
    mount(r) {
        var s;
        this.current = r,
        cd.set(r, this),
        this.projection && !this.projection.instance && this.projection.mount(r),
        this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)),
        this.values.forEach( (l, u) => this.bindToMotionValue(u, l)),
        F9.current || ud(),
        this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : e5.current,
        (s = this.parent) == null || s.addChild(this),
        this.update(this.props, this.presenceContext)
    }
    unmount() {
        var r;
        this.projection && this.projection.unmount(),
        kt(this.notifyUpdate),
        kt(this.render),
        this.valueSubscriptions.forEach(s => s()),
        this.valueSubscriptions.clear(),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        (r = this.parent) == null || r.removeChild(this);
        for (const s in this.events)
            this.events[s].clear();
        for (const s in this.features) {
            const l = this.features[s];
            l && (l.unmount(),
            l.isMounted = !1)
        }
        this.current = null
    }
    addChild(r) {
        this.children.add(r),
        this.enteringChildren ?? (this.enteringChildren = new Set),
        this.enteringChildren.add(r)
    }
    removeChild(r) {
        this.children.delete(r),
        this.enteringChildren && this.enteringChildren.delete(r)
    }
    bindToMotionValue(r, s) {
        this.valueSubscriptions.has(r) && this.valueSubscriptions.get(r)();
        const l = L3.has(r);
        l && this.onBindTransform && this.onBindTransform();
        const u = s.on("change", f => {
            this.latestValues[r] = f,
            this.props.onUpdate && T1.preRender(this.notifyUpdate),
            l && this.projection && (this.projection.isTransformDirty = !0),
            this.scheduleRender()
        }
        );
        let d;
        window.MotionCheckAppearSync && (d = window.MotionCheckAppearSync(this, r, s)),
        this.valueSubscriptions.set(r, () => {
            u(),
            d && d(),
            s.owner && s.stop()
        }
        )
    }
    sortNodePosition(r) {
        return !this.current || !this.sortInstanceNodePosition || this.type !== r.type ? 0 : this.sortInstanceNodePosition(this.current, r.current)
    }
    updateFeatures() {
        let r = "animation";
        for (r in j3) {
            const s = j3[r];
            if (!s)
                continue;
            const {isEnabled: l, Feature: u} = s;
            if (!this.features[r] && u && l(this.props) && (this.features[r] = new u(this)),
            this.features[r]) {
                const d = this.features[r];
                d.isMounted ? d.update() : (d.mount(),
                d.isMounted = !0)
            }
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props)
    }
    measureViewportBox() {
        return this.current ? this.measureInstanceViewportBox(this.current, this.props) : F1()
    }
    getStaticValue(r) {
        return this.latestValues[r]
    }
    setStaticValue(r, s) {
        this.latestValues[r] = s
    }
    update(r, s) {
        (r.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
        this.prevProps = this.props,
        this.props = r,
        this.prevPresenceContext = this.presenceContext,
        this.presenceContext = s;
        for (let l = 0; l < _2.length; l++) {
            const u = _2[l];
            this.propEventSubscriptions[u] && (this.propEventSubscriptions[u](),
            delete this.propEventSubscriptions[u]);
            const d = "on" + u
              , f = r[d];
            f && (this.propEventSubscriptions[u] = this.on(u, f))
        }
        this.prevMotionValues = fd(this, this.scrapeMotionValuesFromProps(r, this.prevProps, this), this.prevMotionValues),
        this.handleChildMotionValue && this.handleChildMotionValue()
    }
    getProps() {
        return this.props
    }
    getVariant(r) {
        return this.props.variants ? this.props.variants[r] : void 0
    }
    getDefaultTransition() {
        return this.props.transition
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint
    }
    getClosestVariantNode() {
        return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0
    }
    addVariantChild(r) {
        const s = this.getClosestVariantNode();
        if (s)
            return s.variantChildren && s.variantChildren.add(r),
            () => s.variantChildren.delete(r)
    }
    addValue(r, s) {
        const l = this.values.get(r);
        s !== l && (l && this.removeValue(r),
        this.bindToMotionValue(r, s),
        this.values.set(r, s),
        this.latestValues[r] = s.get())
    }
    removeValue(r) {
        this.values.delete(r);
        const s = this.valueSubscriptions.get(r);
        s && (s(),
        this.valueSubscriptions.delete(r)),
        delete this.latestValues[r],
        this.removeValueFromRenderState(r, this.renderState)
    }
    hasValue(r) {
        return this.values.has(r)
    }
    getValue(r, s) {
        if (this.props.values && this.props.values[r])
            return this.props.values[r];
        let l = this.values.get(r);
        return l === void 0 && s !== void 0 && (l = S3(s === null ? void 0 : s, {
            owner: this
        }),
        this.addValue(r, l)),
        l
    }
    readValue(r, s) {
        let l = this.latestValues[r] !== void 0 || !this.current ? this.latestValues[r] : this.getBaseTargetFromProps(this.props, r) ?? this.readValueFromInstance(this.current, r, this.options);
        return l != null && (typeof l == "string" && (Es(l) || Ls(l)) ? l = parseFloat(l) : !hf(l) && Mt.test(s) && (l = c9(r, s)),
        this.setBaseTarget(r, te(l) ? l.get() : l)),
        te(l) ? l.get() : l
    }
    setBaseTarget(r, s) {
        this.baseTarget[r] = s
    }
    getBaseTarget(r) {
        var d;
        const {initial: s} = this.props;
        let l;
        if (typeof s == "string" || typeof s == "object") {
            const f = I5(this.props, s, (d = this.presenceContext) == null ? void 0 : d.custom);
            f && (l = f[r])
        }
        if (s && l !== void 0)
            return l;
        const u = this.getBaseTargetFromProps(this.props, r);
        return u !== void 0 && !te(u) ? u : this.initialValues[r] !== void 0 && l === void 0 ? void 0 : this.baseTarget[r]
    }
    on(r, s) {
        return this.events[r] || (this.events[r] = new m5),
        this.events[r].add(s)
    }
    notify(r, ...s) {
        this.events[r] && this.events[r].notify(...s)
    }
    scheduleRenderMicrotask() {
        R5.render(this.render)
    }
}
class N9 extends dd {
    constructor() {
        super(...arguments),
        this.KeyframeResolver = tf
    }
    sortInstanceNodePosition(r, s) {
        return r.compareDocumentPosition(s) & 2 ? 1 : -1
    }
    getBaseTargetFromProps(r, s) {
        return r.style ? r.style[s] : void 0
    }
    removeValueFromRenderState(r, {vars: s, style: l}) {
        delete s[r],
        delete l[r]
    }
    handleChildMotionValue() {
        this.childSubscription && (this.childSubscription(),
        delete this.childSubscription);
        const {children: r} = this.props;
        te(r) && (this.childSubscription = r.on("change", s => {
            this.current && (this.current.textContent = `${s}`)
        }
        ))
    }
}
function I9(n, {style: r, vars: s}, l, u) {
    const d = n.style;
    let f;
    for (f in r)
        d[f] = r[f];
    u == null || u.applyProjectionStyles(d, l);
    for (f in s)
        d.setProperty(f, s[f])
}
function Cd(n) {
    return window.getComputedStyle(n)
}
class hd extends N9 {
    constructor() {
        super(...arguments),
        this.type = "html",
        this.renderInstance = I9
    }
    readValueFromInstance(r, s) {
        var l;
        if (L3.has(s))
            return (l = this.projection) != null && l.isProjecting ? $0(s) : xc(r, s);
        {
            const u = Cd(r)
              , d = (v5(s) ? u.getPropertyValue(s) : u[s]) || 0;
            return typeof d == "string" ? d.trim() : d
        }
    }
    measureInstanceViewportBox(r, {transformPagePoint: s}) {
        return O9(r, s)
    }
    build(r, s, l) {
        O5(r, s, l.transformTemplate)
    }
    scrapeMotionValuesFromProps(r, s, l) {
        return b5(r, s, l)
    }
}
const b9 = new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform", "pathLength", "startOffset", "textLength", "lengthAdjust"]);
function pd(n, r, s, l) {
    I9(n, r, void 0, l);
    for (const u in r.attrs)
        n.setAttribute(b9.has(u) ? u : z5(u), r.attrs[u])
}
class md extends N9 {
    constructor() {
        super(...arguments),
        this.type = "svg",
        this.isSVGTag = !1,
        this.measureInstanceViewportBox = F1
    }
    getBaseTargetFromProps(r, s) {
        return r[s]
    }
    readValueFromInstance(r, s) {
        if (L3.has(s)) {
            const l = u9(s);
            return l && l.default || 0
        }
        return s = b9.has(s) ? s : z5(s),
        r.getAttribute(s)
    }
    scrapeMotionValuesFromProps(r, s, l) {
        return L9(r, s, l)
    }
    build(r, s, l) {
        j9(r, s, this.isSVGTag, l.transformTemplate, l.style)
    }
    renderInstance(r, s, l, u) {
        pd(r, s, l, u)
    }
    mount(r) {
        this.isSVGTag = E9(r.tagName),
        super.mount(r)
    }
}
const yd = (n, r) => N5(n) ? new md(r) : new hd(r,{
    allowProjection: n !== R.Fragment
});
function M3(n, r, s) {
    const l = n.getProps();
    return I5(l, r, s !== void 0 ? s : l.custom, n)
}
const t5 = n => Array.isArray(n);
function gd(n, r, s) {
    n.hasValue(r) ? n.getValue(r).set(s) : n.addValue(r, S3(s))
}
function vd(n) {
    return t5(n) ? n[n.length - 1] || 0 : n
}
function xd(n, r) {
    const s = M3(n, r);
    let {transitionEnd: l={}, transition: u={}, ...d} = s || {};
    d = {
        ...d,
        ...l
    };
    for (const f in d) {
        const h = vd(d[f]);
        gd(n, f, h)
    }
}
function wd(n) {
    return !!(te(n) && n.add)
}
function n5(n, r) {
    const s = n.getValue("willChange");
    if (wd(s))
        return s.add(r);
    if (!s && et.WillChange) {
        const l = new et.WillChange("auto");
        n.addValue("willChange", l),
        l.add(r)
    }
}
function z9(n) {
    return n.props[_9]
}
const kd = n => n !== null;
function Md(n, {repeat: r, repeatType: s="loop"}, l) {
    const u = n.filter(kd)
      , d = r && s !== "loop" && r % 2 === 1 ? 0 : u.length - 1;
    return u[d]
}
const Sd = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10
}
  , jd = n => ({
    type: "spring",
    stiffness: 550,
    damping: n === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10
})
  , Td = {
    type: "keyframes",
    duration: .8
}
  , Ed = {
    type: "keyframes",
    ease: [.25, .1, .35, 1],
    duration: .3
}
  , Pd = (n, {keyframes: r}) => r.length > 2 ? Td : L3.has(n) ? n.startsWith("scale") ? jd(r[1]) : Sd : Ed;
function Ld({when: n, delay: r, delayChildren: s, staggerChildren: l, staggerDirection: u, repeat: d, repeatType: f, repeatDelay: h, from: p, elapsed: g, ...y}) {
    return !!Object.keys(y).length
}
const B5 = (n, r, s, l={}, u, d) => f => {
    const h = L5(l, n) || {}
      , p = h.delay || l.delay || 0;
    let {elapsed: g=0} = l;
    g = g - ze(p);
    const y = {
        keyframes: Array.isArray(s) ? s : [null, s],
        ease: "easeOut",
        velocity: r.getVelocity(),
        ...h,
        delay: -g,
        onUpdate: w => {
            r.set(w),
            h.onUpdate && h.onUpdate(w)
        }
        ,
        onComplete: () => {
            f(),
            h.onComplete && h.onComplete()
        }
        ,
        name: n,
        motionValue: r,
        element: d ? void 0 : u
    };
    Ld(h) || Object.assign(y, Pd(n, y)),
    y.duration && (y.duration = ze(y.duration)),
    y.repeatDelay && (y.repeatDelay = ze(y.repeatDelay)),
    y.from !== void 0 && (y.keyframes[0] = y.from);
    let v = !1;
    if ((y.type === !1 || y.duration === 0 && !y.repeatDelay) && (Y0(y),
    y.delay === 0 && (v = !0)),
    (et.instantAnimations || et.skipAnimations) && (v = !0,
    Y0(y),
    y.delay = 0),
    y.allowFlatten = !h.type && !h.ease,
    v && !d && r.get() !== void 0) {
        const w = Md(y.keyframes, h);
        if (w !== void 0) {
            T1.update( () => {
                y.onUpdate(w),
                y.onComplete()
            }
            );
            return
        }
    }
    return h.isSync ? new E5(y) : new Uc(y)
}
;
function _d({protectedKeys: n, needsAnimating: r}, s) {
    const l = n.hasOwnProperty(s) && r[s] !== !0;
    return r[s] = !1,
    l
}
function B9(n, r, {delay: s=0, transitionOverride: l, type: u}={}) {
    let {transition: d=n.getDefaultTransition(), transitionEnd: f, ...h} = r;
    l && (d = l);
    const p = []
      , g = u && n.animationState && n.animationState.getState()[u];
    for (const y in h) {
        const v = n.getValue(y, n.latestValues[y] ?? null)
          , w = h[y];
        if (w === void 0 || g && _d(g, y))
            continue;
        const j = {
            delay: s,
            ...L5(d || {}, y)
        }
          , A = v.get();
        if (A !== void 0 && !v.isAnimating && !Array.isArray(w) && w === A && !j.velocity)
            continue;
        let P = !1;
        if (window.MotionHandoffAnimation) {
            const D = z9(n);
            if (D) {
                const V = window.MotionHandoffAnimation(D, y, T1);
                V !== null && (j.startTime = V,
                P = !0)
            }
        }
        n5(n, y),
        v.start(B5(y, v, w, n.shouldReduceMotion && o9.has(y) ? {
            type: !1
        } : j, n, P));
        const _ = v.animation;
        _ && p.push(_)
    }
    return f && Promise.all(p).then( () => {
        T1.update( () => {
            f && xd(n, f)
        }
        )
    }
    ),
    p
}
function U9(n, r, s, l=0, u=1) {
    const d = Array.from(n).sort( (g, y) => g.sortNodePosition(y)).indexOf(r)
      , f = n.size
      , h = (f - 1) * l;
    return typeof s == "function" ? s(d, f) : u === 1 ? d * l : h - d * l
}
function r5(n, r, s={}) {
    var p;
    const l = M3(n, r, s.type === "exit" ? (p = n.presenceContext) == null ? void 0 : p.custom : void 0);
    let {transition: u=n.getDefaultTransition() || {}} = l || {};
    s.transitionOverride && (u = s.transitionOverride);
    const d = l ? () => Promise.all(B9(n, l, s)) : () => Promise.resolve()
      , f = n.variantChildren && n.variantChildren.size ? (g=0) => {
        const {delayChildren: y=0, staggerChildren: v, staggerDirection: w} = u;
        return Rd(n, r, g, y, v, w, s)
    }
    : () => Promise.resolve()
      , {when: h} = u;
    if (h) {
        const [g,y] = h === "beforeChildren" ? [d, f] : [f, d];
        return g().then( () => y())
    } else
        return Promise.all([d(), f(s.delay)])
}
function Rd(n, r, s=0, l=0, u=0, d=1, f) {
    const h = [];
    for (const p of n.variantChildren)
        p.notify("AnimationStart", r),
        h.push(r5(p, r, {
            ...f,
            delay: s + (typeof l == "function" ? 0 : l) + U9(n.variantChildren, p, l, u, d)
        }).then( () => p.notify("AnimationComplete", r)));
    return Promise.all(h)
}
function Ad(n, r, s={}) {
    n.notify("AnimationStart", r);
    let l;
    if (Array.isArray(r)) {
        const u = r.map(d => r5(n, d, s));
        l = Promise.all(u)
    } else if (typeof r == "string")
        l = r5(n, r, s);
    else {
        const u = typeof r == "function" ? M3(n, r, s.custom) : r;
        l = Promise.all(B9(n, u, s))
    }
    return l.then( () => {
        n.notify("AnimationComplete", r)
    }
    )
}
function H9(n, r) {
    if (!Array.isArray(r))
        return !1;
    const s = r.length;
    if (s !== n.length)
        return !1;
    for (let l = 0; l < s; l++)
        if (r[l] !== n[l])
            return !1;
    return !0
}
const Dd = Z5.length;
function $9(n) {
    if (!n)
        return;
    if (!n.isControllingVariants) {
        const s = n.parent ? $9(n.parent) || {} : {};
        return n.props.initial !== void 0 && (s.initial = n.props.initial),
        s
    }
    const r = {};
    for (let s = 0; s < Dd; s++) {
        const l = Z5[s]
          , u = n.props[l];
        (An(u) || u === !1) && (r[l] = u)
    }
    return r
}
const Vd = [...V5].reverse()
  , Zd = V5.length;
function Od(n) {
    return r => Promise.all(r.map( ({animation: s, options: l}) => Ad(n, s, l)))
}
function Fd(n) {
    let r = Od(n)
      , s = R2()
      , l = !0;
    const u = p => (g, y) => {
        var w;
        const v = M3(n, y, p === "exit" ? (w = n.presenceContext) == null ? void 0 : w.custom : void 0);
        if (v) {
            const {transition: j, transitionEnd: A, ...P} = v;
            g = {
                ...g,
                ...P,
                ...A
            }
        }
        return g
    }
    ;
    function d(p) {
        r = p(n)
    }
    function f(p) {
        const {props: g} = n
          , y = $9(n.parent) || {}
          , v = []
          , w = new Set;
        let j = {}
          , A = 1 / 0;
        for (let _ = 0; _ < Zd; _++) {
            const D = Vd[_]
              , V = s[D]
              , N = g[D] !== void 0 ? g[D] : y[D]
              , X = An(N)
              , $ = D === p ? V.isActive : null;
            $ === !1 && (A = _);
            let t1 = N === y[D] && N !== g[D] && X;
            if (t1 && l && n.manuallyAnimateOnMount && (t1 = !1),
            V.protectedKeys = {
                ...j
            },
            !V.isActive && $ === null || !N && !V.prevProp || m7(N) || typeof N == "boolean")
                continue;
            const s1 = Nd(V.prevProp, N);
            let e1 = s1 || D === p && V.isActive && !t1 && X || _ > A && X
              , y1 = !1;
            const w1 = Array.isArray(N) ? N : [N];
            let b1 = w1.reduce(u(D), {});
            $ === !1 && (b1 = {});
            const {prevResolvedValues: H={}} = V
              , n1 = {
                ...H,
                ...b1
            }
              , f1 = q => {
                e1 = !0,
                w.has(q) && (y1 = !0,
                w.delete(q)),
                V.needsAnimating[q] = !0;
                const b = n.getValue(q);
                b && (b.liveStyle = !1)
            }
            ;
            for (const q in n1) {
                const b = b1[q]
                  , K = H[q];
                if (j.hasOwnProperty(q))
                    continue;
                let B = !1;
                t5(b) && t5(K) ? B = !H9(b, K) : B = b !== K,
                B ? b != null ? f1(q) : w.add(q) : b !== void 0 && w.has(q) ? f1(q) : V.protectedKeys[q] = !0
            }
            V.prevProp = N,
            V.prevResolvedValues = b1,
            V.isActive && (j = {
                ...j,
                ...b1
            }),
            l && n.blockInitialAnimation && (e1 = !1);
            const U = t1 && s1;
            e1 && (!U || y1) && v.push(...w1.map(q => {
                const b = {
                    type: D
                };
                if (typeof q == "string" && l && !U && n.manuallyAnimateOnMount && n.parent) {
                    const {parent: K} = n
                      , B = M3(K, q);
                    if (K.enteringChildren && B) {
                        const {delayChildren: S} = B.transition || {};
                        b.delay = U9(K.enteringChildren, n, S)
                    }
                }
                return {
                    animation: q,
                    options: b
                }
            }
            ))
        }
        if (w.size) {
            const _ = {};
            if (typeof g.initial != "boolean") {
                const D = M3(n, Array.isArray(g.initial) ? g.initial[0] : g.initial);
                D && D.transition && (_.transition = D.transition)
            }
            w.forEach(D => {
                const V = n.getBaseTarget(D)
                  , N = n.getValue(D);
                N && (N.liveStyle = !0),
                _[D] = V ?? null
            }
            ),
            v.push({
                animation: _
            })
        }
        let P = !!v.length;
        return l && (g.initial === !1 || g.initial === g.animate) && !n.manuallyAnimateOnMount && (P = !1),
        l = !1,
        P ? r(v) : Promise.resolve()
    }
    function h(p, g) {
        var v;
        if (s[p].isActive === g)
            return Promise.resolve();
        (v = n.variantChildren) == null || v.forEach(w => {
            var j;
            return (j = w.animationState) == null ? void 0 : j.setActive(p, g)
        }
        ),
        s[p].isActive = g;
        const y = f(p);
        for (const w in s)
            s[w].protectedKeys = {};
        return y
    }
    return {
        animateChanges: f,
        setActive: h,
        setAnimateFunction: d,
        getState: () => s,
        reset: () => {
            s = R2(),
            l = !0
        }
    }
}
function Nd(n, r) {
    return typeof r == "string" ? r !== n : Array.isArray(r) ? !H9(r, n) : !1
}
function bt(n=!1) {
    return {
        isActive: n,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
    }
}
function R2() {
    return {
        animate: bt(!0),
        whileInView: bt(),
        whileHover: bt(),
        whileTap: bt(),
        whileDrag: bt(),
        whileFocus: bt(),
        exit: bt()
    }
}
class St {
    constructor(r) {
        this.isMounted = !1,
        this.node = r
    }
    update() {}
}
class Id extends St {
    constructor(r) {
        super(r),
        r.animationState || (r.animationState = Fd(r))
    }
    updateAnimationControlsSubscription() {
        const {animate: r} = this.node.getProps();
        m7(r) && (this.unmountControls = r.subscribe(this.node))
    }
    mount() {
        this.updateAnimationControlsSubscription()
    }
    update() {
        const {animate: r} = this.node.getProps()
          , {animate: s} = this.node.prevProps || {};
        r !== s && this.updateAnimationControlsSubscription()
    }
    unmount() {
        var r;
        this.node.animationState.reset(),
        (r = this.unmountControls) == null || r.call(this)
    }
}
let bd = 0;
class zd extends St {
    constructor() {
        super(...arguments),
        this.id = bd++
    }
    update() {
        if (!this.node.presenceContext)
            return;
        const {isPresent: r, onExitComplete: s} = this.node.presenceContext
          , {isPresent: l} = this.node.prevPresenceContext || {};
        if (!this.node.animationState || r === l)
            return;
        const u = this.node.animationState.setActive("exit", !r);
        s && !r && u.then( () => {
            s(this.id)
        }
        )
    }
    mount() {
        const {register: r, onExitComplete: s} = this.node.presenceContext || {};
        s && s(this.id),
        r && (this.unmount = r(this.id))
    }
    unmount() {}
}
const Bd = {
    animation: {
        Feature: Id
    },
    exit: {
        Feature: zd
    }
};
function Vn(n, r, s, l={
    passive: !0
}) {
    return n.addEventListener(r, s, l),
    () => n.removeEventListener(r, s)
}
function Nn(n) {
    return {
        point: {
            x: n.pageX,
            y: n.pageY
        }
    }
}
const Ud = n => r => A5(r) && n(r, Nn(r));
function Sn(n, r, s, l) {
    return Vn(n, r, Ud(s), l)
}
const W9 = 1e-4
  , Hd = 1 - W9
  , $d = 1 + W9
  , K9 = .01
  , Wd = 0 - K9
  , Kd = 0 + K9;
function se(n) {
    return n.max - n.min
}
function Gd(n, r, s) {
    return Math.abs(n - r) <= s
}
function A2(n, r, s, l=.5) {
    n.origin = l,
    n.originPoint = R1(r.min, r.max, n.origin),
    n.scale = se(s) / se(r),
    n.translate = R1(s.min, s.max, n.origin) - n.originPoint,
    (n.scale >= Hd && n.scale <= $d || isNaN(n.scale)) && (n.scale = 1),
    (n.translate >= Wd && n.translate <= Kd || isNaN(n.translate)) && (n.translate = 0)
}
function jn(n, r, s, l) {
    A2(n.x, r.x, s.x, l ? l.originX : void 0),
    A2(n.y, r.y, s.y, l ? l.originY : void 0)
}
function D2(n, r, s) {
    n.min = s.min + r.min,
    n.max = n.min + se(r)
}
function Xd(n, r, s) {
    D2(n.x, r.x, s.x),
    D2(n.y, r.y, s.y)
}
function V2(n, r, s) {
    n.min = r.min - s.min,
    n.max = n.min + se(r)
}
function Tn(n, r, s) {
    V2(n.x, r.x, s.x),
    V2(n.y, r.y, s.y)
}
function Se(n) {
    return [n("x"), n("y")]
}
const G9 = ({current: n}) => n ? n.ownerDocument.defaultView : null
  , Z2 = (n, r) => Math.abs(n - r);
function Yd(n, r) {
    const s = Z2(n.x, r.x)
      , l = Z2(n.y, r.y);
    return Math.sqrt(s ** 2 + l ** 2)
}
class X9 {
    constructor(r, s, {transformPagePoint: l, contextWindow: u=window, dragSnapToOrigin: d=!1, distanceThreshold: f=3}={}) {
        if (this.startEvent = null,
        this.lastMoveEvent = null,
        this.lastMoveEventInfo = null,
        this.handlers = {},
        this.contextWindow = window,
        this.updatePoint = () => {
            if (!(this.lastMoveEvent && this.lastMoveEventInfo))
                return;
            const w = T0(this.lastMoveEventInfo, this.history)
              , j = this.startEvent !== null
              , A = Yd(w.offset, {
                x: 0,
                y: 0
            }) >= this.distanceThreshold;
            if (!j && !A)
                return;
            const {point: P} = w
              , {timestamp: _} = Y1;
            this.history.push({
                ...P,
                timestamp: _
            });
            const {onStart: D, onMove: V} = this.handlers;
            j || (D && D(this.lastMoveEvent, w),
            this.startEvent = this.lastMoveEvent),
            V && V(this.lastMoveEvent, w)
        }
        ,
        this.handlePointerMove = (w, j) => {
            this.lastMoveEvent = w,
            this.lastMoveEventInfo = j0(j, this.transformPagePoint),
            T1.update(this.updatePoint, !0)
        }
        ,
        this.handlePointerUp = (w, j) => {
            this.end();
            const {onEnd: A, onSessionEnd: P, resumeAnimation: _} = this.handlers;
            if (this.dragSnapToOrigin && _ && _(),
            !(this.lastMoveEvent && this.lastMoveEventInfo))
                return;
            const D = T0(w.type === "pointercancel" ? this.lastMoveEventInfo : j0(j, this.transformPagePoint), this.history);
            this.startEvent && A && A(w, D),
            P && P(w, D)
        }
        ,
        !A5(r))
            return;
        this.dragSnapToOrigin = d,
        this.handlers = s,
        this.transformPagePoint = l,
        this.distanceThreshold = f,
        this.contextWindow = u || window;
        const h = Nn(r)
          , p = j0(h, this.transformPagePoint)
          , {point: g} = p
          , {timestamp: y} = Y1;
        this.history = [{
            ...g,
            timestamp: y
        }];
        const {onSessionStart: v} = s;
        v && v(r, T0(p, this.history)),
        this.removeListeners = Zn(Sn(this.contextWindow, "pointermove", this.handlePointerMove), Sn(this.contextWindow, "pointerup", this.handlePointerUp), Sn(this.contextWindow, "pointercancel", this.handlePointerUp))
    }
    updateHandlers(r) {
        this.handlers = r
    }
    end() {
        this.removeListeners && this.removeListeners(),
        kt(this.updatePoint)
    }
}
function j0(n, r) {
    return r ? {
        point: r(n.point)
    } : n
}
function O2(n, r) {
    return {
        x: n.x - r.x,
        y: n.y - r.y
    }
}
function T0({point: n}, r) {
    return {
        point: n,
        delta: O2(n, Y9(r)),
        offset: O2(n, Qd(r)),
        velocity: qd(r, .1)
    }
}
function Qd(n) {
    return n[0]
}
function Y9(n) {
    return n[n.length - 1]
}
function qd(n, r) {
    if (n.length < 2)
        return {
            x: 0,
            y: 0
        };
    let s = n.length - 1
      , l = null;
    const u = Y9(n);
    for (; s >= 0 && (l = n[s],
    !(u.timestamp - l.timestamp > ze(r))); )
        s--;
    if (!l)
        return {
            x: 0,
            y: 0
        };
    const d = Be(u.timestamp - l.timestamp);
    if (d === 0)
        return {
            x: 0,
            y: 0
        };
    const f = {
        x: (u.x - l.x) / d,
        y: (u.y - l.y) / d
    };
    return f.x === 1 / 0 && (f.x = 0),
    f.y === 1 / 0 && (f.y = 0),
    f
}
function Jd(n, {min: r, max: s}, l) {
    return r !== void 0 && n < r ? n = l ? R1(r, n, l.min) : Math.max(n, r) : s !== void 0 && n > s && (n = l ? R1(s, n, l.max) : Math.min(n, s)),
    n
}
function F2(n, r, s) {
    return {
        min: r !== void 0 ? n.min + r : void 0,
        max: s !== void 0 ? n.max + s - (n.max - n.min) : void 0
    }
}
function eC(n, {top: r, left: s, bottom: l, right: u}) {
    return {
        x: F2(n.x, s, u),
        y: F2(n.y, r, l)
    }
}
function N2(n, r) {
    let s = r.min - n.min
      , l = r.max - n.max;
    return r.max - r.min < n.max - n.min && ([s,l] = [l, s]),
    {
        min: s,
        max: l
    }
}
function tC(n, r) {
    return {
        x: N2(n.x, r.x),
        y: N2(n.y, r.y)
    }
}
function nC(n, r) {
    let s = .5;
    const l = se(n)
      , u = se(r);
    return u > l ? s = Ln(r.min, r.max - l, n.min) : l > u && (s = Ln(n.min, n.max - u, r.min)),
    Je(0, 1, s)
}
function rC(n, r) {
    const s = {};
    return r.min !== void 0 && (s.min = r.min - n.min),
    r.max !== void 0 && (s.max = r.max - n.min),
    s
}
const i5 = .35;
function iC(n=i5) {
    return n === !1 ? n = 0 : n === !0 && (n = i5),
    {
        x: I2(n, "left", "right"),
        y: I2(n, "top", "bottom")
    }
}
function I2(n, r, s) {
    return {
        min: b2(n, r),
        max: b2(n, s)
    }
}
function b2(n, r) {
    return typeof n == "number" ? n : n[r] || 0
}
const sC = new WeakMap;
class oC {
    constructor(r) {
        this.openDragLock = null,
        this.isDragging = !1,
        this.currentDirection = null,
        this.originPoint = {
            x: 0,
            y: 0
        },
        this.constraints = !1,
        this.hasMutatedConstraints = !1,
        this.elastic = F1(),
        this.latestPointerEvent = null,
        this.latestPanInfo = null,
        this.visualElement = r
    }
    start(r, {snapToCursor: s=!1, distanceThreshold: l}={}) {
        const {presenceContext: u} = this.visualElement;
        if (u && u.isPresent === !1)
            return;
        const d = v => {
            const {dragSnapToOrigin: w} = this.getProps();
            w ? this.pauseAnimation() : this.stopAnimation(),
            s && this.snapToCursor(Nn(v).point)
        }
          , f = (v, w) => {
            const {drag: j, dragPropagation: A, onDragStart: P} = this.getProps();
            if (j && !A && (this.openDragLock && this.openDragLock(),
            this.openDragLock = of(j),
            !this.openDragLock))
                return;
            this.latestPointerEvent = v,
            this.latestPanInfo = w,
            this.isDragging = !0,
            this.currentDirection = null,
            this.resolveConstraints(),
            this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0,
            this.visualElement.projection.target = void 0),
            Se(D => {
                let V = this.getAxisMotionValue(D).get() || 0;
                if (Ue.test(V)) {
                    const {projection: N} = this.visualElement;
                    if (N && N.layout) {
                        const X = N.layout.layoutBox[D];
                        X && (V = se(X) * (parseFloat(V) / 100))
                    }
                }
                this.originPoint[D] = V
            }
            ),
            P && T1.postRender( () => P(v, w)),
            n5(this.visualElement, "transform");
            const {animationState: _} = this.visualElement;
            _ && _.setActive("whileDrag", !0)
        }
          , h = (v, w) => {
            this.latestPointerEvent = v,
            this.latestPanInfo = w;
            const {dragPropagation: j, dragDirectionLock: A, onDirectionLock: P, onDrag: _} = this.getProps();
            if (!j && !this.openDragLock)
                return;
            const {offset: D} = w;
            if (A && this.currentDirection === null) {
                this.currentDirection = lC(D),
                this.currentDirection !== null && P && P(this.currentDirection);
                return
            }
            this.updateAxis("x", w.point, D),
            this.updateAxis("y", w.point, D),
            this.visualElement.render(),
            _ && _(v, w)
        }
          , p = (v, w) => {
            this.latestPointerEvent = v,
            this.latestPanInfo = w,
            this.stop(v, w),
            this.latestPointerEvent = null,
            this.latestPanInfo = null
        }
          , g = () => Se(v => {
            var w;
            return this.getAnimationState(v) === "paused" && ((w = this.getAxisMotionValue(v).animation) == null ? void 0 : w.play())
        }
        )
          , {dragSnapToOrigin: y} = this.getProps();
        this.panSession = new X9(r,{
            onSessionStart: d,
            onStart: f,
            onMove: h,
            onSessionEnd: p,
            resumeAnimation: g
        },{
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin: y,
            distanceThreshold: l,
            contextWindow: G9(this.visualElement)
        })
    }
    stop(r, s) {
        const l = r || this.latestPointerEvent
          , u = s || this.latestPanInfo
          , d = this.isDragging;
        if (this.cancel(),
        !d || !u || !l)
            return;
        const {velocity: f} = u;
        this.startAnimation(f);
        const {onDragEnd: h} = this.getProps();
        h && T1.postRender( () => h(l, u))
    }
    cancel() {
        this.isDragging = !1;
        const {projection: r, animationState: s} = this.visualElement;
        r && (r.isAnimationBlocked = !1),
        this.panSession && this.panSession.end(),
        this.panSession = void 0;
        const {dragPropagation: l} = this.getProps();
        !l && this.openDragLock && (this.openDragLock(),
        this.openDragLock = null),
        s && s.setActive("whileDrag", !1)
    }
    updateAxis(r, s, l) {
        const {drag: u} = this.getProps();
        if (!l || !q4(r, u, this.currentDirection))
            return;
        const d = this.getAxisMotionValue(r);
        let f = this.originPoint[r] + l[r];
        this.constraints && this.constraints[r] && (f = Jd(f, this.constraints[r], this.elastic[r])),
        d.set(f)
    }
    resolveConstraints() {
        var d;
        const {dragConstraints: r, dragElastic: s} = this.getProps()
          , l = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (d = this.visualElement.projection) == null ? void 0 : d.layout
          , u = this.constraints;
        r && v3(r) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : r && l ? this.constraints = eC(l.layoutBox, r) : this.constraints = !1,
        this.elastic = iC(s),
        u !== this.constraints && l && this.constraints && !this.hasMutatedConstraints && Se(f => {
            this.constraints !== !1 && this.getAxisMotionValue(f) && (this.constraints[f] = rC(l.layoutBox[f], this.constraints[f]))
        }
        )
    }
    resolveRefConstraints() {
        const {dragConstraints: r, onMeasureDragConstraints: s} = this.getProps();
        if (!r || !v3(r))
            return !1;
        const l = r.current
          , {projection: u} = this.visualElement;
        if (!u || !u.layout)
            return !1;
        const d = ad(l, u.root, this.visualElement.getTransformPagePoint());
        let f = tC(u.layout.layoutBox, d);
        if (s) {
            const h = s(sd(f));
            this.hasMutatedConstraints = !!h,
            h && (f = D9(h))
        }
        return f
    }
    startAnimation(r) {
        const {drag: s, dragMomentum: l, dragElastic: u, dragTransition: d, dragSnapToOrigin: f, onDragTransitionEnd: h} = this.getProps()
          , p = this.constraints || {}
          , g = Se(y => {
            if (!q4(y, s, this.currentDirection))
                return;
            let v = p && p[y] || {};
            f && (v = {
                min: 0,
                max: 0
            });
            const w = u ? 200 : 1e6
              , j = u ? 40 : 1e7
              , A = {
                type: "inertia",
                velocity: l ? r[y] : 0,
                bounceStiffness: w,
                bounceDamping: j,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...d,
                ...v
            };
            return this.startAxisValueAnimation(y, A)
        }
        );
        return Promise.all(g).then(h)
    }
    startAxisValueAnimation(r, s) {
        const l = this.getAxisMotionValue(r);
        return n5(this.visualElement, r),
        l.start(B5(r, l, 0, s, this.visualElement, !1))
    }
    stopAnimation() {
        Se(r => this.getAxisMotionValue(r).stop())
    }
    pauseAnimation() {
        Se(r => {
            var s;
            return (s = this.getAxisMotionValue(r).animation) == null ? void 0 : s.pause()
        }
        )
    }
    getAnimationState(r) {
        var s;
        return (s = this.getAxisMotionValue(r).animation) == null ? void 0 : s.state
    }
    getAxisMotionValue(r) {
        const s = `_drag${r.toUpperCase()}`
          , l = this.visualElement.getProps()
          , u = l[s];
        return u || this.visualElement.getValue(r, (l.initial ? l.initial[r] : void 0) || 0)
    }
    snapToCursor(r) {
        Se(s => {
            const {drag: l} = this.getProps();
            if (!q4(s, l, this.currentDirection))
                return;
            const {projection: u} = this.visualElement
              , d = this.getAxisMotionValue(s);
            if (u && u.layout) {
                const {min: f, max: h} = u.layout.layoutBox[s];
                d.set(r[s] - R1(f, h, .5))
            }
        }
        )
    }
    scalePositionWithinConstraints() {
        if (!this.visualElement.current)
            return;
        const {drag: r, dragConstraints: s} = this.getProps()
          , {projection: l} = this.visualElement;
        if (!v3(s) || !l || !this.constraints)
            return;
        this.stopAnimation();
        const u = {
            x: 0,
            y: 0
        };
        Se(f => {
            const h = this.getAxisMotionValue(f);
            if (h && this.constraints !== !1) {
                const p = h.get();
                u[f] = nC({
                    min: p,
                    max: p
                }, this.constraints[f])
            }
        }
        );
        const {transformTemplate: d} = this.visualElement.getProps();
        this.visualElement.current.style.transform = d ? d({}, "") : "none",
        l.root && l.root.updateScroll(),
        l.updateLayout(),
        this.resolveConstraints(),
        Se(f => {
            if (!q4(f, r, null))
                return;
            const h = this.getAxisMotionValue(f)
              , {min: p, max: g} = this.constraints[f];
            h.set(R1(p, g, u[f]))
        }
        )
    }
    addListeners() {
        if (!this.visualElement.current)
            return;
        sC.set(this.visualElement, this);
        const r = this.visualElement.current
          , s = Sn(r, "pointerdown", p => {
            const {drag: g, dragListener: y=!0} = this.getProps();
            g && y && this.start(p)
        }
        )
          , l = () => {
            const {dragConstraints: p} = this.getProps();
            v3(p) && p.current && (this.constraints = this.resolveRefConstraints())
        }
          , {projection: u} = this.visualElement
          , d = u.addEventListener("measure", l);
        u && !u.layout && (u.root && u.root.updateScroll(),
        u.updateLayout()),
        T1.read(l);
        const f = Vn(window, "resize", () => this.scalePositionWithinConstraints())
          , h = u.addEventListener("didUpdate", ( ({delta: p, hasLayoutChanged: g}) => {
            this.isDragging && g && (Se(y => {
                const v = this.getAxisMotionValue(y);
                v && (this.originPoint[y] += p[y].translate,
                v.set(v.get() + p[y].translate))
            }
            ),
            this.visualElement.render())
        }
        ));
        return () => {
            f(),
            s(),
            d(),
            h && h()
        }
    }
    getProps() {
        const r = this.visualElement.getProps()
          , {drag: s=!1, dragDirectionLock: l=!1, dragPropagation: u=!1, dragConstraints: d=!1, dragElastic: f=i5, dragMomentum: h=!0} = r;
        return {
            ...r,
            drag: s,
            dragDirectionLock: l,
            dragPropagation: u,
            dragConstraints: d,
            dragElastic: f,
            dragMomentum: h
        }
    }
}
function q4(n, r, s) {
    return (r === !0 || r === n) && (s === null || s === n)
}
function lC(n, r=10) {
    let s = null;
    return Math.abs(n.y) > r ? s = "y" : Math.abs(n.x) > r && (s = "x"),
    s
}
class aC extends St {
    constructor(r) {
        super(r),
        this.removeGroupControls = je,
        this.removeListeners = je,
        this.controls = new oC(r)
    }
    mount() {
        const {dragControls: r} = this.node.getProps();
        r && (this.removeGroupControls = r.subscribe(this.controls)),
        this.removeListeners = this.controls.addListeners() || je
    }
    unmount() {
        this.removeGroupControls(),
        this.removeListeners()
    }
}
const z2 = n => (r, s) => {
    n && T1.postRender( () => n(r, s))
}
;
class uC extends St {
    constructor() {
        super(...arguments),
        this.removePointerDownListener = je
    }
    onPointerDown(r) {
        this.session = new X9(r,this.createPanHandlers(),{
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: G9(this.node)
        })
    }
    createPanHandlers() {
        const {onPanSessionStart: r, onPanStart: s, onPan: l, onPanEnd: u} = this.node.getProps();
        return {
            onSessionStart: z2(r),
            onStart: z2(s),
            onMove: l,
            onEnd: (d, f) => {
                delete this.session,
                u && T1.postRender( () => u(d, f))
            }
        }
    }
    mount() {
        this.removePointerDownListener = Sn(this.node.current, "pointerdown", r => this.onPointerDown(r))
    }
    update() {
        this.session && this.session.updateHandlers(this.createPanHandlers())
    }
    unmount() {
        this.removePointerDownListener(),
        this.session && this.session.end()
    }
}
const o7 = {
    hasAnimatedSinceResize: !0,
    hasEverUpdated: !1
};
function B2(n, r) {
    return r.max === r.min ? 0 : n / (r.max - r.min) * 100
}
const vn = {
    correct: (n, r) => {
        if (!r.target)
            return n;
        if (typeof n == "string")
            if (o1.test(n))
                n = parseFloat(n);
            else
                return n;
        const s = B2(n, r.target.x)
          , l = B2(n, r.target.y);
        return `${s}% ${l}%`
    }
}
  , cC = {
    correct: (n, {treeScale: r, projectionDelta: s}) => {
        const l = n
          , u = Mt.parse(n);
        if (u.length > 5)
            return l;
        const d = Mt.createTransformer(n)
          , f = typeof u[0] != "number" ? 1 : 0
          , h = s.x.scale * r.x
          , p = s.y.scale * r.y;
        u[0 + f] /= h,
        u[1 + f] /= p;
        const g = R1(h, p, .5);
        return typeof u[2 + f] == "number" && (u[2 + f] /= g),
        typeof u[3 + f] == "number" && (u[3 + f] /= g),
        d(u)
    }
};
let E0 = !1;
class fC extends R.Component {
    componentDidMount() {
        const {visualElement: r, layoutGroup: s, switchLayoutGroup: l, layoutId: u} = this.props
          , {projection: d} = r;
        Df(dC),
        d && (s.group && s.group.add(d),
        l && l.register && u && l.register(d),
        E0 && d.root.didUpdate(),
        d.addEventListener("animationComplete", () => {
            this.safeToRemove()
        }
        ),
        d.setOptions({
            ...d.options,
            onExitComplete: () => this.safeToRemove()
        })),
        o7.hasEverUpdated = !0
    }
    getSnapshotBeforeUpdate(r) {
        const {layoutDependency: s, visualElement: l, drag: u, isPresent: d} = this.props
          , {projection: f} = l;
        return f && (f.isPresent = d,
        E0 = !0,
        u || r.layoutDependency !== s || s === void 0 || r.isPresent !== d ? f.willUpdate() : this.safeToRemove(),
        r.isPresent !== d && (d ? f.promote() : f.relegate() || T1.postRender( () => {
            const h = f.getStack();
            (!h || !h.members.length) && this.safeToRemove()
        }
        ))),
        null
    }
    componentDidUpdate() {
        const {projection: r} = this.props.visualElement;
        r && (r.root.didUpdate(),
        R5.postRender( () => {
            !r.currentAnimation && r.isLead() && this.safeToRemove()
        }
        ))
    }
    componentWillUnmount() {
        const {visualElement: r, layoutGroup: s, switchLayoutGroup: l} = this.props
          , {projection: u} = r;
        E0 = !0,
        u && (u.scheduleCheckAfterUnmount(),
        s && s.group && s.group.remove(u),
        l && l.deregister && l.deregister(u))
    }
    safeToRemove() {
        const {safeToRemove: r} = this.props;
        r && r()
    }
    render() {
        return null
    }
}
function Q9(n) {
    const [r,s] = y9()
      , l = R.useContext(Pn);
    return C.jsx(fC, {
        ...n,
        layoutGroup: l,
        switchLayoutGroup: R.useContext(R9),
        isPresent: r,
        safeToRemove: s
    })
}
const dC = {
    borderRadius: {
        ...vn,
        applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
    },
    borderTopLeftRadius: vn,
    borderTopRightRadius: vn,
    borderBottomLeftRadius: vn,
    borderBottomRightRadius: vn,
    boxShadow: cC
};
function CC(n, r, s) {
    const l = te(n) ? n : S3(n);
    return l.start(B5("", l, r, s)),
    l.animation
}
const hC = (n, r) => n.depth - r.depth;
class pC {
    constructor() {
        this.children = [],
        this.isDirty = !1
    }
    add(r) {
        d5(this.children, r),
        this.isDirty = !0
    }
    remove(r) {
        C5(this.children, r),
        this.isDirty = !0
    }
    forEach(r) {
        this.isDirty && this.children.sort(hC),
        this.isDirty = !1,
        this.children.forEach(r)
    }
}
function mC(n, r) {
    const s = de.now()
      , l = ({timestamp: u}) => {
        const d = u - s;
        d >= r && (kt(l),
        n(d - r))
    }
    ;
    return T1.setup(l, !0),
    () => kt(l)
}
const q9 = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"]
  , yC = q9.length
  , U2 = n => typeof n == "string" ? parseFloat(n) : n
  , H2 = n => typeof n == "number" || o1.test(n);
function gC(n, r, s, l, u, d) {
    u ? (n.opacity = R1(0, s.opacity ?? 1, vC(l)),
    n.opacityExit = R1(r.opacity ?? 1, 0, xC(l))) : d && (n.opacity = R1(r.opacity ?? 1, s.opacity ?? 1, l));
    for (let f = 0; f < yC; f++) {
        const h = `border${q9[f]}Radius`;
        let p = $2(r, h)
          , g = $2(s, h);
        if (p === void 0 && g === void 0)
            continue;
        p || (p = 0),
        g || (g = 0),
        p === 0 || g === 0 || H2(p) === H2(g) ? (n[h] = Math.max(R1(U2(p), U2(g), l), 0),
        (Ue.test(g) || Ue.test(p)) && (n[h] += "%")) : n[h] = g
    }
    (r.rotate || s.rotate) && (n.rotate = R1(r.rotate || 0, s.rotate || 0, l))
}
function $2(n, r) {
    return n[r] !== void 0 ? n[r] : n.borderRadius
}
const vC = J9(0, .5, Fs)
  , xC = J9(.5, .95, je);
function J9(n, r, s) {
    return l => l < n ? 0 : l > r ? 1 : s(Ln(n, r, l))
}
function W2(n, r) {
    n.min = r.min,
    n.max = r.max
}
function Me(n, r) {
    W2(n.x, r.x),
    W2(n.y, r.y)
}
function K2(n, r) {
    n.translate = r.translate,
    n.scale = r.scale,
    n.originPoint = r.originPoint,
    n.origin = r.origin
}
function G2(n, r, s, l, u) {
    return n -= r,
    n = d7(n, 1 / s, l),
    u !== void 0 && (n = d7(n, 1 / u, l)),
    n
}
function wC(n, r=0, s=1, l=.5, u, d=n, f=n) {
    if (Ue.test(r) && (r = parseFloat(r),
    r = R1(f.min, f.max, r / 100) - f.min),
    typeof r != "number")
        return;
    let h = R1(d.min, d.max, l);
    n === d && (h -= r),
    n.min = G2(n.min, r, s, h, u),
    n.max = G2(n.max, r, s, h, u)
}
function X2(n, r, [s,l,u], d, f) {
    wC(n, r[s], r[l], r[u], r.scale, d, f)
}
const kC = ["x", "scaleX", "originX"]
  , MC = ["y", "scaleY", "originY"];
function Y2(n, r, s, l) {
    X2(n.x, r, kC, s ? s.x : void 0, l ? l.x : void 0),
    X2(n.y, r, MC, s ? s.y : void 0, l ? l.y : void 0)
}
function Q2(n) {
    return n.translate === 0 && n.scale === 1
}
function eo(n) {
    return Q2(n.x) && Q2(n.y)
}
function q2(n, r) {
    return n.min === r.min && n.max === r.max
}
function SC(n, r) {
    return q2(n.x, r.x) && q2(n.y, r.y)
}
function J2(n, r) {
    return Math.round(n.min) === Math.round(r.min) && Math.round(n.max) === Math.round(r.max)
}
function to(n, r) {
    return J2(n.x, r.x) && J2(n.y, r.y)
}
function es(n) {
    return se(n.x) / se(n.y)
}
function ts(n, r) {
    return n.translate === r.translate && n.scale === r.scale && n.originPoint === r.originPoint
}
class jC {
    constructor() {
        this.members = []
    }
    add(r) {
        d5(this.members, r),
        r.scheduleRender()
    }
    remove(r) {
        if (C5(this.members, r),
        r === this.prevLead && (this.prevLead = void 0),
        r === this.lead) {
            const s = this.members[this.members.length - 1];
            s && this.promote(s)
        }
    }
    relegate(r) {
        const s = this.members.findIndex(u => r === u);
        if (s === 0)
            return !1;
        let l;
        for (let u = s; u >= 0; u--) {
            const d = this.members[u];
            if (d.isPresent !== !1) {
                l = d;
                break
            }
        }
        return l ? (this.promote(l),
        !0) : !1
    }
    promote(r, s) {
        const l = this.lead;
        if (r !== l && (this.prevLead = l,
        this.lead = r,
        r.show(),
        l)) {
            l.instance && l.scheduleRender(),
            r.scheduleRender(),
            r.resumeFrom = l,
            s && (r.resumeFrom.preserveOpacity = !0),
            l.snapshot && (r.snapshot = l.snapshot,
            r.snapshot.latestValues = l.animationValues || l.latestValues),
            r.root && r.root.isUpdating && (r.isLayoutDirty = !0);
            const {crossfade: u} = r.options;
            u === !1 && l.hide()
        }
    }
    exitAnimationComplete() {
        this.members.forEach(r => {
            const {options: s, resumingFrom: l} = r;
            s.onExitComplete && s.onExitComplete(),
            l && l.options.onExitComplete && l.options.onExitComplete()
        }
        )
    }
    scheduleRender() {
        this.members.forEach(r => {
            r.instance && r.scheduleRender(!1)
        }
        )
    }
    removeLeadSnapshot() {
        this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
    }
}
function TC(n, r, s) {
    let l = "";
    const u = n.x.translate / r.x
      , d = n.y.translate / r.y
      , f = (s == null ? void 0 : s.z) || 0;
    if ((u || d || f) && (l = `translate3d(${u}px, ${d}px, ${f}px) `),
    (r.x !== 1 || r.y !== 1) && (l += `scale(${1 / r.x}, ${1 / r.y}) `),
    s) {
        const {transformPerspective: g, rotate: y, rotateX: v, rotateY: w, skewX: j, skewY: A} = s;
        g && (l = `perspective(${g}px) ${l}`),
        y && (l += `rotate(${y}deg) `),
        v && (l += `rotateX(${v}deg) `),
        w && (l += `rotateY(${w}deg) `),
        j && (l += `skewX(${j}deg) `),
        A && (l += `skewY(${A}deg) `)
    }
    const h = n.x.scale * r.x
      , p = n.y.scale * r.y;
    return (h !== 1 || p !== 1) && (l += `scale(${h}, ${p})`),
    l || "none"
}
const P0 = ["", "X", "Y", "Z"]
  , EC = 1e3;
let PC = 0;
function L0(n, r, s, l) {
    const {latestValues: u} = r;
    u[n] && (s[n] = u[n],
    r.setStaticValue(n, 0),
    l && (l[n] = 0))
}
function no(n) {
    if (n.hasCheckedOptimisedAppear = !0,
    n.root === n)
        return;
    const {visualElement: r} = n.options;
    if (!r)
        return;
    const s = z9(r);
    if (window.MotionHasOptimisedAnimation(s, "transform")) {
        const {layout: u, layoutId: d} = n.options;
        window.MotionCancelOptimisedAnimation(s, "transform", T1, !(u || d))
    }
    const {parent: l} = n;
    l && !l.hasCheckedOptimisedAppear && no(l)
}
function ro({attachResizeListener: n, defaultParent: r, measureScroll: s, checkIsScrollRoot: l, resetTransform: u}) {
    return class {
        constructor(f={}, h=r == null ? void 0 : r()) {
            this.id = PC++,
            this.animationId = 0,
            this.animationCommitId = 0,
            this.children = new Set,
            this.options = {},
            this.isTreeAnimating = !1,
            this.isAnimationBlocked = !1,
            this.isLayoutDirty = !1,
            this.isProjectionDirty = !1,
            this.isSharedProjectionDirty = !1,
            this.isTransformDirty = !1,
            this.updateManuallyBlocked = !1,
            this.updateBlockedByResize = !1,
            this.isUpdating = !1,
            this.isSVG = !1,
            this.needsReset = !1,
            this.shouldResetTransform = !1,
            this.hasCheckedOptimisedAppear = !1,
            this.treeScale = {
                x: 1,
                y: 1
            },
            this.eventHandlers = new Map,
            this.hasTreeAnimated = !1,
            this.updateScheduled = !1,
            this.scheduleUpdate = () => this.update(),
            this.projectionUpdateScheduled = !1,
            this.checkUpdateFailed = () => {
                this.isUpdating && (this.isUpdating = !1,
                this.clearAllSnapshots())
            }
            ,
            this.updateProjection = () => {
                this.projectionUpdateScheduled = !1,
                this.nodes.forEach(RC),
                this.nodes.forEach(ZC),
                this.nodes.forEach(OC),
                this.nodes.forEach(AC)
            }
            ,
            this.resolvedRelativeTargetAt = 0,
            this.hasProjected = !1,
            this.isVisible = !0,
            this.animationProgress = 0,
            this.sharedNodes = new Map,
            this.latestValues = f,
            this.root = h ? h.root || h : this,
            this.path = h ? [...h.path, h] : [],
            this.parent = h,
            this.depth = h ? h.depth + 1 : 0;
            for (let p = 0; p < this.path.length; p++)
                this.path[p].shouldResetTransform = !0;
            this.root === this && (this.nodes = new pC)
        }
        addEventListener(f, h) {
            return this.eventHandlers.has(f) || this.eventHandlers.set(f, new m5),
            this.eventHandlers.get(f).add(h)
        }
        notifyListeners(f, ...h) {
            const p = this.eventHandlers.get(f);
            p && p.notify(...h)
        }
        hasListeners(f) {
            return this.eventHandlers.has(f)
        }
        mount(f) {
            if (this.instance)
                return;
            this.isSVG = m9(f) && !df(f),
            this.instance = f;
            const {layoutId: h, layout: p, visualElement: g} = this.options;
            if (g && !g.current && g.mount(f),
            this.root.nodes.add(this),
            this.parent && this.parent.children.add(this),
            this.root.hasTreeAnimated && (p || h) && (this.isLayoutDirty = !0),
            n) {
                let y, v = 0;
                const w = () => this.root.updateBlockedByResize = !1;
                T1.read( () => {
                    v = window.innerWidth
                }
                ),
                n(f, () => {
                    const j = window.innerWidth;
                    j !== v && (v = j,
                    this.root.updateBlockedByResize = !0,
                    y && y(),
                    y = mC(w, 250),
                    o7.hasAnimatedSinceResize && (o7.hasAnimatedSinceResize = !1,
                    this.nodes.forEach(is)))
                }
                )
            }
            h && this.root.registerSharedNode(h, this),
            this.options.animate !== !1 && g && (h || p) && this.addEventListener("didUpdate", ({delta: y, hasLayoutChanged: v, hasRelativeLayoutChanged: w, layout: j}) => {
                if (this.isTreeAnimationBlocked()) {
                    this.target = void 0,
                    this.relativeTarget = void 0;
                    return
                }
                const A = this.options.transition || g.getDefaultTransition() || zC
                  , {onLayoutAnimationStart: P, onLayoutAnimationComplete: _} = g.getProps()
                  , D = !this.targetLayout || !to(this.targetLayout, j)
                  , V = !v && w;
                if (this.options.layoutRoot || this.resumeFrom || V || v && (D || !this.currentAnimation)) {
                    this.resumeFrom && (this.resumingFrom = this.resumeFrom,
                    this.resumingFrom.resumingFrom = void 0);
                    const N = {
                        ...L5(A, "layout"),
                        onPlay: P,
                        onComplete: _
                    };
                    (g.shouldReduceMotion || this.options.layoutRoot) && (N.delay = 0,
                    N.type = !1),
                    this.startAnimation(N),
                    this.setAnimationOrigin(y, V)
                } else
                    v || is(this),
                    this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
                this.targetLayout = j
            }
            )
        }
        unmount() {
            this.options.layoutId && this.willUpdate(),
            this.root.nodes.remove(this);
            const f = this.getStack();
            f && f.remove(this),
            this.parent && this.parent.children.delete(this),
            this.instance = void 0,
            this.eventHandlers.clear(),
            kt(this.updateProjection)
        }
        blockUpdate() {
            this.updateManuallyBlocked = !0
        }
        unblockUpdate() {
            this.updateManuallyBlocked = !1
        }
        isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize
        }
        isTreeAnimationBlocked() {
            return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1
        }
        startUpdate() {
            this.isUpdateBlocked() || (this.isUpdating = !0,
            this.nodes && this.nodes.forEach(FC),
            this.animationId++)
        }
        getTransformTemplate() {
            const {visualElement: f} = this.options;
            return f && f.getProps().transformTemplate
        }
        willUpdate(f=!0) {
            if (this.root.hasTreeAnimated = !0,
            this.root.isUpdateBlocked()) {
                this.options.onExitComplete && this.options.onExitComplete();
                return
            }
            if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && no(this),
            !this.root.isUpdating && this.root.startUpdate(),
            this.isLayoutDirty)
                return;
            this.isLayoutDirty = !0;
            for (let y = 0; y < this.path.length; y++) {
                const v = this.path[y];
                v.shouldResetTransform = !0,
                v.updateScroll("snapshot"),
                v.options.layoutRoot && v.willUpdate(!1)
            }
            const {layoutId: h, layout: p} = this.options;
            if (h === void 0 && !p)
                return;
            const g = this.getTransformTemplate();
            this.prevTransformTemplateValue = g ? g(this.latestValues, "") : void 0,
            this.updateSnapshot(),
            f && this.notifyListeners("willUpdate")
        }
        update() {
            if (this.updateScheduled = !1,
            this.isUpdateBlocked()) {
                this.unblockUpdate(),
                this.clearAllSnapshots(),
                this.nodes.forEach(ns);
                return
            }
            if (this.animationId <= this.animationCommitId) {
                this.nodes.forEach(rs);
                return
            }
            this.animationCommitId = this.animationId,
            this.isUpdating ? (this.isUpdating = !1,
            this.nodes.forEach(VC),
            this.nodes.forEach(LC),
            this.nodes.forEach(_C)) : this.nodes.forEach(rs),
            this.clearAllSnapshots();
            const h = de.now();
            Y1.delta = Je(0, 1e3 / 60, h - Y1.timestamp),
            Y1.timestamp = h,
            Y1.isProcessing = !0,
            y0.update.process(Y1),
            y0.preRender.process(Y1),
            y0.render.process(Y1),
            Y1.isProcessing = !1
        }
        didUpdate() {
            this.updateScheduled || (this.updateScheduled = !0,
            R5.read(this.scheduleUpdate))
        }
        clearAllSnapshots() {
            this.nodes.forEach(DC),
            this.sharedNodes.forEach(NC)
        }
        scheduleUpdateProjection() {
            this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0,
            T1.preRender(this.updateProjection, !1, !0))
        }
        scheduleCheckAfterUnmount() {
            T1.postRender( () => {
                this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
            }
            )
        }
        updateSnapshot() {
            this.snapshot || !this.instance || (this.snapshot = this.measure(),
            this.snapshot && !se(this.snapshot.measuredBox.x) && !se(this.snapshot.measuredBox.y) && (this.snapshot = void 0))
        }
        updateLayout() {
            if (!this.instance || (this.updateScroll(),
            !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
                return;
            if (this.resumeFrom && !this.resumeFrom.instance)
                for (let p = 0; p < this.path.length; p++)
                    this.path[p].updateScroll();
            const f = this.layout;
            this.layout = this.measure(!1),
            this.layoutCorrected = F1(),
            this.isLayoutDirty = !1,
            this.projectionDelta = void 0,
            this.notifyListeners("measure", this.layout.layoutBox);
            const {visualElement: h} = this.options;
            h && h.notify("LayoutMeasure", this.layout.layoutBox, f ? f.layoutBox : void 0)
        }
        updateScroll(f="measure") {
            let h = !!(this.options.layoutScroll && this.instance);
            if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === f && (h = !1),
            h && this.instance) {
                const p = l(this.instance);
                this.scroll = {
                    animationId: this.root.animationId,
                    phase: f,
                    isRoot: p,
                    offset: s(this.instance),
                    wasRoot: this.scroll ? this.scroll.isRoot : p
                }
            }
        }
        resetTransform() {
            if (!u)
                return;
            const f = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout
              , h = this.projectionDelta && !eo(this.projectionDelta)
              , p = this.getTransformTemplate()
              , g = p ? p(this.latestValues, "") : void 0
              , y = g !== this.prevTransformTemplateValue;
            f && this.instance && (h || zt(this.latestValues) || y) && (u(this.instance, g),
            this.shouldResetTransform = !1,
            this.scheduleRender())
        }
        measure(f=!0) {
            const h = this.measurePageBox();
            let p = this.removeElementScroll(h);
            return f && (p = this.removeTransform(p)),
            BC(p),
            {
                animationId: this.root.animationId,
                measuredBox: h,
                layoutBox: p,
                latestValues: {},
                source: this.id
            }
        }
        measurePageBox() {
            var g;
            const {visualElement: f} = this.options;
            if (!f)
                return F1();
            const h = f.measureViewportBox();
            if (!(((g = this.scroll) == null ? void 0 : g.wasRoot) || this.path.some(UC))) {
                const {scroll: y} = this.root;
                y && (x3(h.x, y.offset.x),
                x3(h.y, y.offset.y))
            }
            return h
        }
        removeElementScroll(f) {
            var p;
            const h = F1();
            if (Me(h, f),
            (p = this.scroll) != null && p.wasRoot)
                return h;
            for (let g = 0; g < this.path.length; g++) {
                const y = this.path[g]
                  , {scroll: v, options: w} = y;
                y !== this.root && v && w.layoutScroll && (v.wasRoot && Me(h, f),
                x3(h.x, v.offset.x),
                x3(h.y, v.offset.y))
            }
            return h
        }
        applyTransform(f, h=!1) {
            const p = F1();
            Me(p, f);
            for (let g = 0; g < this.path.length; g++) {
                const y = this.path[g];
                !h && y.options.layoutScroll && y.scroll && y !== y.root && w3(p, {
                    x: -y.scroll.offset.x,
                    y: -y.scroll.offset.y
                }),
                zt(y.latestValues) && w3(p, y.latestValues)
            }
            return zt(this.latestValues) && w3(p, this.latestValues),
            p
        }
        removeTransform(f) {
            const h = F1();
            Me(h, f);
            for (let p = 0; p < this.path.length; p++) {
                const g = this.path[p];
                if (!g.instance || !zt(g.latestValues))
                    continue;
                q0(g.latestValues) && g.updateSnapshot();
                const y = F1()
                  , v = g.measurePageBox();
                Me(y, v),
                Y2(h, g.latestValues, g.snapshot ? g.snapshot.layoutBox : void 0, y)
            }
            return zt(this.latestValues) && Y2(h, this.latestValues),
            h
        }
        setTargetDelta(f) {
            this.targetDelta = f,
            this.root.scheduleUpdateProjection(),
            this.isProjectionDirty = !0
        }
        setOptions(f) {
            this.options = {
                ...this.options,
                ...f,
                crossfade: f.crossfade !== void 0 ? f.crossfade : !0
            }
        }
        clearMeasurements() {
            this.scroll = void 0,
            this.layout = void 0,
            this.snapshot = void 0,
            this.prevTransformTemplateValue = void 0,
            this.targetDelta = void 0,
            this.target = void 0,
            this.isLayoutDirty = !1
        }
        forceRelativeParentToResolveTarget() {
            this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Y1.timestamp && this.relativeParent.resolveTargetDelta(!0)
        }
        resolveTargetDelta(f=!1) {
            var w;
            const h = this.getLead();
            this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty),
            this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty),
            this.isSharedProjectionDirty || (this.isSharedProjectionDirty = h.isSharedProjectionDirty);
            const p = !!this.resumingFrom || this !== h;
            if (!(f || p && this.isSharedProjectionDirty || this.isProjectionDirty || (w = this.parent) != null && w.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
                return;
            const {layout: y, layoutId: v} = this.options;
            if (!(!this.layout || !(y || v))) {
                if (this.resolvedRelativeTargetAt = Y1.timestamp,
                !this.targetDelta && !this.relativeTarget) {
                    const j = this.getClosestProjectingParent();
                    j && j.layout && this.animationProgress !== 1 ? (this.relativeParent = j,
                    this.forceRelativeParentToResolveTarget(),
                    this.relativeTarget = F1(),
                    this.relativeTargetOrigin = F1(),
                    Tn(this.relativeTargetOrigin, this.layout.layoutBox, j.layout.layoutBox),
                    Me(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0
                }
                if (!(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = F1(),
                this.targetWithTransforms = F1()),
                this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(),
                Xd(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : Me(this.target, this.layout.layoutBox),
                Z9(this.target, this.targetDelta)) : Me(this.target, this.layout.layoutBox),
                this.attemptToResolveRelativeTarget)) {
                    this.attemptToResolveRelativeTarget = !1;
                    const j = this.getClosestProjectingParent();
                    j && !!j.resumingFrom == !!this.resumingFrom && !j.options.layoutScroll && j.target && this.animationProgress !== 1 ? (this.relativeParent = j,
                    this.forceRelativeParentToResolveTarget(),
                    this.relativeTarget = F1(),
                    this.relativeTargetOrigin = F1(),
                    Tn(this.relativeTargetOrigin, this.target, j.target),
                    Me(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0
                }
            }
        }
        getClosestProjectingParent() {
            if (!(!this.parent || q0(this.parent.latestValues) || V9(this.parent.latestValues)))
                return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent()
        }
        isProjecting() {
            return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
        }
        calcProjection() {
            var A;
            const f = this.getLead()
              , h = !!this.resumingFrom || this !== f;
            let p = !0;
            if ((this.isProjectionDirty || (A = this.parent) != null && A.isProjectionDirty) && (p = !1),
            h && (this.isSharedProjectionDirty || this.isTransformDirty) && (p = !1),
            this.resolvedRelativeTargetAt === Y1.timestamp && (p = !1),
            p)
                return;
            const {layout: g, layoutId: y} = this.options;
            if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation),
            this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
            !this.layout || !(g || y))
                return;
            Me(this.layoutCorrected, this.layout.layoutBox);
            const v = this.treeScale.x
              , w = this.treeScale.y;
            ld(this.layoutCorrected, this.treeScale, this.path, h),
            f.layout && !f.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (f.target = f.layout.layoutBox,
            f.targetWithTransforms = F1());
            const {target: j} = f;
            if (!j) {
                this.prevProjectionDelta && (this.createProjectionDeltas(),
                this.scheduleRender());
                return
            }
            !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (K2(this.prevProjectionDelta.x, this.projectionDelta.x),
            K2(this.prevProjectionDelta.y, this.projectionDelta.y)),
            jn(this.projectionDelta, this.layoutCorrected, j, this.latestValues),
            (this.treeScale.x !== v || this.treeScale.y !== w || !ts(this.projectionDelta.x, this.prevProjectionDelta.x) || !ts(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0,
            this.scheduleRender(),
            this.notifyListeners("projectionUpdate", j))
        }
        hide() {
            this.isVisible = !1
        }
        show() {
            this.isVisible = !0
        }
        scheduleRender(f=!0) {
            var h;
            if ((h = this.options.visualElement) == null || h.scheduleRender(),
            f) {
                const p = this.getStack();
                p && p.scheduleRender()
            }
            this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
        }
        createProjectionDeltas() {
            this.prevProjectionDelta = k3(),
            this.projectionDelta = k3(),
            this.projectionDeltaWithTransform = k3()
        }
        setAnimationOrigin(f, h=!1) {
            const p = this.snapshot
              , g = p ? p.latestValues : {}
              , y = {
                ...this.latestValues
            }
              , v = k3();
            (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0),
            this.attemptToResolveRelativeTarget = !h;
            const w = F1()
              , j = p ? p.source : void 0
              , A = this.layout ? this.layout.source : void 0
              , P = j !== A
              , _ = this.getStack()
              , D = !_ || _.members.length <= 1
              , V = !!(P && !D && this.options.crossfade === !0 && !this.path.some(bC));
            this.animationProgress = 0;
            let N;
            this.mixTargetDelta = X => {
                const $ = X / 1e3;
                ss(v.x, f.x, $),
                ss(v.y, f.y, $),
                this.setTargetDelta(v),
                this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Tn(w, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
                IC(this.relativeTarget, this.relativeTargetOrigin, w, $),
                N && SC(this.relativeTarget, N) && (this.isProjectionDirty = !1),
                N || (N = F1()),
                Me(N, this.relativeTarget)),
                P && (this.animationValues = y,
                gC(y, g, this.latestValues, $, V, D)),
                this.root.scheduleUpdateProjection(),
                this.scheduleRender(),
                this.animationProgress = $
            }
            ,
            this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0)
        }
        startAnimation(f) {
            var h, p, g;
            this.notifyListeners("animationStart"),
            (h = this.currentAnimation) == null || h.stop(),
            (g = (p = this.resumingFrom) == null ? void 0 : p.currentAnimation) == null || g.stop(),
            this.pendingAnimation && (kt(this.pendingAnimation),
            this.pendingAnimation = void 0),
            this.pendingAnimation = T1.update( () => {
                o7.hasAnimatedSinceResize = !0,
                this.motionValue || (this.motionValue = S3(0)),
                this.currentAnimation = CC(this.motionValue, [0, 1e3], {
                    ...f,
                    velocity: 0,
                    isSync: !0,
                    onUpdate: y => {
                        this.mixTargetDelta(y),
                        f.onUpdate && f.onUpdate(y)
                    }
                    ,
                    onStop: () => {}
                    ,
                    onComplete: () => {
                        f.onComplete && f.onComplete(),
                        this.completeAnimation()
                    }
                }),
                this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
                this.pendingAnimation = void 0
            }
            )
        }
        completeAnimation() {
            this.resumingFrom && (this.resumingFrom.currentAnimation = void 0,
            this.resumingFrom.preserveOpacity = void 0);
            const f = this.getStack();
            f && f.exitAnimationComplete(),
            this.resumingFrom = this.currentAnimation = this.animationValues = void 0,
            this.notifyListeners("animationComplete")
        }
        finishAnimation() {
            this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(EC),
            this.currentAnimation.stop()),
            this.completeAnimation()
        }
        applyTransformsToTarget() {
            const f = this.getLead();
            let {targetWithTransforms: h, target: p, layout: g, latestValues: y} = f;
            if (!(!h || !p || !g)) {
                if (this !== f && this.layout && g && io(this.options.animationType, this.layout.layoutBox, g.layoutBox)) {
                    p = this.target || F1();
                    const v = se(this.layout.layoutBox.x);
                    p.x.min = f.target.x.min,
                    p.x.max = p.x.min + v;
                    const w = se(this.layout.layoutBox.y);
                    p.y.min = f.target.y.min,
                    p.y.max = p.y.min + w
                }
                Me(h, p),
                w3(h, y),
                jn(this.projectionDeltaWithTransform, this.layoutCorrected, h, y)
            }
        }
        registerSharedNode(f, h) {
            this.sharedNodes.has(f) || this.sharedNodes.set(f, new jC),
            this.sharedNodes.get(f).add(h);
            const g = h.options.initialPromotionConfig;
            h.promote({
                transition: g ? g.transition : void 0,
                preserveFollowOpacity: g && g.shouldPreserveFollowOpacity ? g.shouldPreserveFollowOpacity(h) : void 0
            })
        }
        isLead() {
            const f = this.getStack();
            return f ? f.lead === this : !0
        }
        getLead() {
            var h;
            const {layoutId: f} = this.options;
            return f ? ((h = this.getStack()) == null ? void 0 : h.lead) || this : this
        }
        getPrevLead() {
            var h;
            const {layoutId: f} = this.options;
            return f ? (h = this.getStack()) == null ? void 0 : h.prevLead : void 0
        }
        getStack() {
            const {layoutId: f} = this.options;
            if (f)
                return this.root.sharedNodes.get(f)
        }
        promote({needsReset: f, transition: h, preserveFollowOpacity: p}={}) {
            const g = this.getStack();
            g && g.promote(this, p),
            f && (this.projectionDelta = void 0,
            this.needsReset = !0),
            h && this.setOptions({
                transition: h
            })
        }
        relegate() {
            const f = this.getStack();
            return f ? f.relegate(this) : !1
        }
        resetSkewAndRotation() {
            const {visualElement: f} = this.options;
            if (!f)
                return;
            let h = !1;
            const {latestValues: p} = f;
            if ((p.z || p.rotate || p.rotateX || p.rotateY || p.rotateZ || p.skewX || p.skewY) && (h = !0),
            !h)
                return;
            const g = {};
            p.z && L0("z", f, g, this.animationValues);
            for (let y = 0; y < P0.length; y++)
                L0(`rotate${P0[y]}`, f, g, this.animationValues),
                L0(`skew${P0[y]}`, f, g, this.animationValues);
            f.render();
            for (const y in g)
                f.setStaticValue(y, g[y]),
                this.animationValues && (this.animationValues[y] = g[y]);
            f.scheduleRender()
        }
        applyProjectionStyles(f, h) {
            if (!this.instance || this.isSVG)
                return;
            if (!this.isVisible) {
                f.visibility = "hidden";
                return
            }
            const p = this.getTransformTemplate();
            if (this.needsReset) {
                this.needsReset = !1,
                f.visibility = "",
                f.opacity = "",
                f.pointerEvents = s7(h == null ? void 0 : h.pointerEvents) || "",
                f.transform = p ? p(this.latestValues, "") : "none";
                return
            }
            const g = this.getLead();
            if (!this.projectionDelta || !this.layout || !g.target) {
                this.options.layoutId && (f.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1,
                f.pointerEvents = s7(h == null ? void 0 : h.pointerEvents) || ""),
                this.hasProjected && !zt(this.latestValues) && (f.transform = p ? p({}, "") : "none",
                this.hasProjected = !1);
                return
            }
            f.visibility = "";
            const y = g.animationValues || g.latestValues;
            this.applyTransformsToTarget();
            let v = TC(this.projectionDeltaWithTransform, this.treeScale, y);
            p && (v = p(y, v)),
            f.transform = v;
            const {x: w, y: j} = this.projectionDelta;
            f.transformOrigin = `${w.origin * 100}% ${j.origin * 100}% 0`,
            g.animationValues ? f.opacity = g === this ? y.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : y.opacityExit : f.opacity = g === this ? y.opacity !== void 0 ? y.opacity : "" : y.opacityExit !== void 0 ? y.opacityExit : 0;
            for (const A in Dn) {
                if (y[A] === void 0)
                    continue;
                const {correct: P, applyTo: _, isCSSVariable: D} = Dn[A]
                  , V = v === "none" ? y[A] : P(y[A], g);
                if (_) {
                    const N = _.length;
                    for (let X = 0; X < N; X++)
                        f[_[X]] = V
                } else
                    D ? this.options.visualElement.renderState.vars[A] = V : f[A] = V
            }
            this.options.layoutId && (f.pointerEvents = g === this ? s7(h == null ? void 0 : h.pointerEvents) || "" : "none")
        }
        clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0
        }
        resetTree() {
            this.root.nodes.forEach(f => {
                var h;
                return (h = f.currentAnimation) == null ? void 0 : h.stop()
            }
            ),
            this.root.nodes.forEach(ns),
            this.root.sharedNodes.clear()
        }
    }
}
function LC(n) {
    n.updateLayout()
}
function _C(n) {
    var s;
    const r = ((s = n.resumeFrom) == null ? void 0 : s.snapshot) || n.snapshot;
    if (n.isLead() && n.layout && r && n.hasListeners("didUpdate")) {
        const {layoutBox: l, measuredBox: u} = n.layout
          , {animationType: d} = n.options
          , f = r.source !== n.layout.source;
        d === "size" ? Se(v => {
            const w = f ? r.measuredBox[v] : r.layoutBox[v]
              , j = se(w);
            w.min = l[v].min,
            w.max = w.min + j
        }
        ) : io(d, r.layoutBox, l) && Se(v => {
            const w = f ? r.measuredBox[v] : r.layoutBox[v]
              , j = se(l[v]);
            w.max = w.min + j,
            n.relativeTarget && !n.currentAnimation && (n.isProjectionDirty = !0,
            n.relativeTarget[v].max = n.relativeTarget[v].min + j)
        }
        );
        const h = k3();
        jn(h, l, r.layoutBox);
        const p = k3();
        f ? jn(p, n.applyTransform(u, !0), r.measuredBox) : jn(p, l, r.layoutBox);
        const g = !eo(h);
        let y = !1;
        if (!n.resumeFrom) {
            const v = n.getClosestProjectingParent();
            if (v && !v.resumeFrom) {
                const {snapshot: w, layout: j} = v;
                if (w && j) {
                    const A = F1();
                    Tn(A, r.layoutBox, w.layoutBox);
                    const P = F1();
                    Tn(P, l, j.layoutBox),
                    to(A, P) || (y = !0),
                    v.options.layoutRoot && (n.relativeTarget = P,
                    n.relativeTargetOrigin = A,
                    n.relativeParent = v)
                }
            }
        }
        n.notifyListeners("didUpdate", {
            layout: l,
            snapshot: r,
            delta: p,
            layoutDelta: h,
            hasLayoutChanged: g,
            hasRelativeLayoutChanged: y
        })
    } else if (n.isLead()) {
        const {onExitComplete: l} = n.options;
        l && l()
    }
    n.options.transition = void 0
}
function RC(n) {
    n.parent && (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty),
    n.isSharedProjectionDirty || (n.isSharedProjectionDirty = !!(n.isProjectionDirty || n.parent.isProjectionDirty || n.parent.isSharedProjectionDirty)),
    n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty))
}
function AC(n) {
    n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1
}
function DC(n) {
    n.clearSnapshot()
}
function ns(n) {
    n.clearMeasurements()
}
function rs(n) {
    n.isLayoutDirty = !1
}
function VC(n) {
    const {visualElement: r} = n.options;
    r && r.getProps().onBeforeLayoutMeasure && r.notify("BeforeLayoutMeasure"),
    n.resetTransform()
}
function is(n) {
    n.finishAnimation(),
    n.targetDelta = n.relativeTarget = n.target = void 0,
    n.isProjectionDirty = !0
}
function ZC(n) {
    n.resolveTargetDelta()
}
function OC(n) {
    n.calcProjection()
}
function FC(n) {
    n.resetSkewAndRotation()
}
function NC(n) {
    n.removeLeadSnapshot()
}
function ss(n, r, s) {
    n.translate = R1(r.translate, 0, s),
    n.scale = R1(r.scale, 1, s),
    n.origin = r.origin,
    n.originPoint = r.originPoint
}
function os(n, r, s, l) {
    n.min = R1(r.min, s.min, l),
    n.max = R1(r.max, s.max, l)
}
function IC(n, r, s, l) {
    os(n.x, r.x, s.x, l),
    os(n.y, r.y, s.y, l)
}
function bC(n) {
    return n.animationValues && n.animationValues.opacityExit !== void 0
}
const zC = {
    duration: .45,
    ease: [.4, 0, .1, 1]
}
  , ls = n => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(n)
  , as = ls("applewebkit/") && !ls("chrome/") ? Math.round : je;
function us(n) {
    n.min = as(n.min),
    n.max = as(n.max)
}
function BC(n) {
    us(n.x),
    us(n.y)
}
function io(n, r, s) {
    return n === "position" || n === "preserve-aspect" && !Gd(es(r), es(s), .2)
}
function UC(n) {
    var r;
    return n !== n.root && ((r = n.scroll) == null ? void 0 : r.wasRoot)
}
const HC = ro({
    attachResizeListener: (n, r) => Vn(n, "resize", r),
    measureScroll: () => ({
        x: document.documentElement.scrollLeft || document.body.scrollLeft,
        y: document.documentElement.scrollTop || document.body.scrollTop
    }),
    checkIsScrollRoot: () => !0
})
  , _0 = {
    current: void 0
}
  , so = ro({
    measureScroll: n => ({
        x: n.scrollLeft,
        y: n.scrollTop
    }),
    defaultParent: () => {
        if (!_0.current) {
            const n = new HC({});
            n.mount(window),
            n.setOptions({
                layoutScroll: !0
            }),
            _0.current = n
        }
        return _0.current
    }
    ,
    resetTransform: (n, r) => {
        n.style.transform = r !== void 0 ? r : "none"
    }
    ,
    checkIsScrollRoot: n => window.getComputedStyle(n).position === "fixed"
})
  , $C = {
    pan: {
        Feature: uC
    },
    drag: {
        Feature: aC,
        ProjectionNode: so,
        MeasureLayout: Q9
    }
};
function cs(n, r, s) {
    const {props: l} = n;
    n.animationState && l.whileHover && n.animationState.setActive("whileHover", s === "Start");
    const u = "onHover" + s
      , d = l[u];
    d && T1.postRender( () => d(r, Nn(r)))
}
class WC extends St {
    mount() {
        const {current: r} = this.node;
        r && (this.unmount = lf(r, (s, l) => (cs(this.node, l, "Start"),
        u => cs(this.node, u, "End"))))
    }
    unmount() {}
}
class KC extends St {
    constructor() {
        super(...arguments),
        this.isActive = !1
    }
    onFocus() {
        let r = !1;
        try {
            r = this.node.current.matches(":focus-visible")
        } catch {
            r = !0
        }
        !r || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0),
        this.isActive = !0)
    }
    onBlur() {
        !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1),
        this.isActive = !1)
    }
    mount() {
        this.unmount = Zn(Vn(this.node.current, "focus", () => this.onFocus()), Vn(this.node.current, "blur", () => this.onBlur()))
    }
    unmount() {}
}
function fs(n, r, s) {
    const {props: l} = n;
    if (n.current instanceof HTMLButtonElement && n.current.disabled)
        return;
    n.animationState && l.whileTap && n.animationState.setActive("whileTap", s === "Start");
    const u = "onTap" + (s === "End" ? "" : s)
      , d = l[u];
    d && T1.postRender( () => d(r, Nn(r)))
}
class GC extends St {
    mount() {
        const {current: r} = this.node;
        r && (this.unmount = ff(r, (s, l) => (fs(this.node, l, "Start"),
        (u, {success: d}) => fs(this.node, u, d ? "End" : "Cancel")), {
            useGlobalTarget: this.node.props.globalTapTarget
        }))
    }
    unmount() {}
}
const s5 = new WeakMap
  , R0 = new WeakMap
  , XC = n => {
    const r = s5.get(n.target);
    r && r(n)
}
  , YC = n => {
    n.forEach(XC)
}
;
function QC({root: n, ...r}) {
    const s = n || document;
    R0.has(s) || R0.set(s, {});
    const l = R0.get(s)
      , u = JSON.stringify(r);
    return l[u] || (l[u] = new IntersectionObserver(YC,{
        root: n,
        ...r
    })),
    l[u]
}
function qC(n, r, s) {
    const l = QC(r);
    return s5.set(n, s),
    l.observe(n),
    () => {
        s5.delete(n),
        l.unobserve(n)
    }
}
const JC = {
    some: 0,
    all: 1
};
class eh extends St {
    constructor() {
        super(...arguments),
        this.hasEnteredView = !1,
        this.isInView = !1
    }
    startObserver() {
        this.unmount();
        const {viewport: r={}} = this.node.getProps()
          , {root: s, margin: l, amount: u="some", once: d} = r
          , f = {
            root: s ? s.current : void 0,
            rootMargin: l,
            threshold: typeof u == "number" ? u : JC[u]
        }
          , h = p => {
            const {isIntersecting: g} = p;
            if (this.isInView === g || (this.isInView = g,
            d && !g && this.hasEnteredView))
                return;
            g && (this.hasEnteredView = !0),
            this.node.animationState && this.node.animationState.setActive("whileInView", g);
            const {onViewportEnter: y, onViewportLeave: v} = this.node.getProps()
              , w = g ? y : v;
            w && w(p)
        }
        ;
        return qC(this.node.current, f, h)
    }
    mount() {
        this.startObserver()
    }
    update() {
        if (typeof IntersectionObserver > "u")
            return;
        const {props: r, prevProps: s} = this.node;
        ["amount", "margin", "root"].some(th(r, s)) && this.startObserver()
    }
    unmount() {}
}
function th({viewport: n={}}, {viewport: r={}}={}) {
    return s => n[s] !== r[s]
}
const nh = {
    inView: {
        Feature: eh
    },
    tap: {
        Feature: GC
    },
    focus: {
        Feature: KC
    },
    hover: {
        Feature: WC
    }
}
  , rh = {
    layout: {
        ProjectionNode: so,
        MeasureLayout: Q9
    }
}
  , ih = {
    ...Bd,
    ...nh,
    ...$C,
    ...rh
}
  , V1 = id(ih, yd)
  , J4 = {
    duration: .2,
    ease: "easeInOut"
}
  , sh = ({enabled: n}) => C.jsxs("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 28 28",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [C.jsx("path", {
        d: "M13 7L8 11H4V17H8L13 21V7Z",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }), n ? C.jsxs("g", {
        children: [C.jsx(V1.path, {
            d: "M21.07 7C22.9447 8.87528 23.9979 11.4184 23.9979 14.07C23.9979 16.7216 22.9447 19.2647 21.07 21.14",
            stroke: "currentColor",
            strokeWidth: "1.5",
            animate: {
                pathLength: [0, 1]
            },
            transition: {
                ...J4,
                delay: .1
            }
        }), C.jsx(V1.path, {
            d: "M17.54 10.53C18.4773 11.4676 19.0039 12.7392 19.0039 14.065C19.0039 15.3908 18.4773 16.6624 17.54 17.6",
            stroke: "currentColor",
            strokeWidth: "1.5",
            transition: J4,
            animate: {
                pathLength: [0, 1]
            }
        })]
    }) : C.jsxs("g", {
        children: [C.jsx(V1.path, {
            d: "M25 11L19 17",
            stroke: "currentColor",
            strokeWidth: "1.5",
            animate: {
                pathLength: [0, 1]
            },
            transition: {
                ...J4,
                delay: .1
            }
        }, "lineA"), C.jsx(V1.path, {
            d: "M19 11L25 17",
            stroke: "currentColor",
            strokeWidth: "1.5",
            animate: {
                pathLength: [0, 1]
            },
            transition: J4
        }, "lineB")]
    })]
})
  , be = ({children: n}) => C.jsx(V1.g, {
    animate: {
        rotate: [0, 4, -4, 4, -4, 0]
    },
    transition: {
        repeat: 1 / 0,
        repeatDelay: 4,
        duration: .4,
        delay: Math.random() * 5,
        ease: "easeInOut"
    },
    children: n
})
  , oh = () => C.jsxs("svg", {
    width: "225",
    height: "147",
    viewBox: "0 0 225 147",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-label": "Web Haptics",
    overflow: "visible",
    style: {
        filter: "drop-shadow(0px 5px 11px rgba(0, 0, 0, 0.05)"
    },
    children: [C.jsxs("g", {
        transform: "translate(-20 -10)",
        children: [C.jsx(V1.path, {
            d: "M45.048 26.6875L44.3026 27.0385C33.9459 31.9151 27.6693 42.6736 28.5209 54.0892",
            stroke: "#E8E8E8",
            strokeWidth: "4",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            animate: {
                opacity: [0, 1, 1, 0]
            },
            transition: {
                duration: 2,
                repeat: 1 / 0,
                repeatDelay: 1,
                ease: "easeInOut"
            }
        }), C.jsx(V1.path, {
            d: "M36.0386 2.00049L34.5365 2.67805C13.6666 12.0917 0.763667 33.4008 2.09391 56.2569",
            stroke: "#E8E8E8",
            strokeWidth: "4",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            animate: {
                opacity: [0, 1, 1, 0]
            },
            transition: {
                duration: 2,
                repeat: 1 / 0,
                repeatDelay: 1,
                delay: .3,
                ease: "easeInOut"
            }
        })]
    }), C.jsxs("g", {
        transform: "translate(250 30) rotate(115)",
        children: [C.jsx(V1.path, {
            d: "M45.048 26.6875L44.3026 27.0385C33.9459 31.9151 27.6693 42.6736 28.5209 54.0892",
            stroke: "#E8E8E8",
            strokeWidth: "4",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            animate: {
                opacity: [0, 1, 1, 0]
            },
            transition: {
                duration: 2,
                repeat: 1 / 0,
                repeatDelay: 1,
                ease: "easeInOut"
            }
        }), C.jsx(V1.path, {
            d: "M36.0386 2.00049L34.5365 2.67805C13.6666 12.0917 0.763667 33.4008 2.09391 56.2569",
            stroke: "#E8E8E8",
            strokeWidth: "4",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            animate: {
                opacity: [0, 1, 1, 0]
            },
            transition: {
                duration: 2,
                repeat: 1 / 0,
                repeatDelay: 1,
                delay: .3,
                ease: "easeInOut"
            }
        })]
    }), C.jsxs("g", {
        children: [C.jsxs(be, {
            index: 0,
            children: [C.jsx("path", {
                d: "M42.9125 114.693C41.4941 114.61 40.4907 114.339 39.9023 113.881C39.3521 113.425 39.0208 112.848 38.9081 112.149C38.7955 111.45 38.7607 110.736 38.8036 110.008L40.6556 78.613C40.7008 77.8463 40.8193 77.1416 41.0111 76.499C41.2029 75.8564 41.6179 75.3423 42.2561 74.9569C42.8943 74.5714 43.9225 74.4205 45.3409 74.5041C46.7592 74.5878 47.7434 74.8574 48.2936 75.313C48.882 75.7709 49.2145 76.329 49.2911 76.9875C49.406 77.6482 49.4397 78.381 49.3922 79.186L47.5402 110.581C47.4973 111.309 47.3788 112.014 47.1847 112.695C47.0313 113.34 46.6355 113.855 45.9973 114.241C45.3591 114.626 44.3308 114.777 42.9125 114.693ZM18.5324 113.255C17.1141 113.171 16.1107 112.901 15.5222 112.443C14.9338 111.985 14.5832 111.407 14.4706 110.708C14.3963 110.011 14.3806 109.298 14.4236 108.57L16.2756 77.1748C16.3208 76.4081 16.4393 75.7035 16.6311 75.0609C16.8228 74.4182 17.2187 73.9031 17.8185 73.5153C18.4568 73.1298 19.5042 72.98 20.9609 73.066C22.3792 73.1496 23.3634 73.4193 23.9135 73.8748C24.502 74.3327 24.8345 74.8908 24.9111 75.5493C25.026 76.21 25.0597 76.9429 25.0122 77.7479L23.1602 109.143C23.1173 109.871 22.9988 110.576 22.8047 111.257C22.6513 111.902 22.2554 112.417 21.6172 112.802C20.979 113.188 19.9508 113.339 18.5324 113.255ZM22.4925 96.9865L22.9402 89.3965L40.8803 90.4547L40.4325 98.0447L22.4925 96.9865Z",
                fill: "#ffffff",
                stroke: "#ffffff",
                strokeWidth: "6"
            }), C.jsx("path", {
                d: "M42.9125 114.693C41.4941 114.61 40.4907 114.339 39.9023 113.881C39.3521 113.425 39.0208 112.848 38.9081 112.149C38.7955 111.45 38.7607 110.736 38.8036 110.008L40.6556 78.613C40.7008 77.8463 40.8193 77.1416 41.0111 76.499C41.2029 75.8564 41.6179 75.3423 42.2561 74.9569C42.8943 74.5714 43.9225 74.4205 45.3409 74.5041C46.7592 74.5878 47.7434 74.8574 48.2936 75.313C48.882 75.7709 49.2145 76.329 49.2911 76.9875C49.406 77.6482 49.4397 78.381 49.3922 79.186L47.5402 110.581C47.4973 111.309 47.3788 112.014 47.1847 112.695C47.0313 113.34 46.6355 113.855 45.9973 114.241C45.3591 114.626 44.3308 114.777 42.9125 114.693ZM18.5324 113.255C17.1141 113.171 16.1107 112.901 15.5222 112.443C14.9338 111.985 14.5832 111.407 14.4706 110.708C14.3963 110.011 14.3806 109.298 14.4236 108.57L16.2756 77.1748C16.3208 76.4081 16.4393 75.7035 16.6311 75.0609C16.8228 74.4182 17.2187 73.9031 17.8185 73.5153C18.4568 73.1298 19.5042 72.98 20.9609 73.066C22.3792 73.1496 23.3634 73.4193 23.9135 73.8748C24.502 74.3327 24.8345 74.8908 24.9111 75.5493C25.026 76.21 25.0597 76.9429 25.0122 77.7479L23.1602 109.143C23.1173 109.871 22.9988 110.576 22.8047 111.257C22.6513 111.902 22.2554 112.417 21.6172 112.802C20.979 113.188 19.9508 113.339 18.5324 113.255ZM22.4925 96.9865L22.9402 89.3965L40.8803 90.4547L40.4325 98.0447L22.4925 96.9865Z",
                fill: "#32D74B",
                style: {
                    fill: "color(display-p3 0.1961 0.8431 0.2941)",
                    fillOpacity: "1"
                }
            })]
        }), C.jsxs(be, {
            index: 1,
            children: [C.jsx("path", {
                d: "M76.4425 112.907C75.0259 112.798 73.9921 112.468 73.3413 111.918C72.7286 111.37 72.4503 110.732 72.5063 110.005L73.1556 109.073C72.8965 109.438 72.4194 109.883 71.7243 110.407C71.0322 110.893 70.1516 111.326 69.0826 111.706C68.0164 112.047 66.7176 112.159 65.1861 112.042C63.4249 111.906 61.7698 111.394 60.2206 110.504C58.7097 109.618 57.3932 108.458 56.2711 107.023C55.1519 105.551 54.2948 103.925 53.6998 102.146C53.1431 100.37 52.9384 98.5252 53.0856 96.6109C53.2299 94.7348 53.7114 92.981 54.5301 91.3493C55.39 89.6824 56.4826 88.2451 57.8079 87.0375C59.1744 85.7947 60.672 84.8507 62.3007 84.2057C63.9293 83.5606 65.6242 83.3059 67.3854 83.4413C68.8021 83.5502 69.9919 83.8535 70.955 84.3512C71.921 84.8107 72.7088 85.3334 73.3185 85.9195C73.9664 86.5085 74.4436 87.0651 74.7499 87.5893L74.3523 86.75C74.3846 85.8281 74.7439 85.1625 75.4301 84.7531C76.1576 84.3084 77.2488 84.142 78.7037 84.2539C80.082 84.3598 81.0421 84.6455 81.584 85.1108C82.1642 85.5791 82.4853 86.1622 82.5471 86.8602C82.6473 87.5612 82.6679 88.2945 82.609 89.0602L81.0854 108.874C81.0295 109.601 80.8985 110.304 80.6923 110.981C80.5245 111.661 80.118 112.189 79.4731 112.563C78.8693 112.901 77.8591 113.016 76.4425 112.907ZM67.1076 103.582C68.1031 103.658 69.022 103.479 69.8643 103.043C70.7478 102.571 71.4532 101.913 71.9803 101.068C72.5458 100.226 72.8697 99.2684 72.9521 98.1963C73.0375 97.086 72.8637 96.0905 72.4308 95.21C72.0008 94.2911 71.3837 93.5504 70.5797 92.9879C69.7786 92.3871 68.8803 92.0484 67.8849 91.9719C66.7745 91.8865 65.7585 92.078 64.8367 92.5463C63.9531 93.0175 63.2095 93.6728 62.6058 94.5122C62.0403 95.3545 61.7149 96.3309 61.6295 97.4412C61.55 98.4749 61.7253 99.4512 62.1553 100.37C62.6265 101.254 63.2819 101.997 64.1212 102.601C65.0018 103.169 65.9973 103.496 67.1076 103.582Z",
                fill: "#ffffff",
                stroke: "#ffffff",
                strokeWidth: "6"
            }), C.jsx("path", {
                d: "M76.4425 112.907C75.0259 112.798 73.9921 112.468 73.3413 111.918C72.7286 111.37 72.4503 110.732 72.5063 110.005L73.1556 109.073C72.8965 109.438 72.4194 109.883 71.7243 110.407C71.0322 110.893 70.1516 111.326 69.0826 111.706C68.0164 112.047 66.7176 112.159 65.1861 112.042C63.4249 111.906 61.7698 111.394 60.2206 110.504C58.7097 109.618 57.3932 108.458 56.2711 107.023C55.1519 105.551 54.2948 103.925 53.6998 102.146C53.1431 100.37 52.9384 98.5252 53.0856 96.6109C53.2299 94.7348 53.7114 92.981 54.5301 91.3493C55.39 89.6824 56.4826 88.2451 57.8079 87.0375C59.1744 85.7947 60.672 84.8507 62.3007 84.2057C63.9293 83.5606 65.6242 83.3059 67.3854 83.4413C68.8021 83.5502 69.9919 83.8535 70.955 84.3512C71.921 84.8107 72.7088 85.3334 73.3185 85.9195C73.9664 86.5085 74.4436 87.0651 74.7499 87.5893L74.3523 86.75C74.3846 85.8281 74.7439 85.1625 75.4301 84.7531C76.1576 84.3084 77.2488 84.142 78.7037 84.2539C80.082 84.3598 81.0421 84.6455 81.584 85.1108C82.1642 85.5791 82.4853 86.1622 82.5471 86.8602C82.6473 87.5612 82.6679 88.2945 82.609 89.0602L81.0854 108.874C81.0295 109.601 80.8985 110.304 80.6923 110.981C80.5245 111.661 80.118 112.189 79.4731 112.563C78.8693 112.901 77.8591 113.016 76.4425 112.907ZM67.1076 103.582C68.1031 103.658 69.022 103.479 69.8643 103.043C70.7478 102.571 71.4532 101.913 71.9803 101.068C72.5458 100.226 72.8697 99.2684 72.9521 98.1963C73.0375 97.086 72.8637 96.0905 72.4308 95.21C72.0008 94.2911 71.3837 93.5504 70.5797 92.9879C69.7786 92.3871 68.8803 92.0484 67.8849 91.9719C66.7745 91.8865 65.7585 92.078 64.8367 92.5463C63.9531 93.0175 63.2095 93.6728 62.6058 94.5122C62.0403 95.3545 61.7149 96.3309 61.6295 97.4412C61.55 98.4749 61.7253 99.4512 62.1553 100.37C62.6265 101.254 63.2819 101.997 64.1212 102.601C65.0018 103.169 65.9973 103.496 67.1076 103.582Z",
                fill: "#66D4CF",
                style: {
                    fill: "color(display-p3 0.4000 0.8314 0.8118)",
                    fillOpacity: "1"
                }
            })]
        }), C.jsxs(be, {
            index: 2,
            children: [C.jsx("path", {
                d: "M102.691 113.059C100.812 113.146 99.1262 112.859 97.6348 112.198C96.1799 111.496 94.9437 110.535 93.926 109.314C92.9449 108.052 92.1659 106.589 91.589 104.925C91.0504 103.258 90.7549 101.446 90.7026 99.4877C90.6154 97.6082 90.782 95.8129 91.2024 94.102C91.621 92.3527 92.2604 90.8047 93.1205 89.4578C94.0172 88.0707 95.1391 86.9808 96.4863 86.1879C97.87 85.3549 99.5016 84.8949 101.381 84.8077C103.069 84.7294 104.717 85.0374 106.325 85.7317C107.972 86.4241 109.44 87.4132 110.73 88.6988C112.018 89.9461 113.047 91.4168 113.818 93.1109C114.626 94.8032 115.075 96.6084 115.164 98.5263C115.253 100.444 114.973 102.283 114.325 104.043C113.712 105.763 112.822 107.284 111.653 108.607C110.484 109.93 109.13 110.992 107.592 111.794C106.051 112.557 104.417 112.979 102.691 113.059ZM92.1628 126.002C90.7819 126.066 89.7748 125.901 89.1415 125.508C88.5483 125.151 88.1599 124.65 87.9762 124.005C87.8326 123.397 87.744 122.728 87.7102 121.999L86.2186 89.8355C86.183 89.0683 86.2085 88.3752 86.2952 87.7561C86.38 87.0987 86.7003 86.5456 87.2561 86.097C87.8503 85.6466 88.8378 85.3894 90.2188 85.3253C91.4079 85.2702 92.3557 85.3992 93.0621 85.7124C93.807 86.0239 94.3497 86.5369 94.6904 87.2515L96.2807 121.544C96.3529 122.271 96.3273 122.964 96.2041 123.624C96.081 124.283 95.7214 124.818 95.1254 125.23C94.5696 125.679 93.5821 125.936 92.1628 126.002ZM101.107 105.002C102.181 104.952 103.128 104.658 103.949 104.121C104.768 103.545 105.406 102.804 105.864 101.898C106.36 100.991 106.583 100.001 106.534 98.9266C106.482 97.8142 106.187 96.8476 105.649 96.0268C105.11 95.1677 104.407 94.5084 103.54 94.0488C102.673 93.5893 101.702 93.3844 100.628 93.4342C99.5923 93.4823 98.6458 93.7953 97.7884 94.3732C96.9677 94.911 96.3284 95.6326 95.8707 96.538C95.4495 97.4032 95.2638 98.3728 95.3136 99.4469C95.3634 100.521 95.6581 101.488 96.1977 102.347C96.7373 103.206 97.4415 103.884 98.3103 104.382C99.1773 104.842 100.109 105.048 101.107 105.002Z",
                fill: "#ffffff",
                stroke: "#ffffff",
                strokeWidth: "6"
            }), C.jsx("path", {
                d: "M102.691 113.059C100.812 113.146 99.1262 112.859 97.6348 112.198C96.1799 111.496 94.9437 110.535 93.926 109.314C92.9449 108.052 92.1659 106.589 91.589 104.925C91.0504 103.258 90.7549 101.446 90.7026 99.4877C90.6154 97.6082 90.782 95.8129 91.2024 94.102C91.621 92.3527 92.2604 90.8047 93.1205 89.4578C94.0172 88.0707 95.1391 86.9808 96.4863 86.1879C97.87 85.3549 99.5016 84.8949 101.381 84.8077C103.069 84.7294 104.717 85.0374 106.325 85.7317C107.972 86.4241 109.44 87.4132 110.73 88.6988C112.018 89.9461 113.047 91.4168 113.818 93.1109C114.626 94.8032 115.075 96.6084 115.164 98.5263C115.253 100.444 114.973 102.283 114.325 104.043C113.712 105.763 112.822 107.284 111.653 108.607C110.484 109.93 109.13 110.992 107.592 111.794C106.051 112.557 104.417 112.979 102.691 113.059ZM92.1628 126.002C90.7819 126.066 89.7748 125.901 89.1415 125.508C88.5483 125.151 88.1599 124.65 87.9762 124.005C87.8326 123.397 87.744 122.728 87.7102 121.999L86.2186 89.8355C86.183 89.0683 86.2085 88.3752 86.2952 87.7561C86.38 87.0987 86.7003 86.5456 87.2561 86.097C87.8503 85.6466 88.8378 85.3894 90.2188 85.3253C91.4079 85.2702 92.3557 85.3992 93.0621 85.7124C93.807 86.0239 94.3497 86.5369 94.6904 87.2515L96.2807 121.544C96.3529 122.271 96.3273 122.964 96.2041 123.624C96.081 124.283 95.7214 124.818 95.1254 125.23C94.5696 125.679 93.5821 125.936 92.1628 126.002ZM101.107 105.002C102.181 104.952 103.128 104.658 103.949 104.121C104.768 103.545 105.406 102.804 105.864 101.898C106.36 100.991 106.583 100.001 106.534 98.9266C106.482 97.8142 106.187 96.8476 105.649 96.0268C105.11 95.1677 104.407 94.5084 103.54 94.0488C102.673 93.5893 101.702 93.3844 100.628 93.4342C99.5923 93.4823 98.6458 93.7953 97.7884 94.3732C96.9677 94.911 96.3284 95.6326 95.8707 96.538C95.4495 97.4032 95.2638 98.3728 95.3136 99.4469C95.3634 100.521 95.6581 101.488 96.1977 102.347C96.7373 103.206 97.4415 103.884 98.3103 104.382C99.1773 104.842 100.109 105.048 101.107 105.002Z",
                fill: "#6AC4DC",
                style: {
                    fill: "color(display-p3 0.4157 0.7686 0.8627)",
                    fillOpacity: "1"
                }
            })]
        }), C.jsxs(be, {
            index: 3,
            children: [C.jsx("path", {
                d: "M133.575 113.388C131.619 113.479 129.921 113.346 128.482 112.99C127.082 112.632 125.901 112.033 124.939 111.194C123.978 110.354 123.236 109.274 122.713 107.953C122.227 106.591 121.941 104.971 121.853 103.091L120.77 79.7307C120.734 78.9636 120.76 78.2704 120.847 77.6514C120.972 77.0305 121.332 76.5141 121.928 76.102C122.522 75.6516 123.51 75.3944 124.891 75.3303C126.272 75.2663 127.279 75.431 127.912 75.8245C128.545 76.218 128.935 76.7381 129.08 77.3849C129.264 78.0299 129.373 78.7359 129.409 79.5031L130.468 102.346C130.497 102.96 130.559 103.476 130.655 103.894C130.788 104.272 130.955 104.553 131.156 104.736C131.356 104.919 131.631 105.04 131.98 105.101C132.329 105.162 132.752 105.181 133.251 105.157C134.095 105.118 134.846 105.16 135.506 105.284C136.165 105.407 136.68 105.729 137.05 106.25C137.458 106.769 137.692 107.662 137.75 108.927C137.814 110.308 137.65 111.316 137.256 111.949C136.863 112.582 136.323 112.972 135.638 113.119C134.992 113.265 134.304 113.354 133.575 113.388ZM119.259 85.6824L125.588 85.3888L133.517 84.7905C134.246 84.7567 134.94 84.8014 135.599 84.9246C136.257 85.0094 136.811 85.3489 137.261 85.9431C137.712 86.5372 137.97 87.544 138.036 88.9632C138.096 90.2674 137.929 91.2362 137.536 91.8695C137.181 92.501 136.682 92.9278 136.039 93.1498C135.394 93.3335 134.687 93.4432 133.92 93.4787L126.375 93.6557L119.413 93.9785C118.298 93.9918 117.497 93.7022 117.008 93.1098C116.556 92.4772 116.295 91.413 116.226 89.917C116.162 88.5361 116.383 87.5071 116.89 86.8301C117.395 86.1147 118.185 85.7322 119.259 85.6824Z",
                fill: "#ffffff",
                stroke: "#ffffff",
                strokeWidth: "6"
            }), C.jsx("path", {
                d: "M133.575 113.388C131.619 113.479 129.921 113.346 128.482 112.99C127.082 112.632 125.901 112.033 124.939 111.194C123.978 110.354 123.236 109.274 122.713 107.953C122.227 106.591 121.941 104.971 121.853 103.091L120.77 79.7307C120.734 78.9636 120.76 78.2704 120.847 77.6514C120.972 77.0305 121.332 76.5141 121.928 76.102C122.522 75.6516 123.51 75.3944 124.891 75.3303C126.272 75.2663 127.279 75.431 127.912 75.8245C128.545 76.218 128.935 76.7381 129.08 77.3849C129.264 78.0299 129.373 78.7359 129.409 79.5031L130.468 102.346C130.497 102.96 130.559 103.476 130.655 103.894C130.788 104.272 130.955 104.553 131.156 104.736C131.356 104.919 131.631 105.04 131.98 105.101C132.329 105.162 132.752 105.181 133.251 105.157C134.095 105.118 134.846 105.16 135.506 105.284C136.165 105.407 136.68 105.729 137.05 106.25C137.458 106.769 137.692 107.662 137.75 108.927C137.814 110.308 137.65 111.316 137.256 111.949C136.863 112.582 136.323 112.972 135.638 113.119C134.992 113.265 134.304 113.354 133.575 113.388ZM119.259 85.6824L125.588 85.3888L133.517 84.7905C134.246 84.7567 134.94 84.8014 135.599 84.9246C136.257 85.0094 136.811 85.3489 137.261 85.9431C137.712 86.5372 137.97 87.544 138.036 88.9632C138.096 90.2674 137.929 91.2362 137.536 91.8695C137.181 92.501 136.682 92.9278 136.039 93.1498C135.394 93.3335 134.687 93.4432 133.92 93.4787L126.375 93.6557L119.413 93.9785C118.298 93.9918 117.497 93.7022 117.008 93.1098C116.556 92.4772 116.295 91.413 116.226 89.917C116.162 88.5361 116.383 87.5071 116.89 86.8301C117.395 86.1147 118.185 85.7322 119.259 85.6824Z",
                fill: "#5AC8F5",
                style: {
                    fill: "color(display-p3 0.3529 0.7843 0.9608)",
                    fillOpacity: "1"
                }
            })]
        }), C.jsxs(be, {
            index: 4,
            children: [C.jsx("path", {
                d: "M148.184 116.73C146.765 116.796 145.74 116.651 145.108 116.296C144.513 115.901 144.124 115.381 143.94 114.736C143.793 114.05 143.703 113.343 143.669 112.615L142.738 92.5338C142.702 91.7667 142.727 91.0544 142.811 90.3969C142.935 89.7377 143.294 89.2021 143.89 88.79C144.484 88.3396 145.491 88.0815 146.91 88.0157C148.291 87.9516 149.279 88.1173 149.874 88.5125C150.507 88.906 150.897 89.4261 151.042 90.0729C151.226 90.7179 151.336 91.4431 151.374 92.2487L152.302 112.272C152.336 113.001 152.292 113.714 152.171 114.412C152.086 115.069 151.745 115.604 151.15 116.016C150.592 116.426 149.604 116.664 148.184 116.73ZM146.658 83.8181C145.2 83.8857 144.155 83.7227 143.522 83.3292C142.888 82.9357 142.479 82.3973 142.293 81.714C142.146 81.0289 142.055 80.3027 142.019 79.5355C141.982 78.73 142.025 77.9976 142.148 77.3384C142.27 76.6408 142.628 76.086 143.224 75.674C143.818 75.2236 144.844 74.9646 146.302 74.897C147.721 74.8312 148.747 74.995 149.381 75.3885C150.014 75.782 150.404 76.3213 150.551 77.0064C150.737 77.6897 150.847 78.415 150.883 79.1822C150.919 79.9493 150.876 80.6817 150.754 81.3793C150.671 82.0751 150.333 82.6482 149.738 83.0986C149.142 83.5106 148.116 83.7505 146.658 83.8181Z",
                fill: "#ffffff",
                stroke: "#ffffff",
                strokeWidth: "6"
            }), C.jsx("path", {
                d: "M148.184 116.73C146.765 116.796 145.74 116.651 145.108 116.296C144.513 115.901 144.124 115.381 143.94 114.736C143.793 114.05 143.703 113.343 143.669 112.615L142.738 92.5338C142.702 91.7667 142.727 91.0544 142.811 90.3969C142.935 89.7377 143.294 89.2021 143.89 88.79C144.484 88.3396 145.491 88.0815 146.91 88.0157C148.291 87.9516 149.279 88.1173 149.874 88.5125C150.507 88.906 150.897 89.4261 151.042 90.0729C151.226 90.7179 151.336 91.4431 151.374 92.2487L152.302 112.272C152.336 113.001 152.292 113.714 152.171 114.412C152.086 115.069 151.745 115.604 151.15 116.016C150.592 116.426 149.604 116.664 148.184 116.73ZM146.658 83.8181C145.2 83.8857 144.155 83.7227 143.522 83.3292C142.888 82.9357 142.479 82.3973 142.293 81.714C142.146 81.0289 142.055 80.3027 142.019 79.5355C141.982 78.73 142.025 77.9976 142.148 77.3384C142.27 76.6408 142.628 76.086 143.224 75.674C143.818 75.2236 144.844 74.9646 146.302 74.897C147.721 74.8312 148.747 74.995 149.381 75.3885C150.014 75.782 150.404 76.3213 150.551 77.0064C150.737 77.6897 150.847 78.415 150.883 79.1822C150.919 79.9493 150.876 80.6817 150.754 81.3793C150.671 82.0751 150.333 82.6482 149.738 83.0986C149.142 83.5106 148.116 83.7505 146.658 83.8181Z",
                fill: "#0A84FF",
                style: {
                    fill: "color(display-p3 0.0392 0.5176 1.0000)",
                    fillOpacity: "1"
                }
            })]
        }), C.jsxs(be, {
            index: 5,
            children: [C.jsx("path", {
                d: "M171.526 114.014C169.839 113.931 168.128 113.539 166.394 112.839C164.7 112.102 163.135 111.083 161.7 109.782C160.305 108.444 159.211 106.853 158.417 105.007C157.626 103.122 157.289 100.991 157.406 98.6131C157.523 96.2352 158.067 94.1666 159.038 92.4074C160.008 90.6482 161.253 89.1908 162.771 88.0353C164.288 86.8797 165.925 86.0376 167.682 85.5089C169.478 84.9437 171.201 84.7017 172.85 84.7829C174.269 84.8528 175.526 85.0877 176.621 85.4876C177.757 85.8511 178.697 86.2818 179.441 86.7798C180.224 87.2797 180.78 87.7107 181.108 88.0729C181.735 88.6036 182.286 89.1305 182.76 89.6536C183.234 90.1768 183.432 90.8401 183.354 91.6437C183.295 92.0637 183.139 92.4981 182.886 92.947C182.635 93.3576 182.326 93.7845 181.958 94.2277C180.728 95.782 179.542 96.454 178.399 96.244C177.829 96.1006 177.302 95.8824 176.816 95.5894C176.369 95.2982 175.922 95.0071 175.475 94.716C175.068 94.3884 174.62 94.1164 174.131 93.9001C173.642 93.6838 173.071 93.5596 172.419 93.5275C171.307 93.4728 170.298 93.673 169.391 94.1281C168.484 94.5833 167.741 95.2388 167.16 96.0945C166.618 96.952 166.319 97.9561 166.262 99.1067C166.208 100.219 166.408 101.228 166.863 102.135C167.357 103.044 168.012 103.787 168.829 104.366C169.687 104.908 170.653 105.205 171.727 105.258C172.379 105.29 172.939 105.241 173.406 105.11C173.913 104.981 174.343 104.829 174.698 104.655C175.054 104.441 175.331 104.282 175.528 104.176C176.004 103.892 176.458 103.646 176.891 103.436C177.326 103.188 177.774 103.076 178.234 103.099C178.771 103.125 179.317 103.363 179.872 103.814C180.428 104.225 181.03 104.889 181.677 105.806C182.251 106.641 182.559 107.406 182.602 108.1C182.683 108.796 182.497 109.441 182.045 110.034C181.593 110.626 180.912 111.189 180.001 111.721C179.681 111.974 179.108 112.292 178.282 112.674C177.494 113.058 176.516 113.395 175.349 113.683C174.22 113.974 172.945 114.084 171.526 114.014Z",
                fill: "#ffffff",
                stroke: "#ffffff",
                strokeWidth: "6"
            }), C.jsx("path", {
                d: "M171.526 114.014C169.839 113.931 168.128 113.539 166.394 112.839C164.7 112.102 163.135 111.083 161.7 109.782C160.305 108.444 159.211 106.853 158.417 105.007C157.626 103.122 157.289 100.991 157.406 98.6131C157.523 96.2352 158.067 94.1666 159.038 92.4074C160.008 90.6482 161.253 89.1908 162.771 88.0353C164.288 86.8797 165.925 86.0376 167.682 85.5089C169.478 84.9437 171.201 84.7017 172.85 84.7829C174.269 84.8528 175.526 85.0877 176.621 85.4876C177.757 85.8511 178.697 86.2818 179.441 86.7798C180.224 87.2797 180.78 87.7107 181.108 88.0729C181.735 88.6036 182.286 89.1305 182.76 89.6536C183.234 90.1768 183.432 90.8401 183.354 91.6437C183.295 92.0637 183.139 92.4981 182.886 92.947C182.635 93.3576 182.326 93.7845 181.958 94.2277C180.728 95.782 179.542 96.454 178.399 96.244C177.829 96.1006 177.302 95.8824 176.816 95.5894C176.369 95.2982 175.922 95.0071 175.475 94.716C175.068 94.3884 174.62 94.1164 174.131 93.9001C173.642 93.6838 173.071 93.5596 172.419 93.5275C171.307 93.4728 170.298 93.673 169.391 94.1281C168.484 94.5833 167.741 95.2388 167.16 96.0945C166.618 96.952 166.319 97.9561 166.262 99.1067C166.208 100.219 166.408 101.228 166.863 102.135C167.357 103.044 168.012 103.787 168.829 104.366C169.687 104.908 170.653 105.205 171.727 105.258C172.379 105.29 172.939 105.241 173.406 105.11C173.913 104.981 174.343 104.829 174.698 104.655C175.054 104.441 175.331 104.282 175.528 104.176C176.004 103.892 176.458 103.646 176.891 103.436C177.326 103.188 177.774 103.076 178.234 103.099C178.771 103.125 179.317 103.363 179.872 103.814C180.428 104.225 181.03 104.889 181.677 105.806C182.251 106.641 182.559 107.406 182.602 108.1C182.683 108.796 182.497 109.441 182.045 110.034C181.593 110.626 180.912 111.189 180.001 111.721C179.681 111.974 179.108 112.292 178.282 112.674C177.494 113.058 176.516 113.395 175.349 113.683C174.22 113.974 172.945 114.084 171.526 114.014Z",
                fill: "#5E5CE6",
                style: {
                    fill: "color(display-p3 0.3686 0.3608 0.9020)",
                    fillOpacity: "1"
                }
            })]
        }), C.jsxs(be, {
            index: 6,
            children: [C.jsx("path", {
                d: "M197.751 116.947C196.715 116.979 195.579 116.898 194.344 116.704C193.147 116.51 191.967 116.219 190.803 115.831C189.637 115.405 188.662 114.916 187.877 114.363C187.091 113.772 186.629 113.094 186.491 112.33C186.402 111.949 186.39 111.546 186.454 111.121C186.556 110.657 186.734 110.191 186.989 109.722C187.242 109.215 187.553 108.687 187.921 108.138C188.215 107.707 188.552 107.428 188.933 107.301C189.313 107.174 189.755 107.18 190.259 107.319C190.876 107.415 191.497 107.608 192.12 107.897C192.781 108.146 193.423 108.434 194.048 108.761C194.709 109.048 195.39 109.316 196.089 109.564C196.787 109.773 197.5 109.867 198.229 109.845C199.304 109.813 200.125 109.634 200.691 109.31C201.295 108.946 201.588 108.476 201.571 107.901C201.558 107.478 201.413 107.137 201.137 106.876C200.898 106.615 200.546 106.395 200.08 106.217C199.65 105.999 199.146 105.822 198.565 105.686C197.985 105.55 197.347 105.415 196.652 105.282C195.993 105.11 195.316 104.938 194.619 104.767C193.652 104.527 192.72 104.21 191.825 103.814C190.929 103.418 190.107 102.905 189.358 102.275C188.608 101.606 188.007 100.798 187.556 99.8509C187.104 98.8656 186.857 97.6629 186.814 96.2427C186.757 94.362 187.152 92.775 187.996 91.4819C188.841 90.1887 190.098 89.1905 191.767 88.4872C193.435 87.7456 195.478 87.3384 197.896 87.2657C198.587 87.245 199.279 87.2626 199.973 87.3186C200.666 87.3746 201.342 87.4887 202 87.661C202.696 87.8322 203.375 88.0423 204.036 88.2914C204.696 88.5404 205.359 88.8471 206.023 89.2113C207.19 89.714 207.807 90.4254 207.873 91.3454C207.939 92.2655 207.641 93.2157 206.979 94.196C206.577 94.8612 206.15 95.3542 205.698 95.6751C205.246 95.9577 204.768 96.0489 204.266 95.9487C203.647 95.8136 202.968 95.5843 202.228 95.2608C201.527 94.9361 200.769 94.6324 199.953 94.3495C199.177 94.0655 198.404 93.9351 197.637 93.9582C196.984 93.9778 196.43 94.0905 195.976 94.2962C195.52 94.4636 195.181 94.7043 194.96 95.0183C194.738 95.2939 194.633 95.6236 194.644 96.0074C194.659 96.5064 194.805 96.9053 195.083 97.2043C195.399 97.4638 195.808 97.682 196.313 97.8589C196.818 98.0358 197.399 98.1912 198.056 98.3251C198.713 98.4591 199.428 98.5912 200.2 98.7217C201.242 98.8825 202.306 99.1194 203.391 99.4326C204.513 99.7062 205.525 100.137 206.426 100.724C207.366 101.311 208.12 102.114 208.688 103.134C209.295 104.153 209.624 105.507 209.675 107.196C209.766 110.228 208.78 112.582 206.718 114.258C204.655 115.933 201.666 116.83 197.751 116.947Z",
                fill: "#ffffff",
                stroke: "#ffffff",
                strokeWidth: "6"
            }), C.jsx("path", {
                d: "M197.751 116.947C196.715 116.979 195.579 116.898 194.344 116.704C193.147 116.51 191.967 116.219 190.803 115.831C189.637 115.405 188.662 114.916 187.877 114.363C187.091 113.772 186.629 113.094 186.491 112.33C186.402 111.949 186.39 111.546 186.454 111.121C186.556 110.657 186.734 110.191 186.989 109.722C187.242 109.215 187.553 108.687 187.921 108.138C188.215 107.707 188.552 107.428 188.933 107.301C189.313 107.174 189.755 107.18 190.259 107.319C190.876 107.415 191.497 107.608 192.12 107.897C192.781 108.146 193.423 108.434 194.048 108.761C194.709 109.048 195.39 109.316 196.089 109.564C196.787 109.773 197.5 109.867 198.229 109.845C199.304 109.813 200.125 109.634 200.691 109.31C201.295 108.946 201.588 108.476 201.571 107.901C201.558 107.478 201.413 107.137 201.137 106.876C200.898 106.615 200.546 106.395 200.08 106.217C199.65 105.999 199.146 105.822 198.565 105.686C197.985 105.55 197.347 105.415 196.652 105.282C195.993 105.11 195.316 104.938 194.619 104.767C193.652 104.527 192.72 104.21 191.825 103.814C190.929 103.418 190.107 102.905 189.358 102.275C188.608 101.606 188.007 100.798 187.556 99.8509C187.104 98.8656 186.857 97.6629 186.814 96.2427C186.757 94.362 187.152 92.775 187.996 91.4819C188.841 90.1887 190.098 89.1905 191.767 88.4872C193.435 87.7456 195.478 87.3384 197.896 87.2657C198.587 87.245 199.279 87.2626 199.973 87.3186C200.666 87.3746 201.342 87.4887 202 87.661C202.696 87.8322 203.375 88.0423 204.036 88.2914C204.696 88.5404 205.359 88.8471 206.023 89.2113C207.19 89.714 207.807 90.4254 207.873 91.3454C207.939 92.2655 207.641 93.2157 206.979 94.196C206.577 94.8612 206.15 95.3542 205.698 95.6751C205.246 95.9577 204.768 96.0489 204.266 95.9487C203.647 95.8136 202.968 95.5843 202.228 95.2608C201.527 94.9361 200.769 94.6324 199.953 94.3495C199.177 94.0655 198.404 93.9351 197.637 93.9582C196.984 93.9778 196.43 94.0905 195.976 94.2962C195.52 94.4636 195.181 94.7043 194.96 95.0183C194.738 95.2939 194.633 95.6236 194.644 96.0074C194.659 96.5064 194.805 96.9053 195.083 97.2043C195.399 97.4638 195.808 97.682 196.313 97.8589C196.818 98.0358 197.399 98.1912 198.056 98.3251C198.713 98.4591 199.428 98.5912 200.2 98.7217C201.242 98.8825 202.306 99.1194 203.391 99.4326C204.513 99.7062 205.525 100.137 206.426 100.724C207.366 101.311 208.12 102.114 208.688 103.134C209.295 104.153 209.624 105.507 209.675 107.196C209.766 110.228 208.78 112.582 206.718 114.258C204.655 115.933 201.666 116.83 197.751 116.947Z",
                fill: "#BF5AF2",
                style: {
                    fill: "color(display-p3 0.7490 0.3529 0.9490)",
                    fillOpacity: "1"
                }
            })]
        }), C.jsxs(be, {
            index: 7,
            children: [C.jsx("path", {
                d: "M65.4668 67.469C64.4715 67.5482 63.6716 67.4192 63.0669 67.0821C62.4623 66.7449 62.0062 66.3382 61.6987 65.8619C61.4294 65.3826 61.2489 65.0502 61.1571 64.8649L47.8733 34.4304C47.2478 32.8622 47.0769 31.6817 47.3605 30.8887C47.6411 30.0574 48.583 29.3084 50.1864 28.6415C51.2308 28.2118 52.0799 27.9901 52.7337 27.9767C53.4258 27.9601 54.0021 28.1839 54.4628 28.6481C54.9617 29.1092 55.4261 29.8619 55.8558 30.9063L64.7276 51.6378L69.085 30.143C69.1694 29.7511 69.3066 29.2972 69.4967 28.7813C69.7251 28.2623 70.1111 27.7886 70.6549 27.3602C71.1986 26.9317 71.9872 26.6764 73.0208 26.5941C74.2074 26.4998 75.1046 26.6403 75.7123 27.0157C76.3582 27.388 76.8158 27.8139 77.0851 28.2932C77.3543 28.7726 77.557 29.1417 77.6932 29.4005L85.4648 50.1039L90.8858 28.1778C91.145 27.0786 91.4654 26.2634 91.8469 25.7323C92.2636 25.1599 92.8135 24.808 93.4964 24.6766C94.2176 24.5422 95.1293 24.6237 96.2316 24.9213C97.4135 25.251 98.2524 25.6273 98.7482 26.0501C99.2441 26.4729 99.5195 27.0288 99.5743 27.7179C99.6643 28.3656 99.5988 29.2375 99.3779 30.3337L91.0722 62.4854C91.0139 62.7212 90.8706 63.0986 90.6422 63.6175C90.4491 64.0951 90.0807 64.5482 89.5369 64.9766C89.0315 65.402 88.2428 65.6574 87.171 65.7426C86.1375 65.8248 85.2962 65.6606 84.6472 65.25C83.9982 64.8394 83.5199 64.3959 83.2124 63.9196C82.9401 63.4019 82.7581 63.0505 82.6663 62.8652L74.3596 41.9732L69.46 63.9156C69.4369 64.11 69.3127 64.4859 69.0874 65.0431C68.8621 65.6003 68.4615 66.1329 67.8855 66.641C67.3448 67.1078 66.5386 67.3837 65.4668 67.469Z",
                fill: "#ffffff",
                stroke: "#ffffff",
                strokeWidth: "6"
            }), C.jsx("path", {
                d: "M65.4668 67.469C64.4715 67.5482 63.6716 67.4192 63.0669 67.0821C62.4623 66.7449 62.0062 66.3382 61.6987 65.8619C61.4294 65.3826 61.2489 65.0502 61.1571 64.8649L47.8733 34.4304C47.2478 32.8622 47.0769 31.6817 47.3605 30.8887C47.6411 30.0574 48.583 29.3084 50.1864 28.6415C51.2308 28.2118 52.0799 27.9901 52.7337 27.9767C53.4258 27.9601 54.0021 28.1839 54.4628 28.6481C54.9617 29.1092 55.4261 29.8619 55.8558 30.9063L64.7276 51.6378L69.085 30.143C69.1694 29.7511 69.3066 29.2972 69.4967 28.7813C69.7251 28.2623 70.1111 27.7886 70.6549 27.3602C71.1986 26.9317 71.9872 26.6764 73.0208 26.5941C74.2074 26.4998 75.1046 26.6403 75.7123 27.0157C76.3582 27.388 76.8158 27.8139 77.0851 28.2932C77.3543 28.7726 77.557 29.1417 77.6932 29.4005L85.4648 50.1039L90.8858 28.1778C91.145 27.0786 91.4654 26.2634 91.8469 25.7323C92.2636 25.1599 92.8135 24.808 93.4964 24.6766C94.2176 24.5422 95.1293 24.6237 96.2316 24.9213C97.4135 25.251 98.2524 25.6273 98.7482 26.0501C99.2441 26.4729 99.5195 27.0288 99.5743 27.7179C99.6643 28.3656 99.5988 29.2375 99.3779 30.3337L91.0722 62.4854C91.0139 62.7212 90.8706 63.0986 90.6422 63.6175C90.4491 64.0951 90.0807 64.5482 89.5369 64.9766C89.0315 65.402 88.2428 65.6574 87.171 65.7426C86.1375 65.8248 85.2962 65.6606 84.6472 65.25C83.9982 64.8394 83.5199 64.3959 83.2124 63.9196C82.9401 63.4019 82.7581 63.0505 82.6663 62.8652L74.3596 41.9732L69.46 63.9156C69.4369 64.11 69.3127 64.4859 69.0874 65.0431C68.8621 65.6003 68.4615 66.1329 67.8855 66.641C67.3448 67.1078 66.5386 67.3837 65.4668 67.469Z",
                fill: "#FF453A",
                style: {
                    fill: "color(display-p3 1.0000 0.2706 0.2275)",
                    fillOpacity: "1"
                }
            })]
        }), C.jsxs(be, {
            index: 8,
            children: [C.jsx("path", {
                d: "M114.969 63.1476C112.289 62.9415 110.007 62.3231 108.122 61.2923C106.275 60.2645 104.794 58.9952 103.678 57.4844C102.564 55.9353 101.769 54.2565 101.292 52.4482C100.853 50.6429 100.701 48.8596 100.837 47.0984C101.058 44.2269 101.904 41.7308 103.377 39.6103C104.849 37.4898 106.783 35.8861 109.177 34.7992C111.574 33.6741 114.266 33.2264 117.253 33.4561C119.473 33.6268 121.36 34.1378 122.912 34.9889C124.505 35.8046 125.775 36.8266 126.72 38.0547C127.707 39.2474 128.399 40.5138 128.796 41.8538C129.232 43.1968 129.405 44.4618 129.313 45.6487C129.151 47.7544 128.514 49.2845 127.401 50.2387C126.329 51.1576 125.008 51.5567 123.438 51.436L109.769 50.3849C109.769 51.3863 110.049 52.2551 110.609 52.9914C111.207 53.7306 111.97 54.3284 112.897 54.7849C113.825 55.2414 114.825 55.5108 115.897 55.5933C116.816 55.6639 117.623 55.6875 118.318 55.6639C119.016 55.602 119.62 55.5137 120.129 55.3988C120.642 55.2456 121.114 55.1087 121.547 54.9879C121.983 54.8289 122.359 54.7037 122.674 54.6124C123.027 54.524 123.358 54.4725 123.668 54.4577C124.245 54.4636 124.749 54.6756 125.179 55.0938C125.65 55.4767 126.049 56.0466 126.376 56.8035C126.611 57.2452 126.753 57.6605 126.8 58.0493C126.885 58.441 126.913 58.8282 126.884 59.2111C126.813 60.13 126.271 60.9164 125.258 61.5702C124.283 62.227 122.918 62.6997 121.163 62.9884C119.446 63.28 117.382 63.3331 114.969 63.1476ZM110.132 45.6756L119.206 46.3734C119.818 46.4205 120.266 46.3587 120.549 46.1878C120.873 45.9817 121.058 45.5723 121.105 44.9597C121.158 44.2705 120.993 43.6609 120.61 43.1308C120.23 42.5624 119.687 42.1162 118.98 41.7922C118.315 41.433 117.522 41.218 116.603 41.1473C115.417 41.0561 114.346 41.2048 113.392 41.5936C112.438 41.9824 111.663 42.539 111.068 43.2636C110.511 43.991 110.199 44.795 110.132 45.6756Z",
                fill: "#ffffff",
                stroke: "#ffffff",
                strokeWidth: "6"
            }), C.jsx("path", {
                d: "M114.969 63.1476C112.289 62.9415 110.007 62.3231 108.122 61.2923C106.275 60.2645 104.794 58.9952 103.678 57.4844C102.564 55.9353 101.769 54.2565 101.292 52.4482C100.853 50.6429 100.701 48.8596 100.837 47.0984C101.058 44.2269 101.904 41.7308 103.377 39.6103C104.849 37.4898 106.783 35.8861 109.177 34.7992C111.574 33.6741 114.266 33.2264 117.253 33.4561C119.473 33.6268 121.36 34.1378 122.912 34.9889C124.505 35.8046 125.775 36.8266 126.72 38.0547C127.707 39.2474 128.399 40.5138 128.796 41.8538C129.232 43.1968 129.405 44.4618 129.313 45.6487C129.151 47.7544 128.514 49.2845 127.401 50.2387C126.329 51.1576 125.008 51.5567 123.438 51.436L109.769 50.3849C109.769 51.3863 110.049 52.2551 110.609 52.9914C111.207 53.7306 111.97 54.3284 112.897 54.7849C113.825 55.2414 114.825 55.5108 115.897 55.5933C116.816 55.6639 117.623 55.6875 118.318 55.6639C119.016 55.602 119.62 55.5137 120.129 55.3988C120.642 55.2456 121.114 55.1087 121.547 54.9879C121.983 54.8289 122.359 54.7037 122.674 54.6124C123.027 54.524 123.358 54.4725 123.668 54.4577C124.245 54.4636 124.749 54.6756 125.179 55.0938C125.65 55.4767 126.049 56.0466 126.376 56.8035C126.611 57.2452 126.753 57.6605 126.8 58.0493C126.885 58.441 126.913 58.8282 126.884 59.2111C126.813 60.13 126.271 60.9164 125.258 61.5702C124.283 62.227 122.918 62.6997 121.163 62.9884C119.446 63.28 117.382 63.3331 114.969 63.1476ZM110.132 45.6756L119.206 46.3734C119.818 46.4205 120.266 46.3587 120.549 46.1878C120.873 45.9817 121.058 45.5723 121.105 44.9597C121.158 44.2705 120.993 43.6609 120.61 43.1308C120.23 42.5624 119.687 42.1162 118.98 41.7922C118.315 41.433 117.522 41.218 116.603 41.1473C115.417 41.0561 114.346 41.2048 113.392 41.5936C112.438 41.9824 111.663 42.539 111.068 43.2636C110.511 43.991 110.199 44.795 110.132 45.6756Z",
                fill: "#FF9F0A",
                style: {
                    fill: "color(display-p3 1.0000 0.6235 0.0392)",
                    fillOpacity: "1"
                }
            })]
        }), C.jsxs(be, {
            index: 9,
            children: [C.jsx("path", {
                d: "M151.344 62.5457C149.467 62.6699 147.775 62.397 146.268 61.727C144.797 61.0161 143.538 60.0219 142.492 58.7442C141.483 57.4639 140.673 55.9782 140.061 54.2869C139.487 52.5931 139.155 50.7678 139.064 48.8112C138.939 46.9337 139.069 45.1163 139.453 43.3592C139.837 41.602 140.446 40.0416 141.28 38.678C142.151 37.3119 143.253 36.2192 144.584 35.3999C145.951 34.5398 147.573 34.0476 149.451 33.9234C151.137 33.8119 152.79 34.0873 154.412 34.7497C156.072 35.4096 157.559 36.3695 158.874 37.6294C160.187 38.8511 161.245 40.3012 162.048 41.9798C162.888 43.6176 163.37 45.3752 163.494 47.2527C163.623 49.2068 163.382 51.0892 162.771 52.8999C162.195 54.6698 161.339 56.2658 160.201 57.688C159.064 59.1102 157.735 60.2564 156.215 61.1267C154.692 61.9586 153.068 62.4316 151.344 62.5457ZM149.575 54.1193C150.647 54.0483 151.589 53.7359 152.399 53.182C153.206 52.5898 153.83 51.8366 154.27 50.9224C154.748 50.0056 154.951 49.0108 154.88 47.938C154.807 46.8268 154.493 45.8662 153.939 45.0562C153.383 44.2079 152.667 43.5626 151.791 43.1202C150.915 42.6779 149.941 42.4922 148.868 42.5632C147.833 42.6316 146.892 42.944 146.043 43.5004C145.233 44.0543 144.609 44.7884 144.169 45.7026C143.765 46.576 143.599 47.5683 143.673 48.6794C143.744 49.7523 144.058 50.7129 144.614 51.5612C145.17 52.4095 145.888 53.074 146.766 53.5547C147.642 53.997 148.578 54.1852 149.575 54.1193ZM140.141 63.3446C138.761 63.4358 137.751 63.291 137.11 62.9101C136.469 62.5292 136.05 62.0181 135.854 61.3769C135.694 60.6948 135.589 59.9897 135.541 59.2617L133.355 26.214C133.301 25.4093 133.33 24.6762 133.44 24.0147C133.55 23.3532 133.88 22.8119 134.429 22.3907C135.015 21.9286 136.016 21.6507 137.434 21.5569C138.813 21.4657 139.804 21.6118 140.407 21.9952C141.009 22.3787 141.391 22.9115 141.552 23.5935C141.71 24.2373 141.794 24.9245 141.803 25.655L144.108 60.4845C143.974 61.3784 143.615 62.0564 143.03 62.5185C142.445 62.9805 141.482 63.2559 140.141 63.3446Z",
                fill: "#ffffff",
                stroke: "#ffffff",
                strokeWidth: "6"
            }), C.jsx("path", {
                d: "M151.344 62.5457C149.467 62.6699 147.775 62.397 146.268 61.727C144.797 61.0161 143.538 60.0219 142.492 58.7442C141.483 57.4639 140.673 55.9782 140.061 54.2869C139.487 52.5931 139.155 50.7678 139.064 48.8112C138.939 46.9337 139.069 45.1163 139.453 43.3592C139.837 41.602 140.446 40.0416 141.28 38.678C142.151 37.3119 143.253 36.2192 144.584 35.3999C145.951 34.5398 147.573 34.0476 149.451 33.9234C151.137 33.8119 152.79 34.0873 154.412 34.7497C156.072 35.4096 157.559 36.3695 158.874 37.6294C160.187 38.8511 161.245 40.3012 162.048 41.9798C162.888 43.6176 163.37 45.3752 163.494 47.2527C163.623 49.2068 163.382 51.0892 162.771 52.8999C162.195 54.6698 161.339 56.2658 160.201 57.688C159.064 59.1102 157.735 60.2564 156.215 61.1267C154.692 61.9586 153.068 62.4316 151.344 62.5457ZM149.575 54.1193C150.647 54.0483 151.589 53.7359 152.399 53.182C153.206 52.5898 153.83 51.8366 154.27 50.9224C154.748 50.0056 154.951 49.0108 154.88 47.938C154.807 46.8268 154.493 45.8662 153.939 45.0562C153.383 44.2079 152.667 43.5626 151.791 43.1202C150.915 42.6779 149.941 42.4922 148.868 42.5632C147.833 42.6316 146.892 42.944 146.043 43.5004C145.233 44.0543 144.609 44.7884 144.169 45.7026C143.765 46.576 143.599 47.5683 143.673 48.6794C143.744 49.7523 144.058 50.7129 144.614 51.5612C145.17 52.4095 145.888 53.074 146.766 53.5547C147.642 53.997 148.578 54.1852 149.575 54.1193ZM140.141 63.3446C138.761 63.4358 137.751 63.291 137.11 62.9101C136.469 62.5292 136.05 62.0181 135.854 61.3769C135.694 60.6948 135.589 59.9897 135.541 59.2617L133.355 26.214C133.301 25.4093 133.33 24.6762 133.44 24.0147C133.55 23.3532 133.88 22.8119 134.429 22.3907C135.015 21.9286 136.016 21.6507 137.434 21.5569C138.813 21.4657 139.804 21.6118 140.407 21.9952C141.009 22.3787 141.391 22.9115 141.552 23.5935C141.71 24.2373 141.794 24.9245 141.803 25.655L144.108 60.4845C143.974 61.3784 143.615 62.0564 143.03 62.5185C142.445 62.9805 141.482 63.2559 140.141 63.3446Z",
                fill: "#FFD60A",
                style: {
                    fill: "color(display-p3 1.0000 0.8392 0.0392)",
                    fillOpacity: "1"
                }
            })]
        })]
    })]
})
  , lh = "_group_10f3v_1"
  , ah = "_toggle_10f3v_10"
  , uh = "_indicator_10f3v_20"
  , ch = "_content_10f3v_27"
  , l7 = {
    group: lh,
    toggle: ah,
    indicator: uh,
    content: ch
}
  , fh = ({children: n, disabled: r}) => {
    const s = R.useId();
    return C.jsx(Tf, {
        id: s,
        children: C.jsx("div", {
            className: l7.group,
            style: {
                pointerEvents: r ? "none" : "auto"
            },
            children: n
        })
    })
}
  , A0 = ({children: n, active: r, ...s}) => {
    const {trigger: l} = T3();
    return C.jsxs("button", {
        className: l7.toggle,
        ...s,
        "data-active": r,
        onClick: u => {
            var d;
            if (r) {
                u.preventDefault();
                return
            }
            l(),
            (d = s.onClick) == null || d.call(s, u)
        }
        ,
        children: [r && C.jsx(V1.span, {
            layoutId: "toggle-indicator",
            className: l7.indicator,
            transition: {
                duration: .1
            }
        }), C.jsx("span", {
            className: l7.content,
            children: n
        })]
    })
}
  , dh = () => C.jsxs("svg", {
    width: "393",
    height: "118",
    viewBox: "0 0 393 118",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [C.jsxs("g", {
        filter: "url(#filter0_d_7388_437)",
        "data-figma-bg-blur-radius": "24",
        children: [C.jsx("path", {
            d: "M30 62C30 48.7452 40.7452 38 54 38C67.2548 38 78 48.7452 78 62C78 75.2548 67.2548 86 54 86C40.7452 86 30 75.2548 30 62Z",
            fill: "black",
            fillOpacity: "0.1",
            style: {
                fill: "black",
                fillOpacity: "0.1"
            },
            shapeRendering: "crispEdges"
        }), C.jsx("path", {
            d: "M54 38.5C66.9787 38.5 77.5 49.0213 77.5 62C77.5 74.9787 66.9787 85.5 54 85.5C41.0213 85.5 30.5 74.9787 30.5 62C30.5 49.0213 41.0213 38.5 54 38.5Z",
            stroke: "url(#paint0_linear_7388_437)",
            shapeRendering: "crispEdges"
        }), C.jsx("path", {
            d: "M47.5312 62.3296C47.5312 62.2098 47.5537 62.0975 47.5986 61.9927C47.6436 61.8879 47.7147 61.7905 47.812 61.7007L56.2573 53.5249C56.422 53.3527 56.6279 53.2666 56.875 53.2666C57.0397 53.2666 57.1857 53.304 57.313 53.3789C57.4478 53.4538 57.5526 53.5586 57.6274 53.6934C57.7098 53.8206 57.751 53.9704 57.751 54.1426C57.751 54.3747 57.6686 54.5806 57.5039 54.7603L49.665 62.3296L57.5039 69.9102C57.6686 70.0824 57.751 70.2882 57.751 70.5278C57.751 70.6925 57.7098 70.8423 57.6274 70.9771C57.5526 71.1118 57.4478 71.2129 57.313 71.2803C57.1857 71.3551 57.0397 71.3926 56.875 71.3926C56.6279 71.3926 56.422 71.3102 56.2573 71.1455L47.812 62.9697C47.7147 62.8799 47.6436 62.7826 47.5986 62.6777C47.5537 62.5729 47.5312 62.4569 47.5312 62.3296Z",
            fill: "black",
            style: {
                fill: "black",
                fillOpacity: "1"
            }
        })]
    }), C.jsxs("g", {
        filter: "url(#filter1_d_7388_437)",
        "data-figma-bg-blur-radius": "24",
        children: [C.jsx("path", {
            d: "M88 62C88 48.7452 98.7452 38 112 38H282C295.255 38 306 48.7452 306 62C306 75.2548 295.255 86 282 86H112C98.7452 86 88 75.2548 88 62Z",
            fill: "black",
            fillOpacity: "0.1",
            style: {
                fill: "black",
                fillOpacity: "0.1"
            },
            shapeRendering: "crispEdges"
        }), C.jsx("path", {
            d: "M112 38.5H282C294.979 38.5 305.5 49.0213 305.5 62C305.5 74.9787 294.979 85.5 282 85.5H112C99.0213 85.5 88.5 74.9787 88.5 62C88.5 49.0213 99.0213 38.5 112 38.5Z",
            stroke: "url(#paint1_linear_7388_437)",
            shapeRendering: "crispEdges"
        }), C.jsx("path", {
            d: "M285.093 61.1111C285.312 61.1111 285.479 61.0408 285.611 60.9089L289.03 57.4636C289.188 57.3054 289.259 57.1296 289.259 56.9275C289.259 56.7341 289.18 56.5408 289.03 56.3914L285.611 52.9197C285.479 52.7791 285.312 52.7 285.093 52.7C284.697 52.7 284.39 53.0251 284.39 53.4382C284.39 53.6228 284.46 53.7986 284.583 53.948L286.728 56.0398C286.279 55.9607 285.822 55.9255 285.374 55.9255C281.278 55.9255 278 59.1951 278 63.2908C278 67.3865 281.287 70.6824 285.383 70.6824C289.47 70.6824 292.757 67.3865 292.757 63.2908C292.757 62.8601 292.449 62.5437 292.01 62.5437C291.588 62.5437 291.307 62.8601 291.307 63.2908C291.307 66.5867 288.67 69.2322 285.383 69.2322C282.087 69.2322 279.45 66.5867 279.45 63.2908C279.45 59.9861 282.078 57.3582 285.374 57.3582C285.98 57.3582 286.525 57.4021 287.009 57.4988L284.592 59.8982C284.46 60.0388 284.39 60.2058 284.39 60.3904C284.39 60.8035 284.697 61.1111 285.093 61.1111Z",
            fill: "black",
            stroke: "black",
            style: {
                fill: "black",
                fillOpacity: "1",
                stroke: "black",
                strokeOpacity: "1"
            },
            strokeWidth: "0.2"
        }), C.jsx("path", {
            d: "M168.893 68V56.022H170.753V61.0854H176.904V56.022H178.755V68H176.904V62.6958H170.753V68H168.893ZM183.584 68.1494C181.865 68.1494 180.595 67.1035 180.595 65.4683V65.4517C180.595 63.8413 181.807 62.9033 183.957 62.7705L186.398 62.6294V61.8325C186.398 60.8447 185.775 60.2969 184.555 60.2969C183.559 60.2969 182.903 60.6621 182.687 61.3013L182.679 61.3345H180.944L180.952 61.2764C181.168 59.7988 182.588 58.811 184.638 58.811C186.904 58.811 188.182 59.9399 188.182 61.8325V68H186.398V66.7217H186.257C185.725 67.6348 184.779 68.1494 183.584 68.1494ZM182.388 65.3936C182.388 66.2236 183.094 66.7134 184.065 66.7134C185.41 66.7134 186.398 65.8335 186.398 64.6714V63.8994L184.198 64.0405C182.953 64.1152 182.388 64.5635 182.388 65.377V65.3936ZM190.28 71.0049V58.9854H192.082V60.4048H192.214C192.737 59.417 193.725 58.8276 194.987 58.8276C197.261 58.8276 198.722 60.6455 198.722 63.4844V63.501C198.722 66.3564 197.278 68.1494 194.987 68.1494C193.75 68.1494 192.696 67.5435 192.214 66.5723H192.082V71.0049H190.28ZM194.481 66.6138C195.983 66.6138 196.888 65.4351 196.888 63.501V63.4844C196.888 61.542 195.983 60.3716 194.481 60.3716C192.978 60.3716 192.048 61.5586 192.048 63.4844V63.501C192.048 65.4268 192.978 66.6138 194.481 66.6138ZM203.85 68.0581C201.866 68.0581 201.053 67.3608 201.053 65.626V60.4048H199.642V58.9854H201.053V56.7109H202.887V58.9854H204.821V60.4048H202.887V65.1943C202.887 66.1655 203.252 66.564 204.141 66.564C204.415 66.564 204.572 66.5557 204.821 66.5308V67.9668C204.531 68.0166 204.199 68.0581 203.85 68.0581ZM207.417 57.375C206.795 57.375 206.288 56.8687 206.288 56.2544C206.288 55.6318 206.795 55.1255 207.417 55.1255C208.032 55.1255 208.546 55.6318 208.546 56.2544C208.546 56.8687 208.032 57.375 207.417 57.375ZM206.513 68V58.9854H208.306V68H206.513ZM214.28 68.1743C211.649 68.1743 210.038 66.3813 210.038 63.4678V63.4512C210.038 60.5957 211.64 58.811 214.272 58.811C216.538 58.811 217.891 60.0894 218.14 61.8408V61.8823L216.413 61.8906L216.405 61.8657C216.206 60.9775 215.475 60.3135 214.28 60.3135C212.778 60.3135 211.873 61.5088 211.873 63.4512V63.4678C211.873 65.46 212.794 66.6719 214.28 66.6719C215.409 66.6719 216.106 66.1572 216.397 65.186L216.413 65.1445H218.14L218.123 65.2192C217.8 66.9707 216.513 68.1743 214.28 68.1743ZM223.019 68.1743C220.844 68.1743 219.466 67.1533 219.292 65.6426V65.6343H221.093L221.101 65.6426C221.325 66.3232 221.981 66.7798 223.052 66.7798C224.164 66.7798 224.936 66.2734 224.936 65.5347V65.5181C224.936 64.9536 224.513 64.5718 223.467 64.3311L222.031 63.999C220.329 63.6089 219.541 62.8369 219.541 61.5171V61.5088C219.541 59.9399 221.002 58.811 223.044 58.811C225.102 58.811 226.422 59.8403 226.58 61.3096V61.3179H224.861V61.3013C224.687 60.6704 224.048 60.1973 223.035 60.1973C222.048 60.1973 221.334 60.687 221.334 61.4092V61.4258C221.334 61.9902 221.749 62.3389 222.761 62.5796L224.189 62.9033C225.924 63.3101 226.754 64.0488 226.754 65.3521V65.3687C226.754 67.0371 225.16 68.1743 223.019 68.1743Z",
            fill: "black",
            style: {
                fill: "black",
                fillOpacity: "1"
            }
        }), C.jsx("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M106.92 53H114.08C114.615 53 115.06 53 115.425 53.0297C115.805 53.0608 116.161 53.1279 116.498 53.2997C117.016 53.5634 117.437 53.9841 117.7 54.5015C117.872 54.8388 117.939 55.1954 117.97 55.5753C118 55.9396 118 56.3854 118 56.9195V58.5805C118 59.1146 118 59.5604 117.97 59.9247C117.939 60.3046 117.872 60.6612 117.7 60.9985C117.437 61.5159 117.016 61.9366 116.498 62.2003C116.161 62.3721 115.805 62.4392 115.425 62.4703C115.06 62.5 114.615 62.5 114.08 62.5H106.92C106.385 62.5 105.94 62.5 105.575 62.4703C105.195 62.4392 104.839 62.3721 104.502 62.2003C103.984 61.9366 103.563 61.5159 103.3 60.9985C103.128 60.6612 103.061 60.3046 103.03 59.9247C103 59.5604 103 59.1146 103 58.5804V56.9196C103 56.3854 103 55.9396 103.03 55.5753C103.061 55.1954 103.128 54.8388 103.3 54.5015C103.563 53.9841 103.984 53.5634 104.502 53.2997C104.839 53.1279 105.195 53.0608 105.575 53.0297C105.94 53 106.385 53 106.92 53ZM105.697 54.5248C105.41 54.5482 105.273 54.5901 105.183 54.6362C104.947 54.7561 104.756 54.9473 104.636 55.1825C104.59 55.2731 104.548 55.4104 104.525 55.6975C104.501 55.9934 104.5 56.3776 104.5 56.95V58.55C104.5 59.1224 104.501 59.5066 104.525 59.8025C104.548 60.0896 104.59 60.2269 104.636 60.3175C104.756 60.5527 104.947 60.7439 105.183 60.8638C105.273 60.9099 105.41 60.9518 105.697 60.9752C105.993 60.9994 106.378 61 106.95 61H114.05C114.622 61 115.007 60.9994 115.303 60.9752C115.59 60.9518 115.727 60.9099 115.817 60.8638C116.053 60.7439 116.244 60.5527 116.364 60.3175C116.41 60.2269 116.452 60.0896 116.475 59.8025C116.499 59.5066 116.5 59.1224 116.5 58.55V56.95C116.5 56.3776 116.499 55.9934 116.475 55.6975C116.452 55.4104 116.41 55.2731 116.364 55.1825C116.244 54.9473 116.053 54.7561 115.817 54.6362C115.727 54.5901 115.59 54.5482 115.303 54.5248C115.007 54.5006 114.622 54.5 114.05 54.5H106.95C106.378 54.5 105.993 54.5006 105.697 54.5248ZM103 66.25C103 65.8358 103.336 65.5 103.75 65.5H117.25C117.664 65.5 118 65.8358 118 66.25C118 66.6642 117.664 67 117.25 67H103.75C103.336 67 103 66.6642 103 66.25ZM103 70.25C103 69.8358 103.336 69.5 103.75 69.5H113.25C113.664 69.5 114 69.8358 114 70.25C114 70.6642 113.664 71 113.25 71H103.75C103.336 71 103 70.6642 103 70.25Z",
            fill: "black",
            stroke: "black",
            style: {
                fill: "black",
                fillOpacity: "1",
                stroke: "black",
                strokeOpacity: "1"
            },
            strokeWidth: "0.2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        })]
    }), C.jsx("foreignObject", {
        x: "276",
        y: "0",
        width: "128",
        height: "128",
        children: C.jsx("div", {
            style: {
                backdropFilter: "blur(12px)"
            }
        })
    }), C.jsxs("g", {
        filter: "url(#filter2_d_7388_437)",
        "data-figma-bg-blur-radius": "24",
        children: [C.jsx("path", {
            d: "M316 62C316 48.7452 326.745 38 340 38C353.255 38 364 48.7452 364 62C364 75.2548 353.255 86 340 86C326.745 86 316 75.2548 316 62Z",
            fill: "black",
            fillOpacity: "0.1",
            style: {
                fill: "black",
                fillOpacity: "0.1"
            },
            shapeRendering: "crispEdges"
        }), C.jsx("path", {
            d: "M340 38.5C352.979 38.5 363.5 49.0213 363.5 62C363.5 74.9787 352.979 85.5 340 85.5C327.021 85.5 316.5 74.9787 316.5 62C316.5 49.0213 327.021 38.5 340 38.5Z",
            stroke: "url(#paint2_linear_7388_437)",
            shapeRendering: "crispEdges"
        }), C.jsx("path", {
            d: "M332.24 64.2837C331.873 64.2837 331.543 64.1976 331.251 64.0254C330.959 63.8532 330.724 63.6211 330.544 63.3291C330.364 63.0296 330.274 62.6965 330.274 62.3296C330.274 61.9702 330.364 61.6445 330.544 61.3525C330.724 61.0531 330.959 60.8172 331.251 60.645C331.543 60.4653 331.873 60.3755 332.24 60.3755C332.592 60.3755 332.917 60.4653 333.217 60.645C333.516 60.8172 333.752 61.0531 333.924 61.3525C334.104 61.6445 334.194 61.9702 334.194 62.3296C334.194 62.6965 334.104 63.0296 333.924 63.3291C333.752 63.6211 333.516 63.8532 333.217 64.0254C332.917 64.1976 332.592 64.2837 332.24 64.2837ZM340 64.2837C339.633 64.2837 339.3 64.1976 339 64.0254C338.708 63.8532 338.473 63.6211 338.293 63.3291C338.121 63.0296 338.035 62.6965 338.035 62.3296C338.035 61.9702 338.121 61.6445 338.293 61.3525C338.473 61.0531 338.708 60.8172 339 60.645C339.3 60.4653 339.633 60.3755 340 60.3755C340.352 60.3755 340.678 60.4653 340.977 60.645C341.277 60.8172 341.512 61.0531 341.685 61.3525C341.864 61.6445 341.954 61.9702 341.954 62.3296C341.954 62.6965 341.864 63.0296 341.685 63.3291C341.512 63.6211 341.277 63.8532 340.977 64.0254C340.678 64.1976 340.352 64.2837 340 64.2837ZM347.76 64.2837C347.393 64.2837 347.06 64.1976 346.761 64.0254C346.469 63.8532 346.233 63.6211 346.053 63.3291C345.881 63.0296 345.795 62.6965 345.795 62.3296C345.795 61.9702 345.881 61.6445 346.053 61.3525C346.233 61.0531 346.469 60.8172 346.761 60.645C347.06 60.4653 347.393 60.3755 347.76 60.3755C348.112 60.3755 348.438 60.4653 348.737 60.645C349.037 60.8172 349.273 61.0531 349.445 61.3525C349.625 61.6445 349.714 61.9702 349.714 62.3296C349.714 62.6965 349.625 63.0296 349.445 63.3291C349.273 63.6211 349.037 63.8532 348.737 64.0254C348.438 64.1976 348.112 64.2837 347.76 64.2837Z",
            fill: "black",
            style: {
                fill: "black",
                fillOpacity: "1"
            }
        })]
    }), C.jsxs("defs", {
        children: [C.jsxs("filter", {
            id: "filter0_d_7388_437",
            x: "-10",
            y: "0",
            width: "128",
            height: "128",
            filterUnits: "userSpaceOnUse",
            colorInterpolationFilters: "sRGB",
            children: [C.jsx("feFlood", {
                floodOpacity: "0",
                result: "BackgroundImageFix"
            }), C.jsx("feColorMatrix", {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
            }), C.jsx("feOffset", {
                dy: "2"
            }), C.jsx("feGaussianBlur", {
                stdDeviation: "20"
            }), C.jsx("feComposite", {
                in2: "hardAlpha",
                operator: "out"
            }), C.jsx("feColorMatrix", {
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            }), C.jsx("feBlend", {
                mode: "normal",
                in2: "BackgroundImageFix",
                result: "effect1_dropShadow_7388_437"
            }), C.jsx("feBlend", {
                mode: "normal",
                in: "SourceGraphic",
                in2: "effect1_dropShadow_7388_437",
                result: "shape"
            })]
        }), C.jsx("clipPath", {
            id: "bgblur_0_7388_437_clip_path",
            transform: "translate(10 0)",
            children: C.jsx("path", {
                d: "M30 62C30 48.7452 40.7452 38 54 38C67.2548 38 78 48.7452 78 62C78 75.2548 67.2548 86 54 86C40.7452 86 30 75.2548 30 62Z"
            })
        }), C.jsxs("filter", {
            id: "filter1_d_7388_437",
            x: "48",
            y: "0",
            width: "298",
            height: "128",
            filterUnits: "userSpaceOnUse",
            colorInterpolationFilters: "sRGB",
            children: [C.jsx("feFlood", {
                floodOpacity: "0",
                result: "BackgroundImageFix"
            }), C.jsx("feColorMatrix", {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
            }), C.jsx("feOffset", {
                dy: "2"
            }), C.jsx("feGaussianBlur", {
                stdDeviation: "20"
            }), C.jsx("feComposite", {
                in2: "hardAlpha",
                operator: "out"
            }), C.jsx("feColorMatrix", {
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            }), C.jsx("feBlend", {
                mode: "normal",
                in2: "BackgroundImageFix",
                result: "effect1_dropShadow_7388_437"
            }), C.jsx("feBlend", {
                mode: "normal",
                in: "SourceGraphic",
                in2: "effect1_dropShadow_7388_437",
                result: "shape"
            })]
        }), C.jsx("clipPath", {
            id: "bgblur_1_7388_437_clip_path",
            transform: "translate(-48 0)",
            children: C.jsx("path", {
                d: "M88 62C88 48.7452 98.7452 38 112 38H282C295.255 38 306 48.7452 306 62C306 75.2548 295.255 86 282 86H112C98.7452 86 88 75.2548 88 62Z"
            })
        }), C.jsxs("filter", {
            id: "filter2_d_7388_437",
            x: "276",
            y: "0",
            width: "128",
            height: "128",
            filterUnits: "userSpaceOnUse",
            colorInterpolationFilters: "sRGB",
            children: [C.jsx("feFlood", {
                floodOpacity: "0",
                result: "BackgroundImageFix"
            }), C.jsx("feColorMatrix", {
                in: "SourceAlpha",
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
                result: "hardAlpha"
            }), C.jsx("feOffset", {
                dy: "2"
            }), C.jsx("feGaussianBlur", {
                stdDeviation: "20"
            }), C.jsx("feComposite", {
                in2: "hardAlpha",
                operator: "out"
            }), C.jsx("feColorMatrix", {
                type: "matrix",
                values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            }), C.jsx("feBlend", {
                mode: "normal",
                in2: "BackgroundImageFix",
                result: "effect1_dropShadow_7388_437"
            }), C.jsx("feBlend", {
                mode: "normal",
                in: "SourceGraphic",
                in2: "effect1_dropShadow_7388_437",
                result: "shape"
            })]
        }), C.jsx("clipPath", {
            id: "bgblur_2_7388_437_clip_path",
            transform: "translate(-276 0)",
            children: C.jsx("path", {
                d: "M316 62C316 48.7452 326.745 38 340 38C353.255 38 364 48.7452 364 62C364 75.2548 353.255 86 340 86C326.745 86 316 75.2548 316 62Z"
            })
        }), C.jsxs("linearGradient", {
            id: "paint0_linear_7388_437",
            x1: "39.5",
            y1: "43",
            x2: "68",
            y2: "81",
            gradientUnits: "userSpaceOnUse",
            children: [C.jsx("stop", {
                stopColor: "white",
                stopOpacity: "0.12",
                style: {
                    stopColor: "white",
                    stopOpacity: "0.12"
                }
            }), C.jsx("stop", {
                offset: "0.5",
                stopColor: "white",
                stopOpacity: "0.02",
                style: {
                    stopColor: "white",
                    stopOpacity: "0.02"
                }
            }), C.jsx("stop", {
                offset: "1",
                stopColor: "white",
                stopOpacity: "0.12",
                style: {
                    stopColor: "white",
                    stopOpacity: "0.12"
                }
            })]
        }), C.jsxs("linearGradient", {
            id: "paint1_linear_7388_437",
            x1: "131.146",
            y1: "43",
            x2: "140.691",
            y2: "100.799",
            gradientUnits: "userSpaceOnUse",
            children: [C.jsx("stop", {
                stopColor: "white",
                stopOpacity: "0.12",
                style: {
                    stopColor: "white",
                    stopOpacity: "0.12"
                }
            }), C.jsx("stop", {
                offset: "0.5",
                stopColor: "white",
                stopOpacity: "0.02",
                style: {
                    stopColor: "white",
                    stopOpacity: "0.02"
                }
            }), C.jsx("stop", {
                offset: "1",
                stopColor: "white",
                stopOpacity: "0.12",
                style: {
                    stopColor: "white",
                    stopOpacity: "0.12"
                }
            })]
        }), C.jsxs("linearGradient", {
            id: "paint2_linear_7388_437",
            x1: "325.5",
            y1: "43",
            x2: "354",
            y2: "81",
            gradientUnits: "userSpaceOnUse",
            children: [C.jsx("stop", {
                stopColor: "white",
                stopOpacity: "0.12",
                style: {
                    stopColor: "white",
                    stopOpacity: "0.12"
                }
            }), C.jsx("stop", {
                offset: "0.5",
                stopColor: "white",
                stopOpacity: "0.02",
                style: {
                    stopColor: "white",
                    stopOpacity: "0.02"
                }
            }), C.jsx("stop", {
                offset: "1",
                stopColor: "white",
                stopOpacity: "0.12",
                style: {
                    stopColor: "white",
                    stopOpacity: "0.12"
                }
            })]
        })]
    })]
})
  , Ch = "_install_49bjl_1"
  , hh = "_commands_49bjl_8"
  , ph = "_cmd_49bjl_30"
  , D0 = {
    install: Ch,
    commands: hh,
    cmd: ph
};
var Ve, mh = (Ve = class {
    constructor(r) {
        _1(this, "element");
        _1(this, "options", {});
        _1(this, "data");
        _1(this, "currentMeasures", {});
        _1(this, "prevMeasures", {});
        _1(this, "isInitialRender", !0);
        _1(this, "prefersReducedMotion", !1);
        _1(this, "mediaQuery");
        _1(this, "handleMediaQueryChange", r => {
            this.prefersReducedMotion = r.matches
        }
        );
        if (this.options = {
            locale: "en",
            duration: 400,
            scale: !0,
            ease: "cubic-bezier(0.19, 1, 0.22, 1)",
            respectReducedMotion: !0,
            ...r
        },
        this.element = r.element,
        typeof window < "u" && this.options.respectReducedMotion) {
            this.mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)"),
            this.prefersReducedMotion = this.mediaQuery.matches;
            let s = l => {
                this.prefersReducedMotion = l.matches
            }
            ;
            this.mediaQuery.addEventListener("change", s)
        }
        this.isDisabled() || (this.element.setAttribute("torph-root", ""),
        this.element.style.transitionDuration = `${this.options.duration}ms`,
        this.element.style.transitionTimingFunction = this.options.ease,
        r.debug && this.element.setAttribute("torph-debug", "")),
        this.data = this.element.innerHTML,
        this.isDisabled() || this.addStyles()
    }
    destroy() {
        this.mediaQuery && this.mediaQuery.removeEventListener("change", this.handleMediaQueryChange),
        this.element.getAnimations().forEach(r => r.cancel()),
        this.element.removeAttribute("torph-root"),
        this.element.removeAttribute("torph-debug"),
        this.removeStyles()
    }
    isDisabled() {
        return !!(this.options.disabled || this.options.respectReducedMotion && this.prefersReducedMotion)
    }
    update(r) {
        if (r !== this.data) {
            if (this.data = r,
            this.isDisabled()) {
                typeof r == "string" && (this.element.textContent = r);
                return
            }
            if (this.data instanceof HTMLElement)
                throw new Error("HTMLElement not yet supported");
            this.options.onAnimationStart && !this.isInitialRender && this.options.onAnimationStart(),
            this.createTextGroup(this.data, this.element)
        }
    }
    createTextGroup(r, s) {
        let l = s.offsetWidth, u = s.offsetHeight, d = r.includes(" "), f;
        if (typeof Intl.Segmenter < "u") {
            let P = new Intl.Segmenter(this.options.locale,{
                granularity: d ? "word" : "grapheme"
            }).segment(r)[Symbol.iterator]();
            f = this.blocks(P)
        } else
            f = this.blocksFallback(r, d);
        this.prevMeasures = this.measure();
        let h = Array.from(s.children)
          , p = new Set(f.map(P => P.id))
          , g = h.filter(P => !p.has(P.getAttribute("torph-id")) && !P.hasAttribute("torph-exiting"))
          , y = new Set(g)
          , v = new Map;
        for (let P = 0; P < h.length; P++) {
            let _ = h[P];
            if (!y.has(_))
                continue;
            let D = null;
            for (let V = P + 1; V < h.length; V++) {
                let N = h[V].getAttribute("torph-id");
                if (p.has(N) && !y.has(h[V])) {
                    D = N;
                    break
                }
            }
            if (!D)
                for (let V = P - 1; V >= 0; V--) {
                    let N = h[V].getAttribute("torph-id");
                    if (p.has(N) && !y.has(h[V])) {
                        D = N;
                        break
                    }
                }
            v.set(_, D)
        }
        let w = s.getBoundingClientRect();
        if (g.forEach(P => {
            let _ = P.getBoundingClientRect();
            P.setAttribute("torph-exiting", ""),
            P.style.position = "absolute",
            P.style.pointerEvents = "none",
            P.style.left = `${_.left - w.left}px`,
            P.style.top = `${_.top - w.top}px`,
            P.style.width = `${_.width}px`,
            P.style.height = `${_.height}px`
        }
        ),
        h.forEach(P => {
            let _ = P.getAttribute("torph-id");
            p.has(_) && P.remove()
        }
        ),
        f.forEach(P => {
            let _ = document.createElement("span");
            _.setAttribute("torph-item", ""),
            _.setAttribute("torph-id", P.id),
            _.textContent = P.string,
            s.appendChild(_)
        }
        ),
        this.currentMeasures = this.measure(),
        this.updateStyles(f),
        g.forEach(P => {
            if (this.isInitialRender) {
                P.remove();
                return
            }
            let _ = v.get(P)
              , D = 0
              , V = 0;
            if (_ && this.prevMeasures[_] && this.currentMeasures[_]) {
                let X = this.prevMeasures[_]
                  , $ = this.currentMeasures[_];
                D = $.x - X.x,
                V = $.y - X.y
            }
            P.getAnimations().forEach(X => X.cancel()),
            P.animate({
                transform: this.options.scale ? `translate(${D}px, ${V}px) scale(0.95)` : `translate(${D}px, ${V}px)`,
                offset: 1
            }, {
                duration: this.options.duration,
                easing: this.options.ease,
                fill: "both"
            });
            let N = P.animate({
                opacity: 0,
                offset: 1
            }, {
                duration: this.options.duration * .25,
                easing: "linear",
                fill: "both"
            });
            N.onfinish = () => P.remove()
        }
        ),
        this.isInitialRender) {
            this.isInitialRender = !1,
            s.style.width = "auto",
            s.style.height = "auto";
            return
        }
        if (l === 0 || u === 0)
            return;
        s.style.width = "auto",
        s.style.height = "auto",
        s.offsetWidth;
        let j = s.offsetWidth
          , A = s.offsetHeight;
        s.style.width = `${l}px`,
        s.style.height = `${u}px`,
        s.offsetWidth,
        s.style.width = `${j}px`,
        s.style.height = `${A}px`,
        setTimeout( () => {
            s.style.width = "auto",
            s.style.height = "auto",
            this.options.onAnimationComplete && this.options.onAnimationComplete()
        }
        , this.options.duration)
    }
    measure() {
        let r = Array.from(this.element.children)
          , s = {};
        return r.forEach( (l, u) => {
            if (l.hasAttribute("torph-exiting"))
                return;
            let d = l.getAttribute("torph-id") || `child-${u}`;
            s[d] = {
                x: l.offsetLeft,
                y: l.offsetTop
            }
        }
        ),
        s
    }
    updateStyles(r) {
        if (this.isInitialRender)
            return;
        let s = Array.from(this.element.children)
          , l = new Set(r.map(u => u.id).filter(u => this.prevMeasures[u]));
        s.forEach( (u, d) => {
            if (u.hasAttribute("torph-exiting"))
                return;
            let f = u.getAttribute("torph-id") || `child-${d}`
              , h = this.prevMeasures[f]
              , p = this.currentMeasures[f]
              , g = (p == null ? void 0 : p.x) || 0
              , y = (p == null ? void 0 : p.y) || 0
              , v = h ? h.x - g : 0
              , w = h ? h.y - y : 0
              , j = !h;
            if (j) {
                let _ = r.findIndex(V => V.id === f)
                  , D = null;
                for (let V = _ - 1; V >= 0; V--)
                    if (l.has(r[V].id)) {
                        D = r[V].id;
                        break
                    }
                if (!D) {
                    for (let V = _ + 1; V < r.length; V++)
                        if (l.has(r[V].id)) {
                            D = r[V].id;
                            break
                        }
                }
                if (D) {
                    let V = this.prevMeasures[D]
                      , N = this.currentMeasures[D];
                    v = V.x - N.x,
                    w = V.y - N.y
                }
            }
            u.getAnimations().forEach(_ => _.cancel()),
            u.animate({
                transform: `translate(${v}px, ${w}px) scale(${j ? .95 : 1})`,
                offset: 0
            }, {
                duration: this.options.duration,
                easing: this.options.ease,
                fill: "both"
            });
            let A = j ? this.options.duration * .25 : 0
              , P = j ? this.options.duration * .25 : 0;
            u.animate({
                opacity: j ? 0 : 1,
                offset: 0
            }, {
                duration: A,
                delay: P,
                easing: "linear",
                fill: "both"
            })
        }
        )
    }
    addStyles() {
        if (Ve.styleEl)
            return;
        let r = document.createElement("style");
        r.dataset.torph = "true",
        r.innerHTML = `
[torph-root] {
  display: inline-flex;
  position: relative;
  will-change: width, height;
  transition-property: width, height;
  white-space: nowrap;
}

[torph-item] {
  display: inline-block;
  will-change: opacity, transform;
  transform: none;
  opacity: 1;
}

[torph-root][torph-debug] {
  outline:2px solid magenta;
  [torph-item] {
    outline:2px solid cyan;
    outline-offset: -4px;
  }
}
  `,
        document.head.appendChild(r),
        Ve.styleEl = r
    }
    removeStyles() {
        Ve.styleEl && (Ve.styleEl.remove(),
        Ve.styleEl = void 0)
    }
    blocks(r) {
        return Array.from(r).reduce( (s, l) => l.segment === " " ? [...s, {
            id: `space-${l.index}`,
            string: " "
        }] : s.find(u => u.string === l.segment) ? [...s, {
            id: `${l.segment}-${l.index}`,
            string: l.segment
        }] : [...s, {
            id: l.segment,
            string: l.segment
        }], [])
    }
    blocksFallback(r, s) {
        let l = s ? r.split(" ") : r.split("")
          , u = [];
        return s ? l.forEach( (d, f) => {
            f > 0 && u.push({
                id: `space-${f}`,
                string: " "
            }),
            u.find(h => h.string === d) ? u.push({
                id: `${d}-${f}`,
                string: d
            }) : u.push({
                id: d,
                string: d
            })
        }
        ) : l.forEach( (d, f) => {
            u.find(h => h.string === d) ? u.push({
                id: `${d}-${f}`,
                string: d
            }) : u.push({
                id: d,
                string: d
            })
        }
        ),
        u
    }
    log(...r) {
        this.options.debug && console.log("[TextMorph]", ...r)
    }
}
,
_1(Ve, "styleEl"),
Ve), oo = ({children: n, className: r, style: s, as: l="div", ...u}) => {
    let {ref: d, update: f} = yh(u);
    return wt.useEffect( () => {
        f(n)
    }
    , [n, f]),
    wt.createElement(l, {
        ref: d,
        className: r,
        style: s
    })
}
;
function yh(n) {
    let r = wt.useRef(null)
      , s = wt.useRef(null);
    return wt.useEffect( () => (r.current && (s.current = new mh({
        element: r.current,
        ...n
    })),
    () => {
        var l;
        (l = s.current) == null || l.destroy()
    }
    ), []),
    {
        ref: r,
        update: l => {
            var u;
            (u = s.current) == null || u.update(l)
        }
    }
}
const gh = "_container_1hxak_1"
  , vh = "_copy_1hxak_10"
  , ds = {
    container: gh,
    copy: vh
}
  , xh = ({property: n="height"}) => {
    const r = R.useRef(null)
      , [s,l] = R.useState("auto")
      , [u,d] = R.useState("auto");
    return R.useEffect( () => {
        if (r.current) {
            const p = new ResizeObserver(g => {
                const y = g[0].contentRect.height
                  , v = g[0].contentRect.width;
                l(y),
                d(v)
            }
            );
            return p.observe(r.current),
            () => {
                p.disconnect()
            }
        }
    }
    , []),
    {
        ref: r,
        height: n === "height" ? s : "auto",
        width: n === "width" ? u : "auto"
    }
}
  , wh = ({children: n, overflow: r=!1, duration: s=400, className: l, property: u="height"}) => {
    const {ref: d, width: f, height: h} = xh({
        property: u
    })
      , p = u === "both" ? "height, width" : u;
    return C.jsx("div", {
        style: {
            height: h,
            width: f,
            overflow: r ? "visible" : "hidden",
            transitionDuration: `${s}ms`,
            transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
            transitionProperty: p
        },
        className: l,
        children: C.jsx("div", {
            ref: d,
            children: n
        })
    })
}
  , U5 = ({code: n, children: r}) => {
    const {trigger: s} = T3()
      , [l,u] = R.useState(!1);
    return C.jsxs("div", {
        className: ds.container,
        children: [C.jsx("button", {
            className: ds.copy,
            onClick: () => {
                n && (u(!0),
                navigator.clipboard.writeText(n.toString()),
                s(),
                setTimeout( () => {
                    u(!1)
                }
                , 2e3))
            }
            ,
            children: C.jsx(oo, {
                children: l ? "Copied" : "Copy"
            })
        }), C.jsx("pre", {
            children: C.jsx(wh, {
                children: r ?? n
            })
        })]
    })
}
  , xn = {
    npm: "npm i web-haptics",
    pnpm: "pnpm i web-haptics",
    yarn: "yarn add web-haptics",
    bun: "bun i web-haptics"
}
  , lo = () => {
    const {trigger: n} = T3()
      , [r,s] = R.useState(0);
    return C.jsxs("div", {
        className: D0.install,
        children: [C.jsx("div", {
            className: D0.commands,
            children: Object.keys(xn).map( (l, u) => C.jsx("button", {
                onClick: () => {
                    u !== r && (s(u),
                    n())
                }
                ,
                "data-active": u === r,
                children: l
            }, l))
        }), C.jsx("div", {
            className: D0.cmd,
            children: C.jsxs(U5, {
                code: xn[Object.keys(xn)[r]],
                children: [C.jsx("span", {
                    style: {
                        opacity: .4,
                        userSelect: "none"
                    },
                    children: "$ "
                }), C.jsx(oo, {
                    children: xn[Object.keys(xn)[r]]
                })]
            })
        })]
    })
}
  , kh = "_usage_sr7xm_1"
  , Mh = "_commands_sr7xm_8"
  , e7 = {
    usage: kh,
    commands: Mh
}
  , Sh = () => C.jsxs("svg", {
    width: "21",
    height: "19",
    viewBox: "0 0 21 19",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [C.jsx("path", {
        d: "M18.1445 0H2.85547C1.83072 0 1 0.830722 1 1.85547V17.1445C1 18.1693 1.83072 19 2.85547 19H18.1445C19.1693 19 20 18.1693 20 17.1445V1.85547C20 0.830722 19.1693 0 18.1445 0Z",
        fill: "#3178C6"
    }), C.jsx("path", {
        d: "M18.1445 0H2.85547C1.83072 0 1 0.830722 1 1.85547V17.1445C1 18.1693 1.83072 19 2.85547 19H18.1445C19.1693 19 20 18.1693 20 17.1445V1.85547C20 0.830722 19.1693 0 18.1445 0Z",
        fill: "#3178C6"
    }), C.jsx("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12.7614 15.1193V16.977C13.0634 17.1318 13.4206 17.2479 13.8329 17.3253C14.2453 17.4027 14.6799 17.4414 15.1368 17.4414C15.5821 17.4414 16.005 17.3988 16.4058 17.3137C16.8065 17.2285 17.1579 17.0882 17.4599 16.8928C17.7619 16.6974 18.001 16.4419 18.1772 16.1265C18.3533 15.811 18.4414 15.4211 18.4414 14.9567C18.4414 14.62 18.3911 14.3249 18.2904 14.0714C18.1897 13.8179 18.0446 13.5925 17.8548 13.3951C17.6651 13.1977 17.4376 13.0206 17.1724 12.8639C16.9072 12.7071 16.6081 12.5591 16.2751 12.4198C16.0312 12.3191 15.8124 12.2214 15.6188 12.1266C15.4252 12.0317 15.2607 11.935 15.1252 11.8363C14.9896 11.7376 14.8851 11.6331 14.8116 11.5228C14.738 11.4125 14.7012 11.2877 14.7012 11.1484C14.7012 11.0207 14.7341 10.9055 14.7999 10.8029C14.8658 10.7004 14.9587 10.6124 15.0787 10.5388C15.1988 10.4653 15.3459 10.4082 15.5201 10.3675C15.6943 10.3269 15.8879 10.3066 16.1009 10.3066C16.2557 10.3066 16.4193 10.3182 16.5916 10.3414C16.7639 10.3646 16.9372 10.4005 17.1114 10.4488C17.2857 10.4972 17.455 10.5582 17.6196 10.6317C17.7842 10.7052 17.9361 10.7904 18.0755 10.8871V9.15132C17.7929 9.04296 17.4841 8.96266 17.1492 8.91041C16.8143 8.85816 16.43 8.83203 15.9963 8.83203C15.5549 8.83203 15.1368 8.87946 14.7419 8.97427C14.3469 9.06909 13.9995 9.21712 13.6993 9.41836C13.3993 9.61964 13.1622 9.87603 12.9879 10.1876C12.8137 10.4991 12.7266 10.8716 12.7266 11.3051C12.7266 11.8586 12.8863 12.3307 13.2057 12.7217C13.5251 13.1125 14.0101 13.4434 14.6606 13.7144C14.9161 13.8189 15.1542 13.9214 15.3749 14.022C15.5956 14.1227 15.7863 14.2272 15.947 14.3355C16.1076 14.4439 16.2344 14.5619 16.3274 14.6897C16.4203 14.8174 16.4668 14.9625 16.4668 15.1251C16.4668 15.2451 16.4377 15.3563 16.3796 15.4589C16.3216 15.5614 16.2335 15.6504 16.1154 15.7259C15.9973 15.8014 15.8502 15.8604 15.674 15.903C15.4978 15.9456 15.2917 15.9668 15.0555 15.9668C14.6528 15.9668 14.254 15.8962 13.8591 15.7549C13.4641 15.6137 13.0982 15.4018 12.7614 15.1193ZM9.63832 10.5421H12.0215V9.01758H5.37891V10.5421H7.75042V17.3301H9.63832V10.5421Z",
        fill: "white"
    })]
})
  , jh = () => C.jsxs("svg", {
    width: "21",
    height: "20",
    viewBox: "0 0 21 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [C.jsx("path", {
        d: "M12.25 9.68066C12.25 8.55837 11.4666 7.64844 10.5 7.64844C9.53358 7.64844 8.75 8.55837 8.75 9.68066C8.75 10.8031 9.53358 11.713 10.5 11.713C11.4666 11.713 12.25 10.8031 12.25 9.68066Z",
        fill: "#53C1DE"
    }), C.jsx("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M16.5903 6.32554C16.9863 4.78244 17.484 1.92092 15.7293 0.950774C13.9827 -0.0151399 11.7099 1.83573 10.5097 2.94671C9.31308 1.8468 6.97641 0.00384313 5.22314 0.977068C3.47726 1.94623 4.01565 4.7603 4.42043 6.31307C2.79182 6.75664 0 7.71202 0 9.66398C0 11.6104 2.78891 12.6498 4.40789 13.093C4.00161 14.6543 3.49017 17.4282 5.23829 18.3952C6.99811 19.3683 9.3275 17.5692 10.5388 16.446C11.7466 17.5635 13.9976 19.3744 15.7445 18.4047C17.4969 17.4319 17.0405 14.6088 16.6357 13.047C18.2051 12.6029 21 11.5861 21 9.66398C21 7.73078 18.1932 6.76764 16.5903 6.32554ZM16.3913 12.2193C16.1256 11.4125 15.7668 10.5546 15.328 9.66827C15.7469 8.80289 16.0917 7.95599 16.35 7.15437C17.5251 7.48107 20.1029 8.22772 20.1029 9.66398C20.1029 11.1137 17.6292 11.8674 16.3913 12.2193ZM15.295 17.6602C13.9916 18.3837 12.0555 16.6519 11.1635 15.829C11.7552 15.2083 12.3466 14.4868 12.9237 13.6856C13.939 13.5993 14.8981 13.458 15.7679 13.2652C16.0528 14.3699 16.6041 16.9335 15.295 17.6602ZM5.68653 17.6499C4.383 16.9291 4.97881 14.4538 5.2777 13.3037C6.13784 13.4862 7.09002 13.6175 8.10768 13.6966C8.68861 14.4806 9.29712 15.2012 9.91032 15.8323C9.15271 16.5351 6.99615 18.374 5.68653 17.6499ZM0.897043 9.66398C0.897043 8.20882 3.45945 7.46757 4.66133 7.1417C4.92416 7.96132 5.26886 8.81833 5.68486 9.68496C5.26348 10.5645 4.91384 11.435 4.64859 12.2643C3.50258 11.9498 0.897043 11.12 0.897043 9.66398ZM5.67259 1.72158C6.98145 0.995082 9.01229 2.76439 9.88113 3.56076C9.27108 4.18896 8.66817 4.90416 8.09221 5.68363C7.10458 5.77141 6.15912 5.91237 5.28996 6.10123C4.96387 4.84885 4.36514 2.44729 5.67259 1.72158ZM13.5655 6.61866C14.2355 6.69973 14.8775 6.80759 15.4803 6.93954C15.2993 7.49574 15.0738 8.07735 14.8081 8.67357C14.4231 7.97295 14.0097 7.28639 13.5655 6.61866ZM10.51 4.17551C10.9238 4.60534 11.3382 5.08534 11.7459 5.60609C10.919 5.56857 10.0907 5.56843 9.2638 5.60554C9.67183 5.08961 10.0898 4.61033 10.51 4.17551ZM6.19955 8.67294C5.9383 8.07881 5.71479 7.49464 5.53225 6.93047C6.13143 6.80191 6.7704 6.69682 7.4361 6.61707C6.99062 7.28334 6.57797 7.96963 6.19955 8.67294ZM7.45521 12.7723C6.76753 12.6987 6.11888 12.5989 5.51989 12.4739C5.70531 11.8998 5.93375 11.3031 6.20057 10.6961C6.5842 11.4068 7.00315 12.0997 7.45521 12.7723ZM10.5349 15.2132C10.1097 14.7733 9.68555 14.2866 9.27136 13.7633C10.103 13.7946 10.9362 13.7946 11.7677 13.759C11.3588 14.292 10.9458 14.7793 10.5349 15.2132ZM14.8167 10.6653C15.0974 11.2788 15.334 11.8723 15.5219 12.4367C14.913 12.5699 14.2556 12.6772 13.563 12.7569C14.0105 12.0765 14.4304 11.3793 14.8167 10.6653ZM12.4231 12.8612C11.1511 12.9483 9.87112 12.9474 8.59866 12.8683C7.87563 11.8555 7.23198 10.7904 6.67639 9.68468C7.22932 8.58121 7.86828 7.51817 8.58788 6.50699C9.86125 6.41471 11.1425 6.41443 12.4158 6.50754C13.1293 7.51866 13.7673 8.57893 14.333 9.67243C13.774 10.7753 13.1316 11.8405 12.4231 12.8612ZM15.2812 1.696C16.5904 2.42012 16.0077 4.99185 15.7216 6.11016C14.8504 5.91735 13.9043 5.7739 12.9138 5.68474C12.3367 4.89685 11.7389 4.18041 11.1387 3.56031C12.0186 2.7468 13.9847 0.978972 15.2812 1.696Z",
        fill: "#53C1DE"
    })]
})
  , Th = () => C.jsxs("svg", {
    width: "21",
    height: "19",
    viewBox: "0 0 21 19",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [C.jsx("path", {
        d: "M7.96986 0.000720683L10.3631 4.38837L12.7564 0.000720683H20.7262L10.3631 19L1.37584e-05 0.000720683H7.96986Z",
        fill: "#41B883"
    }), C.jsx("path", {
        d: "M7.96983 7.0775e-05L10.3631 4.38772L12.7563 7.0775e-05H16.5809L10.3631 11.3994L4.14522 7.0775e-05H7.96983Z",
        fill: "#34495E"
    })]
})
  , Eh = () => C.jsxs("svg", {
    width: "21",
    height: "19",
    viewBox: "0 0 21 19",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [C.jsx("path", {
        d: "M17.558 2.51347C15.7112 -0.0139105 12.0346 -0.754418 9.39145 0.839283L4.7321 3.67253C3.46137 4.42913 2.58033 5.66868 2.32618 7.0692C2.10592 8.24436 2.29229 9.45171 2.8853 10.4981C2.47867 11.0776 2.20758 11.7215 2.08898 12.3976C1.81789 13.8304 2.17369 15.3114 3.05473 16.4865C4.91847 19.0139 8.57818 19.7544 11.2213 18.1607L15.8807 15.3436C17.1514 14.587 18.0324 13.3474 18.2866 11.9469C18.5068 10.7717 18.3205 9.56439 17.7274 8.51802C18.1341 7.9385 18.4052 7.29458 18.5238 6.61846C18.8118 5.16964 18.456 3.68863 17.558 2.51347Z",
        fill: "#FF3E00"
    }), C.jsx("path", {
        d: "M8.93402 16.7286C7.42609 17.0989 5.85038 16.5355 4.96934 15.3281C4.42716 14.6198 4.22384 13.7344 4.37633 12.8651C4.41022 12.7202 4.4441 12.5915 4.47799 12.4466L4.5627 12.189L4.79991 12.35C5.35903 12.7363 5.96898 13.0261 6.62976 13.2193L6.79919 13.2676L6.78225 13.4285C6.76531 13.6539 6.83308 13.8954 6.96862 14.0886C7.23971 14.4588 7.71412 14.6359 8.17158 14.5232C8.27324 14.491 8.3749 14.4588 8.45962 14.4105L13.102 11.5934C13.3392 11.4485 13.4917 11.2392 13.5425 10.9817C13.5934 10.7241 13.5256 10.4504 13.3731 10.2411C13.102 9.87089 12.6276 9.70991 12.1702 9.8226C12.0685 9.8548 11.9668 9.88699 11.8821 9.93529L10.1031 11.0139C9.81506 11.1909 9.49314 11.3197 9.15428 11.4002C7.64635 11.7705 6.07064 11.207 5.1896 9.99968C4.66436 9.29137 4.4441 8.40598 4.61353 7.53669C4.76602 6.69959 5.3082 5.94299 6.07064 5.49224L10.73 2.67509C11.018 2.49802 11.3399 2.36923 11.6788 2.27264C13.1867 1.90239 14.7624 2.46582 15.6435 3.67317C16.1857 4.38148 16.389 5.26687 16.2365 6.13616C16.2026 6.28104 16.1687 6.40983 16.1179 6.55471L16.0332 6.81228L15.796 6.6513C15.2369 6.26495 14.6269 5.97518 13.9661 5.78201L13.7967 5.73371L13.8136 5.57273C13.8306 5.34736 13.7628 5.10589 13.6273 4.91271C13.3562 4.54246 12.8818 4.38148 12.4243 4.49417C12.3226 4.52636 12.221 4.55856 12.1363 4.60685L7.49386 7.424C7.25666 7.56888 7.10417 7.77816 7.05334 8.03572C7.00251 8.29329 7.07028 8.56696 7.22277 8.77623C7.49386 9.14649 7.96827 9.30746 8.42573 9.19478C8.52739 9.16258 8.62905 9.13039 8.71376 9.08209L10.4928 8.00353C10.7808 7.82645 11.1027 7.69767 11.4416 7.60108C12.9495 7.23082 14.5252 7.79425 15.4063 9.0016C15.9485 9.70991 16.1518 10.5953 15.9993 11.4646C15.8468 12.3017 15.3046 13.0583 14.5422 13.509L9.88283 16.3262C9.5948 16.5033 9.27288 16.632 8.93402 16.7286Z",
        fill: "white"
    })]
})
  , t7 = {
    vanilla: `import { WebHaptics, defaultPatterns } from "web-haptics";

const haptics = new WebHaptics();
haptics.trigger(); // medium impact
haptics.trigger(defaultPatterns.success);`,
    react: `import { useWebHaptics } from "web-haptics/react";

const { trigger } = useWebHaptics();

<button onClick={() => trigger()}>Tap me</button>`,
    vue: `<script setup>
  import { useWebHaptics } from "web-haptics/vue";
  const { trigger } = useWebHaptics();
<\/script>

<template>
  <button @click="trigger()">Tap me</button>
</template>`,
    svelte: `<script>
  import { createWebHaptics } from "web-haptics/svelte";
  import { onDestroy } from "svelte";
  const { trigger, destroy } = createWebHaptics();
  onDestroy(destroy);
<\/script>

<button on:click={() => trigger()}>Tap me</button>`
}
  , V0 = [{
    name: "React",
    entrypoint: "web-haptics/react",
    logo: C.jsx(jh, {}),
    example: t7.react
}, {
    name: "TypeScript",
    entrypoint: "web-haptics",
    logo: C.jsx(Sh, {}),
    example: t7.vanilla
}, {
    name: "Vue",
    entrypoint: "web-haptics/vue",
    logo: C.jsx(Th, {}),
    example: t7.vue
}, {
    name: "Svelte",
    entrypoint: "web-haptics/svelte",
    logo: C.jsx(Eh, {}),
    example: t7.svelte
}]
  , ao = () => {
    const {debug: n} = a5()
      , {trigger: r} = ks({
        debug: n
    })
      , [s,l] = R.useState(0);
    return C.jsxs("div", {
        className: e7.usage,
        children: [C.jsx("div", {
            className: e7.commands,
            children: V0.map( (u, d) => C.jsxs("button", {
                onClick: () => {
                    d !== s && (l(d),
                    r())
                }
                ,
                "data-active": s === d,
                children: [C.jsx("span", {
                    className: e7.logo,
                    children: u.logo
                }), C.jsx("span", {
                    className: e7.name,
                    children: u.name
                })]
            }, u.name))
        }), C.jsx(U5, {
            code: V0[s % V0.length].example
        })]
    })
}
  , Ph = "_builder_h11lg_1"
  , Lh = "_presets_h11lg_7"
  , _h = "_timelineContainer_h11lg_88"
  , Rh = "_timeline_h11lg_88"
  , Ah = "_gridline_h11lg_120"
  , Dh = "_timelineLabels_h11lg_138"
  , Vh = "_tapRegion_h11lg_161"
  , Zh = "_resizeHandleLeft_h11lg_189"
  , Oh = "_resizeHandle_h11lg_189"
  , Fh = "_intensityHandleBottom_h11lg_228"
  , Nh = "_intensityHandleTop_h11lg_228"
  , Ih = "_wobble_h11lg_275"
  , bh = "_playhead_h11lg_279"
  , zh = "_emptyState_h11lg_290"
  , Bh = "_header_h11lg_305"
  , Uh = "_controls_h11lg_313"
  , Hh = "_totalDuration_h11lg_318"
  , G1 = {
    builder: Ph,
    presets: Lh,
    timelineContainer: _h,
    timeline: Rh,
    gridline: Ah,
    timelineLabels: Dh,
    tapRegion: Vh,
    resizeHandleLeft: Zh,
    resizeHandle: Oh,
    intensityHandleBottom: Fh,
    intensityHandleTop: Nh,
    wobble: Ih,
    playhead: bh,
    emptyState: zh,
    header: Bh,
    controls: Uh,
    totalDuration: Hh
}
  , $h = n => {
    const r = wt.useRef(null);
    return wt.useEffect( () => {
        const s = l => {
            !r.current || r.current.contains(l.target) || n()
        }
        ;
        return document.addEventListener("mousedown", s),
        document.addEventListener("touchstart", s),
        () => {
            document.removeEventListener("mousedown", s),
            document.removeEventListener("touchstart", s)
        }
    }
    , [n]),
    {
        ref: r
    }
}
  , Wh = "_container_m4d72_1"
  , Kh = "_scrollarea_m4d72_31"
  , Cs = {
    container: Wh,
    scrollarea: Kh
}
  , uo = R.forwardRef( ({children: n, style: r, onHover: s}, l) => {
    const u = R.useRef(null)
      , d = l ?? u;
    return R.useEffect( () => {
        const f = d.current;
        if (!f)
            return;
        const h = g => {
            s == null || s(g)
        }
          , p = g => {
            Math.abs(g.deltaX) > Math.abs(g.deltaY) || (g.preventDefault(),
            f.scrollLeft += g.deltaY)
        }
        ;
        return f.addEventListener("wheel", p, {
            passive: !1
        }),
        f.addEventListener("mouseenter", h),
        () => {
            f.removeEventListener("wheel", p),
            f.removeEventListener("mouseenter", h)
        }
    }
    , [d, s]),
    C.jsx("div", {
        className: Cs.container,
        style: r,
        children: C.jsx("div", {
            className: Cs.scrollarea,
            ref: d,
            children: n
        })
    })
}
);
uo.displayName = "HorizontalScroll";
let Gh = 100;
const co = () => String(Gh++)
  , En = n => Math.round(n / 10) * 10;
function Z0(n, r) {
    const s = [...n].sort( (f, h) => f.position - h.position)
      , l = s.findIndex(f => f.id === r)
      , u = l > 0 ? s[l - 1] : null
      , d = l < s.length - 1 ? s[l + 1] : null;
    return {
        minPos: u ? u.position + u.duration : 0,
        maxEnd: d ? d.position : 1e3
    }
}
function Xh(n, r, s) {
    for (const l of n) {
        const u = l.position + l.duration
          , d = r + s;
        if (r < u && d > l.position)
            return !1
    }
    return r >= 0 && r + s <= 1e3
}
function hs(n) {
    if (n.length === 0)
        return [];
    const r = [...n].sort( (s, l) => s.position - l.position);
    return r.map( (s, l) => {
        const u = r[l - 1]
          , d = u ? s.position - (u.position + u.duration) : s.position;
        return {
            ...d > 0 && {
                delay: d
            },
            duration: s.duration,
            intensity: s.intensity
        }
    }
    )
}
function fo(n, r=.5) {
    let s = 0;
    return n.map(l => {
        s += l.delay ?? 0;
        const u = {
            id: co(),
            position: s,
            duration: l.duration,
            intensity: l.intensity ?? r
        };
        return s += l.duration,
        u
    }
    )
}
const O0 = 50
  , Yh = {
    taps: fo(C7.success.pattern),
    selectedId: null
};
function Qh(n, r) {
    switch (r.type) {
    case "ADD_TAP":
        {
            const s = En(Math.max(0, Math.min(1e3 - O0, r.position)));
            if (!Xh(n.taps, s, O0))
                return n;
            const l = {
                id: co(),
                position: s,
                duration: O0,
                intensity: .5
            };
            return {
                ...n,
                taps: [...n.taps, l],
                selectedId: l.id
            }
        }
    case "SELECT_TAP":
        return {
            ...n,
            selectedId: r.id
        };
    case "MOVE_TAP":
        {
            const s = n.taps.find(d => d.id === r.id);
            if (!s)
                return n;
            const l = Z0(n.taps, r.id)
              , u = En(Math.max(l.minPos, Math.min(l.maxEnd - s.duration, r.position)));
            return {
                ...n,
                taps: n.taps.map(d => d.id === r.id ? {
                    ...d,
                    position: u
                } : d)
            }
        }
    case "SET_DURATION":
        {
            const s = n.taps.find(f => f.id === r.id);
            if (!s)
                return n;
            const u = Z0(n.taps, r.id).maxEnd - s.position
              , d = Math.max(10, Math.min(u, r.duration));
            return {
                ...n,
                taps: n.taps.map(f => f.id === r.id ? {
                    ...f,
                    duration: d
                } : f)
            }
        }
    case "RESIZE_LEFT":
        {
            const s = n.taps.find(f => f.id === r.id);
            if (!s)
                return n;
            const l = Z0(n.taps, r.id)
              , u = En(Math.max(l.minPos, Math.min(s.position + s.duration - 10, r.position)))
              , d = s.position + s.duration - u;
            return {
                ...n,
                taps: n.taps.map(f => f.id === r.id ? {
                    ...f,
                    position: u,
                    duration: d
                } : f)
            }
        }
    case "REMOVE_TAP":
        return {
            ...n,
            taps: n.taps.filter(s => s.id !== r.id),
            selectedId: n.selectedId === r.id ? null : n.selectedId
        };
    case "SET_TAP_INTENSITY":
        return {
            ...n,
            taps: n.taps.map(s => s.id === r.id ? {
                ...s,
                intensity: Math.max(0, Math.min(1, r.intensity))
            } : s)
        };
    case "LOAD_PRESET":
        return {
            taps: r.taps,
            selectedId: null
        };
    default:
        return n
    }
}
const qh = Array.from({
    length: 19
}, (n, r) => (r + 1) * 50)
  , Jh = Array.from({
    length: 11
}, (n, r) => r * 100)
  , ps = Object.entries(C7)
  , ep = 20;
function tp(n) {
    if (n.length === 0)
        return "trigger()";
    const r = n.map(d => d.intensity ?? .5)
      , s = r.every(d => d === r[0])
      , l = (d, f) => {
        const h = [];
        return d.delay && d.delay > 0 && h.push(`delay: ${d.delay}`),
        h.push(`duration: ${d.duration}`),
        f && (d.intensity ?? .5) !== .5 && h.push(`intensity: ${d.intensity}`),
        `{ ${h.join(", ")} }`
    }
    ;
    return s && r[0] === .5 ? `trigger([
  ${n.map(f => l(f, !1)).join(`,
  `)},
])` : s ? `trigger([
  ${n.map(f => l(f, !1)).join(`,
  `)},
], { intensity: ${r[0]} })` : `trigger([
  ${n.map(d => l(d, !0)).join(`,
  `)},
])`
}
const Co = () => {
    var b1;
    const [n,r] = R.useReducer(Qh, Yh)
      , {trigger: s} = T3()
      , l = R.useRef(null)
      , {ref: u} = $h( () => {
        r({
            type: "SELECT_TAP",
            id: null
        })
    }
    )
      , [d,f] = R.useState(!1)
      , [h,p] = R.useState(null)
      , g = R.useRef(null)
      , [y,v] = R.useState({
        x: 0,
        y: 0
    })
      , [w,j] = R.useState(new Set)
      , [A,P] = R.useState(0)
      , _ = R.useRef([])
      , D = hs(n.taps)
      , V = n.taps.length ? Math.max(...n.taps.map(H => H.position + H.duration)) : 0
      , N = (b1 = ps.find( ([,H]) => H.pattern.length !== D.length ? !1 : H.pattern.every( (n1, f1) => {
        const U = D[f1];
        return U ? n1.duration === U.duration && (n1.intensity ?? .5) === (U.intensity ?? .5) && (n1.delay ?? 0) === (U.delay ?? 0) : !1
    }
    ))) == null ? void 0 : b1[0]
      , X = R.useCallback(H => {
        var U;
        if (H.target !== H.currentTarget)
            return;
        const n1 = (U = l.current) == null ? void 0 : U.getBoundingClientRect();
        if (!n1)
            return;
        const f1 = (H.clientX - n1.left) / n1.width * 1e3;
        r({
            type: "ADD_TAP",
            position: f1
        }),
        s()
    }
    , [s])
      , $ = R.useCallback( (H, n1) => {
        H.preventDefault(),
        H.stopPropagation(),
        r({
            type: "SELECT_TAP",
            id: n1
        });
        const f1 = l.current;
        if (!f1)
            return;
        const U = f1.getBoundingClientRect()
          , p1 = (H.clientX - U.left) / U.width * 1e3
          , q = n.taps.find(a1 => a1.id === n1)
          , b = q ? p1 - q.position : 0;
        let K = (q == null ? void 0 : q.position) ?? 0;
        const B = U.left + ((q == null ? void 0 : q.position) ?? 0) / 1e3 * U.width
          , S = U.top + U.height / 2
          , Z = H.clientX - B
          , u1 = H.clientY - S
          , c1 = a1 => {
            const x1 = U.left - a1.clientX
              , g1 = a1.clientX - U.right
              , k1 = U.top - a1.clientY
              , ne = a1.clientY - U.bottom;
            if (Math.max(x1, g1, k1, ne) > ep) {
                p(n1),
                g.current = n1;
                const jt = U.left + K / 1e3 * U.width
                  , Wt = U.top + U.height / 2;
                v({
                    x: a1.clientX - Z - jt,
                    y: a1.clientY - u1 - Wt
                })
            } else {
                p(null),
                g.current = null,
                v({
                    x: 0,
                    y: 0
                });
                const jt = (a1.clientX - U.left) / U.width * 1e3 - b;
                r({
                    type: "MOVE_TAP",
                    id: n1,
                    position: jt
                }),
                K = En(Math.max(0, Math.min(1e3, jt)))
            }
        }
          , C1 = () => {
            g.current === n1 && (r({
                type: "REMOVE_TAP",
                id: n1
            }),
            s()),
            p(null),
            g.current = null,
            v({
                x: 0,
                y: 0
            }),
            window.removeEventListener("pointermove", c1),
            window.removeEventListener("pointerup", C1)
        }
        ;
        window.addEventListener("pointermove", c1),
        window.addEventListener("pointerup", C1)
    }
    , [n.taps, s])
      , t1 = R.useCallback( (H, n1) => {
        H.preventDefault(),
        H.stopPropagation(),
        r({
            type: "SELECT_TAP",
            id: n1
        });
        const f1 = l.current;
        if (!f1)
            return;
        const U = f1.getBoundingClientRect()
          , p1 = b => {
            const K = n.taps.find(Z => Z.id === n1);
            if (!K)
                return;
            const B = (b.clientX - U.left) / U.width * 1e3
              , S = En(Math.max(10, B - K.position));
            r({
                type: "SET_DURATION",
                id: n1,
                duration: S
            })
        }
          , q = () => {
            window.removeEventListener("pointermove", p1),
            window.removeEventListener("pointerup", q)
        }
        ;
        window.addEventListener("pointermove", p1),
        window.addEventListener("pointerup", q)
    }
    , [n.taps])
      , s1 = R.useCallback( (H, n1) => {
        H.preventDefault(),
        H.stopPropagation(),
        r({
            type: "SELECT_TAP",
            id: n1
        });
        const f1 = l.current;
        if (!f1)
            return;
        const U = f1.getBoundingClientRect()
          , p1 = b => {
            const K = (b.clientX - U.left) / U.width * 1e3;
            r({
                type: "RESIZE_LEFT",
                id: n1,
                position: K
            })
        }
          , q = () => {
            window.removeEventListener("pointermove", p1),
            window.removeEventListener("pointerup", q)
        }
        ;
        window.addEventListener("pointermove", p1),
        window.addEventListener("pointerup", q)
    }
    , [])
      , e1 = R.useCallback( (H, n1, f1) => {
        H.preventDefault(),
        H.stopPropagation(),
        r({
            type: "SELECT_TAP",
            id: n1
        });
        const U = l.current;
        if (!U)
            return;
        const p1 = U.getBoundingClientRect()
          , q = K => {
            const B = f1 === "top" ? (K.clientY - p1.top) / p1.height : (p1.bottom - K.clientY) / p1.height
              , S = Math.round(Math.max(0, Math.min(1, 1 - B * 2)) * 100) / 100;
            r({
                type: "SET_TAP_INTENSITY",
                id: n1,
                intensity: S
            })
        }
          , b = () => {
            window.removeEventListener("pointermove", q),
            window.removeEventListener("pointerup", b)
        }
        ;
        window.addEventListener("pointermove", q),
        window.addEventListener("pointerup", b)
    }
    , [])
      , y1 = R.useCallback( () => {
        if (n.taps.length === 0)
            return;
        _.current.forEach(clearTimeout),
        _.current = [];
        const H = new Set(n.taps.filter(U => U.position === 0).map(U => U.id));
        j(H);
        const n1 = hs(n.taps);
        s(n1),
        f(!0),
        P(U => U + 1);
        for (const U of n.taps)
            U.position > 0 && _.current.push(window.setTimeout( () => j(p1 => new Set(p1).add(U.id)), U.position)),
            _.current.push(window.setTimeout( () => {
                j(p1 => {
                    const q = new Set(p1);
                    return q.delete(U.id),
                    q
                }
                )
            }
            , U.position + U.duration));
        const f1 = Math.max(...n.taps.map(U => U.position + U.duration));
        _.current.push(window.setTimeout( () => {
            f(!1),
            j(new Set)
        }
        , f1))
    }
    , [n.taps, s]);
    R.useEffect( () => {
        const H = n1 => {
            n1.target instanceof HTMLInputElement || ((n1.key === "Delete" || n1.key === "Backspace") && n.selectedId && (n1.preventDefault(),
            r({
                type: "REMOVE_TAP",
                id: n.selectedId
            }),
            s()),
            n1.key === " " && n.taps.length > 0 && (n1.preventDefault(),
            y1()))
        }
        ;
        return window.addEventListener("keydown", H),
        () => window.removeEventListener("keydown", H)
    }
    , [n.selectedId, n.taps.length, s, y1]),
    R.useEffect( () => () => _.current.forEach(clearTimeout), []);
    const w1 = tp(D);
    return C.jsxs("div", {
        ref: u,
        className: G1.builder,
        children: [C.jsxs("div", {
            className: G1.header,
            children: [C.jsx(uo, {
                children: C.jsx("div", {
                    className: G1.presets,
                    children: ps.map( ([H,n1]) => C.jsx("button", {
                        "data-pattern": H,
                        "data-active": N === H,
                        onClick: () => {
                            N !== H && (s(),
                            r({
                                type: "LOAD_PRESET",
                                taps: fo(n1.pattern, .5)
                            }))
                        }
                        ,
                        children: H.charAt(0).toUpperCase() + H.slice(1)
                    }, H))
                })
            }), V > 0 && C.jsxs("div", {
                className: G1.controls,
                children: [C.jsxs("span", {
                    className: G1.totalDuration,
                    children: [V, "ms"]
                }), C.jsx("button", {
                    onClick: y1,
                    disabled: n.taps.length === 0,
                    children: C.jsx("svg", {
                        "aria-label": "Play",
                        width: "15",
                        height: "17",
                        viewBox: "0 0 15 17",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: C.jsx("path", {
                            d: "M0.000323688 2.50385L0.000322723 13.6729C0.000322555 15.6161 2.12025 16.8164 3.78656 15.8166L13.0941 10.2321C14.7125 9.2611 14.7125 6.91565 13.0941 5.94465L3.78656 0.36012C2.12025 -0.639667 0.000323855 0.560616 0.000323688 2.50385Z",
                            fill: "currentColor"
                        })
                    })
                })]
            })]
        }), C.jsxs("div", {
            className: G1.timelineContainer,
            children: [C.jsxs("div", {
                className: G1.timeline,
                ref: l,
                onClick: X,
                children: [qh.map(H => C.jsx("div", {
                    className: G1.gridline,
                    "data-minor": H % 100 !== 0,
                    style: {
                        left: `${H / 1e3 * 100}%`
                    }
                }, H)), C.jsx(g9, {
                    children: n.taps.map(H => {
                        const n1 = `calc(${1 - H.intensity} * (50% - 10px))`
                          , f1 = h === H.id;
                        return C.jsx(V1.div, {
                            style: {
                                position: "absolute",
                                left: `${H.position / 1e3 * 100}%`,
                                width: `${H.duration / 1e3 * 100}%`,
                                minWidth: 16,
                                top: 0,
                                bottom: 0,
                                x: f1 ? y.x : 0,
                                y: f1 ? y.y : 0,
                                zIndex: f1 ? 9999 : void 0,
                                pointerEvents: "none"
                            },
                            initial: {
                                scale: .8,
                                opacity: 0
                            },
                            animate: {
                                scale: 1,
                                opacity: 1,
                                x: f1 ? y.x : 0,
                                y: f1 ? y.y : 0
                            },
                            exit: {
                                scale: 0,
                                opacity: 0
                            },
                            transition: {
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                                x: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25
                                },
                                y: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25
                                }
                            },
                            children: C.jsx("div", {
                                className: f1 ? G1.wobble : void 0,
                                style: {
                                    position: "absolute",
                                    inset: 0
                                },
                                children: C.jsxs(V1.div, {
                                    className: G1.tapRegion,
                                    "data-selected": H.id === n.selectedId,
                                    "data-playing": w.has(H.id),
                                    style: {
                                        left: 0,
                                        right: 0,
                                        top: n1,
                                        bottom: n1,
                                        pointerEvents: "auto"
                                    },
                                    onPointerDown: U => $(U, H.id),
                                    onClick: U => {
                                        U.stopPropagation(),
                                        r({
                                            type: "SELECT_TAP",
                                            id: H.id
                                        })
                                    }
                                    ,
                                    children: [C.jsx("div", {
                                        className: G1.resizeHandleLeft,
                                        onPointerDown: U => s1(U, H.id)
                                    }), C.jsx("div", {
                                        className: G1.resizeHandle,
                                        onPointerDown: U => t1(U, H.id)
                                    }), C.jsx("div", {
                                        className: G1.intensityHandleTop,
                                        onPointerDown: U => e1(U, H.id, "top")
                                    }), C.jsx("div", {
                                        className: G1.intensityHandleBottom,
                                        onPointerDown: U => e1(U, H.id, "bottom")
                                    })]
                                })
                            })
                        }, H.id)
                    }
                    )
                }), d && V > 0 && C.jsx(V1.div, {
                    className: G1.playhead,
                    initial: {
                        left: 0
                    },
                    animate: {
                        left: `${V / 1e3 * 100}%`
                    },
                    transition: {
                        duration: V / 1e3,
                        ease: "linear"
                    }
                }, `playhead-${A}`), n.taps.length === 0 && C.jsx("div", {
                    className: G1.emptyState,
                    children: C.jsx("span", {
                        children: "Tap to add a tap"
                    })
                })]
            }), C.jsx("div", {
                className: G1.timelineLabels,
                children: Jh.map(H => C.jsx("span", {
                    children: H
                }, H))
            })]
        }), C.jsx(U5, {
            code: w1
        })]
    })
}
;
function ho({disabled: n, setShaking: r}) {
    const {debug: s, setDebug: l} = a5()
      , {trigger: u} = T3()
      , d = ["play", "install", "build"]
      , [f,h] = R.useState("play")
      , p = R.useRef(1)
      , g = y => {
        p.current = d.indexOf(y) > d.indexOf(f) ? 1 : -1,
        h(y)
    }
    ;
    return C.jsxs("div", {
        className: X1.page,
        "data-disabled": !!n,
        children: [C.jsx("div", {
            className: X1.debug,
            children: C.jsx("button", {
                onClick: () => {
                    u(),
                    l(!s)
                }
                ,
                children: C.jsx(sh, {
                    enabled: s
                })
            })
        }), C.jsxs("div", {
            className: X1.container,
            children: [C.jsxs("div", {
                className: X1.top,
                children: [C.jsxs("div", {
                    className: X1.header,
                    children: [C.jsx(oh, {}), C.jsx("p", {
                        children: "Haptic feedback for the mobile web"
                    })]
                }), !n && C.jsx("div", {
                    className: X1.toggleGroup,
                    children: C.jsxs(fh, {
                        children: [C.jsx(A0, {
                            onClick: () => g("play"),
                            active: f === "play",
                            children: "Play"
                        }), C.jsx(A0, {
                            onClick: () => g("install"),
                            active: f === "install",
                            children: "Install"
                        }), C.jsx(A0, {
                            onClick: () => g("build"),
                            active: f === "build",
                            children: "Build"
                        })]
                    })
                })]
            }), C.jsx("div", {
                className: X1.scrollarea,
                children: C.jsx("div", {
                    className: X1.content,
                    children: C.jsx(g9, {
                        initial: !1,
                        mode: "popLayout",
                        children: C.jsxs(V1.div, {
                            initial: {
                                x: p.current * 8
                            },
                            animate: {
                                x: 0
                            },
                            transition: {
                                duration: .2,
                                ease: "easeOut"
                            },
                            children: [f === "play" && C.jsx(yu, {
                                setShaking: r
                            }), f === "install" && C.jsxs("div", {
                                className: X1.installation,
                                children: [C.jsx("section", {
                                    children: C.jsx(lo, {})
                                }), C.jsxs("section", {
                                    children: [C.jsx("h3", {
                                        children: "Usage"
                                    }), C.jsx(ao, {})]
                                }), C.jsx(xs, {})]
                            }), f === "build" && C.jsx("div", {
                                className: X1.installation,
                                style: {
                                    minHeight: 300
                                },
                                children: C.jsxs("section", {
                                    children: [C.jsx("h3", {
                                        children: "Custom Haptic"
                                    }), C.jsx(Co, {})]
                                })
                            })]
                        }, f)
                    })
                })
            })]
        }), n && C.jsx("div", {
            className: X1.safariUI,
            children: C.jsx(dh, {})
        })]
    })
}
const np = () => C.jsxs("svg", {
    height: "268",
    width: "268",
    viewBox: "0 0 268 268",
    children: [C.jsx("rect", {
        fill: "black",
        rx: "12",
        ry: "12",
        width: "75.04",
        height: "75.04",
        x: "0",
        y: "0"
    }), C.jsx("rect", {
        fill: "white",
        rx: "8",
        ry: "8",
        width: "53.6",
        height: "53.6",
        x: "10.72",
        y: "10.72"
    }), C.jsx("rect", {
        fill: "black",
        rx: "3",
        ry: "3",
        width: "32.160000000000004",
        height: "32.160000000000004",
        x: "21.44",
        y: "21.44"
    }), C.jsx("rect", {
        fill: "black",
        rx: "12",
        ry: "12",
        width: "75.04",
        height: "75.04",
        x: "192.96",
        y: "0"
    }), C.jsx("rect", {
        fill: "white",
        rx: "8",
        ry: "8",
        width: "53.6",
        height: "53.6",
        x: "203.68",
        y: "10.72"
    }), C.jsx("rect", {
        fill: "black",
        rx: "3",
        ry: "3",
        width: "32.160000000000004",
        height: "32.160000000000004",
        x: "214.4",
        y: "21.44"
    }), C.jsx("rect", {
        fill: "black",
        rx: "12",
        ry: "12",
        width: "75.04",
        height: "75.04",
        x: "0",
        y: "192.96"
    }), C.jsx("rect", {
        fill: "white",
        rx: "8",
        ry: "8",
        width: "53.6",
        height: "53.6",
        x: "10.72",
        y: "203.68"
    }), C.jsx("rect", {
        fill: "black",
        rx: "3",
        ry: "3",
        width: "32.160000000000004",
        height: "32.160000000000004",
        x: "21.44",
        y: "214.4"
    }), C.jsx("circle", {
        cx: "5.36",
        cy: "134.00000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "5.36",
        cy: "144.72000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "5.36",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "16.080000000000002",
        cy: "112.56",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "16.080000000000002",
        cy: "144.72000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "16.080000000000002",
        cy: "155.44000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "16.080000000000002",
        cy: "166.16000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "26.8",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "26.8",
        cy: "155.44000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "26.8",
        cy: "166.16000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "26.8",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "37.52",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "37.52",
        cy: "101.84",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "37.52",
        cy: "112.56",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "37.52",
        cy: "123.28",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "37.52",
        cy: "134.00000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "37.52",
        cy: "144.72000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "37.52",
        cy: "155.44000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "48.24",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "48.24",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "58.96",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "58.96",
        cy: "112.56",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "58.96",
        cy: "144.72000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "58.96",
        cy: "166.16000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "69.68",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "69.68",
        cy: "112.56",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "69.68",
        cy: "134.00000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "69.68",
        cy: "155.44000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "69.68",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "80.4",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "80.4",
        cy: "123.28",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "80.4",
        cy: "155.44000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "80.4",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "5.36",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "26.8",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "37.52",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "48.24",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "58.96",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "69.68",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "112.56",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "123.28",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "134.00000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "144.72000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "155.44000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "198.32000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "209.04000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "219.76000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "230.48000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "91.12",
        cy: "241.20000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "101.84",
        cy: "26.8",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "101.84",
        cy: "37.52",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "101.84",
        cy: "58.96",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "101.84",
        cy: "80.4",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "101.84",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "101.84",
        cy: "101.84",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "101.84",
        cy: "112.56",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "101.84",
        cy: "123.28",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "101.84",
        cy: "144.72000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "101.84",
        cy: "209.04000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "101.84",
        cy: "251.92000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "112.56",
        cy: "5.36",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "112.56",
        cy: "48.24",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "112.56",
        cy: "58.96",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "112.56",
        cy: "69.68",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "112.56",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "112.56",
        cy: "101.84",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "112.56",
        cy: "166.16000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "112.56",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "112.56",
        cy: "198.32000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "112.56",
        cy: "230.48000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "112.56",
        cy: "251.92000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "112.56",
        cy: "262.64000000000004",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "123.28",
        cy: "5.36",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "123.28",
        cy: "16.080000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "123.28",
        cy: "26.8",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "123.28",
        cy: "37.52",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "123.28",
        cy: "58.96",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "123.28",
        cy: "80.4",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "123.28",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "123.28",
        cy: "123.28",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "123.28",
        cy: "187.60000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "123.28",
        cy: "198.32000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "123.28",
        cy: "219.76000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "123.28",
        cy: "262.64000000000004",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "134.00000000000003",
        cy: "26.8",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "134.00000000000003",
        cy: "37.52",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "134.00000000000003",
        cy: "69.68",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "134.00000000000003",
        cy: "112.56",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "134.00000000000003",
        cy: "144.72000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "134.00000000000003",
        cy: "155.44000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "134.00000000000003",
        cy: "166.16000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "134.00000000000003",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "134.00000000000003",
        cy: "187.60000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "134.00000000000003",
        cy: "198.32000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "134.00000000000003",
        cy: "219.76000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "134.00000000000003",
        cy: "241.20000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "134.00000000000003",
        cy: "251.92000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "134.00000000000003",
        cy: "262.64000000000004",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "144.72000000000003",
        cy: "5.36",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "144.72000000000003",
        cy: "26.8",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "144.72000000000003",
        cy: "37.52",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "144.72000000000003",
        cy: "48.24",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "144.72000000000003",
        cy: "80.4",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "144.72000000000003",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "144.72000000000003",
        cy: "144.72000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "144.72000000000003",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "144.72000000000003",
        cy: "187.60000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "144.72000000000003",
        cy: "209.04000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "144.72000000000003",
        cy: "230.48000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "144.72000000000003",
        cy: "251.92000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "5.36",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "37.52",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "48.24",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "69.68",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "112.56",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "123.28",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "134.00000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "166.16000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "198.32000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "209.04000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "219.76000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "230.48000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "251.92000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "155.44000000000003",
        cy: "262.64000000000004",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "166.16000000000003",
        cy: "5.36",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "166.16000000000003",
        cy: "26.8",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "166.16000000000003",
        cy: "37.52",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "166.16000000000003",
        cy: "58.96",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "166.16000000000003",
        cy: "80.4",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "166.16000000000003",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "166.16000000000003",
        cy: "101.84",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "166.16000000000003",
        cy: "123.28",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "166.16000000000003",
        cy: "155.44000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "166.16000000000003",
        cy: "198.32000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "166.16000000000003",
        cy: "209.04000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "166.16000000000003",
        cy: "219.76000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "166.16000000000003",
        cy: "262.64000000000004",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "5.36",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "26.8",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "69.68",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "80.4",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "112.56",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "123.28",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "134.00000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "144.72000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "155.44000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "166.16000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "187.60000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "198.32000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "209.04000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "219.76000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "176.88000000000002",
        cy: "241.20000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "187.60000000000002",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "187.60000000000002",
        cy: "101.84",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "187.60000000000002",
        cy: "112.56",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "187.60000000000002",
        cy: "134.00000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "187.60000000000002",
        cy: "166.16000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "187.60000000000002",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "187.60000000000002",
        cy: "219.76000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "187.60000000000002",
        cy: "230.48000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "198.32000000000002",
        cy: "155.44000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "198.32000000000002",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "198.32000000000002",
        cy: "198.32000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "198.32000000000002",
        cy: "219.76000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "198.32000000000002",
        cy: "241.20000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "198.32000000000002",
        cy: "251.92000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "198.32000000000002",
        cy: "262.64000000000004",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "209.04000000000002",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "209.04000000000002",
        cy: "101.84",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "209.04000000000002",
        cy: "155.44000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "209.04000000000002",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "209.04000000000002",
        cy: "219.76000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "209.04000000000002",
        cy: "230.48000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "209.04000000000002",
        cy: "251.92000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "209.04000000000002",
        cy: "262.64000000000004",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "219.76000000000002",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "219.76000000000002",
        cy: "134.00000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "219.76000000000002",
        cy: "144.72000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "219.76000000000002",
        cy: "166.16000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "219.76000000000002",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "219.76000000000002",
        cy: "187.60000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "219.76000000000002",
        cy: "198.32000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "219.76000000000002",
        cy: "209.04000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "219.76000000000002",
        cy: "219.76000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "219.76000000000002",
        cy: "241.20000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "230.48000000000002",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "230.48000000000002",
        cy: "123.28",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "230.48000000000002",
        cy: "144.72000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "230.48000000000002",
        cy: "187.60000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "230.48000000000002",
        cy: "198.32000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "230.48000000000002",
        cy: "219.76000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "230.48000000000002",
        cy: "230.48000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "230.48000000000002",
        cy: "241.20000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "230.48000000000002",
        cy: "251.92000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "230.48000000000002",
        cy: "262.64000000000004",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "241.20000000000002",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "241.20000000000002",
        cy: "112.56",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "241.20000000000002",
        cy: "144.72000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "241.20000000000002",
        cy: "155.44000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "241.20000000000002",
        cy: "166.16000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "241.20000000000002",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "241.20000000000002",
        cy: "187.60000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "241.20000000000002",
        cy: "230.48000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "241.20000000000002",
        cy: "241.20000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "241.20000000000002",
        cy: "262.64000000000004",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "251.92000000000002",
        cy: "101.84",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "251.92000000000002",
        cy: "112.56",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "251.92000000000002",
        cy: "166.16000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "251.92000000000002",
        cy: "176.88000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "251.92000000000002",
        cy: "187.60000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "251.92000000000002",
        cy: "198.32000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "251.92000000000002",
        cy: "209.04000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "251.92000000000002",
        cy: "219.76000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "251.92000000000002",
        cy: "230.48000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "251.92000000000002",
        cy: "262.64000000000004",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "262.64000000000004",
        cy: "91.12",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "262.64000000000004",
        cy: "112.56",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "262.64000000000004",
        cy: "123.28",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "262.64000000000004",
        cy: "134.00000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "262.64000000000004",
        cy: "144.72000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "262.64000000000004",
        cy: "155.44000000000003",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "262.64000000000004",
        cy: "198.32000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "262.64000000000004",
        cy: "209.04000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "262.64000000000004",
        cy: "219.76000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "262.64000000000004",
        cy: "230.48000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "262.64000000000004",
        cy: "241.20000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "262.64000000000004",
        cy: "251.92000000000002",
        fill: "black",
        r: "3.5733333333333337"
    }), C.jsx("circle", {
        cx: "262.64000000000004",
        cy: "262.64000000000004",
        fill: "black",
        r: "3.5733333333333337"
    })]
})
  , rp = () => {
    const n = R.useId()
      , r = .6;
    return C.jsxs(V1.svg, {
        width: "182",
        height: "90",
        viewBox: "0 0 182 90",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [C.jsxs("g", {
            mask: `url(#mask0-${n})`,
            children: [C.jsx("path", {
                d: "M111.454 48.3695C110.596 48.3695 109.904 48.072 109.378 47.4768C108.852 46.8679 108.589 45.8922 108.589 44.5497C108.589 43.6916 108.686 42.8335 108.88 41.9754C109.088 41.1035 109.371 40.28 109.731 39.505C110.105 38.7161 110.534 38.0172 111.018 37.4082C111.517 36.7993 112.063 36.3218 112.658 35.9758C113.253 35.616 113.869 35.436 114.506 35.436C115.585 35.436 116.43 35.7267 117.039 36.308C117.648 36.8892 117.952 37.6297 117.952 38.5293C117.952 39.2213 117.758 39.851 117.371 40.4184C116.997 40.972 116.485 41.4703 115.835 41.9132C115.184 42.356 114.458 42.7574 113.655 43.1172C112.852 43.4771 112.029 43.8023 111.184 44.093C111.115 44.5912 111.081 45.0341 111.081 45.4216C111.081 45.6569 111.212 45.7745 111.475 45.7745C112.098 45.7745 112.762 45.6776 113.468 45.4839C114.188 45.2763 114.914 45.0133 115.648 44.695C116.381 44.3628 117.087 44.0238 117.765 43.6778C118.443 43.3179 119.059 42.9788 119.613 42.6605C120.18 42.3284 120.644 42.0654 121.004 41.8716C121.378 41.664 121.62 41.5602 121.73 41.5602C122.035 41.5602 122.256 41.6502 122.395 41.8301C122.533 42.01 122.602 42.2038 122.602 42.4114C122.602 42.5083 122.416 42.7228 122.042 43.055C121.682 43.3871 121.184 43.7816 120.547 44.2383C119.924 44.6812 119.218 45.1448 118.43 45.6292C117.655 46.0998 116.845 46.5496 116.001 46.9786C115.17 47.3938 114.361 47.726 113.572 47.9751C112.797 48.238 112.091 48.3695 111.454 48.3695ZM111.537 42.2453C112.105 41.9132 112.665 41.5672 113.219 41.2073C113.786 40.8336 114.257 40.4184 114.631 39.9617C115.004 39.4912 115.191 38.9445 115.191 38.3217C115.191 38.1418 115.143 38.0241 115.046 37.9688C114.949 37.8996 114.81 37.865 114.631 37.865C114.146 37.865 113.703 38.0795 113.302 38.5085C112.914 38.9376 112.568 39.4912 112.264 40.1693C111.973 40.8336 111.731 41.5256 111.537 42.2453Z",
                fill: "var(--color)"
            }), C.jsx("path", {
                d: "M101.508 48.7015C100.263 48.7015 99.2799 48.3209 98.5602 47.5597C97.8544 46.7847 97.5015 45.6844 97.5015 44.2589C97.5015 43.4838 97.6053 42.5773 97.8129 41.5393C98.0205 40.4875 98.2903 39.3803 98.6225 38.2177C98.9685 37.0413 99.3353 35.8788 99.7228 34.73C100.124 33.5813 100.519 32.5156 100.906 31.533C101.294 30.5504 101.633 29.7269 101.923 29.0626C102.172 28.5505 102.525 28.2944 102.982 28.2944C103.273 28.2944 103.508 28.3844 103.688 28.5643C103.882 28.7442 103.979 29.0349 103.979 29.4362C103.979 29.63 103.882 30.0521 103.688 30.7026C103.494 31.3531 103.238 32.1558 102.92 33.1108C102.615 34.0519 102.283 35.0691 101.923 36.1625C101.577 37.2558 101.245 38.3561 100.927 39.4633C100.622 40.5705 100.373 41.6154 100.18 42.5981C99.9857 43.5669 99.8889 44.3904 99.8889 45.0685C99.8889 45.3453 99.965 45.5668 100.117 45.7328C100.283 45.8989 100.498 45.982 100.761 45.982C101.328 45.982 101.91 45.8782 102.505 45.6706C103.114 45.463 103.709 45.2 104.29 44.8817C104.885 44.5634 105.446 44.2243 105.972 43.8644C106.497 43.5046 106.968 43.1655 107.383 42.8472C107.812 42.515 108.158 42.2521 108.421 42.0583C108.767 41.7954 109.002 41.6639 109.127 41.6639C109.598 41.6639 109.833 41.8922 109.833 42.349C109.833 42.4597 109.695 42.688 109.418 43.034C109.182 43.3385 108.85 43.726 108.421 44.1966C107.992 44.6672 107.494 45.1654 106.926 45.6913C106.373 46.2034 105.778 46.6878 105.141 47.1445C104.518 47.6012 103.896 47.9749 103.273 48.2656C102.65 48.5562 102.062 48.7015 101.508 48.7015Z",
                fill: "var(--color)"
            }), C.jsx("path", {
                d: "M91.5905 47.9749C91.203 47.9749 90.857 47.8434 90.5525 47.5804C90.2619 47.3175 90.1166 46.8884 90.1166 46.2933C90.1166 45.975 90.1581 45.5252 90.2411 44.9439C90.338 44.3626 90.4626 43.7329 90.6148 43.0547C90.7671 42.3627 90.9331 41.6777 91.1131 40.9995C91.3068 40.3213 91.4937 39.7193 91.6736 39.1934C91.8535 38.6536 92.0127 38.2523 92.1511 37.9893C92.331 37.671 92.4971 37.4772 92.6493 37.408C92.8154 37.325 92.9745 37.2835 93.1268 37.2835C93.4036 37.2835 93.6596 37.3665 93.8949 37.5326C94.144 37.6987 94.2686 38.0654 94.2686 38.6329C94.2686 38.8543 94.2271 39.2141 94.144 39.7124C94.061 40.1968 93.9572 40.7642 93.8326 41.4147C93.7081 42.0652 93.5697 42.7364 93.4174 43.4284C93.279 44.1204 93.1406 44.7778 93.0022 45.4006C92.8777 46.0096 92.7739 46.5217 92.6908 46.9369C92.6216 47.2829 92.4763 47.5389 92.2549 47.705C92.0473 47.8849 91.8258 47.9749 91.5905 47.9749ZM93.9779 35.2282C93.5212 35.2282 93.0991 35.0967 92.7116 34.8338C92.3241 34.557 92.1303 34.1349 92.1303 33.5674C92.1303 33.0969 92.2479 32.7163 92.4832 32.4256C92.7185 32.135 92.9953 31.9274 93.3136 31.8028C93.6458 31.6644 93.9364 31.5952 94.1855 31.5952C94.4347 31.5952 94.7115 31.6506 95.0159 31.7613C95.3204 31.8582 95.5834 32.045 95.8048 32.3218C96.0401 32.5848 96.1577 32.9654 96.1577 33.4636C96.1577 33.7958 96.0401 34.1003 95.8048 34.3771C95.5695 34.64 95.2789 34.8476 94.9329 34.9999C94.6007 35.1521 94.2824 35.2282 93.9779 35.2282Z",
                fill: "var(--color)"
            }), C.jsx("path", {
                d: "M78.1749 48.3071C77.3445 48.3071 76.7702 48.141 76.4518 47.8089C76.1474 47.4905 75.9951 47.0477 75.9951 46.4802C75.9951 44.0721 76.4449 41.5601 77.3445 38.9443C78.258 36.3147 79.5382 33.6782 81.1851 31.0348C81.4619 30.5781 81.6903 30.3082 81.8702 30.2251C82.0501 30.1421 82.2508 30.1006 82.4722 30.1006C82.7906 30.1006 83.0674 30.2113 83.3026 30.4327C83.5518 30.6542 83.6763 30.9448 83.6763 31.3047C83.6763 31.4154 83.5587 31.7199 83.3234 32.2181C83.0881 32.7163 82.7767 33.353 82.3892 34.128C82.0155 34.9031 81.6072 35.7819 81.1644 36.7645C80.7215 37.7333 80.2855 38.7575 79.8565 39.837C79.4413 40.9165 79.0814 42.003 78.777 43.0963C79.2475 42.5012 79.7804 41.8923 80.3755 41.2695C80.9844 40.6328 81.6142 40.0515 82.2646 39.5256C82.9151 38.9859 83.5448 38.5568 84.1538 38.2385C84.7628 37.9063 85.3094 37.7403 85.7938 37.7403C86.2506 37.7403 86.6727 37.851 87.0602 38.0724C87.4616 38.2939 87.7868 38.6399 88.0359 39.1104C88.285 39.581 88.4096 40.1899 88.4096 40.9373C88.4096 41.7539 88.1743 42.5912 87.7038 43.4493C87.247 44.3073 86.5758 45.1031 85.69 45.8367C84.8181 46.5702 83.7455 47.1653 82.4722 47.622C81.2128 48.0787 79.7804 48.3071 78.1749 48.3071ZM79.0468 45.9405C80.1125 45.8574 81.0744 45.6291 81.9325 45.2554C82.8044 44.8817 83.5518 44.4181 84.1746 43.8645C84.7974 43.3109 85.2748 42.7296 85.607 42.1206C85.9392 41.4978 86.1052 40.9096 86.1052 40.356C86.1052 40.2315 86.0706 40.1692 86.0014 40.1692C85.7108 40.1692 85.344 40.3007 84.9012 40.5636C84.4583 40.8127 83.9739 41.1518 83.448 41.5809C82.922 42.0099 82.3892 42.4805 81.8494 42.9925C81.3097 43.5046 80.7976 44.0167 80.3132 44.5288C79.8288 45.0409 79.4067 45.5114 79.0468 45.9405Z",
                fill: "var(--color)"
            }), C.jsx("path", {
                d: "M66.8863 48.3487C65.9036 48.3487 65.1148 48.0027 64.5196 47.3107C63.9245 46.6049 63.627 45.6638 63.627 44.4874C63.627 44.1137 63.6754 43.7331 63.7723 43.3456C63.883 42.958 64.0145 42.5982 64.1667 42.266C64.0837 42.1415 64.0145 41.9823 63.9591 41.7886C63.9176 41.581 63.8968 41.3388 63.8968 41.062C63.8968 40.1624 64.056 39.3389 64.3743 38.5915C64.6926 37.8303 65.1217 37.1729 65.6614 36.6193C66.2012 36.0657 66.7963 35.6367 67.4468 35.3322C68.0973 35.0277 68.7547 34.8755 69.419 34.8755C70.5539 34.8755 71.4812 35.2561 72.2008 36.0173C72.9344 36.7785 73.3011 37.9618 73.3011 39.5672C73.3011 40.37 73.1766 41.1865 72.9274 42.0169C72.6783 42.8473 72.3392 43.6431 71.9102 44.4043C71.495 45.1517 71.0106 45.8229 70.457 46.418C69.9172 47.0132 69.336 47.4837 68.7132 47.8297C68.1042 48.1757 67.4952 48.3487 66.8863 48.3487ZM66.5541 41.3319C66.6233 41.4841 66.6579 41.664 66.6579 41.8716C66.6579 42.0792 66.6164 42.2937 66.5334 42.5152C66.4503 42.7366 66.3673 43.0342 66.2842 43.4078C66.2012 43.7677 66.1597 44.2867 66.1597 44.9649C66.1597 45.1448 66.1804 45.297 66.222 45.4216C66.2773 45.5323 66.395 45.5877 66.5749 45.5877C67.0454 45.5877 67.4883 45.4354 67.9035 45.1309C68.3326 44.8265 68.7132 44.4251 69.0453 43.9268C69.3913 43.4286 69.682 42.875 69.9172 42.266C70.1664 41.6432 70.3532 41.0135 70.4778 40.3769C70.6162 39.7264 70.6854 39.1244 70.6854 38.5708C70.6854 38.2109 70.6162 37.9618 70.4778 37.8234C70.3394 37.685 70.0972 37.6158 69.7512 37.6158C69.2806 37.6158 68.7962 37.768 68.298 38.0725C67.8136 38.3632 67.4053 38.7645 67.0731 39.2766C66.741 39.7749 66.5749 40.3423 66.5749 40.9789C66.5749 41.1035 66.568 41.2211 66.5541 41.3319Z",
                fill: "var(--color)"
            }), C.jsx("path", {
                d: "M59.3095 47.1862C59.2265 47.9335 58.7836 48.3072 57.9809 48.3072C57.5657 48.3072 57.2335 48.1827 56.9844 47.9335C56.7491 47.6844 56.6315 47.3246 56.6315 46.854C56.6315 46.0513 56.6661 45.1932 56.7353 44.2798C56.8183 43.3525 56.9152 42.4183 57.0259 41.4772C57.1505 40.5361 57.2681 39.6365 57.3789 38.7784C56.8806 39.4981 56.3547 40.2385 55.8011 40.9997C55.2475 41.7609 54.6939 42.5013 54.1403 43.221C53.5867 43.9407 53.0539 44.5912 52.5418 45.1725C52.0435 45.7399 51.5868 46.1966 51.1716 46.5426C50.7564 46.8748 50.4104 47.0409 50.1336 47.0409C49.4693 47.0409 48.8949 46.7987 48.4105 46.3143C47.9261 45.816 47.6839 45.1863 47.6839 44.4251C47.6839 44.1621 47.7116 43.8092 47.767 43.3663C47.8223 42.9096 47.8915 42.4252 47.9746 41.9131C48.0576 41.4011 48.1268 40.9167 48.1822 40.4599C48.2375 40.0032 48.2652 39.6434 48.2652 39.3804C48.2652 39.3804 48.2652 39.3666 48.2652 39.3389C48.2791 39.2697 48.2652 39.2351 48.2237 39.2351C48.1683 39.2351 48.0161 39.4219 47.767 39.7956C47.5179 40.1555 47.2134 40.626 46.8535 41.2073C46.4937 41.7886 46.1131 42.3975 45.7117 43.0342C45.3242 43.6708 44.9575 44.2659 44.6115 44.8195C44.2793 45.3731 44.0025 45.8022 43.7811 46.1067C43.4766 46.5772 43.1929 46.8748 42.9299 46.9993C42.6669 47.1239 42.3625 47.1862 42.0165 47.1862C41.5321 47.1862 41.1515 47.027 40.8747 46.7087C40.6117 46.3765 40.4802 45.9129 40.4802 45.3178C40.4802 45.0687 40.5217 44.6811 40.6048 44.1552C40.7017 43.6293 40.8193 43.048 40.9577 42.4114C41.0961 41.7609 41.2345 41.1312 41.3729 40.5222C41.5251 39.8994 41.6566 39.3735 41.7673 38.9445C41.8919 38.377 42.0649 37.9826 42.2863 37.7611C42.5216 37.5259 42.8192 37.4082 43.179 37.4082C44.0233 37.4082 44.4454 37.8234 44.4454 38.6538C44.4454 38.8061 44.3969 39.0552 44.3001 39.4012C44.2032 39.7472 44.0855 40.1485 43.9471 40.6053C43.8087 41.062 43.6634 41.5325 43.5112 42.0169C43.3589 42.4875 43.2344 42.9304 43.1375 43.3456C43.4697 42.7643 43.8295 42.1415 44.217 41.4772C44.6045 40.8129 44.999 40.1624 45.4003 39.5257C45.8155 38.8891 46.2238 38.3078 46.6252 37.7819C47.0404 37.256 47.4487 36.8408 47.85 36.5363C48.2514 36.218 48.632 36.0588 48.9918 36.0588C49.3517 36.0588 49.7046 36.1903 50.0506 36.4533C50.3966 36.7024 50.6803 37.0276 50.9017 37.429C51.137 37.8165 51.2547 38.2317 51.2547 38.6746C51.2547 39.0898 51.1993 39.588 51.0886 40.1693C50.9779 40.7506 50.8533 41.3595 50.7149 41.9962C50.5765 42.6328 50.4796 43.2556 50.4243 43.8646C50.8948 43.3387 51.3931 42.7435 51.919 42.0792C52.4449 41.4011 52.9847 40.7021 53.5383 39.9825C54.0919 39.2628 54.6316 38.5639 55.1575 37.8857C55.6973 37.2075 56.1955 36.5917 56.6523 36.0381C57.1228 35.4845 57.538 35.0485 57.8979 34.7302C58.2577 34.398 58.5345 34.2319 58.7283 34.2319C59.2957 34.2319 59.7386 34.3842 60.0569 34.6887C60.3891 34.9793 60.5551 35.4914 60.5551 36.2249C60.5551 36.6816 60.5205 37.2767 60.4513 38.0103C60.396 38.7438 60.3129 39.5396 60.2022 40.3977C60.1053 41.2419 59.9946 42.1 59.8701 42.9719C59.7593 43.83 59.6555 44.6258 59.5587 45.3593C59.4618 46.0928 59.3787 46.7018 59.3095 47.1862Z",
                fill: "var(--color)"
            }), C.jsx("path", {
                d: "M17.9304 48.7223C17.3907 48.7223 16.9962 48.577 16.7471 48.2864C16.498 48.0096 16.3734 47.449 16.3734 46.6048C16.3734 45.8851 16.4911 44.9509 16.7264 43.8022C16.9616 42.6535 17.2246 41.4148 17.5152 40.0862C15.979 41.8023 14.2075 42.8957 12.2007 43.3662C11.7993 44.1966 11.3288 44.9578 10.789 45.6498C10.2492 46.3418 9.66105 46.9024 9.02441 47.3314C8.40161 47.7466 7.75113 47.9542 7.07297 47.9542C6.22873 47.9542 5.50213 47.6774 4.89317 47.1238C4.29805 46.5702 4.00049 45.719 4.00049 44.5703C4.00049 43.7953 4.11813 43.1379 4.35341 42.5981C4.58869 42.0445 4.85857 41.6293 5.16305 41.3525C4.91393 40.8266 4.78937 40.2246 4.78937 39.5464C4.78937 38.633 5.03849 37.8233 5.53673 37.1175C6.03497 36.4116 6.69237 35.858 7.50893 35.4567C8.33933 35.0553 9.23893 34.8546 10.2077 34.8546C10.7475 34.8546 11.2596 34.993 11.744 35.2698C12.2422 35.5328 12.6436 35.9411 12.948 36.4947C13.2664 37.0344 13.4255 37.7195 13.4255 38.5499C13.4255 39.2419 13.3217 40.0031 13.1141 40.8335C14.0968 40.2522 15.0656 39.4564 16.0205 38.4461C16.9893 37.4358 17.8543 36.3009 18.6155 35.0415C18.8508 34.6678 19.183 34.481 19.612 34.481C19.9718 34.481 20.2556 34.5917 20.4632 34.8131C20.6846 35.0207 20.7953 35.2975 20.7953 35.6435C20.7953 35.7127 20.7538 35.9411 20.6708 36.3286C20.5877 36.7161 20.477 37.2213 20.3386 37.8441C20.2002 38.453 20.048 39.1243 19.8819 39.8578C19.7296 40.5913 19.5774 41.3387 19.4252 42.0999C19.2729 42.8611 19.1345 43.5808 19.01 44.2589C19.3698 43.6084 19.7573 42.9164 20.1725 42.1829C20.6016 41.4356 21.0444 40.702 21.5012 39.9824C21.9579 39.2488 22.4077 38.5845 22.8506 37.9894C23.2935 37.3943 23.7017 36.9237 24.0754 36.5777C24.4491 36.2179 24.7674 36.038 25.0304 36.038C25.5563 36.038 25.9992 36.1902 26.359 36.4947C26.7188 36.7992 26.8988 37.1106 26.8988 37.4289C26.8988 37.7472 26.8642 38.2385 26.795 38.9028C26.7258 39.5672 26.6358 40.3145 26.5251 41.1449C26.4282 41.9615 26.3244 42.785 26.2137 43.6154C26.103 44.4458 26.013 45.2 25.9438 45.8782C25.8746 46.5425 25.84 47.0408 25.84 47.3729C25.84 47.6497 25.7085 47.9127 25.4456 48.1618C25.1826 48.4109 24.8851 48.5355 24.5529 48.5355C24.5252 48.5355 24.4768 48.5355 24.4076 48.5355C24.2415 48.5493 24.0892 48.5216 23.9508 48.4524C23.8124 48.3971 23.6948 48.1895 23.5979 47.8296C23.5149 47.4698 23.4734 46.8608 23.4734 46.0028C23.4734 45.4215 23.5011 44.7848 23.5564 44.0928C23.6118 43.4008 23.681 42.7088 23.764 42.0168C23.8609 41.311 23.9647 40.6536 24.0754 40.0446C23.7156 40.6398 23.3142 41.3179 22.8713 42.0791C22.4423 42.8265 21.9925 43.5946 21.5219 44.3835C21.0514 45.1585 20.5877 45.8782 20.131 46.5425C19.6881 47.193 19.2729 47.7189 18.8854 48.1203C18.5117 48.5216 18.1934 48.7223 17.9304 48.7223ZM10.1247 41.7885C10.3046 41.2487 10.4499 40.6882 10.5606 40.1069C10.6714 39.5118 10.7267 38.9305 10.7267 38.3631C10.7267 38.1278 10.6783 37.8994 10.5814 37.678C10.4845 37.4566 10.3184 37.3458 10.0832 37.3458C9.61261 37.3458 9.14897 37.4427 8.69225 37.6365C8.24937 37.8302 7.88261 38.107 7.59197 38.4669C7.30133 38.8267 7.15601 39.2558 7.15601 39.754C7.15601 40.1969 7.30133 40.5706 7.59197 40.875C7.89645 41.1795 8.27013 41.4079 8.71301 41.5601C9.16973 41.7124 9.61953 41.7885 10.0624 41.7885C10.0762 41.7885 10.097 41.7885 10.1247 41.7885ZM9.27353 43.6154C8.78913 43.6015 8.31857 43.5392 7.86185 43.4285C7.40513 43.304 6.98993 43.131 6.61625 42.9095C6.57473 43.131 6.53321 43.3455 6.49169 43.5531C6.45017 43.7468 6.42941 43.9337 6.42941 44.1136C6.42941 44.4181 6.47785 44.6949 6.57473 44.944C6.68545 45.1793 6.90689 45.2969 7.23905 45.2969C7.58505 45.2969 7.93105 45.1447 8.27705 44.8402C8.63689 44.5357 8.96905 44.1274 9.27353 43.6154Z",
                fill: "var(--color)"
            }), C.jsx("path", {
                d: "M126.63 9.20065C126.63 9.36673 126.574 9.51205 126.464 9.63661C126.353 9.76117 126.215 9.85805 126.048 9.92725C125.813 10.0241 125.405 10.1487 124.824 10.3009C124.242 10.4532 123.537 10.6262 122.706 10.8199C121.89 11.0137 121.011 11.2144 120.07 11.422C119.128 11.6157 118.187 11.8026 117.246 11.9825C116.886 13.3111 116.52 14.6813 116.146 16.093C115.772 17.4908 115.399 18.8679 115.025 20.2242C114.887 20.7086 114.72 21.0754 114.527 21.3245C114.333 21.5874 114.001 21.7189 113.53 21.7189C113.018 21.7189 112.672 21.5528 112.492 21.2207C112.326 20.9024 112.305 20.4664 112.43 19.9128C112.79 18.4042 113.122 16.9995 113.426 15.6985C113.745 14.3976 114.001 13.3457 114.195 12.543C113.364 12.6814 112.638 12.7921 112.015 12.8752C111.392 12.9444 110.949 12.972 110.686 12.9582C110.395 12.9305 110.153 12.8129 109.959 12.6053C109.766 12.3977 109.676 12.1416 109.69 11.8372C109.717 11.5604 109.842 11.3251 110.063 11.1313C110.285 10.9237 110.548 10.7992 110.852 10.7576C111.281 10.7161 111.835 10.6538 112.513 10.5708C113.191 10.4878 113.938 10.3909 114.755 10.2802C114.935 9.57433 115.143 8.84773 115.378 8.10037C115.613 7.33917 115.855 6.61257 116.104 5.92057C116.367 5.21473 116.617 4.59885 116.852 4.07293C117.087 3.54701 117.302 3.16641 117.495 2.93113C117.648 2.75121 117.834 2.61281 118.056 2.51593C118.291 2.41905 118.52 2.37061 118.741 2.37061C119.032 2.37061 119.267 2.47441 119.447 2.68201C119.627 2.88961 119.717 3.13181 119.717 3.40861C119.717 3.51933 119.71 3.63697 119.696 3.76153C119.682 3.87225 119.654 3.98297 119.613 4.09369C119.35 4.78569 119.066 5.62301 118.762 6.60565C118.471 7.58829 118.167 8.66781 117.848 9.84421C118.886 9.69197 119.904 9.53973 120.9 9.38749C121.91 9.22141 122.824 9.06917 123.64 8.93077C124.471 8.77853 125.135 8.64705 125.633 8.53633C125.91 8.43945 126.145 8.46021 126.339 8.59861C126.533 8.72317 126.63 8.92385 126.63 9.20065Z",
                fill: "var(--color)"
            }), C.jsx("path", {
                d: "M105.769 20.5979C105.451 20.5979 105.16 20.4664 104.897 20.2034C104.648 19.9543 104.524 19.5322 104.524 18.9371C104.524 18.4942 104.558 17.8783 104.628 17.0894C104.711 16.2867 104.863 15.2556 105.084 13.9962C104.6 14.9927 104.095 15.8784 103.569 16.6535C103.043 17.4285 102.524 18.0375 102.012 18.4804C101.514 18.9094 101.036 19.1239 100.579 19.1239C99.8459 19.1239 99.2646 18.9025 98.8356 18.4596C98.4065 18.0029 98.192 17.1517 98.192 15.9061C98.192 15.311 98.2405 14.6398 98.3373 13.8924C98.4481 13.145 98.5865 12.3977 98.7525 11.6503C98.9186 10.903 99.0847 10.2386 99.2508 9.65736C99.4307 9.06224 99.5899 8.61936 99.7283 8.32872C99.839 8.0796 99.9774 7.88584 100.143 7.74744C100.323 7.60904 100.552 7.53984 100.829 7.53984C101.271 7.53984 101.61 7.68516 101.846 7.9758C102.081 8.26644 102.199 8.564 102.199 8.86848C102.199 9.10376 102.143 9.44284 102.033 9.88572C101.936 10.3286 101.811 10.8199 101.659 11.3597C101.521 11.8994 101.375 12.453 101.223 13.0205C101.071 13.5879 100.939 14.1208 100.829 14.619C100.732 15.1172 100.683 15.5394 100.683 15.8854C100.683 16.3144 100.849 16.5289 101.181 16.5289C101.375 16.5289 101.624 16.3421 101.929 15.9684C102.247 15.5947 102.579 15.0965 102.925 14.4737C103.285 13.837 103.645 13.145 104.005 12.3977C104.378 11.6365 104.718 10.8684 105.022 10.0933C105.34 9.30444 105.61 8.57784 105.832 7.91352C105.97 7.49832 106.157 7.20768 106.392 7.0416C106.627 6.87552 106.897 6.79248 107.202 6.79248C107.672 6.79248 108.032 6.92396 108.281 7.18692C108.544 7.44988 108.676 7.82356 108.676 8.30796C108.676 8.5294 108.641 8.90308 108.572 9.429C108.503 9.95492 108.413 10.5708 108.302 11.2766C108.205 11.9825 108.088 12.7298 107.949 13.5187C107.811 14.3076 107.672 15.0826 107.534 15.8438C107.409 16.605 107.285 17.304 107.16 17.9406C107.036 18.5634 106.932 19.0616 106.849 19.4353C106.711 19.9889 106.544 20.3211 106.351 20.4318C106.157 20.5425 105.963 20.5979 105.769 20.5979Z",
                fill: "var(--color)"
            }), C.jsx("path", {
                d: "M88.8417 20.3487C87.8591 20.3487 87.0702 20.0027 86.4751 19.3107C85.88 18.6049 85.5824 17.6638 85.5824 16.4874C85.5824 16.1137 85.6308 15.7331 85.7277 15.3456C85.8384 14.958 85.9699 14.5982 86.1222 14.266C86.0391 14.1415 85.9699 13.9823 85.9146 13.7886C85.873 13.581 85.8523 13.3388 85.8523 13.062C85.8523 12.1624 86.0114 11.3389 86.3298 10.5915C86.6481 9.83033 87.0771 9.17293 87.6169 8.61933C88.1566 8.06573 88.7518 7.63669 89.4022 7.33221C90.0527 7.02773 90.7101 6.87549 91.3744 6.87549C92.5093 6.87549 93.4366 7.25609 94.1563 8.01729C94.8898 8.77849 95.2566 9.96181 95.2566 11.5672C95.2566 12.37 95.132 13.1865 94.8829 14.0169C94.6338 14.8473 94.2947 15.6431 93.8656 16.4043C93.4504 17.1517 92.966 17.8229 92.4124 18.418C91.8727 19.0132 91.2914 19.4837 90.6686 19.8297C90.0596 20.1757 89.4507 20.3487 88.8417 20.3487ZM88.5096 13.3318C88.5788 13.4841 88.6134 13.664 88.6134 13.8716C88.6134 14.0792 88.5718 14.2937 88.4888 14.5152C88.4058 14.7366 88.3227 15.0342 88.2397 15.4078C88.1566 15.7677 88.1151 16.2867 88.1151 16.9648C88.1151 17.1448 88.1359 17.297 88.1774 17.4216C88.2328 17.5323 88.3504 17.5876 88.5303 17.5876C89.0009 17.5876 89.4438 17.4354 89.859 17.1309C90.288 16.8264 90.6686 16.4251 91.0008 15.9269C91.3468 15.4286 91.6374 14.875 91.8727 14.266C92.1218 13.6432 92.3086 13.0135 92.4332 12.3769C92.5716 11.7264 92.6408 11.1244 92.6408 10.5708C92.6408 10.2109 92.5716 9.96181 92.4332 9.82341C92.2948 9.68501 92.0526 9.61581 91.7066 9.61581C91.236 9.61581 90.7516 9.76805 90.2534 10.0725C89.769 10.3632 89.3607 10.7645 89.0286 11.2766C88.6964 11.7748 88.5303 12.3423 88.5303 12.9789C88.5303 13.1035 88.5234 13.2211 88.5096 13.3318Z",
                fill: "var(--color)"
            }), C.jsx("path", {
                d: "M57.5845 20.5772C56.8233 20.5772 56.1452 20.3696 55.5501 19.9544C54.9549 19.553 54.4844 18.9856 54.1384 18.252C53.8062 17.5185 53.6401 16.6604 53.6401 15.6778C53.6401 14.626 53.7647 13.6018 54.0138 12.6053C54.2629 11.595 54.5813 10.6885 54.9688 9.88577C55.3563 9.06921 55.7438 8.42565 56.1313 7.95509C56.5327 7.47069 56.8787 7.22849 57.1693 7.22849C57.4738 7.22849 57.7229 7.31845 57.9167 7.49837C58.1243 7.67829 58.2281 7.94817 58.2281 8.30801C58.2281 8.36337 58.1658 8.56405 58.0413 8.91005C57.9305 9.24221 57.7852 9.67125 57.6053 10.1972C57.4254 10.7092 57.2455 11.2836 57.0655 11.9202C56.8856 12.543 56.7334 13.1797 56.6088 13.8302C56.4981 14.4806 56.4427 15.1034 56.4427 15.6986C56.4427 16.4182 56.5535 16.9926 56.7749 17.4216C56.9963 17.8507 57.4738 18.0652 58.2073 18.0652C58.9547 18.0652 59.6813 17.8507 60.3871 17.4216C61.1068 16.9926 61.7988 16.4182 62.4631 15.6986C63.1275 14.965 63.7641 14.1485 64.3731 13.2489C63.6534 13.3042 62.9752 13.3319 62.3386 13.3319C61.9095 13.3319 61.5981 13.2904 61.4044 13.2074C61.2106 13.1105 61.0861 12.9859 61.0307 12.8337C60.9892 12.6814 60.9684 12.5015 60.9684 12.2939C60.9684 12.0033 61.0999 11.7403 61.3629 11.505C61.6258 11.2698 61.9165 11.1452 62.2348 11.1314C62.8299 11.0898 63.4319 11.0414 64.0409 10.986C64.6637 10.9307 65.2796 10.8684 65.8885 10.7992C66.3453 9.98265 66.7674 9.17301 67.1549 8.37029C67.5563 7.55373 67.923 6.78561 68.2552 6.06593C68.5735 5.16633 68.9126 4.33593 69.2724 3.57473C69.6461 2.79969 70.0059 2.17689 70.3519 1.70633C70.6979 1.23577 71.0232 1.00049 71.3277 1.00049C71.6875 1.00049 71.9574 1.09737 72.1373 1.29113C72.3311 1.48489 72.4279 1.74093 72.4279 2.05925C72.4279 2.15613 72.3587 2.43985 72.2203 2.91041C72.0819 3.38097 71.8882 3.98993 71.6391 4.73729C71.4038 5.48465 71.1339 6.32889 70.8294 7.27001C70.5388 8.19729 70.2274 9.17993 69.8952 10.2179C71.21 9.99649 72.4072 9.78197 73.4867 9.57437C74.5801 9.36677 75.4727 9.19377 76.1647 9.05537C76.8567 8.91697 77.2719 8.84777 77.4103 8.84777C77.6871 8.84777 77.9155 8.97925 78.0954 9.24221C78.2753 9.49133 78.3653 9.73353 78.3653 9.96881C78.3653 10.1072 78.1093 10.2871 77.5972 10.5086C77.0989 10.73 76.4139 10.9722 75.5419 11.2352C74.6839 11.4843 73.7012 11.7403 72.594 12.0033C71.5007 12.2524 70.3519 12.4738 69.1479 12.6676C68.8157 13.761 68.4974 14.8336 68.1929 15.8854C67.9023 16.9234 67.6531 17.8853 67.4455 18.771C67.3487 19.1586 67.1895 19.4561 66.9681 19.6637C66.7605 19.8575 66.4767 19.9544 66.1169 19.9544C65.7432 19.9544 65.4664 19.8644 65.2865 19.6845C65.1066 19.5184 65.0166 19.2139 65.0166 18.771C65.0166 18.7295 65.0581 18.5012 65.1412 18.086C65.2381 17.6569 65.3557 17.131 65.4941 16.5082C65.6463 15.8716 65.7917 15.2211 65.9301 14.5568C65.1135 15.6916 64.2485 16.7158 63.3351 17.6292C62.4216 18.5427 61.4805 19.2624 60.5117 19.7883C59.5429 20.3142 58.5672 20.5772 57.5845 20.5772ZM57.6468 5.79605C57.1901 5.79605 56.8164 5.65765 56.5258 5.38085C56.2351 5.09021 56.0898 4.75113 56.0898 4.36361C56.0898 3.89305 56.2628 3.49169 56.6088 3.15953C56.9687 2.82737 57.3908 2.66129 57.8752 2.66129C58.4149 2.66129 58.8232 2.80661 59.1 3.09725C59.3907 3.38789 59.536 3.77541 59.536 4.25981C59.536 4.60581 59.3561 4.95181 58.9962 5.29781C58.6364 5.62997 58.1866 5.79605 57.6468 5.79605Z",
                fill: "var(--color)"
            }), C.jsx("path", {
                d: "M32.1253 25.3724C31.3502 25.3724 30.6444 25.3239 30.0077 25.2271C29.3711 25.144 28.7483 25.0056 28.1393 24.8119C27.5304 24.6181 26.873 24.3621 26.1671 24.0437C25.8765 23.9053 25.6343 23.76 25.4405 23.6078C25.2468 23.4555 25.1499 23.2272 25.1499 22.9227C25.1499 22.4798 25.2883 22.1407 25.5651 21.9055C25.8281 21.684 26.1948 21.5733 26.6654 21.5733C26.9145 21.5733 27.2328 21.6563 27.6203 21.8224C28.0079 22.0023 28.4507 22.203 28.949 22.4245C29.4611 22.6597 30.0285 22.8604 30.6513 23.0265C31.2741 23.2064 31.9453 23.2964 32.665 23.2964C33.3985 23.2964 34.0836 22.9919 34.7203 22.3829C35.3569 21.774 35.869 20.9159 36.2565 19.8087C36.6579 18.7153 36.8585 17.4213 36.8585 15.9266C36.8585 15.5806 36.8516 15.2069 36.8378 14.8055C36.8239 14.3903 36.8101 13.9544 36.7963 13.4977C36.298 14.4388 35.7583 15.3176 35.177 16.1342C34.5957 16.9507 33.9937 17.6151 33.3709 18.1271C32.7619 18.6254 32.146 18.8745 31.5232 18.8745C30.762 18.8745 30.2084 18.6946 29.8624 18.3347C29.5303 17.9611 29.3642 17.3729 29.3642 16.5701C29.3642 15.892 29.4126 15.1515 29.5095 14.3488C29.6202 13.5323 29.7655 12.7088 29.9455 11.8784C30.1254 11.048 30.333 10.2591 30.5683 9.51174C30.8174 8.75054 31.0803 8.09314 31.3571 7.53954C31.5647 7.13818 31.8831 6.9375 32.3121 6.9375C32.5889 6.9375 32.8657 7.06898 33.1425 7.33194C33.4331 7.5949 33.5785 7.94782 33.5785 8.3907C33.5785 8.63982 33.5162 8.99966 33.3916 9.47022C33.2671 9.94078 33.1148 10.4736 32.9349 11.0687C32.7688 11.65 32.5958 12.2659 32.4159 12.9164C32.236 13.553 32.0837 14.1827 31.9592 14.8055C31.8346 15.4145 31.7723 15.9681 31.7723 16.4663C31.7723 16.5217 31.8139 16.5494 31.8969 16.5494C32.063 16.5494 32.2844 16.411 32.5612 16.1342C32.8519 15.8435 33.1702 15.4699 33.5162 15.0131C33.876 14.5426 34.2359 14.0305 34.5957 13.4769C34.9694 12.9095 35.3292 12.3489 35.6752 11.7953C36.0212 11.2417 36.3326 10.7366 36.6094 10.2799C36.5679 10.0584 36.5402 9.86466 36.5264 9.69858C36.5264 9.51866 36.5264 9.36642 36.5264 9.24186C36.5264 8.67442 36.6233 8.20386 36.817 7.83018C37.0246 7.4565 37.426 7.26966 38.0211 7.26966C38.4086 7.26966 38.7062 7.41498 38.9138 7.70562C39.1214 7.98242 39.2252 8.37686 39.2252 8.88894C39.2252 9.11038 39.1906 9.36642 39.1214 9.65706C39.0522 9.93386 38.9138 10.3767 38.7062 10.9857L38.9345 10.3421C39.0591 11.5877 39.1629 12.6949 39.2459 13.6637C39.3428 14.6325 39.3913 15.5944 39.3913 16.5494C39.3913 18.3486 39.0868 19.9056 38.4778 21.2204C37.8827 22.549 37.0385 23.5732 35.9451 24.2929C34.8656 25.0125 33.5923 25.3724 32.1253 25.3724Z",
                fill: "var(--color)"
            }), C.jsx("path", {
                d: "M19.0048 20.5772C18.6588 20.5772 18.3612 20.4526 18.1121 20.2035C17.8768 19.9544 17.7592 19.5946 17.7592 19.124C17.7592 18.9164 17.7868 18.5773 17.8422 18.1068C17.9114 17.6224 17.9944 17.0688 18.0913 16.446C18.202 15.8232 18.3058 15.1727 18.4027 14.4945C18.5134 13.8164 18.6034 13.1728 18.6726 12.5638C18.7556 11.9549 18.811 11.4359 18.8387 11.0068C18.8664 10.4809 19.0048 10.1072 19.2539 9.88581C19.503 9.65053 19.8006 9.53289 20.1466 9.53289C20.4234 9.53289 20.6725 9.60209 20.8939 9.74049C21.1292 9.86505 21.2745 10.1349 21.3299 10.5501C21.3991 10.9515 21.406 11.5328 21.3506 12.294C21.9596 11.1868 22.5755 10.1972 23.1983 9.32529C23.8349 8.45337 24.4992 7.76137 25.1912 7.24929C26.34 6.37737 27.378 5.94141 28.3052 5.94141C28.8312 5.94141 29.1772 6.05905 29.3432 6.29433C29.5093 6.52961 29.5924 6.77181 29.5924 7.02093C29.5924 7.18701 29.5508 7.33925 29.4678 7.47765C29.3986 7.61605 29.2464 7.76137 29.0111 7.91361C28.7758 8.06585 28.416 8.26653 27.9316 8.51565C27.2811 8.84781 26.6375 9.28377 26.0009 9.82353C25.3781 10.3633 24.7553 11.0553 24.1325 11.8995C23.5097 12.7438 22.88 13.7818 22.2433 15.0135C21.6067 16.2453 20.9493 17.7123 20.2711 19.4146C20.1466 19.8852 19.9666 20.1966 19.7314 20.3488C19.5099 20.5011 19.2677 20.5772 19.0048 20.5772Z",
                fill: "var(--color)"
            }), C.jsx("path", {
                d: "M6.4917 7.02092C5.82738 7.02092 5.33606 6.95864 5.01774 6.83408C4.71326 6.69568 4.51258 6.53652 4.4157 6.3566C4.33266 6.16284 4.29114 5.98984 4.29114 5.8376C4.29114 5.64384 4.40186 5.4224 4.6233 5.17328C4.84474 4.91032 5.27378 4.71656 5.91042 4.592C6.54706 4.4536 7.30134 4.32903 8.17326 4.21832C9.04518 4.09376 9.97246 3.98995 10.9551 3.90691C11.9377 3.81003 12.9342 3.72699 13.9445 3.65779C14.9549 3.5886 15.9167 3.54016 16.8302 3.51247C17.7436 3.47096 18.5533 3.4502 19.2591 3.4502C19.9926 3.4502 20.5601 3.49172 20.9614 3.57476C21.3628 3.65779 21.6465 3.76159 21.8126 3.88615C21.9925 4.01071 22.0963 4.14219 22.124 4.28059C22.1655 4.419 22.1863 4.55048 22.1863 4.67503C22.1863 4.70272 22.1863 4.72347 22.1863 4.73731C22.1863 4.9034 22.1447 5.08332 22.0617 5.27708C21.9925 5.47084 21.8333 5.63692 21.5842 5.77532C21.3351 5.89988 20.9614 5.96216 20.4632 5.96216C20.2833 5.96216 19.8819 5.98984 19.2591 6.0452C18.6363 6.10056 17.8751 6.16976 16.9755 6.2528C16.0759 6.33583 15.1209 6.41887 14.1106 6.50192C13.9584 7.12471 13.7854 7.85131 13.5916 8.68171C13.4117 9.51212 13.2249 10.384 13.0311 11.2975C12.8512 12.2109 12.6782 13.1105 12.5121 13.9963C12.346 14.8682 12.2076 15.6778 12.0969 16.4252C11.9862 17.1587 11.9101 17.7608 11.8685 18.2313C11.8132 18.868 11.6263 19.3178 11.308 19.5807C11.0035 19.8298 10.6991 19.9544 10.3946 19.9544C10.1731 19.9544 9.9517 19.906 9.73026 19.8091C9.50882 19.726 9.3289 19.5392 9.1905 19.2486C9.0521 18.9441 8.9829 18.4943 8.9829 17.8992C8.9829 17.2902 9.03826 16.5428 9.14898 15.6571C9.2597 14.7575 9.40502 13.7956 9.58494 12.7714C9.7787 11.7473 9.99322 10.7162 10.2285 9.6782C10.4776 8.6402 10.7337 7.67139 10.9966 6.77179C10.0693 6.84099 9.21126 6.90327 8.42238 6.95863C7.6335 7.00016 6.98994 7.02092 6.4917 7.02092Z",
                fill: "var(--color)"
            }), C.jsx("path", {
                d: "M153.73 28.1783C153.853 28.1992 154.445 28.3609 154.486 28.3802C154.565 28.416 154.106 28.3533 154.306 28.4286C154.347 28.4427 155.359 28.636 155.3 28.5522C155.187 28.5245 154.824 28.503 154.768 28.4767C154.38 28.2782 157.493 28.9163 157.657 28.9115C157.593 28.8744 157.528 28.8376 157.463 28.8007C157.658 28.85 157.852 28.8997 158.047 28.9505C157.964 28.9552 157.88 28.9604 157.796 28.9654C158.02 29.0229 158.328 29.0691 158.534 29.1318C158.568 29.1421 158.467 29.1837 158.548 29.2031C158.628 29.222 158.63 29.1373 158.749 29.1529C158.884 29.1703 159.48 29.356 159.69 29.4018C160.477 29.5694 161.282 29.7114 162.06 29.9457C161.234 29.8005 162.035 30.066 162.27 30.1003C162.322 30.1083 162.353 29.9522 163.158 30.2106C163.668 30.3782 163.133 30.4553 164.022 30.5949C163.404 30.2575 164.05 30.4501 164.574 30.6025C164.665 30.628 165.379 30.872 165.701 30.9708C165.811 31.0038 166.002 30.9821 166.147 31.0282C166.246 31.0598 166.309 31.1272 166.458 31.1757C167.151 31.402 167.83 31.6468 168.512 31.934C168.035 31.9668 168.789 32.1405 168.824 32.1655C168.966 32.2833 168.22 32.0013 168.5 32.1514C168.911 32.3091 169.318 32.4714 169.729 32.646C169.406 32.4755 170.24 32.6814 170.355 32.8131C170.361 32.7206 170.769 32.9408 171.212 33.22C171.914 33.6257 172.564 34.2207 172.75 34.334C172.817 34.3843 172.47 33.9309 173.415 34.831C173.513 34.9306 173.436 34.9343 173.492 34.9811C173.525 35.0081 173.839 35.0713 173.955 35.3416C173.987 35.4426 173.513 35.0351 174.43 36.0614C174.263 35.5113 175.613 37.5214 175.713 37.9178C175.694 37.833 175.674 37.747 175.653 37.6616C175.802 38.0574 175.886 38.0945 175.927 38.1788C176.06 38.4536 176.192 38.8241 176.31 39.1177C176.342 39.1952 176.372 39.2689 176.401 39.3352C176.578 39.7474 176.686 39.7113 176.812 40.2172C176.797 40.0929 176.78 39.9682 176.76 39.8427C176.879 40.1858 176.98 40.5298 177.065 40.8724C176.702 40.1261 177.107 41.0384 177.121 41.1062C177.151 41.2055 177.057 41.0761 177.105 41.2421C177.11 41.2589 177.162 41.2214 177.225 41.4788C177.35 42.0178 177.257 41.9447 177.297 42.1695C177.3 42.1894 177.343 42.1107 177.411 42.4962C177.597 43.7206 177.378 42.4958 177.358 42.4496C177.334 42.3894 177.205 42.8401 177.097 41.7892C177.14 42.144 177.048 42.1935 177.053 42.233C177.061 42.2723 177.155 42.8615 177.159 42.8944C177.223 43.1829 177.259 42.9192 177.277 42.9747C177.296 43.0228 177.272 43.7419 177.47 43.8983C177.304 44.2454 177.307 43.7124 177.223 43.1413C177.181 43.0624 177.197 43.6915 177.196 43.723C177.236 44.5207 177.36 44.0745 177.462 44.2458C177.514 44.3373 177.419 44.6672 177.546 44.3624C177.569 45.093 177.487 44.6499 177.477 44.6976C177.461 44.7685 177.496 45.0192 177.49 45.0524C177.482 45.0985 177.439 44.9378 177.42 45.1197C177.417 45.1507 177.489 45.4446 177.535 45.0671C177.512 45.5735 177.576 45.534 177.434 45.6978C177.671 46.057 177.269 45.9389 177.245 46.071C177.227 46.1771 177.232 46.2438 177.249 46.285L177.086 47.0286C177.1 47.1255 177.209 47.1198 177.211 47.1337C177.231 47.2705 176.828 48.1138 176.765 48.333C176.667 48.1956 177.039 47.6517 177.063 47.5053C177.149 47.0235 176.75 48.1105 176.707 47.7184C176.699 47.8728 176.692 48.0258 176.683 48.1792C176.473 48.3806 176.573 48.0135 176.334 48.6898C176.382 48.8362 176.517 48.217 176.542 48.3629C176.556 48.4499 176.403 48.8361 176.422 48.8534C176.446 48.873 176.562 48.5119 176.581 48.5843C176.624 48.7478 175.985 49.9576 176.355 48.9855C176.241 49.2517 176.001 49.3077 175.953 49.561C175.92 49.7248 176.551 49.0073 175.928 50.2311C175.834 50.2169 176.136 49.7246 176.135 49.7065C176.133 49.6833 175.901 49.6922 175.885 49.7037C175.832 49.7492 175.33 51.0508 175.098 51.2617C175.259 51.2173 174.634 52.1987 174.603 52.3259C174.596 52.3596 174.72 52.285 174.71 52.3197C174.645 52.5397 174.236 53.0065 174.093 53.2477C173.935 53.5163 174.008 53.5149 174 53.5298C173.928 53.6475 173.945 53.5309 173.903 53.6039C173.84 53.7171 173.387 54.4601 173.37 54.5023C173.366 54.5148 173.502 54.4308 173.414 54.6009C173.399 54.6291 173.336 54.5707 173.072 55.0662C172.751 55.6647 173.413 54.7241 173.341 55.0105C173.001 55.3131 173.116 55.3679 173.044 55.463C173.018 55.4963 172.764 55.6971 172.591 55.9765C172.705 55.7687 172.819 55.5576 172.93 55.3478C172.79 55.535 172.565 55.9288 172.442 56.0772C172.382 56.1496 172.35 56.0368 172.241 56.2073C172.217 56.2436 172.306 56.5065 172.515 56.0073C172.603 56.014 172.422 56.1989 172.376 56.3091C172.369 56.3258 172.439 56.4559 172.289 56.5368C172.252 56.5549 172.157 56.0231 171.821 57.0114C171.81 57.0431 171.912 56.9763 171.902 57.0081C171.895 57.0309 171.735 57.2323 171.725 57.2595C171.714 57.2875 171.827 57.2144 171.816 57.2488C171.758 57.4253 171.457 57.5005 171.677 57.2078C171.587 57.2943 171.497 57.3812 171.407 57.4668C171.608 57.4477 171.334 57.6492 171.24 57.7899C170.64 58.6916 171.14 58.1591 171.075 58.3405C170.968 58.633 170.887 58.2933 170.691 58.6996C170.672 58.7369 171.081 58.3698 170.41 59.1792C170.498 59.0521 170.586 58.9246 170.674 58.7968C170.502 58.7813 170.353 59.2513 170.332 59.2838C170.102 59.6263 170.227 59.372 169.92 59.9064C169.893 59.9541 169.791 60.0261 169.735 60.1299C169.502 60.5597 170.156 59.654 170.224 59.6604C170.258 59.6681 169.522 60.6217 169.482 60.6473C169.325 60.7482 169.793 60.1988 169.649 60.259C169.6 60.2852 168.583 61.6709 168.338 61.9155C168.06 62.2011 167.79 62.2091 167.964 62.3562C167.721 62.3004 167.775 62.4723 167.742 62.5108C167.333 62.9681 167.331 62.9663 167.006 63.3801C166.934 63.4713 166.82 63.502 166.802 63.5405C166.792 63.5628 166.875 63.5766 166.816 63.679C166.735 63.8224 166.036 64.5057 165.956 64.5332C165.878 64.5608 166.214 64.215 166.108 64.2355C165.873 64.4926 165.66 64.7553 165.419 65.0112C165.319 65.1174 165.335 65.0305 165.292 65.0766C165.274 65.0958 164.964 65.4964 164.99 65.4927C165.056 65.4844 166.078 64.3074 165.865 64.6654C165.823 64.7353 165.557 64.8729 165.683 64.9262C164.729 65.9442 163.75 66.9378 162.75 67.9059C163.244 67.2699 163.93 66.6823 164.495 66.0631C164.574 65.9777 164.846 65.7026 164.766 65.6925C164.271 66.2039 163.685 66.8705 163.178 67.3284C163.162 67.3432 163.176 67.2451 163.112 67.2975C162.992 67.3959 162.71 67.8168 162.634 67.8585C162.621 67.8633 162.763 67.609 162.668 67.6355C162.423 67.7037 162.583 67.9391 162.446 68.0727C162.34 68.1773 161.543 68.7748 161.424 69.007C161.3 69.2558 161.984 68.5347 161.983 68.639C161.556 69.1648 161.01 69.5791 160.556 70.019C160.548 70.0268 160.659 70.0029 160.56 70.1066C160.39 70.2864 160.286 70.2702 160.189 70.3422C160.086 70.4199 159.759 70.7378 159.692 70.7579C159.684 70.7603 159.697 70.6369 159.705 70.6256C159.83 70.4651 159.953 70.4952 159.967 70.484C160.019 70.4409 160.041 70.366 160.088 70.3257C160.165 70.2594 160.232 70.2485 160.333 70.1587C160.403 70.0967 160.288 70.1053 160.355 70.0465C160.381 70.025 160.753 69.9006 160.661 69.7554C160.633 69.7268 159.158 71.0274 158.521 71.5931C158.416 71.6923 158.342 71.7654 158.315 71.7997C158.392 71.7395 158.47 71.6791 158.547 71.619L158.504 71.6577C158.62 71.5706 158.737 71.483 158.854 71.3943C158.754 71.4678 158.657 71.5536 158.565 71.6385L158.387 71.8137C158.22 71.9766 158.083 72.0898 157.994 72.0271C156.676 73.2356 155.365 74.4789 154.041 75.728C153.796 75.9403 153.833 75.7259 153.474 76.1223C153.603 76.0553 153.729 75.9906 153.858 75.9233C153.642 76.0917 152.725 76.8937 152.6 77.0494C152.584 77.0697 152.639 77.1768 152.424 77.396C152.236 77.5874 152.144 77.5547 152.028 77.6425C151.929 77.7179 151.847 77.8256 151.818 77.8474C151.795 77.8636 151.751 77.8332 151.696 77.8723C151.524 77.9965 151.751 77.9872 151.48 78.0071C151.512 77.9673 151.545 77.9273 151.577 77.8876C151.375 78.0457 151.074 78.2231 151.316 77.9405C151.357 77.8926 151.353 77.9666 151.387 77.9346C152.739 76.635 151.587 77.5951 151.166 78.1042C150.988 78.1679 150.336 78.8464 150.302 78.8571C150.256 78.871 150.332 78.7165 150.142 78.8236C150.1 78.8485 149.21 79.7408 149.471 79.3571C149.526 79.2772 149.98 78.8814 150.087 78.7766C149.726 78.8948 149.298 79.6128 149.226 79.6713C148.941 79.9032 149.645 79.0878 149.029 79.639C148.56 80.0574 149.065 79.7336 148.919 79.9325C148.836 80.0457 148.233 80.4443 148.35 80.5448C148.181 80.7247 148.231 80.5685 148.205 80.5838C148.178 80.6022 147.86 80.9593 147.72 81.0449C147.703 81.0549 147.693 80.9563 147.674 80.9638C147.635 80.9841 147.312 81.304 147.298 81.3261C147.293 81.3376 147.422 81.3143 147.4 81.3575C147.374 81.4079 147.035 81.6988 147.029 81.7314C147.023 81.7782 147.416 81.3878 147.402 81.508C147.196 81.6706 146.933 81.9839 146.848 82.1473C146.868 82.1053 147.048 81.9361 147.115 81.8829C147.164 81.9938 146.769 82.3553 146.843 82.1643C146.79 82.2791 146.865 82.2447 146.848 82.3222C146.844 82.342 146.726 82.4533 146.716 82.4896C146.716 82.4952 146.869 82.4144 146.86 82.4543C146.843 82.5265 146.47 82.8554 146.431 82.8758C146.326 82.9302 146.602 82.6257 146.593 82.5677C146.581 82.5646 146.276 82.7216 146.262 82.7215C146.187 82.6686 146.515 82.4557 146.428 82.4258C146.347 82.4773 146.264 82.5286 146.182 82.5808C146.4 82.2706 146.926 81.8449 146.99 81.6583C146.609 82.0474 146.19 82.4262 146.048 82.2717C145.989 82.206 146.126 82.0108 146.104 81.9998C146.025 81.9633 145.842 82.2478 145.83 82.2532C145.82 82.2562 145.814 82.2562 145.811 82.2531C145.78 82.2177 146.099 81.8779 146.101 81.8471C146.103 81.793 145.846 81.8153 145.822 81.7896C145.826 81.7759 146.039 81.5315 145.918 81.5611C145.795 81.5909 145.582 81.783 145.568 81.7871C145.503 81.7969 145.852 81.4314 145.847 81.4062C145.843 81.3947 145.602 81.5254 145.582 81.5167C145.566 81.5054 145.688 81.3359 145.705 81.2372C145.718 81.1637 145.566 81.2553 145.584 81.2295C145.596 81.2123 145.948 80.8909 145.96 80.8683C145.978 80.8359 145.859 80.8711 145.861 80.8501C145.865 80.82 145.991 80.7306 145.963 80.7293C145.936 80.7312 145.377 80.9937 145.346 80.9539C145.292 80.8872 145.888 80.6062 145.229 80.7533C145.221 80.7594 145.137 80.8677 145.132 80.8688C145.026 80.8822 145.298 80.5039 144.898 80.8931C145.587 80.1151 144.907 80.7102 144.922 80.5017C144.927 80.4232 145.201 80.1392 145.205 80.1242C145.129 80.0991 145.071 80.2253 145.015 80.2304C144.984 80.2323 145.201 79.9325 145.108 79.9522C145.06 79.9621 144.783 80.2295 144.769 80.2352C144.628 80.303 144.73 80.1427 144.684 80.1411C144.653 80.14 144.483 80.2936 144.475 80.2949C144.463 80.2952 144.633 80.0196 144.659 79.9536C144.679 79.9031 144.52 79.9997 144.537 79.9695C144.646 79.7852 145.084 79.5964 144.617 79.7249C144.588 79.7333 144.473 79.8463 144.468 79.8472C144.353 79.8675 144.567 79.6648 144.573 79.5896C144.581 79.462 144.296 79.7899 144.518 79.5012C144.279 79.6424 144.178 79.7387 143.956 79.9635C144.559 79.3496 144.63 78.9721 143.929 79.6234C144.156 79.4208 144.042 79.3493 144.107 79.2862C144.15 79.2458 144.562 79.0414 144.218 78.9662C144.174 78.9575 144.007 79.1727 144.019 79.0613C144.508 78.6379 143.998 79.0166 143.991 79.0104C143.886 78.8771 145.132 77.9167 145.316 77.7187C145.53 77.4889 145.644 77.2003 145.693 77.155C145.855 77.0038 145.766 77.1794 145.82 77.1636C145.877 77.1437 146.249 76.6202 146.279 76.6007C146.389 76.5373 146.353 76.6792 146.365 76.676C146.512 76.6063 147.091 75.9764 147.278 75.8251C147.235 75.7943 146.886 76.1175 147.045 75.8526C147.232 75.544 147.402 75.6912 147.419 75.6955C148.583 74.5959 149.741 73.4868 150.898 72.3715C150.8 72.2958 150.103 73.0926 150.077 73.0953C149.907 73.1258 151.19 71.8967 151.379 71.7753C151.24 71.8714 151.103 71.9662 150.965 72.0617C151.07 71.7662 151.65 71.4617 151.903 71.1334C151.982 71.0301 151.776 71.1556 151.765 71.1577C151.835 71.0143 152.036 70.8804 151.958 71.0569C152.17 70.7554 152.188 70.8455 152.393 70.6572C152.403 70.6473 152.277 70.6896 152.421 70.5192C152.488 70.4392 152.888 70.0571 152.908 69.9695C152.916 69.9332 152.56 69.9675 152.666 70.1291C152.167 70.4785 152.586 70.3248 152.414 70.4837C152.388 70.507 152.373 70.3751 151.984 70.8178C151.933 70.6019 152.52 70.2361 152.589 70.1389C152.728 69.9391 151.948 70.5495 151.92 70.7833C151.877 70.6178 151.856 70.8167 151.692 70.9649C151.513 71.1275 151.559 71.022 151.465 71.1119C151.208 71.3573 151.387 71.3321 151.111 71.4656C151.52 71.4801 150.777 71.8397 150.557 71.9439C150.817 71.6739 151.074 71.407 151.333 71.137C151.307 71.1407 151.281 71.1442 151.255 71.1479C151.328 71.0811 151.4 71.014 151.472 70.9478C151.471 70.9693 151.47 70.9912 151.469 71.0126C151.768 70.5919 151.932 70.5839 151.964 70.5559C152.357 70.1956 152.804 69.7673 153.198 69.3935C153.257 69.3373 153.15 69.3068 153.634 68.9525C153.788 68.8397 153.708 69.0163 153.857 68.8603C153.914 68.5279 154.022 68.6496 154.081 68.5951C154.249 68.4375 154.317 68.3038 154.332 68.2889C154.497 68.1259 154.734 67.9117 154.938 67.7198L154.983 67.6792C155.028 67.6389 155.07 67.5991 155.111 67.5614C155.101 67.5622 154.966 67.6072 155.114 67.4988C155.17 67.4596 155.802 67.251 156.136 66.8264C156.021 66.9072 155.907 66.987 155.793 67.0663C155.932 66.9765 156.723 66.1525 156.47 66.2888C156.316 66.3731 156.126 66.7823 155.98 66.6928C156.297 66.4785 157.763 64.9798 157.904 64.8863C157.924 64.8744 157.863 65.0097 157.89 64.9928C157.914 64.9767 158.244 64.6353 158.304 64.6038C158.34 64.5858 158.213 64.7581 158.239 64.7597C158.264 64.755 158.701 64.3509 158.678 64.2787C158.593 64.4031 158.282 64.6789 158.396 64.4855C158.412 64.4608 158.544 64.3892 158.562 64.3587C158.727 64.0783 158.076 64.755 157.969 64.8567C158.331 64.3834 159.048 63.8057 159.483 63.2738C159.716 63.114 159.26 63.6274 159.511 63.4351C160.031 63.0343 159.575 63.2574 159.584 63.2379C159.656 63.0836 160.255 62.8925 160.087 62.7341C160.274 62.5871 160.243 62.6626 160.449 62.3992C160.408 62.4202 160.366 62.4413 160.325 62.4622C160.482 62.1021 161.255 61.7573 161.235 61.8162C161.179 61.9792 160.826 62.2051 160.802 62.2331C160.771 62.2725 160.844 62.5397 160.305 62.8069C160.261 63.0826 160.995 62.2261 160.722 62.6733C160.95 62.4101 161.989 61.4303 162.073 61.2283C162.082 61.2042 161.891 61.1852 162.184 60.9756C162.322 60.8762 162.058 61.1775 162.134 61.1448C162.384 61.0521 164.404 58.5668 164.762 58.0777C164.786 58.0469 164.815 58.0879 164.839 58.0579C164.912 57.9641 165.123 57.5787 165.271 57.4246C164.93 57.7165 165.45 57.0388 165.588 56.8715C165.799 56.619 165.854 56.6856 165.954 56.5828C166.341 56.1857 166.676 55.3806 167.075 55.1422C166.91 55.0526 167.574 54.5936 167.769 54.307C167.922 54.0837 168.035 53.6898 167.77 53.9496C168.037 53.568 168.276 53.14 168.5 52.7661C168.537 52.7049 168.531 52.8174 168.592 52.7111C168.596 52.7005 168.56 52.6581 168.61 52.5677C169.029 51.8072 168.904 52.2249 169.019 52.1047C169.083 52.037 169.126 51.9842 169.154 51.9437C168.9 52.3838 168.604 52.8886 168.52 53.0221C168.696 52.9745 169.102 52.0564 169.276 51.8241C169.283 51.8181 169.322 51.8798 169.327 51.8714C169.39 51.7807 169.72 51.173 169.579 51.2559C169.541 51.2784 169.381 51.5534 169.192 51.8793C169.232 51.7843 169.128 51.8105 169.135 51.7935C169.217 51.5888 169.551 51.1649 169.654 51.0056C169.677 50.9693 169.634 50.948 169.638 50.9419C169.733 50.7988 169.816 50.9269 169.782 50.7051C170.083 50.5185 169.514 51.222 169.638 51.2235C169.745 51.229 170.672 49.4602 170.54 49.4015C170.555 49.4021 170.584 49.3859 170.627 49.3458C170.724 49.2582 170.963 48.7575 170.982 48.6621C170.983 48.6454 170.866 48.5935 170.874 48.5754C170.895 48.5296 171.279 47.9709 171.313 47.713C171.24 47.8271 171.166 47.9408 171.092 48.0545C171.437 47.3202 171.345 47.4167 171.198 47.645C171.192 47.6571 171.182 47.6677 171.176 47.6792C171.063 47.8548 170.923 48.0828 170.91 48.086C170.875 48.0837 171.424 46.8315 171.423 47.1174C171.425 47.1575 171.111 47.7159 171.321 47.4642C171.358 47.4192 171.502 47.037 171.519 47.0214C171.636 46.916 171.345 47.7663 171.47 47.7034C171.484 47.47 171.639 47.2329 171.718 46.9966C171.754 46.8901 171.707 46.8392 171.71 46.8254C171.777 46.6268 171.794 46.7608 171.82 46.696C171.834 46.6592 171.858 46.2275 172.012 46.3747C172.374 45.0678 172.026 45.9771 171.711 46.7425C171.747 46.4859 171.947 46.0625 172.025 45.8304C172.029 45.7995 172.031 45.7675 172.034 45.7349C172.02 45.7104 171.999 45.6866 172.023 45.6038C172.03 45.5785 172.041 45.5452 172.055 45.5051C172.095 45.0772 172.131 44.6067 172.133 44.4283C172.161 44.6235 172.233 44.5658 172.225 44.4136C172.215 44.2621 172.121 44.3923 172.11 44.3634C172.103 44.3306 172.105 43.6313 172.074 43.5221C172.158 44.0339 172.222 43.9143 172.184 43.4718C172.212 43.5328 172.24 43.594 172.267 43.6563C172.217 43.3976 172.243 42.847 172.178 42.7102C172.168 42.6902 172.125 42.7815 172.12 42.7694C172.074 42.6477 172.033 42.2191 172.006 42.2065C171.985 42.1968 171.981 42.3812 171.94 42.323C171.932 42.3106 171.968 42.1217 171.899 41.9669C171.874 41.91 171.83 41.9623 171.822 41.9492C171.756 41.8354 171.873 41.8758 171.78 41.6593C171.718 41.5183 171.603 41.4384 171.534 41.2669C171.524 41.2433 171.515 41.2183 171.506 41.1914C171.514 41.219 171.523 41.2448 171.53 41.2692C171.644 41.7414 171.567 41.5382 171.456 41.3024C171.411 41.2072 171.36 41.1072 171.313 41.0305C171.282 40.9812 171.213 41.0682 171.102 40.7403C171.601 41.3142 171.1 40.5006 171.002 40.3426C170.997 40.3333 171.056 40.2956 171.01 40.2144C171.005 40.2081 170.97 40.2401 170.924 40.1686C170.471 39.5063 170.786 39.913 170.743 39.7596C170.725 39.6921 170.451 39.4187 170.388 39.3446C170.375 39.3267 170.418 39.3048 170.362 39.2369C170.262 39.1165 170.134 39.0469 170.065 38.977C170.057 38.9691 170.113 38.9147 169.968 38.7981C169.927 38.7656 169.868 38.744 169.903 38.8108C170.019 39.0254 170.422 39.3145 170.537 39.6074C170.641 39.861 170.138 39.1868 170.105 39.1678C170.117 39.1729 170.217 39.2406 170.127 39.1248C170.042 39.0144 169.782 38.9263 169.667 38.7796C169.658 38.7674 169.623 38.5857 169.631 38.5845C169.639 38.5833 169.828 38.7264 169.826 38.6805C169.824 38.6733 169.715 38.5713 169.716 38.5411C169.72 38.5024 169.858 38.2437 169.836 38.2157C169.781 38.1464 169.782 38.2327 169.742 38.1945C169.661 38.1076 169.378 37.8058 169.312 37.8865C169.364 37.9262 169.414 37.9681 169.464 38.0106C169.161 37.8174 169.264 37.9414 169.213 37.9296C169.157 37.9195 169.215 37.8513 169.116 37.7854C169.108 37.78 169.041 37.7445 168.958 37.7088C168.768 37.6218 168.517 37.5186 168.513 37.5417C168.888 37.6582 168.71 37.6934 168.726 37.7028C168.776 37.7344 168.863 37.7255 168.937 37.751C168.944 37.753 168.952 37.7566 168.958 37.7602C169.343 37.9801 168.905 37.8492 168.985 37.9213C169.011 37.9447 169.097 37.9345 169.11 37.9444C169.148 37.9768 169.113 38.0359 169.143 38.0483C169.213 38.0769 169.192 37.9557 169.197 37.9479C169.29 37.9317 169.477 38.1518 169.277 38.141C169.339 38.2282 169.422 38.133 169.458 38.2231C169.527 38.4018 169.349 38.2324 169.287 38.2117C169.086 38.1413 169.044 38.0733 168.829 37.9675C168.795 37.9512 168.758 37.934 168.718 37.916C168.565 37.8466 168.357 37.814 168.284 37.7833C168.239 37.7633 167.897 37.3699 167.747 37.6714C167.595 37.5671 167.417 37.2481 167.234 37.1818C167.074 37.1241 167.078 37.2537 167.061 37.2522C167.036 37.2493 166.849 37.1622 166.777 37.1514C166.694 37.1388 166.715 37.1954 166.587 37.1636C166.267 37.0851 166.318 36.9758 166.289 36.9561C165.962 36.7316 166.057 36.9538 165.972 36.9362C165.896 36.9164 164.855 36.4678 164.609 36.4348C164.709 36.4434 164.81 36.4521 164.91 36.4612C164.77 36.3322 164.553 36.3889 164.593 36.2595C164.488 36.4544 164.196 36.2032 164.09 36.1745C164.048 36.1634 164.039 36.1994 163.988 36.1846C163.787 36.1257 163.342 35.9561 163.228 35.9417C162.736 35.8757 163.894 36.3735 163.984 36.4162C163.798 36.3494 162.717 36.0689 163.176 36.32C163.247 36.3586 163.409 36.3062 163.453 36.3161C163.749 36.3827 163.496 36.3955 163.516 36.4106C163.55 36.4354 163.764 36.4147 163.812 36.4401C163.827 36.4486 163.697 36.4899 163.968 36.5797C163.812 36.6076 163.061 36.3075 162.954 36.2958C162.917 36.2936 163.095 36.5138 162.478 36.1656C162.481 36.1825 162.484 36.1996 162.488 36.2165C162.116 36.1145 161.743 36.0163 161.366 35.9212C161.415 35.8979 161.645 35.8861 161.376 35.8289C161.222 35.7964 161.313 35.9026 161.299 35.901C161.158 35.8731 158.723 35.2477 158.238 35.1642C158.073 35.1311 157.606 35.0965 157.571 35.0908C157.363 35.0528 156.633 34.8651 156.484 34.8462C156.391 34.8341 156.466 34.9159 156.385 34.8971C156.309 34.8796 156.4 34.832 156.378 34.825C156.194 34.7629 154.745 34.5852 154.413 34.4726C154.618 34.5231 155.682 34.5831 155.668 34.5364C155.665 34.5295 155.422 34.437 155.365 34.4505C155.288 34.3808 154.961 34.4929 154.806 34.433C154.789 34.4259 154.875 34.3451 154.591 34.2796C154.493 34.2571 154.221 34.2862 153.971 34.1628C153.59 34.1346 151.595 33.7215 151.447 33.8088C151.449 33.8148 151.717 33.8853 151.524 33.9006C151.264 33.9213 151.518 33.7681 151.221 33.7128C151.17 33.7029 150.357 33.6193 150.322 33.6275C150.062 33.6995 150.76 33.8276 150.762 33.8411C150.733 33.8675 150.139 33.8135 150.11 33.8034C150.087 33.7931 150.594 33.7151 149.999 33.6965C150.064 33.7207 150.129 33.7455 150.195 33.77C149.914 33.7686 149.899 33.6708 149.833 33.6572C149.628 33.6151 149.389 33.7329 149.072 33.519C148.989 33.4623 149.142 33.4256 149.131 33.4174C149.032 33.3425 148.878 33.4981 148.734 33.3555C148.722 33.3449 149.101 33.306 148.453 33.2394C148.497 33.2561 148.542 33.2735 148.585 33.2902C148.488 33.307 147.827 33.2588 147.743 33.2452C147.488 33.2027 147.72 33.1356 147.458 33.1224C147.613 33.2564 146.823 33.2033 146.879 33.1049C146.754 33.2244 146.1 33.0725 145.78 33.0481C145.576 33.0319 145.184 33.0641 145.113 33.0536C145.035 33.0409 145.063 32.9538 144.925 32.926C144.882 32.9181 144.477 32.9598 144.115 32.8524C144.046 32.8315 143.908 32.675 144.038 32.6429C144.261 32.5877 144.685 32.7306 144.68 32.6415C144.683 32.5467 144.101 32.5737 143.955 32.5561C143.253 32.4718 143.657 32.3874 143.645 32.3555C143.597 32.2792 143.218 32.2688 143.203 32.2621C143.139 32.2305 143.405 32.1791 143.412 32.1341C143.417 32.0748 143.057 31.9587 143.138 31.941C143.261 31.9155 143.596 32.015 143.621 32.0119C143.911 31.9651 143.518 31.8143 143.416 31.7444C143.384 31.7228 143.514 31.6932 143.488 31.6863C143.082 31.582 143.399 31.8745 143.125 31.848C142.876 31.8251 143.198 31.744 143.191 31.7386C143.177 31.7326 142.879 31.7205 142.836 31.6882C142.814 31.6703 143.578 31.5171 143.551 31.4391C143.309 31.4482 143.062 31.4583 142.818 31.4711C142.8 31.3687 143.153 31.4516 143.193 31.4425C143.267 31.4233 143.06 31.3656 143.069 31.3337C143.077 31.3128 143.323 31.2468 143.101 31.2111C143.025 31.1989 142.861 31.2655 142.603 31.1891C143.539 31.1128 142.891 31.0434 142.862 31.0065C142.838 30.9697 143.288 30.8945 142.741 30.899C142.721 30.7003 142.753 30.836 142.909 30.8043C143.103 30.766 142.66 30.6884 143.364 30.7565C143.336 30.6619 142.752 30.6552 142.73 30.6484C142.706 30.6409 142.828 30.5981 142.785 30.5818C142.263 30.395 142.621 30.4814 142.468 30.3652C142.45 30.3542 141.951 30.3094 142.332 30.294C143.035 30.2689 143.33 30.4141 143.451 30.1354C142.936 29.9962 142.294 30.1716 142.142 30.176C141.91 30.1809 142.149 30.1236 142.121 30.1076C142.115 30.1022 141.9 30.1072 141.897 30.1028C141.757 29.8869 142.822 30.0988 143.171 30.0749C143.078 30.0404 142.986 30.0062 142.896 29.9723C143.018 29.9734 143.15 29.9757 143.273 29.9778C142.67 29.8985 143.264 29.9515 143.402 29.7822C143.433 29.7448 143.054 29.8003 143.491 29.7049C143.171 29.6703 143.272 29.6373 142.97 29.6795C142.985 29.6092 143.643 29.5476 143.922 29.5239C142.981 29.4135 143.514 29.6846 142.709 29.5328C142.563 29.6166 142.939 29.6058 142.909 29.6197C142.798 29.6688 142.533 29.5825 142.213 29.761C142.163 29.7905 142.374 29.8812 142.061 29.877C142.027 29.8763 141.816 29.8034 141.813 29.7956C141.838 29.7344 142.056 29.7549 142.06 29.7298C142.071 29.7062 141.834 29.7217 141.832 29.7156C141.824 29.6395 142.03 29.6848 142 29.6612C141.927 29.6094 141.1 29.4532 142.187 29.4932C141.28 29.5848 142.08 29.5748 142.42 29.5457C142.509 29.5382 142.539 29.4924 142.663 29.4783C142.82 29.46 143.011 29.4858 143.098 29.4797C143.188 29.4729 142.676 29.3519 143.42 29.4037C143.048 29.2846 142.362 29.3877 141.997 29.316C141.222 29.1709 142.519 29.1277 142.662 29.1204C142.697 29.1169 142.581 29.0539 142.603 29.0502C142.633 29.0433 143.379 29.0877 143.441 29.0402C143.51 28.992 143.183 29.035 143.154 28.9825C143.15 28.9453 144.014 28.9099 143.543 28.8701C143.228 28.8423 142.61 28.9742 142.505 28.8208C142.991 28.8129 143.47 28.8125 143.964 28.8191C143.691 28.7499 143.439 28.6838 143.171 28.6186C143.714 28.6137 144.175 28.6983 144.704 28.641C143.466 28.3955 145.107 28.5084 145.126 28.4903C145.124 28.4746 144.667 28.3 144.579 28.2682C145.014 28.2276 146.324 28.2835 145.576 28.0474C145.706 28.0972 146.043 28.0181 146.049 28.0083C146.009 27.9215 145.276 27.9291 145.396 27.8619C145.549 27.7838 145.727 27.913 145.943 27.918C147.046 27.9464 146.789 27.4916 147.877 27.653C147.856 27.6358 147.835 27.6183 147.814 27.601C149.011 27.7311 150.202 27.8844 151.39 28.058C151.871 27.9829 153.129 28.0717 153.73 28.1783ZM147.771 80.543C147.635 80.7596 146.786 81.4866 146.755 81.5323C146.729 81.5701 147.06 81.4329 146.622 81.7402C147.036 81.6187 147.275 81.0995 147.319 81.0646C147.365 81.0298 147.356 81.1511 147.367 81.1439C147.393 81.126 147.832 80.7105 147.852 80.6838C147.864 80.6662 147.705 80.6548 147.771 80.543ZM147.497 81.6668C147.519 81.6355 148.125 81.0301 148.067 81.2068C148.025 81.3314 147.37 81.8541 147.497 81.6668ZM148.147 80.9088C148.118 80.9906 147.495 81.59 147.462 81.6061C147.218 81.723 148.086 80.9461 148.147 80.9088ZM147.161 80.9317C147.019 81.0623 146.77 81.2442 146.74 81.3631C146.88 81.2354 147.13 81.0514 147.161 80.9317ZM148.206 79.8518C147.809 80.1214 147.954 80.2324 147.848 80.3207C147.703 80.4411 147.612 80.3227 147.608 80.2622C147.556 80.4358 147.068 80.8882 146.792 81.1656C147.071 80.9609 147.519 80.6384 147.78 80.4288C147.854 80.3699 147.896 80.2759 147.959 80.2231C148.06 80.1397 148.015 80.2621 148.023 80.2576L148.023 80.2566C148.171 80.1629 148.244 79.9186 147.966 80.157C148.047 80.0547 148.127 79.9527 148.206 79.8518ZM147.647 81.1997C147.87 81.0303 148.255 80.5522 148.166 80.8249C148.122 80.9613 148.004 80.956 147.992 80.966C147.869 81.065 147.639 81.2982 147.647 81.1997ZM148.182 80.9695C148.24 80.9641 148.229 81.1164 148.119 81.1466C148.071 81.1594 148.088 81.0579 148.182 80.9695ZM147.695 80.7013C147.892 80.5741 147.457 80.9796 147.441 80.9864C147.297 81.0531 147.606 80.759 147.695 80.7013ZM147.523 79.9716C147.405 80.0168 147.184 80.3833 147.141 80.4632C147.565 80.0089 147.479 80.2614 147.589 80.2177C147.818 80.127 147.554 79.9601 147.523 79.9716ZM143.852 79.6313C144.05 79.5229 143.692 79.8799 143.666 79.8864C143.589 79.8972 143.764 79.6798 143.852 79.6313ZM148.589 79.9362C148.386 80.0287 148.129 80.3752 148.227 80.3194C148.272 80.2927 148.597 80.0036 148.589 79.9362ZM147.295 80.0828C147.508 80.0557 147.439 79.7532 147.28 79.9748C147.272 79.9852 147.285 80.0806 147.295 80.0828ZM150.239 78.8859C150.2 79.0004 149.158 79.911 148.997 80.06C149.07 79.8488 149.242 79.7973 149.434 79.6103C149.485 79.5601 149.442 79.5417 149.448 79.5363C149.537 79.45 149.503 79.5494 149.559 79.498C149.594 79.4658 150.29 78.7283 150.239 78.8859ZM149.928 78.6437C149.969 78.2383 149.309 79.2259 149.056 79.1532C149.986 78.3172 148.3 79.5545 149.167 79.2048C148.557 79.6081 149.024 79.3974 148.972 79.5049C148.915 79.6207 148.587 79.8588 148.657 79.9061L149.191 79.3824C148.893 79.4179 149.297 79.113 149.524 79.0985C149.552 79.0231 149.579 78.9477 149.605 78.8728C149.843 78.9539 149.632 78.6703 149.928 78.6437ZM148.811 79.3113C148.742 79.3454 148.2 79.887 148.462 79.7142C148.484 79.6993 148.858 79.3161 148.811 79.3113ZM148.253 79.3522C148.39 79.1801 147.939 79.5158 147.922 79.6463C147.996 79.5722 148.214 79.4006 148.253 79.3522ZM150.395 78.8663C150.368 79.0582 149.815 79.4669 150.114 79.1028C150.142 79.0688 150.319 78.9746 150.395 78.8663ZM145.252 77.6081C145.313 77.6632 144.834 78.0402 144.741 78.1522C144.81 78.0033 145.08 77.7533 145.252 77.6081ZM151.501 77.6023C151.338 77.7088 150.341 78.6481 150.308 78.7019C150.299 78.7182 150.329 78.7689 150.337 78.7647C150.396 78.7295 151.376 77.7536 151.501 77.6023ZM149.648 78.1612C149.561 78.2551 149.281 78.4559 149.277 78.5252C149.369 78.454 149.639 78.2356 149.648 78.1612ZM151.457 78.2426C151.528 78.2847 151.093 78.6403 150.999 78.7494C151.047 78.6195 151.317 78.3897 151.457 78.2426ZM149.566 78.4498C149.743 78.3707 149.646 78.2044 149.53 78.3901C149.526 78.3975 149.558 78.4518 149.566 78.4498ZM149.993 78.462C150.223 78.3392 149.989 78.2636 149.891 78.4325C149.887 78.4425 149.983 78.4677 149.993 78.462ZM150.356 77.7974C150.493 77.7708 150.467 77.5443 150.324 77.6729C150.282 77.711 150.341 77.7993 150.356 77.7974ZM152.419 77.0267C152.11 77.1409 151.629 77.9462 152.03 77.5045C152.035 77.4966 151.906 77.5191 152.077 77.3694C152.093 77.3574 152.174 77.3927 152.362 77.172C152.4 77.1266 152.427 77.0247 152.419 77.0267ZM146.064 76.1529C146.337 75.9737 145.758 76.5935 145.741 76.5933C145.725 76.5854 145.92 76.2484 146.064 76.1529ZM152.079 77.1177C152.4 76.7748 151.7 77.3416 151.834 77.3144C151.843 77.3121 152.045 77.1532 152.079 77.1177ZM152.492 76.8679C152.432 76.9048 151.906 77.3879 152.123 77.2352C152.141 77.2228 152.514 76.9006 152.492 76.8679ZM146.889 76.1457C146.791 76.237 146.654 76.3656 146.593 76.3505C146.662 76.2971 146.864 76.1158 146.889 76.1457ZM151.332 76.874C151.645 76.6932 151.359 76.7129 151.237 76.8741C151.232 76.8818 151.323 76.8785 151.332 76.874ZM152.104 76.6375C152.026 76.7213 151.769 76.9089 151.789 76.9549C151.865 76.8731 152.124 76.6839 152.104 76.6375ZM147.432 74.9525C147.688 74.8176 146.729 75.6641 146.696 75.6765C146.677 75.6844 146.663 75.6882 146.654 75.689C146.637 75.7386 146.464 75.9072 146.4 75.8813C146.457 75.835 146.598 75.696 146.619 75.6856C146.628 75.681 146.636 75.6775 146.641 75.6761C146.666 75.58 147.382 74.9802 147.432 74.9525ZM147.699 75.2631C147.453 75.5215 147.732 75.3408 147.462 75.5677C147.477 75.4608 147.512 75.4161 147.699 75.2631ZM153.779 75.7798C153.73 75.7723 153.283 76.1645 153.266 76.1892C153.107 76.4299 153.757 75.8239 153.779 75.7798ZM154.181 75.7504C154.319 75.6776 154.015 76.0281 153.879 76.0885C153.78 76.0825 154.165 75.7591 154.181 75.7504ZM147.552 74.8741C147.349 74.9758 147.907 74.4695 147.767 74.6779C147.759 74.6893 147.561 74.8692 147.552 74.8741ZM148.648 74.3396C148.747 74.2637 148.72 74.446 148.578 74.4968C148.533 74.5125 148.593 74.3823 148.648 74.3396ZM149.016 73.5553C148.863 73.8601 148.692 73.7558 148.706 73.7331C148.901 73.4377 148.838 73.6968 148.85 73.6947C148.876 73.6846 149.006 73.469 149.016 73.5553ZM159.61 70.7858C159.667 70.8016 159.744 70.963 159.524 71.0553C159.492 71.0683 159.565 70.9179 159.536 70.9247C159.519 70.9301 159.085 71.2779 159.066 71.3013C159.05 71.3246 159.125 71.3598 159.11 71.385C159.091 71.4144 158.791 71.5943 158.657 71.7118C158.635 71.7305 158.616 71.7484 158.598 71.765L158.644 71.7237C158.464 71.9013 158.476 71.9612 158.459 71.9778C158.403 72.0305 158.277 72.0858 158.163 72.1924C157.587 72.7299 156.746 73.6039 156.196 73.945C156.64 73.5955 156.987 73.1858 157.379 72.7914C157.351 72.9983 157.904 72.158 157.591 72.661C157.677 72.5577 158.137 72.1035 158.595 71.6707L158.55 71.7103C159.03 71.2767 159.503 70.8459 159.586 70.7892L159.61 70.7858ZM150.091 72.5571C150.253 72.4585 149.949 72.7694 149.846 72.8436C149.818 72.8156 150.067 72.5719 150.091 72.5571ZM150.792 72.1528C150.585 72.3446 150.717 72.3966 150.546 72.4797C150.518 72.4932 150.263 72.3644 150.558 72.2207C150.611 72.1951 150.498 72.3928 150.792 72.1528ZM150.582 71.9823C150.607 72.0433 150.597 72.1165 150.415 72.259C150.445 72.1874 150.532 72.0669 150.582 71.9823ZM151.302 71.9237C151.198 71.9132 151.017 72.1943 151.105 72.1512C151.115 72.1459 151.372 71.9324 151.302 71.9237ZM151.845 71.4042C151.931 71.3541 154.101 69.3152 152.577 70.6114C152.53 70.6517 152.628 70.6326 152.439 70.8006C152.426 70.8117 152.39 70.7864 152.351 70.8207C152.26 70.901 151.783 71.3204 151.717 71.433C151.711 71.4279 151.7 71.4278 151.683 71.4346C151.525 71.4976 151.31 71.9668 151.387 71.9218C151.488 71.8608 151.706 71.5599 151.722 71.4604C151.741 71.4586 151.781 71.4419 151.846 71.4044L151.845 71.4042ZM151.61 71.3148C151.465 71.4578 151.316 71.5791 151.166 71.6924C151.165 71.6333 151.571 71.3074 151.61 71.3148ZM153.419 69.6873C153.406 69.6316 153.138 69.9068 153.135 69.9174C153.116 69.9917 153.363 69.7709 153.419 69.6873ZM153.223 69.6373C153.221 69.595 152.932 69.8427 152.955 69.8957C153.015 69.8342 153.223 69.6703 153.223 69.6373ZM160.432 69.7934C160.402 69.8115 160.093 70.1004 160.116 70.1382C160.221 70.0626 160.618 69.6807 160.432 69.7934ZM161.419 69.1355C161.619 68.8263 160.49 69.8283 160.848 69.6299C160.874 69.6167 161.402 69.1624 161.419 69.1355ZM155 68.0513C154.887 68.1208 154.795 68.3035 154.951 68.185C155.087 68.0818 155.011 68.0471 155 68.0513ZM157.916 65.2961C157.921 65.2789 157.728 65.3549 157.69 65.3958C157.636 65.4541 157.735 65.4466 157.673 65.5068C157.467 65.7076 157.25 65.8529 157.056 66.0377C157.042 66.0524 157.205 65.9585 157.056 66.0989C157.033 66.1202 156.846 66.2062 156.671 66.3828C156.411 66.9051 155.978 67.0316 155.509 67.5514C155.544 67.547 155.964 67.2375 155.987 67.2185C156.443 66.8515 157.207 66.1427 157.648 65.7173C157.761 65.6086 157.676 65.63 157.723 65.5826C157.76 65.5449 157.77 65.6461 157.877 65.5006C157.928 65.4316 157.682 65.5514 157.713 65.4991C157.732 65.4659 157.891 65.3573 157.916 65.2961ZM155.241 67.3611C155.959 66.644 156.21 66.7254 155.462 67.2803C155.446 67.2916 155.212 67.4185 155.241 67.3611ZM163.538 67.1959C163.56 67.2427 163.305 67.4446 163.227 67.5344C163.208 67.4869 163.462 67.285 163.538 67.1959ZM156.815 66.1786C156.795 66.129 156.557 66.39 156.567 66.4459C156.619 66.3987 156.819 66.1946 156.815 66.1786ZM157.014 65.8307C156.866 65.9668 156.491 66.3117 156.805 66.1356C156.866 66.1007 156.988 65.9711 157.061 65.91C156.786 66.0559 157.083 65.8855 157.014 65.8307ZM157.284 65.7387C157.288 65.6954 157.383 65.4803 157.251 65.6151C157.19 65.6776 157.158 65.8466 157.284 65.7387ZM158.126 64.8352C158.067 64.9138 157.126 65.7447 157.378 65.6217C157.421 65.6012 158.246 64.8698 158.126 64.8352ZM157.816 65.0002C157.733 65.0341 157.639 65.2247 157.761 65.1756C157.843 65.107 157.834 64.9945 157.816 65.0002ZM165.217 65.6835C165.192 65.8097 164.956 66.0152 164.819 66.1602C164.839 66.0549 165.101 65.8081 165.217 65.6835ZM158.921 64.3919C158.798 64.4586 158.84 64.5312 158.819 64.5541C158.794 64.5797 158.192 65.0372 158.778 64.6871C158.808 64.6689 159.098 64.2955 158.921 64.3919ZM165.125 65.1528C165.079 65.1825 164.925 65.3783 164.937 65.3996C164.978 65.4594 165.311 65.0356 165.125 65.1528ZM159.199 63.664C159.191 63.6097 158.955 63.8709 158.963 63.94C159.036 63.8775 159.205 63.7083 159.199 63.664ZM166.016 64.8695C165.815 64.9966 166.351 64.419 166.223 64.6463C166.217 64.6571 166.03 64.8583 166.016 64.8695ZM160.055 62.9277C159.978 62.9799 159.454 63.5365 159.69 63.3884C159.719 63.3704 160.305 62.7635 160.055 62.9277ZM167.103 63.4415C167.196 63.4682 166.827 63.7962 166.724 63.9316C166.631 63.9044 167.001 63.5788 167.103 63.4415ZM166.958 62.9885C166.845 63.0447 166.825 63.2477 166.927 63.1951C167.001 63.1181 166.97 62.9838 166.958 62.9885ZM167.71 62.7539C167.721 62.8009 167.502 63.0409 167.436 63.1348C167.442 63.0411 167.604 62.8727 167.71 62.7539ZM167.409 62.4757C167.487 62.341 167.235 62.4735 167.196 62.684C167.25 62.6064 167.399 62.4909 167.409 62.4757ZM161.447 61.2619C161.586 61.2583 161.387 61.504 161.216 61.6296C161.177 61.6582 160.985 61.7178 161.103 61.558C161.19 61.6447 161.43 61.4489 161.447 61.2619ZM161.778 61.2434C161.773 61.3334 161.614 61.4846 161.511 61.5908C161.504 61.5377 161.711 61.3248 161.778 61.2434ZM167.446 62.3983C167.672 62.2511 167.547 62.1677 167.428 62.3146C167.386 62.3664 167.439 62.4029 167.446 62.3983ZM162 60.7677C162.396 60.223 162.538 60.557 161.875 61.1388C161.883 61.1087 161.89 61.0784 161.898 61.0484C161.188 61.7678 161.836 61.0853 161.986 60.888C162.042 60.8135 161.95 60.8362 162 60.7677ZM169.164 60.9652C169.21 60.9978 169.199 60.9832 169.122 61.0881C167.879 62.7493 168.023 62.2779 169.164 60.9652ZM162.325 60.45C162.36 60.2916 162.753 59.9361 162.626 60.1532C162.607 60.1857 162.387 60.3687 162.325 60.45ZM168.827 60.6596C168.733 60.7943 168.422 61.0865 168.516 61.1051C168.592 60.9942 168.822 60.7346 168.827 60.6596ZM163.093 59.4966C163.129 59.4764 163.095 59.593 163.064 59.6304C162.937 59.7782 162.997 59.5515 163.093 59.4966ZM163.725 58.8506C164.313 58.4979 163.414 59.3559 163.206 59.6433C163.355 59.3202 163.651 58.9874 163.187 59.3896C163.743 58.6981 163.575 59.0386 163.604 59.0167C163.638 58.9899 163.7 58.8656 163.725 58.8506ZM163.558 59.4157C163.52 59.4875 163.359 59.5924 163.375 59.521C163.395 59.4296 163.567 59.397 163.558 59.4157ZM164.277 58.4085C164.468 58.2972 164.007 59.007 163.853 59.1113C163.811 59.0882 164.251 58.426 164.277 58.4085ZM171.307 58.1419C171.405 58.152 171.013 58.6421 170.969 58.6692C170.795 58.781 171.293 58.1963 171.307 58.1419ZM171.155 58.1947C170.982 58.2968 171.546 57.5776 171.346 57.9553C171.337 57.9725 171.163 58.19 171.155 58.1947ZM171.923 56.466C171.906 56.4732 171.722 56.7067 171.756 56.7239C171.8 56.7439 171.974 56.4457 171.923 56.466ZM166.85 55.1967C166.808 55.2962 166.677 55.4371 166.603 55.5441C166.585 55.5042 166.791 55.2133 166.85 55.1967ZM167.14 54.6889C167.058 54.844 166.917 55.0027 166.812 55.1524C166.827 55.0717 167.06 54.7233 167.14 54.6889ZM173.356 54.0555C173.281 54.1409 173.106 54.4741 173.225 54.3476C173.244 54.3259 173.391 54.0636 173.356 54.0555ZM174.995 51.9523C174.888 52.259 175.067 52.1552 174.868 52.4556C174.87 52.4222 174.872 52.3889 174.874 52.3556C174.663 52.8207 174.314 53.3012 174.02 53.8046C173.946 53.9326 174.108 53.8302 173.989 53.9855C173.893 54.1105 173.734 54.2163 173.761 54.1344C173.77 54.1128 173.976 53.8687 174.051 53.7292C174.271 53.3161 174.145 53.3799 174.157 53.3553C174.17 53.3286 174.363 53.0984 174.44 52.956C174.632 52.5982 174.68 52.4157 174.995 51.9523ZM175.938 50.0339C175.95 50.0507 175.817 50.3086 175.807 50.3221C175.803 50.3257 175.799 50.3285 175.796 50.3314C175.872 50.2997 175.425 51.2062 175.589 51.0446C175.496 51.3252 175.507 50.9567 175.444 51.1715C175.423 51.2443 175.532 51.3814 175.28 51.6938L175.28 51.6947C175.207 51.7854 175.232 51.6527 175.211 51.6643C175.202 51.6687 174.968 51.9481 175.094 51.68C175.284 51.2712 175.217 51.6971 175.33 51.4829C175.344 51.4566 175.474 51.009 175.445 51.0245C175.441 51.0308 175.396 51.1569 175.379 51.1734C175.314 51.2363 175.29 51.1784 175.282 51.1872C175.26 51.2209 175.003 51.9001 174.887 51.9576C174.857 51.9718 175.345 50.9069 175.375 50.8645C175.395 50.8419 175.512 50.9132 175.538 50.8924C175.551 50.8819 175.715 50.4298 175.753 50.378C175.764 50.3634 175.773 50.3525 175.781 50.3447C175.712 50.391 175.901 50.0018 175.938 50.0339ZM174.885 51.3476C174.887 51.298 174.67 51.5488 174.647 51.6422C174.596 51.8551 174.881 51.4484 174.885 51.3476ZM175.535 50.1017C175.371 50.4624 175.651 50.1032 175.359 50.5499C175.531 50.4002 175.678 50.0708 175.535 50.1017ZM170.34 49.7098C169.998 50.1749 171.302 47.7194 170.686 49.2154C170.695 49.1351 170.705 49.0542 170.714 48.9737C170.6 49.1473 170.493 49.3745 170.532 49.4003C170.524 49.4009 170.512 49.406 170.498 49.4168C170.483 49.4292 170.4 49.6328 170.34 49.7098ZM170.898 48.1563C170.988 48.1669 170.748 48.5338 170.703 48.6046C170.684 48.5591 170.834 48.1513 170.898 48.1563ZM176.351 48.5955C176.442 48.3531 176.337 48.018 176.247 48.3257C176.238 48.3598 176.311 48.6086 176.351 48.5955ZM171.569 46.8009C171.568 46.8123 171.462 47.04 171.454 47.049C171.313 47.2093 171.61 46.5698 171.569 46.8009ZM177.179 46.2792L177.02 47.0036C176.963 47.1357 176.798 47.656 176.798 47.677C176.815 47.8456 177.064 47.1684 177.034 47.0098L177.196 46.2807C177.191 46.2717 177.187 46.2644 177.182 46.2599C177.181 46.2651 177.18 46.2718 177.179 46.2792ZM172.037 45.7996C172.038 45.798 172.039 45.7967 172.04 45.7951C172.04 45.7933 172.039 45.7908 172.04 45.7891L172.037 45.7996ZM172.261 45.3282C172.239 45.4188 172.239 45.7279 172.286 45.5937C172.306 45.5355 172.3 45.3496 172.261 45.3282ZM172.244 44.6902C172.214 44.8537 172.25 45.1585 172.3 45.016C172.312 44.9832 172.274 44.6968 172.244 44.6902ZM172.45 44.5391C172.601 43.9992 172.308 44.3018 172.337 44.3933C172.342 44.4068 172.446 44.5499 172.45 44.5391ZM172.354 43.4425C172.345 43.5269 172.289 43.5566 172.307 43.5934C172.313 43.6059 172.37 43.6027 172.389 43.6464C172.378 43.578 172.366 43.51 172.354 43.4425ZM171.945 43.1635C171.973 43.2814 172.012 43.4016 171.952 43.4501C171.954 43.3708 171.898 43.1559 171.945 43.1635ZM171.774 41.9498C171.848 42.0006 171.934 42.478 171.903 42.5979C171.814 42.5055 171.691 41.8835 171.774 41.9498ZM171.683 41.1414C171.672 41.144 171.672 41.1682 171.679 41.2022C171.694 41.2882 171.753 41.4528 171.759 41.4604C171.88 41.586 171.773 41.3255 171.706 41.1904C171.697 41.1723 171.689 41.1553 171.683 41.1414ZM171.637 41.2214C171.587 41.1109 171.49 41.0033 171.499 41.0599C171.503 41.0857 171.539 41.1741 171.575 41.2485C171.611 41.319 171.648 41.3756 171.657 41.3203C171.662 41.2919 171.653 41.2563 171.637 41.2214ZM171.474 40.6233C171.493 40.7197 171.694 41.1637 171.652 40.9569C171.648 40.9362 171.507 40.6025 171.474 40.6233ZM171.238 40.5042C171.239 40.5762 171.384 40.7056 171.379 40.5862C171.357 40.5254 171.24 40.4964 171.238 40.5042ZM171.066 40.06C171.075 39.9606 170.951 39.7729 170.938 39.8595C170.937 39.8676 171.013 40.0531 171.066 40.06ZM170.553 39.7156C170.558 39.7197 170.641 39.8511 170.642 39.8578C170.666 40.0081 170.417 39.6157 170.553 39.7156ZM170.75 39.4376C170.635 39.3298 170.811 39.6747 170.887 39.6908C170.851 39.6273 170.792 39.476 170.75 39.4376ZM170.019 38.2645C170.094 38.652 170.189 38.5052 170.21 38.525C170.252 38.5709 170.304 38.7186 170.389 38.8004C170.281 38.7162 170.171 38.6368 170.061 38.5644C170.13 38.6316 170.648 39.39 170.686 39.4031C170.748 39.3938 170.555 39.1644 170.552 39.1563C170.55 39.1426 170.638 39.0136 170.626 38.9878C170.609 38.935 170.09 38.3602 170.019 38.2645ZM168.959 38.5565C169.023 38.5307 169.118 38.6189 169.185 38.6762C169.118 38.6951 169.027 38.6051 168.959 38.5565ZM169.071 38.5539C169.051 38.5147 169.232 38.6001 169.268 38.6562C169.236 38.684 169.083 38.5774 169.071 38.5539ZM167.814 37.6796C167.807 37.5752 168.151 37.8287 168.246 37.8644C168.263 37.8697 168.306 37.8059 168.397 37.8422C168.432 37.8561 168.448 37.9373 168.459 37.9435C168.475 37.9515 168.644 38.0271 168.765 38.0941C168.837 38.1359 168.879 38.1771 168.793 38.1774C168.787 38.1775 168.766 38.1683 168.735 38.1528C168.512 38.0374 167.903 37.7256 167.814 37.6796ZM169.46 38.079C169.432 37.9715 169.721 38.2213 169.724 38.239C169.743 38.3139 169.482 38.1608 169.46 38.079ZM166.259 37.2201C166.316 37.2034 166.581 37.3298 166.637 37.369C166.647 37.3759 166.566 37.4446 166.689 37.4876C166.788 37.5221 166.681 37.3728 166.864 37.4649C167.047 37.558 166.77 37.5175 166.782 37.5285C166.802 37.5434 167.111 37.6263 167.081 37.6751C167.056 37.7095 166.756 37.5524 166.673 37.5286C166.569 37.4985 166.664 37.612 166.502 37.53C166.4 37.4786 166.503 37.3888 166.483 37.3741C166.462 37.3607 166.067 37.2785 166.26 37.2203L166.259 37.2201ZM167.626 37.715C167.618 37.7088 167.622 37.6232 167.756 37.7024C167.906 37.792 167.721 37.786 167.626 37.715ZM164.959 36.7592C165.074 36.7281 165.338 36.8736 165.484 36.9384C165.373 36.9563 165.084 36.8251 164.959 36.7592ZM164.76 36.7583C165.065 36.8974 164.82 36.8552 164.53 36.7843C164.626 36.7931 164.657 36.712 164.76 36.7583ZM164.228 36.6599C164.243 36.6528 164.122 36.3833 164.534 36.6742C164.594 36.7173 164.334 36.6905 164.356 36.7063C164.401 36.7378 164.439 36.7582 164.47 36.7703C164.25 36.7144 164.027 36.6503 164.009 36.6304C163.928 36.5374 164.221 36.6612 164.228 36.6599ZM164.043 36.4381C164.043 36.3955 164.431 36.4835 164.427 36.5868C164.348 36.5523 164.046 36.465 164.043 36.4381ZM166.272 36.8398C166.245 36.8011 165.189 36.3953 165.768 36.6845C165.807 36.7023 166.363 36.9481 166.272 36.8398ZM165.305 36.5878C165.371 36.607 165.669 36.747 165.685 36.7489C165.931 36.7736 165.472 36.5819 165.305 36.5878ZM162.439 36.0816C162.417 36.0682 162.846 35.9694 162.265 35.969C162.543 36.0756 162.235 36.0111 162.234 36.0305C162.233 36.0852 162.727 36.1752 162.826 36.2299C162.937 36.1619 162.511 36.126 162.439 36.0816ZM162.138 35.9881C161.901 35.9281 162.032 36.116 162.194 36.1004C162.204 36.0994 162.154 35.9922 162.138 35.9881ZM166.297 36.6787C166.189 36.6017 165.858 36.5411 165.94 36.6062C165.991 36.6456 166.422 36.7661 166.297 36.6787ZM161.971 35.9368C161.822 35.7596 161.38 35.9124 161.683 35.9678C161.714 35.9727 161.978 35.9452 161.971 35.9368ZM165.023 36.3955C165.026 36.3369 164.677 36.2879 164.738 36.3371C164.777 36.3681 165.021 36.4315 165.023 36.3955ZM163.556 36.1847C163.35 36.1788 163.444 36.0116 163.59 36.1246C163.596 36.1291 163.565 36.1846 163.556 36.1847ZM147.925 33.7028C147.816 33.7773 147.382 33.6736 147.574 33.6619C147.631 33.6591 147.833 33.6974 147.925 33.7028ZM148.35 33.5259C148.229 33.5881 147.953 33.5053 147.787 33.5108C147.559 33.5185 147.136 33.768 147.331 33.4972C147.678 33.5051 148.005 33.5142 148.35 33.5259ZM160.32 35.5298C160.301 35.5179 160.03 35.4616 160.03 35.4972C160.151 35.5735 160.402 35.5819 160.32 35.5298ZM165.242 36.0399C165.46 36.1224 165.678 36.2074 165.896 36.2941C165.934 36.2699 165.813 36.2429 165.74 36.199L165.741 36.1992C165.656 36.1489 165.428 36.038 165.242 36.0399ZM158.294 35.1116C158.307 35.0737 157.521 34.9084 157.455 34.9486C157.585 34.952 158.278 35.1434 158.294 35.1116ZM164.907 35.9776C164.698 35.7634 164.763 35.9661 164.972 36.0844C165.059 36.0502 164.941 36.0127 164.907 35.9776ZM164.085 35.8259C163.997 35.8454 164.356 35.988 164.384 35.9914C164.532 36.0006 164.257 35.7875 164.085 35.8259ZM153.406 34.1474C153.425 34.158 153.547 34.3592 153.253 34.2592C153.033 34.1852 153.233 34.0535 153.406 34.1474ZM149.008 33.5397C149.121 33.5898 148.768 33.6004 148.643 33.5381C148.644 33.4983 148.986 33.5315 149.008 33.5397ZM151.113 33.883C151.28 33.9694 150.693 33.88 150.902 33.8506C150.911 33.8497 151.105 33.8793 151.113 33.883ZM163.811 35.7435C163.79 35.7414 163.884 35.8878 163.976 35.8715C164.047 35.8588 163.891 35.751 163.811 35.7435ZM152.818 34.1146C152.809 34.1593 152.558 34.085 152.461 34.0766C152.493 34.0307 152.721 34.088 152.818 34.1146ZM156.148 34.6366C156.432 34.6179 155.88 34.517 155.875 34.5681C155.876 34.5875 156.136 34.6372 156.148 34.6366ZM155.365 34.4505C155.378 34.462 155.384 34.4775 155.381 34.5004C155.348 34.4685 155.347 34.4549 155.365 34.4505ZM164.725 35.8243C164.506 35.6419 164.391 35.8039 164.578 35.867C164.651 35.8919 164.757 35.8506 164.725 35.8243ZM164.128 35.6123C164.065 35.5647 163.324 35.3611 163.413 35.4642C163.445 35.5002 163.885 35.5703 163.905 35.582C163.932 35.5984 163.774 35.6313 164.003 35.688C163.999 35.6582 164.149 35.6279 164.128 35.6123ZM147.401 33.0475C147.38 33.0389 146.914 33.0104 146.963 33.0446C147.053 33.1084 147.467 33.0753 147.401 33.0475ZM148.168 33.1828C148.014 33.1632 147.715 33.112 147.802 33.185C147.818 33.1916 148.161 33.2177 148.168 33.1828ZM146.56 32.9128C146.433 32.8226 145.843 32.8385 145.984 32.9015C146.007 32.9096 146.473 32.9027 146.56 32.9128ZM147.766 33.0658C147.815 33.143 148.094 33.1128 148.253 33.1465C148.187 33.0594 147.926 33.0848 147.766 33.0658ZM148.076 33.0107C148.025 32.9336 147.75 32.9627 147.588 32.9309C147.633 32.9918 147.947 33.0056 148.076 33.0107ZM145.083 32.48C144.995 32.4979 145.316 32.5996 145.356 32.5475C145.384 32.515 145.141 32.4687 145.083 32.48ZM143.25 30.6144C143.378 30.6701 143.509 30.7264 143.643 30.7833C143.752 30.6676 143.542 30.7014 143.477 30.676C143.418 30.6526 143.38 30.581 143.25 30.6144ZM142.973 30.2253C142.993 30.2225 142.89 30.0364 143.14 30.1649C143.301 30.2506 142.395 30.3129 142.229 30.2338C142.41 30.1958 142.809 30.245 142.973 30.2253ZM141.744 29.3958C141.956 29.4474 141.433 29.5053 141.357 29.4304C141.35 29.4154 141.702 29.3855 141.744 29.3958ZM142.801 29.4224C142.81 29.4563 142.526 29.4612 142.493 29.4561C142.323 29.4188 142.701 29.3996 142.801 29.4224ZM141.704 29.2366C141.866 29.27 141.518 29.2985 141.39 29.2823C141.383 29.2478 141.68 29.2312 141.704 29.2366ZM142.37 28.7023C141.945 28.8096 142.344 28.7807 142.262 28.8241C142.195 28.8584 141.955 28.8305 142.094 28.9C141.899 28.8207 141.049 28.8627 141.015 28.8562L141.016 28.8554C140.994 28.8492 141.038 28.6754 141.199 28.6938C141.717 28.7572 141.342 28.8572 142.37 28.7023ZM142.464 28.6367C142.392 28.6827 141.588 28.7145 141.606 28.6564C141.621 28.6012 142.339 28.634 142.464 28.6367ZM144.417 28.2562C144.422 28.288 144.045 28.2808 144.031 28.277C143.843 28.2297 144.283 28.2305 144.417 28.2562ZM167.814 31.7075C167.794 31.7403 168.192 31.9212 168.257 31.8771C168.176 31.8478 167.831 31.6887 167.814 31.7075ZM145.08 27.8479C145.257 27.8273 145.219 27.97 145.525 27.928C145.021 27.9873 145.477 27.9773 145.488 28.0301C145.526 28.244 144.844 27.8931 144.592 27.9264C144.557 27.9307 144.811 28.0103 144.721 28.0252C144.46 28.0659 143.773 27.794 144.235 27.7896L144.507 27.8056C144.754 27.8318 144.603 27.8766 144.61 27.8797C145.132 27.9839 144.996 27.8578 145.08 27.8479ZM145.496 27.7665C145.518 27.7736 145.181 27.9019 145.097 27.7913C145.031 27.706 145.435 27.7482 145.496 27.7665ZM162.835 30.2362C162.938 30.2414 162.56 30.0826 162.545 30.1415C162.544 30.1607 162.819 30.2347 162.835 30.2362ZM144.421 27.1621C144.607 27.2346 143.973 27.1941 144.192 27.1478C144.201 27.1459 144.413 27.1592 144.421 27.1621ZM159.564 29.3933C159.45 29.4476 160.176 29.6289 159.999 29.5232C159.959 29.4993 159.656 29.4138 159.564 29.3933ZM158.717 29.0896C158.858 29.0456 159.401 29.2506 159.296 29.2585C159.272 29.259 158.665 29.1181 158.717 29.0896Z",
                fill: "var(--blue)"
            }), C.jsx("path", {
                d: "M149.392 63.6337C149.452 63.6211 149.762 63.2682 149.513 63.7875C149.602 63.3119 149.456 63.7008 149.421 63.886C149.412 63.9332 149.45 63.9609 149.441 64.0295C149.429 64.1177 149.372 64.2058 149.364 64.2508C149.356 64.2974 149.553 64.0812 149.382 64.4403C149.554 64.2891 149.575 63.9152 149.715 63.7563C149.999 63.4356 149.788 64.0829 149.777 64.154C149.774 64.1726 149.854 64.1358 149.853 64.1488C149.85 64.1707 149.688 64.5192 149.72 64.5741C149.754 64.6277 149.769 64.4419 149.822 64.4495C149.858 64.4547 149.752 64.912 149.864 64.6851C149.942 64.5288 149.922 64.1782 150.085 64.1824C150.006 64.4253 149.927 64.67 149.848 64.9128C149.953 64.8032 150.057 64.6934 150.161 64.5834C150.077 64.8584 149.927 65.0652 149.908 65.3497C150.315 64.8058 149.973 65.6001 149.99 65.6192C150.002 65.6271 150.236 65.4402 150.277 65.4112C150.25 65.6465 150.03 66.3041 150.35 65.9924C150.284 66.0457 150.317 66.247 150.326 66.2506C150.412 66.2592 150.5 65.8766 150.548 65.9625C150.603 66.0621 150.456 66.1165 150.425 66.2252C150.264 66.7848 150.724 66.7918 150.453 67.3094C150.472 67.3042 150.49 67.2995 150.509 67.2942C150.26 67.8776 150.011 68.4602 149.763 69.0403C149.798 69.3211 149.639 69.9621 149.509 70.261C149.482 70.3218 149.306 70.5922 149.285 70.6111C149.248 70.6442 149.326 70.4132 149.246 70.5003C149.23 70.5169 149.008 71.0159 149.092 71.0052C149.121 70.9515 149.155 70.7605 149.182 70.7375C149.375 70.5806 148.687 72.1033 148.706 72.1949C148.741 72.169 148.777 72.144 148.812 72.1184C148.765 72.2106 148.715 72.3071 148.666 72.4013C148.662 72.3538 148.658 72.3056 148.654 72.258C148.597 72.3671 148.553 72.5255 148.495 72.623C148.485 72.6378 148.446 72.573 148.428 72.6117C148.41 72.6512 148.49 72.6737 148.476 72.7356C148.459 72.8048 148.29 73.0875 148.252 73.1933C148.108 73.5854 148 74.0033 147.82 74.3789C147.915 73.9563 147.704 74.3352 147.684 74.4627C147.68 74.4897 147.825 74.5437 147.635 74.9345C147.515 75.1816 147.398 74.8664 147.337 75.3393C147.608 75.06 147.473 75.3863 147.38 75.6452C147.365 75.6874 147.204 76.0471 147.151 76.2068C147.132 76.2622 147.177 76.3733 147.152 76.446C147.134 76.4972 147.078 76.5203 147.052 76.5957C146.931 76.944 146.804 77.2891 146.663 77.6239C146.543 77.3517 146.521 77.7517 146.505 77.7666C146.421 77.8291 146.546 77.4493 146.459 77.5827C146.386 77.7961 146.315 78.0016 146.245 78.208C146.333 78.0458 146.324 78.4979 146.234 78.5442C146.345 78.5623 146.142 78.8785 145.964 79.1637C146.2 79.1109 146.475 79.1161 146.735 79.0704C146.81 79.0572 146.709 78.9849 146.812 78.9914C146.893 78.9969 147 79.0622 146.958 79.0879C146.947 79.0944 146.775 79.0695 146.695 79.0891C146.458 79.147 146.531 79.2106 146.518 79.215C146.502 79.2196 146.342 79.195 146.259 79.212C146.112 79.2427 146.022 79.2818 145.879 79.3C145.842 79.3613 145.81 79.4182 145.786 79.4664C145.872 79.4548 145.941 79.4443 145.959 79.4298C145.975 79.4167 145.898 79.3563 145.914 79.3448C146.023 79.2778 146.361 79.3506 146.505 79.3287C146.667 79.3042 146.636 79.2454 146.645 79.2434C146.716 79.2345 146.668 79.2874 146.71 79.2801C146.773 79.2687 147.232 79.198 147.253 79.1855C147.258 79.1805 147.174 79.1224 147.27 79.0921C147.286 79.0869 147.291 79.1736 147.577 79.0878C147.92 78.9848 147.315 79.0223 147.446 78.9087C147.693 78.9976 147.664 78.873 147.727 78.8727C147.749 78.8738 147.925 78.9535 148.098 78.9186C147.976 78.9562 147.852 78.9945 147.734 79.0319C147.855 79.0311 148.094 78.9682 148.197 78.9733C148.247 78.9762 148.222 79.0701 148.327 79.0506C148.35 79.0438 148.403 78.818 148.141 78.9588C148.106 78.8859 148.248 78.9139 148.306 78.8823C148.314 78.8749 148.331 78.7439 148.421 78.8102C148.443 78.827 148.3 79.2321 148.78 78.879C148.795 78.8675 148.73 78.8305 148.745 78.8183C148.755 78.8102 148.894 78.8067 148.908 78.7978C148.923 78.7883 148.849 78.748 148.866 78.735C148.952 78.6684 149.107 78.8515 148.911 78.8664C148.979 78.8812 149.048 78.8966 149.116 78.9117C149.024 78.7699 149.212 78.8533 149.3 78.8351C149.861 78.7192 149.467 78.6767 149.557 78.6106C149.7 78.5047 149.619 78.7843 149.845 78.6706C149.863 78.6599 149.566 78.5906 150.13 78.572C150.048 78.5881 149.967 78.604 149.885 78.6204C149.955 78.7612 150.181 78.5676 150.199 78.5629C150.413 78.5116 150.273 78.5856 150.585 78.4639C150.613 78.4532 150.682 78.4801 150.741 78.4533C150.99 78.3422 150.392 78.4554 150.372 78.3976C150.359 78.3694 151 78.2874 151.026 78.2983C151.128 78.3473 150.74 78.3656 150.823 78.4322C150.854 78.4547 151.759 78.2765 151.947 78.2843C152.161 78.2926 152.28 78.4822 152.255 78.2564C152.343 78.4704 152.378 78.3129 152.405 78.3111C152.737 78.2916 152.738 78.2937 153.013 78.2401C153.076 78.2282 153.137 78.2891 153.158 78.2752C153.169 78.2662 153.137 78.197 153.198 78.1677C153.285 78.1266 153.811 78.1449 153.857 78.1807C153.899 78.2164 153.639 78.2215 153.691 78.2818C153.876 78.2685 154.063 78.2327 154.252 78.2205C154.331 78.2156 154.295 78.2655 154.329 78.263C154.345 78.2616 154.607 78.1956 154.597 78.1795C154.566 78.1417 153.729 78.2542 153.941 78.1512C153.983 78.1311 154.146 78.2211 154.109 78.0949C154.862 78.0467 155.621 78.008 156.383 77.9809C155.951 78.1098 155.456 78.0649 155.006 78.1157C154.944 78.1224 154.732 78.1296 154.764 78.1923C155.149 78.1723 155.631 78.0956 156.001 78.1091C156.013 78.1095 155.974 78.1716 156.02 78.1772C156.107 78.1873 156.371 78.0728 156.418 78.094C156.426 78.0992 156.278 78.1879 156.328 78.2334C156.458 78.3504 156.468 78.0691 156.571 78.065C156.65 78.0618 157.203 78.1599 157.328 78.0674C157.464 77.9678 156.931 78.0392 156.964 77.9632C157.321 77.8646 157.704 77.9228 158.05 77.8964C158.056 77.8959 158 77.8397 158.078 77.8277C158.214 77.8071 158.253 77.888 158.319 77.8982C158.39 77.9089 158.639 77.8875 158.676 77.9163C158.678 77.9238 158.633 78.0019 158.625 78.0063C158.514 78.0443 158.474 77.9414 158.463 77.939C158.426 77.9366 158.391 77.9791 158.357 77.9781C158.301 77.9766 158.269 77.9402 158.194 77.9403C158.143 77.9406 158.196 78.01 158.146 78.009C158.127 78.0068 157.921 77.8539 157.913 78.0227C157.914 78.0713 159.511 78.0768 159.668 78.0367C159.533 78.0193 159.396 78.0027 159.256 77.9864C159.538 78.0274 159.869 77.8863 159.898 78.0857C160.932 78.0847 161.981 78.1122 163.044 78.1914C163.237 78.2205 163.123 78.3412 163.438 78.3257C163.357 78.2789 163.283 78.2332 163.204 78.1872C163.357 78.2233 164.078 78.3382 164.197 78.3265C164.212 78.3247 164.248 78.211 164.43 78.2209C164.442 78.2216 164.453 78.2226 164.464 78.2241L164.536 78.2343C164.663 78.2567 164.68 78.3349 164.756 78.3617C164.824 78.3858 164.909 78.3763 164.929 78.3844C164.945 78.391 164.943 78.444 164.981 78.4595C165.101 78.5078 165.024 78.3439 165.121 78.5342C165.089 78.5357 165.058 78.537 165.027 78.5387C165.174 78.5874 165.368 78.7 165.139 78.7C165.1 78.7002 165.14 78.6551 165.112 78.6504C164.016 78.4919 164.866 78.717 165.274 78.7079C165.36 78.7976 165.943 78.8665 165.961 78.8882C165.981 78.9152 165.872 78.9535 165.989 79.0328C166.02 79.0458 166.787 79.1965 166.488 79.2248C166.425 79.2287 166.066 79.1194 165.977 79.104C166.147 79.3046 166.685 79.2056 166.74 79.2279C166.952 79.3122 166.286 79.2489 166.77 79.4014C167.139 79.5227 166.82 79.317 166.976 79.3144C167.067 79.3124 167.447 79.5577 167.483 79.4089C167.631 79.4404 167.522 79.4899 167.538 79.5013C167.556 79.5116 167.845 79.5625 167.921 79.6243C167.931 79.6318 167.871 79.695 167.879 79.7058C167.898 79.7239 168.163 79.8037 168.175 79.8014C168.183 79.7992 168.146 79.7108 168.177 79.7039C168.214 79.6962 168.453 79.8041 168.476 79.7922C168.506 79.7709 168.194 79.6739 168.272 79.6197C168.407 79.6907 168.654 79.7309 168.768 79.7085C168.739 79.7162 168.603 79.6656 168.558 79.6418C168.622 79.5427 168.913 79.6591 168.78 79.7044C168.86 79.684 168.827 79.6426 168.879 79.614C168.894 79.6071 168.982 79.6395 169.008 79.6287C169.011 79.6258 168.937 79.5493 168.964 79.535C169.012 79.5087 169.278 79.6264 169.296 79.6462C169.346 79.7006 169.113 79.6459 169.076 79.6836C169.073 79.6908 169.215 79.8481 169.22 79.8617C169.196 79.949 169.016 79.8059 169.009 79.8907C169.053 79.9269 169.097 79.9631 169.141 79.9999C168.917 79.9952 168.564 79.8109 168.435 79.8621C168.741 79.9495 169.044 80.0773 168.963 80.2708C168.928 80.3524 168.786 80.351 168.782 80.3736C168.771 80.4554 168.973 80.4441 168.978 80.4511C168.982 80.4577 168.983 80.463 168.981 80.4673C168.962 80.5101 168.708 80.443 168.686 80.4577C168.651 80.4848 168.701 80.6747 168.687 80.7068C168.681 80.7115 168.495 80.6765 168.53 80.7558C168.565 80.8355 168.711 80.8979 168.717 80.907C168.732 80.9524 168.458 80.8773 168.442 80.8945C168.434 80.9029 168.549 81.0221 168.546 81.0419C168.542 81.0612 168.419 81.057 168.355 81.0975C168.307 81.1275 168.384 81.1957 168.365 81.196C168.349 81.194 168.111 81.0992 168.092 81.1008C168.07 81.1047 168.107 81.1768 168.095 81.1871C168.076 81.2006 168.003 81.1517 168.006 81.1745C168.011 81.1938 168.245 81.4859 168.224 81.5319C168.19 81.61 167.941 81.2998 168.114 81.7315C168.115 81.7343 168.193 81.7413 168.197 81.7442C168.218 81.8197 167.953 81.8152 168.241 81.9138C167.678 81.8033 168.127 82.0063 167.996 82.1086C167.947 82.1477 167.74 82.0904 167.733 82.097C167.728 82.1701 167.81 82.1445 167.82 82.1853C167.823 82.2074 167.618 82.207 167.641 82.2676C167.654 82.2989 167.845 82.3652 167.851 82.3729C167.908 82.4449 167.799 82.4544 167.803 82.491C167.807 82.5151 167.915 82.561 167.92 82.5672C167.921 82.5763 167.735 82.5962 167.692 82.6123C167.659 82.6247 167.736 82.696 167.715 82.6988C167.59 82.715 167.434 82.4846 167.56 82.7718C167.568 82.7893 167.648 82.8158 167.649 82.8191C167.674 82.8964 167.528 82.8439 167.484 82.8817C167.407 82.9467 167.63 82.9818 167.437 82.9724C167.544 83.0766 167.616 83.1038 167.772 83.15C167.339 83.0231 167.113 83.181 167.57 83.3572C167.426 83.2956 167.395 83.4223 167.351 83.4076C167.324 83.3979 167.162 83.1964 167.152 83.5027C167.152 83.5409 167.293 83.548 167.227 83.6011C166.933 83.4656 167.204 83.6422 167.2 83.6513C167.131 83.8031 166.458 83.4012 166.331 83.3838C166.183 83.3572 166.019 83.4449 165.988 83.4369C165.889 83.4062 165.99 83.3661 165.976 83.3353C165.957 83.3041 165.641 83.3462 165.631 83.3368C165.585 83.294 165.661 83.2316 165.657 83.2261C165.602 83.1578 165.208 83.1224 165.105 83.0823C165.097 83.1338 165.308 83.1875 165.157 83.2385C164.982 83.2987 165.022 83.0724 165.02 83.0614C164.669 82.9871 164.301 82.9271 163.908 82.8722C163.529 82.8315 163.137 82.8014 162.74 82.7793C162.748 82.9013 163.276 82.8457 163.287 82.864C163.35 82.9618 162.469 82.901 162.353 82.8564C162.435 82.8865 162.52 82.9178 162.601 82.9486C162.451 83.0814 162.145 82.8843 161.933 82.9402C161.867 82.9584 161.992 83.0172 161.989 83.0209C161.914 83.0731 161.794 83.0266 161.886 82.9558C161.702 83.0207 161.729 82.9446 161.586 82.9355C161.579 82.9351 161.637 82.993 161.527 83.0143C161.476 83.0239 161.192 83.0203 161.155 83.0699C161.138 83.0912 161.28 83.3121 161.3 83.1227C161.603 83.2202 161.399 83.0379 161.516 83.0443C161.535 83.0459 161.487 83.1497 161.789 83.1078C161.726 83.2969 161.391 83.1472 161.33 83.1699C161.211 83.2154 161.702 83.3224 161.799 83.1775C161.752 83.325 161.835 83.1978 161.943 83.2074C162.061 83.2181 162.009 83.2616 162.074 83.2641C162.253 83.2721 162.184 83.1638 162.324 83.2649C162.194 82.9648 162.581 83.237 162.684 83.321C162.503 83.3256 162.313 83.3317 162.128 83.3395C162.138 83.3553 162.148 83.3709 162.158 83.3867C162.109 83.3826 162.06 83.3787 162.01 83.3748C162.018 83.3603 162.027 83.3457 162.035 83.3313C161.781 83.4185 161.721 83.311 161.7 83.3085C161.433 83.2891 161.122 83.2857 160.848 83.2847C160.807 83.2847 160.832 83.3803 160.536 83.306C160.44 83.2825 160.53 83.2063 160.421 83.2182C160.285 83.4225 160.285 83.2619 160.246 83.2616C160.132 83.263 160.061 83.3139 160.05 83.3146C159.906 83.3247 159.695 83.3212 159.538 83.3329C159.538 83.3363 159.617 83.3933 159.516 83.378C159.479 83.3723 159.148 83.1153 158.863 83.2138C158.939 83.2288 159.014 83.2438 159.088 83.2592C159 83.2362 158.394 83.3293 158.545 83.3943C158.638 83.4336 158.853 83.253 158.885 83.4168C158.684 83.3721 157.561 83.507 157.472 83.4769C157.46 83.4722 157.529 83.4145 157.514 83.4081C157.501 83.4035 157.244 83.4326 157.207 83.4145C157.188 83.4035 157.298 83.3636 157.288 83.3449C157.28 83.3314 156.95 83.3309 156.94 83.3993C157.014 83.3669 157.243 83.3744 157.128 83.439C157.114 83.4469 157.033 83.4104 157.015 83.4196C156.851 83.5136 157.358 83.4582 157.435 83.4544C157.123 83.5599 156.625 83.4955 156.261 83.5817C156.109 83.5381 156.472 83.4785 156.302 83.4458C155.947 83.3787 156.216 83.5308 156.206 83.5388C156.126 83.6019 155.801 83.3261 155.82 83.5557C155.688 83.5327 155.729 83.4992 155.553 83.5454C155.578 83.5592 155.603 83.5737 155.628 83.5875C155.446 83.7371 154.985 83.4447 155.016 83.4157C155.093 83.3389 155.327 83.4239 155.345 83.4197C155.372 83.413 155.43 83.1729 155.748 83.354C155.857 83.1867 155.261 83.292 155.525 83.1608C155.34 83.1941 154.562 83.1616 154.454 83.2427C154.442 83.2531 154.52 83.4021 154.32 83.3437C154.227 83.3157 154.444 83.29 154.4 83.259C154.265 83.1591 152.536 83.4329 152.208 83.4864C152.187 83.4887 152.188 83.4404 152.167 83.4436C152.1 83.4539 151.879 83.5556 151.761 83.5493C152.011 83.6059 151.55 83.6757 151.428 83.683C151.245 83.6934 151.244 83.6074 151.165 83.6003C150.863 83.5726 150.419 83.8419 150.166 83.6892C150.207 83.8728 149.752 83.6594 149.559 83.6881C149.412 83.7098 149.22 83.8668 149.429 83.9103C149.176 83.9416 148.913 84.0199 148.673 84.0711C148.635 84.0795 148.679 84.0153 148.613 84.0313C148.607 84.0332 148.608 84.0888 148.552 84.1039C148.087 84.2297 148.297 84.0774 148.203 84.0584C148.15 84.0481 148.111 84.0454 148.083 84.0469C148.362 83.9885 148.671 83.9161 148.761 83.8998C148.665 83.7935 148.153 84.0236 147.985 84.02C147.979 84.0197 147.987 83.9517 147.981 83.9522C147.919 83.9575 147.544 84.0475 147.636 84.1117C147.661 84.1284 147.836 84.098 148.043 84.0555C147.989 84.0797 148.042 84.145 148.033 84.1499C147.917 84.2067 147.612 84.1863 147.508 84.1948C147.484 84.1968 147.493 84.241 147.49 84.2445C147.394 84.2504 147.408 84.1102 147.336 84.2653C147.135 84.1289 147.651 84.1838 147.598 84.0822C147.56 84.0016 146.465 84.2438 146.496 84.3747C146.49 84.3615 146.471 84.3472 146.437 84.3331C146.361 84.3015 146.057 84.3714 146.008 84.4057C146 84.4128 146.028 84.5391 146.017 84.5424C145.986 84.5507 145.6 84.521 145.476 84.6225C145.554 84.626 145.632 84.6299 145.709 84.6336C145.26 84.7205 145.335 84.7457 145.493 84.7546C145.501 84.7535 145.51 84.7561 145.517 84.7553C145.639 84.761 145.792 84.7608 145.796 84.7704C145.81 84.8068 145.051 84.974 145.175 84.8283C145.195 84.8081 145.557 84.792 145.366 84.742C145.331 84.7339 145.109 84.8015 145.094 84.7952C145.001 84.749 145.486 84.5701 145.408 84.4945C145.303 84.6007 145.139 84.5872 145.003 84.636C144.941 84.6581 144.937 84.7241 144.929 84.7275C144.815 84.7672 144.868 84.688 144.829 84.6973C144.807 84.7046 144.61 84.8879 144.614 84.6851C143.888 84.9796 144.437 84.8691 144.892 84.7683C144.761 84.8678 144.47 84.8897 144.344 84.9322C144.299 84.9475 144.339 85.0077 144.264 85.0365C144.205 85.0585 144.06 85.0838 143.888 85.1084L143.714 85.137C143.345 85.1716 142.796 85.1698 142.519 85.1417C142.76 85.1245 142.693 85.0513 142.507 85.0499C142.309 85.0443 142.469 85.1501 142.43 85.1586C142.408 85.1598 142.172 85.1523 141.772 85.0539C141.394 84.9879 140.662 84.5918 140.446 84.3647C140.93 84.77 141.214 84.8305 141.362 84.8844C141.518 84.9301 141.564 84.9277 141.545 84.9105C141.504 84.8368 141.181 84.885 140.39 84.1506C140.625 84.3637 140.858 84.4971 141.069 84.5895C140.866 84.4862 140.568 84.2929 140.29 83.9425C140.008 83.5969 139.832 83.1258 139.784 82.7931C139.696 82.1145 139.806 81.8965 139.792 81.7857C139.791 81.7515 139.715 81.8622 139.714 81.8458C139.714 81.697 139.779 81.4743 139.8 81.4213C139.827 81.3024 139.847 81.2342 139.842 81.2223C139.83 81.1911 139.725 81.446 139.721 81.3411C139.721 81.3087 139.855 81.0912 139.878 80.9394C139.889 80.8759 139.824 80.8965 139.824 80.8807C139.83 80.7633 139.901 80.8584 139.948 80.6507C139.977 80.5178 139.925 80.3703 140.01 80.2127C139.7 80.7796 139.914 80.2757 139.96 80.0262C139.968 79.9842 139.858 79.9819 139.983 79.7738C140 80.3108 140.124 79.6662 140.171 79.5417C140.175 79.5357 140.24 79.5553 140.262 79.4954C140.262 79.4902 140.217 79.4815 140.233 79.4238C140.392 78.8723 140.32 79.236 140.4 79.149C140.432 79.114 140.466 78.8235 140.487 78.7603C140.492 78.7445 140.535 78.7679 140.555 78.7066C140.591 78.5972 140.58 78.4789 140.603 78.4036C140.606 78.3952 140.676 78.4217 140.702 78.2795C140.709 78.2394 140.7 78.1874 140.659 78.2335C140.529 78.3816 140.519 78.7735 140.378 78.956C140.25 79.1207 140.453 78.5344 140.466 78.4982C140.47 78.4868 140.463 78.6155 140.513 78.4995C140.557 78.3948 140.496 78.1798 140.578 78.0382C140.584 78.0279 140.73 77.9474 140.737 77.9529C140.739 77.9602 140.695 78.1523 140.736 78.1365C140.741 78.1308 140.782 78.0182 140.81 78.0106C140.845 78.0016 141.134 78.0495 141.149 78.0289C141.188 77.9742 141.111 77.9911 141.13 77.9529C141.17 77.8722 141.362 77.5957 141.273 77.55C141.249 77.5992 141.224 77.6485 141.2 77.6969C141.295 77.4097 141.21 77.518 141.207 77.4717C141.203 77.4232 141.282 77.4653 141.323 77.3759C141.331 77.3589 141.462 76.955 141.424 76.9517C141.398 77.1887 141.326 77.0721 141.321 77.0811C141.3 77.1171 141.339 77.1865 141.319 77.2369C141.179 77.5881 141.221 77.1996 141.167 77.2729C141.149 77.299 141.176 77.3746 141.169 77.3858C141.146 77.4218 141.082 77.3991 141.077 77.4271C141.067 77.4918 141.183 77.4548 141.187 77.4607C141.224 77.5337 141.07 77.7344 141.024 77.5592C140.958 77.6293 141.073 77.6822 141.001 77.7297C140.86 77.8237 140.955 77.6403 140.959 77.5809C140.974 77.3648 141.036 77.3378 141.12 77.0632C141.151 76.9639 141.135 76.8286 141.148 76.7849C141.158 76.7565 141.453 76.5698 141.143 76.4443C141.213 76.3509 141.479 76.2697 141.508 76.1624C141.534 76.0665 141.414 76.054 141.411 76.0437C141.409 76.0278 141.461 75.9166 141.46 75.8714C141.459 75.8187 141.407 75.8254 141.417 75.7463C141.441 75.5514 141.553 75.6004 141.567 75.5845C141.731 75.4063 141.537 75.437 141.54 75.3858C141.546 75.3356 141.837 74.747 141.846 74.5999C141.849 74.6614 141.852 74.7228 141.855 74.7839C141.961 74.7164 141.884 74.5722 142.012 74.6182C141.815 74.5206 142.024 74.3788 142.041 74.3194C142.047 74.2958 142.012 74.2842 142.021 74.2551C142.057 74.1415 142.181 73.8961 142.187 73.8271C142.211 73.5345 141.827 74.1656 141.8 74.2134C141.841 74.1108 142.026 73.4856 141.822 73.7267C141.791 73.7643 141.853 73.8761 141.848 73.9016C141.81 74.0734 141.776 73.9143 141.763 73.9242C141.743 73.9414 141.781 74.0782 141.761 74.1026C141.753 74.1073 141.701 74.025 141.643 74.1754C141.599 74.0742 141.825 73.6555 141.829 73.5943C141.83 73.5716 141.628 73.6405 141.918 73.3265C141.902 73.3254 141.886 73.3242 141.87 73.3231C141.943 73.1137 142.016 72.9012 142.088 72.6945C142.112 72.7295 142.135 72.8702 142.176 72.7199C142.199 72.6347 142.108 72.6649 142.104 72.6585C142.114 72.5731 142.647 71.2447 142.738 70.9821C142.769 70.8916 142.803 70.6261 142.809 70.6058C142.845 70.4928 143.036 70.1091 143.058 70.0255C143.071 69.9748 142.992 69.9976 143.012 69.9551C143.03 69.9159 143.073 69.9792 143.08 69.9697C143.139 69.8799 143.356 69.0803 143.48 68.9214C143.421 69.0261 143.328 69.6239 143.373 69.6312C143.38 69.631 143.477 69.5134 143.466 69.4765C143.535 69.4493 143.439 69.2309 143.502 69.158C143.51 69.1499 143.583 69.2213 143.657 69.075C143.683 69.0244 143.667 68.86 143.797 68.7496C143.838 68.5327 144.355 67.5188 144.289 67.4112C144.284 67.4072 144.194 67.5435 144.194 67.4283C144.194 67.2753 144.321 67.4613 144.396 67.311C144.407 67.2884 144.556 66.8461 144.551 66.8289C144.503 66.6612 144.319 67.0235 144.31 67.0153C144.287 66.9905 144.388 66.6756 144.401 66.6597C144.412 66.6503 144.443 66.9549 144.512 66.6284C144.483 66.6578 144.454 66.6875 144.426 66.7169C144.451 66.5607 144.545 66.5805 144.564 66.5474C144.623 66.4447 144.533 66.2748 144.767 66.1627C144.829 66.133 144.849 66.2293 144.858 66.226C144.94 66.1925 144.807 66.0619 144.958 66.0238C144.969 66.0209 144.966 66.2418 145.096 65.9027C145.075 65.9217 145.055 65.9406 145.035 65.9596C145.027 65.9019 145.144 65.5533 145.168 65.5078C145.237 65.3786 145.275 65.5276 145.317 65.3873C145.171 65.4315 145.314 65.0138 145.401 65.0742C145.302 64.9704 145.53 64.6537 145.596 64.4895C145.637 64.3863 145.666 64.1535 145.684 64.1227C145.708 64.0859 145.786 64.129 145.832 64.0633C145.845 64.0424 145.868 63.8028 146.025 63.6464C146.056 63.616 146.225 63.5928 146.234 63.6745C146.25 63.8141 146.052 63.9934 146.137 64.0221C146.227 64.052 146.288 63.7333 146.33 63.6575C146.525 63.3066 146.538 63.5566 146.57 63.558C146.649 63.5592 146.724 63.3564 146.734 63.3499C146.775 63.3253 146.775 63.4905 146.817 63.5088C146.872 63.5314 147.045 63.3748 147.047 63.4255C147.049 63.4994 146.897 63.6484 146.896 63.6613C146.894 63.8294 147.098 63.6755 147.183 63.6429C147.208 63.6333 147.214 63.7119 147.225 63.7008C147.393 63.5182 147.064 63.5873 147.136 63.451C147.2 63.3301 147.221 63.5224 147.228 63.5224C147.235 63.518 147.298 63.3664 147.337 63.3533C147.356 63.3473 147.368 63.8065 147.447 63.8188C147.479 63.686 147.512 63.5527 147.544 63.4197C147.643 63.446 147.504 63.6018 147.507 63.6244C147.512 63.6696 147.6 63.5828 147.628 63.5985C147.646 63.6083 147.668 63.7584 147.739 63.657C147.763 63.6222 147.727 63.5154 147.849 63.4012C147.75 63.9232 147.933 63.6045 147.972 63.6029C148.011 63.6036 148.002 63.8644 148.096 63.5764C148.285 63.6344 148.152 63.6052 148.153 63.6978C148.156 63.8118 148.304 63.6075 148.12 63.9506C148.215 63.9628 148.319 63.671 148.332 63.658C148.344 63.6472 148.361 63.727 148.384 63.7105C148.655 63.5032 148.508 63.6595 148.645 63.622C148.657 63.6187 148.795 63.3775 148.737 63.5787C148.63 63.9449 148.449 64.048 148.69 64.2078C148.904 63.9878 148.856 63.6051 148.883 63.5232C148.926 63.3991 148.932 63.5461 148.953 63.5367C148.96 63.5314 148.993 63.4311 148.999 63.4263C149.228 63.4276 148.825 63.8965 148.794 64.0824C148.841 64.0479 148.889 64.0133 148.936 63.9788C148.914 64.0417 148.891 64.1051 148.869 64.168C149.042 63.893 148.896 64.1663 149.03 64.3024C149.06 64.3306 149.072 64.1143 149.088 64.3745C149.174 64.2191 149.187 64.2842 149.198 64.1177C149.262 64.1467 149.208 64.5092 149.191 64.6541C149.442 64.2159 149.102 64.3909 149.382 64.0352C149.33 63.9297 149.272 64.1278 149.264 64.1071C149.238 64.0322 149.365 63.9289 149.258 63.7059C149.239 63.6702 149.113 63.7467 149.179 63.5862C149.187 63.568 149.299 63.4932 149.303 63.4966C149.354 63.532 149.295 63.625 149.316 63.6389C149.337 63.6514 149.367 63.5321 149.374 63.5341C149.446 63.5576 149.365 63.6394 149.392 63.6337ZM141.371 84.7592C141.786 84.9268 141.927 84.9338 142.013 84.9544C142.092 84.9683 142.096 84.965 142.072 84.9546C142.028 84.9352 141.848 84.8721 141.946 84.8622C141.785 84.8511 141.608 84.8305 141.371 84.7592ZM143.142 84.9654C143.116 84.9587 142.837 85.0099 142.825 85.0383C143.006 85.0679 143.274 85.0029 143.142 84.9654ZM142.665 84.8311C142.046 84.6378 142.364 84.9525 142.49 84.9356C142.512 84.9337 142.679 84.8362 142.665 84.8311ZM141.285 84.5565C141.641 84.734 142.038 84.8494 142.006 84.7588L142.005 84.7586C141.812 84.7295 141.586 84.6859 141.285 84.5565ZM143.626 84.9092C143.577 84.8992 143.431 84.9316 143.417 84.972C143.501 84.9833 143.738 84.9336 143.626 84.9092ZM140.486 84.0013C140.733 84.2798 140.781 84.3649 140.909 84.4386C140.952 84.4597 140.99 84.4214 141.131 84.4835C140.928 84.377 140.704 84.2275 140.486 84.0013ZM145.132 84.8366C145.26 84.8781 144.855 84.9396 144.975 84.86C144.981 84.8562 145.125 84.8348 145.132 84.8366ZM139.492 82.779C139.558 83.268 139.952 83.914 140.054 84.112C139.918 83.9455 139.683 83.5655 139.586 83.2617C139.481 82.9556 139.467 82.7552 139.492 82.779ZM146.1 84.6688C146.09 84.7091 145.852 84.801 145.83 84.743C145.796 84.6626 146.052 84.6699 146.1 84.6688ZM146.703 84.3699C147.037 84.4039 145.489 84.65 146.36 84.3548C146.323 84.3906 146.286 84.4266 146.249 84.4624C146.367 84.4634 146.504 84.4281 146.499 84.3821C146.502 84.3887 146.509 84.3952 146.52 84.4011C146.53 84.4069 146.648 84.3638 146.703 84.3699ZM150.283 83.883C150.248 83.9233 150.023 83.9677 149.975 83.9287C150.067 83.8927 150.185 83.8994 150.283 83.883ZM150.514 83.7899C150.506 83.8295 150.312 83.8601 150.282 83.8256C150.336 83.7938 150.441 83.8034 150.514 83.7899ZM144.908 82.3985C144.864 82.3672 144.868 82.4034 144.888 82.4123C144.886 82.418 144.882 82.4253 144.881 82.436C144.885 82.4385 144.934 82.4687 144.931 82.5186C144.933 82.5474 144.933 82.454 144.919 82.4082C144.842 82.3431 144.875 82.4507 144.917 82.4019L144.917 82.4C144.914 82.3991 144.911 82.3992 144.908 82.3985ZM153.426 83.5446C153.253 83.6602 153.009 83.6756 153.349 83.7323C152.87 83.8088 153.058 83.6941 153.039 83.6887C153.014 83.6833 152.944 83.723 152.928 83.7152C152.548 83.5313 153.24 83.5956 153.426 83.5446ZM152.96 83.4446C152.969 83.4918 152.554 83.6248 152.536 83.6166C152.417 83.5533 152.854 83.4069 152.96 83.4446ZM153.484 83.6543C153.588 83.6432 153.487 83.7572 153.427 83.7265C153.405 83.7149 153.458 83.6572 153.484 83.6543ZM144.908 82.3985C144.864 82.3672 144.868 82.4034 144.888 82.4123C144.893 82.3983 144.899 82.3968 144.908 82.3985ZM139.783 80.8557C139.8 80.9246 139.742 81.077 139.657 81.3955C139.637 81.438 139.605 81.5111 139.581 81.5468C139.564 81.5093 139.568 81.4257 139.575 81.3799C139.609 81.1821 139.658 81.0372 139.695 80.9557C139.735 80.8651 139.77 80.8228 139.783 80.8557ZM154.085 83.6109C154.018 83.6971 153.723 83.6646 153.853 83.604C153.873 83.595 154.031 83.6245 154.085 83.6109ZM153.196 83.449C153.237 83.427 153.342 83.4695 153.311 83.5072C153.272 83.5556 153.185 83.4552 153.196 83.449ZM154.471 83.4933C155.024 83.4847 154.512 83.5114 154.378 83.5441C154.328 83.5564 154.376 83.6064 154.332 83.6191C153.98 83.7196 154.025 83.388 154.511 83.4461C154.498 83.4618 154.485 83.4776 154.471 83.4933ZM154.963 83.5607C154.989 83.5675 155.091 83.6606 154.987 83.6909C154.979 83.5692 154.81 83.5387 154.74 83.659C154.679 83.5643 154.848 83.5303 154.963 83.5607ZM144.925 82.0208C144.925 82.0262 144.924 82.0314 144.924 82.0364C144.924 82.0314 144.925 82.0263 144.925 82.0208ZM154.822 83.381C154.808 83.4244 154.646 83.4302 154.589 83.4402C154.622 83.3805 154.742 83.3845 154.822 83.381ZM156.209 83.3565C156.187 83.3505 155.737 83.3849 155.9 83.4384C155.952 83.454 156.359 83.4111 156.209 83.3565ZM156.707 83.4524C156.655 83.4487 156.525 83.4568 156.513 83.4929C156.498 83.5383 156.687 83.5086 156.707 83.4524ZM157.627 83.3602C157.57 83.3561 157.537 83.4461 157.547 83.4528C157.593 83.483 157.695 83.4059 157.627 83.3602ZM157.94 83.2868C157.916 83.2738 157.319 83.2591 157.362 83.3651C157.41 83.3483 158.089 83.3645 157.94 83.2868ZM158.019 83.2632C158.003 83.2928 157.892 83.3876 157.992 83.3757C158.038 83.37 158.107 83.2675 158.019 83.2632ZM158.353 83.2868C158.316 83.2719 158.217 83.2872 158.168 83.2841C158.334 83.3589 158.149 83.2879 158.162 83.375C158.27 83.3724 158.545 83.3637 158.353 83.2868ZM157.03 83.0338C157.01 83.0265 156.767 83.1011 156.873 83.1509C156.947 83.1856 156.953 83.1039 156.97 83.1025C156.991 83.1021 157.4 83.1722 157.03 83.0338ZM140.176 80.2874C140.138 80.265 140.045 80.4974 140.044 80.5143C140.07 80.6802 140.15 80.3723 140.176 80.2874ZM159.057 83.0173C158.741 82.9943 158.182 83.0163 157.857 83.035C157.773 83.0397 157.816 83.0805 157.78 83.0845C157.752 83.0873 157.781 83.0054 157.685 83.0412C157.641 83.0585 157.787 83.1345 157.756 83.1528C157.736 83.1638 157.631 83.1392 157.601 83.1676C157.594 83.1779 157.703 83.2492 157.732 83.244C157.774 83.2366 157.73 83.1772 157.776 83.1736C157.931 83.1632 158.069 83.2003 158.212 83.192C158.224 83.1911 158.121 83.152 158.233 83.1469C158.251 83.1462 158.359 83.2072 158.491 83.1914C158.771 82.9736 159.002 83.1644 159.367 83.0795C159.346 83.0604 159.075 83.0184 159.057 83.0173ZM159.295 83.3155C159.305 83.3171 159.448 83.3748 159.416 83.3992C158.879 83.4686 158.803 83.2412 159.295 83.3155ZM158.556 83.2132C158.518 83.2143 158.366 83.2331 158.363 83.2478C158.355 83.2983 158.542 83.2618 158.556 83.2132ZM140.083 80.1477C140.056 80.1803 139.974 80.4151 140.049 80.3668C140.125 80.3162 140.12 80.1062 140.083 80.1477ZM140.332 79.9418C140.285 79.9873 140.169 80.3058 140.262 80.1871C140.271 80.1728 140.368 79.9515 140.332 79.9418ZM159.776 82.9733C159.69 82.9581 159.709 83.0377 159.715 83.04C159.78 83.0639 159.876 82.9906 159.776 82.9733ZM161.112 83.09C161.07 83.0926 160.938 83.0677 160.925 83.091C160.911 83.1223 161.102 83.1437 161.112 83.09ZM165.696 83.7429C165.695 83.7596 165.504 83.8227 165.442 83.7761C165.321 83.6854 165.693 83.7288 165.696 83.7429ZM140.234 79.752C140.188 79.7855 140.213 79.9244 140.285 79.8714C140.307 79.8326 140.24 79.7483 140.234 79.752ZM164.681 83.5361C164.576 83.4346 165.123 83.5903 165.131 83.61C165.138 83.6189 165.142 83.6264 165.144 83.6326C165.169 83.6133 165.273 83.6342 165.269 83.6973C165.24 83.6846 165.155 83.6698 165.147 83.6609C165.144 83.6572 165.141 83.654 165.14 83.6508C165.092 83.6924 164.705 83.5538 164.681 83.5361ZM162.852 83.2025C162.816 83.2311 162.739 83.253 162.691 83.2766C162.705 83.216 162.74 83.1726 162.852 83.2025ZM163.879 83.429C163.86 83.4323 163.85 83.429 163.845 83.4238L163.879 83.429ZM163.843 83.4097C163.842 83.4161 163.841 83.42 163.845 83.4238L163.803 83.4194C163.814 83.418 163.827 83.414 163.843 83.4097ZM164.624 83.4987C164.71 83.5809 164.374 83.5032 164.494 83.4689C164.501 83.4674 164.62 83.4946 164.624 83.4987ZM163.862 83.3622C163.865 83.3859 163.862 83.4056 163.857 83.4069C163.853 83.4084 163.848 83.4085 163.843 83.4097C163.845 83.3958 163.853 83.3769 163.862 83.3622ZM161.055 82.95C161.089 82.9092 160.921 82.8968 160.87 82.9185C160.855 82.9681 161.049 82.9556 161.055 82.95ZM163.862 83.3622C163.861 83.3545 163.858 83.3467 163.856 83.3385C163.867 83.3367 163.875 83.3343 163.877 83.3368C163.878 83.3387 163.871 83.3491 163.862 83.3622ZM163.825 83.2893C163.841 83.3019 163.85 83.3197 163.856 83.3385C163.82 83.3448 163.753 83.3626 163.778 83.3108L163.817 83.292C163.82 83.291 163.822 83.2902 163.825 83.2893ZM163.256 83.2042C163.254 83.2428 163.084 83.2336 163.068 83.2267C162.978 83.1789 163.197 83.1809 163.256 83.2042ZM162.391 83.0657C162.369 83.1072 162.116 83.0511 162.102 83.0184C162.206 83.0197 162.299 83.0391 162.391 83.0657ZM162.897 82.9555C162.911 82.9663 162.942 83.2373 162.792 83.1271C162.766 83.1072 162.878 83.0501 162.69 83.0088C162.831 83.0218 162.811 82.8919 162.897 82.9555ZM163.825 83.2893C163.824 83.2882 163.823 83.2859 163.822 83.2849L163.837 83.2863C163.833 83.2871 163.829 83.288 163.825 83.2893ZM143.029 79.9677C143.011 79.9806 143 79.9943 142.994 80.0079C143 80.0096 143.006 80.0107 143.012 80.0126C143.034 80.009 143.065 80.0027 143.1 79.9935C143.074 79.984 143.05 79.976 143.029 79.9677ZM162.406 82.7479C162.349 82.7189 162.163 82.7774 162.119 82.8363C162.112 82.8244 162.092 82.8084 162.054 82.7888L162.054 82.7879C162.004 82.7555 160.488 82.707 161.506 82.8382C161.537 82.842 161.496 82.7875 161.623 82.7998C161.632 82.8007 161.635 82.8454 161.662 82.8482C161.727 82.8541 162.039 82.891 162.11 82.8586C162.11 82.8668 162.114 82.8748 162.123 82.8823C162.201 82.9486 162.446 82.7708 162.406 82.7479ZM142.824 79.886C142.837 79.9201 142.85 79.9524 142.864 79.9712C142.876 79.9747 142.89 79.9805 142.906 79.9846C142.947 79.9815 142.969 79.9673 142.981 79.9467C142.927 79.9236 142.89 79.9039 142.865 79.8785L142.824 79.886ZM166.278 83.4982C166.302 83.4194 166.559 83.5601 166.633 83.5674C166.54 83.5997 166.377 83.5422 166.278 83.4982ZM142.79 79.8501C142.792 79.8522 142.794 79.8558 142.798 79.8573C142.801 79.8575 142.816 79.8349 142.819 79.8091C142.807 79.8244 142.797 79.8376 142.79 79.8501ZM140.457 79.308C140.45 79.3108 140.374 79.4332 140.406 79.4681C140.479 79.434 140.528 79.2828 140.457 79.308ZM162.59 82.7869C162.585 82.7831 162.415 82.751 162.436 82.8068C162.467 82.888 162.636 82.8191 162.59 82.7869ZM165.322 83.1679C165.381 83.1823 165.463 83.204 165.465 83.259C165.428 83.2407 165.311 83.2052 165.322 83.1679ZM164.953 83.1124C164.9 83.1712 164.874 83.1743 164.768 83.1365C164.933 83.1496 164.797 83.0598 164.953 83.1124ZM164.142 83.0455C164.083 83.0231 164.172 82.9225 164.229 82.9926C164.247 83.0151 164.175 83.0574 164.142 83.0455ZM167.583 83.4126C167.499 83.3202 167.745 83.3984 167.753 83.4159C167.766 83.469 167.62 83.4532 167.583 83.4126ZM140.639 79.0375C140.647 78.9213 140.501 79.1632 140.542 79.2164C140.564 79.171 140.636 79.079 140.639 79.0375ZM140.308 79.0075C140.308 79.0128 140.266 79.1182 140.263 79.1211C140.168 79.1944 140.294 78.8792 140.308 79.0075ZM141.184 78.1805C140.881 78.3308 141.059 78.3656 141.051 78.3854C141.033 78.428 140.941 78.4981 140.92 78.5865C140.93 78.4814 140.936 78.388 140.945 78.2861C140.903 78.3498 140.594 78.9549 140.625 78.982C140.669 79.0169 140.724 78.8143 140.73 78.8104C140.74 78.8046 140.891 78.8246 140.903 78.8083C140.923 78.7791 141.117 78.256 141.184 78.1805ZM147.258 79.3917C147.244 79.3889 147.086 79.4262 147.098 79.459C147.161 79.4688 147.352 79.4118 147.258 79.3917ZM148.709 79.1081C148.698 79.062 148.522 79.1117 148.55 79.1381C148.56 79.1469 148.717 79.1456 148.709 79.1081ZM141.135 77.7037C141.223 77.6637 141.094 77.9425 141.084 77.9477C141.022 77.9801 141.062 77.738 141.135 77.7037ZM140.573 77.4575C140.605 77.4304 140.574 77.6202 140.536 77.6653C140.498 77.6468 140.552 77.4773 140.573 77.4575ZM140.543 77.3492C140.582 77.4066 140.522 77.5187 140.49 77.596C140.451 77.5399 140.51 77.429 140.543 77.3492ZM149.473 78.6433C149.582 78.7105 149.097 78.736 149.311 78.649C149.32 78.645 149.468 78.6401 149.473 78.6433ZM149.714 78.4796C149.826 78.54 149.415 78.5379 149.391 78.5606C149.354 78.4797 149.682 78.465 149.714 78.4796ZM151.597 78.702C151.526 78.7216 151.338 78.7272 151.312 78.7738C151.395 78.7537 151.632 78.7831 151.597 78.702ZM141.148 76.4885C141.244 76.4933 141.077 76.6959 141.065 76.7544C141.063 76.7648 141.132 76.7979 141.118 76.8544L141.104 76.8671C141.081 76.8776 141.039 76.882 141.037 76.8874C141.028 76.9069 140.912 77.2948 140.885 77.1211C140.881 77.0907 141.113 76.5585 141.148 76.4885ZM152.497 78.6008C152.348 78.5381 152.374 78.6853 152.477 78.6707C152.512 78.6652 152.502 78.6038 152.497 78.6008ZM152.701 78.5846C152.652 78.5988 152.549 78.5716 152.539 78.5745C152.46 78.6112 152.614 78.7009 152.701 78.5846ZM151.328 78.2704C152.428 78.0577 152.207 78.2748 151.268 78.3216C151.26 78.2659 151.26 78.2839 151.328 78.2704ZM152.986 78.4258C152.929 78.4259 152.899 78.5414 152.906 78.5458C152.973 78.5872 153.048 78.4621 152.986 78.4258ZM146.753 77.2682C146.718 77.2514 146.616 77.4478 146.669 77.4915C146.682 77.4508 146.773 77.2809 146.753 77.2682ZM167.405 80.4965C167.35 80.3461 167.178 80.5715 167.342 80.5699C167.351 80.5676 167.406 80.5035 167.405 80.4965ZM141.079 76.3603C141.084 76.3559 141.164 76.3665 141.116 76.448C141.061 76.5401 141.03 76.4179 141.079 76.3603ZM152.748 78.1017C152.714 78.1623 152.586 78.1607 152.5 78.1666C152.512 78.126 152.688 78.1188 152.748 78.1017ZM167.433 80.1917C167.332 80.0631 167.283 80.3651 167.295 80.3818C167.346 80.449 167.607 80.4145 167.663 80.4037C167.313 80.3284 167.48 80.2528 167.433 80.1917ZM166.779 80.1734C166.65 80.1686 166.941 80.3194 167.023 80.2582C166.963 80.2432 166.817 80.1747 166.779 80.1734ZM153.323 78.0575C153.355 78.1424 153.082 78.1061 152.99 78.128C152.959 78.0436 153.234 78.0786 153.323 78.0575ZM154.589 78.2821C154.589 78.2112 154.308 78.2793 154.426 78.3263C154.456 78.3379 154.586 78.3059 154.589 78.2821ZM167.337 79.8124C167.25 79.7879 167.147 79.8615 167.323 79.9317C167.245 79.927 167.166 79.9221 167.088 79.9184C167.335 80.0733 167.371 79.8964 167.446 79.9288C167.551 79.9754 167.493 80.1147 167.457 80.1519C167.574 80.094 167.942 80.2223 168.155 80.2854C167.987 80.18 167.708 80.0092 167.527 79.9225C167.475 79.8974 167.41 79.9182 167.366 79.8987C167.294 79.8671 167.378 79.8325 167.373 79.8288L167.337 79.8124ZM168.288 80.2198C168.183 80.1788 168.031 80.0847 167.95 80.1266C168.056 80.1657 168.206 80.2602 168.288 80.2198ZM166.059 79.8793C165.994 79.8523 165.8 79.7818 165.756 79.8211C165.831 79.8282 166.019 79.9197 166.059 79.8793ZM141.203 75.6542C141.213 75.6383 141.228 75.4035 141.313 75.5307C141.337 75.5675 141.26 75.7221 141.232 75.7554C141.227 75.7608 141.148 75.6999 141.127 75.7759C141.11 75.8367 141.235 75.7834 141.177 75.8923C141.12 76.0019 141.112 75.8235 141.104 75.8316C141.092 75.8432 141.066 76.0363 141.016 76.0108C140.979 75.9915 141.076 75.8117 141.086 75.7607C141.098 75.6958 141.005 75.7455 141.057 75.6487C141.09 75.5875 141.192 75.6656 141.203 75.6542ZM153.944 77.9017C154.074 77.9534 153.644 77.9819 153.776 77.9125C153.783 77.9092 153.937 77.8993 153.944 77.9017ZM167.671 79.7223C167.658 79.7225 167.681 79.8548 167.599 79.8653C167.761 79.8477 168.359 80.1141 168.393 80.1153C168.42 80.1146 168.282 79.93 168.543 80.1068C168.404 79.8473 168.036 79.9442 168.006 79.9287C167.977 79.9123 168.055 79.8529 168.048 79.8482C168.033 79.8369 167.694 79.7232 167.671 79.7223ZM165.358 79.515C165.302 79.4285 165.19 79.5934 165.3 79.6189C165.333 79.626 165.363 79.5258 165.358 79.515ZM166.95 79.7985C166.937 79.7895 166.619 79.7234 166.629 79.7641C166.666 79.7962 167.111 79.9012 166.95 79.7985ZM166.169 79.4141C166.151 79.1814 166.043 79.5171 165.947 79.3069C165.706 79.5251 166.452 79.4242 166.476 79.6686C165.752 79.4544 166.9 80.0121 166.477 79.5512C166.867 79.7841 166.628 79.5486 166.705 79.5248C166.787 79.5001 167.011 79.6172 167.022 79.5349L166.578 79.4263C166.674 79.6371 166.391 79.5046 166.322 79.3388C166.271 79.3633 166.22 79.389 166.169 79.4141ZM154.897 77.8214C154.853 77.8827 154.656 77.8768 154.562 77.8847C154.616 77.8124 154.789 77.8305 154.897 77.8214ZM167.712 79.8362C167.596 79.7528 167.928 79.8667 167.935 79.8763C168.003 79.9527 167.764 79.873 167.712 79.8362ZM156.05 77.9259C156.042 77.9743 155.863 77.9458 155.801 77.9579C155.808 77.9102 155.983 77.938 156.05 77.9259ZM165.826 79.3705C165.691 79.2724 165.718 79.4985 165.839 79.4673C165.846 79.465 165.833 79.375 165.826 79.3705ZM167.37 79.6336C167.344 79.6132 167.093 79.5248 167.055 79.5706C167.157 79.6747 167.425 79.6783 167.37 79.6336ZM158.281 78.0999C158.211 78.0869 157.906 78.1067 158.027 78.1469C158.048 78.1527 158.277 78.1428 158.281 78.0999ZM157.79 77.991C157.771 77.984 157.394 77.9675 157.375 77.9758C157.183 78.0707 158.013 78.0833 157.79 77.991ZM141.849 75.4094C141.818 75.4362 141.767 75.6932 141.832 75.626C141.888 75.5679 141.899 75.3676 141.849 75.4094ZM141.674 75.5881C141.703 75.5765 141.949 74.9623 141.751 75.2896C141.738 75.3114 141.585 75.6316 141.674 75.5881ZM167.697 79.3962C167.792 79.3545 167.812 79.4506 167.821 79.4548C167.907 79.4958 168.096 79.5468 168.033 79.5958C167.886 79.5133 167.507 79.4787 167.697 79.3962ZM164.379 78.9768C164.301 78.9619 164.189 78.9323 164.177 78.9686C164.223 78.9687 164.316 78.9956 164.376 79.0001L164.427 79.0069C164.457 79.01 164.481 79.0073 164.486 78.9923C164.472 78.9917 164.452 78.9875 164.431 78.9827L164.379 78.9768ZM167.754 79.3644C167.813 79.3404 168.31 79.5009 168.324 79.519C168.441 79.6457 167.793 79.3894 167.754 79.3644ZM167.958 79.2614C168.045 79.2242 168.5 79.4563 168.356 79.4577C168.335 79.4569 167.835 79.3133 167.958 79.2614ZM142.139 75.4251C142.167 75.4519 142.176 75.3809 142.208 75.3409L142.24 75.2934C142.275 75.2341 142.312 75.1436 142.294 75.0567C142.242 75.1792 142.192 75.2989 142.139 75.4251ZM159.888 77.8491C160.342 77.8395 161.057 77.7854 161.423 77.9262C161.094 77.8674 160.78 77.9234 160.461 77.9428C160.556 77.8101 159.981 78.0481 160.317 77.893C160.163 77.923 158.841 77.9823 158.732 77.9615L158.721 77.949C158.702 77.8994 158.724 77.7267 158.852 77.802C158.871 77.8131 158.786 77.879 158.801 77.893C158.811 77.9006 159.118 77.9237 159.131 77.9179C159.147 77.9111 159.126 77.8357 159.141 77.8266C159.159 77.8164 159.354 77.877 159.453 77.8753C159.639 77.8719 159.657 77.8088 159.673 77.8082C159.718 77.807 159.796 77.8507 159.888 77.8491ZM165.995 78.9192C166.072 78.872 166.906 79.1338 167.035 79.1793C166.888 79.2446 166.813 79.1408 166.65 79.1024C166.607 79.0928 166.607 79.1358 166.602 79.1366C166.526 79.1187 166.595 79.0851 166.549 79.0721C166.519 79.0606 165.889 78.9752 165.995 78.9192ZM167.785 79.303C167.77 79.2604 167.868 79.1832 167.91 79.254C167.928 79.2846 167.86 79.3274 167.785 79.303ZM165.897 78.9189C165.854 78.8897 165.015 78.7716 164.903 78.7814C165.004 78.8291 165.825 78.9832 165.869 78.9799C165.882 78.9771 165.901 78.9222 165.897 78.9189ZM141.782 75.0119C141.772 75.0499 141.679 75.2176 141.679 75.2282C141.688 75.3815 141.809 75.1138 141.782 75.0119ZM164.414 78.6621C164.285 78.6602 164.331 78.6879 164.409 78.7097L164.468 78.7178C164.554 78.7446 164.68 78.7653 164.651 78.7221C164.647 78.7169 164.503 78.6705 164.475 78.6694L164.414 78.6621ZM165.938 78.8115C166.055 78.7116 166.461 78.8907 166.157 78.8817C166.128 78.8799 166.023 78.8029 165.938 78.8115ZM141.576 74.7699C141.619 74.8472 141.515 74.9886 141.473 75.0731C141.442 74.9985 141.528 74.8393 141.576 74.7699ZM164.428 78.5436C164.354 78.5283 164.156 78.497 164.147 78.5284C164.173 78.5398 164.335 78.5647 164.424 78.5718L164.487 78.5795C164.547 78.5859 164.578 78.583 164.52 78.5588C164.518 78.5578 164.507 78.5551 164.492 78.5515L164.428 78.5436ZM163.546 78.4303C163.718 78.3792 163.194 78.3279 163.168 78.3437C163.182 78.3837 163.523 78.4339 163.546 78.4303ZM164.685 78.4507C164.678 78.451 164.733 78.5336 164.602 78.5052C164.594 78.5033 164.587 78.4533 164.508 78.4324L164.441 78.4232C164.416 78.4174 164.384 78.4152 164.343 78.4181C164.308 78.4209 164.248 78.4703 164.252 78.4742C164.293 78.5118 164.36 78.5269 164.429 78.53L164.494 78.5389C164.697 78.5534 164.948 78.4575 164.685 78.4507ZM141.953 74.6962C141.928 74.7156 141.896 74.8582 141.93 74.8656C141.986 74.877 141.993 74.666 141.953 74.6962ZM142.314 74.8591C142.494 74.7638 142.309 74.7715 142.22 74.8824C142.263 74.9419 142.284 74.875 142.314 74.8591ZM163 78.0759C162.912 78.0273 163.193 78.001 163.27 78.0571C163.306 78.1322 163.011 78.0812 163 78.0759ZM165.682 78.4236C165.592 78.4679 165.379 78.4099 165.255 78.3997C165.254 78.3186 165.588 78.4189 165.682 78.4236ZM141.505 74.4942C141.507 74.5541 141.588 74.5865 141.555 74.6441C141.458 74.8148 141.469 74.6666 141.505 74.4942ZM142.44 74.7708C142.59 74.6637 142.425 74.5669 142.384 74.6723C142.367 74.7143 142.418 74.7859 142.44 74.7708ZM141.6 74.1925C141.68 74.1585 141.591 74.3175 141.593 74.3228C141.597 74.3349 141.847 74.2989 141.611 74.5143C141.576 74.5459 141.574 74.3861 141.561 74.3971C141.536 74.4206 141.521 74.4409 141.512 74.4588C141.543 74.3271 141.582 74.2002 141.6 74.1925ZM142.373 74.3762C142.345 74.3195 142.244 74.5179 142.245 74.5325C142.252 74.6201 142.426 74.488 142.373 74.3762ZM141.786 74.2458C141.826 74.2542 141.781 74.4801 141.682 74.462C141.707 74.4161 141.76 74.2425 141.786 74.2458ZM142.657 74.0285C142.625 74.0422 142.595 74.3005 142.587 74.3092C142.573 74.3221 142.528 74.2207 142.495 74.3505C142.523 74.3528 142.568 74.4512 142.58 74.4406C142.618 74.4102 142.747 73.9925 142.657 74.0285ZM142.425 74.2231C142.424 74.2108 142.295 74.243 142.318 74.3016C142.337 74.3474 142.425 74.2709 142.425 74.2231ZM147.66 74.6083C147.642 74.6035 147.588 74.7414 147.588 74.7495C147.59 74.8059 147.717 74.6296 147.66 74.6083ZM142.032 73.2036C141.979 73.1913 141.925 73.478 141.881 73.5283C141.954 73.6087 141.957 73.3554 141.995 73.3195C142.007 73.3086 142.129 73.591 142.092 73.2336C142.008 73.3844 142.05 73.2092 142.032 73.2036ZM142.066 73.1516C142.11 73.0166 141.937 73.0616 141.962 73.1652C141.965 73.1714 142.063 73.1604 142.066 73.1516ZM142.105 73.0588C142.267 73.0015 142.097 72.706 142.06 72.877C142.057 72.8948 142.097 73.0582 142.105 73.0588ZM148.257 73.125C148.202 73.0503 148.046 73.4069 148.143 73.3347C148.164 73.3187 148.239 73.171 148.257 73.125ZM142.445 71.9766C142.375 72.0325 142.375 72.1806 142.422 72.1431C142.433 72.1318 142.478 71.9857 142.445 71.9766ZM148.536 72.7331C148.579 72.821 148.391 73.0685 148.381 73.0097C148.381 72.994 148.509 72.6965 148.536 72.7331ZM142.946 70.5724C142.94 70.6472 142.757 71.0103 142.788 71.0284C142.823 71.045 142.983 70.6193 142.946 70.5724ZM143.337 69.7433C143.319 69.7397 143.267 69.8732 143.266 69.8834C143.277 70.0528 143.386 69.7598 143.337 69.7433ZM143.466 69.4765C143.455 69.4809 143.439 69.4806 143.417 69.473C143.449 69.4619 143.463 69.465 143.466 69.4765ZM143.742 68.3114C143.824 68.2072 143.939 68.356 143.84 68.4292C143.829 68.4373 143.631 68.4521 143.742 68.3114ZM143.963 67.9097C144.005 67.941 143.935 68.056 143.904 68.1041C143.862 68.0859 143.949 67.9632 143.963 67.9097ZM144.289 67.0912C144.289 67.0969 144.247 67.197 144.243 67.2016C144.147 67.271 144.277 66.9658 144.289 67.0912ZM144.793 65.9176C144.831 65.9307 144.764 66.1136 144.755 66.1212C144.696 66.1692 144.72 65.9695 144.793 65.9176ZM145.336 65.5749C145.257 65.5794 145.254 65.7433 145.206 65.8208C145.295 65.8107 145.299 65.6592 145.336 65.5749ZM144.911 65.4506C144.93 65.3187 144.741 65.0123 144.976 65.2027C144.929 65.3878 144.881 65.5741 144.835 65.7591C144.789 65.6736 144.897 65.5455 144.911 65.4506ZM145.219 65.558C145.211 65.5615 145.147 65.7494 145.18 65.7626C145.215 65.6839 145.298 65.532 145.219 65.558ZM145.484 65.5176C145.422 65.5217 145.373 65.6943 145.354 65.7645C145.432 65.7594 145.436 65.5951 145.484 65.5176ZM144.792 65.2852C144.789 65.3156 144.728 65.4193 144.713 65.4686C144.655 65.3838 144.803 65.1757 144.792 65.2852ZM145.449 65.1398C145.377 65.1707 145.36 65.4079 145.394 65.3804C145.404 65.3722 145.486 65.1244 145.449 65.1398ZM150.654 65.8335C150.743 65.8283 150.649 66.0201 150.624 66.0434C150.613 66.0464 150.539 65.8403 150.654 65.8335ZM150.486 65.5628C150.481 65.4007 150.95 65.0861 150.722 65.5288C150.662 65.6448 150.641 65.5514 150.638 65.5564C150.467 65.7864 150.605 65.7608 150.603 65.8061C150.599 65.9034 150.467 65.8376 150.468 66.0047C150.477 65.7326 150.428 65.9643 150.377 65.9532C150.169 65.9048 150.592 65.6677 150.596 65.5313C150.596 65.5128 150.488 65.6115 150.486 65.5628ZM145.708 64.647C145.696 64.6613 145.642 64.9183 145.622 64.9609C145.722 64.9218 145.787 64.5882 145.708 64.647ZM151.387 65.5912C151.387 65.5982 151.344 65.6979 151.34 65.7005C151.245 65.7692 151.376 65.4651 151.387 65.5912ZM150.348 65.1298C150.422 65.0484 150.353 65.2765 150.31 65.3343C150.279 65.3266 150.342 65.1367 150.348 65.1298ZM146.23 64.2943C146.226 64.2414 146.084 64.3787 146.127 64.4198C146.154 64.4452 146.233 64.3285 146.23 64.2943ZM148.049 64.0879C148.141 64.1838 148.142 64.0629 148.177 64.0374C148.209 64.0143 148.283 64.0189 148.275 63.9377C148.2 63.9878 148.124 64.0378 148.049 64.0879ZM148.812 63.5478C148.813 63.6531 148.696 63.8381 148.686 63.9305C148.685 63.9413 148.877 63.9538 148.714 64.0356C148.604 64.0907 148.705 63.6017 148.812 63.5478ZM149.491 63.9532C149.556 63.8839 149.509 64.0737 149.469 64.1206C149.435 64.1129 149.481 63.9658 149.491 63.9532ZM150.406 63.8078C150.452 63.8352 150.287 64.1667 150.264 64.2277C150.232 64.1759 150.353 63.779 150.406 63.8078ZM150.345 63.4595C150.356 63.4512 150.506 63.5396 150.454 63.6067C150.293 63.8164 150.263 63.6088 150.219 64.1585C150.196 63.9123 150.15 64.1193 150.125 64.063C150.105 64.018 150.178 63.9062 150.085 63.9523C150.191 63.8867 150.324 63.48 150.345 63.4595ZM149.869 63.4765C149.902 63.4846 149.854 63.6342 149.845 63.6448C149.781 63.7131 149.829 63.5234 149.869 63.4765ZM149.737 63.4069C149.753 63.4074 149.706 63.5904 149.689 63.607C149.598 63.693 149.653 63.4078 149.737 63.4069Z",
                fill: "var(--blue)"
            })]
        }), C.jsx("defs", {
            children: C.jsxs("mask", {
                id: `mask0-${n}`,
                maskUnits: "userSpaceOnUse",
                x: "0",
                y: "0",
                width: "182",
                height: "90",
                children: [C.jsx(V1.path, {
                    d: "M4.5835 5.50011C4.81486 5.50011 6.06095 5.52162 7.88478 5.53473C8.81571 5.54143 12.2886 5.39494 17.3031 5.29387C19.0838 5.25798 19.3119 5.20152 19.5893 5.17049C20.9932 5.01343 13.1788 5.55689 12.7278 5.88445C10.6874 7.36621 11.3596 11.5628 10.9508 13.4418C10.6816 14.679 10.6991 15.5455 10.6489 16.0777C10.6239 16.3425 10.5862 16.5953 10.8582 16.3562C13.5771 13.9653 15.9275 11.5034 16.8015 10.7914C17.6248 10.1209 18.3907 10.04 18.7393 10.0861C20.208 10.2803 18.8774 13.8381 18.8493 16.1763C18.8423 16.7595 18.8746 17.1798 18.8833 17.2665C18.9651 18.0834 19.1926 14.6847 20.094 13.1788C21.0494 11.5826 22.3141 11.0364 23.2854 10.3884C24.3089 9.70559 25.5609 9.4242 26.7014 8.93137C28.0193 8.3619 29.2493 8.08488 29.6929 8.12261C31.1818 8.24925 29.8284 12.1347 29.6732 13.7312C29.6388 14.0852 29.6696 14.3543 29.787 14.5794C30.0279 15.0414 30.5775 15.2301 31.1415 15.3477C31.8866 15.5031 32.5983 15.3185 33.083 15.063C34.1853 14.4818 34.811 12.4408 35.5099 10.6585C35.7758 9.9806 36.0441 9.49788 36.3598 9.38574C37.8128 8.86954 37.9168 12.2461 38.2383 13.6307C38.6397 15.3596 38.1213 16.6988 37.7848 17.999C37.4093 19.4495 36.0521 20.666 34.9742 21.4664C33.6929 22.4179 30.3345 22.2262 28.575 22.1107C28.114 22.0804 27.7319 21.669 27.4761 21.2925C27.3528 21.1109 27.5241 20.8223 27.6906 20.6072C28.0261 20.1738 28.7958 19.8846 29.6688 19.556C30.3823 19.2875 34.1517 18.1191 39.7471 16.472C43.9617 15.2312 45.8563 14.2235 47.9066 13.4406C49.9851 12.6469 51.2241 12.0018 52.8416 11.3731C54.571 10.7009 55.4519 10.151 56.4276 9.82728C56.6982 9.7375 57.0034 9.65635 57.1676 9.81034C58.2119 10.79 57.0255 12.9568 56.8683 14.5552C56.7547 15.71 56.8128 16.6798 57.1272 17.1412C57.9446 18.3406 60.1575 17.5446 61.1241 17.1769C62.2482 16.7492 63.1149 15.4953 64.1701 14.3223C65.5878 12.7465 66.4853 10.9652 67.9141 8.14458C68.6157 6.75939 69.324 5.87968 70.2456 4.42555C70.4531 4.09804 70.5885 3.87566 70.6361 4.07754C71.252 6.68909 69.4653 9.84936 68.5451 13.4128C67.9531 15.7052 67.5202 17.5694 67.2933 18.266C66.8223 19.7123 68.278 14.707 69.0636 13.6458C70.0874 12.2627 74.2224 11.6992 76.598 10.9758C77.0076 10.851 77.5645 10.7185 77.5847 10.6166C78.1333 7.84905 70.2736 10.2433 67.4897 9.07834C62.7184 7.08172 60.2227 4.93742 61.1022 5.64907C64.4487 8.35712 66.0276 8.75195 69.7092 9.8087C74.4641 11.1736 79.1869 10.2917 79.5172 10.1123C80.0957 9.7981 77.9739 9.6035 75.6462 9.20243C73.7226 8.87101 70.3171 8.14214 68.1486 7.65754C63.7126 6.6662 61.8519 5.5325 60.0738 4.75062C59.5033 4.49977 58.742 4.21179 58.6559 4.18755C58.5697 4.16332 59.1746 4.42869 61.6095 5.01665C64.0444 5.60462 68.291 6.50712 71.6254 7.1168C77.2319 8.1419 80.2682 8.38313 81.9397 8.48751C86.2845 8.75882 87.8904 8.31298 89.019 8.22114C89.3749 8.19217 89.8161 8.18658 89.9503 8.25027C91.8597 9.1559 86.2531 13.3977 85.8061 14.8724C85.6127 15.5104 85.8292 16.155 86.0377 16.6891C86.2288 17.1783 86.8355 17.4186 87.4673 17.6074C89.1587 18.1128 91.2866 16.6164 92.5094 15.5631C94.0088 14.2718 92.4007 9.62236 91.938 8.09437C91.8338 7.75042 95.3584 7.69387 99.7471 7.73818C101.238 7.75324 101.201 8.33738 101.068 8.95035C100.439 11.8478 100.164 13.9669 100.347 15.1121C100.439 15.688 100.845 16.1252 101.29 16.3728C101.74 16.624 102.345 16.2382 102.925 15.7575C104.417 14.5208 104.737 12.3711 105.337 10.848C105.515 10.3974 105.631 10.6916 105.666 11.3064C105.823 14.0866 105.608 16.1446 106.008 17.9063C106.309 19.2301 108.441 17.0686 108.8 16.721C109.523 16.0189 109.532 14.5839 109.589 12.8078C109.619 11.8544 109.164 10.9309 108.877 10.1748C108.766 9.87948 109.024 9.68969 109.393 9.67067C112.666 9.50184 118.084 9.78033 120.017 9.60462C120.803 9.53319 122.206 9.56686 123.098 8.67449C123.743 8.02918 121.863 5.92944 121.16 5.02674C120.458 4.12403 120.247 4.21006 119.525 5.75943C117.432 10.2535 116.168 14.0071 115.887 15.2781C115.533 17.8112 115.45 18.8864 115.324 19.9524C115.282 20.5481 115.282 21.255 115.23 22.1365",
                    stroke: "#FFFFFF",
                    strokeWidth: "8",
                    strokeLinecap: "round",
                    fill: "none",
                    pathLength: 1,
                    strokeDasharray: "1",
                    strokeDashoffset: 1,
                    strokeOpacity: 0,
                    initial: {
                        strokeDashoffset: 1,
                        strokeOpacity: 0
                    },
                    animate: {
                        strokeDashoffset: 0,
                        strokeOpacity: 1
                    },
                    transition: {
                        strokeDashoffset: {
                            duration: .3,
                            delay: r,
                            ease: "easeOut"
                        },
                        strokeOpacity: {
                            duration: 0,
                            delay: r
                        }
                    }
                }), C.jsx(V1.path, {
                    d: "M4.00049 44.2345C4.05106 44.5725 4.32233 45.731 5.02456 46.5951C5.8427 47.6017 7.60936 47.1482 8.97035 47.0115C9.60593 46.9477 10.1016 46.1816 10.5669 45.376C11.3162 44.0787 11.0609 39.2009 10.6407 36.5061C10.4669 35.3915 8.27572 37.7817 7.51005 38.5387C7.32365 38.723 7.29575 39.011 7.31593 39.2764C7.33611 39.5419 7.44714 39.8107 7.61319 40.011C7.93368 40.3975 9.28217 40.2522 11.5286 39.6865C14.0563 39.0499 17.4143 37.33 20.2945 36.5423C25.0763 35.2344 17.096 45.0367 16.994 45.4844C16.6968 46.7883 21.9756 40.2983 24.6685 38.253C24.989 38.0096 25.4571 38.0141 25.7403 38.0588C26.0236 38.1035 26.1634 38.2869 26.2613 38.5067C26.9216 39.989 25.9063 44.0233 25.4013 46.0057C25.3313 46.3081 25.2959 46.6061 25.2776 47.0848C25.2593 47.5635 25.2593 48.214 25.2593 48.8842",
                    stroke: "#FFFFFF",
                    strokeWidth: "8",
                    strokeLinecap: "round",
                    fill: "none",
                    pathLength: 1,
                    strokeDasharray: "1",
                    strokeDashoffset: 1,
                    strokeOpacity: 0,
                    initial: {
                        strokeDashoffset: 1,
                        strokeOpacity: 0
                    },
                    animate: {
                        strokeDashoffset: 0,
                        strokeOpacity: 1
                    },
                    transition: {
                        strokeDashoffset: {
                            duration: .15,
                            delay: r + .3,
                            ease: "easeInOut"
                        },
                        strokeOpacity: {
                            duration: 0,
                            delay: r + .3
                        }
                    }
                }), C.jsx(V1.path, {
                    d: "M40.1429 37.1269C40.4821 37.3978 41.4564 38.7506 41.795 40.1763C42.4773 43.0492 41.6095 44.8538 41.6831 44.9573C42.7282 46.4257 43.7387 40.8123 45.2405 39.2119C46.3528 38.0265 47.7238 37.5253 49.835 36.9162C50.2437 36.7983 50.4295 37.19 50.5168 37.6211C50.7214 38.6312 50.2742 40.7335 49.7635 43.2087C49.5574 44.2074 49.5608 44.7032 50.2768 44.2257C55.1917 40.9478 56.0594 38.3319 57.1317 37.3849C57.6683 36.911 58.1338 36.484 58.5311 36.362C60.0144 35.9067 58.4195 43.5957 58.068 46.2902C58.0331 46.5577 58.031 46.8269 58.2232 46.5264C59.7325 44.1657 61.1556 41.8783 62.6594 40.0224C63.9074 38.4822 68.6117 36.9825 72.27 35.7565C72.8833 35.5509 73.3864 35.6106 73.5659 35.6922C74.535 36.1329 69.7744 39.0852 67.8157 40.9923C66.0297 42.7311 65.548 43.6789 65.394 44.8141C65.3558 45.0951 65.5767 45.3475 65.9803 45.4866C67.004 45.8396 68.1763 45.5251 69.0746 45.1558C71.0686 44.3361 71.9433 41.9144 73.6266 39.6012C78.0868 33.4721 81.5368 32.3423 81.9909 32.0981C82.3434 31.9085 80.1756 36.3899 77.5732 41.8741C76.5057 44.1236 76.4477 44.8037 76.4513 45.5642C76.4558 46.506 76.7362 47.2578 77.0297 47.685C77.1812 47.9057 77.4638 48.0333 77.7511 48.1119C81.2444 49.068 86.6446 44.112 87.2517 43.12C87.5942 42.5606 87.4835 41.9024 87.2718 41.4813C86.7402 40.4236 83.8625 41.5423 81.9098 42.1303C80.0547 42.689 88.4089 40.9296 90.24 40.0377C91.1016 39.618 91.8677 39.4791 92.3301 39.3811C94.3134 38.9607 91.2211 44.9805 91.3053 45.7864C91.3408 46.125 91.5582 46.2855 91.8494 46.3464C92.5344 46.4899 93.2121 46.2099 94.1251 45.6373C96.0072 44.4567 97.2925 42.9536 98.2873 40.7606C100.42 36.0591 101.511 32.4812 101.726 32.2494C102.122 31.8237 101.171 35.375 100.456 38.9006C99.6744 42.7536 99.4979 45.0655 99.4863 46.9458C99.4834 47.4128 102.924 46.2554 107.451 44.5954C110.723 43.3958 113.406 41.6152 115.198 39.9954C116.101 39.1796 115.931 37.9381 115.819 37.5356C115.772 37.3673 115.483 37.4103 115.171 37.5438C112.136 38.843 108.896 42.9721 108.373 43.9566C108.267 44.1573 108.514 44.4258 108.703 44.5966C109.078 44.935 112.893 44.8301 118.623 44.5545C120.845 44.4476 121.667 44.2293 122.176 44.0624C122.889 43.8286 119.743 42.7073 114.151 41.2628C110.647 40.3574 108.894 40.0506 107.166 39.5916C105.914 39.2589 103.866 38.8587 101.285 38.0706C98.7044 37.2824 95.6446 36.1529 93.9003 35.4955C92.156 34.838 91.82 34.6869 91.1101 34.3753",
                    stroke: "#FFFFFF",
                    strokeWidth: "8",
                    strokeLinecap: "round",
                    fill: "none",
                    pathLength: 1,
                    strokeDasharray: "1",
                    strokeDashoffset: 1,
                    strokeOpacity: 0,
                    initial: {
                        strokeDashoffset: 1,
                        strokeOpacity: 0
                    },
                    animate: {
                        strokeDashoffset: 0,
                        strokeOpacity: 1
                    },
                    transition: {
                        strokeDashoffset: {
                            duration: .3,
                            delay: r + .4,
                            ease: "easeInOut"
                        },
                        strokeOpacity: {
                            duration: 0,
                            delay: r + .4
                        }
                    }
                }), C.jsx(V1.path, {
                    d: "M142.264 30.4829C142.51 30.341 145.783 30.1298 150.94 31.1077C154.444 31.7722 156.746 31.9552 159.918 32.4047C162.833 32.8178 166.461 34.2413 168.78 35.0984C170.24 35.6378 171.598 36.897 172.921 38.2121C173.996 39.2797 174.77 41.276 175.16 42.6354C175.6 44.1712 175.215 45.7446 174.845 46.9796C174.284 48.8556 173.387 50.3604 172.85 51.3039C172.252 52.3545 170.081 54.8649 167.933 56.9985C167.332 57.5959 166.841 58.0203 166.178 58.6383C165.023 59.7166 162.772 61.9896 159.69 64.8103C155.617 68.5382 154.299 69.9685 151.826 72.4638C151.122 73.2232 150.755 73.6719 150.461 74.0466C150.305 74.2353 150.133 74.421 149.957 74.6124",
                    stroke: "#FFFFFF",
                    strokeWidth: "12",
                    strokeLinecap: "round",
                    fill: "none",
                    pathLength: 1,
                    strokeDasharray: "1",
                    strokeDashoffset: 1,
                    strokeOpacity: 0,
                    initial: {
                        strokeDashoffset: 1,
                        strokeOpacity: 0
                    },
                    animate: {
                        strokeDashoffset: 0,
                        strokeOpacity: 1
                    },
                    transition: {
                        strokeDashoffset: {
                            duration: .2,
                            delay: r + .8,
                            ease: "easeInOut"
                        },
                        strokeOpacity: {
                            duration: 0,
                            delay: r + .85
                        }
                    }
                }), C.jsx(V1.path, {
                    d: "M148.024 64.8081C147.851 65.3429 147.227 67.3876 146.122 71.4483C145.342 74.3158 144.315 77.8569 143.962 79.1667C143.867 79.5195 143.806 79.887 143.875 80.1675C144.3 81.8886 149.257 80.4226 152.727 80.3148C157.929 80.1533 161.374 80.2277 162.242 80.3204C163.541 80.512 165.017 80.7679 166.208 80.9955C166.7 81.0911 166.966 81.1463 167.444 81.2543",
                    stroke: "#FFFFFF",
                    strokeWidth: "12",
                    strokeLinecap: "round",
                    fill: "none",
                    pathLength: 1,
                    strokeDasharray: "1",
                    strokeDashoffset: 1,
                    strokeOpacity: 0,
                    initial: {
                        strokeDashoffset: 1,
                        strokeOpacity: 0
                    },
                    animate: {
                        strokeDashoffset: 0,
                        strokeOpacity: 1
                    },
                    transition: {
                        strokeDashoffset: {
                            duration: .6,
                            delay: r + .8,
                            ease: "easeInOut"
                        },
                        strokeOpacity: {
                            duration: 0,
                            delay: r + 1
                        }
                    }
                })]
            })
        })]
    })
}
  , ms = -3
  , n7 = 20
  , ys = 2
  , F0 = .8
  , N0 = .15
  , gs = 1.5
  , ip = .5;
function sp(n) {
    const r = R.useRef(null)
      , s = R.useRef(null)
      , l = R.useRef({
        x: 0,
        y: 0,
        r: 0
    })
      , u = R.useRef({
        x: 0,
        y: 0,
        r: 0
    });
    return R.useEffect( () => {
        const d = r.current;
        if (!d)
            return;
        if (!n) {
            s.current !== null && (cancelAnimationFrame(s.current),
            s.current = null);
            const h = u.current;
            d.style.transform = `rotate(${ms + h.r}deg) translate(${h.x}px, ${h.y}px)`;
            return
        }
        const f = () => {
            const h = l.current
              , p = u.current;
            h.x += (Math.random() - .5) * F0 * 2,
            h.y += (Math.random() - .5) * F0 * 2,
            h.r += (Math.random() - .5) * F0,
            h.x = Math.max(-n7, Math.min(n7, h.x)),
            h.y = Math.max(-n7, Math.min(n7, h.y)),
            h.r = Math.max(-ys, Math.min(ys, h.r)),
            p.x += (h.x - p.x) * N0,
            p.y += (h.y - p.y) * N0,
            p.r += (h.r - p.r) * N0;
            const g = (Math.random() - .5) * gs
              , y = (Math.random() - .5) * gs
              , v = (Math.random() - .5) * ip
              , w = p.x + g
              , j = p.y + y
              , A = ms + p.r + v;
            d.style.transform = `rotate(${A}deg) translate(${w}px, ${j}px)`,
            s.current = requestAnimationFrame(f)
        }
        ;
        return s.current = requestAnimationFrame(f),
        () => {
            s.current !== null && (cancelAnimationFrame(s.current),
            s.current = null)
        }
    }
    , [n]),
    r
}
function op() {
    const [n,r] = R.useState(!1)
      , s = sp(n);
    return C.jsx("div", {
        className: It.page,
        children: C.jsxs("div", {
            className: It.container,
            children: [C.jsxs("div", {
                className: It.content,
                children: [C.jsx(V1.div, {
                    initial: {
                        scale: 0,
                        rotate: 10
                    },
                    animate: {
                        scale: 1,
                        rotate: 0
                    },
                    transition: {
                        type: "spring",
                        stiffness: 550,
                        damping: 30,
                        mass: 1.2,
                        delay: .2,
                        rotate: {
                            duration: .4,
                            ease: "easeOut",
                            delay: .2
                        }
                    },
                    children: C.jsx("div", {
                        className: It.phone,
                        ref: s,
                        children: C.jsx("div", {
                            className: It.screen,
                            children: C.jsx(ho, {
                                disabled: !0,
                                setShaking: r
                            })
                        })
                    })
                }), C.jsxs("div", {
                    className: It.scan,
                    children: [C.jsx(rp, {}), C.jsx(V1.div, {
                        initial: {
                            scale: 0,
                            rotate: -10
                        },
                        animate: {
                            scale: 1,
                            rotate: 0
                        },
                        transition: {
                            type: "spring",
                            stiffness: 550,
                            damping: 30,
                            mass: 1.2,
                            delay: .3,
                            rotate: {
                                duration: .4,
                                ease: "easeOut",
                                delay: .3
                            }
                        },
                        children: C.jsx("div", {
                            className: It.qrcode,
                            children: C.jsx(np, {})
                        })
                    })]
                })]
            }), C.jsxs("section", {
                children: [C.jsx("h3", {
                    children: "Install"
                }), C.jsx(lo, {})]
            }), C.jsxs("section", {
                children: [C.jsx("h3", {
                    children: "Usage"
                }), C.jsx(ao, {})]
            }), C.jsxs("section", {
                children: [C.jsx("h3", {
                    children: "Custom Haptic"
                }), C.jsx(Co, {})]
            }), C.jsx(xs, {})]
        })
    })
}
function lp() {
    const n = /Mobi|Android/i.test(navigator.userAgent);
    return C.jsx(cu, {
        children: C.jsx(uu, {
            children: n ? C.jsx(ho, {}) : C.jsx(op, {})
        })
    })
}
ka.createRoot(document.getElementById("root")).render(C.jsx(wt.StrictMode, {
    children: C.jsx(lp, {})
}));
