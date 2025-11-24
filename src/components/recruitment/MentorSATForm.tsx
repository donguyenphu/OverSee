import React, { useState } from 'react';
import { appendMentor } from '@/lib/sheets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-toastify';
import SuccessMentor from '@/components/SuccessMentor';

interface MentorSATData {
  name: string;
  phone: string; 
  email: string; 
  quote: string; 
  experience: string; 
  rw: string; 
  math: string; 
  overall: string; 
  englishSpec: string; 
  englishAward: string; 
  awardDriveLink: string; 
  focusArea: string; 
  driveImg: string;
}

const initialData: MentorSATData = { phone:'', email:'', quote:'', experience:'', rw:'', math:'', overall:'', englishSpec:'', englishAward:'', awardDriveLink:'', focusArea:'', driveImg:'', name: '' };

const MentorSATForm: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    setSubmitError(null);
    const res = await appendMentor('Mentor SAT', data);
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
    return <SuccessMentor onReset={() => { setSubmitted(false); setData(initialData); }} />;
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 p-6 rounded-lg border bg-white shadow'>
      {submitError && <p className='text-sm text-red-600'>{submitError}</p>}
      <div className='grid md:grid-cols-2 gap-4'>
        <div><label className='text-sm font-medium mb-1 block'>Họ và tên *</label><Input name='name' value={data.name} onChange={handleChange} placeholder='Họ và tên' required minLength={2} maxLength={100} pattern="[\p{L}\s]+" title="Vui lòng nhập tên hợp lệ (chỉ chữ cái và khoảng trắng)" /></div>
        <div><label className='text-sm font-medium mb-1 block'>Số điện thoại *</label><Input type='tel' name='phone' value={data.phone} onChange={handleChange} placeholder='Số điện thoại' required pattern="[0-9]{10,11}" title="Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)" /></div>
        <div><label className='text-sm font-medium mb-1 block'>Email *</label><Input type='email' name='email' value={data.email} onChange={handleChange} placeholder='Email' required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Vui lòng nhập email hợp lệ" /></div>
        <div><label className='text-sm font-medium mb-1 block'>Châm ngôn *</label><Input name='quote' required value={data.quote} onChange={handleChange} placeholder='Châm ngôn yêu thích' maxLength={200} /></div>
        <div><label className='text-sm font-medium mb-1 block'>Điểm chuyên Anh</label><Input type='number' name='englishSpec' value={data.englishSpec} onChange={handleChange} placeholder='Điểm chuyên Anh (nếu có, không bắt buộc)' min='0' max='10' step='0.1' /></div>
        <div><label className='text-sm font-medium mb-1 block'>Giải HSG Tiếng Anh</label><Input name='englishAward' value={data.englishAward} onChange={handleChange} placeholder='Giải HSG Tiếng Anh (nếu có, không bắt buộc)' maxLength={100} /></div>
        <div><label className='text-sm font-medium mb-1 block'>Link drive ảnh minh chứng giải HSG *</label><Input type='url' name='awardDriveLink' value={data.awardDriveLink} onChange={handleChange} placeholder='Link drive ảnh giải thưởng (chú ý mở quyền truy cập)' required /></div>
        <div><label className='text-sm font-medium mb-1 block'>Link ảnh cá nhân (chú ý mở quyền truy cập) *</label><Input type='url' name='driveImg' value={data.driveImg} onChange={handleChange} required placeholder='Link drive ảnh' /></div>
      </div>
      <div><label className='text-sm font-medium mb-1 block'>Kinh nghiệm giảng dạy *</label><Textarea name='experience' value={data.experience} onChange={handleChange} placeholder='Kinh nghiệm giảng dạy SAT' maxLength={500} required /></div>
      <div className='grid md:grid-cols-3 gap-3'>
        <Select value={data.rw} onValueChange={(val) => handleSelectChange('rw', val)}>
          <SelectTrigger><SelectValue placeholder='Reading & Writing' /></SelectTrigger>
          <SelectContent>{Array.from({length: 41}, (_, i) => 400 + i * 10).map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={data.math} onValueChange={(val) => handleSelectChange('math', val)}>
          <SelectTrigger><SelectValue placeholder='Math' /></SelectTrigger>
          <SelectContent>{Array.from({length: 41}, (_, i) => 400 + i * 10).map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={data.overall} onValueChange={(val) => handleSelectChange('overall', val)}>
          <SelectTrigger><SelectValue placeholder='Overall' /></SelectTrigger>
          <SelectContent>{Array.from({length: 121}, (_, i) => 400 + i * 10).map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div><label className='text-sm font-medium mb-1 block'>Mảng muốn giảng dạy chuyên sâu *</label><Textarea name='focusArea' value={data.focusArea} onChange={handleChange} placeholder='Bạn có mong muốn giảng dạy chuyên sâu mảng Reading & Writing hoặc Math không?' maxLength={500} required /></div>
      <Button type='submit' className='w-full'>Gửi đơn</Button>
    </form>
  );
};

export default MentorSATForm;
