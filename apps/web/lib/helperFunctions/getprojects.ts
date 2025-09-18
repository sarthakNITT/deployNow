import axios from "axios";

export default async function getProjects () {
    const res = await axios.get("http://localhost:3003/api/getProjects")
    return res.data;
}