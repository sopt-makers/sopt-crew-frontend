const PropertyQueryKey = {
  all: () => ['property'] as const,
  detail: (key?: string) => [...PropertyQueryKey.all(), key] as const,
} as const;

export default PropertyQueryKey;
