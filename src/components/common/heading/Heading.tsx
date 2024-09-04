import React, { memo } from "react";

const Heading = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <h2 className="mb-3" style={{ fontSize: "26px" }}>
      {title}
    </h2>
  );
};

export default memo(Heading);
