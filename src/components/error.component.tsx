import { Box, Typography } from '@mui/material';

type Props = {
    message: string,
}

export const ErrorComponent = (props: Props) => {
    const { message } = props;

    return (
        <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h2">{message}</Typography>
        </Box>
    );
};
