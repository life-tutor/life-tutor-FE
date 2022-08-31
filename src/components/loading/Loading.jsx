import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Loading = () => {

    return(
        <LoadingWrapper>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </LoadingWrapper>
    )
}

export default Loading;



const LoadingWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    position:fixed;
    width:100vw;
    max-width:480px;
    height:100vh;
    top:0;
    left:0;
    background:rgba(236,236,236,0.7);
`