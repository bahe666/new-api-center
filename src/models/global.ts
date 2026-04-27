import { useState } from 'react';

export default function useGlobalModel() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  return { searchOpen, setSearchOpen, guideOpen, setGuideOpen };
}
