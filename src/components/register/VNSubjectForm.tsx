import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { appendStudent } from '@/lib/sheets';
import { toast } from 'react-toastify';
import SuccessStudent from '@/components/SuccessStudent';

interface VNData {
  name: string;
  phone: string;
  email: string;
  facebook: string;
  school: string;
  grade: string;
  subject: string;
  currentResult: string;
  target: string;
  wishes: string;
  timeSlot: string;
}

const initialData: VNData = {
  name: '', phone: '', email: '', facebook: '', school: '', grade: '', subject: '', currentResult: '', target: '', wishes: '', timeSlot: ''
};

const VNSubjectForm: React.FC = () => {
  const [data, setData] = useState<VNData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const res = await appendStudent('VN', data);
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
      <div className='grid md:grid-cols-2 gap-4'>
        <div><label className='text-sm font-medium mb-1 block'>Họ và tên *</label><Input name='name' value={data.name} onChange={handleChange} placeholder='Họ và tên' required minLength={2} maxLength={100} pattern="[\p{L}\s]+" title="Vui lòng nhập tên hợp lệ (chỉ chữ cái và khoảng trắng)" /></div>
        <div><label className='text-sm font-medium mb-1 block'>Số điện thoại *</label><Input type='tel' name='phone' value={data.phone} onChange={handleChange} placeholder='Số điện thoại' required pattern="[0-9]{10,11}" title="Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)" /></div>
        <div><label className='text-sm font-medium mb-1 block'>Email *</label><Input type='email' name='email' value={data.email} onChange={handleChange} placeholder='Email' required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Vui lòng nhập email hợp lệ" /></div>
        <div><label className='text-sm font-medium mb-1 block'>Facebook</label><Input name='facebook' value={data.facebook} onChange={handleChange} placeholder='Facebook (không bắt buộc)' maxLength={100} /></div>
        <div><label className='text-sm font-medium mb-1 block'>Trường học</label><Input name='school' value={data.school} onChange={handleChange} placeholder='Trường của học viên (không bắt buộc)' maxLength={200} /></div>
        <div><label className='text-sm font-medium mb-1 block'>Lớp</label><Input type='number' min='1' max='12' name='grade' value={data.grade} onChange={handleChange} placeholder='Lớp đang theo học (không bắt buộc)' /></div>
        <div><label className='text-sm font-medium mb-1 block'>Môn học *</label><Input name='subject' value={data.subject} onChange={handleChange} placeholder='Môn học mong muốn OverSee đồng hành' required minLength={2} maxLength={100} /></div>
        <div><label className='text-sm font-medium mb-1 block'>Điểm hiện tại</label><Input type='number' step='0.1' min='0' max='10' name='currentResult' value={data.currentResult} onChange={handleChange} placeholder='Điểm/kết quả môn học đó trên lớp hiện tại (không bắt buộc)' /></div>
        <div><label className='text-sm font-medium mb-1 block'>Mục tiêu</label><Input type='number' step='0.1' min='0' max='10' name='target' value={data.target} onChange={handleChange} placeholder='Mục tiêu đối với môn học đó (không bắt buộc)' /></div>
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
      <Button type='submit' className='w-full'>Gửi đơn</Button>
    </form>
  );
};

export default VNSubjectForm;
