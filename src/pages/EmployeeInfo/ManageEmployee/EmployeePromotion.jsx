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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const employees = {
  "Asst. Teacher": ["Asha Patil", "Ravi Kale"],
  "Graduate Teacher": ["Sneha More", "Rahul Deshmukh"],
  "Head Master": ["Sunil Pawar"],
  "Shikshan Sevak": ["Kiran Jadhav", "Meena Nair"],
};

function EmployeePromotion() {
  const [fromDesignation, setFromDesignation] = useState("");
  const [toDesignation, setToDesignation] = useState("");

  return (
    <div className="flex justify-end p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 text-white">Add New</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl rounded-2xl">
          <DialogHeader>
            <DialogTitle>Employee Transfer / Promotion</DialogTitle>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-auto pr-2">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Step 1 */}
              <div className="md:col-span-2">
                <Label>Type</Label>
                <RadioGroup defaultValue="transfer" className="flex gap-6 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label htmlFor="transfer">Transfer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="promotion" id="promotion" />
                    <Label htmlFor="promotion">Promotion</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="md:col-span-2">
                <Label>Transfer / Promotion Date</Label>
                <Input type="date" />
              </div>

              {/* Step 2: From */}
              <div className="md:col-span-2 text-lg font-semibold">Transfer / Promote From</div>

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
                      <SelectItem key={i} value={`school-${i + 1}`}>{`School ${i + 1}`}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Designation</Label>
                <Select onValueChange={setFromDesignation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(employees).map((des) => (
                      <SelectItem key={des} value={des}>{des}</SelectItem>
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
                    {(employees[fromDesignation] || []).map((emp) => (
                      <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Step 4: To */}
              <div className="md:col-span-2 text-lg font-semibold mt-4">Transfer / Promote To</div>

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
                      <SelectItem key={i} value={`school-${i + 1}`}>{`School ${i + 1}`}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Designation</Label>
                <Select onValueChange={setToDesignation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(employees).map((des) => (
                      <SelectItem key={des} value={des}>{des}</SelectItem>
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
                    {(employees[toDesignation] || []).map((emp) => (
                      <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label>Pay Scale</Label>
                <Input type="text" placeholder="Enter PayScale" />
              </div>

              <div className="md:col-span-2">
                <Label>Remarks</Label>
                <Textarea placeholder="Enter remarks..." />
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

export default EmployeePromotion;