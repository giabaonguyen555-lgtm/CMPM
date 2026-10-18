# BÁO CÁO DỰ ÁN
# Hanoi Heritage Audio Guide

## 1. Thông tin chung

- **Tên dự án:** Hanoi Heritage Audio Guide
- **Loại sản phẩm:** Ứng dụng web frontend giới thiệu di sản Hà Nội
- **Framework chính:** React 19
- **Build tool:** Vite
- **Ngôn ngữ:** JavaScript/JSX
- **Styling:** Tailwind CSS kết hợp CSS tùy chỉnh
- **Routing:** React Router DOM
- **Bản đồ:** Leaflet và React Leaflet
- **Icon:** Lucide React
- **Kiến trúc hiện tại:** Frontend prototype/demo, dữ liệu và nghiệp vụ chính chạy phía client
- **Phạm vi hiện tại:** Web desktop và mobile browser
- **Phạm vi chưa triển khai:** Backend production, cơ sở dữ liệu, thanh toán thật và React Native mobile app

Ứng dụng cho phép người dùng khám phá các địa điểm di sản tại Hà Nội, đọc nội dung đa ngôn ngữ, nghe audio guide, xem bản đồ, tìm địa điểm gần nhất, lưu địa điểm yêu thích, sử dụng chatbot hỗ trợ và trải nghiệm một số flow đăng nhập/paywall dạng demo.

---

## 2. Mục tiêu và phạm vi nghiệp vụ

### 2.1. Mục tiêu

Dự án hướng tới việc xây dựng một hướng dẫn viên di sản số cho khách du lịch và người dùng quan tâm đến văn hóa Hà Nội. Sản phẩm tập trung vào:

1. Khám phá địa điểm di sản theo danh sách.
2. Xem thông tin chi tiết của từng địa điểm.
3. Hỗ trợ sáu ngôn ngữ.
4. Nghe thuyết minh bằng audio file hoặc Speech Synthesis.
5. Tìm địa điểm trên bản đồ.
6. Sử dụng GPS để tính khoảng cách và phát hiện địa điểm gần.
7. Lưu danh sách yêu thích.
8. Mô phỏng đăng nhập, paywall và thanh toán.
9. Hỗ trợ người dùng bằng chatbot mock.
10. Quản lý dữ liệu bằng dashboard admin mock.

### 2.2. Các tính năng chính

| Nhóm | Tính năng |
|---|---|
| Explore | Tìm kiếm, lọc địa điểm, hiển thị card |
| Location Detail | Mô tả, highlights, thông tin lịch sử, favorite, audio guide |
| Audio | Play/pause, seek, skip, volume, tốc độ, đổi ngôn ngữ, TTS fallback |
| Map | Leaflet map, marker, search/filter, GPS, khoảng cách, nearest POI |
| Favorites | Lưu và xem các địa điểm yêu thích |
| Authentication | Login/register demo, protected routes |
| Paywall | Mở khóa tính năng premium bằng online/cash demo |
| Chatbot | Tư vấn địa điểm bằng keyword matching |
| Admin | Overview, payments, POI library, monitoring mock |
| Localization | Việt, Anh, Pháp, Nhật, Hàn, Trung |

### 2.3. Các nội dung chưa phải production

Các chức năng sau hiện chỉ là mô phỏng frontend:

- Đăng nhập và đăng ký chưa gọi backend.
- Password không được xác thực bởi server.
- Payment chưa kết nối cổng thanh toán.
- Admin chưa có API và cơ chế phân quyền đầy đủ.
- Chatbot chưa sử dụng AI/RAG/API thật.
- Audio URL thật chưa được cung cấp đầy đủ; nhiều trường hợp dùng Speech Synthesis.
- Dữ liệu POI là static data.
- Chưa có ứng dụng React Native trong thư mục `mobile/`.

---

## 3. Công nghệ sử dụng

### 3.1. Runtime và UI

- **React:** Xây dựng component, page và state UI.
- **React DOM:** Render ứng dụng lên DOM.
- **React Router DOM:** Điều hướng giữa các trang và protected route.
- **React Context:** Quản lý state dùng chung cho auth, payment, heritage và audio.

### 3.2. Build và styling

- **Vite:** Dev server và bundler production.
- **Tailwind CSS:** Utility classes cho layout, spacing, màu sắc và responsive.
- **`src/index.css`:** CSS toàn cục cho design system, layout đặc thù, map, chat và sticky player.

### 3.3. Thư viện chức năng

- **Leaflet:** Bản đồ tương tác.
- **React Leaflet:** Component React cho Leaflet.
- **Lucide React:** Icon giao diện.

---

## 4. Cấu trúc thư mục tổng quát

