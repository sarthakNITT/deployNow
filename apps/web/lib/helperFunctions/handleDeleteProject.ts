import axios from "axios";

export default async function handleDeleteProject (project_id: string) {
    const res = await axios.post("/api/deleteProject", {
        project_id: project_id
    })
    console.log(res.data.message);

    return;
}