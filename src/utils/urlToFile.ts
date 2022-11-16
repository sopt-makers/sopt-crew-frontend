const urlToFile = async (imageUrl: string, name?: string) => {
  const blob = await (await fetch(imageUrl)).blob();
  const file = new File(
    [blob],
    name ?? `image-${Math.floor(Math.random() * 1000)}.jpg`,
    {}
  );
  return file;
};

export default urlToFile;
