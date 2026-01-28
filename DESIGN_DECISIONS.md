# Design Decisions Reference

Quick reference for design choices and their rationale.

## Color Philosophy

### Why Not Red/Green?
- **Red** = Danger, loss, panic (creates anxiety)
- **Green** = Money, greed, "casino" vibes
- **Better**: Emerald-500 for positive (calm, growth), Gray-500 for negative (neutral, factual)

### Why Blue Accent?
- **Blue** = Trust, stability, professionalism (Stripe, Apple, Linear)
- Not aggressive or emotional
- Works for both light and dark modes

## Typography

### System Fonts
- **Why**: Trustworthy, fast-loading, native feel
- **Stack**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **No custom fonts**: Reduces load time, feels more native

### Font Sizes
- **Price Display**: 48-60px (hero size)
- **Headings**: 24-36px (clear hierarchy)
- **Body**: 16px (readable)
- **Labels**: 12-14px (secondary info)

## Spacing

### Generous Whitespace
- **Card padding**: 24px (1.5rem) - breathing room
- **Section spacing**: 48px (3rem) - clear separation
- **Component gaps**: 16px (1rem) - related items grouped

### Why More Space?
- Reduces cognitive load
- Easier to scan
- Feels premium (Apple, Stripe style)
- Mobile-friendly (thumb navigation)

## Component Patterns

### Cards vs Tables
- **Tables**: Dense, spreadsheet-like, overwhelming
- **Cards**: Scannable, mobile-friendly, modern
- **Result**: Each coin gets visual space, easier to understand

### Progressive Disclosure
- **Default**: Essential info only (price, change, trend)
- **One tap**: Key metrics (market cap, volume)
- **Expandable**: Advanced metrics (supply, FDV, ATH/ATL)

### Plain Language
- **"Market Cap"** → "Total value of all coins"
- **"24h Volume"** → "Traded in the last 24 hours"
- **"FDV"** → "Fully Diluted Valuation" + explanation
- **"ATH"** → "All-Time High" + "Highest price ever"

## Mobile-First

### Breakpoints
- **Mobile**: < 640px (single column)
- **Tablet**: 640-1024px (2 columns)
- **Desktop**: > 1024px (3 columns)

### Touch Targets
- Minimum 44x44px (Apple HIG standard)
- Generous padding on buttons
- No tiny clickable areas

### Layout
- Vertical stacking on mobile
- Horizontal on desktop
- No horizontal scroll

## Micro-interactions

### Hover States
- Subtle shadow increase
- Border color change
- Opacity transitions
- **Not**: Color changes, size changes (too distracting)

### Loading States
- Skeleton loaders (not spinners)
- Maintains layout structure
- Reduces perceived load time

### Transitions
- 200ms duration (feels instant)
- Ease-in-out (natural)
- Only on interactive elements

## Information Hierarchy

### Priority 1 (Always Visible)
1. Coin name + symbol
2. Current price (large)
3. 24h change (with context)
4. Visual trend indicator

### Priority 2 (One Tap)
1. Market cap (with explanation)
2. Volume (with explanation)
3. Price chart

### Priority 3 (Expandable)
1. Supply metrics
2. Historical data
3. Advanced stats

## Accessibility

### Color Contrast
- Text: WCAG AA compliant (4.5:1 minimum)
- Interactive: Clear focus states
- Not color-only indicators (use icons + text)

### Keyboard Navigation
- All interactive elements focusable
- Logical tab order
- Clear focus indicators

### Screen Readers
- Semantic HTML
- ARIA labels where needed
- Alt text for images
- Descriptive link text

## Performance

### Image Optimization
- Lazy loading for coin images
- WebP format where supported
- Appropriate sizes (not oversized)

### Code Splitting
- Route-based splitting
- Lazy load heavy components
- Chart libraries loaded on demand

### Caching
- API responses cached
- Static assets cached
- Service worker for offline (future)

## Testing Priorities

1. **Beginner users** - Can they understand without help?
2. **Mobile users** - Does it work on small screens?
3. **Accessibility** - Can it be used with keyboard/screen reader?
4. **Performance** - Does it load quickly?
5. **Dark mode** - Does it look good in both themes?

## Common Mistakes to Avoid

### ❌ Don't
- Use red for negative (anxiety-inducing)
- Show all data at once (overwhelming)
- Use jargon without explanation
- Make tables on mobile
- Use tiny fonts
- Skip loading states
- Ignore dark mode

### ✅ Do
- Use calm colors
- Progressive disclosure
- Plain language + tooltips
- Card-based layouts
- Generous spacing
- Skeleton loaders
- Test both themes

## Inspiration

- **Apple**: Clean, minimal, generous spacing
- **Stripe**: Professional, trustworthy, clear
- **Linear**: Modern, fast, delightful
- **Coinbase**: Beginner-friendly, educational

## Success Metrics

After redesign, measure:
- Time to find a coin (should decrease)
- Bounce rate (should decrease)
- Mobile usage (should increase)
- User satisfaction (should increase)
- Support questions (should decrease)

---

**Remember**: Every design decision should answer: "Does this make it easier for a beginner to understand?"
