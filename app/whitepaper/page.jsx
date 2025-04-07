export default function WhitepaperPage() {
    return (
      <div className="min-h-screen mt-16 px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          <header className="text-center">
            <h1 className="text-5xl font-extrabold text-blue-800 mb-4">Angler Whitepaper</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A community-first, roleplay-based Web3 social platform redefining expression with just text, stickers, and GIFs.
            </p>
          </header>
  
          <section>
            <h2 className="text-3xl font-bold text-blue-700 mb-2">Introduction</h2>
            <p className="text-gray-700">
              Angler is a decentralized, roleplay-focused social media platform where users interact using only text, stickers, and GIFs. Built with blockchain and Web3 principles, Angler brings back imagination and storytelling into everyday online conversations.
            </p>
          </section>
  
          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">Vision</h2>
              <p className="text-gray-700">
                To build a digital society where anonymity, creativity, and community thrive—fueled by roleplay narratives and minimalist interaction.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">Mission</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>Provide a safe, open, and creative space for text-based roleplay.</li>
                <li>Build an economy that rewards content and community engagement.</li>
                <li>Utilize blockchain to ensure fairness, transparency, and ownership.</li>
              </ul>
            </div>
          </section>
  
          <section>
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Tokenomics</h2>
            <p className="text-gray-700 mb-4">Total Supply: <strong>500,000,000 $ANGL</strong></p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Community Incentives & Public Programs:</strong> 40%</li>
              <li><strong>Exchange Liquidity:</strong> 25%</li>
              <li><strong>Team & Core Contributors:</strong> 12%</li>
              <li><strong>Ecosystem Development:</strong> 10%</li>
              <li><strong>Marketing & Strategic Partnerships:</strong> 8%</li>
              <li><strong>Reserve Fund:</strong> 5%</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Roadmap</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-blue-600">Q1 2025</h3>
                <ul className="list-disc list-inside">
                  <li>Launch of Waitlist</li>
                  <li>Big Event for Waitlisters</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-600">Q2 2025</h3>
                <ul className="list-disc list-inside">
                  <li>Launch of MVP</li>
                  <li>Sticker & Persona NFT Marketplace</li>
                  <li>Airdrop for early users</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-600">Q3 2025</h3>
                <ul className="list-disc list-inside">
                  <li>Governance Portal</li>
                  <li>Listing on DEXes</li>
                  <li>Wallet Integration</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-600">Q4 2025</h3>
                <ul className="list-disc list-inside">
                  <li>CEX Listings</li>
                  <li>Marketing Blitz</li>
                  <li>Community Programs & RP Tournaments</li>
                </ul>
              </div>
            </div>
          </section>
  
          <section>
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Conclusion</h2>
            <p className="text-gray-700">
              Angler is the answer for people tired of the overstimulation of mainstream social media. We believe in simplicity, creativity, and the power of roleplay as a social layer of the future. With $ANGL, users can not only shape their experience but also own it.
            </p>
            <blockquote className="mt-4 italic text-blue-600 border-l-4 border-blue-300 pl-4">
              "Not everything needs to be seen. Some stories are better felt."
            </blockquote>
          </section>
        </div>
      </div>
    );
  }