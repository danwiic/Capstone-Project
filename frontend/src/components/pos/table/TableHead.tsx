type TableHeadProps = {
    children?: React.ReactNode;
  };
  
  export default function TableHead({ children }: TableHeadProps) {
    return <thead className="text-left text-sm">{children}</thead>;
  }
  