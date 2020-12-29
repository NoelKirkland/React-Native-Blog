import React, { useReducer } from 'react';
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';
import { call } from 'react-native-reanimated';


const blogReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'get_blogposts':
      return action.payload;
    case 'edit_blogpost':
      return state.map(blogPost => blogPost.id === payload.id ? action.payload : blogPost);
    case 'delete_blogpost':
      return state.filter(blogPost => blogPost.id !== payload);
    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get('/blogposts');

    dispatch({ type: 'get_blogposts', payload: response.data })
  };
};

const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', { title, content });

    if (callback) {
      callback();
    }
  }
};

const deleteBlogPost = dispatch => async id => {
  await jsonServer.delete(`/blogposts/${id}`);

  dispatch({ type: 'delete_blogpost', payload: id});
}

const editBlogPost = dispatch => async (id, title, content, callback) => {
  await jsonServer.put(`/blogposts/${id}`, { title, content});

  dispatch({
    type: 'edit_blogpost',
    payload: { id, title, content }
  });
  if (callback) {
    callback();
  }
}

export const { Context, Provider } = createDataContext(blogReducer, { getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost }, [])