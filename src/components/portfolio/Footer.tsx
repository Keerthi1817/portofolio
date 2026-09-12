export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/30 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Keerthivasan's Portfolio</span>
        </div>
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
