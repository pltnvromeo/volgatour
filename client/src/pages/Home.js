import React, {useState, useEffect} from 'react';
import {Container} from "react-bootstrap";
import SearchForm from "../components/SearchForm";
import CardList from "../components/CardList";
import "../App.css"
import Banner from "../images/Banner.jpg"
import axios from "axios";

const Home = () => {
    const [excursionsList, setExcursionList] = useState([{ photo: '', title: '', small_description: '' }]);

    useEffect(() => {
        refreshList();
    }, []);

    const refreshList = (searchData = {}) => {
        axios
            .get('http://localhost:8000/api/excursions/',{ params: searchData })
            .then(res => setExcursionList(res.data))
            .catch(err => console.log(err));
    };
    const handleSearch = (searchData) => {
        refreshList(searchData);
    };
    return (
        <Container>
            <div className="banner">
                <div className="banner__image">
                    <img
                        src={Banner}
                        alt="Banner picture"
                        className="img-fluid"
                    />
                    <div className="banner__text">
                        <h1 className="text-center display-6">VOLGA TOUR</h1>
                        <h4 className="banner__subtitle text-center display-6">Выбирай экскурсию с нами</h4>
                    </div>
                </div>
                <SearchForm onSearch={handleSearch}/>
                <CardList excursions={excursionsList} />
            </div>
        </Container>
    );
}

export default Home;