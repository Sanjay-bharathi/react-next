import { get, post } from "fetch";
import { StudentApi } from "./routes";
import { decrypt } from "utils/cryptojs";

const getStudents = async () => decrypt(await get(StudentApi.GET_STUDENTS));

const createStudent = async (body: any) =>
  decrypt(await post(StudentApi.GET_STUDENTS, body));

export { getStudents, createStudent };
