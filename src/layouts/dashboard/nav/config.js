// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Trang chủ',
    path: '/dashboard/app',
    icon: icon('ic_home'),
    child: [
      {
        title: 'Thông tin công ty',
        path: '/thongtin',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Banner',
        path: '/banner',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Tầm nhìn - Sứ mệnh - Giá trị cốt lõi',
        path: '/tamnhin',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Đối tác - Khách hàng',
        path: '/doitac',
        icon: icon('ic_analytics'),
      }
    ]
  },
  {
    title: 'Giới thiệu',
    path: '/dashboard/gioithieu',
    icon: icon('ic_about'),
    child: [
      {
        title: 'Về Hepco',
        path: '/vehepco',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Chức năng - Giấy phép',
        path: '/chucnang',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Giới thiệu bộ máy',
        path: '/bomay',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Thành tựu',
        path: '/thanhtuu',
        icon: icon('ic_analytics'),
      },
      // {
      //   title: 'Hồ sơ năng lực',
      //   path: '/hosonangluc',
      //   icon: icon('ic_analytics'),
      // },
      {
        title: 'Thư viện ảnh',
        path: '/thuvien',
        icon: icon('ic_analytics'),
      }
    ]
  },
  {
    title: 'Dịch vụ',
    path: '/dashboard/dichvu',
    icon: icon('ic_service'),
    child: [
      {
        title: 'Thu gom vận chuyển xử lý rác sinh hoạt',
        path: '/sinhhoat',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Thu gom vận chuyển xử lý rác nguy hại',
        path: '/nguyhai',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Cơ khí - Xây dựng',
        path: '/cokhi',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Thoát nước - Điện chiếu sáng',
        path: '/thoatnuoc',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Quản trang',
        path: '/quantrang',
        icon: icon('ic_analytics'),
      },
      {
        title: 'Kinh doanh khác',
        path: '/khac',
        icon: icon('ic_analytics'),
      }
    ]
  },
  {
    title: 'Tin tức',
    path: '/dashboard/tintuc',
    icon: icon('ic_news'),
    child: []
  },
  {
    title: 'Dự án',
    path: '/dashboard/duan',
    icon: icon('ic_project'),
    child: []
  },
  {
    title: 'Cổ đông',
    path: '/dashboard/codong',
    icon: icon('ic_notif'),
    child: []
  },
  {
    title: 'Câu hỏi',
    path: '/dashboard/cauhoi',
    icon: icon('ic_faq'),
    child: []
  },
  // {
  //   title: 'product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  
];

export default navConfig;
