import React, { useEffect, useRef, useState } from 'react';

const MapPopup = ({ prefecture, position, onClose }) => {
    const popupRef = useRef(null);
    // Calculate layout synchronously to avoid flicker/missing render
    const getLayout = () => {
        if (!position) return null;

        const screenWidth = window.innerWidth;
        const isMobile = screenWidth < 768;
        const cardWidth = isMobile ? Math.min(280, screenWidth - 40) : 320;
        const cardHeight = 350; // 여유 있게 잡음
        const margin = 10;

        const distanceX = isMobile ? 20 : 60;
        const distanceY = isMobile ? 40 : 80;

        let left = position.x + distanceX;
        let top = position.y - distanceY - (cardHeight / 2);

        let isLeftPlacement = false;

        // Right boundary check
        if (left + cardWidth > screenWidth - margin) {
            left = position.x - distanceX - cardWidth;
            isLeftPlacement = true;
        }

        // Left boundary check (if it now goes off-screen to the left)
        if (left < margin) {
            // If neither side fits perfectly, just clamp to screen with some margin
            // prioritize keeping it on screen over strict side placement
            left = Math.max(margin, Math.min(left, window.innerWidth - cardWidth - margin));
        }

        // Vertical boundary check
        if (top < margin) top = margin;
        if (top + cardHeight > window.innerHeight - margin) {
            top = window.innerHeight - cardHeight - margin;
        }

        return { top, left, isLeftPlacement, cardWidth };
    };

    const layout = getLayout();

    if (!prefecture || !position || !layout) return null;

    const lineStart = { x: position.x, y: position.y };

    // Anchor point calculation
    const cardAnchorY = layout.top + 100;
    const cardAnchorX = layout.isLeftPlacement ? layout.left + layout.cardWidth : layout.left;

    const lineEnd = { x: cardAnchorX, y: cardAnchorY };

    // SVG를 위한 전체 화면 오버레이 영역 계산 (선을 그리기 위함)
    // 실제로는 App 차원에서 그려야 완벽하지만, 여기서는 fixed 포지션으로 처리

    return (
        <>
            {/* 연결선 (SVG Layer) */}
            <svg style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 999
            }}>
                <defs>
                    <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* 점 (클릭 위치) */}
                <circle cx={lineStart.x} cy={lineStart.y} r="4" fill="var(--color-accent)" filter="url(#glow-line)" />

                {/* 선 */}
                <path
                    d={`M ${lineStart.x} ${lineStart.y} 
              C ${lineStart.x} ${lineStart.y}, 
                ${(lineStart.x + lineEnd.x) / 2} ${(lineStart.y + lineEnd.y) / 2}, 
                ${lineEnd.x} ${lineEnd.y}`}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="0, 5"
                    fill="none"
                    opacity="0.6"
                />

                {/* 점 (카드 연결 부위) */}
                <circle cx={lineEnd.x} cy={lineEnd.y} r="3" fill="var(--color-text-primary)" opacity="0.8" />
            </svg>

            {/* 팝업 카드 */}
            <div
                ref={popupRef}
                className="glass-panel"
                style={{
                    position: 'fixed',
                    top: layout.top,
                    left: layout.left,
                    width: '320px',
                    maxWidth: '90vw',
                    padding: '1.5rem',
                    zIndex: 1000,
                    animation: 'popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transformOrigin: layout.isLeftPlacement ? 'center right' : 'center left'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <h2 className="title" style={{ fontSize: '1.8rem', lineHeight: 1 }}>{prefecture.name_ko}</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.5rem' }}>✕</button>
                </div>

                <div style={{ display: 'grid', gap: '0.8rem' }}>
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{prefecture.name_kanji}</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{prefecture.name_kana}</span>
                        </div>
                    </div>

                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--color-accent)', marginBottom: '0.4rem' }}>
                            📍 {prefecture.landmark}
                        </div>
                        <p className="description-text" style={{ fontSize: '0.85rem', marginTop: 0, textAlign: 'left', lineHeight: '1.6' }}>
                            {prefecture.description.replace(/\n/g, ' ')}
                        </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>지방 (Region)</span>
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{prefecture.region}</span>
                    </div>
                </div>

                <style>{`
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
            </div>
        </>
    );
};

export default MapPopup;
