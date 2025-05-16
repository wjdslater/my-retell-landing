import IntegratedVoiceWidget from './components/IntegratedVoiceWidget';
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between py-6 px-4">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-pink-600 rounded-md flex items-center justify-center mr-2">
            <span className="text-white font-bold text-xs">AI</span>
          </div>
          <h1 className="text-xl font-bold">SalesAPE.ai</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="border border-pink-600 text-pink-600 px-6 py-2 rounded-full hover:bg-pink-600 hover:text-white transition-all"
          >
            Talk to Sales
          </Link>
          <button className="text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="w-32 h-32 bg-zinc-800 rounded-full overflow-hidden relative mb-10 flex items-center justify-center">
          <svg className="w-16 h-16 text-pink-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="currentColor"
            />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-wide">
          TRY IT OUT <span className="text-pink-600">NOW</span>
        </h1>
        
        {/* Replace CallComponent with IntegratedVoiceWidget */}
        <IntegratedVoiceWidget />
        
        <div className="mb-16">
        
          <div className="space-y-3 text-center">
            <p>
              <span className="text-pink-600 font-bold mr-2">1 -</span>
              Click the button above to start a conversation with Sophie, our AI sales agent
            </p>
            <p>
              <span className="text-pink-600 font-bold mr-2">2 -</span>
              Let Sophie prove how good she is by roleplaying as a salesperson on your team
            </p>
            <span className="text-pink-600 font-bold mr-2">3 -</span>
              If you like what you hear, or to learn more, book a call with our team below
          </div>
        </div>
      </main>

      <div className="border-t border-zinc-800 w-full"></div>

      {/* Bottom CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 md:mb-0 leading-tight">
              GET <span className="text-pink-600">MORE</span> AND <span className="text-pink-600">BETTER</span>
              <br />
              QUALIFIED SALES CALLS WITH SalesAPE
            </h2>
            <Link
              href="/contact"
              className="bg-pink-600 text-white px-8 py-3 rounded-md hover:bg-pink-700 transition-all text-lg font-medium"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-zinc-800 w-full"></div>

      {/* Footer */}
      <footer className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link href="/" className="flex items-center mb-4">
                <div className="h-8 w-8 bg-pink-600 rounded-md flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-xs">AI</span>
                </div>
                <h1 className="text-xl font-bold">SalesAPE</h1>
              </Link>
              <p className="text-sm text-gray-500">© SalesAPE.ai {new Date().getFullYear()}</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Get in Touch</h3>
              <p className="text-gray-400">hello@salesape.ai</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">More</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}