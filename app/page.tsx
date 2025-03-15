import ChatContainer from "@/components/chat-container";
import ResourcesContainer from "@/components/resources-container";

export default function Page() {
  return (
    <main className="flex h-screen w-full">
      <div className="w-1/2 h-full">
        <ChatContainer />
      </div>
      <div className="w-1/2 h-full">
        <ResourcesContainer />
      </div>
    </main>
  );
}
