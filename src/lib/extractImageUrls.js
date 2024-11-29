'use client';

export function extractImageUrls(content) {
  if (typeof window === 'undefined' || !content) return [];
  
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = content;
  const images = tempDiv.getElementsByTagName("img");
  return Array.from(images).map(img => img.src);
}
