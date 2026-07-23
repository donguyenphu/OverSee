import { listeningAnswers, readingAnswers } from '@/data/tests/test-1/answerKeys';
import { listeningQuestions } from '@/components/test/test-1/Listening';
import { readingSections } from '@/data/tests/test-1/readingContent';
import { IELTSTestDatabase } from '@/data/tests/types';

export const testOneDatabase: IELTSTestDatabase = {
  listening: listeningQuestions,
  reading: readingSections,
  writing: {
    task1: 'The graph shows the average Japanese monthly salary and television prices from 1953 to 1973.',
    task2: 'Some people benefit from modern communication technology, but some have not been helped at all. Do you agree or disagree?'
  },
  answerKey: {
    listening: listeningAnswers,
    reading: readingAnswers
  }
};
