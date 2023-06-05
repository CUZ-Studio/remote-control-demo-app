## 간단한 설명
- `Next.js`와 `Firebase`를 이용한 프로젝트를 위한 Boilerplate입니다.
- [Atomic Design Pattern](https://bradfrost.com/blog/post/atomic-web-design)에 따라 `components` 디렉트리를 구성합니다.
- React UI 구현에 [Material UI](https://mui.com/)를 활용합니다.
- styling을 위해 CSS-IN-JS 라이브러리인 [emotion](https://emotion.sh/docs/introduction)을 활용합니다
- `ESLint`와 `Prettier`를 활용하여 Code Linting 및 Formating을 합니다.

    ```bash
    // ts, tsx, json 확장자를 가진 파일의 code linting
    yarn lint:fix

    // ts, tsx, json 확장자를 가진 파일의 code formatting
    yarn format
    ```

## 실행방법
```bash
// 필요한 패키치 설치
yarn

// 로컬에서 앱 실행
yarn dev
```

## 사용기술
- 프로그래밍 언어: `TypeScript`
- 웹 프론트엔드 프레임워크: `Next.js`
- BaaS(Backend-as-a-service): `firebase`
- React UI component: `Material UI`
- styling: `emotion`

## 참고 페이지
- [Material UI github repo example - material-next-ts](https://github.com/mui/material-ui/tree/master/examples/material-next-ts)