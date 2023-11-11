import "./index.css";
import { AnimatedText } from "./AnimatedText";


function App() {
  return (
    <main className="bg-gray-900">
      <div className="mx-auto max-w-6xl pt-14 text-white">
        <section className="flex min-h-[150vh] flex-col items-center justify-center">
          <AnimatedText
            el="h2"
            text={[
              "This is written on",
              "a typing machine. Tick tick",
              "tick tack tack...",
            ]}
            className="text-4xl"
            repeatDelay={10000}
          />
        </section>
      </div>
    </main>
  );
}




export default App;