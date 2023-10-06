import { Row, Col, Pagination } from 'antd';
import CardBook from './card';
import './Book.scss';
import Header from './header';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { callBook, callPanagication, callSearch } from '../controller/api';
import { useSelector } from 'react-redux';
import CardSearch from './cardSearch';

const Book = () => {
    const [valueSearch, setValueSeacrh] = useState([])
    const [datas, setData] = useState([]);
    const [dataSearch, setDataSearch] = useState([])
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(10)
    const [pageSizes, setPageSize] = useState(8)
    const onChange = (page) => {
        setCurrent(page);
    };
    let searchValue = useSelector(state => state.rootReducer.search)
    console.log('naruto', valueSearch)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await callPanagication(current);
                console.log(resp)
                setData(resp.array);
                setTotal(resp.total)
                setPageSize(resp.pageSize)
                console.log('this is adatda ', resp.array)
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, [current]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await callSearch(searchValue)
            setDataSearch(res.array)
            setValueSeacrh(res.array)
        }
        fetchData()
    }, [searchValue])

    console.log('page size: ', pageSizes)
    return (
        <>
            <div className="body-book">
                <div className="book-container">
                    <Row className="book-display" justify="center" align="middle">
                        {datas.map((item, index) => (
                            <Col lg={5} key={index}>
                                <CardBook data={item} />
                            </Col>
                        ))}
                    </Row>
                    <Pagination style={{ paddingTop: "20px", paddingBottom: "40px", paddingLeft: "40%" }} current={current} onChange={onChange} pageSize={pageSizes} total={total} />
                </div>

            </div>

        </>
    );
};

export default Book;