```text
CNPM/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── .kilo/
│   └── plans/
│       └── 1791997801121-mobile-app-plan.md
├── mobile-plan/
│   └── MOBILE_APP_PLAN.md
├── mobile-react-native-blueprint/
│   └── ARCHITECTURE.md
├── public/
│   └── assets/images/landmarks/
├── samplepic/
├── scripts/
│   └── download-assets.mjs
├── src/
│   ├── components/
│   ├── core/
│   ├── pages/
│   ├── routes/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── data.test.mjs
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── master_prompt_hanoi_multilingual_audio_guide.md
└── Product Requirements Document (PRD)_.pdf
```

---

## 5. Giải thích các file cấp root

### 5.1. `package.json`

File cấu hình chính của Node.js project.

Nội dung quan trọng:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "node data.test.mjs"
  }
}
```

Vai trò:

- Khai báo tên và phiên bản project.
- Khai báo dependencies.
- Khai báo lệnh chạy dev server, build, preview và test.
- Định nghĩa project sử dụng ES Modules thông qua trường `type: module`.

Dependencies chính:

- `react`, `react-dom`: nền tảng React.
- `react-router-dom`: routing.
- `leaflet`, `react-leaflet`: bản đồ.
- `lucide-react`: icon.
- `vite`: build tool.
- `tailwindcss`, `@tailwindcss/vite`: styling.

### 5.2. `package-lock.json`

File do npm tạo ra để khóa chính xác phiên bản dependency và dependency con. File giúp các môi trường khác nhau cài cùng một cây dependency khi chạy `npm ci`.

### 5.3. `index.html`

HTML entry point của Vite. File chứa phần tử root, thường có dạng:

```html
<div id="root"></div>
```

React sẽ mount toàn bộ ứng dụng vào phần tử này từ `src/main.jsx`.

### 5.4. `vite.config.js`

Cấu hình Vite:

- Kích hoạt plugin React.
- Kích hoạt plugin Tailwind CSS.
- Là điểm mở rộng nếu cần alias, proxy API, chunking hoặc cấu hình build.

### 5.5. `.gitignore`

Khai báo những file/thư mục không nên đưa vào Git, ví dụ `node_modules`, output build hoặc file môi trường cục bộ.

### 5.6. `data.test.mjs`

Test dữ liệu tĩnh bằng Node.js `assert`.

Các kiểm tra hiện có:

- Có đúng 9 địa điểm.
- Có đúng 6 ngôn ngữ.
- Mỗi POI có tọa độ.
- Mỗi POI có name và description ở tất cả ngôn ngữ.
- Các key dịch cho navigation tồn tại.

Chạy bằng:

```bash
npm test
```

### 5.7. `master_prompt_hanoi_multilingual_audio_guide.md`

Tài liệu mô tả ý tưởng, yêu cầu hoặc prompt ban đầu của sản phẩm. File có giá trị tham khảo về bối cảnh và định hướng UI/UX.

### 5.8. `Product Requirements Document (PRD)_.pdf`

Tài liệu yêu cầu sản phẩm dạng PDF. Đây là tài liệu tham chiếu ngoài mã nguồn, dùng để đối chiếu mục tiêu và yêu cầu nghiệp vụ.

---

## 6. File khởi động ứng dụng

### 6.1. `src/main.jsx`

Đây là entry point của React.

Cây Provider hiện tại:

```text
React.StrictMode
└── BrowserRouter
    └── ErrorBoundary
        └── AuthProvider
            └── PaymentProvider
                └── HeritageProvider
                    └── AudioProvider
                        └── App
