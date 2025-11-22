import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import IELTSForm from './register/IELTSForm';
import SATForm from './register/SATForm';
import VNSubjectForm from './register/VNSubjectForm';

const tabs = [
  { key: 'ielts', label: 'IELTS' },
  { key: 'sat', label: 'SAT' },
  { key: 'vn', label: 'Chương trình Việt Nam' }
];

const RegisterSwitcher: React.FC = () => {
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
      {active === 'ielts' && <IELTSForm />}
      {active === 'sat' && <SATForm />}
      {active === 'vn' && <VNSubjectForm />}
    </div>
  );
};

export default RegisterSwitcher;
