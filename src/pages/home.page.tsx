import { useState } from 'react';
import { Grid, Box, Snackbar, Alert } from '@mui/material';
import { ControlsComponent } from '../components/controls.component';
import { MapComponent } from '../components/map.component';
import { VehiclesApi } from '../api/vehicles.api';
import { Vehicle } from '../api/vehicles.api.models';

export const HomePage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [snackbarData, setSnackbarData] = useState<{ isOpen: boolean, text: string, severity: 'error' | 'success' }>({ isOpen: false, text: '', severity: 'success' });
    const [polygonPoints, setPolygonPoints] = useState<{ lat: number, lng: number }[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    const onFindVehicles = async () => {
        try {
            setIsLoading(true);
            const area = polygonPoints.map(polygonPoint => ([polygonPoint.lat, polygonPoint.lng]));
            const result = await VehiclesApi.getVehiclesWithinArea(area);
            setVehicles(result.data.vehicles);
        } catch (error) {
            setSnackbarData({ isOpen: true, text: 'Failed to fetch data', severity: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const onClearPolygonPoints = () => {
        setPolygonPoints([]);
        setVehicles([]);
    };

    const closeSnackbar = () => {
        setSnackbarData(prevState => ({ ...prevState, isOpen: false }));
    };

    return (
        <>
            <Grid container>
                <Grid item xs={3}>
                    <Box height="98vh" >
                        <ControlsComponent
                            isLoading={isLoading}
                            polygonPointsLength={polygonPoints.length}
                            vehicles={vehicles}
                            onFindVehicles={onFindVehicles}
                            onClearPolygonPoints={onClearPolygonPoints}
                        />
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <Box height="98vh" >
                        <MapComponent
                            vehicles={vehicles}
                            polygonPoints={polygonPoints}
                            setPolygonPoints={setPolygonPoints}
                            onClearPolygonPoints={onClearPolygonPoints}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Snackbar open={snackbarData.isOpen} autoHideDuration={4000} onClose={closeSnackbar}>
                <Alert severity={snackbarData.severity} sx={{ width: '100%' }} onClose={closeSnackbar}>
                    {snackbarData.text}
                </Alert>
            </Snackbar>
        </>
    );
};
