import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Generate 30 dummy employees
const generateDummyData = () => {
  const designations = ["Asst. Teacher", "Graduate Teacher", "Head Master", "Shikshan Sevak"];
  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    employeeNo: `EMP${1000 + i}`,
    name: `Employee ${i + 1}`,
    department: `School ${Math.floor(Math.random() * 100) + 1}`,
    designation: designations[Math.floor(Math.random() * designations.length)],
    presentDays: Math.floor(Math.random() * 30),
  }));
};

const EmployeeFormWithTable = () => {
  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const data = generateDummyData();
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">

      {/* Form */}
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Ward */}
        <div>
          <Label>Ward</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Ward" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">PRIMARY EDU DEPT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Department */}
        <div>
          <Label>Department</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(100)].map((_, i) => (
                <SelectItem key={i + 1} value={`school-${i + 1}`}>
                  School {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Designation */}
        <div>
          <Label>Designation</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Designation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asst">Asst. Teacher</SelectItem>
              <SelectItem value="graduate">Graduate Teacher</SelectItem>
              <SelectItem value="head">Head Master</SelectItem>
              <SelectItem value="shikshan">Shikshan Sevak</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Month and Year */}
        <div>
          <Label>Month and Year</Label>
          <Input type="month" />
        </div>

        {/* Order By */}
        <div>
          <Label>Order By</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Employee Name</SelectItem>
              <SelectItem value="number">Employee No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Show Radio */}
        <div>
          <Label>Show</Label>
          <RadioGroup defaultValue="summary" className="flex gap-6 mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="summary" id="summary" />
              <Label htmlFor="summary">Summary</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="detail" id="detail" />
              <Label htmlFor="detail">Detail</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Show Button */}
        <div className="sm:col-span-2 flex justify-end mt-2">
          <Button type="button" onClick={() => setShowTable(true)}>
            Show
          </Button>
        </div>
      </form>

      {/* Table */}
      {showTable && (
        <div className="border rounded-xl overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No.</TableHead>
                <TableHead>Employee No.</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Present Days</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell>{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                  <TableCell>{item.employeeNo}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>{item.designation}</TableCell>
                  <TableCell>{item.presentDays}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center px-4 py-3">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <p>Page {currentPage} of {totalPages}</p>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeFormWithTable;
