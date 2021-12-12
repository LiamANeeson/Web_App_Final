import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { parseJwt } from '../utils/utils'
import Navbar from '../components/Navbar'

function App() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

    async function loginUser(event) {
      event.preventDefault()
      
      const response = await fetch('http://localhost:1337/api/login', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json();
      if(data.user){
        console.log(parseJwt(data.user))
        localStorage.setItem('username', parseJwt(data.user).name)
        localStorage.setItem('token', data.user)
        alert('Login successful')
        window.location.href= '/dashboard'
      }
      else{
        alert('Please check your username and password')
      }
    }
  function navToRegister(event){
    navigate('/register')
  }

  return (
    <div>
      <Navbar />
      <h1>Log in</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br/>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br/>
        <input type="submit" value="Login"/>
      </form>
      <h1>Not Signed Up <button onClick={navToRegister}>Reigster</button></h1>
    </div>
  );
}

export default App;
