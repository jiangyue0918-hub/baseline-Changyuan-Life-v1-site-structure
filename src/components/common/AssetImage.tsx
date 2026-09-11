/**
 * 智能资产图片组件 (支持本地无图优雅降级)
 * 遵循《长垣人寿官网_施工规范_v2.1》第十节
 * 
 * 机制：
 * 1. 优先尝试加载本地真实路径 (/assets/changyuan-life/...)。
 * 2. 若文件暂未放置或加载失败，自动无感降级为高保真 SVG/CSS 几何纹理底纹 + 素材名与推荐尺寸提示。
 * 3. 绝对不显示破损图框，保证视觉完整与未来低成本无缝替换。
 */

import React, { useState } from 'react';
import { getAsset } from '../../content/assets';
import { Image as ImageIcon } from 'lucide-react';

interface AssetImageProps {
  assetId: string;
  className?: string;
  aspectRatio?: string;
  overlay?: React.ReactNode;
}

export const AssetImage: React.FC<AssetImageProps> = ({
  assetId,
  className = '',
  aspectRatio = 'aspect-video',
  overlay,
}) => {
  const asset = getAsset(assetId);
  const [hasError, setHasError] = useState(false);

  // 如果加载失败或状态为占位模式，呈现高品质本地降级卡片
  if (hasError || asset.status === 'placeholder') {
    return (
      <div
        className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#EAF1FB] via-[#F4F8FC] to-[#DCE7F6] border border-[#D9E4F2] flex flex-col items-center justify-center p-6 text-center ${aspectRatio} ${className}`}
        aria-label={asset.alt}
      >
        {/* 背景轻微几何网格纹理 */}
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#123B70 1.2px, transparent 1.2px), radial-gradient(#123B70 1.2px, #F4F8FC 1.2px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px'
          }}
        />

        {/* 占位视觉内容 */}
        <div className="relative z-10 flex flex-col items-center max-w-md px-4">
          <div className="w-12 h-12 rounded-full bg-white/80 border border-[#D9E4F2] shadow-sm flex items-center justify-center text-[#1C5FB8] mb-3">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-semibold text-[#0B1733] mb-1">
            {asset.usage}
          </h4>
          <p className="text-xs text-[#60718A] line-clamp-2 mb-3">
            {asset.alt}
          </p>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/90 border border-[#D9E4F2] text-[11px] font-mono text-[#123B70]">
            <span>推荐尺寸:</span>
            <span className="font-semibold">{asset.recommendedSize}</span>
          </div>
        </div>

        {overlay && <div className="absolute inset-0 z-20">{overlay}</div>}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl ${aspectRatio} ${className}`}>
      <img
        src={asset.src}
        alt={asset.alt}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {overlay && <div className="absolute inset-0 z-10">{overlay}</div>}
    </div>
  );
};
