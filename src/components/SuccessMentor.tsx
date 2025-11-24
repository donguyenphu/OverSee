import React from 'react';
import { Button } from '@/components/ui/button';

const OVERSEE_PAGE_URL = 'https://www.facebook.com/oversee.org';

interface SuccessMentorProps {
  onReset: () => void;
}

const SuccessMentor: React.FC<SuccessMentorProps> = ({ onReset }) => {
  return (
    <div className='space-y-4 p-6 rounded-lg border bg-white shadow'>
      <h2 className='text-2xl font-bold text-primary'>Cảm ơn bạn!</h2>
      <p className='font-semibold'>
        Hãy nhắn cho page OverSee tin nhắn:{' '}
        <span className='italic'>"tôi đã đăng ký tuyển dụng"</span>. Khi có đợt tuyển dụng, OverSee sẽ liên hệ lại với bạn.
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
          Gửi đơn khác
        </Button>
      </div>
    </div>
  );
};

export default SuccessMentor;
