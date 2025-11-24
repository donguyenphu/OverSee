import React from 'react';
import { Button } from '@/components/ui/button';

const OVERSEE_PAGE_URL = 'https://www.facebook.com/oversee.org';

interface SuccessStudentProps {
  onReset: () => void;
}

const SuccessStudent: React.FC<SuccessStudentProps> = ({ onReset }) => {
  return (
    <div className='space-y-4 p-6 rounded-lg border bg-white shadow'>
      <h2 className='text-2xl font-bold text-primary'>Cảm ơn bạn!</h2>
      <p className='font-semibold'>
        Ngay bây giờ, hãy nhắn tin sau cho page OverSee:{' '}
        <span className='italic'>"Tôi đã đăng ký tư vấn"</span> để được tư vấn chi tiết hơn nhé!
      </p>
      <div className='flex flex-col gap-4'>
        <a 
          href={OVERSEE_PAGE_URL} 
          target='_blank' 
          rel='noreferrer' 
          className='text-md text-blue-600 hover:underline font-bold'
        >
          Link page OverSee
        </a>
        <Button variant='outline' onClick={onReset}>
          Gửi thêm đơn khác
        </Button>
      </div>
    </div>
  );
};

export default SuccessStudent;
