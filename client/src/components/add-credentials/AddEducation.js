import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextField from '../common/TextField';
import TextArea from '../common/TextArea';
import PropTypes from 'prop-types';
import { addEducation } from '../../redux/actions/profileActions';

class AddEducation extends Component {
	state = {
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
		errors: {},
		disabled: false
	};

	onSubmit = e => {
		e.preventDefault();
		const eduData = {
			school: this.state.school,
			degree: this.state.degree,
			fieldofstudy: this.state.fieldofstudy,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};

		this.props.addEducation(eduData, this.props.history);
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onCheck = e => {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		});
	};

	// componentWillRecieveProps is deprecated
	static getDerivedStateFromProps(nextProps) {
		if (nextProps.errors) {
			return {
				errors: nextProps.errors
			};
		}
		return null;
	}

	render() {
		const { errors } = this.state;
		return (
			<div className="add-education">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Add Education</h1>
							<p className="lead text-center">
								Add any schools, bootcamp etc you have attended
							</p>
							<form onSubmit={this.onSubmit}>
								<TextField
									placeholder="School"
									name="school"
									value={this.state.school}
									onChange={this.onChange}
									error={errors.school}
								/>
								<TextField
									placeholder="Degree or Certification"
									name="degree"
									value={this.state.degree}
									onChange={this.onChange}
									error={errors.degree}
								/>
								<TextField
									placeholder="Field of Study"
									name="fieldofstudy"
									value={this.state.fieldofstudy}
									onChange={this.onChange}
									error={errors.fieldofstudy}
								/>
								<h6>From Date</h6>
								<TextField
									type="date"
									name="from"
									value={this.state.from}
									onChange={this.onChange}
									error={errors.from}
								/>
								<h6>To Date</h6>
								<TextField
									type="date"
									name="to"
									value={this.state.to}
									onChange={this.onChange}
									error={errors.to}
									disabled={this.state.disabled ? 'disabled' : ''}
								/>
								<div className="form-check mb-4">
									<input
										type="checkbox"
										className="form-check-input"
										name="current"
										value={this.state.current}
										checked={this.state.current}
										onChange={this.onCheck}
									/>
									<label htmlFor="current" className="form-check-label">
										Current
									</label>
									<TextArea
										placeholder="Program Description"
										name="description"
										value={this.state.description}
										onChange={this.onChange}
										error={errors.description}
										info="Tell us about the program of study"
									/>
									<input
										type="submit"
										value="Submit"
										className="btn btn-info btn-block mt-4"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddEducation.propTypes = {
	history: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addEducation }
)(withRouter(AddEducation));
