import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import CardHeader from '@/components/mySoptReport/ReportCard/CardHeader';
import pgCoffeeCard from '@/public/icons/img/mySoptReport/card_coffeechat_type.png';
import pgExsoptCard from '@/public/icons/img/mySoptReport/card_exsopt_type.png';
import pgNewCard from '@/public/icons/img/mySoptReport/card_new_type.png';
import pgTypeCard from '@/public/icons/img/mySoptReport/card_pg_type.png';
import pgSopkedinCard from '@/public/icons/img/mySoptReport/card_sokedin_type.png';
import pgSopgosuCard from '@/public/icons/img/mySoptReport/card_sopgosu_type.png';
import pgSopmanchuCard from '@/public/icons/img/mySoptReport/card_sopmanchu_type.png';
import imgCoffeechat from '@/public/icons/img/mySoptReport/img_coffeechat@3x.png';
import imgCommunity from '@/public/icons/img/mySoptReport/img_community@3x.png';
import imgGroup from '@/public/icons/img/mySoptReport/img_group@3x.png';
import imgMember from '@/public/icons/img/mySoptReport/img_member@3x.png';
import imgNew from '@/public/icons/img/mySoptReport/img_new@3x.png';
import imgProject from '@/public/icons/img/mySoptReport/img_project@3x.png';
import imgWordchain from '@/public/icons/img/mySoptReport/img_wordchain@3x.png';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const cardData = {
  '새로 오솝군요!': {
    title: '새로 오솝군요!',
    description: '2025년에는 더 자주 만나요 :)',
    img: imgNew,
    downloadImg: pgNewCard,
  },
  '솝플루언서': {
    title: '솝플루언서',
    description: '소통 DNA가 넘쳐 흐르시는군요!',
    img: imgCommunity,
    downloadImg: pgTypeCard,
  },
  '인간 솝크드인': {
    title: '인간 솝크드인',
    description: '궁금한 멤버가 많으셨군요!🔍',
    img: imgMember,
    downloadImg: pgSopkedinCard,
  },
  '서비스 익솝플로러': {
    title: '서비스 익솝플로러',
    description: '프로젝트를 자주 탐색하셨네요!',
    img: imgProject,
    downloadImg: pgExsoptCard,
  },
  '우리말 솝고수': {
    title: '우리말 솝고수',
    description: '혹시 끝말잇기 학원에 다니셨나요?',
    img: imgWordchain,
    downloadImg: pgSopgosuCard,
  },
  '얼죽솝': {
    title: '얼죽솝',
    description: '솝트와의 커피챗에 진심이시네요!',
    img: imgCoffeechat,
    downloadImg: pgCoffeeCard,
  },
  '솝만추': {
    title: '솝만추',
    description: '당신이 바로 모임 프로참석러?!',
    img: imgGroup,
    downloadImg: pgSopmanchuCard,
  },
};

interface MyTypeCardProps {
  myType: keyof typeof cardData;
}

const index = ({ myType }: MyTypeCardProps) => {
  const card = cardData[myType];

  return (
    <Wrapper>
      <CardHeader title='나의 활동 유형은?' image={card.downloadImg} />
      <Title>{card.title}</Title>
      <Description>{card.description}</Description>
      <TypeImg src={card.img.src} />
    </Wrapper>
  );
};

export default index;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  background-color: ${colors.gray10};
  padding: 28.8px;
  width: 100%;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 10px;
    padding: 24px;
  }
`;

const Title = styled.h2`
  margin-top: 32px;
  ${fonts.HEADING_28_B};

  color: ${colors.blue400};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 28px;
    ${fonts.HEADING_24_B};
  }
`;

const Description = styled.p`
  margin-top: 2px;
  ${fonts.BODY_16_M};

  color: ${colors.gray600};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_13_M};
  }
`;

const TypeImg = styled.img`
  margin-top: 14px;
`;
