import { Carousel, Image } from 'antd';
import { Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';
const { Title, Text } = Typography;

const IntroPage = () => {
    return (
        <>
            <Title>Школьная IT платформа</Title>
            <Text>Школьная IT платформа(ШТП) - система для учеников профильных IT классов.</Text>
            <Carousel autoplay>
                <div>
                    <Image src="https://i.imgur.com/SXm2Xim.png" preview={false}/>
                </div>
                <div>
                    <Image src="https://i.imgur.com/SXm2Xim.png" preview={false}/>
                </div>
                <div>
                    <Image src="https://i.imgur.com/SXm2Xim.png" preview={false}/>
                </div>
                <div>
                    <Image src="https://i.imgur.com/SXm2Xim.png" preview={false}/>
                </div>
            </Carousel>
            <Title>Open Source</Title>
            <div>
                <Text>Исходный код всех частей нашего проекта полностью открыт. Вы можете улучшить наш проект, а так же адаптировать проект под своё учебное заведение.</Text>
            </div>
            <div>
                <Link href='https://github.com/ItClassDev' target="__blank"><GithubOutlined/> GitHub</Link>
            </div>
        </>
    )
}

export default IntroPage;
