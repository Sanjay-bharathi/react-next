"use client";

import { useState, useRef, useEffect } from "react";

import { Space, Table, Button, Tag, Popconfirm, message, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import type { FilterConfirmProps } from "antd/es/table/interface";
import type { InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

type DataIndex = keyof DataType;

const Students = () => {
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              clearFilters &&
              handleReset(clearFilters, () => handleSearch(confirm, dataIndex))
            }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => (searchedColumn === dataIndex ? text : text),
  });

  const handleDeleteRow = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Row deleted");
    }, 3000);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["lg"],
      ...getColumnSearchProps("address"),
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      responsive: ["lg"],
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} />
          <Popconfirm
            title="Delete the row"
            description="Are you sure to delete this row?"
            onConfirm={() => handleDeleteRow()}
            onCancel={() => alert("Cancel")}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleSearch = (
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void, cbSearch: () => void) => {
    clearFilters();
    cbSearch();
  };

  return (
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
  );
};

export default Students;

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown 1",
    age: 1,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "John Brown 2",
    age: 2,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "3",
    name: "John Brown 3",
    age: 3,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "4",
    name: "John Brown 4",
    age: 4,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "5",
    name: "John Brown 5",
    age: 5,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "6",
    name: "John Brown 6",
    age: 6,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "7",
    name: "John Brown 7",
    age: 7,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "8",
    name: "John Brown 8",
    age: 8,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "9",
    name: "John Brown 9",
    age: 9,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "10",
    name: "John Brown 10",
    age: 10,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "11",
    name: "John Brown 11",
    age: 11,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "12",
    name: "John Brown 12",
    age: 12,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "13",
    name: "John Brown 13",
    age: 13,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "14",
    name: "John Brown 14",
    age: 14,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "15",
    name: "John Brown 15",
    age: 15,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "16",
    name: "John Brown 16",
    age: 16,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "17",
    name: "John Brown 17",
    age: 17,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "18",
    name: "John Brown 18",
    age: 18,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "19",
    name: "John Brown 19",
    age: 19,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "20",
    name: "John Brown 20",
    age: 20,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "21",
    name: "John Brown 21",
    age: 21,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "22",
    name: "John Brown 22",
    age: 22,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "23",
    name: "John Brown 23",
    age: 23,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "24",
    name: "John Brown 24",
    age: 24,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "25",
    name: "John Brown 25",
    age: 25,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "26",
    name: "John Brown 26",
    age: 26,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "27",
    name: "John Brown 27",
    age: 27,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "28",
    name: "John Brown 28",
    age: 28,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "29",
    name: "John Brown 29",
    age: 29,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "30",
    name: "John Brown 30",
    age: 30,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "31",
    name: "John Brown 31",
    age: 31,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "32",
    name: "John Brown 32",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "33",
    name: "John Brown 33",
    age: 33,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "34",
    name: "John Brown 34",
    age: 34,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "35",
    name: "John Brown 35",
    age: 35,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "36",
    name: "John Brown 36",
    age: 36,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "37",
    name: "John Brown 37",
    age: 37,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "38",
    name: "John Brown 38",
    age: 38,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "39",
    name: "John Brown 39",
    age: 39,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "40",
    name: "John Brown 40",
    age: 40,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "41",
    name: "John Brown 41",
    age: 41,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "42",
    name: "John Brown 42",
    age: 42,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "43",
    name: "John Brown 43",
    age: 43,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "44",
    name: "John Brown 44",
    age: 44,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "45",
    name: "John Brown 45",
    age: 45,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "46",
    name: "John Brown 46",
    age: 46,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "47",
    name: "John Brown 47",
    age: 47,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "48",
    name: "John Brown 48",
    age: 48,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "49",
    name: "John Brown 49",
    age: 49,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "50",
    name: "John Brown 50",
    age: 50,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "51",
    name: "John Brown 51",
    age: 51,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "52",
    name: "John Brown 52",
    age: 52,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "53",
    name: "John Brown 53",
    age: 53,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "54",
    name: "John Brown 54",
    age: 54,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "55",
    name: "John Brown 55",
    age: 55,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "56",
    name: "John Brown 56",
    age: 56,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "57",
    name: "John Brown 57",
    age: 57,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "58",
    name: "John Brown 58",
    age: 58,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "59",
    name: "John Brown 59",
    age: 59,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "60",
    name: "John Brown 60",
    age: 60,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "61",
    name: "John Brown 61",
    age: 61,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "62",
    name: "John Brown 62",
    age: 62,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "63",
    name: "John Brown 63",
    age: 63,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "64",
    name: "John Brown 64",
    age: 64,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "65",
    name: "John Brown 65",
    age: 65,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "66",
    name: "John Brown 66",
    age: 66,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "67",
    name: "John Brown 67",
    age: 67,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "68",
    name: "John Brown 68",
    age: 68,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "69",
    name: "John Brown 69",
    age: 69,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "70",
    name: "John Brown 70",
    age: 70,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "71",
    name: "John Brown 71",
    age: 71,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "72",
    name: "John Brown 72",
    age: 72,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "73",
    name: "John Brown 73",
    age: 73,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "74",
    name: "John Brown 74",
    age: 74,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "75",
    name: "John Brown 75",
    age: 75,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "76",
    name: "John Brown 76",
    age: 76,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "77",
    name: "John Brown 77",
    age: 77,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "78",
    name: "John Brown 78",
    age: 78,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "79",
    name: "John Brown 79",
    age: 79,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "80",
    name: "John Brown 80",
    age: 80,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "81",
    name: "John Brown 81",
    age: 81,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "82",
    name: "John Brown 82",
    age: 82,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "83",
    name: "John Brown 83",
    age: 83,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "84",
    name: "John Brown 84",
    age: 84,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "85",
    name: "John Brown 85",
    age: 85,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "86",
    name: "John Brown 86",
    age: 86,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "87",
    name: "John Brown 87",
    age: 87,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "88",
    name: "John Brown 88",
    age: 88,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "89",
    name: "John Brown 89",
    age: 89,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "90",
    name: "John Brown 90",
    age: 90,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "91",
    name: "John Brown 91",
    age: 91,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "92",
    name: "John Brown 92",
    age: 92,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "93",
    name: "John Brown 93",
    age: 93,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "94",
    name: "John Brown 94",
    age: 94,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "95",
    name: "John Brown 95",
    age: 95,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "96",
    name: "John Brown 96",
    age: 96,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "97",
    name: "John Brown 97",
    age: 97,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "98",
    name: "John Brown 98",
    age: 98,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "99",
    name: "John Brown 99",
    age: 99,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "100",
    name: "John Brown 100",
    age: 100,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
];
