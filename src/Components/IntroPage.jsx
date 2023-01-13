import { Carousel, Image } from "antd";
import { Typography } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
const { Title, Text } = Typography;

const IntroPage = () => {
  const screenshots = [
    "/Landing/carousel_0.png",
    "/Landing/carousel_1.png",
    "/Landing/carousel_2.png",
    "/Landing/carousel_3.png",
  ];
  return (
    <>
      <Title level={2}>Школьная IT платформа</Title>
      <Carousel autoplay style={{marginBottom: 30}}>
        {screenshots.map((item, index) => (
          <div key={index}>
            <Image src={item} preview={false} />
          </div>
        ))}
      </Carousel>
      <Text>
        Школьная IT платформа (<b>ШТП</b>) - система для учеников профильных IT классов. Данный проект, позволит упростить процесс обучения для учеников, и процесс преподавания для учителей.
      </Text>
      <Title level={2}>Функции</Title>
      <div>
        <ul>
          <li>Отслеживание достижений учеников</li>
          <li>Отслеживание посещаемых учеником мероприятий</li>
          <li>Система для автоматической проверки решений по программированию</li>
        </ul>
      </div>

      <Title level={2}>Открытый исходный код</Title>
      <div>
        <Text>
          Исходный код всех частей нашего проекта полностью открыт. Вы можете
          улучшить наш проект, a так же адаптировать проект под своё учебное
          заведение.
        </Text>
      </div>
      <div>
        <Link href="https://github.com/ItClassDev" target="__blank">
          <GithubOutlined /> GitHub
        </Link>
      </div>
    </>
  );
};

export default IntroPage;
