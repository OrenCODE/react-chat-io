import {RootState} from "../../store";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useLoginMutation} from "../../store/endpoints/authEndpoints.ts";
import {clearErrors, setCredentials, setErrors} from "../../store/slices/authSlice.ts";

const LoginScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login] = useLoginMutation();
    const authError = useSelector((state: RootState) => state.auth.authError);

    const [formData, setFormData] = useState({email: "", password: ""});
    const {email, password} = formData;

    useEffect(() => {
        dispatch(clearErrors());
    }, []);

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
            navigate("/chat");
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
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={onSubmit}>
                    <h3>Sign In</h3>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            required
                            value={email}
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            required
                            value={password}
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
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

