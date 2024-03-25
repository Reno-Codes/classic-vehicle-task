import { makeObservable, observable, action, runInAction } from "mobx";
import VehicleMakeType from "../types/vehicleMakeType";
import { VehicleMakeService } from "@services/index";
import DropdownVehicleType from "../types/dropdownVehicleType";

export class VehicleMakeStore {
    vehicleMakesPaginated: VehicleMakeType[] = [];
    totalItems: number = 0;
    totalItemsPaginated: number = 0;
    vehicleMakeService: VehicleMakeService;
    vehicleMakeAbrvs: DropdownVehicleType[] = [];

    constructor() {
        makeObservable(this, {
            vehicleMakesPaginated: observable,
            totalItems: observable,
            totalItemsPaginated: observable,
            addVehicleMake: action,
            deleteVehicleMake: action,
            fetchVehicleMakesPaginationFilteringSorting: action,
            getVehicleMakeCount: action,
            getVehicleMakeAbrvs: action,
        });

        this.vehicleMakeService = new VehicleMakeService();
    }

    // Create
    async addVehicleMake(newMake: VehicleMakeType) {
        try {
            const data = await this.vehicleMakeService.createVehicleMake(
                newMake
            );
            if (data === "success") {
                runInAction(() => {
                    this.vehicleMakesPaginated.push(newMake);
                });
            } else {
                alert("Failed to add vehicle make. Please try again.");
            }
        } catch (error) {
            console.error("Error adding vehicle make:", error);
            alert("Failed to add vehicle make. Please try again.");
        }
    }

    // Read with pagination, sorting and filtering
    async fetchVehicleMakesPaginationFilteringSorting(
        page: number,
        pageSize: number,
        filters?: { [key: string]: any },
        sorters?: { [key: string]: any }
    ) {
        try {
            const data =
                await this.vehicleMakeService.readVehicleMakesPaginationFilteringSorting(
                    page,
                    pageSize,
                    filters,
                    sorters
                );
            if (data) {
                runInAction(() => {
                    this.vehicleMakesPaginated = data;
                    this.totalItemsPaginated = data.length;
                });
            }
        } catch (error) {
            console.error("Error fetching vehicle makes:", error);
        }
    }

    // Get vehicle makes count
    async getVehicleMakeCount() {
        try {
            const count = await this.vehicleMakeService.getMakeCount();
            if (count) {
                runInAction(() => {
                    this.totalItems = count;
                });
            }
        } catch (error) {
            console.error("Error fetching vehicle make count:", error);
        }
    }

    // Get vehicle make abrvs for dropdown
    async getVehicleMakeAbrvs() {
        try {
            const abrvs =
                await this.vehicleMakeService.readMakeAbrvForDropdown();
            if (abrvs) {
                runInAction(() => {
                    this.vehicleMakeAbrvs = abrvs;
                });
            }
        } catch (error) {
            console.error(
                "Error fetching vehicle make abrvs for dropdown:",
                error
            );
        }
    }

    // Update
    async updateVehicleMake(newMake: VehicleMakeType) {
        try {
            const data = await this.vehicleMakeService.updateVehicleMake(
                newMake
            );
            if (data[0]) {
                runInAction(() => {
                    this.vehicleMakesPaginated = this.vehicleMakesPaginated.map(
                        (make) => {
                            if (make.id === data[0].id) {
                                return data[0];
                            }
                            return make;
                        }
                    );
                });
            }
        } catch (error) {
            console.error("Error updating vehicle make:", error);
            alert("Failed to update vehicle make. Please try again.");
        }
    }

    // Delete
    async deleteVehicleMake(id: string) {
        try {
            await this.vehicleMakeService.deleteVehicleMake(id);
            runInAction(() => {
                this.vehicleMakesPaginated = this.vehicleMakesPaginated.filter(
                    (make) => make.id !== id
                );
            });
        } catch (error) {
            console.error("Error deleting vehicle make:", error);
            alert("Failed to delete vehicle make. Please try again.");
        }
    }
}

const vehicleMakeStore = new VehicleMakeStore();
export default vehicleMakeStore;
