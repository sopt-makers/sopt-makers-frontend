import styled from '@emotion/styled';
import { playgroundLink } from '@sopt/constant';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconChevronRight } from '@sopt-makers/icons';
import { baseColor } from '@sopt-mds/design-tokens';
import Link from 'next/link';

import { useGetEntryWordchain } from '@/api/endpoint/wordchain/getWordchain';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import WordchainSkeleton from '@/components/wordchain/WordchainEntry/WordchainSkeleton';
import { useWordchainWinnersQuery } from '@/components/wordchain/WordchainWinners/hooks/useWordchainWinnersQuery';
import IconMessageChat from '@/public/icons/icon-message-chat.svg';
import { SwitchCase } from '@/utils/components/switch-case/SwitchCase';

interface WordChainEntryProps {
  className?: string;
}

const WordChainEntry = ({ className }: WordChainEntryProps) => {
  const { data, isLoading } = useGetEntryWordchain();
  const { data: wordchainWinnersData } = useWordchainWinnersQuery({ limit: 1 });
  const { logClickEvent } = useEventLogger();

  if (isLoading || !data) {
    return <WordchainSkeleton />;
  }

  const isGameStart = data.wordList.length === 0 && data.currentWinner === null;
  const status = isGameStart ? 'start' : 'progress';
  const lastWinner = wordchainWinnersData?.pages[0].winners[0];
  const lastWord = data.wordList[data.wordList.length - 1]?.word;

  return (
    <GotoWordChainWrapper
      className={className}
      href={playgroundLink.wordchain()}
      onClick={() => logClickEvent('wordchainEntry')}
    >
      <GotoWordChainContents>
        <GotoWordChainLabel>
          <CompactIcon />
          <GotoWordChainTitle>끝말잇기</GotoWordChainTitle>
        </GotoWordChainLabel>
        <SwitchCase
          value={status}
          caseBy={{
            start: lastWinner ? (
              <GotoWordChainSub>
                이번 우승자는 <LastWord>{lastWinner.winner.name}</LastWord>님 입니다! &apos;{data.nextSyllable}
                &apos;(으)로 시작하는 단어는?
              </GotoWordChainSub>
            ) : (
              <GotoWordChainSub>우승하고 명예의 전당에 올라가보세요!</GotoWordChainSub>
            ),
            progress:
              lastWord != null ? (
                <GotoWordChainSub>
                  {`${data.currentWinner?.name}`}님이 <LastWord>{data.nextSyllable}</LastWord>(으)로 끝냈어요. 끝말을
                  이어주세요!
                </GotoWordChainSub>
              ) : null,
          }}
        />
      </GotoWordChainContents>
      <StyledChevronRight />
    </GotoWordChainWrapper>
  );
};

export default WordChainEntry;

const GotoWordChainWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s;
  border-radius: 12px;
  background-color: ${baseColor.gray950};
  padding: 18px 20px;
  margin: 0 auto;
  width: 100%;
  max-width: 480px;
  cursor: pointer;

  &:hover {
    background-color: ${baseColor.gray900};
  }
`;

const GotoWordChainContents = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const GotoWordChainLabel = styled.div`
  display: flex;
  gap: 4px;
  flex-shrink: 0;
`;

const CompactIcon = styled(IconMessageChat)`
  width: 16px;
  height: 16px;
`;

const GotoWordChainTitle = styled.h1`
  color: ${colors.white};
  ${fonts.LABEL_14_SB}
`;

const GotoWordChainSub = styled.div`
  color: ${colors.gray30};
  ${fonts.BODY_14_R}

  white-space: normal;
  word-break: keep-all;
`;

const LastWord = styled.span`
  color: ${colors.yellow300};
`;

const StyledChevronRight = styled(IconChevronRight)`
  width: 20px;
  height: 20px;
  color: ${colors.white};
  flex-shrink: 0;
`;
