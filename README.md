# Mario But Underground 🍄

화면 하단에서 즐기는 마리오 스타일 횡스크롤 플랫폼 게임!

## 🎮 게임 소개

**Mario But Underground**는 웹 브라우저의 하단 1/3 영역에서 즐길 수 있는 간단하고 재미있는 마리오 스타일 플랫폼 게임입니다. 점프와 이동만으로 조작할 수 있는 직관적인 게임플레이를 제공합니다.

### ✨ 주요 특징

- 🖥️ **브라우저 하단 고정**: 화면의 1/3 높이를 차지하는 독특한 레이아웃
- 🎯 **간단한 조작**: 이동과 점프만으로 즐기는 직관적인 게임플레이
- 🌟 **횡스크롤**: 가로로 긴 화면을 활용한 횡스크롤 액션
- 📱 **반응형 디자인**: 모바일과 데스크톱 모두 지원

## 🕹️ 게임 조작법

| 키                  | 동작        |
| ------------------- | ----------- |
| `A` / `←`           | 왼쪽 이동   |
| `D` / `→`           | 오른쪽 이동 |
| `W` / `↑` / `Space` | 점프        |

## 🚀 기술 스택

- **Frontend**: React 19+ with TypeScript
- **Styling**: Sass (SCSS)
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 📁 프로젝트 구조

```
src/
├── components/          # 게임 컴포넌트들
│   ├── GameScreen.tsx   # 메인 게임 화면
│   ├── Player.tsx       # 플레이어 컴포넌트
│   └── Platform.tsx     # 플랫폼 컴포넌트
├── hooks/               # 커스텀 훅들
│   └── useGameLogic.ts  # 게임 로직 관리
├── styles/              # SCSS 스타일 파일들
│   ├── _variables.scss  # 전역 변수
│   ├── GameScreen.scss  # 게임 화면 스타일
│   ├── Player.scss      # 플레이어 스타일
│   └── Platform.scss    # 플랫폼 스타일
└── types/               # TypeScript 타입 정의
    └── game.ts          # 게임 관련 타입들
```

## 🛠️ 개발 및 배포

### 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 빌드
npm run build

# 미리보기
npm run preview
```

### GitHub Pages 배포

```bash
# GitHub Pages에 배포
npm run deploy
```

## 🎯 게임 목표

플랫폼을 점프하며 최대한 멀리 이동하세요! 각 플랫폼을 성공적으로 넘나들며 높은 점수를 달성해보세요.

## 🌐 라이브 데모

[Mario But Underground 플레이하기](https://MinKyeongHyeon.github.io/marioButUnderground)

## 📝 라이선스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.

---

만든이: [MinKyeongHyeon](https://github.com/MinKyeongHyeon)
