import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import swal from "sweetalert";


const AdminDashboard = () => {
  const [allAdmin, setAllAdmin] = useState([])
  const [notItem, setNotItem] = useState([])
  const [register, setRegister] = useState([])
  const [suggested, setSuggested] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://backend.indianfilmtitles.com/api/v1/admin/')
      .then(res => {
        setAllAdmin(res.data);
        console.log(res.data)
      })
  }, [])
  useEffect(() => {
    axios.get('https://backend.indianfilmtitles.com/api/v1/testtitle')
      .then(res => {
        setNotItem(res.data);
        console.log(res.data)
      })
  }, [])
  useEffect(() => {
    axios.get('https://backend.indianfilmtitles.com/api/v1/mint/mint-nft')
      .then(res => {
        setRegister(res.data);
        console.log(res.data)
      })
  }, [])
  useEffect(() => {
    axios.get('https://backend.indianfilmtitles.com//api/v1/suggested/suggested_title')
      .then(res => {
        setSuggested(res.data);
        console.log(res.data)
      })
  }, [])

  const handleClickOpenAdmin = () => {
    navigate('/admin/adminUser')
  }
  const handleClickTitlenot = () => {
    navigate('/admin/titles_not_eligible')
  }
  const handleClicktitleRegistered = () => {
    navigate('/admin/titles_registered')
  }
  const handleClicktitleSuggested = () => {
    navigate('/admin/titles_suggest')
  }

  //   const Logout = () => {
  //     logOut();
  //     swal({
  //       // title: "S",
  //       text: "You have successfully logout.",
  //       icon: "success",
  //       button: "OK!",
  //       className: "modal_class_success",
  //     });
  //   }

  return (
    <div>
      <div className='container titlesregistered'>
        <h5 className='text-white text-start'>DASHBOARD</h5>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">

          <Col onClick={handleClickOpenAdmin}>
            <Card className='cardDash '>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className='dashboardTxt'>
                  <p>Admins</p>
                  <h2 className='text-start'>{allAdmin.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className='text-white coinsIcon'><i class="fas fa-users"></i></p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col onClick={handleClickTitlenot}>
            <Card className='cardDash '>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className='dashboardTxt'>
                  <p>Titles not eligible</p>
                  <h2 className='text-start'>{notItem.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className='text-white coinsIcon'><i class="fas fa-dot-circle"></i></p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col onClick={handleClicktitleRegistered}>
            <Card className='cardDash '>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className='dashboardTxt'>
                  <p>Titles Minted</p>
                  <h2 className='text-start'>{register.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className='text-white coinsIcon'><i class="fas fa-dot-circle"></i></p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col onClick={handleClicktitleSuggested}>
            <Card className='cardDash '>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className='dashboardTxt'>
                  <p>Suggested Title</p>
                  <h2 className='text-start'>{suggested.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className='text-white coinsIcon'><i class="fas fa-dot-circle"></i></p>
                </div>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </div>
    </div>
  );
};

export default AdminDashboard;