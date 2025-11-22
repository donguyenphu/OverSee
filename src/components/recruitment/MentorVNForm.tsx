import React, { useState } from 'react';
import { appendMentor } from '@/lib/sheets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-toastify';

const OVERSEE_PAGE_URL = 'https://www.facebook.com/oversee.org';

interface MentorVNData {
  phone: string; email: string; quote: string; subject: string; experience: string; professionalScore: string; award: string; driveImg: string;
}

const initialData: MentorVNData = { phone:'', email:'', quote:'', subject:'', experience:'', professionalScore:'', award:'', driveImg:'' };

const MentorVNForm: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; setData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    setSubmitError(null);
    const res = await appendMentor('Mentor VN', data);
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
    return (
      <div className='space-y-4 p-6 rounded-lg border bg-white shadow'>
        <h2 className='text-2xl font-bold text-primary'>Cảm ơn bạn!</h2>
        <p className='font-semibold'>Hãy nhắn cho page OverSee tin nhắn: <span className='italic'>“tôi đã đăng ký tuyển dụng”</span>. Khi có đợt tuyển dụng, OverSee sẽ liên hệ lại với bạn.</p>
        <a href={OVERSEE_PAGE_URL} target='_blank' rel='noreferrer' className='text-sm text-blue-600 underline'>Link page OverSee</a>
        <Button variant='outline' onClick={() => { setSubmitted(false); setData(initialData); }}>Gửi đơn khác</Button>
        {submitError && <p className='text-sm text-red-600'>{submitError}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 p-6 rounded-lg border bg-white shadow'>
      {submitError && <p className='text-sm text-red-600'>{submitError}</p>}
      <div className='grid md:grid-cols-2 gap-4'>
        <div><label className='text-sm font-medium mb-1 block'>Số điện thoại *</label><Input type='tel' name='phone' value={data.phone} onChange={handleChange} placeholder='Số điện thoại' required /></div>
        <div><label className='text-sm font-medium mb-1 block'>Email *</label><Input type='email' name='email' value={data.email} onChange={handleChange} placeholder='Email' required /></div>
        <div><label className='text-sm font-medium mb-1 block'>Châm ngôn</label><Input name='quote' value={data.quote} onChange={handleChange} placeholder='Châm ngôn yêu thích (không bắt buộc)' /></div>
        <div><label className='text-sm font-medium mb-1 block'>Môn giảng dạy *</label><Input name='subject' value={data.subject} onChange={handleChange} placeholder='Môn giảng dạy' required /></div>
        <div><label className='text-sm font-medium mb-1 block'>Điểm thi chuyên môn</label><Input type='number' name='professionalScore' value={data.professionalScore} onChange={handleChange} placeholder='Điểm thi Chuyên môn giảng dạy (nếu có, không bắt buộc)' /></div>
        <div><label className='text-sm font-medium mb-1 block'>Giải HSG</label><Input name='award' value={data.award} onChange={handleChange} placeholder='Giải HSG môn giảng dạy (nếu có, không bắt buộc)' /></div>
        <div><label className='text-sm font-medium mb-1 block'>Link ảnh</label><Input type='url' name='driveImg' value={data.driveImg} onChange={handleChange} placeholder='Link drive ảnh (không bắt buộc)' /></div>
      </div>
      <div><label className='text-sm font-medium mb-1 block'>Kinh nghiệm giảng dạy</label><Textarea name='experience' value={data.experience} onChange={handleChange} placeholder='Kinh nghiệm giảng dạy (không bắt buộc, có thể ghi "Chưa có")' /></div>
      <Button type='submit' className='w-full'>Gửi đơn</Button>
    </form>
  );
};

export default MentorVNForm;
