/* =========================================================
   LINUM CORE — Hero 3D scene v2 (Three.js)
   - Drag-to-rotate (returns to auto-rotate after idle)
   - Wider FOV + greater camera distance → no clipping when rotating
   - Slightly smaller scale so the full ribbon is always in frame
   ========================================================= */

(function () {
  if (typeof window === "undefined") return;

  window.LinumHero3D = {
    mount(container) {
      if (!container || !window.THREE) return null;
      const THREE = window.THREE;

      /* ---- Scene ---- */
      const scene = new THREE.Scene();
      // Wider FOV (38°) + greater distance keeps the full lemniscate
      // visible in any rotation. Bounding sphere radius is ~2.7;
      // half-height at d=11 with FOV 38° is 11 * tan(19°) ≈ 3.79 → plenty of margin.
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0, 11);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.outputColorSpace = THREE.SRGBColorSpace || THREE.sRGBEncoding;
      const canvas = renderer.domElement;
      canvas.style.position = "absolute";
      canvas.style.inset = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      canvas.style.cursor = "grab";
      canvas.style.touchAction = "none";
      container.appendChild(canvas);

      /* ---- Lighting ---- */
      scene.add(new THREE.AmbientLight(0xffffff, 0.20));

      const key = new THREE.DirectionalLight(0xffffff, 1.7);
      key.position.set(4, 6, 7);
      scene.add(key);

      const fillBlue = new THREE.PointLight(0x6FA3D2, 2.1, 16, 1.6);
      fillBlue.position.set(-3.5, 2, 2);
      scene.add(fillBlue);

      const fillRed = new THREE.PointLight(0xFF6B6B, 1.5, 13, 1.6);
      fillRed.position.set(3, -2, 2);
      scene.add(fillRed);

      const rim = new THREE.DirectionalLight(0xb6c8df, 0.75);
      rim.position.set(-2, -1, -5);
      scene.add(rim);

      /* ---- Lemniscate curve ---- */
      class Lemniscate extends THREE.Curve {
        constructor(scale) { super(); this.scale = scale; }
        getPoint(t, target = new THREE.Vector3()) {
          const a = t * Math.PI * 2;
          const c = Math.cos(a), s = Math.sin(a);
          const d = 1 + s * s;
          target.set(
            (c / d) * this.scale,
            (s * c / d) * this.scale,
            Math.sin(a * 4) * 0.22
          );
          return target;
        }
      }

      const group = new THREE.Group();
      scene.add(group);

      const curve = new Lemniscate(2.3); // slightly smaller for margin
      const tubeGeo = new THREE.TubeGeometry(curve, 480, 0.20, 32, true);

      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0x0c1015,
        metalness: 0.94,
        roughness: 0.28,
        emissive: 0x05070b,
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      group.add(tube);

      const glowGeo = new THREE.TubeGeometry(curve, 480, 0.225, 24, true);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x6FA3D2,
        transparent: true,
        opacity: 0.07,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      group.add(glow);

      const wireGeo = new THREE.WireframeGeometry(tubeGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: 0x4A7AB8,
        transparent: true,
        opacity: 0.10,
      });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      group.add(wire);

      // Two internal crossing strands
      const strandPts = [];
      for (let i = 0; i <= 100; i++) {
        const t = i / 100;
        const a = t * Math.PI * 2;
        const x = Math.sin(a * 2) * 0.55;
        const y = Math.sin(a * 4) * 0.08;
        const z = Math.cos(a * 2) * 0.4;
        strandPts.push(new THREE.Vector3(x, y, z));
      }
      const strandCurveA = new THREE.CatmullRomCurve3(strandPts, true);
      const strandCurveB = new THREE.CatmullRomCurve3(
        strandPts.map((p) => new THREE.Vector3(p.x, -p.y, -p.z)),
        true
      );
      const strandGeoA = new THREE.TubeGeometry(strandCurveA, 200, 0.018, 8, true);
      const strandGeoB = new THREE.TubeGeometry(strandCurveB, 200, 0.018, 8, true);
      const strandMatA = new THREE.MeshBasicMaterial({ color: 0x6FA3D2, transparent: true, opacity: 0.7 });
      const strandMatB = new THREE.MeshBasicMaterial({ color: 0xFF6B6B, transparent: true, opacity: 0.7 });
      const strandA = new THREE.Mesh(strandGeoA, strandMatA);
      const strandB = new THREE.Mesh(strandGeoB, strandMatB);
      group.add(strandA, strandB);

      /* ---- Resize ---- */
      function resize() {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(container);

      /* ---- Interaction state ---- */
      // Hover parallax (light, when not dragging)
      let parallaxX = 0, parallaxY = 0;
      let parallaxTX = 0, parallaxTY = 0;
      const onMove = (e) => {
        if (dragging) return;
        const r = container.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        if (e.clientX >= r.left && e.clientX <= r.right &&
            e.clientY >= r.top && e.clientY <= r.bottom) {
          parallaxTX = x;
          parallaxTY = y;
        }
      };
      window.addEventListener("mousemove", onMove, { passive: true });

      // Drag-to-rotate
      let dragging = false;
      let dragStartX = 0, dragStartY = 0;
      let dragBaseX = 0, dragBaseY = 0;
      let userRotX = 0, userRotY = 0;
      let userInteracted = false;
      let resumeTimer = 0;

      canvas.addEventListener("pointerdown", (e) => {
        dragging = true;
        userInteracted = true;
        clearTimeout(resumeTimer);
        canvas.style.cursor = "grabbing";
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        dragBaseX = userRotX;
        dragBaseY = userRotY;
        try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
      });
      canvas.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        userRotY = dragBaseY + dx * 0.008;
        userRotX = dragBaseX - dy * 0.008;
        // Clamp vertical rotation so it can't flip upside down
        userRotX = Math.max(-1.2, Math.min(1.2, userRotX));
      });
      const endDrag = (e) => {
        if (!dragging) return;
        dragging = false;
        canvas.style.cursor = "grab";
        try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
        // Resume auto-rotate after 3s of stillness
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => { userInteracted = false; }, 3000);
      };
      canvas.addEventListener("pointerup", endDrag);
      canvas.addEventListener("pointercancel", endDrag);
      canvas.addEventListener("pointerleave", endDrag);

      /* ---- Loop ---- */
      let raf = 0;
      const t0 = performance.now();
      let running = true;
      let paused = false;
      const onVisibility = () => { paused = document.hidden; };
      document.addEventListener("visibilitychange", onVisibility);

      function tick() {
        if (!running) return;
        raf = requestAnimationFrame(tick);
        if (paused) return;
        const t = (performance.now() - t0) / 1000;

        // Smooth parallax
        parallaxX += (parallaxTX - parallaxX) * 0.05;
        parallaxY += (parallaxTY - parallaxY) * 0.05;

        if (userInteracted) {
          // User control — pure
          group.rotation.x = userRotX;
          group.rotation.y = userRotY;
          group.rotation.z = 0;
        } else {
          // Smoothly settle back from any user offset towards auto state
          userRotX += (0 - userRotX) * 0.03;
          userRotY += (0 - userRotY) * 0.03;

          // Auto-rotation + gentle parallax response
          group.rotation.x = -parallaxY * 0.35 + Math.sin(t * 0.35) * 0.10 + userRotX;
          group.rotation.y = t * 0.16 + parallaxX * 0.45 + userRotY;
          group.rotation.z = Math.sin(t * 0.28) * 0.05;
        }

        // Strands counter-rotate faintly
        strandA.rotation.y = -t * 0.4;
        strandB.rotation.y = t * 0.4;

        glowMat.opacity = 0.05 + Math.sin(t * 0.9) * 0.025 + 0.025;

        fillBlue.position.x = Math.cos(t * 0.2) * 3.5;
        fillBlue.position.z = Math.sin(t * 0.2) * 3 + 2;
        fillRed.position.x = Math.cos(t * 0.15 + Math.PI) * 3.5;
        fillRed.position.z = Math.sin(t * 0.15 + Math.PI) * 3 + 2;

        renderer.render(scene, camera);
      }
      tick();

      return function dispose() {
        running = false;
        cancelAnimationFrame(raf);
        clearTimeout(resumeTimer);
        ro.disconnect();
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("visibilitychange", onVisibility);
        renderer.dispose();
        tubeGeo.dispose(); tubeMat.dispose();
        glowGeo.dispose(); glowMat.dispose();
        wireGeo.dispose(); wireMat.dispose();
        strandGeoA.dispose(); strandGeoB.dispose();
        strandMatA.dispose(); strandMatB.dispose();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    },
  };
})();
