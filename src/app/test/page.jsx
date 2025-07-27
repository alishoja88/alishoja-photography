export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Test Page</h1>
        <p className="text-xl">Docker is working perfectly!</p>
        <p className="text-lg mt-4">Current time: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
} 