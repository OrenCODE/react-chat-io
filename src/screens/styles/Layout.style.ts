import styled from "styled-components";
import {Button} from "@mui/material";

export const Layout = styled.div`
    height: calc(100vh - 64px)
`
export const UserButton = styled(Button)({
    color: 'white',
    textTransform: 'none',
});

export const UserButtonIconStyles = {
    fontSize: 30
}

export const AppBarTitleStyles = {
    flexGrow: 1,
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
}
