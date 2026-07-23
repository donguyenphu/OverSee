import { ReadingSection } from '@/data/tests/test-1/readingContent';
import { SkillAnswers } from '@/data/tests/test-1/answerKeys';

export interface ListeningContent {
  part1: string;
  part2: string;
  part3: string;
  part4: string;
}

export interface WritingContent {
  task1: string;
  task2: string;
  task1Image?: string;
}

export interface IELTSTestDatabase {
  listening: ListeningContent;
  reading: ReadingSection[];
  writing: WritingContent;
  answerKey: {
    listening: SkillAnswers;
    reading: SkillAnswers;
  };
}
