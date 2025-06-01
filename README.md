<div align="center">
  <h1>🎌 打鍵人（Dakenjin）</h1>
  <p>
    <strong>A pure, focused Japanese typing experience</strong>
  </p>
  <p>
    <a href="https://github.com/aku11i/dakenjin/actions/workflows/ci.yml">
      <img src="https://github.com/aku11i/dakenjin/actions/workflows/ci.yml/badge.svg" alt="CI" />
    </a>
    <a href="https://github.com/aku11i/dakenjin/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/aku11i/dakenjin" alt="License" />
    </a>
    <a href="https://github.com/aku11i/dakenjin/stargazers">
      <img src="https://img.shields.io/github/stars/aku11i/dakenjin" alt="Stars" />
    </a>
  </p>
  <p>
    <a href="#features">Features</a> •
    <a href="#why-dakenjin">Why Dakenjin?</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#contributing">Contributing</a> •
    <a href="#license">License</a>
  </p>
</div>

---

## ✨ Features

🎯 **Pure Typing Experience**
- No gamification, no distractions - just you and your keyboard
- Clean, minimal interface designed for focus
- Smooth animations that enhance the typing feel

📊 **Comprehensive Analytics**
- Real-time WPM (Words Per Minute) tracking
- Accuracy percentage and error analysis
- Downloadable session logs for deep analysis

🇯🇵 **Japanese-First Design**
- Built specifically for Japanese typing practice
- Support for Hiragana, Katakana, and Kanji
- Multiple input methods (Romaji, Kana)

🚀 **Modern Tech Stack**
- Built with Next.js 15 and React 19
- TypeScript for type safety
- Turborepo for efficient monorepo management

## 🤔 Why Dakenjin?

In a world of gamified typing apps, **Dakenjin** (打鍵人) takes a different approach. We believe that sometimes, you just want to feel the pure connection between your thoughts, fingers, and the keyboard.

Perfect for:
- 🎹 Testing new keyboards or layouts
- 📈 Tracking your typing progress over time
- 🏃‍♂️ Warming up before coding sessions
- 🎯 Focused practice without distractions

## 🚀 Getting Started

### Prerequisites

- Node.js 24+
- pnpm 10.6.3+

### Installation

```bash
# Clone the repository
git clone https://github.com/aku11i/dakenjin.git
cd dakenjin

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Visit `http://localhost:3000` and start typing!

## 🛠️ Development

### Project Structure

```
dakenjin/
├── apps/
│   └── web/          # Next.js web application
├── packages/
│   ├── core/         # Core typing logic
│   └── react/        # React hooks and components
└── turbo.json        # Turborepo configuration
```

### Available Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint
pnpm fix              # Fix linting issues
pnpm type-check       # Run TypeScript compiler
pnpm test             # Run tests

# Pre-commit
pnpm ready            # Run all checks (fix, type-check, test)
pnpm ready:check      # Run all checks without auto-fix
```

## 🤝 Contributing

We welcome contributions from the community! Whether it's bug fixes, new features, or documentation improvements, every contribution helps make Dakenjin better.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

### Development Philosophy

- **Simplicity First**: Features should enhance, not complicate the typing experience
- **Performance Matters**: Every millisecond counts in typing feedback
- **Accessibility**: Everyone should be able to use Dakenjin comfortably

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by the Dakenjin community
- Inspired by the minimalist philosophy of Japanese craftsmanship
- Special thanks to all contributors who help improve the typing experience

---

<div align="center">
  <p>
    <strong>Ready to improve your typing?</strong>
  </p>
  <p>
    <a href="https://dakenjin.com">
      🚀 Try Dakenjin Now
    </a>
  </p>
</div>

