import React, { Component } from 'react';
// Handle states and validation of the form
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    // Destructuring to access property on nested objects
    const { meta: { touched, error } } = field;
    // const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`; becomes:
    const className = `form-group ${touched && error ? 'has-danger' : '' }`;
    const alertClass = `${ touched && error ? 'alert alert-danger' : '' }`;

    return (
      <div className={ className }>
        <label>{ field.label }</label>

        <div className={ alertClass }>
          { touched ? error : '' }
        </div>

        <input
          className="form-control form-inputField"
          type="text"
          { ...field.input }
        />
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      // Return to homepage after createPost success
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <h1 className="form-title">Dear diary</h1>
        
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            label="Title"
            name="title"
            component={ this.renderField }
          />

          <Field
            label="Categories"
            name="categories"
            component={ this.renderField }
          />

          <Field
            label="Content"
            name="content"
            component={ this.renderField }
          />

          <button type="submit" className="btn submit-btn">Submit</button>
          <Link to="/" className="btn cancel-btn">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title that is at least 3 characters!";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories!";
  }
  if (!values.content) {
    errors.content = "Enter some content please!";
  }

  // If errors is empty, the form is fine to submit
  // If errors has any properties, redux form assumes form is invalid
  return errors;
}

// reduxForm has ability to communicate directly from this component to the reducer
export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
