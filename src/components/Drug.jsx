import React from 'react';

function Drug({ drugs }) {
  return (
    <div>
      <section className="layout">
        
          <h6 key={drugs._id}>{drugs.TradeName}</h6>
      
      </section>
    </div>
  );
}

export default Drug;
