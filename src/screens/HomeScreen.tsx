import {Link} from "react-router-dom";
//
// const HomeScreen = () => {
//
//     return (
//         <div className="home-screen">
//             <div className="hero">
//                 <h1>Welcome to MY App</h1>
//                 <p>This project encompasses the frontend component, developed using React (Vite) and Redux Toolkit.
//                     It provides an interface to interact with backend endpoints, facilitating functionalities such as
//                     chat, user and payment management, and access to the documentation of this full-stack project.</p>
//                 <Link to="/signin">
//                     <button className="start-button">Start Chatting</button>
//                 </Link>
//             </div>
//         </div>
//     );
// }
//
// export default HomeScreen;
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Hero() {
    return (
        <Box
            id="hero"
            sx={(theme) => ({
                width: '100%',
                backgroundImage:
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                        : 'linear-gradient(#02294F, #090E10)',
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat',
            })}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: {xs: 14, sm: 20},
                    pb: {xs: 8, sm: 12},
                }}
            >
                <Stack spacing={2} useFlexGap sx={{width: {xs: '100%', sm: '70%'}}}>
                    <Typography
                        component="h1"
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: {xs: 'column', md: 'row'},
                            alignSelf: 'center',
                            textAlign: 'center',
                        }}
                    >
                        My&nbsp;
                        <Typography
                            component="span"
                            variant="h1"
                            sx={{
                                color: (theme) =>
                                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                            }}
                        >
                            App
                        </Typography>
                    </Typography>
                    <Typography variant="body1" textAlign="center" color="text.secondary">
                        This project encompasses the frontend component, developed using React (Vite) and Redux Toolkit.
                        <br/>
                        It provides an interface to interact with backend endpoints
                        <br/>
                        Facilitating functionalities such as
                        chat, admin management, and documentation of this full-stack project.
                    </Typography>
                    <Typography variant="caption" textAlign="center" sx={{opacity: 0.8}}>
                        By clicking &quot;Start now&quot; you agree to our&nbsp;
                        <Link to="/signin" color="primary">
                            Terms & Conditions
                        </Link>
                        .
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}
