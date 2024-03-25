import { useParams } from "react-router-dom";
import { ModelOrMakeForm } from "@components/index";
import { findVehicleMakeById, findVehicleModelById } from "@utils/index";

function UpdatePage() {
    const params = useParams();

    if (params.id) {
        const vehicle = findVehicleMakeById(params.id);

        // if vehicle is not found by id, try to find model by id
        // if model is not found by id, return Vehicle not found
        if (!vehicle) {
            const model = findVehicleModelById(params.id);

            if (model) {
                return (
                    <>
                        <h2>Update model</h2>
                        <ModelOrMakeForm
                            id={model.id}
                            makeid={model.makeId}
                            name={model.name}
                            abrv={model.abrv}
                        />
                    </>
                );
            }

            return <div>Vehicle not found</div>;
        }

        return (
            <>
                <h2>Update make</h2>

                <ModelOrMakeForm
                    id={vehicle.id}
                    name={vehicle.name}
                    abrv={vehicle.abrv}
                />
            </>
        );
    }

    return <div>Vehicle not found</div>;
}

export default UpdatePage;
