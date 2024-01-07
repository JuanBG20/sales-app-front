const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  padding: 1,
  width: "100%",
};

const buttons = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: 1,
  width: "100%",
};

module.exports = {
  modalStyle,
  formStyle,
  buttons,
};