```

Vai trò:

- Import CSS toàn cục.
- Import CSS của Leaflet.
- Tạo React root.
- Cấu hình BrowserRouter.
- Bọc ứng dụng bằng ErrorBoundary.
- Khởi tạo các Context Provider theo đúng thứ tự phụ thuộc.

Thứ tự này quan trọng vì `AudioProvider` sử dụng dữ liệu từ `HeritageProvider`, còn các page sử dụng toàn bộ context.

### 6.2. `src/App.jsx`

Đây là app shell.

File đảm nhiệm:

- Xác định route hiện tại.
- Hiển thị `Header`, `Footer`, `StickyPlayer`, `ChatWidget` cho public route.
- Không hiển thị public shell khi đang ở `/admin`.
- Render `AppRouter` bên trong layout chính.

Việc loại public shell khỏi Admin giúp dashboard không bị ảnh hưởng bởi footer, mini player hoặc chatbot của website công khai.

### 6.3. `src/index.css`

CSS toàn cục của ứng dụng.

Các nhóm style chính:

- Typography và màu sắc editorial.
- Container và spacing.
- Header/footer.
- Sticky bottom player.
- Chat widget.
- Map và Leaflet overlay.
- Responsive layout.
- Scrollbar.
- Mobile safe-area và khoảng trống tránh player/footer.

Design language của dự án là **Clean White & Charcoal Editorial**: nền sáng, màu slate/charcoal, border mảnh, card bo góc và accent tối.

---

## 7. Components

### 7.1. `src/components/layout/HeaderNavbar.jsx`

Header chính của website.

Chức năng:

- Hiển thị logo/tên sản phẩm.
- Điều hướng Explore, Map, Favorites, About.
- Chọn ngôn ngữ giao diện.
- Hiển thị trạng thái user.
- Mở menu tài khoản.
- Điều hướng login/register hoặc logout.

Header thay đổi `HeritageContext.language`, tức là ngôn ngữ giao diện. Ngôn ngữ audio được quản lý độc lập trong `AudioPlayerContext`.

### 7.2. `src/components/layout/Footer.jsx`

Footer public của website.

Chức năng:

- Hiển thị mô tả ngắn về dự án.
- Liên kết tới các route chính.
- Hiển thị thông tin sản phẩm.
- Có khoảng đệm dưới để không bị sticky player che nội dung.

### 7.3. `src/components/layout/StickyBottomPlayer.jsx`

Mini player cố định ở cuối màn hình.

Chức năng:

- Hiển thị POI đang phát.
- Play/pause.
- Rewind/forward.
- Thanh progress.
- Volume/mute.
- Playback rate.
- Retry khi audio lỗi.
- Đóng player.
- Hiển thị tên POI theo audio language.

Component lấy state từ `useAudio()` và không tự quản lý audio engine.

### 7.4. `src/components/cards/ExploreSiteCard.jsx`

Card dùng ở trang Explore và các danh sách POI.

Hiển thị:

- Ảnh địa điểm.
- Tên theo ngôn ngữ hiện tại.
- Category.
- District.
- Duration.
- Nút favorite.
- Link tới trang chi tiết.

### 7.5. `src/components/ui/Button.jsx`

UI primitive dùng lại cho button.

Mục tiêu:

- Chuẩn hóa class button.
- Hỗ trợ variant/size cơ bản.
- Tránh lặp class Tailwind ở nhiều component.

### 7.6. `src/components/ErrorBoundary.jsx`

React Error Boundary cấp ứng dụng.

Chức năng:

- Bắt lỗi runtime trong component tree.
- Tránh toàn bộ app biến thành màn hình trắng.
- Hiển thị fallback UI.
- Cho phép thử render lại.
- Có thể quay về trang Explore.
- Ghi lỗi để hỗ trợ debug.

### 7.7. `src/components/chat/ChatWidget.jsx`

Widget chatbot nổi trên public shell.

Chức năng:

- Mở/đóng cửa sổ chat.
- Hiển thị lịch sử tin nhắn.
- Nhập và gửi câu hỏi.
- Hiển thị typing/loading.
- Retry khi service lỗi.
- Clear conversation.
- Tự động scroll tới tin nhắn mới.
- Hiển thị card POI và link tới detail.
- Hiển thị suggested prompts.

Chatbot hiện được gắn nhãn mock về mặt nghiệp vụ vì chưa có AI backend.

### 7.8. `src/components/chat/chatService.js`

Lớp service/interface cho chatbot.

Vai trò:

- Tách logic trả lời khỏi UI.
- Tìm POI dựa vào tên hoặc ID.
- Trả về response text, POI card hoặc link map.
- Mô phỏng delay để hiển thị typing state.
- Là điểm thay thế trong tương lai nếu tích hợp API/AI thật.

---

## 8. Pages

### 8.1. `src/pages/ExplorePage.jsx`

Trang khám phá chính.

Chức năng:

- Hiển thị hero/intro.
- Tìm kiếm POI.
- Lọc theo district/category tùy trạng thái hiện tại.
- Hiển thị số kết quả.
- Render danh sách `ExploreSiteCard`.
- Hỗ trợ localized title/description.

Luồng người dùng phổ biến bắt đầu từ trang này:

```text
Explore → chọn POI → Location Detail → Play audio
```

### 8.2. `src/pages/LocationDetailPage.jsx`

Trang chi tiết POI.

Hiển thị:

- Ảnh hero.
- Tên địa điểm.
- District, year, duration.
- Description đa ngôn ngữ.
- Highlights.
- Favorite button.
- Audio language selector.
- Audio controls.
- Các POI liên quan.

Nếu `id` trên URL không tồn tại, page trả về `NotFoundPage` thay vì hiển thị nhầm POI đầu tiên.

Audio selector ở page này chỉ thay đổi ngôn ngữ narration/transcript, không thay đổi ngôn ngữ toàn bộ UI.

### 8.3. `src/pages/MapPage.jsx`

Trang bản đồ tương tác.

Chức năng:

- Render Leaflet map.
- Hiển thị marker cho các POI.
- Search POI.
- Filter category.
- Chọn marker và POI sidebar.
- Phân biệt selected/nearest/user location.
- Xin quyền GPS theo thao tác người dùng.
- Hiển thị khoảng cách.
- Bật proximity/audio discovery.
- Auto-play nearby có kiểm soát.
- Điều hướng tới detail.
- Chuyển tới paywall nếu tính năng yêu cầu quyền truy cập.
- Hiển thị route preview dạng visual preview, không phải routing API production.

Map được lazy-load để giảm bundle chính.

### 8.4. `src/pages/MapPage.backup.jsx`

Bản backup của MapPage trước các refactor lớn. File dùng để đối chiếu hoặc khôi phục khi thay đổi map gây regression.

### 8.5. `src/pages/FavoritesPage.jsx`

Trang danh sách yêu thích.

- Chỉ truy cập được khi đã đăng nhập.
- Đọc danh sách POI ID từ `HeritageContext`.
- Tìm POI tương ứng trong static data.
- Render lại bằng card/list.
- Hiển thị empty state khi chưa có favorite.

### 8.6. `src/pages/AuthPage.jsx`

Dùng chung cho login và register.

Chức năng:

- Nhập email.
- Nhập password.
- Confirm password ở register.
- Password visibility toggle.
- Validation cơ bản.
- Loading/error state.
- Redirect về `next` sau khi đăng nhập.

Đây là flow demo client-only; password không được lưu và không có server authentication.

### 8.7. `src/pages/PaywallPage.jsx`

Trang mở khóa quyền truy cập premium.

Flow hỗ trợ:

1. **Online demo:** mô phỏng pending rồi success.
2. **Cash demo:** mở session và nhận mã claim/code.
3. **Retry:** thử lại khi payment thất bại.
4. **Return:** quay lại tính năng trước đó thông qua `next`.

Không nên xem access token hiện tại là payment token production.

### 8.8. `src/pages/AboutUsPage.jsx`

Trang giới thiệu sản phẩm.

Nội dung thường gồm:

- Sứ mệnh sản phẩm.
- Giá trị bảo tồn văn hóa.
- Cách sử dụng audio guide.
- Thông tin về trải nghiệm khám phá Hà Nội.

Page được lazy-load.

### 8.9. `src/pages/AdminDashboardPage.jsx`

Dashboard quản trị mock, tách khỏi public shell.

Các tab:

- `Overview`: thống kê tổng quan và recent activity.
- `Payments`: danh sách payment, filter và confirm cash demo.
- `POI Library`: search, add/edit POI mock.
- `Monitoring`: trạng thái hệ thống và snapshot metrics mock.

Dashboard có URL query tab, ví dụ:

```text
/admin?tab=payments
```

Dữ liệu và action hiện chưa kết nối API thật.

### 8.10. `src/pages/NotFoundPage.jsx`

Trang 404 cho:

- Route không tồn tại.
- POI ID không tồn tại.
- Link deep link bị sai.

Có điều hướng quay lại trang Explore.

---

## 9. Routing

### 9.1. `src/routes/AppRouter.jsx`

Định nghĩa các route chính:

| Route | Page | Trạng thái |
|---|---|---|
| `/` | `ExplorePage` | Public |
| `/location/:id` | `LocationDetailPage` | Public |
| `/map` | `MapPage` | Public, lazy-load |
| `/favorites` | `FavoritesPage` | Protected |
| `/paywall` | `PaywallPage` | Protected |
| `/about` | `AboutUsPage` | Public, lazy-load |
| `/admin` | `AdminDashboardPage` | Mock admin |
| `/login` | `AuthPage` | Public |
| `/register` | `AuthPage register` | Public |
| `*` | `NotFoundPage` | Public fallback |

Router sử dụng `Suspense` để hiển thị loading state khi lazy page đang tải.

### 9.2. `src/routes/ProtectedRoute.jsx`

ProtectedRoute kiểm tra `isAuthenticated` từ `AuthContext`.

Nếu chưa đăng nhập, người dùng được chuyển tới:

```text
/login?next=<route hiện tại>
```

Sau login có thể quay lại trang ban đầu.

Lưu ý: cơ chế hiện tại mới kiểm tra có user, chưa phải role-based authorization hoàn chỉnh.

---

## 10. Core data và utility

### 10.1. `src/core/data/hanoiHeritageSites.js`

Nguồn dữ liệu POI chính của toàn app.

Mỗi POI có các trường:

```text
id
name
 district
