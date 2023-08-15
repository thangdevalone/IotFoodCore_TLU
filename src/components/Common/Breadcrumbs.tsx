import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from "@mui/material"
import { useWindowDimensions } from '@/hooks';

interface BreadcrumbItem {
  name: string;
  link?: string;
}

interface BreadcrumbsCommonProps {
  items: BreadcrumbItem[];
}

const BreadcrumbsCommon: React.FC<BreadcrumbsCommonProps> = ({ items }) => {

  const { width } = useWindowDimensions();

  const defaultBreadcrumb = (
    <Link
      underline="none"
      key="home"
      color="inherit"
      href="/"
    >
      <span className={`${width > 450 ? 'text-base' : '"text-xl'} hover:text-blue-500 capitalize`}>
        Trang chủ
      </span>
    </Link>
  );

  const breadcrumbs = [defaultBreadcrumb, ...items.map((item, index) => {
    if (index === items.length - 1) {
      return (
        <span key={index} className={`${width > 450 ? 'text-base' : '"text-xl'} text-blue-500 capitalize`}>{item.name}</span>
      );
    } else {
      return (
        <Link
          underline="none"
          key={index}
          color="inherit"
          href={item.link}
        >
          <span className={`${width > 450 ? 'text-base' : '"text-xl'} hover:text-blue-500 capitalize`}>{item.name}</span>
        </Link>
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
