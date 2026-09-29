Reflectie:
waarom moet de array vervangen worden?
omdat signal.js alleen reageert op set();
als mn push gebruikte verandert de array wel maar de set kan het niet zien.

vandaar dat we deze toevoegen
toevoegen → [...]
aanpassen → map()
verwijderen → filter()
zodat we toch nog een nieuwe array kunnen maken maar dan kan de set wel zien wat er verandert is.

Wat doet een echt framework?

1. componenten
2. routing
3. dependecy injectie
