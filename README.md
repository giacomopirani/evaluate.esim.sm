# Progetto di Valutazione Competenze - eSIM

Questo è il progetto di valutazione delle competenze per candidati.

## Quick Start

### Requisiti

- [Node.js](https://nodejs.org/) (>22.10.0)
- [Bun](https://bun.sh/) (>1.3.0)

### Installazione

```bash
bun install
```

### Avvio

```bash
bun start
```

## Obiettivi

### Requisiti

1. **Homepage** - Mostrare i selettori per lingua e valuta (ottenuti dall'endpoint `/params`)
2. **Lista Paesi** - Mostrare la lista completa dei paesi nella lingua e valuta selezionate (dall'endpoint `/countries`)
3. **Dettaglio Paese** - Al click su un paese, mostrare la lista dei piani disponibili con le relative caratteristiche (dall'endpoint `/countries?id=XX`)

### Bonus

- **Caching** - Dopo aver chiuso e riaperto l'app, i dati recuperati in precedenza devono essere ancora disponibili senza bisogno di una nuova chiamata API.

### Note

- La UI/UX non deve necessariamente corrispondere a quella presente sulla nostra app [esim.sm](https://esim.sm/app). Sentiti libero di sperimentare e migliorare.
- Sebbene un'AI possa completare questo progetto in 2 minuti e non siamo contrari all'uso dell'AI, preferiamo una soluzione costruita manualmente per poter valutare correttamente le competenze del candidato.

## API Disponibili

Tutti gli endpoint sono pubblici e non richiedono autenticazione.

### 1. Parametri

```
GET https://esim.sm/api/v2/evaluate/params
```

Restituisce le lingue e le valute disponibili.

**Risposta:**

```json
{
  "success": true,
  "data": {
    "languages": {
      "en": "English",
      "it": "Italiano",
      "es": "Español",
      "fr": "Français",
      "de": "Deutsch",
      "pt": "Português",
      "pl": "Polski"
    },
    "currencies": {
      "usd": "US Dollar ($)",
      "eur": "Euro (€)",
      "gbp": "British Pound (£)",
      "brl": "Brazilian Real (R$)",
      "cad": "Canadian Dollar (CA$)"
    }
  }
}
```

### 2. Lista Paesi

```
GET https://esim.sm/api/v2/evaluate/countries
```

Restituisce la lista completa dei paesi disponibili. Supporta i parametri opzionali `currency` e `language` per localizzare la risposta.

**Parametri query:**

| Parametro  | Tipo   | Descrizione                        | Esempio |
| ---------- | ------ | ---------------------------------- | ------- |
| `language` | string | Codice lingua (da endpoint params) | `it`    |
| `currency` | string | Codice valuta (da endpoint params) | `eur`   |

**Esempio:** `GET https://esim.sm/api/v2/evaluate/countries?language=it&currency=eur`

**Risposta (esempio per un singolo paese):**

```json
{
  "success": true,
  "data": [
    {
      "id": "AF",
      "name": "Afghanistan",
      "region": "asia",
      "startingFrom": "€7.20",
      "isRegion": false,
      "warnings": "",
      "description": "...",
      "searchTerms": ["Afghanistan", "Afganistán", "Afeganistão", "Afganistan"],
      "fullCoverageDetails": {
        "AF": {
          "name": "Afghanistan",
          "localizedName": "Afghanistan",
          "flag": "https://s3.static-esim.com/img/flags/AF.png",
          "carriers": [{ "name": "Roshan Afghanistan", "speed": "4G-LTE" }]
        }
      },
      "flag": "https://s3.static-esim.com/img/flags/AF.png",
      "banner": "https://esim.sm/en/img/country_af.webp"
    }
  ]
}
```

### 3. Dettaglio Paese e Piani

```
GET https://esim.sm/api/v2/evaluate/countries?id={COUNTRY_ID}
```

Restituisce i dettagli di un singolo paese con tutti i piani disponibili. Supporta anche i parametri `currency` e `language`.

**Parametri query:**

| Parametro  | Tipo   | Descrizione                        | Esempio |
| ---------- | ------ | ---------------------------------- | ------- |
| `id`       | string | Codice ISO del paese               | `IT`    |
| `language` | string | Codice lingua (da endpoint params) | `it`    |
| `currency` | string | Codice valuta (da endpoint params) | `eur`   |

**Esempio:** `GET https://esim.sm/api/v2/evaluate/countries?id=IT&language=it&currency=eur`

**Risposta:**

```json
{
  "success": true,
  "data": {
    "country": {
      "id": "AF",
      "name": "Afghanistan",
      "region": "asia",
      "startingFrom": "€7.20",
      "isRegion": false,
      "warnings": "",
      "description": "...",
      "flag": "https://s3.static-esim.com/img/flags/AF.png",
      "banner": "https://esim.sm/en/img/country_af.webp"
    },
    "plans": [
      {
        "id": 25,
        "name": "1GB 7 days - Afghanistan",
        "mb": 1024,
        "days": 7,
        "price": 7.2,
        "salePrice": 0,
        "currency": "EUR",
        "gb": 1,
        "description": "1GB of mobile data for Afghanistan for 7 days",
        "carriers": ["Roshan Afghanistan"],
        "isUnlimited": false,
        "hasTopUps": true,
        "isRefundable": true,
        "isTetheringAllowed": true,
        "networkSpeed": "4G-LTE",
        "activationDays": 180,
        "thumbnailUrl": "https://s3.static-esim.com/img/flags/AF.png",
        "publicUrl": "https://esim.sm/en/travel-to/afghanistan#plan=25"
      }
    ]
  }
}
```
