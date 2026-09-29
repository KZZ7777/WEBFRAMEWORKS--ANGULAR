1. Hoeveel bestanden maakte de CLI aan? Welke stap duurde het langst, en wat
   gebeurde daar (syllabus 1.9)

- het maakt meerdere bestanden aan en het langste duurt de packages

2. Waar kijk je eerst als een wijziging niet op het scherm verschijnt

- het terminal en als ik daar niets zie dan in de developer tools

3. Rondleiding door het project:
   A. welke Angular-versie gebruikt je project precies? Wat betekent het dakje?
   Commando: ng version

- Het dakje is semantic versioning, dus het betekent die huidige versie of hoger. Maar het moet nog binnen dezelfde soort zijn. bv. 22.10 dus met dakje mag het 22.10 of hoger maar moet nog in de 22 versie blijven.

Verbetering:
Het dakje ^ betekent dat npm een nieuwere compatibele versie (semantic versioning) mag installeren, maar binnen dezelfde major versie moet blijven. Bijvoorbeeld ^20.3.0 betekent hoger dan 20.3.0 en lager dan 21.0.0.

B. waarom staat @angular/cli bij devDependencies en niet bij dependencies ?

- Omdat devDependencies bedoelt is om te bouwen, dus we hebben de angular CLI nodig om te bouwen
  dependencies → nodig wanneer de applicatie zelf draait
  devDependencies → nodig tijdens ontwikkeling/bouwen/testen

C.welk commando voert npm start uit?

- Het start de server zodat je het kan zien in de browser

Verbetering:
npm start voert het commando uit dat bij "start" in package.json staat. In dit project is dat ng serve, waarmee de Angular development server wordt gestart.

D.welk bestand is het startpunt van de applicatie, en aan wie geeft het de controle?

- app.ts (fout)

Juiste antwoord:
Het startpunt van de applicatie is src/main.ts. Dit bestand start Angular op en geeft de controle aan de rootcomponent, App
Als jouw project bijvoorbeeld een app.ts heeft waarin de App component staat, dan is dat dus de component, niet het startpunt van de applicatie.

E.wat staat er in de <body> van src/index.html ? Vergelijk in de browser View Page Source met de Elements-tab en verklaar het verschil?

- app-root zit erin. idk het verschil ik zie niets? alleen als ik erop klikt zie ik injected stylesheet

Verbetering:
In de <body> staat <app-root></app-root>. Dit is de plaats waar Angular de rootcomponent van de applicatie rendert.

View Page Source toont de oorspronkelijke HTML van index.html, terwijl de Elements-tab de actuele DOM toont nadat Angular en JavaScript de pagina hebben aangepast. Daarom kan de Elements-tab meer inhoud bevatten dan de oorspronkelijke broncode.

F.wat is het opvallendste verschil met de package.json van je Express-project uit Web
Programming?

- deze vak niet gehad dus idk maar waar ik van uit gaan is dat hier alle packages zijn geinstalleerd en in express-project moet je ze nog installeren?

Verbetering:
Het verschil met een typisch Express-project is dat een Angular-project veel Angular-specifieke packages en tooling bevat en een duidelijke scheiding maakt tussen dependencies en devDependencies

4. Hoe wist npm wat het moest installeren? Hoe groot is node_modules , en hoe
   groot is wat de gebruiker downloadt (de kolom Estimated transfer size)? Welk soort server heb je
   nodig om de inhoud van dist/ online te zetten

- omdat je een error krijgt dit dit zegt:
  Node packages may not be installed. Try installing with 'npm install'.
  Error: Could not find the '@angular/build:dev-server' builder's node package. dus daarom npm i (half)

juist:
npm wist wat het moest installeren omdat de benodigde packages in package.json staan bij dependencies en devDependencies. Met npm install leest npm deze lijst en installeert de packages in node_modules.

- node_modules is bijna 300Mb
- 52.80kb
  -Single-Page Application (fout)
  juist: Je hebt een statische webserver (HTTP-server) nodig die de bestanden uit dist/ kan serveren. Een aparte Node.js- of Express-server is hiervoor niet noodzakelijk.
  SPA (Single-Page Application) beschrijft je applicatie, niet de server

5. noem drie dingen behalve componenten die de CLI kan genereren. Wat deed
   --dry-run , en wanneer is dat nuttig?

1) class genereren
2) enum genereren
3) interface genereren

dry run:
heeft 4 nieuwe bestanden aangemaakt, maar ik weet niet voor welke reden. (fout)
juiste antwoord: --dry-run laat zien welke bestanden en wijzigingen een commando zou maken, zonder ze daadwerkelijk aan te maken.
--dry-run zegt eigenlijk: Laat mij zien wat je zou aanmaken/veranderen, maar voer het nog niet echt uit.
Als je geen --dry-run toevoegt dan worden de bestanden effectief gemaakt

A. zoek met ng generate component --help de korte schrijfwijze van ng generate component
Command: ng g c [name]

6. schrijf de twee stappen in je eigen woorden op. Waar komt de naam app-hoofding vandaan?
   de hoofding is de map dat in de app map zit

7. teken de componentboom van je applicatie. In welk bestand staat de import
   van Openingsuren , en waarom daar? Wat stel je vast over de CSS van een component?

- de imports zit in de voettekst.ts

8. delen de twee knoppen hun aantal? Wat zegt dat over een component en haar
   state? Vergelijk met oefening 1 van labo 1: welke regel code die je daar overal moest schrijven, staat
   hier nergens?

   Nee, ze delen niet met elkaar
   je moest nergens render() schrijven.
