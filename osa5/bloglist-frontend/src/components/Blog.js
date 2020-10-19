import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, like, remove }) => {
  var [view, setView] = useState(false);
  return (
    <div className='blog'
      style={{
        padding: "1rem",
        margin: "1rem",
        borderRadius: "0.25rem",
        border: "1px solid #e5e5e5",
      }}
    >
      {blog.title} {blog.author}{" "}
      <button onClick={() => setView(!view)}>{view ? "hide" : "view"}</button>
      {view ? (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button id='like-button' onClick={() => like(blog)}>like</button>
          </p>
          <p>{blog.user.name}</p>
          <button
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
