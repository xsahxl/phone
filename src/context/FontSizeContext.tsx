import React, { createContext, useContext, useState, useCallback } from 'react';
import { FontScale } from '../theme';

interface FontSizeContextType {
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  scaleLabels: Record<FontScale, string>;
}

const scaleLabels: Record<FontScale, string> = {
  normal: '标准',
  large: '大号',
  xlarge: '超大',
};

const FontSizeContext = createContext<FontSizeContextType>({
  fontScale: 'normal',
  setFontScale: () => {},
  scaleLabels,
});

export const FontSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontScale, setFontScale] = useState<FontScale>('normal');

  return (
    <FontSizeContext.Provider value={{ fontScale, setFontScale, scaleLabels }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => useContext(FontSizeContext);

export default FontSizeContext;
