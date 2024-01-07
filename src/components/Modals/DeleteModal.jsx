import { Box, Button, Modal, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { buttons, modalStyle } from "./Styles";

export default function DeleteModal({
  dmOpen,
  setDMOpen,
  dId,
  sales,
  setSales,
}) {
  const handleDMClose = () => setDMOpen(false);

  const handleDelete = (id) => {
    const newSalesArray = sales.filter((sale) => sale._id !== id);
    setSales(newSalesArray);

    fetch(`http://localhost:8080/sales/${id}`, { method: "DELETE" });

    handleDMClose();
  };

  return (
    <>
      <Modal open={dmOpen} onClose={handleDMClose}>
        <Box sx={modalStyle}>
          <DeleteIcon color="error" sx={{ fontSize: "8rem" }} />

          <Typography
            component="h4"
            sx={{ fontSize: "2rem", fontWeight: "bold", marginTop: "2rem" }}
          >
            ¿Estás seguro?
          </Typography>
          <Typography component="p" sx={{ marginBottom: "1rem" }}>
            Esta acción es irreversible
          </Typography>

          <Box sx={buttons} component="div">
            <Button
              sx={{ width: "40%" }}
              variant="contained"
              onClick={() => handleDelete(dId)}
            >
              Confirmar
            </Button>
            <Button
              sx={{ width: "40%" }}
              variant="contained"
              color="error"
              onClick={handleDMClose}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
