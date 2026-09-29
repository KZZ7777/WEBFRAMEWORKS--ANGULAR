# Opdracht 3 – `signal.js`

## 1. Wat is het doel van de oefening?

We moeten een eenvoudig **reactief systeem** maken.

Een `signal` bewaart een waarde. Een `effect` is een functie die automatisch opnieuw uitgevoerd wordt wanneer een signal die het gebruikt verandert.

De werking is:

```text
effect()
   ↓
effect gebruikt signal.get()
   ↓
signal onthoudt welk effect naar hem luistert
   ↓
signal.set() verandert de waarde
   ↓
signal voert de luisteraars opnieuw uit
   ↓
effect wordt opnieuw uitgevoerd
```

Hierdoor hoeft `app.js` niet telkens handmatig `render()` aan te roepen.

---

# 2. Eerst de bestaande code lezen

Voordat ik code schrijf, kijk ik naar wat er al bestaat.

Bovenaan staat:

```js
let actiefEffect = null;
```

Dus er bestaat al een variabele om bij te houden welk effect momenteel actief is.

Daarna staat:

```js
const luisteraars = new Set();
```

Dus elk signal heeft een verzameling van functies die naar het signal luisteren.

Verder heeft een signal twee belangrijke functies:

```js
get()
set()
```

Ik kan dus eerst bedenken:

* `get()` → waarde ophalen
* `set()` → waarde veranderen
* `effect()` → een functie uitvoeren en laten onthouden welke signals ze gebruikt

---

# 3. TODO 1 aanpakken: `get()`

De comment zegt:

```js
// if an effect is currently active, add it to the listeners
```

Ik vertaal de comment eerst naar gewone taal:

> Als er op dit moment een effect bezig is, moet ik dat effect opslaan als luisteraar.

## Stap 1: Wat moet ik controleren?

Ik moet controleren of er een actief effect is.

Welke variabele houdt dat bij?

```js
actiefEffect
```

Dus:

```js
if (actiefEffect) {
```

## Stap 2: Wat moet ik ermee doen?

De comment zegt:

> add it to the listeners

De verzameling luisteraars heet:

```js
luisteraars
```

Een `Set` heeft de methode:

```js
.add()
```

Dus:

```js
luisteraars.add(actiefEffect);
```

## Resultaat

```js
get() {
    if (actiefEffect) {
        luisteraars.add(actiefEffect);
    }

    return waarde;
}
```

### Hoe kwam ik hierop?

Ik stelde mezelf deze vragen:

1. **Wat vraagt de comment dat ik moet doen?**
2. **Welke variabele bevat de informatie die ik nodig heb?**
3. **Waar moet die informatie naartoe?**
4. **Welke methode gebruik ik om iets aan die verzameling toe te voegen?**

---

# 4. Waarom moet `get()` dit doen?

Stel ik schrijf:

```js
effect(() => {
    console.log(taken.get());
});
```

Het systeem moet kunnen onthouden:

```text
Dit effect gebruikt `taken`.
```

Dat kan het alleen weten wanneer `taken.get()` wordt uitgevoerd.

Daarom registreert `get()` het actieve effect als luisteraar.

---

# 5. TODO 2 aanpakken: `set()`

De comment zegt:

```js
// notify every listener (run each stored function)
```

In gewone taal:

> Wanneer de waarde verandert, moet ik iedere luisteraar opnieuw uitvoeren.

We hebben al:

```js
waarde = nieuw;
```

Dus de waarde is al veranderd.

Nu moet ik alle luisteraars uitvoeren.

## Stap 1: Waar zitten de luisteraars?

In:

```js
luisteraars
```

## Stap 2: Wat moet ik met iedere luisteraar doen?

De comment zegt:

> run each stored function

Een functie uitvoeren doe je met:

```js
fn()
```

## Stap 3: Hoe voer ik alle elementen van een Set uit?

Een `Set` heeft onder andere:

```js
forEach()
```

Dus:

```js
luisteraars.forEach(fn => fn());
```

## Resultaat

```js
set(nieuw) {
    waarde = nieuw;

    luisteraars.forEach(fn => fn());
}
```

