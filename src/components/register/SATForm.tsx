import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { appendStudent } from '@/lib/sheets';
import { toast } from 'react-toastify';
import SuccessStudent from '@/components/SuccessStudent';

interface SATData {
  name: string;
  phone: string;
  email: string;
  school: string;
  grade: string;
  plannedDate: string;
  currentScore: string;
  rw: string;
  math: string;
  wishes: string;
  timeSlot: string;
  mockTest: string;
}

const initialData: SATData = {
  name: '', phone: '', email: '', school: '', grade: '', plannedDate: '', currentScore: '',
  rw: '', math: '', wishes: '', timeSlot: '', mockTest: ''
};

const SATForm: React.FC = () => {
  const [data, setData] = useState<SATData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const res = await appendStudent('SAT', data);
    if (!res.ok) {
      const errorMsg = res.message || 'Gửi lên Google Sheets thất bại.';
      setSubmitError(errorMsg);
      toast.error(errorMsg);
    } else {
      setSubmitted(true);
      toast.success('Đăng ký thành công!');
    }
  };

  if (submitted) {
    return <SuccessStudent onReset={() => { setSubmitted(false); setData(initialData); }} />;
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 p-6 rounded-lg border bg-white shadow'>
      {submitError && <p className='text-sm text-red-600'>{submitError}</p>}
      <div className='bg-primary/10 border border-primary rounded-md p-4 text-sm font-semibold text-primary'>Điền form đăng kí tư vấn ngay để được thi thử và phân tích kết quả, tư vấn lộ trình học SAT miễn phí cùng OverSee!</div>
      <div className='grid md:grid-cols-2 gap-4'>
        <div><label className='text-sm font-medium mb-1 block'>Họ và tên *</label><Input name='name' value={data.name} onChange={handleChange} placeholder='Họ và tên' required minLength={2} maxLength={100} pattern="[\p{L}\s]+" title="Vui lòng nhập tên hợp lệ (chỉ chữ cái và khoảng trắng)" /></div>
        <div><label className='text-sm font-medium mb-1 block'>Số điện thoại *</label><Input type='tel' name='phone' value={data.phone} onChange={handleChange} placeholder='Số điện thoại' required pattern="[0-9]{10,11}" title="Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)" /></div>
        <div><label className='text-sm font-medium mb-1 block'>Email *</label><Input type='email' name='email' value={data.email} onChange={handleChange} placeholder='Email' required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Vui lòng nhập email hợp lệ" /></div>
        <div><label className='text-sm font-medium mb-1 block'>Trường học</label><Input name='school' value={data.school} onChange={handleChange} placeholder='Trường của học viên (không bắt buộc)' maxLength={200} /></div>
        <div><label className='text-sm font-medium mb-1 block'>Lớp</label><Input type='number' min='1' max='12' name='grade' value={data.grade} onChange={handleChange} placeholder='Lớp đang theo học (không bắt buộc)' /></div>
        <div><label className='text-sm font-medium mb-1 block'>Lịch thi dự kiến</label><Input type='date' name='plannedDate' value={data.plannedDate} onChange={handleChange} placeholder='Lịch thi SAT dự kiến (không bắt buộc)' /></div>
        <Input name='currentScore' value={data.currentScore} onChange={handleChange} placeholder='Điểm thi SAT hiện tại hoặc "Chưa có điểm" (không bắt buộc)' maxLength={50} />
      </div>
      <div className='grid md:grid-cols-3 gap-4'>
        <div><label className='text-sm font-medium mb-1 block'>Reading & Writing</label><Select value={data.rw} onValueChange={(val) => handleSelectChange('rw', val)}>
          <SelectTrigger><SelectValue placeholder='Reading & Writing' /></SelectTrigger>
          <SelectContent>{Array.from({length: 41}, (_, i) => 400 + i * 10).map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select></div>
        <div><label className='text-sm font-medium mb-1 block'>Math</label><Select value={data.math} onValueChange={(val) => handleSelectChange('math', val)}>
          <SelectTrigger><SelectValue placeholder='Math' /></SelectTrigger>
          <SelectContent>{Array.from({length: 41}, (_, i) => 400 + i * 10).map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select></div>
        <div><label className='text-sm font-medium mb-1 block'>Điểm tổng</label><Select value={data.currentScore} onValueChange={(val) => handleSelectChange('currentScore', val)}>
          <SelectTrigger><SelectValue placeholder='Điểm SAT tổng (không bắt buộc)' /></SelectTrigger>
          <SelectContent>{Array.from({length: 121}, (_, i) => 400 + i * 10).map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select></div>
      </div>
      <div><label className='text-sm font-medium mb-1 block'>Nguyện vọng thêm</label><Textarea name='wishes' value={data.wishes} onChange={handleChange} placeholder='Chia sẻ nguyện vọng thêm từ học sinh/phụ huynh (không bắt buộc)' maxLength={500} /></div>
      <div className='space-y-2'>
        <p className='text-sm font-medium'>Khung thời gian học sinh tiện trao đổi:</p>
        <div className='flex gap-4 flex-wrap'>
          {['9-12 AM', '12-5 PM', '5-9 PM'].map(slot => (
            <label key={slot} className='flex items-center gap-2 text-sm'>
              <input type='radio' name='timeSlot' value={slot} checked={data.timeSlot === slot} onChange={handleChange} required /> {slot}
            </label>
          ))}
        </div>
      </div>
      <div className='space-y-2'>
        <p className='text-sm font-medium'>Bạn có muốn thi thử SAT online cùng OverSee?</p>
        <div className='flex gap-6'>
          {['Có', 'Không'].map(val => (
            <label key={val} className='flex items-center gap-2 text-sm'>
              <input type='radio' name='mockTest' value={val} checked={data.mockTest === val} onChange={handleChange} required /> {val}
            </label>
          ))}
        </div>
      </div>
      <Button type='submit' className='w-full'>Gửi đơn</Button>
    </form>
  );
};

export default SATForm;
