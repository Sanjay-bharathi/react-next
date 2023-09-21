export interface StudentData {
  name: string;
  age: number;
  gender: number;
  job: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface StudentConfigs {
  data: StudentData[];
  status: boolean;
  error: string;
}
