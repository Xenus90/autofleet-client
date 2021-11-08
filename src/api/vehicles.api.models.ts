export type Vehicle = {
    id: string,
    state: string,
    routeCommitId: number,
    seats: number,
    class: {
        name: string
    },
    location: {
        lat: number,
        lng: number,
        bearing: number,
    },
    distance: number,
};

export type VehiclesResponse = {
    vehicles: Vehicle[],
};
