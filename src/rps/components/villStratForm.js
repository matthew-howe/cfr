import React from 'react';

export default function VillainStratForm({strat}) {
  function handleSubmit() {}

  function handleChange(evt) {}
  return (
    <div className="rps-form">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            id="rfreq"
            value={strat[0].toFixed(2)}
            onChange={handleChange}
          />
        </label>
      </form>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            id="pfreq"
            value={strat[1].toFixed(2)}
            onChange={handleChange}
          />
        </label>
      </form>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            id="sfreq"
            value={strat[2].toFixed(2)}
            onChange={handleChange}
          />
        </label>
      </form>
    </div>
  );
}
