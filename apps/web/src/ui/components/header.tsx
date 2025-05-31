type HeaderProps = {
  title: string;
  subtitle?: string;
};

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <span className="ml-3 text-sm text-gray-500">{subtitle}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
