import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export default (props: HelloProps) => {
  const { compiler, framework } = props;
  return (
    <h1>
      Hello from
      {compiler}
      and
      {framework}
      !
    </h1>
  );
};
