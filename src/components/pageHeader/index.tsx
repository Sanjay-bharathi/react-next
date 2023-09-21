import React from "react";

export interface IPageHeader {
  title: string | React.ReactElement;
  sideContent?: React.ReactElement;
}

export const PageHeader = ({
  title,
  sideContent,
}: IPageHeader): React.ReactElement => {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {sideContent}
    </div>
  );
};
