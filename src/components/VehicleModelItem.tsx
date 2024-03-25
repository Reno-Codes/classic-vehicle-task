import { DeleteModelButton } from "@components/index";
import { useNavigate } from "react-router-dom";

interface Props {
    model: {
        id: string;
        makeId: string;
        name: string;
        abrv: string;
    };
}
function VehicleModelItem({ model }: Props) {
    const navigate = useNavigate();

    const handleEditModel = () => {
        navigate(`/update/${model.id}/${model.name}/${model.abrv}`);
    };

    return (
        <div className="vehicle-model-item" key={model.id}>
            <div className="model-name-abrv-container">
                <span className="detail-title">{model.name}</span>
                <span className="detail-title">{model.abrv}</span>
            </div>

            <div className="details-button-container">
                <button className="button update" onClick={handleEditModel}>
                    Edit
                </button>

                <DeleteModelButton id={model.id} />
            </div>
        </div>
    );
}

export default VehicleModelItem;
