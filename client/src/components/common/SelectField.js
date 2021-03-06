import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectField = ({
	name,
	value,
	error,
	info,
	onChange,
	autoComplete,
	options
}) => {
	const selectOptions = options.map(option => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	));
	return (
		<div className="form-group">
			<select
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				autoComplete={autoComplete}
				name={name}
				value={value}
				onChange={onChange}>
				{selectOptions}
			</select>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

SelectField.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	autoComplete: PropTypes.string,
	options: PropTypes.array.isRequired
};

export default SelectField;
