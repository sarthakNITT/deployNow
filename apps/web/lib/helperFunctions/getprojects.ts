import axios from "axios";

export default async function getProjects () {
    const res = await axios.get("/api/projects");
    const data = res.data;
    return Array.isArray(data) ? data : [];
}