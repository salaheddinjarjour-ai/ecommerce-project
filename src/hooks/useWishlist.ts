import { useState, useEffect } from 'react';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('trendit_wishlist');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error parsing wishlist from localStorage', e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('trendit_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: number | string) => {
    const id = Number(productId);
    setWishlist((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isInWishlist = (productId: number | string) => {
    return wishlist.includes(Number(productId));
  };

  return { wishlist, toggleWishlist, isInWishlist };
}
