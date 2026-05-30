export function PreloaderThreads() {
  return (
    <svg className="preloader__threads" viewBox="0 0 500 200" aria-hidden="true">
      <path
        className="thr thr-a"
        d="M 100 100 C 100 40, 220 40, 250 100 C 280 160, 400 160, 400 100 C 400 40, 280 40, 250 100 C 220 160, 100 160, 100 100 Z"
      />
      <path
        className="thr thr-b"
        d="M 250 100 C 280 160, 400 160, 400 100 C 400 40, 280 40, 250 100"
      />
      <path
        className="thr thr-a thr-thin"
        d="M 96 100 C 96 36, 220 36, 250 100 C 280 164, 404 164, 404 100 C 404 36, 280 36, 250 100 C 220 164, 96 164, 96 100 Z"
      />
      <path
        className="thr thr-b thr-thin"
        d="M 92 100 C 92 32, 220 32, 250 100 C 280 168, 408 168, 408 100 C 408 32, 280 32, 250 100"
      />
      <path
        className="thr thr-strand thr-strand-a"
        d="M 220 100 C 232 92, 268 108, 280 100"
      />
      <path
        className="thr thr-strand thr-strand-b"
        d="M 220 100 C 232 108, 268 92, 280 100"
      />
      <circle className="thr-node" cx="250" cy="100" r="2.5" />
    </svg>
  );
}
