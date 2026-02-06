import React, { useEffect, useRef, useState } from 'react';
import japanMapUrl from '../assets/japan.svg';
import './JapanMap.css';

const JapanMap = ({ onPrefectureClick, activePrefectureCode, quizTargetCode, mode }) => {
    const [svgContent, setSvgContent] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        fetch(japanMapUrl)
            .then(res => res.text())
            .then(data => {
                // Simple cleanup if necessary, but the provided SVG seems clean enough
                // We ensure the SVG has 100% width/height in CSS, so attributes here might be overridden
                setSvgContent(data);
            })
            .catch(err => console.error("Failed to load map:", err));
    }, []);

    useEffect(() => {
        if (!containerRef.current || !svgContent) return;

        const prefectures = containerRef.current.querySelectorAll('.prefecture');
        prefectures.forEach(el => {
            const code = parseInt(el.dataset.code);

            // Reset classes
            // We manually manage 'is-active' instead of React state for performance/simplicity with innerHTML
            if (activePrefectureCode === code) {
                el.classList.add('is-active');
                // Bring to front (SVG painting order)
                el.parentNode.appendChild(el);
            } else {
                el.classList.remove('is-active');
            }
        });
    }, [activePrefectureCode, svgContent]);

    const handleClick = (e) => {
        // Traverse up to find the group with data-code
        const target = e.target.closest('.prefecture');
        if (target && target.dataset.code) {
            onPrefectureClick(target.dataset.code);
        }
    };

    const handleMouseOver = (e) => {
        const target = e.target.closest('.prefecture');
        if (!target || !target.dataset.code) return;

        const parent = target.parentNode;
        if (!parent) return;

        const activeEl = activePrefectureCode
            ? parent.querySelector(`[data-code="${activePrefectureCode}"]`)
            : null;

        // Condition 1: Active element exists
        if (activeEl) {
            // If hovering over the active element itself
            if (target === activeEl) {
                if (parent.lastElementChild !== target) {
                    parent.appendChild(target);
                }
                return;
            }

            // Hovering over a different element (non-active)
            // Desired order: ..., target, activeEl
            const last = parent.lastElementChild;
            const secondLast = last ? last.previousElementSibling : null;

            // Optimization: If layout is already optimal, skip
            if (last === activeEl && secondLast === target) return;

            // Reorder
            parent.appendChild(target);
            parent.appendChild(activeEl);

        } else {
            // Condition 2: No active element
            // Just make target last
            if (parent.lastElementChild !== target) {
                parent.appendChild(target);
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className={`japan-map-container mode-${mode}`}
            dangerouslySetInnerHTML={{ __html: svgContent || '' }}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
        />
    );
};

export default JapanMap;
