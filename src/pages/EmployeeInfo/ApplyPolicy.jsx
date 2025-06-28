import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { X } from "lucide-react"; // For delete icon

function ApplyPolicy() {
  const [designation, setDesignation] = useState("");
  const [policyRows, setPolicyRows] = useState([
    { policyNo: "", policyDate: "", policyAmt: "", closePolicy: "", closingDate: "" },
  ]);

  const employees = {
    "Asst. Teacher": ["Ramesh", "Asha"],
    "Graduate Teacher": ["Sunita", "Kiran"],
    "Head Master": ["Deepak"],
    "Shikshan Sevak": ["Ravi", "Neha"],
  };

  const addPolicyRow = () => {
    setPolicyRows([
      ...policyRows,
      { policyNo: "", policyDate: "", policyAmt: "", closePolicy: "", closingDate: "" },
    ]);
  };

  const removePolicyRow = (index) => {
    const updated = [...policyRows];
    updated.splice(index, 1);
    setPolicyRows(updated);
  };

  const updatePolicy = (index, field, value) => {
    const updated = [...policyRows];
    updated[index][field] = value;
    setPolicyRows(updated);
  };

  return (
    <div className="flex justify-end p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 text-white">Add New</Button>
        </DialogTrigger>
        <DialogContent className="w-[95vw] max-w-7xl rounded-2xl overflow-x-auto">
          <DialogHeader>
            <DialogTitle>Apply Policy</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Top Form */}
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

              <div>
                <Label>Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(100)].map((_, i) => (
                      <SelectItem key={i} value={`school-${i + 1}`}>School {i + 1}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Designation</Label>
                <Select onValueChange={setDesignation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(employees).map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Employee</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {(employees[designation] || []).map((emp) => (
                      <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Entry Date</Label>
                <Input type="date" />
              </div>
            </form>

            {/* Table */}
            <div>
              <Label className="text-md font-semibold mb-2 block">Policy Details</Label>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm rounded-md text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1">Sr. No.</th>
                      <th className="border px-2 py-1">Policy No.</th>
                      <th className="border px-2 py-1">Policy Date</th>
                      <th className="border px-2 py-1">Policy Amt</th>
                      <th className="border px-2 py-1">Close Policy</th>
                      <th className="border px-2 py-1">Closing Date</th>
                      <th className="border px-2 py-1 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {policyRows.map((row, index) => (
                      <tr key={index}>
                        <td className="border p-1 text-center">{index + 1}</td>
                        <td className="border p-1">
                          <Input
                            value={row.policyNo}
                            onChange={(e) => updatePolicy(index, "policyNo", e.target.value)}
                          />
                        </td>
                        <td className="border p-1">
                          <Input
                            type="date"
                            value={row.policyDate}
                            onChange={(e) => updatePolicy(index, "policyDate", e.target.value)}
                          />
                        </td>
                        <td className="border p-1">
                          <Input
                            type="number"
                            value={row.policyAmt}
                            onChange={(e) => updatePolicy(index, "policyAmt", e.target.value)}
                          />
                        </td>
                        <td className="border p-1">
                          <Input
                            value={row.closePolicy}
                            onChange={(e) => updatePolicy(index, "closePolicy", e.target.value)}
                          />
                        </td>
                        <td className="border p-1">
                          <Input
                            type="date"
                            value={row.closingDate}
                            onChange={(e) => updatePolicy(index, "closingDate", e.target.value)}
                          />
                        </td>
                        <td className="border p-1 text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removePolicyRow(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-right">
                <Button variant="outline" onClick={addPolicyRow}>
                  + Add Row
                </Button>
              </div>
            </div>

            {/* Remark */}
            <div>
              <Label>Remark</Label>
              <Textarea placeholder="Enter remarks here..." />
            </div>

            {/* Submit/Cancel */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" type="button">Cancel</Button>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ApplyPolicy;
