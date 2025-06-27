import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const wards = ["PRIMARY EDU DEPT"]
const departments = Array.from({ length: 100 }, (_, i) => `${i + 1}-school`)
const designations = ["Asst. Teacher", "Graduate Teacher", "Head Master", "Shikshan Sevak"]
const transactionTypes = ["salary", "bank loans", "advances"]
const orderByOptions = ["Employee ID", "Employee Name", "Ward Name", "Department Name", "Designation Name"]
const states = ["Approved", "Not Approved"]

// Generate mock employee data
const generateMockData = () => {
  const names = ["John", "Jane", "Alice", "Bob", "Priya", "Amit", "Sara", "Michael", "Neha", "Raj"]
  return Array.from({ length: 10 }, (_, i) => ({
    srNo: i + 1,
    employeeNo: `EMP${1000 + i}`,
    employeeName: names[i],
    ward: wards[0],
    department: departments[Math.floor(Math.random() * departments.length)],
    designation: designations[Math.floor(Math.random() * designations.length)],
    state: states[Math.floor(Math.random() * states.length)],
  }))
}

function ApproveTransactions() {
  const [month, setMonth] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [data] = useState(generateMockData)

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Top header with Add New */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Approve Transactions</h1>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button variant="outline">Add New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4">

              {/* Ward */}
              <div>
                <Label>Ward</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Ward" />
                  </SelectTrigger>
                  <SelectContent>
                    {wards.map((ward) => (
                      <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                    ))}
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
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
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
                    {designations.map((desig) => (
                      <SelectItem key={desig} value={desig}>{desig}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transaction Type */}
              <div>
                <Label>Transaction Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Transaction Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Month */}
              <div>
                <Label>Month</Label>
                <Input
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
              </div>

              {/* State */}
              <div>
                <Label>Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Order By */}
              <div>
                <Label>Order By</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Order By" />
                  </SelectTrigger>
                  <SelectContent>
                    {orderByOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full mt-4">
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* View Data Table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">View Data</h2>
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-2 border-r">Sr. No.</th>
                <th className="px-4 py-2 border-r">Employee No.</th>
                <th className="px-4 py-2 border-r">Employee Name</th>
                <th className="px-4 py-2 border-r">Ward</th>
                <th className="px-4 py-2 border-r">Department</th>
                <th className="px-4 py-2 border-r">Designation</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((emp) => (
                <tr key={emp.employeeNo} className="border-t">
                  <td className="px-4 py-2 border-r">{emp.srNo}</td>
                  <td className="px-4 py-2 border-r">{emp.employeeNo}</td>
                  <td className="px-4 py-2 border-r">{emp.employeeName}</td>
                  <td className="px-4 py-2 border-r">{emp.ward}</td>
                  <td className="px-4 py-2 border-r">{emp.department}</td>
                  <td className="px-4 py-2 border-r">{emp.designation}</td>
                  <td className="px-4 py-2">{emp.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ApproveTransactions
