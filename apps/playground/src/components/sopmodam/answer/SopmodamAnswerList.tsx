import { useGetSopmodamAnswers } from '@/api/endpoint/sopmodam/getSopmodamAnswers';
import SopmodamAnswerCard from '@/components/sopmodam/answer/SopmodamAnswerCard';

interface SopmodamAnswerListProps {
  roundId: number;
}

const SopmodamAnswerList = ({ roundId }: SopmodamAnswerListProps) => {
  const { data } = useGetSopmodamAnswers(roundId);

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
