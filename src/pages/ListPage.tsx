import { useEffect } from "react";
import { observer } from "mobx-react";
import { vehicleMakeStore, pagingSortingFilteringStore } from "@stores/index";
import VehicleMakeType from "../types/vehicleMakeType";
import { VehicleMakeItem, Pagination } from "@components/index";
import "./ListPage.css";

function ListPage() {
    const {
        vehicleMakesPaginated,
        vehicleMakeAbrvs,
        totalItems,
        totalItemsPaginated,
    } = vehicleMakeStore;
    const pageSize = 4;

    const {
        currentPage,
        setCurrentPage,
        selectedFilter,
        setSelectedFilter,
        selectedSortColumn,
        setSelectedSortColumn,
        sortAscending,
        setSortAscending,
    } = pagingSortingFilteringStore;

    useEffect(() => {
        // Fetch vehicle makes count
        vehicleMakeStore.getVehicleMakeCount();

        // Fetch vehicle make abrvs for dropdown
        vehicleMakeStore.getVehicleMakeAbrvs();

        // Fetch paginated vehicle makes with filtering and sorting
        vehicleMakeStore.fetchVehicleMakesPaginationFilteringSorting(
            currentPage,
            pageSize,
            selectedFilter ? { abrv: selectedFilter } : undefined,
            selectedSortColumn
                ? { [selectedSortColumn]: sortAscending }
                : undefined
        );

        totalPages === 0 && setCurrentPage(1);
        currentPage > totalPages && setCurrentPage(1);
    }, [
        currentPage,
        pageSize,
        selectedFilter,
        selectedSortColumn,
        sortAscending,
        totalItemsPaginated,
        vehicleMakesPaginated.length,
    ]);

    // Calculate total items considering filter
    const totalItemsFiltered =
        selectedFilter !== "" ? totalItemsPaginated : totalItems;
    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalItemsFiltered / pageSize);

    // Handle page change for pagination
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Handle filter change
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(e.target.value);
    };

    // Handle sort change
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSortColumn(e.target.value);
    };

    // Toggle sort order
    const toggleSortOrder = () => {
        setSortAscending(!sortAscending);
    };

    return (
        <div>
            <h2>Vehicle Catalog</h2>
            {/* Dropdown for selecting make filter */}
            <label htmlFor="makesDropdown">Select a Vehicle Make:</label>
            <select
                id="makesDropdown"
                value={selectedFilter}
                onChange={handleFilterChange}
            >
                <option value="">All Makes</option>
                {vehicleMakeAbrvs.map((abrv) => (
                    <option key={abrv.abrv} value={abrv.abrv}>
                        {abrv.abrv}
                    </option>
                ))}
            </select>

            {/* Dropdown for selecting sort column */}
            <label htmlFor="sortDropdown"> Sort by:</label>
            <select
                id="sortDropdown"
                value={selectedSortColumn}
                onChange={handleSortChange}
            >
                <option value="">Default</option>
                <option value="name">Name</option>
                <option value="abrv">Abbreviation</option>
            </select>

            {/* Button for toggling sort order */}
            <button onClick={toggleSortOrder}>
                {sortAscending ? "ASC" : "DESC"}
            </button>

            <div className="vehicle-list-container">
                {/* Display loading message if vehicle makes are being fetched */}
                {vehicleMakesPaginated.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {/* Render vehicle makes */}
                        <div className="vehicle-makes">
                            {Array.isArray(vehicleMakesPaginated) &&
                                vehicleMakesPaginated.map(
                                    (make: VehicleMakeType) => {
                                        return (
                                            <VehicleMakeItem
                                                key={make.id}
                                                {...make}
                                            />
                                        );
                                    }
                                )}
                        </div>
                        {/* Pagination component */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default observer(ListPage);
