import { useNavigate } from "react-router-dom";
import { DeleteMakeButton } from "@components/index";
import "./VehicleMakeItem.css";

interface Props {
    id: string;
    name: string;
    abrv: string;
}

function VehicleMakeItem({ id, name, abrv }: Props) {
    const navigate = useNavigate();

    return (
        <div className="vehicle-item" key={id}>
            <>
                <p className="vehicle-item-abrv">{abrv}</p>
                <p className="vehicle-item-name">{name}</p>
                <div>
                    <button
                        className="button update"
                        onClick={() => navigate(`/catalog/${id}`)}
                    >
                        View All
                    </button>

                    <DeleteMakeButton id={id} />
                </div>
            </>
        </div>
    );
}

export default VehicleMakeItem;
