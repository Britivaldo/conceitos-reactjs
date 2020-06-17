import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [ repositories, setRepository ] = useState([]);


  useEffect(() =>{
    api.get('/repositories').then(response => {
      setRepository(response.data);
    });
  }, [])



  async function handleAddRepository() {
    const response = await api.post('/repositories', { 
      "title": `Novo repositorio ${Date.now()}`, 
      "url": `http://github.com/${Date.now()}`, 
      "techs": ["React Native"], 
      "likes": 0 
    });

    const repository = response.data;
    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
  
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    const newRepositories = repositories;
    
    newRepositories.splice(repositoryIndex, 1);

    setRepository([...newRepositories]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
