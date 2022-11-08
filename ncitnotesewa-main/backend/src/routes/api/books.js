import express from "express";

const bookRoute = express.Router();
import BooksController from "../../controllers/api/BooksController.js";
import multer from "multer";

let bookInstance = new BooksController();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/books');
    },

    filename: function (req, file, cb) {
        let fileName = file.originalname.trim();
        let imageName = Date.now() + '-' + Math.round(Math.random() * 1E9) + "-" + fileName;
        cb(null, imageName)
    }
});

const upload = multer({storage: storage})

bookRoute.get("/", bookInstance.index);
bookRoute.post("/", upload.array('images', 100), bookInstance.store);
bookRoute.get("/:id", bookInstance.show);
bookRoute.put("/:id", bookInstance.update);
bookRoute.delete("/:id", bookInstance.destroy);
bookRoute.get("/login_user_book/:id", bookInstance.loginUserBooks);
bookRoute.get("/book-gallery/:id", bookInstance.bookGalleryIndex);
bookRoute.post("/book-gallery", upload.array('images', 100), bookInstance.addBookImage);

bookRoute.get("/book-order-by-login-user/:id", bookInstance.getBookOrderList);
bookRoute.post("/book-order/", bookInstance.addBookOrder);
bookRoute.post("/update-order-status/", bookInstance.updateOrderStatus);
bookRoute.get("/faculty_book/:id", bookInstance.getBookByFaculties);
bookRoute.get("/book-details/:id", bookInstance.getBookDetails);
bookRoute.get("/search_books/:criteria", bookInstance.searchBooks);
bookRoute.post("/book-rating", bookInstance.addBookRating);
bookRoute.post("/book-review", bookInstance.addBookReview);


export default bookRoute;