import {FormEvent, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {useSignupMutation} from "../store/endpoints/authEndpoints.ts";
import {resetErrors, setCredentials, setErrors} from "../store/slices/authSlice.ts";
import {
  Box,
  Grid,
  Avatar,
  Button,
  Container,
  Typography,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useInputValidation from "../hooks/useInputValidation.ts";
import {validationRules} from "../utils/formValidations.ts";
import {AvatarStyles, Box1Styles, Box2Styles, ContainerStyles, LinkStyles} from "./styles/Auth.style.ts";

const SignupScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup] = useSignupMutation();
  const authError = useAppSelector(state => state.auth.authError);
  const userInfo = useAppSelector(state => state.auth.userInfo);

  const {values, errors, isValid, handleChange, handleBlur} = useInputValidation({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }, validationRules)

  useEffect(() => {
    if (userInfo) navigate("/chat");
    dispatch(resetErrors());
  }, [userInfo]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const userDetails = {
      email: values.email,
      password: values.password,
      name: `${values.firstName} ${values.lastName}`
    };

    try {
      const res = await signup(userDetails).unwrap();
      dispatch(setCredentials({...res}));
      navigate("/chat");
    } catch (error) {
      dispatch(setErrors(error));
    }
  }

  return (
    <Container maxWidth="xs" sx={ContainerStyles}>
      <Box sx={Box1Styles}>
        <Avatar sx={AvatarStyles}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {authError && (
          <Typography color="error" align="center" sx={{mt: 2}}>
            {authError}
          </Typography>
        )}
        <Box component="form" noValidate onSubmit={onSubmit} sx={Box2Styles}>
          <TextField
            margin="normal"
            required
            fullWidth
            type="firstName"
            autoComplete="given-name"
            name="firstName"
            id="firstName"
            label="First Name"
            autoFocus
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.firstName}
            helperText={errors.firstName || ' '}
          />
          <TextField
            sx={{mb: 1}}
            required
            fullWidth
            type="lastName"
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.lastName}
            helperText={errors.lastName || ' '}
          />
          <TextField
            sx={{mb: 1}}
            fullWidth
            id="email"
            name="email"
            type="email"
            label="Email Address"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.email}
            helperText={errors.email || ' '}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.password}
            helperText={errors.password || ' '}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            disabled={!isValid}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/signin" style={LinkStyles}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignupScreen
