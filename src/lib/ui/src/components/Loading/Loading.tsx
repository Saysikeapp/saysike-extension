import "./loading.css";
import { cn } from "../../utils/classnames";

const LoadingSpinner = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  return (
    <div className="grid justify-center items-center h-full w-full">
      <div
        className={cn(
          "w-20 h-20 border-10 border-[solid] border-grey border-t-[10px_solid] border-t-primary rounded-[50%] animate-[spinner_0.75s_linear_infinite]",
          className,
        )}
      ></div>
    </div>
  );
};

export { LoadingSpinner };