### Hoe kwam ik hierop?

Ik stelde mezelf:

1. **Wat moet er gebeuren nadat de waarde verandert?**
   → Luisteraars opnieuw uitvoeren.

2. **Waar staan die luisteraars?**
   → `luisteraars`.

3. **Wat is een luisteraar?**
   → Een functie.

4. **Hoe voer ik een functie uit?**
   → `fn()`.

5. **Hoe voer ik iets voor elk element uit?**
   → `forEach()`.

Daaruit volgt:

```js
luisteraars.forEach(fn => fn());
```

---

# 6. TODO 3 aanpakken: `effect()`

De comment zegt:

```js
// mark fn as the active effect, run it once, then clear the mark
```

Dit zijn eigenlijk drie opdrachten.

## Stap 1: `fn` actief maken

De variabele die het actieve effect bijhoudt is:

```js
actiefEffect
```

Het effect dat we actief willen maken is:

```js
fn
```

Dus:

```js
actiefEffect = fn;
```

---

## Stap 2: `fn` één keer uitvoeren

De comment zegt:

> run it once

`fn` is een functie.

Een functie uitvoeren:

```js
fn();
```

Dus:

```js
fn();
```

Tijdens deze uitvoering kunnen signals hun `.get()` uitvoeren.

Omdat:

```js
actiefEffect = fn;
```

weet een signal:

> Dit is het effect dat momenteel naar mij luistert.

---

## Stap 3: actief effect verwijderen

De comment zegt:

> clear the mark

We willen niet dat het effect voor altijd als actief geregistreerd blijft.

Daarom:

```js
actiefEffect = null;
```

## Resultaat

```js
export function effect(fn) {
    actiefEffect = fn;
    fn();
    actiefEffect = null;
}
```

---

# 7. Waarom is deze volgorde belangrijk?

De volgorde mag niet zomaar veranderen.

We moeten eerst:

```js
actiefEffect = fn;
```

Daarna:

```js
fn();
```

Want tijdens `fn()` kunnen we bijvoorbeeld dit tegenkomen:

```js
taken.get();
```

`get()` moet dan weten welk effect actief is.

Als ik eerst `fn()` doe en daarna pas:

```js
actiefEffect = fn;
```

dan weet `taken.get()` niet welk effect hij moet registreren.

Daarom:

```text
1. effect actief maken
2. effect uitvoeren
3. effect niet meer actief maken
```

---

# 8. De volledige logica

De drie TODO's werken samen.

## Wanneer `effect()` voor de eerste keer uitgevoerd wordt

```text
effect(fn)
    ↓
actiefEffect = fn
    ↓
fn()
    ↓
fn gebruikt bijvoorbeeld taken.get()
    ↓
taken ziet actiefEffect
    ↓
taken voegt fn toe aan luisteraars
    ↓
actiefEffect = null
```

Nu weet `taken` welk effect ervan afhankelijk is.

---

## Wanneer later `taken.set()` wordt uitgevoerd

```text
taken.set(nieuweWaarde)
    ↓
waarde = nieuweWaarde
    ↓
luisteraars bekijken
    ↓
iedere luisteraar uitvoeren
    ↓
effect opnieuw uitvoeren
```

Dat is de volledige reactiviteit.

---

# 9. Hoe pak ik een soortgelijke oefening volgende keer aan?

Gebruik deze aanpak bij TODO-oefeningen.

## Stap 1 — Lees de comment letterlijk

Niet meteen code typen.

Bijvoorbeeld:

```js
// notify every listener (run each stored function)
```

Vertaal dit eerst:

> "Ik moet alle luisteraars uitvoeren."

---

## Stap 2 — Zoek de variabelen die in de comment genoemd worden

Hier zijn dat:

```text
listener → luisteraars
active effect → actiefEffect
stored function → fn
```

De namen in de code geven vaak al een groot deel van de oplossing weg.

---

## Stap 3 — Bepaal wat het type van de variabele is

Bijvoorbeeld:

```js
const luisteraars = new Set();
```

Ik weet dan:

> Dit is een `Set`.

Dus ik kan nadenken over methodes van een `Set`, zoals:

