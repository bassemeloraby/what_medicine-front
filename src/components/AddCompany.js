import React, { Fragment } from 'react';
function AddCompany({ onAdd }) {
  const [companyName, setCompanyName] = React.useState('');
  const [website, setWebsite] = React.useState('');


  const onSubmit = (e) => {
    e.preventDefault();
    if (!companyName) {
      alert('Please add a company name');
      return;
    }
    onAdd({ companyName,website });

    setCompanyName('');
  };
  return (
    <Fragment>
    <form onSubmit={onSubmit} className="company-add-form">
      <input
        type="text"
        name="text"
        placeholder="enter text"
        value={companyName}
        autoFocus
        autoComplete="off"
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <input
        type="text"
        name="website"
        placeholder="enter link"
        value={website}
        autoFocus
        autoComplete="off"
        onChange={(e) => setWebsite(e.target.value)}
      />
      <button type="submit" value="Save Company">
        Add
      </button>
    </form>
    </Fragment>
  );
}

export default AddCompany;
