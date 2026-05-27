import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import HorizontalScroller from '@/components/common/HorizontalScroller';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import {
  CategoryLink,
  SubcategoryLink,
  useCategoryParam,
  useSubcategoryParam,
} from '@/components/feed/common/queryParam';
import IconHot from '@/public/icons/icon_fire.svg';
import { textStyles } from '@/styles/typography';

type TagType = {
  code: string;
  name: string;
};

interface CategorySelectProps {
  categories: {
    code: string;
    name: string;
    hasAllCategory: boolean;
    tags: TagType[];
  }[];
  onCategoryChange: (categoryCode: string) => void;
}

type QueryParams = Record<string, string | string[] | undefined>;

const clearSubcategoryQuery = (query: QueryParams) => {
  const { subcategory: _subcategory, ...rest } = query;
  return rest;
};

const selectFirstTagQuery = (firstTagCode: string) => (query: QueryParams) => ({
  ...query,
  subcategory: firstTagCode,
});

const CategorySelect = ({ categories, onCategoryChange }: CategorySelectProps) => {
  const [currentCategoryCode] = useCategoryParam({ defaultValue: '' });
  const [currentSubcategoryCode] = useSubcategoryParam();

  const parentCategory = categories.find((category) => category.code === currentCategoryCode) ?? null;
  const effectiveSubcategoryCode = currentSubcategoryCode ?? parentCategory?.tags[0]?.code;

  return (
    <Container>
      <HorizontalScroller>
        <CategoryBox>
          <LoggingClick eventKey='feedListCategoryFilter' param={{ category: 'HOT' }}>
            <Category
              categoryId={undefined}
              transformQuery={clearSubcategoryQuery}
              active={currentCategoryCode === ''}
              onClick={() => onCategoryChange('')}
            >
              {currentCategoryCode === '' && <IconHot />}
              HOT
            </Category>
          </LoggingClick>
          {categories.map((category) => (
            <LoggingClick key={category.code} eventKey='feedListCategoryFilter' param={{ category: category.name }}>
              <Category
                categoryId={category.code}
                transformQuery={
                  category.tags.length > 0 ? selectFirstTagQuery(category.tags[0].code) : clearSubcategoryQuery
                }
                active={parentCategory?.code === category.code}
                onClick={() => onCategoryChange(category.code)}
              >
                {category.name}
              </Category>
            </LoggingClick>
          ))}
        </CategoryBox>
      </HorizontalScroller>
      {parentCategory && parentCategory.tags.length > 0 && (
        <HorizontalScroller css={{ marginBottom: '12px' }}>
          <TagBox>
            {parentCategory.tags.map((tag) => (
              <LoggingClick
                key={tag.code}
                eventKey='feedListCategoryFilter'
                param={{ category: `${parentCategory.name}_${tag.name}` }}
              >
                <TagChip
                  subcategoryId={tag.code}
                  active={tag.code === effectiveSubcategoryCode}
                  onClick={() => onCategoryChange(tag.code)}
                >
                  {tag.name}
                </TagChip>
              </LoggingClick>
            ))}
          </TagBox>
        </HorizontalScroller>
      )}
    </Container>
  );
};

export default CategorySelect;

export const Container = styled.div`
  border-bottom: 1px solid ${colors.gray800};
`;

export const CategoryBox = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 16px 8px;
`;

export const Category = styled(CategoryLink)<{ active: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  gap: 2px;
  align-items: center;
  border-bottom: ${(props) => (props.active ? `2px solid ${colors.gray30}` : '2px solid transparent')};
  padding-bottom: 6px;
  ${fonts.HEADING_16_B};

  line-height: 24px;
  letter-spacing: -0.16px;
  color: ${(props) => (props.active ? colors.gray10 : colors.gray500)};

  &:hover {
    transition: 0.2s;
    color: ${(props) => !props.active && colors.gray400};
  }
`;

const TagBox = styled.div`
  display: flex;
  gap: 6px;
  padding: 8px 16px 0;
`;

const Chip = styled(CategoryLink)<{ active: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? colors.gray10 : colors.gray800)};
  padding: 7px 14px;
  color: ${(props) => (props.active ? colors.gray950 : colors.gray50)};

  ${textStyles.SUIT_13_M}

  &:hover {
    transition: 0.2s;
    background-color: ${(props) => !props.active && colors.gray700};
  }
`;

const TagChip = styled(SubcategoryLink)<{ active: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? colors.gray10 : colors.gray800)};
  padding: 7px 14px;
  color: ${(props) => (props.active ? colors.gray950 : colors.gray50)};

  ${textStyles.SUIT_13_M}

  &:hover {
    transition: 0.2s;
    background-color: ${(props) => !props.active && colors.gray700};
  }
`;
