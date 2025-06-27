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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function LoanIssueMultiple() {
  const [designation, setDesignation] = useState("");

  // Dummy employee names based on designation
  const employees = {
    "Asst. Teacher": ["Asha Patil", "Ravi Kale"],
    "Graduate Teacher": ["Sneha More", "Rahul Deshmukh"],
    "Head Master": ["Sunil Pawar"],
    "Shikshan Sevak": ["Kiran Jadhav", "Meena Nair"],
  };

  return (
    <div className="flex justify-end p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 text-white">Add New</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle>Loan Issue Form</DialogTitle>
          </DialogHeader>

          <div className="max-h-[80vh] overflow-y-auto pr-2">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

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

              {/* Employee */}
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

              {/* Issue No */}
              <div>
                <Label>Issue No</Label>
                <Input type="number" />
              </div>

              {/* Issue Date */}
              <div>
                <Label>Issue Date</Label>
                <Input type="date" />
              </div>

              {/* Repayment Date */}
              <div>
                <Label>Repayment Date</Label>
                <Input type="date" />
              </div>

              {/* Employee ID */}
              <div>
                <Label>Employee ID</Label>
                <Input type="text" />
              </div>

              {/* Remark */}
              <div className="md:col-span-2">
                <Label>Remark</Label>
                <Textarea placeholder="Enter remark here..." />
              </div>

              {/* Buttons */}
              <div className="md:col-span-2 flex justify-end gap-3">
                <Button variant="outline" type="button">Cancel</Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LoanIssueMultiple;
