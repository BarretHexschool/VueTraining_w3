const url = 'https://vue3-course-api.hexschool.io';
const path = '2259buyer'; 

const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
axios.defaults.headers.common['Authorization'] = token;
