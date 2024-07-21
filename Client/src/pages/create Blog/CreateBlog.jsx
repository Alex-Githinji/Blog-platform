import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './create.css';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (formValues, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      const data = await response.json();
      if (data.success) {
        // alert("Blog Created Successfully");
        console.log(data);
        navigate("/blog");
        setSubmitting(false);
        setLoading(false);
      } else {
        setError(data.message);
        setSubmitting(false);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setSubmitting(false);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      summary: '',
      Author: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Enter the title'),
      summary: Yup.string()
        .max(500, 'Must be 500 characters or less')
        .required('Required'),
      Author: Yup.string() 
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className="blog-form-container">
      <h2>Create a New Blog Post</h2>
      <form className="blog-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="error">{formik.errors.title}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            className="form-control"
            id="summary"
            name="summary"
            placeholder="Summary"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.summary}
          />
          {formik.touched.summary && formik.errors.summary ? (
            <div className="error">{formik.errors.summary}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="Author">Author</label>
          <input
            type="text"
            className="form-control"
            id="Author"
            name="Author"
            placeholder="Author"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Author}
          />
          {formik.touched.Author && formik.errors.Author ? (
            <div className="error">{formik.errors.Author}</div>
          ) : null}
        </div>
        
  

        <button type="submit" className="btn btn-primary " disabled={loading}>
          {loading ? <div class="loader">
    <span class="loader-text">loading</span>
      <span class="load"></span>
  </div> : 'Create Post'}
        </button>
        {error && <div className="error"><p>{error}</p></div>}
      </form>
    </div>
  );
};

export default CreateBlog;
