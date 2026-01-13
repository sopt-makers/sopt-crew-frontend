const MapQueryKey = {
  searchSubway: (query: string) => ['map', 'searchSubway', query] as const,
};

export default MapQueryKey;
