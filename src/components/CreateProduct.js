import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import axios from 'axios';

function CreateProduct({
  clickedRow,
  setProducts,
  setFormData,
  formData,
  products,
}) {
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const createProductApi = (data) => {
    const url = 'https://5f2d045b8085690016922b50.mockapi.io/todo-list/products';

    axios({
      method: 'POST',
      url: url,
      data: data,
    }).then(
      (response) => {
        const { data } = response;
        setProducts([
          ...products,
          data
        ]);
      }
    )
    .catch((error) => {
      console.log(error.response);
    });
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (clickedRow == -1) {
      createProductApi(formData);
    } else {
      // Update: updateProductApi()
    }

  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={ onSubmitHandler }>
        <TextField
          fullWidth
          label="Id"
          name="id"
          disabled
          variant="filled"
          style={{ marginTop: '20px' }}
          onChange={onChangeHandler}
          value={ formData.id } />
        <TextField
          fullWidth
          name="name"
          variant="filled"
          style={{ marginTop: '20px' }}
          onChange={onChangeHandler}
          label="Name"
          value={formData.name} />
        <TextField
          fullWidth
          label="Price"
          name="price"
          variant="filled"
          style={{ marginTop: '20px' }}
          onChange={onChangeHandler}
          value={formData.price} />
        <Button
          style={{ marginTop: '20px' }}
          type="submit"
          color="primary">Submit</Button>
      </form>
    </Container>
  );
}

export default CreateProduct;
