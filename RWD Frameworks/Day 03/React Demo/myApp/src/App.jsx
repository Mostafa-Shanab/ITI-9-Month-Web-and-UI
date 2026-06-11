import ThemeToggle from "./ThemeToggle";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <ThemeToggle />
      <h1 className="text-black dark:text-white">
        React + Tailwind with Dark Mode
      </h1>
    </div>
  );
}

export default App;
