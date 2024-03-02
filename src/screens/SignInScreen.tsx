import {FormEvent, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useLoginMutation} from "../store/endpoints/authEndpoints.ts";
import {resetErrors, setCredentials, setErrors} from "../store/slices/authSlice.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {redirectByRole} from "../utils/redirectByRole.ts";
import {Link} from "react-router-dom"

import {
    Box,
    Grid,
    Avatar,
    Button,
    Container,
    Typography,
    Checkbox,
    TextField,
    FormControlLabel
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    AvatarStyles,
    Box1Styles,
    Box2Styles, ContainerStyles, LinkStyles,
    PasswordInputStyles,
    SubmitButtonStyles
} from "./styles/Auth.style.ts";
import useInputValidation from "../hooks/useInputValidation.ts";
import {validationRules} from "../utils/formValidations.ts";


const SignInScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login] = useLoginMutation();
    const authError = useAppSelector(state => state.auth.authError);
    const userInfo = useAppSelector(state => state.auth.userInfo);

    const {values, errors, isValid, handleChange, handleBlur, clearErrors} = useInputValidation({
        email: '',
        password: ''
    }, validationRules);

    useEffect(() => {
        dispatch(resetErrors());
        redirectByRole(userInfo, navigate);
    }, [userInfo, navigate, dispatch]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        clearErrors();
        const userDetails = {email: values.email.toLowerCase(), password: values.password};

        try {
            const res = await login(userDetails).unwrap();
            dispatch(setCredentials({...res}));
            redirectByRole(userInfo, navigate);
        } catch (error) {
            dispatch(setErrors(error));
        }
    };

    return (
        <Container maxWidth="xs" sx={ContainerStyles}>
            <Box sx={Box1Styles}>
                <Avatar sx={AvatarStyles}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {authError && (
                    <Typography color="error" align="center" sx={{mt: 2}}>
                        {authError}
                    </Typography>
                )}
                <Box component="form" onSubmit={onSubmit} noValidate sx={Box2Styles}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
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
                        sx={PasswordInputStyles}
                        required
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        autoComplete="current-password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password || ' '}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={SubmitButtonStyles}
                        disabled={!isValid}
                    >
                        Sign In
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link to="/signup" style={LinkStyles}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignInScreen

