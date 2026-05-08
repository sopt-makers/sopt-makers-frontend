import { useEventBannerInfoQueryOption } from '@api/advertisement/query';
import { useUserProfileQueryOption } from '@api/user/query';
import { useDisplay } from '@hook/useDisplay';
import { Flex } from '@shared/util/layout/Flex';
import { fontsObject } from '@sopt-makers/fonts';
import { IconChevronRight } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';

const EventPeriodBanner = () => {
  const { isLaptop, isMobile } = useDisplay();
  const router = useRouter();

  const { data: banner } = useSuspenseQuery(useEventBannerInfoQueryOption());
  const { data: me } = useSuspenseQuery(useUserProfileQueryOption());

  const handleClickApplyButton = () => {
    ampli.clickEventbannerMainCta({
      event_id: banner.advertisementId,
      platform_type: isMobile ? 'MO' : 'PC',
      user_id: me.orgId,
    });
    ampli.enterEventMaindetail();

    router.push(String(banner.bannerLink2));
  };

  const handleClickMoreLink = () => {
    ampli.clickEventbannerSubCta({
      location: router.pathname === '/' ? 'group/home' : 'group/list',
      event_id: banner.advertisementId,
      platform_type: isMobile ? 'MO' : 'PC',
      user_id: me.orgId,
    });
  };

  useEffect(() => {
    if (banner.isDisplay === false) return;

    ampli.impressionBanner({
      banner_id: banner.advertisementId,
      banner_url: banner.bannerLink2 ?? undefined,
    });
  }, [banner.advertisementId, banner.bannerLink2, banner.isDisplay]);

  if (banner.isDisplay === false) {
    return null;
  }

  return (
    <Container
      css={{
        'backgroundImage': `url(${banner.desktopImageUrl})`,
        '@mobile': {
          backgroundImage: `url(${banner.mobileImageUrl})`,
        },
      }}
    >
      <InfoSection>
        <DateImage src={banner.calendarImageUrl} alt='날짜' />
        <Flex align='center' justify='center' direction='column'>
          <TitleWrapper>
            <STitle>{banner.title?.prefix} </STitle>
            <SHighlightTitle>{banner.title?.highlight} </SHighlightTitle>
            <STitle>{banner.title?.suffix}</STitle>
          </TitleWrapper>
          <SSubTitle>{banner.subTitle}</SSubTitle>
        </Flex>
      </InfoSection>
      <CTASection>
        <ApplyButton size={isLaptop ? 'lg' : 'md'} variant='fill' onClick={handleClickApplyButton}>
          내 파트 신청하기
        </ApplyButton>
        {banner.eventType === 'SOPKATHON' && banner.bannerLink1 && (
          <MoreLink href={banner.bannerLink1} onClick={handleClickMoreLink}>
            <MoreLinkContent>
              파트별 솝커톤 둘러보기
              <SRightArrowIcon />
            </MoreLinkContent>
            <SLinkUnderLine />
          </MoreLink>
        )}
      </CTASection>
    </Container>
  );
};

export default EventPeriodBanner;

const Container = styled('section', {
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'center',
  'width': '100%',
  'backgroundPosition': 'center',
  'backgroundRepeat': 'no-repeat',
  'backgroundSize': 'cover',
  'borderRadius': '$8',
  '@mobile': {
    py: '$28',
  },
  '@tablet': {
    py: '$30',
  },
  '@desktop': {
    py: '$30',
  },
  '@large_desktop': {
    py: '$36',
  },
});

const InfoSection = styled('header', {
  'display': 'flex',
  'alignItems': 'center',
  '@mobile': {
    flexDirection: 'column',
    gap: '$16',
    mb: '$18',
  },
  '@tablet': {
    flexDirection: 'row',
    gap: '$24',
    mb: '$32',
  },
  '@desktop': {
    flexDirection: 'row',
    gap: '$24',
    mb: '$32',
  },
  '@large_desktop': {
    flexDirection: 'row',
    gap: '$24',
    mb: '$32',
  },
});

const DateImage = styled('img', {
  '@mobile': {
    width: '63px',
    height: '65px',
  },
  '@tablet': {
    width: '56px',
    height: '58px',
  },
  '@desktop': {
    width: '56px',
    height: '58px',
  },
  '@large_desktop': {
    width: '70px',
    height: '71px',
  },
});

const TitleWrapper = styled('h2', {
  display: 'flex',
  whiteSpace: 'pre-wrap',
});

const STitle = styled('span', {
  'color': '$white',
  '@mobile': {
    ...fontsObject.HEADING_6_18_B,
  },
  '@tablet': {
    ...fontsObject.HEADING_4_24_B,
  },
  '@desktop': {
    ...fontsObject.HEADING_4_24_B,
  },
  '@large_desktop': {
    ...fontsObject.HEADING_3_28_B,
  },
});

const SHighlightTitle = styled(STitle, {
  color: '$secondary',
});

const SSubTitle = styled('p', {
  'color': '$gray100',
  '@mobile': {
    ...fontsObject.BODY_4_13_M,
  },
  '@tablet': {
    ...fontsObject.TITLE_6_16_SB,
  },
  '@desktop': {
    ...fontsObject.TITLE_6_16_SB,
  },
  '@large_desktop': {
    ...fontsObject.TITLE_5_18_SB,
  },
});

const CTASection = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'center',
  '@mobile': {
    gap: '$8',
  },
  '@tablet': {
    gap: '$10',
  },
  '@desktop': {
    gap: '$10',
  },
  '@large_desktop': {
    gap: '$10',
  },
});

const ApplyButton = styled(Button, {
  '&&': {
    backgroundColor: '$secondary',
    color: '$white',
    boxShadow: 'none',
  },
  '&&:hover': {
    backgroundColor: '$secondary',
    color: '$white',
    boxShadow: 'none',
  },
  '&&:active': {
    backgroundColor: '$secondary',
    color: '$white',
    boxShadow: 'none',
  },
  '@mobile': {},
  '@tablet': {},
  '@desktop': {},
  '@large_desktop': {},
});

const MoreLink = styled(Link, {
  'color': '$gray100',
  'display': 'inline-flex',
  'flexDirection': 'column',
  'alignItems': 'center',

  '@mobile': {
    ...fontsObject.BODY_4_13_M,
  },
  '@tablet': {
    ...fontsObject.BODY_4_13_M,
  },
  '@desktop': {
    ...fontsObject.BODY_4_13_M,
  },
  '@large_desktop': { ...fontsObject.BODY_3_14_M },
});

const MoreLinkContent = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
});

const SRightArrowIcon = styled(IconChevronRight, {
  color: '$gray100',
  width: '16px',
  height: '16px',
});

const SLinkUnderLine = styled('span', {
  width: '100%',
  borderBottom: '0.8px solid $gray100',
});
