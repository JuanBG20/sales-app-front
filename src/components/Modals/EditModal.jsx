import {
  Box,
  Button,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { modalStyle, formStyle, buttons } from "./Styles";

export default function EditModal({
  emOpen,
  setEMOpen,
  mSale,
  sales,
  total,
  setTotal,
}) {
  const [modifiedSale, setModifiedSale] = useState({
    day: mSale.day,
    product: mSale.product,
    quantity: mSale.quantity,
    uPrice: mSale.uPrice,
  });

  const handleEMClose = () => setEMOpen(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setModifiedSale({ ...modifiedSale, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const i = sales.findIndex((sale) => sale._id === mSale._id);
    sales[i] = { ...modifiedSale, _id: mSale._id };

    const newTotal =
      total -
      mSale.uPrice * mSale.quantity +
      modifiedSale.uPrice * modifiedSale.quantity;
    setTotal(newTotal);

    fetch(`${process.env.REACT_APP_BACK_URL}/sales/${mSale._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifiedSale),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    setModifiedSale({});

    handleEMClose();
  };

  return (
    <>
      <Modal open={emOpen} onClose={handleEMClose}>
        <Box sx={modalStyle}>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "xx-large",
            }}
            component="h3"
          >
            Modificar Venta
          </Typography>

          <Box sx={formStyle} component="form" onSubmit={handleSubmit}>
            <TextField
              label="Día"
              margin="normal"
              name="day"
              onChange={handleChange}
              value={modifiedSale.day}
            />
            <TextField
              label="Producto"
              margin="normal"
              name="product"
              onChange={handleChange}
              value={modifiedSale.product}
              required
            />
            <TextField
              label="Cantidad"
              type="number"
              margin="normal"
              name="quantity"
              onChange={handleChange}
              value={modifiedSale.quantity}
              required
            />
            <TextField
              label="Precio Unitario"
              type="number"
              margin="normal"
              name="uPrice"
              onChange={handleChange}
              value={modifiedSale.uPrice}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />

            <Box sx={buttons} component="div">
              <Button sx={{ width: "40%" }} variant="contained" type="submit">
                Confirmar
              </Button>
              <Button
                sx={{ width: "40%" }}
                variant="contained"
                color="error"
                onClick={handleEMClose}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
