import styled from '@emotion/styled';
import { colors, radius, spacing, typography } from '@sopt-mds/design-tokens';
import { ActionButton } from '@sopt-mds/ui';

import Responsive from '@/components/common/Responsive';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const SopmodamNotifyCard = () => {
  return (
    <SContainer>
      <STextGroup>
        <STitle>OB라면, 다음 질문에 경험을 나눠주세요.</STitle>
        <SDescription>새 솝모담 질문이 열리면 알려드릴게요.</SDescription>
      </STextGroup>
      <Responsive only='desktop'>
        <LoggingClick eventKey='sopmodamSubscribeButton'>
          <ActionButton size='large' variant='primary'>
            다음 솝모담 소식 받기
          </ActionButton>
        </LoggingClick>
      </Responsive>
      <Responsive only='mobile'>
        <LoggingClick eventKey='sopmodamSubscribeButton'>
          <SActionButton size='small' variant='primary'>
            다음 솝모담 소식 받기
          </SActionButton>
        </LoggingClick>
      </Responsive>
    </SContainer>
  );
};

export default SopmodamNotifyCard;

const SContainer = styled.article`
  display: flex;
  justify-content: space-between;
  padding: ${spacing.s32} ${spacing.s40};
  margin-top: ${spacing.s24};
  border-radius: ${radius.r20};
  background-color: ${colors.bg.layer.default};

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    justify-content: normal;
    gap: ${spacing.s16};
    padding: ${spacing.s24} ${spacing.s20};
    margin-top: ${spacing.s16};
    border-radius: 18px;
  }
`;

const STextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.s4};

  @media ${MOBILE_MEDIA_QUERY} {
    gap: ${spacing.s6};
  }
`;

const STitle = styled.p`
  color: ${colors.fg.neutral.bold};
  ${typography.title4}

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.title5}
  }
`;

const SDescription = styled.p`
  color: ${colors.fg.neutral.subtle};
  ${typography.body1}

  @media ${MOBILE_MEDIA_QUERY} {
    ${typography.body2}
  }
`;

const SActionButton = styled(ActionButton)`
  width: 100%;
`;
