import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, like, remove }) => {
  var [view, setView] = useState(false);
  return (
    <div className='blog'>
      <span className='blog__title'>{blog.title}</span> <span className='blog__author'>{blog.author}</span>{" "}
      <button className='blog__button' onClick={() => setView(!view)}>{view ? "hide" : "view"}</button>
      {view ? (
        <div class="blog__content">
          <a href="#" className="blog__url">{blog.url}</a>
          <p>
            likes {blog.likes}
            <button className='like__button' id='like-button' onClick={() => like(blog)}>like</button>
          </p>
          <p>{blog.user.name}</p>
          <button className='remove__button'
            onClick={() =>
              window.confirm(`Remove blog '${blog.title}'?`) && remove(blog)
            }
          >
            remove
          </button>
        </div>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  like: PropTypes.func,
  remove: PropTypes.func,
};

export default Blog;
