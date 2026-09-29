# Stappenplan — Teller & Filters

## 1. Stappenplan voor de teller

### Wat moet ik weten als ik een aantal open taken wil laten zien/tellen?

1. **Wat bedoelen ze met "open"?**
   → `gedaan === false`

2. **Welke taken zijn open?**
   → Alleen die taken selecteren

3. **Hoe selecteer ik taken?**
   → `.filter()`

4. **Hoeveel geselecteerde taken zijn er?**
   → `.length`

### Denkpatroon

```text
Wat betekent "open"?
↓
gedaan === false

Welke taken zijn open?
↓
.filter()

Hoeveel zijn dat?
↓
.length
```

---

# 2. Stappenplan voor filters

## Stap 1 — Hoe weet mijn programma welke knop de gebruiker heeft gekozen?

De eerste vraag die je jezelf kunt stellen:

> **Hoe weet mijn programma welke knop de gebruiker heeft gekozen?**

Door een **variabele** te maken:

```js
let filter = 'alle';
```

De variabele moet de keuze **onthouden**, zodat het programma weet welke filter de gebruiker heeft gekozen.

```text
Gebruiker kiest een knop
↓
filter onthoudt de keuze
```

Bijvoorbeeld:

```text
filter = 'alle'
filter = 'open'
filter = 'gedaan'
```

---

## Stap 2 — Wat moet er gebeuren als ik op een filterknop klik?

Vraag jezelf:

> **Wat moet er gebeuren als ik op de filterknop klik?**

Bijvoorbeeld bij **Open**:

```text
Je klikt op Open
↓
filter wordt 'open'
↓
render()
↓
scherm opnieuw opbouwen/bijwerken
```

### Algemeen patroon

```text
KNOP
↓
filter aanpassen
↓
render()
```

Dit doe je voor **elke knop volgens hetzelfde patroon**:

| Knop   | Filter aanpassen    | Daarna     |
| ------ | ------------------- | ---------- |
| Alle   | `filter = 'alle'`   | `render()` |
| Open   | `filter = 'open'`   | `render()` |
| Gedaan | `filter = 'gedaan'` | `render()` |

### Belangrijk

`render()` betekent hier niet dat de hele pagina opnieuw geladen wordt.

Het betekent:

> **De zichtbare inhoud van het scherm opnieuw opbouwen/bijwerken op basis van de huidige data en toestand.**

---

# 3. Bepaal welke taken zichtbaar zijn

Je hebt:

```js
taken
```

Dit zijn **alle taken**.

Maar als de gebruiker op een bepaalde filter klikt, wil je niet altijd alle taken laten zien.

Daarom maak je een nieuwe variabele:

```js
const zichtbaarheid = ...
```

Hierbij stel je jezelf de vraag:

> **Welke taken moet ik nu laten zien?**

| `filter`   | Wat moet zichtbaar zijn?       |
| ---------- | ------------------------------ |
| `'alle'`   | alle `taken`                   |
| `'open'`   | `taken.filter(t => !t.gedaan)` |
| `'gedaan'` | `taken.filter(t => t.gedaan)`  |

---

## Denkstappen

```text
Is filter = alle?
↓
Neem alle taken

Anders, is filter = open?
↓
Filter de open taken

Anders, is filter = gedaan?
↓
Filter de gedane taken
```

Je kunt hiervoor gebruiken:

* `if / else`
* **ternary operator**

Bij een ternary kun je meerdere voorwaarden achter elkaar zetten.

Bijvoorbeeld als denkpatroon:

```text
voorwaarde 1 ?
    resultaat 1
:
    voorwaarde 2 ?
        resultaat 2
    :
        resultaat 3
```

---

# 4. Toon niet meer `taken`, maar de zichtbare taken

Je hebt net bepaald welke taken zichtbaar moeten zijn.

Stel jezelf dan de vraag:

> **Ik heb net bepaald welke taken zichtbaar zijn. Hoe moet ik nu doorheen lopen?**

Je had eerst:

```js
for (const taak of taken)
```

Maar `taken` bevat **alle** taken.

Je hebt nu een nieuwe variabele gemaakt die alleen bevat wat zichtbaar moet zijn:

```js
const zichtbaarheid = ...
```

Dus pas je de `for...of` aan naar:

```js
for (const taak of zichtbaarheid)
```

---

## Keep in mind

```text
taken
↓
ALLE data


zichtbaarheid
↓
DEEL van de data dat nu getoond moet worden
```

Dus:

```text
taken = alles wat bestaat

zichtbaarheid = wat ik op dit moment wil tonen
```

---

# 5. Belangrijk denkpatroon voor volgende oefeningen

Wanneer je een soortgelijke oefening krijgt, probeer deze vragen in deze volgorde te stellen:

### 1. Waar staat mijn DATA?

```text
↓
taken
```

---

### 2. Welke TOESTAND moet ik onthouden?

```text
↓
filter
```

Bijvoorbeeld:

```text
'alle'
'open'
'gedaan'
```

---

### 3. Wat kan de gebruiker VERANDEREN?

```text
↓
taken / filter
```

De gebruiker kan bijvoorbeeld:

* een taak toevoegen
* een taak verwijderen
* een taak afvinken
* een filter kiezen

---

### 4. Wat moet er ZICHTBAAR zijn?

```text
↓
zichtbaarheid bepalen
```

Bijvoorbeeld:

```text
alle → alle taken
open → alleen open taken
gedaan → alleen gedane taken
```

---

### 5. Hoe TOON ik dat?

```text
↓
for...of over zichtbaarheid
```

Dus:

```js
for (const taak of zichtbaarheid)
```

---

### 6. Wanneer iets verandert?

```text
↓
render()
```

Het algemene patroon:

```text
DATA / TOESTAND aanpassen
↓
render()
↓
scherm bijwerken
```

---

# Kortste versie om te onthouden

```text
DATA
↓
taken

TOESTAND
↓
filter

WAT MOET IK TONEN?
↓
zichtbaarheid

TONEN
↓
for...of zichtbaarheid

IETS VERANDERT
↓
render()
```

## Kernidee

> **`taken` = alle data**
> **`filter` = wat de gebruiker gekozen heeft**
> **`zichtbaarheid` = welke data ik nu wil tonen**
> **`render()` = het scherm opnieuw opbouwen/bijwerken**
