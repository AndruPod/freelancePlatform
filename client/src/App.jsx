import {BrowserRouter} from 'react-router-dom';
import AppRouter from "./components/AppRouter.jsx";
import {useContext, useEffect} from "react";
import {Context} from "./main.jsx";
import {observer} from "mobx-react-lite";
import {useQuery} from "@apollo/client";
import {CHECK_AUTH} from "./query/user.jsx";

const App = observer(() => {

    const {user} = useContext(Context);

    const token = localStorage.getItem('token');

    const {loading, error, data} = useQuery(CHECK_AUTH, {
        skip: !token,
    });

    useEffect(() => {
        if(data && data.checkAuth) {
            user.setIsAuth(true);
            user.setUser(data.checkAuth);
        }
    }, [data]);

    if(loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;



  return (
      <BrowserRouter>
          <AppRouter />
      </BrowserRouter>
  )
})

export default App
