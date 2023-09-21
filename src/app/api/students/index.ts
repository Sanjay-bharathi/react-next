import { deleteCall, get, post, put } from "fetch";
import { StudentApi } from "./routes";
import { decrypt } from "utils/cryptojs";

const getStudents = async () => decrypt(await get(StudentApi.GET_STUDENTS));

const createStudent = async (body: any) =>
  decrypt(await post(StudentApi.GET_STUDENTS, body));

const deleteStudent = async (id: string) =>
  decrypt(await deleteCall(StudentApi.DELETE_STUDENTS, {id: id}));
  
const updateStudent = async (body: any) =>
decrypt(await put(StudentApi.GET_STUDENTS, body));

export { getStudents, createStudent,deleteStudent,updateStudent };
