type TableBodyProps = {
    children?: React.ReactNode;
  };
  
  export default function TableBody({ children }: TableBodyProps) {
    return <tbody className="">{children}</tbody>;
  }
  