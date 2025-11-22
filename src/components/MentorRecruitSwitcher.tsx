import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import MentorIELTSForm from './recruitment/MentorIELTSForm';
import MentorSATForm from './recruitment/MentorSATForm';
import MentorVNForm from './recruitment/MentorVNForm';

const tabs = [
  { key: 'ielts', label: 'Mentor IELTS' },
  { key: 'sat', label: 'Mentor SAT' },
  { key: 'vn', label: 'Mentor Chương trình Việt Nam' }
];

const MentorRecruitSwitcher: React.FC = () => {
  const [active, setActive] = useState('ielts');

  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap gap-3'>
        {tabs.map(t => (
          <Button
            key={t.key}
            type='button'
            variant={active === t.key ? 'default' : 'outline'}
            onClick={() => setActive(t.key)}
            className='font-semibold'
          >
            {t.label}
          </Button>
        ))}
      </div>
      {active === 'ielts' && <MentorIELTSForm />}
      {active === 'sat' && <MentorSATForm />}
      {active === 'vn' && <MentorVNForm />}
    </div>
  );
};

export default MentorRecruitSwitcher;
