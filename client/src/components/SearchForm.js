import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const SearchForm = ({ onSearch }) => {
    const [searchData, setSearchData] = useState({
        title: '',
        category: '',
        datee: ''
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios
            .get('http://localhost:8000/api/categories/')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => console.log(err));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchData({ ...searchData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchData);
    };

    return (
        <div className="searchform">
            <div className="searchfrom__title">Поиск экскурсии</div>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>Название экскурсии</Form.Label>
                        <Form.Control
                            name="title"
                            type="text"
                            placeholder="Название"
                            value={searchData.title}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Категория</Form.Label>
                        <Form.Select
                            name="category"
                            value={searchData.category}
                            onChange={handleInputChange}
                        >
                            <option value="">Выбрать</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Дата</Form.Label>
                        <Form.Control
                            name="datee"
                            type="date"
                            value={searchData.datee}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <div className="searchform__button d-flex justify-content-end">
                    <Button
                        type="submit"
                        style={{ backgroundColor: 'cadetblue', border: 'darkslategray solid 2px' }}
                    >
                        Показать
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SearchForm;
