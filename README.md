# anagrafica-csv
Gestione anagrafica tramite upload di file CSV

## Requisiti
Sviluppare una piattaforma, in Node e React, che consenta la gestione di anagrafiche.

### Funzionalità
1. Autenticazione dell’utente a sistema;
2. Il caricamento tramite csv delle anagrafiche in un DB creato dal candidato (scelta libera sul DBMS);
3. La possibilità di uscire dalla pagina di import, navigando altrove nel sito, e ricevere un avviso a import terminato;
4. La visualizzazione delle anagrafiche;
5. Opzionale: La visualizzazione ed il download dei csv importati;

Il csv dovrà contenere i campi: nome, cognome, data di nascita in formato gg/mm/aaaa, città, codice fiscale.

Opzionale ma gradito, un readme.md dove vengono spiegati l’architettura ed i punti di forza e gli eventuali sviluppi mancanti.

### Consegna
Consegnare tramite repository git privato utilizzando la tecnica di frequent commit per lo sviluppo.

Consegna: lunedì 7/10.

## Architettura
Ho usato il framework Next.js che mi permetteva di gestire sia il FE che il BE.

### Backend
Ho creato delle API REST. La sicurezza è gestita tramite filtro CORS e token JWT. Le API sono totalmente disaccoppiate dal frontend,

### Database
Ho utilizzato Lowdb, database JSON su file che espone l'interfaccia di lodash.
E' molto utile per lo sviluppo veloce, ovviamente va sostituito con un DB più potente al momento di aggiungere maggiori funzionalità e di aumentare la scalabilità.

## Punti di forza
Sia Next.js che Lowdb garantiscono uno sviluppo veloce, Next.js è espandibile con vari esempi già pronti.
L'app è stata fatta con le logiche REST e JWT che rappresentano gli standard più utilizzati.

## Punti di debolezza
Next.js va padroneggiato, perché gestendo sia il BE che il FE in fase di debug va capito dove è il problema. Questo aspetto mi ha dato vari problemi.
Lowdb ha molte limitazioni per un uso intensivo in produzione.
