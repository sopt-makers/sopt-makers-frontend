import { useEventBannerInfoQueryOption } from '@api/advertisement/query';
import { useDisplay } from '@hook/useDisplay';
import { Flex } from '@shared/util/layout/Flex';
import { fontsObject } from '@sopt-makers/fonts';
import { IconChevronRight } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';
import { useUserProfileQueryOption } from '@/api/user/query';

const EventPeriodBanner = () => {
  const { isNewLaptop, isNewMobile } = useDisplay();
  const router = useRouter();

  const { data: banner } = useSuspenseQuery(useEventBannerInfoQueryOption());
  const { data: me } = useQuery(useUserProfileQueryOption());
  const backgroundImageUrl = isNewMobile ? banner.mobileImageUrl : banner.desktopImageUrl;

  const handleClickApplyButton = () => {
    ampli.clickBanner({
      banner_id: banner.advertisementId,
      banner_url: banner.bannerLink1,
      user_id: Number(me?.orgId),
    });

    router.push(String(banner.bannerLink1));
  };

  const handleClickMoreLink = () => {
    ampli.clickBanner({
      banner_id: banner.advertisementId,
      banner_url: banner.bannerLink2 ?? undefined,
      user_id: Number(me?.orgId),
    });
  };

  useEffect(() => {
    if (banner.isDisplay === false) return;

    ampli.impressionBanner({
      banner_id: banner.advertisementId,
      banner_url: banner.bannerLink1,
    });
  }, [banner.advertisementId, banner.bannerLink1, banner.isDisplay]);

  if (banner.isDisplay === false) {
    return null;
  }

  return (
    <Container
      css={{
        backgroundImage: `url(${backgroundImageUrl})`,
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
        <ApplyButton size={isNewLaptop ? 'lg' : 'md'} variant='fill' onClick={handleClickApplyButton}>
          내 파트 신청하기
        </ApplyButton>
        {banner.eventType === 'SOPKATHON' && banner.bannerLink2 && (
          <MoreLink href={banner.bannerLink2} onClick={handleClickMoreLink}>
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
  '@new_mobile': {
    py: '$28',
  },
  '@new_tablet': {
    py: '$30',
  },
  '@new_desktop': {
    py: '$30',
  },
  '@new_laptop': {
    py: '$36',
  },
});

const InfoSection = styled('header', {
  'display': 'flex',
  'alignItems': 'center',
  '@new_mobile': {
    flexDirection: 'column',
    gap: '$16',
    mb: '$18',
  },
  '@new_tablet': {
    flexDirection: 'row',
    gap: '$24',
    mb: '$32',
  },
  '@new_desktop': {
    flexDirection: 'row',
    gap: '$24',
    mb: '$32',
  },
  '@new_laptop': {
    flexDirection: 'row',
    gap: '$24',
    mb: '$32',
  },
});

const DateImage = styled('img', {
  '@new_mobile': {
    width: '63px',
    height: '65px',
  },
  '@new_tablet': {
    width: '56px',
    height: '58px',
  },
  '@new_desktop': {
    width: '56px',
    height: '58px',
  },
  '@new_laptop': {
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
  '@new_mobile': {
    ...fontsObject.HEADING_6_18_B,
  },
  '@new_tablet': {
    ...fontsObject.HEADING_4_24_B,
  },
  '@new_desktop': {
    ...fontsObject.HEADING_4_24_B,
  },
  '@new_laptop': {
    ...fontsObject.HEADING_3_28_B,
  },
});

const SHighlightTitle = styled(STitle, {
  color: '$secondary',
});

const SSubTitle = styled('p', {
  'color': '$gray100',
  '@new_mobile': {
    ...fontsObject.BODY_4_13_M,
  },
  '@new_tablet': {
    ...fontsObject.TITLE_6_16_SB,
  },
  '@new_desktop': {
    ...fontsObject.TITLE_6_16_SB,
  },
  '@new_laptop': {
    ...fontsObject.TITLE_5_18_SB,
  },
});

const CTASection = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'center',
  '@new_mobile': {
    gap: '$8',
  },
  '@new_tablet': {
    gap: '$10',
  },
  '@new_desktop': {
    gap: '$10',
  },
  '@new_laptop': {
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
  '@new_mobile': {},
  '@new_tablet': {},
  '@new_desktop': {},
  '@new_laptop': {},
});

const MoreLink = styled(Link, {
  'color': '$gray100',
  'display': 'inline-flex',
  'flexDirection': 'column',
  'alignItems': 'center',

  '@new_mobile': {
    ...fontsObject.BODY_4_13_M,
  },
  '@new_tablet': {
    ...fontsObject.BODY_4_13_M,
  },
  '@new_desktop': {
    ...fontsObject.BODY_4_13_M,
  },
  '@new_laptop': { ...fontsObject.BODY_3_14_M },
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
