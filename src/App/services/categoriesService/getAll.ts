import { Category } from "../../entities/Category";
import api from "../HttpClient";

type CateforiesResponse = Array<Category>;

export async function getAll() {
    const { data } = await api.get<CateforiesResponse>("/categories");

    return data;
}