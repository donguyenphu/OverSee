import { readingAnswers, listeningAnswers } from '@/data/tests/test-1/answerKeys';
import { IELTSTestDatabase } from '@/data/tests/types';
import { listeningQuestions } from '@/components/test/test-2/Listening';
import { readingSections } from './reading';

const copySkillAnswers = (skillAnswers: typeof listeningAnswers) => ({
	sections: skillAnswers.sections.map(section => ({
		...section,
		questions: section.questions.map(question => ({
			...question,
			answers: [...question.answers]
		}))
	}))
});

export const testTwoDatabase: IELTSTestDatabase = {
	listening: {
		part1: 'Homestay application and personal details for a student named Yuichini.',
		part2: 'Information and advice about visas, travel documents and currency in Enzinia.',
		part3: 'An interview about shopping habits and the products people find difficult to buy.',
		part4: 'A lecture about time management, planners and student study habits.'
	},
	reading: readingSections,
	writing: {
		task1: 'The diagram below shows how ethanol fuel is produced from corn. Summarise the information by selecting and reporting the main features and make comparisons where relevant. You should write at least 150 words.',
		task2: 'Some people think that physical strength is important for success in sport, while other people think that mental strength is more important. Discuss both views and give your own opinion. You should write at least 250 words.'
	},
	answerKey: {
		listening: copySkillAnswers(listeningAnswers),
		reading: copySkillAnswers(readingAnswers)
	}
};

export { listeningQuestions };
