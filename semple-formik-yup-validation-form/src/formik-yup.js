import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Stack,
  TextField,
  FormControlLabel,
  FormLabel,
  FormControl,
  Radio,
  RadioGroup,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";

// import Iconify from "../components/Iconify";

const Input = styled("input")({
  display: "none",
});

function CreateAgreementModal(props) {
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [creator, setCreator] = React.useState("buyer");
  const [buyer, setBuyer] = useState("");
  const [seller, setSeller] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stackPercent, setStackPercent] = useState("");
  const [sellerPercent, setSellerPercent] = useState("");
  //   const [error, setError] = useState("");
  //   const [buyerror, setBuyError] = useState("");
  //   const [sellerror, setSellError] = useState("");

  const titleHandler = (e) => setTitle(e.target.value);
  const descriptionHandler = (e) => setDescription(e.target.value);
  const buyerHandler = (e) => setBuyer(e.target.value);
  const sellerHandler = (e) => setSeller(e.target.value);
  const priceHandler = (e) => setPrice(e.target.value);
  const percentHandler = (e) => setStackPercent(e.target.value);
  const sellerPercentHandler = (e) => setSellerPercent(e.target.value);

  const handleChange = (event) => {
    setCreator(event.target.value);
  };

  const submitAgreement = (e) => {
    e.preventDefault();
    console.log(submitAgreement, "aaaaaa");

    if (creator == "buyer") {
      setBuyer(props.currentAddress);
    } else {
      setSeller(props.currentAddress);
    }

    const data = { buyer, seller, price, stackPercent, sellerPercent };
    console.log(data, "data");
    setTitle("");
    setDescription("");
    setBuyer("");
    setSeller("");
    setPrice("");
    setStackPercent("");
    setSellerPercent("");
    // Mine;
    props.onFormSubmit(data);
  };

  //   Formik disha

  const RegisterSchema = Yup.object().shape({
    title: Yup.string().required("Required this field!"),
    description: Yup.string().required("Required this field!"),
    buyerAddress: Yup.string().required("Required this field!"),
    sellerAddress: Yup.string().required("Required this field!"),
    price: Yup.number()
      .required("Required this field!")
      .min(0, "Price should be > 0."),
    stakePercentBuyer: Yup.number()
      .typeError("you must specify a number")
      .min(0, "Min value 0.")
      .max(100, "Max value 100.")
      .required("Please enter  % between 0 to 100"),
    stakePercentSeller: Yup.number()
      .max(100, "Max value 100")
      .min(0, "Min value 0.")
      .required("Please enter   % between 0 to 100"),
    // email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    // password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      buyerAddress: "",
      sellerAddress: "",
      price: "",
      stakePercentBuyer: "",
      stakePercentSeller: "",
    },
    validationSchema: RegisterSchema,
    // onSubmit: () => {
    //   alert(e.target);

    // },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <div>
      {/* <Dialog open={props.op} onClose={props.close} fullWidth>  -------For open a dilouge on any button click */}
        <FormikProvider value={formik} className={Container}>
          <DialogContent style={{ overflowX: "hidden" }}>
            <Form
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit}
              style={{
                // width: "50vw",
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
                // marginTop: "100px",
              }}
            >
              <Stack spacing={3}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    I am a
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={creator}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="buyer"
                      control={<Radio />}
                      label="Buyer"
                    />
                    <FormControlLabel
                      value="seller"
                      control={<Radio />}
                      label="Seller"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  type="title"
                  // required
                  onChange={titleHandler}
                  value={title}
                  {...getFieldProps("title")}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  fullWidth
                  name="description"
                  type="text"
                  label="Description"
                  // required
                  onChange={descriptionHandler}
                  value={description}
                  {...getFieldProps("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
                {creator === "buyer" ? (
                  <TextField
                    fullWidth
                    name="sellerAddress"
                    type="text"
                    label="SellerAddress"
                    // required
                    onChange={sellerHandler}
                    // value={seller}
                    {...getFieldProps("sellerAddress")}
                    error={Boolean(
                      touched.sellerAddress && errors.sellerAddress
                    )}
                    helperText={touched.sellerAddress && errors.sellerAddress}
                  />
                ) : (
                  <TextField
                    fullWidth
                    name="buyerAddress"
                    type="text"
                    label="BuyerAddress"
                    // required
                    onChange={buyerHandler}
                    // value={buyer}
                    {...getFieldProps("buyerAddress")}
                    error={Boolean(touched.buyerAddress && errors.buyerAddress)}
                    helperText={touched.buyerAddress && errors.buyerAddress}
                  />
                )}

                <TextField
                  fullWidth
                  name="price"
                  type="number"
                  label="Price (in MATIC)"
                  //   required
                  onChange={priceHandler}
                  value={price}
                  {...getFieldProps("price")}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                />
                <TextField
                  fullWidth
                  name="stakePercentBuyer"
                  type="number"
                  label="Stake Percentage Buyer %"
                  //   required
                  onChange={percentHandler}
                  value={stackPercent}
                  {...getFieldProps("stakePercentBuyer")}
                  error={Boolean(
                    touched.stakePercentBuyer && errors.stakePercentBuyer
                  )}
                  helperText={
                    touched.stakePercentBuyer && errors.stakePercentBuyer
                  }
                />
                <TextField
                  fullWidth
                  name="stakePercentSeller"
                  type="number"
                  label="Stake Percentage Seller %"
                  //   required
                  onChange={sellerPercentHandler}
                  value={sellerPercent}
                  {...getFieldProps("stakePercentSeller")}
                  error={Boolean(
                    touched.stakePercentSeller && errors.stakePercentSeller
                  )}
                  helperText={
                    touched.stakePercentSeller && errors.stakePercentSeller
                  }
                />

                {/* ----------------------------------------------- */}
              </Stack>
              <DialogActions>
                {/* <p style={{ color: "red" }}>Error</p> */}

                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Create Contract
                </LoadingButton>
                <Button onClick={props.close} variant="contained">
                  Cancel
                </Button>
              </DialogActions>
            </Form>
          </DialogContent>
        </FormikProvider>

        {/*---------------- Jaydip code-------------------------------------------------------- */}
        {/* <form onSubmit={submitAgreement}>
          <DialogTitle>Create New Contract</DialogTitle>
          <DialogContent style={{ paddingTop: 10 }}>
            <Stack spacing={3}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  I am a
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={creator}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="buyer"
                    control={<Radio />}
                    label="Buyer"
                  />
                  <FormControlLabel
                    value="seller"
                    control={<Radio />}
                    label="Seller"
                  />
                </RadioGroup>
              </FormControl>
        {/* <TextField
                fullWidth
                label="Title"
                name="title"
                type="text"
                // required
                onChange={titleHandler}
                value={title}
                // {...getFieldProps('title')}
                // error={Boolean(touched.title && errors.title)}
                // helperText={touched.title && errors.title}
              />
              <TextField
                fullWidth
                name="description"
                type="text"
                label="Description"
                // required
                onChange={descriptionHandler}
                value={description}
                // error={Boolean(error && error)}
              /> */}

        {/* {creator === "buyer" ? (
                <TextField
                  fullWidth
                  type="text"
                  label="SellerAddress"
                  required
                  onChange={sellerHandler}
                  value={seller}
                  error={Boolean(sellerror && sellerror)}
                  helperText={sellerror && sellerror}
                />
              ) : (
                <TextField
                  fullWidth
                  type="text"
                  label="BuyerAddress"
                  required
                  onChange={buyerHandler}
                  value={buyer}
                  error={Boolean(buyerror && buyerror)}
                  helperText={buyerror && buyerror}
                />
              )}

              <TextField
                fullWidth
                type="number"
                label="Price (in MATIC)"
                required
                onChange={priceHandler}
                value={price}
                // error={Boolean(error && error)}
              />
              <TextField
                fullWidth
                type="number"
                label="Stake Percentage Buyer %"
                required
                onChange={percentHandler}
                value={stackPercent}
                // error={Boolean(error && error)}
              />
              <TextField
                fullWidth
                type="number"
                label="Stake Percentage Seller %"
                required
                onChange={sellerPercentHandler}
                value={sellerPercent}
                // error={Boolean(error && error)}
              />
            </Stack>
          </DialogContent>
          <DialogActions> */}
        {/* <p style={{ color: "red" }}>{error}</p> */}
        {/* <LoadingButton type="submit" variant="contained">
              Create Contract
            </LoadingButton>
            <Button onClick={props.close} variant="contained">
              Cancel
            </Button>
          </DialogActions> */}
        {/* </form>  */}
      {/* </Dialog> ------------------>>>>>For Open the dilouge on click on any button*/} 
    </div>
  );
}

export default CreateAgreementModal;
