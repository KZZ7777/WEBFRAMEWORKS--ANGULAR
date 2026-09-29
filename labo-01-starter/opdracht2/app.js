// app.js - "finished" by a fellow student. Three sync bugs hide below.
let taken = [
  { id: 1, titel: 'Slides doornemen', gedaan: false },
  { id: 2, titel: 'Labo starten', gedaan: true },
  { id: 3, titel: 'Reflectie schrijven', gedaan: false },
];
let volgendId = 4;
let filter = 'alle';
// hier was aantalOpen die heb ik verplaats in de functie render
const lijst = document.querySelector('#lijst');
const teller = document.querySelector('#teller');
const invoer = document.querySelector('#invoer');

function render() {
  //hier is aantalOpen
  let aantalOpen = taken.filter(t => !t.gedaan).length; // bookkeeping "for speed"
  teller.textContent = `Nog ${aantalOpen} open`;
  lijst.innerHTML = '';

  //dit was de gegeven code voor zichtbaar maar die is fout want je kunt geen taken filteren die gedaan werden
  // const zichtbaar = taken.filter(t =>
  //   filter === 'alle' ? true : filter === 'open' ? !t.gedaan : t.gedaan
  // );

  //juiste versie van filteren
  const zichtbaar = filter === 'alle' ? taken : filter ==='open' ? taken.filter(t => !t.gedaan) : 
  filter === 'gedaan' ? taken.filter(t => t.gedaan) : taken


  for (const taak of zichtbaar) {
    const li = document.createElement('li');
    li.textContent = taak.titel;
    li.classList.toggle('gedaan', taak.gedaan);

    const toggle = document.createElement('button');
    toggle.textContent = taak.gedaan ? 'heropen' : 'klaar';
    toggle.addEventListener('click', () => {
      taak.gedaan = !taak.gedaan;
      render();
    });

    const weg = document.createElement('button');
    weg.textContent = 'x';
    weg.addEventListener('click', () => {
      taken = taken.filter(t => t.id !== taak.id);
      //hier werd ook render vergeten 
      render()
    });

    li.append(toggle, weg);
    lijst.append(li);
  }
}

document.querySelector('#toevoegen').addEventListener('click', () => {
  const titel = invoer.value.trim();
  if (!titel) return;
  taken.push({ id: volgendId++, titel, gedaan: false });
  //aantalOpen = aantalOpen + 1; deze was onnodig want door dat kan ik de taak niet zien bij alle als ik een taak toevoeg, ik moest expliciet eerst naar open gaan om dan terug naar alle te gaan om de taak te zien
  invoer.value = '';
  render();
});

document.querySelector('#f-alle').addEventListener('click', () => {
  filter = 'alle';
  render();
});
document.querySelector('#f-open').addEventListener('click', () => {
  filter = 'open';
  render();
});
document.querySelector('#f-gedaan').addEventListener('click', () => {
  filter = 'gedaan';
  //hier heb ik render toegevoegd omdat er geen render was
  render();
});

render();
