import React, { useReducer } from 'react';
import createDataContext from './createDataContext';


const blogReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'delete_blogpost':
      return state.filter(blogPost => blogPost.id !== payload)
    case 'add_blogpost':
      return [...state, { id: Math.floor(Math.random() * 99999), title: payload.title, content: payload.content}];
    default:
      return state;
  }
};

const addBlogPost = dispatch => (title, content, callback) => {
  dispatch({ type: 'add_blogpost', payload: {title, content}});
  callback();
};

const deleteBlogPost = dispatch => id => dispatch({ type: 'delete_blogpost', payload: id})

export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, deleteBlogPost }, [])