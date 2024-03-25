import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useEffect } from "react";
import "./CatalogPage.css";
import { findVehicleMakeById } from "@utils/index";
import { vehicleModelStore, pagingSortingFilteringStore } from "@stores/index";
import { VehicleModelItem, Pagination } from "@components/index";
import VehicleModelType from "../types/vehicleModelType";

function CatalogPage() {
    // Initalize Stores
    const {
        vehicleModelsPaginated,
        vehicleModelAbrvs,
        totalItems,
        totalItemsPaginated,
    } = vehicleModelStore;

    const {
        currentPage,
        setCurrentPage,
        selectedModel,
        setSelectedModel,
        selectedSortColumn,
        setSelectedSortColumn,
        sortAscending,
        setSortAscending,
    } = pagingSortingFilteringStore;

    const navigate = useNavigate();
    const pageSize = 4;

    const { id } = useParams<{ id: string }>();
    const vehicle = findVehicleMakeById(id ? id : "");

    // If vehicle not found, return a message
    if (!vehicle) {
        return <div>Vehicle not found</div>;
    }

    useEffect(() => {
        // Fetch vehicle models count
        vehicleModelStore.getVehicleModelCount(vehicle.id);

        // Fetch vehicle model abrvs for dropdown
        vehicleModelStore.getVehicleModelAbrvs(vehicle.id);

        // Fetch paginated vehicle models with filtering
        vehicleModelStore.fetchVehicleModelsPaginationFiltering(
            currentPage,
            pageSize,
            selectedModel ? { abrv: selectedModel } : { makeId: vehicle.id },
            selectedSortColumn
                ? { [selectedSortColumn]: sortAscending }
                : undefined
        );

        totalPages === 0 && setCurrentPage(1);
        currentPage > totalPages && setCurrentPage(1);
    }, [
        currentPage,
        pageSize,
        vehicle.id,
        selectedModel,
        selectedSortColumn,
        sortAscending,
        vehicleModelsPaginated.length,
    ]);

    // Calculate total items considering filter
    const totalItemsFiltered =
        selectedModel !== "" ? totalItemsPaginated : totalItems;
    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalItemsFiltered / pageSize);

    // Handle editing the make
    const handleEditMake = () => {
        navigate(`/update/${id}/${vehicle.name}/${vehicle.abrv}`);
    };

    // Handle adding a new model
    const handleAddModel = () => {
        navigate(`/create/${id}`);
    };

    // Handle page change for pagination
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Handle select change for filtering
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModel(e.target.value);
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
            <h2>{vehicle.abrv} - Catalog</h2>
            <div>
                <div className="details-container">
                    {/* Display vehicle details */}
                    <div className="details-container">
                        <label>Name: </label>
                        <span>{vehicle.name}</span>
                    </div>

                    <div className="details-container">
                        <label>Abrv: </label>
                        <span>{vehicle.abrv}</span>
                    </div>

                    {/* Buttons for editing and adding */}
                    <div className="details-container details-button-container">
                        <button
                            className="button update"
                            onClick={handleEditMake}
                        >
                            Edit Make
                        </button>

                        <button
                            className="button add"
                            onClick={handleAddModel} // Simplified function call
                        >
                            Create new model
                        </button>
                    </div>
                </div>

                <div className="details-model-list-container">
                    <h3>Models</h3>

                    {/* Dropdown for model filtering */}
                    <label htmlFor="modelsDropdown">
                        Select a Vehicle Model:
                    </label>
                    <select
                        id="modelsDropdown"
                        value={selectedModel}
                        onChange={handleChange}
                    >
                        <option value="">All Models</option>
                        {vehicleModelAbrvs.map((abrv) => (
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

                    {/* Display models */}
                    {vehicleModelsPaginated.length === 0 && !vehicle ? (
                        <p>Loading models...</p>
                    ) : (
                        <div className="vehicle-models">
                            {/* Map through paginated models */}
                            {Array.isArray(vehicleModelsPaginated) &&
                                vehicleModelsPaginated
                                    .filter((model: VehicleModelType) => {
                                        return model.makeId === id;
                                    })
                                    .map((model: VehicleModelType) => {
                                        return (
                                            <VehicleModelItem
                                                key={model.id}
                                                model={model}
                                            />
                                        );
                                    })}
                        </div>
                    )}

                    {/* Pagination component */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default observer(CatalogPage);
