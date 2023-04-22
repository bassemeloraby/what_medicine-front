import React, { Fragment } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function AddCompany({ onAdd }) {
  const [companyName, setCompanyName] = React.useState('');
  const [website, setWebsite] = React.useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!companyName) {
      alert('Please add a company name');
      return;
    }
    onAdd({ companyName, website });

    setCompanyName('');
    setWebsite('');
  };
  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Enter a company"
            type="text"
            name="text"
            value={companyName}
            autoFocus
            autoComplete="off"
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            name="website"
            placeholder="Enter website link"
            value={website}
            autoComplete="off"
            onChange={(e) => setWebsite(e.target.value)}
          />
        </InputGroup>
        <Button variant="primary" type="submit" value="Save Company">
          Add
        </Button>{' '}
      </Form>
    </Fragment>
  );
}

export default AddCompany;
