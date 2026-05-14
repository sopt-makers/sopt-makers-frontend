const BannerQueryKey = {
  all: () => ['banner'] as const,
  list: (location: string) => [...BannerQueryKey.all(), location] as const,
};

export default BannerQueryKey;
