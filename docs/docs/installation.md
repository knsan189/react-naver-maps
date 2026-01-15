---
sidebar_position: 2
---

# Installation

`@rousen/react-naver-maps`를 프로젝트에 설치하는 방법을 안내합니다.

## NPM

```bash
npm install @rousen/react-naver-maps
```

## Yarn

```bash
yarn add @rousen/react-naver-maps
```

## PNPM

```bash
pnpm add @rousen/react-naver-maps
```

## 요구사항

이 라이브러리를 사용하기 위해서는 다음이 필요합니다:

- **React** >= 16.8.0 (Hooks 지원 필요)
- **React DOM** >= 16.8.0
- **네이버 클라우드 플랫폼(NCP) 클라이언트 ID**

### NCP 클라이언트 ID 발급

1. [네이버 클라우드 플랫폼](https://www.ncloud.com/)에 가입합니다
2. 콘솔에서 **AI·NAVER API** > **Maps** 메뉴로 이동합니다
3. **Application 등록**을 통해 클라이언트 ID를 발급받습니다
4. 발급받은 클라이언트 ID를 `Map` 컴포넌트의 `ncpKeyId` prop으로 전달합니다

## 호환성

이 라이브러리는 다음 환경에서 테스트되었습니다:

- ✅ **Vite** - 완전 지원
- ✅ **Webpack 5** - 완전 지원
- ✅ **Next.js** - 완전 지원
- ✅ **Create React App** - 완전 지원
- ✅ **TypeScript** - 타입 정의 포함
- ✅ **ESM & CommonJS** - 양쪽 모두 지원
- ✅ **트리 쉐이킹** - 지원

## TypeScript

이 라이브러리는 TypeScript로 작성되어 있으며, 타입 정의가 포함되어 있습니다. 별도의 `@types` 패키지 설치가 필요하지 않습니다.

## 다음 단계

설치가 완료되었다면 [시작하기](/docs/intro) 문서를 확인하여 첫 번째 지도를 만들어보세요.
