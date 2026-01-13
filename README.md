# 🚶 CodeWalk

**AI-Powered Interactive Code Walkthrough Extension for VS Code**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.85+-blue.svg)](https://code.visualstudio.com/)

---

## 🎯 What is CodeWalk?

CodeWalk is a VS Code extension that lets you select any code and instantly receive an AI-generated, step-by-step walkthrough explaining what the code does, why it exists, and how it works.

**Key Features:**
- 🤖 **AI-Generated Explanations** - No manual documentation needed
- 🔍 **Step-by-Step Walkthroughs** - Understand code flow logically
- 🐛 **Debug Integration** - See live variable values during debugging
- 💬 **Interactive Q&A** - Ask follow-up questions at any step

---

## 🖼️ Preview

```
┌─────────────────────────────────────────────────────────────────┐
│  EDITOR                        │  CODEWALK PANEL               │
│                                │                               │
│  public async Task<Order>      │  Step 3 of 8                  │
│    ProcessOrder(request)       │  ───────────────────────────  │
│  {                             │  📍 Line 47                   │
│ →  var customer = await        │                               │
│      _customerRepo             │  var customer = await         │
│      .GetByIdAsync(id);        │    _customerRepo.GetById...   │
│                                │                               │
│    if (customer == null)       │  This line fetches the        │
│      throw new NotFound();     │  customer from the database   │
│                                │  using the ID from the        │
│                                │  request. The await keyword   │
│                                │  releases the thread while    │
│                                │  waiting for the DB response. │
│                                │                               │
│                                │  📊 Current Values (Debug):   │
│                                │  • request.Id = "cust-8847"   │
│                                │  • customer = null            │
│                                │                               │
│                                │  💬 Ask: What if null?        │
│                                │                               │
│                                │  [← Prev]  [Next →]           │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 1. Instant Code Walkthroughs
Select code → Right-click → "Walk Through Selected Code" → Get AI explanations

### 2. Debug-Aware Explanations
When debugging, CodeWalk shows actual runtime values and references them in explanations.

### 3. Interactive Q&A
Don't understand something? Ask follow-up questions and get contextual answers.

### 4. Multiple Languages
- ✅ C# (full support)
- ✅ TypeScript/JavaScript (full support)
- 🔜 Python, Java, Go (coming soon)

---

## 🚀 Getting Started

### Prerequisites
- VS Code 1.85 or higher
- An Anthropic API key (for AI features)

### Installation

*Coming soon to VS Code Marketplace*

For now, build from source:
```bash
git clone https://github.com/MCKRUZ/CodeWalk.git
cd CodeWalk
npm install
npm run build
```

### Configuration

1. Open VS Code Settings
2. Search for "CodeWalk"
3. Enter your Anthropic API key (stored securely)

---

## 📖 Usage

### Start a Walkthrough

**Option 1: Context Menu**
1. Select code in the editor
2. Right-click → "Walk Through Selected Code"

**Option 2: Keyboard Shortcut**
- Windows/Linux: `Ctrl+Shift+W`
- macOS: `Cmd+Shift+W`

**Option 3: Command Palette**
- `Ctrl+Shift+P` → "CodeWalk: Start Walkthrough"

### Navigate Steps
- **Next Step:** `Alt+Right` or click Next button
- **Previous Step:** `Alt+Left` or click Previous button
- **Jump to Step:** Click any step in the step list

### Ask Questions
1. Type your question in the input field
2. Press Enter or click the send button
3. AI responds with context-aware answer

### Debug Mode
1. Start a debug session (F5)
2. CodeWalk automatically detects debugging
3. Variable values appear in explanations
4. Walkthrough syncs with debugger steps

---

## 🛠️ Development

### Setup
```bash
# Clone the repository
git clone https://github.com/MCKRUZ/CodeWalk.git
cd CodeWalk

# Install dependencies
npm install

# Build
npm run build

# Watch mode (for development)
npm run watch
```

### Run in Debug Mode
1. Open the project in VS Code
2. Press F5 to launch Extension Development Host
3. Test the extension in the new window

### Run Tests
```bash
npm test
```

### Project Structure
```
src/
├── extension.ts          # Entry point
├── core/                 # Core business logic
│   ├── walkthrough-controller.ts
│   ├── state-manager.ts
│   └── types.ts
├── analysis/             # Code analysis
│   ├── code-analyzer.ts
│   └── step-generator.ts
├── debug/                # Debug integration
│   ├── debug-bridge.ts
│   └── debug-event-handler.ts
├── ai/                   # AI integration
│   ├── ai-client.ts
│   ├── context-builder.ts
│   └── providers/
├── ui/                   # User interface
│   ├── panel-controller.ts
│   ├── editor-decorations.ts
│   └── webview/
└── utils/                # Utilities
    ├── logger.ts
    └── config.ts
```

---

## 📋 Roadmap

### Phase 1: Static Walkthrough (In Progress)
- [x] Project setup
- [ ] Code selection handling
- [ ] AI step generation
- [ ] Walkthrough panel UI
- [ ] Q&A functionality

### Phase 2: Debug Integration
- [ ] Debug session detection
- [ ] Variable value display
- [ ] Debugger step sync
- [ ] Runtime-aware explanations

### Phase 3: Polish & Beta
- [ ] Performance optimization
- [ ] Error handling improvements
- [ ] User feedback integration
- [ ] Marketplace release

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting PRs.

### Quick Start for Contributors
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [VS Code Extension API](https://code.visualstudio.com/api)
- AI powered by [Anthropic Claude](https://www.anthropic.com/)
- Inspired by [CodeTour](https://github.com/microsoft/codetour)

---

## 📞 Contact

- **Author:** Matt Kruczek
- **GitHub:** [@MCKRUZ](https://github.com/MCKRUZ)
- **Issues:** [GitHub Issues](https://github.com/MCKRUZ/CodeWalk/issues)

---

*Made with ❤️ for developers who want to understand code better*
