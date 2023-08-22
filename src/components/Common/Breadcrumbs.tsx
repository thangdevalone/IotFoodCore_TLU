import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useWindowDimensions } from '@/hooks';
import { NavLink } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  link: string | '';
}

interface BreadcrumbsCommonProps {
  items: BreadcrumbItem[];
}

const BreadcrumbsCommon: React.FC<BreadcrumbsCommonProps> = ({ items }) => {

  const { width } = useWindowDimensions();

  const defaultBreadcrumb = (
    <NavLink
      key="home"
      color="inherit"
      to="/"
    >
      <span className={`${ width <= 460 ? 'text-[12px]' : width <= 750 ? 'text-base' :  width <= 900 ? "text-xl" : "text-2xl"} hover:text-blue-500 capitalize`}>
        Trang chủ
      </span>
    </NavLink>
  );

  const breadcrumbs = [defaultBreadcrumb, ...items.map((item, index) => {
    if (index === items.length - 1) {
      return (
        <span key={index} className={`${ width <= 460 ? 'text-[12px]' : width <= 750 ? 'text-base' :  width <= 900 ? "text-xl" : "text-2xl"} text-blue-500 capitalize`}>{item.name}</span>
      );
    } else {
      return (
        <NavLink
          key={index}
          color="inherit"
          to={item.link}
        >
          <span className={`${ width <= 460 ? 'text-[12px]' : width <= 750 ? 'text-base' :  width <= 900 ? "text-xl" : "text-2xl"} hover:text-blue-500 capitalize`}>{item.name}</span>
        </NavLink>
      );
    }
  })];

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumbs"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}

export default BreadcrumbsCommon;
