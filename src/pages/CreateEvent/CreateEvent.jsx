import { useState } from "react";

import styles from "./styles/createEvent.module.scss";

import Step1 from "./components/Step1/Step1";
import Step2 from "./components/Step2/Step2";
import Step3 from "./components/Step3/Step3";
import Step4 from "./components/Step4/Step4";

function CreateEvent() {
  const [currentStep, setCurrentStep] = useState(4);

  const steps = [
    { step: 1, description: "Зображення" },
    { step: 2, description: "Інформація" },
    { step: 3, description: "Опис події" },
    { step: 4, description: "Контакти" },
  ];

  return (
    <div className={styles["container"]}>
      <h2 className={styles["container__title"]}>Додати подію</h2>
      <ul className={styles["container__steps"]}>
        {steps.map((step) => {
          return (
            <li
              key={step.step}
              className={`${styles["container__step"]} ${
                step.step === currentStep
                  ? styles["container__step--active"]
                  : ""
              }`}>
              <span className={styles["container__step-order"]}>
                {step.step}
              </span>
              <p className={styles["container__step-label"]}>
                крок {step.step}
              </p>
              <p className={styles["container__step-description"]}>
                {step.description}
              </p>
            </li>
          );
        })}
      </ul>
      <form>
        {currentStep === 1 && <Step1 onSetCurrentStep={setCurrentStep} />}
        {currentStep === 2 && (
          <Step2
            currentStep={currentStep}
            onSetCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 3 && (
          <Step3
            currentStep={currentStep}
            onSetCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 4 && <Step4 />}
      </form>
    </div>
  );
}

export default CreateEvent;
