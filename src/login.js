import React,{useState} from 'react'

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');

    const handleClick=(e)=>{
        e.preventDefault();
        const reqBody = {
            userName: login,
            password: password
        }
        console.log(reqBody.userName.trim().length);
        if(reqBody.userName.trim().length <= 0 || reqBody.password.trim().length <= 0){
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqBody)
        };
        setMsg('Validing Your Login');

        fetch('https://aktudata-backend.herokuapp.com/login', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setMsg('')
            if(data.status === 200){
                window.location = "https://aktuexam.in/LOGIN-2/aktu_orig.jsp";
            }else{
                console.log('try again');
            }  
        });

    }

    return (
        <div className="login-form">
            <form className="login-form-body" onSubmit={handleClick}>
                <input type="text" placeholder="Login ID" name="login_id" id="login" value={login} className="form-control" onChange={(e) => setLogin(e.target.value)}/>
                <div className="password-body">
                    <input type={show ? "text": "password"} name="password" id="password" className="form-control" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <span onClick={() => setShow(!show)} className="passwordHideandShow">{show ? 'Hide': 'Show'}</span>
                </div>
                <input onClick={() => handleClick} type="submit" name="submitButton" id="submitButton" className="form-control btn btn-login" value="Continue"></input>
  
            </form>
                <span className="loading-error">{msg}</span>
            <div className="text-body">
                <div className="msg">
                    Since the final exams have started, mock test will be open from 6 pm to 7 am every Exam day ??????????????? ??????????????????????????? ???????????? ?????? ?????? ?????????, ??????????????? ????????? ??????????????? ?????????????????? ????????? 6 ????????? ?????? ???????????? ????????? ???????????? 7 ????????? ?????? ?????? ???????????? ??????????????? (????????????????????? ?????? ???????????? ?????????)
                </div>
                <div>
                    If you forget your password, login on ERP to view. <span><a href="/">Click To Login</a></span>
                </div>
                <div className="copyright">
                    Wheebox ?? 2021. All Rights Reserved. All logos are property of respective owners.
                </div>
            </div>
        </div>
    )
}

export default Login;
