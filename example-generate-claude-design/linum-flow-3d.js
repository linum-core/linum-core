/* =========================================================
   LINUM CORE — 3D Flow Line (Three.js)
   Two ribbon strands waving in 3D + dot trails.
   Mouse hover deforms the wave field smoothly and decays back.
   ========================================================= */

(function () {
  if (typeof window === "undefined") return;

  window.LinumFlow3D = {
    mount(container) {
      if (!container || !window.THREE) return null;
      const THREE = window.THREE;

      /* ---- Scene ---- */
      const scene = new THREE.Scene();
      // Orthographic camera — predictable mapping of world coords → pixels.
      // We size the frustum so 1 world unit ≈ 1/16th of canvas width.
      const camera = new THREE.OrthographicCamera(-8, 8, 1.4, -1.4, 0.1, 100);
      camera.position.set(0, 0, 10);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      const canvas = renderer.domElement;
      canvas.style.position = "absolute";
      canvas.style.inset = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      canvas.style.cursor = "crosshair";
      canvas.style.touchAction = "none";
      container.appendChild(canvas);

      /* ---- Lighting ---- */
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      const keyB = new THREE.PointLight(0x6FA3D2, 1.4, 30, 1.2);
      keyB.position.set(-4, 1.5, 4);
      scene.add(keyB);
      const keyR = new THREE.PointLight(0xFF6B6B, 1.2, 30, 1.2);
      keyR.position.set(4, -1.5, 4);
      scene.add(keyR);

      /* ---- Wave field parameters ---- */
      const WIDTH = 16;        // matches frustum width
      const AMP_BASE = 1.05;   // baseline amplitude (frustum is ±1.4 → fills most of canvas)
      const Z_VARIANCE = 0.4;
      const SEGMENTS = 240;

      // Animation clock — declared before closures use it
      let time = 0;

      // Mouse state
      const mouse = { x: 0, y: 0, active: false };
      const mouseSmoothed = { x: 0, y: 0 };
      let strain = 0;
      let strainTarget = 0;

      /* ---- Strand factory (TubeGeometry rebuilt per frame) ---- */
      function createCurveFn(sign, phaseOffset) {
        // returns a function t -> Vector3 in world space, modulated by mouse strain
        return (t, target) => {
          const x = (t - 0.5) * WIDTH;
          // Base smooth sine
          const baseY = sign * Math.sin(t * Math.PI * 4 + phaseOffset + time * 0.6) * AMP_BASE;

          // Mouse-driven Gaussian deformation: the wave bulges TOWARD the
          // cursor near where it hovers, then decays away from it.
          const dx = x - mouseSmoothed.x;
          const dy = mouseSmoothed.y;
          const sigma = 2.0;  // bump width
          const gauss = Math.exp(-(dx * dx) / (sigma * sigma));
          // Add cursor's Y as a pull, scaled by strain
          const pull = dy * gauss * strain * 1.4;
          // Plus amplitude boost at the hover region
          const ampBoost = (1 + gauss * strain * 2.4);

          const y = baseY * ampBoost + pull;

          // Depth — small phase-shifted sine + a forward push at cursor
          const baseZ = sign * Math.cos(t * Math.PI * 4 + phaseOffset + time * 0.5) * Z_VARIANCE;
          const z = baseZ + gauss * strain * 0.8;

          return target.set(x, y, z);
        };
      }

      class StrandCurve extends THREE.Curve {
        constructor(fn) { super(); this.fn = fn; }
        getPoint(t, target = new THREE.Vector3()) {
          return this.fn(t, target);
        }
      }

      // Two strands: blue (top phase), red (bottom phase, flipped)
      const blueFn = createCurveFn(1, 0);
      const redFn  = createCurveFn(-1, Math.PI / 2.2);
      const blueCurve = new StrandCurve(blueFn);
      const redCurve  = new StrandCurve(redFn);

      function makeStrand(curve, color, radius) {
        const geom = new THREE.TubeGeometry(curve, SEGMENTS, radius, 12, false);
        const mat = new THREE.MeshStandardMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 0.9,
          roughness: 0.4,
          metalness: 0.3,
          transparent: true,
          opacity: 0.95,
        });
        const mesh = new THREE.Mesh(geom, mat);
        return { mesh, geom, mat, curve, radius };
      }
      const strandA = makeStrand(blueCurve, 0x6FA3D2, 0.085);
      const strandB = makeStrand(redCurve,  0xFF6B6B, 0.085);
      scene.add(strandA.mesh, strandB.mesh);

      // Thinner echo strands
      const strandAThin = makeStrand(new StrandCurve(createCurveFn(1, Math.PI / 6)), 0x4A7AB8, 0.03);
      strandAThin.mat.opacity = 0.6;
      strandAThin.mat.emissiveIntensity = 0.6;
      const strandBThin = makeStrand(new StrandCurve(createCurveFn(-1, -Math.PI / 4)), 0xC23B33, 0.03);
      strandBThin.mat.opacity = 0.6;
      strandBThin.mat.emissiveIntensity = 0.6;
      scene.add(strandAThin.mesh, strandBThin.mesh);

      // Outer glow halos — soft thick translucent tubes around the main strands
      const haloA = makeStrand(new StrandCurve(blueFn), 0x6FA3D2, 0.32);
      haloA.mat.opacity = 0.06;
      haloA.mat.emissiveIntensity = 0.4;
      haloA.mat.depthWrite = false;
      const haloB = makeStrand(new StrandCurve(redFn), 0xFF6B6B, 0.32);
      haloB.mat.opacity = 0.06;
      haloB.mat.emissiveIntensity = 0.4;
      haloB.mat.depthWrite = false;
      scene.add(haloA.mesh, haloB.mesh);

      const strands = [strandA, strandB, strandAThin, strandBThin, haloA, haloB];

      /* ---- Dot trail (Points riding the upper strand) ---- */
      const DOTS = 36;
      const dotPositions = new Float32Array(DOTS * 3);
      const dotGeom = new THREE.BufferGeometry();
      dotGeom.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));

      // Per-dot colors — alternate blue/red
      const dotColors = new Float32Array(DOTS * 3);
      for (let i = 0; i < DOTS; i++) {
        const isBlue = i % 2 === 0;
        dotColors[i * 3]     = isBlue ? 0.435 : 1.0;   // R
        dotColors[i * 3 + 1] = isBlue ? 0.639 : 0.42;  // G
        dotColors[i * 3 + 2] = isBlue ? 0.823 : 0.42;  // B
      }
      dotGeom.setAttribute("color", new THREE.BufferAttribute(dotColors, 3));

      const dotMat = new THREE.PointsMaterial({
        size: 0.13,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const dots = new THREE.Points(dotGeom, dotMat);
      scene.add(dots);

      /* ---- Resize ---- */
      function resize() {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h, false);
        // Keep horizontal world span constant (=WIDTH); recompute vertical
        // half-height to preserve the canvas aspect ratio so circles don't squash.
        const aspect = w / h;
        const halfW = WIDTH / 2;
        const halfH = halfW / aspect;
        camera.left = -halfW;
        camera.right = halfW;
        camera.top = halfH;
        camera.bottom = -halfH;
        camera.updateProjectionMatrix();
      }
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(container);

      /* ---- Mouse → world projection (orthographic — direct mapping) ---- */
      function setMouseFromEvent(e) {
        const r = canvas.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;   // -1..1
        const ny = -(((e.clientY - r.top) / r.height) * 2 - 1); // -1..1
        // Map NDC to camera frustum
        mouse.x = nx * (camera.right);
        mouse.y = ny * (camera.top);
        mouse.active = (e.clientX >= r.left && e.clientX <= r.right &&
                        e.clientY >= r.top && e.clientY <= r.bottom);
      }

      const onMove = (e) => {
        setMouseFromEvent(e);
        strainTarget = mouse.active ? 1 : 0;
      };
      const onLeave = () => { strainTarget = 0; mouse.active = false; };
      window.addEventListener("mousemove", onMove, { passive: true });
      canvas.addEventListener("pointerleave", onLeave);

      // Touch — single tap deformations
      canvas.addEventListener("pointerdown", (e) => {
        setMouseFromEvent(e);
        strainTarget = 1;
      });
      canvas.addEventListener("pointerup", () => { strainTarget = 0; });

      /* ---- Animation loop ---- */
      let raf = 0;
      let running = true;
      let paused = false;
      const onVisibility = () => { paused = document.hidden; };
      document.addEventListener("visibilitychange", onVisibility);

      function rebuildStrand(strand) {
        strand.geom.dispose();
        strand.geom = new THREE.TubeGeometry(strand.curve, SEGMENTS, strand.radius, 12, false);
        strand.mesh.geometry = strand.geom;
      }

      function updateDots() {
        const arr = dotGeom.attributes.position.array;
        for (let i = 0; i < DOTS; i++) {
          // Each dot rides a strand with a time-shifted position
          const speed = 0.08 + (i % 4) * 0.015;
          const t = ((i / DOTS) + time * speed) % 1;
          const useBlue = i % 2 === 0;
          const fn = useBlue ? blueFn : redFn;
          const v = new THREE.Vector3();
          fn(t, v);
          arr[i * 3]     = v.x;
          arr[i * 3 + 1] = v.y + (useBlue ? 0.06 : -0.06);
          arr[i * 3 + 2] = v.z;
        }
        dotGeom.attributes.position.needsUpdate = true;
      }

      function tick() {
        if (!running) return;
        raf = requestAnimationFrame(tick);
        if (paused) return;

        time += 0.016;

        // Smooth mouse follow (lerp)
        const lerp = 0.10;
        mouseSmoothed.x += (mouse.x - mouseSmoothed.x) * lerp;
        mouseSmoothed.y += (mouse.y - mouseSmoothed.y) * lerp;

        // Smoothly approach strain target — both attack and release
        const strainLerp = strainTarget > strain ? 0.06 : 0.025;
        strain += (strainTarget - strain) * strainLerp;
        if (strain < 0.001) strain = 0;

        // Rebuild strands with current state
        for (const s of strands) rebuildStrand(s);
        updateDots();

        // Light positions track the mouse subtly for an interactive glow
        keyB.position.x = -3 + mouseSmoothed.x * 0.5;
        keyR.position.x = 3 + mouseSmoothed.x * 0.5;

        renderer.render(scene, camera);
      }
      tick();

      return function dispose() {
        running = false;
        cancelAnimationFrame(raf);
        ro.disconnect();
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("visibilitychange", onVisibility);
        renderer.dispose();
        for (const s of strands) { s.geom.dispose(); s.mat.dispose(); }
        dotGeom.dispose(); dotMat.dispose();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    },
  };

  // Expose `time` symbol via global so the createCurveFn closures work
  // (defined per-mount in the closure above; this stays clean).
})();

// Helper variable for closure references (each mount has its own scope).
