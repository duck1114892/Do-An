import Cart from './cart'
import './header.scss'
import { Avatar, Dropdown, Input, List } from 'antd'
import UserDrop from './user'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { callSearch } from '../controller/api'
import { searchValue } from '../redux/login/action'

const Header = () => {
    const dispath = useDispatch()
    const { Search } = Input

    const [searchResults, setSearchResults] = useState([]);
    const [value, setValue] = useState('')
    const handleSearch = async (e) => {
        setValue(e.target.value)
        let res = await callSearch(value)
        setSearchResults(res.array)
        console.log(searchResults)
    }
    const handleSearchEnter = (e) => {

        dispath(searchValue(e))
    }

    return (
        <>
            <div className="header-container">
                <img src="../../img/6217-shinobulaughs.png" alt="" className='img-header' />
                <Link className='book-page' style={{ fontSize: "40px", width: "160px", height: "100px", textAlign: "center", paddingTop: "20px", marginLeft: "60px", textDecorationLine: "none", color: "white" }} to="book">Manga</Link>
                <div style={{ width: "600px" }}>
                    <Search style={{ width: "100%", marginLeft: '7%' }} placeholder="Tìm Kiếm" enterButton="Tìm Kiếm" onSearch={(e) => { handleSearchEnter(e) }} size="large" onChange={(e) => { handleSearch(e) }} />
                    {searchResults.length > 0 && value ? (<List
                        style={{ marginTop: '20px', position: "absolute", width: "50%", backgroundColor: "white " }}
                        bordered
                        dataSource={searchResults}
                        renderItem={(item) => <List.Item
                        >
                            {

                            }
                            <List.Item.Meta
                                avatar={<Avatar src={`${item.path}`} />}
                                title={<a href={`http://localhost:3000/book-detail/${item.id}`}> {item.name}  </a>}
                                description={item.quantity}
                            />
                        </List.Item>}
                    />) : <></>}

                </div>
                <Cart></Cart>
                <UserDrop></UserDrop>
            </div>
        </>
    )
}
export default Header