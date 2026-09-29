// app.js - the same app, rebuilt on YOUR signal.js.
// Note what is missing: not a single manual render() call.
import { signal, effect } from './signal.js';

const taken = signal([
  { id: 1, titel: 'signal.js afwerken', gedaan: false },
  { id: 2, titel: 'Beseffen dat dit geen magie is', gedaan: false },
]);
const filter = signal('alle');
let volgendId = 3;

const lijst = document.querySelector('#lijst');
const teller = document.querySelector('#teller');
const invoer = document.querySelector('#invoer');

// ONE effect renders the list; it re-runs itself when its signals change
effect(() => {
  const zichtbaar = taken.get().filter(t =>
    filter.get() === 'alle' ? true : filter.get() === 'open' ? !t.gedaan : t.gedaan
  );
  lijst.innerHTML = '';
  for (const taak of zichtbaar) {
    const li = document.createElement('li');
    li.textContent = taak.titel;
    li.classList.toggle('gedaan', taak.gedaan);

    const toggle = document.createElement('button');
    toggle.textContent = taak.gedaan ? 'heropen' : 'klaar';
    toggle.addEventListener('click', () => {
      // replace, never mutate: produce a NEW array (see h1.4 and h2.5)
      taken.set(taken.get().map(t =>
        t.id === taak.id ? { ...t, gedaan: !t.gedaan } : t
      ));
    });

    const weg = document.createElement('button');
    weg.textContent = 'x';
    weg.addEventListener('click', () => {
      taken.set(taken.get().filter(t => t.id !== taak.id));
    });

    li.append(toggle, weg);
    lijst.append(li);
  }
});

// a second effect keeps the counter in sync - it only depends on taken
effect(() => {
  const open = taken.get().filter(t => !t.gedaan).length;
  teller.textContent = `Nog ${open} open`;
});

document.querySelector('#toevoegen').addEventListener('click', () => {
  const titel = invoer.value.trim();
  if (!titel) return;
  taken.set([...taken.get(), { id: volgendId++, titel, gedaan: false }]);
  invoer.value = '';
});

document.querySelector('#f-alle').addEventListener('click', () => filter.set('alle'));
document.querySelector('#f-open').addEventListener('click', () => filter.set('open'));
document.querySelector('#f-gedaan').addEventListener('click', () => filter.set('gedaan'));
