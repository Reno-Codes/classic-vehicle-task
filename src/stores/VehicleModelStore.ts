import { makeObservable, observable, action, runInAction } from "mobx";
import VehicleModelType from "../types/vehicleModelType";
import { VehicleModelService } from "@services/index";
import DropdownVehicleType from "../types/dropdownVehicleType";

export class VehicleModelStore {
    vehicleModelService: VehicleModelService;
    vehicleModelsPaginated: VehicleModelType[] = [];
    totalItems: number = 0;
    totalItemsPaginated: number = 0;
    vehicleModelAbrvs: DropdownVehicleType[] = [];

    constructor() {
        makeObservable(this, {
            vehicleModelsPaginated: observable,
            totalItems: observable,
            totalItemsPaginated: observable,
            addVehicleModel: action,
            deleteVehicleModel: action,
            fetchVehicleModelsPaginationFiltering: action,
            getVehicleModelCount: action,
            getVehicleModelAbrvs: action,
        });

        this.vehicleModelService = new VehicleModelService();
    }

    // Create
    async addVehicleModel(newModel: VehicleModelType) {
        try {
            const data = await this.vehicleModelService.createVehicleModel(
                newModel
            );
            if (data === "success") {
                runInAction(() => {
                    this.vehicleModelsPaginated.push(newModel);
                });
            } else {
                alert("Failed to add vehicle model. Please try again.");
            }
        } catch (error) {
            console.error("Error adding vehicle model:", error);
            alert("Failed to add vehicle model. Please try again.");
        }
    }

    // Read with pagination, sorting and filtering
    async fetchVehicleModelsPaginationFiltering(
        page: number,
        pageSize: number,
        filters?: { [key: string]: any },
        sorters?: { [key: string]: any }
    ) {
        try {
            const data =
                await this.vehicleModelService.readVehicleModelsPaginationFiltering(
                    page,
                    pageSize,
                    filters,
                    sorters
                );
            if (data) {
                runInAction(() => {
                    this.vehicleModelsPaginated = data;
                    this.totalItemsPaginated = data.length;
                });
            }
        } catch (error) {
            console.error("Error fetching vehicle models:", error);
        }
    }

    // Get vehicle models count
    async getVehicleModelCount(makeid?: string) {
        try {
            const count = await this.vehicleModelService.getModelCount(makeid);
            if (count) {
                runInAction(() => {
                    this.totalItems = count;
                });
            }
        } catch (error) {
            console.error("Error fetching vehicle make count:", error);
        }
    }

    // Get vehicle model abrvs for dropdown
    async getVehicleModelAbrvs(makeid?: string) {
        try {
            const data =
                await this.vehicleModelService.readModelAbrvForDropdown(makeid);
            if (data) {
                runInAction(() => {
                    this.vehicleModelAbrvs = data;
                });
            }
        } catch (error) {
            console.error(
                "Error fetching vehicle model abrvs for dropdown:",
                error
            );
        }
    }

    // Update
    async updateVehicleModel(newModel: VehicleModelType) {
        try {
            const data = await this.vehicleModelService.updateVehicleModel(
                newModel
            );
            if (data[0]) {
                runInAction(() => {
                    this.vehicleModelsPaginated =
                        this.vehicleModelsPaginated.map((model) => {
                            if (model.id === data[0].id) {
                                return data[0];
                            }
                            return model;
                        });
                });
            }
        } catch (error) {
            console.error("Error updating vehicle model:", error);
            alert("Failed to update vehicle model. Please try again.");
        }
    }

    // Delete
    async deleteVehicleModel(id: string) {
        try {
            await this.vehicleModelService.deleteVehicleModel(id);
            runInAction(() => {
                this.vehicleModelsPaginated =
                    this.vehicleModelsPaginated.filter(
                        (model) => model.id !== id
                    );
            });
        } catch (error) {
            console.error("Error deleting vehicle model:", error);
            alert("Failed to delete vehicle model. Please try again.");
        }
    }

    // Delete All Models by MakeId
    async deleteAllVehicleModelsByMakeId(makeid: string) {
        try {
            await this.vehicleModelService.deleteAllVehicleModelsByMakeId(
                makeid
            );
            runInAction(() => {
                this.vehicleModelsPaginated =
                    this.vehicleModelsPaginated.filter(
                        (model) => model.id !== makeid
                    );
            });
        } catch (error) {
            console.error("Error deleting vehicle model:", error);
            alert("Failed to delete vehicle model. Please try again.");
        }
    }
}

const vehicleModelStore = new VehicleModelStore();
export default vehicleModelStore;
