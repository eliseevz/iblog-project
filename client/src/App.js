import './App.css';
import {Switch, BrowserRouter, Route, Redirect} from "react-router-dom";
import Main from "./layouts/main";
import React, {useEffect} from "react";
import Article from "./layouts/article";
import Navbar from "./components/Navbar/Navbar";
import Favorites from "./layouts/favorites";
import AuthPage from "./pages/AuthPage";
import AuthorPage from "./pages/AuthorPage";
import {UserProvider} from "./hooks/useUser";
import ArticleForm from "./pages/ArticleForm";
import {TagsProvider} from "./hooks/useTags";
import FavoritePage from "./pages/FavoritePage";
import AdminPage from "./components/Admin/adminPage";
import {AdminProvider} from "./hooks/useAdmin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ArticleProvider} from "./hooks/useArticles";
import Footer from "./components/Footer/footer";
import {ThemeProvider} from "./hooks/useTheme";
import MainLayout from "./layouts/MainLayout";
import {AuthProvider} from "./hooks/useAuth";
import {useDispatch} from "react-redux";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {

    }, [])

    const routing = (
        <Switch>
                <Route path="/:author/article/:id" exact component={Article}/>
                <Route path="/articleform/:type/:id?" component={ArticleForm}/>
                <Route path="/auth/:type?" component={AuthPage}/>
                <Route path="/favorites" component={FavoritePage}/>
                <Route path="/admin" exact component={AdminPage}/>
                <Route path="/:author" exact component={AuthorPage}/>
                <Route path="/" exact component={Main}/>
                <Redirect to="/" />
        </Switch>
    )

  return (
      <BrowserRouter>
        <div className="App">
            <ThemeProvider>
                <AuthProvider>
                    <TagsProvider>
                        <AdminProvider>
                            <Navbar />
                                <MainLayout>
                                    {routing}
                                </MainLayout>
                            <ToastContainer />
                            <Footer/>
                        </AdminProvider>
                    </TagsProvider>
                </AuthProvider>
            </ThemeProvider>
        </div>
      </BrowserRouter>
  );
}

export default App;