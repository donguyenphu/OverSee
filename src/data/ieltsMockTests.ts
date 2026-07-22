import { listeningAnswers, readingAnswers, SkillAnswers } from '@/data/answerKeys';
import { readingSections, ReadingSection } from '@/data/readingContent';
import { listeningTranscripts } from '@/data/listeningTranscripts';

export interface IELTSMockTest {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  content: {
    listening: typeof listeningTranscripts;
    reading: ReadingSection[];
    writing: { task1: string; task2: string };
  };
  answerKey: {
    listening: SkillAnswers;
    reading: SkillAnswers;
  };
  sheets: {
    allowedEmailsEnv: 'VITE_ABLE_TO_TEST_SHEET_ID' | 'VITE_ABLE_TO_TEST_2_SHEET_ID';
    testedEmailsEnv: 'VITE_MOCK_TESTED_SHEET_ID' | 'VITE_MOCK_TESTED_2_SHEET_ID';
    resultsEnv: 'VITE_MOCK_TESTED_SHEET_ID' | 'VITE_MOCK_TESTED_2_SHEET_ID';
  };
}

const currentTestContent = {
  listening: listeningTranscripts,
  reading: readingSections,
  writing: {
    task1: 'The graph shows the average Japanese monthly salary and television prices from 1953 to 1973.',
    task2: 'Some people benefit from modern communication technology, but some have not been helped at all. Do you agree or disagree?'
  }
};

const testOne: IELTSMockTest = {
  id: 'ielts-mock-1',
  title: 'IELTS Mock Test 1',
  description: 'Đề thi mô phỏng IELTS Academic, gồm Listening, Reading và Writing.',
  audioUrl: 'https://media.intergreat.com/Audio/RAT/1/Practice%20Test%206.mp3',
  content: currentTestContent,
  answerKey: { listening: listeningAnswers, reading: readingAnswers },
  sheets: {
    allowedEmailsEnv: 'VITE_ABLE_TO_TEST_SHEET_ID',
    testedEmailsEnv: 'VITE_MOCK_TESTED_SHEET_ID',
    resultsEnv: 'VITE_MOCK_TESTED_SHEET_ID'
  }
};

// Duplicate this record when adding a new test, then replace its content and answer key.
const testTwo: IELTSMockTest = {
  ...testOne,
  id: 'ielts-mock-2',
  title: 'IELTS Mock Test 2',
  description: 'Đề thi mô phỏng IELTS Academic số 2.',
  sheets: {
    allowedEmailsEnv: 'VITE_ABLE_TO_TEST_2_SHEET_ID',
    testedEmailsEnv: 'VITE_MOCK_TESTED_2_SHEET_ID',
    resultsEnv: 'VITE_MOCK_TESTED_2_SHEET_ID'
  }
};

export const ieltsMockTests: IELTSMockTest[] = [testOne, testTwo];

export const getIELTSMockTest = (testId: string): IELTSMockTest | undefined =>
  ieltsMockTests.find(test => test.id === testId);
