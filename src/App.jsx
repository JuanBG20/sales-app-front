import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useEffect, useState } from "react";

import NewModal from "./components/Modals/NewModal";
import DeleteModal from "./components/Modals/DeleteModal";
import EditModal from "./components/Modals/EditModal";

const titleStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 3,
};

export default function App() {
  const [sales, setSales] = useState([]);
  const [total, setTotal] = useState(0);
  const [nmOpen, setNMOpen] = useState(false);
  const [dmOpen, setDMOpen] = useState(false);
  const [emOpen, setEMOpen] = useState(false);
  const [dId, setDId] = useState();
  const [mSale, setMSale] = useState({});

  const handleNMOpen = () => setNMOpen(true);
  const handleDMOpen = () => setDMOpen(true);
  const handleEMOpen = () => setEMOpen(true);

  const fetchSales = () => {
    fetch("http://localhost:8080/sales")
      .then((res) => res.json())
      .then(({ sales }) => setSales(sales));
  };

  useEffect(() => fetchSales, []);

  useEffect(() => {
    let subtotalAcumulado = 0;

    sales.forEach(({ uPrice, quantity }) => {
      const subtotal = uPrice * quantity;
      subtotalAcumulado += subtotal;
    });

    setTotal(subtotalAcumulado);
  }, [sales]);

  return (
    <>
      <Box sx={titleStyle} component="div">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="./favicon.ico"
            alt=""
            style={{ width: "4rem", marginRight: "1rem" }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              textDecoration: "underline",
              textDecorationThickness: "3px",
              textUnderlineOffset: "3px",
            }}
          >
            Ventas
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNMOpen}
        >
          Nueva Venta
        </Button>
      </Box>

      {nmOpen ? (
        <NewModal
          sales={sales}
          setSales={setSales}
          nmOpen={nmOpen}
          setNMOpen={setNMOpen}
        />
      ) : (
        ""
      )}

      {dmOpen ? (
        <DeleteModal
          dmOpen={dmOpen}
          setDMOpen={setDMOpen}
          dId={dId}
          sales={sales}
          setSales={setSales}
        />
      ) : (
        ""
      )}

      {emOpen ? (
        <EditModal
          emOpen={emOpen}
          setEMOpen={setEMOpen}
          mSale={mSale}
          sales={sales}
          total={total}
          setTotal={setTotal}
        />
      ) : (
        ""
      )}

      <TableContainer
        component={Paper}
        sx={{ maxWidth: "80rem", margin: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Día</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio Unitario</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales?.map(({ _id, day, product, quantity, uPrice }) => (
              <TableRow key={_id}>
                <TableCell>{day}</TableCell>
                <TableCell>{product}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>$ {uPrice}</TableCell>
                <TableCell>$ {uPrice * quantity}</TableCell>
                <TableCell>
                  <IconButton
                    color="warning"
                    onClick={() => {
                      setMSale({ _id, day, product, quantity, uPrice });
                      handleEMOpen();
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setDId(_id);
                      handleDMOpen();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell>Total:</TableCell>
              <TableCell>$ {total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
