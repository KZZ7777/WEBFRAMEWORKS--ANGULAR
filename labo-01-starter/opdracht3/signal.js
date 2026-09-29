// signal.js - your own reactive core (h1.4). Complete TODO 1-3.
let actiefEffect = null;

export function signal(waarde) {
  const luisteraars = new Set();
  return {
    get() {
      // TODO 1: if an effect is currently active, add it to the listeners
      if (actiefEffect) {
        luisteraars.add(actiefEffect)
      }
      return waarde;
    },
    set(nieuw) {
      waarde = nieuw;
      // TODO 2: notify every listener (run each stored function)
      luisteraars.forEach(fn => fn())
    },
  };
}

export function effect(fn) {
  // TODO 3: mark fn as the active effect, run it once, then clear the mark
  // (while fn runs, every signal it reads will register it as a listener)
  actiefEffect = fn;
  fn() //hier roepen wij de functie aan
  actiefEffect=null
}
