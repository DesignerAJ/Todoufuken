# 구현 계획서: 일본 도도부현 암기 웹앱

## 1. 개요
일본의 47개 도도부현(Todoufuken)을 암기하기 위한 학습 도구입니다. 아름다운 UI와 인터랙티브한 지도를 통해 학습 효율을 높입니다.

## 2. 기술 스택
- **Framework**: React (Vite)
- **Language**: JavaScript (JSX)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid)
- **State Management**: React `useState`, `useContext` (필요시)

## 3. 상세 기능
### A. 데이터 구조 (`src/data/prefectures.js`)
- 47개 도도부현의 ID, 한국어 이름, 한자 표기, 히라가나(요미가나), 영문 표기, 지방(Region) 정보 포함.
- 예: `{ id: 13, name: "도쿄", kanji: "東京都", hiragana: "とうきょうと", region: "Kanto" }`

### B. 컴포넌트 구조
1. **App**: 메인 컨테이너. 모드 전환(암기/퀴즈) 및 테마 관리.
2. **Layout**: 헤더(타이틀, 설정), 메인 영역(지도), 사이드/오버레이(정보).
3. **JapanMap**: SVG 기반의 지도 컴포넌트.
    - 각 도도부현은 `<path>`로 구현.
    - `hover`, `click` 이벤트 핸들링.
    - 선택/정답/오답 상태에 따른 클래스 바인딩.
4. **InfoCard**: 선택된 도도부현의 정보를 보여주는 카드.
    - Glassmorphism 디자인 적용.
5. **QuizController**: 퀴즈 로직 관리.
    - "다음 도도부현 찾기: 오사카" 등의 문제 제시.
    - 정답 확인 및 점수 관리.

### C. 디자인 (Premium Aesthetics)
- **Color Palette**:
    - Background: Deep Indigo/Slate (Dark Mode), Soft Gray/White (Light Mode).
    - Map: Neutral muted tones (default), Vivid accents (active/hover).
    - Typography: 'Noto Sans KR', 'Noto Sans JP'.
- **Effects**:
    - Smooth transitions for hover states.
    - Subtle glowing effects for active regions.
    - Glassmorphism for floating UI elements.

## 4. 단계별 구현 순서
1. **데이터 준비**: 도도부현 데이터 파일 생성.
2. **지도 리소스 확보**: SVG Path 데이터 검색 및 컴포넌트화.
3. **기초 UI 구축**: 레이아웃, CSS 변수 설정 (`index.css`).
4. **지도 기능 구현**: 인터랙티브 지도 렌더링.
5. **학습 모드 구현**: Hover/Click 시 정보 표시.
6. **퀴즈 모드 구현**: 게임 로직 추가.
7. **디자인 폴리싱**: 애니메이션, 반응형 대응.

## 5. 예상 과제
- 정확한 일본 지도 SVG Path 데이터 확보 (검색 필요).
- 모바일 환경에서의 지도 조작 편의성.
