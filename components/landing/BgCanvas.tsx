"use client";

import { useEffect, useRef } from "react";

/* WebGL shader — exact recreation of FocusNebula's animated nebula field */
const VERT_SRC = `
  attribute vec2 position;
  void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

function buildFragSrc(octaves: number) {
  return `
    precision mediump float;
    uniform vec2  uResolution;
    uniform float uTime;
    uniform float uDensity;
    uniform float uColorShift;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i),           hash(i+vec2(1,0)), f.x),
        mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x),
        f.y
      );
    }
    float fbm(vec2 p) {
      float v=0.0, a=0.5, fq=1.0;
      for (int i=0; i<${octaves}; i++) {
        v += a*noise(p*fq); fq*=2.0; a*=0.5;
      }
      return v;
    }
    void main() {
      vec2 p  = (gl_FragCoord.xy*2.0 - uResolution) / min(uResolution.x, uResolution.y);
      vec2 uv = p * 2.0;
      vec2 q  = vec2(fbm(uv + uTime*0.3), fbm(uv + vec2(5.2,1.3)));
      vec2 r  = vec2(fbm(uv + q*4.0 + uTime*0.2), fbm(uv + q*4.0 + vec2(8.3,2.8)));
      float f = fbm(uv + r*uDensity);
      vec3 col = mix(
        vec3(0.8,0.2,0.4) + uColorShift*0.3,
        vec3(0.2,0.3,0.9) + uColorShift*0.2,
        f
      );
      col = mix(col, vec3(0.9,0.5,0.2)+uColorShift*0.1, r.y);
      gl_FragColor = vec4(col * f*f*1.5, 1.0);
    }
  `;
}

function mountCSSFallback() {
  if (document.getElementById("_ncss")) return;
  const s = document.createElement("style");
  s.id = "_ncss";
  s.textContent = `
    .n-bg{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:0;
      background:
        radial-gradient(ellipse 80% 60% at 20% 40%,rgba(120,30,80,.55) 0%,transparent 70%),
        radial-gradient(ellipse 60% 70% at 75% 30%,rgba(30,50,180,.45) 0%,transparent 65%),
        radial-gradient(ellipse 50% 50% at 55% 70%,rgba(180,90,20,.35) 0%,transparent 60%),
        #05040f;
      animation:npulse 8s ease-in-out infinite alternate}
    @keyframes npulse{0%{opacity:.85}100%{opacity:1}}
  `;
  document.head.appendChild(s);
  const bg = document.createElement("div");
  bg.className = "n-bg";
  document.body.prepend(bg);
}

export function BgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* --- Tier detection --- */
    const cores = navigator.hardwareConcurrency || 2;
    const dpr = window.devicePixelRatio || 1;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory !== undefined &&
      (navigator as unknown as { deviceMemory: number }).deviceMemory <= 4;
    const smallScreen = window.innerWidth < 760 || window.innerHeight < 620;

    let TIER: "Ultra" | "High" | "Medium" | "Low" | "CSS" = "Medium";

    if (reduced || cores <= 2 || lowMemory) {
      TIER = "CSS";
    } else {
      try {
        const tempCanvas = document.createElement("canvas");
        const glTemp = tempCanvas.getContext("webgl") || tempCanvas.getContext("experimental-webgl");
        if (!glTemp) {
          TIER = "CSS";
        } else {
          const gl2 = glTemp as WebGLRenderingContext;
          let gpu = "";
          const ext = gl2.getExtension("WEBGL_debug_renderer_info");
          if (ext) gpu = (gl2.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "").toLowerCase();

          const isSoftware = /swiftshader|llvmpipe|crosvm/.test(gpu);
          const isHighEnd = /rtx|gtx|rx |apple|iris|adreno 7|adreno 6|mali-g7|mali-g6/.test(gpu);
          const isLowEnd = /uhd|intel hd|mali-4|mali-t|adreno 5|adreno 4/.test(gpu);
          const pixels = window.screen.width * window.screen.height;
          const is4k = pixels > 4000000;
          const isTinyBudget = smallScreen && (cores <= 4 || dpr > 1.5);

          if (isSoftware || isTinyBudget) TIER = "CSS";
          else if (gpu) {
            if (isHighEnd) TIER = cores >= 8 && !is4k ? "Ultra" : "High";
            else if (isLowEnd) TIER = "Low";
            else TIER = is4k ? "Low" : "Medium";
          } else {
            if (cores >= 8 && dpr >= 2 && !is4k) TIER = "Ultra";
            else if (cores >= 8) TIER = "High";
            else if (cores < 4) TIER = "Low";
            else TIER = is4k ? "Low" : "Medium";
          }
        }
      } catch {
        TIER = "CSS";
      }
    }

    if (TIER === "CSS") { mountCSSFallback(); return; }

    const SETTINGS = {
      Ultra:  { pixelRatio: Math.min(dpr, 1.25), fpsCap: 45, octaves: 4 },
      High:   { pixelRatio: Math.min(dpr, 1.0),  fpsCap: 36, octaves: 4 },
      Medium: { pixelRatio: Math.min(dpr, 0.65), fpsCap: 30, octaves: 3 },
      Low:    { pixelRatio: Math.min(dpr, 0.45), fpsCap: 20, octaves: 2 },
    };

    const { pixelRatio, fpsCap, octaves } = SETTINGS[TIER];
    const FRAME_MS = fpsCap > 0 ? 1000 / fpsCap : 0;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: TIER === "Ultra" ? "high-performance" : "default",
      preserveDrawingBuffer: false,
    }) as WebGLRenderingContext | null;

    if (!gl) { mountCSSFallback(); return; }
    gl.clearColor(0, 0, 0, 0);

    /* Compile shaders */
    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT_SRC));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, buildFragSrc(octaves)));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const posBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes   = gl.getUniformLocation(prog, "uResolution");
    const uTime  = gl.getUniformLocation(prog, "uTime");
    const uDens  = gl.getUniformLocation(prog, "uDensity");
    const uShift = gl.getUniformLocation(prog, "uColorShift");

    gl.uniform1f(uDens, 1.0);
    gl.uniform1f(uShift, 0.0);

    /* Resize */
    let W = 0, H = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    function applySize() {
      const w = Math.max(1, Math.floor(window.innerWidth * pixelRatio));
      const h = Math.max(1, Math.floor(window.innerHeight * pixelRatio));
      if (w === W && h === H) return;
      W = w; H = h;
      canvas!.width = w;
      canvas!.height = h;
      gl!.viewport(0, 0, w, h);
      gl!.uniform2f(uRes, w, h);
    }
    applySize();

    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applySize, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    /* Render loop */
    let time = 0, lastTs = 0, rafId: number | null = null;
    let tabVisible = !document.hidden;

    const start = () => {
      if (!rafId) { lastTs = performance.now(); rafId = requestAnimationFrame(tick); }
    };
    const stop = () => {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    };

    function tick(ts: number) {
      rafId = requestAnimationFrame(tick);
      if (FRAME_MS > 0) {
        const d = ts - lastTs;
        if (d < FRAME_MS) return;
        lastTs = ts - (d % FRAME_MS);
      }
      time += 0.004;
      gl!.uniform1f(uTime, time);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && tabVisible) start(); else stop();
    }, { threshold: 0 });
    io.observe(canvas);

    const onVisChange = () => {
      tabVisible = !document.hidden;
      if (tabVisible) start(); else stop();
    };
    document.addEventListener("visibilitychange", onVisChange, { passive: true });

    start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisChange);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      id="bgCanvas"
      ref={canvasRef}
      aria-hidden="true"
    />
  );
}
