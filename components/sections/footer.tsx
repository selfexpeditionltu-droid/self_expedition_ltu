const navLinks = [
  { label: "Apie", href: "#apie" },
  { label: "Veiklos", href: "#veiklos" },
  { label: "D.U.K.", href: "#duk" },
  { label: "Registracija", href: "#registracija" },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative pt-20 pb-10 overflow-hidden"
      style={{ backgroundColor: "var(--bg)", borderTop: "1px solid rgba(200,169,110,0.15)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <p
              className="font-display text-4xl mb-3"
              style={{ color: "var(--sand)", letterSpacing: "0.1em" }}
            >
              SELF
              <br />
              EXPEDITION{" "}
              <span style={{ color: "var(--ash-dim)", fontSize: "0.6em", letterSpacing: "0.2em" }}>LTU</span>
            </p>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "var(--ash-dim)" }}
            >
              Perženk savo ribas.
              <br />
              Lietuva kaip klasė.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p
              className="font-body text-xs uppercase tracking-military mb-5"
              style={{ color: "var(--sand)", letterSpacing: "0.2em" }}
            >
              Navigacija
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-body text-sm transition-colors duration-200 hover:text-sand"
                    style={{ color: "var(--ash-dim)" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p
              className="font-body text-xs uppercase tracking-military mb-5"
              style={{ color: "var(--sand)", letterSpacing: "0.2em" }}
            >
              Socialiniai tinklai
            </p>
            <a
              href="https://www.instagram.com/self_expedition_ltu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 group"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 transition-colors duration-200 group-hover:stroke-sand"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--ash-dim)" }}
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
              <span
                className="font-body text-sm transition-colors duration-200 group-hover:text-sand"
                style={{ color: "var(--ash-dim)" }}
              >
                @self_expedition_ltu
              </span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)" }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="font-body text-xs"
            style={{ color: "var(--ash-dim)", letterSpacing: "0.05em" }}
          >
            © {new Date().getFullYear()} Self Expedition LTU. Visos teisės saugomos.
          </p>
          <p
            className="font-body text-xs"
            style={{ color: "rgba(100,100,100,0.5)", letterSpacing: "0.05em" }}
          >
            Lietuva &nbsp;·&nbsp; Lauke visada
          </p>
        </div>
      </div>
    </footer>
  );
}
