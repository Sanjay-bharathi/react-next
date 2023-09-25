"use client";

import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Table,
  notification,
} from "antd";
import React, { useState } from "react";
import { StudentConfigs, StudentData } from "./types";
import { ColumnsType } from "antd/es/table";
import {
  DeleteTwoTone,
  EditTwoTone,
  QuestionCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { createStudent, deleteStudent, updateStudent } from "app/api/students";
import { PageHeader } from "components/pageHeader";

const { Option } = Select;

interface Props {
  data: StudentConfigs["data"];
}

type FieldType = {
  name: string;
  age: number;
  gender: number;
  job: string;
};

const StudentTable = ({ data }: Props) => {
  const columns: ColumnsType<StudentData> = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "age",
      title: "Age",
      dataIndex: "age",
    },
    {
      key: "gender",
      title: "Gender",
      dataIndex: "gender",
      render: (gender) =>
        gender === 1 ? "Male" : gender === 2 ? "Female" : "Other",
    },
    {
      key: "job",
      title: "Job",
      dataIndex: "job",
    },
    {
      key: "actions",
      title: "Action",
      render: (_, record: StudentData) => (
        <>
          <Button
            style={{ marginRight: "1rem" }}
            icon={<EditTwoTone />}
            onClick={() => openEditEmployee(record)}
          ></Button>
          <Popconfirm
            title={"Delete the student"}
            onConfirm={() => onDeleteEmployee(record)}
            description={`Are you sure to delete ${record.name}`}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button icon={<DeleteTwoTone />}></Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const router = useRouter();
  const [form] = Form.useForm();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState({} as StudentData);

  const handleCancelAddEmployee = () => {
    setOpenAddModal(false);
    form.resetFields();
  };

  const handleCancelEditEmployee = () => {
    setOpenEditModal(false);
    form.resetFields();
    setSelectedEmployee({} as StudentData);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const openEditEmployee = (record: StudentData) => {
    setOpenEditModal(true);
    setSelectedEmployee(record);
    form.setFieldsValue({
      name: record.name,
      age: record.age,
      gender: record.gender,
      job: record.job,
    });
  };

  const onAddFinish = async () => {
    const { status } = await createStudent(form.getFieldsValue());
    if (!status) return;
    notification.success({ message: "Created successfully" });
    router.refresh();
    handleCancelAddEmployee();
  };

  const onEditFinish = async () => {
    const { status } = await updateStudent({
      ...form.getFieldsValue(),
      id: selectedEmployee.id,
    });
    if (!status) return;
    notification.success({ message: "Updated successfully" });
    router.refresh();
    handleCancelEditEmployee();
  };

  const onDeleteEmployee = async (record: StudentData) => {
    const { status } = await deleteStudent(record.id);
    if (!status) return;
    notification.success({ message: "Deleted successfully" });
    router.refresh();
  };

  return (
    <section className="student-table">
      <PageHeader
        title={"Employee"}
        sideContent={
          <div className="utils">
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              size={"large"}
              onClick={handleOpenAddModal}
            >
              Add Employee
            </Button>
          </div>
        }
      />

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          showLessItems: true,
          pageSizeOptions: ["5", "10", "15", "20"],
          showSizeChanger: true,
          defaultPageSize: 10,
        }}
      />
      <Modal
        open={openAddModal || openEditModal}
        onOk={form.submit}
        okText={openAddModal ? "Add Employee" : "Edit Employee"}
        title={openAddModal ? "Add Employee" : "Edit Employee"}
        onCancel={
          openAddModal ? handleCancelAddEmployee : handleCancelEditEmployee
        }
      >
        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={openAddModal ? onAddFinish : onEditFinish}
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please input age!" }]}
          >
            <InputNumber
              type="number"
              style={{ width: "100%" }}
              placeholder="Enter age"
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please choose gender!" }]}
          >
            <Select
              placeholder="Choose gender"
              // onChange={onGenderChange}
              allowClear
              style={{ height: "42px" }}
            >
              <Option value={1}>Male</Option>
              <Option value={2}>Female</Option>
              <Option value={3}>Other</Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Job"
            name="job"
            rules={[{ required: true, message: "Please input job title!" }]}
          >
            <Input placeholder="Enter job" />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};

export default StudentTable;
