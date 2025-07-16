'use client';

import styles from './ModVisual.module.css';
import {
  MOD_SHAPE_SPRITES_5DOT,
  MOD_SHAPE_SPRITES_6DOT,
  MOD_SET_SPRITES,
  SET_ICON_LAYOUT_CONFIG
} from '@/lib/mod-constants';

interface ModVisualProps {
  shapeType: string | null;
  setType: string | null;
  modTierName: string | null;
  is6Dot: boolean;
}

const SHAPE_ATLAS_URL = '/images/charactermods_datacard_atlas.png';
const SET_ATLAS_URL = '/images/misc_atlas.png';

export default function ModVisual({ shapeType, setType, modTierName, is6Dot }: ModVisualProps) {
  const shapeSpriteData = is6Dot ? MOD_SHAPE_SPRITES_6DOT : MOD_SHAPE_SPRITES_5DOT;

  if (!shapeType || !shapeSpriteData[shapeType]) {
    return <div className={styles.modShapePlaceholder}><span className={styles.fallbackText}>?</span></div>;
  }

  const mainShapeCoords = shapeSpriteData[shapeType]?.Main;
  const innerShapeCoords = shapeSpriteData[shapeType]?.Inner;
  const layers = [];

  const tintClassName = modTierName ? styles[`tint${modTierName}`] : '';

  // Layer 1: Main Shape (No tint)
  if (mainShapeCoords) {
    const leftOffset = (80 - mainShapeCoords.w) / 2;
    const topOffset = (80 - mainShapeCoords.h) / 2;
    layers.push(
      <div
        key="main-shape"
        className={styles.modShapeLayer}
        style={{
          width: `${mainShapeCoords.w}px`, height: `${mainShapeCoords.h}px`,
          backgroundImage: `url(${SHAPE_ATLAS_URL})`,
          backgroundPosition: `-${mainShapeCoords.x}px -${mainShapeCoords.y}px`,
          left: `${leftOffset}px`, top: `${topOffset}px`,
        }}
      />
    );
  }

  // Layer 2: Inner Shape (Tinted)
  if (innerShapeCoords) {
    const leftOffset = (80 - innerShapeCoords.w) / 2;
    const topOffset = (80 - innerShapeCoords.h) / 2;
    layers.push(
      <div
        key="inner-shape"
        className={`${styles.modShapeLayer} ${tintClassName}`}
        style={{
          width: `${innerShapeCoords.w}px`, height: `${innerShapeCoords.h}px`,
          backgroundImage: `url(${SHAPE_ATLAS_URL})`,
          backgroundPosition: `-${innerShapeCoords.x}px -${innerShapeCoords.y}px`,
          left: `${leftOffset}px`, top: `${topOffset}px`,
        }}
      />
    );
  }

  // Layer 3: Set Icon (Tinted)
  const setIconAtlasCoords = setType ? MOD_SET_SPRITES[setType] : null;
  const setIconLayout = (shapeType && setType) ? SET_ICON_LAYOUT_CONFIG[shapeType]?.[setType] : null;

  if (setIconAtlasCoords && setIconLayout) {
    const { size: targetSize, offsetX, offsetY } = setIconLayout;
    const { w: originalW, h: originalH, x: spriteX, y: spriteY } = setIconAtlasCoords;
    const scaleX = targetSize / originalW;
    const scaleY = targetSize / originalH;

    layers.push(
      <div
        key="set-icon-container"
        className={`${styles.modShapeSetIconContainer} ${tintClassName}`}
        style={{
          width: `${targetSize}px`, height: `${targetSize}px`,
          left: `${offsetX}px`, top: `${offsetY}px`,
        }}
      >
        <img
          src={SET_ATLAS_URL}
          alt={`${setType || ''} set icon`}
          style={{
            transform: `scale(${scaleX}, ${scaleY})`,
            transformOrigin: '0 0',
            position: 'absolute',
            left: `-${spriteX * scaleX}px`,
            top: `-${spriteY * scaleY}px`,
          }}
        />
      </div>
    );
  } else if (setType) {
    layers.push(<div key="set-text-fallback" className={styles.fallbackText}>{setType}</div>);
  }

  return <div className={styles.modShapePlaceholder}>{layers}</div>;
}