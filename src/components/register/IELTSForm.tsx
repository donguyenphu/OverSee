import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { appendStudent } from '@/lib/sheets';
import { toast } from 'react-toastify';

const OVERSEE_PAGE_URL = 'https://www.facebook.com/oversee.org';

interface IELTSData {
  name: string;
  phone: string;
  email: string;
  school: string;
  grade: string;
  plannedDate: string;
  reading: string;
  writing: string;
  listening: string;
  speaking: string;
  wishes: string;
  timeSlot: string;
  mockTest: string;
}

const initialData: IELTSData = {
  name: '', phone: '', email: '', school: '', grade: '', plannedDate: '',
  reading: '', writing: '', listening: '', speaking: '', wishes: '', timeSlot: '', mockTest: ''
};

const IELTSForm: React.FC = () => {
  const [data, setData] = useState<IELTSData>(initialData);
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
    const res = await appendStudent('IELTS', data);
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
        <p className='font-semibold'>Ngay bây giờ, hãy nhắn tin sau cho page OverSee: <span className='italic'>“Tôi đã đăng kí tư vấn”</span> để được tư vấn chi tiết hơn nhé!</p>
        <a href={OVERSEE_PAGE_URL} target='_blank' rel='noreferrer' className='text-sm text-blue-600 underline'>Link page OverSee</a>
        <Button variant='outline' onClick={() => { setSubmitted(false); setData(initialData); }}>Gửi thêm đơn khác</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 p-6 rounded-lg border bg-white shadow'>
      {submitError && <p className='text-sm text-red-600'>{submitError}</p>}
      <div className='bg-primary/10 border border-primary rounded-md p-4 text-sm font-semibold text-primary'>Điền form đăng kí tư vấn ngay để nhận được một lượt thi thử miễn phí, chấm chữa chi tiết 4 kỹ năng IELTS cùng OverSee!</div>
      <div className='grid md:grid-cols-2 gap-4'>
        <div><label className='text-sm font-medium mb-1 block'>Họ và tên *</label><Input name='name' value={data.name} onChange={handleChange} placeholder='Họ và tên' required /></div>
        <div><label className='text-sm font-medium mb-1 block'>Số điện thoại *</label><Input type='tel' name='phone' value={data.phone} onChange={handleChange} placeholder='Số điện thoại' required /></div>
        <div><label className='text-sm font-medium mb-1 block'>Email *</label><Input type='email' name='email' value={data.email} onChange={handleChange} placeholder='Email' required /></div>
        <div><label className='text-sm font-medium mb-1 block'>Trường học</label><Input name='school' value={data.school} onChange={handleChange} placeholder='Trường của học viên (không bắt buộc)' /></div>
        <div><label className='text-sm font-medium mb-1 block'>Lớp</label><Input type='number' min='1' max='12' name='grade' value={data.grade} onChange={handleChange} placeholder='Lớp đang theo học (không bắt buộc)' /></div>
        <div><label className='text-sm font-medium mb-1 block'>Lịch thi dự kiến</label><Input type='date' name='plannedDate' value={data.plannedDate} onChange={handleChange} placeholder='Lịch thi IELTS dự kiến (không bắt buộc)' /></div>
      </div>
      <div className='grid md:grid-cols-4 gap-4'>
        <div><label className='text-sm font-medium mb-1 block'>Reading</label><Select value={data.reading} onValueChange={(val) => handleSelectChange('reading', val)}>
          <SelectTrigger><SelectValue placeholder='Reading (không bắt buộc)' /></SelectTrigger>
          <SelectContent>{[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select></div>
        <div><label className='text-sm font-medium mb-1 block'>Writing</label><Select value={data.writing} onValueChange={(val) => handleSelectChange('writing', val)}>
          <SelectTrigger><SelectValue placeholder='Writing (không bắt buộc)' /></SelectTrigger>
          <SelectContent>{[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select></div>
        <div><label className='text-sm font-medium mb-1 block'>Listening</label><Select value={data.listening} onValueChange={(val) => handleSelectChange('listening', val)}>
          <SelectTrigger><SelectValue placeholder='Listening (không bắt buộc)' /></SelectTrigger>
          <SelectContent>{[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select></div>
        <div><label className='text-sm font-medium mb-1 block'>Speaking</label><Select value={data.speaking} onValueChange={(val) => handleSelectChange('speaking', val)}>
          <SelectTrigger><SelectValue placeholder='Speaking (không bắt buộc)' /></SelectTrigger>
          <SelectContent>{[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map(s => <SelectItem key={s} value={s.toString()}>{s}</SelectItem>)}</SelectContent>
        </Select></div>
      </div>
      <div><label className='text-sm font-medium mb-1 block'>Nguyện vọng thêm</label><Textarea name='wishes' value={data.wishes} onChange={handleChange} placeholder='Chia sẻ nguyện vọng thêm từ học sinh/phụ huynh (không bắt buộc)' /></div>
      <div className='space-y-2'>
        <p className='text-sm font-medium'>Khung thời gian học sinh tiện trao đổi:</p>
        <div className='flex gap-4 flex-wrap'>
          {['9-12 AM','12-5 PM','5-9 PM'].map(slot => (
            <label key={slot} className='flex items-center gap-2 text-sm'>
              <input type='radio' name='timeSlot' value={slot} checked={data.timeSlot===slot} onChange={handleChange} required /> {slot}
            </label>
          ))}
        </div>
      </div>
      <div className='space-y-2'>
        <p className='text-sm font-medium'>Bạn có muốn thi thử IELTS online cùng OverSee?</p>
        <div className='flex gap-6'>
          {['Có','Không'].map(val => (
            <label key={val} className='flex items-center gap-2 text-sm'>
              <input type='radio' name='mockTest' value={val} checked={data.mockTest===val} onChange={handleChange} required /> {val}
            </label>
          ))}
        </div>
      </div>
      <Button type='submit' className='w-full'>Gửi đơn</Button>
    </form>
  );
};

export default IELTSForm;
