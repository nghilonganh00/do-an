export function getImageSrc(input?: string | File | null): string {
  if (!input) return "";

  if (input instanceof File) {
    return URL.createObjectURL(input);
  }

  return input;
}
