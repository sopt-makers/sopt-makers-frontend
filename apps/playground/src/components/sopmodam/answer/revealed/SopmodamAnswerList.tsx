import type { SopmodamAnswer } from '@/api/endpoint/sopmodam/getSopmodamAnswers';
import SopmodamAnswerCard from '@/components/sopmodam/answer/revealed/SopmodamAnswerCard';
import SopmodamAnswerCardSkeleton from '@/components/sopmodam/answer/revealed/SopmodamAnswerCardSkeleton';

const SKELETON_COUNT = 3;

interface SopmodamAnswerListProps {
  isLoading: boolean;
  answers?: SopmodamAnswer[];
}

const SopmodamAnswerList = ({ isLoading, answers }: SopmodamAnswerListProps) => {
  if (isLoading) {
    return (
      <>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <SopmodamAnswerCardSkeleton key={index} />
        ))}
      </>
    );
  }

  if (!answers) return null;

  return (
    <>
      {answers.map((answer) => (
        <SopmodamAnswerCard key={answer.answerId} answer={answer} />
      ))}
    </>
  );
};

export default SopmodamAnswerList;
