# 🗺️ 일본 도도부현 명칭 암기 (Todoufuken)

일본의 47개 도도부현(都道府県) 위치와 명칭, 그리고 각 지역의 주요 명소를 재미있고 직관적으로 학습할 수 있는 인터랙티브 웹 애플리케이션입니다.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## ✨ 주요 기능

### 1. 💡 학습 모드 (Learn Mode)
- **인터랙티브 지도**: SVG 기반의 정밀한 일본 지도를 탐색합니다.
- **콜아웃 팝업**: 지역 클릭 시 해당 위치에서 뻗어 나오는 세련된 말풍선(Callout) 인터페이스를 통해 상세 정보를 확인합니다.
- **풍부한 지역 정보**: 도도부현의 한국어 명칭, 한자, 읽는 법(가나), 지역 내 주요 랜드마크, 그리고 특징을 담은 3줄 요약 설명을 제공합니다.

### 2. 🎮 퀴즈 모드 (Quiz Mode)
- **무작위 문제**: 시스템이 무작위로 제시하는 도도부현 이름을 보고 지도에서 올바른 위치를 클릭합니다.
- **실시간 피드백**: 정답/오답 여부를 시각적인 애니메이션 효과와 메시지로 즉시 알려줍니다.
- **점수 시스템**: 정답을 맞출 때마다 스코어가 기록되어 학습 성취도를 확인할 수 있습니다.

### 3. 🎨 프리미엄 디자인 (Premium UI/UX)
- **글래스모피즘**: 모든 패널에 투명도와 블러 효과를 적용하여 현대적이고 세련된 느낌을 줍니다.
- **부드러운 상호작용**: 호버 효과, 팝업 애니메이션, 모드 전환 슬라이더 등 몰입감을 높여주는 마이크로 인터랙션이 포함되어 있습니다.
- **지능형 레이아웃**: 지도의 클릭 위치에 따라 정보 창이 화면 밖으로 잘리지 않도록 자동 배치됩니다.

---

## 🛠️ 기술 스택

- **Frontend**: React (v19)
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Custom Glassmorphism Design)
- **Map Data**: Interactive SVG
- **Deployment**: GitHub Pages

---

## 🚀 시작하기

### 설치 및 로컬 실행

```bash
# 저장소 복제
git clone https://github.com/[사용자아이디]/Todoufuken.git

# 폴더 이동
cd Todoufuken

# 패키지 설치
npm install

# 로컬 개발 서버 실행
npm run dev
```

### 배포 방법

GitHub Pages 배포 설정을 마친 후 다음 명령어를 사용합니다:

```bash
# 빌드 및 배포 자동 실행
npm run deploy
```

---

## 📝 커스터마이징 가이드

- **지도 데이터 수정**: `src/assets/japan.svg` 파일을 잉크스케이프(Inkscape) 등의 SVG 편집기로 수정하여 지도 레이아웃을 조정할 수 있습니다.
- **지역 정보 수정**: `src/data/prefectures.js` 파일에서 각 도도부현의 명칭이나 랜드마크 설명을 직접 편집할 수 있습니다.

---

## 📄 라이선스

이 프로젝트는 개인 학습용으로 제작되었습니다.
지도는 [Geolonia](https://geolonia.com/)의 오픈소스 데이터를 기반으로 제작되었습니다.
