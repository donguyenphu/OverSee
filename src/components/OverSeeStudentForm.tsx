import React, { useState } from "react";

/* -------------------- TYPES -------------------- */
type TestType = "SAT" | "IELTS" | "VIET";

interface BaseFormData {
  fullName: string;
  phone: string;
  email: string;
  school: string;
  grade: string;
  timeSlot?: "9-12 AM" | "12-5 PM" | "5-9 PM";
  note?: string;
  wantMockTest?: "Có" | "Không";
}

interface IELTSFormData extends BaseFormData {
  testDate?: string;
  currentScore?: string;
  readingScore?: number | "";
  writingScore?: number | "";
  listeningScore?: number | "";
  speakingScore?: number | "";
}

interface SATFormData extends BaseFormData {
  testDate?: string;
  currentScore?: string;
  readingScore?: number | "";
  mathScore?: number | "";
}

interface VIETFormData extends BaseFormData {
  facebook?: string;
  vietnamSubject?: string;
  vietnamCurrentScore?: number | "";
  vietnamGoal?: string;
}

type FormData = Partial<IELTSFormData & SATFormData & VIETFormData & { formType: TestType }>;

/* -------------------- MAIN COMPONENT -------------------- */
export default function OverSeeForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [testType, setTestType] = useState<TestType | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState(false);

  const handleSelectType = (type: TestType) => {
    setTestType(type);
    setFormData({ ...formData, formType: type });
    setStep(2);
  };

  const handleChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch("YOUR_GOOGLE_SHEET_WEB_APP_URL", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setLoading(false);
      setStep(3);
    } catch (err) {
      setLoading(false);
      alert("Có lỗi xảy ra!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

        {/* STEP 1: SELECT TYPE */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-2xl font-bold text-center text-gray-800">
              Chọn hình thức tư vấn
            </h1>
            <div className="grid gap-4">
              <SelectButton label="Tư vấn IELTS" color="blue" onClick={() => handleSelectType("IELTS")} />
              <SelectButton label="Tư vấn SAT" color="purple" onClick={() => handleSelectType("SAT")} />
              <SelectButton label="Môn học chương trình Việt Nam" color="green" onClick={() => handleSelectType("VIET")} />
            </div>
          </div>
        )}

        {/* STEP 2: FORM */}
        {step === 2 && testType === "IELTS" && (
          <FormIELTS className="text-xl" formData={formData} onChange={handleChange} onSubmit={handleSubmit} loading={loading} />
        )}
        {step === 2 && testType === "SAT" && (
          <FormSAT className="text-xl" formData={formData} onChange={handleChange} onSubmit={handleSubmit} loading={loading} />
        )}
        {step === 2 && testType === "VIET" && (
          <FormVIET className="text-xl" formData={formData} onChange={handleChange} onSubmit={handleSubmit} loading={loading} />
        )}

        {/* STEP 3: SUCCESS */}
        {step === 3 && (
          <div className="text-center space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Đăng ký thành công!</h1>
            <p className="text-gray-600">OverSee sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
            <button
              onClick={() => { setStep(1); setFormData({}); }}
              className="px-8 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-800"
            >
              Điền form khác
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

/* -------------------- UI COMPONENTS -------------------- */
function SelectButton({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`p-5 bg-${color}-600 hover:bg-${color}-700 transition text-white rounded-full shadow`}
    >
      {label}
    </button>
  );
}

function Input<T extends string | number>({ label, value, onChange, placeholder, type = "text" }: any) {
  return (
    <div>
      <label className="font-medium capitalize">{label}</label>
      <input
        type={type}
        className="w-full border rounded-full p-3 mt-1 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        placeholder={placeholder || ""}
        value={value ?? ""}
        onChange={(e) => onChange(label, type === "number" ? Number(e.target.value) : e.target.value)}
      />
    </div>
  );
}

function TextArea({ label, value, onChange }: any) {
  return (
    <div>
      <label className="font-medium capitalize">{label}</label>
      <textarea
        rows={4}
        className="w-full border rounded-2xl p-3 mt-1 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(label, e.target.value)}
      />
    </div>
  );
}

function TimeSelection({ value, onChange }: any) {
  return (
    <div>
      <p className="font-medium">Khung thời gian trao đổi:</p>
      <div className="flex gap-4 mt-2">
        {["9-12 AM", "12-5 PM", "5-9 PM"].map((t) => (
          <label key={t} className="flex items-center gap-2">
            <input
              type="radio"
              checked={value === t}
              onChange={() => onChange("timeSlot", t)}
            />
            {t}
          </label>
        ))}
      </div>
    </div>
  );
}

function YesNo({ label, field, value, onChange }: any) {
  return (
    <div>
      <p className="font-medium">{label}</p>
      <div className="flex gap-8 mt-2">
        {["Có", "Không"].map((v) => (
          <label key={v} className="flex items-center gap-2">
            <input type="radio" checked={value === v} onChange={() => onChange(field, v)} />
            {v}
          </label>
        ))}
      </div>
    </div>
  );
}

function SubmitButton({ loading, onSubmit }: any) {
  return (
    <button
      onClick={onSubmit}
      disabled={loading}
      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg mt-4"
    >
      {loading ? "Đang gửi..." : "Gửi thông tin"}
    </button>
  );
}

/* -------------------- FORM VARIANTS -------------------- */
function FormIELTS({ formData, onChange, onSubmit, loading }: any) {
  return (
    <div className="space-y-4 animate-fadeIn">
      <h2 className="text-xl font-bold text-blue-600">Điền form đăng kí tư vấn IELTS</h2>
      <Input label="fullName" value={formData.fullName} onChange={onChange} placeholder="Họ và tên" />
      <Input label="phone" value={formData.phone} onChange={onChange} placeholder="Số điện thoại" />
      <Input label="email" type="email" value={formData.email} onChange={onChange} placeholder="Email" />
      <Input label="school" value={formData.school} onChange={onChange} placeholder="Trường của học viên" />
      <Input label="grade" value={formData.grade} onChange={onChange} placeholder="Lớp đang theo học" />
      <Input label="testDate" type="date" value={formData.testDate} onChange={onChange} />
      <Input label="currentScore" value={formData.currentScore} onChange={onChange} placeholder="Điểm hiện tại hoặc Chưa có điểm" />
      <div className="grid grid-cols-2 gap-4">
        <Input label="readingScore" type="number" value={formData.readingScore} onChange={onChange} placeholder="Reading" />
        <Input label="writingScore" type="number" value={formData.writingScore} onChange={onChange} placeholder="Writing" />
        <Input label="listeningScore" type="number" value={formData.listeningScore} onChange={onChange} placeholder="Listening" />
        <Input label="speakingScore" type="number" value={formData.speakingScore} onChange={onChange} placeholder="Speaking" />
      </div>
      <TextArea label="note" value={formData.note} onChange={onChange} />
      <TimeSelection value={formData.timeSlot} onChange={onChange} />
      <YesNo label="Bạn có muốn thi thử IELTS online cùng OverSee?" field="wantMockTest" value={formData.wantMockTest} onChange={onChange} />
      <SubmitButton loading={loading} onSubmit={onSubmit} />
    </div>
  );
}

function FormSAT({ formData, onChange, onSubmit, loading }: any) {
  return (
    <div className="space-y-4 animate-fadeIn">
      <h2 className="text-xl font-bold text-purple-600">Điền form đăng kí tư vấn SAT</h2>
      <Input label="fullName" value={formData.fullName} onChange={onChange} placeholder="Họ và tên" />
      <Input label="phone" value={formData.phone} onChange={onChange} placeholder="Số điện thoại" />
      <Input label="email" type="email" value={formData.email} onChange={onChange} placeholder="Email" />
      <Input label="school" value={formData.school} onChange={onChange} placeholder="Trường của học viên" />
      <Input label="grade" value={formData.grade} onChange={onChange} placeholder="Lớp đang theo học" />
      <Input label="testDate" type="date" value={formData.testDate} onChange={onChange} />
      <Input label="currentScore" value={formData.currentScore} onChange={onChange} placeholder="Điểm hiện tại hoặc Chưa có điểm" />
      <div className="grid grid-cols-2 gap-4">
        <Input label="readingScore" type="number" value={formData.readingScore} onChange={onChange} placeholder="Reading & Writing" />
        <Input label="mathScore" type="number" value={formData.mathScore} onChange={onChange} placeholder="Math" />
      </div>
      <TextArea label="note" value={formData.note} onChange={onChange} />
      <TimeSelection value={formData.timeSlot} onChange={onChange} />
      <YesNo label="Bạn có muốn thi thử SAT online cùng OverSee?" field="wantMockTest" value={formData.wantMockTest} onChange={onChange} />
      <SubmitButton loading={loading} onSubmit={onSubmit} />
    </div>
  );
}

function FormVIET({ formData, onChange, onSubmit, loading }: any) {
  return (
    <div className="space-y-4 animate-fadeIn">
      <h2 className="text-xl font-bold text-green-600">Điền form tư vấn Môn học Việt Nam</h2>
      <Input label="fullName" value={formData.fullName} onChange={onChange} placeholder="Họ và tên" />
      <Input label="phone" value={formData.phone} onChange={onChange} placeholder="Số điện thoại" />
      <Input label="email" type="email" value={formData.email} onChange={onChange} placeholder="Email" />
      <Input label="facebook" value={formData.facebook} onChange={onChange} placeholder="Facebook" />
      <Input label="school" value={formData.school} onChange={onChange} placeholder="Trường của học viên" />
      <Input label="grade" value={formData.grade} onChange={onChange} placeholder="Lớp đang theo học" />
      <Input label="vietnamSubject" value={formData.vietnamSubject} onChange={onChange} placeholder="Môn học mong muốn OverSee đồng hành" />
      <Input label="vietnamCurrentScore" type="number" value={formData.vietnamCurrentScore} onChange={onChange} placeholder="Điểm/kết quả môn học hiện tại" />
      <Input label="vietnamGoal" value={formData.vietnamGoal} onChange={onChange} placeholder="Mục tiêu môn học" />
      <TextArea label="note" value={formData.note} onChange={onChange} />
      <TimeSelection value={formData.timeSlot} onChange={onChange} />
      <SubmitButton loading={loading} onSubmit={onSubmit} />
    </div>
  );
}
