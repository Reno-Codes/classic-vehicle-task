import { vehicleModelStore } from "@stores/index";

function findVehicleModelById(id: string) {
    const model = vehicleModelStore.vehicleModelsPaginated.find(
        (model) => model.id === id
    );
    return model;
}

export default findVehicleModelById;
