import type { GetOpenedMeetingsResponse } from '@api/meetingDemand/type';
import type { GetMeetingDemandCommentsResponse } from '@api/meetingDemandComment/type';
import { fromNow } from '@util/dayjs';

import type { MeetingDemandCommentData, MeetingDemandParentCommentData, OpenedMeetingData } from './types';

type RawOpenedMeeting = GetOpenedMeetingsResponse['meetings'][number];
type RawComment = GetMeetingDemandCommentsResponse['comments'][number];
type RawReply = RawComment['replies'][number];

/** 개설 모임 API 응답을 카드 UI가 쓰는 필드명(meetingId→id, profileImage→profileImageUrl)으로 맞춘다 */
export const toOpenedMeetingData = (meeting: RawOpenedMeeting): OpenedMeetingData => ({
  id: meeting.meetingId,
  imageUrl: meeting.imageUrl,
  title: meeting.title,
  category: meeting.category,
  author: {
    id: meeting.user.id,
    name: meeting.user.name,
    profileImageUrl: meeting.user.profileImage,
  },
});

/** writer가 없는(탈퇴 등) 경우를 대비해 author를 옵셔널로 두고, 작성 시각은 상대 시간 문자열로 변환한다 */
const toCommentAuthor = (writer: RawComment['writer']) =>
  writer && {
    nickname: writer.anonymousNickname ?? '',
    imageUrl: writer.anonymousImageUrl,
  };

const toCommentBase = (comment: RawComment | RawReply): MeetingDemandCommentData => ({
  id: comment.id,
  author: toCommentAuthor(comment.writer),
  isMine: comment.isMine,
  createdAt: fromNow(comment.createdDate),
  content: comment.contents,
  likeCount: comment.likeCount,
  isLiked: comment.isLiked,
  isBlocked: comment.isBlockedComment,
});

/** 댓글(부모)과 대댓글은 응답 구조가 같아서 toCommentBase를 공유하고, 대댓글 목록만 얹어서 반환한다 */
export const toCommentData = (comment: RawComment): MeetingDemandParentCommentData => ({
  ...toCommentBase(comment),
  replies: comment.replies.map(toCommentBase),
});
