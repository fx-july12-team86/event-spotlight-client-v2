import styles from "./styles/eventPage.module.scss";

import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Spinner from "../../components/Spinner/Spinner";

const content = {
  description: {
    id: 0,
    title: "Майстер-клас з миловаріння",
    description: `🧼 Відкрийте для себе мистецтво створення натурального мила 🌿
  
  Запрошуємо вас на захоплюючий майстер-клас з миловаріння, де ви зможете зануритися у чарівний світ створення натурального мила власними руками. Це чудова можливість дізнатися більше про мистецтво миловаріння, навчитися основним технікам та створити унікальні мильні шедеври, які стануть прекрасним подарунком або прикрасою для вашого дому.  
  🛠️ Всі необхідні матеріали надаються 🛠️
  
  Що вас очікує:
  
  📚 Теоретична частина: Ознайомлення з основними інгредієнтами та інструментами, які використовуються у миловарінні.
  
  🧪 Практична частина: Покрокове керівництво зі створення мила з натуральних компонентів, включаючи вибір ароматів, барвників та форм.
  
  🎁 Результат: Ви власноруч створите кілька різновидів мила, яке зможете забрати з собою додому.`,
  },
  contact: {
    id: 0,
    phoneNumber: "string",
    email: "string",
    instagram: "string",
    telegram: "string",
    facebook: "string",
  },
  address: {
    id: 0,
    cityId: 0,
    street: "string",
    number: "string",
  },
};

function EventPage() {
  return (
    <div className={styles["container"]}>
      <Header title={content.description.title} />
      <Content />
    </div>
  );
}

export default EventPage;
