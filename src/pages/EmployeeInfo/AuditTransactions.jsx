import React from 'react'
import { useMemo, useState } from "react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const wards = ["PRIMARY EDU DEPT"]
const departments = Array.from({ length: 100 }, (_, i) => `${i + 1}-school`)
const designations = ["Asst. Teacher", "Graduate Teacher", "Head Master", "Shikshan Sevak"]
const transactionTypes = ["salary", "bank loans", "advances"]
const orderByOptions = ["Employee ID", "Employee Name", "Ward Name", "Department Name", "Designation Name"]
const states = ["Audit", "Not Audit"]

// Generate 50 mock employee records
const generateMockData = () => {
  const names = ["John", "Jane", "Alice", "Bob", "Priya", "Amit", "Sara", "Michael", "Neha", "Raj"]
  return Array.from({ length: 50 }, (_, i) => ({
    srNo: i + 1,
    employeeNo: `EMP${1000 + i}`,
    employeeName: names[i % names.length] + " " + (i + 1),
    ward: wards[0],
    department: departments[Math.floor(Math.random() * departments.length)],
    designation: designations[Math.floor(Math.random() * designations.length)],
    state: states[Math.floor(Math.random() * states.length)],
  }))
}


function AuditTransactions() {
  const [month, setMonth] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const data = useMemo(() => generateMockData(), [])

  // Filtered and paginated data
  const filteredData = useMemo(() => {
    const filtered = data.filter(d =>
      d.employeeName.toLowerCase().includes(search.toLowerCase())
    )
    const startIndex = (page - 1) * rowsPerPage
    return filtered.slice(startIndex, startIndex + rowsPerPage)
  }, [search, page, data])

  const totalPages = Math.ceil(
    data.filter(d =>
      d.employeeName.toLowerCase().includes(search.toLowerCase())
    ).length / rowsPerPage
  )

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Top header with Add New */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Audit Transactions</h1>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button variant="outline">Add New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div>
                <Label>Ward</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select Ward" /></SelectTrigger>
                  <SelectContent>
                    {wards.map(ward => <SelectItem key={ward} value={ward}>{ward}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Department</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select Department" /></SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Designation</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select Designation" /></SelectTrigger>
                  <SelectContent>
                    {designations.map(desig => <SelectItem key={desig} value={desig}>{desig}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Transaction Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select Transaction Type" /></SelectTrigger>
                  <SelectContent>
                    {transactionTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Month</Label>
                <Input type="month" value={month} onChange={e => setMonth(e.target.value)} />
              </div>
              <div>
                <Label>Status</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
                  <SelectContent>
                    {states.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Order By</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select Order By" /></SelectTrigger>
                  <SelectContent>
                    {orderByOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full mt-4">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <Input
          placeholder="Search by Employee Name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />
      </div>

      {/* Data Table */}
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr. No.</TableHead>
              <TableHead>Employee No.</TableHead>
              <TableHead>Employee Name</TableHead>
              <TableHead>Ward</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((emp) => (
              <TableRow key={emp.employeeNo}>
                <TableCell>{emp.srNo}</TableCell>
                <TableCell>{emp.employeeNo}</TableCell>
                <TableCell>{emp.employeeName}</TableCell>
                <TableCell>{emp.ward}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.designation}</TableCell>
                <TableCell>{emp.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          variant="outline"
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default AuditTransactions
