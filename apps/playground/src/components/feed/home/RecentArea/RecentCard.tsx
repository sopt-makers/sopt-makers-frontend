import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useRouter } from 'next/router';

import type { RecentPosts } from '@/api/endpoint/feed/getRecentPosts';
import Text from '@/components/common/Text';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { parseMentionsToJSX } from '@/components/feed/common/utils/parseMention';
import FeedIcon from '@/components/feed/home/RecentArea/FeedIcon';
import VoteIcon from '@/public/icons/icon-vote.svg';

interface RecentCardProps {
  recentPost: RecentPosts;
  onClick: () => void;
}

const RecentCard = ({ recentPost, onClick }: RecentCardProps) => {
  const { id, title, content, createdAt, likeCount, commentCount, categoryTagLabel, totalVoteCount } = recentPost;
  const isVotePost = totalVoteCount !== null;
  const router = useRouter();

  return (
    <LoggingClick
      eventKey='feedCard'
      param={{
        feedId: String(id),
        category: categoryTagLabel,
        referral: 'category_HOT',
      }}
    >
      <CardContainer onClick={onClick}>
        <CardContent>
          <TitleStyle>
            <Tag>{categoryTagLabel}</Tag>
            {title}
          </TitleStyle>
          <ContentStyle>{parseMentionsToJSX(content, router)}</ContentStyle>
        </CardContent>

        <CardFooter>
          <FlexBox>
            <CreatedDate>{createdAt}</CreatedDate>
            {isVotePost && (
              <>
                <LineStyle />
                <FlexStyle>
                  <VoteIcon />
                  <CreatedDate>{totalVoteCount ?? 0}</CreatedDate>
                </FlexStyle>
              </>
            )}
          </FlexBox>

          <FeedIconBox>
            <FeedIcon type='heart' count={likeCount} />
            <FeedIcon type='message' count={commentCount} />
          </FeedIconBox>
        </CardFooter>
      </CardContainer>
    </LoggingClick>
  );
};

export default RecentCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  background-color: ${colors.gray900};
  cursor: pointer;
  padding: 16px;
  height: 100%;

  &:hover {
    background-color: ${colors.gray800};
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 240px;
  width: 100%;
`;

const TitleStyle = styled(Text)`
  ${fonts.TITLE_16_SB}

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ContentStyle = styled(Text)`
  ${fonts.BODY_14_L}

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.gray400};
`;

const FeedIconBox = styled.div`
  display: flex;
  gap: 8px;
`;

const CreatedDate = styled(Text)`
  color: ${colors.gray400};
  ${fonts.LABEL_14_SB}
`;

const Tag = styled.span`
  display: inline-flex;
  width: fit-content;
  height: 20px;
  border-radius: 4px;
  background-color: ${colors.orangeAlpha200};
  color: ${colors.secondary};
  ${fonts.LABEL_11_SB}
  padding: 3px 6px;
  margin-right: 6px;
  transform: translateY(-1.5px);
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const LineStyle = styled.div`
  width: 1px;
  height: 12px;
  background-color: ${colors.gray600};
`;

const FlexStyle = styled.div`
  display: flex;
  gap: 4px;
`;
