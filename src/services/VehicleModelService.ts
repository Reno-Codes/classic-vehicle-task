import { BaseService } from "@services/index";
import VehicleModelType from "../types/vehicleModelType";
import DropdownVehicleType from "../types/dropdownVehicleType";

class VehicleModelService extends BaseService {
    async createVehicleModel(model: VehicleModelType): Promise<string> {
        return this.create("mono_vehicle_model", model);
    }

    async readModelAbrvForDropdown(
        makeid?: string
    ): Promise<DropdownVehicleType[]> {
        return this.readForDropdown("mono_vehicle_model", makeid);
    }

    async readVehicleModelsPaginationFiltering(
        page: number,
        pageSize: number,
        filters?: { [key: string]: any },
        sorters?: { [key: string]: any }
    ): Promise<VehicleModelType[]> {
        return this.readModelsPaginationFilteringSorting(
            "mono_vehicle_model",
            page,
            pageSize,
            {
                ...filters,
            },
            {
                ...sorters,
            }
        );
    }

    async getModelCount(makeid?: string): Promise<number> {
        return this.getRowCount("mono_vehicle_model", makeid);
    }

    async updateVehicleModel(model: VehicleModelType) {
        return this.update("mono_vehicle_model", model);
    }

    async deleteVehicleModel(id: string): Promise<void> {
        return this.delete("mono_vehicle_model", id);
    }

    async deleteAllVehicleModelsByMakeId(makeid: string): Promise<void> {
        return this.deleteAllModelsByMakeid("mono_vehicle_model", makeid);
    }
}

export default VehicleModelService;
