import React from 'react'

function SearchForm() {
  return (
    <section className='section search'>
      <form className='search-form' 
    //   onSubmit={handleSubmit}
      >
        <div className='form-control'>
          <label htmlFor='name'>search for medicine</label>
          <input
            type='text'
            name='name'
            id='name'
            // ref={searchValue}
            // onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  )
}

export default SearchForm