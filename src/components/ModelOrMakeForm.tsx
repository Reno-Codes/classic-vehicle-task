import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { vehicleMakeStore, vehicleModelStore } from "@stores/index";
import { checkIfMakeModelAlreadyExists } from "@utils/index";
import { TypeZodSchema, zodSchema } from "../types/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import "./ModelOrMakeForm.css";

interface Props {
    id?: string;
    name?: string;
    abrv?: string;
    makeid?: string | null;
    handleEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModelOrMakeForm({ id, name, abrv, makeid = null, handleEdit }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TypeZodSchema>({
        resolver: zodResolver(zodSchema),
    });

    const navigate = useNavigate();

    const onSubmit = (data: TypeZodSchema) => {
        const { name, abrv } = data;
        const newMakeOrModel = {
            id: id || crypto.randomUUID(), // existing id or generate a new one
            name,
            abrv,
        };

        if (checkIfMakeModelAlreadyExists(makeid, name, abrv)) {
            return null;
        }

        if (!id) {
            // If id doesn't exist, it's a new entry
            if (!makeid) {
                vehicleMakeStore.addVehicleMake(newMakeOrModel);
            } else {
                vehicleModelStore.addVehicleModel({
                    ...newMakeOrModel,
                    makeId: makeid,
                });
            }
        } else {
            // If id exists, it's an update
            if (!makeid) {
                vehicleMakeStore.updateVehicleMake(newMakeOrModel);
                navigate(`/catalog/${id}`, { replace: true });
            } else {
                vehicleModelStore.updateVehicleModel({
                    ...newMakeOrModel,
                    makeId: makeid,
                });
                navigate(`/catalog/${makeid}`, { replace: true });
            }
        }

        reset();

        alert(
            `${makeid ? "Vehicle Model" : "Vehicle Make"} ${
                id ? "updated" : "created"
            } successfully!`
        );

        if (handleEdit) {
            handleEdit(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <input
                className="form-input"
                type="text"
                placeholder="Name"
                defaultValue={name}
                {...register("name")}
            />
            {errors.name && <p>{errors.name.message as string}</p>}
            <input
                className="form-input"
                type="text"
                placeholder="Abrv"
                defaultValue={abrv}
                {...register("abrv")}
            />
            {errors.abrv && <p>{errors.abrv.message as string}</p>}

            <button
                className="button add"
                type="submit"
                disabled={isSubmitting}
            >
                {id
                    ? "Confirm edit"
                    : `Create New ${makeid ? "Model" : "Make"}`}
            </button>
        </form>
    );
}

export default ModelOrMakeForm;
