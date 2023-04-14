import React from 'react';
function AddCompany({ onAdd }) {
  const [companyName, setCompanyName] = React.useState('');


  const onSubmit = (e) => {
    e.preventDefault();
    if (!companyName) {
      alert('Please add a company name');
      return;
    }
    onAdd({ companyName });

    setCompanyName('');
  };
  return (
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
        // value={companyName}
        autoFocus
        autoComplete="off"
        // onChange={(e) => setCompanyName(e.target.value)}
      />
      <button type="submit" value="Save Company">
        Add
      </button>
    </form>
  );
}

export default AddCompany;
