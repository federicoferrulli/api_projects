# API Events

> Un'API per aggregare e recuperare dati di eventi da un file JSON.

## 📜 Descrizione Generale

Questo progetto implementa un'API RESTful costruita con Node.js e Express. Lo scopo principale è leggere un elenco di eventi da un file `event.json` locale e fornire un endpoint per recuperare questi dati. L'API supporta anche l'aggregazione dei dati in base a parametri specifici come progetto, dipendente o data, restituendo le ore totali per ogni gruppo.

## ✨ Funzionalità Principali

  * **Recupero Eventi**: Fornisce un endpoint per ottenere l'elenco completo di tutti gli eventi.
  * **Aggregazione Dati**: Supporta l'aggregazione dei dati degli eventi tramite query parameters. È possibile raggruppare per progetto (`p`), dipendente (`e`) o data (`d`).
  * **Architettura Modulare**: Il codice è organizzato in modo chiaro con una separazione delle responsabilità tra routes, services, repositories e models.
  * **Middleware**: Utilizza middleware per il logging delle richieste e la gestione centralizzata degli errori.
  * **Configurazione Semplice**: Facile da configurare e avviare grazie all'uso di variabili d'ambiente.

## 🚀 Prerequisiti

  * **Linguaggio di programmazione:** Node.js (versione \>=18.x raccomandata, come specificato in `package.json`).
  * **Package Manager:** `npm`.
  * **Variabili d'ambiente:**
      * `PORT`: La porta su cui il server sarà in ascolto (default: `3000`).
      * `ENV`: Specifica l'ambiente di esecuzione (es. `DEV`). In modalità `DEV`, gli stack di errore vengono mostrati nelle risposte API.

## ⚙️ Installazione

1.  **Clona il repository:**
    ```bash
    git clone https://github.com/federicoferrulli/api_projects.git
    cd api_projects
    ```
2.  **Installa le dipendenze:**
    ```bash
    npm install
    ```
3.  **Configurazione dell'ambiente:**
    Questo progetto non include un file `.env.example`, ma è possibile creare un file `.env` nella root del progetto per configurare le variabili.
    ```bash
    # Crea un file .env
    touch .env
    ```
    Successivamente, apri il file `.env` con un editor di testo e inserisci i valori desiderati.
    ```
    PORT=3000
    ENV=DEV
    ```

## ▶️ Esecuzione e Utilizzo

  * **Avviare l'applicazione:**

    ```bash
    npm start
    ```

    Il server si avvierà sulla porta specificata dalla variabile d'ambiente `PORT` o sulla `3000` di default.

  * **Esempi di utilizzo:**

      * **Ottenere tutti gli eventi:**
        ```bash
        curl http://localhost:3000/v1/api/events
        ```
      * **Ottenere eventi aggregati per progetto:**
        ```bash
        curl "http://localhost:3000/v1/api/events?aggr=p"
        ```
      * **Ottenere eventi aggregati per progetto e dipendente:**
        ```bash
        curl "http://localhost:3000/v1/api/events?aggr=pe"
        ```

## 📂 Struttura del Progetto

```
api_projects/
├── config/
│   └── route.config.js       # Configurazione delle route principali
├── events/
│   ├── model/
│   │   └── event.model.js    # Logica per l'accesso ai dati grezzi (dal file JSON)
│   ├── repositories/
│   │   └── event.repository.js # Abstraction layer per l'accesso ai dati
│   ├── routes/
│   │   └── event.route.js    # Definizione degli endpoint per gli eventi
│   ├── services/
│   │   └── event.service.js  # Business logic per la gestione degli eventi
│   └── event.json            # Dati di esempio degli eventi
├── middlewares/
│   ├── error.middleware.js   # Middleware per la gestione degli errori
│   └── logger.middleware.js  # Middleware per il logging delle richieste
├── .gitignore                # File e cartelle ignorati da Git
├── index.js                  # Entry point dell'applicazione
├── package-lock.json         # Dipendenze esatte del progetto
└── package.json              # Metadati e dipendenze del progetto
```
