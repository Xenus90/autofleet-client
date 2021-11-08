import { GoogleMap, useLoadScript, Polygon, Marker } from '@react-google-maps/api';
import { ErrorComponent } from './error.component';
import { Vehicle } from '../api/vehicles.api.models';
import { configs } from '../configs/configs';

type Props = {
    vehicles: Vehicle[],
    polygonPoints: { lat: number, lng: number }[],
    setPolygonPoints: React.Dispatch<React.SetStateAction<{ lat: number, lng: number }[]>>,
    onClearPolygonPoints: () => void,
};

export const MapComponent = (props: Props) => {
    const { vehicles, polygonPoints, setPolygonPoints, onClearPolygonPoints } = props;
    const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: configs.googleMapsKey });

    const onMapClick = (e: any) => {
        if (polygonPoints.length < 4) {
            const { lat, lng } = e.latLng;
            setPolygonPoints(prevState => ([...prevState, { lat: lat(), lng: lng() }]));
        }
    };

    return loadError
        ? <ErrorComponent message="Error loading map" />
        : !isLoaded
            ? <ErrorComponent message="Loading maps" />
            : (
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={{ lat: 51.5194136, lng: -0.1334216 }}
                    zoom={12}
                    options={{ disableDefaultUI: true, zoomControl: true }}
                    onClick={onMapClick}
                >
                    <Polygon
                        paths={polygonPoints}
                        onRightClick={onClearPolygonPoints}
                    />
                    {polygonPoints.map((point, index) => (
                        <Marker
                            key={index}
                            position={{ lat: point.lat, lng: point.lng }}
                        />
                    ))}
                    {vehicles.map((vehicle, index) => (
                        <Marker
                            key={index}
                            position={{ lat: vehicle.location.lat, lng: vehicle.location.lng }}
                        />
                    ))}
                </GoogleMap>
            );
};
