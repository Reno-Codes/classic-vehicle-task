import { vehicleMakeStore } from "@stores/index";

function findVehicleMakeById(id: string) {
    const vehicle = vehicleMakeStore.vehicleMakesPaginated.find(
        (make) => make.id === id
    );
    return vehicle;
}

export default findVehicleMakeById;
