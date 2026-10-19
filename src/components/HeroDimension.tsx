"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uTime;

  #define MAX_STEPS 82
  #define MAX_DIST 9.0
  #define SURF_DIST 0.0015

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  float sdTorus(vec3 p, vec2 t) {
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
  }

  float sdSphere(vec3 p, float radius) {
    return length(p) - radius;
  }

  vec2 mapScene(vec3 p) {
    float time = uTime * 0.22;
    vec3 core = p;
    core.xz *= rotate2d(time + uPointer.x * 0.24);
    core.xy *= rotate2d(-time * 0.72 + uPointer.y * 0.2);

    float wave = sin(core.x * 4.0 + time * 3.0)
      * sin(core.y * 3.2 - time * 2.0)
      * sin(core.z * 3.6 + time) * 0.055;
    float orb = sdSphere(core, 0.72 + wave);

    vec3 ringA = p;
    ringA.xy *= rotate2d(0.65 + sin(time) * 0.12);
    ringA.yz *= rotate2d(time * 0.62);
    float torusA = sdTorus(ringA, vec2(1.2, 0.075));

    vec3 ringB = p;
    ringB.xz *= rotate2d(-0.8 + cos(time * 0.8) * 0.16);
    ringB.xy *= rotate2d(-time * 0.5);
    float torusB = sdTorus(ringB, vec2(0.94, 0.045));

    vec3 ringC = p;
    ringC.yz *= rotate2d(1.15);
    ringC.xz *= rotate2d(time * 0.34);
    float torusC = sdTorus(ringC, vec2(1.47, 0.025));

    float ring = min(torusA, min(torusB, torusC));
    return orb < ring ? vec2(orb, 1.0) : vec2(ring, 2.0);
  }

  vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.0015, 0.0);
    float d = mapScene(p).x;
    return normalize(vec3(
      d - mapScene(p - e.xyy).x,
      d - mapScene(p - e.yxy).x,
      d - mapScene(p - e.yyx).x
    ));
  }

  vec3 palette(float t) {
    vec3 a = vec3(0.08, 0.48, 0.54);
    vec3 b = vec3(0.28, 0.77, 0.76);
    vec3 c = vec3(0.78, 0.98, 0.95);
    return mix(a, mix(b, c, smoothstep(0.0, 1.0, t)), t);
  }

  void main() {
    vec2 frag = gl_FragCoord.xy;
    vec2 uv = (frag * 2.0 - uResolution.xy) / uResolution.y;
    vec2 mouse = uPointer * vec2(0.22, 0.14);

    vec3 background = mix(
      vec3(0.96, 0.985, 0.98),
      vec3(0.68, 0.89, 0.90),
      smoothstep(-0.8, 1.05, uv.x)
    );
    background += vec3(0.08, 0.16, 0.15)
      * exp(-2.0 * length(uv - vec2(0.5, 0.05)));

    vec3 ro = vec3(mouse.x, mouse.y, 4.1);
    vec3 rd = normalize(vec3(uv.x - mouse.x * 0.28, uv.y - mouse.y * 0.2, -1.85));

    float travel = 0.0;
    float material = 0.0;
    float glow = 0.0;
    vec3 p = ro;

    for (int i = 0; i < MAX_STEPS; i++) {
      p = ro + rd * travel;
      vec2 scene = mapScene(p);
      glow += exp(-32.0 * abs(scene.x)) * 0.011;
      if (abs(scene.x) < SURF_DIST || travel > MAX_DIST) {
        material = scene.y;
        break;
      }
      travel += scene.x * 0.72;
    }

    vec3 color = background;
    if (travel < MAX_DIST) {
      vec3 normal = getNormal(p);
      vec3 lightA = normalize(vec3(-0.6, 0.8, 0.9));
      vec3 lightB = normalize(vec3(0.8, -0.2, 0.5));
      float diffuse = max(dot(normal, lightA), 0.0);
      float rim = pow(1.0 - max(dot(normal, -rd), 0.0), 2.4);
      float secondary = max(dot(normal, lightB), 0.0) * 0.32;
      float tone = clamp(0.24 + diffuse * 0.68 + rim * 0.8 + secondary, 0.0, 1.0);
      vec3 surface = palette(tone);
      if (material > 1.5) {
        surface = mix(vec3(0.20, 0.72, 0.73), vec3(0.88, 1.0, 0.98), rim);
      }
      color = mix(color, surface, 0.82);
      color += rim * vec3(0.32, 0.88, 0.84) * 0.48;
    }

    color += glow * vec3(0.34, 0.94, 0.88);

    float vignette = smoothstep(1.65, 0.35, length(uv * vec2(0.72, 1.0)));
    color *= 0.82 + vignette * 0.18;
    color = pow(color, vec3(0.92));

    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function HeroDimension() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      canvas.dataset.fallback = "true";
      return;
    }

    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) {
      canvas.dataset.fallback = "true";
      return;
    }

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.dataset.fallback = "true";
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );

    gl.useProgram(program);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "uResolution");
    const pointerUniform = gl.getUniformLocation(program, "uPointer");
    const timeUniform = gl.getUniformLocation(program, "uTime");

    let frame = 0;
    let visible = true;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    const startedAt = performance.now();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      const width = Math.round(canvas.clientWidth * ratio);
      const height = Math.round(canvas.clientHeight * ratio);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const onPointer = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = 1 - (event.clientY / window.innerHeight) * 2;
    };

    const render = (now: number) => {
      resize();
      pointerX += (targetX - pointerX) * 0.045;
      pointerY += (targetY - pointerY) * 0.045;
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform2f(pointerUniform, pointerX, pointerY);
      gl.uniform1f(timeUniform, reduceMotion ? 0.8 : (now - startedAt) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduceMotion && visible) frame = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame && !reduceMotion) frame = requestAnimationFrame(render);
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    observer.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      if (frame) cancelAnimationFrame(frame);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="v2-hero-webgl"
      aria-hidden="true"
    />
  );
}
