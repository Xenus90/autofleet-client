import { Box, Typography, Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { Vehicle } from '../api/vehicles.api.models';
import logo from '../assets/logo.png';

type Props = {
    isLoading: boolean,
    polygonPointsLength: number,
    vehicles: Vehicle[],
    onFindVehicles: () => void,
    onClearPolygonPoints: () => void,
};

export const ControlsComponent = (props: Props) => {
    const { isLoading, polygonPointsLength, vehicles, onFindVehicles, onClearPolygonPoints } = props;

    return (
        <>
            <img src={logo} alt="logo" style={{ width: '90%', height: 'auto' }} />
            <Box display="flex" justifyContent="center" my={2}>
                <Typography variant="h5">Controls</Typography>
            </Box>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Box>
                        <Typography>{`Selected points: ${polygonPointsLength}/4`}</Typography>
                    </Box>
                    <Box mt={2} display="flex" justifyContent="space-around">
                        <Button variant="outlined" disabled={polygonPointsLength !== 4} onClick={onFindVehicles}>Find vehicles</Button>
                        <Button variant="outlined" color="error" onClick={onClearPolygonPoints}>Delete polygon</Button>
                    </Box >
                    <Box mt={2}>
                        <Typography variant="subtitle2">*Right mouse click on polygon will delete it</Typography>
                    </Box>
                    {vehicles.length === 0 ? (
                        <Box mt={4} display="flex" justifyContent="center">
                            <Typography>No vehicles found</Typography>
                        </Box>
                    ) : (
                        <Box>
                            <Box mt={4} display="flex" justifyContent="center">
                                <Typography variant="h6">{`Found ${vehicles.length} vehicles`}</Typography>
                            </Box>
                            <Box height="75vh" overflow="auto">
                                <List>
                                    {vehicles.map((vehicle, index) => (
                                        <ListItem key={index}>
                                            <ListItemText
                                                primary={`Id: ${vehicle.id}`}
                                                secondary={`State: ${vehicle.state}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Box>
                    )}
                </>)}
        </>
    );
};
