import { FriendPreferencesForm } from "@/components/friend-preferences-form";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Guilted</h1>
        <p className="text-lg text-center text-muted-foreground">
          Find personalized, creative, and homemade gift ideas for your friends
        </p>
      </div>

      <div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto">
        <>
          <FriendPreferencesForm />
        </>
      </div>
    </main>
  );
}
