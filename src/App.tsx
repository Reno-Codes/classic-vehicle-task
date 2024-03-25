import { Route, Routes } from "react-router-dom";
import "./App.css";
import { observer } from "mobx-react";
import { CatalogPage, CreatePage, MainPage, UpdatePage } from "@pages/index";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/catalog/:id" element={<CatalogPage />} />
                <Route path="/create/:makeid?" element={<CreatePage />} />
                <Route
                    path="/update/:id/:makeid?/:vehicleName/:vehicleAbrv"
                    element={<UpdatePage />}
                />
            </Routes>
        </>
    );
}

export default observer(App);
