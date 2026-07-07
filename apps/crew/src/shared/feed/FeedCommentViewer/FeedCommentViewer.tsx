import type { GetCommentListResponse } from '@api/comment/type';
import Avatar from '@common/avatar/Avatar';
import { playgroundURL } from '@constant/url';
import { Menu } from '@headlessui/react';
import { playgroundLink } from '@sopt/constant';
import { colors } from '@sopt-mds/design-tokens';
import { IconHeartFilled, IconHeartOutlined, IconMessageDotsOutlined } from '@sopt-mds/icons';
import { ReactionButton } from '@sopt-mds/ui';
import { fromNow } from '@util/dayjs';
import MenuIcon from 'public/assets/svg/ic_menu.svg';
import React, { useContext } from 'react';
import { styled } from 'stitches.config';

import { MentionContext } from '../Mention/MentionContext';

interface FeedCommentViewerProps {
  // TODO: API 응답을 바로 interface에 꽂지 말고 모델 만들어서 사용하자
  comment: GetCommentListResponse['comments'][number] | GetCommentListResponse['comments'][number]['replies'][number];
  commentParentId?: number; // 부모가 댓글이라면 commentParentId 로 부모 댓글의 Id 를 넘겨줍니다.
  isMine?: boolean;
  isPosterComment: boolean;
  Content: React.ReactNode;
  Actions: React.ReactNode[];
  onClickLike?: (commentId: number) => void;
}

export default function FeedCommentViewer({
  comment,
  commentParentId,
  isPosterComment,
  Content,
  Actions,
  onClickLike,
}: FeedCommentViewerProps) {
  const { setUser, setIsReCommentClicked, setParentComment } = useContext(MentionContext);

  const onClickReComment = () => {
    setIsReCommentClicked(true);
    //commentParentId: 본인의 부모 댓글의 id, parentComment: 본인이 부모 댓글 여부
    if (commentParentId) {
      setParentComment({
        parentComment: false,
        parentCommentId: commentParentId,
      });
    } else {
      setParentComment({ parentComment: false, parentCommentId: comment.id });
    }
    setUser({ userName: comment.user.name, userId: comment.user.orgId });
  };

  return (
    <Container>
      <CommentHeader>
        <AuthorWrapper href={`${playgroundURL}${playgroundLink.memberDetail(comment.user.orgId)}`}>
          <Avatar src={comment.user.profileImage || ''} alt={comment.user.name} sx={{ width: 28, height: 28 }} />
          <Name>
            {comment.user.name}
            {isPosterComment ? '(글쓴이)' : ''}
          </Name>
          <Date>{fromNow(comment.createdDate)}</Date>
        </AuthorWrapper>
        <Menu as='div' style={{ position: 'relative' }}>
          <Menu.Button>
            <MenuIcon />
          </Menu.Button>
          <MenuItems>
            {Actions.map((Action, index) => (
              <SMenuItemContainer key={index}>
                <Menu.Item>{Action}</Menu.Item>
              </SMenuItemContainer>
            ))}
          </MenuItems>
        </Menu>
      </CommentHeader>

      <CommentBody>
        <CommentContents>{Content}</CommentContents>
        <CommentLikeWrapper>
          <SLikeReactionButton
            size='xsmall'
            selected={comment.isLiked}
            leftAddon={
              comment.isLiked ? (
                <IconHeartFilled color={colors.fg.brand.default} width={16} height={16} />
              ) : (
                <IconHeartOutlined color={colors.fg.brand.default} width={16} height={16} />
              )
            }
            count={comment.likeCount}
            onClick={() => onClickLike && onClickLike(comment.id)}
          />
          <ReactionButton
            size='xsmall'
            leftAddon={<IconMessageDotsOutlined color={colors.fg.neutral.bold} width={16} height={16} />}
            onClick={onClickReComment}
          >
            답글 달기
          </ReactionButton>
        </CommentLikeWrapper>
      </CommentBody>
    </Container>
  );
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '8px',
  width: '100%',
});
const CommentHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
const AuthorWrapper = styled('a', {
  flexType: 'verticalCenter',
});
const Name = styled('span', {
  display: 'inline-block',
  marginLeft: '8px',
  color: '$gray100',
  fontStyle: 'T5',
});
const Date = styled('span', {
  display: 'inline-block',
  marginLeft: '4px',
  color: '$gray500',
  fontStyle: 'T6',
});
const MenuItems = styled(Menu.Items, {
  position: 'absolute',
  top: '35px', // TODO: design 체크 필요
  right: '0', // TODO: design 체크 필요
  padding: '8px',
  borderRadius: '13px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  background: '$gray800',
});
const SMenuItemContainer = styled('div', {
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'width': '80px',
  'background': '$gray800',

  '&:hover': {
    background: '$gray700',
    borderRadius: '$8',
  },

  '&:active': {
    background: '$gray600',
    borderRadius: '$8',
  },
});
const CommentBody = styled('div', {
  paddingLeft: '40px',
  paddingRight: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});
const CommentContents = styled('div', {
  color: '$gray100',
  fontStyle: 'B2',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
});
const CommentLikeWrapper = styled('div', {
  flexType: 'verticalCenter',
  gap: '12px',
});
const SLikeReactionButton = styled(ReactionButton, {
  'color': colors.fg.brand.default,
  '&[aria-pressed="true"]:not(:disabled):not([aria-disabled="true"])': {
    color: colors.fg.brand.default,
  },
});
