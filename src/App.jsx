import { useState } from "react";

function App() {

  const [dim, setDim] = useState("");
  const [numPass, setNumPass] = useState("");
  const [show, setShow] = useState(false)
  const [campo, setCampo] = useState(true)


  const check = () => {
    if (dim && numPass && !isNaN(Number(dim)) && !isNaN(Number(numPass)) && numPass > 3) {
      setShow(true)
      var campo = {}
      var contatore = 0
      var riga = 1
      for (var i = 0; i < (dim * dim); i++) {
        const bombasibombano = Math.trunc(Math.random() * 2) === 0 ? true : false
        if (riga !== Math.trunc(Math.floor(i / dim))) {
          riga = Math.trunc(Math.floor(i / dim))
          contatore = 0
        }
        if (contatore <= 2) {
          contatore++
          campo = { ...campo, [i]: { id: i, calpestato: false, bomba: bombasibombano } }
        } else {
          campo = { ...campo, [i]: { id: i, calpestato: false, bomba: false } }
        }
      }
      setCampo(campo)
    } else {
      setShow(false)
    }
  }

  const premuto = (key, value) => {
    if (value.calpestato) return alert("La cella è già stata calpestata")
    setNumPass(pass => pass - 1)
    if (numPass === 0) return alert("Hai finito i passi")
    if (value.bomba) {
      alert("Hai perso")
      setShow(false)
    } else {
      setCampo(campo => ({ ...campo, [key]: { calpestato: true, bomba: value.bomba } }))
    }

  }

  return (
    <main className="container">
      {!show && <div className="inputContainer">
        <input value={dim} onChange={(e) => setDim(e.target.value)} type="text" id="dim" />
        <input value={numPass} onChange={(e) => setNumPass(e.target.value)} type="text" id="numPass" />
        <button className="button" onClick={check}>Inzia</button>
        <p className="error" style={{ display: !show ? "none" : "block" }}>Erroe !</p>
      </div>}
      {show &&
        <div>
          <button onClick={() => setShow(false)}>CHIUDI PARTITA</button>
          <div className="grid" style={{ gridTemplateColumns: `repeat(${dim}, 50px)`, gridTemplateRows: `repeat(${dim}, 50px)` }}>
            {Object.entries(campo).map(([key, value]) => (
              <div onClick={() => premuto(key, value)} style={{ height: 50, width: 50, backgroundColor: value.calpestato ? "blue" : "green" }} className="cella" key={key}>
              </div>
            ))}
          </div>
        </div>}
    </main>
  );
}

export default App;
