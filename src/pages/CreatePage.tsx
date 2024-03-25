import { useParams } from "react-router-dom";
import { ModelOrMakeForm } from "@components/index";

function CreatePage() {
    const params = useParams();

    if (params.makeid) {
        return (
            <>
                <h2>Create new model</h2>
                <ModelOrMakeForm makeid={params.makeid} />
            </>
        );
    }

    return (
        <>
            <h2>Create new make</h2>
            <ModelOrMakeForm />
        </>
    );
}

export default CreatePage;
