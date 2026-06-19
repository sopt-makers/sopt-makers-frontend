import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import CategoryHeader from '@/components/feed/upload/Category/CategoryHeader';
import CategorySelector from '@/components/feed/upload/Category/CategorySelector';
import TagSelector from '@/components/feed/upload/Category/TagSelector';
import { useCategorySelect } from '@/components/feed/upload/hooks/useCategorySelect';
import type { FeedDataType } from '@/components/feed/upload/types';

interface CateogryProps {
  feedData: FeedDataType;
  onSaveCategory: (categoryCode: string) => void;
  isEdit?: boolean;
}

export default function Category({ feedData, onSaveCategory, isEdit }: CateogryProps) {
  const { isSelectorOpen, closeAll, openCategory, openTag } = useCategorySelect(isEdit ? 'closeAll' : 'openCategory');

  const { data: categories } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  const handleSaveParentCategory = (categoryCode: string) => {
    const selectedMainCategory = categories?.find((category) => category.code === categoryCode);

    if (selectedMainCategory == null) {
      return;
    }

    if (selectedMainCategory.children.length === 0) {
      onSaveCategory(selectedMainCategory.code);
      closeAll();
      return;
    }

    onSaveCategory(`${selectedMainCategory.code}_${selectedMainCategory.children[0].code}`);
    openTag();
  };

  const handleCloseTag = () => {
    closeAll();
  };

  return (
    <>
      <CategorySelector
        isOpen={isSelectorOpen === 'openCategory'}
        onClose={closeAll}
        onSelect={handleSaveParentCategory}
        feedData={feedData}
      />
      <TagSelector
        isOpen={isSelectorOpen === 'openTag'}
        onClose={handleCloseTag}
        onSave={onSaveCategory}
        feedData={feedData}
      />
      <CategoryHeader
        feedData={feedData}
        openCategory={openCategory}
        openTag={openTag}
        isSelectorOpen={isSelectorOpen}
      />
    </>
  );
}
