import { AIChat } from '../components/AIChat';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Portfolio AI Chat Starter
        </h1>
        <p className="text-sm text-neutral-600">
          This is a minimal starter kit to add an AI chat assistant to your UX
          portfolio. The floating button in the corner opens the chat.
        </p>
        <p className="text-xs text-neutral-500">
          Connect this project to your own Supabase database + Groq key, then
          embed the chat widget into Framer, Webflow, or any other portfolio
          stack.
        </p>
      </div>

      {/* Floating chat widget */}
      <AIChat />
    </main>
  );
}