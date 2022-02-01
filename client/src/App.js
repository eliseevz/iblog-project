import './App.css';
import {Switch, BrowserRouter, Route, Redirect} from "react-router-dom";
import Main from "./layouts/main";
import React from "react";
import Article from "./layouts/article";
import Navbar from "./components/Navbar/Navbar";
import AuthPage from "./pages/AuthPage";
import AuthorPage from "./pages/AuthorPage";
import ArticleForm from "./pages/ArticleForm";
import FavoritePage from "./pages/FavoritePage";
import AdminPage from "./components/Admin/adminPage";
import {AdminProvider} from "./hooks/useAdmin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer/footer";
import {ThemeProvider} from "./hooks/useTheme";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {

    const routing = (
        <Switch>
                <Route path="/:author/article/:id" exact component={Article}/>
                <Route path="/articleform/:type/:id?" exact component={ArticleForm}/>
                <Route path="/auth/:type?" exact component={AuthPage}/>
                <ProtectedRoute path="/favorites" component={FavoritePage} />
                <ProtectedRoute path="/admin" exact component={AdminPage} />
                <Route path="/:author" exact component={AuthorPage}/>
                <Route path="/" exact component={Main}/>
                <Redirect to="/" />
        </Switch>
    )

  return (
      <BrowserRouter>
        <div className="App">
            <ThemeProvider>
                <Navbar />
                    <MainLayout>
                        {routing}
                    </MainLayout>
                <ToastContainer />
                <Footer/>
            </ThemeProvider>
        </div>
      </BrowserRouter>
  );
}

export default App;