# German Bureaucracy Assistant

A Next.js application designed to help users navigate German bureaucracy by providing an AI-powered chat interface and access to relevant resources and forms.

## 🌟 Features

- **AI Chat Assistant**: Interactive chat interface to ask questions about German bureaucracy
- **Resource Library**: Collection of forms, guides, and documents related to German bureaucratic processes
- **PDF Viewer**: Built-in PDF viewer for seamless document access
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: Custom components with Tailwind CSS
- **PDF Viewing**: Nutrient SDK for document viewing
- **Markdown Rendering**: React Markdown for chat message formatting

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tech_munich_ai_hack.git
   cd tech_munich_ai_hack
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

### Running the Development Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
pnpm build
# or
npm run build
```

## 📱 Usage

1. **Chat Interface**: Ask questions about German bureaucracy in the chat panel
2. **Resource Browser**: Browse through available forms and guides in the resources panel
3. **Document Viewer**: Click on a resource to view it in the built-in PDF viewer

## 🧩 Project Structure

- `/app`: Next.js app directory containing pages and layouts
- `/components`: React components including chat interface and resource browser
- `/public`: Static assets and Nutrient viewer files
- `/lib`: Utility functions and shared code


## 🙏 Acknowledgements

- [Nutrient SDK](https://www.nutrient.io/) for PDF viewing capabilities
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling