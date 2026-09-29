// app.js - state plus render, all by hand (see h1.2)
let taken = [
  { id: 1, titel: 'Syllabus h1 lezen', gedaan: false },
  { id: 2, titel: 'Node 24 (LTS) installeren', gedaan: true },
];

//dit is voor het nieuwe taak
let volgendId = 3;
let filter = 'alle';

//hier zegt mn zoek in mijn html met deze id (lijst en invoer)
const lijst = document.querySelector('#lijst');
const invoer = document.querySelector('#invoer');
const teller = document.querySelector("#teller");
const alle = document.querySelector("#alle");
const open = document.querySelector("#open");
const gedaan = document.querySelector("#gedaan")



function render() {
// teller (voor open taken)
const openTaak = taken.filter(t => !t.gedaan).length
// const openTaak = taken.filter(t => t.gedaan === false).length
teller.textContent = `Nog ${openTaak} open`

//filteren
const zichtbaarheid = filter === 'alle' ? taken : filter ==='open' ? taken.filter(t => !t.gedaan) : 
filter === 'gedaan' ? taken.filter(t => t.gedaan) : taken
lijst.innerHTML = ''; //dit maakt de inhoud van lijst id leeg

  //daarna ga je door de taken heen
  for (const taak of zichtbaarheid) {
    const li = document.createElement('li');
    li.textContent = taak.titel;
    li.classList.toggle('gedaan', taak.gedaan);

    const toggle = document.createElement('button');
    toggle.textContent = taak.gedaan ? 'heropen' : 'klaar';
    toggle.addEventListener('click', () => {
      taak.gedaan = !taak.gedaan;
      render(); // change the data AND update the screen
    });


    //dit is verwijder knop
    const weg = document.createElement('button');
    weg.textContent = 'x';
    weg.addEventListener('click', () => {
      taken = taken.filter(t => t.id !== taak.id);
      render();
    });

    li.append(toggle, weg);
    lijst.append(li);
  }
}

// dit is taak toevoegen
document.querySelector('#toevoegen').addEventListener('click', () => {
  const titel = invoer.value.trim();
  if (!titel) return;
  taken.push({ id: volgendId++, titel, gedaan: false });
  invoer.value = '';
  render();
});

//voor als je op de de knop alle kunt klikken
alle.addEventListener('click', () => {
  filter = 'alle'
  render()
})

//voor als je op de de open alle kunt klikken
open.addEventListener('click', () => {
  filter = 'open'
 // filter = taken.filter(taken.filter(t => !t.gedaan))
  render()
})

//voor als je op de de knop gedaan kunt klikken
gedaan.addEventListener('click', () => {
  filter = 'gedaan'
  render()
})

render()


