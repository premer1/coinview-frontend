import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronRightIcon, 
  BookOpenIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

/**
 * Learn - Educational content for crypto beginners
 * Clean, expandable article layout with sidebar navigation
 */
const Learn = () => {
  const { category } = useParams();
  const [expandedArticles, setExpandedArticles] = useState({});

  const categories = [
    {
      id: 'getting-started',
      title: 'Kom i gang',
      description: 'Lær grunnleggende om kryptovaluta',
      icon: '🚀',
      articles: [
        {
          id: 'what-is-crypto',
          title: 'Hva er kryptovaluta?',
          preview: 'En enkel forklaring av digital penger og hvordan det fungerer.',
          content: `Kryptovaluta er digital penger som kun eksisterer på nettet. I motsetning til tradisjonelle penger (som dollar eller euro), er det ikke kontrollert av banker eller myndigheter.

**Viktige punkter:**
- Det er desentralisert (ingen enkelt myndighet kontrollerer det)
- Transaksjoner registreres på en offentlig hovedbok kalt en blockchain
- Du kan sende det til hvem som helst, hvor som helst, når som helst
- Det er sikret med kryptografi (avansert matematikk)

Tenk på det som digital kontanter som du kan sende over internett. Den mest kjente kryptovalutaen er Bitcoin, men det finnes tusenvis av andre.`
        },
        {
          id: 'how-prices-work',
          title: 'Hvordan fungerer kryptopriser?',
          preview: 'Forstå hva som får prisene til å gå opp og ned.',
          content: `Crypto prices change based on supply and demand - just like stocks or commodities.

**What affects prices:**
- **Demand**: More people wanting to buy = price goes up
- **Supply**: More coins available = price may go down
- **News**: Major announcements can affect prices
- **Market sentiment**: How people feel about crypto overall

**Important**: Prices are very volatile (they change quickly). A coin can go up 10% one day and down 15% the next. This is normal for crypto, but it means you should only invest what you can afford to lose.`
        },
        {
          id: 'understanding-charts',
          title: 'Forstå prisdiagrammer',
          preview: 'Lær å lese diagrammene og forstå trender.',
          content: `Price charts show how a cryptocurrency's value has changed over time.

**Basic elements:**
- **Line going up**: Price is increasing (green/emerald color)
- **Line going down**: Price is decreasing (gray color)
- **Time periods**: You can view by hour, day, week, month, or year

**Common terms:**
- **ATH (All-Time High)**: The highest price ever reached
- **ATL (All-Time Low)**: The lowest price ever reached
- **24h Change**: How much the price changed in the last 24 hours
- **Market Cap**: Total value of all coins (price × supply)

**Remember**: Past performance doesn't guarantee future results. Charts show history, not predictions.`
        }
      ]
    },
    {
      id: 'wallets',
      title: 'Lommebøker',
      description: 'Hvordan lagre kryptovalutaen din trygt',
      icon: '👛',
      articles: [
        {
          id: 'what-is-wallet',
          title: 'Hva er en kryptolommebok?',
          preview: 'En enkel guide til å lagre kryptovalutaen din.',
          content: `A crypto wallet is like a digital bank account for your cryptocurrency. It stores your coins and lets you send and receive them.

**Two main parts:**
1. **Public address**: Like your account number - you share this to receive coins
2. **Private key**: Like your password - NEVER share this with anyone

**Types of wallets:**
- **Hot wallets**: Connected to the internet (easier to use, less secure)
- **Cold wallets**: Offline storage (more secure, harder to use)

**Important**: If you lose your private key or seed phrase, you lose access to your coins forever. Always back up your wallet!`
        },
        {
          id: 'seed-phrases',
          title: 'Sædfraser forklart',
          preview: 'Forstå den viktigste sikkerhetsfunksjonen.',
          content: `A seed phrase (also called a recovery phrase) is a list of 12-24 words that can restore your wallet if you lose access.

**Why it matters:**
- If you lose your phone or computer, you can use your seed phrase to recover your wallet
- Anyone who has your seed phrase can access your coins
- You should NEVER share it with anyone or store it online

**Best practices:**
- Write it down on paper (not on your computer)
- Store it in a safe place (like a safe or safety deposit box)
- Consider making a backup copy in a different location
- Never take photos of it or store it in cloud storage

**Remember**: Your seed phrase IS your wallet. Protect it like you would protect cash.`
        },
        {
          id: 'non-custodial',
          title: 'Ikke-forvaltede lommebøker',
          preview: 'Forstå hvem som kontrollerer myntene dine.',
          content: `A non-custodial wallet means YOU control your private keys and coins. No one else can access them.

**Non-custodial (you control):**
- You have the private keys
- You're responsible for security
- No one can freeze your account
- If you lose access, you lose your coins

**Custodial (exchange controls):**
- The exchange holds your coins
- They control your private keys
- They can freeze your account
- Easier to use, but less control

**Which to choose?**
- Beginners: Start with a custodial wallet (like Coinbase) for small amounts
- Advanced: Use non-custodial for larger amounts or more control

**Remember**: "Not your keys, not your coins" - if you don't control the keys, you don't truly own the coins.`
        }
      ]
    },
    {
      id: 'trading',
      title: 'Handelsgrunnlag',
      description: 'Lær hvordan du kjøper og selger kryptovaluta',
      icon: '📈',
      articles: [
        {
          id: 'buy-vs-sell',
          title: 'Kjøp vs Selg',
          preview: 'Forstå grunnleggende handel.',
          content: `Trading cryptocurrency means buying and selling coins to make a profit (or minimize losses).

**Buying:**
- You exchange your regular money (USD, NOK, etc.) for cryptocurrency
- You hope the price goes up so you can sell for more later
- Example: Buy Bitcoin at $40,000, sell at $45,000 = $5,000 profit

**Selling:**
- You exchange your cryptocurrency back to regular money
- You might sell because the price went up (profit) or down (cutting losses)
- You can also sell to buy a different cryptocurrency

**Important concepts:**
- **Fees**: Every trade has fees (usually 0.1-2%)
- **Taxes**: In most countries, trading profits are taxable
- **Timing**: No one knows when prices will go up or down

**Remember**: Only trade with money you can afford to lose. Crypto is very volatile.`
        },
        {
          id: 'risk-management',
          title: 'Risikostyring',
          preview: 'Hvordan beskytte deg selv når du handler.',
          content: `Risk management is about protecting yourself from big losses.

**Key strategies:**
1. **Only invest what you can afford to lose**: Never use money you need for bills or emergencies
2. **Diversify**: Don't put all your money in one coin
3. **Set stop-losses**: Automatically sell if price drops too much
4. **Don't FOMO**: Don't buy just because everyone else is buying
5. **Take profits**: Sell some when you're up to lock in gains

**Common mistakes:**
- Investing more than you can afford
- Chasing "hot" coins without research
- Not having an exit strategy
- Letting emotions drive decisions

**Remember**: Most traders lose money. Only invest what you're comfortable losing completely.`
        }
      ]
    },
    {
      id: 'risks',
      title: 'Risiko & Sikkerhet',
      description: 'Hold deg trygg og unngå vanlige svindler',
      icon: '⚠️',
      articles: [
        {
          id: 'common-scams',
          title: 'Vanlige svindler å unngå',
          preview: 'Lær å gjenkjenne og unngå kryptosvindler.',
          content: `Scammers target crypto users because transactions are often irreversible. Here are common scams:

**Phishing:**
- Fake websites that look like real exchanges
- Always check the URL carefully
- Never enter your seed phrase on any website

**Pump and dump:**
- Scammers promote a coin, price goes up, they sell, price crashes
- If someone promises guaranteed returns, it's likely a scam

**Fake giveaways:**
- "Send 1 ETH, get 2 ETH back" - these are always scams
- Legitimate projects never ask you to send coins first

**Impersonation:**
- Scammers pretending to be support staff or influencers
- Always verify through official channels

**How to protect yourself:**
- Never share your seed phrase or private keys
- Double-check URLs and email addresses
- Be skeptical of "too good to be true" offers
- Use reputable exchanges and wallets

**Remember**: If it sounds too good to be true, it probably is.`
        },
        {
          id: 'rug-pulls',
          title: 'Rug pulls forklart',
          preview: 'Hva de er og hvordan du oppdager dem.',
          content: `A "rug pull" is when developers abandon a project and take all the money, leaving investors with worthless tokens.

**How it works:**
1. Developers create a new token
2. They promote it heavily (often on social media)
3. People invest, price goes up
4. Developers sell all their tokens and disappear
5. Price crashes to zero

**Red flags:**
- Anonymous developers
- No locked liquidity
- Promises of guaranteed returns
- Aggressive marketing
- New tokens with no real use case

**How to avoid:**
- Research the team behind the project
- Check if liquidity is locked
- Look for audits and verification
- Be cautious with new tokens
- Only invest what you can afford to lose

**Remember**: Most new tokens fail. Stick to established projects unless you're very experienced.`
        },
        {
          id: 'liquidity-risks',
          title: 'Likviditetsrisiko',
          preview: 'Forstå når du kanskje ikke kan selge.',
          content: `Liquidity means how easily you can buy or sell a coin without affecting its price.

**High liquidity:**
- Many buyers and sellers
- Easy to buy/sell quickly
- Price doesn't change much when you trade
- Examples: Bitcoin, Ethereum

**Low liquidity:**
- Few buyers and sellers
- Hard to sell quickly
- Your trade might move the price
- Examples: New or small tokens

**Why it matters:**
- If liquidity is too low, you might not be able to sell when you want
- Low liquidity = higher risk of price manipulation
- Small trades can cause big price swings

**How to check:**
- Look at 24h trading volume (higher = more liquid)
- Check order book depth (if available)
- Be cautious with coins that have very low volume

**Remember**: Always check liquidity before investing, especially in smaller coins.`
        }
      ]
    },
    {
      id: 'blockchain',
      title: 'Blockchain-grunnlag',
      description: 'Forstå teknologien bak krypto',
      icon: '⛓️',
      articles: [
        {
          id: 'what-is-blockchain',
          title: 'Hva er blockchain?',
          preview: 'En enkel forklaring av teknologien.',
          content: `Blockchain is the technology that makes cryptocurrency possible. Think of it as a digital ledger that records all transactions.

**How it works:**
- Transactions are grouped into "blocks"
- Each block is connected to the previous one (like a chain)
- The ledger is copied across thousands of computers
- No single person or company controls it

**Key features:**
- **Transparent**: Anyone can view the ledger
- **Secure**: Very hard to change past transactions
- **Decentralized**: No single point of failure
- **Immutable**: Once recorded, transactions can't be easily changed

**Real-world analogy:**
Imagine a shared Google Doc that everyone can see and add to, but no one can delete or edit past entries. That's similar to how blockchain works.

**Remember**: You don't need to understand blockchain to use cryptocurrency, but it helps to know the basics.`
        },
        {
          id: 'how-transactions-work',
          title: 'Hvordan transaksjoner fungerer',
          preview: 'Forstå hvordan mynter beveger seg fra en lommebok til en annen.',
          content: `When you send cryptocurrency, here's what happens:

**The process:**
1. You create a transaction (send 0.1 BTC to someone)
2. The transaction is broadcast to the network
3. Miners/validators verify the transaction
4. The transaction is added to a block
5. The block is added to the blockchain
6. The recipient receives the coins

**Key points:**
- Transactions are usually irreversible (once confirmed)
- You pay a small fee (gas fee) to process the transaction
- Confirmation time varies (Bitcoin: ~10 minutes, Ethereum: ~15 seconds)
- You need the recipient's wallet address (like an account number)

**Security:**
- Transactions are secured by cryptography
- You need your private key to send coins
- Once confirmed, transactions can't be reversed (usually)

**Remember**: Always double-check the recipient address. If you send to the wrong address, you can't get it back.`
        }
      ]
    }
  ];

  const selectedCategory = category 
    ? categories.find(cat => cat.id === category) 
    : null;

  const toggleArticle = (articleId) => {
    setExpandedArticles(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
  };

  // Category overview page
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4">
              Lær om kryptovaluta
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start din kryptoreise med tydelige, nybegynnervenlige guider. Ingen sjargong, bare praktisk kunnskap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/learn/${cat.id}`}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {cat.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {cat.description}
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                  <span>{cat.articles.length} artikler</span>
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Klar til å teste kunnskapen din?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Etter å ha lest disse artiklene, ta våre quizzer for å se hvor mye du har lært.
                </p>
                <Link
                  to="/quizzes"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Ta en quiz →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Category detail page
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            to="/learn"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Lær
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 dark:text-white">{selectedCategory?.title}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <div className="text-4xl mb-4">{selectedCategory?.icon}</div>
          <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4">
            {selectedCategory?.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {selectedCategory?.description}
          </p>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {selectedCategory?.articles.map((article, index) => (
            <div
              key={article.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleArticle(article.id)}
                className="w-full text-left p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {index + 1}
                      </span>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {article.title}
                      </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {article.preview}
                    </p>
                  </div>
                  <ChevronRightIcon
                    className={`h-5 w-5 text-gray-400 ml-4 transition-transform flex-shrink-0 ${
                      expandedArticles[article.id] ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </button>

              {expandedArticles[article.id] && (
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    {article.content.split('\n\n').map((paragraph, i) => {
                      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return (
                          <h3 key={i} className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                            {paragraph.replace(/\*\*/g, '')}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('- **')) {
                        const items = paragraph.split('\n').filter(Boolean);
                        return (
                          <ul key={i} className="list-disc list-inside space-y-2 mt-4 mb-4 text-gray-700 dark:text-gray-300">
                            {items.map((item, j) => (
                              <li key={j}>{item.replace(/^-\s*\*\*|\*\*/g, '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={i} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="mt-12 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Hva er neste?
          </h3>
          <div className="space-y-3">
            {categories
              .filter(cat => cat.id !== category)
              .slice(0, 2)
              .map((cat) => (
                <Link
                  key={cat.id}
                  to={`/learn/${cat.id}`}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow transition-shadow"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {cat.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {cat.description}
                    </div>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </Link>
              ))}
            <Link
              to="/quizzes"
              className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:shadow transition-shadow"
            >
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Test kunnskapen din
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Ta en quiz for å se hvor mye du har lært
                </div>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