category
year
duration
coordinates
image
description
highlights
```

Có 9 địa điểm:

1. Hồ Hoàn Kiếm & Đền Ngọc Sơn.
2. Văn Miếu - Quốc Tử Giám.
3. Hoàng Thành Thăng Long.
4. Chùa Một Cột.
5. Lăng Chủ tịch Hồ Chí Minh.
6. Khu Phố Cổ Hà Nội.
7. Chùa Trấn Quốc.
8. Nhà Hát Lớn Hà Nội.
9. Nhà thờ lớn Hà Nội.

Ngôn ngữ:

```text
vi, en, fr, ja, ko, zh
```

File này được dùng chung bởi Explore, Location Detail, Map, Favorites, Chat và Admin.

### 10.2. `src/core/data/adminMockData.js`

Dữ liệu mock cho Admin:

- POI list.
- Payment sessions.
- Activity log.
- Summary statistics.

Dữ liệu không được đồng bộ lên server.

### 10.3. `src/core/location/distance.js`

Chứa hàm tính khoảng cách giữa hai tọa độ bằng công thức Haversine.

Dùng trong:

- Map nearest POI.
- GPS proximity.
- Hiển thị khoảng cách theo mét/km.

### 10.4. `src/core/utils/categoryStyles.js`

Ánh xạ category POI sang style/class tương ứng.

Mục tiêu là giữ màu category nhất quán giữa card, map, badge và detail.

### 10.5. `src/core/hooks/useLocalStorage.js`

Custom hook đồng bộ state React với localStorage.

Dùng cho các state cần giữ sau khi reload, ví dụ favorites hoặc preference.

### 10.6. `src/core/hooks/useGeolocation.js`

Adapter/hook cho Browser Geolocation API.

Quản lý:

- Request location.
- Loading state.
- Error state.
- Permission failure.
- Watch/clear vị trí.
- Retry.

Hook hiện vẫn phụ thuộc vào browser API, chưa tách thành native location adapter.

---

## 11. Context và state management

### 11.1. `src/core/context/AuthContext.jsx`

Quản lý trạng thái xác thực demo.

Cung cấp:

- `user`.
- `isAuthenticated`.
- `loading`.
- `error`.
- `login`.
- `register`.
- `logout`.
- `accessToken`.

Cơ chế hiện tại:

- Lưu user vào localStorage key `authUser`.
- Không lưu password.
- Không có JWT/server verification.
- Không có refresh token hoặc expiry.

### 11.2. `src/core/context/PaymentContext.jsx`

Quản lý paywall/payment demo.

Cung cấp:

- `hasAccess`.
- `status`.
- `mode`.
- `sessionId`.
- `error`.
- `startOnlinePayment`.
- `openCashPayment`.
- `submitCashCode`.
- `retryPayment`.
- `resetPayment`.

Code cash demo hợp lệ:

```text
HANOI-DEMO
```

Hiện context dùng localStorage key `access_token`; đây là điểm cần đổi nếu triển khai production vì auth token và payment entitlement không nên dùng chung key.

### 11.3. `src/core/context/HeritageContext.jsx`

Quản lý state nghiệp vụ chính của người dùng:

- `language`: ngôn ngữ giao diện.
- `favorites`: danh sách POI yêu thích.
- `listened`: tổng số session đã nghe.
- `listenedSessions`: các session đã được ghi nhận.
- `languages`: danh sách ngôn ngữ hỗ trợ.
- `toggleFavorite`.
- `addListened`.

LocalStorage keys:

```text
lang
favorites
listened
listenedSessions
```

Context có kiểm tra dữ liệu JSON hỏng và fallback về giá trị an toàn.

### 11.4. `src/core/context/AudioPlayerContext.jsx`

Quản lý audio engine toàn ứng dụng.

Các state chính:

```text
current
playing
loading
status
error
progress
duration
rate
volume
language
```

Audio flow:

1. Nếu POI có audio URL, thử dùng HTML Audio.
2. Nếu file lỗi hoặc browser chặn playback, dùng Speech Synthesis.
3. Transcript được tạo từ description và highlights.
4. Có mapping locale theo sáu ngôn ngữ.
5. Khi đổi audio language đang phát, player dừng và phát lại bằng language mới.

Audio language được thiết kế độc lập với UI language.

---

## 12. Mô hình audio

### 12.1. HTML Audio

Khi POI có trường `audio`, context tạo audio object và quản lý:

- `play()`.
- `pause()`.
- `currentTime`.
- `duration`.
- `volume`.
- `playbackRate`.
- `onended`.
- `onerror`.

### 12.2. Speech Synthesis fallback

Khi không có file audio hoặc playback bị lỗi:

- Tạo `SpeechSynthesisUtterance`.
- Gán locale theo language.
- Đọc transcript fallback.
- Mô phỏng progress theo duration POI.

### 12.3. Hạn chế

- Chưa có background audio.
- Chưa có native audio session.
- Chưa có audio cache offline.
- Audio file production chưa đầy đủ.
- Speech API tùy thuộc browser và hệ điều hành.

---

## 13. Lưu trữ phía client

Các dữ liệu hiện lưu trong localStorage:

| Key | Nội dung |
|---|---|
| `authUser` | User demo |
| `access_token` | Payment access demo |
| `lang` | Ngôn ngữ UI |
| `favorites` | Mảng POI ID yêu thích |
| `listened` | Tổng số session đã nghe |
| `listenedSessions` | Danh sách session đã nghe |

Ưu điểm:

- Đơn giản.
- Không cần backend.
- Giữ state sau reload.

Hạn chế:

- Không an toàn cho token production.
- Dễ bị chỉnh sửa từ DevTools.
- Không đồng bộ giữa thiết bị.
- Không có expiry/migration chính thức.
- Không phù hợp làm storage cho React Native.

---

## 14. Public shell và Admin shell

### Public shell

Public route có:

```text
HeaderNavbar
Page content
Footer
StickyBottomPlayer
ChatWidget
```

### Admin shell

Khi pathname bắt đầu bằng `/admin`, `App.jsx` không render:

- Header public.
- Footer public.
- Sticky player.
- Chat widget.

Điều này giúp Admin có layout riêng, giảm nhiễu và tránh các component fixed che dashboard.

---

## 15. Assets và file public

### 15.1. `public/assets/images/landmarks/`

Chứa ảnh và metadata của các POI:

- `hoan-kiem.jpg/.json`
- `literature.jpg/.json`
- `citadel.jpg/.json`
- `pagoda.jpg/.json`
- `mausoleum.jpg/.json`
- `old-quarter.jpg/.json`
- `tran-quoc.jpg/.json`
- `opera.jpg/.json`
- `cathedral.jpg/.json`

Ảnh được tham chiếu bằng URL public, ví dụ:

```text
/assets/images/landmarks/hoan-kiem.jpg
```

### 15.2. `samplepic/`

Chứa ảnh minh họa hoặc screenshot tham khảo:

- `explore.png`.
- `location.png`.
- `map.png`.
- `favorite.png`.

Các file này hỗ trợ trình bày ý tưởng/UI, không phải runtime data chính.

---

## 16. Scripts

### `scripts/download-assets.mjs`

Script hỗ trợ tải hoặc chuẩn bị asset. Script này phục vụ quá trình chuẩn bị dữ liệu hình ảnh, không phải component runtime của ứng dụng.

---

## 17. CI/CD và kiểm thử

### 17.1. `.github/workflows/ci-cd.yml`

GitHub Actions hiện thực hiện:

1. Checkout source.
2. Setup Node.js 22.
3. Chạy `npm ci`.
4. Chạy `npm run build`.

Workflow chưa chạy `npm test`, lint, typecheck, component test hoặc E2E.

### 17.2. Các lệnh kiểm tra

```bash
npm install
npm run dev
npm test
npm run build
npm run preview
```

Kết quả đã xác nhận trong quá trình phát triển:

- `npm test` pass.
- `npm run build` pass.
- Build đã lazy-load Map, About và Admin.

### 17.3. Khoảng trống test

Chưa có test chuyên biệt cho:

- Auth flow.
- Payment flow.
- Audio state machine.
- Favorite toggle.
- Protected route.
- GPS permission/error.
- Chat service.
- Admin modal/action.
- Accessibility.
- Responsive behavior.
- E2E user journey.

---

## 18. Kế hoạch mobile và tài liệu kiến trúc

### 18.1. `mobile-plan/MOBILE_APP_PLAN.md`

Kế hoạch xây dựng app Expo/React Native gồm:

- Tách core dùng chung.
- Tạo Expo shell.
- React Navigation.
- Native Explore/Detail/Favorites/Profile/Auth.
- Expo Audio/AV.
- Expo Location.
- React Native Maps.
- SecureStore.
- AsyncStorage/SQLite.
- Cache/offline.
- EAS build.
- Unit/component/E2E test.

### 18.2. `mobile-react-native-blueprint/ARCHITECTURE.md`

Blueprint mô tả kiến trúc React Native tương lai, bao gồm màn hình, adapter và tổ chức module.

### 18.3. `.kilo/plans/1791997801121-mobile-app-plan.md`

Kế hoạch triển khai được sử dụng trong quá trình cải thiện frontend web. Dù tên file liên quan mobile, nội dung hiện tại chủ yếu mô tả hoàn thiện frontend web và các yêu cầu chuẩn bị cho mobile.

### 18.4. Hiện trạng mobile

Repository chưa có:

```text
mobile/package.json
mobile/app.json
mobile/src/
```

Do đó mobile app mới dừng ở mức kế hoạch/tài liệu.

---

## 19. Luồng sử dụng mẫu

### 19.1. Explore tới audio

```text
Người dùng mở /
    ↓
