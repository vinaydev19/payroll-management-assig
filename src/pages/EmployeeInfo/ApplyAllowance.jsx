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

const allowanceTypes = [
  "ARREARS",
  "CITY ALLOWANCE",
  "DA. ARREAS",
  "DEARNESS ALLOWANCE",
  "HRA",
  "MEDICAL ALLOWANCE",
  "NPS 14%",
  "OTHER ALLOWANCE",
  "SANITORY ALLOWANCE",
  "VEHICLE ALLOWANCE",
  "WASHING ALLOWANCE",
];

const deductionTypes = [
  "WATER DEDUCTION",
  "TDC Mandai",
  "SANITORY PATHPEDI",
  "REVENUE STAMP",
  "RECURRING DEPOSIT",
  "RECOVERY",
  "PROFESSIONAL TAX",
  "PRASHIK",
  "PF CONTRIBUTION",
  "PENSION CONTRIBUTION",
  "PATPEDHI",
  "P.F.LOAN",
  "OTHER DEDUCTION-1",
  "OTHER DEDUCTION 2",
  "OTHER DEDUCTION 1",
  "Other Deduction 04",
  "OTHER DEDUCTION",
  "NPS 14%",
  "NPS 10%",
  "LIC",
  "Laxmibaug Sahkari Patpedhi Ltd.",
  "HOUSE RENT  RECOVERY",
  "GSLI",
  "GOKULASHTMI ADV.",
  "FESTIVAL ADVANCE",
  "EMPLOYEE SOCIETY",
  "ELECTRICITY",
  "EID ADVANCE",
  "DIWALI ADVANCE",
  "DASEHRA ADVANCE 2015",
  "Anjuman Falahe Moallimeen Foundation",
  "ACCIDENT INSURANCE",
  "15 August",
  "keral",
  "INCOME TAX",
  "other deduction 3",
];

const ApplyAllowance = () => {
  const [typeSelection, setTypeSelection] = useState("allowance");

  return (
    <div className="flex justify-end p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 text-white">Add New</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add New Allowance / Deduction</DialogTitle>
          </DialogHeader>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Allowance / Deduction Radio */}
            <div className="md:col-span-2">
              <Label>Type</Label>
              <RadioGroup
                defaultValue="allowance"
                className="flex gap-6 mt-2"
                onValueChange={setTypeSelection}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="allowance" id="allowance" />
                  <Label htmlFor="allowance">Allowance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="deduction" id="deduction" />
                  <Label htmlFor="deduction">Deduction</Label>
                </div>
              </RadioGroup>
            </div>

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

            {/* Conditional: Allowance or Deduction Type */}
            <div>
              <Label>{typeSelection === "allowance" ? "Allowance Type" : "Deduction Type"}</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue
                    placeholder={`Select ${typeSelection === "allowance" ? "Allowance" : "Deduction"} Type`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {(typeSelection === "allowance" ? allowanceTypes : deductionTypes).map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount Type */}
            <div>
              <Label>Amount Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="percentage">Percentage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div>
              <Label>Amount</Label>
              <Input type="number" placeholder="Enter amount" />
            </div>

            {/* Order No */}
            <div>
              <Label>Order No.</Label>
              <Input type="number" placeholder="Enter order number" />
            </div>

            {/* Order Date */}
            <div>
              <Label>Order Date</Label>
              <Input type="date" />
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplyAllowance;
