import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

async function createBlog(blog, user) {
  var response = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data;
}

async function updateBlog(blog) {
  return await axios.put(`${baseUrl}/${blog.id}`, blog);
}

function removeBlog(user, id) {
  return axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
}

export default { getAll, createBlog, updateBlog, removeBlog };
