import './App.css';
import {Switch, BrowserRouter, Route, Redirect} from "react-router-dom";
import Main from "./layouts/main";
import React from "react";
import Article from "./layouts/article";
import Navbar from "./components/Navbar/Navbar";
import Favorites from "./layouts/favorites";
import AuthPage from "./components/pages/AuthPage";
import AuthorPage from "./components/pages/AuthorPage";
import {UserProvider} from "./hooks/useUser";
import ArticleForm from "./components/pages/ArticleForm";
import {TagsProvider} from "./hooks/useTags";
import FavoritePage from "./components/pages/FavoritePage";
import AdminPage from "./components/Admin/adminPage";
import {AdminProvider} from "./hooks/useAdmin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ArticleProvider} from "./hooks/useArticles";
import Footer from "./components/Footer/footer";

function App() {
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
            <ArticleProvider>
                <UserProvider>
                    <TagsProvider>
                        <AdminProvider>
                            <Navbar />
                                <div className="mainContent">
                                    {routing}
                                </div>
                            <ToastContainer />
                            <Footer/>
                        </AdminProvider>
                    </TagsProvider>
                </UserProvider>
            </ArticleProvider>
        </div>
      </BrowserRouter>
  );
}

export default App;
