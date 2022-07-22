import React, { FC } from "react";

type StepProps = {
  children: any
  step: number
}

export const Step: FC<StepProps> = ({ children }) => (children);

type Props = {
  children: any;
  currentStep: number;
  className?: string;
};

export const SteppedForm: FC<Props> = ({
  children,
  currentStep,
  className = '',
}) => {
  return (
    <div className={className}>
      {children?.map((x: any) => {
        const visible = x.props.step === currentStep;

        return (
          <div key={x.props.step} className={visible ? "" : "hidden"}>
            {x}
          </div>
        );
      })}
    </div>
  );
};
