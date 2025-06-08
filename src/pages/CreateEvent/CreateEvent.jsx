import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "./styles/createEvent.module.scss";

import Step1 from "./components/Step1/Step1";
import Step2 from "./components/Step2/Step2";
import Step3 from "./components/Step3/Step3";
import Step4 from "./components/Step4/Step4";

import { getAllCategories } from "../../services/apiCategories";
import { getAllCities } from "../../services/apiCities";
import {
  addSeveralPhotos,
  addAddress,
  addDescription,
  addContacts,
  createEvent,
} from "../../services/apiCreateEvent";
import { formatTimeCreateEvent } from "../../helpers/date";

function CreateEvent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isValidStep4, setIsValidStep4] = useState(null);

  const navigate = useNavigate();

  const userId = Number(useSelector((state) => state.user.userId));

  // Step1
  const [titlePhoto, setTitlePhoto] = useState(null);
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);

  // Step2
  const [title, setTitle] = useState("");

  const [category, setCategory] = useState({
    id: null,
    name: "Оберіть категорію",
  });
  const [allCategories, setAllCategories] = useState([]);
  const [allCities, setAllCities] = useState([]);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState({
    id: null,
    name: "Оберіть Місто",
  });
  const [isOnline, setIsOnline] = useState(false);

  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Step3
  const [description, setDescription] = useState("");

  // Step4
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");

  const [instagram, setInstagram] = useState("");

  const [telegram, setTelegram] = useState("");

  const [facebook, setFacebook] = useState("");

  const [webSite, setWebsite] = useState("");

  const steps = [
    { step: 1, description: "Зображення" },
    { step: 2, description: "Інформація" },
    { step: 3, description: "Опис події" },
    { step: 4, description: "Контакти" },
  ];

  useEffect(() => {
    async function fetchSelectData() {
      try {
        const categories = await getAllCategories();
        const cities = await getAllCities();
        setAllCategories(categories);
        setAllCities(cities);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchSelectData();
  }, []);

  async function uploadPhotos(titlePhoto, photo1, photo2) {
    if (!titlePhoto) return [];

    const optionalPhotos = [photo1, photo2].filter(Boolean);

    const photos = await addSeveralPhotos([titlePhoto, ...optionalPhotos]);
    return photos.map((photo) => photo.id);
  }

  async function uploadAddress(cityId, street) {
    if (!cityId || !street) return;

    const trimmedStreet = street.trim();
    const match = trimmedStreet.match(/^(.+)\s+(\S+)$/);
    const streetName = match ? match[1] : trimmedStreet;
    const number = match ? match[2] : "";

    const address = await addAddress(cityId, streetName, number);
    return address?.id;
  }

  async function uploadDescription(description) {
    if (description.length === 0) return;
    const descriptionId = await addDescription(description);
    return descriptionId.id;
  }

  async function handleSubmit(event) {
    // event.preventDefault();
    if (!category?.id) return;
    const photosIds = await uploadPhotos(titlePhoto, photo1, photo2);
    const normalizedPrice = isFree ? 0 : parseFloat(price || 0);
    const startTime = formatTimeCreateEvent(date, time);

    const eventData = {
      userId,
      title,
      photosIds,
      categoryIds: [category.id],
      price: normalizedPrice,
      isOnline,
      startTime,
    };

    if (!isOnline) {
      const addressId = await uploadAddress(city.id, street);
      if (addressId) {
        eventData.addressId = addressId;
      }
    }

    const descriptionId = await uploadDescription(description);
    if (descriptionId) eventData.descriptionId = descriptionId;

    const contactData = {
      phoneNumber: phone,
      email,
      instagram,
      telegram,
      facebook,
      officialWebsite: webSite,
    };

    const contact = await addContacts(contactData);
    if (contact?.id) eventData.contactId = contact.id;

    const CreatedEvent = await createEvent(eventData);

    if (CreatedEvent) {
      navigate("/my-events", { state: { showModal: true } });
    }
  }

  useEffect(() => {
    if (isValidStep4 === "valid") {
      handleSubmit();
    }
  }, [isValidStep4]);

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
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <Step1
            onSetCurrentStep={setCurrentStep}
            titlePhoto={titlePhoto}
            onSetTitlePhoto={setTitlePhoto}
            photo1={photo1}
            onSetPhoto1={setPhoto1}
            photo2={photo2}
            onSetPhoto2={setPhoto2}
          />
        )}
        {currentStep === 2 && (
          <Step2
            currentStep={currentStep}
            onSetCurrentStep={setCurrentStep}
            allCategories={allCategories}
            allCities={allCities}
            title={title}
            onSetTitle={setTitle}
            category={category}
            onSetCategory={setCategory}
            street={street}
            onSetStreet={setStreet}
            city={city}
            onSetCity={setCity}
            isOnline={isOnline}
            onSetIsOnline={setIsOnline}
            price={price}
            onSetPrice={setPrice}
            isFree={isFree}
            onSetIsFree={setIsFree}
            date={date}
            onSetDate={setDate}
            time={time}
            onSetTime={setTime}
          />
        )}
        {currentStep === 3 && (
          <Step3
            currentStep={currentStep}
            onSetCurrentStep={setCurrentStep}
            description={description}
            onSetDescription={setDescription}
          />
        )}
        {currentStep === 4 && (
          <Step4
            currentStep={currentStep}
            onSetCurrentStep={setCurrentStep}
            phone={phone}
            onSetPhone={setPhone}
            email={email}
            onSetEmail={setEmail}
            instagram={instagram}
            onSetInstagram={setInstagram}
            telegram={telegram}
            onSetTelegram={setTelegram}
            facebook={facebook}
            onSetFacebook={setFacebook}
            webSite={webSite}
            onSetWebsite={setWebsite}
            isValidStep4={isValidStep4}
            onSetIsValidStep4={setIsValidStep4}
          />
        )}
      </form>
    </div>
  );
}

export default CreateEvent;