```js
.add()
.forEach()
```

Bij:

```js
let actiefEffect = null;
```

weet ik:

> Dit bevat waarschijnlijk één waarde/functie of `null`.

---

## Stap 4 — Vraag jezelf: "Wat moet er gebeuren?"

Gebruik deze vragen:

### Bij `get()`

> Wat moet er gebeuren wanneer iemand de waarde opvraagt?

Hier:

> Als een effect actief is, moet dat effect geregistreerd worden.

### Bij `set()`

> Wat moet er gebeuren wanneer de waarde verandert?

Hier:

> Alle effecten die luisteren opnieuw uitvoeren.

### Bij `effect()`

> Wat moet er gebeuren wanneer een effect wordt aangemaakt?

Hier:

> Effect actief maken → uitvoeren → actief effect wissen.

---

# 10. Denk niet meteen aan de exacte code

Dit is belangrijk.

Je hoeft niet onmiddellijk te denken:

> "Welke JavaScript-code moet ik typen?"

Denk eerst:

```text
Wat moet het programma doen?
```

Daarna:

```text
Welke variabele heb ik daarvoor?
```

Daarna:

```text
Welke JavaScript-methode past bij wat ik wil doen?
```

Bijvoorbeeld:

```text
"Ik moet iets toevoegen aan een Set"
        ↓
Welke methode?
        ↓
.add()
```

Of:

```text
"Ik moet voor ieder element iets uitvoeren"
        ↓
Welke methode?
        ↓
.forEach()
```

Of:

```text
"Ik moet deze functie uitvoeren"
        ↓
Hoe roep ik een functie aan?
        ↓
fn()
```

---

# 11. Mijn denkstappen bij deze oefening

### TODO 1

```text
Comment:
"add it to the listeners"

→ Wat moet toegevoegd worden?
actiefEffect

→ Waar?
luisteraars

→ Dat is een Set

→ Hoe voeg je toe aan een Set?
.add()

→ luisteraars.add(actiefEffect)
```

### TODO 2

```text
Comment:
"run each stored function"

→ Wat moet ik uitvoeren?
Elke functie

→ Waar staan ze?
luisteraars

→ Hoe doe ik iets voor elk element?
.forEach()

→ Hoe voer ik een functie uit?
fn()

→ luisteraars.forEach(fn => fn())
```

### TODO 3

```text
Comment:
"mark fn as active"

→ actiefEffect = fn

"run it once"

→ fn()

"clear the mark"

→ actiefEffect = null
```

---

# 12. Kort onthouden

```text
GET
→ Wie gebruikt mij?
→ Voeg dat effect toe aan mijn luisteraars.

SET
→ Mijn waarde is veranderd.
→ Voer al mijn luisteraars opnieuw uit.

EFFECT
→ Maak mij actief.
→ Voer mij uit.
→ Maak mij daarna weer inactief.
```

Of nog korter:

```text
get()  = luisteren registreren
set()  = luisteraars opnieuw uitvoeren
effect() = effect registreren door het uit te voeren
```

---

# 13. Waarom is dit een goede oplossing?

Omdat de oplossing rechtstreeks volgt uit de structuur van de gegeven code en de TODO-comments.

We hoeven geen nieuwe variabelen of ingewikkelde code te bedenken.

De bestaande onderdelen vertellen ons al wat nodig is:

```js
actiefEffect
luisteraars
get()
set()
effect()
```

De TODO's vertellen vervolgens **wat met die onderdelen moet gebeuren**.

Daarom is de beste aanpak niet:

> "Ik moet JavaScript uit mijn hoofd kennen."

Maar:

> **"Ik moet de gegeven code lezen, begrijpen wat elke variabele voorstelt en de comment vertalen naar kleine programmeerstappen."**





# mini checklist
1. Wat zegt de comment dat er moet gebeuren?
2. Welke variabele heb ik daarvoor nodig?
3. Wat is het type van die variabele?
4. Welke methode/actie past daarbij?
5. Moet ik iets toevoegen, verwijderen, doorlopen, uitvoeren of teruggeven?
6. In welke volgorde moeten de acties gebeuren?