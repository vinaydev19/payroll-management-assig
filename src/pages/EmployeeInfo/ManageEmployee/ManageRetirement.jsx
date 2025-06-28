import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const mockData = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  name: `Employee ${i + 1}`,
  ward: "PRIMARY EDU DEPT",
  department: `School ${((i % 100) + 1)}`,
  designation: [
    "Asst. Teacher",
    "Graduate Teacher",
    "Head Master",
    "Shikshan Sevak",
  ][i % 4],
  retirementDate: "2025-12-31",
}));

function ManageRetirement() {
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [filtered, setFiltered] = useState([]);

  const perPage = 10;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const pageData = filtered.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filtered.length / perPage);

  const handleShow = () => {
    let result = mockData.filter((item) => {
      return (
        (!department || item.department === department) &&
        (!designation || item.designation === designation) &&
        (!date || item.retirementDate === date)
      );
    });
    setFiltered(result);
    setPage(1);
  };

  const handleReset = () => {
    setDepartment("");
    setDesignation("");
    setDate("");
    setFiltered([]);
    setPage(1);
  };

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Retirement View</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Ward</Label>
            <Select defaultValue="PRIMARY EDU DEPT">
              <SelectTrigger>
                <SelectValue placeholder="Select Ward" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PRIMARY EDU DEPT">PRIMARY EDU DEPT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Department</Label>
            <Select onValueChange={setDepartment} value={department}>
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(100)].map((_, i) => (
                  <SelectItem key={i + 1} value={`School ${i + 1}`}>
                    School {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Designation</Label>
            <Select onValueChange={setDesignation} value={designation}>
              <SelectTrigger>
                <SelectValue placeholder="Select Designation" />
              </SelectTrigger>
              <SelectContent>
                {["Asst. Teacher", "Graduate Teacher", "Head Master", "Shikshan Sevak"].map(
                  (desig) => (
                    <SelectItem key={desig} value={desig}>
                      {desig}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Retirement Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="md:col-span-4 flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleShow}>Show</Button>
          </div>
        </CardContent>
      </Card>

      {filtered.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="border px-2 py-1">ID</th>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Ward</th>
                <th className="border px-2 py-1">Department</th>
                <th className="border px-2 py-1">Designation</th>
                <th className="border px-2 py-1">Retirement Date</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((emp) => (
                <tr key={emp.id}>
                  <td className="border px-2 py-1">{emp.id}</td>
                  <td className="border px-2 py-1">{emp.name}</td>
                  <td className="border px-2 py-1">{emp.ward}</td>
                  <td className="border px-2 py-1">{emp.department}</td>
                  <td className="border px-2 py-1">{emp.designation}</td>
                  <td className="border px-2 py-1">{emp.retirementDate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <p>
              Page {page} of {totalPages}
            </p>
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageRetirement;
