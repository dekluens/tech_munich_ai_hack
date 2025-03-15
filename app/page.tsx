import ChatContainer from "@/components/chat-container";
import ResourcesContainer from "@/components/resources-container";

export default function Page() {
  return (
    <main className="flex h-screen w-full">
      <div className="w-1/2 h-full p-4">
        <ChatContainer />
      </div>
      <div className="w-1/2 h-full p-4">
        <ResourcesContainer />
      </div>
    </main>
  );
}
