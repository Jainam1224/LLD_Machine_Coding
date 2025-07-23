import React from "react";
import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const currentPath = `/${pathnames.slice(0, index + 1).join("/")}`;
        console.log(currentPath);

        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span key={currentPath}>
            {" > "} {name}
          </span>
        ) : (
          <span key={currentPath}>
            {" > "} <Link to={currentPath}>{name}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
