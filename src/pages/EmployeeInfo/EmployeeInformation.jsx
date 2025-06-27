import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { SelectContent } from '@radix-ui/react-select';

export default function EmployeeInformation() {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    qualifications: [],
    experiences: [],
  });
  const [newQual, setNewQual] = useState({});
  const [newExp, setNewExp] = useState({});
  const updateForm = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const next = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const submit = () => {
    setEmployees([...employees, form]);
    setForm({});
    setStep(0);
    setModalOpen(false);
  };

  const deleteEmp = idx => setEmployees(e => e.filter((_, i) => i !== idx));

  // === Forms per step ===

  const Step0_Basic = (
    <div className="grid gap-4">
      <Select placeholder="Ward" value={form.ward} onValueChange={v => updateForm('ward', v)}>
        <SelectContent>
          <SelectItem value="PRIMARY EDU DEPT">PRIMARY EDU DEPT</SelectItem>
        </SelectContent>
      </Select>
      <Checkbox checked={!!form.isVacant} onCheckedChange={v => updateForm('isVacant', v)}>Is Vacant Post?</Checkbox>
      <Input type="file" onChange={e => updateForm('photo', e.target.files?.[0])} />
      <Input placeholder="Employee ID" value={form.empId || ''} onChange={e => updateForm('empId', e.target.value)} />
      <Input type="date" placeholder="Date of Joining" value={form.joinDate || ''} onChange={e => updateForm('joinDate', e.target.value)} />
      <Select placeholder="Title" value={form.title} onValueChange={v => updateForm('title', v)}>
        <SelectContent>
          {['shri', 'miss', 'mr', 'mrs', 'ms', 'smt', 'dr', 'mohd'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
        </SelectContent>
      </Select>
      <Input placeholder="First Name" value={form.firstName || ''} onChange={e => updateForm('firstName', e.target.value)} />
      <Input placeholder="Father/Middle Name" value={form.middleName || ''} onChange={e => updateForm('middleName', e.target.value)} />
      <Input placeholder="Last Name" value={form.lastName || ''} onChange={e => updateForm('lastName', e.target.value)} />
      <Input placeholder="Full Name (Marathi)" value={form.fullNameMarathi || ''} onChange={e => updateForm('fullNameMarathi', e.target.value)} />
      <Select placeholder="Gender" value={form.gender} onValueChange={v => updateForm('gender', v)}>
        <SelectContent>

          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
        </SelectContent>
      </Select>
      <Input type="date" placeholder="Date of Birth" value={form.dob || ''} onChange={e => updateForm('dob', e.target.value)} />
    </div>
  );

  const Step1_Allowances = (
    <div>
      {['DA', 'HRA', 'MEDICAL', 'CITY', 'VEHICLE', 'WASHING', 'SANITORY', 'OTHER', 'ARREARS', 'DA_ARREARS', 'NPS_14%']
        .map(key => (
          <div key={key} className="flex items-center gap-2 mb-2">
            <span className="w-40">{key.replace(/_/g, ' ')}</span>
            <Input type="number" placeholder="Amount" value={form[`${key}_amt`] || ''} onChange={e => updateForm(`${key}_amt`, e.target.value)} className="w-24" />
            <Select placeholder="Type" value={form[`${key}_type`]} onValueChange={v => updateForm(`${key}_type`, v)} className="w-24">
              <SelectContent>

                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
              </SelectContent>
            </Select>
            <Checkbox checked={!!form[`${key}_enabled`]} onCheckedChange={v => updateForm(`${key}_enabled`, v)} />
          </div>
        ))
      }
    </div>
  );

  const Step2_Deductions = (
    <div>
      {[
        'PROFESSIONAL_TAX', 'INCOME_TAX', 'PF', 'PENSION', 'RECURRING_DEPOSIT', 'ELECTRICITY', 'UC',
        'EMPLOYEE_SOCIETY', 'SANITORY_PATHPEDI', 'CSCI', 'OTHER_DEDUCT', 'WATER', 'PRASHIK',
        'HOUSE_RENT_RECOVERY', 'OTHER_DEDUCT2', 'FESTIVAL_ADVANCE', 'EID_ADVANCE', 'KOKIJ_ALASHTMI',
        'DASEHRA_ADVANCE', 'DIWALI_ADVANCE', '...'
      ]
        .map(key => (
          <div key={key} className="flex items-center gap-2 mb-2">
            <span className="w-40">{key.replace(/_/g, ' ')}</span>
            <Input type="number" placeholder="Amt" value={form[`${key}_amt`] || ''} onChange={e => updateForm(`${key}_amt`, e.target.value)} className="w-24" />
            <Select placeholder="Type" value={form[`${key}_type`]} onValueChange={v => updateForm(`${key}_type`, v)} className="w-24">
              <SelectContent>

                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
              </SelectContent>
            </Select>
            <Checkbox checked={!!form[`${key}_enabled`]} onCheckedChange={v => updateForm(`${key}_enabled`, v)} />
          </div>
        ))}
    </div>
  );

  const Step3_Leaves = (
    <div>
      {['EARNED', 'MEDICAL', 'CASUAL'].map(key => (
        <div key={key} className="grid grid-cols-4 gap-2 mb-2">
          <span className="col-span-1">{key} LEAVE</span>
          <Select placeholder="Carry Forward?" value={form[`${key}_carry`]} onValueChange={v => updateForm(`${key}_carry`, v)}>
            <SelectContent>

              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
          <Input type="number" placeholder="No. of Leaves" value={form[`${key}_no`]} onChange={e => updateForm(`${key}_no`, e.target.value)} />
          <Input placeholder="Cashable" value={form[`${key}_cash`] || ''} onChange={e => updateForm(`${key}_cash`, e.target.value)} />
        </div>
      ))}
    </div>
  );

  const Step4_Addresses = (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h3>Present Address:</h3>
        <Textarea placeholder="Address (EN)" value={form.p_addr_en || ''} onChange={e => updateForm('p_addr_en', e.target.value)} />
        <Textarea placeholder="पत्ता (मराठीत)" value={form.p_addr_mr || ''} onChange={e => updateForm('p_addr_mr', e.target.value)} />
        <Input placeholder="State" value={form.p_state || ''} onChange={e => updateForm('p_state', e.target.value)} />
        <Input placeholder="District" value={form.p_dist || ''} onChange={e => updateForm('p_dist', e.target.value)} />
        <Input placeholder="City/Village" value={form.p_city || ''} onChange={e => updateForm('p_city', e.target.value)} />
        <Input placeholder="Postal Code" value={form.p_pin || ''} onChange={e => updateForm('p_pin', e.target.value)} />
      </div>
      <div>
        <h3>Permanent Address</h3>
        <Checkbox checked={form.sameAddr} onCheckedChange={v => updateForm('sameAddr', v)}>Same as Present</Checkbox>
        {/* replicate inputs, use same if checked */}
      </div>
    </div>
  );

  const Step5_QualExp = (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Qualifications</h4>
        <div className="grid grid-cols-4 gap-2 items-end">
          <Input placeholder="Certificate" value={newQual.certificate || ''} onChange={e => setNewQual({ ...newQual, certificate: e.target.value })} />
          <Input placeholder="Board/University" value={newQual.board || ''} onChange={e => setNewQual({ ...newQual, board: e.target.value })} />
          <Input placeholder="Marks/Percentage" value={newQual.marks || ''} onChange={e => setNewQual({ ...newQual, marks: e.target.value })} />
          <Input placeholder="Year/Session" value={newQual.year || ''} onChange={e => setNewQual({ ...newQual, year: e.target.value })} />
          <Button
            className="col-span-4 md:col-span-1"
            onClick={() => {
              if (newQual.certificate && newQual.board) {
                updateForm('qualifications', [...(form.qualifications || []), newQual]);
                setNewQual({});
              }
            }}
          >
            Add Qualification
          </Button>
        </div>

        {form.qualifications?.length > 0 && (
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Certificate</TableHead>
                <TableHead>Board</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Year</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {form.qualifications.map((q, idx) => (
                <TableRow key={idx}>
                  <TableCell>{q.certificate}</TableCell>
                  <TableCell>{q.board}</TableCell>
                  <TableCell>{q.marks}</TableCell>
                  <TableCell>{q.year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div>
        <h4 className="font-semibold mb-2">Experience</h4>
        <div className="grid grid-cols-4 gap-2 items-end">
          <Input placeholder="Institution/Company" value={newExp.company || ''} onChange={e => setNewExp({ ...newExp, company: e.target.value })} />
          <Input placeholder="Designation" value={newExp.designation || ''} onChange={e => setNewExp({ ...newExp, designation: e.target.value })} />
          <Input placeholder="Duration (Yrs/Months)" value={newExp.duration || ''} onChange={e => setNewExp({ ...newExp, duration: e.target.value })} />
          <Input placeholder="Session" value={newExp.session || ''} onChange={e => setNewExp({ ...newExp, session: e.target.value })} />
          <Button
            className="col-span-4 md:col-span-1"
            onClick={() => {
              if (newExp.company && newExp.designation) {
                updateForm('experiences', [...(form.experiences || []), newExp]);
                setNewExp({});
              }
            }}
          >
            Add Experience
          </Button>
        </div>

        {form.experiences?.length > 0 && (
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Session</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {form.experiences.map((exp, idx) => (
                <TableRow key={idx}>
                  <TableCell>{exp.company}</TableCell>
                  <TableCell>{exp.designation}</TableCell>
                  <TableCell>{exp.duration}</TableCell>
                  <TableCell>{exp.session}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );

  const Step6_SalaryShiftOther = (
    <div>
      <h4>Salary, Overtime, Shift & Other Details</h4>
      {/* Create sections similarly */}
    </div>
  );

  const Step7_OtherRemarks = (
    <div>
      <Input placeholder="Bank Branch" value={form.bankBranch || ''} onChange={e => updateForm('bankBranch', e.target.value)} />
      <Select placeholder="Marital Status" value={form.maritalStatus} onValueChange={v => updateForm('maritalStatus', v)}>
        <SelectContent>

          <SelectItem value="single">Single</SelectItem>
          <SelectItem value="married">Married</SelectItem>
        </SelectContent>
      </Select>
      {/* add PAN, Aadhaar, email, password, etc. */}
      <Textarea placeholder="Remarks" value={form.remarks || ''} onChange={e => updateForm('remarks', e.target.value)} />
    </div>
  );

  const steps = [
    Step0_Basic,
    Step1_Allowances,
    Step2_Deductions,
    Step3_Leaves,
    Step4_Addresses,
    Step5_QualExp,
    Step6_SalaryShiftOther,
    Step7_OtherRemarks,
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Information</h1>
      <Button onClick={() => setModalOpen(true)}>Add Employee</Button>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-scroll">
          <DialogHeader><DialogTitle>Step {step + 1} of {steps.length}</DialogTitle></DialogHeader>
          <div className="mt-4 mb-4">{steps[step]}</div>
          <DialogFooter className="flex justify-between">
            {step > 0 && <Button variant="outline" onClick={prev}>Previous</Button>}
            {step < steps.length - 1
              ? <Button onClick={next}>Next</Button>
              : <Button onClick={submit}>Submit</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            {['Sr.', 'Employee ID', 'Name', 'Gender', 'Dept', 'Action'].map(h => <TableHead key={h}>{h}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((e, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{e.empId}</TableCell>
              <TableCell>{e.firstName} {e.middleName} {e.lastName}</TableCell>
              <TableCell>{e.gender}</TableCell>
              <TableCell>{e.ward}</TableCell>
              <TableCell>
                <Button variant="link" size="sm">Update</Button>
                <Button variant="link" size="sm" onClick={() => deleteEmp(i)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
