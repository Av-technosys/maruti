import Link from "next/link";
import React from "react";

const PLink = (props) => {
  const { children } = props;
  return (
    <Link prefetch={false} {...props}>
      {children}
    </Link>
  );
};

export default PLink;
