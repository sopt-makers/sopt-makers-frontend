import { useGetSopmodamAnswers } from '@/api/endpoint/sopmodam/getSopmodamAnswers';
import SopmodamAnswerCard from '@/components/sopmodam/answer/SopmodamAnswerCard';
import SopmodamAnswerCardSkeleton from '@/components/sopmodam/answer/SopmodamAnswerCardSkeleton';

const SKELETON_COUNT = 3;

interface SopmodamAnswerListProps {
  roundId: number;
}

const SopmodamAnswerList = ({ roundId }: SopmodamAnswerListProps) => {
  const { data, isLoading } = useGetSopmodamAnswers(roundId);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <SopmodamAnswerCardSkeleton key={index} />
        ))}
      </>
    );
  }

  if (!data) return null;

  return (
    <>
      {data.answers.map((answer) => (
        <SopmodamAnswerCard key={answer.answerId} answer={answer} />
      ))}
    </>
  );
};

export default SopmodamAnswerList;
