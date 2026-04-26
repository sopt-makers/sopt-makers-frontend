import { Flex } from '@shared/util/layout/Flex';
import { fontsObject } from '@sopt-makers/fonts';
import { Button } from '@sopt-makers/ui';
import { styled } from 'stitches.config';

import type { EventPeriodBannerData } from './type';

interface EventPeriodBannerProps {
  banner: EventPeriodBannerData;
}

const EventPeriodBanner = ({ banner }: EventPeriodBannerProps) => {
  return (
    <Container
      css={{
        backgroundImage: `url(${banner.backgroundImageUrl})`,
      }}
    >
      <InfoSection>
        <DateImage src={banner.dateImageUrl} alt='날짜 이미지' />
        <Flex align='center' justify='center' direction='column'>
          <TitleWrapper>
            <STitle>{banner.title.prefix}</STitle>
            <SHighlightTitle>{banner.title.highlight}</SHighlightTitle>
            <STitle>{banner.title.suffix}</STitle>
          </TitleWrapper>
          <SSubTitle>{banner.subTitle}</SSubTitle>
        </Flex>
      </InfoSection>
      <CTASection>
        <ApplyButton variant='fill'>{banner.applyButtronText}</ApplyButton>
        <KeywordLink>{banner.keywordLinkText}</KeywordLink>
      </CTASection>
    </Container>
  );
};

export default EventPeriodBanner;

const Container = styled('div', {
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'center',
  'width': '100%',
  'backgroundPosition': 'center',
  'backgroundRepeat': 'no-repeat',
  'backgroundSize': 'cover',
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

const InfoSection = styled('div', {
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
const TitleWrapper = styled('div', {
  display: 'flex',
  whiteSpace: 'pre-wrap',
});

const STitle = styled('p', {
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
  'color': '$secondary',
  '@new_mobile': {},
  '@new_tablet': {},
  '@new_desktop': {},
  '@new_laptop': {},
});

const KeywordLink = styled('a', {
  'color': '$gray100',
  'textDecoration': 'underline',
  'textDecorationColor': '$gray100',
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
