type HeaderProps = {
  title: string;
  subtitle?: string;
};

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="border-b border-border bg-gradient-to-r from-muted/60 to-muted/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1
              className="text-3xl font-bold text-gray-500 drop-shadow-sm"
              style={{
                WebkitTextStroke: "1px white",
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <span className="ml-4 text-sm text-muted-foreground font-medium bg-white/80 px-3 py-1 rounded-full">
                {subtitle}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
