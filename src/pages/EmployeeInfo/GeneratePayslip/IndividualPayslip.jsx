import React, { useEffect, useMemo, useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table"

const wards = ["PRIMARY EDU DEPT"]
const departments = Array.from({ length: 100 }, (_, i) => `${i + 1}-school`)
const designations = ["Asst. Teacher", "Graduate Teacher", "Head Master", "Shikshan Sevak"]
const employees = Array.from({ length: 50 }, (_, i) => ({
  code: `EMP${1000 + i}`,
  name: `Employee ${i + 1}`,
}))

const rowsPerPage = 10

const mockPayslipData = () =>
  Array.from({ length: 50 }, (_, i) => {
    const emp = employees[i]
    const paidMonth = new Date()
    paidMonth.setMonth(paidMonth.getMonth() - (i % 12))
    const monthStr = paidMonth.toISOString().slice(0, 7)
    return {
      srNo: i + 1,
      paidMonth: monthStr,
      empCode: emp.code,
      employee: emp.name,
      department: departments[Math.floor(Math.random() * departments.length)],
      designation: designations[Math.floor(Math.random() * designations.length)],
      netSalary: (Math.random() * 50000 + 10000).toFixed(2),
    }
  })

const initialForm = {
  ward: "",
  department: "",
  designation: "",
  month: "",
  empCode: "",
  employee: "",
  basicSalary: 0,
  totalDays: 0,
  paidDays: 0,
  allowances: 0,
  miscPayment: 0,
  leaveTaken: 0,
  leaveAmount: 0,
  deductionAmt: 0,
  miscDeduction: 0,
  policies: 0,
  policyAmt: 0,
  loanDeduction: 0,
  advanceAmt: 0,
  isToPay: false,
  remarks: "",
}

function IndividualPayslip() {
  const [data, setData] = useState([])
  const [form, setForm] = useState({ ...initialForm })
  const [netAmount, setNetAmount] = useState(0)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [editingIndex, setEditingIndex] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setData(mockPayslipData())
  }, [])

  useEffect(() => {
    const { basicSalary, paidDays, totalDays, allowances, miscPayment, leaveAmount, deductionAmt, miscDeduction, policies, policyAmt, loanDeduction, advanceAmt } = form

    const basicPerDay = totalDays ? basicSalary / totalDays : 0
    const earnings = basicPerDay * paidDays + allowances + miscPayment
    const deductions = leaveAmount + deductionAmt + miscDeduction + policyAmt + loanDeduction + advanceAmt
    setNetAmount(parseFloat((earnings - deductions).toFixed(2)))
  }, [form])

  // Filter & paginate
  const filtered = useMemo(() => {
    return data.filter((d) =>
      d.employee.toLowerCase().includes(search.toLowerCase()) ||
      d.empCode.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, data])

  const paged = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage)
  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1

  const handleSubmit = (e) => {
    e.preventDefault()

    const record = {
      srNo: editingIndex !== null ? data[editingIndex].srNo : data.length + 1,
      paidMonth: form.month,
      empCode: form.empCode,
      employee: form.employee,
      department: form.department,
      designation: form.designation,
      netSalary: netAmount,
    }

    let updated = [...data]
    if (editingIndex !== null) {
      updated[editingIndex] = record
    } else {
      updated.push(record)
    }

    setData(updated)
    setEditingIndex(null)
    setShowForm(false)
    setForm({ ...initialForm })
    setPage(Math.ceil(updated.length / rowsPerPage))
  }

  const handleEdit = (index) => {
    const rec = data[index]
    setEditingIndex(index)
    setForm({
      ...initialForm,
      ward: form.ward,
      department: rec.department,
      designation: rec.designation,
      month: rec.paidMonth,
      empCode: rec.empCode,
      employee: rec.employee,
    })
    setShowForm(true)
  }

  const handleDelete = (index) => {
    const updated = data.filter((_, i) => i !== index).map((r, i) => ({ ...r, srNo: i + 1 }))
    setData(updated)
    setPage(Math.min(page, Math.ceil(updated.length / rowsPerPage)))
  }

  const handlePrint = (index) => {
    const rec = data[index]
    alert(`Printing payslip for ${rec.employee} (${rec.empCode}) - Net: ₹${rec.netSalary}`)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Individual Payslip</h1>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button variant="outline">Add New</Button>
          </DialogTrigger>
          <DialogContent className=''>
            <DialogHeader>
              <DialogTitle>{editingIndex !== null ? "Edit Payslip" : "Add Payslip"}</DialogTitle>
            </DialogHeader>
            <div className="max-h-[500px] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ward">Ward</Label>
                    <Select onValueChange={(v) => setForm({ ...form, ward: v })}>
                      <SelectTrigger id="ward"><SelectValue placeholder="Select Ward" /></SelectTrigger>
                      <SelectContent>{wards.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select onValueChange={(v) => setForm({ ...form, department: v })}>
                      <SelectTrigger id="department"><SelectValue placeholder="Department" /></SelectTrigger>
                      <SelectContent>{departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Select onValueChange={(v) => setForm({ ...form, designation: v })}>
                      <SelectTrigger id="designation"><SelectValue placeholder="Designation" /></SelectTrigger>
                      <SelectContent>{designations.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="month">Paid Month</Label>
                    <Input id="month" type="month" value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} required />
                  </div>

                  <div>
                    <Label htmlFor="empCode">Employee</Label>
                    <Select onValueChange={(v) => {
                      const emp = employees.find((e) => e.code === v)
                      setForm({ ...form, empCode: v, employee: emp?.name || "" })
                    }}>
                      <SelectTrigger id="empCode"><SelectValue placeholder="Select Employee" /></SelectTrigger>
                      <SelectContent>{employees.map(e => <SelectItem key={e.code} value={e.code}>{`${e.code} - ${e.name}`}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="basicSalary">Basic Salary</Label>
                    <Input id="basicSalary" type="number" value={form.basicSalary}
                      onChange={(e) => setForm({ ...form, basicSalary: +e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="totalDays">Total Days</Label>
                    <Input id="totalDays" type="number" value={form.totalDays}
                      onChange={(e) => setForm({ ...form, totalDays: +e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="paidDays">Paid Days</Label>
                    <Input id="paidDays" type="number" value={form.paidDays}
                      onChange={(e) => setForm({ ...form, paidDays: +e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="allowances">Allowances</Label>
                    <Input id="allowances" type="number" value={form.allowances}
                      onChange={(e) => setForm({ ...form, allowances: +e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="miscPayment">Misc Payment</Label>
                    <Input id="miscPayment" type="number" value={form.miscPayment}
                      onChange={(e) => setForm({ ...form, miscPayment: +e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="leaveTaken">Leave Taken</Label>
                    <Input id="leaveTaken" type="number" value={form.leaveTaken}
                      onChange={(e) => setForm({ ...form, leaveTaken: +e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="leaveAmount">Leave Amount</Label>
                    <Input id="leaveAmount" type="number" value={form.leaveAmount}
                      onChange={(e) => setForm({ ...form, leaveAmount: +e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="deductionAmt">Deduction Amount</Label>
                    <Input id="deductionAmt" type="number" value={form.deductionAmt}
                      onChange={(e) => setForm({ ...form, deductionAmt: +e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="miscDeduction">Misc Deduction</Label>
                    <Input id="miscDeduction" type="number" value={form.miscDeduction}
                      onChange={(e) => setForm({ ...form, miscDeduction: +e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="policies">No. of Policies</Label>
                    <Input id="policies" type="number" value={form.policies}
                      onChange={(e) => setForm({ ...form, policies: +e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="policyAmt">Policy Amount</Label>
                    <Input id="policyAmt" type="number" value={form.policyAmt}
                      onChange={(e) => setForm({ ...form, policyAmt: +e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="loanDeduction">Loan Deduction</Label>
                    <Input id="loanDeduction" type="number" value={form.loanDeduction}
                      onChange={(e) => setForm({ ...form, loanDeduction: +e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="advanceAmt">Advance Amount</Label>
                    <Input id="advanceAmt" type="number" value={form.advanceAmt}
                      onChange={(e) => setForm({ ...form, advanceAmt: +e.target.value })} />
                  </div>
                </div>

                <div>
                  <Label>Net Amount</Label>
                  <p className="text-lg font-bold">₹{netAmount}</p>

                  <Label className="flex gap-2 items-center mt-2">
                    <input
                      type="checkbox"
                      checked={form.isToPay}
                      onChange={(e) => setForm({ ...form, isToPay: e.target.checked })}
                    />
                    Is to Pay Salary
                  </Label>

                  <Label htmlFor="remarks">Remarks</Label>
                  <textarea
                    id="remarks"
                    className="w-full border rounded p-2"
                    rows={3}
                    value={form.remarks}
                    onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="submit">{editingIndex !== null ? "Update" : "Submit"}</Button>
                  <Button type="button" onClick={() => window.print()}>Print</Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Input
        placeholder="Search by name or code..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        className="mb-4"
      />

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr. No.</TableHead>
              <TableHead>Paid Month</TableHead>
              <TableHead>Emp. Code</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Net Salary</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((row, i) => {
              const idx = (page - 1) * rowsPerPage + i
              return (
                <TableRow key={row.srNo}>
                  <TableCell>{row.srNo}</TableCell>
                  <TableCell>{row.paidMonth}</TableCell>
                  <TableCell>{row.empCode}</TableCell>
                  <TableCell>{row.employee}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.designation}</TableCell>
                  <TableCell>₹{row.netSalary}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handlePrint(idx)}>Print</Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(idx)}>Update</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(idx)}>Delete</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} variant="outline">Previous</Button>
        <span>Page {page} of {totalPages}</span>
        <Button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} variant="outline">Next</Button>
      </div>
    </div>
  )
}

export default IndividualPayslip