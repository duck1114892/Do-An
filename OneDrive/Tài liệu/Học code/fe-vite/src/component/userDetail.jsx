import { useSelector } from "react-redux";
import './userDetail.scss'
const UserDetail = () => {
    return (
        <div className='container'>
            <div className='item'>
                <div>
                    <span style={{ fontSize: "35px", }}>Tên Người Dùng :</span>
                    <div style={{ color: 'blue' }}> {useSelector(state => state.rootReducer.user.username)}</div>
                </div>
                <div>
                    <span style={{ fontSize: "35px", }}>Email :</span>
                    <div style={{ color: 'blue' }}> {useSelector(state => state.rootReducer.user.email)}</div>
                </div>
                <div>
                    <span style={{ fontSize: "35px", }}>Phone :</span>
                    <div style={{ color: 'blue' }}> {useSelector(state => state.rootReducer.user.phone)}</div>
                </div>
            </div>
            <div className="item2">

            </div>
        </div>
    );
}
export default UserDetail