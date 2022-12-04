import { Carousel, Image } from 'antd';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const IntroPage = () => {
    return (
        <>
            <Title>Школьная IT платформа</Title>
            <Text>ШТП - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui vivamus arcu felis bibendum ut. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Integer feugiat scelerisque varius morbi enim nunc faucibus. Sagittis vitae et leo duis ut diam quam nulla porttitor.</Text>
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
            
        </>
    )
}

export default IntroPage;