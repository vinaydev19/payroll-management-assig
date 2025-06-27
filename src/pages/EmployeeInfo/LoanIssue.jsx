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

const loanNames = [
  "NEW SATARA NAGRIK SAHAKARI PATSA",
  "OM-GORAI SAHAKARI PATSANSTHA MARYADIT",
  "Other Bank",
  "PF Loan",
  "PRAKASH SAHKARI PATSANSTHA MARYADIT MUMBAI",
  "S. D C BANK",
  "Sahyog Karmachari Sahakri Patsanstha ltd.",
  "SAI GOLD NAGARI SAHAKARI PATHSANTHA LTD.",
  "Shree Moreshwar Nagari Sahakari Patsantha ltd.",
  "Sindhudurg Nagari Shakari Patpedi Maryadit",
  "Suvidha Karmachari Patsanstha",
  "Tapi Shakari Patepadi",
  "TDC BANK",
  "THE ABHINAV SAHAKARI BANK LTD-",
  "THE CHEMBUR NAG SAH BANK",
  "The Deccan Merchant C- Op Bank Ltd",
  "THE MAHANAGAR COOPBANK, THANE",
  "THE SARVODAY BANK LTD MUMBAI",
  "VISHVABHARTI SAHAKARI PATSAN",
];

const banks = [
  "JANTA SAHAKARI BANK LTD.",
  "KALYAN JANATA SAHAKARI BANK",
  "MOGVIRA COBANK",
  "NAGARIK SAHAKARI BANK LTD„ BHIWANDI",
  "NEW SATARA NAGRIK SAHAKARI PATSACHICHPOKLI",
  "OM- GORA SAKAKARI PATSANSTHA MARYADIT",
  "SAI GOLD NAGARI SAHAKARI PATHSANTHA LTD.",
  "SHRAMIK SAHAKAR BANK",
  "SHREE MORESHWAR NAGARI PATSANTHA LTD.",
  "SUVIDHA BHIWANDI KARMACHARI SAHKARI PATSANSTA",
  "TAPI SHAKARI PATEPADI",
  "THANE DISTRIC AGREECATUR BANK BHIWANDI",
  "THANE JANTA SAHAKARI BANK",
  "THE ABHINAV NAGARIK SAHAKARI BANK LTD.",
  "THE CHEMBUR NAGRIK SAR. BANK VASHI",
  "THE MAHANAGAR COOPBANK LTD„THANE",
  "THE SAHEBRAO DESHMUKH COOP BANK LTD",
  "THE SARVODAYA CO - OP. BANK LTD„ MUMBAI",
  "YES BANK , BHIWANDI",
];

const LoanIssue = () => {
  const [loanType, setLoanType] = useState("regular");
  const [installmentType, setInstallmentType] = useState("installment");

  return (
    <div className="flex justify-end p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 text-white">Add New</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add New Loan Entry</DialogTitle>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-auto pr-2">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                      <SelectItem key={i + 1} value={`school-${i + 1}`}>
                        School {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Designation</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Asst. Teacher",
                      "Graduate Teacher",
                      "Head Master",
                      "Shikshan Sevak",
                    ].map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Employee</Label>
                <Input placeholder="Employee name based on designation" disabled />
              </div>

              <div>
                <Label>Issue No</Label>
                <Input type="number" />
              </div>

              <div>
                <Label>Issue Date</Label>
                <Input type="date" />
              </div>

              <div>
                <Label>Loan Name</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Loan Name" />
                  </SelectTrigger>
                  <SelectContent>
                    {loanNames.map((loan) => (
                      <SelectItem key={loan} value={loan}>{loan}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Repayment Date</Label>
                <Input type="date" />
              </div>

              <div>
                <Label>Interest</Label>
                <Input type="number" />
              </div>

              <div>
                <Label>Loan Amount</Label>
                <Input type="number" />
              </div>

              <div>
                <Label>Total Amount</Label>
                <Input type="number" />
              </div>

              <div>
                <Label>Loan Type</Label>
                <RadioGroup defaultValue="regular" onValueChange={setLoanType} className="flex gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="regular" id="regular" />
                    <Label htmlFor="regular">Regular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recurring" id="recurring" />
                    <Label htmlFor="recurring">Recurring</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Installment / EMI</Label>
                <RadioGroup defaultValue="installment" onValueChange={setInstallmentType} className="flex gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="installment" id="installment" />
                    <Label htmlFor="installment">Installment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emi" id="emi" />
                    <Label htmlFor="emi">EMI</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Pay Mode</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Pay Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="salary">Salary A/C</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Bank</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Branch</Label>
                <Input type="text" />
              </div>

              <div>
                <Label>Account No.</Label>
                <Input type="text" />
              </div>

              <div>
                <Label>Cheque No.</Label>
                <Input type="number" />
              </div>

              <div>
                <Label>Cheque Date</Label>
                <Input type="date" />
              </div>

              <div className="md:col-span-2">
                <Label>Remark</Label>
                <Textarea placeholder="Enter remark here..." />
              </div>

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
};

export default LoanIssue;