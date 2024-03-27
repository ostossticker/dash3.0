"use client"
import React, { useEffect, useState, ReactElement, ReactNode } from 'react';

interface ElementProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface ResponsiveElementProps {
  children: ReactElement<ElementProps>;
  width: number | 'auto' | 'full';
  height: number | 'auto' | 'full';
  fontSize?: number;
  padding?:number;
  py?:number;
  px?:number;
  leading?:number;
  className?: string;
  style?: React.CSSProperties;
}

const ResponsiveElement: React.FC<ResponsiveElementProps> = ({ children ,leading, padding , py , px, width, height, fontSize, className, style }) => {
  const [elementSize, setElementSize] = useState<{ width: number | 'auto' | '100%'; height: number | 'auto' | '100%' }>({
    width: 'auto',
    height: 'auto'
  });

  useEffect(() => {
    const handleResize = () => {
      const newWidth = width === 'full' ? '100%' : width === 'auto' ? 'auto' :   Math.max(100, width * (window.innerWidth / 1540));
      const newHeight = height === 'full' ? '100%' : height === 'auto' ? 'auto' : Math.max(100, height * (window.innerHeight / 1050));
      setElementSize({ width: newWidth, height: newHeight });
    };

    

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height]);

  const Element = children.type;
  const elementProps = children.props;

  const adjustedFontSize = fontSize ? `${Math.max(1, fontSize * (window.innerWidth / 1210))}px` : undefined;
  const adjustedPadding = padding ? `${Math.max(1,padding * (window.innerWidth * window.innerHeight / 40))}px` : undefined;
  const adjustedPy = py ? `${Math.max(1 , py * (window.innerWidth / 1080))}px` : undefined;
  const adjustedPx = px ? `${Math.max(1, px * (window.innerHeight / 1080))}px` : undefined 
  const adjustLead = leading ? `${Math.max(1 , leading * (window.innerWidth / 2300))}px` : undefined;
  const elementStyle: React.CSSProperties = {
    ...elementProps.style,
    fontSize: adjustedFontSize,
    padding:adjustedPadding,
    paddingRight:adjustedPx,
    paddingLeft:adjustedPx,
    paddingTop:adjustedPy,
    paddingBottom:adjustedPy,
    lineHeight:adjustLead,
    ...style
  };

  return (
    <Element {...elementProps} className={className} style={{ ...elementStyle, width : elementSize.width, height: elementSize.height }}>
      {children.props.children}
    </Element>
  );
};

export default ResponsiveElement;
