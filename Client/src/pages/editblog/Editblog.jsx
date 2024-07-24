import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './editBlog.css';
import axios from 'axios'

const EditBlog = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('id',id)
  useEffect(() => {
    const fetchBlog = async () => {
        console.log('blog id', id)
      if (id) { 
        try {
          const response = await axios.get(`http://localhost:3001/blogs/${id}`).catch(error => console.log(error))
        //   const data = await response.json();
        //   if (data.success) {
        //     formik.setValues({
        //       title: data.blog.title,
        //       summary: data.blog.summary,
        //       Author: data.blog.Author,
        //     });

        // console.log('done')
        //   } else {
        //     setError(data.message);
        //   }

        console.log('done')
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError('Invalid blog ID');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      title: '',
      summary: '',
      Author: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      summary: Yup.string().required('Summary is required'),
      Author: Yup.string().required('Author is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(`http://localhost:3001/blogs/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (data.success) {
          navigate('/'); 
        } else {
          setError(data.message);
        }
      } catch (e) {
        setError(e.message);
      }
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="edit-blog-container">
      <h1>Edit Blog</h1>
      <form className="edit-blog-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error">{formik.errors.title}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            name="summary"
            value={formik.values.summary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.summary && formik.errors.summary && (
            <div className="error">{formik.errors.summary}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="Author">Author</label>
          <input
            type="text"
            id="Author"
            name="Author"
            value={formik.values.Author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Author && formik.errors.Author && (
            <div className="error">{formik.errors.Author}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
