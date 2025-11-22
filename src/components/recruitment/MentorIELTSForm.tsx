import React, { useState } from 'react';
import { appendMentor } from '@/lib/sheets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-toastify';

const OVERSEE_PAGE_URL = 'https://www.facebook.com/oversee.org';

interface MentorIELTSData {
  phone: string; email: string; quote: string; experience: string; r: string; w: string; l: string; s: string; overall: string; englishSpec: string; englishAward: string; focusSkill: string; driveImg: string;
}

const initialData: MentorIELTSData = { phone:'', email:'', quote:'', experience:'', r:'', w:'', l:'', s:'', overall:'', englishSpec:'', englishAward:'', focusSkill:'', driveImg:'' };

const MentorIELTSForm: React.FC = () => {
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
    const res = await appendMentor('Mentor IELTS', data);
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
        <div><label className='text-sm font-medium mb-1 block'>Điểm chuyên Anh</label><Input type='number' name='englishSpec' value={data.englishSpec} onChange={handleChange} placeholder='Điểm chuyên Anh (nếu có, không bắt buộc)' /></div>
        <div><label className='text-sm font-medium mb-1 block'>Giải HSG Tiếng Anh</label><Input name='englishAward' value={data.englishAward} onChange={handleChange} placeholder='Giải HSG Tiếng Anh (nếu có, không bắt buộc)' /></div>
        <div><label className='text-sm font-medium mb-1 block'>Link ảnh</label><Input type='url' name='driveImg' value={data.driveImg} onChange={handleChange} placeholder='Link drive ảnh (không bắt buộc)' /></div>
      </div>
      <div><label className='text-sm font-medium mb-1 block'>Kinh nghiệm giảng dạy</label><Textarea name='experience' value={data.experience} onChange={handleChange} placeholder='Kinh nghiệm giảng dạy IELTS (không bắt buộc)' /></div>
      <div className='grid md:grid-cols-5 gap-3'>
        <Select value={data.r} onValueChange={(val) => handleSelectChange('r', val)}>
          <SelectTrigger><SelectValue placeholder='Reading' /></SelectTrigger>
          <SelectContent>{[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={data.w} onValueChange={(val) => handleSelectChange('w', val)}>
          <SelectTrigger><SelectValue placeholder='Writing' /></SelectTrigger>
          <SelectContent>{[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={data.l} onValueChange={(val) => handleSelectChange('l', val)}>
          <SelectTrigger><SelectValue placeholder='Listening' /></SelectTrigger>
          <SelectContent>{[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={data.s} onValueChange={(val) => handleSelectChange('s', val)}>
          <SelectTrigger><SelectValue placeholder='Speaking' /></SelectTrigger>
          <SelectContent>{[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={data.overall} onValueChange={(val) => handleSelectChange('overall', val)}>
          <SelectTrigger><SelectValue placeholder='Overall' /></SelectTrigger>
          <SelectContent>{[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div><label className='text-sm font-medium mb-1 block'>Kỹ năng muốn giảng dạy chuyên sâu</label><Textarea name='focusSkill' value={data.focusSkill} onChange={handleChange} placeholder='Bạn có mong muốn giảng dạy chuyên sâu kỹ năng IELTS nào không? (không bắt buộc)' /></div>
      <Button type='submit' className='w-full'>Gửi đơn</Button>
    </form>
  );
};

export default MentorIELTSForm;
