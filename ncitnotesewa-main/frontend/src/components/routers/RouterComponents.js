import {Routes, Route} from "react-router-dom";
import HomeComponents from "../pages/home/HomeComponents";
import PageNotFound from "../pages/errors/PageNotFound";
import AddUserComponents from "../pages/users/AddUserComponents";
import LoginComponents from "../pages/auth/LoginComponents";
import AuthMiddleware from "../middleware/AuthMiddleware";
import AddBookComponents from "../admin/pages/books/AddBookComponents";
import ShowBookComponents from "../admin/pages/books/ShowBookComponents";
import UpdateUserComponents from "../admin/pages/users/UpdateUserComponents";
import AdminDashboardComponents from "../admin/pages/AdminDashboardComponents";
import AddBannerComponents from "../admin/pages/banner/AddBannerComponents";
import ShowBannerComponents from "../admin/pages/banner/ShowBannerComponents";
import UpdateBannerComponents from "../admin/pages/banner/UpdateBannerComponents";
import ShowUserComponents from "../admin/pages/users/ShowUserComponents";
import BookImageGalleryComponents from "../admin/pages/books/BookImageGalleryComponents";
import AddFacultyComponents from "../admin/pages/faculty/AddFacultyComponents";
import ShowFacultyComponents from "../admin/pages/faculty/ShowFacultyComponents";
import UpdateFacultyComponents from "../admin/pages/faculty/UpdateFacultyComponents";
import UpdateBookComponents from "../admin/pages/books/UpdateBookComponents";
import SettingComponents from "../admin/pages/SettingComponents";
import OrderListComponents from "../admin/pages/books/OrderListComponents";
import ContactComponents from "../pages/contact/ContactComponents";
import AddBlogComponents from "../admin/pages/blogs/AddBlogComponents";
import ShowBlogComponents from "../admin/pages/blogs/ShowBlogComponents";
import UpdateBlogComponents from "../admin/pages/blogs/UpdateBlogComponents";
import ChatComponents from "../admin/pages/chat/ChatComponents";
import ChangePasswordComponents from "../admin/pages/users/ChangePasswordComponents";
import BooksDetailsComponents from "../pages/books/BooksDetailsComponents";
import FacultyBooksComponents from "../pages/books/FacultyBooksComponents";
import AllBookListComponents from "../pages/books/AllBookListComponents";
import ContactListComponents from "../admin/pages/contact/ContactListComponents";
import BlogListComponents from "../pages/blogs/BlogListComponents";
import AboutUsComponents from "../pages/about/AboutUsComponents";
import FaqComponents from "../pages/faq/FaqComponents";
import BlogDetailsComponents from "../pages/blogs/BlogDetailsComponents";
import AddAboutComponents from "../admin/pages/about/AddAboutComponents";
import ShowAboutComponents from "../admin/pages/about/ShowAboutComponents";
import UpdateAboutComponents from "../admin/pages/about/UpdateAboutComponents";

function RouterComponents() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomeComponents/>}/>
                <Route path="/about-us" element={<AboutUsComponents/>}/>
                <Route path="/faq" element={<FaqComponents/>}/>
                <Route path="/login" element={<LoginComponents/>}/>
                <Route path="/register" element={<AddUserComponents/>}/>
                <Route path="/contact-us" element={<ContactComponents/>}/>
                <Route path="/faculty-show/:id" element={<FacultyBooksComponents/>}/>
                <Route path="/book-details/:id" element={<BooksDetailsComponents/>}/>
                <Route path="/books" element={<AllBookListComponents/>}/>
                <Route path="/blog-list" element={<BlogListComponents/>}/>
                <Route path="/blog-details/:id" element={<BlogDetailsComponents/>}/>


                <Route element={<AuthMiddleware/>}>
                    <Route path="/dashboard" element={<AdminDashboardComponents/>}/>
                    <Route path="/add-book" element={<AddBookComponents/>}/>
                    <Route path="/show-book" element={<ShowBookComponents/>}/>
                    <Route path="/update-book/:id" element={<UpdateBookComponents/>}/>

                    <Route path="/add-about" element={<AddAboutComponents/>}/>
                    <Route path="/show-about" element={<ShowAboutComponents/>}/>
                    <Route path="/update-about/:id" element={<UpdateAboutComponents/>}/>

                    <Route path="/book-gallery/:id" element={<BookImageGalleryComponents/>}/>
                    <Route path="/update-profile" element={<UpdateUserComponents/>}/>
                    <Route path="/change-password" element={<ChangePasswordComponents/>}/>
                    <Route path="/add-banner" element={<AddBannerComponents/>}/>
                    <Route path="/show-banner" element={<ShowBannerComponents/>}/>
                    <Route path="/show-users" element={<ShowUserComponents/>}/>
                    <Route path="/update-banner/:id" element={<UpdateBannerComponents/>}/>

                    <Route path="/add-faculty/" element={<AddFacultyComponents/>}/>
                    <Route path="/show-faculty/" element={<ShowFacultyComponents/>}/>
                    <Route path="/update-faculty/:id" element={<UpdateFacultyComponents/>}/>
                    <Route path="/order-list" element={<OrderListComponents/>}/>

                    <Route path="/add-blog" element={<AddBlogComponents/>}/>
                    <Route path="/show-blog" element={<ShowBlogComponents/>}/>
                    <Route path="/update-blog/:id" element={<UpdateBlogComponents/>}/>
                    <Route path="/chat" element={<ChatComponents/>}/>
                    <Route path="/contact-list" element={<ContactListComponents/>}/>


                    <Route path="/setting" element={<SettingComponents/>}/>

                </Route>

                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    )

}

export default RouterComponents;