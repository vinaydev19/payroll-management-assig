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

const employees = {
  "Asst. Teacher": ["Asha Patil", "Ravi Kale"],
  "Graduate Teacher": ["Sneha More", "Rahul Deshmukh"],
  "Head Master": ["Sunil Pawar"],
  "Shikshan Sevak": ["Kiran Jadhav", "Meena Nair"],
};

function SalaryIncrementDecrement() {
  const [designation, setDesignation] = useState("");
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 text-white">Add New</Button>
        </DialogTrigger>

        <DialogContent className="max-w-3xl rounded-2xl">
          <DialogHeader>
            <DialogTitle>Salary Increment / Decrement</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {!showForm ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <SelectItem key={i} value={`school-${i + 1}`}>
                          School {i + 1}
                        </SelectItem>
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

                <div className="md:col-span-2 flex justify-end">
                  <Button onClick={() => setShowForm(true)}>Search</Button>
                </div>
              </div>
            ) : (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Employee Code</Label>
                  <Input placeholder="Enter employee code" />
                </div>
                <div>
                  <Label>Basic Salary (Per Month)</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div className="md:col-span-2">
                  <Label>Increment / Decrement</Label>
                  <RadioGroup defaultValue="increment" className="flex gap-6 mt-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="increment" id="inc" />
                      <Label htmlFor="inc">Increment</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="decrement" id="dec" />
                      <Label htmlFor="dec">Decrement</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label>Inc./Dec. Date</Label>
                  <Input type="date" />
                </div>
                <div className="md:col-span-2">
                  <Label>Rate / Amount</Label>
                  <RadioGroup defaultValue="rate" className="flex gap-6 mt-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rate" id="rate" />
                      <Label htmlFor="rate">Rate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="amount" id="amount" />
                      <Label htmlFor="amount">Amount</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label>Rate / Amount</Label>
                  <Input type="number" />
                </div>
                <div>
                  <Label>New Basic Salary</Label>
                  <Input type="number" />
                </div>
                <div>
                  <Label>New Annual Salary</Label>
                  <Input type="number" />
                </div>
                <div className="md:col-span-2">
                  <Label>Remarks</Label>
                  <Textarea placeholder="Enter remarks..." />
                </div>
                <div className="md:col-span-2 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Back
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SalaryIncrementDecrement;
