import vehicleModelStore from "../stores/VehicleModelStore";

interface Props {
    id: string;
}
function DeleteModelButton({ id }: Props) {
    return (
        <button
            className="button delete"
            onClick={() => {
                if (
                    window.confirm(
                        "Are you sure you want to delete this vehicle model?"
                    )
                ) {
                    vehicleModelStore.deleteVehicleModel(id);
                }
            }}
        >
            Delete
        </button>
    );
}

export default DeleteModelButton;
