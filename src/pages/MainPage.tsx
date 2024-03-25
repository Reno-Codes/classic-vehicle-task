import { useNavigate } from "react-router-dom";
import { ListPage } from "@pages/index";

function MainPage() {
    const navigate = useNavigate();
    return (
        <>
            <button
                className="button add"
                onClick={() => {
                    navigate("/create");
                }}
            >
                Create new make
            </button>

            <ListPage />
        </>
    );
}

export default MainPage;
