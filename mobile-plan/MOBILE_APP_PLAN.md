# Kế hoạch Mobile App — Hanoi Heritage Audio Guide

## Quyết định đã chốt
- Nền tảng: Expo + React Native, hỗ trợ Android và iOS.
- Audio: audio URL thật qua Expo audio/AV; TTS là fallback khi POI chưa có file hoặc file lỗi.
- Offline phase đầu: cache POI, bản dịch, ảnh/metadata và favorites; chưa tải audio offline.
- UI giữ nguyên concept Web: Clean White & Charcoal Editorial, nền trắng, slate border, card bo góc, accent đen, category color nhẹ.
- Web hiện tại không bị thay đổi layout trong quá trình tạo mobile.

## Mục tiêu phase Mobile v1
Xây app mobile độc lập trong thư mục `mobile/`, tái sử dụng models, translation keys và domain logic platform-neutral từ `src/core/`. V1 phải chạy được trên Android/iOS simulator hoặc thiết bị thật, có Explore, Location Detail, Map, Favorites, Profile/Auth demo, Paywall mock và Mini Audio Player.

## Giai đoạn M1 — Tách core dùng chung trước khi tạo screen
1. Xác định contracts/models: `HeritageSite`, `Language`, `Favorite`, `AudioTrack`, `AuthSession`, `PaymentSession`.
2. Tách audio, geolocation, storage, payment và auth service khỏi browser globals (`window`, `localStorage`, HTML `Audio`, Leaflet).
3. Tạo adapter interfaces:
   - `storageAdapter`: Web localStorage / RN AsyncStorage.
   - `audioAdapter`: Web Audio/Speech / RN Expo Audio/TTS.
   - `locationAdapter`: Browser Geolocation / Expo Location.
4. Giữ data POI và translations dùng chung; không copy một bộ dữ liệu khác cho mobile.
5. Viết unit tests cho distance, favorites, audio state và translation fallback.

## Giai đoạn M2 — Expo shell và design system
1. Khởi tạo Expo app trong `mobile/` với TypeScript.
2. Cấu hình React Navigation (native stack + bottom tabs).
3. Tạo theme tokens dùng chung: colors, typography, spacing, radius, shadows.
4. Tạo Safe Area root, loading/error boundary và mobile status bar.
5. Thiết lập môi trường dev/preview và README chạy Android/iOS.
6. Không đưa Header/Footer Web hoặc Tailwind vào React Native; chỉ tái sử dụng token và domain logic.

## Giai đoạn M3 — Navigation và màn hình nội dung
1. `ExploreScreen`: search, district/category filters, POI cards, language selector.
2. `LocationDetailScreen`: hero image, description, highlights, Audio Guide card, Explore More.
3. `FavoritesScreen`: summary stats, sorting, saved cards, empty state.
4. `ProfileScreen`: user demo, language, logout, access status.
5. Deep link từ card/map/chat tới Location Detail.
6. Chú ý keyboard, safe area, screen reader label và dynamic text scaling.

## Giai đoạn M4 — Native audio và Mini Player
1. Dùng Expo audio/AV cho audio URL thật.
2. TTS fallback theo `vi-VN`, `en-US`, `fr-FR`, `ja-JP`, `ko-KR`, `zh-CN`.
3. State chuẩn: idle/loading/playing/paused/ended/error, currentTime, duration, rate, volume.
4. Mini Player absolute trên Safe Area; controls play/pause, seek, skip, volume, rate, close.
5. Không tăng listened khi pause/resume cùng session; cleanup khi unmount/navigation.
6. Hiển thị lỗi mạng và nút retry; chưa background audio ở v1 nếu chưa chốt yêu cầu.

## Giai đoạn M5 — Native Map, GPS và proximity
1. Dùng `react-native-maps` với marker POI và marker user.
2. Expo Location permission/loading/error và `watchPosition` khi bật tracking.
3. Dùng Haversine core để hiển thị khoảng cách/POI gần nhất.
4. Toggle opt-in `GPS audio` và `Auto-play nearby`, bán kính/cooldown/chống lặp.
5. Route v1 dùng polyline gợi ý; tích hợp routing API thật sau khi backend contract sẵn sàng.
6. Không tự xin quyền location khi mở app; chỉ xin sau thao tác người dùng.

## Giai đoạn M6 — Auth, payment và chatbot mobile
1. Auth screen dùng shared auth contract; token lưu SecureStore, không lưu password.
2. Protected Favorites/profile/paywall theo access state.
3. Paywall mock giữ Online/Cash flow; sau đó thay bằng API thật.
4. Payment callback/deep link và session expiry.
5. Chatbot bottom sheet/floating action với text, POI card/image và loading/error.
6. Tính năng mới không làm thay đổi concept của Explore/Location/Map.

## Giai đoạn M7 — Cache và offline cơ bản
1. AsyncStorage/SQLite tùy quy mô cho POI, translations, favorites và metadata.
2. Cache-first read, timestamp/version và fallback khi mất mạng.
3. Image caching theo platform; trạng thái loading/placeholder.
4. Audio vẫn yêu cầu mạng ở v1; lập kế hoạch download/audio permission riêng cho v2.
5. Xử lý cache invalidation khi data version thay đổi.

## Giai đoạn M8 — Kiểm thử, build và phát hành
1. Unit tests cho core và adapter mocks.
2. Component tests cho screens, player, auth, paywall và permission states.
3. E2E happy paths: explore → location → play; map → GPS; login → favorites; paywall demo.
4. Test Android/iOS simulator và ít nhất một thiết bị thật mỗi nền tảng.
5. EAS profiles: development, preview, production; app icon/splash/name/package ID.
6. Mobile CI chạy lint, typecheck, tests và EAS build khi được cấu hình secrets.
7. Theo dõi crash/logging và checklist accessibility trước release.

## Cấu trúc mobile dự kiến
```text
mobile/
├── app.json / app.config.ts
├── package.json
├── src/
│   ├── navigation/
│   ├── screens/
│   ├── components/
│   ├── theme/
│   ├── adapters/
│   └── services/
└── README.md
src/core/
├── data/
├── domain/
├── audio/
├── location/
├── auth/
├── payment/
└── storage/
```

## Tiêu chí hoàn thành Mobile v1
- Android/iOS chạy được bằng Expo.
- Navigation và Safe Area không che nội dung/player.
- Dùng chung POI IDs, translations và domain tests với Web.
- Audio URL + TTS fallback hoạt động, cleanup đúng.
- Map/GPS permission và khoảng cách hoạt động, auto-play chỉ opt-in.
- Favorites/auth/paywall mock không lưu password.
- Cache POI/ảnh/favorites dùng được khi offline; audio offline nằm ngoài phạm vi v1.
- UI nhất quán với Web, không tạo design language mới.
