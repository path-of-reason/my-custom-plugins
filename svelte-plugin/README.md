# Obsidian Plugin Template with Svelte 

- obsidian plugin
- svelte (X sveltekit)
- tailwindcss (unocss)
- shadcn svelte
- lucide icons

## 전제 조건

- [node.js](https://nodejs.org)(v14 이상)
- [bun.sh](https://bun.sh/) (다른 노드 패키지 관리자보다 훨씬 낫습니다.)

## 시작
```bash
bun install
bun dev
```

## 프로젝트 구조

- `src/` - 플러그인의 **소스코드**를 포함합니다.
  - **main.ts** - 플러그인의 **출입 지점**으로, 플러그인을 초기화합니다.
  - **styles.css** - 플러그인의 글로벌 CSS **스타일**입니다.
  - fsd architect
  - `1_pages/`
  - `2_widgets/`
  - `3_features/`
  - `4_entities/`
  - `5_shared/`
  - `views/` - **옵시디언 뷰**를 포함합니다.
- **manifest.json** - 플러그인의 메타데이터

## 소스 매핑
소스 맵을 옵시디언에서 로드하여 디버깅할 때 타입스크립트 코드를 볼 수 있도록 하려면 다음과 같이 설정해야 합니다. 
**vite.config.ts**에서 **sourcemapBaseUrl** 파라미터를 설정해야 합니다. 실제 경로는 디버거의 "파일 시스템" 탭에 .map 파일이 들어 있는 폴더(테스트 볼트)를 추가하면 찾을 수 있습니다. 
탭에 추가하면 됩니다. 지도 파일을 마우스 오른쪽 버튼으로 클릭하고 "링크 주소 복사"를 선택합니다. 소스맵베이스주소**를 기본 주소로 설정합니다.

## 리소스

다음은 플러그인 빌드를 시작하는 데 도움이 되는 몇 가지 리소스입니다.
옵시디언, 스벨트, 테일윈드 CSS(UnoCSS):

- [옵시디언 플러그인 API 문서](https://github.com/obsidianmd/obsidian-api)
- [스벨트 문서](https://svelte.dev/docs)
- [테일윈드 CSS 문서](https://tailwindcss.com/docs)
- [unoCSS 문서](https://unocss.dev/)
- shadcn 문서
- lucide 문서

## 라이선스

- [MIT 라이선스](라이선스) : 자유롭게 수정하여 사용하세요
