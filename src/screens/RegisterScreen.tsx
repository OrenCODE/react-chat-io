import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {useSignupMutation} from "../store/endpoints/authEndpoints.ts";
import {clearErrors, setCredentials, setErrors} from "../store/slices/authSlice.ts";
import "./styles/RegisterScreen.css"

const RegisterScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signup] = useSignupMutation();
    const authError = useAppSelector(state => state.auth.authError);
    const userInfo = useAppSelector(state => state.auth.userInfo);
    const validationErrors = useAppSelector(state => state.auth.validationErrors);

    const [formData, setFormData] = useState({firstName: "", lastName: "", email: "", password: ""});
    const {firstName, lastName, email, password} = formData;

    useEffect(() => {
        if (userInfo) navigate("/chat");
        dispatch(clearErrors());
    }, [userInfo]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const userDetails = {email, password, name: `${firstName} ${lastName}`};

        try {
            const res = await signup(userDetails).unwrap();
            dispatch(setCredentials({...res}));
            navigate("/chat");
        } catch (error) {
            dispatch(setErrors(error));
        }
    }

    const inputError = (error: string) => {
        if (error) return <span className="validation-error">{error}</span>
    }

    const renderRegisterError = () => {
        if (authError) {
            return (
                <div className="auth-error-wrapper">
                    <div className="auth-error">{authError}</div>
                </div>
            );
        }
    }

    return (
        <div className="register-page">
            <div className="auth-inner">
                <form onSubmit={onSubmit}>
                    <h1 className="form-title">Sign Up</h1>
                    <div className="mb-4">
                        <input
                            required
                            value={firstName}
                            name="firstName"
                            type="text"
                            className="form-control"
                            placeholder="First name"
                            onChange={onChange}
                        />
                        {inputError(validationErrors?.name)}
                    </div>
                    <div className="mb-4">
                        <input
                            required
                            value={lastName}
                            name="lastName"
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            required
                            value={email}
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={onChange}
                        />
                        {inputError(validationErrors?.email)}
                    </div>
                    <div className="mb-4">
                        <input
                            required
                            value={password}
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={onChange}
                        />
                        {inputError(validationErrors?.password)}
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>
                    <p className="login-link">
                        Already registered <a href="/login">sign in?</a>
                    </p>
                    {renderRegisterError()}
                </form>
            </div>
        </div>
    )
}

export default RegisterScreen
