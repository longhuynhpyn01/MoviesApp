========================= THIẾT LẬP DỰ ÁN ==================================

1. npm install react-router-dom uuid

2. Cài đặt tailwind

- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p

3. Cài Sass

- npm install sass
- npm install node-sass

4. Cài swiper

- npm install swiper
- để khi khi có nhiều MovieCard thì nó sẽ giúp kéo sang ngang

5. Cài Swr

- npm install swr
- thư viện dùng để fetching dữ liệu
  => giúp ta loading nhanh hơn, tự động khi có data mới, có những cái như errorData, loadmore, phân trang ,... nên có rất nhiều người dùng
- https://swr.vercel.app/docs/getting-started
- nhớ cấu hình trong config.js

6. Cài prop-types

- npm install prop-types
- để kiểm tra props đầu vào
- sử dụng props type để kiểm tra props của component
- để giúp cho người dùng biết đây là props nào, props có bắt buộc hay không, giá trị scủa props là string, number, boolean, function ...

7. Vào https://heroicons.com/ để có những icon để sử dụng

8. Cài react-paginate để phân trang

- npm i react-paginate

9. Để sử dụng import từ file khác mà tránh đường dẫn quá dài thì ta tạo 1 file jsconfig.js ngang thư mục src

- search "config jsconfig json react component"
- https://saurabhshah23.medium.com/react-app-with-absolute-paths-using-jsconfig-json-2b07b1cb24d4
- https://github.com/facebook/create-react-app/issues/5645
- search "jsconfig create-react-app path" để tìm path

=> không áp dụng được

10. Cài uuid cho trường hợp khi map cần có key thì key có thể trùng nhau (Video 232)

- npm install uuid
- Tạo ra id duy nhất theo milisecond nên sẽ không bị trùng

11. Sử dụng swrInfinity để thực hành chức năng Load More

- https://swr.vercel.app/docs/pagination
- https://swr.vercel.app/examples/infinite-loading

12. Muốn giới hạn số dòng hiển thị @tailwindcss/line-clamp

- https://tailwindcss.com/blog/multi-line-truncation-with-tailwindcss-line-clamp
- Multi-line truncation with @tailwindcss/line-clamp
- npm install @tailwindcss/line-clamp

- Trong file 'tailwind.config.js' thì cập nhật:
  module.exports = {
  // ...
  plugins: [
  // ...
  require('@tailwindcss/line-clamp'),
  ],
  }

- line-clamp-{n} với n là số dòng muốn hiển thị
<p class="line-clamp-3">
</p>

13. Thư viện để show more, show less

- https://www.npmjs.com/package/react-show-more-text
- npm i react-show-more-text
