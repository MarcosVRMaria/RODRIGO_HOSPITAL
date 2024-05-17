import React, { useEffect, useState } from 'react';
import moment from "moment";
import "./App.css"

function App() {
  const [normais, setNormais] = useState([]);
  const [prioritarios, setPrioritarios] = useState([]);
  const [emergencias, setEmergencias] = useState([]);

  const [normalCounter, setNormalCounter] = useState(1);
  const [prioritarioCounter, setPrioritarioCounter] = useState(1);
  const [emergenciaCounter, setEmergenciaCounter] = useState(1);

  const normal = () => {
    let enviar = {
      senha: "N" + normalCounter,
      tipoDeAtendimento: "Normal",
      hora: moment().format('LT')
    };
    setNormais(prevLista => [...prevLista, enviar]);
    setNormalCounter(prevCounter => prevCounter + 1);
  };

  const prioritario = () => {
    let enviar = {
      senha: "P" + prioritarioCounter,
      tipoDeAtendimento: "Prioritário",
      hora: moment().format('LT')
    };
    setPrioritarios(prevLista => [...prevLista, enviar]);
    setPrioritarioCounter(prevCounter => prevCounter + 1);
  };

  const emergencia = () => {
    let enviar = {
      senha: "E" + emergenciaCounter,
      tipoDeAtendimento: "Emergência",
      hora: moment().format('LT')
    };
    setEmergencias(prevLista => [...prevLista, enviar]);
    setEmergenciaCounter(prevCounter => prevCounter + 1);
  };

  const mergedList = () => {
    const result = [];

    // Add all emergências first
    emergencias.forEach(item => result.push(item));

    // Merge prioritários and normais
    let normalIndex = 0;
    let prioritarioIndex = 0;
    let canAddPrioritario = true;

    while (normalIndex < normais.length || prioritarioIndex < prioritarios.length) {
      if (prioritarioIndex < prioritarios.length && canAddPrioritario) {
        result.push(prioritarios[prioritarioIndex++]);
        canAddPrioritario = false;
      }

      if (normalIndex < normais.length) {
        result.push(normais[normalIndex++]);
        canAddPrioritario = true; // Allow one prioritário after a normal
      } else if (!canAddPrioritario && prioritarioIndex < prioritarios.length) {
        result.push(prioritarios[prioritarioIndex++]);
        canAddPrioritario = false;
      }
    }

    return result;
  };

  const listaData = mergedList();

  useEffect(() => {
    console.log(listaData);
  }, [normais, prioritarios, emergencias]);

  return (
    <div className='content'>
    <h1>GESTÃO DE SENHAS HOSP. SENAI</h1>
    <div className='base-content'>
    <h2>Selecione conforme a necessidade</h2>
    <div className='bnt-content'>
    <button className='normal' onClick={normal}>Normal</button>
    <button className='emergencia' onClick={emergencia}>Emergencia</button>
    <button className='prioritario' onClick={prioritario}>Prioridade</button>
    </div>

    <ul>
      <div className='text-content'>
      <h2 className='text-senha'>SENHA</h2>
      <h2 className='text-tipo'>TIPO DE ATENDIMENTO</h2>
      <h2 className='text-horario'>HORÁRIO DE ATENDIMENTO</h2>
      </div>
      {listaData.map((i, index) => (
        <div key={index} className='ficha'>
          <br />
          
          <span>{i.senha}</span><br />
          <span>{i.tipoDeAtendimento}</span><br />
          <span>{i.hora}</span>
        </div>
      ))}
    </ul>
    </div>
    </div>
);
}

export default App;