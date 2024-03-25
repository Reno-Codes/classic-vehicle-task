import { BaseService } from "@services/index";
import VehicleMakeType from "../types/vehicleMakeType";
import DropdownVehicleType from "../types/dropdownVehicleType";

class VehicleMakeService extends BaseService {
    async createVehicleMake(make: VehicleMakeType): Promise<string> {
        return this.create("mono_vehicle_make", make);
    }

    async readMakeAbrvForDropdown(): Promise<DropdownVehicleType[]> {
        return this.readForDropdown("mono_vehicle_make");
    }

    async readVehicleMakesPaginationFilteringSorting(
        page: number,
        pageSize: number,
        filters?: { [key: string]: any },
        sorters?: { [key: string]: any }
    ): Promise<VehicleMakeType[]> {
        return this.readMakesPaginationFilteringSorting(
            "mono_vehicle_make",
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

    async getMakeCount(): Promise<number> {
        return this.getRowCount("mono_vehicle_make");
    }

    async updateVehicleMake(make: VehicleMakeType) {
        return this.update("mono_vehicle_make", make);
    }

    async deleteVehicleMake(id: string): Promise<void> {
        return this.delete("mono_vehicle_make", id);
    }
}

export default VehicleMakeService;
