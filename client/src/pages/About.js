import React from 'react';
import {Container} from "react-bootstrap";
import "../App.css";
import vklogo from "../vklogo.png";
import tglogo from "../Telegram.png";
import maillogo from "../mailru.png";
import ytlogo from "../yt.png";
import instlogo from "../inst.png";

const About = () => {
    return (
        <Container>
            <div className="about-text pageelem">
                <div className="pageelem__title">Информация о нас:</div>
                <p>Мы - команда энтузиастов, преданных идее обогащения жизни каждого человека через удивительные путешествия и познание мира вокруг нас. Наша компания "Volgatour" специализируется на организации экскурсий в удивительном городе Самара и его прекрасном окружении в Самарской области.</p>
                <p>Наши экскурсии предлагают уникальную возможность погрузиться в богатую историю и культуру Самары, исследовать ее удивительные достопримечательности, познакомиться с уникальными местами и обрести новые впечатления. Мы создаем для вас интересные и запоминающиеся маршруты, которые позволят вам открыть этот удивительный регион с новой стороны.</p>
                <p>В нашей команде - опытные и приветливые гиды, которые с удовольствием поделятся своими знаниями и страстью к родному городу. Они проведут вас по самым узнаваемым местам Самары, а также покажут вам скрытые жемчужины, о которых знают только местные жители.</p>
                <p>Наша миссия - сделать ваше путешествие в Самару незабываемым и вдохновляющим. Мы стремимся предоставить вам высочайший уровень сервиса, внимательно относимся к вашим пожеланиям и готовы предложить индивидуальные туры, адаптированные под ваши потребности.</p>
                <p>Присоединяйтесь к нам, и давайте вместе открывать чудеса Самары и ее окрестностей!</p>
            </div>

            <div className="about-contacts pageelem">
                <div className="pageelem__title">Наши контакты:</div>

                <div className="pageelem__links">
                    <span>Наш вк</span>
                        <img src={vklogo} alt="VK logo" className="contact-icon" style={{ height: '24px', marginRight: '10px' }} />
                </div>

                <div className="pageelem__links">
                    <span>Наш тг</span>
                        <img src={tglogo} alt="Telegram logo" className="contact-icon" style={{ height: '24px', marginRight: '10px' }} />
                </div>

                <div className="pageelem__links">
                    <span>Наша почта</span>
                        <img src={maillogo} alt="Mail logo" className="contact-icon" style={{ height: '24px', marginRight: '10px', marginLeft: '5px' }} />
                </div>

                <div className="pageelem__links">
                    <span>Наш ютуб</span>
                        <img src={ytlogo} alt="YouTube logo" className="contact-icon" style={{height: '24px', marginRight: '10px', marginLeft: '5px' }} />
                </div>

                <div className="pageelem__links">
                    <span>Наша инста</span>
                        <img src={instlogo} alt="Instagram logo" className="contact-icon" style={{ height: '24px', marginRight: '10px', marginLeft: '5px' }} />
                </div>
            </div>
        </Container>
    );
};

export default About;
