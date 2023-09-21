import React from "react";
import { getStudents } from "app/api/students";
import { StudentConfigs } from "./types";
import StudentTable from "./table";
import { PageHeader } from "components/pageHeader";

const Students = async () => {
  const { data, status, error }: StudentConfigs = await getStudents();

  if (!status) return error;

  return (
    <section className="student-container">
      {/* <PageHeader title={"Employee"} /> */}
      <StudentTable data={data} />
    </section>
  );
};

export default Students;
