# Internationalization (i18n) Best Practices

This document outlines recommendations for making the CoinView application fully translatable and ready for multiple languages.

## Current State

The application has been translated to Norwegian, but text is currently hardcoded in components. To make it truly i18n-ready, consider implementing the following:

## Recommended Approach: React i18next

### 1. Install Dependencies

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### 2. Project Structure

```
src/
  locales/
    en/
      common.json
      coins.json
      learn.json
      quizzes.json
      portfolio.json
      tools.json
    no/
      common.json
      coins.json
      learn.json
      quizzes.json
      portfolio.json
      tools.json
```

### 3. Translation File Structure

**Example: `src/locales/no/common.json`**

```json
{
  "nav": {
    "coins": "Mynter",
    "learn": "Lær",
    "quizzes": "Quizzer",
    "portfolio": "Portefølje",
    "tools": "Verktøy"
  },
  "common": {
    "loading": "Laster...",
    "error": "Feil",
    "back": "Tilbake",
    "next": "Neste",
    "previous": "Forrige",
    "save": "Lagre",
    "cancel": "Avbryt"
  },
  "currency": {
    "usd": "Amerikansk dollar",
    "nok": "Norsk krone"
  }
}
```

### 4. Setup i18n Configuration

**`src/i18n.js`**

```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import noCommon from './locales/no/common.json';
// Import other translation files...

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        // ... other namespaces
      },
      no: {
        common: noCommon,
        // ... other namespaces
      },
    },
    fallbackLng: 'no', // Default to Norwegian
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
```

### 5. Component Usage

**Before:**
```jsx
<h1>Track crypto prices, simply</h1>
```

**After:**
```jsx
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation('coins');
  
  return <h1>{t('home.title')}</h1>;
}
```

### 6. Translation with Variables

**Translation file:**
```json
{
  "favorites": {
    "count": "Dine favorittmynter ({{count}})"
  }
}
```

**Component:**
```jsx
{t('favorites.count', { count: favoriteCoins.length })}
```

### 7. Pluralization

**Translation file:**
```json
{
  "articles": {
    "count_one": "{{count}} artikkel",
    "count_other": "{{count}} artikler"
  }
}
```

**Component:**
```jsx
{t('articles.count', { count: articles.length })}
```

## Key Principles

### 1. Extract All Strings
- Move all user-facing text to translation files
- Keep technical terms and proper nouns in English if commonly used
- Use namespaces to organize translations by feature

### 2. Use Translation Keys, Not Values
- Keys should be descriptive: `coins.home.title` not `title1`
- Group related translations: `coins.home.*`, `coins.detail.*`

### 3. Handle Dynamic Content
- For API content (coin descriptions), consider:
  - Using the API's localization if available (CoinGecko supports multiple languages)
  - Storing translations in your database
  - Using a translation service for dynamic content

### 4. Date and Number Formatting
- Use locale-aware formatting:
```javascript
// Norwegian number format
new Intl.NumberFormat('no-NO', {
  style: 'currency',
  currency: 'NOK'
}).format(price)

// Date formatting
new Intl.DateTimeFormat('no-NO').format(date)
```

### 5. RTL Support (Future)
- If adding Arabic/Hebrew support, use CSS logical properties
- Test layout with longer translations

### 6. Testing
- Test with different text lengths
- Verify all strings are translated
- Check for hardcoded strings in code
- Test date/number formatting

## Migration Strategy

### Phase 1: Setup Infrastructure
1. Install i18next dependencies
2. Create translation file structure
3. Setup i18n configuration
4. Add language selector component

### Phase 2: Migrate Components
1. Start with most visible components (Navbar, Home)
2. Move strings to translation files
3. Update components to use `useTranslation`
4. Test thoroughly

### Phase 3: Complete Migration
1. Migrate all remaining components
2. Add missing translations
3. Implement language persistence (localStorage)
4. Add language switcher to UI

### Phase 4: Content Translation
1. Translate Learn section articles
2. Translate quiz questions and answers
3. Consider professional translation for accuracy
4. Add context comments for translators

## Language Switcher Component

```jsx
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
    >
      <option value="no">Norsk</option>
      <option value="en">English</option>
    </select>
  );
}
```

## Additional Considerations

### 1. SEO
- Use `hreflang` tags for different language versions
- Translate meta descriptions and titles
- Consider separate URLs or subdirectories for languages

### 2. Performance
- Lazy load translation files
- Use code splitting for language bundles
- Cache translations in localStorage

### 3. Content Management
- For frequently updated content (Learn articles, quizzes), consider:
  - CMS integration
  - Database-backed translations
  - Translation management system

### 4. Quality Assurance
- Have native speakers review translations
- Test with real users
- Maintain translation glossary for consistency
- Regular updates as new features are added

## Current Hardcoded Content to Migrate

1. **Learn Section Articles** - Extensive educational content
2. **Quiz Questions & Answers** - All quiz content
3. **Tooltips & Explanations** - Help text throughout
4. **Error Messages** - Currently minimal, but will grow
5. **Form Labels & Placeholders** - Input field text

## Quick Wins

1. **Add language detection** - Automatically detect user's browser language
2. **Persist language choice** - Save to localStorage
3. **Add language switcher** - Let users change language easily
4. **Translate error messages** - Improve error handling UX

## Resources

- [i18next Documentation](https://www.i18next.com/)
- [React i18next](https://react.i18next.com/)
- [i18next Best Practices](https://www.i18next.com/principles/fallback)
- [W3C Internationalization](https://www.w3.org/International/)
