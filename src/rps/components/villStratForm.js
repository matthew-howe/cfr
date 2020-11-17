import React from 'react';

export default function VillainStratForm({ strat }) {
  

  function handleSubmit() {

  }
  
  function handleChange(evt) {
     
  }
  return (
    <div className="rps-form">
       <form onSubmit={handleSubmit}>
        <label>
          Rock
          <input type="text" value={strat[0]} onChange={handleChange} />
        </label>
      </form>
       <form onSubmit={handleSubmit}>
        <label>
          Paper
          <input type="text" value={strat[1]} onChange={handleChange} />
        </label>
      </form>
       <form onSubmit={handleSubmit}>
        <label>
          Scissors
          <input type="text" value={strat[2]} onChange={handleChange} />
        </label>
      </form>
      </div>
  )
}

