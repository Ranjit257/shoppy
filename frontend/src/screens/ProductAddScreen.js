import React, { useContext, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../util.js';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REQUEST':
      return { ...state, loadingAdd: true };
    case 'ADD_SUCCESS':
      return { ...state, loadingAdd: false };
    case 'ADD_FAIL':
      return { ...state, loadingAdd: false };
    default:
      return state;
  }
};
export default function ProductAddScreen() {
  const navigate = useNavigate();

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ error, loadingAdd }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [numReviews, setnumReviews] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'ADD_REQUEST' });
      await axios.post(
        '/api/products/admin/addproduct',
        {
          name,
          slug,
          price,
          image,
          category,
          brand,
          rating,
          numReviews,
          countInStock,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'ADD_SUCCESS',
      });
      toast.success('Product Added successfully');
      navigate('/admin/products');

      //console.log(data);
      // ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      // localStorage.setItem('userInfo', JSON.stringify(data));
      // navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'ADD_FAIL' });
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <h1>Add Product</h1>

      {loadingAdd ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>

            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="slug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image File</Form.Label>
            <Form.Control
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="numReviews">
            <Form.Label>Reviews</Form.Label>
            <Form.Control
              value={numReviews}
              onChange={(e) => setnumReviews(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button disabled={loadingAdd} type="submit">
              Add Product
            </Button>
            {loadingAdd && <LoadingBox></LoadingBox>}
          </div>
        </Form>
      )}
    </Container>
  );
}
