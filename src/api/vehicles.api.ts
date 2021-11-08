import axios from 'axios';
import { configs } from '../configs/configs';
import { VehiclesResponse } from './vehicles.api.models';

export class VehiclesApi {
    static getAllVehicles = async () => {
        return await axios.get<VehiclesResponse>(`${configs.api}/vehicles`);
    };

    static getVehiclesWithinArea = async (area: number[][]) => {
        return await axios.post<VehiclesResponse>(`${configs.api}/vehicles`, area);
    };
}
