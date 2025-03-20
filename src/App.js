import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './styles.css'

import api from './services/api'
import { Link } from 'react-router-dom';

function App() 
{

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

async function handleSearch(){
  //alert('O valor digitado foi: ' + input);
  if(input === ''){
    alert('Digite um valor');
    return; //para parar a execução
  }

  try {
    const response = await api.get(`${input}/json`);

    setCep(response.data)
    setInput("");

  }catch{
    alert("Erro ao buscar");
    setInput("")
  }
}

  return (
    
    <div className="container">
      <h1 className='title'>Projeto para buscar CEP</h1>     
        <p>
         <Link to="/cadastro">Ir para a página de Teste</Link>
        </p>
      
      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>

      </div>

      

      {Object.keys(cep).length > 0 && (

        <main className='main'>
          <h2>CEP {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
        )}
    </div>
  );
  
}

export default App;
