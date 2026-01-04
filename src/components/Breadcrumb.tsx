import { Breadcrumb as BsBreadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getBreadcrumbName = (value: string, index: number): string => {
    if (value === "hymn") return "Hino";
    if (value === "search") return "Busca";
    if (value === "random") return "Hino Aleatório";
    
    // Check if it's a number (hymn number)
    if (!isNaN(Number(value))) {
      const prevPath = pathnames[index - 1];
      if (prevPath === "hymn") return `Hino ${value}`;
      return value;
    }
    
    return value;
  };

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <BsBreadcrumb className="mt-3">
      <BsBreadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        Início
      </BsBreadcrumb.Item>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        
        return isLast ? (
          <BsBreadcrumb.Item key={to} active>
            {getBreadcrumbName(value, index)}
          </BsBreadcrumb.Item>
        ) : (
          <BsBreadcrumb.Item key={to} linkAs={Link} linkProps={{ to }}>
            {getBreadcrumbName(value, index)}
          </BsBreadcrumb.Item>
        );
      })}
    </BsBreadcrumb>
  );
}

export default Breadcrumb;
