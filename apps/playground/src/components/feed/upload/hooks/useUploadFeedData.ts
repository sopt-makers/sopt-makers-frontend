import { useState } from 'react';

import useCategory from '@/components/feed/common/hooks/useCategory';
import type { MeetingInfo } from '@/components/feed/upload/select/types';
import type { PostedFeedDataType } from '@/components/feed/upload/types';

export default function useUploadFeedData(defaultValue: PostedFeedDataType) {
  const [feedData, setFeedData] = useState(defaultValue);
  const { findParentCategory } = useCategory();

  const resetIsBlindWriter = (categoryCode: string) => {
    const parentCategory = findParentCategory(categoryCode);

    if (!parentCategory?.hasBlind) {
      setFeedData((feedData) => ({ ...feedData, isBlindWriter: false }));
    }
  };

  const handleSaveCategory = (categoryCode: string) => {
    const parentCategory = findParentCategory(categoryCode);
    const isSopticle = categoryCode.startsWith('SOPTICLE');
    const hasBlind = parentCategory?.hasBlind ?? false;
    const isPrevSopticle = !isSopticle && feedData.content === 'content' && feedData.title === '';

    setFeedData((feedData) => ({
      ...feedData,
      categoryCode,
      ...(isSopticle ? { content: 'content', title: '' } : isPrevSopticle && { content: '' }),
      isBlindWriter: isSopticle ? false : hasBlind ? true : feedData.isBlindWriter,
    }));
  };

  const handleSaveIsBlindWriter = (isBlindWriter: boolean) => {
    setFeedData((feedData) => ({ ...feedData, isBlindWriter: isBlindWriter }));
  };

  const handleSaveTitle = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const title = e.target.value.replace(/\n/g, '');

    setFeedData((feedData) => ({ ...feedData, title: title }));
  };

  const handleSaveContent = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedData((feedData) => ({ ...feedData, content: e.target.value }));
  };

  const handleSaveSopticleUrl = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedData((feedData) => ({ ...feedData, link: e.target.value }));
  };

  const saveImageUrls = (urls: string[]) => {
    setFeedData((feedData) => ({
      ...feedData,
      images: [...feedData.images, ...urls],
    }));
  };

  const removeImage = (index: number) => {
    const removeImages = feedData.images.filter((_, idx) => idx !== index);
    setFeedData((feedData) => ({ ...feedData, images: removeImages }));
  };

  const checkReadyToUpload = () => {
    if (!feedData.categoryCode) return false;

    const isSopticle = feedData.categoryCode.startsWith('SOPTICLE');

    if (isSopticle) {
      return !!feedData.link?.trim();
    }

    return !!(feedData.title.trim() && feedData.content.trim());
  };

  const resetFeedData = () => {
    setFeedData(defaultValue);
  };

  const handleSaveVote = (options: string[], isMultiple: boolean) => {
    const filtered = options.map((o) => o.trim()).filter(Boolean);
    if (filtered.length < 2) return;

    setFeedData((prev) => ({
      ...prev,
      vote: {
        isMultiple,
        voteOptions: filtered,
      },
    }));
  };

  const resetVote = () => {
    setFeedData((prev) => ({
      ...prev,
      vote: null,
    }));
  };

  const handleGroupClick = (options: MeetingInfo) => {
    setFeedData((prev) => ({
      ...prev,
      groupId: options.id,
    }));
  };

  return {
    feedData,
    handleSaveCategory,
    handleSaveIsBlindWriter,
    saveImageUrls,
    removeImage,
    handleSaveTitle,
    handleSaveContent,
    resetFeedData,
    checkReadyToUpload,
    findParentCategory,
    handleSaveSopticleUrl,
    handleSaveVote,
    handleGroupClick,
    resetVote,
  };
}