Tìm kiếm/lọc POI
    ↓
Mở /location/:id
    ↓
Chọn audio language
    ↓
Nhấn Play
    ↓
Audio URL hoặc Speech Synthesis
    ↓
StickyBottomPlayer hiển thị trạng thái
```

### 19.2. Map tới POI gần nhất

```text
Người dùng mở /map
    ↓
Nhấn bật location/GPS
    ↓
Browser xin quyền vị trí
    ↓
useGeolocation nhận tọa độ
    ↓
distance.js tính Haversine
    ↓
Map hiển thị nearest POI và khoảng cách
```

### 19.3. Login tới Favorites

```text
Mở /favorites khi chưa login
    ↓
ProtectedRoute chuyển tới /login?next=/favorites
    ↓
Login demo thành công
    ↓
Quay lại /favorites
    ↓
Hiển thị favorite POI
```

### 19.4. Paywall audio

```text
Người dùng chọn tính năng premium
    ↓
Kiểm tra hasAccess
    ↓
Nếu chưa có access: chuyển /paywall
    ↓
Chọn Online hoặc Cash demo
    ↓
Payment success
    ↓
Quay lại tính năng ban đầu
```

---

## 20. Điểm mạnh của dự án

1. Cấu trúc thư mục tương đối rõ giữa page, component, context, data và utility.
2. Dữ liệu POI tập trung, được tái sử dụng ở nhiều màn hình.
3. Hỗ trợ sáu ngôn ngữ ngay từ mô hình dữ liệu.
4. Có audio fallback giúp demo được ngay cả khi chưa có audio file.
5. Có map, GPS, nearest location và distance calculation.
6. Có ErrorBoundary, 404, loading/error/empty state.
7. Có protected route và redirect `next`.
8. Có responsive layout và public/admin shell tách biệt.
9. Chat logic đã được tách thành service để thay backend sau này.
10. Map, About và Admin đã được lazy-load để giảm bundle chính.
11. Có kế hoạch mobile tương đối đầy đủ cho các giai đoạn tiếp theo.

---

## 21. Hạn chế và rủi ro kỹ thuật

### 21.1. Chưa có backend

Auth, payment, admin, chat và phần lớn dữ liệu đều chạy client-side. Không phù hợp để coi là hệ thống production.

### 21.2. Admin cần role guard

Route `/admin` hiện cần được bảo vệ bằng xác thực và role administrator nếu triển khai thật.

### 21.3. Token auth/payment cần tách

Không nên để auth token và entitlement/payment token dùng chung key `access_token`. Nên tách thành các khái niệm:

```text
auth_token
payment_entitlement
payment_session
```

### 21.4. Highlights chưa đầy đủ bản dịch

Tên và description đã có sáu ngôn ngữ nhưng highlights hiện phần lớn là tiếng Anh. Cần đưa highlights về dạng:

```javascript
highlights: {
  vi: [...],
  en: [...],
  fr: [...],
  ja: [...],
  ko: [...],
  zh: [...]
}
```

### 21.5. Browser API coupling

Các module đang phụ thuộc vào:

- `window`.
- `localStorage`.
- `navigator.geolocation`.
- HTML Audio.
- Speech Synthesis.

Điều này làm khó việc tái sử dụng logic cho React Native.

### 21.6. Test coverage thấp

Test hiện chủ yếu kiểm tra static data. Cần bổ sung unit, component và E2E test.

### 21.7. Accessibility cần tiếp tục kiểm tra

Các nội dung cần rà soát:

- Keyboard navigation.
- `aria-expanded`, `aria-controls`.
- Focus trap modal.
- Tab semantics.
- Accessible name cho icon button.
- Contrast.
- Screen reader.
- Reduced motion.

### 21.8. Chưa có offline support

Chưa có service worker/PWA cache hoặc cache POI/audio. Mobile plan có đề xuất AsyncStorage/SQLite nhưng chưa triển khai.

---

## 22. Định hướng phát triển tiếp theo

### Giai đoạn 1: Hoàn thiện production web

1. Tách auth token và payment entitlement.
2. Thêm backend/API và database.
3. Thêm role guard cho admin.
4. Chuẩn hóa API contract cho POI, auth, payment và chat.
5. Bản địa hóa highlights.
6. Thêm test cho các context và route quan trọng.
7. Hoàn thiện accessibility.
8. Thêm lint/typecheck vào CI.

### Giai đoạn 2: Tách core dùng chung

Tổ chức lại thành:

```text
src/core/domain/
src/core/services/
src/core/adapters/
src/core/storage/
src/core/audio/
src/core/location/
```

Tạo interface cho:

- Storage.
- Audio.
- Location.
- Auth.
- Payment.
- Chat.

### Giai đoạn 3: Xây dựng mobile app

1. Tạo `mobile/` bằng Expo TypeScript.
2. Thiết lập React Navigation.
3. Tích hợp React Native Maps.
4. Tích hợp Expo Location.
5. Tích hợp Expo Audio/AV.
6. Dùng SecureStore cho session.
7. Dùng AsyncStorage/SQLite cho cache.
8. Tạo chatbot bottom sheet.
9. Thêm Android/iOS build bằng EAS.
10. Bổ sung mobile CI.

### Giai đoạn 4: Production hardening

- Monitoring và logging.
- Error tracking.
- API retry/circuit breaker.
- Payment reconciliation.
- Session expiry.
- Rate limiting chatbot.
- Image optimization.
- Offline/cache invalidation.
- Automated accessibility audit.

---

## 23. Kết luận

Hanoi Heritage Audio Guide hiện là một prototype frontend React có phạm vi chức năng khá đầy đủ. Ứng dụng đã có các thành phần cốt lõi của một nền tảng hướng dẫn di sản:

- Explore.
- Location detail.
- Audio guide.
- Map/GPS.
- Favorites.
- Auth demo.
- Paywall demo.
- Chatbot mock.
- Admin dashboard mock.
- Localization.

Kiến trúc hiện tại phù hợp cho demo, trình bày đồ án và kiểm thử trải nghiệm người dùng. Tuy nhiên, để triển khai thực tế cần bổ sung backend, database, authentication production, payment gateway, role-based authorization, adapter platform, test coverage, accessibility audit và mobile app.

Ưu tiên cao nhất nên là:

1. Xây dựng backend/API.
2. Tách auth và payment token.
3. Bảo vệ Admin bằng role guard.
4. Tách browser API thành adapter.
5. Bổ sung test tự động.
6. Hoàn thiện bản dịch và audio production.
7. Triển khai app Expo theo kế hoạch mobile.

---

## 24. Phụ lục: bảng tra cứu nhanh toàn bộ file mã nguồn

| File | Chức năng |
|---|---|
| `src/main.jsx` | Khởi tạo React, Router, Providers, ErrorBoundary |
| `src/App.jsx` | Public/Admin shell và AppRouter |
| `src/index.css` | CSS toàn cục và responsive styles |
| `src/routes/AppRouter.jsx` | Khai báo routes và lazy routes |
| `src/routes/ProtectedRoute.jsx` | Bảo vệ route yêu cầu đăng nhập |
| `src/pages/ExplorePage.jsx` | Trang khám phá và lọc POI |
| `src/pages/LocationDetailPage.jsx` | Chi tiết POI và audio guide |
| `src/pages/MapPage.jsx` | Map, GPS, marker, proximity |
| `src/pages/MapPage.backup.jsx` | Backup MapPage |
| `src/pages/FavoritesPage.jsx` | Danh sách yêu thích |
| `src/pages/AuthPage.jsx` | Login/register demo |
| `src/pages/PaywallPage.jsx` | Payment/paywall demo |
| `src/pages/AboutUsPage.jsx` | Giới thiệu sản phẩm |
| `src/pages/AdminDashboardPage.jsx` | Admin mock dashboard |
| `src/pages/NotFoundPage.jsx` | 404 và invalid POI fallback |
| `src/components/layout/HeaderNavbar.jsx` | Header/navigation/language/user menu |
| `src/components/layout/Footer.jsx` | Footer public |
| `src/components/layout/StickyBottomPlayer.jsx` | Mini audio player |
| `src/components/cards/ExploreSiteCard.jsx` | Card POI |
| `src/components/ui/Button.jsx` | Button primitive |
| `src/components/ErrorBoundary.jsx` | Bắt lỗi runtime |
| `src/components/chat/ChatWidget.jsx` | Chat UI |
| `src/components/chat/chatService.js` | Mock chat service |
| `src/core/data/hanoiHeritageSites.js` | Dữ liệu 9 POI và 6 ngôn ngữ |
| `src/core/data/adminMockData.js` | Dữ liệu Admin mock |
| `src/core/context/AuthContext.jsx` | Auth state demo |
| `src/core/context/PaymentContext.jsx` | Payment/access demo |
| `src/core/context/HeritageContext.jsx` | Language/favorites/listened state |
| `src/core/context/AudioPlayerContext.jsx` | Audio engine và TTS fallback |
| `src/core/hooks/useLocalStorage.js` | Hook localStorage |
| `src/core/hooks/useGeolocation.js` | Browser GPS hook |
| `src/core/location/distance.js` | Haversine distance |
| `src/core/utils/categoryStyles.js` | Category styling |
| `data.test.mjs` | Static data test |
| `vite.config.js` | Cấu hình Vite/React/Tailwind |
| `.github/workflows/ci-cd.yml` | CI build workflow |
| `scripts/download-assets.mjs` | Chuẩn bị/tải assets |
| `mobile-plan/MOBILE_APP_PLAN.md` | Kế hoạch mobile |
| `mobile-react-native-blueprint/ARCHITECTURE.md` | Blueprint React Native |
