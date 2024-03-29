import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useLoginMutation} from "../store/endpoints/authEndpoints.ts";
import {clearErrors, setCredentials, setErrors} from "../store/slices/authSlice.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {redirectByRole} from "../utils/redirectByRole.ts";
import "./styles/LoginScreen.css";

const LoginScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login] = useLoginMutation();
    const authError = useAppSelector(state => state.auth.authError);
    const userInfo = useAppSelector(state => state.auth.userInfo);

    const [formData, setFormData] = useState({email: "", password: ""});
    const {email, password} = formData;

    useEffect(() => {
        dispatch(clearErrors());
        redirectByRole(userInfo, navigate);
    }, [userInfo]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const userDetails = {email: email.toLowerCase(), password}

        try {
            const res = await login(userDetails).unwrap();
            dispatch(setCredentials({...res}));
            redirectByRole(userInfo, navigate);
        } catch (error) {
            dispatch(setErrors(error));
        }

    }

    const renderLoginError = () => {
        if (authError) {
            return (
                <div className="auth-error-wrapper">
                    <div className="auth-error">{authError}</div>
                </div>
            );
        }
    };

    return (
        <div className="login-page">
            <div className="auth-inner">
                <form onSubmit={onSubmit}>
                    <h1>Sign In</h1>
                    <div className="mb-4">
                        <input
                            required
                            value={email}
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            autoComplete="email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            required
                            value={password}
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            autoComplete="current-password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    {renderLoginError()}
                </form>
            </div>
        </div>
    );
}

export default LoginScreen

