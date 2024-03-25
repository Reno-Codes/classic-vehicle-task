import vehicleMakeStore from "../stores/VehicleMakeStore";
import vehicleModelStore from "../stores/VehicleModelStore";

interface Props {
    id: string;
}
function DeleteMakeButton({ id }: Props) {
    return (
        <button
            className="button delete"
            onClick={() => {
                if (
                    window.confirm(
                        "Are you sure you want to delete this vehicle make? \n\nThis action will delete all models associated with this vehicle make."
                    )
                ) {
                    vehicleMakeStore.deleteVehicleMake(id);
                    vehicleModelStore.deleteAllVehicleModelsByMakeId(id);
                }
            }}
        >
            Delete
        </button>
    );
}

export default DeleteMakeButton;
