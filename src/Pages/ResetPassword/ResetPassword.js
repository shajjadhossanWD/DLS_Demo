import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import swal from 'sweetalert';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [visiblePassword, setVisiblePassword] = useState(false);

    const resetPassword = (e) => {
        e.preventDefault();
        const newPassword = e.target.password.value;

        axios.post("https://backend.indianfilmtitles.com/api/v1/admin/reset-password/", { newPassword }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
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
                    navigate("/admin/login");
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
                            <p className='text-dark mt-3 pb-3'>Please enter your new password</p>
                        </div>
                        <hr />
                        <div className='mt-4 pt-2'>
                            <form onSubmit={resetPassword}>
                                <InputGroup className="mb-3 mt-3">
                                    <InputGroup.Text className='bg-dark border-0 text-white'><i class="fas fa-lock"></i></InputGroup.Text>
                                    <Form.Control aria-label="Amount (to the nearest dollar)" className='inputBackground' placeholder='Enter New Password' required name="password" type={visiblePassword ? "text" : "password"} />
                                    <InputGroup.Text className='bg-dark text-center border-0 cursor-pointer text-white' role="button" type="button" onClick={() => setVisiblePassword(!visiblePassword)}>{
                                    visiblePassword ? <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>
                                }</InputGroup.Text>
                                </InputGroup>

                                <div className='mx-auto text-center'>
                                    <Button className='btn btn-primary text-center ps-5 pe-5 pt-2 pb-2' type="submit">
                                        Submit
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

export default ResetPassword;