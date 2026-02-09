import React, { useEffect, useRef, useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import japanMapUrl from '../assets/japan.svg';
import { prefectures } from '../data/prefectures';
import './JapanMap.css';

const JapanMap = ({ onPrefectureClick, activePrefectureCode, quizTargetCode, mode, onInteractionStart }) => {
    const [svgContent, setSvgContent] = useState('');
    const svgContainerRef = useRef(null);
    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        fetch(japanMapUrl)
            .then(res => res.text())
            .then(data => {
                // SVG 로드 시 한 번만 각 도도부현에 지방(Region) 클래스 주입
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'image/svg+xml');
                const prefElements = doc.querySelectorAll('.prefecture');

                prefElements.forEach(el => {
                    const code = parseInt(el.dataset.code);
                    const prefData = prefectures.find(p => p.code === code);
                    if (prefData) {
                        const regionMap = {
                            "홋카이도": "hokkaido",
                            "도호쿠": "tohoku",
                            "간토": "kanto",
                            "주부": "chubu",
                            "긴키": "kinki",
                            "주고쿠": "chugoku",
                            "시코쿠": "shikoku",
                            "규슈": "kyushu"
                        };
                        const regionClass = regionMap[prefData.region];
                        if (regionClass) {
                            el.classList.add(`region-${regionClass}`);
                        }
                    }
                });

                setSvgContent(doc.documentElement.outerHTML);
            });
    }, []);

    const syncZOrder = (hoveredNode = null) => {
        const container = svgContainerRef.current;
        if (!container) return;

        // .prefecture 요소들이 들어있는 부모 요소를 찾습니다 (svg 혹은 직계 그룹)
        const firstPref = container.querySelector('.prefecture');
        if (!firstPref) return;
        const parent = firstPref.parentNode;

        const activeNode = activePrefectureCode
            ? parent.querySelector(`.prefecture[data-code="${activePrefectureCode}"]`)
            : null;

        // 1. 호버된 요소를 맨 뒤로 (최신 브라우저 기준 맨 위)
        if (hoveredNode && hoveredNode !== activeNode) {
            if (parent.lastElementChild !== hoveredNode) {
                parent.appendChild(hoveredNode);
            }
        }

        // 2. 활성 요소를 최종 맨 뒤로 (무조건 최상단)
        if (activeNode) {
            if (parent.lastElementChild !== activeNode) {
                parent.appendChild(activeNode);
            }
        }
    };

    useEffect(() => {
        if (!svgContainerRef.current || !svgContent) return;
        const container = svgContainerRef.current;

        const prefElements = container.querySelectorAll('.prefecture');
        prefElements.forEach(el => {
            const code = parseInt(el.dataset.code);
            el.classList.toggle('is-active', code === activePrefectureCode);

            if (mode === 'quiz') {
                el.classList.remove('is-correct-flash', 'is-wrong-flash');
            }
        });

        syncZOrder();
    }, [svgContent, activePrefectureCode, mode]);

    const handleClick = (e) => {
        const target = e.target.closest('.prefecture');
        if (target && target.dataset.code) {
            onPrefectureClick(target.dataset.code, { x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseOver = (e) => {
        const target = e.target.closest('.prefecture');
        if (target) {
            syncZOrder(target);
        }
    };

    const handleInteractionStart = () => {
        if (activePrefectureCode && onInteractionStart) {
            onInteractionStart();
        }
    };

    return (
        <div className="japan-map-container">
            <TransformWrapper
                initialScale={isMobile ? 1.8 : 1}
                minScale={0.5}
                maxScale={4}
                centerOnInit={true}
                wheel={{ step: 0.1 }}
                doubleClick={{ disabled: true }}
                panning={{ velocityDisabled: true }}
                onPanningStart={handleInteractionStart}
                onZoomingStart={handleInteractionStart}
                onWheelStart={handleInteractionStart}
            >
                <TransformComponent
                    wrapperStyle={{ width: "100%", height: "100%", overflow: "hidden" }}
                    contentStyle={{ width: "100%", height: "100%" }}
                >
                    <div
                        ref={svgContainerRef}
                        dangerouslySetInnerHTML={{ __html: svgContent }}
                        onClick={handleClick}
                        onMouseOver={handleMouseOver}
                        style={{
                            width: '100%', height: '100%',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            cursor: mode === 'quiz' ? 'crosshair' : 'grab'
                        }}
                    />
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
};

export default JapanMap;
