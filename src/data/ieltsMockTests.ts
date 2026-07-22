import { SkillAnswers } from '@/data/answerKeys';
import { ReadingSection } from '@/data/readingContent';
import { testOneDatabase } from '@/data/tests/test-1';
import { testTwoDatabase } from '@/data/tests/test-2';

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

const testOne: IELTSMockTest = {
  id: 'ielts-mock-1',
  title: 'IELTS Mock Test 1',
  description: 'Đề thi mô phỏng IELTS Academic, gồm Listening, Reading và Writing.',
  audioUrl: 'https://media.intergreat.com/Audio/RAT/1/Practice%20Test%206.mp3',
  content: testOneDatabase,
  answerKey: testOneDatabase.answerKey,
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
  content: testTwoDatabase,
  answerKey: testTwoDatabase.answerKey,
  sheets: {
    allowedEmailsEnv: 'VITE_ABLE_TO_TEST_2_SHEET_ID',
    testedEmailsEnv: 'VITE_MOCK_TESTED_2_SHEET_ID',
    resultsEnv: 'VITE_MOCK_TESTED_2_SHEET_ID'
  }
};

export const ieltsMockTests: IELTSMockTest[] = [testOne, testTwo];

export const getIELTSMockTest = (testId: string): IELTSMockTest | undefined =>
  ieltsMockTests.find(test => test.id === testId);
