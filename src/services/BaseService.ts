import DropdownVehicleType from "../types/dropdownVehicleType";
import VehicleMakeType from "../types/vehicleMakeType";
import VehicleModelType from "../types/vehicleModelType";
import { supabase } from "./supabaseClient";

class BaseService {
    // Create Make
    protected async create(
        tableName: string,
        data: VehicleMakeType
    ): Promise<string> {
        const { error } = await supabase.from(tableName).insert(data).single();
        if (error) {
            throw new Error(error.message);
        }
        return "success";
    }

    // Read Make/Model abrv for filtering dropdown
    protected async readForDropdown(
        tableName: string,
        makeid?: string
    ): Promise<DropdownVehicleType[]> {
        let query = supabase.from(tableName).select("abrv");

        // Apply makeId if provided
        if (makeid) {
            query = query.eq("makeId", makeid);
        }

        const { data, error } = await query;

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    // Read Makes with Pagination, Filtering and Sorting
    protected async readMakesPaginationFilteringSorting(
        tableName: string,
        page: number,
        pageSize: number,
        filters: { [key: string]: any },
        sorters: { [key: string]: any }
    ): Promise<VehicleMakeType[]> {
        const offset = (page - 1) * pageSize;

        let query = supabase
            .from(tableName)
            .select()
            .range(offset, offset + pageSize - 1);

        // Apply filters if provided
        if (filters) {
            Object.entries(filters).forEach(([column, value]) => {
                query = query.eq(column, value);
            });
        }

        if (sorters) {
            Object.entries(sorters).forEach(([column, value]) => {
                query = query.order(column, { ascending: value });
            });
        }

        const { data, error } = await query;

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    // Get Row Count
    protected async getRowCount(
        tableName: string,
        makeid?: string
    ): Promise<number> {
        try {
            let query = supabase
                .from(tableName)
                .select("*", { count: "exact" });

            // Apply filters if provided
            if (makeid) {
                query = query.eq("makeId", makeid);
            }

            const { count, error } = await query;

            if (error) {
                throw new Error(error.message);
            }

            return count || 0;
        } catch (error) {
            console.error("Error fetching row count:", error);
            return 0;
        }
    }

    // Update
    protected async update(tableName: string, make: VehicleMakeType) {
        const { id, name, abrv } = make;

        const { data, error } = await supabase
            .from(tableName)
            .update({ abrv: abrv, name: name })
            .eq("id", id)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    // Delete Make
    protected async delete(tableName: string, id: string): Promise<void> {
        const { error } = await supabase.from(tableName).delete().eq("id", id);
        if (error) {
            throw new Error(error.message);
        }
    }

    // MODEL METHODS
    // Read Models with Pagination, Filtering and Sorting
    protected async readModelsPaginationFilteringSorting(
        tableName: string,
        page: number,
        pageSize: number,
        filters: { [key: string]: any },
        sorters: { [key: string]: any }
    ): Promise<VehicleModelType[]> {
        const offset = (page - 1) * pageSize;

        let query = supabase
            .from(tableName)
            .select()
            .range(offset, offset + pageSize - 1);

        // Apply filters if provided
        if (filters) {
            Object.entries(filters).forEach(([column, value]) => {
                query = query.eq(column, value);
            });
        }

        if (sorters) {
            Object.entries(sorters).forEach(([column, value]) => {
                query = query.order(column, { ascending: value });
            });
        }

        const { data, error } = await query;

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    // Delete all models by make id
    protected async deleteAllModelsByMakeid(
        tableName: string,
        makeid: string
    ): Promise<void> {
        const { error } = await supabase
            .from(tableName)
            .delete()
            .eq("makeId", makeid);
        if (error) {
            throw new Error(error.message);
        }
    }
}

export default BaseService;
