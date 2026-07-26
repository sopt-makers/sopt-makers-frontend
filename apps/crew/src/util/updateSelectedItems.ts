interface UpdateSelectedItemsParams<T> {
  selectedItems: T[];
  targetItem: T;
  isSelected: boolean;
  maxSelectionCount: number;
}

/**
 * 대상 항목의 선택 여부를 선택된 항목 목록에 반영합니다.
 *
 * `isSelected`가 `true`이면 대상 항목을 목록에 추가하고,
 * `false`이면 대상 항목을 목록에서 제거합니다.
 * 항목을 추가할 때 최대 선택 개수에 도달했다면 목록을 변경하지 않고 `undefined`를 반환합니다.
 * 원본 목록은 직접 변경하지 않습니다.
 */
export const updateSelectedItems = <T>({
  selectedItems,
  targetItem,
  isSelected,
  maxSelectionCount,
}: UpdateSelectedItemsParams<T>): T[] | undefined => {
  if (!isSelected) {
    return selectedItems.filter((selectedItem) => selectedItem !== targetItem);
  }

  if (selectedItems.length >= maxSelectionCount) {
    return undefined;
  }

  return [...selectedItems, targetItem];
};
