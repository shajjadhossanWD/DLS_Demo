import { Button } from '@mui/material';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FiSend } from 'react-icons/fi';
import { AiOutlineLogin } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import swal from 'sweetalert';

const Forgetpassword = () => {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate("/admin/login");
    }

    const sendResetLink = (e) => {
        e.preventDefault();

        const email = e.target.email.value;

        axios.post("https://backend.indianfilmtitles.com/api/v1/admin/send-reset-password-link/", { email })
            .then(res => {
                if (res.status === 200) {
                    // alert(res.data.message);
                    swal({
                        title: "Success",
                        text: `${res.data.message}`,
                        icon: "success",
                        button: "OK!",
                        className: "modal_class_success",
                    });
                }
            })
            .catch(err => {
                // alert(err.response.data.message);
                swal({
                    title: "Attention",
                    text: `${err.response.data.message}`,
                    icon: "warning",
                    button: "OK!",
                    className: "modal_class_success",
                });
            })
    }

    return (
        <div>
            <div className='handleTheLoginBody'>
                <div className='container mx-auto'>
                    <div className=' forCard  w-50 p-5 rounded mx-auto'>
                        <div className='mx-auto text-center'>
                            <img src="https://testnet.grighund.net/static/media/logo192.ea779dfe5e580c22a76f.png" className='handleLogoLogin rounded-pill' alt="logo" />
                            <p className='fs-1 Forgot'>Password Reset</p>
                            <p className='pb-2'>Enter your email address to receive Reset Password link.</p>
                        </div>
                        <hr />
                        <div className='mt-4 pt-2'>
                            <form onSubmit={sendResetLink}>

                                <InputGroup className="mb-3 mt-3">
                                    <InputGroup.Text className='bg-dark border-0 text-white'><i class="fas fa-envelope"></i></InputGroup.Text>
                                    <Form.Control aria-label="Amount (to the nearest dollar)" className='inputBackground' placeholder='Enter email' type="email" name="email" required />
                                </InputGroup>

                                <div className='mx-auto text-center' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                                    <Button style={{ backgroundColor: '#f74545' }} className='button-34 ps-5 pe-5 pt-2 pb-2' type="submit">
                                        <FiSend></FiSend> Send
                                    </Button>
                                    <Button style={{ backgroundColor: '#f74545' }} onClick={handleGoToLogin} className='button-34 ps-5 pe-5 pt-2 pb-2' type="button">
                                        <AiOutlineLogin /> Login
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forgetpassword;