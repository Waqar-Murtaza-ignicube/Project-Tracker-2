import React from 'react'
import Button from '../../../components/Button'

const CreateCompany = ({handleSubmit, handleChange, company}) => {
  return (
    <form onSubmit={handleSubmit}>
        <h2>Enter Company Details </h2>
        <label htmlFor="company_name">Company Name</label>
        <input
          type="text"
          name="company_name"
          id="company_name"
          value={company.company_name}
          onChange={handleChange}
        />
        <label htmlFor="company_employees">Company Employees</label>
        <input
          type="number"
          name="company_employees"
          id="company_employees"
          value={company.company_employees}
          onChange={handleChange}
        />
        <label htmlFor="company_type">Company Type</label>
        <select
          name="company_type"
          id="company_type"
          value={company.company_type}
          onChange={handleChange}
        >
          <option value="software company">Software Company</option>
          <option value="trading agency">Trading Agency</option>
          <option value="media agency">Media Agency</option>
        </select>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          id="country"
          value={company.country}
          onChange={handleChange}
        />
        <Button />
      </form>
  )
}

export default CreateCompany