import React from 'react';
import { prefectures } from '../data/prefectures';

const InfoCard = ({ selectedPrefecture, mode, onClose }) => {
    if (!selectedPrefecture) {
        return (
            <div className="glass-panel" style={{
                padding: '3rem 1.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                marginTop: '2rem'
            }}>
                <div style={{ fontSize: '3.5rem', filter: 'drop-shadow(0 0 10px var(--color-accent-glow))' }}>🗺️</div>
                <div>
                    <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>지도를 탐색해보세요</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                        {mode === 'learn'
                            ? '지도의 도도부현을 클릭하면\n상세 정보가 여기에 표시됩니다.'
                            : '제시된 지역을 지도에서 찾아\n정답을 맞춰보세요!'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-panel" style={{
            width: '100%',
            padding: '1.5rem',
            animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            marginTop: '2rem'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h2 className="title" style={{ fontSize: '2rem', lineHeight: 1 }}>{selectedPrefecture.name_ko}</h2>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>한자 / 요미가나</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedPrefecture.name_kanji}</div>
                        <div style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>{selectedPrefecture.name_kana}</div>
                    </div>
                </div>

                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem' }}>대표 명소</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: '500', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
                        📍 {selectedPrefecture.landmark}
                    </div>
                    <p className="description-text">
                        {selectedPrefecture.description}
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>지방 (Region)</span>
                    <span style={{ fontWeight: '600' }}>{selectedPrefecture.region}</span>
                </div>
            </div>

            <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default InfoCard;
