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

const initialState = {
  day: "",
  product: "",
  quantity: 0,
  uPrice: 0,
};

export default function NewModal({ sales, setSales, nmOpen, setNMOpen }) {
  const [newSale, setNewSale] = useState(initialState);

  const handleNMClose = () => setNMOpen(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewSale({ ...newSale, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSale),
    })
      .then((res) => res.json())
      .then((data) => {
        setSales([...sales, data.sale]);
      })
      .catch((err) => console.log(err));

    setNewSale(initialState);

    handleNMClose();
  };

  return (
    <>
      <Modal open={nmOpen} onClose={handleNMClose}>
        <Box sx={modalStyle}>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "xx-large",
            }}
            component="h3"
          >
            Nueva Venta
          </Typography>

          <Box sx={formStyle} component="form" onSubmit={handleSubmit}>
            <TextField
              label="Día"
              margin="normal"
              name="day"
              onChange={handleChange}
            />
            <TextField
              label="Producto"
              margin="normal"
              name="product"
              onChange={handleChange}
              required
            />
            <TextField
              label="Cantidad"
              type="number"
              margin="normal"
              name="quantity"
              onChange={handleChange}
              required
            />
            <TextField
              label="Precio Unitario"
              type="number"
              margin="normal"
              name="uPrice"
              onChange={handleChange}
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
                onClick={handleNMClose}
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
