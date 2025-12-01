# Energy Mix Frontend

Aplikacja webowa do wizualizacji miksu energetycznego UK i optymalizacji ładowania pojazdów elektrycznych.

## Instalacja

```bash
npm install
```

## Konfiguracja plik .env.example

```text
VITE_API_URL=http://localhost:3000/api
BASE_URL=http://localhost:5173
VITE_MIN_CHARGING_HOURS=1
VITE_MAX_CHARGING_HOURS=6
```

## Uruchomienie

### Tryb deweloperski

```bash
npm run dev
```

### Build produkcyjny

```bash
npm run build
```

### Tryb produkcyjny

```bash
npm run start
```

## Testy

### Testy E2E (Playwright)

```bash
npx playwright install

npm run test:e2e
```

## Struktura projektu

```text
src/
├── components/      # Komponenty React
├── context/         # Theme Context
├── hooks/           # Custom hooki
├── services/        # API calls
├── tests            # Testy
├── types/           # Typy TypeScript
├── utils/           # Funkcje pomocnicze
├── App.tsx          # Główny komponent
├── index.css        # Tailwind
└── main.tsx         # Entry point
```
