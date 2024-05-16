import React, { useEffect, useState } from 'react';
import moment from "moment";


function App() {
  const [lista, setLista] = useState([]);
  const listaLocal = [];

  let p = 1;
  let e = 1;
  let n = 1;

  const normal = (n) => {

    let enviar = {
      Senha: {
        senha: "N" + (n+1),
        tipoDeAtendimento: "Normal",
        hora: moment().format('LT')
      }
    };

    listaLocal.push(enviar);
    setLista([...lista, enviar]);
  };

  const prioritario = () => {

    let enviar = {
      Senha: {
        senha: "P" + p++,
        tipoDeAtendimento: "Prioritário",
        hora: moment().format('LT')
      }
    };
    listaLocal.push(enviar);
    setLista([...lista, enviar]);
  };

  const emergencia = () => {

    let enviar = {
      Senha: {
        senha: "E" + e++,
        tipoDeAtendimento: "Emergência",
        hora: moment().format('LT')
      }
    };
    listaLocal.push(enviar);
    setLista([...lista, enviar]);
  };

  const listaData = Object.values(lista).map(lista => ({
    senha: lista.Senha.senha,
    tipo: lista.Senha.tipoDeAtendimento,
    hora: lista.Senha.hora
  }));
  
  useEffect(() => {
    // console.log(lista)
    console.log(listaData)
  }, [listaData]);

  return (
    <>
      <h1>GESTÃO DE SENHAS HOSP. SENAI</h1>
      <h2>Selecione conforme a necessidade</h2>
      <button onClick={normal}>Normal</button>
      <button onClick={emergencia}>Emergencia</button>
      <button onClick={prioritario}>Prioridade</button>
      <ul>
        {listaData.map((i) => (
          <div><br></br>
            <span>{i.senha}</span>
            <span>{i.tipo}</span>
            <span>{i.hora}</span>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;