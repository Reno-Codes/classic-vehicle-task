import { vehicleMakeStore, vehicleModelStore } from "@stores/index";

function checkIfMakeModelAlreadyExists(
    makeid: string | null,
    name: string,
    abrv: string
) {
    const store = makeid
        ? vehicleModelStore.vehicleModelsPaginated
        : vehicleMakeStore.vehicleMakesPaginated;

    const entry = store.find(
        (makeOrModel) =>
            makeOrModel.abrv.toLowerCase() === abrv.toLowerCase() &&
            makeOrModel.name.toLowerCase() === name.toLowerCase()
    );

    if (entry) {
        alert(`Vehicle ${entry.abrv} already exists`);
        return true;
    }

    return false;
}

export default checkIfMakeModelAlreadyExists;
