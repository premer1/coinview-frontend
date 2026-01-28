# Navigation Redesign: Beginner-Friendly Structure

## Navigation Flow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVBAR                                │
├─────────────────────────────────────────────────────────────┤
│  Coins  │  Learn  │  Quizzes  │  Portfolio  │  Tools  │ ⚙️  │
└─────────────────────────────────────────────────────────────┘
```

## Main Sections

### 1. Coins
**Purpose**: Browse and search all cryptocurrencies
**Route**: `/` or `/coins`
**Layout**: Card-based grid (existing design)
**Features**:
- Search bar
- Currency selector
- Top coins list
- Individual coin detail pages

---

### 2. Learn
**Purpose**: Educational content for beginners
**Route**: `/learn`
**Layout**: Article list with expandable content

**Structure**:
```
Learn
├── Getting Started
│   ├── What is cryptocurrency?
│   ├── How do crypto prices work?
│   └── Understanding charts
├── Wallets
│   ├── What is a wallet?
│   ├── Hot vs Cold wallets
│   ├── Seed phrases explained
│   └── Non-custodial wallets
├── Trading Basics
│   ├── Buy vs Sell
│   ├── Market orders
│   ├── Understanding fees
│   └── Risk management
├── Risks & Safety
│   ├── Common scams
│   ├── Rug pulls explained
│   ├── Liquidity risks
│   └── How to stay safe
└── Blockchain Basics
    ├── What is blockchain?
    ├── How transactions work
    └── Smart contracts
```

**UX Pattern**:
- Sidebar navigation (desktop) / Accordion (mobile)
- Article cards with preview
- Expandable sections within articles
- Progress tracking (optional)
- "Next: Quizzes" CTA at end of each section

---

### 3. Quizzes / Readiness Tests
**Purpose**: Interactive knowledge checks
**Route**: `/quizzes`
**Layout**: Quiz list → Individual quiz → Results

**Quiz Types**:

#### Beginner Check
- **Focus**: Charts, prices, basic concepts
- **Questions**: 8-10 questions
- **Topics**: Reading price charts, understanding % changes, market cap basics
- **Pass Score**: 70%

#### Wallet Readiness
- **Focus**: Seed phrases, wallet security
- **Questions**: 10-12 questions
- **Topics**: Seed phrase storage, non-custodial vs custodial, backup strategies
- **Pass Score**: 80% (security-critical)

#### Meme Coin Readiness
- **Focus**: Risk awareness, liquidity, rug pulls
- **Questions**: 10-12 questions
- **Topics**: Liquidity pools, contract verification, red flags
- **Pass Score**: 75%

#### Explorer Test
- **Focus**: Using Etherscan/block explorers
- **Questions**: 8-10 questions (interactive)
- **Topics**: Finding token holders, reading transactions, contract verification
- **Pass Score**: 70%

**Quiz Flow**:
```
Quiz List → Select Quiz → 
  → Introduction (what you'll learn) →
  → Questions (one at a time) →
  → Progress bar →
  → Results page →
  → Recommendations (what to learn next)
```

**UX Pattern**:
- One question per screen (reduces overwhelm)
- Progress indicator (Question 3 of 10)
- "I'm not sure" option (no penalty, shows explanation)
- Immediate feedback after each question
- Final score with breakdown
- Personalized recommendations

---

### 4. Portfolio / Favorites
**Purpose**: Watchlist and price tracking
**Route**: `/portfolio`
**Layout**: Tabbed interface

**Tabs**:
- **Watchlist**: Saved coins with price alerts
- **Favorites**: Quick access to favorite coins
- **Price Alerts**: Set alerts for price changes

**Features**:
- Add/remove coins
- Set price alerts (above/below threshold)
- View portfolio value (if connected wallet)
- Price change notifications

---

### 5. Tools
**Purpose**: Utility tools for crypto users
**Route**: `/tools`
**Layout**: Grid of tool cards

**Tools**:
- **Price Converter**: BTC → USD/NOK (existing)
- **Gas Tracker**: Ethereum gas prices
- **ATH/ATL Tracker**: Track all-time highs/lows
- **Portfolio Calculator**: Calculate portfolio value
- **APY Calculator**: Calculate yield/returns
- **Token Unlock Tracker**: Track token unlock schedules

---

## Mobile Navigation

### Bottom Navigation Bar (Mobile)
For thumb-friendly access on mobile:

```
┌─────────────────────────────────────┐
│  [Coins] [Learn] [Quizzes] [More]  │
└─────────────────────────────────────┘
```

"More" expands to:
- Portfolio
- Tools
- Settings

### Desktop Navigation
Horizontal navbar with dropdowns for sub-sections:
- **Learn** → Dropdown: Getting Started, Wallets, Trading, Risks, Blockchain
- **Quizzes** → Dropdown: All quizzes listed
- **Tools** → Dropdown: All tools listed

---

## Progressive Disclosure Strategy

### Level 1: Main Navigation
Show only top-level sections (Coins, Learn, Quizzes, Portfolio, Tools)

### Level 2: Section Pages
Show overview + sub-sections (e.g., Learn shows article categories)

### Level 3: Content Pages
Show actual content (article, quiz, tool)

### Level 4: Advanced Details
Expandable sections, tooltips, "Learn more" links

---

## Onboarding Flow

**First Visit**:
1. Welcome message: "New to crypto? Start here →"
2. Quick tour: "Learn → Quizzes → Tools"
3. Optional: Set up favorites/watchlist

**Returning Users**:
- Show last visited section
- Quick access to favorites
- Progress indicators for quizzes/learning

---

## Navigation Principles

1. **Never more than 3 clicks** to reach any content
2. **Clear labels** - no jargon in navigation
3. **Visual hierarchy** - most important sections first
4. **Consistent placement** - same location across pages
5. **Mobile-first** - thumb-friendly, large touch targets
6. **Progressive enhancement** - basic nav works, enhanced on desktop

---

## Success Metrics

- **Time to find content**: < 10 seconds
- **Navigation clicks**: Average < 2 clicks to destination
- **Mobile usage**: 60%+ of users on mobile
- **Learn → Quiz conversion**: Track users who complete Learn then take Quiz
- **Return rate**: Users coming back to Learn/Quizzes sections
